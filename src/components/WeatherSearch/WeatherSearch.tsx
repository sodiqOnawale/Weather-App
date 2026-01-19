import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Alert, Fade, LinearProgress } from '@mui/material';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import {
    type WeatherData,
    type GeocodingResult,
    type TemperatureUnit
} from '../../types/weather';

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

interface WeatherSearchProps {
    unit: TemperatureUnit;
    onUnitChange: (unit: TemperatureUnit) => void;
    onLoadWeatherData: (weatherData: WeatherData) => void;
}

interface Coordinates {
    lat: number;
    lon: number;
}

const WeatherSearch = ({
    unit,
    onUnitChange,
    onLoadWeatherData
}: WeatherSearchProps) => {
    const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
    const lastCoordsRef = useRef<Coordinates | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function fetchWeatherData<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json() as Promise<T>;
    }

    const fetchByCoords = useCallback(
        async (lat: number, lon: number) => {
            lastCoordsRef.current = { lat, lon };
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
            const responseWeatherData = await fetchWeatherData<WeatherData>(weatherUrl);
            setWeatherData(responseWeatherData);
            onLoadWeatherData(responseWeatherData);
        },
        [unit, onLoadWeatherData]
    );

    const handleSearch = async (location: string) => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const query = encodeURIComponent(location.trim());
            const geoCodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`;
            const geoCodingData = await fetchWeatherData<GeocodingResult[]>(geoCodingUrl);
            if (!geoCodingData.length) {
                throw new Error('No matching location found.');
            }
            await fetchByCoords(geoCodingData[0].lat, geoCodingData[0].lon);
        } catch (error) {
            setErrorMessage('Invalid location. Please search for a valid city.');
            console.error('Fetch error:', error instanceof Error ? error.message : error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUseMyLocation = useCallback(() => {
        setIsLoading(true);
        setErrorMessage('');
        navigator.geolocation.getCurrentPosition(
            async pos => {
                try {
                    await fetchByCoords(pos.coords.latitude, pos.coords.longitude);
                } catch (error) {
                    setErrorMessage('Unable to fetch weather for your location.');
                    console.error('Fetch error:', error instanceof Error ? error.message : error);
                } finally {
                    setIsLoading(false);
                }
            },
            error => {
                setIsLoading(false);
                setErrorMessage('Location access denied. Enable location to use this feature.');
                console.error('Geolocation error:', error.message);
            }
        );
    }, [fetchByCoords]);

    useEffect(() => {
        handleUseMyLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!lastCoordsRef.current) return;
        setIsLoading(true);
        setErrorMessage('');
        fetchByCoords(lastCoordsRef.current.lat, lastCoordsRef.current.lon)
            .catch(error => {
                setErrorMessage('Unable to refresh weather details.');
                console.error('Fetch error:', error instanceof Error ? error.message : error);
            })
            .finally(() => setIsLoading(false));
    }, [unit, fetchByCoords]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <SearchBar
                handleSearch={handleSearch}
                onUseMyLocation={handleUseMyLocation}
                unit={unit}
                onUnitChange={onUnitChange}
                isLoading={isLoading}
            />
            <Fade in={isLoading}>
                <LinearProgress sx={{ mt: 2, borderRadius: 1, height: 3, bgcolor: 'action.hover' }} />
            </Fade>
            <Fade in={!!errorMessage}>
                <Box sx={{ mt: 2 }}>
                    {errorMessage && (
                        <Alert severity="error" onClose={() => setErrorMessage('')}>
                            {errorMessage}
                        </Alert>
                    )}
                </Box>
            </Fade>
            <Box sx={{ flex: 1, mt: 2 }}>
                <CurrentWeather weatherData={weatherData} unit={unit} />
            </Box>
        </Box>
    );
}

export default WeatherSearch;

import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import CurrentWeather from './CurrentWeather';
import theme from '../../theme';
import { type WeatherData } from '../../types/weather';

const mockWeatherData: WeatherData = {
    coord: { lon: -0.1278, lat: 51.5074 },
    weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
    base: 'stations',
    main: { temp: 22, feels_like: 21, temp_min: 18, temp_max: 25, pressure: 1015, humidity: 65 },
    visibility: 10000,
    wind: { speed: 5.5, deg: 180 },
    clouds: { all: 0 },
    dt: 1640000000,
    sys: { country: 'GB', sunrise: 1639990000, sunset: 1640020000 },
    timezone: 0,
    id: 2643743,
    name: 'London',
    cod: 200
};

const renderComponent = (weatherData?: WeatherData, unit: 'metric' | 'imperial' = 'metric') =>
    render(<ThemeProvider theme={theme}><CurrentWeather weatherData={weatherData} unit={unit} /></ThemeProvider>);

describe('CurrentWeather', () => {
    test('renders skeleton when no weather data', () => {
        renderComponent(undefined);
        expect(screen.queryByText('London')).not.toBeInTheDocument();
    });

    test('renders weather data when provided', () => {
        renderComponent(mockWeatherData);
        expect(screen.getByText('London, GB')).toBeInTheDocument();
    });

    test('displays temperature in celsius', () => {
        renderComponent(mockWeatherData, 'metric');
        expect(screen.getByText('22')).toBeInTheDocument();
        expect(screen.getByText('°C')).toBeInTheDocument();
    });

    test('displays weather description', () => {
        renderComponent(mockWeatherData);
        expect(screen.getByText('clear sky')).toBeInTheDocument();
    });

    test('displays weather icon', () => {
        renderComponent(mockWeatherData);
        expect(screen.getByRole('img')).toHaveAttribute('src', 'https://openweathermap.org/img/wn/01d@4x.png');
    });

    test('displays high and low temperatures', () => {
        renderComponent(mockWeatherData);
        expect(screen.getByText('25° / 18°')).toBeInTheDocument();
    });
});

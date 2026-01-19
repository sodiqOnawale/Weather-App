import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import WeatherHighlights from './WeatherHighlights';
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
    render(<ThemeProvider theme={theme}><WeatherHighlights weatherData={weatherData} unit={unit} /></ThemeProvider>);

describe('WeatherHighlights', () => {
    test('renders header title', () => {
        renderComponent();
        expect(screen.getByText("Today's Highlights")).toBeInTheDocument();
    });

    test('renders header subtitle', () => {
        renderComponent();
        expect(screen.getByText('Detailed conditions right now')).toBeInTheDocument();
    });

    test('shows last updated chip when weather data available', () => {
        renderComponent(mockWeatherData);
        expect(screen.getByText(/last updated/i)).toBeInTheDocument();
    });

    test('does not show last updated chip without weather data', () => {
        renderComponent(undefined);
        expect(screen.queryByText(/last updated/i)).not.toBeInTheDocument();
    });

    test('renders highlight grid', () => {
        renderComponent(mockWeatherData);
        expect(screen.getByText('Wind')).toBeInTheDocument();
    });

    test('passes correct unit to HighlightGrid', () => {
        renderComponent(mockWeatherData, 'imperial');
        expect(screen.getByText('mph')).toBeInTheDocument();
    });
});

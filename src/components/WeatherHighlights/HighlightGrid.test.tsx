import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import HighlightGrid from './HighlightGrid';
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
    render(<ThemeProvider theme={theme}><HighlightGrid weatherData={weatherData} unit={unit} /></ThemeProvider>);

describe('HighlightGrid', () => {
    test('renders skeleton without weather data', () => {
        renderComponent(undefined);
        expect(screen.queryByText('Wind')).not.toBeInTheDocument();
    });

    test('renders all weather cards with data', () => {
        renderComponent(mockWeatherData);
        expect(screen.getByText('Wind')).toBeInTheDocument();
        expect(screen.getByText('Humidity')).toBeInTheDocument();
        expect(screen.getByText('Feels Like')).toBeInTheDocument();
        expect(screen.getByText('Visibility')).toBeInTheDocument();
        expect(screen.getByText('Pressure')).toBeInTheDocument();
        expect(screen.getByText('Cloud Cover')).toBeInTheDocument();
    });

    test('displays wind speed in metric', () => {
        renderComponent(mockWeatherData, 'metric');
        expect(screen.getByText('5.5')).toBeInTheDocument();
        expect(screen.getByText('km/h')).toBeInTheDocument();
    });

    test('displays wind speed in imperial', () => {
        renderComponent(mockWeatherData, 'imperial');
        expect(screen.getByText('5.5')).toBeInTheDocument();
        expect(screen.getByText('mph')).toBeInTheDocument();
    });

    test('displays humidity', () => {
        renderComponent(mockWeatherData);
        expect(screen.getByText('65')).toBeInTheDocument();
    });

    test('displays feels like temperature', () => {
        renderComponent(mockWeatherData);
        expect(screen.getByText('21')).toBeInTheDocument();
    });

    test('displays pressure', () => {
        renderComponent(mockWeatherData);
        expect(screen.getByText('1015')).toBeInTheDocument();
    });

    test('displays wind direction', () => {
        renderComponent(mockWeatherData);
        expect(screen.getByText('Direction: S')).toBeInTheDocument();
    });

    test('displays visibility in metric', () => {
        renderComponent(mockWeatherData, 'metric');
        expect(screen.getByText('10.0')).toBeInTheDocument();
        expect(screen.getByText('km')).toBeInTheDocument();
    });

    test('displays visibility in imperial', () => {
        renderComponent(mockWeatherData, 'imperial');
        expect(screen.getByText('6.2')).toBeInTheDocument();
        expect(screen.getByText('mi')).toBeInTheDocument();
    });
});

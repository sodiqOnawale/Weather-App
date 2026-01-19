import { render, screen } from '@testing-library/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import theme from '../../theme';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
);

describe('App', () => {
    beforeEach(() => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn().mockImplementation((success) =>
                Promise.resolve(
                    success({
                        coords: {
                            latitude: 51.5074,
                            longitude: -0.1278
                        }
                    })
                )
            )
        };
        Object.defineProperty(global.navigator, 'geolocation', {
            value: mockGeolocation,
            writable: true
        });
    });

    test('renders the weather app header with logo', () => {
        render(<TestWrapper><App /></TestWrapper>);
        expect(screen.getByText('WeatherNow')).toBeInTheDocument();
    });

    test('renders the subtitle text', () => {
        render(<TestWrapper><App /></TestWrapper>);
        expect(screen.getByText(/real-time conditions/i)).toBeInTheDocument();
    });

    test('renders footer with technology stack', () => {
        render(<TestWrapper><App /></TestWrapper>);
        expect(screen.getByText(/React, TypeScript & Material UI/i)).toBeInTheDocument();
    });

    test("renders Today's Highlights section", () => {
        render(<TestWrapper><App /></TestWrapper>);
        expect(screen.getByText("Today's Highlights")).toBeInTheDocument();
    });
});

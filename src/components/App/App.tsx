import { useState, useCallback } from 'react';
import {
    Box,
    Container,
    Paper,
    Stack,
    Typography,
    alpha,
    useMediaQuery,
    useTheme
} from '@mui/material';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import WeatherSearch from '../WeatherSearch/WeatherSearch';
import WeatherHighlights from '../WeatherHighlights/WeatherHighlights';
import { type WeatherData, type TemperatureUnit } from '../../types/weather';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideInLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

const slideInRight = keyframes`
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

const App = () => {
    const [currentWeatherData, setCurrentWeatherData] = useState<WeatherData | undefined>();
    const [unit, setUnit] = useState<TemperatureUnit>('metric');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleLoadWeatherData = useCallback((weatherData: WeatherData) => {
        setCurrentWeatherData(weatherData);
    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                py: { xs: 2, sm: 3, md: 4 },
                px: { xs: 2, md: 3 }
            }}
        >
            <Container maxWidth="xl">
                {/* Header */}
                <Paper
                    elevation={0}
                    sx={{
                        mb: 3,
                        px: { xs: 2.5, md: 4 },
                        py: { xs: 2, md: 2.5 },
                        borderRadius: 4,
                        background: theme =>
                            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                        backdropFilter: 'blur(20px)',
                        animation: `${fadeIn} 0.6s ease-out`
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        flexWrap="wrap"
                        gap={2}
                    >
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Box
                                sx={{
                                    p: 1,
                                    borderRadius: 2,
                                    background: theme =>
                                        `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CloudQueueIcon
                                    sx={{
                                        fontSize: 28,
                                        color: 'common.white'
                                    }}
                                />
                            </Box>
                            <Stack spacing={0}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        background: theme =>
                                            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    WeatherNow
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}
                                >
                                    Real-time conditions and local highlights
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Paper>

                <Box
                    sx={{
                        display: 'grid',
                        gap: 3,
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'minmax(320px, 400px) 1fr'
                        }
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 2, md: 3 },
                            borderRadius: 4,
                            height: 'fit-content',
                            animation: `${isMobile ? fadeIn : slideInLeft} 0.6s ease-out 0.2s both`
                        }}
                    >
                        <WeatherSearch
                            unit={unit}
                            onUnitChange={setUnit}
                            onLoadWeatherData={handleLoadWeatherData}
                        />
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 2, md: 3 },
                            borderRadius: 4,
                            animation: `${isMobile ? fadeIn : slideInRight} 0.6s ease-out 0.3s both`
                        }}
                    >
                        <WeatherHighlights
                            weatherData={currentWeatherData}
                            unit={unit}
                        />
                    </Paper>
                </Box>

                {/* Footer */}
                <Box
                    sx={{
                        mt: 4,
                        textAlign: 'center',
                        animation: `${fadeIn} 0.6s ease-out 0.5s both`
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary' }}
                    >
                        Built with React, TypeScript & Material UI • Powered by OpenWeatherMap
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default App;

import { Box, Card, CardContent, Typography, Grid, Stack, Skeleton, alpha } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudIcon from '@mui/icons-material/Cloud';
import WavesIcon from '@mui/icons-material/Waves';
import TerrainIcon from '@mui/icons-material/Terrain';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { type WeatherData, type TemperatureUnit } from '../../types/weather';
import { keyframes } from '@mui/system';

const fadeInUp = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

interface HighlightGridProps {
    weatherData: WeatherData | undefined;
    unit: TemperatureUnit;
}

interface HighlightCardProps {
    title: string;
    value: string | number;
    unit?: string;
    subtitle: string;
    icon: React.ReactNode;
    gradient: string;
    delay: number;
}

const HighlightGrid = ({ weatherData, unit }: HighlightGridProps) => {
    const tempUnit = unit === 'imperial' ? '°F' : '°C';
    const speedUnit = unit === 'imperial' ? 'mph' : 'km/h';
    const visibilityUnit = unit === 'imperial' ? 'mi' : 'km';

    if (!weatherData) return <HighlightGridSkeleton />;

    const windDirection = getWindDirection(weatherData.wind?.deg);
    const windSpeed = formatNumber(weatherData.wind?.speed);
    const visibilityValue = formatVisibility(weatherData.visibility, unit);

    const cards: Omit<HighlightCardProps, 'delay'>[] = [
        { title: 'Wind', value: windSpeed, unit: speedUnit, subtitle: `Direction: ${windDirection}`, icon: <AirIcon />, gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' },
        { title: 'Humidity', value: weatherData.main?.humidity ?? '—', unit: '%', subtitle: 'Relative humidity', icon: <WaterDropIcon />, gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' },
        { title: 'Feels Like', value: Math.round(weatherData.main?.feels_like ?? 0), unit: tempUnit, subtitle: 'Perceived temperature', icon: <ThermostatIcon />, gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
        { title: 'Visibility', value: visibilityValue, unit: visibilityUnit, subtitle: 'Clear distance', icon: <VisibilityIcon />, gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
        { title: 'Pressure', value: weatherData.main?.pressure ?? '—', unit: 'hPa', subtitle: 'Barometric pressure', icon: <SpeedIcon />, gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
        { title: 'Cloud Cover', value: weatherData.clouds?.all ?? '—', unit: '%', subtitle: 'Sky coverage', icon: <CloudIcon />, gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)' },
        { title: 'Sea Level', value: weatherData.main?.sea_level ?? '—', unit: 'hPa', subtitle: 'Sea level pressure', icon: <WavesIcon />, gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' },
        { title: 'Ground Level', value: weatherData.main?.grnd_level ?? '—', unit: 'hPa', subtitle: 'Ground level pressure', icon: <TerrainIcon />, gradient: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)' },
        { title: 'Sunrise', value: formatSunTime(weatherData.sys?.sunrise), subtitle: 'Sunrise time', icon: <WbSunnyIcon />, gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' }
    ];

    return (
        <Grid container spacing={2}>
            {cards.map((card, index) => (
                <Grid item xs={12} sm={6} lg={4} key={card.title}>
                    <HighlightCard {...card} delay={index * 0.1} />
                </Grid>
            ))}
        </Grid>
    );
};

const HighlightCard = ({ title, value, unit, subtitle, icon, gradient, delay }: HighlightCardProps) => {
    return (
        <Card sx={{
            height: '100%', animation: `${fadeInUp} 0.5s ease-out ${delay}s both`, position: 'relative', overflow: 'hidden',
            '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: gradient }
        }}>
            <CardContent sx={{ p: 2.5 }}>
                <Stack spacing={1.5}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', fontWeight: 600 }}>{title}</Typography>
                        <Box sx={{ p: 1, borderRadius: 2, background: alpha('#ffffff', 0.05), color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 20 } }}>{icon}</Box>
                    </Stack>
                    <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2, display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                        {value}
                        {unit && <Typography component="span" sx={{ fontSize: '1rem', fontWeight: 500, color: 'text.secondary' }}>{unit}</Typography>}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>{subtitle}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

const HighlightGridSkeleton = () => {
    return (
        <Grid container spacing={2}>
            {[...Array(6)].map((_, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 2.5 }}>
                            <Stack spacing={1.5}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Skeleton width={60} height={20} />
                                    <Skeleton variant="rounded" width={36} height={36} sx={{ borderRadius: 2 }} />
                                </Stack>
                                <Skeleton width={80} height={40} />
                                <Skeleton width={120} height={16} />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

const getWindDirection = (degrees: number = 0): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % 8];
}

const formatVisibility = (visibility: number | undefined, unit: TemperatureUnit): string => {
    if (typeof visibility !== 'number') return '—';
    return formatNumber(unit === 'imperial' ? visibility / 1609.34 : visibility / 1000);
}

const formatNumber = (value: number | undefined): string => {
    return typeof value !== 'number' ? '—' : value.toFixed(1);
}

const formatSunTime = (timestamp: number | undefined): string => {
    if (!timestamp) return '—';
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export default HighlightGrid;

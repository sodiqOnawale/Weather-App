import { useMemo } from 'react';
import { Box, Typography, Stack, Chip, Skeleton, alpha, Divider } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { type WeatherData, type TemperatureUnit } from '../../types/weather';
import { keyframes } from '@mui/system';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const floatAnimation = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
`;

const pulseGlow = keyframes`
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
`;

interface CurrentWeatherProps {
    weatherData: WeatherData | undefined;
    unit: TemperatureUnit;
}

function CurrentWeather({ weatherData, unit }: CurrentWeatherProps) {
    const tempUnit = unit === 'imperial' ? '°F' : '°C';

    const localDate = useMemo(() => {
        if (!weatherData?.dt || typeof weatherData.timezone !== 'number') return null;
        return new Date((weatherData.dt + weatherData.timezone) * 1000);
    }, [weatherData]);

    const localTime = useMemo(() => {
        if (!localDate) return '';
        return localDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    }, [localDate]);

    const localDay = localDate ? WEEKDAYS[localDate.getUTCDay()] : '';
    const iconName = weatherData?.weather?.[0]?.icon;
    const iconUrl = iconName ? `https://openweathermap.org/img/wn/${iconName}@4x.png` : '';
    const isNightTime = iconName?.includes('n');

    if (!weatherData) return <CurrentWeatherSkeleton />;

    return (
        <Box sx={{ position: 'relative', py: 3, textAlign: 'center' }}>
            <Box sx={{
                position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
                width: '180px', height: '180px',
                background: theme => isNightTime
                    ? `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.2)} 0%, transparent 70%)`
                    : `radial-gradient(circle, ${alpha(theme.palette.warning.main, 0.15)} 0%, transparent 70%)`,
                animation: `${pulseGlow} 4s ease-in-out infinite`, pointerEvents: 'none', zIndex: 0
            }} />
            <Stack spacing={2} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ animation: `${floatAnimation} 6s ease-in-out infinite`, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))' }}>
                    <Box component="img" src={iconUrl} alt={weatherData.weather[0]?.description || 'Weather'} sx={{ width: 140, height: 140, objectFit: 'contain' }} />
                </Box>
                <Typography variant="h1" sx={{
                    fontSize: { xs: '4rem', sm: '5rem' }, fontWeight: 700, lineHeight: 1,
                    background: theme => `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.text.primary, 0.7)} 100%)`,
                    backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>
                    {Math.round(weatherData.main.temp)}
                    <Typography component="span" sx={{ fontSize: '2rem', fontWeight: 400, verticalAlign: 'super', ml: 0.5 }}>{tempUnit}</Typography>
                </Typography>
                <Chip label={weatherData.weather[0]?.description} variant="filled" sx={{ textTransform: 'capitalize', fontSize: '0.9rem', py: 2.5, px: 1 }} />
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <LocationOnIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.secondary' }}>{weatherData.name}, {weatherData.sys.country}</Typography>
                </Stack>
                <Divider flexItem sx={{ my: 1 }} />
                <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap" sx={{ width: '100%' }}>
                    <MetaItem label="Local time" value={localDay ? `${localDay.slice(0, 3)} · ${localTime}` : '—'} />
                    <MetaItem label="High / Low" value={`${Math.round(weatherData.main.temp_max)}° / ${Math.round(weatherData.main.temp_min)}°`} icon={<ThermostatIcon sx={{ fontSize: 16 }} />} />
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ pt: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={0.75}>
                        <WbSunnyIcon sx={{ fontSize: 18, color: 'warning.main' }} />
                        <Typography variant="body2" color="text.secondary">{formatTime(weatherData.sys.sunrise, weatherData.timezone)}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.75}>
                        <NightsStayIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                        <Typography variant="body2" color="text.secondary">{formatTime(weatherData.sys.sunset, weatherData.timezone)}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

interface MetaItemProps { label: string; value: string; icon?: React.ReactNode; }

function MetaItem({ label, value, icon }: MetaItemProps) {
    return (
        <Stack alignItems="center" spacing={0.25}>
            <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>{label}</Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
                {icon}
                <Typography variant="body2" fontWeight={600}>{value}</Typography>
            </Stack>
        </Stack>
    );
}

function CurrentWeatherSkeleton() {
    return (
        <Box sx={{ py: 3, textAlign: 'center' }}>
            <Stack spacing={2} alignItems="center">
                <Skeleton variant="circular" width={140} height={140} sx={{ bgcolor: 'action.hover' }} />
                <Skeleton width={120} height={80} sx={{ borderRadius: 2 }} />
                <Skeleton width={160} height={32} sx={{ borderRadius: 4 }} />
                <Skeleton width={140} height={24} sx={{ borderRadius: 2 }} />
                <Divider flexItem sx={{ my: 1 }} />
                <Stack direction="row" spacing={3}>
                    <Skeleton width={80} height={40} sx={{ borderRadius: 2 }} />
                    <Skeleton width={80} height={40} sx={{ borderRadius: 2 }} />
                </Stack>
            </Stack>
        </Box>
    );
}

function formatTime(unixTime: number, timezoneOffset: number): string {
    if (!unixTime || typeof timezoneOffset !== 'number') return '—';
    return new Date((unixTime + timezoneOffset) * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
}

export default CurrentWeather;

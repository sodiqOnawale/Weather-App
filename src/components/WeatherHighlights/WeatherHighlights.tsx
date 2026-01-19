import { Box, Typography, Stack, Chip } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import HighlightGrid from './HighlightGrid';
import { type WeatherData, type TemperatureUnit } from '../../types/weather';

interface WeatherHighlightsProps {
    weatherData: WeatherData | undefined;
    unit: TemperatureUnit;
}

function WeatherHighlights({ weatherData, unit }: WeatherHighlightsProps) {
    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
                <Stack spacing={0.5}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <InsightsIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                        <Typography variant="h5" fontWeight={600}>Today's Highlights</Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary', pl: 0.5 }}>Detailed conditions right now</Typography>
                </Stack>
                {weatherData && (
                    <Chip
                        label={`Last updated: ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
                        size="small"
                        sx={{ fontSize: '0.75rem', bgcolor: 'action.hover' }}
                    />
                )}
            </Stack>
            <Box sx={{ flex: 1 }}>
                <HighlightGrid weatherData={weatherData} unit={unit} />
            </Box>
        </Box>
    );
}

export default WeatherHighlights;

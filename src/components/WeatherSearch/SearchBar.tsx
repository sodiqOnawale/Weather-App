import { useState, type FormEvent, type ChangeEvent } from 'react';
import {
    Box, TextField, Button, ToggleButtonGroup, ToggleButton,
    InputAdornment, IconButton, Stack, alpha, Tooltip, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { type TemperatureUnit } from '../../types/weather';

interface SearchBarProps {
    handleSearch: (location: string) => void;
    onUseMyLocation: () => void;
    unit: TemperatureUnit;
    onUnitChange: (unit: TemperatureUnit) => void;
    isLoading: boolean;
}

const SearchBar = ({ handleSearch, onUseMyLocation, unit, onUnitChange, isLoading }: SearchBarProps) => {
    const [location, setLocation] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    }

    const onSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!location.trim()) return;
        handleSearch(location);
    }

    const handleUnitChange = (_event: React.MouseEvent<HTMLElement>, newUnit: TemperatureUnit | null) => {
        if (newUnit !== null) onUnitChange(newUnit);
    }

    return (
        <Box component="form" onSubmit={onSearch} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                fullWidth
                placeholder="Search city or town..."
                value={location}
                onChange={handleChange}
                disabled={isLoading}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                disabled={!location.trim() || isLoading}
                                sx={{ minWidth: 'auto', px: 2.5, py: 0.75, fontSize: '0.875rem' }}
                            >
                                {isLoading ? <CircularProgress size={18} color="inherit" /> : 'Search'}
                            </Button>
                        </InputAdornment>
                    )
                }}
                sx={{ '& .MuiOutlinedInput-root': { pr: 1 } }}
            />
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1.5}>
                <ToggleButtonGroup
                    value={unit}
                    exclusive
                    onChange={handleUnitChange}
                    disabled={isLoading}
                    aria-label="Temperature unit"
                    size="small"
                >
                    <ToggleButton value="metric" aria-label="Celsius">°C</ToggleButton>
                    <ToggleButton value="imperial" aria-label="Fahrenheit">°F</ToggleButton>
                </ToggleButtonGroup>
                <Tooltip title="Use my current location" arrow>
                    <span>
                        <IconButton
                            onClick={onUseMyLocation}
                            disabled={isLoading}
                            sx={{
                                bgcolor: theme => alpha(theme.palette.primary.main, 0.1),
                                border: theme => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                color: 'primary.main',
                                '&:hover': {
                                    bgcolor: theme => alpha(theme.palette.primary.main, 0.2),
                                    border: theme => `1px solid ${alpha(theme.palette.primary.main, 0.4)}`
                                },
                                '&.Mui-disabled': { bgcolor: theme => alpha(theme.palette.action.disabled, 0.1) }
                            }}
                        >
                            {isLoading ? <CircularProgress size={20} color="inherit" /> : <MyLocationIcon />}
                        </IconButton>
                    </span>
                </Tooltip>
            </Stack>
        </Box>
    );
};

export default SearchBar;

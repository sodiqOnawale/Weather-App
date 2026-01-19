import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import SearchBar from './SearchBar';
import theme from '../../theme';

const mockProps = {
    handleSearch: jest.fn(),
    onUseMyLocation: jest.fn(),
    unit: 'metric' as const,
    onUnitChange: jest.fn(),
    isLoading: false
};

const renderSearchBar = (props = {}) => render(
    <ThemeProvider theme={theme}>
        <SearchBar {...mockProps} {...props} />
    </ThemeProvider>
);

describe('SearchBar', () => {
    beforeEach(() => jest.clearAllMocks());

    test('renders search input field', () => {
        renderSearchBar();
        expect(screen.getByPlaceholderText(/search city or town/i)).toBeInTheDocument();
    });

    test('renders search button', () => {
        renderSearchBar();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    test('renders temperature unit toggle buttons', () => {
        renderSearchBar();
        expect(screen.getByRole('button', { name: /celsius/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /fahrenheit/i })).toBeInTheDocument();
    });

    test('search button is disabled when input is empty', () => {
        renderSearchBar();
        expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
    });

    test('search button is enabled when input has value', async () => {
        const user = userEvent.setup();
        renderSearchBar();
        await user.type(screen.getByPlaceholderText(/search city or town/i), 'London');
        await waitFor(() => expect(screen.getByRole('button', { name: /search/i })).toBeEnabled());
    });

    test('calls handleSearch when form is submitted', async () => {
        const user = userEvent.setup();
        renderSearchBar();
        await user.type(screen.getByPlaceholderText(/search city or town/i), 'London{enter}');
        await waitFor(() => expect(mockProps.handleSearch).toHaveBeenCalledWith('London'));
    });

    test('does not call handleSearch with empty input', () => {
        renderSearchBar();
        fireEvent.submit(screen.getByRole('button', { name: /search/i }).closest('form')!);
        expect(mockProps.handleSearch).not.toHaveBeenCalled();
    });

    test('calls onUnitChange when switching to imperial', async () => {
        const user = userEvent.setup();
        renderSearchBar();
        await user.click(screen.getByRole('button', { name: /fahrenheit/i }));
        await waitFor(() => expect(mockProps.onUnitChange).toHaveBeenCalledWith('imperial'));
    });

    test('disables all inputs when loading', () => {
        renderSearchBar({ isLoading: true });
        expect(screen.getByPlaceholderText(/search city or town/i)).toBeDisabled();
        expect(screen.getByRole('button', { name: /celsius/i })).toBeDisabled();
    });

    test('metric unit is selected by default', () => {
        renderSearchBar();
        expect(screen.getByRole('button', { name: /celsius/i })).toHaveAttribute('aria-pressed', 'true');
    });
});

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../components/App';

global.fetch = jest.fn();

const mockConfig = {
    title: 'Test Form',
    components: [
        {
            id: 'form',
            type: 'form',
            children: [
                {
                    id: 'firstNameLabel',
                    type: 'text',
                    content: 'First Name'
                },
                {
                    id: 'firstName',
                    type: 'input',
                    required: true
                },
                {
                    id: 'countryLabel',
                    type: 'text',
                    content: 'Country'
                },
                {
                    id: 'country',
                    type: 'dropdown',
                    options: [
                        { label: 'United States', value: 'us' },
                        { label: 'Canada', value: 'ca' }
                    ]
                },
                {
                    id: 'submit',
                    type: 'button',
                    text: 'Submit',
                    action: 'submit'
                }
            ]
        }
    ]
};

describe('App', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('loads config and renders complete form', async () => {
        const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockConfig
        } as Response);

        render(<App />);

        expect(screen.getByText('Loading form configuration...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Test Form')).toBeInTheDocument();
        });

        expect(screen.getByText('First Name')).toBeInTheDocument();
        expect(screen.getByText('Country')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();

        expect(mockFetch).toHaveBeenCalledWith('/api/config');
    });

    it('handles config loading error', async () => {
        const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
        mockFetch.mockResolvedValueOnce({
            ok: false,
            statusText: 'Server Error'
        } as Response);

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch config/)).toBeInTheDocument();
        });

        expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    });

    it('completes full form submission workflow', async () => {
        const user = userEvent.setup();
        const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

        mockFetch
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockConfig
            } as Response)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ message: 'Form submitted successfully!' })
            } as Response);

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Test Form')).toBeInTheDocument();
        });

        const firstNameInput = screen.getByRole('textbox');
        const countrySelect = screen.getByRole('combobox');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        await user.type(firstNameInput, 'John');
        await user.selectOptions(countrySelect, 'us');
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument();
        });

        expect(mockFetch).toHaveBeenLastCalledWith('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: 'John',
                country: 'us'
            })
        });
    });
});

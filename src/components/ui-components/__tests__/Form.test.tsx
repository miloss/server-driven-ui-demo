import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from '../Form';
import { FormComponent } from '../../../types';

global.fetch = jest.fn();

const mockFormComponent: FormComponent = {
    id: 'test-form',
    type: 'form',
    children: [
        {
            id: 'name',
            type: 'input',
            required: true
        },
        {
            id: 'submit',
            type: 'button',
            text: 'Submit',
            action: 'submit'
        }
    ]
};

describe('Form Component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders form with child components', () => {
        render(<Form component={mockFormComponent} />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('submits form data successfully', async () => {
        const user = userEvent.setup();
        const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: 'Success!' })
        } as Response);

        render(<Form component={mockFormComponent} />);

        const nameInput = screen.getByRole('textbox');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        await user.type(nameInput, 'John Doe');
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Success!')).toBeInTheDocument();
        });

        expect(mockFetch).toHaveBeenCalledWith('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'John Doe' })
        });
    });

    it('displays server error message when provided', async () => {
        const user = userEvent.setup();
        const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: 'Missing required fields: firstName, email' })
        } as Response);

        render(<Form component={mockFormComponent} />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Missing required fields: firstName, email')).toBeInTheDocument();
        });
    });

    it('displays fallback error message when server error message not available', async () => {
        const user = userEvent.setup();
        const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

        mockFetch.mockResolvedValueOnce({
            ok: false,
            statusText: 'Bad Request',
            json: async () => ({})
        } as Response);

        render(<Form component={mockFormComponent} />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Form submission failed: Bad Request/)).toBeInTheDocument();
        });
    });

    it('shows loading state during form submission', async () => {
        const user = userEvent.setup();
        const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

        mockFetch.mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve({} as Response), 1000))
        );

        render(<Form component={mockFormComponent} />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await user.click(submitButton);

        expect(screen.getByText(/Form is being submitted/)).toBeInTheDocument();
    });
});
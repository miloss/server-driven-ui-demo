import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';
import { InputComponent } from '../../../types';

describe('Input Component', () => {
    it('renders input correctly', () => {
        const component: InputComponent = {
            id: 'test-input',
            type: 'input',
            placeholder: 'Enter text'
        };

        render(<Input component={component} />);

        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('id', 'test-input');
    });

    it('shows required attribute when field is required', () => {
        const component: InputComponent = {
            id: 'required-input',
            type: 'input',
            required: true
        };

        render(<Input component={component} />);

        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('required');
        expect(input).toHaveAttribute('aria-required', 'true');
        expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('calls onChange when value changes', async () => {
        const user = userEvent.setup();
        const mockOnChange = jest.fn();
        const component: InputComponent = {
            id: 'test-input',
            type: 'input'
        };

        const { rerender } = render(
            <Input component={component} value="" onChange={mockOnChange} />
        );

        const input = screen.getByRole('textbox') as HTMLInputElement;

        // Simulate typing 'a'
        await user.type(input, 'a');
        expect(mockOnChange).toHaveBeenLastCalledWith('a');

        // Re-render with the new value to simulate parent state update
        rerender(<Input component={component} value="a" onChange={mockOnChange} />);
        expect(input.value).toBe('a');
    });

    it('displays default value', () => {
        const component: InputComponent = {
            id: 'default-input',
            type: 'input',
            defaultValue: 'default text'
        };

        render(<Input component={component} />);

        const input = screen.getByDisplayValue('default text');
        expect(input).toBeInTheDocument();
    });
});

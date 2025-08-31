import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
import { ButtonComponent } from '../../../types';

describe('Button Component', () => {
    it('renders button with correct text', () => {
        const component: ButtonComponent = {
            id: 'test-button',
            type: 'button',
            text: 'Click Me'
        };

        render(<Button component={component} />);

        expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
    });

    it('renders button with primary variant', () => {
        const component: ButtonComponent = {
            id: 'primary-button',
            type: 'button',
            text: 'Primary Button'
        };

        render(<Button component={component} />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button.textContent).toBe('Primary Button');
    });

    it('renders button with secondary variant', () => {
        const component: ButtonComponent = {
            id: 'secondary-button',
            type: 'button',
            text: 'Secondary Button',
            variant: 'secondary'
        };

        render(<Button component={component} />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button.textContent).toBe('Secondary Button');
    });

    it('sets correct button type for submit action', () => {
        const component: ButtonComponent = {
            id: 'submit-button',
            type: 'button',
            text: 'Submit',
            action: 'submit'
        };

        render(<Button component={component} />);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'submit');
    });

    it('calls onClick when clicked', async () => {
        const user = userEvent.setup();
        const mockOnClick = jest.fn();
        const component: ButtonComponent = {
            id: 'clickable-button',
            type: 'button',
            text: 'Click Me'
        };

        render(<Button component={component} onClick={mockOnClick} />);

        const button = screen.getByRole('button');
        await user.click(button);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled prop is true', () => {
        const component: ButtonComponent = {
            id: 'disabled-button',
            type: 'button',
            text: 'Disabled'
        };

        render(<Button component={component} disabled={true} />);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });
});

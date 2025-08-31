import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from '../Dropdown';
import { DropdownComponent } from '../../../types';

const mockDropdownComponent: DropdownComponent = {
    id: 'test-dropdown',
    type: 'dropdown',
    options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
    ]
};

describe('Dropdown Component', () => {
    it('renders dropdown with default option', () => {
        render(<Dropdown component={mockDropdownComponent} />);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toBeInTheDocument();
        expect(selectElement).toHaveValue('');

        const defaultOption = screen.getByText('Select an option');
        expect(defaultOption).toBeInTheDocument();
    });

    it('renders all provided options', () => {
        render(<Dropdown component={mockDropdownComponent} />);

        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('sets default value when provided', () => {
        const componentWithDefault: DropdownComponent = {
            ...mockDropdownComponent,
            defaultValue: 'option2'
        };

        render(<Dropdown component={componentWithDefault} />);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toHaveValue('option2');
    });

    it('calls onChange when selection changes', async () => {
        const user = userEvent.setup();
        const mockOnChange = jest.fn();

        render(
            <Dropdown
                component={mockDropdownComponent}
                onChange={mockOnChange}
            />
        );

        const selectElement = screen.getByRole('combobox');
        await user.selectOptions(selectElement, 'option1');

        expect(mockOnChange).toHaveBeenCalledWith('option1');
    });

    it('handles multiple selection changes', async () => {
        const user = userEvent.setup();
        const mockOnChange = jest.fn();

        render(
            <Dropdown
                component={mockDropdownComponent}
                onChange={mockOnChange}
            />
        );

        const selectElement = screen.getByRole('combobox');

        await user.selectOptions(selectElement, 'option1');
        await user.selectOptions(selectElement, 'option3');
        await user.selectOptions(selectElement, 'option2');

        expect(mockOnChange).toHaveBeenCalledTimes(3);
        expect(mockOnChange).toHaveBeenNthCalledWith(1, 'option1');
        expect(mockOnChange).toHaveBeenNthCalledWith(2, 'option3');
        expect(mockOnChange).toHaveBeenNthCalledWith(3, 'option2');
    });

    it('works without onChange callback', async () => {
        const user = userEvent.setup();

        render(<Dropdown component={mockDropdownComponent} />);

        const selectElement = screen.getByRole('combobox');

        // Should not throw error when changing without onChange prop
        await expect(user.selectOptions(selectElement, 'option1')).resolves.toBeUndefined();
        expect(selectElement).toHaveValue('option1');
    });

    it('sets required attribute when component is required', () => {
        const requiredComponent: DropdownComponent = {
            ...mockDropdownComponent,
            required: true
        };

        render(<Dropdown component={requiredComponent} />);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toBeRequired();
        expect(selectElement).toHaveAttribute('aria-required', 'true');
    });

    it('does not set required attribute when component is not required', () => {
        const optionalComponent: DropdownComponent = {
            ...mockDropdownComponent,
            required: false
        };

        render(<Dropdown component={optionalComponent} />);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).not.toBeRequired();
        expect(selectElement).toHaveAttribute('aria-required', 'false');
    });

    it('displays screen reader text for required fields', () => {
        const requiredComponent: DropdownComponent = {
            ...mockDropdownComponent,
            required: true
        };

        render(<Dropdown component={requiredComponent} />);

        const srText = screen.getByText('This field is required');
        expect(srText).toBeInTheDocument();
        expect(srText).toHaveClass('is-sr-only');
    });

    it('does not display screen reader text for optional fields', () => {
        render(<Dropdown component={mockDropdownComponent} />);

        expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
    });

    it('sets correct id and name attributes', () => {
        render(<Dropdown component={mockDropdownComponent} />);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toHaveAttribute('id', 'test-dropdown');
        expect(selectElement).toHaveAttribute('name', 'test-dropdown');
    });

    it('handles empty options array', () => {
        const emptyOptionsComponent: DropdownComponent = {
            ...mockDropdownComponent,
            options: []
        };

        render(<Dropdown component={emptyOptionsComponent} />);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toBeInTheDocument();

        // Should still have the default "Select an option"
        expect(screen.getByText('Select an option')).toBeInTheDocument();

        // Should have no other options
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(1);
    });

    it('handles options with special characters', () => {
        const specialComponent: DropdownComponent = {
            ...mockDropdownComponent,
            options: [
                { label: 'Option with "quotes"', value: 'quotes' },
                { label: 'Option with & ampersand', value: 'ampersand' },
                { label: 'Option with <tags>', value: 'tags' }
            ]
        };

        render(<Dropdown component={specialComponent} />);

        expect(screen.getByText('Option with "quotes"')).toBeInTheDocument();
        expect(screen.getByText('Option with & ampersand')).toBeInTheDocument();
        expect(screen.getByText('Option with <tags>')).toBeInTheDocument();
    });
});
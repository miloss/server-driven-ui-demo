import type { DropdownComponent } from '../../types';

interface DropdownProps {
    component: DropdownComponent;
    onChange?: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ component, onChange }) => {
    const { id, options, defaultValue, required } = component;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className="field">
            <div className="control">
                <div className="select is-fullwidth">
                    <select
                        id={id}
                        name={id}
                        defaultValue={defaultValue ?? ''}
                        onChange={handleChange}
                        required={required}
                        role="combobox"
                        aria-required={required}
                        aria-describedby={required ? `${id}-required` : undefined}
                    >
                        <option value="">Select an option</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {required && (
                <span id={`${id}-required`} className="is-sr-only">
                    This field is required
                </span>
            )}
        </div>
    );
};

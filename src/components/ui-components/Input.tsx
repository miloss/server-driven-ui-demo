import type { InputComponent } from '../../types';

interface InputProps {
    component: InputComponent;
    onChange?: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({ component, onChange }) => {
    const { id, placeholder, defaultValue, required } = component;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className="field">
            <div className="control">
                <input
                    id={id}
                    name={id}
                    className="input"
                    type="text"
                    placeholder={placeholder}
                    defaultValue={defaultValue ?? ''}
                    onChange={handleChange}
                    required={required}
                    role="textbox"
                    aria-required={required}
                    aria-describedby={required ? `${id}-required` : undefined}
                />
            </div>
            {required && (
                <span id={`${id}-required`} className="is-sr-only">
                    This field is required
                </span>
            )}
        </div>
    );
};

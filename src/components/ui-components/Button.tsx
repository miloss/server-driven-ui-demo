import type { ButtonComponent } from '../../types';

interface ButtonProps {
    component: ButtonComponent;
    onClick?: () => void;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ component, onClick, disabled }) => {
    const { text, variant = 'primary', action = 'button' } = component;

    return (
        <div className="field">
            <div className="control">
                <button
                    className={variant === 'primary' ? 'button is-primary' : 'button'}
                    type={action === 'submit' ? 'submit' : action === 'reset' ? 'reset' : 'button'}
                    onClick={onClick}
                    disabled={disabled}
                    role="button"
                    aria-label={text}
                >
                    {text}
                </button>
            </div>
        </div>
    );
};

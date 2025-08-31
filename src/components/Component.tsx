import type { UIComponent } from '../types';
import { Text } from './ui-components/Text';
import { Input } from './ui-components/Input';
import { Dropdown } from './ui-components/Dropdown';
import { Button } from './ui-components/Button';
import { Form } from './ui-components/Form';

interface ComponentProps {
    component: UIComponent;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

export const Component: React.FC<ComponentProps> = ({
    component,
    onChange,
    disabled,
}) => {
    switch (component.type) {
        case 'text':
            return <Text component={component} />;

        case 'input':
            return (
                <Input
                    component={component}
                    onChange={onChange}
                />
            );

        case 'dropdown':
            return (
                <Dropdown
                    component={component}
                    onChange={onChange}
                />
            );

        case 'button':
            return (
                <Button
                    component={component}
                    disabled={disabled}
                />
            );

        case 'form':
            return <Form component={component} />;

        default:
            console.warn(`Unknown component type: ${(component as UIComponent).type}`);
            return null;
    }
};

export interface BaseComponent {
    id: string;
    type: ComponentType;
}

export interface TextComponent extends BaseComponent {
    type: 'text';
    content: string;
    label?: 'heading' | 'paragraph' | 'label';
    for?: string;
    isForRequired?: boolean;
}

export interface InputComponent extends BaseComponent {
    type: 'input';
    placeholder?: string;
    defaultValue?: string;
    required?: boolean;
}

export interface DropdownComponent extends BaseComponent {
    type: 'dropdown';
    options: DropdownOption[];
    defaultValue?: string;
    required?: boolean;
}

export interface ButtonComponent extends BaseComponent {
    type: 'button';
    text: string;
    variant?: 'primary' | 'secondary';
    action?: 'submit' | 'reset';
}

export interface FormComponent extends BaseComponent {
    type: 'form';
    children: UIComponent[];
    submitUrl?: string;
}

export type UIComponent =
    | TextComponent
    | InputComponent
    | DropdownComponent
    | ButtonComponent
    | FormComponent;

export type ComponentType = 'text' | 'input' | 'dropdown' | 'button' | 'form';

export interface DropdownOption {
    label: string;
    value: string;
}

export interface UIConfig {
    title?: string;
    components: UIComponent[];
}

export interface FormData {
    [key: string]: string;
}
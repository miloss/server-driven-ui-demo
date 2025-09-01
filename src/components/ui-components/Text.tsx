import type { TextComponent } from '../../types';

interface TextProps {
    component: TextComponent;
}

export const Text: React.FC<TextProps> = ({ component }) => {
    const { content, label, for: htmlFor, isForRequired } = component;

    if (label === 'heading') {
        return (
            <h1 className="title is-4" role="text" aria-label={label}>
                {content}
            </h1>
        );
    }

    if (label === 'label') {
        return (
            <label className="label" htmlFor={htmlFor}>
                {content}
                {isForRequired && <span className="has-text-danger"> *</span>}
            </label>
        );
    }

    return (
        <p className="content" role="text" aria-label={label}>
            {content}
        </p>
    );
};

import type { UIConfig } from '../types';

import { Component } from './Component';

interface DynamicFormProps {
    config: UIConfig;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ config }) => {
    return (
        <>
            {config.title && (
                <div className="has-text-centered mb-5">
                    <h1 className="title is-2">{config.title}</h1>
                </div>
            )}

            <div className="columns is-centered">
                <div className="column is-8">
                    {config.components.map((component) => (
                        <Component key={component.id} component={component} />
                    ))}
                </div>
            </div>
        </>
    );
};

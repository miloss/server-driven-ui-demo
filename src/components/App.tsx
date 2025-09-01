'use client';

import { useState, useEffect } from 'react';
import type { UIConfig, UIComponent } from '../types';
import { DynamicForm } from './DynamicForm';

export const App: React.FC = () => {
    const [config, setConfig] = useState<UIConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchConfig = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/config');

            if (!response.ok) {
                throw new Error(`Failed to fetch config: ${response.statusText}`);
            }

            const configData: UIConfig = await response.json();
            configData.components.forEach((component) => {
                addIsForRequired(component, configData);
            });
            setConfig(configData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load form configuration');
        } finally {
            setLoading(false);
        }
    };

    // Go through components in config and update `isForRequired` field for labels
    function addIsForRequired(component: UIComponent, config: UIConfig) {
        if (component.type === 'text' && component.label === 'label' &&
            typeof component.for === 'string') {
            component.isForRequired = isRequired(component.for, config.components);
        } else if (component.type === 'form') {
            component.children.forEach((childComponent) => {
                addIsForRequired(childComponent, config);
            });
        }
        return component;
    }

    // Is component with `id` somewhere in the config and marked as required?
    function isRequired(id: string, components: UIComponent[]): boolean {
        return components.some((component) => {
            if (component.id === id &&
                (component.type === 'input' || component.type === 'dropdown') &&
                Boolean(component.required)) {
                return true;
            }
            if (component.type === 'form') {
                return isRequired(id, component.children);
            }
            return false;
        });
    }

    useEffect(() => {
        fetchConfig();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <section className="section">
                <div className="container">
                    <div className="notification is-info" role="status" aria-live="polite">
                        Loading form configuration...
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="section">
                <div className="container">
                    <div className="notification is-danger" role="alert">
                        <p>{error}</p>
                        <button className="button is-danger is-light" onClick={fetchConfig}>
                            Retry
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (!config) {
        return (
            <section className="section">
                <div className="container">
                    <div className="notification is-warning" role="alert">
                        No configuration available
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section">
            <div className="container">
                <DynamicForm config={config} />
            </div>
        </section>
    );
};

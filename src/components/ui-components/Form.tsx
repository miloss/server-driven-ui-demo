'use client';

import { useState } from 'react';
import type { FormComponent, FormData } from '../../types';
import { Component } from '../Component';

interface FormProps {
    component: FormComponent;
}

export const Form: React.FC<FormProps> = ({ component }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const { children, submitUrl = '/api/submit' } = component;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const formData = new FormData(e.currentTarget);
            const formValues: FormData = {};

            formData.forEach((value, key) => {
                formValues[key] = value.toString();
            });

            const response = await fetch(submitUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            const result = await response.json();

            if (!response.ok) {
                // Use server's error message if available, otherwise fall back to status text
                const errorMessage = result.error || `Form submission failed: ${response.statusText}`;
                throw new Error(errorMessage);
            }

            setSuccess(result.message || 'Form submitted successfully!');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="box">
            <form
                className={isSubmitting ? 'is-loading' : ''}
                style={isSubmitting ? {opacity: 0.7, pointerEvents: 'none'} : {}}
                onSubmit={handleSubmit}
                noValidate
                role="form"
                aria-describedby={error ? 'form-error' : success ? 'form-success' : undefined}
            >
                {error && (
                    <div
                        id="form-error"
                        className="notification is-danger"
                        role="alert"
                        aria-live="polite"
                    >
                        <button
                            className="delete"
                            onClick={() => setError(null)}
                            type="button"
                        ></button>
                        {error}
                    </div>
                )}

                {success && (
                    <div
                        id="form-success"
                        className="notification is-success"
                        role="status"
                        aria-live="polite"
                    >
                        <button
                            className="delete"
                            onClick={() => setSuccess(null)}
                            type="button"
                        ></button>
                        {success}
                    </div>
                )}

                {children.map((child) => (
                    <Component
                        key={child.id}
                        component={child}
                        disabled={isSubmitting}
                    />
                ))}

                {isSubmitting && (
                    <div className="is-sr-only" aria-live="polite">
                        Form is being submitted, please wait...
                    </div>
                )}
            </form>
        </div>
    );
};

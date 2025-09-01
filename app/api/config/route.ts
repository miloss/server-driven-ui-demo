import { NextResponse } from 'next/server';
import { UIConfig } from '../../../src/types';

const mockConfig: UIConfig = {
    title: 'User Registration Form',
    components: [
        {
            id: 'welcome',
            type: 'text',
            content: 'Welcome! Please complete the form below to create your account.',
            label: 'paragraph'
        },
        {
            id: 'form',
            type: 'form',
            children: [
                {
                    id: 'firstNameLabel',
                    type: 'text',
                    content: 'First Name',
                    label: 'label',
                    for: 'firstName'
                },
                {
                    id: 'firstName',
                    type: 'input',
                    placeholder: 'Enter your first name',
                    required: true
                },
                {
                    id: 'lastNameLabel',
                    type: 'text',
                    content: 'Last Name',
                    label: 'label',
                    for: 'lastName'
                },
                {
                    id: 'lastName',
                    type: 'input',
                    placeholder: 'Enter your last name',
                    required: true
                },
                {
                    id: 'emailLabel',
                    type: 'text',
                    content: 'Email Address',
                    label: 'label',
                    for: 'email'
                },
                {
                    id: 'email',
                    type: 'input',
                    placeholder: 'Enter your email address',
                    required: true
                },
                {
                    id: 'countryLabel',
                    type: 'text',
                    content: 'Country',
                    label: 'label',
                    for: 'country'
                },
                {
                    id: 'country',
                    type: 'dropdown',
                    required: false,
                    options: [
                        { label: 'United States', value: 'us' },
                        { label: 'Canada', value: 'ca' },
                        { label: 'United Kingdom', value: 'uk' },
                        { label: 'Germany', value: 'de' },
                        { label: 'France', value: 'fr' },
                        { label: 'Japan', value: 'jp' },
                        { label: 'Australia', value: 'au' }
                    ]
                },
                {
                    id: 'terms',
                    type: 'text',
                    content: 'By submitting this form, you agree to our Terms of Service ' +
                        'and Privacy Policy.'
                },
                {
                    id: 'submit',
                    type: 'button',
                    text: 'Create Account',
                    variant: 'primary',
                    action: 'submit'
                },
                {
                    id: 'reset',
                    type: 'button',
                    text: 'Reset Form',
                    variant: 'secondary',
                    action: 'reset'
                }
            ]
        }
    ]
};

export async function GET() {
    try {
        return NextResponse.json(mockConfig);
    } catch (error) {
        console.error('Config API error:', error);
        return NextResponse.json(
            { error: 'Failed to load configuration' },
            { status: 500 }
        );
    }
}

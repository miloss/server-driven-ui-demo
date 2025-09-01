import { NextRequest, NextResponse } from 'next/server';
import { FormData } from '../../../src/types';

interface SubmitResponse {
    message: string;
    data?: FormData;
    timestamp?: string;
}

export async function POST(request: NextRequest) {
    try {
        const formData: FormData = await request.json();

        console.log('Form submission received:');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Form Data:', JSON.stringify(formData, null, 2));

        const requiredFields = ['firstName', 'lastName', 'email'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        if (formData.email && !isValidEmail(formData.email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        const response: SubmitResponse = {
            message: 'Registration successful! Welcome to our platform.',
            data: formData,
            timestamp: new Date().toISOString()
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Submit API error:', error);
        return NextResponse.json(
            { error: 'Failed to process form submission' },
            { status: 500 }
        );
    }
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

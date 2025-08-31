import { render, screen } from '@testing-library/react';
import { Text } from '../Text';
import { TextComponent } from '../../../types';

describe('Text Component', () => {
    it('renders text content correctly', () => {
        const component: TextComponent = {
            id: 'test-text',
            type: 'text',
            content: 'Hello World'
        };

        render(<Text component={component} />);

        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('applies heading style when label is "heading"', () => {
        const component: TextComponent = {
            id: 'test-heading',
            type: 'text',
            content: 'Test Heading',
            label: 'heading'
        };

        render(<Text component={component} />);

        const element = screen.getByText('Test Heading');
        expect(element).toHaveAttribute('aria-label', 'heading');
    });

    it('applies paragraph style by default', () => {
        const component: TextComponent = {
            id: 'test-paragraph',
            type: 'text',
            content: 'Test paragraph'
        };

        render(<Text component={component} />);

        const element = screen.getByText('Test paragraph');
        expect(element).toBeInTheDocument();
    });
});

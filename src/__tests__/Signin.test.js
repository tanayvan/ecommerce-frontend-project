// Signin.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signin from '../user/Signin';
import { BrowserRouter } from 'react-router-dom';
import { authenticate } from '../auth/helper';

jest.mock('../auth/helper', () => ({
    signin: jest.fn(() => Promise.resolve({})),
    authenticate: jest.fn(),
    isAuthenticated: jest.fn(() => ({ user: { role: 1 } })),
}));

describe('Signin Component', () => {
    it('renders signin component and performs signin', async () => {
        render(<BrowserRouter> <Signin /></BrowserRouter>);

        // Mocking user input
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'testpassword' } });

        // Mocking form submission
        fireEvent.click(screen.getByText(/Get started/i));

        // Wait for signin function to resolve
        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });

        // Check if authenticate function was called
        // expect(authenticate).toHaveBeenCalled();

        // Check if redirection happens
        // expect(screen.queryByText('Get started')).not.toBeInTheDocument();
        // expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
});

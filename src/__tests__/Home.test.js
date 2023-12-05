// Home.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../core/Home';
import { BrowserRouter, Switch } from 'react-router-dom';


jest.mock('../core/helper/coreapicalls', () => ({
    getProducts: jest.fn(() => Promise.resolve([])), // Mock the getProducts function
}));

describe('Home Component', () => {
    it('renders home component with products', async () => {
        render(<BrowserRouter><Switch> <Home /></Switch></BrowserRouter>);

        // Wait for products to be loaded
        await waitFor(() => {
            expect(screen.getByText('All of tshirts')).toBeInTheDocument();
        });
    });
});

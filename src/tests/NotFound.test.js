import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test the <NotFound.js /> component', () => {
  it('Test if the page contains an h2 heading with the text "Page requested not found"',
    () => {
      renderWithRouter(<NotFound />);
      const h2Heading = screen.getByRole(
        'heading',
        { name: 'Page requested not found Crying emoji' },
        { level: 2 },
      );
      expect(h2Heading).toBeInTheDocument();
    });
  it('Test the page shows an image', () => {
    renderWithRouter(<NotFound />);
    const imageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByRole(
      'img',
      { name: 'Pikachu crying because the page requested was not found' },
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageURL);
  });
});

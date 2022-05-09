import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test the <App.js /> component', () => {
  it('Test if the top application contains a fixed set of navigation links', () => {
    // O primeiro link deve possuir o texto Home.
    renderWithRouter(<App />);
    const firstLink = screen.getByRole('link', { name: 'Home' });
    expect(firstLink).toBeInTheDocument();

    // O segundo link deve possuir o texto About.
    const secondLink = screen.getByRole('link', { name: 'About' });
    expect(secondLink).toBeInTheDocument();

    // O terceiro link deve possuir o texto Favorite Pokémons.
    const thirdLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(thirdLink).toBeInTheDocument();
  });
  it('Test if clicking on the Home link redirects to /',
    () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: 'Home' });
      userEvent.click(homeLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    });
  it('Test if clicking on the About link redirects to /about',
    () => {
      const { history } = renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', { name: 'About' });
      userEvent.click(aboutLink);
      // Eu havia desestruturado o pathname lá em cima mas ele não atualizou aqui embaixo, por isso eu desestruturei ele aqui.
      const { location: { pathname } } = history;
      expect(pathname).toBe('/about');
    });
  it('Test if clicking on the Favorite Pokémons link redirects to /favorites',
    () => {
      const { history } = renderWithRouter(<App />);
      const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(favoriteLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });
  it('Test if entering an unknown URL redirects to the Not Found page',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/not-found');
      const notFound = screen.getByRole(
        'heading',
        { name: 'Page requested not found Crying emoji' },
        { level: 2 },
      );
      expect(notFound).toBeInTheDocument();
    });
});

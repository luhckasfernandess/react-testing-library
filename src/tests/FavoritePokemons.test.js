import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Test the <FavoritePokemons.js /> component', () => {
  it('Test if "No favorite pokemon found" message is displayed when not having pokemons',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const noPokemonsMessage = screen.getByText('No favorite pokemon found');
      expect(noPokemonsMessage).toBeInTheDocument();
    });
  it('Test if all your favorite pokemons are displayed', () => {
    // Eu vou ter que ir passo a passo. Oh Dahn!
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked(); // Se foi mesmo selecionado
    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavoritePokemons);
    const imageURL = '/star-icon.svg';
    const starred = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(starred).toBeInTheDocument();
    expect(starred).toHaveAttribute('src', imageURL);
    expect(starred).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

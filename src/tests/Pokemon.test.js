import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test the <Pokemon.js /> component', () => {
  it('Test if a card with the information of a given pokémon is rendered', () => {
    renderWithRouter(<App />);
    // O nome correto do pokémon deve ser mostrado na tela;
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    // O tipo correto do pokémon deve ser mostrado na tela.
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    // O peso médio do pokémon deve ser exibido junto com sua unidade de medida.
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth).toHaveTextContent('Average weight: 6.0 kg');
    // A imagem do pokémon deve ser exibida. Ela deve conter um atributo src e a URL da imagem
    const pokemonImage = screen.getByRole('img', { name: 'Pikachu sprite' });
    const imageURL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokemonImage).toHaveAttribute('src', imageURL);
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it(`Test if the pokémon card indicated in the Pokédex contains
  a navigation link to view details of that pokémon`, () => {
    renderWithRouter(<App />);
    const URLMoreDetails = '/pokemons/25';
    const moreDetailsInfo = screen.getByRole('link', { name: /More details/i });
    expect(moreDetailsInfo).toBeInTheDocument();
    expect(moreDetailsInfo).toHaveAttribute('href', URLMoreDetails);
  });
  it(`Test if clicking on the pokémon navigation link
  redirects the application to the pokémon details page`, () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const title = screen.getByRole('heading', { name: 'Pikachu Details' }, { level: 1 });
    expect(title).toBeInTheDocument();
  });
  it(`Also test if the URL displayed in the browser changes
  to the id of the pokémon whose details you want to see`, () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Test if there is a star icon in favorite pokemons.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();
    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
    const imageURL = '/star-icon.svg';
    const starred = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(starred).toBeInTheDocument();
    // A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do pokémon exibido.
    expect(starred).toHaveAttribute('src', imageURL);
    expect(starred).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

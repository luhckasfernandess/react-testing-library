import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test the <Pokedex.js /> component', () => {
  it('Test the page contains an h2 heading with the text "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const h2Heading = screen.getByRole(
      'heading',
      { name: 'Encountered pokémons' },
      { level: 2 },
    );
    expect(h2Heading).toBeInTheDocument();
  });
  it(`Test if the next pokémon in the list is displayed
  when the next pokémon button is clicked`, () => {
    renderWithRouter(<App />);
    // O botão deve conter o texto Próximo pokémon;
    const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemonButton).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    // Os próximos pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    const secondPokemon = screen.getByText('Charmander');
    expect(secondPokemon).toBeInTheDocument();
    // O primeiro pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último pokémon da lista;
    const MAGIC_NUMBER = 6;
    for (let index = 0; index <= MAGIC_NUMBER; index += 1) {
      userEvent.click(nextPokemonButton);
    }
    const sixthPokemon = screen.getByText('Dragonair');
    expect(sixthPokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });
  it('Test if only one pokemon is displayed at a time', () => {
    renderWithRouter(<App />);
    // Usar o dataTestId junto com o AllBy para transformar num array e verificar a qntd
    const currentPokemon = screen.getAllByTestId('pokemon-name');
    // Deve aparecer somente um pokemon
    expect(currentPokemon).toHaveLength(1);
  });
  it('Test if the Pokédex has the filter buttons', () => {
    renderWithRouter(<App />);
    const buttonAllTypes = screen.getByRole('button', { name: 'All' });
    // Deve existir um botão de filtragem para cada tipo de pokémon, sem repetição.
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const FILTER_BUTTONS_QUANTITY = 7;
    expect(filterButtons).toHaveLength(FILTER_BUTTONS_QUANTITY);
    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextPokemonButton);
    expect(buttonAllTypes).toBeInTheDocument();
    const rapidash = screen.getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    expect(charmander).toBeInTheDocument();
    expect(buttonAllTypes).toBeInTheDocument();
    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
    const psychicButton = screen.getByRole('button', { name: 'Psychic' });
    expect(psychicButton).toBeInTheDocument();
    expect(psychicButton).toHaveTextContent('Psychic');
    // O botão All precisa estar sempre visível.
    expect(buttonAllTypes).toBeInTheDocument();
  });
  it('Test if the Pokédex contains a button to reset the filter', () => {
    renderWithRouter(<App />);
    // O texto do botão deve ser All;
    const resetButton = screen.getByRole('button', { name: 'All' });
    expect(resetButton).toBeInTheDocument();
    // A Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado;
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    userEvent.click(resetButton);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    // Ao carregar a página, o filtro selecionado deverá ser All;
    expect(resetButton).toBeInTheDocument();
  });
});

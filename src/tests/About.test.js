import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Test the <About.js /> component', () => {
  it('Test if the page contains information about the Pokédex', () => {
    renderWithRouter(<About />);
    const infoPokédex = screen.getByText(/encyclopedia containing all Pokémons/i);
    expect(infoPokédex).toBeInTheDocument();
  });
  it('Test if the page contains an h2 heading with the text "About Pokédex"', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { name: 'About Pokédex' }, { level: 2 });
    expect(heading).toBeInTheDocument();
  });
  it('Test if the page contains two paragraphs of text about the Pokédex"', () => {
    renderWithRouter(<About />);
    const paragraphOne = screen.getByText(/This application simulates a Pokédex/);
    const paragraphTwo = screen.getByText(/One can filter Pokémons by type/);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });
  it('Test if the page contains an image of a Pokédex"', () => {
    renderWithRouter(<About />);
    const imageURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    // Source: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toHaveAttribute('src', imageURL);
    expect(pokedexImage).toHaveAttribute('alt', 'Pokédex');
  });
});

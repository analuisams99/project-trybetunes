import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      artistName: value,
    });
  }

  render() {
    const { artistName } = this.state;
    const MIN_CARACTHERS = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="submit">
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ artistName }
            placeholder="Digite aqui..."
          />
          <label htmlFor="search-btn">
            <input
              type="button"
              data-testid="search-artist-button"
              value="Pesquisar"
              id="search-btn"
              disabled={ artistName.length < MIN_CARACTHERS }
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Search;

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      loading: false,
      required: false,
      haveAnAnswer: true,
      albums: [],
      artistFound: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { artistName } = this.state;
    this.setState({ loading: true });
    const albumsFetch = await searchAlbumsAPI(artistName);
    if (albumsFetch.length > 0) {
      this.setState({
        artistName: '',
        loading: false,
        required: true,
        haveAnAnswer: true,
        albums: albumsFetch,
        artistFound: artistName,
      });
    } else {
      this.setState({
        artistName: '',
        loading: false,
        required: false,
        haveAnAnswer: false,
      });
    }
  }

  render() {
    const {
      artistName,
      loading,
      required,
      haveAnAnswer,
      albums,
      artistFound,
    } = this.state;
    const MIN_CARACTHERS = 2;
    return (
      <div data-testid="page-search">
        { loading && <Loading />}
        <Header />
        <form action="submit">
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ artistName }
            name="artistName"
            placeholder="Digite aqui..."
          />
          <button
            type="button"
            data-testid="search-artist-button"
            value="Pesquisar"
            id="search-btn"
            disabled={ artistName.length < MIN_CARACTHERS }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        <section>
          <h3>{ required && `Resultado de álbuns de: ${artistFound}`}</h3>
          <div>
            { required && albums.map((album) => (
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
                key={ album.collectionId }
              >
                <div>
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <p>{ album.collectionName }</p>
                </div>
              </Link>
            )) }
            { !haveAnAnswer && <p>Nenhum álbum foi encontrado</p> }
          </div>
        </section>
      </div>
    );
  }
}

export default Search;

import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      favorites: [],
    };

    this.handleFavorite = this.handleFavorite.bind(this);
    this.renderFavorites = this.renderFavorites.bind(this);
  }

  componentDidMount() {
    this.getFetchFavoritesSongs();
  }

  async handleFavorite(value, music) {
    this.setState({
      loading: true,
    });
    if (!value) {
      await removeSong(music);
    }
    this.getFetchFavoritesSongs();
  }

  async getFetchFavoritesSongs() {
    this.setState({ loading: true });
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: favoritesSongs,
    });
  }

  renderFavorites() {
    const { favorites } = this.state;
    return favorites.map((music) => (
      <MusicCard
        music={ music }
        checked={
          favorites.some((favorite) => favorite.trackId === music.trackId)
        }
        onChange={ this.handleFavorite }
        key={ music.trackId }
      />
    ));
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : this.renderFavorites() }
      </div>
    );
  }
}

export default Favorites;

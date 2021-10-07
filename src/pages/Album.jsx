import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      musics: [],
      favorites: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getMusicsFetch();
    this.getFetchFavoritesSongs();
  }

  async handleClick(value, music) {
    this.setState({
      loading: true,
    });
    if (value) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.getFetchFavoritesSongs();
  }

  async getMusicsFetch() {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    this.setState({
      musics: musicList,
    });
  }

  async getFetchFavoritesSongs() {
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: favoritesSongs,
    });
  }

  render() {
    const { loading, musics, favorites } = this.state;
    return (
      <div>
        <Header />
        { loading ? <Loading /> : (
          <div data-testid="page-album">
            <h2 data-testid="album-name">{ musics[0].collectionName }</h2>
            <p data-testid="artist-name">{ musics[0].artistName }</p>
            <ul>
              { musics.slice(1).map((music) => (
                <MusicCard
                  music={ music }
                  checked={
                    favorites.some((favorite) => favorite.trackId === music.trackId)
                  }
                  onChange={ this.handleClick }
                  key={ music.trackId }
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = PropTypes.shape({
  match: { params: { id: PropTypes.number } },
}).isRequired;

export default Album;

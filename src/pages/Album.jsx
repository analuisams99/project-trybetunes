import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      musics: [],
    };
  }

  componentDidMount() {
    this.getMusicsFetch();
  }

  async getMusicsFetch() {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    this.setState({
      loading: false,
      musics: musicList,
    });
  }

  render() {
    const { loading, musics } = this.state;
    return (
      <div>
        <Header />
        { loading ? <Loading /> : (
          <div data-testid="page-album">
            <h2 data-testid="album-name">{ musics[0].collectionName }</h2>
            <p data-testid="artist-name">{ musics[0].artistName }</p>
            <ul>
              { musics.slice(1).map((music, trackId) => (
                <MusicCard music={ music } key={ trackId } />
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

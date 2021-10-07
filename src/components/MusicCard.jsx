import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isItChecked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const { music } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(music);
    this.setState({
      loading: false,
      isItChecked: true,
    });
  }

  render() {
    const { loading, isItChecked } = this.state;
    const { music: { trackName, trackId, previewUrl } } = this.props;
    return (
      (loading ? <Loading /> : (
        <div>
          <h4>{ trackName }</h4>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor={ trackId }>
            Favorita
            <input
              type="checkbox"
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              checked={ isItChecked }
              onChange={ this.handleClick }
            />
          </label>
        </div>
      ))
    );
  }
}

MusicCard.propTypes = PropTypes.shape({
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
}).isRequired;

export default MusicCard;

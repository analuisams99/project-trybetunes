import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    const { checked } = props;
    this.state = {
      loading: false,
      isChecked: checked,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { onChange, music } = this.props;
    this.setState({
      isChecked: target.checked,
    });
    onChange(target.checked, music);
  }

  render() {
    const { loading, isChecked } = this.state;
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
              value={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              checked={ isChecked }
              onChange={ this.handleChange }
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

import React from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false,
      enabledButton: false,
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
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({
      loading: false,
      enabledButton: true,
    });
  }

  render() {
    const { name, loading, enabledButton } = this.state;
    const MIN_CARACTHERS = 3;
    if (loading) return <Loading />;
    if (enabledButton) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <form onSubmit={ this.handleClick }>
          <label htmlFor="login-name">
            <input
              type="text"
              data-testid="login-name-input"
              id="login-name"
              onChange={ this.handleChange }
              name="name"
              value={ name }
              placeholder="Insira seu nome aqui..."
            />
          </label>
          <label htmlFor="login-btn-submit">
            <input
              type="submit"
              id="login-btn-submit"
              value="Entrar"
              data-testid="login-submit-button"
              disabled={ name.length < MIN_CARACTHERS }
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Login;

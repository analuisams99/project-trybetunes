import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      loading: true,
    };
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const user = await getUser();
    const { name } = user;
    if (name) {
      this.setState({
        userName: name,
        loading: false,
      });
    }
  }

  renderUserName() {
    const { userName } = this.state;
    return <h3 data-testid="header-user-name">{userName}</h3>;
  }

  render() {
    const { loading } = this.state;
    return (
      <header data-testid="header-component">
        {(loading) ? <Loading /> : this.renderUserName()}
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;

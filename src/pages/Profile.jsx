import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userName: '',
      userEmail: '',
      userDescription: '',
      userImg: '',
    };
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    this.setState({ loading: true });
    const user = await getUser();
    const { name, email, image, description } = user;
    if (name) {
      this.setState({
        loading: false,
        userName: name,
        userEmail: email,
        userDescription: description,
        userImg: image,
      });
    }
  }

  renderUserName() {
    const { userName, userEmail, userDescription, userImg } = this.state;
    return (
      <div>
        <img
          src={ userImg }
          alt={ userName }
          data-testid="profile-image"
        />
        <h4>Nome</h4>
        <p>{ userName }</p>
        <h4>Email</h4>
        <p>{ userEmail }</p>
        <h4>Description</h4>
        <p>{ userDescription }</p>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : this.renderUserName() }
        <nav>
          <Link to="/profile/edit">Editar perfil</Link>
        </nav>
      </div>
    );
  }
}

export default Profile;

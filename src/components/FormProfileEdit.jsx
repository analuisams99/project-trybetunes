import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

// NÃO ESTÁ PASSANDO NOS TESTES, COMECEI MAS NÃO TERMINEI

class FormProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      enabledButton: false,
      user: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  handleChange({ target: { value, name } }) {
    this.setState(({ user }) => ({
      user: { ...user, [name]: value } }));
  }

  async handleSubmit() {
    const { user: { name, email, description, image } } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, description, image });
    this.setState({
      loading: false,
      enabledButton: true,
    });
  }

  async getUserName() {
    const user = await getUser();
    if (user) {
      this.setState({
        user,
        loading: false,
      });
    }
  }

  renderForm() {
    const { user: { name, email, description, image } } = this.state;
    return (
      <form onSubmit={ this.handleSubmit } data-testid="page-profile-edit">
        <label htmlFor="inputName">
          Alterar nome
          <input
            type="text"
            name="name"
            value={ name }
            id="inputName"
            onChange={ this.handleChange }
            data-testid="edit-input-name"
            required
          />
        </label>
        <label htmlFor="inputEmail">
          Alterar Email
          <input
            type="email"
            name="email"
            value={ email }
            id="inputEmail"
            onChange={ this.handleChange }
            data-testid="edit-input-email"
            required
          />
        </label>
        <label htmlFor="inputDescription">
          Alterar Descrição
          <input
            type="text"
            name="description"
            value={ description }
            id="inputDescription"
            onChange={ this.handleChange }
            data-testid="edit-input-description"
            required
          />
        </label>
        <label htmlFor="imgLink">
          Coloque o link da imagem aqui
          <input
            type="text"
            name="image"
            value={ image }
            onChange={ this.handleChange }
            id="imgLink"
            required
          />
        </label>
        <label htmlFor="inputImg">
          <input
            type="image"
            src={ image }
            alt={ name }
            id="inputImg"
            onChange={ this.handleChange }
            data-testid="edit-input-image"
          />
        </label>
        <input
          type="submit"
          value="salvar"
          data-testid="edit-button-save"
        />
      </form>
    );
  }

  render() {
    const { loading, enabledButton } = this.state;
    if (enabledButton) return <Redirect to="/profile" />;
    return (
      loading ? <Loading />
        : this.renderForm()
    );
  }
}

export default FormProfileEdit;

import React, { Component } from 'react';
import firebase from '../config/Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('startup');
    this.state = {
      name: '',
      description: '',
      proprietary: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, description, proprietary } = this.state;

    this.ref.add({
      name,
      description,
      proprietary
    }).then((docRef) => {
      this.setState({
        name: '',
        description: '',
        proprietary: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Erro ao adicionar documento: ", error);
    });
  }

  render() {
    const { name, description, proprietary } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              CADASTRAR STARTUP
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Voltar a Lista</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Nome:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Nome" />
              </div>
              <div class="form-group">
                <label for="description">Descrição:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Descrição" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="proprietary">Proprietário:</label>
                <input type="text" class="form-control" name="proprietary" value={proprietary} onChange={this.onChange} placeholder="Proprietário" />
              </div>
              <button type="submit" class="btn btn-success">Criar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;

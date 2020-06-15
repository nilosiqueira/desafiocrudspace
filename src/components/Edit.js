import React, { Component } from 'react';
import firebase from '../config/Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      description: '',
      proprietary: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('startup').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const startups = doc.data();
        this.setState({
          key: doc.id,
          name: startups.name,
          description: startups.description,
          proprietary: startups.proprietary
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({startups:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, description, proprietary } = this.state;

    const updateRef = firebase.firestore().collection('startup').doc(this.state.key);
    updateRef.set({
      name,
      description,
      proprietary
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        description: '',
        proprietary: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Erro ao adicionar documento: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDITAR STARTUP
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">STARTUP</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Nome:</label>
                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Nome" />
              </div>
              <div class="form-group">
                <label for="description">Descrição:</label>
                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Descrição" />
              </div>
              <div class="form-group">
                <label for="proprietary">Proprietário:</label>
                <input type="text" class="form-control" name="proprietary" value={this.state.proprietary} onChange={this.onChange} placeholder="Proprietário" />
              </div>
              <button type="submit" class="btn btn-success">Editar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;

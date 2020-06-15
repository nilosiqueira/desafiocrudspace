import React, { Component } from 'react';
import firebase from '../config/Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startup: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('startup').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          startup: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("Essa Startup não existe!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('startup').doc(id).delete().then(() => {
      console.log("Documento excluído com sucesso!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Erro ao remover o documento: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">VOLTAR PARA CADASTRO</Link></h4>
            <h3 class="panel-title">
              {this.state.startup.name}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Descrição:</dt>
              <dd>{this.state.startup.description}</dd>
              <dt>Proprietário:</dt>
              <dd>{this.state.startup.proprietary}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Editar</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Deletar</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;

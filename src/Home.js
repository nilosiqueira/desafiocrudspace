import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './config/Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('startup');
    this.logout = this.logout.bind(this);
    this.unsubscribe = null;
    this.state = {
      startup: []
    };
  }

  logout() {
    firebase.auth().signOut();
  }

  onCollectionUpdate = (querySnapshot) => {
    const startup = [];
    querySnapshot.forEach((doc) => {
      const { name, description, proprietary } = doc.data();
      startup.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        description,
        proprietary,
      });
    });
    this.setState({
      startup
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              STARTUP CADASTRADAS
            </h3>
          </div>
          <div class="panel-body">
            <h4>
            <Link to="/create" class="btn btn-primary">Add Startup</Link>
            <button class="btn btn-primary" onClick={this.logout}>Sair</button>
            </h4>
            
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Proprietário</th>
                </tr>
              </thead>
              <tbody>
                {this.state.startup.map(board =>
                  <tr>
                    <td><Link to={`/show/${board.key}`}>{board.name}</Link></td>
                    <td>{board.description}</td>
                    <td>{board.proprietary}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

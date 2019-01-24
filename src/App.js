import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { Switch, Route, HashRouter, Link } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import './App.css';
import Launches from './components/Launches'
import Launch from './components/LaunchSingle'


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
  }

  render() {
    return (
      <HashRouter>
        <ApolloProvider client={client}>
          <Switch>
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to='/'>
                  <img style={{ width: 300, display: 'block', margin: 'auto' }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SpaceX-Logo.svg/1280px-SpaceX-Logo.svg.png' alt='Logo' />
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="true" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <Link to='/' className="nav-link">
                        Launches<span className="sr-only">(current)</span>
                      </Link>
                    </li>
                    <li className="nav-item active">
                      <Link to='/' className="nav-link">
                        Launch
                      </Link>
                    </li>
                  </ul>
                  <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={(e) => { this.setState({ search: e.target.value }) }} />
                    <Link to={`/launch/${this.state.search}`}><button className="btn btn-secondary my-2 my-sm-0" type="submit">
                      Search
                    </button></Link>
                  </form>
                </div>
              </nav>
              {/* <h1>SpaceX</h1> */}
              <Route component={Launches} path='/' exact />
              <Route component={Launch} path='/launch/:search' />
            </div>
          </Switch>
        </ApolloProvider>
      </HashRouter>
    );
  }
}

export default App;

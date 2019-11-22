
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
//HashRouter as
import logo from './logo.svg';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import './pages/FaceDude/FaceDude.scss';
import './components/NavMenu/NavMenu.scss';
import { Provider } from 'react-redux';
import NavMenu from './components/NavMenu/NavMenu';
import Posts from './pages/posts/Posts';
import PostForm from './pages/posts/PostForm';
import FaceDude from './pages/FaceDude/FaceDude';
import Users from './pages/Users/Users';
import { Messages } from './components/messages/Messages';
import store from './redux/store';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <NavMenu />
        <Provider Provider store={store}>
        
          <div className="app-body">
              <Route exact path="/" component={FaceDude} />
              <Route path="/redux" component={ReduxSection} />
              <Route path="/users" component={Users} />
          </div>
          
        </Provider>
      </div>
    </Router>
    );
  }
}

class ReduxSection extends Component {

  constructor(props) {
    super(props);
    this.showError = this.showError.bind(this);
  }

  showError(title,msg) {
    this.messages.show({closable:false, severity: 'error', summary: title, detail: msg});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />    
        </header>
        <div className="post-data">
          <Messages ref={(el) => this.messages = el}></Messages>
          <PostForm />
          <Posts onError={this.showError}/>
        </div>
        
      </div>
    );
  }
}

export default App;

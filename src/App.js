import React, { Component, createRef } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Link } from 'react-router-dom';
import {
  Menu,
  Icon,
  Header,
  Image
} from 'semantic-ui-react';
import store, { history } from './store';
import HomePage from './screens/Home';
import WishlistPage from './screens/WishList';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
  whyDidYouRender(React);
}

export default class App extends Component {
  contextRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      activeTitle: 'Search',
    };
  }

  handleItemClick = (e, { name, title }) => this.setState({
    activeItem: name,
    activeTitle: title,
  })

  render() {
    const { activeItem, activeTitle } = this.state;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Menu pointing>
              <Menu.Item as={Link} to="/" name="home" title="Search" active={activeItem === 'home'} onClick={this.handleItemClick}>
                <Icon color="blue" name="search" />
                Search
              </Menu.Item>
              <Menu.Item as={Link} to="/wishlist" name="wishlist" title="Wish List" active={activeItem === 'wishlist'} onClick={this.handleItemClick}>
                <Icon color="red" name="heart" />
                Wish List
              </Menu.Item>
            </Menu>
            <div className="headerContainer">
              <Image src="https://openlibrary.org/static/images/openlibrary-logo-tighter.svg" size="small" floated="right" />
              <Header as="h1">{activeTitle}</Header>
            </div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/search" component={HomePage} />
            <Route exact path="/search/:rType/:rQuery/:rPage" component={HomePage} />
            <Route exact path="/wishlist" component={WishlistPage} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

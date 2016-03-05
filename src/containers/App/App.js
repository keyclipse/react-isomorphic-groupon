import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { InfoBar } from 'components';
import { routeActions } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from 'theme/material-ui.config';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

const menuItems = [
  { text: 'Home', link: '/'},
  { text: 'Widgets', link: '/widgets'},
  { text: 'About', link: '/about'},
  { text: 'Stargazers', link: '/stargazers'}
];

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: routeActions.push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  constructor() {
    super();
    this.handleLeftNavRouter = this.handleLeftNavRouter.bind(this);
    this.handleToggleLeftNav = this.handleToggleLeftNav.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.state = {sidebarOpen: false, sidebarDocked: false};
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(
        MyRawTheme, {
          avatar: {
            borderColor: null,
          },
          userAgent: 'all',
        }),
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    const mql = window.matchMedia('(min-width: 800px)');
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches, sidebarOpen: mql.matches});
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged(mediaQueryList) {
    console.log('Media query changed');
    this.setState({sidebarDocked: mediaQueryList.matches, sidebarOpen: mediaQueryList.matches});
  }

  handleLeftNavRouter(route) {
    // Do DOM Diff refresh
    this.props.pushState(route);
  }

  handleToggleLeftNav() {
    this.setState({sidebarOpen: !this.state.sidebarOpen});
  }

  handleDockedLeftNav() {
    this.setState({sidebarDocked: !this.state.sidebarDocked});
  }

  handleTapMenuItem(link) {
    if (!this.state.sidebarDocked) {
      this.setState({sidebarOpen: false});
    }
    this.props.pushState(link);
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    // const {user} = this.props;
    const styles = require('./App.scss');

    const stylesContent = (extendObj = {}) => {
      let objStyle = {};
      console.log('style content rendered');
      if (this.state.sidebarDocked) {
        objStyle = Object.assign(extendObj, {
          marginLeft: '300px'
        });
      } else {
        objStyle = extendObj;
      }

      console.log(objStyle);

      return objStyle;
    };

    return (
      <div className={styles.app}
           >
        <Helmet {...config.app.head}/>

        <LeftNav
          ref="leftNav"
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          width={300}
          style={{
            zIndex: 1000
          }}
          overlayStyle={{
            zIndex: 999
          }}
        >
          <AppBar title="AppBar"/>
          {menuItems.map((item) =>
            <MenuItem
              onTouchTap={this.handleTapMenuItem.bind(this, item.link)}
              primaryText={item.text}
            />)}
        </LeftNav>

        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleToggleLeftNav}
          style={{
            position: 'fixed',
            zIndex: 1001
          }}
        />

        <div className={styles.appContent + ' container-fluid'} style={stylesContent()}>
          <div className={styles.pageContentWrapper}>
            {this.props.children}
          </div>
          <InfoBar/>
          <div className="well text-center">
            Have questions? Ask for help <a
            href="https://github.com/erikras/react-redux-universal-hot-example/issues"
            target="_blank">on Github</a> or in the <a
            href="https://discord.gg/0ZcbPKXt5bZZb1Ko" target="_blank">#react-redux-universal</a> Discord channel.
          </div>
        </div>
      </div>
    );
  }
}

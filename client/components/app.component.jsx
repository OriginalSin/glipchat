import Browser from 'bowser';
import * as Actions from '../actions/actions';
import {connect} from 'react-redux';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const styles = {
  css: {
    height: 'inherit',
  }
};

export class AppComponent extends React.Component {
  constructor() {
    super(...arguments);

    this.constructor.childContextTypes = {
      muiTheme: React.PropTypes.object,
    };
  }

  componentDidMount() {
    const {mobile, tablet} = Browser;
    if (!this.props.user && !mobile && !tablet) {
      this.props.dispatch(Actions.loginAsGuest());
    }
  }

  componentWillReceiveProps(nextProps) {
    const {mobile, tablet} = Browser;
    if (!nextProps.user && !mobile && !tablet) {
      this.props.dispatch(Actions.loginAsGuest());
    }
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(lightBaseTheme),
    };
  }

  render() {
    return (
      <div style={styles.css}>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = ({
  users: {user}
}) => {
  return {
    user,
  };
};

export default connect(
  mapStateToProps,
)(AppComponent);

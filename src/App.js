import React, { Component, Fragment } from "react";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import { Container } from "reactstrap";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { NotificationContainer } from "react-notifications";
import { logoutUser } from "./store/actions/usersActions";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div>
        <NotificationContainer />
        <header>
          <Toolbar
            page={this.props.user ? "apartment" : "login"}
            user={this.props.user}
            logout={this.props.logoutUser}
          />
        </header>
        <main>
          <Routes user={this.props.user} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

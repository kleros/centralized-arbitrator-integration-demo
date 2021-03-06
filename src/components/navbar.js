import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Identicon from "./identicon.js";
import NotificationItem from "./notification-item";
import PropTypes from "prop-types";
import React from "react";
import Web3 from "../ethereum/web3";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Successful: false,
      email: "",
    };
  }
  componentDidMount(props) {
    $(".notification-control").on("click", () => {
      this.clearNotifications();
    });
  }

  clearNotifications() {
    const { clearNotifications } = this.props;
    clearNotifications();
  }

  onAllNameChange = (e) => {
    console.log(e);
    this.setState({ allName: e.target.value });
  };

  onAllEmailChange = (e) => {
    console.log(e);
    this.setState({ allEmail: e.target.value });
  };

  onEmailChange = (e) => {
    console.log(e);
    this.setState({ email: e.target.value, successful: false });
  };

  onSignup = (email) => async (e) => {
    console.log(e);
    const { wallet, web3 } = this.props;
    const address = web3.utils.toChecksumAddress(wallet);
    const settings = {
      centralizedArbitratorDashboardNotificationSettingDisputes: { BOOL: true },
      email: { S: email },
    };
    const signature = await web3.eth.personal.sign(JSON.stringify(settings), address);

    fetch("https://hgyxlve79a.execute-api.us-east-2.amazonaws.com/production/user-settings", {
      body: JSON.stringify({
        payload: { address, settings, signature },
      }),
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
    }).then((_) => this.setState({ successful: true }));
  };

  render() {
    const { networkType, notifications, wallet } = this.props;

    const { email, successful } = this.state;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="./">
          <span>
            <img alt="" className="d-inline-block align-mid" height="50px" src="brand_white.svg" />
          </span>
        </a>
        <button aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler" data-target="#navbarNav" data-toggle="collapse" type="button">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse pl-5" id="navbarNav">
          <ul className="navbar-nav mr-auto mb-1">
            <li className="nav-item active">
              <a className="nav-link " href="./">
                <small>Centralized Arbitrator Dashboard</small>
                <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <div className="dropdown">
            <button aria-expanded="false" aria-haspopup="true" className="btn btn-secondary" data-toggle="dropdown" id="dropdownMenu2" type="button">
              <FontAwesomeIcon className="navbar-icon" icon="bell" size="2x" />
            </button>
            <span className="badge badge-notify primary">{notifications.length}</span>
            <div aria-labelledby="dropdownMenu2" className="p-2 dropdown-menu dropdown-menu-right notification-control">
              <div className="m-2 row">
                <div className="col text-center">
                  <label>
                    <b>Notifications</b>
                  </label>
                </div>
              </div>
              <hr />
              {notifications && notifications.map((notification) => <NotificationItem key={notification.notification + notification.time} text={notification.notification} time={notification.time} />)}
              {notifications.length === 0 && <div className="text-center">No New Notifications</div>}
            </div>
          </div>
          <div className="mr-4 dropdown">
            <button aria-expanded="false" aria-haspopup="true" className="btn btn-secondary" data-toggle="dropdown" id="dropdownMenu2" type="button">
              <FontAwesomeIcon className="navbar-icon" icon="envelope" size="2x" />
            </button>
            <div aria-labelledby="dropdownMenu2" className="p-4 dropdown-menu dropdown-menu-right email-notification-control">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">E-mail Notifications</label>
                  <input aria-describedby="emailHelp" className="form-control" id="exampleInputEmail1" onChange={this.onEmailChange} placeholder="Enter email" type="email" value={email} />
                  <small className="form-text text-muted" id="emailHelp">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                {!successful && (
                  <button className="btn btn-primary" onClick={this.onSignup(email)} type="button">
                    Signup
                  </button>
                )}
                {successful && (
                  <button className="btn btn-success disabled" type="button">
                    Request Pending
                  </button>
                )}
              </form>
              <div className="tab-content" id="myTabContent">
                <div aria-labelledby="all-contracts-tab" className="tab-pane fade show active" id="profile" role="tabpanel" />
              </div>
            </div>
          </div>
          <div className="align-bottom mx-2 pt-2">
            <Identicon bgColor="#4004A3" className="identicon rounded-circle" color="#009AFF" networkType={networkType} scale={3} seed={wallet} size={10} spotColor="white" />
          </div>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  clearNotifications: PropTypes.func.isRequired,
  networkType: PropTypes.string.isRequired,
  notifications: PropTypes.arrayOf(NotificationItem).isRequired,
  wallet: PropTypes.string.isRequired,
  web3: PropTypes.instanceOf(Web3).isRequired,
};

export default NavBar;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Identicon from "./identicon.js";
import PropTypes from "prop-types";
import React from "react";
import NotificationItem from "./notification-item";
import $ from "jquery";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(props) {
    console.log(props);

    $(".notification-control").on("click", () => {
      console.log(this.props);
      this.props.clearNotifications();
    });

    $(".email-notification-control").on("click", e => {
      e.preventDefault();
      console.log(this.props);
      this.props.clearNotifications();
      console.log("email notifications");
    });
  }

  clearNotifications() {
    this.props.clearNotifications();
  }

  componentDidUpdate() {}

  render() {
    const { wallet } = this.props;
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <a className="navbar-brand" href="./">
            <span>
              <img
                alt=""
                className="d-inline-block align-mid"
                height="30"
                src="kleros-logo.svg"
                width="30"
              />
            </span>{" "}
            <span>
              <img
                alt=""
                className="d-inline-block align-mid"
                height="auto"
                src="Group.svg"
                width="auto"
              />
            </span>
          </a>
          <button
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbarNav"
            data-toggle="collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="./">
                  Centralized Arbitrator Dashboard
                  <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
            <div className="dropdown">
              <button
                aria-expanded="false"
                aria-haspopup="true"
                className="btn btn-secondary"
                data-toggle="dropdown"
                id="dropdownMenu2"
                type="button"
              >
                <FontAwesomeIcon
                  className="navbar-icon"
                  icon="bell"
                  onClick={e => console.log("bell ")}
                />
              </button>
              <div
                aria-labelledby="dropdownMenu2"
                className="p-2 dropdown-menu dropdown-menu-right notification-control"
              >
                <div className="m-2 row">
                  <div className="col text-center">
                    <label>
                      <b>Notifications</b>
                    </label>
                  </div>
                </div>
                <hr />
                {this.props.notifications &&
                  this.props.notifications.map(notification => (
                    <NotificationItem
                      text={notification.notification}
                      time={notification.time}
                    />
                  ))}
                {this.props.notifications.length == 0 && (
                  <div className="text-center">No New Notifications</div>
                )}
              </div>
            </div>
            <div
              className="mx-2 dropdown"
              onClick={e => console.log("dropdown clicked")}
            >
              <button
                aria-expanded="false"
                aria-haspopup="true"
                className="btn btn-secondary"
                data-toggle="dropdown"
                id="dropdownMenu2"
                type="button"
              >
                <FontAwesomeIcon className="navbar-icon" icon="envelope" />
              </button>
              <div
                aria-labelledby="dropdownMenu2"
                className="p-4 dropdown-menu dropdown-menu-right email-notification-control"
                onClick={e => console.log("envelope")}
              >
                <label className="col-md-12 text-center">
                  Register to receive notifications by email
                </label>
                <hr />
                <ul
                  className="nav nav-tabs email-control"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      aria-controls="profile"
                      aria-selected="true"
                      className="nav-link active"
                      data-toggle="tab"
                      href="#profile"
                      id="all-contracts-tab"
                      onClick={e => console.log("sdasdasda")}
                      role="tab"
                    >
                      All Contracts
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      aria-controls="contact"
                      aria-selected="false"
                      className="nav-link"
                      data-toggle="tab"
                      href="#contact"
                      id="current-contract-tab"
                      role="tab"
                    >
                      Current Contract
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    aria-labelledby="all-contracts-tab"
                    className="tab-pane fade show active"
                    id="profile"
                    role="tabpanel"
                  >
                    <br />
                    <label>Registering your email you will be informed:</label>
                    <br />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        id="defaultCheck1"
                        type="checkbox"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                      >
                        When there is a new dispute
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        id="defaultCheck2"
                        type="checkbox"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck2"
                      >
                        When there is a new evidence to an existing dispute
                      </label>
                    </div>
                    <hr />
                    <form>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <input
                            className="form-control"
                            id="inputNameAllContracts"
                            placeholder="Name"
                            type="name"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <input
                            className="form-control"
                            id="inputEmailAllContracts"
                            placeholder="Email"
                            type="email"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-sm-6">
                          <button className="btn" type="submit">
                            Unsubscribe
                          </button>
                        </div>
                        <div className="col-sm-6">
                          <button
                            className="btn btn-primary float-right"
                            type="submit"
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    aria-labelledby="current-contract-tab"
                    className="tab-pane fade"
                    id="contact"
                    role="tabpanel"
                  >
                    <div
                      aria-labelledby="all-contracts-tab"
                      className="tab-pane fade show active"
                      id="profile"
                      role="tabpanel"
                    >
                      <br />
                      <label>
                        Registering your email you will be informed:
                      </label>
                      <br />
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          id="defaultCheck1"
                          type="checkbox"
                          value=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheck1"
                        >
                          When there is a new dispute
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          id="defaultCheck2"
                          type="checkbox"
                          value=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheck2"
                        >
                          When there is a new evidence to an existing dispute
                        </label>
                      </div>
                      <hr />
                      <form>
                        <div className="form-group row">
                          <div className="col-sm-12">
                            <input
                              className="form-control"
                              id="inputEmailCurrentContract"
                              placeholder="Name"
                              type="name"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-12">
                            <input
                              className="form-control"
                              id="inputPasswordCurrentContract"
                              placeholder="Email"
                              type="email"
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <div className="col-sm-6">
                            <button className="btn" type="submit">
                              Unsubscribe
                            </button>
                          </div>
                          <div className="col-sm-6">
                            <button
                              className="btn btn-primary float-right"
                              type="submit"
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="button">
              <Identicon
                bgColor="#4004A3"
                className="identicon"
                color="#009AFF"
                scale={3}
                seed={wallet}
                size={10}
                spotColor="white"
              />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = {
  wallet: PropTypes.string.isRequired
};

export default NavBar;

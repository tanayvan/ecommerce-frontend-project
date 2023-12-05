import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import { Menu as M, X, ChevronDown, ChevronRight } from 'lucide-react'

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: 'black' };
  } else {
    return { color: "gray" };
  }
};

const Menu = ({ history }) => (
  <>
    <div>
      <ul className="ml-12 inline-flex space-x-8 p-10">
        <li className="nav-item">
          <Link
            className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50" to="/">
            <span className="ml-3 text-base font-medium text-gray-900" style={currentTab(history, "/")}>
              Home
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50" to="/cart">
            <span className="ml-3 text-base font-medium text-gray-900" style={currentTab(history, "/cart")}>
              Cart
            </span>
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (

          <li className="nav-item">
            <Link
              className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50" to="/user/dashboard">
              <span className="ml-3 text-base font-medium text-gray-900" style={currentTab(history, "/user/dashboard")}>
                U. Dashboard
              </span>
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50" to="/admin/dashboard">
              <span className="ml-3 text-base font-medium text-gray-900" style={currentTab(history, "/admin/dashboard")}>
                A. Dashboard
              </span>
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50" to="/signup"
              >
                <span className="ml-3 text-base font-medium text-gray-900" style={currentTab(history, "/signup")}>
                  Signup
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50" to="/signin"
              >
                <span className="ml-3 text-base font-medium text-gray-900" style={currentTab(history, "/signin")}>
                  Signin
                </span>
              </Link>
            </li>


          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50" to="/signin"
            >
              <span className="ml-3 text-base font-medium text-gray-900" style={currentTab(history, "/signin")}
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}>
                Signout
              </span>
            </Link>
          </li>

        )}
      </ul>
    </div>


  </>
);

export default withRouter(Menu);

// onClick={() => {
//     signout(() => {
//         history.push("/")
//     })
// }}
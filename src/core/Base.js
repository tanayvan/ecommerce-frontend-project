import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      {/* <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div> */}
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark h-full   py-3 mt-12" >
      {/* <div className="container-fluid  text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn  btn-lg">Contact Us</button>
      </div> */}
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-white">MERN</span> Bootcamp
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
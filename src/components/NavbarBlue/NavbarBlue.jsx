import LogoKampus from "../../Assets/Images/LogoKampus.png";
import "./NavbarBlue.css";
import React from "react";

const NavbarBlue = () => {
  return (
    <>
      <header>
        <div className="header-content">
          <img src={LogoKampus} alt="logo-kampus" />
          <p>Universitas Bengkulu</p>
        </div>
      </header>
    </>
  );
};

export default NavbarBlue;

import LogoKampus from "../../Assets/Images/LogoKampus.png";
import "./NavbarWhite.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavbarWhite = ({ isForm, onDownloadClick, documentName }) => {
  const navigate = useNavigate();

  return (
    <header className="header-white">
      <div className="header-content-white">
        <img src={LogoKampus} alt="logo-kampus" onClick={() => navigate("/")} />
        <p onClick={() => navigate("/")}>Universitas Bengkulu</p>

        {isForm ? (
          <div className="button-layout-upper">
            <button onClick={() => navigate("/")}>Beranda</button>

            {documentName !== "PROJECT FORM" && <button onClick={onDownloadClick}>Unduh</button>}
          </div>
        ) : (
          <div className="button-layout-upper">
            <button onClick={() => navigate("/")}>Beranda</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarWhite;

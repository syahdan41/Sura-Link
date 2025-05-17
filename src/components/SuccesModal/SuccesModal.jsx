import React from "react";
import "./SuccesModal.css"; // Opsional: buat styling modal kalau perlu
import modalSuccesIcon from "../../Assets/Images/modal_icon/modal_succes.png";

const SuccessModal = ({ onClose, docName }) => {
  return (
    <div className="succes-modal-overlay" onClick={onClose}>
      <div className="succes-modal-content-template" onClick={(e) => e.stopPropagation()}>
        <div className="succes-modal-content">
          <img src={modalSuccesIcon} alt="succes-check" />
          <p>
            {docName} <span></span> Berhasil Dibuat
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;

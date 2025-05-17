import React from "react";
import "./FailedModal.css"; // Opsional: buat styling modal kalau perlu
import failedModalIcon from "../../Assets/Images/modal_icon/modal_failed.png";

const FailedModal = ({ onClose, docName }) => {
  return (
    <div className="failed-modal-overlay" onClick={onClose}>
      <div className="failed-modal-content-template" onClick={(e) => e.stopPropagation()}>
        <div className="failed-modal-content">
          <img src={failedModalIcon} alt="failed-check" />
          <p>
            {docName} <span></span> Gagal Dibuat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FailedModal;

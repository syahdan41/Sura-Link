import React from "react";
import backArrow from "../../Assets/Images/modal_icon/back_arrow.png";
import "./ModalTemplate.css";
import ImageBlur from "../../Assets/Images/docblur.png";
import TripleDot from "../../Assets/Images/tripledot.png";
import TemplateSurat from "../../Assets/Json/TemplateSurat.json";
const ModalTemplate = ({ onClose, onSelectCard }) => {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content-template" onClick={(e) => e.stopPropagation()}>
          <div className="title-dokumen">
            <img src={backArrow} alt="back-arrow" onClick={onClose} />
            <h1>Dokumen Baru</h1>
          </div>
          <div className="container-template">
            {TemplateSurat.filter((card) => card.name !== "PROJECT FORM") // Hide default
              .map((card) => (
                <div key={card.id} className="card-project-template" onClick={() => onSelectCard(card.name)}>
                  <img src={ImageBlur} alt="template" />
                  <div className="info-box-project-template">
                    <div className="text-and-option-template">
                      <p>{card.name}</p>
                      <img src={TripleDot} alt="triple dot" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <button onClick={onClose}>Tutup</button>
    </>
  );
};

export default ModalTemplate;

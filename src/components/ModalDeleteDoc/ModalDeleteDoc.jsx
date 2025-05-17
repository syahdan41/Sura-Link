import React, { useEffect, useRef } from "react";
import eraserIcon from "../../Assets/Images/modal_icon/modal_icon4.png";
import "./ModalDeleteDoc.css";

const ModalDeleteDoc = ({ isOpen, onClose, style, card, onDelete }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-body-delete" ref={modalRef} style={style}>
      <button className="content-modal" onClick={() => onDelete(card)}>
        <img src={eraserIcon} alt="delete" />
        HAPUS
      </button>
    </div>
  );
};

export default ModalDeleteDoc;

import React, { useEffect, useRef } from "react";
import "./ModalHistory.css";
import ModalIcon1 from "../../Assets/Images/modal_icon/modal_icon1.png";
import axios from "axios";
import ModalIcon4 from "../../Assets/Images/modal_icon/modal_icon4.png";

const ModalHistory = ({ isOpen, onClose, projectId, onDeleted }) => {
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

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/delete/history?id=${projectId}`);
      onClose(); // tutup modal setelah sukses
      if (onDeleted) {
        onDeleted(); // trigger refresh data di parent (kalau dikasih)
      }
    } catch (error) {
      console.error("Gagal menghapus history:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-body-history" ref={modalRef}>
        <div className="content-modal-history">
          <img src={ModalIcon1} alt="open-file" className="modal-icon-img" />
          <p>Buka History</p>
        </div>

        <div className="content-modal-history" onClick={handleDelete}>
          <img src={ModalIcon4} alt="delete-history" className="modal-icon-img" />
          <p>Hapus History</p>
        </div>
      </div>
    </>
  );
};

export default ModalHistory;

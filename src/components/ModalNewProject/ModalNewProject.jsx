import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ModalNewProject.css";
import InputField from "../InputField/InputField";

const ModalNewProject = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();
  const handleBuatProjectOnClick = () => {
    if (!projectName.trim()) {
      alert("Nama proyek harus diisi!");
      return;
    }

    navigate("/Project", { state: { projectName: projectName.toUpperCase() } });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>Proyek Baru</h1>
        <InputField label="Nama Proyek" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Isi bagian ini" />
        <div className="flex-button">
          <button className="btn-white" onClick={onClose}>
            Batal
          </button>
          <button className="btn-blue" onClick={handleBuatProjectOnClick}>
            Buat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNewProject;

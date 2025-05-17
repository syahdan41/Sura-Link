import { useState } from "react";
import "./ModalDownload.css";
const ModalDownload = ({ onClose, onDownload, documentName }) => {
  const [fileType, setFileType] = useState("word");

  const handleDownload = () => {
    onDownload(fileType);
  };

  return (
    <div className="succes-modal-overlay">
      <div className="modal-download">
        <div className="modal-download-content">
          <label>Jenis File</label>
          <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
            <option value="word">File Word</option>
            <option value="pdf">PDF Standar</option>
          </select>

          <label>Dokumen yang dipilih</label>
          <input className="docname-value" type="text" value={documentName} disabled />

          <div className="modal-buttons">
            <button className="btn-cancel" onClick={onClose}>
              Batal
            </button>
            <button className="btn-download" onClick={handleDownload}>
              Cetak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDownload;

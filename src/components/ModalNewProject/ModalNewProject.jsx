import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ModalNewProject.css";
import InputField from "../InputField/InputField";

const ModalNewProject = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  const formatDateToYMD = () => {
    const d = new Date(); // selalu pakai tanggal sekarang
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleBuatProjectOnClick = async () => {
    if (!projectName.trim()) {
      alert("Nama proyek harus diisi!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/projects/create`,
        {
          project_name: projectName || "",

          nomor_berita_acara_pemeriksaan_pekerjaan: null,
          tanggal_berita_acara_pemeriksaan_pekerjaan: formatDateToYMD(),
          tanggal_berita_acara_pemeriksaan_pekerjaan_huruf: null,
          nomor_surat_penunjukan_penyedia_barang_jasa_sppbj: null,
          tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj: formatDateToYMD(),
          tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj_huruf: null,
          nomor_surat_perjanjian_kontrak: null,
          tanggal_surat_perjanjian_kontrak: formatDateToYMD(),

          nama_pihak_1: null,
          nip_pihak_1: null,
          email_pihak_1: null,
          pangkat_golongan_ruang_pihak_1: null,
          jabatan_pihak_1: null,
          perusahaan_pihak_1: null,
          alamat_pihak_1: null,
          deskripsi_ttd_pihak_1: null,
          nomor_kontak_pihak_1: null,
          nama_pihak_2: null,
          alamat_pihak_2: null,
          email_pihak_2: null,
          perusahaan_pihak_2: null,
          jabatan_pihak_2: null,
          nama_bank_pihak_2: null,
          nomor_rekening_pihak_2: null,
          npwp_pihak_2: null,
          nip_pihak_2: null,
          deskripsi_ttd_pihak_2: null,
          nomor_akta_notaris_pihak_2: null,
          tanggal_nomor_akta_notaris_pihak_2: formatDateToYMD(),
          nomor_kontak_pihak_2: null,
          lokasi_pekerjaan: null,
          pekerjaan: null,
          nominal_pembayaran_angka: null,
          nominal_pembayaran_huruf: null,
          tempat_ttd: null,
          ruang_lingkup_pekerjaan: null,
          denda_akibat_keterlambatan: null,
          nama_notaris_pihak_2: null,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Berhasil:", response.data);
      const currentTimestamp = new Date().toISOString();

      const responseHistory = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
        {
          table_name: "projects",
          record_id: 1,
          action_type: "CREATE",
          timestamp: currentTimestamp,
          project_id: response.data.id,
          project_name: projectName || "",
          description: "Create project details",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Berhasil:", responseHistory.data);
      navigate("/Project", { state: { projectName: projectName.toUpperCase(), projectId: response.data.id } });
      alert("✅ Project berhasil dibuat");
    } catch (error) {
      console.error("❌ Gagal:", error);
      console.log("📦 Detail error dari API:", error.response?.data);
      alert("❌ Project Gagal dibuat");
    }
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

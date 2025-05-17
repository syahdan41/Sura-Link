import DatePicker from "react-datepicker";
import React, { useState } from "react";

import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import axios from "axios";
import "./ProjectForm.css";
import "react-datepicker/dist/react-datepicker.css";

const ProjectForm = ({ formDataProjectDetail, setFormDataProjectDetail, errors, setErrors, ProjectName, projectId }) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

  // Handle perubahan input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormDataProjectDetail((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Hapus error saat user mulai mengisi
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Field harus diisi",
      }));
    }
  };

  const handleDateBlur = (event) => {
    const { name, value } = event.target;
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Field harus diisi",
      }));
    }
  };

  const handleDateChange = (fieldName, date) => {
    setFormDataProjectDetail((prevData) => ({
      ...prevData,
      [fieldName]: date, // Hanya update field yang sesuai
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "", // Hapus error khusus untuk field yang diedit
    }));
  };

  // Handle ketika input diklik (onFocus)
  // const handleFocus = (name) => {
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: "",
  //   }));
  // };

  const validateForm = () => {
    let newErrors = {};
    const mandatoryFieldsProjectDetail = [
      "nomor_berita_acara_pemeriksaan_pekerjaan",
      "tanggal_berita_acara_pemeriksaan_pekerjaan",
      "tanggal_bap_pekerjaan_terbilang",
      "nomorSuratSPPBJ",
      "tanggal_surat_penunjukan_SPPBJ",
      "tanggal_surat_penunjukan_SPPBJ_terbilang",
      "nomor_surat_perjanjian_kontrak",
      "tanggal_surat_perjanjian_kontrak",

      "nama_pihak_1",
      "nip_pihak_1",
      "jabatan_pihak_1",
      "perusahaan_pihak_1",
      "alamat_pihak_1",
      "desc_ttd_pihak_1",
      "nama_pihak_2",
      "alamat_pihak_2",
      "perusahaan_pihak_2",
      "jabatan_pihak_2",
      "nama_bank_pihak_2",
      "nomor_rekening_pihak_2",
      "npwp_pihak_2",
      "desc_ttd_pihak_2",
      "nomor_akta_notaris_pihak_2",
      "tanggal_nomor_akta_notaris",
      "nama_notaris_pihak_2",
      "lokasi_pekerjaan",
      "pekerjaan",
      "tempat_ttd",
      "nominal_pembayaran",
      "nominal_pembayaran_terbilang",
      "ruang_lingkup_pekerjaan",
      "denda_akibat_keterlambatan",
    ];

    mandatoryFieldsProjectDetail.forEach((field) => {
      if (!formDataProjectDetail[field]) {
        newErrors[field] = "Field ini harus diisi!";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const formatDateToYMD = (date) => {
    if (!date || isNaN(new Date(date))) return null; // bisa juga return "" tergantung backend
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const maskCurrency = (value) => {
    const raw = Number(String(value).replace(/[^\d]/g, ""));
    const masked = raw ? `Rp ${new Intl.NumberFormat("id-ID").format(raw)}` : "";
    return { raw, masked };
  };

  const handleSubmitOnClick = async (e) => {
    e.preventDefault(); // Mencegah default event
    e.stopPropagation(); // Mencegah event bubbling
    if (projectId) {
      // ID ADA → bisa dipakai untuk update, fetch by ID, dll
      console.log("🟢 handleSubmitOnClick update dijalankan");
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/projects/${projectId}`,
          {
            project_name: ProjectName || null,

            nomor_berita_acara_pemeriksaan_pekerjaan: formDataProjectDetail.nomor_berita_acara_pemeriksaan_pekerjaan || null,
            tanggal_berita_acara_pemeriksaan_pekerjaan: formatDateToYMD(formDataProjectDetail.tanggal_berita_acara_pemeriksaan_pekerjaan) || null, // Format YYYY-MM-DD
            tanggal_berita_acara_pemeriksaan_pekerjaan_huruf: formDataProjectDetail.tanggal_bap_pekerjaan_terbilang || null,
            nomor_surat_penunjukan_penyedia_barang_jasa_sppbj: formDataProjectDetail.nomorSuratSPPBJ || null,
            tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj: formatDateToYMD(formDataProjectDetail.tanggal_surat_penunjukan_SPPBJ) || null, // Format YYYY-MM-DD
            tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj_huruf: formDataProjectDetail.tanggal_surat_penunjukan_SPPBJ_terbilang || null,
            nomor_surat_perjanjian_kontrak: formDataProjectDetail.nomor_surat_perjanjian_kontrak || null,
            tanggal_surat_perjanjian_kontrak: formatDateToYMD(formDataProjectDetail.tanggal_surat_perjanjian_kontrak) || null, // Format YYYY-MM-DD

            nama_pihak_1: formDataProjectDetail.nama_pihak_1 || null,
            nip_pihak_1: formDataProjectDetail.nip_pihak_1 || null,
            email_pihak_1: formDataProjectDetail.email_pihak_1 || null,
            pangkat_golongan_ruang_pihak_1: formDataProjectDetail.pangkat_pihak_1 || null,
            jabatan_pihak_1: formDataProjectDetail.jabatan_pihak_1 || null,
            perusahaan_pihak_1: formDataProjectDetail.perusahaan_pihak_1 || null,
            alamat_pihak_1: formDataProjectDetail.alamat_pihak_1 || null,
            deskripsi_ttd_pihak_1: formDataProjectDetail.desc_ttd_pihak_1 || null,
            nomor_kontak_pihak_1: formDataProjectDetail.nomor_kontak_pihak_1 || null,
            nama_pihak_2: formDataProjectDetail.nama_pihak_2 || null,
            alamat_pihak_2: formDataProjectDetail.alamat_pihak_2 || null,
            email_pihak_2: formDataProjectDetail.email_pihak_2 || null,
            perusahaan_pihak_2: formDataProjectDetail.perusahaan_pihak_2 || null,
            jabatan_pihak_2: formDataProjectDetail.jabatan_pihak_2 || null,
            nama_bank_pihak_2: formDataProjectDetail.nama_bank_pihak_2 || null,
            nomor_rekening_pihak_2: formDataProjectDetail.nomor_rekening_pihak_2 || null,
            npwp_pihak_2: formDataProjectDetail.npwp_pihak_2 || null,
            nip_pihak_2: formDataProjectDetail.nip_pihak_2 || null,
            deskripsi_ttd_pihak_2: formDataProjectDetail.desc_ttd_pihak_2 || null,
            nomor_akta_notaris_pihak_2: formDataProjectDetail.nomor_akta_notaris_pihak_2 || null,
            tanggal_nomor_akta_notaris_pihak_2: formatDateToYMD(formDataProjectDetail.tanggal_nomor_akta_notaris) || null, // Format YYYY-MM-DD
            nomor_kontak_pihak_2: formDataProjectDetail.nomor_kontak_pihak_2 || null,
            lokasi_pekerjaan: formDataProjectDetail.lokasi_pekerjaan || null,
            pekerjaan: formDataProjectDetail.pekerjaan || null,
            nominal_pembayaran_angka: formDataProjectDetail.nominal_pembayaran?.raw || 0 || null,
            nominal_pembayaran_huruf: formDataProjectDetail.nominal_pembayaran_terbilang || null,
            tempat_ttd: formDataProjectDetail.tempat_ttd || null,
            ruang_lingkup_pekerjaan: formDataProjectDetail.ruang_lingkup_pekerjaan || null,
            denda_akibat_keterlambatan: formDataProjectDetail.denda_akibat_keterlambatan?.raw || 0 || null,
            nama_notaris_pihak_2: formDataProjectDetail.nama_notaris_pihak_2 || null,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("✅ Berhasil:", response.data);
        console.log("Payload yang dikirim:", { tanggal_surat_bap: formatDateToYMD(formDataProjectDetail.tanggalSuratBAP) });
        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error("❌ Gagal:", error);
        setIsFailedModalOpen(true);
        console.log("📦 Detail error dari API:", error.response?.data);
      }
    } else {
      // ID GAK ADA → mode create
      console.log("🟢 handleSubmitOnClick Create dijalankan");
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/projects/create`,
          {
            project_name: ProjectName || null,

            nomor_berita_acara_pemeriksaan_pekerjaan: formDataProjectDetail.nomor_berita_acara_pemeriksaan_pekerjaan || null,
            tanggal_berita_acara_pemeriksaan_pekerjaan: formatDateToYMD(formDataProjectDetail.tanggal_berita_acara_pemeriksaan_pekerjaan) || null, // Format YYYY-MM-DD
            tanggal_berita_acara_pemeriksaan_pekerjaan_huruf: formDataProjectDetail.tanggal_bap_pekerjaan_terbilang || null,
            nomor_surat_penunjukan_penyedia_barang_jasa_sppbj: formDataProjectDetail.nomorSuratSPPBJ || null,
            tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj: formatDateToYMD(formDataProjectDetail.tanggal_surat_penunjukan_SPPBJ) || null, // Format YYYY-MM-DD
            tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj_huruf: formDataProjectDetail.tanggal_surat_penunjukan_SPPBJ_terbilang || null,
            nomor_surat_perjanjian_kontrak: formDataProjectDetail.nomor_surat_perjanjian_kontrak || null,
            tanggal_surat_perjanjian_kontrak: formatDateToYMD(formDataProjectDetail.tanggal_surat_perjanjian_kontrak) || null, // Format YYYY-MM-DD

            nama_pihak_1: formDataProjectDetail.nama_pihak_1 || null,
            nip_pihak_1: formDataProjectDetail.nip_pihak_1 || null,
            email_pihak_1: formDataProjectDetail.email_pihak_1 || null,
            pangkat_golongan_ruang_pihak_1: formDataProjectDetail.pangkat_pihak_1 || null,
            jabatan_pihak_1: formDataProjectDetail.jabatan_pihak_1 || null,
            perusahaan_pihak_1: formDataProjectDetail.perusahaan_pihak_1 || null,
            alamat_pihak_1: formDataProjectDetail.alamat_pihak_1 || null,
            deskripsi_ttd_pihak_1: formDataProjectDetail.desc_ttd_pihak_1 || null,
            nomor_kontak_pihak_1: formDataProjectDetail.nomor_kontak_pihak_1 || null,
            nama_pihak_2: formDataProjectDetail.nama_pihak_2 || null,
            alamat_pihak_2: formDataProjectDetail.alamat_pihak_2 || null,
            email_pihak_2: formDataProjectDetail.email_pihak_2 || null,
            perusahaan_pihak_2: formDataProjectDetail.perusahaan_pihak_2 || null,
            jabatan_pihak_2: formDataProjectDetail.jabatan_pihak_2 || null,
            nama_bank_pihak_2: formDataProjectDetail.nama_bank_pihak_2 || null,
            nomor_rekening_pihak_2: formDataProjectDetail.nomor_rekening_pihak_2 || null,
            npwp_pihak_2: formDataProjectDetail.npwp_pihak_2 || null,
            nip_pihak_2: formDataProjectDetail.nip_pihak_2 || null,
            deskripsi_ttd_pihak_2: formDataProjectDetail.desc_ttd_pihak_2 || null,
            nomor_akta_notaris_pihak_2: formDataProjectDetail.nomor_akta_notaris_pihak_2 || null,
            tanggal_nomor_akta_notaris_pihak_2: formatDateToYMD(formDataProjectDetail.tanggal_nomor_akta_notaris) || null, // Format YYYY-MM-DD
            nomor_kontak_pihak_2: formDataProjectDetail.nomor_kontak_pihak_2 || null,
            lokasi_pekerjaan: formDataProjectDetail.lokasi_pekerjaan || null,
            pekerjaan: formDataProjectDetail.pekerjaan || null,
            nominal_pembayaran_angka: formDataProjectDetail.nominal_pembayaran?.raw || null,
            nominal_pembayaran_huruf: formDataProjectDetail.nominal_pembayaran_terbilang || null,
            tempat_ttd: formDataProjectDetail.tempat_ttd || null,
            ruang_lingkup_pekerjaan: formDataProjectDetail.ruang_lingkup_pekerjaan || null,
            denda_akibat_keterlambatan: formDataProjectDetail.denda_akibat_keterlambatan?.raw || null,
            nama_notaris_pihak_2: formDataProjectDetail.nama_notaris_pihak_2 || null,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("✅ Berhasil:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error("❌ Gagal:", error);
        console.log("📦 Detail error dari API:", error.response?.data);
        console.log("Payload yang dikirim:", { tanggal_surat_bap: formatDateToYMD(formDataProjectDetail.tanggalSuratBAP) });
        setIsFailedModalOpen(true);
      }
    }

    // if (validateForm()) {
    //   console.log("✅ Form valid! Lanjut submit...");

    // } else {
    //   console.log("❌ Form ada error!");
    // }
  };

  return (
    // TO DO nomor surat BAP, Tanggal, Tanggal terbilang udh gk dari project detail lagi karena tiap termin dan tahap itu beda
    <>
      <div className="form-container">
        <div className="position-absolute">
          {" "}
          {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"Project Form"} />}
          {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"Project Form"} />}
        </div>

        <div className="input-container-form">
          <label className="input-label-form">Nomor Berita Acara Pemeriksaan Pekerjaan</label>
          <input
            type="text"
            name="nomor_berita_acara_pemeriksaan_pekerjaan"
            className={errors.nomor_berita_acara_pemeriksaan_pekerjaan ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.nomor_berita_acara_pemeriksaan_pekerjaan}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("nomor_berita_acara_pemeriksaan_pekerjaan")}
            // onBlur={handleBlur}
          />
          {errors.nomor_berita_acara_pemeriksaan_pekerjaan && <p className="error-text">{errors.nomor_berita_acara_pemeriksaan_pekerjaan}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Tanggal Berita Acara Pemeriksaan Pekerjaan</label>
          <DatePicker
            selected={formDataProjectDetail.tanggal_berita_acara_pemeriksaan_pekerjaan}
            name="tanggal_berita_acara_pemeriksaan_pekerjaan"
            onChange={(date) => handleDateChange("tanggal_berita_acara_pemeriksaan_pekerjaan", date)}
            // onFocus={() => handleFocus("tanggal_berita_acara_pemeriksaan_pekerjaan")}
            // onBlur={handleDateBlur}
            className={errors.tanggal_berita_acara_pemeriksaan_pekerjaan ? "input-field-form-date-error" : "input-field-form-date"}
            dateFormat="dd/MM/yyyy"
            placeholderText="Isi bagian ini"
          />
          {errors.tanggal_berita_acara_pemeriksaan_pekerjaan && <p className="error-text">{errors.tanggal_berita_acara_pemeriksaan_pekerjaan}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Tanggal Berita Acara Pemeriksaan Pekerjaan (Terbilang)</label>
          <input
            type="text"
            name="tanggal_bap_pekerjaan_terbilang"
            className={errors.tanggal_bap_pekerjaan_terbilang ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.tanggal_bap_pekerjaan_terbilang}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("tanggal_bap_pekerjaan_terbilang")}
            // onBlur={handleBlur}
          />
          {errors.tanggal_bap_pekerjaan_terbilang && <span className="error-text">{errors.tanggal_bap_pekerjaan_terbilang}</span>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Nomor SURAT PENUNJUKAN PENYEDIA BARANG/JASA (SPPBJ)</label>
          <input
            type="text"
            name="nomorSuratSPPBJ"
            className={errors.nomorSuratSPPBJ ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.nomorSuratSPPBJ}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("nomorSuratSPPBJ")}
            // onBlur={handleBlur}
          />
          {errors.nomorSuratSPPBJ && <span className="error-text">{errors.nomorSuratSPPBJ}</span>}
        </div>

        <div className="input-container-form">
          <label className="input-label-form">Tanggal SURAT PENUNJUKAN PENYEDIA BARANG/JASA (SPPBJ)</label>
          <DatePicker
            selected={formDataProjectDetail.tanggal_surat_penunjukan_SPPBJ}
            name="tanggal_surat_penunjukan_SPPBJ"
            onChange={(date) => handleDateChange("tanggal_surat_penunjukan_SPPBJ", date)}
            // onFocus={() => handleFocus("tanggal_surat_penunjukan_SPPBJ")}
            // onBlur={handleDateBlur}
            className={errors.tanggal_surat_penunjukan_SPPBJ ? "input-field-form-date-error" : "input-field-form-date"}
            dateFormat="dd/MM/yyyy"
            placeholderText="Isi bagian ini"
          />
          {errors.tanggal_surat_penunjukan_SPPBJ && <p className="error-text">{errors.tanggal_surat_penunjukan_SPPBJ}</p>}
        </div>

        <div className="input-container-form">
          <label className="input-label-form">Tanggal SURAT PENUNJUKAN PENYEDIA BARANG/JASA (SPPBJ) (Terbilang)</label>
          <input
            type="text"
            name="tanggal_surat_penunjukan_SPPBJ_terbilang"
            className={errors.tanggal_surat_penunjukan_SPPBJ_terbilang ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.tanggal_surat_penunjukan_SPPBJ_terbilang}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("tanggal_surat_penunjukan_SPPBJ_terbilang")}
            // onBlur={handleBlur}
          />
          {errors.tanggal_surat_penunjukan_SPPBJ_terbilang && <p className="error-text">{errors.tanggal_surat_penunjukan_SPPBJ_terbilang}</p>}
        </div>

        <div className="input-container-form">
          <label className="input-label-form">Nomor SURAT PERJANJIAN/KONTRAK</label>
          <input
            type="text"
            name="nomor_surat_perjanjian_kontrak"
            className={errors.nomor_surat_perjanjian_kontrak ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.nomor_surat_perjanjian_kontrak}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("nomor_surat_perjanjian_kontrak")}
            // onBlur={handleBlur}
          />
          {errors.nomor_surat_perjanjian_kontrak && <p className="error-text">{errors.nomor_surat_perjanjian_kontrak}</p>}
        </div>

        <div className="input-container-form">
          <label className="input-label-form">Tanggal SURAT PERJANJIAN/KONTRAK</label>
          <DatePicker
            selected={formDataProjectDetail.tanggal_surat_perjanjian_kontrak}
            name="tanggal_surat_perjanjian_kontrak"
            onChange={(date) => handleDateChange("tanggal_surat_perjanjian_kontrak", date)}
            // onFocus={() => handleFocus("tanggal_surat_perjanjian_kontrak")}
            // onBlur={handleDateBlur}
            className={errors.tanggal_surat_perjanjian_kontrak ? "input-field-form-date-error" : "input-field-form-date"}
            dateFormat="dd/MM/yyyy"
            placeholderText="Isi bagian ini"
          />
          {errors.tanggal_surat_perjanjian_kontrak && <p className="error-text">{errors.tanggal_surat_perjanjian_kontrak}</p>}
        </div>

        <div className="input-container-form">
          <label className="input-label-form">Nama Pihak 1</label>
          <input
            type="text"
            name="nama_pihak_1"
            className={errors.nama_pihak_1 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.nama_pihak_1}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("nama_pihak_1")}
            // onBlur={handleBlur}
          />
          {errors.nama_pihak_1 && <p className="error-text">{errors.nama_pihak_1}</p>}
        </div>

        <div className="input-container-form">
          <label className="input-label-form">NIP Pihak 1</label>
          <input
            type="text"
            name="nip_pihak_1"
            className={errors.nip_pihak_1 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.nip_pihak_1}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("nip_pihak_1")}
            // // onBlur={handleBlur}
          />
          {errors.nip_pihak_1 && <p className="error-text">{errors.nip_pihak_1}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Email (Pihak 1) (Opsional)</label>
          <input type="text" name="email_pihak_1" className="input-field-form" value={formDataProjectDetail.email_pihak_1} placeholder="Isi bagian ini" onChange={handleChange} />
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Pangkat/Golongan Ruang (Pihak 1) (opsional)</label>
          <input type="text" name="pangkat_pihak_1" className="input-field-form" value={formDataProjectDetail.pangkat_pihak_1} placeholder="Isi bagian ini" onChange={handleChange} />
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Jabatan (Pihak 1)</label>
          <input
            type="text"
            name="jabatan_pihak_1"
            className={errors.jabatan_pihak_1 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.jabatan_pihak_1}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("jabatan_pihak_1")}
            // onBlur={handleBlur}
          />
          {errors.jabatan_pihak_1 && <p className="error-text">{errors.jabatan_pihak_1}</p>}
        </div>

        <div className="input-container-form">
          <label className="input-label-form">Perusahaan (Pihak 1)</label>
          <input
            type="text"
            name="perusahaan_pihak_1"
            className={errors.perusahaan_pihak_1 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.perusahaan_pihak_1}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("perusahaan_pihak_1")}
            // onBlur={handleBlur}
          />
          {errors.perusahaan_pihak_1 && <p className="error-text">{errors.perusahaan_pihak_1}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Alamat (Pihak 1)</label>
          <input
            type="text"
            name="alamat_pihak_1"
            className={errors.alamat_pihak_1 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.alamat_pihak_1}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("alamat_pihak_1")}
            // onBlur={handleBlur}
          />
          {errors.alamat_pihak_1 && <p className="error-text">{errors.alamat_pihak_1}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Deskripsi TTD (Pihak 1)</label>
          <input
            type="text"
            name="desc_ttd_pihak_1"
            className={errors.desc_ttd_pihak_1 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.desc_ttd_pihak_1}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("desc_ttd_pihak_1")}
            // onBlur={handleBlur}
          />
          {errors.desc_ttd_pihak_1 && <p className="error-text">{errors.desc_ttd_pihak_1}</p>}
        </div>

        <div className="input-container-form">
          <label className="input-label-form">Nomor Kontak (Pihak 1) (Opsional)</label>
          <input type="text" name="nomor_kontak_pihak_1" className="input-field-form" value={formDataProjectDetail.nomor_kontak_pihak_1} placeholder="Isi bagian ini" onChange={handleChange} />
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Nama (Pihak 2)</label>
          <input
            type="text"
            name="nama_pihak_2"
            className={errors.nama_pihak_2 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.nama_pihak_2}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("nama_pihak_2")}
            // onBlur={handleBlur}
          />
          {errors.nama_pihak_2 && <p className="error-text">{errors.nama_pihak_2}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Alamat (Pihak 2)</label>
          <input
            type="text"
            name="alamat_pihak_2"
            className={errors.alamat_pihak_2 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.alamat_pihak_2}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("alamat_pihak_2")}
            // onBlur={handleBlur}
          />
          {errors.alamat_pihak_2 && <p className="error-text">{errors.alamat_pihak_2}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Email (Pihak 2) (Opsional)</label>
          <input type="text" name="email_pihak_2" className="input-field-form" value={formDataProjectDetail.email_pihak_2} placeholder="Isi bagian ini" onChange={handleChange} />
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Perusahaan (Pihak 2)</label>
          <input
            type="text"
            name="perusahaan_pihak_2"
            className={errors.perusahaan_pihak_2 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.perusahaan_pihak_2}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("perusahaan_pihak_2")}
            // onBlur={handleBlur}
          />
          {errors.perusahaan_pihak_2 && <p className="error-text">{errors.perusahaan_pihak_2}</p>}
        </div>

        <div className="input-container-form">
          <label className="input-label-form">Jabatan (Pihak 2)</label>
          <input
            type="text"
            name="jabatan_pihak_2"
            className={errors.jabatan_pihak_2 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.jabatan_pihak_2}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("jabatan_pihak_2")}
            // onBlur={handleBlur}
          />
          {errors.jabatan_pihak_2 && <p className="error-text">{errors.jabatan_pihak_2}</p>}
        </div>

        <div className="input-container-form">
          <label className="input-label-form">Nama Bank (Pihak 2)</label>
          <input
            type="text"
            name="nama_bank_pihak_2"
            className={errors.nama_bank_pihak_2 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.nama_bank_pihak_2}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("nama_bank_pihak_2")}
            // onBlur={handleBlur}
          />
          {errors.nama_bank_pihak_2 && <p className="error-text">{errors.nama_bank_pihak_2}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Nomor Rekening (Pihak 2)</label>
          <input
            type="text"
            name="nomor_rekening_pihak_2"
            className={errors.nomor_rekening_pihak_2 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.nomor_rekening_pihak_2}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("nomor_rekening_pihak_2")}
            // onBlur={handleBlur}
          />
          {errors.nomor_rekening_pihak_2 && <p className="error-text">{errors.nomor_rekening_pihak_2}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">NPWP (Pihak 2)</label>
          <input
            type="text"
            name="npwp_pihak_2"
            className={errors.npwp_pihak_2 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.npwp_pihak_2}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("npwp_pihak_2")}
            // onBlur={handleBlur}
          />
          {errors.npwp_pihak_2 && <p className="error-text">{errors.npwp_pihak_2}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">NIP (Pihak 2) (Opsional)</label>
          <input type="text" name="nip_pihak_2" className="input-field-form" value={formDataProjectDetail.nip_pihak_2} placeholder="Isi bagian ini" onChange={handleChange} />
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Deskripsi TTD (Pihak 2)</label>
          <input
            type="text"
            name="desc_ttd_pihak_2"
            className={errors.desc_ttd_pihak_2 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.desc_ttd_pihak_2}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("desc_ttd_pihak_2")}
            // onBlur={handleBlur}
          />
          {errors.desc_ttd_pihak_2 && <p className="error-text">{errors.desc_ttd_pihak_2}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Nomor Akta Notaris (Pihak 2)</label>
          <input
            type="text"
            name="nomor_akta_notaris_pihak_2"
            className={errors.nomor_akta_notaris_pihak_2 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.nomor_akta_notaris_pihak_2}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("nomor_akta_notaris_pihak_2")}
            // onBlur={handleBlur}
          />
          {errors.nomor_akta_notaris_pihak_2 && <p className="error-text">{errors.nomor_akta_notaris_pihak_2}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Tanggal Nomor Akta Notaris (Pihak 2)</label>
          <DatePicker
            selected={formDataProjectDetail.tanggal_nomor_akta_notaris}
            name="tanggal_nomor_akta_notaris"
            onChange={(date) => handleDateChange("tanggal_nomor_akta_notaris", date)}
            // onFocus={() => handleFocus("tanggal_nomor_akta_notaris")}
            // onBlur={handleDateBlur}
            className={errors.tanggal_nomor_akta_notaris ? "input-field-form-date-error" : "input-field-form-date"}
            dateFormat="dd/MM/yyyy"
            placeholderText="Isi bagian ini"
          />
          {errors.tanggal_nomor_akta_notaris && <p className="error-text">{errors.tanggal_nomor_akta_notaris}</p>}
        </div>

        <div className="input-container-form">
          <label className="input-label-form">Nomor Kontak (Pihak 2) (Opsional)</label>
          <input
            type="text"
            name="nomor_kontak_pihak_2"
            className="input-field-form"
            value={formDataProjectDetail.nomor_kontak_pihak_2}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("tanggalSuratBAPTerbilang")}
            // onBlur={handleBlur}
          />
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Nama Notaris (Pihak 2)</label>
          <input
            type="text"
            name="nama_notaris_pihak_2"
            className={errors.nama_notaris_pihak_2 ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.nama_notaris_pihak_2}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("nama_notaris_pihak_2")}
            // onBlur={handleBlur}
          />
          {errors.nama_notaris_pihak_2 && <p className="error-text">{errors.nama_notaris_pihak_2}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Lokasi Pekerjaan</label>
          <input
            type="text"
            name="lokasi_pekerjaan"
            className={errors.lokasi_pekerjaan ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.lokasi_pekerjaan}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("lokasi_pekerjaan")}
            // onBlur={handleBlur}
          />
          {errors.lokasi_pekerjaan && <p className="error-text">{errors.lokasi_pekerjaan}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Paket Pekerjaan</label>
          <input
            type="text"
            name="pekerjaan"
            className={errors.pekerjaan ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.pekerjaan}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("pekerjaan")}
            // // onBlur={handleBlur}
          />
          {errors.pekerjaan && <p className="error-text">{errors.pekerjaan}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Ruang Lingkup Pekerjaan</label>
          <input
            type="text"
            name="ruang_lingkup_pekerjaan"
            className={errors.ruang_lingkup_pekerjaan ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.ruang_lingkup_pekerjaan}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("ruang_lingkup_pekerjaan")}
            // onBlur={handleBlur}
          />
          {errors.ruang_lingkup_pekerjaan && <p className="error-text">{errors.ruang_lingkup_pekerjaan}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Nominal Pembayaran</label>
          <input
            type="text"
            name="nominal_pembayaran"
            className={errors.nominal_pembayaran ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.nominal_pembayaran?.masked || ""}
            placeholder="Isi bagian ini"
            onChange={(e) => {
              const { value } = e.target;
              const numeric = value.replace(/[^\d]/g, "");
              const raw = parseInt(numeric || "0", 10);
              const masked = `Rp ${new Intl.NumberFormat("id-ID").format(raw)}`;
              setFormDataProjectDetail((prev) => ({
                ...prev,
                nominal_pembayaran: {
                  raw,
                  masked,
                },
              }));
            }}
            // onFocus={() => handleFocus("nominal_pembayaran")}
            // onBlur={handleBlur}
          />
          {errors.nominal_pembayaran && <p className="error-text">{errors.nominal_pembayaran}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Nominal Pembayaran (Terbilang)</label>
          <input
            type="text"
            name="nominal_pembayaran_terbilang"
            className={errors.nominal_pembayaran_terbilang ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.nominal_pembayaran_terbilang}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("nominal_pembayaran_terbilang")}
            // onBlur={handleBlur}
          />
          {errors.nominal_pembayaran_terbilang && <p className="error-text">{errors.nominal_pembayaran_terbilang}</p>}
        </div>
        <div className="input-container-form">
          <label className="input-label-form">Tempat Surat Di Tanda Tangani</label>
          <input
            type="text"
            name="tempat_ttd"
            className={errors.tempat_ttd ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.tempat_ttd}
            placeholder="Isi bagian ini"
            onChange={handleChange}
            // onFocus={() => handleFocus("tempat_ttd")}
            // // onBlur={handleBlur}
          />
          {errors.tempat_ttd && <p className="error-text">{errors.tempat_ttd}</p>}
        </div>

        <div className="input-container-form">
          <label className="input-label-form">Denda akibat Keterlambatan</label>
          <input
            type="text"
            name="denda_akibat_keterlambatan"
            className={errors.denda_akibat_keterlambatan ? "input-field-form-error" : "input-field-form"}
            value={formDataProjectDetail.denda_akibat_keterlambatan?.masked || ""}
            placeholder="Isi bagian ini"
            onChange={(e) => {
              const { value } = e.target;
              const numeric = value.replace(/[^\d]/g, "");
              const raw = parseInt(numeric || "0", 10);
              const masked = `Rp ${new Intl.NumberFormat("id-ID").format(raw)}`;
              setFormDataProjectDetail((prev) => ({
                ...prev,
                denda_akibat_keterlambatan: {
                  raw,
                  masked,
                },
              }));
            }}
            // onFocus={() => handleFocus("denda_akibat_keterlambatan")}
            // onBlur={handleBlur}
          />
          {errors.denda_akibat_keterlambatan && <p className="error-text">{errors.denda_akibat_keterlambatan}</p>}
        </div>
      </div>

      <button className="button-simpan-blue" onClick={handleSubmitOnClick}>
        Simpan
      </button>
    </>
  );
};

export default ProjectForm;

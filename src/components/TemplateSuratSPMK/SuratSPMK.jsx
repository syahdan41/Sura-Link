import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import DatePicker from "react-datepicker";

import SuratSPMKPreview from "./SuratSPMKPreview";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../Spinner/spinner";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import { format } from "date-fns";
import axios from "axios";
import LogoKampusLarge from "../../Assets/Images/image 1.png";
import html2pdf from "html2pdf.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import documentStyleMapping from "../../documentStyles";

const SuratSPMK = ({ documentId, projectDetailData, onCreated, currFileType, projectName }, ref) => {
  const contentRef = useRef(null);
  console.log("document id SPMK :", documentId);
  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomor_spmk: "",
    tanggal_spmk_terbilang: "",
    tanggal_spmk: "",
    ruang_lingkup: "",
    tanggal_awal_kerja: "",
    tanggal_akhir_kerja: "",
    rentang_hari: "",
    rentang_hari_terbilang: "",
    denda_pekerjaan: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (documentId) {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/surat_perintah_mulai_kerja?id=${documentId}`);
          const rawData = response.data;

          setFormData({
            nomor_spmk: rawData.nomor_spmk,
            tanggal_spmk_terbilang: rawData.tanggal_spmk_huruf,
            tanggal_spmk: rawData.tanggal_spmk,
            ruang_lingkup: rawData.ruanglingkup_pekerjaan,
            tanggal_awal_kerja: rawData.tanggal_mulai_kerja,
            tanggal_akhir_kerja: rawData.waktu_penyelesaian,
            rentang_hari: rawData.rentang_hari_pengerjaan,
            rentang_hari_terbilang: rawData.rentang_hari_pengerjaan_huruf,
            denda_pekerjaan: rawData.denda_pengerjaan,
          });
        } else {
          setFormData({
            nomor_spmk: "",
            tanggal_spmk_terbilang: "",
            tanggal_spmk: "",
            ruang_lingkup: "",
            tanggal_awal_kerja: "",
            tanggal_akhir_kerja: "",
            rentang_hari: "",
            rentang_hari_terbilang: "",
            denda_pekerjaan: "",
          });
        }
      } catch (error) {
        console.error("❌ Error fetching BAP TAHAP:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [documentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nilai_penawaran") {
      // Kalau field yang di-masking (rupiah)
      const rawValue = value.replace(/\D/g, ""); // Hapus semua non-angka
      const formattedValue = rawValue ? `Rp ${new Intl.NumberFormat("id-ID").format(parseInt(rawValue, 10))}` : "";

      setFormData((prev) => ({
        ...prev,
        [name]: { raw: rawValue, masked: formattedValue },
      }));
    } else {
      // Kalau field biasa
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Hapus error kalau user mulai ngetik
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleDateChange = (fieldName, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: date, // Hanya update field yang sesuai
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "", // Hapus error khusus untuk field yang diedit
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let trimmedValue = value;

    // Kalau value adalah objek Date, konversi ke string ISO
    if (value instanceof Date) {
      trimmedValue = value.toISOString();
    }

    // Pastikan hanya string yang diproses dengan trim()
    if (typeof trimmedValue === "string" && !trimmedValue.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Field ini harus diisi!",
      }));
    }
  };

  const handleFocus = (e) => {
    // Hapus error saat user mulai mengisi
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmitSPMK = async () => {
    let newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      let value = formData[key]?.raw ?? formData[key] ?? "";

      console.log("Checking key:", key, "| Value:", value);

      if (value instanceof Date) {
        value = value.toISOString();
      }

      if (typeof value === "string" && !value.trim()) {
        console.log("❌ INVALID STRING:", key);
        newErrors[key] = "Field ini harus diisi!";
        isValid = false;
        return;
      }

      if (Array.isArray(value) && value.length === 0) {
        console.log("❌ INVALID ARRAY:", key);
        newErrors[key] = "Field ini harus diisi!";
        isValid = false;
        return;
      }

      if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) {
        console.log("❌ INVALID OBJECT:", key);
        newErrors[key] = "Field ini harus diisi!";
        isValid = false;
        return;
      }
    });
    console.log("apakah valid?", isValid);
    if (!isValid) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    // sesuain api surat SPMK
    if (documentId) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/put/surat_perintah_mulai_kerja?id=${documentId}`,
          {
            project_id: projectDetailData.id,
            nomor_spmk: formData.nomor_spmk,
            tanggal_spmk: formData.tanggal_spmk ? format(formData.tanggal_spmk, "yyyy-MM-dd") : null,
            tanggal_spmk_huruf: formData.tanggal_spmk_terbilang,

            tanggal_mulai_kerja: formData.tanggal_awal_kerja ? format(formData.tanggal_awal_kerja, "yyyy-MM-dd") : null,
            waktu_penyelesaian: formData.tanggal_akhir_kerja ? format(formData.tanggal_akhir_kerja, "yyyy-MM-dd") : null,
            ruanglingkup_pekerjaan: formData.ruang_lingkup,

            rentang_hari_pengerjaan: formData.rentang_hari,
            rentang_hari_pengerjaan_huruf: formData.rentang_hari_terbilang,
            denda_pengerjaan: formData.denda_pekerjaan,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ SPMK berhasil dibuat:", response.data);
        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "surat_perintah_mulai_kerja",
            record_id: 1,
            action_type: "UPDATE",
            timestamp: currentTimestamp,
            project_id: projectDetailData.id,
            project_name: projectName || "",
            description: "Pembaharuan Detil Surat Perintah Mulai Kerja (SPMK)",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("✅ Berhasil:", responseHistory.data);

        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error("❌ Gagal membuat Surat SPMK:", error);
        console.log("📦 Detail error dari API:", error.response?.data);

        setIsFailedModalOpen(true);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/surat_perintah_mulai_kerja`,
          {
            project_id: projectDetailData.id,
            nomor_spmk: formData.nomor_spmk,
            tanggal_spmk: formData.tanggal_spmk ? format(formData.tanggal_spmk, "yyyy-MM-dd") : null,
            tanggal_spmk_huruf: formData.tanggal_spmk_terbilang,

            tanggal_mulai_kerja: formData.tanggal_awal_kerja ? format(formData.tanggal_awal_kerja, "yyyy-MM-dd") : null,
            waktu_penyelesaian: formData.tanggal_akhir_kerja ? format(formData.tanggal_akhir_kerja, "yyyy-MM-dd") : null,
            ruanglingkup_pekerjaan: formData.ruang_lingkup,

            rentang_hari_pengerjaan: formData.rentang_hari,
            rentang_hari_pengerjaan_huruf: formData.rentang_hari_terbilang,
            denda_pengerjaan: formData.denda_pekerjaan,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ Ringkasan Kontrak berhasil dibuat:", response.data);
        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "surat_perintah_mulai_kerja",
            record_id: 1,
            action_type: "CREATE",
            timestamp: currentTimestamp,
            project_id: response.data.id,
            project_name: projectName || "",
            description: "Pembuatan Surat Perintah Mulai Kerja (SPMK)",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("✅ Berhasil:", responseHistory.data);
        setIsSuccessModalOpen(true);
        const newId = response.data?.id;
        if (onCreated && newId) onCreated(newId); // Kirim ke parent
        console.log("✅ Create success:", response.data);
      } catch (error) {
        console.error("❌ Gagal membuat Ringkasan Kontrak:", error);
        console.log("📦 Detail error dari API:", error.response?.data);
        setIsFailedModalOpen(true);
      }
    }
  };

  const ComponentWord = () => {
    return (
      <div style={{ display: "none" }}>
        <div style={{ paddingLeft: "20px" }} ref={contentRef}>
          {currFileType !== "word" && (
            <>
              <div className="surat-header">
                <img src={LogoKampusLarge} alt="logo-kampus" />
                <div className="surat-header-text-bold">
                  KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
                  <br />
                  DAN TEKNOLOGI
                  <br /> UNIVERSITAS BENGKULU
                </div>
              </div>
              <div className="surat-header-text-light">
                Jalan WR. Supratman Kandang Limun Bengkulu 38371 A
                <br />
                Telepon (0736) 21170, 21884 Faksimile (0736) 22105
                <br /> Laman : www.unib.ac.id e-mail : rektorat@unib.ac.id
              </div>

              <hr className="separator-black"></hr>
            </>
          )}
          {currFileType === "word" && (
            <>
              <div className="center-header">
                <table>
                  <tbody>
                    <tr>
                      <td className="surat-header-img">
                        <img src={LogoKampusLarge} alt="logo-kampus" />
                      </td>

                      <td className="surat-header-text-cell">
                        <div className="surat-header-text-bold">
                          KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
                          <br />
                          DAN TEKNOLOGI
                          <br />
                          UNIVERSITAS BENGKULU
                        </div>
                        <div className="surat-header-text-light">
                          Jalan WR. Supratman Kandang Limun Bengkulu 38371 A<br />
                          Telepon (0736) 21170, 21884 Faksimile (0736) 22105
                          <br />
                          Laman : www.unib.ac.id e-mail : rektorat@unib.ac.id
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr className="separator-black"></hr>
            </>
          )}

          {/* SPMK Content  */}

          {currFileType !== "word" && (
            <>
              <div className="tittle-surat-ringkasan-kontrak">SURAT PERINTAH MULAI KERJA (SPMK)</div>
              <div className="spmk-nomor-paket-layout">
                <div>
                  Nomor: <span>{formData.nomor_spmk || "(Nomor Surat SPMK)"}</span>
                </div>
                <div>
                  Paket Pekerjaan: <span>{projectDetailData.pekerjaan || "(Paket Pekerjaan)"}</span>
                </div>
              </div>
              <div className="spmk-justify-text">Yang bertanda tangan di bawah ini:</div>
              <div className="spmk-text-container">
                <div>
                  <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                </div>
                <div>
                  <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                </div>
                <div>
                  <span>{projectDetailData.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
                </div>
              </div>
              <div className="spmk-justify-text">
                selanjutnya disebut sebagai <em>Pejabat Penandatangan Kontrak,</em>{" "}
              </div>
              <div className="spmk-justify-text">
                berdasarkan Surat Perjanjian Paket Pekerjaan <span>{projectDetailData.pekerjaan || "(Paket Pekerjaan)"}</span>, Nomor <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Kontrak)"}</span> tanggal{" "}
                <span>
                  {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                    new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Surat Kontrak)"}
                </span>
                , bersama ini memerintahkan:
              </div>
              <div className="spmk-text-container">
                <div>
                  <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                </div>
                <div>
                  <span>{projectDetailData.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
                </div>
                <div>
                  Yang dalam hal ini diwakili oleh: <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                </div>
              </div>
              <div className="spmk-justify-text">selanjutnya disebut sebagai Penyedia;</div>

              <div className="spmk-container">
                <p className="spmk-intro">untuk segera memulai pelaksanaan pekerjaan dengan memperhatikan ketentuan-ketentuan sebagai berikut:</p>

                <div className="spmk-item">
                  <span className="spmk-label">1. Ruang Lingkup Pekerjaan</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{formData.ruang_lingkup || "(Ruang Lingkup Pekerjaan)"}</span>
                  </span>
                </div>

                <div className="spmk-item">
                  <span className="spmk-label">2. Tanggal Mulai Kerja</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>
                      {(formData.tanggal_awal_kerja &&
                        new Date(formData.tanggal_awal_kerja).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })) ||
                        "(Tanggal Mulai Kerja)"}
                    </span>
                  </span>
                </div>

                <div className="spmk-item">
                  <span className="spmk-label">3. Syarat-Syarat Pekerjaan</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">Sesuai dengan persyaratan dan ketentuan Kontrak</span>
                </div>

                <div className="spmk-item">
                  <span className="spmk-label">4. Waktu Penyelesaian</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    Selama <span>{formData.rentang_hari || "(Rentang Hari Pekerjaan)"}</span> (<span>{formData.rentang_hari_terbilang || "(Rentang Hari Pekerjaan Terbilang)"}</span>) hari kalender dan pekerjaan harus sudah selesai pada
                    tanggal{" "}
                    <span>
                      {(formData.tanggal_akhir_kerja &&
                        new Date(formData.tanggal_akhir_kerja).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })) ||
                        "(Tanggal Akhir Kerja)"}
                      .
                    </span>
                  </span>
                </div>

                <div className="spmk-item">
                  <span className="spmk-label">5. Denda</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{formData.denda_pekerjaan || "(Denda)"}</span>
                  </span>
                </div>
              </div>
              <div className="ttd-spmk-layout">
                <div className="ttd-spmk-text-container">
                  <div>
                    <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                  </div>
                  <div>
                    <span>{projectDetailData.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
                  </div>
                  <div>
                    Yang dalam hal ini diwakili oleh: <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                  </div>
                </div>
                <div className="ttd-spmk-text-container">
                  <div>
                    <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                  </div>
                  <div>
                    <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                  </div>
                  <div>
                    NIP.<span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                  </div>
                </div>
              </div>
              <div className="sec-page-content">
                <div className="spmk-justify-text">
                  <strong>Menerima dan menyetujui:</strong>
                </div>
                <div className="ttd-spmk-layout-lower">
                  <div className="ttd-spmk-text-container">
                    <div>
                      Untuk dan atas nama <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                    </div>
                  </div>
                  <div className="ttd-spmk-text-container">
                    <div>
                      <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                    </div>
                    <div>
                      <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {currFileType === "word" && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Ini bikin kontennya di tengah
                  justifyContent: "center",
                  marginTop: "5px",
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: "16px",
                  color: "#000",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>SURAT PERINTAH MULAI KERJA (SPMK)</div>
                <div style={{ marginTop: "5px" }}>Nomor: {formData.nomor_spmk || "(Nomor Surat SPMK)"}</div>
                <div style={{ marginTop: "5px" }}>Paket Pekerjaan: {projectDetailData.pekerjaan || "(Paket Pekerjaan)"}</div>
              </div>

              <div className="spmk-justify-text">Yang bertanda tangan di bawah ini:</div>
              <div className="spmk-text-container">
                <div>
                  <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                </div>
                <div>
                  <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                </div>
                <div>
                  <span>{projectDetailData.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
                </div>
              </div>
              <div className="spmk-justify-text">
                selanjutnya disebut sebagai <em>Pejabat Penandatangan Kontrak,</em>{" "}
              </div>
              <div className="spmk-justify-text">
                berdasarkan Surat Perjanjian Paket Pekerjaan <span>{projectDetailData.pekerjaan || "(Paket Pekerjaan)"}</span>, Nomor <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Kontrak)"}</span> tanggal{" "}
                <span>
                  {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                    new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Surat Kontrak)"}
                </span>
                , bersama ini memerintahkan:
              </div>
              <div className="spmk-text-container">
                <div>
                  <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                </div>
                <div>
                  <span>{projectDetailData.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
                </div>
                <div>
                  Yang dalam hal ini diwakili oleh: <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                </div>
              </div>
              <div className="spmk-justify-text">selanjutnya disebut sebagai Penyedia;</div>

              <div className="spmk-container">
                <div className="spmk-intro">untuk segera memulai pelaksanaan pekerjaan dengan memperhatikan ketentuan-ketentuan sebagai berikut:</div>
                <div style={{ marginLeft: "30px" }}>
                  <table
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: "16px",
                      color: "#000",
                      borderCollapse: "collapse",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ width: "200px", padding: "2px 10px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>1. Ruang Lingkup Pekerjaan</td>
                        <td style={{ width: "10px", padding: "2px 5px", verticalAlign: "top" }}>:</td>
                        <td style={{ padding: "2px 0", verticalAlign: "top" }}>{formData.ruang_lingkup || "(Ruang Lingkup Pekerjaan)"}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "200px", padding: "2px 10px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>2. Tanggal Mulai Kerja</td>
                        <td style={{ width: "10px", padding: "2px 5px", verticalAlign: "top" }}>:</td>
                        <td style={{ padding: "2px 0", verticalAlign: "top" }}>
                          {(formData.tanggal_awal_kerja &&
                            new Date(formData.tanggal_awal_kerja).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })) ||
                            "(Tanggal Mulai Kerja)"}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "200px", padding: "2px 10px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>3. Syarat-Syarat Pekerjaan</td>
                        <td style={{ width: "10px", padding: "2px 5px", verticalAlign: "top" }}>:</td>
                        <td style={{ padding: "2px 0", verticalAlign: "top" }}>Sesuai dengan persyaratan dan ketentuan Kontrak</td>
                      </tr>
                      <tr>
                        <td style={{ width: "200px", padding: "2px 10px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>4. Waktu Penyelesaian</td>
                        <td style={{ width: "10px", padding: "2px 5px", verticalAlign: "top" }}>:</td>
                        <td style={{ padding: "2px 0", verticalAlign: "top" }}>
                          Selama <span>{formData.rentang_hari || "(Rentang Hari Pekerjaan)"}</span> (<span>{formData.rentang_hari_terbilang || "(Rentang Hari Pekerjaan Terbilang)"}</span>) hari kalender dan pekerjaan harus sudah selesai
                          pada tanggal{" "}
                          <span>
                            {(formData.tanggal_akhir_kerja &&
                              new Date(formData.tanggal_akhir_kerja).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })) ||
                              "(Tanggal Akhir Kerja)"}
                            .
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "200px", padding: "2px 10px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>5. Denda</td>
                        <td style={{ width: "10px", padding: "2px 5px", verticalAlign: "top" }}>:</td>
                        <td style={{ padding: "2px 0", verticalAlign: "top" }}>{formData.denda_pekerjaan || "(Denda)"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="ttd-spmk-layout">
                <div className="ttd-spmk-text-container">
                  <div>
                    <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                  </div>
                  <div>
                    <span>{projectDetailData.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
                  </div>
                  <div>
                    Yang dalam hal ini diwakili oleh: <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                  </div>
                </div>
                <div style={{ marginTop: "100px" }}>
                  <div className="ttd-spmk-text-container">
                    <div>
                      <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                    </div>
                    <div>
                      <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                    </div>
                    <div>
                      NIP.<span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sec-page-content">
                <div className="spmk-justify-text">
                  <strong>Menerima dan menyetujui:</strong>
                </div>
                <div className="ttd-spmk-layout">
                  <div className="ttd-spmk-text-container">
                    <div>
                      Untuk dan atas nama <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                    </div>
                  </div>
                  <div style={{ marginTop: "100px" }}>
                    {" "}
                    <div className="ttd-spmk-text-container">
                      <div>
                        <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                      </div>
                      <div>
                        <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  useImperativeHandle(ref, () => ({
    handleDownload: async (fileType) => {
      console.log("file type download", fileType);

      await new Promise((resolve) => setTimeout(resolve, 0)); // pastikan re-render dulu

      const element = contentRef.current;
      if (!element) return;

      const cloned = element.cloneNode(true);
      const wrapper = document.createElement("div");
      wrapper.appendChild(cloned);

      const htmlContent = wrapper.innerHTML;
      const filename = "surat_perintah_mulai_kerja";

      if (fileType === "word") {
        const style = documentStyleMapping[filename] || "";

        const fullHtml = `
          <html>
            <head>
              <style>${style}</style>
            </head>
            <body>${htmlContent}</body>
          </html>
        `;

        const blob = htmlDocx.asBlob(fullHtml);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${filename}.docx`;
        a.click();
      } else {
        await html2pdf()
          .from(wrapper)
          .set({
            margin: 0.5,
            filename: `${filename}.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          })
          .save();
      }

      setTimeout(() => 1000); // <<=== 3. Reset setelah selesai
    },
  }));

  return (
    <>
      {loading && <Spinner />}
      <div className="main-form-container">
        <div className="form-container">
          <div className="position-absolute">
            {" "}
            {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"Surat SPMK"} />}
            {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"Surat SPMK"} />}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nomor SPMK <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nomor_spmk"
              className={errors.nomor_spmk ? "input-field-form-error" : "input-field-form"}
              value={formData.nomor_spmk}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nomor_spmk && <span className="error-text">{errors.nomor_spmk}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal SPMK <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.tanggal_spmk}
              name="tanggal_spmk"
              onChange={(date) => handleDateChange("tanggal_spmk", date)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={errors.tanggal_spmk ? "input-field-form-date-error" : "input-field-form-date"}
              dateFormat="dd/MM/yyyy"
              placeholderText="Isi bagian ini"
            />
            {errors.tanggal_spmk && <span className="error-text">{errors.tanggal_spmk}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal SPMK Terbilang <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="tanggal_spmk_terbilang"
              className={errors.tanggal_spmk_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.tanggal_spmk_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.tanggal_spmk_terbilang && <span className="error-text">{errors.tanggal_spmk_terbilang}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Ruang Lingkup Pekerjaan <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              type="text"
              name="ruang_lingkup"
              className={errors.ruang_lingkup ? "input-textarea-form-error" : "input-textarea-form"}
              value={formData.ruang_lingkup}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.ruang_lingkup && <span className="error-text">{errors.ruang_lingkup}</span>}
          </div>
          <div className="input-form-flex-gap">
            <div className="input-container-form">
              <label className="input-label-form">
                Tanggal Awal Kerja <span style={{ color: "red" }}>*</span>
              </label>
              <DatePicker
                selected={formData.tanggal_awal_kerja}
                name="tanggal_awal_kerja"
                onChange={(date) => handleDateChange("tanggal_awal_kerja", date)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={errors.tanggal_awal_kerja ? "input-field-form-date-error" : "input-field-form-date"}
                dateFormat="dd/MM/yyyy"
                placeholderText="Isi bagian ini"
              />
              {errors.tanggal_awal_kerja && <span className="error-text">{errors.tanggal_awal_kerja}</span>}
            </div>

            <div className="input-container-form">
              <label className="input-label-form">
                Tanggal Akhir Kerja <span style={{ color: "red" }}>*</span>
              </label>
              <DatePicker
                selected={formData.tanggal_akhir_kerja}
                name="tanggal_akhir_kerja"
                onChange={(date) => handleDateChange("tanggal_akhir_kerja", date)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={errors.tanggal_akhir_kerja ? "input-field-form-date-error" : "input-field-form-date"}
                dateFormat="dd/MM/yyyy"
                placeholderText="Isi bagian ini"
              />
              {errors.tanggal_akhir_kerja && <span className="error-text">{errors.tanggal_akhir_kerja}</span>}
            </div>
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Rentang Hari Pengerjaan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="rentang_hari"
              className={errors.rentang_hari ? "input-field-form-error" : "input-field-form"}
              value={formData.rentang_hari}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.rentang_hari && <span className="error-text">{errors.rentang_hari}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Rentang Hari Pengerjaan Terbilang <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="rentang_hari_terbilang"
              className={errors.rentang_hari_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.rentang_hari_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.rentang_hari_terbilang && <span className="error-text">{errors.rentang_hari_terbilang}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Denda Pengerjaan <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              name="denda_pekerjaan"
              className={errors.denda_pekerjaan ? "input-textarea-form-error" : "input-textarea-form"}
              value={formData.denda_pekerjaan}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.denda_pekerjaan && <span className="error-text">{errors.denda_pekerjaan}</span>}
          </div>
        </div>

        <ComponentWord />
        <SuratSPMKPreview previewFormData={formData} detailProjectData={projectDetailData} />
      </div>

      <button className="button-simpan-blue" onClick={handleSubmitSPMK}>
        Simpan
      </button>
    </>
  );
};

export default forwardRef(SuratSPMK);

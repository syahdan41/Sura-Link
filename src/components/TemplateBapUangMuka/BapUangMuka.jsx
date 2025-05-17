import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import DatePicker from "react-datepicker";
import BapUangMukaWord from "./BapUangMukaWord";
import BapUangMukaPreview from "./BapUangMukaPreview";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import Spinner from "../Spinner/spinner";
import axios from "axios";
import html2pdf from "html2pdf.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import documentStyleMapping from "../../documentStyles";

import "react-datepicker/dist/react-datepicker.css";

const BapUangMuka = ({ documentId, projectDetailData, currFileType }, ref) => {
  const contentRef = useRef(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nomor_bap_uangmuka: "",
    tanggal_bap_uangmuka: "",
    tanggal_bap_uangmuka_terbilang: "",
    nilai_pembayaran_uangmuka: { raw: "", masked: "" },
    nilai_pembayaran_uangmuka_terbilang: "",
    nilai_kontrak: { raw: "", masked: "" },
    untuk_bulan: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (documentId) {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/berita_acara_serah_terima_uang_muka?id=${documentId}`);
          const rawData = response.data;

          setFormData({
            nomor_bap_uangmuka: rawData.nomor_berita_acara_serah_terima_uang_muka || "",
            tanggal_bap_uangmuka: rawData.tanggal_berita_acara_serah_terima_uang_muka || "",
            tanggal_bap_uangmuka_terbilang: rawData.tanggal_berita_acara_serah_terima_uang_muka_huruf || "",
            nilai_pembayaran_uangmuka: {
              raw: parseInt(rawData.jumlah_yang_dibulatkan_total, 10) || 0 || "", // nanti ganti nominal pembayaran
              masked: parseInt(rawData.jumlah_yang_dibulatkan_total, 10) || 0 ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.jumlah_yang_dibulatkan_total)}` : "",
            },
            nilai_pembayaran_uangmuka_terbilang: rawData.jumlah_yang_dibulatkan_huruf || "",
            nilai_kontrak: {
              raw: parseInt(rawData.nilai_kontrak, 10) || 0 || "", // nanti ganti nominal pembayaran
              masked: parseInt(rawData.nilai_kontrak, 10) || 0 ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nilai_kontrak)}` : "",
            },
            untuk_bulan: rawData.untuk_bulan,
          });
        } else {
          setFormData({
            nomor_bap_uangmuka: "",
            tanggal_bap_uangmuka: "",
            tanggal_bap_uangmuka_terbilang: "",
            nilai_pembayaran_uangmuka: { raw: "", masked: "" },
            nilai_pembayaran_uangmuka_terbilang: "",
            nilai_kontrak: { raw: "", masked: "" },
          });
        }
      } catch (error) {
        console.error("❌ Error fetching BAP Uang muka:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [documentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nilai_kontrak" || name === "nilai_pembayaran_uangmuka") {
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

  const handleSubmitBAPUangMuka = async () => {
    setLoading(true);
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
        alert("❌ Field mandatory harus diisi ");
        return;
      }

      if (Array.isArray(value) && value.length === 0) {
        console.log("❌ INVALID ARRAY:", key);
        newErrors[key] = "Field ini harus diisi!";
        isValid = false;
        alert("❌ Field mandatory harus diisi ");
        return;
      }

      if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) {
        console.log("❌ INVALID OBJECT:", key);
        newErrors[key] = "Field ini harus diisi!";
        isValid = false;
        alert("❌ Field mandatory harus diisi ");
        return;
      }
    });
    console.log("apakah valid?", isValid);
    if (!isValid) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    if (documentId) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/put/berita_acara_serah_terima_uang_muka?id=${documentId}`,
          {
            project_id: projectDetailData.id,
            nomor_berita_acara_serah_terima_uang_muka: formData.nomor_bap_uangmuka,
            tanggal_berita_acara_serah_terima_uang_muka: formData.tanggal_bap_uangmuka,
            tanggal_berita_acara_serah_terima_uang_muka_huruf: formData.tanggal_bap_uangmuka_terbilang,
            nilai_kontrak: formData.nilai_kontrak.raw,

            jumlah_yang_dibulatkan_total: formData.nilai_pembayaran_uangmuka.raw,
            jumlah_yang_dibulatkan_huruf: formData.nilai_pembayaran_uangmuka_terbilang,

            untuk_bulan: formData.untuk_bulan,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ BAP Uang Muka berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
        setLoading(false);
      } catch (error) {
        console.error("❌ Gagal membuat BAP Uang Muka:", error);
        setIsFailedModalOpen(true);
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/berita_acara_serah_terima_uang_muka`,
          {
            project_id: projectDetailData.id,
            nomor_berita_acara_serah_terima_uang_muka: formData.nomor_bap_uangmuka,
            tanggal_berita_acara_serah_terima_uang_muka: formData.tanggal_bap_uangmuka,
            tanggal_berita_acara_serah_terima_uang_muka_huruf: formData.tanggal_bap_uangmuka_terbilang,
            nilai_kontrak: formData.nilai_kontrak.raw,

            jumlah_yang_dibulatkan_total: formData.nilai_pembayaran_uangmuka.raw,
            jumlah_yang_dibulatkan_huruf: formData.nilai_pembayaran_uangmuka_terbilang,

            untuk_bulan: formData.untuk_bulan,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ Surat Pernyataan berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
        setLoading(false);
      } catch (error) {
        console.error("❌ Gagal membuat Surat Pernyataan:", error);
        setIsFailedModalOpen(true);
        setLoading(false);
      }
    }
  };
  const bapTerminPihak1Data = [
    {
      label: "Nama",
      value: projectDetailData.nama_pihak_1 || "(Nama Pihak 1)",
    },

    {
      label: "Jabatan",
      value: projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)",
    },

    {
      label: "Alamat",
      value: projectDetailData.alamat_pihak_1 || "(Alamat Pihak 1)",
    },
  ];

  const bapTerminPihak2Data = [
    {
      label: "Nama",
      value: projectDetailData.nama_pihak_2 || "(Nama Pihak 2)",
    },

    {
      label: "Jabatan",
      value: projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)",
    },

    {
      label: "Alamat",
      value: projectDetailData.alamat_pihak_2 || "(Alamat Pihak 2)",
    },
  ];

  const ComponentWord = () => {
    return (
      <div style={{ display: "none" }}>
        <div ref={contentRef}>
          {/* Header section */}
          {currFileType !== "word" && (
            <>
              <div className="surat-header-bap">
                <div className="header-table-bap">
                  <div className="surat-header-bap-text-bold">
                    KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
                    <br />
                    DAN TEKNOLOGI
                    <br /> UNIVERSITAS BENGKULU
                  </div>
                  <div className="pekerjaan-bap">
                    <div className="pekerjaan-title">PEKERJAAN</div>
                    <div className="pekerjaan-value">
                      <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                    </div>
                  </div>
                  <div className="lokasi-bap">
                    <div className="lokasi-bap-tittle">Lokasi</div>
                    <div className="lokasi-bap-value">
                      <span>{projectDetailData.lokasi_pekerjaan || "(Pekerjaan)"}</span>
                    </div>
                  </div>
                </div>

                <div className="header-table-bap">
                  <div
                    style={{
                      color: "#000",
                      fontFamily: '"Times New Roman", Times, serif',
                      textAlign: "center",
                      fontWeight: "bold",
                      whiteSpace: "pre-line",
                      fontSize: "19px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: "1px solid #000",
                      borderTop: "1px solid #000",
                      borderBottom: "1px solid #000",
                      padding: "38.5px 64px 31px 65px",
                      marginLeft: "-20px",
                    }}
                  >
                    <span>
                      BERITA ACARA
                      <br />
                      SERAH TERIMA UANG MUKA
                    </span>
                  </div>

                  <div className="bap-header-container">
                    <span className="label-bap">Nomor</span>
                    <span className="separator-bap">:</span>
                    <span className="value-bap">
                      <span>{formData.nomor_bap_uangmuka || "(Nomor BAP)"}</span>
                    </span>

                    <span className="label-bap">Tanggal</span>
                    <span className="separator-bap">:</span>
                    <span className="value-bap">
                      <span>
                        {(formData.tanggal_bap_uangmuka &&
                          new Date(formData.tanggal_bap_uangmuka).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal Surat BAP)"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {currFileType === "word" && (
            <>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: "16px",
                  color: "#000",
                }}
                border={1}
              >
                <tbody>
                  {/* Row 1 */}
                  <tr>
                    <td colSpan={2} style={{ textAlign: "center", fontWeight: "bold", fontSize: "18px", padding: "10px" }}>
                      KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
                      <br />
                      DAN TEKNOLOGI
                      <br />
                      UNIVERSITAS BENGKULU
                    </td>
                    <td rowSpan={2} style={{ textAlign: "center", fontWeight: "bold", fontSize: "18px", padding: "20px" }}>
                      BERITA ACARA
                      <br />
                      SERAH TERIMA UANG MUKA
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td style={{ padding: "10px", fontWeight: "bold", textAlign: "center", width: "10%" }}>PEKERJAAN</td>
                    <td style={{ padding: "10px", textAlign: "center", width: "60%" }}>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td style={{ padding: "10px", fontWeight: "bold", textAlign: "center", width: "10%" }}>Lokasi</td>
                    <td style={{ padding: "10px", textAlign: "center", width: "60%" }}>{projectDetailData.lokasi_pekerjaan || "(Lokasi)"}</td>
                    <td style={{ padding: "10px" }}>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Nomor</span> : <span>{formData.nomor_bap_uangmuka || "(Nomor BAP)"}</span>
                      </div>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Tanggal</span> :{" "}
                        <span>
                          {(formData.tanggal_bap_uangmuka &&
                            new Date(formData.tanggal_bap_uangmuka).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })) ||
                            "(Tanggal Surat BAP)"}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
          {/* End of Header section */}

          {/* content bap uang muka */}

          {currFileType !== "word" && (
            <>
              <div className="first-paragraph-bap">
                Pada hari ini,
                <span>
                  {formData.tanggal_bap_uangmuka_terbilang || "(Tanggal BAP Terbilang)"} (
                  {(formData.tanggal_bap_uangmuka &&
                    new Date(formData.tanggal_bap_uangmuka)
                      .toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .replace(/\//g, "-")) ||
                    "(Tanggal Surat BAP)"}
                  ){" "}
                </span>{" "}
                , kami yang bertanda tangan dibawah
              </div>
              <div className="bap-termin-wrapper">
                <div class="bap-termin-container">
                  <div class="bap-termin-item">
                    <span class="bap-label">Nama</span> <span class="bap-separator">:</span>
                    <span class="bap-value">
                      <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                    </span>
                  </div>
                  <div class="bap-termin-item">
                    <span class="bap-label">Jabatan</span> <span class="bap-separator">:</span>
                    <span class="bap-value">
                      <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                    </span>
                  </div>
                  <div class="bap-termin-item">
                    <span class="bap-label">Alamat</span> <span class="bap-separator">:</span>
                    <span class="bap-value">
                      <span>{projectDetailData.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
                    </span>
                  </div>
                </div>
                <p class="bap-pihak-pertama">
                  Yang selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>
                </p>

                <div class="bap-termin-container">
                  <div class="bap-termin-item">
                    <span class="bap-label">Nama</span> <span class="bap-separator">:</span>
                    <span class="bap-value">
                      <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                    </span>
                  </div>
                  <div class="bap-termin-item">
                    <span class="bap-label">Jabatan</span> <span class="bap-separator">:</span>
                    <span class="bap-value">
                      <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                    </span>
                  </div>
                  <div class="bap-termin-item">
                    <span class="bap-label">Alamat</span> <span class="bap-separator">:</span>
                    <span class="bap-value">
                      <span>{projectDetailData.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
                    </span>
                  </div>
                </div>
                <p class="bap-pihak-pertama">
                  Yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>
                </p>
              </div>
              <div className="bast-uangmuka-container">
                <div className="bast-uangmuka-section">
                  <p className="bast-uangmuka-paragraph">Dengan ini menyatakan :</p>
                  <p className="bast-uangmuka-paragraph">1. Telah Mengadakan pemeriksaan di lapangan untuk pekerjaan :</p>
                  <div className="bast-uangmuka-list">
                    <div className="bast-uangmuka-item">
                      <b>a. Pekerjaan</b>: <span>{projectDetailData.pekerjaan || "(Pekerjaan)"}</span>
                    </div>
                    <div className="bast-uangmuka-item">
                      <b>b. Lokasi</b>: <span>{projectDetailData.lokasi_pekerjaan || "(Pekerjaan)"}</span>
                    </div>
                    <div className="bast-uangmuka-item">
                      <b>c. Pelaksana</b>: <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                    </div>
                    <div className="bast-uangmuka-item">
                      <b>d. Nomor Kontrak</b>: <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Kontrak)"}</span>
                    </div>
                    <div className="bast-uangmuka-item">
                      <b>e. Nilai Kontrak</b>: <span>{formData.nilai_kontrak.masked || "(Nilai Kontrak)"}</span>
                    </div>
                    <div className="bast-uangmuka-item">
                      <b>f. Tanggal Kontrak</b>:{" "}
                      <span>
                        {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                          new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal Surat Kontrak)"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bast-uangmuka-section">
                  <p className="bast-uangmuka-paragraph">2. Berdasarkan Berita Acara Pemeriksaan dapat dilaporkan sebagai berikut :</p>
                  <div className="bast-uangmuka-list">
                    <div className="bast-uangmuka-item">a. Pekerjaan Fisik sudah dimulai dikerjakan</div>
                  </div>
                  <div className="bast-uangmuka-list">
                    <div className="bast-uangmuka-item">
                      b. Kontraktor pelaksana telah melaksanakan pekerjaan dengan baik sesuai dengan Surat Perjanjian Kerja/Kontrak Nomor: <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Kontrak)"}</span>, Tanggal{" "}
                      <span>
                        {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                          new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal Surat Kontrak)"}
                      </span>
                      .
                    </div>
                    <div className="bast-uangmuka-item">
                      Dengan ditandatanganinya Berita Acara Serah Terima Hasil Pekerjaan ini, PIHAK KEDUA berhak menerima pembayaran pekerjaan Uang Muka untuk bulan <span>{formData.untuk_bulan || "(Pembayaran untuk bulan)"}</span> sebesar{" "}
                      <span className="bast-uangmuka-amount">
                        <span>{formData.nilai_pembayaran_uangmuka.masked || "(Nilai Pembayaran Uang Muka)"}</span>
                      </span>{" "}
                      <span>{formData.nilai_pembayaran_uangmuka_terbilang || "(Nilai Pembayaran Uang Muka Terbilang)"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="last-paragraph-bap">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>
                <div className="ttd-bap-layout">
                  <div className="ttd-pihak-kedua">
                    <div className="ttd-pihak-kedua-bold">PIHAK KEDUA</div>
                    <div className="ttd-pihak-kedua-light">KONTRAKTOR PELAKSANA</div>
                    <div className="ttd-pihak-kedua-bold">
                      {" "}
                      <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                    </div>
                    <div className="nip-bap-layout">
                      <div className="ttd-pihak-kedua">
                        <div className="nip-bap-name">
                          <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                        </div>
                        <div className="nip-bap-nip">
                          <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ttd-pihak-kedua">
                    <div className="ttd-pihak-kedua-bold">PIHAK PERTAMA</div>
                    <div className="ttd-pihak-kedua-light">KONTRAKTOR PELAKSANA</div>
                    <div className="ttd-pihak-kedua-bold">
                      {" "}
                      <span>{projectDetailData.perusahaan_pihak_1 || "(Perusahaan Pihak 1)"}</span>
                    </div>
                    <div className="nip-bap-layout">
                      <div className="ttd-pihak-kedua">
                        <div className="nip-bap-name">
                          <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                        </div>
                        <div className="nip-bap-nip">
                          <span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {currFileType === "word" && (
            <>
              <div className="first-paragraph-bap">
                Pada hari ini,
                <span>
                  {formData.tanggal_bap_uangmuka_terbilang || "(Tanggal BAP Terbilang)"} (
                  {(formData.tanggal_bap_uangmuka &&
                    new Date(formData.tanggal_bap_uangmuka)
                      .toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .replace(/\//g, "-")) ||
                    "(Tanggal Surat BAP)"}
                  ){" "}
                </span>{" "}
                , kami yang bertanda tangan dibawah
              </div>
              <div className="bap-termin-wrapper">
                <div class="bap-termin-container">
                  {/* mapping table data */}
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontFamily: '"Times New Roman", Times, serif',
                      fontSize: "16px",
                      color: "#000",
                    }}
                  >
                    <tbody>
                      {bapTerminPihak1Data.map((item, index) => (
                        <tr key={index}>
                          <td style={{ width: "150px", whiteSpace: "nowrap", verticalAlign: "top", fontWeight: "bold" }}>{item.label}</td>
                          <td style={{ paddingLeft: "0px", verticalAlign: "top" }}>:</td>
                          <td style={{ verticalAlign: "top", marginRight: "100px" }}>{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p class="bap-pihak-pertama">
                  Yang selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>
                </p>

                <div class="bap-termin-container">
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontFamily: '"Times New Roman", Times, serif',
                      fontSize: "16px",
                      color: "#000",
                    }}
                  >
                    <tbody>
                      {bapTerminPihak2Data.map((item, index) => (
                        <tr key={index}>
                          <td style={{ width: "150px", whiteSpace: "nowrap", verticalAlign: "top", fontWeight: "bold" }}>{item.label}</td>
                          <td style={{ paddingLeft: "0px", verticalAlign: "top" }}>:</td>
                          <td style={{ verticalAlign: "top", marginRight: "100px" }}>{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p class="bap-pihak-pertama">
                  Yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>
                </p>
              </div>
              <div className="bast-uangmuka-container">
                <div className="bast-uangmuka-section">
                  <p className="bast-uangmuka-paragraph">Dengan ini menyatakan :</p>
                  <p className="bast-uangmuka-paragraph">1. Telah Mengadakan pemeriksaan di lapangan untuk pekerjaan :</p>
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
                          <td style={{ width: "200px", padding: "2px 10px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>a. Pekerjaan</td>
                          <td style={{ width: "10px", padding: "2px 5px", verticalAlign: "top" }}>:</td>
                          <td style={{ padding: "2px 0", verticalAlign: "top" }}>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</td>
                        </tr>
                        <tr>
                          <td style={{ width: "200px", padding: "2px 10px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>b. Lokasi</td>
                          <td style={{ width: "10px", padding: "2px 5px", verticalAlign: "top" }}>:</td>
                          <td style={{ padding: "2px 0", verticalAlign: "top" }}>{projectDetailData.lokasi_pekerjaan || "(Lokasi Pekerjaan)"}</td>
                        </tr>
                        <tr>
                          <td style={{ width: "200px", padding: "2px 10px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>c. Pelaksana</td>
                          <td style={{ width: "10px", padding: "2px 5px", verticalAlign: "top" }}>:</td>
                          <td style={{ padding: "2px 0", verticalAlign: "top" }}>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</td>
                        </tr>
                        <tr>
                          <td style={{ width: "200px", padding: "2px 10px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>d. Nomor Kontrak</td>
                          <td style={{ width: "10px", padding: "2px 5px", verticalAlign: "top" }}>:</td>
                          <td style={{ padding: "2px 0", verticalAlign: "top" }}>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Kontrak)"}</td>
                        </tr>
                        <tr>
                          <td style={{ width: "200px", padding: "2px 10px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>e. Nilai Kontrak</td>
                          <td style={{ width: "10px", padding: "2px 5px", verticalAlign: "top" }}>:</td>
                          <td style={{ padding: "2px 0", verticalAlign: "top" }}>{formData.nilai_kontrak.masked || "(Nilai Kontrak)"}</td>
                        </tr>
                        <tr>
                          <td style={{ width: "200px", padding: "2px 10px 2px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>f. Tanggal Kontrak</td>
                          <td style={{ width: "10px", padding: "2px 5px", verticalAlign: "top" }}>:</td>
                          <td style={{ padding: "2px 0", verticalAlign: "top" }}>
                            {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                              new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })) ||
                              "(Tanggal Surat Kontrak)"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bast-uangmuka-section">
                  <p className="bast-uangmuka-paragraph">2. Berdasarkan Berita Acara Pemeriksaan dapat dilaporkan sebagai berikut :</p>
                  <div style={{ marginLeft: "30px" }}>
                    <div className="bast-uangmuka-list">
                      <div className="bast-uangmuka-item">a. Pekerjaan Fisik sudah dimulai dikerjakan</div>
                      <div className="bast-uangmuka-item">
                        b. Kontraktor pelaksana telah melaksanakan pekerjaan dengan baik sesuai dengan Surat Perjanjian Kerja/Kontrak Nomor: <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Kontrak)"}</span>, Tanggal{" "}
                        <span>
                          {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                            new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })) ||
                            "(Tanggal Surat Kontrak)"}
                        </span>
                        .
                      </div>
                      <div className="bast-uangmuka-item">
                        Dengan ditandatanganinya Berita Acara Serah Terima Hasil Pekerjaan ini, PIHAK KEDUA berhak menerima pembayaran pekerjaan Uang Muka untuk bulan <span>{formData.untuk_bulan || "(Pembayaran untuk bulan)"}</span> sebesar{" "}
                        <span className="bast-uangmuka-amount">
                          <span>{formData.nilai_pembayaran_uangmuka.masked || "(Nilai Pembayaran Uang Muka)"}</span>
                        </span>{" "}
                        <span>{formData.nilai_pembayaran_uangmuka_terbilang || "(Nilai Pembayaran Uang Muka Terbilang)"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="last-paragraph-bap">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>
                <div style={{ marginLeft: "90px" }}>
                  <table class="ttd-bap-layout-uangmuka">
                    <tr>
                      <td class="ttd-pihak">
                        <div class="ttd-pihak-kedua-bold">PIHAK KEDUA</div>
                        <div class="ttd-pihak-kedua-light">KONTRAKTOR PELAKSANA</div>
                        <div class="ttd-pihak-kedua-bold">{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</div>
                        <div class="nip-bap-layout">
                          <div class="nip-bap-name">{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</div>
                          <div class="nip-bap-nip">{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</div>
                        </div>
                      </td>

                      <td class="ttd-pihak">
                        <div class="ttd-pihak-kedua-bold">PIHAK PERTAMA</div>
                        <div class="ttd-pihak-kedua-light">{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</div>
                        <div class="ttd-pihak-kedua-bold">UNIVERSITAS BENGKULU</div>
                        <div class="nip-bap-layout">
                          <div class="nip-bap-name">{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</div>
                          <div class="nip-bap-nip">NIP. {projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </>
          )}
          {/* end of content bap uang muka */}
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
      const filename = "berita_acara_pembayaran_uangmuka";

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

        const blob = htmlDocx.asBlob(fullHtml, {
          orientation: "landscape",
          margins: {
            top: 720,
            bottom: 720,
            left: 1440,
            right: 1440,
          },
        });
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
            jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
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
            {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"BAP Uang Muka"} />}
            {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"BAP Uang Muka"} />}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nomor Berita Acara Serah Terima Uang Muka <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nomor_bap_uangmuka"
              className={errors.nomor_bap_uangmuka ? "input-field-form-error" : "input-field-form"}
              value={formData.nomor_bap_uangmuka}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nomor_bap_uangmuka && <span className="error-text">{errors.nomor_bap_uangmuka}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Berita Acara Serah Terima Uang Muka <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.tanggal_bap_uangmuka}
              name="tanggal_bap_uangmuka"
              onChange={(date) => handleDateChange("tanggal_bap_uangmuka", date)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={errors.tanggal_bap_uangmuka ? "input-field-form-date-error" : "input-field-form-date"}
              dateFormat="dd/MM/yyyy"
              placeholderText="Isi bagian ini"
            />
            {errors.tanggal_bap_uangmuka && <span className="error-text">{errors.tanggal_bap_uangmuka}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Berita Acara Serah Terima Uang Muka (Teribilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="tanggal_bap_uangmuka_terbilang"
              className={errors.tanggal_bap_uangmuka_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.tanggal_bap_uangmuka_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.tanggal_bap_uangmuka_terbilang && <span className="error-text">{errors.tanggal_bap_uangmuka_terbilang}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Nilai Kontrak <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nilai_kontrak"
              className={errors.nilai_kontrak ? "input-field-form-error" : "input-field-form"}
              value={formData.nilai_kontrak.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nilai_kontrak && <span className="error-text">{errors.nilai_kontrak}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nilai Pembayaran Uang Muka <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nilai_pembayaran_uangmuka"
              className={errors.nilai_pembayaran_uangmuka ? "input-field-form-error" : "input-field-form"}
              value={formData.nilai_pembayaran_uangmuka.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nilai_pembayaran_uangmuka && <span className="error-text">{errors.nilai_pembayaran_uangmuka}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nilai Pembayaran Uang Muka (Terbilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nilai_pembayaran_uangmuka_terbilang"
              className={errors.nilai_pembayaran_uangmuka_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.nilai_pembayaran_uangmuka_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nilai_pembayaran_uangmuka_terbilang && <span className="error-text">{errors.nilai_pembayaran_uangmuka_terbilang}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Pembayaran untuk bulan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="untuk_bulan"
              className={errors.untuk_bulan ? "input-field-form-error" : "input-field-form"}
              value={formData.untuk_bulan}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.untuk_bulan && <span className="error-text">{errors.untuk_bulan}</span>}
          </div>
        </div>
        {/* <BapUangMukaWord /> */}
        <ComponentWord />
        <BapUangMukaPreview previewDataForm={formData} detailDataProject={projectDetailData} />
      </div>

      <button className="button-simpan-blue" onClick={handleSubmitBAPUangMuka}>
        Simpan
      </button>
    </>
  );
};

export default forwardRef(BapUangMuka);

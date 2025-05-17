import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import axios from "axios";

import SuratSPPBJPreview from "./SuratSPPBJPreview";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../Spinner/spinner";
import html2pdf from "html2pdf.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import documentStyleMapping from "../../documentStyles";
import LogoKampusLarge from "../../Assets/Images/image 1.png";

const SuratSPPBJ = ({ documentId, projectDetailData, currFileType }, ref) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);

  const [formData, setFormData] = useState({
    kode_tender: "",
    nilai_penawaran: { raw: "", masked: "" },
    nilai_terkoreksi: { raw: "", masked: "" },
    nilai_final: { raw: "", masked: "" },
    nilai_jaminan_pelaksanaan: { raw: "", masked: "" },
    nilai_jaminan_pelaksanaan_terbilang: "",
    jangka_waktu_pekerjaan: "",
    jangka_waktu_pekerjaan_terbilang: "",
    aturan_sanksi: "",
    tembusan: ["1. Rektor", "2. Inspektorat Jenderal Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi"],
  });

  const [errors, setErrors] = useState({});

  // get by id
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (documentId) {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/surat_penunjukan_penyedia_barang_jasa?id=${documentId}`);
          const rawData = response.data;

          setFormData({
            kode_tender: rawData.kode_tender_id_packet,
            nilai_penawaran: {
              raw: rawData.nilai_penawaran || "",
              masked: rawData.nilai_penawaran ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nilai_penawaran)}` : "",
            },
            nilai_terkoreksi: {
              raw: rawData.nilai_terkoreksi || "",
              masked: rawData.nilai_terkoreksi ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nilai_terkoreksi)}` : "",
            },
            nilai_final: {
              raw: rawData.nilai_final || "",
              masked: rawData.nilai_final ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nilai_final)}` : "",
            },
            nilai_jaminan_pelaksanaan: {
              raw: rawData.nilai_jaminan_pelaksanaan_angka || "",
              masked: rawData.nilai_jaminan_pelaksanaan_angka ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nilai_jaminan_pelaksanaan_angka)}` : "",
            },
            nilai_jaminan_pelaksanaan_terbilang: rawData.nilai_jaminan_pelaksanaan_huruf || "",
            jangka_waktu_pekerjaan: rawData.jangka_waktu_pekerjaan_angka || "",
            jangka_waktu_pekerjaan_terbilang: rawData.jangka_waktu_pekerjaan_huruf,
            aturan_sanksi: rawData.uu_pp_aturan_sanksi,
            tembusan: rawData.tembusan || ["1. Rektor", "2. Inspektorat Jenderal Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi"],
          });
        } else {
          setFormData({
            kode_tender: "",
            nilai_penawaran: { raw: "", masked: "" },
            nilai_terkoreksi: { raw: "", masked: "" },
            nilai_final: { raw: "", masked: "" },
            nilai_jaminan_pelaksanaan: { raw: "", masked: "" },
            nilai_jaminan_pelaksanaan_terbilang: "",
            jangka_waktu_pekerjaan: "",
            jangka_waktu_pekerjaan_terbilang: "",
            aturan_sanksi: "",
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

    if (name === "nilai_penawaran" || name === "nilai_terkoreksi" || name === "nilai_final" || name === "nilai_jaminan_pelaksanaan") {
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

  const handleChangeTextArea = (e) => {
    const { name, value } = e.target;

    const lines = value.split("\n").map((line, index) => `${index + 1}. ${line.replace(/^\d+\.\s*/, "").trim()}`); // Hapus nomor lama & trim

    setFormData((prev) => ({
      ...prev,
      [name]: lines,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleKeyDownTextArea = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      setFormData((prev) => {
        const currentLines = prev[e.target.name] || [];
        const newLines = [...currentLines, `${currentLines.length + 1}. `];

        return {
          ...prev,
          [e.target.name]: newLines,
        };
      });
    }
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

  const handleSubmitSppbj = async () => {
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

    // sesuain api surat SPPBJ
    if (documentId) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/put/surat_penunjukan_penyedia_barang_jasa?id=${documentId}`,
          {
            project_id: projectDetailData.id,
            kode_tender_id_packet: formData.kode_tender,
            nilai_penawaran: parseInt(formData.nilai_penawaran.raw, 10) || 0,
            nilai_terkoreksi: parseInt(formData.nilai_terkoreksi.raw, 10) || 0,
            nilai_final: parseInt(formData.nilai_final.raw, 10) || 0,
            nilai_jaminan_pelaksanaan_angka: parseInt(formData.nilai_jaminan_pelaksanaan.raw, 10) || 0,
            nilai_jaminan_pelaksanaan_huruf: formData.nilai_jaminan_pelaksanaan_terbilang,
            jangka_waktu_pekerjaan_angka: parseInt(formData.jangka_waktu_pekerjaan, 10) || 0,
            jangka_waktu_pekerjaan_huruf: formData.jangka_waktu_pekerjaan_terbilang,
            uu_pp_aturan_sanksi: formData.aturan_sanksi,
            tembusan: formData.tembusan, // ini jadiin array aja
            // tinggal var hal surat
          },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ Surat SPPBJ berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error("❌ Gagal membuat Surat SPPBJ:", error);
        setIsFailedModalOpen(true);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/surat_penunjukan_penyedia_barang_jasa`,
          {
            project_id: projectDetailData.id,
            kode_tender_id_packet: formData.kode_tender,
            nilai_penawaran: parseInt(formData.nilai_penawaran.raw, 10) || 0,
            nilai_terkoreksi: parseInt(formData.nilai_terkoreksi.raw, 10) || 0,
            nilai_final: parseInt(formData.nilai_final.raw, 10) || 0,
            nilai_jaminan_pelaksanaan_angka: parseInt(formData.nilai_jaminan_pelaksanaan.raw, 10) || 0,
            nilai_jaminan_pelaksanaan_huruf: formData.nilai_jaminan_pelaksanaan_terbilang,
            jangka_waktu_pekerjaan_angka: parseInt(formData.jangka_waktu_pekerjaan, 10) || 0,
            jangka_waktu_pekerjaan_huruf: formData.jangka_waktu_pekerjaan_terbilang,
            uu_pp_aturan_sanksi: formData.aturan_sanksi,
            tembusan: formData.tembusan, // ini jadiin array aja
            // tinggal var hal surat
          },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ Surat SPPBJ berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error("❌ Gagal membuat Surat SPPBJ:", error);
        setIsFailedModalOpen(true);
      }
    }
  };

  const sppbjUpperSectionData = [
    {
      label: "Nomor",
      value: `${projectDetailData.nomor_surat_penunjukan_penyedia_barang_jasa_sppbj || "(Nomor Surat SPPBJ)"} ${
        (projectDetailData.tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj &&
          new Date(projectDetailData.tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })) ||
        "(Tanggal Surat SPPBJ)"
      }`,
    },

    {
      label: "H a l",
      value: `Penunjukan Penyedia Barang/Jasa untuk Pelaksanaan Paket Pekerjaan ${projectDetailData.pekerjaan || "(Paket Pekerjaan)"}`,
    },
  ];

  const sppbjMiddleSectionData = [
    {
      label: "Kode Tender/ID Paket",
      value: formData.kode_tender || "(Kode Tender)",
    },

    {
      label: "Nama Paket",
      value: projectDetailData.pekerjaan || "(Paket Pekerjaan)",
    },

    {
      label: "Nilai Penawaran",
      value: formData.nilai_penawaran?.masked || "(Nilai Penawaran)",
    },
    {
      label: "Nilai Terkoreksi",
      value: formData.nilai_terkoreksi?.masked || "(Nilai Terkoreksi)",
    },
    {
      label: "Nilai Final",
      value: formData.nilai_final?.masked || "(Nilai Final)",
    },
  ];

  const ComponentWord = () => {
    return (
      <div style={{ padding: "20px", display: "none" }}>
        <div ref={contentRef}>
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
          {currFileType !== "word" && (
            <>
              <div className="tittle-surat-ringkasan-kontrak">SURAT PENUNJUKAN PENYEDIA BARANG/JASA (SPPBJ)</div>
              <div className="spmk-container">
                <div className="sppbj-item">
                  <span className="spmk-label">Nomor</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{projectDetailData.nomor_surat_penunjukan_penyedia_barang_jasa_sppbj || "(Nomor Surat SPPBJ)"}</span>,{" "}
                    <span>
                      {(projectDetailData.tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj &&
                        new Date(projectDetailData.tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })) ||
                        "(Tanggal Surat SPPBJ)"}
                    </span>
                  </span>
                </div>

                <div className="sppbj-item">
                  <span className="spmk-label">H a l </span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    Penunjukan Penyedia Barang/Jasa untuk Pelaksanaan Paket Pekerjaan <span>{projectDetailData.pekerjaan || "(Paket Pekerjaan)"}</span>
                  </span>
                </div>
              </div>

              <div className="spmk-text-container">
                <div>
                  Yth. Direktur <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                </div>
                <div>
                  <span>{projectDetailData.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
                </div>
              </div>
              <div className="spmk-justify-text">Dengan ini kami beritahukan bahwa berdasarkan penawaran Saudara pada aplikasi LPSE Universitas Bengkulu :</div>
              <div className="spmk-container">
                <p className="spmk-intro"></p>
                <div className="sppbj-item">
                  <span className="spmk-label">Kode Tender/ID Paket</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{formData.kode_tender || "(Kode Tender)"}</span>
                  </span>
                </div>

                <div className="sppbj-item">
                  <span className="spmk-label">Nama Paket</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{projectDetailData.pekerjaan || "(Paket Pekerjaan)"}</span>
                  </span>
                </div>

                <div className="sppbj-item">
                  <span className="spmk-label">Nilai Penawaran</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{formData.nilai_penawaran.masked || "(Nilai Penawaran)"}</span>
                  </span>
                </div>

                <div className="sppbj-item">
                  <span className="spmk-label">Nilai Terkoreksi</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{formData.nilai_terkoreksi.masked || "(Nilai Terkoreksi)"}</span>
                  </span>
                </div>

                <div className="sppbj-item">
                  <span className="spmk-label">Nilai Final</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{formData.nilai_final.masked || "(Nilai Final)"}</span>
                  </span>
                </div>
              </div>
              <div className="spmk-justify-text">
                Sebagai tindak lanjut dari Surat Penunjukan Penyedia Barang/Jasa (SPPBJ) ini, Saudara diharuskan untuk menyerahkan Jaminan Pelaksanaan sebesar{" "}
                <strong>
                  <span>{formData.nilai_jaminan_pelaksanaan_terbilang || "(Nilai Jaminan Pelaksanaan Terbilang)"}</span>
                </strong>{" "}
                dengan masa berlaku selama <span>{formData.jangka_waktu_pekerjaan || "(Jangka Waktu Pekerjaan)"}</span>(<span>{formData.jangka_waktu_pekerjaan_terbilang || "(Jangka Waktu Pekerjaan Terbilang)"}</span>) hari kalender dan
                menandatangani Surat Perjanjian paling lambat 14 (empat belas) hari kerja setelah diterbitkannya SPPBJ.
              </div>
              <div className="spmk-justify-text">
                Kegagalan Saudara untuk menerima penunjukan ini, akan dikenakan sanksi sesuai ketentuan dalam <span>{formData.aturan_sanksi || "(UU/PP/Aturan Sanksi)"}</span>.
              </div>

              <div className="ttd-sppbj-layout">
                <div className="ttd-spmk-text-container">
                  <div>Pejabat Pembuat Komitmen</div>
                  <strong>PPK Universitas Bengkulu</strong>
                </div>
                <div className="ttd-spmk-text-container">
                  <strong>
                    <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                  </strong>
                  <div>
                    NIP.<span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                  </div>
                </div>
              </div>
              <div className="sec-page-content-sppbj">
                <div className="spmk-justify-text">
                  <div>Tembusan:</div>
                  {formData.tembusan.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
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
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>SURAT PENUNJUKAN PENYEDIA BARANG/JASA (SPPBJ)</div>
              </div>
              <div className="spmk-container">
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
                    {sppbjUpperSectionData.map((item, index) => (
                      <tr key={index}>
                        <td style={{ width: "50px", whiteSpace: "nowrap", verticalAlign: "top", fontWeight: "bold" }}>{item.label}</td>
                        <td style={{ paddingLeft: "10px", verticalAlign: "top" }}>:</td>
                        <td style={{ verticalAlign: "top" }}>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="spmk-text-container">
                <div>
                  Yth. Direktur <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                </div>
                <div>
                  <span>{projectDetailData.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
                </div>
              </div>
              <div className="spmk-justify-text">Dengan ini kami beritahukan bahwa berdasarkan penawaran Saudara pada aplikasi LPSE Universitas Bengkulu :</div>
              <div className="spmk-container">
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
                    {sppbjMiddleSectionData.map((item, index) => (
                      <tr key={index}>
                        <td style={{ width: "200px", whiteSpace: "nowrap", verticalAlign: "top", fontWeight: "bold" }}>{item.label}</td>
                        <td style={{ paddingLeft: "0px", verticalAlign: "top" }}>:</td>
                        <td style={{ verticalAlign: "top", marginRight: "100px" }}>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="spmk-justify-text">
                Sebagai tindak lanjut dari Surat Penunjukan Penyedia Barang/Jasa (SPPBJ) ini, Saudara diharuskan untuk menyerahkan Jaminan Pelaksanaan sebesar{" "}
                <strong>
                  <span>{formData.nilai_jaminan_pelaksanaan_terbilang || "(Nilai Jaminan Pelaksanaan Terbilang)"}</span>
                </strong>{" "}
                dengan masa berlaku selama <span>{formData.jangka_waktu_pekerjaan || "(Jangka Waktu Pekerjaan)"}</span>(<span>{formData.jangka_waktu_pekerjaan_terbilang || "(Jangka Waktu Pekerjaan Terbilang)"}</span>) hari kalender dan
                menandatangani Surat Perjanjian paling lambat 14 (empat belas) hari kerja setelah diterbitkannya SPPBJ.
              </div>
              <div className="spmk-justify-text">
                Kegagalan Saudara untuk menerima penunjukan ini, akan dikenakan sanksi sesuai ketentuan dalam <span>{formData.aturan_sanksi || "(UU/PP/Aturan Sanksi)"}</span>.
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "30px",

                  marginLeft: "400px",
                  textAlign: "left",
                  fontFamily: '"Times New Roman", Times, serif',
                  color: "#000",
                  fontSize: "16px",
                  fontWeight: "lighter",
                }}
              >
                <div>
                  <div>Pejabat Pembuat Komitmen</div>
                  <strong>PPK Universitas Bengkulu</strong>
                </div>
                <div style={{ marginTop: "100px" }}>
                  <strong>
                    <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                  </strong>
                  <div>
                    NIP.
                    <span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                  </div>
                </div>
              </div>
              <div className="sec-page-content-sppbj">
                <div className="spmk-justify-text">
                  <div>Tembusan:</div>
                  {formData.tembusan.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
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
      const filename = "sppbj";

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
        {" "}
        <div className="form-container">
          <div className="position-absolute">
            {" "}
            {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"Surat SPPBJ"} />}
            {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"Surat SPPBJ"} />}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Kode Tender/ID Packet <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="kode_tender"
              className={errors.kode_tender ? "input-field-form-error" : "input-field-form"}
              value={formData.kode_tender}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.kode_tender && <span className="error-text">{errors.kode_tender}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nilai Penawaran <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nilai_penawaran"
              className={errors.nilai_penawaran ? "input-field-form-error" : "input-field-form"}
              value={formData.nilai_penawaran.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nilai_penawaran && <span className="error-text">{errors.nilai_penawaran}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nilai Terkoreksi <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nilai_terkoreksi"
              className={errors.nilai_terkoreksi ? "input-field-form-error" : "input-field-form"}
              value={formData.nilai_terkoreksi.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nilai_terkoreksi && <span className="error-text">{errors.nilai_terkoreksi}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nilai Final <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nilai_final"
              className={errors.nilai_final ? "input-field-form-error" : "input-field-form"}
              value={formData.nilai_final.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nilai_final && <span className="error-text">{errors.nilai_final}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nilai Jaminan Pelaksanaan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nilai_jaminan_pelaksanaan"
              className={errors.nilai_jaminan_pelaksanaan ? "input-field-form-error" : "input-field-form"}
              value={formData.nilai_jaminan_pelaksanaan.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nilai_jaminan_pelaksanaan && <span className="error-text">{errors.nilai_jaminan_pelaksanaan}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nilai Jaminan Pelaksanaan (Terbilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nilai_jaminan_pelaksanaan_terbilang"
              className={errors.nilai_jaminan_pelaksanaan_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.nilai_jaminan_pelaksanaan_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nilai_jaminan_pelaksanaan_terbilang && <span className="error-text">{errors.nilai_jaminan_pelaksanaan_terbilang}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Jangka Waktu Pekerjaan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="jangka_waktu_pekerjaan"
              className={errors.jangka_waktu_pekerjaan ? "input-field-form-error" : "input-field-form"}
              value={formData.jangka_waktu_pekerjaan}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.jangka_waktu_pekerjaan && <span className="error-text">{errors.jangka_waktu_pekerjaan}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Jangka Waktu Pekerjaan (Terbilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="jangka_waktu_pekerjaan_terbilang"
              className={errors.jangka_waktu_pekerjaan_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.jangka_waktu_pekerjaan_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.jangka_waktu_pekerjaan_terbilang && <span className="error-text">{errors.jangka_waktu_pekerjaan_terbilang}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              UU/PP/Aturan Sanksi <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="aturan_sanksi"
              className={errors.aturan_sanksi ? "input-field-form-error" : "input-field-form"}
              value={formData.aturan_sanksi}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.aturan_sanksi && <span className="error-text">{errors.aturan_sanksi}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Tembusan (Opsional)</label>
            <textarea name="tembusan" value={formData.tembusan?.join("\n") || ""} onChange={handleChangeTextArea} onKeyDown={handleKeyDownTextArea} placeholder="Isi Bagian Ini" className="input-textarea-form" />
          </div>
        </div>
        {/* <SuratSPPBJWord /> */}
        <ComponentWord />
        <SuratSPPBJPreview formDataPreview={formData} dataProjectDetail={projectDetailData} />
      </div>

      <button className="button-simpan-blue" onClick={handleSubmitSppbj}>
        Simpan
      </button>
    </>
  );
};

export default forwardRef(SuratSPPBJ);

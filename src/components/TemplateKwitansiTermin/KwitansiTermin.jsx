import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import "./KwitansiTermin.css";
import KwitansiTerminPreview from "./KwitansiTerminPreview";
import "react-datepicker/dist/react-datepicker.css";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import { parse, format, isValid } from "date-fns";
import DatePicker from "react-datepicker";

import html2pdf from "html2pdf.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import documentStyleMapping from "../../documentStyles";

import axios from "axios";
import Spinner from "../Spinner/spinner";

const KwitansiTermin = ({ documentId, projectDetailData, onCreated, currFileType, projectName }, ref) => {
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nomorSuratBAP: "",
    tanggalSuratBAP: "",
    tanggal_kwitansi: "",
    telah_terima_dari: "",
    total_uang: { raw: "", masked: "" },
    total_uang_terbilang: "",
    tujuan_pembayaran: "",
  });

  // API Kwitansi Termin
  const parseDateString = (dateString) => {
    if (!dateString) return null;

    const parsed = parse(dateString, "dd-MM-yyyy", new Date()); // karena GET by id / GET all formatnya dd-MM-yyyy
    if (!isValid(parsed)) {
      console.error("❌ Gagal parsing date:", dateString);
      return null;
    }

    return parsed;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (documentId) {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/kwitansi_termin?id=${documentId}`);
          const rawData = response.data;

          setFormData({
            nomorSuratBAP: rawData.nomor_surat_bap || "", // nunggu update dari anip
            tanggalSuratBAP: parseDateString(rawData.tanggal_surat_bap) || null, // nunggu update dari anip
            tanggal_kwitansi: parseDateString(rawData.tanggal_kwitansi) || null, // nunggu update dari anip
            telah_terima_dari: rawData.telah_diterima_dari || "",
            total_uang: {
              raw: rawData.uang_sebanyak || "",
              masked: rawData.uang_sebanyak ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.uang_sebanyak)}` : "",
            },
            total_uang_terbilang: rawData.uang_sebanyak_huruf || "",
            tujuan_pembayaran: rawData.untuk_pembayaran || "",
          });
        } else {
          setFormData({
            nomorSuratBAP: "",
            tanggalSuratBAP: "",
            tanggal_kwitansi: "",
            telah_terima_dari: "",
            total_uang: { raw: "", masked: "" },
            total_uang_terbilang: "",
            tujuan_pembayaran: "",
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

    if (name === "total_uang") {
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

  const handleSubmitKwitansi = async () => {
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

    // API Kwitansi Termin

    if (documentId) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/put/kwitansi_termin?id=${documentId}`,
          {
            project_id: projectDetailData.id,
            telah_diterima_dari: formData.telah_terima_dari,

            uang_sebanyak: parseInt(formData.total_uang.raw) || 0,
            uang_sebanyak_huruf: formData.total_uang_terbilang,
            untuk_pembayaran: formData.tujuan_pembayaran,

            nomor_surat_bap: formData.nomorSuratBAP || "",
            tanggal_surat_bap: format(formData.tanggalSuratBAP, "yyyy-MM-dd") || null,
            tanggal_kwitansi: format(formData.tanggal_kwitansi, "yyyy-MM-dd") || null,

            // tinggal - [nomor_surat_bap,text]	 - [tanggal_surat_bap,date] - [tanggal_kwitansi]
          },
          { headers: { "Content-Type": "application/json" } }
        );

        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "kwitansi_termin",
            record_id: 1,
            action_type: "UPDATE",
            timestamp: currentTimestamp,
            project_id: projectDetailData.id,
            project_name: projectName || "",
            description: "Pembaharuan Detil Surat Kwitansi",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("✅ Berhasil:", responseHistory.data);
        setLoading(false);
        console.log("✅ Surat Pernyataan berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        setLoading(false);
        console.error("❌ Gagal membuat Surat Pernyataan:", error);
        setIsFailedModalOpen(true);
        console.log("📦 Detail error dari API:", error.response?.data);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/kwitansi_termin`,
          {
            project_id: projectDetailData.id,
            telah_diterima_dari: formData.telah_terima_dari,

            uang_sebanyak: parseInt(formData.total_uang.raw) || 0,
            uang_sebanyak_huruf: formData.total_uang_terbilang,
            untuk_pembayaran: formData.tujuan_pembayaran,

            nomor_surat_bap: formData.nomorSuratBAP || "",
            tanggal_surat_bap: format(formData.tanggalSuratBAP, "yyyy-MM-dd") || null,
            tanggal_kwitansi: format(formData.tanggal_kwitansi, "yyyy-MM-dd") || null,

            // tinggal - [nomor_surat_bap,text]	 - [tanggal_surat_bap,date] - [tanggal_kwitansi]
          },
          { headers: { "Content-Type": "application/json" } }
        );
        const newId = response.data?.id;

        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "kwitansi_termin",
            record_id: 1,
            action_type: "CREATE",
            timestamp: currentTimestamp,
            project_id: response.data.id,
            project_name: projectName || "",
            description: "Pembuatan Surat Kwitansi",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("✅ Berhasil:", responseHistory.data);
        if (onCreated && newId) onCreated(newId); // Kirim ke parent
        console.log("✅ Create success:", response.data);
        setLoading(false);
        console.log("✅ Surat Pernyataan berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        setLoading(false);
        console.error("❌ Gagal membuat Surat Pernyataan:", error);
        setIsFailedModalOpen(true);
        console.log("📦 Detail error dari API:", error.response?.data);
      }
    }
  };

  const ComponentWord = () => {
    return (
      <div style={{ display: "none" }}>
        <div ref={contentRef}>
          {currFileType !== "word" && (
            <>
              <div className="kwitansi-content">
                <div className="bank-detail">
                  <div class="bank-container">
                    <div class="bank-item">
                      <span class="bank-label">BANK</span> <span class="bank-separator">:</span>
                      <span class="bank-value">
                        <span>{projectDetailData.nama_bank_pihak_2 || "(Nama Bank Pihak 2)"}</span>
                      </span>
                    </div>
                    <div class="bank-item">
                      <span class="bank-label">REKENING</span> <span class="bank-separator">:</span>
                      <span class="bank-value">
                        <span>{projectDetailData.nomor_rekening_pihak_2 || "(Rekening pihak 2)"}</span>
                      </span>
                    </div>
                    <div class="bank-item">
                      <span class="bank-label">NPWP</span> <span class="bank-separator">:</span>
                      <span class="bank-value">
                        <span>{projectDetailData.npwp_pihak_2 || "(NPWP Pihak 2)"}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="kwitansi-tittle-bar">KWITANSI</div>

                <div className="kwitansi-detail-container">
                  <span className="label-detail-kwitansi">Telah Terima Dari</span>
                  <span className="separator-detail-kwitansi">:</span>
                  <span className="value-detail-kwitansi">
                    <span>{formData.telah_terima_dari || "(Telah Terima Dari)"}</span>
                  </span>

                  <span className="label-detail-kwitansi">Uang Sebanyak</span>
                  <span className="separator-detail-kwitansi">:</span>
                  <span className="value-detail-kwitansi">
                    <span>{formData.total_uang_terbilang || "(Uang Sebanyak)"}</span>
                  </span>

                  <span className="label-detail-kwitansi">Untuk Pembayaran</span>
                  <span className="separator-detail-kwitansi">:</span>
                  <span className="value-detail-kwitansi">
                    <span>{formData.tujuan_pembayaran || "(Untuk Pembayaran)"}</span>
                  </span>

                  <span className="label-detail-kwitansi">Surat Perjanjian/Kontrak</span>
                  <span className="separator-detail-kwitansi">:</span>
                  <span className="value-detail-kwitansi">
                    {/* dari project detail */}
                    Nomor <span className="separator-detail-kwitansi">:</span> <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>{" "}
                    <span>
                      {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                        new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })) ||
                        "(Tanggal Surat Perjanjian Kontrak)"}
                    </span>
                  </span>

                  <span className="label-detail-kwitansi">Berita Acara Pembayaran</span>
                  <span className="separator-detail-kwitansi">:</span>
                  <span className="value-detail-kwitansi">
                    Nomor <span className="separator-detail-kwitansi">:</span> <span>{formData.nomorSuratBAP || "(Nomor Surat BAP)"}</span>{" "}
                    <span>
                      {(projectDetailData.tanggalSuratBAP &&
                        new Date(projectDetailData.tanggalSuratBAP).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })) ||
                        "(Tanggal Surat BAP)"}
                    </span>
                  </span>
                </div>

                <div className="jumlah-layout">
                  <span className="label-jumlah-kwitansi">JUMLAH</span>
                  <span className="separator-jumlah-kwitansi">:</span>
                  <span className="value-jumlah-kwitansi">{formData.total_uang.masked || "(Total uang)"},- </span>
                </div>
                {/* dari project detail semua yg bawah */}
                <div className="tertanda-layout">
                  <div className="ttd-1">
                    {" "}
                    <div className="setuju-dibayar">
                      Setuju Dibayar : <br /> a/n Kuasa Pengguna Anggaran / <br /> Pejabat Pembuat Komitmen <br /> Universitas Bengkulu
                    </div>
                    <div className="ttd-kwitansi">
                      <div className="ttd-bold">
                        <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                      </div>
                      <div className="ttd-nip">
                        NIP. <span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="ttd-2">
                    <div className="tanggal-kwitansi-layout">
                      <span>{projectDetailData.tempat_ttd || "(Tempat TTD)"}</span>,{" "}
                      <span>
                        {(formData.tanggal_kwitansi &&
                          new Date(formData.tanggal_kwitansi).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal Kwitansi)"}
                      </span>
                    </div>
                    <div className="yang-menerima">
                      Yang Menerima <br /> Penyedia <br /> <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                    </div>{" "}
                    <div className="ttd-kwitansi">
                      <div className="ttd-bold">
                        <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                      </div>
                      <div className="ttd-nip">
                        <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {currFileType === "word" && (
            <>
              <div>
                <div
                  style={{
                    marginLeft: "550px", // Geser manual ke kanan
                  }}
                >
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
                        <td style={{ fontWeight: "bold", paddingRight: "10px", whiteSpace: "nowrap" }}>BANK</td>
                        <td style={{ padding: "0 5px" }}>:</td>
                        <td>{projectDetailData.nama_bank_pihak_2 || "(Nama Bank Pihak 2)"}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", paddingRight: "10px", whiteSpace: "nowrap" }}>REKENING</td>
                        <td style={{ padding: "0 5px" }}>:</td>
                        <td>{projectDetailData.nomor_rekening_pihak_2 || "(Rekening Pihak 2)"}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", paddingRight: "10px", whiteSpace: "nowrap" }}>NPWP</td>
                        <td style={{ padding: "0 5px" }}>:</td>
                        <td>{projectDetailData.npwp_pihak_2 || "(NPWP Pihak 2)"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="kwitansi-tittle-bar">KWITANSI</div>

                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
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
                        <td style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>Telah Terima Dari</td>
                        <td style={{ padding: "0 5px" }}>:</td>
                        <td>{formData.telah_terima_dari || "(Telah Terima Dari)"}</td>
                      </tr>
                      <tr>
                        <td style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>Uang Sebanyak</td>
                        <td style={{ padding: "0 5px" }}>:</td>
                        <td>{formData.total_uang_terbilang || "(Uang Sebanyak)"}</td>
                      </tr>
                      <tr>
                        <td style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>Untuk Pembayaran</td>
                        <td style={{ padding: "0 5px" }}>:</td>
                        <td>{formData.tujuan_pembayaran || "(Untuk Pembayaran)"}</td>
                      </tr>

                      <tr>
                        <td style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>Surat Perjanjian/Kontrak</td>
                        <td style={{ padding: "0 5px" }}>:</td>
                        <td>
                          Nomor : {projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}{" "}
                          {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                            new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })) ||
                            "(Tanggal Surat Perjanjian Kontrak)"}
                        </td>
                      </tr>

                      <tr>
                        <td style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>Berita Acara Pembayaran</td>
                        <td style={{ padding: "0 5px" }}>:</td>
                        <td>
                          Nomor : {formData.nomorSuratBAP || "(Nomor Surat BAP)"}{" "}
                          {(projectDetailData.tanggalSuratBAP &&
                            new Date(projectDetailData.tanggalSuratBAP).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })) ||
                            "(Tanggal Surat BAP)"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: "250px" }}>
                  <table
                    style={{
                      width: "300px",
                      borderCollapse: "collapse",
                      marginTop: "10px",
                      marginBottom: "10px",
                      marginLeft: "20px",
                      fontFamily: '"Times New Roman", Times, serif',
                      fontSize: "22px",
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          colSpan={2}
                          style={{
                            border: "1px solid black",
                            textAlign: "left",
                            paddingLeft: "20px",
                          }}
                        >
                          <span>JUMLAH : </span>
                          <span>{formData.total_uang.masked || "(Total uang)"},-</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: "380px" }}>
                  <table className="tertanda-layout">
                    <tr>
                      <td>
                        <div className="ttd-1">
                          {" "}
                          <div className="setuju-dibayar">
                            Setuju Dibayar : <br /> a/n Kuasa Pengguna Anggaran / <br /> Pejabat Pembuat Komitmen <br /> Universitas Bengkulu
                          </div>
                          <div class="nip-kwitansi-layout">
                            <div class="nip-kwitansi-name">{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</div>
                            <div class="nip-kwitansi-nip">NIP. {projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="ttd-2">
                          <div className="tanggal-kwitansi-layout">
                            <span>{projectDetailData.tempat_ttd || "(Tempat TTD)"}</span>,{" "}
                            <span>
                              {(formData.tanggal_kwitansi &&
                                new Date(formData.tanggal_kwitansi).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })) ||
                                "(Tanggal Kwitansi)"}
                            </span>
                          </div>
                          <div className="yang-menerima">
                            Yang Menerima <br /> Penyedia <br /> <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                          </div>
                          <div class="nip-kwitansi-layout">
                            <div class="nip-kwitansi-name">{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</div>
                            <div class="nip-kwitansi-nip">NIP. {projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
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
      const filename = "kwitansi_termin";

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
            {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"Kwitansi"} />}
            {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"Kwitansi"} />}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nomor Surat BAP <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nomorSuratBAP"
              className={errors.nomorSuratBAP ? "input-field-form-error" : "input-field-form"}
              value={formData.nomorSuratBAP}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nomorSuratBAP && <span className="error-text">{errors.nomorSuratBAP}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Surat BAP <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.tanggalSuratBAP}
              name="tanggalSuratBAP"
              onChange={(date) => handleDateChange("tanggalSuratBAP", date)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={errors.tanggalSuratBAP ? "input-field-form-date-error" : "input-field-form-date"}
              dateFormat="dd/MM/yyyy"
              placeholderText="Isi bagian ini"
            />
            {errors.tanggalSuratBAP && <p className="error-text">{errors.tanggalSuratBAP}</p>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Kwitansi <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.tanggal_kwitansi}
              name="tanggal_kwitansi"
              onChange={(date) => handleDateChange("tanggal_kwitansi", date)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={errors.tanggal_kwitansi ? "input-field-form-date-error" : "input-field-form-date"}
              dateFormat="dd/MM/yyyy"
              placeholderText="Isi bagian ini"
            />
            {errors.tanggal_kwitansi && <p className="error-text">{errors.tanggal_kwitansi}</p>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Telah Terima Dari <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="telah_terima_dari"
              className={errors.telah_terima_dari ? "input-field-form-error" : "input-field-form"}
              value={formData.telah_terima_dari}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.telah_terima_dari && <span className="error-text">{errors.telah_terima_dari}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Total Uang <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="total_uang"
              className={errors.total_uang ? "input-field-form-error" : "input-field-form"}
              value={formData.total_uang.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.total_uang && <span className="error-text">{errors.total_uang}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Total Uang (Terbilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="total_uang_terbilang"
              className={errors.total_uang_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.total_uang_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.total_uang_terbilang && <span className="error-text">{errors.total_uang_terbilang}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Tujuan Pembayaran <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="tujuan_pembayaran"
              className={errors.tujuan_pembayaran ? "input-field-form-error" : "input-field-form"}
              value={formData.tujuan_pembayaran}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.tujuan_pembayaran && <span className="error-text">{errors.tujuan_pembayaran}</span>}
          </div>
        </div>
        {/* Word */}

        <ComponentWord />
        {/* UI */}
        <KwitansiTerminPreview previewFormData={formData} detailDataProject={projectDetailData} />
      </div>

      <button className="button-simpan-blue" onClick={handleSubmitKwitansi}>
        Simpan
      </button>
    </>
  );
};

export default forwardRef(KwitansiTermin);

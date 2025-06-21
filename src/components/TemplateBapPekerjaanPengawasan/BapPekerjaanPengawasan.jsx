import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import DatePicker from "react-datepicker";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import axios from "axios";
import "./BapPekerjaanPengawasan.css";
import BapPekerjaanPengawasanPreview from "../TemplateBapPekerjaanPengawasan/BapPekerjaanPengawasanPreview";
import Spinner from "../Spinner/spinner";
import { parse, format, isValid } from "date-fns";
import html2pdf from "html2pdf.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import documentStyleMapping from "../../documentStyles";

import "react-datepicker/dist/react-datepicker.css";

const BapPekerjaanPengawasan = ({ documentId, projectDetailData, currFileType, projectName }, ref) => {
  const contentRef = useRef(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nomor_bap_serahterima: "",
    tanggal_bap_serahterima: null,
    tanggal_bap_serahterima_terbilang: "",
    nomor_surat_perintah_kerja: "",
    tanggal_surat_perintah_kerja: null,
    nomor_surat_dipa: "",
    tanggal_surat_DIPA: null,
    nilai_kontrak: { raw: "", masked: "" },
    nilai_kontrak_terbilang: "",
    waktu_mulai: null,
    waktu_selesai: null,
  });

  const [errors, setErrors] = useState({});

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
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/berita_acara_serah_terima_pekerjaan_pengawasan?id=${documentId}`);
          const rawData = response.data;

          setFormData({
            nomor_bap_serahterima: rawData.nomor_surat_berita_acara || "",
            tanggal_bap_serahterima: parseDateString(rawData.tanggal_surat_berita_acara) || "",
            tanggal_bap_serahterima_terbilang: rawData.tanggal_surat_berita_acara_huruf || "",
            nomor_surat_perintah_kerja: rawData.nomor_surat_perintah_kerja || "",
            tanggal_surat_perintah_kerja: parseDateString(rawData.tanggal_surat_perintah_kerja) || "",
            nomor_surat_dipa: rawData.nomor_surat_dipa || "",
            tanggal_surat_DIPA: parseDateString(rawData.tanggal_surat_dipa) || "",
            nilai_kontrak: {
              raw: parseInt(rawData.nilai_kontrak_angka, 10) || 0 || "", // nanti ganti nominal pembayaran
              masked: parseInt(rawData.nilai_kontrak_angka, 10) || 0 ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nilai_kontrak_angka)}` : "",
            },
            nilai_kontrak_terbilang: rawData.nilai_kontrak_huruf || "",
            waktu_mulai: parseDateString(rawData.waktu_mulai) || "",
            waktu_selesai: parseDateString(rawData.waktu_selesai) || "",
          });
        } else {
          setFormData({
            nomor_bap_serahterima: "",
            tanggal_bap_serahterima: "",
            tanggal_bap_serahterima_terbilang: "",
            nomor_surat_perintah_kerja: "",
            tanggal_surat_perintah_kerja: "",
            nomor_surat_dipa: "",
            tanggal_surat_DIPA: "",
            nilai_kontrak: { raw: "", masked: "" },
            nilai_kontrak_terbilang: "",
            waktu_mulai: "",
            waktu_selesai: "",
          });
        }
      } catch (error) {
        console.error("❌ Error fetching BAP Pemeriksaan Tahap:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [documentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nilai_kontrak") {
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

  const handleSubmitBapPekerjaanPerencanaan = async () => {
    setLoading(true);
    let newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      let value = formData[key]?.raw ?? formData[key] ?? "";

      // Kalau value adalah object (Date), konversi ke string dulu
      if (value instanceof Date) {
        value = value.toISOString();
      }

      if (typeof value === "string" && !value.trim()) {
        newErrors[key] = "Field ini harus diisi!";
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    if (documentId) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/put/berita_acara_serah_terima_pekerjaan_pengawasan?id=${documentId}`,
          {
            project_id: projectDetailData.id,
            nomor_surat_berita_acara: formData.nomor_bap_serahterima,
            tanggal_surat_berita_acara: formData.tanggal_bap_serahterima ? format(formData.tanggal_bap_serahterima, "yyyy-MM-dd") : null,
            tanggal_surat_berita_acara_huruf: formData.tanggal_bap_serahterima_terbilang,
            nomor_surat_perintah_kerja: formData.nomor_surat_perintah_kerja,
            tanggal_surat_perintah_kerja: formData.tanggal_surat_perintah_kerja ? format(formData.tanggal_surat_perintah_kerja, "yyyy-MM-dd") : null,

            nomor_surat_dipa: formData.nomor_surat_dipa,
            tanggal_surat_dipa: formData.tanggal_surat_DIPA ? format(formData.tanggal_surat_DIPA, "yyyy-MM-dd") : null,

            nilai_kontrak_angka: parseInt(formData.nilai_kontrak.raw, 10) || 0,
            nilai_kontrak_huruf: formData.nilai_kontrak_terbilang,
            waktu_mulai: formData.waktu_mulai,
            waktu_selesai: formData.waktu_selesai,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "berita_acara_serah_terima_pekerjaan_pengawasan",
            record_id: 1,
            action_type: "UPDATE",
            timestamp: currentTimestamp,
            project_id: projectDetailData.id,
            project_name: projectName || "",
            description: "Pembaharuan Detil Surat Berita Acara Serah Terima Pekerjaan Pengawasan",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("✅ Berhasil:", responseHistory.data);

        setLoading(false);
        console.log("✅ Ringkasan Kontrak berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        setLoading(false);
        console.error("❌ Gagal membuat Ringkasan Kontrak:", error);
        setIsFailedModalOpen(true);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/berita_acara_serah_terima_pekerjaan_pengawasan`,
          {
            project_id: projectDetailData.id,
            nomor_surat_berita_acara: formData.nomor_bap_serahterima,
            tanggal_surat_berita_acara: formData.tanggal_bap_serahterima ? format(formData.tanggal_bap_serahterima, "yyyy-MM-dd") : null,
            tanggal_surat_berita_acara_huruf: formData.tanggal_bap_serahterima_terbilang,
            nomor_surat_perintah_kerja: formData.nomor_surat_perintah_kerja,
            tanggal_surat_perintah_kerja: formData.tanggal_surat_perintah_kerja ? format(formData.tanggal_surat_perintah_kerja, "yyyy-MM-dd") : null,

            nomor_surat_dipa: formData.nomor_surat_dipa,
            tanggal_surat_dipa: formData.tanggal_surat_DIPA ? format(formData.tanggal_surat_DIPA, "yyyy-MM-dd") : null,

            nilai_kontrak_angka: parseInt(formData.nilai_kontrak.raw, 10) || 0,
            nilai_kontrak_huruf: formData.nilai_kontrak_terbilang,
            waktu_mulai: formData.waktu_mulai,
            waktu_selesai: formData.waktu_selesai,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "berita_acara_serah_terima_pekerjaan_pengawasan",
            record_id: 1,
            action_type: "CREATE",
            timestamp: currentTimestamp,
            project_id: response.data.id,
            project_name: projectName || "",
            description: "Pembuatan Surat Berita Acara Serah Terima Pekerjaan Pengawasan",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("✅ Berhasil:", responseHistory.data);
        setLoading(false);
        console.log("✅ BAP Pekerjaan Perencanann berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        setLoading(false);
        console.error("❌ Gagal membuat  BAP Pekerjaan Perencanann:", error);
        setIsFailedModalOpen(true);
        console.error(error.response?.data);
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
              <div className="table-container-header">
                <table className="custom-table-header">
                  <tbody>
                    <tr>
                      <td>
                        <div className="surat-header-bap-perencanaan-text-bold">
                          KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
                          <br />
                          DAN TEKNOLOGI
                          <br /> UNIVERSITAS BENGKULU
                        </div>
                      </td>
                      <td>
                        <div className="surat-header-bap-perencanaan-text-bold-right">
                          BERITA ACARA SERAH TERIMA
                          <br />
                          PEKERJAAN PENGAWASAN
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="pekerjaan-bap-perencanaan">
                          <div className="pekerjaan-title-bap-perencanaan">
                            JENIS PEKERJAAN :{" "}
                            <span className="pekerjaan-bap-perencanaan-value">
                              <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="bap-perencanaan-header-container">
                          <span className="label-bap">Nomor</span>
                          <span className="separator-bap">:</span>
                          <span className="value-bap">
                            <span>{formData.nomor_bap_serahterima || "(Nomor BAP)"}</span>
                          </span>

                          <span className="label-bap">Tanggal</span>
                          <span className="separator-bap">:</span>
                          <span className="value-bap">
                            <span>
                              {(formData.tanggal_bap_serahterima &&
                                new Date(formData.tanggal_bap_serahterima).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })) ||
                                "(Tanggal Surat BAP)"}
                            </span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                    <td style={{ textAlign: "center", fontWeight: "bold", fontSize: "18px", padding: "10px" }}>
                      KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
                      <br />
                      DAN TEKNOLOGI
                      <br />
                      UNIVERSITAS BENGKULU
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "bold", fontSize: "18px", padding: "20px" }}>
                      BERITA ACARA SERAH
                      <br />
                      TERIMA PEKERJAAN PENGAWASAN
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td style={{ padding: "10px", textAlign: "left", width: "60%" }}>
                      {" "}
                      <span style={{ fontWeight: "bold" }}> JENIS PEKERJAAN</span> : {projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}
                    </td>
                    <td style={{ padding: "10px" }}>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Nomor</span> : <span>{formData.nomor_bap_serahterima || "(Nomor BAP)"}</span>
                      </div>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Tanggal</span> :{" "}
                        <span>
                          {(formData.tanggal_bap_serahterima &&
                            new Date(formData.tanggal_bap_serahterima).toLocaleDateString("id-ID", {
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

          {/* content bap pekerjaan pengawasan */}
          {currFileType !== "word" && (
            <>
              <div className="paragraf-text-justify">
                Pada hari ini, <span>{formData.tanggal_bap_serahterima_terbilang || "(Hari dan Tanggal Terbilang)"}</span> ({" "}
                <span>
                  {(formData.tanggal_bap_serahterima &&
                    new Date(formData.tanggal_bap_serahterima)
                      .toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .replace(/\//g, "-")) ||
                    "(Tanggal Surat BAP)"}
                </span>
                ) , kami yang bertanda tangan di bawah ini :
              </div>
              <div className="bap-termin-wrapper">
                {/* PIHAK PERTAMA */}
                <div className="bap-termin-container">
                  <div className="bap-termin-item">
                    <span className="bap-number">1.</span>
                    <span className="bap-label">Nama</span> <span className="bap-separator">:</span>
                    <span className="bap-value">
                      <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                    </span>
                  </div>
                  <div className="bap-termin-item">
                    <span className="bap-number"></span>
                    <span className="bap-label">Jabatan</span> <span className="bap-separator">:</span>
                    <span className="bap-value">
                      <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                    </span>
                  </div>
                  <div className="bap-termin-item">
                    <span className="bap-number"></span>
                    <span className="bap-label">Alamat</span> <span className="bap-separator">:</span>
                    <span className="bap-value">
                      <span>{projectDetailData.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
                    </span>
                  </div>
                </div>
                <p className="bap-pihak-pertama-perencanaan">
                  Yang selanjutnya disebut sebagai <strong>PIHAK KESATU</strong>
                </p>

                {/* PIHAK KEDUA */}
                <div className="bap-termin-container">
                  <div className="bap-termin-item">
                    <span className="bap-number">2.</span>
                    <span className="bap-label">Nama</span> <span className="bap-separator">:</span>
                    <span className="bap-value">
                      <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                    </span>
                  </div>
                  <div className="bap-termin-item">
                    <span className="bap-number"></span>
                    <span className="bap-label">Jabatan</span> <span className="bap-separator">:</span>
                    <span className="bap-value">
                      <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                    </span>
                  </div>
                  <div className="bap-termin-item">
                    <span className="bap-number"></span>
                    <span className="bap-label">Alamat</span> <span className="bap-separator">:</span>
                    <span className="bap-value">
                      <span>{projectDetailData.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
                    </span>
                  </div>
                </div>
                <p className="bap-pihak-pertama-perencanaan">
                  Yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>
                </p>
              </div>
              <div className="paragraf-text-justify">
                Berdasarkan Surat Perintah Kerja Nomor : <span>{formData.nomor_surat_perintah_kerja || "(Nomor Surat Perintah Kerja)"}</span> tanggal{" "}
                <span>
                  {(formData.tanggal_surat_perintah_kerja &&
                    new Date(formData.tanggal_surat_perintah_kerja).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Surat Perintah Kerja)"}
                </span>
                , dengan ini telah setuju dan sepakat untuk melakukan Serah Terima Pekerjaan <strong>PENGAWASAN</strong> dengan ketentuan sebagai berikut : <strong> PIHAK KEDUA</strong> menyerahkan kepada <strong>PIHAK KESATU</strong> dan{" "}
                <strong>PIHAK KESATU</strong> menyatakan menerima seluruh hasil pekerjaan pelaksanaan untuk :
              </div>
              <div className="bast-perencanaan-container">
                <div className="bast-perencanaan-item">
                  <span className="bast-perencanaan-label">
                    <strong>a.</strong> Pekerjaan
                  </span>
                  <span className="bast-perencanaan-separator">:</span>
                  <span className="bast-perencanaan-value">
                    <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Jenis Pekerjaan)"}</span>
                  </span>
                </div>

                <div className="bast-perencanaan-item">
                  <span className="bast-perencanaan-label">
                    <strong>b.</strong> Lokasi
                  </span>
                  <span className="bast-perencanaan-separator">:</span>
                  <span className="bast-perencanaan-value">Kampus Universitas Bengkulu</span>
                </div>

                <div className="bast-perencanaan-item">
                  <span className="bast-perencanaan-label">
                    <strong>c.</strong> Sumber Dana
                  </span>
                  <span className="bast-perencanaan-separator">:</span>
                  <span className="bast-perencanaan-value">DIPA Universitas Bengkulu</span>
                </div>

                <div className="bast-perencanaan-sub-item">
                  <span className="bast-perencanaan-sub-label">Nomor</span>
                  <span className="bast-perencanaan-separator">:</span>
                  <span className="bast-perencanaan-value">
                    <span>{formData.nomor_surat_dipa || "(Nomor Surat DIPA)"}</span>
                  </span>
                </div>

                <div className="bast-perencanaan-sub-item">
                  <span className="bast-perencanaan-sub-label">Tanggal</span>
                  <span className="bast-perencanaan-separator">:</span>
                  <span className="bast-perencanaan-value">
                    {" "}
                    <span>
                      {(formData.tanggal_surat_DIPA &&
                        new Date(formData.tanggal_surat_DIPA).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })) ||
                        "(Tanggal Surat DIPA)"}
                    </span>
                  </span>
                </div>

                <div className="bast-perencanaan-item">
                  <span className="bast-perencanaan-label">
                    <strong>d.</strong> Konsultan Perencana
                  </span>
                  <span className="bast-perencanaan-separator">:</span>
                  <span className="bast-perencanaan-value">
                    <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                  </span>
                </div>

                <div className="bast-perencanaan-item">
                  <span className="bast-perencanaan-label">
                    <strong>e.</strong> Kontrak
                  </span>
                  <span className="bast-perencanaan-separator">:</span>
                  <span className="bast-perencanaan-sub-label">Nomor</span>
                  <span className="bast-perencanaan-separator">:</span>
                  <span className="bast-perencanaan-value">
                    <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Kontrak)"}</span>
                  </span>
                </div>

                <div className="bast-perencanaan-sub-item">
                  <span className="bast-perencanaan-sub-label">Tanggal</span>
                  <span className="bast-perencanaan-separator">:</span>
                  <span className="bast-perencanaan-value">
                    <span>
                      {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                        new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })) ||
                        "(Tanggal Surat Kontrak)"}
                    </span>
                  </span>
                </div>

                <div className="bast-perencanaan-item">
                  <span className="bast-perencanaan-label">
                    <strong>f.</strong> Nilai Kontrak
                  </span>
                  <span className="bast-perencanaan-separator">:</span>
                  <span className="bast-perencanaan-value">
                    <strong>
                      <span>{formData.nilai_kontrak.masked || "(Nilai Kontrak)"}</span>
                      ,-
                    </strong>
                  </span>
                </div>

                <div className="bast-perencanaan-sub-item">
                  <span className="bast-perencanaan-value">
                    <strong>
                      (<span>{formData.nilai_kontrak_terbilang || "(Nilai kontrak terbilang)"}</span>)
                    </strong>
                  </span>
                </div>

                <div className="bast-perencanaan-item">
                  <span className="bast-perencanaan-label">
                    <strong>g.</strong> Waktu Pekerjaan
                  </span>
                  <span className="bast-perencanaan-separator">:</span>
                  <span className="bast-perencanaan-sub-label">Mulai</span>
                  <span className="bast-perencanaan-separator">:</span>
                  <span className="bast-perencanaan-value">
                    <span>
                      {(formData.waktu_mulai &&
                        new Date(formData.waktu_mulai).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })) ||
                        "(Waktu Mulai)"}
                    </span>
                  </span>
                </div>

                <div className="bast-perencanaan-sub-item">
                  <span className="bast-perencanaan-sub-label">Selesai</span>
                  <span className="bast-perencanaan-separator">:</span>
                  <span className="bast-perencanaan-value">
                    <span>
                      {(formData.waktu_selesai &&
                        new Date(formData.waktu_selesai).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })) ||
                        "(Waktu Selesai)"}
                    </span>
                  </span>
                </div>
              </div>
              <div className="paragraf-text-justify">
                Demikian berita acara Serah Terima Pekerjaan Pengawasan ini dibuat dan ditanda tangani di {projectDetailData.tempat_ttd} pada tanggal tersebut diatas dalam secukupnya untuk dapat dipergunakan sebagaimana mestinya.
              </div>
              <div className="ttd-bast-perencanaan-layout">
                <div className="ttd-bast-perencanaan-ph1">
                  <strong>PIHAK KESATU</strong>
                  <div>PPK Universitas Bengkulu</div>
                  <div className="tertanda-bast-perencanaan">
                    <div className="tertanda-bast-underline">
                      <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                    </div>
                    <div>
                      NIP. <span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                    </div>
                  </div>
                </div>
                <div className="ttd-bast-perencanaan-ph1">
                  <strong>PIHAK KEDUA</strong>
                  <div>Konsultan Perencana</div>
                  <div>
                    <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                  </div>
                  <div className="tertanda-bast-perencanaan">
                    <div className="tertanda-bast-underline">
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
              <div className="paragraf-text-justify">
                Pada hari ini, <span>{formData.tanggal_bap_serahterima_terbilang || "(Hari dan Tanggal Terbilang)"}</span> ({" "}
                <span>
                  {(formData.tanggal_bap_serahterima &&
                    new Date(formData.tanggal_bap_serahterima)
                      .toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .replace(/\//g, "-")) ||
                    "(Tanggal Surat BAP)"}
                </span>
                ) , kami yang bertanda tangan di bawah ini :
              </div>
              <div style={{ marginLeft: "20px" }}>
                {" "}
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
                            <td
                              style={{
                                width: "120px", // lebar tetap supaya sejajar
                                whiteSpace: "nowrap",
                                verticalAlign: "top",
                                fontWeight: "bold",
                                paddingLeft: index === 0 ? "0px" : "18px", // indentasi untuk baris selain pertama
                              }}
                            >
                              {index === 0 ? `1. ${item.label}` : item.label}
                            </td>
                            <td style={{ verticalAlign: "top", width: "10px" }}>:</td>
                            <td style={{ verticalAlign: "top" }}>{item.value}</td>
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
                            <td
                              style={{
                                width: "120px", // lebar tetap supaya sejajar
                                whiteSpace: "nowrap",
                                verticalAlign: "top",
                                fontWeight: "bold",
                                paddingLeft: index === 0 ? "0px" : "18px", // indentasi untuk baris selain pertama
                              }}
                            >
                              {index === 0 ? `2. ${item.label}` : item.label}
                            </td>
                            <td style={{ verticalAlign: "top", width: "10px" }}>:</td>
                            <td style={{ verticalAlign: "top" }}>{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p class="bap-pihak-pertama">
                    Yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>
                  </p>
                </div>
              </div>

              <div className="paragraf-text-justify">
                Berdasarkan Surat Perintah Kerja Nomor : <span>{formData.nomor_surat_perintah_kerja || "(Nomor Surat Perintah Kerja)"}</span> tanggal{" "}
                <span>
                  {(formData.tanggal_surat_perintah_kerja &&
                    new Date(formData.tanggal_surat_perintah_kerja).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Surat Perintah Kerja)"}
                </span>
                , dengan ini telah setuju dan sepakat untuk melakukan Serah Terima Pekerjaan <strong>PENGAWASAN</strong> dengan ketentuan sebagai berikut : <strong> PIHAK KEDUA</strong> menyerahkan kepada <strong>PIHAK KESATU</strong> dan{" "}
                <strong>PIHAK KESATU</strong> menyatakan menerima seluruh hasil pekerjaan pelaksanaan untuk :
              </div>
              <div style={{ marginLeft: "20px" }}>
                <div className="bast-perencanaan-container">
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: '"Times New Roman", Times, serif', fontSize: "16px", color: "#000" }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "160px", verticalAlign: "top", whiteSpace: "nowrap" }}>a. Pekerjaan</td>
                        <td style={{ verticalAlign: "top", width: "10px" }}>:</td>
                        <td>{projectDetailData.ruang_lingkup_pekerjaan || "(Jenis Pekerjaan)"}</td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>b. Lokasi</td>
                        <td style={{ verticalAlign: "top", width: "10px" }}>:</td>
                        <td>{projectDetailData.lokasi_pekerjaan || "(Pekerjaan)"}</td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>c. Sumber Dana</td>
                        <td style={{ verticalAlign: "top", width: "10px" }}>:</td>
                        <td>
                          DIPA Universitas Bengkulu
                          <table style={{ marginTop: "0", fontSize: "16px" }}>
                            <tbody>
                              <tr>
                                <td style={{ width: "80px", whiteSpace: "nowrap" }}>Nomor</td>
                                <td style={{ width: "10px" }}>:</td>
                                <td>{formData.nomor_surat_dipa || "(Nomor Surat DIPA)"}</td>
                              </tr>
                              <tr>
                                <td style={{ whiteSpace: "nowrap" }}>Tanggal</td>
                                <td style={{ width: "10px" }}>:</td>
                                <td>
                                  {(formData.tanggal_surat_DIPA &&
                                    new Date(formData.tanggal_surat_DIPA).toLocaleDateString("id-ID", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })) ||
                                    "(Tanggal Surat DIPA)"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>d. Konsultan Perencana</td>
                        <td style={{ width: "10px" }}>:</td>
                        <td>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>e. Kontrak</td>
                        <td style={{ width: "10px", verticalAlign: "top" }}>:</td>
                        <td>
                          <table style={{ fontSize: "16px", fontFamily: '"Times New Roman", Times, serif', marginTop: 0 }}>
                            <tbody>
                              <tr>
                                <td style={{ width: "80px", whiteSpace: "nowrap" }}>Nomor</td>
                                <td style={{ width: "10px" }}>:</td>
                                <td>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Kontrak)"}</td>
                              </tr>
                              <tr>
                                <td style={{ whiteSpace: "nowrap" }}>Tanggal</td>
                                <td style={{ width: "10px" }}>:</td>
                                <td>
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
                        </td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>f. Nilai Kontrak</td>
                        <td style={{ width: "10px", verticalAlign: "top" }}>:</td>
                        <td>
                          <table style={{ fontSize: "16px", fontFamily: '"Times New Roman", Times, serif', marginTop: 0 }}>
                            <tbody>
                              <tr>
                                <td style={{ border: "none", padding: 0 }}>{formData.nilai_kontrak.masked || "(Nilai Kontrak)"}</td>
                              </tr>
                              <tr>
                                <td style={{ border: "none", padding: 0 }}>({formData.nilai_kontrak_terbilang || "(Nilai kontrak terbilang)"})</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td style={{ verticalAlign: "top" }}>g. Waktu Pekerjaan</td>
                        <td style={{ width: "10px", verticalAlign: "top" }}>:</td>
                        <td>
                          <table style={{ fontSize: "16px", fontFamily: '"Times New Roman", Times, serif', marginTop: 0 }}>
                            <tbody>
                              <tr>
                                <td style={{ width: "80px", whiteSpace: "nowrap" }}>Mulai</td>
                                <td style={{ width: "10px" }}>:</td>
                                <td>
                                  {(formData.waktu_mulai &&
                                    new Date(formData.waktu_mulai).toLocaleDateString("id-ID", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })) ||
                                    "(Waktu Mulai)"}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ whiteSpace: "nowrap" }}>Selesai</td>
                                <td style={{ width: "10px" }}>:</td>
                                <td>
                                  {(formData.waktu_selesai &&
                                    new Date(formData.waktu_selesai).toLocaleDateString("id-ID", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })) ||
                                    "(Waktu Selesai)"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="paragraf-text-justify">
                Demikian berita acara Serah Terima Pekerjaan Pengawasan ini dibuat dan ditanda tangani di {projectDetailData.tempat_ttd} pada tanggal tersebut diatas dalam secukupnya untuk dapat dipergunakan sebagaimana mestinya.
              </div>
              <div style={{ marginTop: "20px" }}>
                {" "}
                <table class="ttd-bap-layout">
                  <tr>
                    <td class="ttd-pihak">
                      <div class="ttd-pihak-kedua-bold">PIHAK KESATU</div>
                      <div class="ttd-pihak-kedua-light">PPK Universitas Bengkulu</div>

                      <div class="nip-bap-layout">
                        <div class="nip-bap-name">{projectDetailData.nama_pihak_1 || "(Nama Pihak 2)"}</div>
                        <div class="nip-bap-nip">NIP. {projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</div>
                      </div>
                    </td>

                    <td class="ttd-pihak">
                      <div class="ttd-pihak-kedua-bold">PIHAK KEDUA</div>
                      <div class="ttd-pihak-kedua-light">Konsultan Perencana</div>
                      <div class="ttd-pihak-kedua-bold">{projectDetailData.perusahaan_pihak_2 || "(Perusahaan pihak 2)"}</div>
                      <div class="nip-bap-layout">
                        <div class="nip-bap-name">{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</div>
                        <div class="nip-bap-nip">{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</div>
                      </div>
                    </td>
                  </tr>
                </table>
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
      const filename = "bap_pekerjaan_pengawasan";

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
        {" "}
        <div className="form-container">
          <div className="position-absolute">
            {" "}
            {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"BAP Pekerjaan Pengawasan"} />}
            {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"BAP Pekerjaan Pengawasan"} />}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nomor Berita Acara Serah Terima <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nomor_bap_serahterima"
              className={errors.nomor_bap_serahterima ? "input-field-form-error" : "input-field-form"}
              value={formData.nomor_bap_serahterima}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nomor_bap_serahterima && <span className="error-text">{errors.nomor_bap_serahterima}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Berita Acara Serah Terima <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.tanggal_bap_serahterima}
              name="tanggal_bap_serahterima"
              onChange={(date) => handleDateChange("tanggal_bap_serahterima", date)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={errors.tanggal_bap_serahterima ? "input-field-form-date-error" : "input-field-form-date"}
              dateFormat="dd/MM/yyyy"
              placeholderText="Isi bagian ini"
            />
            {errors.tanggal_bap_serahterima && <span className="error-text">{errors.tanggal_bap_serahterima}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Berita Acara Serah Terima (Teribilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="tanggal_bap_serahterima_terbilang"
              className={errors.tanggal_bap_serahterima_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.tanggal_bap_serahterima_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.tanggal_bap_serahterima_terbilang && <span className="error-text">{errors.tanggal_bap_serahterima_terbilang}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Nomor Surat Perintah Kerja <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nomor_surat_perintah_kerja"
              className={errors.nomor_surat_perintah_kerja ? "input-field-form-error" : "input-field-form"}
              value={formData.nomor_surat_perintah_kerja}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nomor_surat_perintah_kerja && <span className="error-text">{errors.nomor_surat_perintah_kerja}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Surat Perintah Kerja <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.tanggal_surat_perintah_kerja}
              name="tanggal_surat_perintah_kerja"
              onChange={(date) => handleDateChange("tanggal_surat_perintah_kerja", date)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={errors.tanggal_surat_perintah_kerja ? "input-field-form-date-error" : "input-field-form-date"}
              dateFormat="dd/MM/yyyy"
              placeholderText="Isi bagian ini"
            />
            {errors.tanggal_surat_perintah_kerja && <span className="error-text">{errors.tanggal_surat_perintah_kerja}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nomor Surat DIPA <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nomor_surat_dipa"
              className={errors.nomor_surat_dipa ? "input-field-form-error" : "input-field-form"}
              value={formData.nomor_surat_dipa}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nomor_surat_dipa && <span className="error-text">{errors.nomor_surat_dipa}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Surat DIPA <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.tanggal_surat_DIPA}
              name="tanggal_surat_DIPA"
              onChange={(date) => handleDateChange("tanggal_surat_DIPA", date)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={errors.tanggal_surat_DIPA ? "input-field-form-date-error" : "input-field-form-date"}
              dateFormat="dd/MM/yyyy"
              placeholderText="Isi bagian ini"
            />
            {errors.tanggal_surat_DIPA && <span className="error-text">{errors.tanggal_surat_DIPA}</span>}
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
              Nilai Kontrak (Terbilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nilai_kontrak_terbilang"
              className={errors.nilai_kontrak_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.nilai_kontrak_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nilai_kontrak_terbilang && <span className="error-text">{errors.nilai_kontrak_terbilang}</span>}
          </div>
          <div className="input-form-flex">
            <div className="input-container-column">
              {" "}
              <label className="input-label-flex">Waktu Mulai</label>
              <DatePicker
                selected={formData.waktu_mulai}
                name="waktu_mulai"
                onChange={(date) => handleDateChange("waktu_mulai", date)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={errors.waktu_mulai ? "input-field-form-flex-lampiran-error" : "input-field-form-flex-lampiran"}
                dateFormat="dd/MM/yyyy"
                placeholderText="Isi bagian ini"
              />
              {errors.waktu_mulai && <span className="error-text">{errors.waktu_mulai}</span>}
            </div>

            <div className="input-container-column">
              {" "}
              <label className="input-label-flex">Waktu Selesai</label>
              <DatePicker
                selected={formData.waktu_selesai}
                name="waktu_selesai"
                onChange={(date) => handleDateChange("waktu_selesai", date)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={errors.waktu_selesai ? "input-field-form-flex-lampiran-error" : "input-field-form-flex-lampiran"}
                dateFormat="dd/MM/yyyy"
                placeholderText="Isi bagian ini"
              />
              {errors.waktu_selesai && <span className="error-text">{errors.waktu_selesai}</span>}
            </div>
          </div>
        </div>
        {/* <BapPekerjaanPengawasanWord /> */}
        <ComponentWord />
        <BapPekerjaanPengawasanPreview formDataPreview={formData} dataProjectDetail={projectDetailData} />
      </div>

      <button className="button-simpan-blue" onClick={handleSubmitBapPekerjaanPerencanaan}>
        Simpan
      </button>
    </>
  );
};

export default forwardRef(BapPekerjaanPengawasan);

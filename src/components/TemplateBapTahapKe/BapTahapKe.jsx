import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import "./BapTahapKe.css";
import DatePicker from "react-datepicker";
import BapTahapKePreview from "./BapTahapKePreview";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import axios from "axios";
import { parse, format, isValid } from "date-fns";
import Spinner from "../Spinner/spinner";
import "react-datepicker/dist/react-datepicker.css";
import html2pdf from "html2pdf.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import documentStyleMapping from "../../documentStyles";

const BapTahapKe = ({ documentId, projectDetailData, onCreated, currFileType }, ref) => {
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    nomorSuratBAP: "",
    tanggalSuratBAP: "",
    tanggalSuratBAPTerbilang: "",
    tahap_ke: "",
    tahap_ke_terbilang: "",
    pembayaran_bulan: "",
    nomor_bap_serahterima: "",
    tanggal_bap_serahterima: "",
    nilai_kontrak: { raw: "", masked: "" },
    nilai_kontrak_terbilang: "",
    pembayaran_pekerjaan: { raw: "", masked: "" },
    pembayaran_pekerjaan_terbilang: "",
  });

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
        // Fetch current termin
        if (documentId) {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/berita_acara_pembayaran_tahap?id=${documentId}`);
          const rawData = response.data;

          setFormData({
            nomorSuratBAP: rawData.nomor_surat_bap || "",
            tanggalSuratBAP: parseDateString(rawData.tanggal_surat_bap) || "",
            tanggalSuratBAPTerbilang: rawData.tanggal_surat_bap_huruf || "",
            tahap_ke: rawData.nama_termin_tahap_ke || "",
            tahap_ke_terbilang: rawData.tahap_ke_terbilang || "",
            pembayaran_bulan: rawData.pembayaran_bulan,
            nomor_bap_serahterima: rawData.nomor_bap_serahterima || "", // tinggal get ini
            tanggal_bap_serahterima: parseDateString(rawData.tanggal_bap_serahterima) || "", // tinggal get ini
            nilai_kontrak: {
              raw: rawData.jumlah_nilai_kontrak_jumlah_total || "",
              masked: rawData.jumlah_nilai_kontrak_jumlah_total ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.jumlah_nilai_kontrak_jumlah_total)}` : "",
            },
            nilai_kontrak_terbilang: rawData.jumlah_nilai_kontrak_huruf || "",
            pembayaran_pekerjaan: {
              raw: rawData.jumlah_uang_yang_harus_dibayarkan || "",
              masked: rawData.jumlah_uang_yang_harus_dibayarkan ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.jumlah_uang_yang_harus_dibayarkan)}` : "",
            },
            pembayaran_pekerjaan_terbilang: rawData.jumlah_uang_yang_harus_dibayarkan_huruf || "",
          });
        } else {
          setFormData({
            nomorSuratBAP: "",
            tanggalSuratBAP: "",
            tanggalSuratBAPTerbilang: "",
            tahap_ke: "",
            tahap_ke_terbilang: "",
            pembayaran_bulan: "",
            nomor_bap_serahterima: "",
            tanggal_bap_serahterima: "",
            nilai_kontrak: { raw: "", masked: "" },
            nilai_kontrak_terbilang: "",
            pembayaran_pekerjaan: { raw: "", masked: "" },
            pembayaran_pekerjaan_terbilang: "",
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

    if (name === "nilai_kontrak" || name === "pembayaran_pekerjaan") {
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

  const handleSubmitBAPTahap = async () => {
    let newErrors = {};
    let isValid = true;
    setLoading(true);

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
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/put/berita_acara_pembayaran_tahap?id=${documentId}`,
          {
            project_id: projectDetailData.id,
            nomor_surat_bap: formData.nomorSuratBAP,
            tanggal_surat_bap: formData.tanggalSuratBAP ? format(formData.tanggalSuratBAP, "yyyy-MM-dd") : null,
            tanggal_surat_bap_huruf: formData.tanggalSuratBAPTerbilang,
            nama_termin_tahap_ke: formData.tahap_ke,
            tahap_ke_terbilang: formData.tahap_ke_terbilang,
            jumlah_nilai_kontrak_jumlah_total: parseInt(formData.nilai_kontrak.raw, 10) || 0,
            jumlah_nilai_kontrak_huruf: formData.nilai_kontrak_terbilang,

            pembayaran_bulan: formData.pembayaran_bulan,
            jumlah_uang_yang_harus_dibayarkan: parseInt(formData.pembayaran_pekerjaan.raw, 10) || 0,
            jumlah_uang_yang_harus_dibayarkan_huruf: formData.pembayaran_pekerjaan_terbilang,
            nomor_bap_serahterima: formData.nomor_bap_serahterima,
            tanggal_bap_serahterima: format(formData.tanggal_bap_serahterima, "yyyy-MM-dd"),
            // kurang [nomor_bap_serahterima,text] - [tanggal_bap_serahterima,date]
          },
          { headers: { "Content-Type": "application/json" } }
        );
        setLoading(false);
        console.log("✅ BAP Tahap berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        setLoading(false);
        console.error("❌ Gagal membuat BAP Tahap:", error);
        console.log("📦 Detail error dari API:", error.response?.data);
        setIsFailedModalOpen(true);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/berita_acara_pembayaran_tahap`,
          {
            project_id: projectDetailData.id,
            nomor_surat_bap: formData.nomorSuratBAP,
            tanggal_surat_bap: formData.tanggalSuratBAP ? format(formData.tanggalSuratBAP, "yyyy-MM-dd") : null,
            tanggal_surat_bap_huruf: formData.tanggalSuratBAPTerbilang,
            nama_termin_tahap_ke: formData.tahap_ke,
            tahap_ke_terbilang: formData.tahap_ke_terbilang,
            jumlah_nilai_kontrak_jumlah_total: parseInt(formData.nilai_kontrak.raw, 10) || 0,
            jumlah_nilai_kontrak_huruf: formData.nilai_kontrak_terbilang,

            pembayaran_bulan: formData.pembayaran_bulan,
            jumlah_uang_yang_harus_dibayarkan: parseInt(formData.pembayaran_pekerjaan.raw, 10) || 0,
            jumlah_uang_yang_harus_dibayarkan_huruf: formData.pembayaran_pekerjaan_terbilang,
            nomor_bap_serahterima: formData.nomor_bap_serahterima,
            tanggal_bap_serahterima: format(formData.tanggal_bap_serahterima, "yyyy-MM-dd"),
            // kurang [nomor_bap_serahterima,text] - [tanggal_bap_serahterima,date]
          },
          { headers: { "Content-Type": "application/json" } }
        );
        const newId = response.data?.id;
        if (onCreated && newId) onCreated(newId); // Kirim ke parent
        console.log("✅ Create success:", response.data);

        console.log("✅ Surat Pernyataan berhasil dibuat:", response.data);

        console.log("✅ BAP Termin berhasil dibuat:", response.data);
        setLoading(false);
        console.log("✅ BAP Tahap berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        setLoading(false);
        console.error("❌ Gagal Create BAP Tahap:", error);
        console.log("📦 Detail error dari API:", error.response?.data);
        setIsFailedModalOpen(true);
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
          <div className="surat-header-bap">
            <div className="table-container-bap-tahap">
              <table className="custom-table-bap-tahap">
                <tbody>
                  <tr>
                    <td>
                      <div className="surat-header-bap-tahap-text-bold">
                        KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
                        <br />
                        DAN TEKNOLOGI
                        <br /> UNIVERSITAS BENGKULU
                      </div>
                    </td>
                    <td>
                      <div className="surat-header-bap-tahap-text-bold-right">
                        BERITA ACARA PEMBAYARAN Tahap Ke-
                        <span>
                          {formData.tahap_ke || "(Tahap)"}(<span>{formData.tahap_ke_terbilang || "(Terbilang)"}</span>)
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row-table-bap-tahap">
                        <span className="label-table-bap-tahap">Pekerjaan</span>
                        <span className="separator-table-bap-tahap">:</span>
                        <span className="value-table-bap-tahap">
                          <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="row-table-bap-tahap">
                        <span className="label-table-bap-tahap">Nomor</span>
                        <span className="separator-table-bap-tahap">:</span>
                        <span className="value-table-bap-tahap">
                          <span>{formData.nomorSuratBAP || "(Nomor BAP)"}</span>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row-table-bap-tahap">
                        <span className="label-table-bap-tahap">Lokasi</span>
                        <span className="separator-table-bap-tahap">:</span>
                        <span className="value-table-bap-tahap">
                          <span>{projectDetailData.lokasi_pekerjaan || "(Lokasi Pekerjaan)"}</span>
                        </span>
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div className="row-table-bap-tahap">
                        <span className="label-table-bap-tahap">Tanggal</span>
                        <span className="separator-table-bap-tahap">:</span>
                        <span className="value-table-bap-tahap">
                          <span>
                            {(formData.tanggalSuratBAP &&
                              new Date(formData.tanggalSuratBAP).toLocaleDateString("id-ID", {
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
          </div>
          {currFileType !== "word" && (
            <>
              <div className="first-paragraph-bap">
                Pada hari ini, <span>{formData.tanggalSuratBAPTerbilang || "(Tanggal Surat BAP Terbilang)"}</span> ({" "}
                <span>
                  {(formData.tanggalSuratBAP &&
                    new Date(formData.tanggalSuratBAP)
                      .toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .replace(/\//g, "-")) ||
                    "(Tanggal Surat BAP)"}
                </span>
                ), kami yang bertanda tangan dibawah ini
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
              <div className="berdasarkan-text-underline">Berdasarkan :</div>
              <div className="termin-detail-tahap-wrapper">
                <div class="bap-termin-detail-tahap">
                  <span class="bap-termin-number">1.</span>
                  <p class="bap-termin-text">
                    Surat Perjanjian/Kontrak Nomor :
                    <span class="bap-termin-highlight">
                      <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>{" "}
                    </span>
                    , Tanggal
                    <span class="bap-termin-highlight">
                      {" "}
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
                  </p>
                </div>
                <div class="bap-termin-detail-tahap">
                  <span class="bap-termin-number">2.</span>
                  <p class="bap-termin-text">
                    Berita Acara Pemeriksaan Nomor :{" "}
                    <span class="bap-termin-highlight">
                      <span>{projectDetailData.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan)"}</span>{" "}
                    </span>
                    , Tanggal
                    <span class="bap-termin-highlight">
                      {" "}
                      <span>
                        {(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan &&
                          new Date(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal BAP Pemeriksaan)"}
                      </span>
                    </span>
                  </p>
                </div>
                <div class="bap-termin-detail-tahap">
                  <span class="bap-termin-number">3.</span>
                  <p class="bap-termin-text">
                    Berita Acara Serah Terima Nomor :
                    <span class="bap-termin-highlight">
                      <span>{formData.nomor_bap_serahterima || "(Nomor Berita acara serah terima)"}</span>{" "}
                    </span>
                    , Tanggal
                    <span class="bap-termin-highlight">
                      {" "}
                      <span>
                        {(formData.tanggal_bap_serahterima &&
                          new Date(formData.tanggal_bap_serahterima).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal berita acara serah terima)"}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <div className="berdasarkan-text-underline-2">Dengan ini menyatakan :</div>
              <div style={{ marginTop: "20px" }}>
                <div class="bap-termin-detail-tahap">
                  <span class="bap-termin-number">1.</span>
                  <p class="bap-termin-text">
                    Bahwa Berdasarkan Surat Perjanjian/Kontrak Nomor : <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span> tanggal{" "}
                    <span>
                      {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                        new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })) ||
                        "(Tanggal Surat Perjanjian Kontrak)"}
                    </span>{" "}
                    dengan Nilai Kontrak : <span>{formData.nilai_kontrak.masked || "(Nominal Nilai Kontrak)"}</span>(<span>{formData.nilai_kontrak_terbilang || "(Nilai Kontrak Terbilang)"}</span>) maka kepada PIHAK KEDUA dapat dilakukan
                    pembayaran pekerjaan Tahap Ke-
                    <span>{formData.tahap_ke || "(Tahap Angka)"}</span>(<span>{formData.tahap_ke_terbilang || "(Tahap terbilang)"}</span>) untuk bulan <span>{formData.pembayaran_bulan || "(Pembayaran Bulan)"}</span> yaitu sebesar{" "}
                    <span>{formData.pembayaran_pekerjaan.masked || "(Pembayaran Pekerjaan)"}</span>(<span>{formData.pembayaran_pekerjaan_terbilang || "(Pembayaran Pekerjaan terbilang)"}</span>)
                  </p>
                </div>
                <div class="bap-termin-detail-tahap">
                  <span class="bap-termin-number">2.</span>
                  <p class="bap-termin-text">
                    PIHAK KESATU dan PIHAK KEDUA telah sepakat atas jumlah pembayaran tersebut diatas ditransfer ke Rekening Nomor : <span>{projectDetailData.nomor_rekening_pihak_2 || "(Nomor rek pihak 2)"}</span> Pada :{" "}
                    <span>{projectDetailData.nama_bank_pihak_2 || "(Nama bank pihak 2)"}</span> Atas Nama : <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan/Instansi Pihak 2)"}</span>
                  </p>
                </div>
              </div>
              <div className="last-paragraph-bap">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>
              <div className="ttd-bap-layout">
                <div className="ttd-pihak-kedua-tahap">
                  <div className="ttd-pihak-kedua-bold">PIHAK KESATU</div>
                  <div className="ttd-pihak-kedua-light">
                    <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                  </div>
                  <div className="ttd-pihak-kedua-bold"> Universitas Bengkulu</div>
                  <div className="nip-bap-layout">
                    <div className="ttd-pihak-kedua-tahap">
                      <div className="nip-bap-name-tahap">
                        <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                      </div>
                      <div className="nip-bap-nip">
                        NIP. <span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ttd-pihak-kedua-tahap">
                  <div className="ttd-pihak-kedua-bold">PIHAK KEDUA</div>
                  <div className="ttd-pihak-kedua-light">KONTRAKTOR PELAKSANA</div>
                  <div className="ttd-pihak-kedua-bold">
                    {" "}
                    <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                  </div>
                  <div className="nip-bap-layout">
                    <div className="ttd-pihak-kedua-tahap">
                      <div className="nip-bap-name-tahap">
                        <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                      </div>
                      <div className="nip-bap-nip-tahap">
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
              <div className="first-paragraph-bap">
                Pada hari ini, <span>{formData.tanggalSuratBAPTerbilang || "(Tanggal Surat BAP Terbilang)"}</span> ({" "}
                <span>
                  {(formData.tanggalSuratBAP &&
                    new Date(formData.tanggalSuratBAP)
                      .toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .replace(/\//g, "-")) ||
                    "(Tanggal Surat BAP)"}
                </span>
                ), kami yang bertanda tangan dibawah ini
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
              <div className="berdasarkan-text-underline">Berdasarkan :</div>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: "16px",
                  marginTop: "0px",
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "top", width: "20px" }}>1.</td>
                    <td style={{ textAlign: "justify" }}>
                      Surat Perjanjian/Kontrak Nomor:
                      <span style={{ fontWeight: "bold" }}> {projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>, Tanggal
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                          new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal Surat Perjanjian Kontrak)"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>2.</td>
                    <td style={{ textAlign: "justify" }}>
                      Berita Acara Pemeriksaan Nomor:
                      <span style={{ fontWeight: "bold" }}> {projectDetailData.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan)"}</span>, Tanggal
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan &&
                          new Date(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal BAP Pemeriksaan)"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>3.</td>
                    <td style={{ textAlign: "justify" }}>
                      Berita Acara Serah Terima Nomor:
                      <span style={{ fontWeight: "bold" }}> {formData.nomor_bap_serahterima || "(Nomor Berita acara serah terima)"}</span>, Tanggal
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {(formData.tanggal_bap_serahterima &&
                          new Date(formData.tanggal_bap_serahterima).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal berita acara serah terima)"}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="berdasarkan-text-underline-2">Dengan ini menyatakan :</div>
              <div style={{ marginTop: "20px" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: '"Times New Roman", Times, serif',
                    fontSize: "16px",
                    marginTop: "0px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: "top", width: "20px" }}>1.</td>
                      <td style={{ textAlign: "justify" }}>
                        Bahwa Berdasarkan Surat Perjanjian/Kontrak Nomor : <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span> tanggal{" "}
                        <span>
                          {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                            new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })) ||
                            "(Tanggal Surat Perjanjian Kontrak)"}
                        </span>{" "}
                        dengan Nilai Kontrak : <span>{formData.nilai_kontrak.masked || "(Nominal Nilai Kontrak)"}</span>(<span>{formData.nilai_kontrak_terbilang || "(Nilai Kontrak Terbilang)"}</span>) maka kepada PIHAK KEDUA dapat dilakukan
                        pembayaran pekerjaan Tahap Ke-
                        <span>{formData.tahap_ke || "(Tahap Angka)"}</span>(<span>{formData.tahap_ke_terbilang || "(Tahap terbilang)"}</span>) untuk bulan <span>{formData.pembayaran_bulan || "(Pembayaran Bulan)"}</span> yaitu sebesar{" "}
                        <span>{formData.pembayaran_pekerjaan.masked || "(Pembayaran Pekerjaan)"}</span>(<span>{formData.pembayaran_pekerjaan_terbilang || "(Pembayaran Pekerjaan terbilang)"}</span>)
                      </td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: "top" }}>2.</td>
                      <td style={{ textAlign: "justify" }}>
                        PIHAK KESATU dan PIHAK KEDUA telah sepakat atas jumlah pembayaran tersebut diatas ditransfer ke Rekening Nomor : <span>{projectDetailData.nomor_rekening_pihak_2 || "(Nomor rek pihak 2)"}</span> Pada :{" "}
                        <span>{projectDetailData.nama_bank_pihak_2 || "(Nama bank pihak 2)"}</span> Atas Nama : <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan/Instansi Pihak 2)"}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="last-paragraph-bap">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>
              <table class="ttd-bap-layout">
                <tr>
                  <td class="ttd-pihak-kesatu-tahap">
                    <div class="ttd-pihak-kedua-bold">PIHAK KESATU</div>
                    <div class="ttd-pihak-kedua-light">
                      <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                    </div>
                    <div class="ttd-pihak-kedua-bold"> Universitas Bengkulu</div>
                    <div class="nip-bap-layout">
                      <div class="nip-bap-name-tahap">
                        <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                      </div>
                      <div class="nip-bap-nip">
                        NIP. <span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                      </div>
                    </div>
                  </td>

                  <td class="ttd-pihak-kedua-tahap">
                    <div class="ttd-pihak-kedua-bold">PIHAK KEDUA</div>
                    <div class="ttd-pihak-kedua-light">KONTRAKTOR PELAKSANA</div>
                    <div class="ttd-pihak-kedua-bold">
                      {" "}
                      <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                    </div>
                    <div class="nip-bap-layout">
                      <div>
                        <div class="nip-bap-name-tahap">
                          <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                        </div>
                        <div class="nip-bap-nip-tahap">
                          <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
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
      const filename = "berita_acara_pembayaran_tahap";

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
            {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"BAP Tahap"} />}
            {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"BAP Tahap"} />}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tahap Ke- (angka) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="tahap_ke"
              className={errors.tahap_ke ? "input-field-form-error" : "input-field-form"}
              value={formData.tahap_ke}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.tahap_ke && <span className="error-text">{errors.tahap_ke}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Tahap Ke- Terbilang<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="tahap_ke_terbilang"
              className={errors.tahap_ke_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.tahap_ke_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.tahap_ke_terbilang && <span className="error-text">{errors.tahap_ke_terbilang}</span>}
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
              Tanggal Surat BAP (Teribilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="tanggalSuratBAPTerbilang"
              className={errors.tanggalSuratBAPTerbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.tanggalSuratBAPTerbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.tanggalSuratBAPTerbilang && <p className="error-text">{errors.tanggalSuratBAPTerbilang}</p>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Nomor Surat BAP Serah Terima <span style={{ color: "red" }}>*</span>
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
              Tanggal Surat BAP Serah Terima <span style={{ color: "red" }}>*</span>
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
            {errors.tanggal_bap_serahterima && <p className="error-text">{errors.tanggal_bap_serahterima}</p>}
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

          <div className="input-container-form">
            <label className="input-label-form">
              Pembayaran Untuk Bulan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="pembayaran_bulan"
              className={errors.pembayaran_bulan ? "input-field-form-error" : "input-field-form"}
              value={formData.pembayaran_bulan}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.pembayaran_bulan && <span className="error-text">{errors.pembayaran_bulan}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Pembayaran Pekerjaan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="pembayaran_pekerjaan"
              className={errors.pembayaran_pekerjaan ? "input-field-form-error" : "input-field-form"}
              value={formData.pembayaran_pekerjaan.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.pembayaran_pekerjaan && <span className="error-text">{errors.pembayaran_pekerjaan}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Pembayaran Pekerjaan (Terbilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="pembayaran_pekerjaan_terbilang"
              className={errors.pembayaran_pekerjaan_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.pembayaran_pekerjaan_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.pembayaran_pekerjaan_terbilang && <span className="error-text">{errors.pembayaran_pekerjaan_terbilang}</span>}
          </div>
        </div>
        {/* <BapTahapKeWord formDataPreview={formData} dataProjectDetail={projectDetailData} /> */}
        <ComponentWord />
        <BapTahapKePreview formDataPreview={formData} dataProjectDetail={projectDetailData} />
      </div>

      <button className="button-simpan-blue" onClick={handleSubmitBAPTahap}>
        Simpan
      </button>
    </>
  );
};

export default forwardRef(BapTahapKe);

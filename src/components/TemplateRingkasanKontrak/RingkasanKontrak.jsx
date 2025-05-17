import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import axios from "axios";
import RingkasanKontrakPreview from "./RingkasanKontrakPreview";
import Spinner from "../Spinner/spinner";
import { parse, format, isValid } from "date-fns";
import LogoKampusLarge from "../../Assets/Images/image 1.png";
import html2pdf from "html2pdf.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import documentStyleMapping from "../../documentStyles";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const RingkasanKontrak = ({ documentId, projectDetailData, onCreated, currFileType }, ref) => {
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomor_ringkasan_kontrak: "",
    tanggal_ringkasan_kontrak: "",
    nomor_surat_dipa: "",
    tanggal_surat_DIPA: "",
    kode_kegiatan_mak: "",
    nilai_kontrak: { raw: "", masked: "" },
    nilai_kontrak_terbilang: "",
    uraian_pekerjaan: "",
    dalam_rangka_pembayaran: "",
    nominal_pembayaran: { raw: "", masked: "" },
    nominal_pembayaran_terbilang: "",
    jangka_waktu_pelaksanaan: "",
    jangka_waktu_pelaksanaan_terbilang: "",
    ketentuan_sanksi:
      "Apabila hasil pekerjaan yang diserahkan tidak sesuai dengan persyaratan yang telah ditentukan dalam kontrak maka segala penggantian ditanggung oleh pihak kedua dan apabila terjadi keterlambatan penyerahan hasil pekerjaan akibat kelalaian Pihak Kedua, maka Pihak Kedua akan dikenakan denda 1%o (satu Permil) dari nilai kontrak untuk setiap hari keterlambatan.",
  });

  const [errors, setErrors] = useState({});

  console.log("Id ringkasan kontrak", documentId);

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
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/ringkasan_kontrak?id=${documentId}`);
          const rawData = response.data;

          console.log("Tipe data date di ringkasan kontrak", typeof rawData.tanggal_ringkasan_kontrak);

          setFormData({
            nomor_ringkasan_kontrak: rawData.nomor_ringkasan_kontrak || "",
            tanggal_ringkasan_kontrak: parseDateString(rawData.tanggal_ringkasan_kontrak) || "",
            nomor_surat_dipa: rawData.nomor_dipa || "",
            tanggal_surat_DIPA: parseDateString(rawData.tanggal_dipa),
            kode_kegiatan_mak: rawData.kode_kegiatan_sub_kegiatan_mak || "",
            nilai_kontrak: {
              raw: rawData.nilai_kontrak_angka || "",
              masked: rawData.nilai_kontrak_angka ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nilai_kontrak_angka)}` : "",
            },
            nominal_pembayaran: {
              raw: rawData.nominal_pembayaran_angka || "",
              masked: rawData.nominal_pembayaran_angka ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nominal_pembayaran_angka)}` : "",
            },
            nominal_pembayaran_terbilang: rawData.nominal_pembayaran_huruf || "",
            nilai_kontrak_terbilang: rawData.nilai_kontrak_huruf,
            uraian_pekerjaan: rawData.perihal_keterangan,
            dalam_rangka_pembayaran: rawData.dalam_rangka_pembayaran,
            jangka_waktu_pelaksanaan: rawData.jangka_waktu_pelaksanaan,
            jangka_waktu_pelaksanaan_terbilang: rawData.jangka_waktu_pelaksanaan_huruf,
            ketentuan_sanksi:
              rawData.ketentuan_sanksi ||
              "Apabila hasil pekerjaan yang diserahkan tidak sesuai dengan persyaratan yang telah ditentukan dalam kontrak maka segala penggantian ditanggung oleh pihak kedua dan apabila terjadi keterlambatan penyerahan hasil pekerjaan akibat kelalaian Pihak Kedua, maka Pihak Kedua akan dikenakan denda 1%o (satu Permil) dari nilai kontrak untuk setiap hari keterlambatan.",
          });
        } else {
          setFormData({
            nomor_ringkasan_kontrak: "",
            tanggal_ringkasan_kontrak: "",
            nomor_surat_dipa: "",
            tanggal_surat_DIPA: "",
            kode_kegiatan_mak: "",
            nilai_kontrak: { raw: "", masked: "" },
            nilai_kontrak_terbilang: "",
            uraian_pekerjaan: "",
            dalam_rangka_pembayaran: "",
            nominal_pembayaran: { raw: "", masked: "" },
            nominal_pembayaran_terbilang: "",
            jangka_waktu_pelaksanaan: "",
            jangka_waktu_pelaksanaan_terbilang: "",
            ketentuan_sanksi:
              "Apabila hasil pekerjaan yang diserahkan tidak sesuai dengan persyaratan yang telah ditentukan dalam kontrak maka segala penggantian ditanggung oleh pihak kedua dan apabila terjadi keterlambatan penyerahan hasil pekerjaan akibat kelalaian Pihak Kedua, maka Pihak Kedua akan dikenakan denda 1%o (satu Permil) dari nilai kontrak untuk setiap hari keterlambatan.",
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

  const handleChangeTextArea = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nilai_kontrak" || name === "nominal_pembayaran") {
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

  const handleSubmitRingkasanKontrak = async () => {
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
    if (documentId) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/put/ringkasan_kontrak?id=${documentId}`,
          {
            project_id: projectDetailData.id,
            nomor_ringkasan_kontrak: formData.nomor_ringkasan_kontrak,
            nomor_dipa: formData.nomor_surat_dipa,
            tanggal_dipa: formData.tanggal_surat_DIPA ? format(formData.tanggal_surat_DIPA, "yyyy-MM-dd") : null, // Format YYYY-MM-DD,
            kode_kegiatan_sub_kegiatan_mak: formData.kode_kegiatan_mak,
            perihal_keterangan: formData.uraian_pekerjaan,
            nilai_kontrak_angka: formData.nilai_kontrak.raw,
            nilai_kontrak_huruf: formData.nilai_kontrak_terbilang,
            jangka_waktu_pelaksanaan: formData.jangka_waktu_pelaksanaan,
            dalam_rangka_pembayaran: formData.dalam_rangka_pembayaran,
            ketentuan_sanksi: formData.ketentuan_sanksi,

            nominal_pembayaran_angka: parseInt(formData.nominal_pembayaran.raw, 10) || 0,
            nominal_pembayaran_huruf: formData.nominal_pembayaran_terbilang || "",
            jangka_waktu_pelaksanaan_huruf: formData.jangka_waktu_pelaksanaan_terbilang || "",
            tanggal_ringkasan_kontrak: formData.tanggal_ringkasan_kontrak ? format(formData.tanggal_ringkasan_kontrak, "yyyy-MM-dd") : null,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ Ringkasan Kontrak berhasil dibuat:", response.data);
        setLoading(false);
        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error("❌ Gagal membuat Ringkasan Kontrak:", error);
        console.log("📦 Detail error dari API:", error.response?.data);
        setLoading(false);
        setIsFailedModalOpen(true);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/ringkasan_kontrak`,
          {
            project_id: projectDetailData.id,
            nomor_ringkasan_kontrak: formData.nomor_ringkasan_kontrak,
            nomor_dipa: formData.nomor_surat_dipa,
            tanggal_dipa: formData.tanggal_surat_DIPA ? format(formData.tanggal_surat_DIPA, "yyyy-MM-dd") : null, // Format YYYY-MM-DD,
            kode_kegiatan_sub_kegiatan_mak: formData.kode_kegiatan_mak,
            perihal_keterangan: formData.uraian_pekerjaan,
            nilai_kontrak_angka: formData.nilai_kontrak.raw,
            nilai_kontrak_huruf: formData.nilai_kontrak_terbilang,
            jangka_waktu_pelaksanaan: formData.jangka_waktu_pelaksanaan,
            dalam_rangka_pembayaran: formData.dalam_rangka_pembayaran,
            ketentuan_sanksi: formData.ketentuan_sanksi,

            nominal_pembayaran_angka: parseInt(formData.nominal_pembayaran.raw, 10) || 0,
            nominal_pembayaran_huruf: formData.nominal_pembayaran_terbilang || "",
            jangka_waktu_pelaksanaan_huruf: formData.jangka_waktu_pelaksanaan_terbilang || "",
            tanggal_ringkasan_kontrak: formData.tanggal_ringkasan_kontrak ? format(formData.tanggal_ringkasan_kontrak, "yyyy-MM-dd") : null,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        const newId = response.data?.id;
        if (onCreated && newId) onCreated(newId); // Kirim ke parent
        console.log("✅ Create success:", response.data);
        console.log("✅ Ringkasan Kontrak berhasil dibuat:", response.data);

        setLoading(false);
        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error("❌ Gagal membuat Ringkasan Kontrak:", error);
        console.log("📦 Detail error dari API:", error.response?.data);
        setLoading(false);
        setIsFailedModalOpen(true);
      }
    }
  };

  const ringkasanKontrakData = [
    {
      label: "1. Nomor dan tanggal DIPA",
      value: `${formData.nomor_surat_dipa || "(Nomor dan Tanggal DIPA)"}${" "} ${
        (formData.tanggal_surat_DIPA &&
          new Date(formData.tanggal_surat_DIPA).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })) ||
        "(Tanggal Surat DIPA)"
      }`,
    },
    {
      label: "2. Kode Kegiatan/Sub Kegiatan MAK",
      value: `${formData.kode_kegiatan_mak || "(Kode Kegiatan/Sub Kegiatan MAK)"}`,
    },
    {
      label: "3. Nomor & Tanggal Surat Perjanjian",
      value: `${projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}, ${" "} ${
        (projectDetailData.tanggal_surat_perjanjian_kontrak &&
          new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })) ||
        "(Tanggal Surat DIPA)"
      }`,
    },
    {
      label: "4. Nama Kontraktor/Perusahaan",
      value: projectDetailData.perusahaan_pihak_2 || "Perusahaan pihak 2",
    },
    {
      label: "5. Alamat Penyedia/Perusahaan",
      value: projectDetailData.alamat_pihak_2 || "Perusahaan pihak 2",
    },
    {
      label: "6. Nilai Surat Perjanjian /Kontrak",
      value: `${formData.nilai_kontrak?.masked || "(Nila Kontrak)"} (${formData.nilai_kontrak_terbilang || "(Nilai Kontrak terbilang)"})`,
    },
    {
      label: "7. Uraian & Volume Pekerjaan",
      value: formData.uraian_pekerjaan || "(Uraian Pekerjaan)",
    },
    {
      label: "8. Cara Pembayaran",
      value: `${formData.dalam_rangka_pembayaran || "(Cara Pembayaran)"} = ${formData.nominal_pembayaran?.masked || "(Nominal)"} (${formData.nominal_pembayaran_terbilang || "(Terbilang)"}) , dengan Jaminan Uang Muka`,
    },
    {
      label: "9. Jangka Waktu Pelaksanaan",
      value: `${formData.jangka_waktu_pelaksanaan || "(Jangka Waktu)"} (${formData.jangka_waktu_pelaksanaan_terbilang || "(Terbilang)"}) hari kalender`,
    },
    {
      label: "10. Ketentuan Sanksi",
      value: formData.ketentuan_sanksi || "(Ketentuan Sanksi)",
    },
    {
      label: "11. Nama Bank",
      value: projectDetailData.nama_bank_pihak_2 || "(Nama Bank pihak 2)",
    },
    {
      label: "12. Nomor Rekening",
      value: `${projectDetailData.nomor_rekening_pihak_2 || "(Nomor Rekening pihak 2)"} a.n ${projectDetailData.perusahaan_pihak_2 || "(Perusahaan pihak 2)"}`,
    },
    {
      label: "13. NPWP",
      value: projectDetailData.npwp_pihak_2 || "(Nama Bank pihak 2)",
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
          {/* render layout untuk pdf */}
          {currFileType !== "word" && (
            <>
              <div className="tittle-surat-ringkasan-kontrak">RINGKASAN KONTRAK</div>
              <div className="tittle-nomor-ringkasan-kontrak">
                Nomor : <span>{formData.nomor_ringkasan_kontrak || "(Nomor Ringkasan Kontrak)"}</span>
              </div>

              <div style={{ marginTop: "40px" }}>
                <table className="ringkasan-table">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          fontFamily: "Times New Roman, Times, serif",
                          color: "#000",
                          fontSize: "16px",
                          fontWeight: "lighter",
                          minWidth: "250px",
                          verticalAlign: "top",
                          padding: "4px 0",
                        }}
                      >
                        1. Nomor dan tanggal DIPA
                      </td>
                      <td
                        style={{
                          fontFamily: "Times New Roman, Times, serif",
                          color: "#000",
                          fontSize: "16px",
                          fontWeight: "lighter",
                          minWidth: "10px",
                          padding: "4px 8px",
                          verticalAlign: "top",
                        }}
                      >
                        :
                      </td>
                      <td
                        style={{
                          textAlign: "left",
                          fontFamily: "Times New Roman, Times, serif",
                          color: "#000",
                          fontSize: "16px",
                          fontWeight: "lighter",
                          verticalAlign: "top",
                          padding: "4px 0",
                        }}
                      >
                        {formData.nomor_surat_dipa || "(Nomor DIPA)"}{" "}
                        {(formData.tanggal_surat_DIPA &&
                          new Date(formData.tanggal_surat_DIPA).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal DIPA)"}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          fontFamily: "Times New Roman, Times, serif",
                          color: "#000",
                          fontSize: "16px",
                          fontWeight: "lighter",
                          minWidth: "250px",
                          verticalAlign: "top",
                          padding: "4px 0",
                        }}
                      >
                        2. Kode Kegiatan/Sub Kegiatan MAK
                      </td>
                      <td
                        style={{
                          fontFamily: "Times New Roman, Times, serif",
                          color: "#000",
                          fontSize: "16px",
                          fontWeight: "lighter",
                          minWidth: "10px",
                          padding: "4px 8px",
                          verticalAlign: "top",
                        }}
                      >
                        :
                      </td>
                      <td
                        style={{
                          textAlign: "left",
                          fontFamily: "Times New Roman, Times, serif",
                          color: "#000",
                          fontSize: "16px",
                          fontWeight: "lighter",
                          verticalAlign: "top",
                          padding: "4px 0",
                        }}
                      >
                        {formData.kode_kegiatan_mak || "(Kode Kegiatan/Sub Kegiatan MAK)"}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          fontFamily: "Times New Roman, Times, serif",
                          color: "#000",
                          fontSize: "16px",
                          fontWeight: "lighter",
                          minWidth: "250px",
                          verticalAlign: "top",
                          padding: "4px 0",
                        }}
                      >
                        3. Nomor & Tanggal Surat Perjanjian
                      </td>
                      <td
                        style={{
                          fontFamily: "Times New Roman, Times, serif",
                          color: "#000",
                          fontSize: "16px",
                          fontWeight: "lighter",
                          minWidth: "10px",
                          padding: "4px 8px",
                          verticalAlign: "top",
                        }}
                      >
                        :
                      </td>
                      <td
                        style={{
                          textAlign: "left",
                          fontFamily: "Times New Roman, Times, serif",
                          color: "#000",
                          fontSize: "16px",
                          fontWeight: "lighter",
                          verticalAlign: "top",
                          padding: "4px 0",
                        }}
                      >
                        {projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat)"} ,{" "}
                        {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                          new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal Surat Perjanjian)"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ whiteSpace: "nowrap", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "250px", verticalAlign: "top", padding: "4px 0" }}>
                        4. Nama Kontraktor/Perusahaan
                      </td>
                      <td style={{ fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "10px", padding: "4px 8px", verticalAlign: "top" }}>:</td>
                      <td style={{ textAlign: "left", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", verticalAlign: "top", padding: "4px 0" }}>
                        <td>{projectDetailData.perusahaan_pihak_2 || "Perusahaan pihak 2"}</td>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ whiteSpace: "nowrap", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "250px", verticalAlign: "top", padding: "4px 0" }}>
                        5. Alamat Penyedia/Perusahaan
                      </td>
                      {/* dari project detail  */}
                      <td style={{ fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "10px", padding: "4px 8px", verticalAlign: "top" }}>:</td>
                      <td style={{ textAlign: "left", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", verticalAlign: "top", padding: "4px 0" }}>
                        <td>{projectDetailData.alamat_pihak_2 || "Perusahaan pihak 2"}</td>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ whiteSpace: "nowrap", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "250px", verticalAlign: "top", padding: "4px 0" }}>
                        6. Nilai Surat Perjanjian /Kontrak
                      </td>
                      <td style={{ fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "10px", padding: "4px 8px", verticalAlign: "top" }}>:</td>
                      <td style={{ textAlign: "left", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", verticalAlign: "top", padding: "4px 0" }}>
                        <td>
                          {formData.nilai_kontrak.masked || "(Nila Kontrak)"} ({formData.nilai_kontrak_terbilang || "(Nilai Kontrak terbilang)"})
                        </td>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ whiteSpace: "nowrap", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "250px", verticalAlign: "top", padding: "4px 0" }}>
                        7. Uraian & Volume Pekerjaan
                      </td>
                      <td style={{ fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "10px", padding: "4px 8px", verticalAlign: "top" }}>:</td>
                      <td style={{ textAlign: "left", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", verticalAlign: "top", padding: "4px 0" }}>
                        <td>{formData.uraian_pekerjaan || "(Uraian Pekerjaan)"}</td>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ whiteSpace: "nowrap", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "250px", verticalAlign: "top", padding: "4px 0" }}>
                        8. Cara Pembayaran
                      </td>
                      <td style={{ fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "10px", padding: "4px 8px", verticalAlign: "top" }}>:</td>
                      <td style={{ textAlign: "left", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", verticalAlign: "top", padding: "4px 0" }}>
                        <td>
                          {formData.dalam_rangka_pembayaran || "(Cara Pembayaran)"} = {formData.nominal_pembayaran.masked || "(Nominal Pembayaran)"} ({formData.nominal_pembayaran_terbilang || "(Nominal Pembayaran Terbilang)"}), dengan
                          Jaminan Uang Muka
                        </td>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ whiteSpace: "nowrap", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "250px", verticalAlign: "top", padding: "4px 0" }}>
                        9. Jangka Waktu Pelaksanaan
                      </td>
                      <td style={{ fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "10px", padding: "4px 8px", verticalAlign: "top" }}>:</td>
                      <td style={{ textAlign: "left", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", verticalAlign: "top", padding: "4px 0" }}>
                        {" "}
                        <td>
                          {formData.jangka_waktu_pelaksanaan || "(Jangka Waktu Pelaksanaan)"} ({formData.jangka_waktu_pelaksanaan_terbilang || "(Jangka Waktu Pelaksanaan Terbilang)"}) hari kalender
                        </td>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ whiteSpace: "nowrap", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "250px", verticalAlign: "top", padding: "4px 0" }}>
                        10. Ketentuan Sanksi
                      </td>
                      <td style={{ fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "10px", padding: "4px 8px", verticalAlign: "top" }}>:</td>
                      <td style={{ textAlign: "left", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", verticalAlign: "top", padding: "4px 0" }}>{formData.ketentuan_sanksi}</td>
                    </tr>
                    <tr>
                      <td style={{ whiteSpace: "nowrap", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "250px", verticalAlign: "top", padding: "4px 0" }}>11. Nama Bank</td>
                      <td style={{ fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "10px", padding: "4px 8px", verticalAlign: "top" }}>:</td>
                      {/* project detail nama bank pihak 2 */}
                      <td style={{ textAlign: "left", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", verticalAlign: "top", padding: "4px 0" }}>
                        <td>({projectDetailData.nama_bank_pihak_2 || "(Nama Bank pihak 2)"})</td>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ whiteSpace: "nowrap", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "250px", verticalAlign: "top", padding: "4px 0" }}>
                        12. Nomor Rekening
                      </td>
                      {/* project detail no rek pihak 2 */}
                      <td style={{ fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "10px", padding: "4px 8px", verticalAlign: "top" }}>:</td>
                      <td style={{ textAlign: "left", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", verticalAlign: "top", padding: "4px 0" }}>
                        <td>
                          {projectDetailData.nomor_rekening_pihak_2 || "(Nomor Rekening pihak 2)"} a.n {projectDetailData.perusahaan_pihak_2 || "(Perusahaan pihak 2)"}
                        </td>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ whiteSpace: "nowrap", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "250px", verticalAlign: "top", padding: "4px 0" }}>13. NPWP</td>
                      {/* project detail no npwp pihak 2 */}
                      <td style={{ fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", minWidth: "10px", padding: "4px 8px", verticalAlign: "top" }}>:</td>
                      <td style={{ textAlign: "left", fontFamily: "Times New Roman, Times, serif", color: "#000", fontSize: "16px", fontWeight: "lighter", verticalAlign: "top", padding: "4px 0" }}>
                        <td>{projectDetailData.npwp_pihak_2 || "(Nama Bank pihak 2)"}</td>
                      </td>
                    </tr>

                    {/* Tambahkan row lainnya dengan pola yang sama */}
                  </tbody>
                </table>
              </div>
              {/* project detail  */}
              <div
                style={{
                  color: "#000",
                  fontFamily: '"Times New Roman", Times, serif',
                  textAlign: "left",
                  fontWeight: "lighter",
                  whiteSpace: "pre-line",
                  fontSize: "16px",
                  marginLeft: "450px",
                  marginTop: "295px",
                }}
              >
                <span>{projectDetailData.tempat_ttd || "(Tempat TTD)"}</span>,{" "}
                <span>
                  {(formData.tanggal_ringkasan_kontrak &&
                    new Date(formData.tanggal_ringkasan_kontrak).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Ringkasan Kontrak)"}
                </span>
                <br />
                a.n. Kuasa Pengguna Anggaran/ <br /> <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan pihak 1)"}</span> <br />
                UNIVERSITAS BENGKULU
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start", // "left" nggak valid, pakai "flex-start" untuk rata kiri
                  marginLeft: "450px",
                  marginTop: "125px",
                }}
              >
                <span
                  style={{
                    textDecoration: "underline",
                    color: "#000",
                    fontFamily: '"Times New Roman", Times, serif',
                    fontSize: "16px",
                  }}
                >
                  <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                </span>
                <span
                  style={{
                    marginTop: "3px",
                    color: "#000",
                    fontFamily: '"Times New Roman", Times, serif',
                    fontSize: "16px",
                  }}
                >
                  NIP: <span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                </span>
              </div>
            </>
          )}

          {/* render layout untuk word */}
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
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>RINGKASAN KONTRAK</div>
                <div style={{ marginTop: "5px" }}>Nomor: {formData.nomor_ringkasan_kontrak || "(Nomor Ringkasan Kontrak)"}</div>
              </div>

              <div className="ringkasan-container">
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
                    {ringkasanKontrakData.map((item, index) => (
                      <tr key={index}>
                        <td style={{ width: "250px", whiteSpace: "nowrap", verticalAlign: "top" }}>{item.label}</td>
                        <td style={{ paddingLeft: "10px", verticalAlign: "top" }}>:</td>
                        <td style={{ verticalAlign: "top" }}>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* project detail  */}
              <div
                style={{
                  color: "#000",
                  fontFamily: '"Times New Roman", Times, serif',
                  textAlign: "left",
                  fontWeight: "lighter",
                  whiteSpace: "pre-line",
                  fontSize: "16px",
                  marginLeft: "400px",
                  marginTop: "75px",
                }}
              >
                <span>{projectDetailData.tempat_ttd || "(Tempat TTD)"}</span>,{" "}
                <span>
                  {(formData.tanggal_ringkasan_kontrak &&
                    new Date(formData.tanggal_ringkasan_kontrak).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Ringkasan Kontrak)"}
                </span>
                <br />
                a.n. Kuasa Pengguna Anggaran/ <br /> <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan pihak 1)"}</span> <br />
                UNIVERSITAS BENGKULU
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: "400px",
                  marginTop: "80px",
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: "16px",
                  color: "#000",
                }}
              >
                <div style={{ textDecoration: "underline" }}>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</div>
                <div style={{ marginTop: "3px" }}>NIP: {projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</div>
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
      const filename = "ringkasan_kontrak";

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
            {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"Ringkasan Kontrak"} />}
            {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"Ringkasan Kontrak"} />}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nomor Ringkasan Kontrak <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nomor_ringkasan_kontrak"
              className={errors.nomor_ringkasan_kontrak ? "input-field-form-error" : "input-field-form"}
              value={formData.nomor_ringkasan_kontrak}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nomor_ringkasan_kontrak && <span className="error-text">{errors.nomor_ringkasan_kontrak}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Surat Ringkasan Kontrak <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.tanggal_ringkasan_kontrak}
              name="tanggal_ringkasan_kontrak"
              onChange={(date) => handleDateChange("tanggal_ringkasan_kontrak", date)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={errors.tanggal_ringkasan_kontrak ? "input-field-form-date-error" : "input-field-form-date"}
              dateFormat="dd/MM/yyyy"
              placeholderText="Isi bagian ini"
            />
            {errors.tanggal_ringkasan_kontrak && <span className="error-text">{errors.tanggal_ringkasan_kontrak}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nomor Surat DIPA<span style={{ color: "red" }}>*</span>
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
              Kode Kegiatan/Sub Kegiatan MAK <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="kode_kegiatan_mak"
              className={errors.kode_kegiatan_mak ? "input-field-form-error" : "input-field-form"}
              value={formData.kode_kegiatan_mak}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.kode_kegiatan_mak && <span className="error-text">{errors.kode_kegiatan_mak}</span>}
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
              Nilai Kontrak (Kalimat) <span style={{ color: "red" }}>*</span>
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
              Uraian dan Volume Pekerjaan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="uraian_pekerjaan"
              className={errors.uraian_pekerjaan ? "input-field-form-error" : "input-field-form"}
              value={formData.uraian_pekerjaan}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.uraian_pekerjaan && <span className="error-text">{errors.uraian_pekerjaan}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Dalam Rangka Pembayaran <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="dalam_rangka_pembayaran"
              className={errors.dalam_rangka_pembayaran ? "input-field-form-error" : "input-field-form"}
              value={formData.dalam_rangka_pembayaran}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.dalam_rangka_pembayaran && <span className="error-text">{errors.dalam_rangka_pembayaran}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Nominal Pembayaran <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nominal_pembayaran"
              className={errors.nominal_pembayaran ? "input-field-form-error" : "input-field-form"}
              value={formData.nominal_pembayaran.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nominal_pembayaran && <span className="error-text">{errors.nominal_pembayaran}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Nominal Pembayaran Terbilang <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nominal_pembayaran_terbilang"
              className={errors.nominal_pembayaran_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.nominal_pembayaran_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nominal_pembayaran_terbilang && <span className="error-text">{errors.nominal_pembayaran_terbilang}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Jangka Waktu Pelaksanaan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="jangka_waktu_pelaksanaan"
              className={errors.jangka_waktu_pelaksanaan ? "input-field-form-error" : "input-field-form"}
              value={formData.jangka_waktu_pelaksanaan}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.jangka_waktu_pelaksanaan && <span className="error-text">{errors.jangka_waktu_pelaksanaan}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Jangka Waktu Pelaksanaan Terbilang <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="jangka_waktu_pelaksanaan_terbilang"
              className={errors.jangka_waktu_pelaksanaan_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.jangka_waktu_pelaksanaan_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.jangka_waktu_pelaksanaan_terbilang && <span className="error-text">{errors.jangka_waktu_pelaksanaan_terbilang}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">Ketentuan Sanksi (Opsional)</label>
            <textarea type="text" className="input-textarea-form" placeholder="Isi bagian ini" rows={3} value={formData.ketentuan_sanksi} onChange={handleChangeTextArea} />
          </div>
        </div>
        {/* taro komponen word */}
        <ComponentWord />

        {/* taro komponen word UI */}
        <RingkasanKontrakPreview formDataPreview={formData} detailProjectData={projectDetailData} />
      </div>

      <button className="button-simpan-blue" onClick={handleSubmitRingkasanKontrak}>
        Simpan
      </button>
    </>
  );
};

export default forwardRef(RingkasanKontrak);

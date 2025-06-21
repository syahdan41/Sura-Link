import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import DatePicker from "react-datepicker";
import BapTerminKePreview from "./BapTerminKePreview";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import axios from "axios";
import { parse, format, isValid } from "date-fns";
import html2pdf from "html2pdf.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import documentStyleMapping from "../../documentStyles";

import Spinner from "../Spinner/spinner";

import "react-datepicker/dist/react-datepicker.css";

const BapTerminKe = ({ documentId, prevDocumentId = [], suffix, projectDetailData, onCreated, currFileType, projectName }, ref) => {
  const contentRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [previousTerminData, setPreviousTerminData] = useState([]); // <- untuk data termin sebelumnya
  const [dpTerminData, setDpTerminData] = useState({
    uang_muka: { raw: "", masked: "" },
    persentase_uangmuka: "",
    total_uangmuka: { raw: "", masked: "" },
  });

  const [formData, setFormData] = useState({
    nomorSuratBAP: "",
    tanggalSuratBAP: "",
    tanggalSuratBAPTerbilang: "",
    nama_termin_ke: "",
    persentase_pekerjaan: "",
    nama_termin_terbilang: "",
    nominal_termin: { raw: "", masked: "" },
    // Duid uang muka
    uang_muka: { raw: "", masked: "" },
    persentase_uangmuka: "",
    total_uangmuka: { raw: "", masked: "" },
    // duid progres fisik
    progres_fisik: { raw: "", masked: "" },
    persentase_progres_fisik: "",
    total_progres_fisik: { raw: "", masked: "" },
    // duid retensi pekerjaan
    retensi_pekerjaan: { raw: "", masked: "" },
    persentase_retensi_pekerjaan: "",
    total_retensi_pekerjaan: { raw: "", masked: "" },
    // duid uang muka
    pengembalian_uang_muka: { raw: "", masked: "" },
    persentase_pengembalian_uang_muka: "",
    total_pengembalian_uang_muka: { raw: "", masked: "" },
    // jumlah total
    jumlah_yang_sudah_dibayar: { raw: "", masked: "" },
    jumlah_yang_harus_dibayar: { raw: "", masked: "" },
    jumlah_yang_dibulatkan: { raw: "", masked: "" },
    jumlah_yang_dibulatkan_terbilang: "",
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
        // Fetch current termin
        if (documentId) {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/berita_acara_pembayaran_termin?id=${documentId}`);
          const rawData = response.data;
          console.log("tipe data tanggal :", typeof rawData.tanggal_surat_bap);
          setFormData({
            nomorSuratBAP: rawData.nomor_surat_bap || "",
            tanggalSuratBAP: parseDateString(rawData.tanggal_surat_bap) || "",

            tanggalSuratBAPTerbilang: rawData.tanggal_surat_bap_huruf || "",
            nama_termin_ke: rawData.nama_termin_ke || "",
            persentase_pekerjaan: rawData.persentase_pekerjaan || "",
            nama_termin_terbilang: rawData.tahap_terbilang || "",
            nominal_termin: {
              raw: rawData.nominal_termin || "",
              masked: rawData.nominal_termin ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nominal_termin)}` : "",
            },
            uang_muka: {
              raw: rawData.jumlah_uang_muka || "",
              masked: rawData.jumlah_uang_muka ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.jumlah_uang_muka)}` : "",
            },
            persentase_uangmuka: rawData.jumlah_persentase_uang_muka || "",
            total_uangmuka: {
              raw: rawData.total_uang_muka || "",
              masked: rawData.total_uang_muka ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.total_uang_muka)}` : "",
            },
            progres_fisik: {
              raw: rawData.jumlah_uang_progres_fisik || "",
              masked: rawData.jumlah_uang_progres_fisik ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.jumlah_uang_progres_fisik)}` : "",
            },
            persentase_progres_fisik: rawData.jumlah_persentase_uang_progres_fisik || "",
            total_progres_fisik: {
              raw: rawData.total_uang_progress_fisik || "",
              masked: rawData.total_uang_progress_fisik ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.total_uang_progress_fisik)}` : "",
            },
            retensi_pekerjaan: {
              raw: rawData.jumlah_uang_retensi_pekerjaan || "",
              masked: rawData.jumlah_uang_retensi_pekerjaan ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.jumlah_uang_retensi_pekerjaan)}` : "",
            },
            persentase_retensi_pekerjaan: rawData.jumlah_persentase_retensi_pekerjaan || "",
            total_retensi_pekerjaan: {
              raw: rawData.jumlah_uang_retensi_pekerjaan || "",
              masked: rawData.jumlah_uang_retensi_pekerjaan ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.jumlah_uang_retensi_pekerjaan)}` : "",
            },
            pengembalian_uang_muka: {
              raw: rawData.jumlah_pengembalian_uang_muka || "",
              masked: rawData.jumlah_pengembalian_uang_muka ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.jumlah_pengembalian_uang_muka)}` : "",
            },
            persentase_pengembalian_uang_muka: rawData.jumlah_persentase_pengembalian_uang_muka || "",
            total_pengembalian_uang_muka: {
              raw: rawData.jumlah_pengembalian_uang_muka || "",
              masked: rawData.jumlah_pengembalian_uang_muka ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.jumlah_pengembalian_uang_muka)}` : "",
            },
            jumlah_yang_sudah_dibayar: {
              raw: rawData.jumlah_yang_sudah_dibayar || "",
              masked: rawData.jumlah_yang_sudah_dibayar ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.jumlah_yang_sudah_dibayar)}` : "",
            },
            jumlah_yang_harus_dibayar: {
              raw: rawData.jumlah_yang_harus_dibayar || "",
              masked: rawData.jumlah_yang_harus_dibayar ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.jumlah_yang_harus_dibayar)}` : "",
            },
            jumlah_yang_dibulatkan: {
              raw: rawData.jumlah_yang_dibulatkan || "",
              masked: rawData.jumlah_yang_dibulatkan ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.jumlah_yang_dibulatkan)}` : "",
            },
            jumlah_yang_dibulatkan_terbilang: rawData.jumlah_yang_dibulatkan_huruf || "",
          });
        } else {
          setFormData({
            nomorSuratBAP: "",
            tanggalSuratBAP: "",
            tanggalSuratBAPTerbilang: "",
            nama_termin_ke: "",
            persentase_pekerjaan: "",
            nama_termin_terbilang: "",
            nominal_termin: { raw: "", masked: "" },
            // Duid uang muka
            uang_muka: { raw: "", masked: "" },
            persentase_uangmuka: "",
            total_uangmuka: { raw: "", masked: "" },
            // duid progres fisik
            progres_fisik: { raw: "", masked: "" },
            persentase_progres_fisik: "",
            total_progres_fisik: { raw: "", masked: "" },
            // duid retensi pekerjaan
            retensi_pekerjaan: { raw: "", masked: "" },
            persentase_retensi_pekerjaan: "",
            total_retensi_pekerjaan: { raw: "", masked: "" },
            // duid uang muka
            pengembalian_uang_muka: { raw: "", masked: "" },
            persentase_pengembalian_uang_muka: "",
            total_pengembalian_uang_muka: { raw: "", masked: "" },
            // jumlah total
            jumlah_yang_sudah_dibayar: { raw: "", masked: "" },
            jumlah_yang_harus_dibayar: { raw: "", masked: "" },
            jumlah_yang_dibulatkan: { raw: "", masked: "" },
            jumlah_yang_dibulatkan_terbilang: "",
          });
        }
        console.log("prevdocId nya", prevDocumentId);
        // Fetch previous termin
        if (Array.isArray(prevDocumentId) && prevDocumentId.length > 0) {
          const apiEndpoints = prevDocumentId.map((id) => `${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/berita_acara_pembayaran_termin?id=${id}`);

          const requests = apiEndpoints.map((endpoint) => axios.get(endpoint));

          const responses = await axios.all(requests);

          const previousDataList = responses.map((res, index) => {
            const data = res.data;

            return {
              id: data.id,
              nominal_termin: {
                raw: data.nominal_termin || "",
                masked: data.nominal_termin ? `Rp ${new Intl.NumberFormat("id-ID").format(data.nominal_termin)}` : "",
              },
              nama_termin_ke: data.nama_termin_ke || "",
              tahap_terbilang: data.tahap_terbilang || "",
            };
          });

          setPreviousTerminData(previousDataList);
        } else {
          setPreviousTerminData([]);
        }
      } catch (error) {
        console.error("❌ Error fetching previous termin:", error);
      } finally {
        setLoading(false);
      }
    };

    if (documentId || (Array.isArray(prevDocumentId) && prevDocumentId.length > 0)) {
      fetchData();
    }
  }, [documentId, prevDocumentId]);

  useEffect(() => {
    const fetchDpData = async () => {
      const UangMuka = previousTerminData?.find((doc) => doc.nama_termin_ke === "1" || doc.nama_termin_ke === "Termin 1");

      if (UangMuka?.id) {
        const dpResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/berita_acara_pembayaran_termin?id=${UangMuka.id}`);
        const dpData = dpResponse.data;

        setDpTerminData({
          uang_muka: {
            raw: dpData.jumlah_uang_muka || "",
            masked: dpData.jumlah_uang_muka ? `Rp ${new Intl.NumberFormat("id-ID").format(dpData.jumlah_uang_muka)}` : "",
          },
          persentase_uangmuka: dpData.jumlah_persentase_uang_muka || "",
          total_uangmuka: {
            raw: dpData.total_uang_muka || "",
            masked: dpData.total_uang_muka ? `Rp ${new Intl.NumberFormat("id-ID").format(dpData.total_uang_muka)}` : "",
          },
        });
      }
    };

    if (previousTerminData.length > 0) {
      fetchDpData();
    }
  }, [previousTerminData]);

  console.log("data termin sebelumnya :", previousTerminData);

  // validasi nilai uang muka
  // const currentTerminKe = parseInt(formData?.nama_termin_ke?.match(/\d+/)?.[0] || "1", 10);

  const isEmptyOrZero = (val) => val === "" || val === "0" || val === 0;

  const hasUangMukaData = !isEmptyOrZero(dpTerminData.uang_muka.raw) || !isEmptyOrZero(dpTerminData.persentase_uangmuka) || !isEmptyOrZero(dpTerminData.total_uangmuka.raw);

  const shouldRenderUangMukaSection = suffix === null || suffix === "0" || suffix === 0 || !hasUangMukaData;

  console.log("suffix saat ini", suffix);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "uang_muka" ||
      name === "total_uangmuka" ||
      name === "progres_fisik" ||
      name === "total_progres_fisik" ||
      name === "retensi_pekerjaan" ||
      name === "total_retensi_pekerjaan" ||
      name === "pengembalian_uang_muka" ||
      name === "total_pengembalian_uang_muka" ||
      name === "jumlah_yang_sudah_dibayar" ||
      name === "jumlah_yang_harus_dibayar" ||
      name === "jumlah_yang_dibulatkan" ||
      name === "nominal_termin"
    ) {
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

  const handleSubmitBAPTermin = async () => {
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
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/put/berita_acara_pembayaran_termin?id=${documentId}`,
          {
            project_id: projectDetailData.id,
            nomor_surat_bap: formData.nomorSuratBAP,
            tanggal_surat_bap: formData.tanggalSuratBAP ? format(formData.tanggalSuratBAP, "yyyy-MM-dd") : null,
            tanggal_surat_bap_huruf: formData.tanggalSuratBAPTerbilang,
            nama_termin_ke: suffix === null || suffix === "0" || suffix === 0 ? "0" : formData.nama_termin_ke,
            persentase_pekerjaan: parseInt(formData.persentase_pekerjaan, 10) || 0,
            jumlah_persentase_uang_muka: shouldRenderUangMukaSection ? parseInt(formData.persentase_uangmuka, 10) || 0 : parseInt(dpTerminData.persentase_uangmuka, 10) || 0,
            jumlah_uang_muka: shouldRenderUangMukaSection ? parseInt(formData.uang_muka.raw, 10) || 0 : parseInt(dpTerminData.uang_muka.raw, 10) || 0,
            total_uang_muka: shouldRenderUangMukaSection ? parseInt(formData.total_uangmuka.raw, 10) || 0 : parseInt(dpTerminData.total_uangmuka.raw, 10),
            jumlah_persentase_uang_progres_fisik: parseInt(formData.persentase_progres_fisik, 10) || 0,
            jumlah_uang_progres_fisik: parseInt(formData.progres_fisik.raw, 10) || 0,
            jumlah_persentase_retensi_pekerjaan: parseInt(formData.persentase_retensi_pekerjaan, 10) || 0,
            jumlah_uang_retensi_pekerjaan: parseInt(formData.retensi_pekerjaan.raw, 10) || 0,
            jumlah_persentase_pengembalian_uang_muka: parseInt(formData.persentase_pengembalian_uang_muka, 10) || 0,
            jumlah_pengembalian_uang_muka: parseInt(formData.pengembalian_uang_muka.raw, 10) || 0,
            jumlah_yang_harus_dibayar: parseInt(formData.jumlah_yang_harus_dibayar.raw, 10) || 0,
            jumlah_yang_dibulatkan: parseInt(formData.jumlah_yang_dibulatkan.raw, 10) || 0,
            jumlah_yang_dibulatkan_huruf: formData.jumlah_yang_dibulatkan_terbilang,
            termin: suffix === null || suffix === "0" || suffix === 0 ? 0 : formData.nama_termin_ke,
            total_uang_progress_fisik: parseInt(formData.progres_fisik.raw, 10) || 0,
            jumlah_yang_sudah_dibayar: parseInt(formData.jumlah_yang_sudah_dibayar.raw, 10) || 0,
            tahap_terbilang: suffix === null || suffix === "0" || suffix === 0 ? "nol" : formData.nama_termin_terbilang,
            nominal_termin: parseInt(formData.jumlah_yang_dibulatkan.raw, 10) || 0,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ BAP Termin berhasil dibuat:", response.data);
        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "berita_acara_pembayaran_termin",
            record_id: 1,
            action_type: "UPDATE",
            timestamp: currentTimestamp,
            project_id: projectDetailData.id,
            project_name: projectName || "",
            description: `Pembaharuan Detil Surat Berita Acara Pembayaran Termin Ke - ${suffix}`,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("✅ Berhasil:", responseHistory.data);

        setLoading(false);
        setIsSuccessModalOpen(true);
        setIsFailedModalOpen(false);
      } catch (error) {
        console.error("❌ Gagal membuat BAP Termin:", error);
        setLoading(false);
        setIsSuccessModalOpen(false);
        setIsFailedModalOpen(true);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/berita_acara_pembayaran_termin`,
          {
            project_id: projectDetailData.id,
            nomor_surat_bap: formData.nomorSuratBAP,
            tanggal_surat_bap: formData.tanggalSuratBAP ? format(formData.tanggalSuratBAP, "yyyy-MM-dd") : null,
            tanggal_surat_bap_huruf: formData.tanggalSuratBAPTerbilang,
            nama_termin_ke: suffix === null || suffix === "0" || suffix === 0 ? "0" : formData.nama_termin_ke,
            persentase_pekerjaan: parseInt(formData.persentase_pekerjaan, 10) || 0,
            jumlah_persentase_uang_muka: shouldRenderUangMukaSection ? parseInt(formData.persentase_uangmuka, 10) || 0 : parseInt(dpTerminData.persentase_uangmuka, 10) || 0,
            jumlah_uang_muka: shouldRenderUangMukaSection ? parseInt(formData.uang_muka.raw, 10) || 0 : parseInt(dpTerminData.uang_muka.raw, 10) || 0,
            total_uang_muka: shouldRenderUangMukaSection ? parseInt(formData.total_uangmuka.raw, 10) || 0 : parseInt(dpTerminData.total_uangmuka.raw, 10),
            jumlah_persentase_uang_progres_fisik: parseInt(formData.persentase_progres_fisik, 10) || 0,
            jumlah_uang_progres_fisik: parseInt(formData.progres_fisik.raw, 10) || 0,
            jumlah_persentase_retensi_pekerjaan: parseInt(formData.persentase_retensi_pekerjaan, 10) || 0,
            jumlah_uang_retensi_pekerjaan: parseInt(formData.retensi_pekerjaan.raw, 10) || 0,
            jumlah_persentase_pengembalian_uang_muka: parseInt(formData.persentase_pengembalian_uang_muka, 10) || 0,
            jumlah_pengembalian_uang_muka: parseInt(formData.pengembalian_uang_muka.raw, 10) || 0,
            jumlah_yang_harus_dibayar: parseInt(formData.jumlah_yang_harus_dibayar.raw, 10) || 0,
            jumlah_yang_dibulatkan: parseInt(formData.jumlah_yang_dibulatkan.raw, 10) || 0,
            jumlah_yang_dibulatkan_huruf: formData.jumlah_yang_dibulatkan_terbilang,
            termin: suffix === null || suffix === "0" || suffix === 0 ? 0 : formData.nama_termin_ke,
            total_uang_progress_fisik: parseInt(formData.progres_fisik.raw, 10) || 0,
            jumlah_yang_sudah_dibayar: parseInt(formData.jumlah_yang_sudah_dibayar.raw, 10) || 0,
            tahap_terbilang: suffix === null || suffix === "0" || suffix === 0 ? "nol" : formData.nama_termin_terbilang,
            nominal_termin: parseInt(formData.jumlah_yang_dibulatkan.raw, 10) || 0,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        const newId = response.data?.id;
        if (onCreated && newId) onCreated(newId); // Kirim ke parent
        console.log("✅ Create success:", response.data);

        console.log("✅ Surat Pernyataan berhasil dibuat:", response.data);

        console.log("✅ BAP Termin berhasil dibuat:", response.data);
        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "berita_acara_pembayaran_termin",
            record_id: 1,
            action_type: "CREATE",
            timestamp: currentTimestamp,
            project_id: response.data.id,
            project_name: projectName || "",
            description: "Pembuatan Surat Berita Acara Pembayaran Termin",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("✅ Berhasil:", responseHistory.data);
        setIsSuccessModalOpen(true);
        setIsFailedModalOpen(false);
        setLoading(false);
      } catch (error) {
        console.error("❌ Gagal membuat BAP Termin:", error);
        setIsSuccessModalOpen(false);
        setIsFailedModalOpen(true);
        setLoading(false);
      }
    }
  };

  console.log("id termin yang dipilih", documentId);

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
    if (suffix != null || suffix === "0" || suffix === 0) {
      return (
        //untuk display none
        <div style={{ display: "none" }}>
          {/* untuk display ref */}
          <div ref={contentRef}>
            <div>
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
                          <span>{projectDetailData.pekerjaan || "(Pekerjaan)"}</span>
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
                          PEMBAYARAN TERMIN {formData.nama_termin_ke !== "0" && formData.nama_termin_ke !== 0 ? formData.nama_termin_ke || "(Termin Ke)" : ""}
                        </span>
                      </div>

                      <div className="bap-header-container">
                        <span className="label-bap">Nomor</span>
                        <span className="separator-bap">:</span>
                        <span className="value-bap">
                          <span>{formData.nomorSuratBAP || "(Nomor BAP)"}</span>
                        </span>

                        <span className="label-bap">Tanggal</span>
                        <span className="separator-bap">:</span>
                        <span className="value-bap">
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
                          PEMBAYARAN TERMIN {formData.nama_termin_ke !== "0" && formData.nama_termin_ke !== 0 ? formData.nama_termin_ke || "(Termin Ke)" : ""}
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
                            <span style={{ fontWeight: "bold" }}>Nomor</span> : <span>{formData.nomorSuratBAP || "(Nomor BAP)"}</span>
                          </div>
                          <div>
                            <span style={{ fontWeight: "bold" }}>Tanggal</span> :{" "}
                            <span>
                              {(formData.tanggalSuratBAP &&
                                new Date(formData.tanggalSuratBAP).toLocaleDateString("id-ID", {
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
                ), kami yang bertanda tangan dibawah
              </div>
              {/* section pihak 1 & 2*/}
              {currFileType !== "word" && (
                <>
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
                </>
              )}

              {currFileType === "word" && (
                <>
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
                </>
              )}
              {/*  End of section pihak 1 & 2*/}

              {/* Section termin */}

              {currFileType !== "word" && (
                <>
                  <div class="bap-termin-detail">
                    <span class="bap-termin-number">1.</span>
                    <p class="bap-termin-text">
                      Berdasarkan Berita Acara Pemeriksaan Pekerjaan Nomor :
                      <span class="bap-termin-highlight">
                        <span>{projectDetailData.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan Pekerjaan)"}</span>
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
                            "(Tanggal BAP Pemeriksaan Pekerjaan)"}
                        </span>
                      </span>
                      , bahwa prestasi pekerjaan telah mencapai{" "}
                      <span class="bap-termin-highlight">
                        <span>{formData.persentase_pekerjaan || "(Prestasi Pekerjaan %)"}%</span>
                      </span>
                      .
                    </p>
                  </div>
                  <div class="termin-payment-detail">
                    <span class="termin-payment-number">2.</span>
                    <p class="termin-payment-text">Kepada PIHAK KEDUA belum pernah dilakukan pembayaran.</p>
                  </div>
                  <div class="termin-payment-table">
                    <div class="termin-payment-row">
                      <span class="termin-payment-label">Uang Muka</span>
                      <span class="termin-payment-value">
                        <span>{shouldRenderUangMukaSection ? formData.persentase_uangmuka || "(Persentase uang muka %)" : dpTerminData.persentase_uangmuka || "(Persentase uang muka %)"}%</span> x{" "}
                        <span>{shouldRenderUangMukaSection ? formData.uang_muka.masked || "(Jumlah Uang Muka)" : dpTerminData.uang_muka.masked || "(Jumlah Uang Muka)"}</span> :
                      </span>
                      <span class="termin-payment-amount">
                        <span>{shouldRenderUangMukaSection ? formData.total_uangmuka.masked || "(Total Uang Muka)" : dpTerminData.total_uangmuka.masked || "(Total Uang Muka)"}</span>
                      </span>
                    </div>

                    {previousTerminData?.length > 0 &&
                      previousTerminData.map(
                        (termin, index) =>
                          Number(termin.nominal_termin.raw) > 0 && (
                            <div className="termin-payment-row" key={termin.id || index}>
                              <span className="termin-payment-label">Termin {termin.nama_termin_ke}</span>
                              <span className="termin-payment-value">:</span>
                              <span className="termin-payment-amount">
                                <span>{termin.nominal_termin.masked}</span>
                              </span>
                            </div>
                          )
                      )}

                    <div class="termin-payment-row">
                      <span class="termin-payment-label">Jumlah yang sudah dibayar kepada PIHAK KEDUA</span>
                      <span class="termin-payment-amount">
                        <span>{formData.jumlah_yang_sudah_dibayar.masked || "(Jumlah yang sudah dibayar pihak 2)"}</span>
                      </span>
                    </div>
                  </div>
                  <div class="bap-termin-detail">
                    <span class="bap-termin-number">3.</span>
                    <p class="bap-termin-text">
                      Berdasarkan Surat Perjanjian Kerja/Kontrak Nomor :
                      <span class="bap-termin-highlight">
                        <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>
                      </span>
                      , Tanggal{" "}
                      <span class="bap-termin-highlight">
                        <span>
                          {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                            new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })) ||
                            "(Tanggal Surat Perjanjian Kontrak)"}
                        </span>
                      </span>{" "}
                      kepada <span class="bap-termin-highlight">PIHAK KEDUA</span> dapat dibayarkan uang muka dengan rincian sebagai berikut :
                    </p>
                  </div>
                  <div>
                    <div class="termin-payment-table">
                      <div class="termin-payment-row">
                        <span class="termin-payment-label">Progres Fisik</span>
                        <span class="termin-payment-value">
                          <span>{formData.persentase_progres_fisik || "(Persentase Progres Fisik)"}</span>% x <span>{formData.progres_fisik.masked || "(Nominal Progres Fisik)"}</span> :
                        </span>
                        <span class="termin-payment-amount">
                          <span>{formData.total_progres_fisik.masked || "(Total Nominal Progress Fisik)"}</span>
                        </span>
                      </div>
                      <div class="termin-payment-row">
                        <span class="termin-payment-label">Retensi Pekerjaan</span>
                        <span class="termin-payment-value">
                          <span>{formData.persentase_retensi_pekerjaan || "(Persentase Retensi Pekerjaan)"}</span>% x <span>{formData.retensi_pekerjaan.masked || "(Nominal Retensi Pekerjaan)"}</span> :
                        </span>
                        <span class="termin-payment-amount">
                          <span>{formData.total_retensi_pekerjaan.masked || "(Total Nominal Retensi Pekerjaan)"}</span>
                        </span>
                      </div>{" "}
                      <div class="termin-payment-row">
                        <span class="termin-payment-label">Pengembalian Uang Muka</span>
                        <span class="termin-payment-value">
                          <span>{formData.persentase_pengembalian_uang_muka || "(Persentase Pengembalian Uang Muka)"}</span>% x <span>{formData.pengembalian_uang_muka.masked || "(Nominal Pengembalian Uang Muka)"}</span>:
                        </span>
                        <span class="termin-payment-amount">
                          <span>{formData.total_pengembalian_uang_muka.masked || "(Total Pengembalian Uang Muka)"}</span>
                        </span>
                      </div>
                      {previousTerminData?.length > 0 &&
                        previousTerminData.map(
                          (termin, index) =>
                            Number(termin.nominal_termin.raw) > 0 && (
                              <div className="termin-payment-row" key={termin.id || index}>
                                <span className="termin-payment-label">Termin {termin.nama_termin_ke}</span>
                                <span className="termin-payment-value">:</span>
                                <span className="termin-payment-amount">
                                  <span>{termin.nominal_termin.masked}</span>
                                </span>
                              </div>
                            )
                        )}
                      <div class="termin-payment-row">
                        <span class="termin-payment-label">Jumlah yang harus dibayar saat ini kepada PIHAK KEDUA</span>
                        <span class="termin-payment-value">:</span>
                        <span class="termin-payment-amount">
                          <span>{formData.jumlah_yang_harus_dibayar.masked || "(Nominal)"}</span>
                        </span>
                      </div>
                      <div class="termin-payment-row">
                        <span class="termin-payment-label">Jumlah yang dibulatkan</span>
                        <span class="termin-payment-amount">
                          <span>{formData.jumlah_yang_dibulatkan.masked || "(Nominal)"}</span>
                        </span>
                      </div>
                    </div>

                    <div className="terbilang-bap-wrapper">
                      <div className="terbilang-bap-var">
                        Terbilang:{" "}
                        <span className="terbilang-bap-value">
                          <span>{formData.jumlah_yang_dibulatkan_terbilang || "(Nominal Terbilang)"}</span>
                        </span>
                      </div>
                    </div>

                    <div class="bap-termin-detail">
                      <span class="bap-termin-number">4.</span>
                      <p class="bap-termin-text">
                        <span class="bap-termin-highlight">PIHAK KEDUA </span>sepakat atas jumlah pembayaran tersebut diatas ditransper ke rekening Giro Nomor : :
                        <span class="bap-termin-highlight">
                          <span>{projectDetailData.nomor_rekening_pihak_1 || "(Nomor rek pihak 1)"}</span> pada BANK <span>{projectDetailData.nama_bank_pihak_1 || "(Nama Bank pihak 1)"}</span>
                        </span>
                      </p>
                    </div>

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
                        <div className="ttd-pihak-kedua-light">
                          <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                          <div className="ttd-pihak-kedua-bold">UNIVERSITAS BENGKULU</div>
                        </div>

                        <div className="nip-bap-layout">
                          <div className="ttd-pihak-kedua">
                            <div className="nip-bap-name">
                              <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                            </div>
                            <div className="nip-bap-nip">
                              NIP. <span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
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
                  <table class="bap-termin-table">
                    <tr>
                      <td class="bap-termin-number">1.</td>
                      <td class="bap-termin-text">
                        Berdasarkan Berita Acara Pemeriksaan Pekerjaan Nomor :
                        <span class="bap-termin-highlight">
                          <span>{projectDetailData.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan Pekerjaan)"}</span>
                        </span>
                        , Tanggal
                        <span class="bap-termin-highlight">
                          <span>
                            {(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan &&
                              new Date(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })) ||
                              "(Tanggal BAP Pemeriksaan Pekerjaan)"}
                          </span>
                        </span>
                        , bahwa prestasi pekerjaan telah mencapai{" "}
                        <span class="bap-termin-highlight">
                          <span>{formData.persentase_pekerjaan || "(Prestasi Pekerjaan %)"}%</span>
                        </span>
                        .
                      </td>
                    </tr>
                  </table>

                  <table class="bap-termin-table">
                    <tr>
                      <td class="bap-termin-number">2.</td>
                      <td class="bap-termin-text">Kepada PIHAK KEDUA belum pernah dilakukan pembayaran.</td>
                    </tr>
                  </table>

                  <div class="termin-payment-table">
                    <div class="termin-payment-row">
                      <table class="bap-termin-tabel-pembayaran">
                        <tr>
                          <td class="bap-termin-keterangan">Uang Muka</td>
                          <td class="bap-termin-perhitungan">
                            {shouldRenderUangMukaSection ? formData.persentase_uangmuka || "(Persentase uang muka %)" : dpTerminData.persentase_uangmuka || "(Persentase uang muka %)"}% x{" "}
                            {shouldRenderUangMukaSection ? formData.uang_muka.masked || "(Jumlah Uang Muka)" : dpTerminData.uang_muka.masked || "(Jumlah Uang Muka)"} :
                          </td>
                          <td class="bap-termin-nominal">{shouldRenderUangMukaSection ? formData.total_uangmuka.masked || "(Total Uang Muka)" : dpTerminData.total_uangmuka.masked || "(Total Uang Muka)"}</td>
                        </tr>
                        {previousTerminData?.length > 0 &&
                          previousTerminData.map(
                            (termin, index) =>
                              Number(termin.nominal_termin.raw) > 0 && (
                                <tr key={termin.id || index}>
                                  <td class="bap-termin-keterangan">Termin {termin.nama_termin_ke} :</td>

                                  <td class="bap-termin-nominal">{termin.nominal_termin.masked}</td>
                                </tr>
                              )
                          )}
                        <tr class="bap-termin-garis-atas">
                          <td class="bap-termin-keterangan" colspan="2">
                            Jumlah yang sudah dibayar kepada PIHAK KEDUA
                          </td>
                          <td class="bap-termin-nominal">{formData.jumlah_yang_sudah_dibayar.masked || "(Jumlah yang sudah dibayar pihak 2)"}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <table class="bap-termin-table">
                    <tr>
                      <td class="bap-termin-number">3.</td>
                      <td class="bap-termin-text">
                        Berdasarkan Surat Perjanjian Kerja/Kontrak Nomor :
                        <span class="bap-termin-highlight">
                          <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>
                        </span>
                        , Tanggal{" "}
                        <span class="bap-termin-highlight">
                          <span>
                            {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                              new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })) ||
                              "(Tanggal Surat Perjanjian Kontrak)"}
                          </span>
                        </span>{" "}
                        kepada <span class="bap-termin-highlight">PIHAK KEDUA</span> dapat dibayarkan uang muka dengan rincian sebagai berikut :
                      </td>
                    </tr>
                  </table>

                  <div>
                    <div class="termin-payment-table">
                      <table class="bap-termin-tabel-pembayaran">
                        <tr>
                          <td class="bap-termin-keterangan">Progres Fisik</td>
                          <td class="bap-termin-perhitungan">
                            {formData.persentase_progres_fisik || "(Persentase Progres Fisik)"} % x {formData.progres_fisik.masked || "(Nominal Progres Fisik)"} :
                          </td>
                          <td class="bap-termin-nominal">{formData.total_progres_fisik.masked || "(Total Nominal Progress Fisik)"}</td>
                        </tr>
                        <tr class="bap-termin-garis-atas">
                          <td class="bap-termin-keterangan">Retensi Pekerjaan</td>
                          <td class="bap-termin-perhitungan">
                            {formData.persentase_retensi_pekerjaan || "(Persentase Retensi Pekerjaan)"} % x {formData.retensi_pekerjaan.masked || "(Nominal Retensi Pekerjaan)"} :
                          </td>
                          <td class="bap-termin-nominal">{formData.total_retensi_pekerjaan.masked || "(Total Nominal Retensi Pekerjaan)"}</td>
                        </tr>
                        <tr>
                          <td class="bap-termin-keterangan">Pengembalian Uang Muka</td>
                          <td class="bap-termin-perhitungan">
                            {formData.persentase_pengembalian_uang_muka || "(Persentase Pengembalian Uang Muka)"} % x {formData.pengembalian_uang_muka.masked || "(Nominal Pengembalian Uang Muka)"} :
                          </td>
                          <td class="bap-termin-nominal">{formData.total_pengembalian_uang_muka.masked || "(Total Pengembalian Uang Muka)"}</td>
                        </tr>
                        {previousTerminData?.length > 0 &&
                          previousTerminData.map(
                            (termin, index) =>
                              Number(termin.nominal_termin.raw) > 0 && (
                                <tr key={termin.id || index}>
                                  <td class="bap-termin-keterangan">Termin {termin.nama_termin_ke} :</td>

                                  <td class="bap-termin-nominal">{termin.nominal_termin.masked}</td>
                                </tr>
                              )
                          )}
                        <tr class="bap-termin-garis-atas">
                          <td class="bap-termin-keterangan" colspan="2">
                            Jumlah yang harus dibayar saat ini kepada PIHAK KEDUA
                          </td>
                          <td class="bap-termin-nominal">{formData.jumlah_yang_harus_dibayar.masked || "(Nominal)"}</td>
                        </tr>
                        <tr>
                          <td class="bap-termin-keterangan" colspan="2">
                            Jumlah yang dibulatkan
                          </td>
                          <td class="bap-termin-nominal">{formData.jumlah_yang_dibulatkan.masked || "(Nominal)"}</td>
                        </tr>
                        <tr class="bap-termin-garis-atas"></tr>
                      </table>
                    </div>

                    <div className="terbilang-bap-wrapper">
                      <div className="terbilang-bap-var">
                        Terbilang:{" "}
                        <span className="terbilang-bap-value">
                          <span>{formData.jumlah_yang_dibulatkan_terbilang || "(Nominal Terbilang)"}</span>
                        </span>
                      </div>
                    </div>

                    <table class="bap-termin-table">
                      <tr>
                        <td class="bap-termin-number">4.</td>
                        <td class="bap-termin-text">
                          <span class="bap-termin-highlight">PIHAK KEDUA </span>sepakat atas jumlah pembayaran tersebut diatas ditransper ke rekening Giro Nomor : :
                          <span class="bap-termin-highlight">
                            <span>{projectDetailData.nomor_rekening_pihak_1 || "(Nomor rek pihak 1)"}</span> pada BANK <span>{projectDetailData.nama_bank_pihak_1 || "(Nama Bank pihak 1)"}</span>
                          </span>
                        </td>
                      </tr>
                    </table>

                    <div className="last-paragraph-bap">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>

                    <div style={{ marginTop: "110px" }}>
                      {" "}
                      <table class="ttd-bap-layout">
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
                            <div class="ttd-pihak-kedua-light">{projectDetailData.tempat_ttd || "(Tempat TTD)"} Tanggal tesebut diatas</div>
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
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ display: "none" }}>
          <div ref={contentRef}>
            <div>
              {/* header section */}
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
                          <span>{projectDetailData.pekerjaan || "(Pekerjaan)"}</span>
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
                          PEMBAYARAN TERMIN {formData.nama_termin_ke !== "0" && formData.nama_termin_ke !== 0 ? formData.nama_termin_ke || "(Termin Ke)" : ""}
                        </span>
                      </div>

                      <div className="bap-header-container">
                        <span className="label-bap">Nomor</span>
                        <span className="separator-bap">:</span>
                        <span className="value-bap">
                          <span>{formData.nomorSuratBAP || "(Nomor BAP)"}</span>
                        </span>

                        <span className="label-bap">Tanggal</span>
                        <span className="separator-bap">:</span>
                        <span className="value-bap">
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
                          PEMBAYARAN TERMIN
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
                            <span style={{ fontWeight: "bold" }}>Nomor</span> : <span>{formData.nomorSuratBAP || "(Nomor BAP)"}</span>
                          </div>
                          <div>
                            <span style={{ fontWeight: "bold" }}>Tanggal</span> :{" "}
                            <span>
                              {(formData.tanggalSuratBAP &&
                                new Date(formData.tanggalSuratBAP).toLocaleDateString("id-ID", {
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
              {/* End of header section */}
              <div className="first-paragraph-bap">
                Pada hari ini, <span>{formData.tanggalSuratBAPTerbilang || "(Tanggal Surat BAP Terbilang)"}</span> (
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
                ), kami yang bertanda tangan dibawah
              </div>
              {/* pihak 1 & 2 section */}
              {currFileType !== "word" && (
                <>
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
                </>
              )}

              {currFileType === "word" && (
                <>
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
                </>
              )}
              {/* End of pihak 1 & 2 section */}

              {/* section point 1 - 3 */}
              {currFileType !== "word" && (
                <>
                  <div class="bap-termin-detail">
                    <span class="bap-termin-number">1.</span>
                    <p class="bap-termin-text">
                      Berdasarkan Berita Acara Pemeriksaan Pekerjaan Nomor :
                      <span class="bap-termin-highlight">
                        <span>{projectDetailData.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan Pekerjaan)"}</span>
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
                            "(Tanggal BAP Pemeriksaan Pekerjaan)"}
                        </span>
                      </span>
                      , bahwa prestasi pekerjaan telah mencapai{" "}
                      <span class="bap-termin-highlight">
                        <span>{formData.persentase_pekerjaan || "(Prestasi Pekerjaan %)"}%</span>
                      </span>
                      .
                    </p>
                  </div>
                  <div class="termin-payment-detail">
                    <span class="termin-payment-number">2.</span>
                    <p class="termin-payment-text">Kepada PIHAK KEDUA belum pernah dilakukan pembayaran.</p>
                  </div>
                  <div class="termin-payment-table">
                    <div class="termin-payment-row">
                      <span class="termin-payment-label">Uang Muka</span>
                      <span class="termin-payment-value">
                        <span>{shouldRenderUangMukaSection ? formData.persentase_uangmuka || "(Persentase uang muka %)" : dpTerminData.persentase_uangmuka || "(Persentase uang muka %)"}%</span> x{" "}
                        <span>{shouldRenderUangMukaSection ? formData.uang_muka.masked || "(Jumlah Uang Muka)" : dpTerminData.uang_muka.masked || "(Jumlah Uang Muka)"}</span> :
                      </span>
                      <span class="termin-payment-amount">
                        <span>{shouldRenderUangMukaSection ? formData.total_uangmuka.masked || "(Total Uang Muka)" : dpTerminData.total_uangmuka.masked || "(Total Uang Muka)"}</span>
                      </span>
                    </div>
                  </div>
                  <div class="termin-payment-table">
                    <div class="termin-payment-row">
                      <span class="termin-payment-label">Jumlah yang harus dibayar saat ini kepada PIHAK KEDUA</span>
                      <span class="termin-payment-value">:</span>
                      <span class="termin-payment-amount">
                        <span>{formData.jumlah_yang_harus_dibayar.masked || "(Nominal)"}</span>
                      </span>
                    </div>
                    <div class="termin-payment-row">
                      <span class="termin-payment-label">Jumlah yang dibulatkan</span>
                      <span class="termin-payment-amount">
                        <span>{formData.jumlah_yang_dibulatkan.masked || "(Nominal)"}</span>
                      </span>
                    </div>
                  </div>
                  <div className="terbilang-bap-wrapper">
                    <div className="terbilang-bap-var">
                      Terbilang:{" "}
                      <span className="terbilang-bap-value">
                        <span>{formData.jumlah_yang_dibulatkan_terbilang || "(Nominal Terbilang)"}</span>
                      </span>
                    </div>
                  </div>
                  <div class="bap-termin-detail">
                    <span class="bap-termin-number">3.</span>
                    <p class="bap-termin-text">
                      <span class="bap-termin-highlight">PIHAK KEDUA </span>sepakat atas jumlah pembayaran tersebut diatas ditransper ke rekening Giro Nomor : :
                      <span class="bap-termin-highlight">
                        <span>{projectDetailData.nomor_rekening_pihak_1 || "(Nomor rek pihak 1)"}</span> pada BANK <span>{projectDetailData.nama_bank_pihak_1 || "(Nama Bank pihak 1)"}</span>
                      </span>
                    </p>
                  </div>
                </>
              )}

              {currFileType === "word" && (
                <>
                  <table class="bap-termin-table">
                    <tr>
                      <td class="bap-termin-number">1.</td>
                      <td class="bap-termin-text">
                        Berdasarkan Berita Acara Pemeriksaan Pekerjaan Nomor :
                        <span class="bap-termin-highlight">
                          <span>{projectDetailData.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan Pekerjaan)"}</span>
                        </span>
                        , Tanggal
                        <span class="bap-termin-highlight">
                          <span>
                            {(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan &&
                              new Date(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })) ||
                              "(Tanggal BAP Pemeriksaan Pekerjaan)"}
                          </span>
                        </span>
                        , bahwa prestasi pekerjaan telah mencapai{" "}
                        <span class="bap-termin-highlight">
                          <span>{formData.persentase_pekerjaan || "(Prestasi Pekerjaan %)"}%</span>
                        </span>
                        .
                      </td>
                    </tr>
                  </table>
                  <table class="bap-termin-table">
                    <tr>
                      <td class="bap-termin-number">2.</td>
                      <td class="bap-termin-text">Kepada PIHAK KEDUA belum pernah dilakukan pembayaran.</td>
                    </tr>
                  </table>

                  <div class="termin-payment-table">
                    <div class="termin-payment-row">
                      <span class="termin-payment-label">Uang Muka</span>
                      <span class="termin-payment-value">
                        <span>{shouldRenderUangMukaSection ? formData.persentase_uangmuka || "(Persentase uang muka %)" : dpTerminData.persentase_uangmuka || "(Persentase uang muka %)"}%</span> x{" "}
                        <span>{shouldRenderUangMukaSection ? formData.uang_muka.masked || "(Jumlah Uang Muka)" : dpTerminData.uang_muka.masked || "(Jumlah Uang Muka)"}</span> :
                      </span>
                      <span class="termin-payment-amount">
                        <span>{shouldRenderUangMukaSection ? formData.total_uangmuka.masked || "(Total Uang Muka)" : dpTerminData.total_uangmuka.masked || "(Total Uang Muka)"}</span>
                      </span>
                    </div>
                  </div>
                  <div class="termin-payment-table">
                    <div class="termin-payment-row">
                      <span class="termin-payment-label">Jumlah yang harus dibayar saat ini kepada PIHAK KEDUA</span>
                      <span class="termin-payment-value">:</span>
                      <span class="termin-payment-amount">
                        <span>{formData.jumlah_yang_harus_dibayar.masked || "(Nominal)"}</span>
                      </span>
                    </div>
                    <div class="termin-payment-row">
                      <span class="termin-payment-label">Jumlah yang dibulatkan</span>
                      <span class="termin-payment-amount">
                        <span>{formData.jumlah_yang_dibulatkan.masked || "(Nominal)"}</span>
                      </span>
                    </div>
                  </div>
                  <div className="terbilang-bap-wrapper">
                    <div className="terbilang-bap-var">
                      Terbilang:{" "}
                      <span className="terbilang-bap-value">
                        <span>{formData.jumlah_yang_dibulatkan_terbilang || "(Nominal Terbilang)"}</span>
                      </span>
                    </div>
                  </div>

                  <table class="bap-termin-table">
                    <tr>
                      <td class="bap-termin-number">3.</td>
                      <td class="bap-termin-text">
                        <span class="bap-termin-highlight">PIHAK KEDUA </span>sepakat atas jumlah pembayaran tersebut diatas ditransper ke rekening Giro Nomor : :
                        <span class="bap-termin-highlight">
                          <span>{projectDetailData.nomor_rekening_pihak_1 || "(Nomor rek pihak 1)"}</span> pada BANK <span>{projectDetailData.nama_bank_pihak_1 || "(Nama Bank pihak 1)"}</span>
                        </span>
                      </td>
                    </tr>
                  </table>
                </>
              )}

              {/* End of section point 1 - 3 */}

              <div>
                <div className="last-paragraph-bap">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>
                {/* Section TTD pihak 1 & 2 */}

                {currFileType !== "word" && (
                  <>
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
                        <div class="ttd-pihak-kedua-light">{projectDetailData.tempat_ttd || "(Tempat TTD)"} Tanggal tesebut diatas</div>
                        <div className="ttd-pihak-kedua-bold">PIHAK PERTAMA</div>
                        <div className="ttd-pihak-kedua-light">
                          <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                          <div className="ttd-pihak-kedua-bold">UNIVERSITAS BENGKULU</div>
                        </div>

                        <div className="nip-bap-layout">
                          <div className="ttd-pihak-kedua">
                            <div className="nip-bap-name">
                              <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                            </div>
                            <div className="nip-bap-nip">
                              NIP. <span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {currFileType === "word" && (
                  <>
                    <div style={{ marginTop: "30px" }}>
                      {" "}
                      <table class="ttd-bap-layout">
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
                            <div class="ttd-pihak-kedua-light">{projectDetailData.tempat_ttd || "(Tempat TTD)"} Tanggal tesebut diatas</div>
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
                  </>
                )}

                {/* End of Section TTD pihak 1 & 2 */}
              </div>
            </div>
          </div>
        </div>
      );
    }
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
      const filename = "berita_acara_pembayaran_termin";

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
            {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"BAP Termin"} />}
            {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"BAP Termin"} />}
          </div>
          {suffix != null && (
            <>
              {" "}
              <div className="input-container-form">
                <label className="input-label-form">
                  Nama Termin Ke- (Angka) <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="nama_termin_ke"
                  className={errors.nama_termin_ke ? "input-field-form-error" : "input-field-form"}
                  value={formData.nama_termin_ke}
                  placeholder="Isi bagian ini"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {errors.nama_termin_ke && <span className="error-text">{errors.nama_termin_ke}</span>}
              </div>
              <div className="input-container-form">
                <label className="input-label-form">
                  Termin Ke- (Terbilang) <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="nama_termin_terbilang"
                  className={errors.nama_termin_terbilang ? "input-field-form-error" : "input-field-form"}
                  value={formData.nama_termin_terbilang}
                  placeholder="Isi bagian ini"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {errors.nama_termin_terbilang && <span className="error-text">{errors.nama_termin_terbilang}</span>}
              </div>
            </>
          )}

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
              Persentase Pekerjaan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="persentase_pekerjaan"
              className={errors.persentase_pekerjaan ? "input-field-form-error" : "input-field-form"}
              value={formData.persentase_pekerjaan}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.persentase_pekerjaan && <span className="error-text">{errors.persentase_pekerjaan}</span>}
          </div>
          {(suffix === null || suffix === "0" || suffix === 0) && (
            <div className="input-form-flex">
              <div className="input-container-column">
                {" "}
                <label className="input-label-flex">
                  Uang Muka <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="uang_muka"
                  className={errors.uang_muka ? "input-field-form-flex-error" : "input-field-form-flex"}
                  value={formData.uang_muka.masked}
                  placeholder="Isi bagian ini"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {errors.uang_muka && <span className="error-text">{errors.uang_muka}</span>}
              </div>

              <div className="input-container-column">
                {" "}
                <label className="input-label-flex">
                  Persentase <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="persentase_uangmuka"
                  className={errors.persentase_uangmuka ? "input-field-form-flex-error" : "input-field-form-flex"}
                  value={formData.persentase_uangmuka}
                  placeholder="Isi bagian ini"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {errors.persentase_uangmuka && <span className="error-text">{errors.persentase_uangmuka}</span>}
              </div>

              <div className="input-container-column">
                {" "}
                <label className="input-label-flex">
                  Total <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="total_uangmuka"
                  className={errors.total_uangmuka ? "input-field-form-flex-error" : "input-field-form-flex"}
                  value={formData.total_uangmuka.masked}
                  placeholder="Isi bagian ini"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {errors.total_uangmuka && <span className="error-text">{errors.total_uangmuka}</span>}
              </div>
            </div>
          )}

          <div className="input-container-form">
            <label className="input-label-form">
              Jumlah Total Yang Sudah Di Bayar Pihak Ke 2 <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="jumlah_yang_sudah_dibayar"
              className={errors.jumlah_yang_sudah_dibayar ? "input-field-form-error" : "input-field-form"}
              value={formData.jumlah_yang_sudah_dibayar.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.jumlah_yang_sudah_dibayar && <span className="error-text">{errors.jumlah_yang_sudah_dibayar}</span>}
          </div>
          {suffix != null && (
            <>
              <div className="input-form-flex">
                <div className="input-container-column">
                  {" "}
                  <label className="input-label-flex">
                    Progres Fisik <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="progres_fisik"
                    className={errors.progres_fisik ? "input-field-form-flex-error" : "input-field-form-flex"}
                    value={formData.progres_fisik.masked}
                    placeholder="Isi bagian ini"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  {errors.progres_fisik && <span className="error-text">{errors.progres_fisik}</span>}
                </div>

                <div className="input-container-column">
                  {" "}
                  <label className="input-label-flex">
                    Persentase <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="persentase_progres_fisik"
                    className={errors.persentase_progres_fisik ? "input-field-form-flex-error" : "input-field-form-flex"}
                    value={formData.persentase_progres_fisik}
                    placeholder="Isi bagian ini"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  {errors.persentase_progres_fisik && <span className="error-text">{errors.persentase_progres_fisik}</span>}
                </div>

                <div className="input-container-column">
                  {" "}
                  <label className="input-label-flex">
                    Total <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="total_progres_fisik"
                    className={errors.total_progres_fisik ? "input-field-form-flex-error" : "input-field-form-flex"}
                    value={formData.total_progres_fisik.masked}
                    placeholder="Isi bagian ini"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  {errors.total_progres_fisik && <span className="error-text">{errors.total_progres_fisik}</span>}
                </div>
              </div>
              <div className="input-form-flex">
                <div className="input-container-column">
                  {" "}
                  <label className="input-label-flex">
                    Retensi Pekerjaan <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="retensi_pekerjaan"
                    className={errors.retensi_pekerjaan ? "input-field-form-flex-error" : "input-field-form-flex"}
                    value={formData.retensi_pekerjaan.masked}
                    placeholder="Isi bagian ini"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  {errors.retensi_pekerjaan && <span className="error-text">{errors.retensi_pekerjaan}</span>}
                </div>

                <div className="input-container-column">
                  {" "}
                  <label className="input-label-flex">
                    Persentase <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="persentase_retensi_pekerjaan"
                    className={errors.persentase_retensi_pekerjaan ? "input-field-form-flex-error" : "input-field-form-flex"}
                    value={formData.persentase_retensi_pekerjaan}
                    placeholder="Isi bagian ini"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  {errors.persentase_retensi_pekerjaan && <span className="error-text">{errors.persentase_retensi_pekerjaan}</span>}
                </div>

                <div className="input-container-column">
                  {" "}
                  <label className="input-label-flex">
                    Total <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="total_retensi_pekerjaan"
                    className={errors.total_retensi_pekerjaan ? "input-field-form-flex-error" : "input-field-form-flex"}
                    value={formData.total_retensi_pekerjaan.masked}
                    placeholder="Isi bagian ini"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  {errors.total_retensi_pekerjaan && <span className="error-text">{errors.total_retensi_pekerjaan}</span>}
                </div>
              </div>

              <div className="input-form-flex">
                <div className="input-container-column">
                  {" "}
                  <label className="input-label-flex">
                    Pengembalian Uang Muka <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="pengembalian_uang_muka"
                    className={errors.pengembalian_uang_muka ? "input-field-form-flex-error" : "input-field-form-flex"}
                    value={formData.pengembalian_uang_muka.masked}
                    placeholder="Isi bagian ini"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  {errors.pengembalian_uang_muka && <span className="error-text">{errors.pengembalian_uang_muka}</span>}
                </div>

                <div className="input-container-column">
                  {" "}
                  <label className="input-label-flex">
                    Persentase <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="persentase_pengembalian_uang_muka"
                    className={errors.persentase_pengembalian_uang_muka ? "input-field-form-flex-error" : "input-field-form-flex"}
                    value={formData.persentase_pengembalian_uang_muka}
                    placeholder="Isi bagian ini"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  {errors.persentase_pengembalian_uang_muka && <span className="error-text">{errors.persentase_pengembalian_uang_muka}</span>}
                </div>

                <div className="input-container-column">
                  {" "}
                  <label className="input-label-flex">
                    Total <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="total_pengembalian_uang_muka"
                    className={errors.total_pengembalian_uang_muka ? "input-field-form-flex-error" : "input-field-form-flex"}
                    value={formData.total_pengembalian_uang_muka.masked}
                    placeholder="Isi bagian ini"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  {errors.total_pengembalian_uang_muka && <span className="error-text">{errors.total_pengembalian_uang_muka}</span>}
                </div>
              </div>
              <div className="input-container-form">
                <label className="input-label-form">
                  Jumlah Total Yang Sudah Di Bayar Pihak Ke 2 <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="jumlah_yang_sudah_dibayar"
                  className={errors.jumlah_yang_sudah_dibayar ? "input-field-form-error" : "input-field-form"}
                  value={formData.jumlah_yang_sudah_dibayar.masked}
                  placeholder="Isi bagian ini"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {errors.jumlah_yang_sudah_dibayar && <span className="error-text">{errors.jumlah_yang_sudah_dibayar}</span>}
              </div>
            </>
          )}

          <div className="input-container-form">
            <label className="input-label-form">
              Jumlah Total Yang Harus Di Bayar Pihak Ke 2 <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="jumlah_yang_harus_dibayar"
              className={errors.jumlah_yang_harus_dibayar ? "input-field-form-error" : "input-field-form"}
              value={formData.jumlah_yang_harus_dibayar.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.jumlah_yang_harus_dibayar && <span className="error-text">{errors.jumlah_yang_harus_dibayar}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Jumlah Total Yang Dibulatkan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="jumlah_yang_dibulatkan"
              className={errors.jumlah_yang_dibulatkan ? "input-field-form-error" : "input-field-form"}
              value={formData.jumlah_yang_dibulatkan.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.jumlah_yang_dibulatkan && <span className="error-text">{errors.jumlah_yang_dibulatkan}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Jumlah Total Yang Dibulatkan (Terbilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="jumlah_yang_dibulatkan_terbilang"
              className={errors.jumlah_yang_dibulatkan_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.jumlah_yang_dibulatkan_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.jumlah_yang_dibulatkan_terbilang && <span className="error-text">{errors.jumlah_yang_dibulatkan_terbilang}</span>}
          </div>
        </div>
        {/* <BapTerminKeWord /> */}
        <ComponentWord />
        <BapTerminKePreview formDataPreview={formData} previousTerminData={previousTerminData} isInputFieldDpShown={shouldRenderUangMukaSection} dataDp={dpTerminData} dataProjectDetail={projectDetailData} suffixParam={suffix} />
      </div>

      <button className="button-simpan-blue" onClick={handleSubmitBAPTermin}>
        Simpan
      </button>
    </>
  );
};

export default forwardRef(BapTerminKe);

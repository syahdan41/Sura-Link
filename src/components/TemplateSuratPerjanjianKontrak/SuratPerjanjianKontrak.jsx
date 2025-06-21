import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import DatePicker from "react-datepicker";

import SuratPerjanjianKontrakPreview from "./SuratPerjanjianKontrakPreview";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import axios from "axios";
import Spinner from "../Spinner/spinner";
import "react-datepicker/dist/react-datepicker.css";
import LogoKampusLarge from "../../Assets/Images/image 1.png";
import html2pdf from "html2pdf.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import documentStyleMapping from "../../documentStyles";

const SuratPerjanjianKontrak = ({ projectDetailData, documentId, currFileType, projectName }, ref) => {
  const contentRef = useRef(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nomor_surat_hasil_pemilihan: "",
    tanggal_nomor_surat_pemilihan: null,
    nomor_surat_keputusan_rektor: "",
    tanggal_surat_keputusan_rektor: null,
    rincian_surat_keputusan: "",
    ketentuan_persetujuan: [
      "1. Undang-Undang Nomor 2 Tahun 2017 tentang Jasa Konstruksi sebagaimana telah diubah dengan Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja",
      "2. Kitab Undang-Undang Hukum Perdata (Buku III tentang Perikatan)",
      "3. Peraturan Pemerintah Nomor 22 Tahun 2020 tentang Peraturan Pelaksanaan Undang – Undang Nomor 2 tahun 2017 tentang Jasa Konstruksi sebagaimana telah diubah dengan Peraturan Pemerintah Nomor 14 Tahun 2021 tentang Perubahan Peraturan Pemerintah Nomor 22 Tahun 2020 tentang Peraturan Pelaksanaan Undang – Undang Nomor 2 tahun 2017 tentang Jasa Konstruksi",
      "4. Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah sebagaimana telah diubah dengan Peraturan Presiden Nomor 12 Tahun 2021 tentang Perubahan Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah",
      "5. Peraturan Presiden Nomor 17 Tahun 2019 tentang Pengadaan Barang/Jasa Pemerintah untuk Percepatan Pembangunan Kesejahteraan di Provinsi Papua dan Provinsi Papua Barat",
    ],
    ruang_lingkup_pekerjaan: [
      "1. Pekerjaan Persiapan",
      "2. Pekerjaan Struktur Non Standar",
      "3. Pekerjaan Struktur Standar",
      "4. Pekerjaan Arsitektur Non Standar",
      "5. Pekerjaan Arsitektur Standar",
      "6. Pekerjaan Mekanikal dan Elektrikal Non Standar",
    ],
    harga_kuantitas_total: { raw: "", masked: "" },
    harga_kuantitas_total_terbilang: "",
    kode_akun_kegiatan: "",
    ketentuan_hierarki: [
      "a. Surat Perjanjian",
      "b. Surat Penawaran",
      "c. Syarat-Syarat Khusus Kontrak",
      "d. Syarat-Syarat Umum Kontrak",
      "e. spesifikasi teknis dan gambar",
      "f. Daftar Kuantitas dan Harga (Daftar Kuantitas dan Harga Hasil Negosiasi apabila ada negosiasi); dan",
      "g. Daftar Kuantitas dan Harga (Daftar Kuantitas dan Harga Terkoreksi apabila ada koreksi aritmatik).",
    ],
    masa_pelaksanaan_pekerjaan: "",
    masa_pelaksanaan_pekerjaan_terbilang: "",
    masa_pemeliharaan_pekerjaan: "",
    masa_pemeliharaan_pekerjaan_terbilang: "",
    nomor_sppbj: projectDetailData.nomor_surat_penunjukan_penyedia_barang_jasa_sppbj || "",
    tanggal_sppbj: projectDetailData.tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        let suratPerjanjian = null;

        // ⬅️ 1. Cek apakah documentId ada (kontrak)
        if (documentId) {
          const resKontrak = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/surat_perjanjian_kontrak?id=${documentId}`);
          suratPerjanjian = resKontrak.data;
          // ⬇️ 3. Mapping ke formData
          setFormData({
            nomor_surat_hasil_pemilihan: suratPerjanjian.nomor_surat_berita_acara_hasil_pemilihan_nomor || "", // ini mana bjir blom ada
            tanggal_nomor_surat_pemilihan: suratPerjanjian.tanggal_nomor_surat_berita_acara_hasil_pemilihan_nomor || "",
            nomor_surat_keputusan_rektor: suratPerjanjian.nomor_surat_keputusan_rektor || "",
            tanggal_surat_keputusan_rektor: suratPerjanjian.tanggal_surat_keputusan_rektor || "",
            rincian_surat_keputusan: suratPerjanjian.rincian_surat_keputusan || "",
            ketentuan_persetujuan: suratPerjanjian.ketentuan_persetujuan || [
              "1. Undang-Undang Nomor 2 Tahun 2017 tentang Jasa Konstruksi sebagaimana telah diubah dengan Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja",
              "2. Kitab Undang-Undang Hukum Perdata (Buku III tentang Perikatan)",
              "3. Peraturan Pemerintah Nomor 22 Tahun 2020 tentang Peraturan Pelaksanaan Undang – Undang Nomor 2 tahun 2017 tentang Jasa Konstruksi sebagaimana telah diubah dengan Peraturan Pemerintah Nomor 14 Tahun 2021 tentang Perubahan Peraturan Pemerintah Nomor 22 Tahun 2020 tentang Peraturan Pelaksanaan Undang – Undang Nomor 2 tahun 2017 tentang Jasa Konstruksi",
              "4. Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah sebagaimana telah diubah dengan Peraturan Presiden Nomor 12 Tahun 2021 tentang Perubahan Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah",
              "5. Peraturan Presiden Nomor 17 Tahun 2019 tentang Pengadaan Barang/Jasa Pemerintah untuk Percepatan Pembangunan Kesejahteraan di Provinsi Papua dan Provinsi Papua Barat",
            ],
            ruang_lingkup_pekerjaan: suratPerjanjian.ruang_lingkup_pekerjaan || [
              "1. Pekerjaan Persiapan",
              "2. Pekerjaan Struktur Non Standar",
              "3. Pekerjaan Struktur Standar",
              "4. Pekerjaan Arsitektur Non Standar",
              "5. Pekerjaan Arsitektur Standar",
              "6. Pekerjaan Mekanikal dan Elektrikal Non Standar",
            ],
            harga_kuantitas_total: {
              raw: suratPerjanjian.total_harga_angka || "",
              masked: suratPerjanjian.total_harga_angka ? `Rp ${new Intl.NumberFormat("id-ID").format(suratPerjanjian.total_harga_angka)}` : "",
            },
            harga_kuantitas_total_terbilang: suratPerjanjian.total_harga_huruf || "",
            kode_akun_kegiatan: suratPerjanjian.kode_akun_kegiatan || "",
            ketentuan_hierarki: suratPerjanjian.ketentuan_hierarki || [
              "a. Surat Perjanjian",
              "b. Surat Penawaran",
              "c. Syarat-Syarat Khusus Kontrak",
              "d. Syarat-Syarat Umum Kontrak",
              "e. spesifikasi teknis dan gambar",
              "f. Daftar Kuantitas dan Harga (Daftar Kuantitas dan Harga Hasil Negosiasi apabila ada negosiasi); dan",
              "g. Daftar Kuantitas dan Harga (Daftar Kuantitas dan Harga Terkoreksi apabila ada koreksi aritmatik).",
            ],
            masa_pelaksanaan_pekerjaan: suratPerjanjian.masa_pelaksanaan_pekerjaan || "",
            masa_pelaksanaan_pekerjaan_terbilang: suratPerjanjian.masa_pelaksanaan_pekerjaan_huruf || "",
            masa_pemeliharaan_pekerjaan: suratPerjanjian.masa_pemeliharaan_pekerjaan || "",
            masa_pemeliharaan_pekerjaan_terbilang: suratPerjanjian.masa_pemeliharaan_pekerjaan_huruf || "",

            // Tambahan dari SPPBJ
            nomor_sppbj: projectDetailData.nomor_surat_penunjukan_penyedia_barang_jasa_sppbj || "",
            tanggal_sppbj: projectDetailData.tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj || "",
          });
        } else {
          setFormData({
            nomor_surat_hasil_pemilihan: "",
            tanggal_nomor_surat_pemilihan: null,
            nomor_surat_keputusan_rektor: "",
            tanggal_surat_keputusan_rektor: null,
            rincian_surat_keputusan: "",
            ketentuan_persetujuan: [
              "1. Undang-Undang Nomor 2 Tahun 2017 tentang Jasa Konstruksi sebagaimana telah diubah dengan Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja",
              "2. Kitab Undang-Undang Hukum Perdata (Buku III tentang Perikatan)",
              "3. Peraturan Pemerintah Nomor 22 Tahun 2020 tentang Peraturan Pelaksanaan Undang – Undang Nomor 2 tahun 2017 tentang Jasa Konstruksi sebagaimana telah diubah dengan Peraturan Pemerintah Nomor 14 Tahun 2021 tentang Perubahan Peraturan Pemerintah Nomor 22 Tahun 2020 tentang Peraturan Pelaksanaan Undang – Undang Nomor 2 tahun 2017 tentang Jasa Konstruksi",
              "4. Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah sebagaimana telah diubah dengan Peraturan Presiden Nomor 12 Tahun 2021 tentang Perubahan Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah",
              "5. Peraturan Presiden Nomor 17 Tahun 2019 tentang Pengadaan Barang/Jasa Pemerintah untuk Percepatan Pembangunan Kesejahteraan di Provinsi Papua dan Provinsi Papua Barat",
            ],
            ruang_lingkup_pekerjaan: [
              "1. Pekerjaan Persiapan",
              "2. Pekerjaan Struktur Non Standar",
              "3. Pekerjaan Struktur Standar",
              "4. Pekerjaan Arsitektur Non Standar",
              "5. Pekerjaan Arsitektur Standar",
              "6. Pekerjaan Mekanikal dan Elektrikal Non Standar",
            ],
            harga_kuantitas_total: { raw: "", masked: "" },
            harga_kuantitas_total_terbilang: "",
            kode_akun_kegiatan: "",
            ketentuan_hierarki: [
              "a. Surat Perjanjian",
              "b. Surat Penawaran",
              "c. Syarat-Syarat Khusus Kontrak",
              "d. Syarat-Syarat Umum Kontrak",
              "e. spesifikasi teknis dan gambar",
              "f. Daftar Kuantitas dan Harga (Daftar Kuantitas dan Harga Hasil Negosiasi apabila ada negosiasi); dan",
              "g. Daftar Kuantitas dan Harga (Daftar Kuantitas dan Harga Terkoreksi apabila ada koreksi aritmatik).",
            ],
            masa_pelaksanaan_pekerjaan: "",
            masa_pelaksanaan_pekerjaan_terbilang: "",
            masa_pemeliharaan_pekerjaan: "",
            masa_pemeliharaan_pekerjaan_terbilang: "",
            nomor_sppbj: projectDetailData.nomor_surat_penunjukan_penyedia_barang_jasa_sppbj || "",
            tanggal_sppbj: projectDetailData.tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj || "",
          });
        }
      } catch (err) {
        console.error("❌ Error fetch surat perjanjian atau sppbj:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [documentId]);

  // validasi text area array
  const handleChangeTextArea = (e) => {
    const { name, value } = e.target;
    let lines = value.split("\n"); // Simpan tiap baris sebagai array

    // Update state dengan array yang sudah diberi numbering
    setFormData((prev) => ({
      ...prev,
      [name]: lines.map((line, index) => `${index + 1}. ${line.replace(/^\d+\.\s*/, "")}`),
    }));

    // Hapus error jika mulai mengetik di field textarea
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleKeyDownTextArea = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Hindari default behavior enter di textarea

      setFormData((prev) => {
        const currentLines = prev[e.target.name] || [];
        const newLines = [...currentLines, `${currentLines.length + 1}. `]; // Tambah baris baru dengan numbering

        return {
          ...prev,
          [e.target.name]: newLines,
        };
      });
    }
  };

  const handleChangeTextAreaAbc = (e) => {
    const { name, value } = e.target;
    const lines = value.split("\n");

    setFormData((prev) => ({
      ...prev,
      [name]: lines.map((line, index) => {
        // Ambil huruf sesuai urutan (ASCII 97 = 'a')
        const abjad = String.fromCharCode(97 + index);
        const cleanLine = line.replace(/^[a-z]\.\s*/, ""); // hapus prefix lama kalau ada

        return `${abjad}. ${cleanLine}`;
      }),
    }));

    // Hapus error kalau ada
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleKeyDownTextAreaAbc = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Hindari default behavior enter di textarea

      setFormData((prev) => {
        const currentLines = prev[e.target.name] || [];
        const newChar = String.fromCharCode(97 + currentLines.length); // 97 adalah kode ASCII untuk 'a'

        const newLines = [...currentLines, `${newChar}. `]; // Tambah baris baru dengan abjad

        return {
          ...prev,
          [e.target.name]: newLines,
        };
      });
    }
  };

  const handleBlurTextArea = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    // Cek apakah hanya ada angka + titik tanpa teks
    const isEmpty = trimmedValue === "" || trimmedValue.match(/^\d+\.$/);

    if (isEmpty) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Field ini harus diisi!",
      }));

      // Kosongkan formData agar tidak ada numbering sisa
      setFormData((prev) => ({
        ...prev,
        [name]: [],
      }));
    }
  };

  const handleFocusTextArea = (e) => {
    const { name } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "harga_kuantitas_total") {
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

  const formatDateToYMD = (date) => {
    if (!date || isNaN(new Date(date))) return ""; // bisa juga return "" tergantung backend
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmitSuratPerjanjianKontrak = async () => {
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
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/put/surat_perjanjian_kontrak?id=${documentId}`,
          {
            project_id: projectDetailData.id,
            nomor_surat_berita_acara_hasil_pemilihan_nomor: formData.nomor_surat_hasil_pemilihan,
            tanggal_nomor_surat_berita_acara_hasil_pemilihan_nomor: formatDateToYMD(formData.tanggal_nomor_surat_pemilihan) || "",

            total_harga_angka: parseInt(formData.harga_kuantitas_total.raw, 10) || 0,
            total_harga_huruf: formData.harga_kuantitas_total_terbilang,
            kode_akun_kegiatan: formData.kode_akun_kegiatan,
            masa_pelaksanaan_pekerjaan: formData.masa_pelaksanaan_pekerjaan,
            masa_pelaksanaan_pekerjaan_huruf: formData.masa_pelaksanaan_pekerjaan_terbilang,
            masa_pemeliharaan_pekerjaan: formData.masa_pemeliharaan_pekerjaan,
            masa_pemeliharaan_pekerjaan_huruf: formData.masa_pemeliharaan_pekerjaan_terbilang,

            ketentuan_persetujuan: formData.ketentuan_persetujuan || [
              "1. Undang-Undang Nomor 2 Tahun 2017 tentang Jasa Konstruksi sebagaimana telah diubah dengan Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja",
              "2. Kitab Undang-Undang Hukum Perdata (Buku III tentang Perikatan)",
              "3. Peraturan Pemerintah Nomor 22 Tahun 2020 tentang Peraturan Pelaksanaan Undang – Undang Nomor 2 tahun 2017 tentang Jasa Konstruksi sebagaimana telah diubah dengan Peraturan Pemerintah Nomor 14 Tahun 2021 tentang Perubahan Peraturan Pemerintah Nomor 22 Tahun 2020 tentang Peraturan Pelaksanaan Undang – Undang Nomor 2 tahun 2017 tentang Jasa Konstruksi",
              "4. Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah sebagaimana telah diubah dengan Peraturan Presiden Nomor 12 Tahun 2021 tentang Perubahan Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah",
              "5. Peraturan Presiden Nomor 17 Tahun 2019 tentang Pengadaan Barang/Jasa Pemerintah untuk Percepatan Pembangunan Kesejahteraan di Provinsi Papua dan Provinsi Papua Barat",
            ],
            ruang_lingkup_pekerjaan: formData.ruang_lingkup_pekerjaan || [
              "1. Pekerjaan Persiapan",
              "2. Pekerjaan Struktur Non Standar",
              "3. Pekerjaan Struktur Standar",
              "4. Pekerjaan Arsitektur Non Standar",
              "5. Pekerjaan Arsitektur Standar",
              "6. Pekerjaan Mekanikal dan Elektrikal Non Standar",
            ],
            ketentuan_hierarki: formData.ketentuan_hierarki || [
              "a. Surat Perjanjian",
              "b. Surat Penawaran",
              "c. Syarat-Syarat Khusus Kontrak",
              "d. Syarat-Syarat Umum Kontrak",
              "e. spesifikasi teknis dan gambar",
              "f. Daftar Kuantitas dan Harga (Daftar Kuantitas dan Harga Hasil Negosiasi apabila ada negosiasi); dan",
              "g. Daftar Kuantitas dan Harga (Daftar Kuantitas dan Harga Terkoreksi apabila ada koreksi aritmatik).",
            ],
            nomor_surat_keputusan_rektor: formData.nomor_surat_keputusan_rektor || "",
            tanggal_surat_keputusan_rektor: formatDateToYMD(formData.tanggal_surat_keputusan_rektor) || "",
            rincian_surat_keputusan: formData.rincian_surat_keputusan || "",
          },
          { headers: { "Content-Type": "application/json" } }
        );
        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "surat_perjanjian_kontrak",
            record_id: 1,
            action_type: "UPDATE",
            timestamp: currentTimestamp,
            project_id: projectDetailData.id,
            project_name: projectName || "",
            description: "Pembaharuan Detil Surat Perjanjian Kontrak",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("✅ Berhasil:", responseHistory.data);

        setLoading(false);
        console.log("✅ Surat Perjanjian Kontrak berhasil diupdate:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        setLoading(false);
        console.error("❌ Gagal update Surat Perjanjian Kontrak:", error);
        setIsFailedModalOpen(true);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/surat_perjanjian_kontrak`,
          {
            project_id: projectDetailData.id,
            nomor_surat_berita_acara_hasil_pemilihan_nomor: formData.nomor_surat_hasil_pemilihan,
            tanggal_nomor_surat_berita_acara_hasil_pemilihan_nomor: formatDateToYMD(formData.tanggal_nomor_surat_pemilihan) || "",

            total_harga_angka: parseInt(formData.harga_kuantitas_total.raw, 10) || 0,
            total_harga_huruf: formData.harga_kuantitas_total_terbilang,
            kode_akun_kegiatan: formData.kode_akun_kegiatan,
            masa_pelaksanaan_pekerjaan: formData.masa_pelaksanaan_pekerjaan,
            masa_pelaksanaan_pekerjaan_huruf: formData.masa_pelaksanaan_pekerjaan_terbilang,
            masa_pemeliharaan_pekerjaan: formData.masa_pemeliharaan_pekerjaan,
            masa_pemeliharaan_pekerjaan_huruf: formData.masa_pemeliharaan_pekerjaan_terbilang,

            ketentuan_persetujuan: formData.ketentuan_persetujuan || [
              "1. Undang-Undang Nomor 2 Tahun 2017 tentang Jasa Konstruksi sebagaimana telah diubah dengan Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja",
              "2. Kitab Undang-Undang Hukum Perdata (Buku III tentang Perikatan)",
              "3. Peraturan Pemerintah Nomor 22 Tahun 2020 tentang Peraturan Pelaksanaan Undang – Undang Nomor 2 tahun 2017 tentang Jasa Konstruksi sebagaimana telah diubah dengan Peraturan Pemerintah Nomor 14 Tahun 2021 tentang Perubahan Peraturan Pemerintah Nomor 22 Tahun 2020 tentang Peraturan Pelaksanaan Undang – Undang Nomor 2 tahun 2017 tentang Jasa Konstruksi",
              "4. Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah sebagaimana telah diubah dengan Peraturan Presiden Nomor 12 Tahun 2021 tentang Perubahan Peraturan Presiden Nomor 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah",
              "5. Peraturan Presiden Nomor 17 Tahun 2019 tentang Pengadaan Barang/Jasa Pemerintah untuk Percepatan Pembangunan Kesejahteraan di Provinsi Papua dan Provinsi Papua Barat",
            ],
            ruang_lingkup_pekerjaan: formData.ruang_lingkup_pekerjaan || [
              "1. Pekerjaan Persiapan",
              "2. Pekerjaan Struktur Non Standar",
              "3. Pekerjaan Struktur Standar",
              "4. Pekerjaan Arsitektur Non Standar",
              "5. Pekerjaan Arsitektur Standar",
              "6. Pekerjaan Mekanikal dan Elektrikal Non Standar",
            ],
            ketentuan_hierarki: formData.ketentuan_hierarki || [
              "a. Surat Perjanjian",
              "b. Surat Penawaran",
              "c. Syarat-Syarat Khusus Kontrak",
              "d. Syarat-Syarat Umum Kontrak",
              "e. spesifikasi teknis dan gambar",
              "f. Daftar Kuantitas dan Harga (Daftar Kuantitas dan Harga Hasil Negosiasi apabila ada negosiasi); dan",
              "g. Daftar Kuantitas dan Harga (Daftar Kuantitas dan Harga Terkoreksi apabila ada koreksi aritmatik).",
            ],
            nomor_surat_keputusan_rektor: formData.nomor_surat_keputusan_rektor || "",
            tanggal_surat_keputusan_rektor: formatDateToYMD(formData.tanggal_surat_keputusan_rektor) || "",
            rincian_surat_keputusan: formData.rincian_surat_keputusan || "",
          },
          { headers: { "Content-Type": "application/json" } }
        );
        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "surat_perjanjian_kontrak",
            record_id: 1,
            action_type: "CREATE",
            timestamp: currentTimestamp,
            project_id: response.data.id,
            project_name: projectName || "",
            description: "Pembuatan Surat Perjanjian Kontrak",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("✅ Berhasil:", responseHistory.data);
        setLoading(false);
        console.log("✅ Surat Perjanjian Kontrak berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        setLoading(false);
        console.error("❌ Gagal membuat Surat Perjanjian Kontrak:", error);
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
      label: "NIP",
      value: projectDetailData.nip_pihak_1 || "(NIP pihak 1)",
    },

    {
      label: "Jabatan",
      value: projectDetailData.jabatan_pihak_1 || "(Jabatan pihak 1)",
    },
    {
      label: "Berkedudukan di",
      value: projectDetailData.alamat_pihak_1 || "(alamat pihak 1)",
    },
  ];

  const bapTerminPihak2Data = [
    {
      label: "Nama",
      value: projectDetailData.nama_pihak_2 || "(Nama Pihak 2)",
    },

    {
      label: "NIP",
      value: projectDetailData.nip_pihak_2 || "(NIP pihak 2)",
    },

    {
      label: "Jabatan",
      value: projectDetailData.jabatan_pihak_2 || "(Jabatan pihak 2)",
    },
    {
      label: "Berkedudukan di",
      value: projectDetailData.alamat_pihak_2 || "(alamat pihak 2)",
    },
    {
      label: "Akta Notaris Nomor",
      value: projectDetailData.nomor_akta_notaris_pihak_2 || "(Nomor akta notaris)",
    },
    {
      label: "Tanggal",
      value: projectDetailData.tanggal_nomor_akta_notaris_pihak_2
        ? new Date(projectDetailData.tanggal_nomor_akta_notaris_pihak_2).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "(Tanggal Akta Notaris)",
    },
    {
      label: "Notaris",
      value: projectDetailData.nama_notaris_pihak_2 || "(Nama akta notaris)",
    },
  ];

  const ComponentWord = () => {
    return (
      <div style={{ padding: "20px", display: "none" }}>
        <div ref={contentRef}>
          {/* header content */}
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
          {/* end of header content */}

          {/* content pdf */}

          {currFileType !== "word" && (
            <>
              <div className="tittle-surat-ringkasan-kontrak">SURAT PERJANJIAN</div>
              <div className="tittle-nomor-ringkasan-kontrak">Kontrak Harga Satuan</div>
              <div className="spmk-nomor-paket-layout">
                <div>
                  <span>{projectDetailData.pekerjaan || "(Paket Pekerjaan)"}</span>
                </div>
                <div>
                  <strong>
                    <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                  </strong>
                </div>
                <div>Nomor: 5961/UN30.6.6/HK/2024</div>
              </div>
              <div className="spmk-justify-text">
                SURAT PERJANJIAN ini berikut semua lampirannya adalah Kontrak Kerja Konstruksi Harga Satuan, yang selanjutnya disebut <strong>“Kontrak”</strong> dibuat dan ditandatangani di Bengkulu pada hari{" "}
                <span>{projectDetailData.tanggal_surat_perjanjian_kontrak_huruf || "(Tanggal surat perjanjian kontrak terbilang)"}</span> [
                <span>
                  {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                    new Date(projectDetailData.tanggal_surat_perjanjian_kontrak)
                      .toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .replace(/\//g, "/")) ||
                    "(Tanggal Surat perjanjian kontrak)"}
                </span>
                ], berdasarkan Berita Acara Hasil Pemilihan Nomor <span>{formData.nomor_surat_hasil_pemilihan || "(Nomor Surat Hasil Pemilihan)"}</span> tanggal{" "}
                <span>
                  {(formData.tanggal_nomor_surat_pemilihan &&
                    new Date(formData.tanggal_nomor_surat_pemilihan).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Surat Pemilihan)"}
                </span>
                , Surat Penunjukan Penyedia Barang/Jasa (SPPBJ) Nomor <span>{formData.nomor_sppbj || "(Nomor Surat SPPBJ)"}</span> tanggal{" "}
                <span>
                  {(formData.tanggal_sppbj &&
                    new Date(formData.tanggal_sppbj).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Surat SPPBJ)"}
                </span>
                , antara:
              </div>
              <div className="spk-container">
                <p className="spmk-intro"></p>

                <div className="spmk-item">
                  <span className="suratkontrak-label">Nama</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{projectDetailData.nama_pihak_1 || "(Nama pihak 1)"}</span>
                  </span>
                </div>

                <div className="spmk-item">
                  <span className="suratkontrak-label">NIP</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{projectDetailData.nip_pihak_1 || "(NIP pihak 1)"}</span>
                  </span>
                </div>

                <div className="spmk-item">
                  <span className="suratkontrak-label">Jabatan</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan pihak 1)"}</span>
                  </span>
                </div>

                <div className="spmk-item">
                  <span className="suratkontrak-label">Berkedudukan di</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{projectDetailData.alamat_pihak_1 || "(alamat pihak 1)"}</span>
                  </span>
                </div>
              </div>
              <div className="spmk-justify-text">
                yang bertindak untuk dan atas nama Pemerintah Indonesia c.q. Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi c.q. Direktorat Jenderal Pendidikan Tinggi, Riset, dan Teknologi c.q. Satuan Kerja Universitas Bengkulu
                berdasarkan Surat Keputusan Rektor Universitas Bengkulu Nomor <span>{formData.nomor_surat_keputusan_rektor || "(Nomor Surat Keputusan Rektor)"}</span> tanggal{" "}
                <span>
                  {(formData.tanggal_surat_keputusan_rektor &&
                    new Date(formData.tanggal_surat_keputusan_rektor).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Surat Keputusan Rektor)"}
                </span>{" "}
                tentang <span>{formData.rincian_surat_keputusan || "(Rincian)"}</span> selanjutnya disebut “Pejabat Penandatangan Kontrak”, dengan:
              </div>
              <div className="spk-container">
                <p className="spmk-intro"></p>

                <div className="spmk-item">
                  <span className="suratkontrak-label">Nama</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{projectDetailData.nama_pihak_2 || "(Nama pihak 2)"}</span>
                  </span>
                </div>

                <div className="spmk-item">
                  <span className="suratkontrak-label">Jabatan</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan pihak 2)"}</span>
                  </span>
                </div>

                <div className="spmk-item">
                  <span className="suratkontrak-label">Berkedudukan di</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{projectDetailData.alamat_pihak_2 || "(Alamat pihak 2)"}</span>
                  </span>
                </div>

                <div className="spmk-item">
                  <span className="suratkontrak-label">Akta Notaris Nomor</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{projectDetailData.nomor_akta_notaris_pihak_2 || "(Nomor akta notaris)"}</span>
                  </span>
                </div>
                <div className="spmk-item">
                  <span className="suratkontrak-label">Tanggal</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>
                      {(projectDetailData.tanggal_nomor_akta_notaris_pihak_2 &&
                        new Date(projectDetailData.tanggal_nomor_akta_notaris_pihak_2).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })) ||
                        "(Tanggal Akta Notaris)"}
                    </span>
                  </span>
                </div>
                <div className="spmk-item">
                  <span className="suratkontrak-label">Notaris</span>
                  <span className="spmk-separator">:</span>
                  <span className="spmk-value">
                    <span>{projectDetailData.nama_notaris_pihak_2 || "(Nama akta notaris)"}</span>
                  </span>
                </div>
              </div>
              <div className="spmk-justify-text">
                yang bertindak untuk dan atas nama <span>{projectDetailData.perusahaan_pihak_2 || "(Nama perusahaan pihak 2)"}</span> selanjutnya disebut <strong>“Penyedia”.</strong>{" "}
              </div>

              <div className="spk-dasar-hukum-container">
                <div className="spk-dasar-hukum-title">Dan dengan memperhatikan:</div>
                {formData.ketentuan_persetujuan.map((item, index) => (
                  <div className="spk-dasar-hukum-item" key={index}>
                    <span className="spk-dasar-hukum-label">{index + 1}.</span>
                    <span className="spk-dasar-hukum-value">{item.replace(/^\d+\.\s*/, "")}</span>
                  </div>
                ))}

                <div className="spk-dasar-hukum-note">*) Disesuaikan dengan nama K/L/PD</div>
              </div>

              <div className="tittle-perpage">PARA PIHAK MENERANGKAN TERLEBIH DAHULU BAHWA:</div>

              <div className="spk-dasar-hukum-container">
                <div className="spk-dasar-hukum-item">
                  <span className="spk-dasar-hukum-label">(a)</span>
                  <span className="spk-dasar-hukum-value">telah dilakukan proses pemilihan Penyedia yang telah sesuai dengan Dokumen Pemilihan;</span>
                </div>

                <div className="spk-dasar-hukum-item">
                  <span className="spk-dasar-hukum-label">(b)</span>
                  <span className="spk-dasar-hukum-value">
                    Pejabat Penandatangan Kontrak telah menunjuk Penyedia menjadi pihak dalam Kontrak ini melalui Surat Penunjukan Penyediaan Barang/Jasa (SPPBJ) untuk melaksanakan Pekerjaan Konstruksi{" "}
                    <strong>
                      <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                    </strong>{" "}
                    sebagaimana diterangkan dalam dokumen Kontrak ini selanjutnya disebut “Pekerjaan Konstruksi”;
                  </span>
                </div>

                <div className="spk-dasar-hukum-item">
                  <span className="spk-dasar-hukum-label">(c)</span>
                  <span className="spk-dasar-hukum-value">
                    Penyedia telah menyatakan kepada Pejabat y Penandatangan Kontrak, memiliki keahlian profesional, tenaga kerja konstruksi, dan sumber daya teknis, serta telah menyetujui untuk melaksanakan Pekerjaan Konstruksi sesuai
                    dengan persyaratan dan ketentuan dalam Kontrak ini;
                  </span>
                </div>

                <div className="spk-dasar-hukum-item">
                  <span className="spk-dasar-hukum-label">(d)</span>
                  <span className="spk-dasar-hukum-value">Pejabat Penandatangan Kontrak dan Penyedia menyatakan memiliki kewenangan untuk menandatangani Kontrak ini, dan mengikat pihak yang diwakili;</span>
                </div>

                <div className="spk-dasar-hukum-item">
                  <span className="spk-dasar-hukum-label">(e)</span>
                  <div className="spk-dasar-hukum-value">
                    Pejabat Penandatangan Kontrak dan Penyedia mengakui dan menyatakan bahwa sehubungan dengan penandatanganan Kontrak ini masing-masing pihak :
                    <div className="spk-dasar-hukum-subitems">
                      <div className="spk-dasar-hukum-subitem">
                        <span className="spk-dasar-hukum-label">(1)</span>
                        <span className="spk-dasar-hukum-value">telah dan senantiasa diberikan kesempatan untuk didampingi oleh advokat; </span>
                      </div>
                      <div className="spk-dasar-hukum-subitem">
                        <span className="spk-dasar-hukum-label">(2)</span>
                        <span className="spk-dasar-hukum-value">menandatangani Kontrak ini setelah meneliti secara patut; </span>
                      </div>
                      <div className="spk-dasar-hukum-subitem">
                        <span className="spk-dasar-hukum-label">(3)</span>
                        <span className="spk-dasar-hukum-value">telah membaca dan memahami secara penuh ketentuan Kontrak ini;</span>
                      </div>
                      <div className="spk-dasar-hukum-subitem">
                        <span className="spk-dasar-hukum-label">(4)</span>
                        <span className="spk-dasar-hukum-value">telah mendapatkan kesempatan yang memadai untuk memeriksa dan mengkonfirmasikan semua ketentuan dalam Kontrak ini beserta semua fakta dan kondisi yang terkait.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="spmk-justify-text-2">
                Maka oleh karena itu, Pejabat Penandatangan Kontrak dan Penyedia dengan ini bersepakat dan menyetujui untuk membuat perjanjian pelaksanaan paket Pekerjaan Konstruksi{" "}
                <strong>
                  <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                </strong>{" "}
                dengan syarat dan ketentuan sebagai berikut.
              </div>

              <div className="tittle-onpage">
                <p>Pasal 1</p>
                <p>ISTILAH DAN UNGKAPAN</p>
              </div>
              <div className="spmk-justify-text">Peristilahan dan ungkapan dalam Surat Perjanjian ini memiliki arti dan makna yang sama seperti yang tercantum dalam lampiran Surat Perjanjian ini.</div>
              <div className="tittle-onpage">
                <p>Pasal 2</p>
                <p>RUANG LINGKUP PEKERJAAN UTAMA</p>
              </div>

              <div className="spmk-text-container">
                <div>Ruang lingkup pekerjaan utama terdiri dari:</div>
                {formData.ruang_lingkup_pekerjaan.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>

              <div className="tittle-onpage">
                <p>Pasal 3</p>
                <p>HARGA KONTRAK, SUMBER PEMBIAYAAN DAN PEMBAYARAN</p>
              </div>
              <div className="spk-dasar-hukum-container">
                <div className="spk-dasar-hukum-item">
                  <span className="spk-dasar-hukum-label">(1)</span>
                  <span className="spk-dasar-hukum-value">
                    Harga Kontrak termasuk Pajak Pertambahan Nilai (PPN) yang diperoleh berdasarkan total harga penawaran terkoreksi sebagaimana tercantum dalam Daftar Kuantitas dan Harga adalah sebesar{" "}
                    <strong>
                      <span>{formData.harga_kuantitas_total.masked || "(Rp Nominal)"}</span>
                    </strong>{" "}
                    (<span>{formData.harga_kuantitas_total_terbilang || "(Nominal Terbilang)"}</span>) dengan kode akun kegiatan <span>{formData.kode_akun_kegiatan || "(Kode Akun Kegiatan)"}</span>;
                  </span>
                </div>

                <div className="spk-dasar-hukum-item">
                  <span className="spk-dasar-hukum-label">(2)</span>
                  <span className="spk-dasar-hukum-value">Kontrak ini dibiayai dari DIPA Universitas Bengkulu;</span>
                </div>

                <div className="spk-dasar-hukum-item">
                  <span className="spk-dasar-hukum-label">(3)</span>
                  <span className="spk-dasar-hukum-value">
                    Pembayaran untuk kontrak ini dilakukan ke{" "}
                    <strong>
                      <span>{projectDetailData.nama_bank_pihak_2 || "(Nama Bank Pihak 2)"}</span>
                    </strong>{" "}
                    rekening nomor :{" "}
                    <strong>
                      <span>{projectDetailData.nomor_rekening_pihak_2 || "(Rekening Bank Pihak 2)"}</span>
                    </strong>{" "}
                    atas nama Penyedia :{" "}
                    <strong>
                      <span>{projectDetailData.perusahaan_pihak_2 || "(Nama Pemilik Rekening Bank Pihak 2)"}</span>
                    </strong>
                  </span>
                </div>

                <div className="spk-dasar-hukum-note">[Catatan : untuk kontrak tahun jamak agar dicantumkan rincian pendanaan untuk masing-masing Tahun Anggarannya]</div>
              </div>

              <div className="tittle-onpage">
                <p>Pasal 4</p>
                <p>DOKUMEN KONTRAK</p>
              </div>

              <div className="spk-dasar-hukum-container">
                <div className="spk-dasar-hukum-item">
                  <span className="spk-dasar-hukum-label">(1)</span>
                  <span className="spk-dasar-hukum-value">
                    Kelengkapan dokumen-dokumen berikut merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Kontrak ini terdiri dari adendum Kontrak (apabila ada), Surat Perjanjian, Surat Penawaran, Daftar Kuantitas dan Harga,
                    Syarat-Syarat Umum Kontrak, Syarat-Syarat Khusus Kontrak beserta lampiranya berupa lampiran A (daftar harga satuan timpang, subkontraktor, personel manajerial, dan peralatan utama), lampiran B (Rencana Keselamatan
                    Konstruksi), spesifikasi teknis, gambar-gambar, dan dokumen lainnya seperti: Surat Penunjukan Penyedia Barang/Jasa, Jadwal Pelaksanaan Pekerjaan, jaminan-jaminan, Berita Acara Rapat Persiapan Penandatanganan Kontrak,
                    Berita Acara Rapat Persiapan Pelaksanaan Kontrak.
                  </span>
                </div>

                <div className="spk-dasar-hukum-item">
                  <span className="spk-dasar-hukum-label">(2)</span>
                  <div className="spk-dasar-hukum-value">
                    Pejabat Penandatangan Kontrak dan Penyedia mengakui dan menyatakan bahwa sehubungan dengan penandatanganan Kontrak ini masing-masing pihak :
                    <div className="spk-dasar-hukum-subitems">
                      {formData.ketentuan_hierarki.map((item, index) => (
                        <div className="spk-dasar-hukum-subitem" key={index}>
                          <span className="spk-dasar-hukum-label">({String.fromCharCode(97 + index)})</span>
                          <span className="spk-dasar-hukum-value">{item.replace(/^[a-z]\.\s*/, "")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="tittle-onpage">
                <p>Pasal 5</p>
                <p>MASA KONTRAK</p>
              </div>

              <div className="spk-dasar-hukum-container">
                <div className="spk-dasar-hukum-item">
                  <span className="spk-dasar-hukum-label">(1)</span>
                  <span className="spk-dasar-hukum-value">Masa Kontrak adalah jangka waktu berlakunya Kontrak ini terhitung sejak tanggal penandatangananan Kontrak sampai dengan Tanggal Penyerahan Akhir Pekerjaan;</span>
                </div>

                <div className="spk-dasar-hukum-item">
                  <span className="spk-dasar-hukum-label">(2)</span>
                  <span className="spk-dasar-hukum-value">
                    Masa Pelaksanaan ditentukan dalam Syarat-Syarat Khusus Kontrak, dihitung sejak Tanggal Mulai Kerja yang tercantum dalam SPMK sampai dengan Tanggal Penyerahan Pertama Pekerjaan selama{" "}
                    <span>{formData.masa_pelaksanaan_pekerjaan || "(Masa Pelaksanaan Pekerjaan)"}</span> (
                    <em>
                      <span>{formData.masa_pelaksanaan_pekerjaan_terbilang || "(Masa Pelaksanaan Pekerjaan Terbilang)"}</span>
                    </em>
                    ) hari kalender;
                  </span>
                </div>

                <div className="spk-dasar-hukum-item">
                  <span className="spk-dasar-hukum-label">(3)</span>
                  <span className="spk-dasar-hukum-value">
                    Masa Pemeliharaan ditentukan dalam Syarat-Syarat Khusus Kontrak dihitung sejak Tanggal Penyerahan Pertama Pekerjaan sampai dengan Tanggal Penyerahan Akhir Pekerjaan selama{" "}
                    <span>{formData.masa_pemeliharaan_pekerjaan || "(Masa Pemeliharaan Pekerjaan)"}</span> (
                    <em>
                      <span>{formData.masa_pemeliharaan_pekerjaan_terbilang || "(Masa Pemeliharaan Pekerjaan Terbilang)"}</span>
                    </em>
                    ) hari kalender.
                  </span>
                </div>
              </div>

              <div className="spmk-justify-text">
                Dengan demikian, Pejabat Penandatangan Kontrak dan Penyedia telah bersepakat untuk menandatangani Kontrak ini pada tanggal tersebut di atas dan melaksanakan Kontrak sesuai dengan ketentuan peraturan perundang-undangan di
                Republik Indonesia dan dibuat dalam 2 (dua) rangkap, masing-masing dibubuhi dengan meterai, mempunyai kekuatan hukum yang sama dan mengikat bagi para pihak, rangkap yang lain dapat diperbanyak sesuai kebutuhan tanpa dibubuhi
                meterai.
              </div>
              <div style={{ pageBreakBefore: "always" }}>
                <div className="ttd-spk-main">
                  <div className="ttd-spk-layout">
                    <div className="ttd-spk-text-container">
                      <div>Untuk dan atas nama</div>
                      <div>
                        <em>
                          <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                        </em>
                      </div>
                    </div>
                    <div className="ttd-spk-text-container">
                      <div>
                        <em>
                          [<span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>]
                        </em>
                      </div>
                      <div>
                        <em>
                          <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                        </em>
                      </div>
                    </div>
                  </div>
                  <div className="ttd-spk-layout">
                    <div className="ttd-spk-text-container">
                      <div>Untuk dan atas nama</div>
                      <div>
                        <em>
                          <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                        </em>
                      </div>
                    </div>
                    <div className="ttd-spk-text-container">
                      <div>
                        <em>
                          [<span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>]
                        </em>
                      </div>
                      <div>
                        <em>
                          NIP. <span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                        </em>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* end of content pdf */}

          {/* content word */}
          {currFileType === "word" && (
            <>
              <div>
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
                  <div style={{ fontWeight: "bold", fontSize: "18px" }}>SURAT PERJANJIAN</div>
                  <div className="tittle-nomor-ringkasan-kontrak">Kontrak Harga Satuan</div>
                  <div className="spmk-nomor-paket-layout">
                    <div>
                      <span>{projectDetailData.pekerjaan || "(Paket Pekerjaan)"}</span>
                    </div>
                    <div>
                      <strong>
                        <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                      </strong>
                    </div>
                    <div>Nomor: 5961/UN30.6.6/HK/2024</div>
                  </div>
                </div>

                <div className="spmk-justify-text">
                  SURAT PERJANJIAN ini berikut semua lampirannya adalah Kontrak Kerja Konstruksi Harga Satuan, yang selanjutnya disebut <strong>"Kontrak"</strong> dibuat dan ditandatangani di Bengkulu pada hari{" "}
                  <span>{projectDetailData.tanggal_surat_perjanjian_kontrak_huruf || "(Tanggal surat perjanjian kontrak terbilang)"}</span> [
                  <span>
                    {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                      new Date(projectDetailData.tanggal_surat_perjanjian_kontrak)
                        .toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .replace(/\//g, "/")) ||
                      "(Tanggal Surat perjanjian kontrak)"}
                  </span>
                  ], berdasarkan Berita Acara Hasil Pemilihan Nomor <span>{formData.nomor_surat_hasil_pemilihan || "(Nomor Surat Hasil Pemilihan)"}</span> tanggal{" "}
                  <span>
                    {(formData.tanggal_nomor_surat_pemilihan &&
                      new Date(formData.tanggal_nomor_surat_pemilihan).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })) ||
                      "(Tanggal Surat Pemilihan)"}
                  </span>
                  , Surat Penunjukan Penyedia Barang/Jasa (SPPBJ) Nomor <span>{formData.nomor_sppbj || "(Nomor Surat SPPBJ)"}</span> tanggal{" "}
                  <span>
                    {(formData.tanggal_sppbj &&
                      new Date(formData.tanggal_sppbj).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })) ||
                      "(Tanggal Surat SPPBJ)"}
                  </span>
                  , antara:
                </div>
                <div style={{ marginLeft: "30px" }}>
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
                          <td style={{ width: "150px", whiteSpace: "nowrap", verticalAlign: "top" }}>{item.label}</td>
                          <td style={{ paddingLeft: "0px", verticalAlign: "top" }}>:</td>
                          <td style={{ verticalAlign: "top", marginRight: "100px" }}>{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="spmk-justify-text">
                  yang bertindak untuk dan atas nama Pemerintah Indonesia c.q. Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi c.q. Direktorat Jenderal Pendidikan Tinggi, Riset, dan Teknologi c.q. Satuan Kerja Universitas Bengkulu
                  berdasarkan Surat Keputusan Rektor Universitas Bengkulu Nomor <span>{formData.nomor_surat_keputusan_rektor || "(Nomor Surat Keputusan Rektor)"}</span> tanggal{" "}
                  <span>
                    {(formData.tanggal_surat_keputusan_rektor &&
                      new Date(formData.tanggal_surat_keputusan_rektor).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })) ||
                      "(Tanggal Surat Keputusan Rektor)"}
                  </span>{" "}
                  tentang <span>{formData.rincian_surat_keputusan || "(Rincian)"}</span> selanjutnya disebut "Pejabat Penandatangan Kontrak", dengan:
                </div>
                <div style={{ marginLeft: "30px" }}>
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
                          <td style={{ width: "150px", whiteSpace: "nowrap", verticalAlign: "top" }}>{item.label}</td>
                          <td style={{ paddingLeft: "0px", verticalAlign: "top" }}>:</td>
                          <td style={{ verticalAlign: "top", marginRight: "100px" }}>{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="spmk-justify-text">
                  yang bertindak untuk dan atas nama <span>{projectDetailData.perusahaan_pihak_2 || "(Nama perusahaan pihak 2)"}</span> selanjutnya disebut <strong>"Penyedia".</strong>{" "}
                </div>

                <div className="spk-dasar-hukum-container">
                  <div className="spk-dasar-hukum-title">Dan dengan memperhatikan:</div>
                  <table style={{ width: "100%", fontSize: "16px", fontFamily: '"Times New Roman", Times, serif' }}>
                    <tbody>
                      {formData.ketentuan_persetujuan.map((item, index) => (
                        <tr key={index}>
                          <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>{index + 1}.</td>
                          <td style={{ textAlign: "justify" }}>{item.replace(/^\d+\.\s*/, "")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="spk-dasar-hukum-note">*) Disesuaikan dengan nama K/L/PD</div>
                </div>

                <div className="tittle-perpage">PARA PIHAK MENERANGKAN TERLEBIH DAHULU BAHWA:</div>

                <div className="spk-dasar-hukum-container">
                  <table style={{ width: "100%", fontSize: "16px", fontFamily: '"Times New Roman", Times, serif' }}>
                    <tbody>
                      <tr>
                        <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(a)</td>
                        <td style={{ textAlign: "justify" }}>telah dilakukan proses pemilihan Penyedia yang telah sesuai dengan Dokumen Pemilihan;</td>
                      </tr>

                      <tr>
                        <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(b)</td>
                        <td style={{ textAlign: "justify" }}>
                          {" "}
                          Pejabat Penandatangan Kontrak telah menunjuk Penyedia menjadi pihak dalam Kontrak ini melalui Surat Penunjukan Penyediaan Barang/Jasa (SPPBJ) untuk melaksanakan Pekerjaan Konstruksi{" "}
                          <strong>
                            <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                          </strong>{" "}
                          sebagaimana diterangkan dalam dokumen Kontrak ini selanjutnya disebut “Pekerjaan Konstruksi”;
                        </td>
                      </tr>

                      <tr>
                        <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(c)</td>
                        <td style={{ textAlign: "justify" }}>
                          {" "}
                          Penyedia telah menyatakan kepada Pejabat y Penandatangan Kontrak, memiliki keahlian profesional, tenaga kerja konstruksi, dan sumber daya teknis, serta telah menyetujui untuk melaksanakan Pekerjaan Konstruksi
                          sesuai dengan persyaratan dan ketentuan dalam Kontrak ini;
                        </td>
                      </tr>

                      <tr>
                        <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(d)</td>
                        <td style={{ textAlign: "justify" }}> Pejabat Penandatangan Kontrak dan Penyedia menyatakan memiliki kewenangan untuk menandatangani Kontrak ini, dan mengikat pihak yang diwakili;</td>
                      </tr>

                      <tr>
                        <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(e)</td>
                        <td style={{ textAlign: "justify" }}>
                          {" "}
                          Pejabat Penandatangan Kontrak dan Penyedia mengakui dan menyatakan bahwa sehubungan dengan penandatanganan Kontrak ini masing-masing pihak :
                          <div style={{ marginLeft: "20px" }}>
                            <table style={{ width: "550px", fontSize: "16px", fontFamily: '"Times New Roman", Times, serif' }}>
                              <tbody>
                                <tr>
                                  <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(1)</td>
                                  <td style={{ textAlign: "justify" }}>telah dan senantiasa diberikan kesempatan untuk didampingi oleh advokat;</td>
                                </tr>

                                <tr>
                                  <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(2)</td>
                                  <td style={{ textAlign: "justify" }}>menandatangani Kontrak ini setelah meneliti secara patut;</td>
                                </tr>

                                <tr>
                                  <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(3)</td>
                                  <td style={{ textAlign: "justify" }}>telah membaca dan memahami secara penuh ketentuan Kontrak ini;</td>
                                </tr>

                                <tr>
                                  <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(4)</td>
                                  <td style={{ textAlign: "justify" }}>telah mendapatkan kesempatan yang memadai untuk memeriksa dan mengkonfirmasikan semua ketentuan dalam Kontrak ini beserta semua fakta dan kondisi yang terkait.</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="spmk-justify-text-2">
                  Maka oleh karena itu, Pejabat Penandatangan Kontrak dan Penyedia dengan ini bersepakat dan menyetujui untuk membuat perjanjian pelaksanaan paket Pekerjaan Konstruksi{" "}
                  <strong>
                    <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                  </strong>{" "}
                  dengan syarat dan ketentuan sebagai berikut.
                </div>

                <div style={{ textAlign: "center" }}>
                  <p>Pasal 1</p>
                  <p>ISTILAH DAN UNGKAPAN</p>
                </div>
                <div className="spmk-justify-text">Peristilahan dan ungkapan dalam Surat Perjanjian ini memiliki arti dan makna yang sama seperti yang tercantum dalam lampiran Surat Perjanjian ini.</div>
                <div style={{ textAlign: "center" }}>
                  <p>Pasal 2</p>
                  <p>RUANG LINGKUP PEKERJAAN UTAMA</p>
                </div>

                <div className="spmk-text-container">
                  <div>Ruang lingkup pekerjaan utama terdiri dari:</div>
                  {formData.ruang_lingkup_pekerjaan.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>

                <div style={{ textAlign: "center" }}>
                  <p>Pasal 3</p>
                  <p>HARGA KONTRAK, SUMBER PEMBIAYAAN DAN PEMBAYARAN</p>
                </div>
                <div className="spk-dasar-hukum-container">
                  <table style={{ width: "100%", fontSize: "16px", fontFamily: '"Times New Roman", Times, serif' }}>
                    <tbody>
                      <tr>
                        <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(1)</td>
                        <td style={{ textAlign: "justify" }}>
                          Harga Kontrak termasuk Pajak Pertambahan Nilai (PPN) yang diperoleh berdasarkan total harga penawaran terkoreksi sebagaimana tercantum dalam Daftar Kuantitas dan Harga adalah sebesar{" "}
                          <strong>
                            <span>{formData.harga_kuantitas_total.masked || "(Rp Nominal)"}</span>
                          </strong>{" "}
                          (<span>{formData.harga_kuantitas_total_terbilang || "(Nominal Terbilang)"}</span>) dengan kode akun kegiatan <span>{formData.kode_akun_kegiatan || "(Kode Akun Kegiatan)"}</span>;
                        </td>
                      </tr>

                      <tr>
                        <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(2)</td>
                        <td style={{ textAlign: "justify" }}>Kontrak ini dibiayai dari DIPA Universitas Bengkulu;</td>
                      </tr>

                      <tr>
                        <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(3)</td>
                        <td style={{ textAlign: "justify" }}>
                          Pembayaran untuk kontrak ini dilakukan ke{" "}
                          <strong>
                            <span>{projectDetailData.nama_bank_pihak_2 || "(Nama Bank Pihak 2)"}</span>
                          </strong>{" "}
                          rekening nomor :{" "}
                          <strong>
                            <span>{projectDetailData.nomor_rekening_pihak_2 || "(Rekening Bank Pihak 2)"}</span>
                          </strong>{" "}
                          atas nama Penyedia :{" "}
                          <strong>
                            <span>{projectDetailData.perusahaan_pihak_2 || "(Nama Pemilik Rekening Bank Pihak 2)"}</span>
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="spk-dasar-hukum-note">[Catatan : untuk kontrak tahun jamak agar dicantumkan rincian pendanaan untuk masing-masing Tahun Anggarannya]</div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <p>Pasal 4</p>
                  <p>DOKUMEN KONTRAK</p>
                </div>

                <div className="spk-dasar-hukum-container">
                  <table style={{ width: "100%", fontSize: "16px", fontFamily: '"Times New Roman", Times, serif' }}>
                    <tbody>
                      <tr>
                        <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(1)</td>
                        <td style={{ textAlign: "justify" }}>
                          Kelengkapan dokumen-dokumen berikut merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Kontrak ini terdiri dari adendum Kontrak (apabila ada), Surat Perjanjian, Surat Penawaran, Daftar Kuantitas dan
                          Harga, Syarat-Syarat Umum Kontrak, Syarat-Syarat Khusus Kontrak beserta lampiranya berupa lampiran A (daftar harga satuan timpang, subkontraktor, personel manajerial, dan peralatan utama), lampiran B (Rencana
                          Keselamatan Konstruksi), spesifikasi teknis, gambar-gambar, dan dokumen lainnya seperti: Surat Penunjukan Penyedia Barang/Jasa, Jadwal Pelaksanaan Pekerjaan, jaminan-jaminan, Berita Acara Rapat Persiapan
                          Penandatanganan Kontrak, Berita Acara Rapat Persiapan Pelaksanaan Kontrak.
                        </td>
                      </tr>

                      <tr>
                        <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(2)</td>
                        <td style={{ textAlign: "justify" }}>
                          Pejabat Penandatangan Kontrak dan Penyedia mengakui dan menyatakan bahwa sehubungan dengan penandatanganan Kontrak ini masing-masing pihak :
                          <div className="spk-dasar-hukum-subitems">
                            {formData.ketentuan_hierarki.map((item, index) => (
                              <div className="spk-dasar-hukum-subitem" key={index}>
                                <span className="spk-dasar-hukum-label">({String.fromCharCode(97 + index)})</span>
                                <span className="spk-dasar-hukum-value">{item.replace(/^[a-z]\.\s*/, "")}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ textAlign: "center" }}>
                  <p>Pasal 5</p>
                  <p>MASA KONTRAK</p>
                </div>

                <div className="spk-dasar-hukum-container">
                  <table style={{ width: "100%", fontSize: "16px", fontFamily: '"Times New Roman", Times, serif' }}>
                    <tbody>
                      <tr>
                        <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(1)</td>
                        <td style={{ textAlign: "justify" }}>Masa Kontrak adalah jangka waktu berlakunya Kontrak ini terhitung sejak tanggal penandatangananan Kontrak sampai dengan Tanggal Penyerahan Akhir Pekerjaan;</td>
                      </tr>

                      <tr>
                        <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(2)</td>
                        <td style={{ textAlign: "justify" }}>
                          {" "}
                          Masa Pelaksanaan ditentukan dalam Syarat-Syarat Khusus Kontrak, dihitung sejak Tanggal Mulai Kerja yang tercantum dalam SPMK sampai dengan Tanggal Penyerahan Pertama Pekerjaan selama{" "}
                          <span>{formData.masa_pelaksanaan_pekerjaan || "(Masa Pelaksanaan Pekerjaan)"}</span> (
                          <em>
                            <span>{formData.masa_pelaksanaan_pekerjaan_terbilang || "(Masa Pelaksanaan Pekerjaan Terbilang)"}</span>
                          </em>
                          ) hari kalender;
                        </td>
                      </tr>

                      <tr>
                        <td style={{ verticalAlign: "top", width: "15px", fontWeight: "bold" }}>(3)</td>
                        <td style={{ textAlign: "justify" }}>
                          {" "}
                          Masa Pemeliharaan ditentukan dalam Syarat-Syarat Khusus Kontrak dihitung sejak Tanggal Penyerahan Pertama Pekerjaan sampai dengan Tanggal Penyerahan Akhir Pekerjaan selama{" "}
                          <span>{formData.masa_pemeliharaan_pekerjaan || "(Masa Pemeliharaan Pekerjaan)"}</span> (
                          <em>
                            <span>{formData.masa_pemeliharaan_pekerjaan_terbilang || "(Masa Pemeliharaan Pekerjaan Terbilang)"}</span>
                          </em>
                          ) hari kalender.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="spmk-justify-text">
                  Dengan demikian, Pejabat Penandatangan Kontrak dan Penyedia telah bersepakat untuk menandatangani Kontrak ini pada tanggal tersebut di atas dan melaksanakan Kontrak sesuai dengan ketentuan peraturan perundang-undangan di
                  Republik Indonesia dan dibuat dalam 2 (dua) rangkap, masing-masing dibubuhi dengan meterai, mempunyai kekuatan hukum yang sama dan mengikat bagi para pihak, rangkap yang lain dapat diperbanyak sesuai kebutuhan tanpa
                  dibubuhi meterai.
                </div>
              </div>
              <div style={{ marginTop: "120px" }}>&nbsp;</div>
              <table style={{ width: "100%", fontFamily: '"Times New Roman", Times, serif', fontSize: "16px", color: "#000" }}>
                <tbody>
                  <tr style={{ pageBreakBefore: "always", width: "100%" }}>
                    <td style={{ textAlign: "center", verticalAlign: "top", paddingRight: "125px" }}>
                      <div>Untuk dan atas nama</div>
                      <div>
                        <em>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</em>
                      </div>
                      <div style={{ marginTop: "80px" }}>
                        <div>
                          <em>[{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}]</em>
                        </div>
                        <div>
                          <em>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</em>
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: "center", verticalAlign: "top", paddingLeft: "125px" }}>
                      <div>Untuk dan atas nama</div>
                      <div>
                        <em>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</em>
                      </div>
                      <div style={{ marginTop: "80px" }}>
                        <div>
                          <em>[{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}]</em>
                        </div>
                        <div>
                          <em>NIP. {projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</em>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
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
      const filename = "surat_perjanjian_kontrak";

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
            {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"Surat Perjanjian Kontrak"} />}
            {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"Surat Perjanjian Kontrak"} />}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Nomor Surat Berita Acara Hasil Pemilihan Nomor <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nomor_surat_hasil_pemilihan"
              className={errors.nomor_surat_hasil_pemilihan ? "input-field-form-error" : "input-field-form"}
              value={formData.nomor_surat_hasil_pemilihan}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nomor_surat_hasil_pemilihan && <span className="error-text">{errors.nomor_surat_hasil_pemilihan}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Nomor Surat Berita Acara Hasil Pemilihan Nomor <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.tanggal_nomor_surat_pemilihan}
              name="tanggal_nomor_surat_pemilihan"
              onChange={(date) => handleDateChange("tanggal_nomor_surat_pemilihan", date)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={errors.tanggal_nomor_surat_pemilihan ? "input-field-form-date-error" : "input-field-form-date"}
              dateFormat="dd/MM/yyyy"
              placeholderText="Isi bagian ini"
            />
            {errors.tanggal_nomor_surat_pemilihan && <span className="error-text">{errors.tanggal_nomor_surat_pemilihan}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Nomor Surat Keputusan Rektor <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nomor_surat_keputusan_rektor"
              className={errors.nomor_surat_keputusan_rektor ? "input-field-form-error" : "input-field-form"}
              value={formData.nomor_surat_keputusan_rektor}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nomor_surat_keputusan_rektor && <span className="error-text">{errors.nomor_surat_keputusan_rektor}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Surat Keputusan Rektor <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.tanggal_surat_keputusan_rektor}
              name="tanggal_surat_keputusan_rektor"
              onChange={(date) => handleDateChange("tanggal_surat_keputusan_rektor", date)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={errors.tanggal_surat_keputusan_rektor ? "input-field-form-date-error" : "input-field-form-date"}
              dateFormat="dd/MM/yyyy"
              placeholderText="Isi bagian ini"
            />
            {errors.tanggal_surat_keputusan_rektor && <span className="error-text">{errors.tanggal_surat_keputusan_rektor}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Rincian Surat Keputusan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="rincian_surat_keputusan"
              className={errors.rincian_surat_keputusan ? "input-field-form-error" : "input-field-form"}
              value={formData.rincian_surat_keputusan}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.rincian_surat_keputusan && <span className="error-text">{errors.rincian_surat_keputusan}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Ketentuan Persetujuan <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              type="text"
              name="ketentuan_persetujuan"
              value={formData.ketentuan_persetujuan ? formData.ketentuan_persetujuan.join("\n") : ""}
              onChange={handleChangeTextArea}
              onFocus={handleFocusTextArea}
              onBlur={handleBlurTextArea}
              className={errors.ketentuan_persetujuan ? "input-textarea-form-error" : "input-textarea-form"}
              placeholder="1"
              onKeyDown={handleKeyDownTextArea}
            />
            {errors.ketentuan_persetujuan && <span className="error-text">{errors.ketentuan_persetujuan}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Ruang Lingkup Pekerjaan <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              type="text"
              name="ruang_lingkup_pekerjaan"
              value={formData.ruang_lingkup_pekerjaan ? formData.ruang_lingkup_pekerjaan.join("\n") : ""}
              onChange={handleChangeTextArea}
              onFocus={handleFocusTextArea}
              onBlur={handleBlurTextArea}
              className={errors.ruang_lingkup_pekerjaan ? "input-textarea-form-error" : "input-textarea-form"}
              placeholder="1"
              onKeyDown={handleKeyDownTextArea}
            />
            {errors.ruang_lingkup_pekerjaan && <span className="error-text">{errors.ruang_lingkup_pekerjaan}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Harga Kuantitas Total <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="harga_kuantitas_total"
              className={errors.harga_kuantitas_total ? "input-field-form-error" : "input-field-form"}
              value={formData.harga_kuantitas_total.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.harga_kuantitas_total && <span className="error-text">{errors.harga_kuantitas_total}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Harga Kuantitas Total (Terbilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="harga_kuantitas_total_terbilang"
              className={errors.harga_kuantitas_total_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.harga_kuantitas_total_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.harga_kuantitas_total_terbilang && <span className="error-text">{errors.harga_kuantitas_total_terbilang}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Kode Akun Kegiatan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="kode_akun_kegiatan"
              className={errors.kode_akun_kegiatan ? "input-field-form-error" : "input-field-form"}
              value={formData.kode_akun_kegiatan}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.kode_akun_kegiatan && <span className="error-text">{errors.kode_akun_kegiatan}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Ketentuan Hierarki <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              type="text"
              name="ketentuan_hierarki"
              value={formData.ketentuan_hierarki ? formData.ketentuan_hierarki.join("\n") : ""}
              onChange={handleChangeTextAreaAbc}
              onFocus={handleFocusTextArea}
              onBlur={handleBlurTextArea}
              className={errors.ketentuan_hierarki ? "input-textarea-form-error" : "input-textarea-form"}
              placeholder="Isi Bagian ini"
              onKeyDown={handleKeyDownTextAreaAbc}
            />
            {errors.ketentuan_hierarki && <span className="error-text">{errors.ketentuan_hierarki}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">
              Masa Pelaksanaan Pekerjaan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="masa_pelaksanaan_pekerjaan"
              className={errors.masa_pelaksanaan_pekerjaan ? "input-field-form-error" : "input-field-form"}
              value={formData.masa_pelaksanaan_pekerjaan}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.masa_pelaksanaan_pekerjaan && <span className="error-text">{errors.masa_pelaksanaan_pekerjaan}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Masa Pelaksanaan Pekerjaan (Terbilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="masa_pelaksanaan_pekerjaan_terbilang"
              className={errors.masa_pelaksanaan_pekerjaan_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.masa_pelaksanaan_pekerjaan_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.masa_pelaksanaan_pekerjaan_terbilang && <span className="error-text">{errors.masa_pelaksanaan_pekerjaan_terbilang}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Masa Pemeliharaan Pekerjaan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="masa_pemeliharaan_pekerjaan"
              className={errors.masa_pemeliharaan_pekerjaan ? "input-field-form-error" : "input-field-form"}
              value={formData.masa_pemeliharaan_pekerjaan}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.masa_pemeliharaan_pekerjaan && <span className="error-text">{errors.masa_pemeliharaan_pekerjaan}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Masa Pemeliharaan Pekerjaan (Terbilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="masa_pemeliharaan_pekerjaan_terbilang"
              className={errors.masa_pemeliharaan_pekerjaan_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.masa_pemeliharaan_pekerjaan_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.masa_pemeliharaan_pekerjaan_terbilang && <span className="error-text">{errors.masa_pemeliharaan_pekerjaan_terbilang}</span>}
          </div>
        </div>
        {/* <SuratPerjanjianKontrakWord formData={formData} /> */}
        <ComponentWord />
        <SuratPerjanjianKontrakPreview formDataPreview={formData} dataProjectDetail={projectDetailData} />
      </div>

      <button className="button-simpan-blue" onClick={handleSubmitSuratPerjanjianKontrak}>
        Simpan
      </button>
    </>
  );
};

export default forwardRef(SuratPerjanjianKontrak);

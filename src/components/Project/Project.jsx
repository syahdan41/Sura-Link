import React, { useState, useEffect, useRef } from "react";
import NavbarWhite from "../NavbarWhite/NavbarWhite";
import TripleDot from "../../Assets/Images/tripledot.png";
import ImageBlur from "../../Assets/Images/docblur.png";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import ModalDeleteDoc from "../ModalDeleteDoc/ModalDeleteDoc";
import LogoFile from "../../Assets/Images/Files.png";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProjectForm from "../ProjectForm/ProjectForm";

import SuratPernyataan from "../TemplateSuratPernyataan/SuratPernyataan";
import RingkasanKontrak from "../TemplateRingkasanKontrak/RingkasanKontrak";

import BapTerminKe from "../TemplateBAPTerminKe/BapTerminKe";
import BapTahapKe from "../TemplateBapTahapKe/BapTahapKe";
import Kwitansi from "../TemplateKwitansi/Kwitansi";
import KwitansiTermin from "../TemplateKwitansiTermin/KwitansiTermin";
import SuratPerjanjianKontrak from "../TemplateSuratPerjanjianKontrak/SuratPerjanjianKontrak";
import SuratSPMK from "../TemplateSuratSPMK/SuratSPMK";
import BapUangMuka from "../TemplateBapUangMuka/BapUangMuka";
import BapSerahTerimaTahapKe from "../TemplateBapSerahTerimaTahapKe/BapSerahTerimaTahapKe";
import BapPemeriksaanTahap from "../TemplateBapPemeriksaanTahap/BapPemeriksaanTahap";
import BapPekerjaanPerencanaan from "../TemplateBapPekerjaanPerencanaan/BapPekerjaanPerencanaan";
import BapPekerjaanPengawasan from "../TemplateBapPekerjaanPengawasan/BapPekerjaanPengawasan";
import SyaratKhususKontrak from "../TemplateSyaratKhususKontrak/SyaratKhususKontrak";
import SuratSPPBJ from "../TemplateSuratSPPBJ/SuratSPPBJ";
import ModalDownload from "../ModalDownload/ModalDownload";

import "./Project.css";
import "./FormInput.css";

const Project = () => {
  // TO DO nomor surat BAP, Tanggal, Tanggal terbilang udh gk dari project detail lagi karena tiap termin dan tahap itu beda
  const location = useLocation();
  const projectId = location.state?.projectId;
  const suratRef = useRef();
  const [errors, setErrors] = useState({}); // State untuk error
  const [cards, setCards] = useState([]); // Menyimpan daftar card yang ditambahkan
  const [selectedCardKey, setSelectedCardKey] = useState(null); // Card yang terpilih
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectDetail, setProjectDetail] = useState({});
  const [showModalDownload, setShowModalDownload] = useState(false);
  const downloadContainerRef = useRef(null);
  const [currentFileType, setCurrentFileType] = useState(null);

  console.log("Card yang ke pilih saat ini:", selectedCardKey);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    x: 0,
    y: 0,
    card: null, // kartu yang dipilih
  });

  const documentNameMapping = {
    surat_pernyataan: "SURAT PERNYATAAN",
    berita_acara_pembayaran_termin: "BERITA ACARA PEMBAYARAN TERMIN",
    berita_acara_pembayaran_tahap: "BERITA ACARA PEMBAYARAN TAHAP",
    berita_acara_serah_terima_tahap: "BERITA ACARA SERAH TERIMA TAHAP", //need confirm ini dipake apa kaga
    ringkasan_kontrak: "RINGKASAN KONTRAK",
    kwitansi_tahap: "KWITANSI TAHAP",
    kwitansi_termin: "KWITANSI TERMIN",
    berita_acara_serah_terima_uang_muka: "BERITA ACARA SERAH TERIMA UANG MUKA",
    berita_acara_pemeriksaan_tahap_ke: "BERITA ACARA PEMERIKSAAN TAHAP",
    berita_acara_serah_terima_pekerjaan_perencanaan: "BERITA ACARA SERAH TERIMA PEKERJAAN PERENCANAAN",
    berita_acara_serah_terima_pekerjaan_pengawasan: "BERITA ACARA SERAH TERIMA PEKERJAAN PENGAWASAN",
    surat_penunjukan_penyedia_barang_jasa: "SURAT PENUNJUKAN PENYEDIA BARANG/JASA (SPPBJ)",
    surat_perintah_mulai_kerja: "SURAT PERINTAH MULAI KERJA (SPMK)",
    surat_perjanjian_kontrak: "SURAT PERJANJIAN/KONTRAK",
    syarat_syarat_khusus_kontrak: "SYARAT-SYARAT KHUSUS KONTRAK (SSKK)",

    // Tambahin mapping lain sesuai kebutuhan
  };

  const dynamicCardTypes = [
    "BERITA ACARA PEMBAYARAN TERMIN",
    "BERITA ACARA PEMBAYARAN TAHAP",
    "BERITA ACARA PEMERIKSAAN TAHAP",
    "SURAT PERNYATAAN",
    "RINGKASAN KONTRAK",
    "KWITANSI TAHAP",
    "KWITANSI TERMIN",
    "BERITA ACARA SERAH TERIMA TAHAP",
  ];

  useEffect(() => {
    if (projectId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/projects/${projectId}`);

          console.log("🚀 response.data:", response.data);
          console.log("Response project detail", response.data.project_details);

          const fetchedDocs = Array.isArray(response.data) ? response.data : response.data?.data || [];

          // SORT DULU SEBELUM MAP
          fetchedDocs.sort((a, b) => {
            const typeA = documentNameMapping[a.document_name] || "";
            const typeB = documentNameMapping[b.document_name] || "";

            if (typeA === typeB) {
              return a.id - b.id; // Kalo tipenya sama, urutkan berdasarkan id ASC
            }
            return typeA.localeCompare(typeB); // Biar stabil sorting antar tipe juga
          });

          const cardCounts = {};

          const loadedCards = fetchedDocs
            .map((doc) => {
              const type = documentNameMapping[doc.document_name];
              if (!type) return null;

              if (dynamicCardTypes.includes(type)) {
                const count = cardCounts[type] ?? 0;
                cardCounts[type] = count + 1;

                return {
                  id: doc.id,
                  type,
                  suffix: count === 0 ? null : count,
                };
              } else {
                return {
                  id: doc.id,
                  type,
                  suffix: null,
                };
              }
            })
            .filter(Boolean);

          const defaultCard = {
            id: Date.now(),
            type: "PROJECT FORM",
            suffix: null,
          };

          setProjectDetail(response.data.project_details);
          setCards([defaultCard, ...loadedCards]);
          setSelectedCardKey(`${defaultCard.type}-${defaultCard.id}`);
        } catch (error) {
          console.error("❌ Gagal fetch data project:", error);
        }
      };
      fetchData();
    } else {
      const defaultCard = {
        id: Date.now(),
        type: "PROJECT FORM",
        suffix: null,
      };

      setProjectDetail({});
      setCards([defaultCard]);
      setSelectedCardKey(`${defaultCard.type}-${defaultCard.id}`);
    }
  }, [projectId]);

  console.log("hasil project detail dari API = ", projectDetail);
  const projectNameInputParam = location.state?.projectName || projectDetail.project_name || "Nama Default";

  const formatDateToYMD = (date) => {
    const d = date && !isNaN(new Date(date)) ? new Date(date) : new Date(); // pakai tanggal sekarang kalau tidak valid
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [formDataProjectDetail, setFormDataProjectDetail] = useState({});

  useEffect(() => {
    if (projectDetail && Object.keys(projectDetail).length > 0) {
      setFormDataProjectDetail({
        nomorSuratBAP: projectDetail.nomor_surat_bap || "",
        tanggalSuratBAP: projectDetail.tanggal_surat_bap || null,
        tanggalSuratBAPTerbilang: projectDetail.tanggal_surat_bap_huruf || "",
        nomor_berita_acara_pemeriksaan_pekerjaan: projectDetail.nomor_berita_acara_pemeriksaan_pekerjaan || "",
        tanggal_berita_acara_pemeriksaan_pekerjaan: projectDetail.tanggal_berita_acara_pemeriksaan_pekerjaan || null,
        tanggal_bap_pekerjaan_terbilang: projectDetail.tanggal_berita_acara_pemeriksaan_pekerjaan_huruf || "",
        nomorSuratSPPBJ: projectDetail.nomor_surat_penunjukan_penyedia_barang_jasa_sppbj || "",
        tanggal_surat_penunjukan_SPPBJ: projectDetail.tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj || null,
        tanggal_surat_penunjukan_SPPBJ_terbilang: projectDetail.tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj_huruf || "",
        nomor_surat_perjanjian_kontrak: projectDetail.nomor_surat_perjanjian_kontrak || "",
        tanggal_surat_perjanjian_kontrak: projectDetail.tanggal_surat_perjanjian_kontrak || null,
        tanggal_surat_pernyataan: projectDetail.hari_dan_tanggal_surat_pernyataan_angka || "",
        nama_pihak_1: projectDetail.nama_pihak_1 || "",
        nip_pihak_1: projectDetail.nip_pihak_1 || "",
        jabatan_pihak_1: projectDetail.jabatan_pihak_1 || "",
        perusahaan_pihak_1: projectDetail.perusahaan_pihak_1 || "",
        alamat_pihak_1: projectDetail.alamat_pihak_1 || "",
        desc_ttd_pihak_1: projectDetail.deskripsi_ttd_pihak_1 || "",
        nama_pihak_2: projectDetail.nama_pihak_2 || "",
        alamat_pihak_2: projectDetail.alamat_pihak_2 || "",
        perusahaan_pihak_2: projectDetail.perusahaan_pihak_2 || "",
        jabatan_pihak_2: projectDetail.jabatan_pihak_2 || "",
        nama_bank_pihak_2: projectDetail.nama_bank_pihak_2 || "",
        nomor_rekening_pihak_2: projectDetail.nomor_rekening_pihak_2 || "",
        npwp_pihak_2: projectDetail.npwp_pihak_2 || "",
        desc_ttd_pihak_2: projectDetail.deskripsi_ttd_pihak_2 || "",
        nomor_akta_notaris_pihak_2: projectDetail.nomor_akta_notaris_pihak_2 || "",
        tanggal_nomor_akta_notaris: projectDetail.tanggal_nomor_akta_notaris_pihak_2 || null,
        nama_notaris_pihak_2: projectDetail.nama_notaris_pihak_2 || "",
        lokasi_pekerjaan: projectDetail.lokasi_pekerjaan || "",
        pekerjaan: projectDetail.pekerjaan || "",
        tempat_ttd: projectDetail.tempat_ttd || "",
        nominal_pembayaran: {
          raw: projectDetail.nominal_pembayaran_angka || "",
          masked: projectDetail.nominal_pembayaran_angka ? `Rp ${new Intl.NumberFormat("id-ID").format(projectDetail.nominal_pembayaran_angka)}` : "",
        },
        nominal_pembayaran_terbilang: projectDetail.nominal_pembayaran_huruf || "",
        ruang_lingkup_pekerjaan: projectDetail.ruang_lingkup_pekerjaan || "",
        denda_akibat_keterlambatan: {
          raw: projectDetail.denda_akibat_keterlambatan || "",
          masked: projectDetail.denda_akibat_keterlambatan ? `Rp ${new Intl.NumberFormat("id-ID").format(projectDetail.denda_akibat_keterlambatan)}` : "",
        },
        email_pihak_1: projectDetail.email_pihak_1 || "",
        pangkat_pihak_1: projectDetail.pangkat_golongan_ruang_pihak_1 || "",
        nomor_kontak_pihak_1: projectDetail.nomor_kontak_pihak_1 || "",
        email_pihak_2: projectDetail.email_pihak_2 || "",
        nip_pihak_2: projectDetail.nip_pihak_2 || "",
        nomor_kontak_pihak_2: projectDetail.nomor_kontak_pihak_2 || "",
      });
    }
  }, [projectDetail]);

  const handleAddCard = (cardType) => {
    let suffix = null;

    if (dynamicCardTypes.includes(cardType)) {
      const existingCount = cards.filter((card) => card.type === cardType).length;

      // ⬇️ Kalau existingCount = 0, suffix diset ke null
      suffix = existingCount === 0 ? null : existingCount;

      // Cegah duplikat
      if (cards.some((card) => card.type === cardType && card.suffix === suffix)) {
        alert("Dokumen ini sudah ada!");
        return;
      }
    } else {
      if (cards.some((card) => card.type === cardType)) {
        alert("Dokumen ini sudah ada!");
        return;
      }
    }

    const newCard = {
      id: Date.now(),
      type: cardType,
      suffix,
      isNewDoc: true,
      documentId: null,
    };

    const cardKey = `${newCard.type}-${newCard.id}`;
    setCards([...cards, newCard]);
    setSelectedCardKey(cardKey);
    setIsModalOpen(false);
  };

  const handleDeleteCard = async (card) => {
    try {
      if (card.isNewDoc) {
        // Kalau new doc, hapus dari array aja
        const confirmDelete = window.confirm("Yakin mau hapus dokumen ini?");
        if (!confirmDelete) return;

        setCards((prevCards) => prevCards.filter((c) => c.id !== card.id));
      } else {
        // Dokumen existing, perlu API call
        const findKey = Object.keys(documentNameMapping).find((key) => documentNameMapping[key] === card.type);

        if (!findKey) {
          console.error("❌ Tidak ketemu mapping buat type:", card.type);
          return;
        }

        const confirmDelete = window.confirm("Dokumen sudah tersimpan di server. Yakin mau hapus?");
        if (!confirmDelete) return;
        console.log("end point untuk delete = ", findKey);
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/delete/${findKey}?id=${card.id}`);

        setCards((prevCards) => prevCards.filter((c) => c.id !== card.id));
      }
    } catch (error) {
      console.error("❌ Gagal hapus dokumen:", error);
      alert("Gagal hapus dokumen. Coba lagi ya!");
    } finally {
      setDeleteModal((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const handleCreateProject = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/projects/create`,
        {
          project_name: projectNameInputParam || "",

          nomor_berita_acara_pemeriksaan_pekerjaan: formDataProjectDetail.nomor_berita_acara_pemeriksaan_pekerjaan || null,
          tanggal_berita_acara_pemeriksaan_pekerjaan: formatDateToYMD(formDataProjectDetail.tanggal_berita_acara_pemeriksaan_pekerjaan),
          tanggal_berita_acara_pemeriksaan_pekerjaan_huruf: formDataProjectDetail.tanggal_bap_pekerjaan_terbilang || null,
          nomor_surat_penunjukan_penyedia_barang_jasa_sppbj: formDataProjectDetail.nomorSuratSPPBJ || null,
          tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj: formatDateToYMD(formDataProjectDetail.tanggal_surat_penunjukan_SPPBJ),
          tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj_huruf: formDataProjectDetail.tanggal_surat_penunjukan_SPPBJ_terbilang || null,
          nomor_surat_perjanjian_kontrak: formDataProjectDetail.nomor_surat_perjanjian_kontrak || null,
          tanggal_surat_perjanjian_kontrak: formatDateToYMD(formDataProjectDetail.tanggal_surat_perjanjian_kontrak),

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
          tanggal_nomor_akta_notaris_pihak_2: formatDateToYMD(formDataProjectDetail.tanggal_nomor_akta_notaris),
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
      const currentTimestamp = new Date().toISOString();

      const responseHistory = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
        {
          table_name: "projects",
          record_id: 1,
          action_type: "CREATE",
          timestamp: currentTimestamp,
          project_id: response.data.id,
          project_name: projectNameInputParam || "",
          description: "Create project details",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Berhasil:", responseHistory.data);
      alert("✅ Project berhasil dibuat");
    } catch (error) {
      console.error("❌ Gagal:", error);
      console.log("📦 Detail error dari API:", error.response?.data);
      alert("❌ Project Gagal dibuat");
    }
  };

  const handleUpdateProject = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/projects/${projectId}`,
        {
          project_name: projectNameInputParam || null,

          nomor_berita_acara_pemeriksaan_pekerjaan: formDataProjectDetail.nomor_berita_acara_pemeriksaan_pekerjaan || null,
          tanggal_berita_acara_pemeriksaan_pekerjaan: formatDateToYMD(formDataProjectDetail.tanggal_berita_acara_pemeriksaan_pekerjaan),
          tanggal_berita_acara_pemeriksaan_pekerjaan_huruf: formDataProjectDetail.tanggal_bap_pekerjaan_terbilang || null,
          nomor_surat_penunjukan_penyedia_barang_jasa_sppbj: formDataProjectDetail.nomorSuratSPPBJ || null,
          tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj: formatDateToYMD(formDataProjectDetail.tanggal_surat_penunjukan_SPPBJ),
          tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj_huruf: formDataProjectDetail.tanggal_surat_penunjukan_SPPBJ_terbilang || null,
          nomor_surat_perjanjian_kontrak: formDataProjectDetail.nomor_surat_perjanjian_kontrak || null,
          tanggal_surat_perjanjian_kontrak: formatDateToYMD(formDataProjectDetail.tanggal_surat_perjanjian_kontrak),

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
          tanggal_nomor_akta_notaris_pihak_2: formatDateToYMD(formDataProjectDetail.tanggal_nomor_akta_notaris),
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

      console.log("✅ Berhasil Update:", response.data);
      const currentTimestamp = new Date().toISOString();

      const responseHistory = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
        {
          table_name: "projects",
          record_id: 1,
          action_type: "CREATE",
          timestamp: currentTimestamp,
          project_id: response.data.id,
          project_name: projectNameInputParam || "",
          description: "Create project details",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Berhasil:", responseHistory.data);
      alert("✅ Project berhasil dibuat");
    } catch (error) {
      console.error("❌ Gagal Update:", error);
      console.log("📦 Detail error dari API:", error.response?.data);
      alert("❌ Project Gagal dibuat");
    }
  };

  const handleNewFileClick = () => {
    let newErrors = {};

    // Cek semua field, jika kosong beri error message
    // mandatoryFieldsProjectDetail.forEach((key) => {
    //   if (!formDataProjectDetail[key]) {
    //     newErrors[key] = "Field harus diisi";
    //   }
    // });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (!projectId) {
      // id kosong (null, undefined, atau 0, atau "")
      handleCreateProject();
      setIsModalOpen(true);
    }
    if (projectId) {
      // id ADA → bisa jalanin update, fetch by id, dll
      handleUpdateProject();
      setIsModalOpen(true);
    }
  };
  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    setIsModalOpen(true); // Buka modal kedua
  };

  const handleUpdateDocumentId = (newDocId) => {
    setSelectedCardKey((prev) => ({
      ...prev,
      documentId: newDocId,
      isNewDoc: false,
    }));
  };

  const handleDotClick = (e, card) => {
    e.stopPropagation(); // jangan trigger onClick parent

    // posisi ikon di viewport
    const { right, top } = e.currentTarget.getBoundingClientRect();

    setDeleteModal({
      isOpen: true,
      x: right + 8,
      y: top,
      card, // ← simpan data kartu apa adanya
    });
  };

  // mapping component untuk modals pop up
  const componentMapping = {
    "SURAT PERNYATAAN": (card, ref) => (
      <SuratPernyataan ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} projectDetailData={projectDetail} onCreated={handleUpdateDocumentId} currFileType={currentFileType} projectName={projectNameInputParam} />
    ),
    "RINGKASAN KONTRAK": (card, ref) => <RingkasanKontrak ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} projectDetailData={projectDetail} onCreated={handleUpdateDocumentId} currFileType={currentFileType} />,
    "SURAT PENUNJUKAN PENYEDIA BARANG/JASA (SPPBJ)": (card, ref) => (
      <SuratSPPBJ ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} projectDetailData={projectDetail} onCreated={handleUpdateDocumentId} currFileType={currentFileType} />
    ),
    "BERITA ACARA PEMBAYARAN TERMIN": (card, ref) => (
      <BapTerminKe
        ref={ref}
        documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id}
        prevDocumentId={finalSelectedCard?.previousDocumentIds || []}
        suffix={card.suffix}
        projectDetailData={projectDetail}
        onCreated={handleUpdateDocumentId}
        currFileType={currentFileType}
      />
    ),
    "BERITA ACARA PEMBAYARAN TAHAP": (card, ref) => (
      <BapTahapKe ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} projectDetailData={projectDetail} onCreated={handleUpdateDocumentId} currFileType={currentFileType} />
    ),
    "KWITANSI TAHAP": (card, ref) => <Kwitansi ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} projectDetailData={projectDetail} onCreated={handleUpdateDocumentId} currFileType={currentFileType} />,
    "KWITANSI TERMIN": (card, ref) => <KwitansiTermin ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} projectDetailData={projectDetail} onCreated={handleUpdateDocumentId} currFileType={currentFileType} />,
    "SURAT PERINTAH MULAI KERJA (SPMK)": (card, ref) => (
      <SuratSPMK ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} projectDetailData={projectDetail} onCreated={handleUpdateDocumentId} currFileType={currentFileType} />
    ),
    "SURAT PERJANJIAN/KONTRAK": (card, ref) => (
      <SuratPerjanjianKontrak ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} projectDetailData={projectDetail} onCreated={handleUpdateDocumentId} currFileType={currentFileType} />
    ),
    "BERITA ACARA SERAH TERIMA UANG MUKA": (card, ref) => (
      <BapUangMuka ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} projectDetailData={projectDetail} onCreated={handleUpdateDocumentId} currFileType={currentFileType} />
    ),
    "BERITA ACARA SERAH TERIMA TAHAP": (card, ref) => (
      <BapSerahTerimaTahapKe ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} onCreated={handleUpdateDocumentId} currFileType={currentFileType} projectDetailData={projectDetail} />
    ),
    "BERITA ACARA PEMERIKSAAN TAHAP": (card, ref) => (
      <BapPemeriksaanTahap ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} projectDetailData={projectDetail} onCreated={handleUpdateDocumentId} currFileType={currentFileType} />
    ),
    "BERITA ACARA SERAH TERIMA PEKERJAAN PERENCANAAN": (card, ref) => (
      <BapPekerjaanPerencanaan ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} projectDetailData={projectDetail} onCreated={handleUpdateDocumentId} currFileType={currentFileType} />
    ),
    "BERITA ACARA SERAH TERIMA PEKERJAAN PENGAWASAN": (card, ref) => (
      <BapPekerjaanPengawasan ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} projectDetailData={projectDetail} onCreated={handleUpdateDocumentId} currFileType={currentFileType} />
    ),
    "SYARAT-SYARAT KHUSUS KONTRAK (SSKK)": (card, ref) => (
      <SyaratKhususKontrak ref={ref} documentId={card?.isNewDoc ? null : card?.documentId ?? card?.id} projectDetailData={projectDetail} onCreated={handleUpdateDocumentId} currFileType={currentFileType} />
    ),
    "PROJECT FORM": () => <ProjectForm formDataProjectDetail={formDataProjectDetail} setFormDataProjectDetail={setFormDataProjectDetail} errors={errors} setErrors={setErrors} ProjectName={projectNameInputParam} projectId={projectId} />,
  };

  const selectedCard = cards.find((card) => `${card.type}-${card.id}` === selectedCardKey);

  const multiInstanceTypes = [
    "BERITA ACARA PEMBAYARAN TERMIN",
    "BERITA ACARA PEMBAYARAN TAHAP",
    "BERITA ACARA SERAH TERIMA TAHAP",
    "BERITA ACARA PEMERIKSAAN TAHAP",
    "KWITANSI TAHAP",
    "KWITANSI TERMIN",
    "SURAT PERNYATAAN",
    "RINGKASAN KONTRAK",
  ];

  const matchingType = Object.keys(componentMapping).find((key) => selectedCard?.type?.startsWith(key));

  const matchingMultiInstanceType = multiInstanceTypes.find((type) => selectedCard?.type?.startsWith(type));

  const isMultiInstance = Boolean(matchingMultiInstanceType);

  const previousDocumentIds = isMultiInstance ? cards.filter((card) => card.type?.startsWith(matchingMultiInstanceType) && Number.isInteger(card.suffix) && card.suffix < selectedCard.suffix).map((card) => card.id) : [];

  const finalSelectedCard = {
    ...selectedCard,
    previousDocumentIds,
  };

  const handleDownload = async (fileType) => {
    setCurrentFileType(fileType);
    setTimeout(() => {
      if (suratRef.current) {
        suratRef.current.handleDownload(fileType);
        setShowModalDownload(false);
      } else {
        alert("Komponen dokumen belum siap.");
      }
    }, 100); // kasih delay kecil
  };

  return (
    <>
      <div className="position-absolute">
        <NavbarWhite
          onDownloadClick={() => setShowModalDownload(true)}
          isForm={true}
          documentName={selectedCard?.suffix != null && selectedCard?.suffix !== 0 && selectedCard?.suffix !== "0" ? `${selectedCard.type} ${selectedCard.suffix}` : selectedCard?.type}
        />
        <div className="bluebar-tittle">
          {selectedCard && (selectedCard.suffix != null && selectedCard.suffix !== 0 && selectedCard.suffix !== "0" ? `${selectedCard.type} ${selectedCard.suffix}` : selectedCard.type)}
          <span> </span>
          PROYEK {projectNameInputParam}
        </div>

        {isModalOpen && <ModalTemplate onClose={() => setIsModalOpen(false)} onSelectCard={handleAddCard} />}
        {isSuccessModalOpen && <SuccessModal onClose={handleSuccessModalClose} docName={"Project Form"} />}
        {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"Project Form"} />}
        {showModalDownload && (
          <ModalDownload
            onClose={() => setShowModalDownload(false)}
            onDownload={handleDownload}
            documentName={selectedCard?.suffix != null && selectedCard?.suffix !== 0 && selectedCard?.suffix !== "0" ? `${selectedCard.type} ${selectedCard.suffix}` : selectedCard?.type}
          />
        )}
        <div ref={downloadContainerRef} />
      </div>
      <div className="content-adjuster">
        <div className="side-menu">
          {cards.map((card) => {
            const cardKey = `${card.type}-${card.id}`;
            const title = card.suffix != null ? `${card.type}${card.type.includes("KE-") ? card.suffix : ` ${card.suffix}`}` : card.type;

            return (
              <div key={cardKey} className={`card-project ${selectedCardKey === cardKey ? "selectedCard" : ""}`} onClick={() => setSelectedCardKey(cardKey)}>
                <img src={ImageBlur} alt="" />
                <div className="info-box-project">
                  <div className="text-and-option-project">
                    <p>{title}</p>

                    {/* Hanya render triple dot kalau bukan PROJECT FORM */}
                    {title !== "PROJECT FORM" && <img src={TripleDot} alt="opsi" onClick={(e) => handleDotClick(e, card)} />}
                  </div>
                </div>
              </div>
            );
          })}
          {/* {isModalDeleteOpen && <ModalDeleteDoc onClose={() => setIsModalDeleteOpen(false)} />} */}
          <ModalDeleteDoc
            card={deleteModal.card}
            isOpen={deleteModal.isOpen}
            onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
            onDelete={handleDeleteCard}
            style={{
              position: "fixed",
              top: deleteModal.y,
              left: deleteModal.x,
            }}
          />
          <div className="card-style-dashed-project">
            <img src={LogoFile} alt="project-icon" />
            <div className="button-style-project" onClick={handleNewFileClick}>
              NEW FILE
            </div>
          </div>
        </div>

        <div className="flex-column">
          <div>{matchingType && componentMapping[matchingType] ? componentMapping[matchingType](finalSelectedCard, suratRef) : null}</div>
        </div>
      </div>
    </>
  );
};

export default Project;

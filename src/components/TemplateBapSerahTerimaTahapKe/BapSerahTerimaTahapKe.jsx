import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import DatePicker from "react-datepicker";
import BapSerahTerimaTahapWord from "./BapSerahTerimaTahapKeWord";
import BapSerahTerimaTahapKePreview from "./BapSerahTerimaTahapKePreview";
import addButton from "../../Assets/Images/add_button.png";
import removeButton from "../../Assets/Images/remove_button.png";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import axios from "axios";
import { parse, format, isValid } from "date-fns";
import Spinner from "../Spinner/spinner";
import html2pdf from "html2pdf.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import documentStyleMapping from "../../documentStyles";

import "react-datepicker/dist/react-datepicker.css";

const BapSerahTerimaTahapKe = ({ projectDetailData, documentId, currFileType, projectName }, ref) => {
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [inputFieldsLampiran, setInputFieldsLampiran] = useState([{ uraian: "", satuan: "", jumlah: "", keterangan: "" }]);

  const [formData, setFormData] = useState({
    tahap_ke: "",
    tahap_ke_terbilang: "",
    nomor_bap_serahterima: "",
    tanggal_bap_serahterima: null,
    tanggal_bap_serahterima_terbilang: "",
    untuk_bulan: "",
    persentase_pekerjaan: "",
    nilai_kontrak: { raw: "", masked: "" },
    nilai_kontrak_terbilang: "",
    nomor_surat_DIPA: "",
    tanggal_surat_DIPA: null,
    nilai_pembayaran: { raw: "", masked: "" },
    nilai_pembayaran_terbilang: "",
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
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/berita_acara_serah_terima_tahap?id=${documentId}`);
          const rawData = response.data;

          setFormData({
            tahap_ke: rawData.tahap_ke || "",
            tahap_ke_terbilang: rawData.tahap_ke_terbilang || "",
            nomor_bap_serahterima: rawData.nomor_bap_serahterima || "",
            tanggal_bap_serahterima: parseDateString(rawData.tanggal_bap_serahterima) || "",
            tanggal_bap_serahterima_terbilang: rawData.tanggal_bap_serahterima_terbilang || "",
            untuk_bulan: rawData.untuk_bulan || "",
            persentase_pekerjaan: rawData.persentase_pekerjaan || "",
            nilai_kontrak: {
              raw: parseInt(rawData.nilai_kontrak, 10) || 0 || "", // nanti ganti nominal pembayaran
              masked: parseInt(rawData.nilai_kontrak, 10) || 0 ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nilai_kontrak)}` : "",
            },
            nilai_kontrak_terbilang: rawData.nilai_kontrak_terbilang || "",
            nomor_surat_DIPA: rawData.nomor_surat_dipa || "",
            tanggal_surat_DIPA: parseDateString(rawData.tanggal_surat_dipa) || null,
            nilai_pembayaran: {
              raw: parseInt(rawData.nilai_pembayaran, 10) || 0 || "", // nanti ganti nominal pembayaran
              masked: parseInt(rawData.nilai_pembayaran, 10) || 0 ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nilai_pembayaran)}` : "",
            },
            nilai_pembayaran_terbilang: rawData.nilai_pembayaran_terbilang || "",
          });

          const uraianList = rawData.uraian_pekerjaan ?? [];
          const satuanList = rawData.satuan_ukuran ?? [];
          const jumlahList = rawData.jumlah ?? [];
          const keteranganList = rawData.keterangan ?? [];

          const maxLengthInputLampiran = Math.max(uraianList.length, satuanList.length, jumlahList.length, keteranganList.length);

          const initialDataLampiran = Array.from({ length: maxLengthInputLampiran }).map((_, index) => ({
            uraian: uraianList[index] ?? "",
            satuan: satuanList[index] ?? "",
            jumlah: jumlahList[index] ?? "",
            keterangan: keteranganList[index] ?? "",
          }));

          setInputFieldsLampiran(initialDataLampiran);
        } else {
          setFormData({
            tahap_ke: "",
            tahap_ke_terbilang: "",
            nomor_bap_serahterima: "",
            tanggal_bap_serahterima: null,
            tanggal_bap_serahterima_terbilang: "",
            untuk_bulan: "",
            persentase_pekerjaan: "",
            nilai_kontrak: { raw: "", masked: "" },
            nilai_kontrak_terbilang: "",
            nomor_surat_DIPA: "",
            tanggal_surat_DIPA: null,
            nilai_pembayaran: { raw: "", masked: "" },
            nilai_pembayaran_terbilang: "",
          });
          setInputFieldsLampiran([{ uraian: "", satuan: "", jumlah: "", keterangan: "" }]);
        }
      } catch (error) {
        console.error("❌ Error fetching BAP Serah terima Tahap:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [documentId]);

  // Handle perubahan input untuk lampiran
  const handleChangeLampiran = (index, e) => {
    const { name, value } = e.target;
    const updatedFields = [...inputFieldsLampiran];

    updatedFields[index][name] = value;
    setInputFieldsLampiran(updatedFields);

    // Hapus error saat user mulai ngetik
    setErrors((prev) => ({
      ...prev,
      [`${name}_${index}`]: "",
    }));
  };

  // Handle kehilangan fokus (onBlur)
  const handleBlurLampiran = (index, e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [`${name}_${index}`]: "Field ini harus diisi!",
      }));
    }
  };

  // Handle saat user mulai input (onFocus)
  const handleFocusLampiran = (index, e) => {
    setErrors((prev) => ({
      ...prev,
      [`${e.target.name}_${index}`]: "",
    }));
  };

  const handleAddFieldsLampiran = () => {
    setInputFieldsLampiran([...inputFieldsLampiran, { uraian: "", satuan: "", jumlah: "", keterangan: "" }]); // Tambahkan satu set input baru
  };

  const handleRemoveFieldsLampiran = () => {
    setInputFieldsLampiran((prevFields) => prevFields.slice(0, -1)); // Hapus elemen terakhir
  };

  // validasi input form utama

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nilai_kontrak" || name === "nilai_pembayaran") {
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

  const handleSubmitBAPSerahTerimaTahap = async () => {
    let newErrors = {};
    let isValid = true;

    // Validasi untuk formData biasa
    Object.keys(formData).forEach((key) => {
      let value = formData[key]?.raw ?? formData[key] ?? "";

      if (value instanceof Date) {
        value = value.toISOString();
      }

      if (typeof value === "string" && !value.trim()) {
        newErrors[key] = "Field ini harus diisi!";
        isValid = false;
      }
    });

    // Validasi untuk inputFields yang punya index
    inputFieldsLampiran.forEach((field, index) => {
      Object.keys(field).forEach((key) => {
        let value = field[key];

        if (typeof value === "string" && !value.trim()) {
          newErrors[`${key}_${index}`] = "Field ini harus diisi!";
          isValid = false;
        }
      });
    });

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    if (documentId) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/put/berita_acara_serah_terima_tahap?id=${documentId}`,
          {
            project_id: projectDetailData.id,
            tahap_ke: formData.tahap_ke,
            tahap_ke_terbilang: formData.tahap_ke_terbilang,
            nomor_bap_serahterima: formData.nomor_bap_serahterima,
            tanggal_bap_serahterima: formData.tanggal_bap_serahterima ? format(formData.tanggal_bap_serahterima, "yyyy-MM-dd") : null,
            tanggal_bap_serahterima_terbilang: formData.tanggal_bap_serahterima_terbilang,
            untuk_bulan: formData.untuk_bulan,
            persentase_pekerjaan: formData.persentase_pekerjaan,
            nilai_kontrak: parseInt(formData.nilai_kontrak.raw, 10) || 0,
            nilai_kontrak_terbilang: formData.nilai_kontrak_terbilang,
            nomor_surat_dipa: formData.nomor_surat_DIPA,
            tanggal_surat_dipa: formData.tanggal_surat_DIPA ? format(formData.tanggal_surat_DIPA, "yyyy-MM-dd") : null,
            nilai_pembayaran: parseInt(formData.nilai_pembayaran.raw, 10) || 0,
            nilai_pembayaran_terbilang: formData.nilai_pembayaran_terbilang,
            uraian_pekerjaan: inputFieldsLampiran.map((field) => field.uraian).filter((uraian) => uraian.trim() !== ""),
            satuan_ukuran: inputFieldsLampiran.map((field) => field.satuan).filter((satuan) => satuan.trim() !== ""),
            jumlah: inputFieldsLampiran.map((field) => field.jumlah),
            keterangan: inputFieldsLampiran.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
          },

          { headers: { "Content-Type": "application/json" } }
        );
        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "berita_acara_serah_terima_tahap",
            record_id: 1,
            action_type: "UPDATE",
            timestamp: currentTimestamp,
            project_id: projectDetailData.id,
            project_name: projectName || "",
            description: `Pembaharuan Detil Surat Berita Acara Serah Terima Tahap Ke ${formData.tahap_ke}`,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("✅ Berhasil:", responseHistory.data);

        setLoading(false);
        console.log("✅ BAP Pemeriksaan tahap berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        setLoading(false);
        console.error("❌ Gagal membuat BAP Pemeriksaan tahap:", error);
        console.error(error.response?.data);
        setIsFailedModalOpen(true);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/berita_acara_serah_terima_tahap`,
          {
            project_id: projectDetailData.id,
            tahap_ke: formData.tahap_ke,
            tahap_ke_terbilang: formData.tahap_ke_terbilang,
            nomor_bap_serahterima: formData.nomor_bap_serahterima,
            tanggal_bap_serahterima: formData.tanggal_bap_serahterima ? format(formData.tanggal_bap_serahterima, "yyyy-MM-dd") : null,
            tanggal_bap_serahterima_terbilang: formData.tanggal_bap_serahterima_terbilang,
            untuk_bulan: formData.untuk_bulan,
            persentase_pekerjaan: formData.persentase_pekerjaan,
            nilai_kontrak: parseInt(formData.nilai_kontrak.raw, 10) || 0,
            nilai_kontrak_terbilang: formData.nilai_kontrak_terbilang,
            nomor_surat_dipa: formData.nomor_surat_DIPA,
            tanggal_surat_dipa: formData.tanggal_surat_DIPA ? format(formData.tanggal_surat_DIPA, "yyyy-MM-dd") : null,
            nilai_pembayaran: parseInt(formData.nilai_pembayaran.raw, 10) || 0,
            nilai_pembayaran_terbilang: formData.nilai_pembayaran_terbilang,
            uraian_pekerjaan: inputFieldsLampiran.map((field) => field.uraian).filter((uraian) => uraian.trim() !== ""),
            satuan_ukuran: inputFieldsLampiran.map((field) => field.satuan).filter((satuan) => satuan.trim() !== ""),
            jumlah: inputFieldsLampiran.map((field) => field.jumlah),
            keterangan: inputFieldsLampiran.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
          },
          { headers: { "Content-Type": "application/json" } }
        );
        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "berita_acara_serah_terima_tahap",
            record_id: 1,
            action_type: "CREATE",
            timestamp: currentTimestamp,
            project_id: response.data.id,
            project_name: projectName || "",
            description: "Pembuatan Surat Berita Acara Serah Terima Tahap",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("✅ Berhasil:", responseHistory.data);
        setLoading(false);
        console.log("✅ BAP Serah terima tahap:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        setLoading(false);
        console.error("❌ Gagal create BAP Serah terima tahap:", error);
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
          {currFileType !== "word" && (
            <>
              <div>
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
                              BERITA ACARA SERAH TERIMA Tahap Ke-
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
                                <span>{formData.nomor_bap_serahterima || "(Nomor Surat BAP)"}</span>
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
                                  {(formData.tanggal_bap_serahterima &&
                                    new Date(formData.tanggal_bap_serahterima).toLocaleDateString("id-ID", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })) ||
                                    "(Tanggal BAP Serah Terima)"}
                                </span>
                              </span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="first-paragraph-bap">
                  Pada hari ini, <span>{formData.tanggal_bap_serahterima_terbilang || "(Tanggal BAP Serah Terima Terbilang)"}</span> ({" "}
                  <span>
                    {(formData.tanggal_bap_serahterima &&
                      new Date(formData.tanggal_bap_serahterima)
                        .toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .replace(/\//g, "-")) ||
                      "(Tanggal Surat BAP Serah terima)"}
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
                <div className="last-paragraph-bap-serahterima">
                  Berdasarkan Berita Acara Pemeriksaan Nomor : <span>{projectDetailData.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan)"} </span>
                  tanggal{" "}
                  <span>
                    {(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan &&
                      new Date(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })) ||
                      "(Tanggal BAP Pemeriksaan)"}
                  </span>{" "}
                  Setuju dan sepakat untuk melakukan Serah Terima Pekerjaan Tahap Ke-<span>{formData.tahap_ke || "(Tahap Ke)"}</span> (<span>{formData.tahap_ke_terbilang || "(Tahap Ke terbilang)"}</span>) untuk bulan{" "}
                  <span>{formData.untuk_bulan || "(Bulan)"}</span> dengan ketentuan sebagai berikut:
                </div>

                <div className="bast-serah-terima-container">
                  <div className="bast-serah-terima-section">
                    <p className="bast-serah-terima-paragraph">1. PIHAK KEDUA menyerahkan kepada PIHAK KESATU dan PIHAK KESATU menyatakan menerima hasil pelaksanaan pekerjaan sebagai berikut:</p>
                    <div className="bast-serah-terima-item">
                      <span className="bast-serah-terima-label">a. Pekerjaan</span>
                      <span className="bast-serah-terima-separator">:</span>
                      <span className="bast-serah-terima-value">
                        <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                      </span>
                    </div>
                    <div className="bast-serah-terima-item">
                      <span className="bast-serah-terima-label">b. Nama Penyedia/Perusahaan</span>
                      <span className="bast-serah-terima-separator">:</span>
                      <span className="bast-serah-terima-value">
                        <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                      </span>
                    </div>
                    <div className="bast-serah-terima-item">
                      <span className="bast-serah-terima-label">c. Surat Perjanjian/Kontrak</span>
                      <span className="bast-serah-terima-separator">:</span>
                      <span className="bast-serah-terima-value">
                        <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>
                      </span>
                    </div>
                    <div className="bast-serah-terima-item">
                      <span className="bast-serah-terima-label">d. Nilai Kontrak</span>
                      <span className="bast-serah-terima-separator">:</span>
                      <span className="bast-serah-terima-value">
                        <span>{formData.nilai_kontrak.masked || "(Nominal Nilai Kontrak)"}</span>
                      </span>
                    </div>
                    <div className="bast-serah-terima-item">
                      <span className="bast-serah-terima-label"></span>
                      <span className="bast-serah-terima-label-terbilang">
                        <span>{formData.nilai_kontrak_terbilang || "(Nominal Nilai Kontrak Terbilang)"}</span>.
                      </span>
                    </div>
                    <div className="bast-serah-terima-item">
                      <span className="bast-serah-terima-label">e. Sumber Dana</span>
                      <span className="bast-serah-terima-separator">:</span>
                      <span className="bast-serah-terima-value">
                        <span>{formData.nomor_surat_DIPA || "(Nomor Surat DIPA)"}</span>, tanggal{" "}
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
                  </div>

                  <div className="bast-serah-terima-section">
                    <p className="bast-serah-terima-paragraph">Hasil Pekerjaan tersebut adalah sebagai berikut:</p>
                    <div className="bast-serah-terima-item">
                      <div className="bast-serah-terima-label-hasil-pekerjaan">a.</div> Pekerjaan tersebut telah mencapai <span> {formData.persentase_pekerjaan || "(Persentase)"}</span>% dari seluruh pekerjaan (rincian terlampir).
                    </div>
                    <div className="bast-serah-terima-item">
                      <div className="bast-serah-terima-label-hasil-pekerjaan">b.</div> Pekerjaan <span> {projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"} </span> dalam kondisi Baik dan Lancar.
                    </div>
                  </div>
                  <div className="last-paragraph-bap-serahterima">
                    Dengan ditanda tanganinya Berita Acara Serah Terima Hasil Pekerjaan ini, PIHAK KEDUA berhak menerima pembayaran pekerjaan Tahap Ke-<span>{formData.tahap_ke || "(Tahap Ke)"}</span> (
                    <span>{formData.tahap_ke_terbilang || "(Tahap ke terbilang)"}</span>) untuk bulan <span>{formData.untuk_bulan || "(Bulan)"}</span> Sebesar <span>{formData.nilai_pembayaran.masked || "(Nominal Pembayaran)"}</span> ({" "}
                    <span>{formData.nilai_pembayaran_terbilang || "(Nominal Pembayaran terbilang)"}</span> )
                  </div>
                  <div className="last-paragraph-bap-serahterima">
                    Demikian Berita Acara Serah Terima Hasil Pekerjaan ini dibuat dan ditanda tangani atas kedua belah pihak pada tanggal tersebut diatas dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.
                  </div>
                </div>

                <div className="ttd-bap-layout-serahterima">
                  <div className="ttd-pihak-kesatu-tahap-serahterima">
                    <div className="ttd-pihak-kesatu-bold-serahterima">PIHAK KESATU</div>
                    <div className="ttd-pihak-kesatu-light-serahterima">Yang Menerima</div>
                    <div className="ttd-pihak-kesatu-light-serahterima">
                      <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                    </div>
                    <div className="ttd-pihak-kesatu-light-serahterima">Universitas Bengkulu</div>

                    <div className="nip-bap-layout-pihak1">
                      <div className="ttd-pihak-kedua-tahap-serahterima">
                        <div className="nip-bap-name-tahap-serahterima">
                          <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                        </div>
                        <div className="nip-bap-nip-tahap-serahterima">
                          NIP. <span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ttd-pihak-kedua-tahap-serahterima">
                    <div className="ttd-pihak-kedua-bold">PIHAK KEDUA</div>
                    <div className="ttd-pihak-kedua-light-serahterima">Yang Menyerahkan Penyedia</div>
                    <div className="ttd-pihak-kedua-light">
                      <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan/Instansi Pihak 2)"}</span>
                    </div>

                    <div className="nip-bap-layout-pihak2">
                      <div className="ttd-pihak-kedua-tahap">
                        <div className="nip-bap-name-tahap">
                          <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                        </div>
                        <div className="nip-bap-nip-tahap-serahterima">
                          <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ pageBreakBefore: "always" }}>
                <div class="lampiran-container">
                  <div className="lampiran-header-tittle-layout">
                    <div className="lampiran-header-tittle-text">
                      Lampiran Berita Acara Serah Terima Tahap Ke-{formData.tahap_ke || "(Tahap)"} ({formData.tahap_ke_terbilang || "(Terbilang)"}) untuk bulan {formData.untuk_bulan || "(Bulan)"} Hasil Pekerjaan{" "}
                      {projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}{" "}
                    </div>
                  </div>
                  <div className="lampiran-separator-bar"></div>
                  <div className="table-container">
                    <table className="table-bast-serah-terima">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Uraian Pekerjaan</th>
                          <th>Satuan Ukuran</th>
                          <th>Jumlah</th>
                          <th>Keterangan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inputFieldsLampiran.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.uraian || "(Uraian)"}</td>
                            <td>{item.satuan || "(Satuan)"}</td>
                            <td>{item.jumlah || "(Jumlah)"}</td>
                            <td>{item.keterangan || "(Keterangan)"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="ttd-bap-layout-lampiran">
                    <div className="ttd-pihak-kesatu-tahap-serahterima">
                      <div className="ttd-pihak-kesatu-bold-serahterima">PIHAK KESATU</div>
                      <div className="ttd-pihak-kesatu-light-serahterima">Yang Menerima</div>
                      <div className="ttd-pihak-kesatu-light-serahterima">
                        <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 1)"}</span>
                      </div>
                      <div className="ttd-pihak-kesatu-light-serahterima">Universitas Bengkulu</div>

                      <div className="nip-bap-layout-pihak1">
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
                    <div className="ttd-pihak-kedua-tahap-serahterima">
                      <div className="ttd-pihak-kedua-bold">PIHAK KEDUA</div>
                      <div className="ttd-pihak-kedua-light-serahterima">Yang Menyerahkan Penyedia</div>
                      <div className="ttd-pihak-kedua-light">
                        <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan/Instansi Pihak 2)"}</span>
                      </div>

                      <div className="nip-bap-layout-pihak2">
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
                </div>
              </div>
            </>
          )}

          {currFileType === "word" && (
            <>
              <div>
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
                              BERITA ACARA
                              <br />
                              PEMERIKSAAN TAHAP KE- {formData.tahap_ke || "(Tahap)"}(<span>{formData.tahap_ke_terbilang || "(Terbilang)"}</span>)
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

                <div className="first-paragraph-bap">
                  Pada hari ini, <span>{formData.tanggal_bap_serahterima_terbilang || "(Tanggal BAP Serah Terima Terbilang)"}</span> ({" "}
                  <span>
                    {(formData.tanggal_bap_serahterima &&
                      new Date(formData.tanggal_bap_serahterima)
                        .toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .replace(/\//g, "-")) ||
                      "(Tanggal Surat BAP Serah terima)"}
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
                <div className="last-paragraph-bap-serahterima">
                  Berdasarkan Berita Acara Pemeriksaan Nomor : <span>{projectDetailData.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan)"} </span>
                  tanggal{" "}
                  <span>
                    {(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan &&
                      new Date(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })) ||
                      "(Tanggal BAP Pemeriksaan)"}
                  </span>{" "}
                  Setuju dan sepakat untuk melakukan Serah Terima Pekerjaan Tahap Ke-<span>{formData.tahap_ke || "(Tahap Ke)"}</span> (<span>{formData.tahap_ke_terbilang || "(Tahap Ke terbilang)"}</span>) untuk bulan{" "}
                  <span>{formData.untuk_bulan || "(Bulan)"}</span> dengan ketentuan sebagai berikut:
                </div>

                <div className="bast-serah-terima-container">
                  <div className="bast-serah-terima-section" style={{ fontFamily: '"Times New Roman", serif', fontSize: "16px" }}>
                    <p className="bast-serah-terima-paragraph">1. PIHAK KEDUA menyerahkan kepada PIHAK KESATU dan PIHAK KESATU menyatakan menerima hasil pelaksanaan pekerjaan sebagai berikut:</p>

                    {/* a */}
                    <table className="bast-serah-terima-table" style={{ borderCollapse: "collapse", width: "100%", fontSize: "16px", fontFamily: '"Times New Roman", serif' }}>
                      <tbody>
                        <tr>
                          <td style={{ verticalAlign: "top", width: "30%" }}>a. Pekerjaan</td>
                          <td style={{ verticalAlign: "top", width: "3%" }}>:</td>
                          <td>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</td>
                        </tr>
                        <tr>
                          <td>b. Nama Penyedia/Perusahaan</td>
                          <td>:</td>
                          <td>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</td>
                        </tr>
                        <tr>
                          <td>c. Surat Perjanjian/Kontrak</td>
                          <td>:</td>
                          <td>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</td>
                        </tr>
                        <tr>
                          <td>d. Nilai Kontrak</td>
                          <td>:</td>
                          <td>{formData.nilai_kontrak.masked || "(Nominal Nilai Kontrak)"}</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td style={{ fontStyle: "italic", fontWeight: "bold" }}>{formData.nilai_kontrak_terbilang || "(Nominal Nilai Kontrak Terbilang)"}.</td>
                        </tr>
                        <tr>
                          <td>e. Sumber Dana</td>
                          <td>:</td>
                          <td>
                            {formData.nomor_surat_DIPA || "(Nomor Surat DIPA)"}, tanggal{" "}
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
                  </div>

                  <div className="bast-serah-terima-section">
                    <p className="bast-serah-terima-paragraph">Hasil Pekerjaan tersebut adalah sebagai berikut:</p>
                    <table style={{ width: "100%", fontSize: "16px", fontFamily: '"Times New Roman", Times, serif' }}>
                      <tbody>
                        <tr>
                          <td style={{ verticalAlign: "top", width: "15px" }}>a. </td>
                          <td style={{ textAlign: "justify" }}>
                            Pekerjaan tersebut telah mencapai <span> {formData.persentase_pekerjaan || "(Persentase)"}</span>% dari seluruh pekerjaan (rincian terlampir).
                          </td>
                        </tr>

                        <tr>
                          <td style={{ verticalAlign: "top", width: "15px" }}>b.</td>
                          <td style={{ textAlign: "justify" }}>
                            Pekerjaan <span> {projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"} </span> dalam kondisi Baik dan Lancar.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="last-paragraph-bap-serahterima">
                    Dengan ditanda tanganinya Berita Acara Serah Terima Hasil Pekerjaan ini, PIHAK KEDUA berhak menerima pembayaran pekerjaan Tahap Ke-<span>{formData.tahap_ke || "(Tahap Ke)"}</span> (
                    <span>{formData.tahap_ke_terbilang || "(Tahap ke terbilang)"}</span>) untuk bulan <span>{formData.untuk_bulan || "(Bulan)"}</span> Sebesar <span>{formData.nilai_pembayaran.masked || "(Nominal Pembayaran)"}</span> ({" "}
                    <span>{formData.nilai_pembayaran_terbilang || "(Nominal Pembayaran terbilang)"}</span> )
                  </div>
                  <div className="last-paragraph-bap-serahterima">
                    Demikian Berita Acara Serah Terima Hasil Pekerjaan ini dibuat dan ditanda tangani atas kedua belah pihak pada tanggal tersebut diatas dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.
                  </div>
                </div>
                <div style={{ marginBottom: "120px" }}>&nbsp;</div>
                <div style={{ marginLeft: "50px" }}>
                  <table
                    style={{
                      width: "100%",
                      fontFamily: '"Times New Roman", Times, serif',
                      fontSize: "16px",
                      color: "#000",
                    }}
                  >
                    <tbody>
                      <tr>
                        {/* Kolom PIHAK KESATU */}
                        <td style={{ width: "50%", verticalAlign: "top", paddingRight: "100px" }}>
                          <table style={{ width: "100%" }}>
                            <tbody>
                              <tr>
                                <td style={{ fontWeight: "bold", paddingBottom: "4px" }}>PIHAK KESATU</td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: "lighter", paddingBottom: "4px" }}>Yang Menerima</td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: "lighter", paddingBottom: "4px" }}>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: "lighter", paddingBottom: "60px" }}>Universitas Bengkulu</td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: "normal", paddingBottom: "2px" }}>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: "normal" }}>NIP. {projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>

                        {/* Kolom PIHAK KEDUA */}
                        <td style={{ width: "50%", verticalAlign: "top", paddingLeft: "100px" }}>
                          <table style={{ width: "100%" }}>
                            <tbody>
                              <tr>
                                <td style={{ fontWeight: "bold", paddingBottom: "4px" }}>PIHAK KEDUA</td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: "lighter", paddingBottom: "4px" }}>Yang Menyerahkan Penyedia</td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: "lighter", paddingBottom: "60px" }}>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: "normal", paddingBottom: "2px" }}>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: "normal" }}>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ marginBottom: "360px" }}>&nbsp;</div>
              <div style={{ textAlign: "center" }}>
                <div className="lampiran-header-tittle-layout">
                  <div className="lampiran-header-tittle-text">
                    Lampiran Berita Acara Serah Terima Tahap Ke-{formData.tahap_ke || "(Tahap)"} ({formData.tahap_ke_terbilang || "(Terbilang)"}) untuk bulan {formData.untuk_bulan || "(Bulan)"} Hasil Pekerjaan{" "}
                    {projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}{" "}
                  </div>
                </div>
                <div className="lampiran-separator-bar"></div>
                <div className="table-container">
                  <table className="table-bast-serah-terima">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Uraian Pekerjaan</th>
                        <th>Satuan Ukuran</th>
                        <th>Jumlah</th>
                        <th>Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputFieldsLampiran.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.uraian || "(Uraian)"}</td>
                          <td>{item.satuan || "(Satuan)"}</td>
                          <td>{item.jumlah || "(Jumlah)"}</td>
                          <td>{item.keterangan || "(Keterangan)"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ marginBottom: "80px" }}>&nbsp;</div>
              <div>
                <table
                  style={{
                    width: "100%",
                    fontFamily: '"Times New Roman", Times, serif',
                    fontSize: "16px",
                    color: "#000",
                    marginLeft: "90px",
                  }}
                >
                  <tbody>
                    <tr>
                      {/* Kolom PIHAK KESATU */}
                      <td style={{ width: "50%", verticalAlign: "top", paddingRight: "100px" }}>
                        <table style={{ width: "100%" }}>
                          <tbody>
                            <tr>
                              <td style={{ fontWeight: "bold", paddingBottom: "4px" }}>PIHAK KESATU</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: "lighter", paddingBottom: "4px" }}>Yang Menerima</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: "lighter", paddingBottom: "4px" }}>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: "lighter", paddingBottom: "60px" }}>Universitas Bengkulu</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: "normal", paddingBottom: "2px" }}>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: "normal" }}>NIP. {projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>

                      {/* Kolom PIHAK KEDUA */}
                      <td style={{ width: "50%", verticalAlign: "top", paddingLeft: "100px" }}>
                        <table style={{ width: "100%" }}>
                          <tbody>
                            <tr>
                              <td style={{ fontWeight: "bold", paddingBottom: "4px" }}>PIHAK KEDUA</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: "lighter", paddingBottom: "4px" }}>Yang Menyerahkan Penyedia</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: "lighter", paddingBottom: "60px" }}>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: "normal", paddingBottom: "2px" }}>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: "normal" }}>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
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
      const filename = "bap_serahterima_tahap";

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
            {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"BAP Serah Terima Tahap"} />}
            {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"BAP Serah Terima Tahap"} />}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Berita Acara Serah Terima Tahap Ke- <span style={{ color: "red" }}>*</span>
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
              Berita Acara Serah Terima Tahap Ke- (Terbilang) <span style={{ color: "red" }}>*</span>
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
              Untuk Bulan <span style={{ color: "red" }}>*</span>
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
              Nomor Surat DIPA <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nomor_surat_DIPA"
              className={errors.nomor_surat_DIPA ? "input-field-form-error" : "input-field-form"}
              value={formData.nomor_surat_DIPA}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nomor_surat_DIPA && <span className="error-text">{errors.nomor_surat_DIPA}</span>}
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
              Nilai Pembayaran Uang <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nilai_pembayaran"
              className={errors.nilai_pembayaran ? "input-field-form-error" : "input-field-form"}
              value={formData.nilai_pembayaran.masked}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nilai_pembayaran && <span className="error-text">{errors.nilai_pembayaran}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Nilai Pembayaran Uang (Terbilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nilai_pembayaran_terbilang"
              className={errors.nilai_pembayaran_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.nilai_pembayaran_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nilai_pembayaran_terbilang && <span className="error-text">{errors.nilai_pembayaran_terbilang}</span>}
          </div>
          {inputFieldsLampiran.map((field, index) => (
            <div key={index}>
              {/* Baris 1 */}
              <div className="input-form-flex">
                <div className="input-container-column">
                  <label className="input-label-flex">
                    Uraian Pekerjaan <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`input-field-form-flex-lampiran ${errors[`uraian_${index}`] ? "input-field-form-flex-lampiran-error" : ""}`}
                    name="uraian"
                    value={field.uraian}
                    onChange={(e) => handleChangeLampiran(index, e)}
                    onBlur={(e) => handleBlurLampiran(index, e)}
                    onFocus={(e) => handleFocusLampiran(index, e)}
                    placeholder="Isi bagian ini"
                  />
                  {errors[`uraian_${index}`] && <span className="error-text">{errors[`uraian_${index}`]}</span>}
                </div>

                <div className="input-container-column">
                  <label className="input-label-flex">
                    Satuan Ukuran <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`input-field-form-flex-lampiran ${errors[`satuan_${index}`] ? "input-field-form-flex-lampiran-error" : ""}`}
                    name="satuan"
                    value={field.satuan}
                    onChange={(e) => handleChangeLampiran(index, e)}
                    onBlur={(e) => handleBlurLampiran(index, e)}
                    onFocus={(e) => handleFocusLampiran(index, e)}
                    placeholder="Isi bagian ini"
                  />
                  {errors[`satuan_${index}`] && <span className="error-text">{errors[`satuan_${index}`]}</span>}
                </div>
              </div>

              {/* Baris 2 */}
              <div className="input-form-flex">
                <div className="input-container-column">
                  <label className="input-label-flex">
                    Jumlah <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    className={`input-field-form-flex-lampiran ${errors[`jumlah_${index}`] ? "input-field-form-flex-lampiran-error" : ""}`}
                    name="jumlah"
                    value={field.jumlah}
                    onChange={(e) => handleChangeLampiran(index, e)}
                    onBlur={(e) => handleBlurLampiran(index, e)}
                    onFocus={(e) => handleFocusLampiran(index, e)}
                    placeholder="Isi bagian ini"
                  />
                  {errors[`jumlah_${index}`] && <span className="error-text">{errors[`jumlah_${index}`]}</span>}
                </div>

                <div className="input-container-column">
                  <label className="input-label-flex">
                    Keterangan <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`input-field-form-flex-lampiran ${errors[`keterangan_${index}`] ? "input-field-form-flex-lampiran-error" : ""}`}
                    name="keterangan"
                    value={field.keterangan}
                    onChange={(e) => handleChangeLampiran(index, e)}
                    onBlur={(e) => handleBlurLampiran(index, e)}
                    onFocus={(e) => handleFocusLampiran(index, e)}
                    placeholder="Isi bagian ini"
                  />
                  {errors[`keterangan_${index}`] && <span className="error-text">{errors[`keterangan_${index}`]}</span>}
                </div>
              </div>
            </div>
          ))}

          <div className="add-button-layout">
            <img src={addButton} alt="add-button" onClick={handleAddFieldsLampiran} />
            {inputFieldsLampiran.length > 1 && <img src={removeButton} alt="add-button" onClick={handleRemoveFieldsLampiran} />}
          </div>
        </div>
        {/* <BapSerahTerimaTahapWord formDataPreview={formData} dataLampiran={inputFieldsLampiran} /> */}
        <ComponentWord />
        <BapSerahTerimaTahapKePreview formDataPreview={formData} dataLampiran={inputFieldsLampiran} dataProjectDetail={projectDetailData} />
      </div>

      <button className="button-simpan-blue" onClick={handleSubmitBAPSerahTerimaTahap}>
        Simpan
      </button>
    </>
  );
};

export default forwardRef(BapSerahTerimaTahapKe);

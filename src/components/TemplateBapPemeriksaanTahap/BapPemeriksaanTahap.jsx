import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import DatePicker from "react-datepicker";
import "./BapPemeriksaanTahap.css";
import BapPemeriksaanTahapPreview from "./BapPemeriksaanTahapPreview";
import addButton from "../../Assets/Images/add_button.png";
import removeButton from "../../Assets/Images/remove_button.png";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import { parse, format, isValid } from "date-fns";
import axios from "axios";
import Spinner from "../Spinner/spinner";
import html2pdf from "html2pdf.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import documentStyleMapping from "../../documentStyles";

import "react-datepicker/dist/react-datepicker.css";

const BapPemeriksaanTahap = ({ documentId, projectDetailData, currFileType }, ref) => {
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [inputFieldsLampiran, setInputFieldsLampiran] = useState([{ uraian: "", satuan: "", jumlah: "", keterangan: "" }]);

  const [formData, setFormData] = useState({
    tahap_ke: "",
    tahap_ke_terbilang: "",
    nomor_bap_pemeriksaan: "",
    tanggal_bap_pemeriksaan: "",
    tanggal_bap_pemeriksaan_terbilang: "",
    untuk_bulan: "",

    nilai_kontrak: { raw: "", masked: "" },
    nilai_kontrak_terbilang: "",
    tanggal_awal: "",
    tanggal_akhir: "",
    deskripsi_pemeriksaan: "",
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
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/berita_acara_pemeriksaan_tahap_ke?id=${documentId}`);
          const rawData = response.data;

          setFormData({
            tahap_ke: rawData.tahap || "",
            tahap_ke_terbilang: rawData.tahap_terbilang || "",
            nomor_bap_pemeriksaan: rawData.nomor_berita_acara || "",
            tanggal_bap_pemeriksaan: parseDateString(rawData.tanggal_berita_acara) || "",
            tanggal_bap_pemeriksaan_terbilang: rawData.tanggal_berita_acara_huruf || "",
            untuk_bulan: rawData.untuk_bulan || "",
            nilai_kontrak: {
              raw: parseInt(rawData.nilai_kontrak_angka, 10) || 0 || "", // nanti ganti nominal pembayaran
              masked: parseInt(rawData.nilai_kontrak_angka, 10) || 0 ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nilai_kontrak_angka)}` : "",
            },
            nilai_kontrak_terbilang: rawData.nilai_kontrak_huruf || "",
            tanggal_awal: parseDateString(rawData.tanggal_awal) || "",
            tanggal_akhir: parseDateString(rawData.tanggal_akhir) || "",
            deskripsi_pemeriksaan: rawData.deskripsi_pemeriksaan || "",
          });

          const uraianList = rawData.jenis_pekerjaan ?? [];
          const satuanList = rawData.satuan_pekerjaan ?? [];
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
            nomor_bap_pemeriksaan: "",
            tanggal_bap_pemeriksaan: "",
            tanggal_bap_pemeriksaan_terbilang: "",
            untuk_bulan: "",

            nilai_kontrak: { raw: "", masked: "" },
            nilai_kontrak_terbilang: "",
            tanggal_awal: "",
            tanggal_akhir: "",
            deskripsi_pemeriksaan: "",
          });
          setInputFieldsLampiran([{ uraian: "", satuan: "", jumlah: "", keterangan: "" }]);
        }
      } catch (error) {
        console.error("❌ Error fetching BAP Pemeriksaan Tahap:", error);
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
  const handleTextAreaKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      setFormData((prev) => {
        const currentText = prev.deskripsi_pemeriksaan || "";
        const lines = currentText.split("\n");
        const nextNumber = lines.length + 1;
        const newText = currentText + `\n${nextNumber}. `;

        return {
          ...prev,
          deskripsi_pemeriksaan: newText,
        };
      });
    }
  };
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
    } else if (name === "deskripsi_pemeriksaan") {
      const { value } = e.target;

      // Pastikan numbering tetap terjaga
      const formattedValue = value
        .split("\n")
        .map((line, index) => `${index + 1}. ${line.replace(/^\d+\.\s*/, "")}`) // Hilangkan numbering lama, tambahkan yang baru
        .join("\n");

      setFormData((prev) => ({
        ...prev,
        deskripsi_pemeriksaan: formattedValue,
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

    // Kalau textarea cuma berisi "1." atau kosong, langsung kasih error
    if (value.trim() === "1." || !value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Field ini harus diisi!",
      }));
    }

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
    const { name } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    // Kalau field "deskripsi_pemeriksaan" masih kosong, tambahkan "1. "
    if (name === "deskripsi_pemeriksaan" && !formData.deskripsi_pemeriksaan.trim()) {
      setFormData((prev) => ({
        ...prev,
        deskripsi_pemeriksaan: "1. ",
      }));
    }
  };

  const handleSubmitBAPPemeriksaanTahap = async () => {
    setLoading(true);
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
      setLoading(false);
      return;
    }

    if (documentId) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/put/berita_acara_pemeriksaan_tahap_ke?id=${documentId}`,
          {
            project_id: projectDetailData.id,
            nomor_berita_acara: formData.nomor_bap_pemeriksaan,
            tanggal_berita_acara: formData.tanggal_bap_pemeriksaan ? format(formData.tanggal_bap_pemeriksaan, "yyyy-MM-dd") : null,
            tanggal_berita_acara_huruf: formData.tanggal_bap_pemeriksaan_terbilang,
            nilai_kontrak_angka: formData.nilai_kontrak.raw,
            nilai_kontrak_huruf: formData.nilai_kontrak_terbilang,
            jenis_pekerjaan: inputFieldsLampiran.map((field) => field.uraian).filter((uraian) => uraian.trim() !== ""),
            jumlah: inputFieldsLampiran.map((field) => field.jumlah),
            satuan_pekerjaan: inputFieldsLampiran.map((field) => field.satuan).filter((satuan) => satuan.trim() !== ""),
            keterangan: inputFieldsLampiran.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
            tahap: formData.tahap_ke,
            tahap_terbilang: formData.tahap_ke_terbilang,
            tanggal_awal: formData.tanggal_awal ? format(formData.tanggal_awal, "yyyy-MM-dd") : null,
            tanggal_akhir: formData.tanggal_akhir ? format(formData.tanggal_akhir, "yyyy-MM-dd") : null,
            deskripsi_pemeriksaan: formData.deskripsi_pemeriksaan,

            untuk_bulan: formData.untuk_bulan,
          },
          { headers: { "Content-Type": "application/json" } }
        );
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
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/berita_acara_pemeriksaan_tahap_ke`,
          {
            project_id: projectDetailData.id,
            nomor_berita_acara: formData.nomor_bap_pemeriksaan,
            tanggal_berita_acara: formData.tanggal_bap_pemeriksaan ? format(formData.tanggal_bap_pemeriksaan, "yyyy-MM-dd") : null,
            tanggal_berita_acara_huruf: formData.tanggal_bap_pemeriksaan_terbilang,
            nilai_kontrak_angka: formData.nilai_kontrak.raw,
            nilai_kontrak_huruf: formData.nilai_kontrak_terbilang,
            jenis_pekerjaan: inputFieldsLampiran.map((field) => field.uraian).filter((uraian) => uraian.trim() !== ""),
            jumlah: inputFieldsLampiran.map((field) => field.jumlah),
            satuan_pekerjaan: inputFieldsLampiran.map((field) => field.satuan).filter((satuan) => satuan.trim() !== ""),
            keterangan: inputFieldsLampiran.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
            tahap: formData.tahap_ke,
            tahap_terbilang: formData.tahap_ke_terbilang,
            tanggal_awal: formData.tanggal_awal ? format(formData.tanggal_awal, "yyyy-MM-dd") : null,
            tanggal_akhir: formData.tanggal_akhir ? format(formData.tanggal_akhir, "yyyy-MM-dd") : null,
            deskripsi_pemeriksaan: formData.deskripsi_pemeriksaan,

            untuk_bulan: formData.untuk_bulan,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        setLoading(false);
        console.log("✅ BAP Pemeriksaan tahap:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        setLoading(false);
        console.error("❌ Gagal create BAP Pemeriksaan tahap:", error);
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
                              BERITA ACARA PEMERIKSAAN <br />
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
                                <span>{formData.nomor_bap_pemeriksaan || "(Nomor Surat BAP)"}</span>
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
                                  {(formData.tanggal_bap_pemeriksaan &&
                                    new Date(formData.tanggal_bap_pemeriksaan).toLocaleDateString("id-ID", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })) ||
                                    "(Tanggal BAP Pemeriksaan)"}
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
                  Pada hari ini, <span>{formData.tanggal_bap_pemeriksaan_terbilang || "(Tanggal BAP Pemeriksaan Terbilang)"}</span> ({" "}
                  <span>
                    {(formData.tanggal_bap_pemeriksaan &&
                      new Date(formData.tanggal_bap_pemeriksaan)
                        .toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .replace(/\//g, "-")) ||
                      "(Tanggal Surat BAP Pemeriksaan)"}
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
                        <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>, dalam hal ini bertindak untuk dan atas nama Pemerintah Republik Indonesia Selanjutnya disebut sebagai PIHAK KESATU.
                      </span>
                    </div>
                    <div class="bap-termin-item">
                      <span class="bap-label">Alamat</span> <span class="bap-separator">:</span>
                      <span class="bap-value">
                        <span>{projectDetailData.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
                      </span>
                    </div>
                  </div>

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
                        <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span> <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan/Instansi Pihak 2)"}</span>, dalam hal ini bertindak untuk dan atas nama Perusahaan
                        disebut Sebagai PIHAK KEDUA .
                      </span>
                    </div>
                    <div class="bap-termin-item">
                      <span class="bap-label">Alamat</span> <span class="bap-separator">:</span>
                      <span class="bap-value">
                        <span>{projectDetailData.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bast-serah-terima-container">
                  <div className="bast-serah-terima-section">
                    <p className="bast-serah-terima-paragraph">
                      PIHAK KESATU dan PIHAK KEDUA telah melakukan pemeriksaan Tahap Ke-<span>{formData.tahap_ke || "(Tahap)"}</span> (<span>{formData.tahap_ke_terbilang || "(Tahap terbilang)"}</span>) untuk bulan{" "}
                      <span>{formData.untuk_bulan || "(Untuk Bulan)"}</span> Hasil Pekerjaan <span>{projectDetailData.pekerjaan || "(Pekerjaan)"}</span> yang dikerjakan oleh{" "}
                      <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan pihak 2)"}</span> Berdasarkan Surat Perjanjian/Kontrak Nomor :<span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Kontrak Perjanjian)"}</span>{" "}
                      tanggal{" "}
                      <span>
                        {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                          new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal Surat Kontrak)"}
                      </span>
                      dengan Nilai Kontrak <span>{formData.nilai_kontrak.masked || "(Nilai Kontrak))"}</span> (<span>{formData.nilai_kontrak_terbilang || "(Nilai Kontrak Terbilang)"}</span>) terhitung mulai tanggal{" "}
                      <span>
                        {(formData.tanggal_awal &&
                          new Date(formData.tanggal_awal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal Awal)"}
                      </span>
                      <span> </span> sampai dengan{" "}
                      <span>
                        {(formData.tanggal_akhir &&
                          new Date(formData.tanggal_akhir).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal Akhir)"}
                      </span>
                      <span> </span>dengan perincian sebagai berikut:
                    </p>
                    {(formData.deskripsi_pemeriksaan || "Rincian").split("\n").map((item, index) => (
                      <div key={index} className="bast-serah-terima-item">
                        <div className="bast-serah-terima-label-hasil-pekerjaan">{index + 1}.</div>
                        {item.replace(/^\d+\.\s*/, "")}
                      </div>
                    ))}
                  </div>
                  <div className="last-paragraph-bap-serahterima">Perincian dan keterangan dalam lampiran merupakan bagian yang tidak terpisahkan dari berita acara ini.</div>
                  <div className="last-paragraph-bap-serahterima">
                    Demikian Berita Acara Pemeriksaan Hasil Pekerjaan ini dibuat dan ditanda tangani atas kedua belah pihak pada tanggal tersebut diatas dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.
                  </div>
                </div>
                <div className="ttd-bap-layout-serahterima">
                  <div className="ttd-pihak-kesatu-tahap-serahterima">
                    <div className="ttd-pihak-kesatu-bold-serahterima">PIHAK KESATU</div>

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
                    <div className="ttd-pihak-kedua-light-serahterima">Mengetahui, Menyetujui :</div>
                    <div className="ttd-pihak-kedua-light">
                      <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan pihak 2)"}</span>
                    </div>

                    <div className="nip-bap-layout-pihak2">
                      <div className="ttd-pihak-kedua-tahap">
                        <div className="nip-bap-name-tahap">
                          <span>{projectDetailData.nama_pihak_2 || "(nama pihak 2)"}</span>
                        </div>
                        <div className="nip-bap-nip-tahap-serahterima">
                          <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan pihak 2)"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ pageBreakBefore: "always" }}>
                <div className="lampiran-header-tittle-layout">
                  <div className="lampiran-header-tittle-text">
                    Lampiran Berita Acara Pemeriksaan Tahap Ke-<span>{formData.tahap_ke || "(Tahap)"}</span> (<span>{formData.tahap_ke_terbilang || "(Tahap Terbilang)"}</span>) untuk bulan <span>{formData.untuk_bulan || "(bulan)"}</span>{" "}
                    Hasil Pekerjaan <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>{" "}
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

                    <div className="ttd-pihak-kesatu-light-serahterima">
                      <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                    </div>
                    <div className="ttd-pihak-kesatu-light-serahterima">Universitas Bengkulu</div>

                    <div className="nip-bap-layout-pihak1">
                      <div className="ttd-pihak-kedua-tahap">
                        <div className="nip-bap-name-tahap">
                          <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                        </div>
                        <div className="nip-bap-nip">
                          NIP. <span>{projectDetailData.nip_pihak_1 || "(Nip Pihak 1)"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ttd-pihak-kedua-tahap-serahterima">
                    <div className="ttd-pihak-kedua-bold">PIHAK KEDUA</div>
                    <div className="ttd-pihak-kedua-light-serahterima">Mengetahui, Menyetujui :</div>
                    <div className="ttd-pihak-kedua-light">
                      <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan pihak 2)"}</span>
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
                  Pada hari ini, <span>{formData.tanggal_bap_pemeriksaan_terbilang || "(Tanggal BAP Pemeriksaan Terbilang)"}</span> ({" "}
                  <span>
                    {(formData.tanggal_bap_pemeriksaan &&
                      new Date(formData.tanggal_bap_pemeriksaan)
                        .toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .replace(/\//g, "-")) ||
                      "(Tanggal Surat BAP Pemeriksaan)"}
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

                <div className="bast-serah-terima-container">
                  <div className="bast-serah-terima-section">
                    <div className="bast-serah-terima-paragraph">
                      PIHAK KESATU dan PIHAK KEDUA telah melakukan pemeriksaan Tahap Ke-<span>{formData.tahap_ke || "(Tahap)"}</span> (<span>{formData.tahap_ke_terbilang || "(Tahap terbilang)"}</span>) untuk bulan{" "}
                      <span>{formData.untuk_bulan || "(Untuk Bulan)"}</span> Hasil Pekerjaan <span>{projectDetailData.pekerjaan || "(Pekerjaan)"}</span> yang dikerjakan oleh{" "}
                      <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan pihak 2)"}</span> Berdasarkan Surat Perjanjian/Kontrak Nomor :<span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Kontrak Perjanjian)"}</span>{" "}
                      tanggal{" "}
                      <span>
                        {(projectDetailData.tanggal_surat_perjanjian_kontrak &&
                          new Date(projectDetailData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal Surat Kontrak)"}
                      </span>
                      dengan Nilai Kontrak <span>{formData.nilai_kontrak.masked || "(Nilai Kontrak))"}</span> (<span>{formData.nilai_kontrak_terbilang || "(Nilai Kontrak Terbilang)"}</span>) terhitung mulai tanggal{" "}
                      <span>
                        {(formData.tanggal_awal &&
                          new Date(formData.tanggal_awal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal Awal)"}
                      </span>
                      <span> </span> sampai dengan{" "}
                      <span>
                        {(formData.tanggal_akhir &&
                          new Date(formData.tanggal_akhir).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })) ||
                          "(Tanggal Akhir)"}
                      </span>
                      <span> </span>dengan perincian sebagai berikut:
                    </div>
                    <div style={{ marginLeft: "30px" }}>
                      {" "}
                      <table style={{ width: "100%", fontSize: "16px", fontFamily: '"Times New Roman", Times, serif' }}>
                        <tbody>
                          {(formData.deskripsi_pemeriksaan || "Rincian").split("\n").map((item, index) => (
                            <tr key={index}>
                              <td style={{ verticalAlign: "top", width: "15px" }}>{index + 1}.</td>
                              <td style={{ textAlign: "justify" }}>{item.replace(/^\d+\.\s*/, "")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="last-paragraph-bap-serahterima">Perincian dan keterangan dalam lampiran merupakan bagian yang tidak terpisahkan dari berita acara ini.</div>
                  <div className="last-paragraph-bap-serahterima">
                    Demikian Berita Acara Pemeriksaan Hasil Pekerjaan ini dibuat dan ditanda tangani atas kedua belah pihak pada tanggal tersebut diatas dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.
                  </div>
                </div>
                <div style={{ marginLeft: "50px" }}>
                  <table
                    style={{
                      width: "100%",
                      fontFamily: '"Times New Roman", Times, serif',
                      fontSize: "16px",
                      color: "#000",
                      marginTop: "40px",
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
                                <td style={{ fontWeight: "lighter", paddingBottom: "4px" }}>Mengetahui, Menyetujui :</td>
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
              <div style={{ marginTop: "120px" }}>&nbsp;</div>
              <div style={{ marginBottom: "80px" }}>
                <div className="lampiran-header-tittle-layout">
                  <div className="lampiran-header-tittle-text">
                    Lampiran Berita Acara Pemeriksaan Tahap Ke-<span>{formData.tahap_ke || "(Tahap)"}</span> (<span>{formData.tahap_ke_terbilang || "(Tahap Terbilang)"}</span>) untuk bulan <span>{formData.untuk_bulan || "(bulan)"}</span>{" "}
                    Hasil Pekerjaan <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>{" "}
                  </div>
                </div>
                <div className="lampiran-separator-bar"></div>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
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
              <div>
                <table
                  style={{
                    width: "100%",
                    fontFamily: '"Times New Roman", Times, serif',
                    fontSize: "16px",
                    color: "#000",

                    marginLeft: "50px",
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
                              <td style={{ fontWeight: "lighter", paddingBottom: "4px" }}>Mengetahui, Menyetujui :</td>
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
      const filename = "bap_pemeriksaan_tahap";

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
            {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"BAP Pemeriksaan Tahap"} />}
            {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"BAP Pemeriksaan Tahap"} />}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Surat Berita Acara Pemeriksaan Tahap Ke- <span style={{ color: "red" }}>*</span>
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
              Surat Berita Acara Pemeriksaan Tahap Ke- (Terbilang) <span style={{ color: "red" }}>*</span>
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
              Nomor Berita Acara Pemeriksaan <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="nomor_bap_pemeriksaan"
              className={errors.nomor_bap_pemeriksaan ? "input-field-form-error" : "input-field-form"}
              value={formData.nomor_bap_pemeriksaan}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.nomor_bap_pemeriksaan && <span className="error-text">{errors.nomor_bap_pemeriksaan}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Berita Acara Pemeriksaan <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.tanggal_bap_pemeriksaan}
              name="tanggal_bap_pemeriksaan"
              onChange={(date) => handleDateChange("tanggal_bap_pemeriksaan", date)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={errors.tanggal_bap_pemeriksaan ? "input-field-form-date-error" : "input-field-form-date"}
              dateFormat="dd/MM/yyyy"
              placeholderText="Isi bagian ini"
            />
            {errors.tanggal_bap_pemeriksaan && <span className="error-text">{errors.tanggal_bap_pemeriksaan}</span>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Berita Acara Pemeriksaan (Teribilang) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="tanggal_bap_pemeriksaan_terbilang"
              className={errors.tanggal_bap_pemeriksaan_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.tanggal_bap_pemeriksaan_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.tanggal_bap_pemeriksaan_terbilang && <span className="error-text">{errors.tanggal_bap_pemeriksaan_terbilang}</span>}
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

          <div className="tnr-middle">Rincian Waktu Pekerjaan</div>
          <div className="input-form-flex">
            <div className="input-container-column">
              <label className="input-label-flex">
                Tanggal Awal <span style={{ color: "red" }}>*</span>
              </label>

              <DatePicker
                selected={formData.tanggal_awal}
                name="tanggal_awal"
                onChange={(date) => handleDateChange("tanggal_awal", date)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={errors.tanggal_awal ? "input-field-form-flex-lampiran-error" : "input-field-form-flex-lampiran"}
                dateFormat="dd/MM/yyyy"
                placeholderText="Isi bagian ini"
              />
              {errors.tanggal_awal && <span className="error-text">{errors.tanggal_awal}</span>}
            </div>
            <div className="input-container-column">
              <label className="input-label-flex">
                Tanggal Akhir <span style={{ color: "red" }}>*</span>
              </label>

              <DatePicker
                selected={formData.tanggal_akhir}
                name="tanggal_akhir"
                onChange={(date) => handleDateChange("tanggal_akhir", date)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={errors.tanggal_akhir ? "input-field-form-flex-lampiran-error" : "input-field-form-flex-lampiran"}
                dateFormat="dd/MM/yyyy"
                placeholderText="Isi bagian ini"
              />
              {errors.tanggal_akhir && <span className="error-text">{errors.tanggal_akhir}</span>}
            </div>
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Rincian <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              type="text"
              name="deskripsi_pemeriksaan"
              value={formData.deskripsi_pemeriksaan}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={errors.deskripsi_pemeriksaan ? "input-textarea-form-error" : "input-textarea-form"}
              placeholder="1"
              onKeyDown={handleTextAreaKeyDown}
            />
            {errors.deskripsi_pemeriksaan && <span className="error-text">{errors.deskripsi_pemeriksaan}</span>}
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
        {/* <BapPemeriksaanTahapWord formDataPreview={formData} dataLampiran={inputFieldsLampiran} /> */}
        <ComponentWord />
        <BapPemeriksaanTahapPreview formDataPreview={formData} dataProjectDetail={projectDetailData} dataLampiran={inputFieldsLampiran} />
      </div>

      <button className="button-simpan-blue" onClick={handleSubmitBAPPemeriksaanTahap}>
        Simpan
      </button>
    </>
  );
};

export default forwardRef(BapPemeriksaanTahap);

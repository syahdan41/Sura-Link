import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import DatePicker from "react-datepicker";
import SuratPernyataanPreview from "./SuratPernyataanPreview";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import axios from "axios";
import LogoKampusLarge from "../../Assets/Images/image 1.png";
import { parse, format, isValid } from "date-fns";
import html2pdf from "html2pdf.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import documentStyleMapping from "../../documentStyles";

import Spinner from "../Spinner/spinner";

import "./PreviewSurat.css";

import "react-datepicker/dist/react-datepicker.css";

const SuratPernyataan = ({ documentId, projectDetailData, onCreated, currFileType, projectName }, ref) => {
  const contentRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    tanggal_surat_pernyataan: "",
    tanggal_surat_pernyataan_terbilang: "",
    nomor_surat_keputusan_rektor: "",
    tanggal_surat_keputusan_rektor: "",
    keterangan_surat: "",
    tahun_anggaran: "",
    nilai_kontrak: { raw: "", masked: "" },
    nilai_kontrak_terbilang: "",
    dalam_rangka_pembayaran: "",
    nominal_pembayaran: { raw: "", masked: "" },
    nominal_pembayaran_terbilang: "",
    ketentuan_sanksi: [
      "1.Penyedia bertanggung jawab terhadap spesifikasi pekerjaan",
      "2.Penyedia bertanggung jawab terhadap volume yang terpasang",
      "3.Penyedia bertanggung jawab terhadap metode pelaksanaan pekerjaan",
      "4.Penyedia bertanggung jawab terhadap jadwal pelaksanaan pekerjaan",
    ],
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
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/surat_pernyataan?id=${documentId}`);
          const rawData = response.data;

          const fetchedData = {
            tanggal_surat_pernyataan: parseDateString(rawData.hari_dan_tanggal_surat_pernyataan_huruf),
            tanggal_surat_pernyataan_terbilang: rawData.hari_dan_tanggal_surat_pernyataan_huruf_teks,
            nomor_surat_keputusan_rektor: rawData.nomor_surat_keputusan_rektor,
            tanggal_surat_keputusan_rektor: parseDateString(rawData.tanggal_surat_keputusan_rektor),
            keterangan_surat: rawData.perihal_keterangan,
            tahun_anggaran: rawData.tahun_anggaran,
            dalam_rangka_pembayaran: rawData.perihal_surat,
            nilai_kontrak: {
              raw: rawData.nilai_kontrak_angka || "",
              masked: rawData.nilai_kontrak_angka ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nilai_kontrak_angka)}` : "",
            },
            nominal_pembayaran: {
              raw: rawData.nominal_pembayaran_angka || "",
              masked: rawData.nominal_pembayaran_angka ? `Rp ${new Intl.NumberFormat("id-ID").format(rawData.nominal_pembayaran_angka)}` : "",
            },
            nominal_pembayaran_terbilang: rawData.nominal_pembayaran_huruf || "",
            nilai_kontrak_terbilang: rawData.nilai_kontrak_huruf || "",
            ketentuan_sanksi: rawData.ketentuan_sanksi || [
              "1.Penyedia bertanggung jawab terhadap spesifikasi pekerjaan",
              "2.Penyedia bertanggung jawab terhadap volume yang terpasang",
              "3.Penyedia bertanggung jawab terhadap metode pelaksanaan pekerjaan",
              "4.Penyedia bertanggung jawab terhadap jadwal pelaksanaan pekerjaan",
            ],
          };

          setFormData(fetchedData);
        } else {
          setFormData({
            tanggal_surat_pernyataan: "",
            tanggal_surat_pernyataan_terbilang: "",
            nomor_surat_keputusan_rektor: "",
            tanggal_surat_keputusan_rektor: "",
            keterangan_surat: "",
            tahun_anggaran: "",
            nilai_kontrak: { raw: "", masked: "" },
            nilai_kontrak_terbilang: "",
            dalam_rangka_pembayaran: "",
            nominal_pembayaran: { raw: "", masked: "" },
            nominal_pembayaran_terbilang: "",
            ketentuan_sanksi: [
              "1.Penyedia bertanggung jawab terhadap spesifikasi pekerjaan",
              "2.Penyedia bertanggung jawab terhadap volume yang terpasang",
              "3.Penyedia bertanggung jawab terhadap metode pelaksanaan pekerjaan",
              "4.Penyedia bertanggung jawab terhadap jadwal pelaksanaan pekerjaan",
            ],
          });
        }
      } catch (error) {
        console.error("❌ Error fetching surat_pernyataan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [documentId]);

  // validasi text area array
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

  const handleSubmitSuratPernyataan = async () => {
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
        const postResponse = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/put/surat_pernyataan?id=${documentId}`,
          {
            project_id: projectDetailData.id,
            perihal_surat: formData.dalam_rangka_pembayaran,
            perihal_keterangan: formData.keterangan_surat,
            tahun_anggaran: formData.tahun_anggaran,
            nilai_kontrak_angka: parseInt(formData.nilai_kontrak.raw, 10) || 0,
            nilai_kontrak_huruf: formData.nilai_kontrak_terbilang,
            nomor_surat_keputusan_rektor: formData.nomor_surat_keputusan_rektor,
            tanggal_surat_keputusan_rektor: formData.tanggal_surat_keputusan_rektor ? format(formData.tanggal_surat_keputusan_rektor, "yyyy-MM-dd") : null,
            // kurang [nominal_pembayaran_angka,int],  [nominal_pembayaran_huruf,text]
            nominal_pembayaran_angka: parseInt(formData.nominal_pembayaran.raw) || 0,
            nominal_pembayaran_huruf: formData.nominal_pembayaran_terbilang,
            hari_dan_tanggal_surat_pernyataan_huruf: formData.tanggal_surat_pernyataan ? format(formData.tanggal_surat_pernyataan, "yyyy-MM-dd") : null,
            hari_dan_tanggal_surat_pernyataan_huruf_teks: formData.tanggal_surat_pernyataan_terbilang,
            ketentuan_sanksi: formData.ketentuan_sanksi,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ Surat Pernyataan berhasil dibuat:", postResponse.data);
        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "surat_pernyataan",
            record_id: 1,
            action_type: "UPDATE",
            timestamp: currentTimestamp,
            project_id: projectDetailData.id,
            project_name: projectName || "",
            description: "Update Surat Pernyataan",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("✅ Berhasil:", responseHistory.data);
        setIsSuccessModalOpen(true);
        setLoading(false);
      } catch (error) {
        console.error("❌ Gagal membuat Surat Pernyataan:", error);
        console.log("📦 Detail error dari API:", error.response?.data);
        setIsFailedModalOpen(true);
        setLoading(false);
      }
    } else {
      try {
        const postResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/surat_pernyataan`,
          {
            project_id: projectDetailData.id,
            perihal_surat: formData.dalam_rangka_pembayaran,
            perihal_keterangan: formData.keterangan_surat,
            tahun_anggaran: formData.tahun_anggaran,
            nilai_kontrak_angka: parseInt(formData.nilai_kontrak.raw, 10) || 0,
            nilai_kontrak_huruf: formData.nilai_kontrak_terbilang,
            nomor_surat_keputusan_rektor: formData.nomor_surat_keputusan_rektor,
            tanggal_surat_keputusan_rektor: formData.tanggal_surat_keputusan_rektor ? format(formData.tanggal_surat_keputusan_rektor, "yyyy-MM-dd") : null,
            // kurang [nominal_pembayaran_angka,int],  [nominal_pembayaran_huruf,text]
            nominal_pembayaran_angka: parseInt(formData.nominal_pembayaran.raw) || 0,
            nominal_pembayaran_huruf: formData.nominal_pembayaran_terbilang,
            hari_dan_tanggal_surat_pernyataan_huruf: formData.tanggal_surat_pernyataan ? format(formData.tanggal_surat_pernyataan, "yyyy-MM-dd") : null,
            hari_dan_tanggal_surat_pernyataan_huruf_teks: formData.tanggal_surat_pernyataan_terbilang,
            ketentuan_sanksi: formData.ketentuan_sanksi,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        const newId = postResponse.data?.id;
        if (onCreated && newId) onCreated(newId); // Kirim ke parent
        console.log("✅ Create success:", postResponse.data);

        console.log("✅ Surat Pernyataan berhasil dibuat:", postResponse.data);

        const currentTimestamp = new Date().toISOString();

        const responseHistory = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/history`,
          {
            table_name: "surat_pernyataan",
            record_id: 1,
            action_type: "CREATE",
            timestamp: currentTimestamp,
            project_id: postResponse.data.id,
            project_name: projectName || "",
            description: "Create Surat Pernyataan",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("✅ Berhasil:", responseHistory.data);

        setIsSuccessModalOpen(true);
        setLoading(false);
      } catch (error) {
        console.error("❌ Gagal create Surat Pernyataan:", error);
        console.log("📦 Detail error dari API:", error.response?.data);
        setIsFailedModalOpen(true);
        setLoading(false);
      }
    }
  };

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

          <div className="tittle-surat">SURAT PERNYATAAN</div>
          <div className="text-var-tanggal">
            Pada hari ini, <span>{formData.tanggal_surat_pernyataan_terbilang || "(Tanggal terbilang)"}</span> (
            <span>
              {(formData.tanggal_surat_pernyataan &&
                (() => {
                  const date = new Date(formData.tanggal_surat_pernyataan);
                  const day = String(date.getDate()).padStart(2, "0");
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const year = date.getFullYear();
                  return `${day}/${month}/${year}`;
                })()) ||
                "(Tanggal Surat Pernyataan)"}
            </span>
            ), saya yang bertanda tangan dibawah ini menyatakan:
          </div>
          <div className="pihak1-container">
            <table>
              <tbody>
                <tr>
                  <td>Nama</td>
                  <td>:</td>
                  <td>{projectDetailData.nama_pihak_1 || "Nama Pihak 1"}</td>
                </tr>
                <tr>
                  <td>NIP</td>
                  <td>:</td>
                  <td>{projectDetailData.nip_pihak_1 || "NIP Pihak 1"}</td>
                </tr>
                <tr>
                  <td>Jabatan</td>
                  <td>:</td>
                  <td>{projectDetailData.jabatan_pihak_1 || "Jabatan Pihak 1"}</td>
                </tr>
                <tr>
                  <td>Alamat</td>
                  <td>:</td>
                  <td>{projectDetailData.alamat_pihak_1 || "Alamat Pihak 1"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="isi-surat">
            Berdasarkan Surat Keputusan Rektor Universitas Bengkulu No : <span>{formData.nomor_surat_keputusan_rektor || "(Nomor Surat)"}</span> Tanggal{" "}
            <span>
              {(formData.tanggal_surat_keputusan_rektor &&
                new Date(formData.tanggal_surat_keputusan_rektor).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })) ||
                "(Tanggal Surat Keputusan Rektor)"}
            </span>{" "}
            tentang <span>{formData.keterangan_surat || "(Keterangan Surat)"}</span>, atas Pelaksanaan Pekerjaan <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Ruang Lingkup Pekerjaan)"}</span>, dengan Nilai Kontrak{" "}
            <span>{formData.nilai_kontrak.masked || "(Nilai Kontrak Angka)"}</span> ( <span>{formData.nilai_kontrak_terbilang || "(Nilai Kontrak Terbilang)"}</span> ), Untuk pembayaran{" "}
            <span>{formData.dalam_rangka_pembayaran || "Dalam Rangka Pembayaran"}</span> sebesar <span>{formData.nominal_pembayaran.masked || "Nominal Pembayaran"}</span> (
            <span>{formData.nominal_pembayaran_terbilang || "Nominal Pembayaran Terbilang"}</span>). yang terdapat dalam DIPA Universitas Bengkulu Tahun Anggaran <span>{formData.tahun_anggaran || "Tahun Anggaran"}</span>, dan mengangkat
            saya sebagai Pejabat Pembuat Komitmen Universitas Bengkulu yang diberi kewenangan Kuasa Pengguna Anggaran untuk melaksanakan tindakan yang mengakibatkan terjadinya pengeluaran anggaran belanja yang bersumber dari PNBP dengan ini
            Saya menyatakan dengan sesungguhnya bahwa berkenaan dengan pelaksanaan anggaran pada Universitas Bengkulu, dengan ini menyatakan bahwa:
          </div>
          <div className="ketentuan-sanksi">
            {formData.ketentuan_sanksi.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
          <div className="isi-surat">Demikian pernyataan ini saya buat dengan sebenarnya dengan mengingat Sumpah Pegawai Negeri Sipil.</div>
          <div className="surat-ttd-pernyataan">
            Bengkulu,{" "}
            <span>
              {" "}
              {(formData.tanggal_surat_pernyataan &&
                new Date(formData.tanggal_surat_pernyataan).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })) ||
                "(Tanggal Surat Pernyataan)"}
            </span>{" "}
            <br />
            a.n. Kuasa Pengguna Anggaran/ <br /> <span>{projectDetailData.jabatan_pihak_1 || "Jabatan Pihak 1"}</span> <br />
            UNIVERSITAS BENGKULU
          </div>
          <div className="identity-surat-pernyataan">
            <div>
              <span className="name-surat-pernyataan">
                <span>{projectDetailData.nama_pihak_1 || "Nama Pihak 1"}</span>
              </span>
            </div>
            <div>
              {" "}
              <span className="nip-surat-pernyataan">
                NIP: <span>{projectDetailData.nip_pihak_1 || "NIP Pihak 1"}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Debug purpose
  // useImperativeHandle(ref, () => ({
  //   handleDownload: async (fileType) => {
  //     console.log("file type download", fileType);

  //     await new Promise((resolve) => setTimeout(resolve, 0)); // re-render dulu

  //     const element = contentRef.current;
  //     if (!element) return;

  //     const cloned = element.cloneNode(true);
  //     const wrapper = document.createElement("div");
  //     wrapper.appendChild(cloned);

  //     const htmlContent = wrapper.innerHTML;
  //     const filename = "surat_pernyataan";

  //     if (fileType === "html") {
  //       const style = documentStyleMapping[filename] || "";

  //       const fullHtml = `
  //         <html>
  //           <head>
  //             <style>${style}</style>
  //           </head>
  //           <body>${htmlContent}</body>
  //         </html>
  //       `;

  //       const blob = new Blob([fullHtml], { type: "text/html" });
  //       const a = document.createElement("a");
  //       a.href = URL.createObjectURL(blob);
  //       a.download = `${filename}.html`;
  //       a.click();
  //       return;
  //     }

  //     if (fileType === "word") {
  //       const style = documentStyleMapping[filename] || "";

  //       const fullHtml = `
  //         <html>
  //           <head>
  //             <style>${style}</style>
  //           </head>
  //           <body>${htmlContent}</body>
  //         </html>
  //       `;

  //       const blob = htmlDocx.asBlob(fullHtml);
  //       const a = document.createElement("a");
  //       a.href = URL.createObjectURL(blob);
  //       a.download = `${filename}.docx`;
  //       a.click();
  //     } else {
  //       await html2pdf()
  //         .from(wrapper)
  //         .set({
  //           margin: 0.5,
  //           filename: `${filename}.pdf`,
  //           html2canvas: { scale: 2 },
  //           jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  //         })
  //         .save();
  //     }

  //     setTimeout(() => 1000); // reset
  //   },
  // }));

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
      const filename = "surat_pernyataan";

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
            {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"Surat Pernyataan"} />}
            {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"Surat Pernyataan"} />}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Surat Pernyataan <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.tanggal_surat_pernyataan}
              name="tanggal_surat_pernyataan"
              onChange={(date) => handleDateChange("tanggal_surat_pernyataan", date)}
              // onFocus={() => handleFocus("tanggal_surat_pernyataan")}
              // onBlur={handleDateBlur}
              className={errors.tanggal_surat_pernyataan ? "input-field-form-date-error" : "input-field-form-date"}
              dateFormat="dd/MM/yyyy"
              placeholderText="Isi bagian ini"
            />
            {errors.tanggal_surat_pernyataan && <p className="error-text">{errors.tanggal_surat_pernyataan}</p>}
          </div>
          <div className="input-container-form">
            <label className="input-label-form">
              Tanggal Surat Pernyataan Terbilang <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="tanggal_surat_pernyataan_terbilang"
              className={errors.tanggal_surat_pernyataan_terbilang ? "input-field-form-error" : "input-field-form"}
              value={formData.tanggal_surat_pernyataan_terbilang}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.tanggal_surat_pernyataan_terbilang && <span className="error-text">{errors.tanggal_surat_pernyataan_terbilang}</span>}
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
              Keterangan Surat <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="keterangan_surat"
              className={errors.keterangan_surat ? "input-field-form-error" : "input-field-form"}
              value={formData.keterangan_surat}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.keterangan_surat && <span className="error-text">{errors.keterangan_surat}</span>}
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
              Tahun Anggaran <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="tahun_anggaran"
              className={errors.tahun_anggaran ? "input-field-form-error" : "input-field-form"}
              value={formData.tahun_anggaran}
              placeholder="Isi bagian ini"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.tahun_anggaran && <span className="error-text">{errors.tahun_anggaran}</span>}
          </div>

          <div className="input-container-form">
            <label className="input-label-form">Ketentuan Sanksi (Opsional)</label>
            <textarea name="ketentuan_sanksi" value={formData.ketentuan_sanksi?.join("\n") || ""} onChange={handleChangeTextArea} onKeyDown={handleKeyDownTextArea} placeholder="Isi Bagian Ini" className="input-textarea-form" />
          </div>
        </div>
        {/* UI Preview Surat Pernyataan */}
        <SuratPernyataanPreview formDataPreview={formData} detailProjectData={projectDetailData} />

        {/* Word Surat Pernyataan */}
        <ComponentWord />
      </div>
      <button className="button-simpan-blue" onClick={handleSubmitSuratPernyataan}>
        Simpan
      </button>
    </>
  );
};

export default forwardRef(SuratPernyataan);

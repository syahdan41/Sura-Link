import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SyaratKhususKontrakPreview from "./SyaratKhususKontrakPreview";
import addButton from "../../Assets/Images/add_button.png";
import removeButton from "../../Assets/Images/remove_button.png";
import SuccessModal from "../SuccesModal/SuccesModal";
import FailedModal from "../FailedModal/FailedModal";
import Spinner from "../Spinner/spinner";
import axios from "axios";
import SskkTable from "../../Assets/Images/tablesskk.png";
import html2pdf from "html2pdf.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import documentStyleMapping from "../../documentStyles";
import "./SyaratKhususKontrak.css";

const SyaratKhususKontrak = ({ documentId, projectDetailData, currFileType }, ref) => {
  const contentRef = useRef(null);
  // const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  console.log("doc id untuk sskk = ", documentId);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [inputFieldsPembayaranPrestasiPekerjaan, setInputFieldsPembayaranPrestasiPekerjaan] = useState([
    {
      tahapan_pembayaran: "",
      persentase_pembayaran: "",
      keterangan_pembayaran: "",
    },
  ]);
  const [inputFieldsDaftarSatuanTimpang, setInputFieldsDaftarSatuanTimpang] = useState([
    {
      mata_pembayaran: "",
      satuan: "",
      kuantitas: "",
      harga_satuan_hps: { raw: "", masked: "" },
      harga_satuan_penawaran: { raw: "", masked: "" },
      persentase_terhadap_hps: "",
      keterangan: "",
    },
  ]);

  const [inputFieldsPekerjaanUtama, setInputFieldsPekerjaanUtama] = useState([
    {
      pekerjaan_yang_disubkontrakan: "",
      nama_subkontraktor: "",
      alamat_subkontraktor: "",
      kualifikasi_subkontraktor: "",
      keterangan: "",
    },
  ]);

  const [inputFieldsPekerjaanBukanPekerjaanUtama, setInputFieldsPekerjaanBukanPekerjaanUtama] = useState([
    {
      pekerjaan_yang_disubkontrakan: "",
      nama_subkontraktor: "",
      alamat_subkontraktor: "",
      kualifikasi_subkontraktor: "",
      keterangan: "",
    },
  ]);

  const [inputFieldsDaftarPersonelManajerial, setInputFieldsDaftarPersonelManajerial] = useState([
    {
      nama_personel: "",
      jabatan_dalam_pekerjaan: "",
      tingkat_pendidikan: "",
      pengalaman_kerja: "",
      sertifikat_kompetensi: "",
      keterangan: "",
    },
  ]);

  const [inputFieldsDaftarPeralatanUtama, setInputFieldsDaftarPeralatanUtama] = useState([
    {
      nama_peralatan_utama: "",
      merek: "",
      kapasitas: "",
      jumlah: "",
      kondisi: "",
      status_kepemilikan: "",
      keterangan: "",
    },
  ]);

  const [formData, setFormData] = useState({
    website_pihak_1: "",
    fax_pihak_1: "",
    website_pihak_2: "",
    fax_pihak_2: "",
    masa_pelaksanaan_pekerjaan: "",
    masa_pelaksanaan_pekerjaan_terbilang: "",
    masa_pemeliharaan_pekerjaan: "",
    masa_pemeliharaan_pekerjaan_terbilang: "",
    waktu_penyerahan_gambar: "",
    waktu_pedoman_pengoperasian: "",
    kepemilikan_dokumen: "",
    fasilitas: "",
    peristiwa_kompensasi: "",
    penyesuaian_harga: "Penyesuaian harga …………….. [dipilih: diberikan/tidak diberikan] dalam hal diberikan maka rumusannya sebagai berikut:",
    pembayaran_tagihan:
      "Batas akhir waktu yang disepakati untuk penerbitan SPP oleh Pejabat Penandatangan Kontrak untuk pembayaran tagihan angsuran adalah 17 (Tujuh Belas) hari kerja terhitung sejak tagihan dan kelengkapan dokumen penunjang yang tidak diperselisihkan diterima oleh Pejabat Penandatangan Kontrak.",
    persetujuan_tindakan_penyedia: "Tindakan lain oleh Penyedia yang memerlukan persetujuan Pejabat Penandatangan Kontrak adalah Perubahan Spesifikasi, Volume, Ruang Lingkup, Jadwal Pelaksanaan Pekerjaan",
    persetujuan_tindakan_pengawas: "Tindakan lain oleh Penyedia yang memerlukan persetujuan Pengawas Pekerjaan adalah Perubahan Spesifikasi, Volume, Ruang Lingkup, Jadwal Pelaksanaan Pekerjaan, Pengajuan/Persetujuan sampel material/bahan",
    besaran_uang_muka: "Uang muka diberikan paling tinggi sebesar 30% (Tiga Puluh Persen) dari Harga Kontrak.",
    perselisihan_sengketa: "Penyelesaian perselisihan/sengketa para pihak dilakukan melalui layanan penyelesaian sengketa.",
    ketentuan_masa_pelaksanaan: [
      "1. Masa Pelaksanaan bagian pekerjaan (bagian Kontrak) …………… [diisi bagian pekerjaannya] selama ......... [diisi jumlah hari kalender dalam angka dan huruf] hari kalender terhitung sejak Tanggal Mulai Kerja yang tercantum dalam SPMK.",
      "2. Masa Pelaksanaan bagian pekerjaan (bagian Kontrak) …………… [diisi bagian pekerjaannya] selama ......... [diisi jumlah hari kalender dalam angka dan huruf] hari kalender terhitung sejak Tanggal Mulai Kerja yang tercantum dalam SPMK.",
      "3.Dst",
    ],
    list_serah_terima_pekerjaan: ["1......", "2......", "3......"],
    ketentuan_masa_pemeliharaan: [
      "1. Masa Pemeliharaan bagian pekerjaan (bagian Kontrak)…………… [diisi bagian pekerjaannya] selama ......... [diisi jumlah hari kalender dalam angka dan huruf] hari kalender terhitung sejak tanggal penyerahan pertama bagian pekerjaan …………… [diisi bagian pekerjaannya].",
      "2. Masa Pemeliharaan bagian pekerjaan (bagian Kontrak) …………… [diisi bagian pekerjaannya] selama ......... [diisi jumlah hari kalender dalam angka dan huruf] hari kalender terhitung sejak tanggal penyerahan pertama bagian pekerjaan …………… [diisi bagian pekerjaannya].",
      "3.Dst",
    ],
    hak_dan_kewajiban_penyedia: [
      "1.Penyedia bertanggung jawab terhadap spesifikasi pekerjaan",
      "2.Penyedia bertanggung jawab terhadap volume yang terpasang",
      "3.Penyedia bertanggung jawab terhadap metode pelaksanaan pekerjaan",
      "4.Penyedia bertanggung jawab terhadap jadwal pelaksanaan pekerjaan",
    ],
    dokumen_tagihan_prestasi: ["1.Laporan Kemajuan Pekerjaan", "2.Berita Acara Kemajuan Pekerjaan", "3.Berita Acara Serah Terima I (PHO) untuk Pembayaran 100% (Lunas)"],
    pembayaran_bahan_peralatan: ["1.....[diisi bahan/peralatan].... dibayar .......% dari harga satuan pekerjaan;", "2.....[diisi bahan/peralatan].... dibayar .......% dari harga satuan pekerjaan;", "3...............dst."],
    umur_konstruksi_gagal_bangunan: [
      "a.Bangunan Hasil Pekerjaan memiliki Umur Konstruksi selama 10 (Sepuluh) tahun sejak Tanggal Penyerahan Akhir Pekerjaan.",
      "b.Pertanggungan terhadap Kegagalan Bangunan ditetapkan selama 10 (Sepuluh) tahun sejak Tanggal Penyerahan Akhir Pekerjaan.",
    ],
  });

  const formatRupiah = (value) => (value ? `Rp ${new Intl.NumberFormat("id-ID").format(Number(value))}` : "");

  // fetch data surat ssskk
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (documentId) {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get_by_id/syarat_syarat_khusus_kontrak?id=${documentId}`);
          const rawData = response.data;

          // set by id

          const tahapanPembayaranList = rawData.tahapan_pembayaran_table_pembayaran_prestasi_pekerjaan ?? [];
          const persentasePembayaranList = rawData.besaran_persen_pembayaran_table_pembayaran_prestasi_pekerjaan ?? [];
          const keteranganPembayaranPrestasi = rawData.keterangan_pembayaran_table_pembayaran_prestasi_pekerjaan ?? [];

          const maxLengthPrestasiPekerjaan = Math.max(tahapanPembayaranList.length, persentasePembayaranList.length, keteranganPembayaranPrestasi.length);

          const initialDataPembayaranPrestasiPekerjaan = Array.from({ length: maxLengthPrestasiPekerjaan }).map((_, index) => ({
            tahapan_pembayaran: tahapanPembayaranList[index] ?? "",
            persentase_pembayaran: persentasePembayaranList[index] ?? "",
            keterangan_pembayaran: keteranganPembayaranPrestasi[index] ?? "",
          }));
          setInputFieldsPembayaranPrestasiPekerjaan(initialDataPembayaranPrestasiPekerjaan);

          const mataPembayaranList = rawData.mata_pembayaran_table_2_daftar_harga_satuan ?? [];
          const satuanList = rawData.satuan_table_2_daftar_harga_satuan ?? []; /// ini blom bisa di get karena gk ada var nya
          const kuantitasList = rawData.kuantitas_table_2_daftar_harga_satuan ?? [];
          const hargaSatuanHpsList = rawData.harga_satuan_hps_table_2_daftar_harga_satuan ?? [];
          const hargaSatuanPenawaranList = rawData.harga_satuan_penawaran_table_2_daftar_harga_satuan ?? [];
          const persentaseTerhadapHps = rawData.persen_terhadap_hps_table_2_daftar_harga_satuan ?? [];
          const keterangan = rawData.keterangan_table_2_daftar_harga_satuan ?? [];

          const maxLengthDaftarSatuanTimpang = Math.max(mataPembayaranList.length, satuanList.length, kuantitasList.length, hargaSatuanHpsList.length, hargaSatuanPenawaranList.length, persentaseTerhadapHps.length, keterangan.length);

          const initialDataDaftarSatuanTimpang = Array.from({ length: maxLengthDaftarSatuanTimpang }).map((_, index) => ({
            mata_pembayaran: mataPembayaranList[index] ?? "",
            satuan: satuanList[index] ?? "",
            kuantitas: kuantitasList[index] ?? "",
            harga_satuan_hps: {
              raw: hargaSatuanHpsList[index] ?? "",
              masked: formatRupiah(hargaSatuanHpsList[index]),
            },
            harga_satuan_penawaran: {
              raw: hargaSatuanPenawaranList[index] ?? "",
              masked: formatRupiah(hargaSatuanPenawaranList[index]),
            },
            persentase_terhadap_hps: persentaseTerhadapHps[index] ?? "",
            keterangan: keterangan[index] ?? "",
          }));
          setInputFieldsDaftarSatuanTimpang(initialDataDaftarSatuanTimpang);

          const pekerjaanList = rawData.bagian_pekerjaan_yang_disubkontrakan_table_3_pekerjaan_utama ?? [];
          const namaList = rawData.nama_subkontraktor_table_3_pekerjaan_utama ?? [];
          const alamatList = rawData.alamat_subkontraktor_table_3_pekerjaan_utama ?? [];
          const kualifikasiList = rawData.kualifikasi_subkontraktor_table_3_pekerjaan_utama ?? [];
          const keteranganList = rawData.keterangan_table_3_pekerjaan_utama ?? [];

          const maxLengthPekerjaanUtama = Math.max(pekerjaanList.length, namaList.length, alamatList.length, kualifikasiList.length, keteranganList.length);

          const initialDataPekerjaanUtama = Array.from({ length: maxLengthPekerjaanUtama }).map((_, index) => ({
            pekerjaan_yang_disubkontrakan: pekerjaanList[index] ?? "",
            nama_subkontraktor: namaList[index] ?? "",
            alamat_subkontraktor: alamatList[index] ?? "",
            kualifikasi_subkontraktor: kualifikasiList[index] ?? "",
            keterangan: keteranganList[index] ?? "",
          }));

          setInputFieldsPekerjaanUtama(initialDataPekerjaanUtama);

          const pekerjaanYangDisubkontrakanList = rawData.bagian_pekerjaan_yang_disubkontrakan_table_4_pekerjaan_bukan_pekerjaan_utama ?? [];
          const namaSubkontraktorList = rawData.nama_subkontraktor_table_4_pekerjaan_bukan_pekerjaan_utama ?? [];
          const alamatSubkontraktorList = rawData.alamat_subkontraktor_table_4_pekerjaan_bukan_pekerjaan_utama ?? [];
          const kualifikasiSubkontraktorList = rawData.kualifikasi_subkontraktor_table_4_pekerjaan_bukan_pekerjaan_utama ?? [];
          const keteranganPekerjanBukanPekerjaanUtamaList = rawData.keterangan_table_4_pekerjaan_bukan_pekerjaan_utama ?? [];

          const maxLengthPekerjaanBukanPekerjaanUtama = Math.max(
            pekerjaanYangDisubkontrakanList.length,
            namaSubkontraktorList.length,
            alamatSubkontraktorList.length,
            kualifikasiSubkontraktorList.length,
            keteranganPekerjanBukanPekerjaanUtamaList.length
          );
          const initialDataPekerjaanUtamaBukanPekerjaanUtama = Array.from({ length: maxLengthPekerjaanBukanPekerjaanUtama }).map((_, index) => ({
            pekerjaan_yang_disubkontrakan: pekerjaanYangDisubkontrakanList[index] ?? "",
            nama_subkontraktor: namaSubkontraktorList[index] ?? "",
            alamat_subkontraktor: alamatSubkontraktorList[index] ?? "",
            kualifikasi_subkontraktor: kualifikasiSubkontraktorList[index] ?? "",
            keterangan: keteranganPekerjanBukanPekerjaanUtamaList[index] ?? "",
          }));
          setInputFieldsPekerjaanBukanPekerjaanUtama(initialDataPekerjaanUtamaBukanPekerjaanUtama);

          const namaPersonelList = rawData.nama_personel_manajerial_table_5_daftar_personel_manajerial ?? [];
          const jabatanList = rawData.jabatan_dalam_pekerjaan_table_5_daftar_personel_manajerial ?? [];
          const pendidikanList = rawData.tingkat_pendidikan_ijazah_table_5_daftar_personel_manajerial ?? [];
          const pengalamanList = rawData.pengalaman_kerja_professional_table_5_daftar_personel_manajerial ?? [];
          const sertifikatList = rawData.sertifikat_kompetensi_kerja_table_5_daftar_personel_manajerial ?? [];
          const keteranganManajerial = rawData.keterangan_table_5_daftar_personel_manajerial ?? [];

          const maxLengtDaftarPersonelManajerial = (namaPersonelList.length, jabatanList.length, pendidikanList.length, pengalamanList.length, sertifikatList.length, keteranganManajerial.length);
          const initialDataDaftarPersonelManajerial = Array.from({ length: maxLengtDaftarPersonelManajerial }).map((_, index) => ({
            nama_personel: namaPersonelList[index] ?? "",
            jabatan_dalam_pekerjaan: jabatanList[index] ?? "",
            tingkat_pendidikan: pendidikanList[index] ?? "",
            pengalaman_kerja: pengalamanList[index] ?? "",
            sertifikat_kompetensi: sertifikatList[index] ?? "",
            keterangan: keteranganManajerial[index] ?? "",
          }));
          setInputFieldsDaftarPersonelManajerial(initialDataDaftarPersonelManajerial);

          const namaPeralatanList = rawData.nama_peralatan_utama_table_6_daftar_personel_manajerial ?? [];
          const merekPeralatanList = rawData.merek_dan_tipe_table_6_daftar_personel_manajerial ?? [];
          const kapasitasPeralatanList = rawData.kapasitas_table_6_daftar_personel_manajerial ?? [];
          const jumlahPeralatanList = rawData.jumlah_table_6_daftar_personel_manajerial ?? [];
          const kondisiPeralatanList = rawData.kondisi_table_6_daftar_personel_manajerial ?? [];
          const statusKepemilikanList = rawData.status_kepemilikan_table_6_daftar_personel_manajerial ?? [];
          const keteranganPeralatanList = rawData.keterangan_table_6_daftar_personel_manajerial ?? [];

          const maxLengtPeralatanUtama =
            (namaPeralatanList.length, merekPeralatanList.length, kapasitasPeralatanList.length, jumlahPeralatanList.length, kondisiPeralatanList.length, statusKepemilikanList.length, keteranganPeralatanList.length);
          const initialDataPeralatanUtama = Array.from({ length: maxLengtPeralatanUtama }).map((_, index) => ({
            nama_peralatan_utama: namaPeralatanList[index] ?? "",
            merek: merekPeralatanList[index] ?? "",
            kapasitas: kapasitasPeralatanList[index] ?? "",
            jumlah: jumlahPeralatanList[index] ?? "",
            kondisi: kondisiPeralatanList[index] ?? "",
            status_kepemilikan: statusKepemilikanList[index] ?? "",
            keterangan: keteranganPeralatanList[index] ?? "",
          }));
          setInputFieldsDaftarPeralatanUtama(initialDataPeralatanUtama);

          setFormData({
            website_pihak_1: rawData.website_pihak_1 || "",
            fax_pihak_1: rawData.fax_pihak_1 || "",
            website_pihak_2: rawData.website_pihak_2 || "",
            fax_pihak_2: rawData.fax_pihak_2 || "",
            masa_pelaksanaan_pekerjaan: rawData.masa_pelaksanaan_pekerjaan || "",
            masa_pelaksanaan_pekerjaan_terbilang: rawData.masa_pelaksanaan_pekerjaan_huruf || "",
            masa_pemeliharaan_pekerjaan: rawData.masa_pemeliharaan || "",
            masa_pemeliharaan_pekerjaan_terbilang: rawData.masa_pemeliharaan_terbilang || "",
            waktu_penyerahan_gambar: rawData.waktu_penyerahan_gambar || "",
            waktu_pedoman_pengoperasian: rawData.waktu_pedoman_pengoperasian || "",
            kepemilikan_dokumen: rawData.keterangan_kepemilikan_dokumen || "",
            fasilitas: rawData.fasilitas || "",
            peristiwa_kompensasi: rawData.peristiwa_kompensasi || "",
            penyesuaian_harga: rawData.penyesuaian_harga || "Penyesuaian harga …………….. [dipilih: diberikan/tidak diberikan] dalam hal diberikan maka rumusannya sebagai berikut:",
            pembayaran_tagihan:
              rawData.pembayaran_tagihan ||
              "Batas akhir waktu yang disepakati untuk penerbitan SPP oleh Pejabat Penandatangan Kontrak untuk pembayaran tagihan angsuran adalah 17 (Tujuh Belas) hari kerja terhitung sejak tagihan dan kelengkapan dokumen penunjang yang tidak diperselisihkan diterima oleh Pejabat Penandatangan Kontrak.",
            persetujuan_tindakan_penyedia:
              rawData.persetujuan_tindakan_penyedia || "Tindakan lain oleh Penyedia yang memerlukan persetujuan Pejabat Penandatangan Kontrak adalah Perubahan Spesifikasi, Volume, Ruang Lingkup, Jadwal Pelaksanaan Pekerjaan",
            persetujuan_tindakan_pengawas:
              rawData.persetujuan_tindakan_pengawas ||
              "Tindakan lain oleh Penyedia yang memerlukan persetujuan Pengawas Pekerjaan adalah Perubahan Spesifikasi, Volume, Ruang Lingkup, Jadwal Pelaksanaan Pekerjaan, Pengajuan/Persetujuan sampel material/bahan",
            besaran_uang_muka: rawData.besaran_uangmuka || "Uang muka diberikan paling tinggi sebesar 30% (Tiga Puluh Persen) dari Harga Kontrak.",
            perselisihan_sengketa: rawData.perselisihan_sengketa || "Penyelesaian perselisihan/sengketa para pihak dilakukan melalui layanan penyelesaian sengketa.",
            ketentuan_masa_pelaksanaan: rawData.ketentuan_masa_pelaksanaan || [
              "1. Masa Pelaksanaan bagian pekerjaan (bagian Kontrak) …………… [diisi bagian pekerjaannya] selama ......... [diisi jumlah hari kalender dalam angka dan huruf] hari kalender terhitung sejak Tanggal Mulai Kerja yang tercantum dalam SPMK.",
              "2. Masa Pelaksanaan bagian pekerjaan (bagian Kontrak) …………… [diisi bagian pekerjaannya] selama ......... [diisi jumlah hari kalender dalam angka dan huruf] hari kalender terhitung sejak Tanggal Mulai Kerja yang tercantum dalam SPMK.",
              "3.Dst",
            ],
            list_serah_terima_pekerjaan: rawData.list_serah_terima_pekerjaan || ["1."],
            ketentuan_masa_pemeliharaan: rawData.ketentuan_masa_pemeliharaan || [
              "1. Masa Pemeliharaan bagian pekerjaan (bagian Kontrak)…………… [diisi bagian pekerjaannya] selama ......... [diisi jumlah hari kalender dalam angka dan huruf] hari kalender terhitung sejak tanggal penyerahan pertama bagian pekerjaan …………… [diisi bagian pekerjaannya].",
              "2. Masa Pemeliharaan bagian pekerjaan (bagian Kontrak) …………… [diisi bagian pekerjaannya] selama ......... [diisi jumlah hari kalender dalam angka dan huruf] hari kalender terhitung sejak tanggal penyerahan pertama bagian pekerjaan …………… [diisi bagian pekerjaannya].",
              "3.Dst",
            ],
            hak_dan_kewajiban_penyedia: rawData.hak_dan_kewajiban_penyedia || [
              "1.Penyedia bertanggung jawab terhadap spesifikasi pekerjaan",
              "2.Penyedia bertanggung jawab terhadap volume yang terpasang",
              "3.Penyedia bertanggung jawab terhadap metode pelaksanaan pekerjaan",
              "4.Penyedia bertanggung jawab terhadap jadwal pelaksanaan pekerjaan",
            ],
            dokumen_tagihan_prestasi: rawData.dokumen_tagihan_prestasi || ["1.Laporan Kemajuan Pekerjaan", "2.Berita Acara Kemajuan Pekerjaan", "3.Berita Acara Serah Terima I (PHO) untuk Pembayaran 100% (Lunas)"],
            pembayaran_bahan_peralatan: rawData.pembayaran_bahan_peralatan || [
              "1.....[diisi bahan/peralatan].... dibayar .......% dari harga satuan pekerjaan;",
              "2.....[diisi bahan/peralatan].... dibayar .......% dari harga satuan pekerjaan;",
              "3...............dst.",
            ],
            umur_konstruksi_gagal_bangunan: rawData.umur_konstruksi_gagal_bangunan || [
              "a.Bangunan Hasil Pekerjaan memiliki Umur Konstruksi selama 10 (Sepuluh) tahun sejak Tanggal Penyerahan Akhir Pekerjaan.",
              "b.Pertanggungan terhadap Kegagalan Bangunan ditetapkan selama 10 (Sepuluh) tahun sejak Tanggal Penyerahan Akhir Pekerjaan.",
            ],
          });
        } else {
          setInputFieldsPembayaranPrestasiPekerjaan([
            {
              tahapan_pembayaran: "",
              persentase_pembayaran: "",
              keterangan_pembayaran: "",
            },
          ]);
          setInputFieldsDaftarSatuanTimpang([
            {
              mata_pembayaran: "",
              satuan: "",
              kuantitas: "",
              harga_satuan_hps: { raw: "", masked: "" },
              harga_satuan_penawaran: { raw: "", masked: "" },
              persentase_terhadap_hps: "",
              keterangan: "",
            },
          ]);
          setInputFieldsPekerjaanUtama([
            {
              pekerjaan_yang_disubkontrakan: "",
              nama_subkontraktor: "",
              alamat_subkontraktor: "",
              kualifikasi_subkontraktor: "",
              keterangan: "",
            },
          ]);
          setInputFieldsPekerjaanBukanPekerjaanUtama([
            {
              pekerjaan_yang_disubkontrakan: "",
              nama_subkontraktor: "",
              alamat_subkontraktor: "",
              kualifikasi_subkontraktor: "",
              keterangan: "",
            },
          ]);
          setInputFieldsDaftarPersonelManajerial([
            {
              nama_personel: "",
              jabatan_dalam_pekerjaan: "",
              tingkat_pendidikan: "",
              pengalaman_kerja: "",
              sertifikat_kompetensi: "",
              keterangan: "",
            },
          ]);
          setInputFieldsDaftarPeralatanUtama([
            {
              nama_peralatan_utama: "",
              merek: "",
              kapasitas: "",
              jumlah: "",
              kondisi: "",
              status_kepemilikan: "",
              keterangan: "",
            },
          ]);
          setFormData({
            website_pihak_1: "",
            fax_pihak_1: "",
            website_pihak_2: "",
            fax_pihak_2: "",
            masa_pelaksanaan_pekerjaan: "",
            masa_pelaksanaan_pekerjaan_terbilang: "",
            masa_pemeliharaan_pekerjaan: "",
            masa_pemeliharaan_pekerjaan_terbilang: "",
            waktu_penyerahan_gambar: "",
            waktu_pedoman_pengoperasian: "",
            kepemilikan_dokumen: "",
            fasilitas: "",
            peristiwa_kompensasi: "",
            penyesuaian_harga: "Penyesuaian harga …………….. [dipilih: diberikan/tidak diberikan] dalam hal diberikan maka rumusannya sebagai berikut:",
            pembayaran_tagihan:
              "Batas akhir waktu yang disepakati untuk penerbitan SPP oleh Pejabat Penandatangan Kontrak untuk pembayaran tagihan angsuran adalah 17 (Tujuh Belas) hari kerja terhitung sejak tagihan dan kelengkapan dokumen penunjang yang tidak diperselisihkan diterima oleh Pejabat Penandatangan Kontrak.",
            persetujuan_tindakan_penyedia: "Tindakan lain oleh Penyedia yang memerlukan persetujuan Pejabat Penandatangan Kontrak adalah Perubahan Spesifikasi, Volume, Ruang Lingkup, Jadwal Pelaksanaan Pekerjaan",
            persetujuan_tindakan_pengawas:
              "Tindakan lain oleh Penyedia yang memerlukan persetujuan Pengawas Pekerjaan adalah Perubahan Spesifikasi, Volume, Ruang Lingkup, Jadwal Pelaksanaan Pekerjaan, Pengajuan/Persetujuan sampel material/bahan",
            besaran_uang_muka: "Uang muka diberikan paling tinggi sebesar 30% (Tiga Puluh Persen) dari Harga Kontrak.",
            perselisihan_sengketa: "Penyelesaian perselisihan/sengketa para pihak dilakukan melalui layanan penyelesaian sengketa.",
            ketentuan_masa_pelaksanaan: [
              "1. Masa Pelaksanaan bagian pekerjaan (bagian Kontrak) …………… [diisi bagian pekerjaannya] selama ......... [diisi jumlah hari kalender dalam angka dan huruf] hari kalender terhitung sejak Tanggal Mulai Kerja yang tercantum dalam SPMK.",
              "2. Masa Pelaksanaan bagian pekerjaan (bagian Kontrak) …………… [diisi bagian pekerjaannya] selama ......... [diisi jumlah hari kalender dalam angka dan huruf] hari kalender terhitung sejak Tanggal Mulai Kerja yang tercantum dalam SPMK.",
              "3.Dst",
            ],
            list_serah_terima_pekerjaan: ["1......", "2......", "3......"],
            ketentuan_masa_pemeliharaan: [
              "1. Masa Pemeliharaan bagian pekerjaan (bagian Kontrak).........[diisi bagian pekerjaannya] selama ......... [diisi jumlah hari kalender dalam angka dan huruf] hari kalender terhitung sejak tanggal penyerahan pertama bagian pekerjaan .........[diisi bagian pekerjaannya].",
              "2. Masa Pemeliharaan bagian pekerjaan (bagian Kontrak) .........[diisi bagian pekerjaannya] selama ......... [diisi jumlah hari kalender dalam angka dan huruf] hari kalender terhitung sejak tanggal penyerahan pertama bagian pekerjaan .........[diisi bagian pekerjaannya].",
              "3.Dst",
            ],
            hak_dan_kewajiban_penyedia: [
              "1.Penyedia bertanggung jawab terhadap spesifikasi pekerjaan",
              "2.Penyedia bertanggung jawab terhadap volume yang terpasang",
              "3.Penyedia bertanggung jawab terhadap metode pelaksanaan pekerjaan",
              "4.Penyedia bertanggung jawab terhadap jadwal pelaksanaan pekerjaan",
            ],
            dokumen_tagihan_prestasi: ["1.Laporan Kemajuan Pekerjaan", "2.Berita Acara Kemajuan Pekerjaan", "3.Berita Acara Serah Terima I (PHO) untuk Pembayaran 100% (Lunas)"],
            pembayaran_bahan_peralatan: ["1.....[diisi bahan/peralatan].... dibayar .......% dari harga satuan pekerjaan;", "2.....[diisi bahan/peralatan].... dibayar .......% dari harga satuan pekerjaan;", "3...............dst."],
            umur_konstruksi_gagal_bangunan: [
              "a.Bangunan Hasil Pekerjaan memiliki Umur Konstruksi selama 10 (Sepuluh) tahun sejak Tanggal Penyerahan Akhir Pekerjaan.",
              "b.Pertanggungan terhadap Kegagalan Bangunan ditetapkan selama 10 (Sepuluh) tahun sejak Tanggal Penyerahan Akhir Pekerjaan.",
            ],
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

  // setup input pembayaran prestasi pekerjaan
  const handleChangePrestasiPembayaran = (index, e) => {
    const { name, value } = e.target;
    const updatedFields = [...inputFieldsPembayaranPrestasiPekerjaan];

    updatedFields[index][name] = value;
    setInputFieldsPembayaranPrestasiPekerjaan(updatedFields);

    // Hapus error saat user mulai ngetik
    setErrors((prev) => ({
      ...prev,
      [`${name}_${index}`]: "",
    }));
  };

  // Handle kehilangan fokus (onBlur)
  const handleBlurPrestasiPembayaran = (index, e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [`${name}_${index}`]: "Field ini harus diisi!",
      }));
    }
  };

  // Handle saat user mulai input (onFocus)
  const handleFocusPrestasiPembayaran = (index, e) => {
    setErrors((prev) => ({
      ...prev,
      [`${e.target.name}_${index}`]: "",
    }));
  };

  const handleAddFieldsPembayaranPrestasiPekerjaan = () => {
    setInputFieldsPembayaranPrestasiPekerjaan([
      ...inputFieldsPembayaranPrestasiPekerjaan,
      {
        tahapan_pembayaran: "",
        persentase_pembayaran: "",
        keterangan_pembayaran: "",
      },
    ]); // Tambahkan satu set input baru
  };

  const handleRemoveFieldsPembayaranPrestasiPekerjaan = () => {
    setInputFieldsPembayaranPrestasiPekerjaan((prevFields) => prevFields.slice(0, -1)); // Hapus elemen terakhir
  };
  // end of setup input pembayaran prestasi pekerjaan

  // handle validasi input field daftar satuan timpang
  const handleChangeDaftarHargaSatuanTimpang = (index, e) => {
    const { name, value } = e.target;
    const updatedFields = [...inputFieldsDaftarSatuanTimpang];

    if (name === "harga_satuan_hps" || name === "harga_satuan_penawaran") {
      // Format ke rupiah
      const rawValue = value.replace(/\D/g, ""); // Hapus semua karakter non-angka
      const formattedValue = rawValue ? `Rp ${new Intl.NumberFormat("id-ID").format(parseInt(rawValue, 10))}` : "";

      updatedFields[index][name] = { raw: rawValue, masked: formattedValue };
    } else {
      updatedFields[index][name] = value;
    }

    setInputFieldsDaftarSatuanTimpang(updatedFields);
  };

  const handleAddFieldsDaftarSatuanTimpang = () => {
    setInputFieldsDaftarSatuanTimpang([
      ...inputFieldsDaftarSatuanTimpang,
      {
        mata_pembayaran: "",
        satuan: "",
        kuantitas: "",
        harga_satuan_hps: "",
        harga_satuan_penawaran: "",
        persentase_terhadap_hps: "",
        keterangan: "",
      },
    ]); // Tambahkan satu set input baru
  };

  const handleRemoveFieldsDaftarSatuanTimpang = () => {
    setInputFieldsDaftarSatuanTimpang((prevFields) => prevFields.slice(0, -1)); // Hapus elemen terakhir
  };

  // end of validasi daftar satuan timpang

  // validasi pekerjaan utama
  const handleChangePekerjaanUtama = (index, e) => {
    const { name, value } = e.target;
    const updatedFields = [...inputFieldsPekerjaanUtama];

    updatedFields[index][name] = value;
    setInputFieldsPekerjaanUtama(updatedFields);
  };

  const handleAddFieldsPekerjaanUtama = () => {
    setInputFieldsPekerjaanUtama([
      ...inputFieldsPekerjaanUtama,
      {
        pekerjaan_yang_disubkontrakan: "",
        nama_subkontraktor: "",
        alamat_subkontraktor: "",
        kualifikasi_subkontraktor: "",
        keterangan: "",
      },
    ]); // Tambahkan satu set input baru
  };

  const handleRemoveFieldsPekerjaanUtama = () => {
    setInputFieldsPekerjaanUtama((prevFields) => prevFields.slice(0, -1)); // Hapus elemen terakhir
  };
  // end of validasi pekerjaan utama

  // validasi pekerjaan bukan pekerjaan utama
  const handleChangePekerjaanBukanPekerjaanUtama = (index, e) => {
    const { name, value } = e.target;
    const updatedFields = [...inputFieldsPekerjaanBukanPekerjaanUtama];

    updatedFields[index][name] = value;
    setInputFieldsPekerjaanBukanPekerjaanUtama(updatedFields);
  };

  const handleAddFieldsPekerjaanBukanPekerjaanUtama = () => {
    setInputFieldsPekerjaanBukanPekerjaanUtama([
      ...inputFieldsPekerjaanBukanPekerjaanUtama,
      {
        pekerjaan_yang_disubkontrakan: "",
        nama_subkontraktor: "",
        alamat_subkontraktor: "",
        kualifikasi_subkontraktor: "",
        keterangan: "",
      },
    ]); // Tambahkan satu set input baru
  };

  const handleRemoveFieldsPekerjaanBukanPekerjaanUtama = () => {
    setInputFieldsPekerjaanBukanPekerjaanUtama((prevFields) => prevFields.slice(0, -1)); // Hapus elemen terakhir
  };
  // end of validasi pekerjaan bukan pekerjaan utama

  // set up daftar personel management
  const handleChangeDaftarPersonelManajerial = (index, e) => {
    const { name, value } = e.target;
    const updatedFields = [...inputFieldsDaftarPersonelManajerial];

    updatedFields[index][name] = value;
    setInputFieldsDaftarPersonelManajerial(updatedFields);
  };

  const handleAddFieldsDaftarPersonelManajerial = () => {
    setInputFieldsDaftarPersonelManajerial([
      ...inputFieldsDaftarPersonelManajerial,
      {
        nama_personel: "",
        jabatan_dalam_pekerjaan: "",
        tingkat_pendidikan: "",
        pengalaman_kerja: "",
        sertifikat_kompetensi: "",
        keterangan: "",
      },
    ]); // Tambahkan satu set input baru
  };

  const handleRemoveFieldsDaftarPersonelManajerial = () => {
    setInputFieldsDaftarPersonelManajerial((prevFields) => prevFields.slice(0, -1)); // Hapus elemen terakhir
  };
  // end of setup daftar personel management

  // setup daftar peralatan utama
  const handleChangeDaftarPeralatanUtama = (index, e) => {
    const { name, value } = e.target;
    const updatedFields = [...inputFieldsDaftarPeralatanUtama];

    updatedFields[index][name] = value;
    setInputFieldsDaftarPeralatanUtama(updatedFields);
  };

  const handleAddFieldsDaftarPeralatanUtama = () => {
    setInputFieldsDaftarPeralatanUtama([
      ...inputFieldsDaftarPeralatanUtama,
      {
        nama_peralatan_utama: "",
        merek: "",
        kapasitas: "",
        jumlah: "",
        kondisi: "",
        status_kepemilikan: "",
        keterangan: "",
      },
    ]); // Tambahkan satu set input baru
  };
  const handleRemoveFieldsDaftarPeralatanUtama = () => {
    setInputFieldsDaftarPeralatanUtama((prevFields) => prevFields.slice(0, -1)); // Hapus elemen terakhir
  };
  // end of setup daftar peralatan utama

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Hapus error jika mulai mengetik di field mandatory
    if (
      [
        "masa_pelaksanaan_pekerjaan",
        "masa_pelaksanaan_pekerjaan_terbilang",
        "masa_pemeliharaan_pekerjaan",
        "masa_pemeliharaan_pekerjaan_terbilang",
        "penyesuaian_harga",
        "pembayaran_tagihan",
        "persetujuan_tindakan_penyedia",
        "persetujuan_tindakan_pengawas",
        "besaran_uang_muka",
        "perselisihan_sengketa",
        "kepemilikan_dokumen",
        "fasilitas",
        "peristiwa_kompensasi",
      ].includes(name)
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Hanya validasi field mandatory
    if (
      [
        "masa_pelaksanaan_pekerjaan",
        "masa_pelaksanaan_pekerjaan_terbilang",
        "masa_pemeliharaan_pekerjaan",
        "masa_pemeliharaan_pekerjaan_terbilang",
        "penyesuaian_harga",
        "pembayaran_tagihan",
        "persetujuan_tindakan_penyedia",
        "persetujuan_tindakan_pengawas",
        "besaran_uang_muka",
        "perselisihan_sengketa",
        "kepemilikan_dokumen",
        "fasilitas",
        "peristiwa_kompensasi",
      ].includes(name) &&
      !value.trim()
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Field ini harus diisi!",
      }));
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;

    // Hapus error saat user mulai fokus di field mandatory
    if (
      [
        "masa_pelaksanaan_pekerjaan",
        "masa_pelaksanaan_pekerjaan_terbilang",
        "masa_pemeliharaan_pekerjaan",
        "masa_pemeliharaan_pekerjaan_terbilang",
        "penyesuaian_harga",
        "pembayaran_tagihan",
        "persetujuan_tindakan_penyedia",
        "persetujuan_tindakan_pengawas",
        "besaran_uang_muka",
        "perselisihan_sengketa",
        "kepemilikan_dokumen",
        "fasilitas",
        "peristiwa_kompensasi",
      ].includes(name)
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

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

  const handleSubmitSyaratKhususKontrak = async () => {
    setLoading(true);
    let newErrors = {};
    let isValid = true;

    const optionalFields = ["waktu_pedoman_pengoperasian"];

    Object.keys(formData).forEach((key) => {
      if (optionalFields.includes(key)) return; // skip validasi

      let value = formData[key]?.raw ?? formData[key] ?? "";

      if (value instanceof Date) {
        value = value.toISOString();
      }

      if (typeof value === "string" && !value.trim()) {
        newErrors[key] = "Field ini harus diisi!";
        isValid = false;
        return;
      }

      if (Array.isArray(value) && value.length === 0) {
        newErrors[key] = "Field ini harus diisi!";
        isValid = false;
        return;
      }

      if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) {
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
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/put/syarat_syarat_khusus_kontrak?id=${documentId}`,
          {
            project_id: projectDetailData.id,
            ketentuan: "",
            pengaturan_dalam_sskk: "",
            masa_pelaksanaan_pekerjaan: formData.masa_pelaksanaan_pekerjaan,
            ketentuan_masa_pelaksanaan: formData.ketentuan_masa_pelaksanaan,
            masa_pemeliharaan: formData.masa_pemeliharaan_pekerjaan,
            list_serah_terima_pekerjaan: formData.list_serah_terima_pekerjaan,
            masa_pemeliharaan_pekerjaan: formData.ketentuan_masa_pemeliharaan,
            masukan_gambar_proyek: "url_gambar_proyek.jpg", //harusnya array bukan text
            waktu_pedoman_pengoperasian: formData.waktu_pedoman_pengoperasian,
            hak_dan_kewajiban_penyedia: formData.hak_dan_kewajiban_penyedia, //ini harusnya array
            keterangan_kepemilikan_dokumen: formData.kepemilikan_dokumen,
            fasilitas: formData.fasilitas,
            peristiwa_kompensasi: formData.peristiwa_kompensasi,
            masa_pelaksanaan_pekerjaan_huruf: formData.masa_pelaksanaan_pekerjaan,
            tahapan_pembayaran_table_pembayaran_prestasi_pekerjaan: inputFieldsPembayaranPrestasiPekerjaan.map((field) => field.tahapan_pembayaran).filter((tahapan_pembayaran) => tahapan_pembayaran.trim() !== ""),
            besaran_persen_pembayaran_table_pembayaran_prestasi_pekerjaan: inputFieldsPembayaranPrestasiPekerjaan.map((field) => field.persentase_pembayaran).filter((persentase_pembayaran) => persentase_pembayaran.trim() !== ""),
            keterangan_pembayaran_table_pembayaran_prestasi_pekerjaan: inputFieldsPembayaranPrestasiPekerjaan.map((field) => field.keterangan_pembayaran).filter((keterangan_pembayaran) => keterangan_pembayaran.trim() !== ""),
            nama_bahan_baku_table_pembayaran_bahan_peralatan: formData.pembayaran_bahan_peralatan,
            satuan_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.satuan).filter((satuan) => satuan.trim() !== ""),
            mata_pembayaran_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.mata_pembayaran).filter((mata_pembayaran) => mata_pembayaran.trim() !== ""),
            kuantitas_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.kuantitas).filter((kuantitas) => kuantitas.trim() !== ""),
            harga_satuan_hps_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.harga_satuan_hps.raw).filter((harga_satuan_hps) => harga_satuan_hps.trim() !== ""),
            harga_satuan_penawaran_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.harga_satuan_penawaran.raw).filter((harga_satuan_penawaran) => harga_satuan_penawaran.trim() !== ""),
            persen_terhadap_hps_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.persentase_terhadap_hps).filter((persentase_terhadap_hps) => persentase_terhadap_hps.trim() !== ""),
            keterangan_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
            bagian_pekerjaan_yang_disubkontrakan_table_3_pekerjaan_utama: inputFieldsPekerjaanUtama.map((field) => field.pekerjaan_yang_disubkontrakan).filter((pekerjaan_yang_disubkontrakan) => pekerjaan_yang_disubkontrakan.trim() !== ""),
            nama_subkontraktor_table_3_pekerjaan_utama: inputFieldsPekerjaanUtama.map((field) => field.nama_subkontraktor).filter((nama_subkontraktor) => nama_subkontraktor.trim() !== ""),
            alamat_subkontraktor_table_3_pekerjaan_utama: inputFieldsPekerjaanUtama.map((field) => field.alamat_subkontraktor).filter((alamat_subkontraktor) => alamat_subkontraktor.trim() !== ""),
            kualifikasi_subkontraktor_table_3_pekerjaan_utama: inputFieldsPekerjaanUtama.map((field) => field.kualifikasi_subkontraktor).filter((kualifikasi_subkontraktor) => kualifikasi_subkontraktor.trim() !== ""),
            keterangan_table_3_pekerjaan_utama: inputFieldsPekerjaanUtama.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
            bagian_pekerjaan_yang_disubkontrakan_table_4_pekerjaan_bukan_pekerjaan_utama: inputFieldsPekerjaanBukanPekerjaanUtama
              .map((field) => field.pekerjaan_yang_disubkontrakan)
              .filter((pekerjaan_yang_disubkontrakan) => pekerjaan_yang_disubkontrakan.trim() !== ""),
            nama_subkontraktor_table_4_pekerjaan_bukan_pekerjaan_utama: inputFieldsPekerjaanBukanPekerjaanUtama.map((field) => field.nama_subkontraktor).filter((nama_subkontraktor) => nama_subkontraktor.trim() !== ""),
            alamat_subkontraktor_table_4_pekerjaan_bukan_pekerjaan_utama: inputFieldsPekerjaanBukanPekerjaanUtama.map((field) => field.alamat_subkontraktor).filter((alamat_subkontraktor) => alamat_subkontraktor.trim() !== ""),
            kualifikasi_subkontraktor_table_4_pekerjaan_bukan_pekerjaan_utama: inputFieldsPekerjaanBukanPekerjaanUtama
              .map((field) => field.kualifikasi_subkontraktor)
              .filter((kualifikasi_subkontraktor) => kualifikasi_subkontraktor.trim() !== ""),
            keterangan_table_4_pekerjaan_bukan_pekerjaan_utama: inputFieldsPekerjaanBukanPekerjaanUtama.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
            nama_personel_manajerial_table_5_daftar_personel_manajerial: inputFieldsDaftarPersonelManajerial.map((field) => field.nama_personel).filter((nama_personel) => nama_personel.trim() !== ""),
            jabatan_dalam_pekerjaan_table_5_daftar_personel_manajerial: inputFieldsDaftarPersonelManajerial.map((field) => field.jabatan_dalam_pekerjaan).filter((jabatan_dalam_pekerjaan) => jabatan_dalam_pekerjaan.trim() !== ""),
            tingkat_pendidikan_ijazah_table_5_daftar_personel_manajerial: inputFieldsDaftarPersonelManajerial.map((field) => field.tingkat_pendidikan).filter((tingkat_pendidikan) => tingkat_pendidikan.trim() !== ""),
            pengalaman_kerja_professional_table_5_daftar_personel_manajerial: inputFieldsDaftarPersonelManajerial.map((field) => field.pengalaman_kerja).filter((pengalaman_kerja) => pengalaman_kerja.trim() !== ""),
            sertifikat_kompetensi_kerja_table_5_daftar_personel_manajerial: inputFieldsDaftarPersonelManajerial.map((field) => field.sertifikat_kompetensi).filter((sertifikat_kompetensi) => sertifikat_kompetensi.trim() !== ""),
            keterangan_table_5_daftar_personel_manajerial: inputFieldsDaftarPersonelManajerial.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
            nama_peralatan_utama_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.nama_peralatan_utama).filter((nama_peralatan_utama) => nama_peralatan_utama.trim() !== ""),
            merek_dan_tipe_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.merek).filter((merek) => merek.trim() !== ""),
            kapasitas_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.kapasitas).filter((kapasitas) => kapasitas.trim() !== ""),
            jumlah_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.jumlah).filter((jumlah) => jumlah.trim() !== ""),
            kondisi_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.kondisi).filter((kondisi) => kondisi.trim() !== ""),
            status_kepemilikan_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.status_kepemilikan).filter((status_kepemilikan) => status_kepemilikan.trim() !== ""),
            keterangan_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
            website_pihak_1: formData.website_pihak_1,
            fax_pihak_1: formData.fax_pihak_1,
            website_pihak_2: formData.website_pihak_2,
            fax_pihak_2: formData.fax_pihak_2,
            masa_pemeliharaan_terbilang: formData.masa_pemeliharaan_pekerjaan_terbilang,
            waktu_penyerahan_gambar: formData.waktu_penyerahan_gambar,
            penyesuaian_harga: formData.penyesuaian_harga,
            pembayaran_tagihan: formData.pembayaran_tagihan,
            persetujuan_tindakan_penyedia: formData.persetujuan_tindakan_penyedia,
            persetujuan_tindakan_pengawas: formData.persetujuan_tindakan_pengawas,
            besaran_uangmuka: formData.besaran_uang_muka,
            dokumen_tagihan_prestasi: formData.dokumen_tagihan_prestasi,
            pembayaran_bahan_peralatan: formData.pembayaran_bahan_peralatan,
            umur_konstruksi_gagal_bangunan: formData.umur_konstruksi_gagal_bangunan,
            perselisihan_sengketa: formData.perselisihan_sengketa,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        setLoading(false);
        console.log("✅ Syarat Khusus Kontrak Berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        setLoading(false);
        console.error("❌ Gagal membuat Syarat Khusus Kontrak:", error);
        setIsFailedModalOpen(true);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/dynamic/crud/post/syarat_syarat_khusus_kontrak`,
          {
            project_id: projectDetailData.id,
            ketentuan: "",
            pengaturan_dalam_sskk: "",
            masa_pelaksanaan_pekerjaan: formData.masa_pelaksanaan_pekerjaan,
            ketentuan_masa_pelaksanaan: formData.ketentuan_masa_pelaksanaan,
            masa_pemeliharaan: formData.masa_pemeliharaan_pekerjaan,
            list_serah_terima_pekerjaan: formData.list_serah_terima_pekerjaan,
            masa_pemeliharaan_pekerjaan: formData.ketentuan_masa_pemeliharaan,
            masukan_gambar_proyek: "url_gambar_proyek.jpg", //harusnya array bukan text
            waktu_pedoman_pengoperasian: formData.waktu_pedoman_pengoperasian,
            hak_dan_kewajiban_penyedia: formData.hak_dan_kewajiban_penyedia, //ini harusnya array
            keterangan_kepemilikan_dokumen: formData.kepemilikan_dokumen,
            fasilitas: formData.fasilitas,
            peristiwa_kompensasi: formData.peristiwa_kompensasi,
            masa_pelaksanaan_pekerjaan_huruf: formData.masa_pelaksanaan_pekerjaan,
            tahapan_pembayaran_table_pembayaran_prestasi_pekerjaan: inputFieldsPembayaranPrestasiPekerjaan.map((field) => field.tahapan_pembayaran).filter((tahapan_pembayaran) => tahapan_pembayaran.trim() !== ""),
            besaran_persen_pembayaran_table_pembayaran_prestasi_pekerjaan: inputFieldsPembayaranPrestasiPekerjaan.map((field) => field.persentase_pembayaran).filter((persentase_pembayaran) => persentase_pembayaran.trim() !== ""),
            keterangan_pembayaran_table_pembayaran_prestasi_pekerjaan: inputFieldsPembayaranPrestasiPekerjaan.map((field) => field.keterangan_pembayaran).filter((keterangan_pembayaran) => keterangan_pembayaran.trim() !== ""),
            nama_bahan_baku_table_pembayaran_bahan_peralatan: formData.pembayaran_bahan_peralatan,
            satuan_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.satuan).filter((satuan) => satuan.trim() !== ""),
            mata_pembayaran_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.mata_pembayaran).filter((mata_pembayaran) => mata_pembayaran.trim() !== ""),
            kuantitas_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.kuantitas).filter((kuantitas) => kuantitas.trim() !== ""),
            harga_satuan_hps_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.harga_satuan_hps.raw).filter((harga_satuan_hps) => harga_satuan_hps.trim() !== ""),
            harga_satuan_penawaran_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.harga_satuan_penawaran.raw).filter((harga_satuan_penawaran) => harga_satuan_penawaran.trim() !== ""),
            persen_terhadap_hps_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.persentase_terhadap_hps).filter((persentase_terhadap_hps) => persentase_terhadap_hps.trim() !== ""),
            keterangan_table_2_daftar_harga_satuan: inputFieldsDaftarSatuanTimpang.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
            bagian_pekerjaan_yang_disubkontrakan_table_3_pekerjaan_utama: inputFieldsPekerjaanUtama.map((field) => field.pekerjaan_yang_disubkontrakan).filter((pekerjaan_yang_disubkontrakan) => pekerjaan_yang_disubkontrakan.trim() !== ""),
            nama_subkontraktor_table_3_pekerjaan_utama: inputFieldsPekerjaanUtama.map((field) => field.nama_subkontraktor).filter((nama_subkontraktor) => nama_subkontraktor.trim() !== ""),
            alamat_subkontraktor_table_3_pekerjaan_utama: inputFieldsPekerjaanUtama.map((field) => field.alamat_subkontraktor).filter((alamat_subkontraktor) => alamat_subkontraktor.trim() !== ""),
            kualifikasi_subkontraktor_table_3_pekerjaan_utama: inputFieldsPekerjaanUtama.map((field) => field.kualifikasi_subkontraktor).filter((kualifikasi_subkontraktor) => kualifikasi_subkontraktor.trim() !== ""),
            keterangan_table_3_pekerjaan_utama: inputFieldsPekerjaanUtama.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
            bagian_pekerjaan_yang_disubkontrakan_table_4_pekerjaan_bukan_pekerjaan_utama: inputFieldsPekerjaanBukanPekerjaanUtama
              .map((field) => field.pekerjaan_yang_disubkontrakan)
              .filter((pekerjaan_yang_disubkontrakan) => pekerjaan_yang_disubkontrakan.trim() !== ""),
            nama_subkontraktor_table_4_pekerjaan_bukan_pekerjaan_utama: inputFieldsPekerjaanBukanPekerjaanUtama.map((field) => field.nama_subkontraktor).filter((nama_subkontraktor) => nama_subkontraktor.trim() !== ""),
            alamat_subkontraktor_table_4_pekerjaan_bukan_pekerjaan_utama: inputFieldsPekerjaanBukanPekerjaanUtama.map((field) => field.alamat_subkontraktor).filter((alamat_subkontraktor) => alamat_subkontraktor.trim() !== ""),
            kualifikasi_subkontraktor_table_4_pekerjaan_bukan_pekerjaan_utama: inputFieldsPekerjaanBukanPekerjaanUtama
              .map((field) => field.kualifikasi_subkontraktor)
              .filter((kualifikasi_subkontraktor) => kualifikasi_subkontraktor.trim() !== ""),
            keterangan_table_4_pekerjaan_bukan_pekerjaan_utama: inputFieldsPekerjaanBukanPekerjaanUtama.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
            nama_personel_manajerial_table_5_daftar_personel_manajerial: inputFieldsDaftarPersonelManajerial.map((field) => field.nama_personel).filter((nama_personel) => nama_personel.trim() !== ""),
            jabatan_dalam_pekerjaan_table_5_daftar_personel_manajerial: inputFieldsDaftarPersonelManajerial.map((field) => field.jabatan_dalam_pekerjaan).filter((jabatan_dalam_pekerjaan) => jabatan_dalam_pekerjaan.trim() !== ""),
            tingkat_pendidikan_ijazah_table_5_daftar_personel_manajerial: inputFieldsDaftarPersonelManajerial.map((field) => field.tingkat_pendidikan).filter((tingkat_pendidikan) => tingkat_pendidikan.trim() !== ""),
            pengalaman_kerja_professional_table_5_daftar_personel_manajerial: inputFieldsDaftarPersonelManajerial.map((field) => field.pengalaman_kerja).filter((pengalaman_kerja) => pengalaman_kerja.trim() !== ""),
            sertifikat_kompetensi_kerja_table_5_daftar_personel_manajerial: inputFieldsDaftarPersonelManajerial.map((field) => field.sertifikat_kompetensi).filter((sertifikat_kompetensi) => sertifikat_kompetensi.trim() !== ""),
            keterangan_table_5_daftar_personel_manajerial: inputFieldsDaftarPersonelManajerial.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
            nama_peralatan_utama_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.nama_peralatan_utama).filter((nama_peralatan_utama) => nama_peralatan_utama.trim() !== ""),
            merek_dan_tipe_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.merek).filter((merek) => merek.trim() !== ""),
            kapasitas_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.kapasitas).filter((kapasitas) => kapasitas.trim() !== ""),
            jumlah_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.jumlah).filter((jumlah) => jumlah.trim() !== ""),
            kondisi_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.kondisi).filter((kondisi) => kondisi.trim() !== ""),
            status_kepemilikan_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.status_kepemilikan).filter((status_kepemilikan) => status_kepemilikan.trim() !== ""),
            keterangan_table_6_daftar_personel_manajerial: inputFieldsDaftarPeralatanUtama.map((field) => field.keterangan).filter((keterangan) => keterangan.trim() !== ""),
            website_pihak_1: formData.website_pihak_1,
            fax_pihak_1: formData.fax_pihak_1,
            website_pihak_2: formData.website_pihak_2,
            fax_pihak_2: formData.fax_pihak_2,
            masa_pemeliharaan_terbilang: formData.masa_pemeliharaan_pekerjaan_terbilang,
            waktu_penyerahan_gambar: formData.waktu_penyerahan_gambar,
            penyesuaian_harga: formData.penyesuaian_harga,
            pembayaran_tagihan: formData.pembayaran_tagihan,
            persetujuan_tindakan_penyedia: formData.persetujuan_tindakan_penyedia,
            persetujuan_tindakan_pengawas: formData.persetujuan_tindakan_pengawas,
            besaran_uangmuka: formData.besaran_uang_muka,
            dokumen_tagihan_prestasi: formData.dokumen_tagihan_prestasi,
            pembayaran_bahan_peralatan: formData.pembayaran_bahan_peralatan,
            umur_konstruksi_gagal_bangunan: formData.umur_konstruksi_gagal_bangunan,
            perselisihan_sengketa: formData.perselisihan_sengketa,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        setLoading(false);
        console.log("✅ Syarat Khusus Kontrak Berhasil dibuat:", response.data);
        setIsSuccessModalOpen(true);
      } catch (error) {
        setLoading(false);
        console.error("❌ Gagal membuat Syarat Khusus Kontrak:", error);
        setIsFailedModalOpen(true);
      }
    }
  };

  // const handleUploadImage = () => {
  //   const input = document.getElementById("imageUpload");
  //   if (input) {
  //     input.click(); // Trigger buka file explorer
  //   }
  // };

  // const handleFileChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   const newImages = files.map((file) => ({
  //     file,
  //     fileName: file.name,
  //     url: URL.createObjectURL(file), // optional buat preview cepat
  //   }));

  //   setUploadedImages((prev) => [...prev, ...newImages]);
  // };

  // const handleDeleteImage = (index) => {
  //   setUploadedImages((prev) => prev.filter((_, idx) => idx !== index));
  // };

  const ComponentWord = () => {
    return (
      <div style={{ display: "none" }}>
        <div ref={contentRef}>
          {currFileType !== "word" && (
            <>
              <div>
                <div className="skk-page-tittle">SYARAT-SYARAT KHUSUS KONTRAK (SSKK)</div>
                <div className="border-separator-black-skk"></div>
                <div className="skk-table-container">
                  <table className="skk-table">
                    <thead>
                      <tr>
                        <th>Pasal dalam SSUK</th>
                        <th>Ketentuan</th>
                        <th>Pengaturan dalam SSKK</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>4.1 & 4.2</td>
                        <td>Korespondensi</td>
                        <td>
                          <div className="sskk-alamat-container">
                            <div className="sskk-section">
                              <div className="sskk-title">Alamat Para Pihak sebagai berikut:</div>

                              <br />
                              <div>Satuan Kerja Pejabat Penandatangan Kontrak:</div>
                              <div className="sskk-row">
                                <span className="sskk-label">Nama</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.perusahaan_pihak_1 || "(Nama Perusahaan Pihak 1)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Alamat</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Website</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{formData.website_pihak_1 || "(Website Pihak 1)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">E-mail</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.email_pihak_1 || "(Email Pihak 1)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Faksimili</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{formData.fax_pihak_1 || "(Website Pihak 1)"}</span>
                                </span>
                              </div>

                              <br />
                              <div className="sskk-title">Penyedia:</div>
                              <div className="sskk-row">
                                <span className="sskk-label">Nama</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Alamat</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.alamat_pihak_2 || "(Alamat pihak 2)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">E-mail</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.email_pihak_2 || "(Email pihak 2)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Faksimili</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{formData.fax_pihak_2 || "(Fax pihak 2)"}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>4.2 & 5.1</td>
                        <td>Wakil sah para pihak</td>
                        <td>
                          <div className="sskk-alamat-container">
                            <div className="sskk-section">
                              <div className="sskk-title">Wakil Sah Para Pihak sebagai berikut:</div>

                              <br />
                              <div>Untuk Pejabat Penandatangan Kontrak:</div>
                              <div className="sskk-row">
                                <span className="sskk-label">Nama</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Jabatan</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan pihak 1)"}</span>
                                </span>
                              </div>

                              <br />
                              <div className="sskk-title">Untuk Penyedia:</div>
                              <div className="sskk-row">
                                <span className="sskk-label">Nama</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.nama_pihak_2 || "(Nama pihak 2)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Jabatan</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan pihak 2)"}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>6.3.2 & 6.3.3 44.4 & 44.6</td>
                        <td>Pencairan Jaminan</td>
                        <td>
                          <div className="regular-text-value">Jaminan dicairkan dan disetorkan pada Universitas Bengkulu</div>
                        </td>
                      </tr>
                      <tr>
                        <td>27.1</td>
                        <td>Masa Pelaksanaan</td>
                        <td>
                          <div className="regular-text-value">
                            Masa Pelaksanaan selama <span>{formData.masa_pelaksanaan_pekerjaan || "(Masa Pelaksanaan Pekerjaan)"}</span> (<span>{formData.masa_pelaksanaan_pekerjaan_terbilang || "(Terbilang)"}</span>) hari kalender terhitung
                            sejak Tanggal Mulai Kerja yang tercantum dalam SPMK.
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>27.4</td>
                        <td>Masa Pelaksanaan untuk Serah Terima Sebagian Pekerjaan (Bagian Kontrak)</td>
                        <td>
                          <div className="regular-text-perpoint">
                            {formData.ketentuan_masa_pelaksanaan.map((item, index) => (
                              <div className="regular-text-value" key={index}>
                                {item}
                              </div>
                            ))}
                            <div className="regular-text-value">
                              <em>Catatan: Ketentuan di atas diisi apabila diberlakukan serah terima sebagian pekerjaan (secara parsial) sesuai dengan yang dicantumkan dalam dokumen pemilihan (rancangan kontrak)</em>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="skk-table-container">
                  <table className="skk-table">
                    <tbody>
                      <tr>
                        <td>33.8</td>
                        <td>Masa Pemeliharaan</td>
                        <td>
                          <div className="regular-text-value">
                            Masa Pemeliharaan berlaku selama <span>{formData.masa_pemeliharaan_pekerjaan || "(Masa Pemeliharaan Pekerjaan)"}</span> [<span>{formData.masa_pemeliharaan_pekerjaan_terbilang || "(Terbilang)"}</span>] hari
                            kalender terhitung sejak Tanggal Penyerahan Pertama Pekerjaan (PHO).
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>33.19</td>
                        <td>Serah Terima Sebagian Pekerjaan (Bagian Kontrak)</td>
                        <td>
                          <div className="regular-text-value">Dalam Kontrak ini diberlakukan serah terima pekerjaan sebagian atau secara parsial untuk bagian kontrak sebagai berikut:</div>
                          <div className="regular-text-perpoint">
                            {formData.list_serah_terima_pekerjaan.map((item, index) => (
                              <div className="regular-text-value" key={index}>
                                {item}
                              </div>
                            ))}
                            <div className="regular-text-value">
                              <em>diisi bagian pekerjaan yang akan dilakukan serah terima sebagian pekerjaan (secara parsial sesuai dengan yang dicantumkan dalam dokumen pemilihan (rancangan kontrak)</em>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>33.22</td>
                        <td>Masa Pemeliharaan untuk Serah Terima Sebagian Pekerjaan (Bagian Kontrak)</td>
                        <td>
                          <div className="regular-text-perpoint">
                            {formData.ketentuan_masa_pemeliharaan.map((item, index) => (
                              <div className="regular-text-value" key={index}>
                                {item}
                              </div>
                            ))}
                            <div className="regular-text-value">
                              <em>Catatan: Ketentuan di atas diisi apabila diberlakukan serah terima sebagian pekerjaan (secara parsial) dan sudah ditetapkan dalam Dokumen Pemilihan.</em>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>35.1</td>
                        <td>Gambar As Built dan Pedoman Pengoperasian dan Perawatan/ Pemeliharaan</td>
                        <td>
                          <div className="regular-text-value">
                            Gambar As built diserahkan paling lambat <span>{formData.waktu_penyerahan_gambar || "..... (...... dalam huruf .........)"}</span>
                          </div>
                          <br />
                          <div className="regular-text-value">
                            dan/atau pedoman pengoperasian dan perawatan/pemeliharaan harus diserahkan paling lambat <span>{formData.waktu_pedoman_pengoperasian || "..... (...... dalam huruf .........)"}</span> hari kalender setelah Tanggal
                            Penyerahan Pertama Pekerjaan.
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="skk-table-container">
                <table className="skk-table">
                  <tbody>
                    <tr>
                      <td>38.7</td>
                      <td>Penyesuaian Harga</td>
                      <td>
                        <div className="regular-text-value">
                          <span>{formData.penyesuaian_harga || "-"}</span>
                        </div>
                        <table class="sskk-inner-table">
                          <tr>
                            <th>Hn</th>
                            <th>=</th>
                            <th>Ho (a+b.Bn/Bo+c.Cn/Co+d.Dn/Do+.....)</th>
                          </tr>
                          <tr>
                            <td>Hn</td>
                            <td>=</td>
                            <td>Harga Satuan pada saat pekerjaan dilaksanakan;</td>
                          </tr>
                          <tr>
                            <td>Ho</td>
                            <td>=</td>
                            <td>Harga Satuan pada saat harga penawaran;</td>
                          </tr>
                          <tr>
                            <td>A</td>
                            <td>=</td>
                            <td>Koefisien tetap yang terdiri atas keuntungan dan overhead, dalam hal penawaran tidak mencantumkan besaran komponen keuntungan dan overhead maka a = 0,15</td>
                          </tr>
                          <tr>
                            <td>b, c, d</td>
                            <td>=</td>
                            <td>Koefisien komponen kontrak seperti tenaga kerja, bahan, alat kerja, dsb; Penjumlahan a+b+c+d+....dst adalah 1,00</td>
                          </tr>
                          <tr>
                            <td>Bn, Cn, Dn</td>
                            <td>=</td>
                            <td>Indeks harga komponen pada bulan saat pekerjaan dilaksanakan</td>
                          </tr>
                          <tr>
                            <td>Bo, Co, Do</td>
                            <td>=</td>
                            <td>Indeks harga komponen pada bulan penyampaian penawaran.</td>
                          </tr>
                        </table>
                        <div className="regular-text-value">Rumusan tersebut diatas memperhatikan hal-hal sebagai berikut: </div>
                        <div className="rumusan-text-sskk">
                          <div className="regular-text-value">
                            a) Penetapan koefisien bahan, tenaga kerja, alat kerja, bahan bakar, dan sebagainya ditetapkan <strong>seperti contoh sebagai berikut:</strong>{" "}
                          </div>
                          <img src={SskkTable} alt="table-inner" />
                          <div className="regular-text-value">
                            b) Koefisien komponen kontrak ditetapkan oleh Pejabat Penandatangan Kontrak dari perbandingan antara harga bahan, tenaga kerja, alat kerja, dan sebagainya (apabila ada) terhadap Harga Satuan dari pembobotan HPS
                            dan dicantumkan dalam Dokumen Pemilihan (Rancangan Kontrak).
                          </div>
                          <div className="regular-text-value">c) Indeks harga yang digunakan bersumber dari penerbitan BPS.</div>
                          <div className="regular-text-value">d) Dalam hal indeks harga tidak dimuat dalam penerbitan BPS, digunakan indeks harga yang dikeluarkan oleh instansi teknis.</div>
                          <div className="regular-text-value">e) Rumusan penyesuaian Harga Kontrak ditetapkan sebagai berikut:</div>
                          <div className="rumusan-text-sskk-sub-item">
                            <div className="regular-text-value">Pn = (Hn1xV1)+(Hn2xV2)+(Hn3xV3)+.... dst .</div>
                            <div className="regular-text-value">Pn = Harga Kontrak setelah dilakukan penyesuaian Harga Satuan;</div>
                            <div className="regular-text-value">Hn = Harga Satuan baru setiap jenis komponen pekerjaan setelah dilakukan penyesuaian harga menggunakan rumusan penyesuaian Harga Satuan;</div>
                            <div className="regular-text-value">V = Volume setiap jenis komponen pekerjaan yang dilaksanakan.</div>
                          </div>
                          <div className="regular-text-value">
                            f) Pembayaran penyesuaian harga dilakukan oleh Pejabat Penandatangan Kontrak, apabila Penyedia telah mengajukan tagihan disertai perhitungan beserta data-data dan telah dilakukan audit sesuai dengan ketentuan
                            peraturan perundang-undangan.
                          </div>
                          <div className="regular-text-value">g) Penyedia dapat mengajukan tagihan secara berkala paling cepat 6 (enam) bulan setelah pekerjaan yang diberikan penyesuaian harga tersebut dilaksanakan.</div>
                          <div className="regular-text-value">
                            h) Pembayaran penyesuaian harga dilakukan oleh Pejabat Penandatangan Kontrak, apabila Penyedia telah mengajukan tagihan disertai perhitungan beserta data-data dan telah dilakukan audit sesuai dengan ketentuan
                            peraturan perundang-undangan.
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="skk-table-container">
                <table className="skk-table">
                  <tbody>
                    <tr>
                      <td>45.2</td>
                      <td>Pembayaran Tagihan</td>
                      <td>
                        <div className="regular-text-value">
                          <span>{formData.pembayaran_tagihan || "(Pembayaran Tagihan)"}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>49.i</td>
                      <td>Hak dan Kewajiban Penyedia</td>
                      <td>
                        <div className="regular-text-value">Hak dan kewajiban Penyedia :</div>
                        <div className="rumusan-text-sskk">
                          {formData.hak_dan_kewajiban_penyedia.map((item, index) => (
                            <div className="regular-text-value" key={index}>
                              {item}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>56.3</td>
                      <td>Tindakan Penyedia yang Mensyaratkan Persetujuan Pejabat Penandatangan Kontrak</td>
                      <td>
                        <div className="regular-text-value">
                          <span>{formData.persetujuan_tindakan_penyedia || "(Persetujuan Tindakan Penyedia)"}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>56.3</td>
                      <td>Tindakan Penyedia yang Mensyaratkan Persetujuan Pengawas Pekerjaan</td>
                      <td>
                        <div className="regular-text-value">
                          <span>{formData.persetujuan_tindakan_pengawas || "(Persetujuan Tindakan Pengawas)"}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>58.</td>
                      <td>Kepemilikan Dokumen</td>
                      <td>
                        <div className="regular-text-value">Penyedia diperbolehkan menggunakan salinan dokumen dan piranti lunak yang dihasilkan dari Pekerjaan Konstruksi ini dengan pembatasan sebagai berikut:</div>
                        <div className="regular-text-value">
                          {formData.kepemilikan_dokumen ? (
                            <span>{formData.kepemilikan_dokumen}</span>
                          ) : (
                            <em>.................... [diisi batasan/ketentuan yang dibolehkan dalam penggunaannya, misalnya: untuk penelitian/riset setelah mendapat persetujuan tertulis dari Pejabat Penandatangan Kontrak]</em>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>65.</td>
                      <td>Fasilitas</td>
                      <td>
                        <div className="regular-text-value">
                          Pejabat Penandatangan Kontrak akan memberikan fasilitas berupa :{" "}
                          {formData.fasilitas ? (
                            <span>{formData.fasilitas}</span>
                          ) : (
                            <em> .................... [diisi fasilitas milik Pejabat Penandatangan Kontrak yang akan diberikan kepada Penyedia untuk kelancaran pelaksanan pekerjaan ini (apabila ada)]</em>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>66.1.h</td>
                      <td>Peristiwa Kompensasi</td>
                      <td>
                        <div className="regular-text-value">
                          Termasuk Peristiwa Kompensasi yang dapat diberikan kepada Penyedia adalah:
                          {formData.peristiwa_kompensasi ? <span>{formData.peristiwa_kompensasi}</span> : <em>..................... [diisi apabila ada Peristiwa Kompensasi lain, selain yang telah tertuang dalam SSUK]</em>}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>70.1.e</td>
                      <td>Besaran Uang Muka</td>
                      <td>
                        {" "}
                        <div className="regular-text-value">
                          <span>{formData.besaran_uang_muka || "(Besaran Uang Muka)"}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="skk-table-container">
                <table className="skk-table">
                  <tbody>
                    <tr>
                      <td>70.2.d</td>
                      <td>Pembayaran Prestasi Pekerjaan</td>
                      <td>
                        <div className="regular-text-value">Pembayaran prestasi pekerjaan dilakukan dengan cara: Termin</div>
                        <table class="sskk-inner-table">
                          <tr>
                            <th>No.</th>
                            <th>
                              Tahapan Pembayaran <em>(milestone)</em>
                            </th>
                            <th>Besaran % Pembayaran dari Harga Kontrak</th>
                            <th>Keterangan</th>
                          </tr>
                          <tbody>
                            {inputFieldsPembayaranPrestasiPekerjaan.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.tahapan_pembayaran || "(.........)"}</td>
                                <td>
                                  {item.persentase_pembayaran || "(.........)"}
                                  <span> %</span>
                                </td>
                                <td>{item.keterangan_pembayaran || "(.........)"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="regular-text-value">Dokumen penunjang yang disyaratkan untuk mengajukan tagihan pembayaran prestasi pekerjaan : </div>
                        <div className="rumusan-text-sskk">
                          {formData.dokumen_tagihan_prestasi.map((item, index) => (
                            <div className="regular-text-value" key={index}>
                              {item}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>70.3.e</td>
                      <td>Pembayaran Bahan dan/atau Peralatan</td>
                      <td>
                        <div className="regular-text-value">Penentuan dan besaran pembayaran untuk bahan dan/atau peralatan yang menjadi bagian permanen dari pekerjaan utama (material on site), ditetapkan sebagai berikut: </div>
                        <div className="rumusan-text-sskk">
                          {formData.pembayaran_bahan_peralatan.map((item, index) => (
                            <div className="regular-text-value" key={index}>
                              {item}
                            </div>
                          ))}
                        </div>
                        <div className="regular-text-value">
                          <em>
                            [contoh yang termasuk material on site peralatan: eskalator, lift, pompa air stationer, turbin, peralatan elektromekanik; bahan fabrikasi: sheet pile, geosintetik, konduktor, tower, insulator,wiremesh pabrikasi
                            bahan jadi: beton pracetak]
                          </em>
                        </div>
                        <br />
                        <div className="regular-text-value">
                          <em>[contoh yang tidak termasuk material on site: pasir, batu, semen, aspal, besi tulangan]</em>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>70.4.(c)</td>
                      <td>Denda akibat Keterlambatan</td>
                      <td>
                        <div className="regular-text-value">Untuk pekerjaan ini besar denda keterlambatan untuk setiap hari keterlambatan adalah 1/1000 (satu per seribu) dari Nilai Kontrak atau bagian tertentu dari Nilai Kontrak</div>
                      </td>
                    </tr>
                    <tr>
                      <td>78.2</td>
                      <td>Umur Konstruksi dan Pertanggungan terhadap Kegagalan Bangunan</td>
                      <td>
                        <div className="rumusan-text-sskk">
                          {formData.umur_konstruksi_gagal_bangunan.map((item, index) => (
                            <div className="regular-text-value" key={index}>
                              {item}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>79.3</td>
                      <td>Penyelesaian Perselisihan/ Sengketa</td>
                      <td>
                        <div className="regular-text-value">
                          <span>{formData.perselisihan_sengketa || "(Perselisihan sengketa)"}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ pageBreakBefore: "always" }}>
                <div className="skk-page-tittle">LAMPIRAN A SYARAT-SYARAT KHUSUS KONTRAK</div>
                <div className="skk-page-subtittle">DAFTAR HARGA SATUAN TIMPANG</div>
                <div className="skk-table-layout">
                  <table class="skk-table">
                    <tr>
                      <th>No</th>
                      <th>Mata Pembayaran</th>
                      <th>Satuan Ukuran</th>
                      <th>Kuantitas</th>
                      <th>Harga Satuan HPS (Rp)</th>
                      <th>Harga Satuan Penawaran (Rp)</th>
                      <th>% Terhadap HPS</th>
                      <th>Keterangan</th>
                    </tr>
                    <tbody>
                      {inputFieldsDaftarSatuanTimpang.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.mata_pembayaran || "……….."}</td>
                          <td>{item.satuan || "……….."}</td>
                          <td>{item.kuantitas || "……….."}</td>
                          <td>{item.harga_satuan_hps.masked || "……….."}</td>
                          <td>{item.harga_satuan_penawaran.masked || "……….."}</td>
                          <td>{item.persentase_terhadap_hps || "……….."}</td>
                          <td>{item.keterangan || "……….."}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-bold-skk">Catatan:</div>
                <div className="text-bold-skk">*)Didapatkan dari pokja pemilihan (apabila ada)</div>
                <div className="skk-page-subtittle">DAFTAR PEKERJAAN YANG DISUBKONTRAKKAN DAN SUBKONTRAKTOR (apabila ada)</div>
                <div className="text-bold-skk">1) Pekerjaan Utama</div>
                <table class="skk-table">
                  <tr>
                    <th>No</th>
                    <th>Bagian Pekerjaan yang Disubkontrakkan</th>
                    <th>Nama Subkontraktor</th>
                    <th>Alamat Subkontraktor</th>
                    <th>Kualifikasi Subkontraktor</th>
                    <th>Keterangan</th>
                  </tr>
                  <tbody>
                    {inputFieldsPekerjaanUtama.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.pekerjaan_yang_disubkontrakan || "……….."}</td>
                        <td>{item.nama_subkontraktor || "……….."}</td>
                        <td>{item.alamat_subkontraktor || "……….."}</td>
                        <td>{item.kualifikasi_subkontraktor || "……….."}</td>
                        <td>{item.keterangan || "……….."}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="regular-text-perpoint">
                  <div className="regular-text-value">Catatan:</div>
                  <div className="regular-text-value">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
                  <div className="regular-text-value">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
                </div>
                <div className="text-bold-skk">2) Pekerjaan bukan Pekerjaan Utama</div>
                <table class="skk-table">
                  <tr>
                    <th>No</th>
                    <th>Bagian Pekerjaan yang Disubkontrakkan</th>
                    <th>Nama Subkontraktor</th>
                    <th>Alamat Subkontraktor</th>
                    <th>Kualifikasi Subkontraktor</th>
                    <th>Keterangan</th>
                  </tr>
                  <tbody>
                    {inputFieldsPekerjaanBukanPekerjaanUtama.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.pekerjaan_yang_disubkontrakan || "……….."}</td>
                        <td>{item.nama_subkontraktor || "……….."}</td>
                        <td>{item.alamat_subkontraktor || "……….."}</td>
                        <td>{item.kualifikasi_subkontraktor || "……….."}</td>
                        <td>{item.keterangan || "……….."}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="regular-text-perpoint">
                  <div className="regular-text-value">Catatan:</div>
                  <div className="regular-text-value">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
                  <div className="regular-text-value">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
                </div>
                <div className="skk-page-subtittle">DAFTAR PERSONEL MANAJERIAL</div>
                <table class="skk-table">
                  <tr>
                    <th>No</th>
                    <th>Nama Personel Manajerial</th>
                    <th>Jabatan dalam Pekerjaan ini</th>
                    <th>Tingkat Pendidikan/Ijazah</th>
                    <th>Pengalaman Kerja Profesional (Tahun)</th>
                    <th>Sertifikat Kompetensi Kerja</th>
                    <th>Keterangan</th>
                  </tr>
                  <tbody>
                    {inputFieldsDaftarPersonelManajerial.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.nama_personel || "……….."}</td>
                        <td>{item.jabatan_dalam_pekerjaan || "……….."}</td>
                        <td>{item.tingkat_pendidikan || "……….."}</td>
                        <td>{item.pengalaman_kerja || "……….."}</td>
                        <td>{item.sertifikat_kompetensi || "……….."}</td>
                        <td>{item.keterangan || "……….."}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="regular-text-perpoint">
                  <div className="regular-text-value">Catatan:</div>
                  <div className="regular-text-value">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
                  <div className="regular-text-value">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
                </div>{" "}
                <div className="skk-page-subtittle">DAFTAR PERALATAN UTAMA</div>
                <table class="skk-table">
                  <tr>
                    <th>No</th>
                    <th>Nama Peralatan Utama</th>
                    <th>Merek dan Tipe</th>
                    <th>Kapasitas</th>
                    <th>Jumlah</th>
                    <th>Kondisi</th>
                    <th>Status Kepemilikan</th>
                    <th>Keterangan</th>
                  </tr>
                  <tbody>
                    {inputFieldsDaftarPeralatanUtama.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.nama_peralatan_utama || "……….."}</td>
                        <td>{item.merek || "……….."}</td>
                        <td>{item.kapasitas || "……….."}</td>
                        <td>{item.jumlah || "……….."}</td>
                        <td>{item.kondisi || "……….."}</td>
                        <td>{item.status_kepemilikan || "……….."}</td>
                        <td>{item.keterangan || "……….."}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="regular-text-perpoint">
                  <div className="regular-text-value">Catatan:</div>
                  <div className="regular-text-value">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
                  <div className="regular-text-value">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
                </div>
              </div>
            </>
          )}

          {currFileType === "word" && (
            <>
              <div>
                <div className="skk-page-tittle">SYARAT-SYARAT KHUSUS KONTRAK (SSKK)</div>
                <div className="border-separator-black-skk"></div>
                <div className="skk-table-container">
                  <table className="skk-table">
                    <thead>
                      <tr>
                        <th>Pasal dalam SSUK</th>
                        <th>Ketentuan</th>
                        <th>Pengaturan dalam SSKK</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>4.1 & 4.2</td>
                        <td>Korespondensi</td>
                        <td>
                          <div className="sskk-alamat-container">
                            <div className="sskk-section">
                              <div className="sskk-title">Alamat Para Pihak sebagai berikut:</div>

                              <br />
                              <div>Satuan Kerja Pejabat Penandatangan Kontrak:</div>
                              <div className="sskk-row">
                                <span className="sskk-label">Nama</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.perusahaan_pihak_1 || "(Nama Perusahaan Pihak 1)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Alamat</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Website</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{formData.website_pihak_1 || "(Website Pihak 1)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">E-mail</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.email_pihak_1 || "(Email Pihak 1)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Faksimili</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{formData.fax_pihak_1 || "(Website Pihak 1)"}</span>
                                </span>
                              </div>

                              <br />
                              <div className="sskk-title">Penyedia:</div>
                              <div className="sskk-row">
                                <span className="sskk-label">Nama</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Alamat</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.alamat_pihak_2 || "(Alamat pihak 2)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">E-mail</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.email_pihak_2 || "(Email pihak 2)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Faksimili</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{formData.fax_pihak_2 || "(Fax pihak 2)"}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>4.2 & 5.1</td>
                        <td>Wakil sah para pihak</td>
                        <td>
                          <div className="sskk-alamat-container">
                            <div className="sskk-section">
                              <div className="sskk-title">Wakil Sah Para Pihak sebagai berikut:</div>

                              <br />
                              <div>Untuk Pejabat Penandatangan Kontrak:</div>
                              <div className="sskk-row">
                                <span className="sskk-label">Nama</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Jabatan</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan pihak 1)"}</span>
                                </span>
                              </div>

                              <br />
                              <div className="sskk-title">Untuk Penyedia:</div>
                              <div className="sskk-row">
                                <span className="sskk-label">Nama</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.nama_pihak_2 || "(Nama pihak 2)"}</span>
                                </span>
                              </div>
                              <div className="sskk-row">
                                <span className="sskk-label">Jabatan</span>
                                <span className="sskk-separator">:</span>
                                <span className="sskk-value">
                                  <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan pihak 2)"}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>6.3.2 & 6.3.3 44.4 & 44.6</td>
                        <td>Pencairan Jaminan</td>
                        <td>
                          <div className="regular-text-value">Jaminan dicairkan dan disetorkan pada Universitas Bengkulu</div>
                        </td>
                      </tr>
                      <tr>
                        <td>27.1</td>
                        <td>Masa Pelaksanaan</td>
                        <td>
                          <div className="regular-text-value">
                            Masa Pelaksanaan selama <span>{formData.masa_pelaksanaan_pekerjaan || "(Masa Pelaksanaan Pekerjaan)"}</span> (<span>{formData.masa_pelaksanaan_pekerjaan_terbilang || "(Terbilang)"}</span>) hari kalender terhitung
                            sejak Tanggal Mulai Kerja yang tercantum dalam SPMK.
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>27.4</td>
                        <td>Masa Pelaksanaan untuk Serah Terima Sebagian Pekerjaan (Bagian Kontrak)</td>
                        <td>
                          <div className="regular-text-perpoint">
                            {formData.ketentuan_masa_pelaksanaan.map((item, index) => (
                              <div className="regular-text-value" key={index}>
                                {item}
                              </div>
                            ))}
                            <div className="regular-text-value">
                              <em>Catatan: Ketentuan di atas diisi apabila diberlakukan serah terima sebagian pekerjaan (secara parsial) sesuai dengan yang dicantumkan dalam dokumen pemilihan (rancangan kontrak)</em>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="skk-table-container">
                  <table className="skk-table">
                    <tbody>
                      <tr>
                        <td>33.8</td>
                        <td>Masa Pemeliharaan</td>
                        <td>
                          <div className="regular-text-value">
                            Masa Pemeliharaan berlaku selama <span>{formData.masa_pemeliharaan_pekerjaan || "(Masa Pemeliharaan Pekerjaan)"}</span> [<span>{formData.masa_pemeliharaan_pekerjaan_terbilang || "(Terbilang)"}</span>] hari
                            kalender terhitung sejak Tanggal Penyerahan Pertama Pekerjaan (PHO).
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>33.19</td>
                        <td>Serah Terima Sebagian Pekerjaan (Bagian Kontrak)</td>
                        <td>
                          <div className="regular-text-value">Dalam Kontrak ini diberlakukan serah terima pekerjaan sebagian atau secara parsial untuk bagian kontrak sebagai berikut:</div>
                          <div className="regular-text-perpoint">
                            {formData.list_serah_terima_pekerjaan.map((item, index) => (
                              <div className="regular-text-value" key={index}>
                                {item}
                              </div>
                            ))}
                            <div className="regular-text-value">
                              <em>diisi bagian pekerjaan yang akan dilakukan serah terima sebagian pekerjaan (secara parsial sesuai dengan yang dicantumkan dalam dokumen pemilihan (rancangan kontrak)</em>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>33.22</td>
                        <td>Masa Pemeliharaan untuk Serah Terima Sebagian Pekerjaan (Bagian Kontrak)</td>
                        <td>
                          <div className="regular-text-perpoint">
                            {formData.ketentuan_masa_pemeliharaan.map((item, index) => (
                              <div className="regular-text-value" key={index}>
                                {item}
                              </div>
                            ))}
                            <div className="regular-text-value">
                              <em>Catatan: Ketentuan di atas diisi apabila diberlakukan serah terima sebagian pekerjaan (secara parsial) dan sudah ditetapkan dalam Dokumen Pemilihan.</em>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>35.1</td>
                        <td>Gambar As Built dan Pedoman Pengoperasian dan Perawatan/ Pemeliharaan</td>
                        <td>
                          <div className="regular-text-value">
                            Gambar As built diserahkan paling lambat <span>{formData.waktu_penyerahan_gambar || "..... (...... dalam huruf .........)"}</span>
                          </div>
                          <br />
                          <div className="regular-text-value">
                            dan/atau pedoman pengoperasian dan perawatan/pemeliharaan harus diserahkan paling lambat <span>{formData.waktu_pedoman_pengoperasian || "..... (...... dalam huruf .........)"}</span> hari kalender setelah Tanggal
                            Penyerahan Pertama Pekerjaan.
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="skk-table-container">
                <table className="skk-table">
                  <tbody>
                    <tr>
                      <td>38.7</td>
                      <td>Penyesuaian Harga</td>
                      <td>
                        <div className="regular-text-value">
                          <span>{formData.penyesuaian_harga || "-"}</span>
                        </div>
                        <table class="sskk-inner-table">
                          <tr>
                            <th>Hn</th>
                            <th>=</th>
                            <th>Ho (a+b.Bn/Bo+c.Cn/Co+d.Dn/Do+.....)</th>
                          </tr>
                          <tr>
                            <td>Hn</td>
                            <td>=</td>
                            <td>Harga Satuan pada saat pekerjaan dilaksanakan;</td>
                          </tr>
                          <tr>
                            <td>Ho</td>
                            <td>=</td>
                            <td>Harga Satuan pada saat harga penawaran;</td>
                          </tr>
                          <tr>
                            <td>A</td>
                            <td>=</td>
                            <td>Koefisien tetap yang terdiri atas keuntungan dan overhead, dalam hal penawaran tidak mencantumkan besaran komponen keuntungan dan overhead maka a = 0,15</td>
                          </tr>
                          <tr>
                            <td>b, c, d</td>
                            <td>=</td>
                            <td>Koefisien komponen kontrak seperti tenaga kerja, bahan, alat kerja, dsb; Penjumlahan a+b+c+d+....dst adalah 1,00</td>
                          </tr>
                          <tr>
                            <td>Bn, Cn, Dn</td>
                            <td>=</td>
                            <td>Indeks harga komponen pada bulan saat pekerjaan dilaksanakan</td>
                          </tr>
                          <tr>
                            <td>Bo, Co, Do</td>
                            <td>=</td>
                            <td>Indeks harga komponen pada bulan penyampaian penawaran.</td>
                          </tr>
                        </table>
                        <div className="regular-text-value">Rumusan tersebut diatas memperhatikan hal-hal sebagai berikut: </div>
                        <div className="rumusan-text-sskk">
                          <div className="regular-text-value">
                            a) Penetapan koefisien bahan, tenaga kerja, alat kerja, bahan bakar, dan sebagainya ditetapkan <strong>seperti contoh sebagai berikut:</strong>{" "}
                          </div>
                          <img src={SskkTable} alt="table-inner" />
                          <div className="regular-text-value">
                            b) Koefisien komponen kontrak ditetapkan oleh Pejabat Penandatangan Kontrak dari perbandingan antara harga bahan, tenaga kerja, alat kerja, dan sebagainya (apabila ada) terhadap Harga Satuan dari pembobotan HPS
                            dan dicantumkan dalam Dokumen Pemilihan (Rancangan Kontrak).
                          </div>
                          <div className="regular-text-value">c) Indeks harga yang digunakan bersumber dari penerbitan BPS.</div>
                          <div className="regular-text-value">d) Dalam hal indeks harga tidak dimuat dalam penerbitan BPS, digunakan indeks harga yang dikeluarkan oleh instansi teknis.</div>
                          <div className="regular-text-value">e) Rumusan penyesuaian Harga Kontrak ditetapkan sebagai berikut:</div>
                          <div className="rumusan-text-sskk-sub-item">
                            <div className="regular-text-value">Pn = (Hn1xV1)+(Hn2xV2)+(Hn3xV3)+.... dst .</div>
                            <div className="regular-text-value">Pn = Harga Kontrak setelah dilakukan penyesuaian Harga Satuan;</div>
                            <div className="regular-text-value">Hn = Harga Satuan baru setiap jenis komponen pekerjaan setelah dilakukan penyesuaian harga menggunakan rumusan penyesuaian Harga Satuan;</div>
                            <div className="regular-text-value">V = Volume setiap jenis komponen pekerjaan yang dilaksanakan.</div>
                          </div>
                          <div className="regular-text-value">
                            f) Pembayaran penyesuaian harga dilakukan oleh Pejabat Penandatangan Kontrak, apabila Penyedia telah mengajukan tagihan disertai perhitungan beserta data-data dan telah dilakukan audit sesuai dengan ketentuan
                            peraturan perundang-undangan.
                          </div>
                          <div className="regular-text-value">g) Penyedia dapat mengajukan tagihan secara berkala paling cepat 6 (enam) bulan setelah pekerjaan yang diberikan penyesuaian harga tersebut dilaksanakan.</div>
                          <div className="regular-text-value">
                            h) Pembayaran penyesuaian harga dilakukan oleh Pejabat Penandatangan Kontrak, apabila Penyedia telah mengajukan tagihan disertai perhitungan beserta data-data dan telah dilakukan audit sesuai dengan ketentuan
                            peraturan perundang-undangan.
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="skk-table-container">
                <table className="skk-table">
                  <tbody>
                    <tr>
                      <td>45.2</td>
                      <td>Pembayaran Tagihan</td>
                      <td>
                        <div className="regular-text-value">
                          <span>{formData.pembayaran_tagihan || "(Pembayaran Tagihan)"}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>49.i</td>
                      <td>Hak dan Kewajiban Penyedia</td>
                      <td>
                        <div className="regular-text-value">Hak dan kewajiban Penyedia :</div>
                        <div className="rumusan-text-sskk">
                          {formData.hak_dan_kewajiban_penyedia.map((item, index) => (
                            <div className="regular-text-value" key={index}>
                              {item}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>56.3</td>
                      <td>Tindakan Penyedia yang Mensyaratkan Persetujuan Pejabat Penandatangan Kontrak</td>
                      <td>
                        <div className="regular-text-value">
                          <span>{formData.persetujuan_tindakan_penyedia || "(Persetujuan Tindakan Penyedia)"}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>56.3</td>
                      <td>Tindakan Penyedia yang Mensyaratkan Persetujuan Pengawas Pekerjaan</td>
                      <td>
                        <div className="regular-text-value">
                          <span>{formData.persetujuan_tindakan_pengawas || "(Persetujuan Tindakan Pengawas)"}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>58.</td>
                      <td>Kepemilikan Dokumen</td>
                      <td>
                        <div className="regular-text-value">Penyedia diperbolehkan menggunakan salinan dokumen dan piranti lunak yang dihasilkan dari Pekerjaan Konstruksi ini dengan pembatasan sebagai berikut:</div>
                        <div className="regular-text-value">
                          {formData.kepemilikan_dokumen ? (
                            <span>{formData.kepemilikan_dokumen}</span>
                          ) : (
                            <em>.................... [diisi batasan/ketentuan yang dibolehkan dalam penggunaannya, misalnya: untuk penelitian/riset setelah mendapat persetujuan tertulis dari Pejabat Penandatangan Kontrak]</em>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>65.</td>
                      <td>Fasilitas</td>
                      <td>
                        <div className="regular-text-value">
                          Pejabat Penandatangan Kontrak akan memberikan fasilitas berupa :{" "}
                          {formData.fasilitas ? (
                            <span>{formData.fasilitas}</span>
                          ) : (
                            <em> .................... [diisi fasilitas milik Pejabat Penandatangan Kontrak yang akan diberikan kepada Penyedia untuk kelancaran pelaksanan pekerjaan ini (apabila ada)]</em>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>66.1.h</td>
                      <td>Peristiwa Kompensasi</td>
                      <td>
                        <div className="regular-text-value">
                          Termasuk Peristiwa Kompensasi yang dapat diberikan kepada Penyedia adalah:
                          {formData.peristiwa_kompensasi ? <span>{formData.peristiwa_kompensasi}</span> : <em>..................... [diisi apabila ada Peristiwa Kompensasi lain, selain yang telah tertuang dalam SSUK]</em>}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>70.1.e</td>
                      <td>Besaran Uang Muka</td>
                      <td>
                        {" "}
                        <div className="regular-text-value">
                          <span>{formData.besaran_uang_muka || "(Besaran Uang Muka)"}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="skk-table-container">
                <table className="skk-table">
                  <tbody>
                    <tr>
                      <td>70.2.d</td>
                      <td>Pembayaran Prestasi Pekerjaan</td>
                      <td>
                        <div className="regular-text-value">Pembayaran prestasi pekerjaan dilakukan dengan cara: Termin</div>
                        <table class="sskk-inner-table">
                          <tr>
                            <th>No.</th>
                            <th>
                              Tahapan Pembayaran <em>(milestone)</em>
                            </th>
                            <th>Besaran % Pembayaran dari Harga Kontrak</th>
                            <th>Keterangan</th>
                          </tr>
                          <tbody>
                            {inputFieldsPembayaranPrestasiPekerjaan.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.tahapan_pembayaran || "(.........)"}</td>
                                <td>
                                  {item.persentase_pembayaran || "(.........)"}
                                  <span> %</span>
                                </td>
                                <td>{item.keterangan_pembayaran || "(.........)"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="regular-text-value">Dokumen penunjang yang disyaratkan untuk mengajukan tagihan pembayaran prestasi pekerjaan : </div>
                        <div className="rumusan-text-sskk">
                          {formData.dokumen_tagihan_prestasi.map((item, index) => (
                            <div className="regular-text-value" key={index}>
                              {item}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>70.3.e</td>
                      <td>Pembayaran Bahan dan/atau Peralatan</td>
                      <td>
                        <div className="regular-text-value">Penentuan dan besaran pembayaran untuk bahan dan/atau peralatan yang menjadi bagian permanen dari pekerjaan utama (material on site), ditetapkan sebagai berikut: </div>
                        <div className="rumusan-text-sskk">
                          {formData.pembayaran_bahan_peralatan.map((item, index) => (
                            <div className="regular-text-value" key={index}>
                              {item}
                            </div>
                          ))}
                        </div>
                        <div className="regular-text-value">
                          <em>
                            [contoh yang termasuk material on site peralatan: eskalator, lift, pompa air stationer, turbin, peralatan elektromekanik; bahan fabrikasi: sheet pile, geosintetik, konduktor, tower, insulator,wiremesh pabrikasi
                            bahan jadi: beton pracetak]
                          </em>
                        </div>
                        <br />
                        <div className="regular-text-value">
                          <em>[contoh yang tidak termasuk material on site: pasir, batu, semen, aspal, besi tulangan]</em>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>70.4.(c)</td>
                      <td>Denda akibat Keterlambatan</td>
                      <td>
                        <div className="regular-text-value">Untuk pekerjaan ini besar denda keterlambatan untuk setiap hari keterlambatan adalah 1/1000 (satu per seribu) dari Nilai Kontrak atau bagian tertentu dari Nilai Kontrak</div>
                      </td>
                    </tr>
                    <tr>
                      <td>78.2</td>
                      <td>Umur Konstruksi dan Pertanggungan terhadap Kegagalan Bangunan</td>
                      <td>
                        <div className="rumusan-text-sskk">
                          {formData.umur_konstruksi_gagal_bangunan.map((item, index) => (
                            <div className="regular-text-value" key={index}>
                              {item}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>79.3</td>
                      <td>Penyelesaian Perselisihan/ Sengketa</td>
                      <td>
                        <div className="regular-text-value">
                          <span>{formData.perselisihan_sengketa || "(Perselisihan sengketa)"}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ pageBreakBefore: "always" }}>
                <div className="skk-page-tittle">LAMPIRAN A SYARAT-SYARAT KHUSUS KONTRAK</div>
                <div className="skk-page-subtittle">DAFTAR HARGA SATUAN TIMPANG</div>
                <div className="skk-table-layout">
                  <table class="skk-table">
                    <tr>
                      <th>No</th>
                      <th>Mata Pembayaran</th>
                      <th>Satuan Ukuran</th>
                      <th>Kuantitas</th>
                      <th>Harga Satuan HPS (Rp)</th>
                      <th>Harga Satuan Penawaran (Rp)</th>
                      <th>% Terhadap HPS</th>
                      <th>Keterangan</th>
                    </tr>
                    <tbody>
                      {inputFieldsDaftarSatuanTimpang.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.mata_pembayaran || "……….."}</td>
                          <td>{item.satuan || "……….."}</td>
                          <td>{item.kuantitas || "……….."}</td>
                          <td>{item.harga_satuan_hps.masked || "……….."}</td>
                          <td>{item.harga_satuan_penawaran.masked || "……….."}</td>
                          <td>{item.persentase_terhadap_hps || "……….."}</td>
                          <td>{item.keterangan || "……….."}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-bold-skk">Catatan:</div>
                <div className="text-bold-skk">*)Didapatkan dari pokja pemilihan (apabila ada)</div>
                <div className="skk-page-subtittle">DAFTAR PEKERJAAN YANG DISUBKONTRAKKAN DAN SUBKONTRAKTOR (apabila ada)</div>
                <div className="text-bold-skk">1) Pekerjaan Utama</div>
                <table class="skk-table">
                  <tr>
                    <th>No</th>
                    <th>Bagian Pekerjaan yang Disubkontrakkan</th>
                    <th>Nama Subkontraktor</th>
                    <th>Alamat Subkontraktor</th>
                    <th>Kualifikasi Subkontraktor</th>
                    <th>Keterangan</th>
                  </tr>
                  <tbody>
                    {inputFieldsPekerjaanUtama.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.pekerjaan_yang_disubkontrakan || "……….."}</td>
                        <td>{item.nama_subkontraktor || "……….."}</td>
                        <td>{item.alamat_subkontraktor || "……….."}</td>
                        <td>{item.kualifikasi_subkontraktor || "……….."}</td>
                        <td>{item.keterangan || "……….."}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="regular-text-perpoint">
                  <div className="regular-text-value">Catatan:</div>
                  <div className="regular-text-value">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
                  <div className="regular-text-value">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
                </div>
                <div className="text-bold-skk">2) Pekerjaan bukan Pekerjaan Utama</div>
                <table class="skk-table">
                  <tr>
                    <th>No</th>
                    <th>Bagian Pekerjaan yang Disubkontrakkan</th>
                    <th>Nama Subkontraktor</th>
                    <th>Alamat Subkontraktor</th>
                    <th>Kualifikasi Subkontraktor</th>
                    <th>Keterangan</th>
                  </tr>
                  <tbody>
                    {inputFieldsPekerjaanBukanPekerjaanUtama.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.pekerjaan_yang_disubkontrakan || "……….."}</td>
                        <td>{item.nama_subkontraktor || "……….."}</td>
                        <td>{item.alamat_subkontraktor || "……….."}</td>
                        <td>{item.kualifikasi_subkontraktor || "……….."}</td>
                        <td>{item.keterangan || "……….."}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="regular-text-perpoint">
                  <div className="regular-text-value">Catatan:</div>
                  <div className="regular-text-value">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
                  <div className="regular-text-value">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
                </div>
                <div className="skk-page-subtittle">DAFTAR PERSONEL MANAJERIAL</div>
                <table class="skk-table">
                  <tr>
                    <th>No</th>
                    <th>Nama Personel Manajerial</th>
                    <th>Jabatan dalam Pekerjaan ini</th>
                    <th>Tingkat Pendidikan/Ijazah</th>
                    <th>Pengalaman Kerja Profesional (Tahun)</th>
                    <th>Sertifikat Kompetensi Kerja</th>
                    <th>Keterangan</th>
                  </tr>
                  <tbody>
                    {inputFieldsDaftarPersonelManajerial.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.nama_personel || "……….."}</td>
                        <td>{item.jabatan_dalam_pekerjaan || "……….."}</td>
                        <td>{item.tingkat_pendidikan || "……….."}</td>
                        <td>{item.pengalaman_kerja || "……….."}</td>
                        <td>{item.sertifikat_kompetensi || "……….."}</td>
                        <td>{item.keterangan || "……….."}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="regular-text-perpoint">
                  <div className="regular-text-value">Catatan:</div>
                  <div className="regular-text-value">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
                  <div className="regular-text-value">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
                </div>{" "}
                <div className="skk-page-subtittle">DAFTAR PERALATAN UTAMA</div>
                <table class="skk-table">
                  <tr>
                    <th>No</th>
                    <th>Nama Peralatan Utama</th>
                    <th>Merek dan Tipe</th>
                    <th>Kapasitas</th>
                    <th>Jumlah</th>
                    <th>Kondisi</th>
                    <th>Status Kepemilikan</th>
                    <th>Keterangan</th>
                  </tr>
                  <tbody>
                    {inputFieldsDaftarPeralatanUtama.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.nama_peralatan_utama || "……….."}</td>
                        <td>{item.merek || "……….."}</td>
                        <td>{item.kapasitas || "……….."}</td>
                        <td>{item.jumlah || "……….."}</td>
                        <td>{item.kondisi || "……….."}</td>
                        <td>{item.status_kepemilikan || "……….."}</td>
                        <td>{item.keterangan || "……….."}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="regular-text-perpoint">
                  <div className="regular-text-value">Catatan:</div>
                  <div className="regular-text-value">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
                  <div className="regular-text-value">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
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
      const filename = "surat_sskk";

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
        <div>
          <div className="form-container">
            <div className="position-absolute">
              {" "}
              {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} docName={"Syarat Khusus Kontrak"} />}
              {isFailedModalOpen && <FailedModal onClose={() => setIsFailedModalOpen(false)} docName={"Syarat Khusus Kontrak"} />}
            </div>
            <div className="input-container-form">
              <label className="input-label-form">Website Pihak 1 (Opsional)</label>
              <input type="text" name="website_pihak_1" className="input-field-form" value={formData.website_pihak_1} placeholder="Isi bagian ini" onChange={handleChange} />
            </div>

            <div className="input-container-form">
              <label className="input-label-form">Fax Pihak 1 (Opsional)</label>
              <input type="text" name="fax_pihak_1" className="input-field-form" value={formData.fax_pihak_1} placeholder="Isi bagian ini" onChange={handleChange} />
            </div>

            <div className="input-container-form">
              <label className="input-label-form">Website Pihak 2 (Opsional)</label>
              <input type="text" name="website_pihak_2" className="input-field-form" value={formData.website_pihak_2} placeholder="Isi bagian ini" onChange={handleChange} />
            </div>

            <div className="input-container-form">
              <label className="input-label-form">Fax Pihak 2 (Opsional)</label>
              <input type="text" name="fax_pihak_2" className="input-field-form" value={formData.fax_pihak_2} placeholder="Isi bagian ini" onChange={handleChange} />
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
                Ketentuan Masa Pelaksanaan <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="ketentuan_masa_pelaksanaan"
                value={formData.ketentuan_masa_pelaksanaan ? formData.ketentuan_masa_pelaksanaan.join("\n") : ""}
                onChange={handleChangeTextArea}
                onFocus={handleFocusTextArea}
                onBlur={handleBlurTextArea}
                className={errors.ketentuan_masa_pelaksanaan ? "input-textarea-form-error" : "input-textarea-form"}
                placeholder="1"
                onKeyDown={handleKeyDownTextArea}
              />
              {errors.ketentuan_masa_pelaksanaan && <span className="error-text">{errors.ketentuan_masa_pelaksanaan}</span>}
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
            <div className="input-container-form">
              <label className="input-label-form">
                List Serah Terima Pekerjaan <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="list_serah_terima_pekerjaan"
                value={formData.list_serah_terima_pekerjaan ? formData.list_serah_terima_pekerjaan.join("\n") : ""}
                onChange={handleChangeTextArea}
                onFocus={handleFocusTextArea}
                onBlur={handleBlurTextArea}
                className={errors.list_serah_terima_pekerjaan ? "input-textarea-form-error" : "input-textarea-form"}
                placeholder="1"
                onKeyDown={handleKeyDownTextArea}
              />
              {errors.list_serah_terima_pekerjaan && <span className="error-text">{errors.list_serah_terima_pekerjaan}</span>}
            </div>
            <div className="input-container-form">
              <label className="input-label-form">
                Ketentuan Masa Pemeliharaan <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="ketentuan_masa_pemeliharaan"
                value={formData.ketentuan_masa_pemeliharaan ? formData.ketentuan_masa_pemeliharaan.join("\n") : ""}
                onChange={handleChangeTextArea}
                onFocus={handleFocusTextArea}
                onBlur={handleBlurTextArea}
                className={errors.ketentuan_masa_pemeliharaan ? "input-textarea-form-error" : "input-textarea-form"}
                placeholder="1"
                onKeyDown={handleKeyDownTextArea}
              />
              {errors.ketentuan_masa_pemeliharaan && <span className="error-text">{errors.ketentuan_masa_pemeliharaan}</span>}
            </div>
            {/* need confirm */}
            {/* <div className="image-list-container">
              {uploadedImages.map((img, idx) => (
                <div key={idx} className="image-item" style={{ marginBottom: "10px" }}>
                  <img src={img.fileUrl} alt={img.fileName} style={{ width: "150px", height: "auto", borderRadius: "8px" }} />
                  <div style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
                    <p style={{ marginRight: "8px" }}>{img.fileName}</p>
                    <button type="button" onClick={() => handleDeleteImage(idx)} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <input type="file" id="imageUpload" multiple accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />

            <button type="button" onClick={handleUploadImage} className="camera-button">
              📷 Upload Gambar
            </button> */}
            <div className="input-container-form">
              <label className="input-label-form">Waktu Penyerahan Gambar (Opsional)</label>
              <input type="text" name="waktu_penyerahan_gambar" className="input-field-form" value={formData.waktu_penyerahan_gambar} placeholder="Isi bagian ini" onChange={handleChange} />
            </div>

            <div className="input-container-form">
              <label className="input-label-form">Waktu Pedoman Pengoperasian(Opsional)</label>
              <input type="text" name="waktu_pedoman_pengoperasian" className="input-field-form" value={formData.waktu_pedoman_pengoperasian} placeholder="Isi bagian ini" onChange={handleChange} />
            </div>

            <div className="input-container-form">
              <label className="input-label-form">
                Penyesuaian Harga <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="penyesuaian_harga"
                value={formData.penyesuaian_harga}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={errors.penyesuaian_harga ? "input-textarea-form-error" : "input-textarea-form"}
                placeholder="Isi bagian ini"
              />
              {errors.penyesuaian_harga && <span className="error-text">{errors.penyesuaian_harga}</span>}
            </div>
            <div className="input-container-form">
              <label className="input-label-form">
                Pembayaran Tagihan <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="pembayaran_tagihan"
                value={formData.pembayaran_tagihan}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={errors.pembayaran_tagihan ? "input-textarea-form-error" : "input-textarea-form"}
                placeholder="Isi bagian ini"
              />
              {errors.pembayaran_tagihan && <span className="error-text">{errors.pembayaran_tagihan}</span>}
            </div>
            <div className="input-container-form">
              <label className="input-label-form">
                Hak dan Kewajiban Penyedia <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="hak_dan_kewajiban_penyedia"
                value={formData.hak_dan_kewajiban_penyedia ? formData.hak_dan_kewajiban_penyedia.join("\n") : ""}
                onChange={handleChangeTextArea}
                onFocus={handleFocusTextArea}
                onBlur={handleBlurTextArea}
                className={errors.hak_dan_kewajiban_penyedia ? "input-textarea-form-error" : "input-textarea-form"}
                placeholder="1"
                onKeyDown={handleKeyDownTextArea}
              />
              {errors.hak_dan_kewajiban_penyedia && <span className="error-text">{errors.hak_dan_kewajiban_penyedia}</span>}
            </div>
            <div className="input-container-form">
              <label className="input-label-form">
                Tindakan Penyedia yang Mensyaratkan Persetujuan Pejabat Penandatangan Kontrak <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="persetujuan_tindakan_penyedia"
                value={formData.persetujuan_tindakan_penyedia}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={errors.persetujuan_tindakan_penyedia ? "input-textarea-form-error" : "input-textarea-form"}
                placeholder="Isi bagian ini"
              />
              {errors.persetujuan_tindakan_penyedia && <span className="error-text">{errors.persetujuan_tindakan_penyedia}</span>}
            </div>
            <div className="input-container-form">
              <label className="input-label-form">
                Tindakan Penyedia yang Mensyaratkan Persetujuan Pengawas Pekerjaan <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="persetujuan_tindakan_pengawas"
                value={formData.persetujuan_tindakan_pengawas}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={errors.persetujuan_tindakan_pengawas ? "input-textarea-form-error" : "input-textarea-form"}
                placeholder="Isi bagian ini"
              />
              {errors.persetujuan_tindakan_pengawas && <span className="error-text">{errors.persetujuan_tindakan_pengawas}</span>}
            </div>
            <div className="input-container-form">
              <label className="input-label-form">
                Kepemilikan Dokumen <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="kepemilikan_dokumen"
                className={errors.kepemilikan_dokumen ? "input-field-form-error" : "input-field-form"}
                value={formData.kepemilikan_dokumen}
                placeholder="Isi bagian ini"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {errors.kepemilikan_dokumen && <span className="error-text">{errors.kepemilikan_dokumen}</span>}
            </div>
            <div className="input-container-form">
              <label className="input-label-form">
                Fasilitas <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="fasilitas"
                className={errors.fasilitas ? "input-field-form-error" : "input-field-form"}
                value={formData.fasilitas}
                placeholder="Isi bagian ini"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {errors.fasilitas && <span className="error-text">{errors.fasilitas}</span>}
            </div>
            <div className="input-container-form">
              <label className="input-label-form">
                Peristiwa Kompensasi <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="peristiwa_kompensasi"
                className={errors.peristiwa_kompensasi ? "input-field-form-error" : "input-field-form"}
                value={formData.peristiwa_kompensasi}
                placeholder="Isi bagian ini"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {errors.peristiwa_kompensasi && <span className="error-text">{errors.peristiwa_kompensasi}</span>}
            </div>
            <div className="input-container-form">
              <label className="input-label-form">
                Besaran Uang Muka <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="besaran_uang_muka"
                value={formData.besaran_uang_muka}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={errors.besaran_uang_muka ? "input-textarea-form-error" : "input-textarea-form"}
                placeholder="Isi bagian ini"
              />
              {errors.besaran_uang_muka && <span className="error-text">{errors.besaran_uang_muka}</span>}
            </div>
            <div className="section-title">Pembayaran Prestasi Pekerjaan</div>
            {inputFieldsPembayaranPrestasiPekerjaan.map((field, index) => (
              <div key={index}>
                <div className="input-form-flex">
                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">
                      Tahapan Pembayaran (milestone) <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className={`input-field-form-flex ${errors[`tahapan_pembayaran_${index}`] ? "input-field-form-flex-error" : ""}`}
                      name="tahapan_pembayaran"
                      value={field.tahapan_pembayaran}
                      onChange={(e) => handleChangePrestasiPembayaran(index, e)}
                      onBlur={(e) => handleBlurPrestasiPembayaran(index, e)}
                      onFocus={(e) => handleFocusPrestasiPembayaran(index, e)}
                      placeholder="Isi bagian ini"
                    />
                    {errors[`tahapan_pembayaran_${index}`] && <span className="error-text">{errors[`tahapan_pembayaran_${index}`]}</span>}
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">
                      Besaran % Pembayaran <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className={`input-field-form-flex ${errors[`persentase_pembayaran_${index}`] ? "input-field-form-flex-error" : ""}`}
                      name="persentase_pembayaran"
                      value={field.persentase_pembayaran}
                      onChange={(e) => handleChangePrestasiPembayaran(index, e)}
                      onBlur={(e) => handleBlurPrestasiPembayaran(index, e)}
                      onFocus={(e) => handleFocusPrestasiPembayaran(index, e)}
                      placeholder="Isi bagian ini"
                    />
                    {errors[`persentase_pembayaran_${index}`] && <span className="error-text">{errors[`persentase_pembayaran_${index}`]}</span>}
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">
                      Keterangan <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className={`input-field-form-flex ${errors[`keterangan_pembayaran_${index}`] ? "input-field-form-flex-error" : ""}`}
                      name="keterangan_pembayaran"
                      value={field.keterangan_pembayaran}
                      onChange={(e) => handleChangePrestasiPembayaran(index, e)}
                      onBlur={(e) => handleBlurPrestasiPembayaran(index, e)}
                      onFocus={(e) => handleFocusPrestasiPembayaran(index, e)}
                      placeholder="Isi bagian ini"
                    />
                    {errors[`keterangan_pembayaran_${index}`] && <span className="error-text">{errors[`keterangan_pembayaran_${index}`]}</span>}
                  </div>
                </div>
              </div>
            ))}

            <div className="add-button-layout">
              <img src={addButton} alt="add-button" onClick={handleAddFieldsPembayaranPrestasiPekerjaan} />
              {inputFieldsPembayaranPrestasiPekerjaan.length > 1 && <img src={removeButton} alt="add-button" onClick={handleRemoveFieldsPembayaranPrestasiPekerjaan} />}
            </div>

            <div className="input-container-form">
              <label className="input-label-form">
                Dokumen penunjang yang disyaratkan untuk mengajukan tagihan pembayaran prestasi pekerjaan <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="dokumen_tagihan_prestasi"
                value={formData.dokumen_tagihan_prestasi ? formData.dokumen_tagihan_prestasi.join("\n") : ""}
                onChange={handleChangeTextArea}
                onFocus={handleFocusTextArea}
                onBlur={handleBlurTextArea}
                className={errors.dokumen_tagihan_prestasi ? "input-textarea-form-error" : "input-textarea-form"}
                placeholder="1"
                onKeyDown={handleKeyDownTextArea}
              />
              {errors.dokumen_tagihan_prestasi && <span className="error-text">{errors.dokumen_tagihan_prestasi}</span>}
            </div>
            <div className="input-container-form">
              <label className="input-label-form">
                Pembayaran Bahan dan/atau Peralatan <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="pembayaran_bahan_peralatan"
                value={formData.pembayaran_bahan_peralatan ? formData.pembayaran_bahan_peralatan.join("\n") : ""}
                onChange={handleChangeTextArea}
                onFocus={handleFocusTextArea}
                onBlur={handleBlurTextArea}
                className={errors.pembayaran_bahan_peralatan ? "input-textarea-form-error" : "input-textarea-form"}
                placeholder="Isi bagian ini"
                onKeyDown={handleKeyDownTextArea}
              />
              {errors.pembayaran_bahan_peralatan && <span className="error-text">{errors.pembayaran_bahan_peralatan}</span>}
            </div>
            {/* <div className="input-container-form">
              <label className="input-label-form">
                Denda akibat Keterlambatan <span style={{ color: "red" }}>*</span>
              </label>
              <textarea type="text" className="input-textarea-form" placeholder="Isi bagian ini" rows={3} />
            </div> */}
            <div className="input-container-form">
              <label className="input-label-form">
                Umur Konstruksi dan Pertanggungan terhadap Kegagalan Bangunan <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="umur_konstruksi_gagal_bangunan"
                value={formData.umur_konstruksi_gagal_bangunan ? formData.umur_konstruksi_gagal_bangunan.join("\n") : ""}
                onChange={handleChangeTextArea}
                onFocus={handleFocusTextArea}
                onBlur={handleBlurTextArea}
                className={errors.umur_konstruksi_gagal_bangunan ? "input-textarea-form-error" : "input-textarea-form"}
                placeholder="Isi bagian ini"
                onKeyDown={handleKeyDownTextAreaAbc}
              />
              {errors.umur_konstruksi_gagal_bangunan && <span className="error-text">{errors.umur_konstruksi_gagal_bangunan}</span>}
            </div>
            <div className="input-container-form">
              <label className="input-label-form">
                Penyelesaian Perselisihan/ Sengketa <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="perselisihan_sengketa"
                value={formData.perselisihan_sengketa}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={errors.perselisihan_sengketa ? "input-textarea-form-error" : "input-textarea-form"}
                placeholder="Isi bagian ini"
              />
              {errors.perselisihan_sengketa && <span className="error-text">{errors.perselisihan_sengketa}</span>}
            </div>
          </div>

          <div className="form-container-section">
            <div className="section-title">DAFTAR HARGA SATUAN TIMPANG</div>
            {inputFieldsDaftarSatuanTimpang.map((field, index) => (
              <div key={index}>
                <div className="input-form-flex">
                  {/* Baris 1: Mata Pembayaran, Satuan Ukuran, Kuantitas */}
                  <div className="input-container-column">
                    <label className="input-label-flex">Mata Pembayaran</label>
                    <input type="text" className="input-field-form-flex" name="mata_pembayaran" value={field.mata_pembayaran} onChange={(e) => handleChangeDaftarHargaSatuanTimpang(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    <label className="input-label-flex">Satuan Ukuran</label>
                    <input type="text" className="input-field-form-flex" name="satuan" value={field.satuan} onChange={(e) => handleChangeDaftarHargaSatuanTimpang(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    <label className="input-label-flex">Kuantitas</label>
                    <input type="text" className="input-field-form-flex" name="kuantitas" value={field.kuantitas} onChange={(e) => handleChangeDaftarHargaSatuanTimpang(index, e)} placeholder="Isi bagian ini" />
                  </div>
                </div>
                {/* Baris 2: Harga Satuan HPS, Harga Satuan Penawaran, % Terhadap HPS */}
                <div className="input-form-flex">
                  <div className="input-container-column">
                    <label className="input-label-flex">Harga Satuan HPS (Rp)</label>
                    <input type="text" className="input-field-form-flex" name="harga_satuan_hps" value={field.harga_satuan_hps.masked} onChange={(e) => handleChangeDaftarHargaSatuanTimpang(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    <label className="input-label-flex">Harga Satuan Penawaran (Rp)</label>
                    <input
                      type="text"
                      className="input-field-form-flex"
                      name="harga_satuan_penawaran"
                      value={field.harga_satuan_penawaran.masked}
                      onChange={(e) => handleChangeDaftarHargaSatuanTimpang(index, e)}
                      placeholder="Isi bagian ini"
                    />
                  </div>

                  <div className="input-container-column">
                    <label className="input-label-flex">% Terhadap HPS</label>
                    <input type="text" className="input-field-form-flex" name="persentase_terhadap_hps" value={field.persentase_terhadap_hps} onChange={(e) => handleChangeDaftarHargaSatuanTimpang(index, e)} placeholder="Isi bagian ini" />
                  </div>
                </div>
                {/* Baris 3: Keterangan */}
                <div className="input-container-form">
                  <label className="input-label-form-middle">Keterangan</label>
                  <input type="text" name="keterangan" className="input-field-form" value={field.keterangan} onChange={(e) => handleChangeDaftarHargaSatuanTimpang(index, e)} placeholder="Isi bagian ini" />
                </div>
              </div>
            ))}
            <div className="add-button-layout">
              <img src={addButton} alt="add-button" onClick={handleAddFieldsDaftarSatuanTimpang} />
              {inputFieldsDaftarSatuanTimpang.length > 1 && <img src={removeButton} alt="add-button" onClick={handleRemoveFieldsDaftarSatuanTimpang} />}
            </div>
          </div>

          <div className="form-container-section">
            <div className="section-tittle">PEKERJAAN UTAMA</div>
            {inputFieldsPekerjaanUtama.map((field, index) => (
              <div key={index}>
                {/* Baris 1 */}
                <div className="input-form-flex">
                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Pekerjaan yang Disubkontrakkan</label>
                    <input type="text" className="input-field-form-flex" name="pekerjaan_yang_disubkontrakan" value={field.pekerjaan_yang_disubkontrakan} onChange={(e) => handleChangePekerjaanUtama(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Nama Subkontraktor</label>
                    <input type="text" className="input-field-form-flex" name="nama_subkontraktor" value={field.nama_subkontraktor} onChange={(e) => handleChangePekerjaanUtama(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Alamat Subkontraktor</label>
                    <input type="text" className="input-field-form-flex" name="alamat_subkontraktor" value={field.alamat_subkontraktor} onChange={(e) => handleChangePekerjaanUtama(index, e)} placeholder="Isi bagian ini" />
                  </div>
                </div>
                {/* Baris 2 */}
                <div className="input-form-flex">
                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Kualifikasi Subkontraktor</label>
                    <input
                      type="text"
                      className="input-field-form-flex-lampiran"
                      name="kualifikasi_subkontraktor"
                      value={field.kualifikasi_subkontraktor}
                      onChange={(e) => handleChangePekerjaanUtama(index, e)}
                      placeholder="Isi bagian ini"
                    />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Keterangan</label>
                    <input type="text" className="input-field-form-flex-lampiran" name="keterangan" value={field.keterangan} onChange={(e) => handleChangePekerjaanUtama(index, e)} placeholder="Isi bagian ini" />
                  </div>
                </div>
              </div>
            ))}
            <div className="add-button-layout">
              <img src={addButton} alt="add-button" onClick={handleAddFieldsPekerjaanUtama} />
              {inputFieldsPekerjaanUtama.length > 1 && <img src={removeButton} alt="add-button" onClick={handleRemoveFieldsPekerjaanUtama} />}
            </div>
          </div>
          <div className="form-container-section">
            <div className="section-tittle">PEKERJAAN BUKAN PEKERJAAN UTAMA</div>
            {inputFieldsPekerjaanBukanPekerjaanUtama.map((field, index) => (
              <div key={index}>
                {/* Baris 1 */}
                <div className="input-form-flex">
                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Pekerjaan yang Disubkontrakkan</label>
                    <input
                      type="text"
                      className="input-field-form-flex"
                      name="pekerjaan_yang_disubkontrakan"
                      value={field.pekerjaan_yang_disubkontrakan}
                      onChange={(e) => handleChangePekerjaanBukanPekerjaanUtama(index, e)}
                      placeholder="Isi bagian ini"
                    />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Nama Subkontraktor</label>
                    <input type="text" className="input-field-form-flex" name="nama_subkontraktor" value={field.nama_subkontraktor} onChange={(e) => handleChangePekerjaanBukanPekerjaanUtama(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Alamat Subkontraktor</label>
                    <input type="text" className="input-field-form-flex" name="alamat_subkontraktor" value={field.alamat_subkontraktor} onChange={(e) => handleChangePekerjaanBukanPekerjaanUtama(index, e)} placeholder="Isi bagian ini" />
                  </div>
                </div>
                {/* Baris 2 */}
                <div className="input-form-flex">
                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Kualifikasi Subkontraktor</label>
                    <input
                      type="text"
                      className="input-field-form-flex-lampiran"
                      name="kualifikasi_subkontraktor"
                      value={field.kualifikasi_subkontraktor}
                      onChange={(e) => handleChangePekerjaanBukanPekerjaanUtama(index, e)}
                      placeholder="Isi bagian ini"
                    />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Keterangan</label>
                    <input type="text" className="input-field-form-flex-lampiran" name="keterangan" value={field.keterangan} onChange={(e) => handleChangePekerjaanBukanPekerjaanUtama(index, e)} placeholder="Isi bagian ini" />
                  </div>
                </div>
              </div>
            ))}
            <div className="add-button-layout">
              <img src={addButton} alt="add-button" onClick={handleAddFieldsPekerjaanBukanPekerjaanUtama} />
              {inputFieldsPekerjaanBukanPekerjaanUtama.length > 1 && <img src={removeButton} alt="add-button" onClick={handleRemoveFieldsPekerjaanBukanPekerjaanUtama} />}
            </div>
          </div>
          <div className="form-container-section">
            <div className="section-tittle">DAFTAR PERSONEL MANAJERIAL</div>
            {inputFieldsDaftarPersonelManajerial.map((field, index) => (
              <div key={index}>
                {/* baris 1 personel manajerial */}
                <div className="input-form-flex">
                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Nama Personel Manajerial</label>
                    <input type="text" className="input-field-form-flex" name="nama_personel" value={field.nama_personel} onChange={(e) => handleChangeDaftarPersonelManajerial(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Jabatan dalam Pekerjaan ini</label>
                    <input type="text" className="input-field-form-flex" name="jabatan_dalam_pekerjaan" value={field.jabatan_dalam_pekerjaan} onChange={(e) => handleChangeDaftarPersonelManajerial(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Tingkat Pendidikan/Ijazah</label>
                    <input type="text" className="input-field-form-flex" name="tingkat_pendidikan" value={field.tingkat_pendidikan} onChange={(e) => handleChangeDaftarPersonelManajerial(index, e)} placeholder="Isi bagian ini" />
                  </div>
                </div>
                {/* baris 2 personel manajerial */}
                <div className="input-form-flex">
                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Pengalaman Kerja Profesional (Tahun)</label>
                    <input type="text" className="input-field-form-flex" name="pengalaman_kerja" value={field.pengalaman_kerja} onChange={(e) => handleChangeDaftarPersonelManajerial(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Sertifikat Kompetensi Kerja</label>
                    <input type="text" className="input-field-form-flex" name="sertifikat_kompetensi" value={field.sertifikat_kompetensi} onChange={(e) => handleChangeDaftarPersonelManajerial(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Keterangan</label>
                    <input type="text" className="input-field-form-flex" name="keterangan" value={field.keterangan} onChange={(e) => handleChangeDaftarPersonelManajerial(index, e)} placeholder="Isi bagian ini" />
                  </div>
                </div>
              </div>
            ))}
            <div className="add-button-layout">
              <img src={addButton} alt="add-button" onClick={handleAddFieldsDaftarPersonelManajerial} />
              {inputFieldsDaftarPersonelManajerial.length > 1 && <img src={removeButton} alt="add-button" onClick={handleRemoveFieldsDaftarPersonelManajerial} />}
            </div>
          </div>
          <div className="form-container-section">
            <div className="section-tittle">DAFTAR PERALATAN UTAMA</div>
            {inputFieldsDaftarPeralatanUtama.map((field, index) => (
              <div key={index}>
                {/* baris 1 daftar peralatan utama */}
                <div className="input-form-flex">
                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Nama Peralatan Utama</label>
                    <input type="text" className="input-field-form-flex" name="nama_peralatan_utama" value={field.nama_peralatan_utama} onChange={(e) => handleChangeDaftarPeralatanUtama(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Merek dan Tipe</label>
                    <input type="text" className="input-field-form-flex" name="merek" value={field.merek} onChange={(e) => handleChangeDaftarPeralatanUtama(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Kapasitas</label>
                    <input type="text" className="input-field-form-flex" name="kapasitas" value={field.kapasitas} onChange={(e) => handleChangeDaftarPeralatanUtama(index, e)} placeholder="Isi bagian ini" />
                  </div>
                </div>
                {/* baris 2 daftar peralatan utama */}
                <div className="input-form-flex">
                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Jumlah</label>
                    <input type="text" className="input-field-form-flex" name="jumlah" value={field.jumlah} onChange={(e) => handleChangeDaftarPeralatanUtama(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Kondisi</label>
                    <input type="text" className="input-field-form-flex" name="kondisi" value={field.kondisi} onChange={(e) => handleChangeDaftarPeralatanUtama(index, e)} placeholder="Isi bagian ini" />
                  </div>

                  <div className="input-container-column">
                    {" "}
                    <label className="input-label-flex">Status Kepemilikan</label>
                    <input type="text" className="input-field-form-flex" name="status_kepemilikan" value={field.status_kepemilikan} onChange={(e) => handleChangeDaftarPeralatanUtama(index, e)} placeholder="Isi bagian ini" />
                  </div>
                </div>
                {/* baris 3 daftar peralatan utama */}
                <div className="input-container-form">
                  <label className="input-label-form-middle">Keterangan</label>
                  <input type="text" className="input-field-form" name="keterangan" value={field.keterangan} onChange={(e) => handleChangeDaftarPeralatanUtama(index, e)} placeholder="Isi bagian ini" />
                </div>
              </div>
            ))}
            <div className="add-button-layout">
              <img src={addButton} alt="add-button" onClick={handleAddFieldsDaftarPeralatanUtama} />
              {inputFieldsDaftarPeralatanUtama.length > 1 && <img src={removeButton} alt="add-button" onClick={handleRemoveFieldsDaftarPeralatanUtama} />}
            </div>
          </div>
          <button className="button-simpan-blue" onClick={handleSubmitSyaratKhususKontrak}>
            Simpan
          </button>
        </div>

        <ComponentWord />
        <SyaratKhususKontrakPreview
          formDataPreview={formData}
          dataPembayaranPrestasi={inputFieldsPembayaranPrestasiPekerjaan}
          dataSatuanTimpang={inputFieldsDaftarSatuanTimpang}
          dataPekerjaanUtama={inputFieldsPekerjaanUtama}
          dataPekerjaanBukanPekerjaanUtama={inputFieldsPekerjaanBukanPekerjaanUtama}
          dataDaftarPersonilManajerial={inputFieldsDaftarPersonelManajerial}
          dataDaftarPeralatanUtama={inputFieldsDaftarPeralatanUtama}
          dataProjectDetail={projectDetailData}
        />
      </div>
    </>
  );
};

export default forwardRef(SyaratKhususKontrak);

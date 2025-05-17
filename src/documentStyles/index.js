import suratPernyataanStyle from "./suratPernyataanStyle";
import ringkasanKontrakStyle from "./ringkasanKontrakStyle";
import suratSPPBJStyle from "./sppbjStyle";
import bapTerminStyle from "./bapTerminStyle";
import bapTahapStyle from "./bapTahapStyle";
import kwitansiTahapStyle from "./kwitansiTahapStyle";
import kwitansiTerminStyle from "./kwitansiTerminStyle";
import spmkStyle from "./spmkStyle";
import bapUangMukaStyle from "./bapUangMukaStyle";
import bapPekerjaanPengawasanStyle from "./bapPekerjaanPengawasanStyle";
import bapPekerjaanPerencanaanStyle from "./bapPekerjaanPerencanaanStyle";
import syaratKhususKontrakStyle from "./syaratKhususKontrakStyle";
import suratPerjanjianKontrakStyle from "./suratPerjanjianKontrakStyle";
import bapPemeriksaanTahapStyle from "./bapPemeriksaanTahapStyle";
import bapSerahTerimaTahapStyle from "./bapSerahTerimaTahapStyle";

const documentStyleMapping = {
  surat_pernyataan: suratPernyataanStyle,
  ringkasan_kontrak: ringkasanKontrakStyle,
  sppbj: suratSPPBJStyle,
  berita_acara_pembayaran_termin: bapTerminStyle,
  berita_acara_pembayaran_tahap: bapTahapStyle,
  kwitansi_tahap: kwitansiTahapStyle,
  kwitansi_termin: kwitansiTerminStyle,
  surat_perintah_mulai_kerja: spmkStyle,
  berita_acara_pembayaran_uangmuka: bapUangMukaStyle,
  bap_pekerjaan_pengawasan: bapPekerjaanPengawasanStyle,
  bap_pekerjaan_perencanaan: bapPekerjaanPerencanaanStyle,
  surat_sskk: syaratKhususKontrakStyle,
  surat_perjanjian_kontrak: suratPerjanjianKontrakStyle,
  bap_pemeriksaan_tahap: bapPemeriksaanTahapStyle,
  bap_serahterima_tahap: bapSerahTerimaTahapStyle,

  // tambah dokumen lain
};

export default documentStyleMapping;

import LogoKampus from "../../Assets/Images/LogoKampus.png";
import "./RingkasanKontrak.css";

const RingkasanKontrakWord = ({ formDataPreview, detailProjectData }) => {
  return (
    <div className="preview-layout">
      <div class="a4-container">
        <div className="surat-header">
          <img src={LogoKampus} alt="logo-kampus" />
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
        <div className="separator-black"></div>
        <div className="tittle-surat-ringkasan-kontrak">RINGKASAN KONTRAK</div>
        <div className="tittle-nomor-ringkasan-kontrak">
          Nomor : <span>{formDataPreview.nomor_ringkasan_kontrak || "(Nomor Ringkasan Kontrak)"}</span>
        </div>

        <div className="ringkasan-container">
          <span className="label-ringkasan">1. Nomor dan tanggal DIPA</span>
          <span className="separator-ringkasan">:</span>
          <span className="value-ringkasan">
            <span>
              {formDataPreview.nomor_surat_dipa || "(Nomor dan Tanggal DIPA)"}{" "}
              {(formDataPreview.tanggal_surat_DIPA &&
                new Date(formDataPreview.tanggal_surat_DIPA).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })) ||
                "(Tanggal Surat DIPA)"}
            </span>{" "}
          </span>

          <span className="label-ringkasan">2. Kode Kegiatan/Sub Kegiatan MAK</span>
          <span className="separator-ringkasan">:</span>
          <span className="value-ringkasan">
            <span>{formDataPreview.kode_kegiatan_mak || "(Kode Kegiatan/Sub Kegiatan MAK)"}</span>
          </span>

          <span className="label-ringkasan">3. Nomor & Tanggal Surat Perjanjian</span>
          <span className="separator-ringkasan">:</span>
          {/* dari project detail */}
          <span className="value-ringkasan">
            <span>{detailProjectData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>,{" "}
            <span>
              {(detailProjectData.tanggal_surat_perjanjian_kontrak &&
                new Date(detailProjectData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })) ||
                "(Tanggal Surat DIPA)"}
            </span>
          </span>

          <span className="label-ringkasan">4. Nama Kontraktor/Perusahaan</span>
          <span className="separator-ringkasan">:</span>
          <span className="value-ringkasan">
            <span>{detailProjectData.perusahaan_pihak_2 || "Perusahaan pihak 2"}</span>
          </span>
          <span className="label-ringkasan">5. Alamat Penyedia/Perusahaan</span>
          {/* dari project detail  */}
          <span className="separator-ringkasan">:</span>
          <span className="value-ringkasan">
            <span>{detailProjectData.alamat_pihak_2 || "Perusahaan pihak 2"}</span>
          </span>

          <span className="label-ringkasan">6. Nilai Surat Perjanjian /Kontrak</span>
          <span className="separator-ringkasan">:</span>
          <span className="value-ringkasan">
            <span>{formDataPreview.nilai_kontrak.masked || "(Nila Kontrak)"}</span> (<span>{formDataPreview.nilai_kontrak_terbilang || "(Nilai Kontrak terbilang)"}</span>)
          </span>

          <span className="label-ringkasan">7. Uraian & Volume Pekerjaan</span>
          <span className="separator-ringkasan">:</span>
          <span className="value-ringkasan">
            <span>{formDataPreview.uraian_pekerjaan || "(Uraian Pekerjaan)"}</span>
          </span>

          <span className="label-ringkasan">8. Cara Pembayaran</span>
          <span className="separator-ringkasan">:</span>
          <span className="value-ringkasan">
            <span>{formDataPreview.dalam_rangka_pembayaran || "(Cara Pembayaran)"}</span> = <span>{formDataPreview.nominal_pembayaran.masked || "(Nominal Pembayaran)"}</span> (
            <span>{formDataPreview.nominal_pembayaran_terbilang || "(Nominal Pembayaran Terbilang)"}</span>), dengan Jaminan Uang Muka
          </span>

          <span className="label-ringkasan">9. Jangka Waktu Pelaksanaan</span>
          <span className="separator-ringkasan">:</span>
          <span className="value-ringkasan">
            {" "}
            <span>{formDataPreview.jangka_waktu_pelaksanaan || "(Jangka Waktu Pelaksanaan)"}</span> <span>({formDataPreview.jangka_waktu_pelaksanaan_terbilang || "(Jangka Waktu Pelaksanaan Terbilang)"})</span> hari kalender
          </span>

          <span className="label-ringkasan">10. Ketentuan Sanksi</span>
          <span className="separator-ringkasan">:</span>
          <span className="value-ringkasan">{formDataPreview.ketentuan_sanksi}</span>

          <span className="label-ringkasan">11. Nama Bank</span>
          <span className="separator-ringkasan">:</span>
          {/* project detail nama bank pihak 2 */}
          <span className="value-ringkasan">
            <span>({detailProjectData.nama_bank_pihak_2 || "(Nama Bank pihak 2)"})</span>
          </span>

          <span className="label-ringkasan">12. Nomor Rekening</span>
          {/* project detail no rek pihak 2 */}
          <span className="separator-ringkasan">:</span>
          <span className="value-ringkasan">
            <span>{detailProjectData.nomor_rekening_pihak_2 || "(Nomor Rekening pihak 2)"} </span> a.n <span>{detailProjectData.perusahaan_pihak_2 || "(Perusahaan pihak 2)"}</span>
          </span>
          <span className="label-ringkasan">13. NPWP</span>
          {/* project detail no npwp pihak 2 */}
          <span className="separator-ringkasan">:</span>
          <span className="value-ringkasan">
            <span>{detailProjectData.npwp_pihak_2 || "(Nama Bank pihak 2)"}</span>
          </span>
        </div>
        {/* project detail  */}
        <div className="surat-ttd-ringkasan">
          <span>{detailProjectData.tempat_ttd || "(Tempat TTD)"}</span>,{" "}
          <span>
            {(formDataPreview.tanggal_ringkasan_kontrak &&
              new Date(formDataPreview.tanggal_ringkasan_kontrak).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })) ||
              "(Tanggal Ringkasan Kontrak)"}
          </span>
          <br />
          a.n. Kuasa Pengguna Anggaran/ <br /> <span>{detailProjectData.jabatan_pihak_1 || "(Jabatan pihak 1)"}</span> <br />
          UNIVERSITAS BENGKULU
        </div>
        <div className="identity-ringkasan-kontrak">
          <span className="name">
            <span>{detailProjectData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
          </span>
          <span className="nip">
            NIP: <span>{detailProjectData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RingkasanKontrakWord;

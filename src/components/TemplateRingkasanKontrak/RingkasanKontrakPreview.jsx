import LogoKampus from "../../Assets/Images/LogoKampus.png";
import "./RingkasanKontrakUI.css";

const RingkasanKontrakPreview = ({ formDataPreview, detailProjectData }) => {
  return (
    <div className="preview-layout">
      <div className="preview-bar-ui">Preview</div>
      <div class="a4-container-ui">
        <div className="surat-header-ui">
          <img src={LogoKampus} alt="logo-kampus" />
          <div className="surat-header-text-bold-ui">
            KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
            <br />
            DAN TEKNOLOGI
            <br /> UNIVERSITAS BENGKULU
          </div>
        </div>
        <div className="surat-header-text-light-ui">
          Jalan WR. Supratman Kandang Limun Bengkulu 38371 A
          <br />
          Telepon (0736) 21170, 21884 Faksimile (0736) 22105
          <br /> Laman : www.unib.ac.id e-mail : rektorat@unib.ac.id
        </div>
        <div className="separator-black-ui"></div>
        <div className="tittle-surat-ringkasan-kontrak-ui">RINGKASAN KONTRAK</div>
        <div className="tittle-nomor-ringkasan-kontrak-ui">
          Nomor : <span style={{ color: "red" }}>{formDataPreview.nomor_ringkasan_kontrak || "(Nomor Ringkasan Kontrak)"}</span>
        </div>

        <div className="ringkasan-container-ui">
          <span className="label-ringkasan-ui">1. Nomor dan tanggal DIPA</span>
          <span className="separator-ringkasan-ui">:</span>
          <span className="value-ringkasan-ui">
            <span style={{ color: "red" }}>
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

          <span className="label-ringkasan-ui">2. Kode Kegiatan/Sub Kegiatan MAK</span>
          <span className="separator-ringkasan-ui">:</span>
          <span className="value-ringkasan-ui">
            <span style={{ color: "red" }}>{formDataPreview.kode_kegiatan_mak || "(Kode Kegiatan/Sub Kegiatan MAK)"}</span>
          </span>

          <span className="label-ringkasan-ui">3. Nomor & Tanggal Surat Perjanjian</span>
          <span className="separator-ringkasan-ui">:</span>
          {/* dari project detail */}
          <span className="value-ringkasan-ui">
            <span style={{ color: "red" }}>{detailProjectData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>,{" "}
            <span style={{ color: "red" }}>
              {(detailProjectData.tanggal_surat_perjanjian_kontrak &&
                new Date(detailProjectData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })) ||
                "(Tanggal Surat DIPA)"}
            </span>
          </span>

          <span className="label-ringkasan-ui">4. Nama Kontraktor/Perusahaan</span>
          <span className="separator-ringkasan-ui">:</span>
          <span className="value-ringkasan-ui">
            <span style={{ color: "red" }}>{detailProjectData.perusahaan_pihak_2 || "Perusahaan pihak 2"}</span>
          </span>
          <span className="label-ringkasan-ui">5. Alamat Penyedia/Perusahaan</span>
          {/* dari project detail  */}
          <span className="separator-ringkasan-ui">:</span>
          <span className="value-ringkasan-ui">
            <span style={{ color: "red" }}>{detailProjectData.alamat_pihak_2 || "Perusahaan pihak 2"}</span>
          </span>

          <span className="label-ringkasan-ui">6. Nilai Surat Perjanjian /Kontrak</span>
          <span className="separator-ringkasan-ui">:</span>
          <span className="value-ringkasan-ui">
            <span style={{ color: "red" }}>{formDataPreview.nilai_kontrak.masked || "(Nila Kontrak)"}</span> (<span style={{ color: "red" }}>{formDataPreview.nilai_kontrak_terbilang || "(Nilai Kontrak terbilang)"}</span>)
          </span>

          <span className="label-ringkasan-ui">7. Uraian & Volume Pekerjaan</span>
          <span className="separator-ringkasan-ui">:</span>
          <span className="value-ringkasan-ui">
            <span style={{ color: "red" }}>{formDataPreview.uraian_pekerjaan || "(Uraian Pekerjaan)"}</span>
          </span>

          <span className="label-ringkasan-ui">8. Cara Pembayaran</span>
          <span className="separator-ringkasan-ui">:</span>
          <span className="value-ringkasan-ui">
            <span style={{ color: "red" }}>{formDataPreview.dalam_rangka_pembayaran || "(Cara Pembayaran)"}</span> = <span style={{ color: "red" }}>{formDataPreview.nominal_pembayaran.masked || "(Nominal Pembayaran)"}</span> (
            <span style={{ color: "red" }}>{formDataPreview.nominal_pembayaran_terbilang || "(Nominal Pembayaran Terbilang)"}</span>), dengan Jaminan Uang Muka
          </span>

          <span className="label-ringkasan-ui">9. Jangka Waktu Pelaksanaan</span>
          <span className="separator-ringkasan-ui">:</span>
          <span className="value-ringkasan-ui">
            {" "}
            <span style={{ color: "red" }}>{formDataPreview.jangka_waktu_pelaksanaan || "(Jangka Waktu Pelaksanaan)"}</span>{" "}
            <span style={{ color: "red" }}>({formDataPreview.jangka_waktu_pelaksanaan_terbilang || "(Jangka Waktu Pelaksanaan Terbilang)"})</span> hari kalender
          </span>

          <span className="label-ringkasan-ui">10. Ketentuan Sanksi</span>
          <span className="separator-ringkasan-ui">:</span>
          <span className="value-ringkasan-ui">{formDataPreview.ketentuan_sanksi}</span>

          <span className="label-ringkasan-ui">11. Nama Bank</span>
          <span className="separator-ringkasan-ui">:</span>
          {/* project detail nama bank pihak 2 */}
          <span className="value-ringkasan-ui">
            <span style={{ color: "red" }}>({detailProjectData.nama_bank_pihak_2 || "(Nama Bank pihak 2)"})</span>
          </span>

          <span className="label-ringkasan-ui">12. Nomor Rekening</span>
          {/* project detail no rek pihak 2 */}
          <span className="separator-ringkasan-ui">:</span>
          <span className="value-ringkasan-ui">
            <span style={{ color: "red" }}>{detailProjectData.nomor_rekening_pihak_2 || "(Nomor Rekening pihak 2)"} </span> a.n <span style={{ color: "red" }}>{detailProjectData.perusahaan_pihak_2 || "(Perusahaan pihak 2)"}</span>
          </span>
          <span className="label-ringkasan-ui">13. NPWP</span>
          {/* project detail no npwp pihak 2 */}
          <span className="separator-ringkasan-ui">:</span>
          <span className="value-ringkasan-ui">
            <span style={{ color: "red" }}>{detailProjectData.npwp_pihak_2 || "(Nama Bank pihak 2)"}</span>
          </span>
        </div>
        {/* project detail  */}
        <div className="surat-ttd-ringkasan-ui">
          <span style={{ color: "red" }}>{detailProjectData.tempat_ttd || "(Tempat TTD)"}</span>,{" "}
          <span style={{ color: "red" }}>
            {(formDataPreview.tanggal_ringkasan_kontrak &&
              new Date(formDataPreview.tanggal_ringkasan_kontrak).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })) ||
              "(Tanggal Ringkasan Kontrak)"}
          </span>
          <br />
          a.n. Kuasa Pengguna Anggaran/ <br /> <span style={{ color: "red" }}>{detailProjectData.jabatan_pihak_1 || "(Jabatan pihak 1)"}</span> <br />
          UNIVERSITAS BENGKULU
        </div>
        <div className="identity-ui-ringkasan-kontrak">
          <span className="name-ui">
            <span style={{ color: "red" }}>{detailProjectData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
          </span>
          <span className="nip-ui">
            NIP: <span style={{ color: "red" }}>{detailProjectData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RingkasanKontrakPreview;

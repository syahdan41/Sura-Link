import LogoKampus from "../../Assets/Images/LogoKampus.png";
import "./SuratSPMK.css";

const SuratSPMKWord = ({ previewFormData, detailProjectData }) => {
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
        <div className="tittle-surat-ringkasan-kontrak">SURAT PERINTAH MULAI KERJA (SPMK)</div>
        <div className="spmk-nomor-paket-layout">
          <div>
            Nomor: <span style={{ color: "red" }}>{previewFormData.nomor_spmk || "(Nomor Surat SPMK)"}</span>
          </div>
          <div>
            Paket Pekerjaan: <span style={{ color: "red" }}>{detailProjectData.pekerjaan || "(Paket Pekerjaan)"}</span>
          </div>
        </div>
        <div className="spmk-justify-text">Yang bertanda tangan di bawah ini:</div>
        <div className="spmk-text-container">
          <div>
            <span style={{ color: "red" }}>{detailProjectData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
          </div>
          <div>
            <span style={{ color: "red" }}>{detailProjectData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
          </div>
          <div>
            <span style={{ color: "red" }}>{detailProjectData.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
          </div>
        </div>
        <div className="spmk-justify-text">
          selanjutnya disebut sebagai <em>Pejabat Penandatangan Kontrak,</em>{" "}
        </div>
        <div className="spmk-justify-text">
          berdasarkan Surat Perjanjian Paket Pekerjaan <span style={{ color: "red" }}>{detailProjectData.pekerjaan || "(Paket Pekerjaan)"}</span>, Nomor{" "}
          <span style={{ color: "red" }}>{detailProjectData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Kontrak)"}</span> tanggal{" "}
          <span style={{ color: "red" }}>
            {(detailProjectData.tanggal_surat_perjanjian_kontrak &&
              new Date(detailProjectData.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })) ||
              "(Tanggal Surat Kontrak)"}
          </span>
          , bersama ini memerintahkan:
        </div>
        <div className="spmk-text-container">
          <div>
            <span style={{ color: "red" }}>{detailProjectData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
          </div>
          <div>
            <span style={{ color: "red" }}>{detailProjectData.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
          </div>
          <div>
            Yang dalam hal ini diwakili oleh: <span style={{ color: "red" }}>{detailProjectData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
          </div>
        </div>
        <div className="spmk-justify-text">selanjutnya disebut sebagai Penyedia;</div>

        <div className="spmk-container">
          <p className="spmk-intro">untuk segera memulai pelaksanaan pekerjaan dengan memperhatikan ketentuan-ketentuan sebagai berikut:</p>

          <div className="spmk-item">
            <span className="spmk-label">1. Ruang Lingkup Pekerjaan</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              <span style={{ color: "red" }}>{previewFormData.ruang_lingkup || "(Ruang Lingkup Pekerjaan)"}</span>
            </span>
          </div>

          <div className="spmk-item">
            <span className="spmk-label">2. Tanggal Mulai Kerja</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              <span style={{ color: "red" }}>
                {(previewFormData.tanggal_awal_kerja &&
                  new Date(previewFormData.tanggal_awal_kerja).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Mulai Kerja)"}
              </span>
            </span>
          </div>

          <div className="spmk-item">
            <span className="spmk-label">3. Syarat-Syarat Pekerjaan</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">Sesuai dengan persyaratan dan ketentuan Kontrak</span>
          </div>

          <div className="spmk-item">
            <span className="spmk-label">4. Waktu Penyelesaian</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              Selama <span style={{ color: "red" }}>{previewFormData.rentang_hari || "(Rentang Hari Pekerjaan)"}</span> (<span style={{ color: "red" }}>{previewFormData.rentang_hari_terbilang || "(Rentang Hari Pekerjaan Terbilang)"}</span>)
              hari kalender dan pekerjaan harus sudah selesai pada tanggal{" "}
              <span style={{ color: "red" }}>
                {(previewFormData.tanggal_akhir_kerja &&
                  new Date(previewFormData.tanggal_akhir_kerja).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Akhir Kerja)"}
                .
              </span>
            </span>
          </div>

          <div className="spmk-item">
            <span className="spmk-label">5. Denda</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              <span style={{ color: "red" }}>{previewFormData.denda_pekerjaan || "(Denda)"}</span>
            </span>
          </div>
        </div>
        <div className="ttd-spmk-layout">
          <div className="ttd-spmk-text-container">
            <div>
              <span style={{ color: "red" }}>{detailProjectData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
            </div>
            <div>
              <span style={{ color: "red" }}>{detailProjectData.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
            </div>
            <div>
              Yang dalam hal ini diwakili oleh: <span style={{ color: "red" }}>{detailProjectData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
            </div>
          </div>
          <div className="ttd-spmk-text-container">
            <div>
              <span style={{ color: "red" }}>{detailProjectData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
            </div>
            <div>
              <span style={{ color: "red" }}>{detailProjectData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
            </div>
            <div>
              NIP.<span style={{ color: "red" }}>{detailProjectData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
            </div>
          </div>
        </div>
        <div className="sec-page-content">
          <div className="spmk-justify-text">
            <strong>Menerima dan menyetujui:</strong>
          </div>
          <div className="ttd-spmk-layout">
            <div className="ttd-spmk-text-container">
              <div>
                Untuk dan atas nama <span style={{ color: "red" }}>{detailProjectData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
              </div>
            </div>
            <div className="ttd-spmk-text-container">
              <div>
                <span style={{ color: "red" }}>{detailProjectData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
              </div>
              <div>
                <span style={{ color: "red" }}>{detailProjectData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuratSPMKWord;

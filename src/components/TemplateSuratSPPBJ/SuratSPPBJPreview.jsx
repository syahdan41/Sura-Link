import LogoKampus from "../../Assets/Images/LogoKampus.png";
import "./SuratSPPBJUI.css";

const SuratSPPBJPreview = ({ formDataPreview, dataProjectDetail }) => {
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
        <div className="tittle-surat-ringkasan-kontrak-ui">SURAT PENUNJUKAN PENYEDIA BARANG/JASA (SPPBJ)</div>
        <div className="spmk-container-ui">
          <p className="spmk-intro-ui"></p>

          <div className="sppbj-item-ui">
            <span className="spmk-label-ui">Nomor</span>
            <span className="spmk-separator-ui">:</span>
            <span className="spmk-value-ui">
              <span style={{ color: "red" }}>{dataProjectDetail.nomor_surat_penunjukan_penyedia_barang_jasa_sppbj || "(Nomor Surat SPPBJ)"}</span>,{" "}
              <span style={{ color: "red" }}>
                {(dataProjectDetail.tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj &&
                  new Date(dataProjectDetail.tanggal_surat_penunjukan_penyedia_barang_jasa_sppbj).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Surat SPPBJ)"}
              </span>
            </span>
          </div>

          <div className="sppbj-item-ui">
            <span className="spmk-label-ui">H a l </span>
            <span className="spmk-separator-ui">:</span>
            <span className="spmk-value-ui">
              Penunjukan Penyedia Barang/Jasa untuk Pelaksanaan Paket Pekerjaan <span style={{ color: "red" }}>{dataProjectDetail.pekerjaan || "(Paket Pekerjaan)"}</span>
            </span>
          </div>
        </div>

        <div className="spmk-text-container">
          <div>
            Yth. Direktur <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
          </div>
          <div>
            <span style={{ color: "red" }}>{dataProjectDetail.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
          </div>
        </div>
        <div className="spmk-justify-text-ui">Dengan ini kami beritahukan bahwa berdasarkan penawaran Saudara pada aplikasi LPSE Universitas Bengkulu :</div>
        <div className="spmk-container-ui">
          <p className="spmk-intro-ui"></p>
          <div className="sppbj-item-ui">
            <span className="spmk-label-ui">Kode Tender/ID Paket</span>
            <span className="spmk-separator-ui">:</span>
            <span className="spmk-value-ui">
              <span style={{ color: "red" }}>{formDataPreview.kode_tender || "(Kode Tender)"}</span>
            </span>
          </div>

          <div className="sppbj-item-ui">
            <span className="spmk-label-ui">Nama Paket</span>
            <span className="spmk-separator-ui">:</span>
            <span className="spmk-value-ui">
              <span style={{ color: "red" }}>{dataProjectDetail.pekerjaan || "(Paket Pekerjaan)"}</span>
            </span>
          </div>

          <div className="sppbj-item-ui">
            <span className="spmk-label-ui">Nilai Penawaran</span>
            <span className="spmk-separator-ui">:</span>
            <span className="spmk-value-ui">
              <span style={{ color: "red" }}>{formDataPreview.nilai_penawaran.masked || "(Nilai Penawaran)"}</span>
            </span>
          </div>

          <div className="sppbj-item-ui">
            <span className="spmk-label-ui">Nilai Terkoreksi</span>
            <span className="spmk-separator-ui">:</span>
            <span className="spmk-value-ui">
              <span style={{ color: "red" }}>{formDataPreview.nilai_terkoreksi.masked || "(Nilai Terkoreksi)"}</span>
            </span>
          </div>

          <div className="sppbj-item-ui">
            <span className="spmk-label-ui">Nilai Final</span>
            <span className="spmk-separator-ui">:</span>
            <span className="spmk-value-ui">
              <span style={{ color: "red" }}>{formDataPreview.nilai_final.masked || "(Nilai Final)"}</span>
            </span>
          </div>
        </div>
        <div className="spmk-justify-text-ui">
          Sebagai tindak lanjut dari Surat Penunjukan Penyedia Barang/Jasa (SPPBJ) ini, Saudara diharuskan untuk menyerahkan Jaminan Pelaksanaan sebesar{" "}
          <strong>
            <span style={{ color: "red" }}>{formDataPreview.nilai_jaminan_pelaksanaan_terbilang || "(Nilai Jaminan Pelaksanaan Terbilang)"}</span> (
            <span style={{ color: "red" }}>{formDataPreview.nomor_surat_perintah_kerja || "(Nomor Surat Perintah Kerja)"}</span>)
          </strong>{" "}
          dengan masa berlaku selama <span style={{ color: "red" }}>{formDataPreview.jangka_waktu_pekerjaan || "(Jangka Waktu Pekerjaan)"}</span>(
          <span style={{ color: "red" }}>{formDataPreview.jangka_waktu_pekerjaan_terbilang || "(Jangka Waktu Pekerjaan Terbilang)"}</span>) hari kalender dan menandatangani Surat Perjanjian paling lambat 14 (empat belas) hari kerja setelah
          diterbitkannya SPPBJ.
        </div>
        <div className="spmk-justify-text-ui">
          Kegagalan Saudara untuk menerima penunjukan ini, akan dikenakan sanksi sesuai ketentuan dalam <span style={{ color: "red" }}>{formDataPreview.aturan_sanksi || "(UU/PP/Aturan Sanksi)"}</span>.
        </div>

        <div className="ttd-sppbj-layout-ui">
          <div className="ttd-spmk-text-container-ui">
            <div>Pejabat Pembuat Komitmen</div>
            <strong>PPK Universitas Bengkulu</strong>
          </div>
          <div className="ttd-spmk-text-container-ui">
            <strong>
              <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_1 || "(Nama Pihak 1)"}</span>
            </strong>
            <div>
              NIP.<span style={{ color: "red" }}>{dataProjectDetail.nip_pihak_1 || "(NIP Pihak 1)"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="sec-page-content-sppbj-ui">
        <div className="spmk-justify-text-ui">
          <div>Tembusan:</div>
          {formDataPreview.tembusan.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuratSPPBJPreview;

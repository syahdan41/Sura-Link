import "./KwitansiTerminUI.css";

const KwitansiTerminPreview = ({ previewFormData, detailDataProject }) => {
  return (
    <div className="preview-layout">
      <div className="preview-bar-ui">Preview</div>
      <div className="a4-container-kwitansi-ui">
        <div className="kwitansi-content-ui">
          <div className="bank-detail-ui">
            <div class="bank-container-ui">
              <div class="bank-item-ui">
                <span class="bank-label-ui">BANK</span> <span class="bank-separator">:</span>
                <span class="bank-value-ui">
                  <span style={{ color: "red" }}>{detailDataProject.nama_bank_pihak_2 || "(Nama Bank Pihak 2)"}</span>
                </span>
              </div>
              <div class="bank-item-ui">
                <span class="bank-label-ui">REKENING</span> <span class="bank-separator">:</span>
                <span class="bank-value-ui">
                  <span style={{ color: "red" }}>{detailDataProject.nomor_rekening_pihak_2 || "(Rekening pihak 2)"}</span>
                </span>
              </div>
              <div class="bank-item-ui">
                <span class="bank-label-ui">NPWP</span> <span class="bank-separator">:</span>
                <span class="bank-value-ui">
                  <span style={{ color: "red" }}>{detailDataProject.npwp_pihak_2 || "(NPWP Pihak 2)"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="kwitansi-tittle-bar-ui">KWITANSI</div>

          <div className="kwitansi-detail-container-ui">
            <span className="label-detail-kwitansi-ui">Telah Terima Dari</span>
            <span className="separator-detail-kwitansi-ui">:</span>
            <span className="value-detail-kwitansi-ui">
              <span style={{ color: "red" }}>{previewFormData.telah_terima_dari || "(Telah Terima Dari)"}</span>
            </span>

            <span className="label-detail-kwitansi-ui">Uang Sebanyak</span>
            <span className="separator-detail-kwitansi-ui">:</span>
            <span className="value-detail-kwitansi-ui">
              <span style={{ color: "red" }}>{previewFormData.total_uang_terbilang || "(Uang Sebanyak)"}</span>
            </span>

            <span className="label-detail-kwitansi-ui">Untuk Pembayaran</span>
            <span className="separator-detail-kwitansi-ui">:</span>
            <span className="value-detail-kwitansi-ui">
              <span style={{ color: "red" }}>{previewFormData.tujuan_pembayaran || "(Untuk Pembayaran)"}</span>
            </span>

            <span className="label-detail-kwitansi-ui">Surat Perjanjian/Kontrak</span>
            <span className="separator-detail-kwitansi-ui">:</span>
            <span className="value-detail-kwitansi-ui">
              {/* dari project detail */}
              Nomor <span className="separator-detail-kwitansi-ui">:</span> <span style={{ color: "red" }}>{detailDataProject.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>{" "}
              <span style={{ color: "red" }}>
                {(detailDataProject.tanggal_surat_perjanjian_kontrak &&
                  new Date(detailDataProject.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Surat Perjanjian Kontrak)"}
              </span>
            </span>

            <span className="label-detail-kwitansi-ui">Berita Acara Pembayaran</span>
            <span className="separator-detail-kwitansi-ui">:</span>
            <span className="value-detail-kwitansi-ui">
              Nomor <span className="separator-detail-kwitansi-ui">:</span> <span style={{ color: "red" }}>{previewFormData.nomorSuratBAP || "(Nomor Surat BAP)"}</span>{" "}
              <span style={{ color: "red" }}>
                {(previewFormData.tanggalSuratBAP &&
                  new Date(previewFormData.tanggalSuratBAP).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Surat BAP)"}
              </span>
            </span>
          </div>

          <div className="jumlah-layout-ui">
            <span className="label-jumlah-kwitansi-ui">JUMLAH</span>
            <span className="separator-jumlah-kwitansi-ui">:</span>
            <span className="value-jumlah-kwitansi-ui">{previewFormData.total_uang.masked || "(Total uang)"},- </span>
          </div>
          {/* dari project detail semua yg bawah */}
          <div className="tertanda-layout-ui">
            <div className="ttd-1-ui">
              {" "}
              <div className="setuju-dibayar-ui">
                Setuju Dibayar : <br /> a/n Kuasa Pengguna Anggaran / <br /> Pejabat Pembuat Komitmen <br /> Universitas Bengkulu
              </div>
              <div className="ttd-kwitansi-ui">
                <div className="ttd-bold">
                  <span style={{ color: "red" }}>{detailDataProject.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                </div>
                <div className="ttd-nip">
                  NIP. <span style={{ color: "red" }}>{detailDataProject.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                </div>
              </div>
            </div>

            <div className="ttd-2-ui">
              <div className="tanggal-kwitansi-layout-ui">
                <span style={{ color: "red" }}>{detailDataProject.tempat_ttd || "(Tempat TTD)"}</span>,{" "}
                <span style={{ color: "red" }}>
                  {(previewFormData.tanggal_kwitansi &&
                    new Date(previewFormData.tanggal_kwitansi).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Kwitansi)"}
                </span>
              </div>
              <div className="yang-menerima-ui">
                Yang Menerima <br /> Penyedia <br /> <span style={{ color: "red" }}>{detailDataProject.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
              </div>{" "}
              <div className="ttd-kwitansi-ui">
                <div className="ttd-bold-ui">
                  <span style={{ color: "red" }}>{detailDataProject.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                </div>
                <div className="ttd-nip-ui">
                  <span style={{ color: "red" }}>{detailDataProject.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KwitansiTerminPreview;

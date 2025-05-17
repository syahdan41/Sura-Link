import "./Kwitansi.css";

const KwitansiWord = ({ previewFormData, detailDataProject }) => {
  return (
    <div className="preview-layout">
      <div className="a4-container-kwitansi">
        <div className="kwitansi-content">
          <div className="kwitansi-tittle-bar">KWITANSI</div>
          <div className="bank-detail">
            <div class="bank-container">
              <div class="bank-item">
                <span class="bank-label">BANK</span> <span class="bank-separator">:</span>
                <span class="bank-value">
                  <span style={{ color: "red" }}>{detailDataProject.nama_bank_pihak_2 || "(Nama Bank Pihak 2)"}</span>
                </span>
              </div>
              <div class="bank-item">
                <span class="bank-label">REKENING</span> <span class="bank-separator">:</span>
                <span class="bank-value">
                  <span style={{ color: "red" }}>{detailDataProject.nomor_rekening_pihak_2 || "(Rekening pihak 2)"}</span>
                </span>
              </div>
              <div class="bank-item">
                <span class="bank-label">NPWP</span> <span class="bank-separator">:</span>
                <span class="bank-value">
                  <span style={{ color: "red" }}>{detailDataProject.npwp_pihak_2 || "(NPWP Pihak 2)"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="kwitansi-detail-container">
            <span className="label-detail-kwitansi">Telah Terima Dari</span>
            <span className="separator-detail-kwitansi">:</span>
            <span className="value-detail-kwitansi">
              <span style={{ color: "red" }}>{previewFormData.telah_terima_dari || "(Telah Terima Dari)"}</span>
            </span>

            <span className="label-detail-kwitansi">Uang Sebanyak</span>
            <span className="separator-detail-kwitansi">:</span>
            <span className="value-detail-kwitansi">
              <span style={{ color: "red" }}>{previewFormData.total_uang_terbilang || "(Uang Sebanyak)"}</span>
            </span>

            <span className="label-detail-kwitansi">Untuk Pembayaran</span>
            <span className="separator-detail-kwitansi">:</span>
            <span className="value-detail-kwitansi">
              <span style={{ color: "red" }}>{previewFormData.tujuan_pembayaran || "(Untuk Pembayaran)"}</span>
            </span>

            <span className="label-detail-kwitansi">Sumber Dana</span>
            <span className="separator-detail-kwitansi">:</span>
            <span className="value-detail-kwitansi">
              <span style={{ color: "red" }}>
                {previewFormData.sumber_dana || "(Nomor Surat Sumber Dana)"},{" "}
                {(previewFormData.tanggal_sumber_dana &&
                  new Date(previewFormData.tanggal_sumber_dana).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Surat Sumber Dana)"}
              </span>
            </span>

            <span className="label-detail-kwitansi">Surat Perjanjian/Kontrak</span>
            <span className="separator-detail-kwitansi">:</span>
            <span className="value-detail-kwitansi">
              {/* dari project detail */}
              Nomor <span className="separator-detail-kwitansi">:</span> <span style={{ color: "red" }}>{detailDataProject.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>{" "}
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

            <span className="label-detail-kwitansi">Nomor Addendum</span>
            <span className="separator-detail-kwitansi">:</span>
            <span className="value-detail-kwitansi">
              Nomor <span className="separator-detail-kwitansi">:</span>{" "}
              <span style={{ color: "red" }}>
                {previewFormData.nomor_surat_addendun || "(Nomor Surat Addendun)"},{" "}
                {(previewFormData.tanggal_surat_addendun &&
                  new Date(previewFormData.tanggal_surat_addendun).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Surat Addendun)"}
              </span>
            </span>

            <span className="label-detail-kwitansi">Berita Acara Pembayaran</span>
            <span className="separator-detail-kwitansi">:</span>
            <span className="value-detail-kwitansi">
              Nomor <span className="separator-detail-kwitansi">:</span> <span style={{ color: "red" }}>{previewFormData.nomorSuratBAP || "(Nomor Surat BAP)"}</span>{" "}
              <span style={{ color: "red" }}>
                {(detailDataProject.tanggalSuratBAP &&
                  new Date(detailDataProject.tanggalSuratBAP).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Surat BAP)"}
              </span>
            </span>
          </div>

          <div className="jumlah-layout">
            <span className="label-jumlah-kwitansi">JUMLAH</span>
            <span className="separator-jumlah-kwitansi">:</span>
            <span className="value-jumlah-kwitansi">{previewFormData.total_uang.masked || "(Total uang)"},- </span>
          </div>
          {/* dari project detail semua yg bawah */}
          <div className="tertanda-layout">
            <div className="ttd-1">
              {" "}
              <div className="setuju-dibayar">
                Setuju Dibayar : <br /> a/n Kuasa Pengguna Anggaran / <br /> Pejabat Pembuat Komitmen <br /> Universitas Bengkulu
              </div>
              <div className="ttd-kwitansi">
                <div className="ttd-bold">
                  <span style={{ color: "red" }}>{detailDataProject.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                </div>
                <div className="ttd-nip">
                  NIP. <span style={{ color: "red" }}>{detailDataProject.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                </div>
              </div>
            </div>

            <div className="ttd-2">
              <div className="tanggal-kwitansi-layout">
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
              <div className="yang-menerima">
                Yang Menerima <br /> Penyedia <br /> <span style={{ color: "red" }}>{detailDataProject.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
              </div>{" "}
              <div className="ttd-kwitansi">
                <div className="ttd-bold">
                  <span style={{ color: "red" }}>{detailDataProject.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                </div>
                <div className="ttd-nip">
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

export default KwitansiWord;

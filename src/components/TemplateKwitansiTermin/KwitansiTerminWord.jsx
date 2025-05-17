import "./KwitansiTermin.css";

const KwitansiTerminWord = ({ previewFormData, detailDataProject }) => {
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
                  <span>{detailDataProject || "(Nama Bank Pihak 2)"}</span>
                </span>
              </div>
              <div class="bank-item">
                <span class="bank-label">REKENING</span> <span class="bank-separator">:</span>
                <span class="bank-value">
                  <span>{detailDataProject || "(Rekening pihak 2)"}</span>
                </span>
              </div>
              <div class="bank-item">
                <span class="bank-label">NPWP</span> <span class="bank-separator">:</span>
                <span class="bank-value">
                  <span>{detailDataProject || "(NPWP Pihak 2)"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="kwitansi-detail-container">
            <span className="label-detail-kwitansi">Telah Terima Dari</span>
            <span className="separator-detail-kwitansi">:</span>
            <span className="value-detail-kwitansi">
              <span>{previewFormData.telah_terima_dari || "(Telah Terima Dari)"}</span>
            </span>

            <span className="label-detail-kwitansi">Uang Sebanyak</span>
            <span className="separator-detail-kwitansi">:</span>
            <span className="value-detail-kwitansi">
              <span>{previewFormData.total_uang_terbilang || "(Uang Sebanyak)"}</span>
            </span>

            <span className="label-detail-kwitansi">Untuk Pembayaran</span>
            <span className="separator-detail-kwitansi">:</span>
            <span className="value-detail-kwitansi">
              <span>{previewFormData.tujuan_pembayaran || "(Untuk Pembayaran)"}</span>
            </span>

            <span className="label-detail-kwitansi">Sumber Dana</span>
            <span className="separator-detail-kwitansi">:</span>
            <span className="value-detail-kwitansi">
              <span>
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
              Nomor <span className="separator-detail-kwitansi">:</span> <span>{detailDataProject || "(Nomor Surat Perjanjian Kontrak)"}</span>{" "}
              <span>
                {(detailDataProject &&
                  new Date(detailDataProject).toLocaleDateString("id-ID", {
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
              <span>
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
              Nomor <span className="separator-detail-kwitansi">:</span> <span>{detailDataProject || "(Nomor Surat BAP)"}</span>{" "}
              <span>
                {(detailDataProject &&
                  new Date(detailDataProject).toLocaleDateString("id-ID", {
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
                  <span>{detailDataProject || "(Nama Pihak 1)"}</span>
                </div>
                <div className="ttd-nip">
                  NIP. <span>{detailDataProject || "(NIP Pihak 1)"}</span>
                </div>
              </div>
            </div>

            <div className="ttd-2">
              <div className="tanggal-kwitansi-layout">Bengkulu, 2 Desember 2024</div>
              <div className="yang-menerima">
                Yang Menerima <br /> Penyedia <br /> <span>{detailDataProject || "(Perusahaan Pihak 2)"}</span>
              </div>{" "}
              <div className="ttd-kwitansi">
                <div className="ttd-bold">
                  <span>{detailDataProject || "(Nama Pihak 2)"}</span>
                </div>
                <div className="ttd-nip">
                  <span>{detailDataProject || "(Jabatan Pihak 2)"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KwitansiTerminWord;

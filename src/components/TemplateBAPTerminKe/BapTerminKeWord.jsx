import "./BapTerminKe.css";

const BapTerminKeWord = ({ formDataPreview, dataProjectDetail }) => {
  return (
    <div className="preview-layout">
      <div class="a4-container-landscape">
        <div className="surat-header-bap">
          <div className="header-table-bap">
            <div className="surat-header-bap-text-bold">
              KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
              <br />
              DAN TEKNOLOGI
              <br /> UNIVERSITAS BENGKULU
            </div>
            <div className="pekerjaan-bap">
              <div className="pekerjaan-title">PEKERJAAN</div>
              <div className="pekerjaan-value">
                <span>{dataProjectDetail || "(Pekerjaan)"}</span>
              </div>
            </div>
            <div className="lokasi-bap">
              <div className="lokasi-bap-tittle">Lokasi</div>
              <div className="lokasi-bap-value">Universitas Bengkulu</div>
            </div>
          </div>
          <div className="header-table-bap">
            <div className="surat-header-bap-text-bold-right">
              BERITA ACARA
              <br />
              PEMBAYARAN TERMIN {formDataPreview.nama_termin_ke || "(Termin Ke)"}
            </div>
            <div className="bap-header-container">
              <span className="label-bap">Nomor</span>
              <span className="separator-bap">:</span>
              <span className="value-bap">
                <span>{dataProjectDetail || "(Nomor BAP)"}</span>
              </span>

              <span className="label-bap">Tanggal</span>
              <span className="separator-bap">:</span>
              <span className="value-bap">
                <span>
                  {(dataProjectDetail &&
                    new Date(dataProjectDetail).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal BAP)"}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="first-paragraph-bap">
          Pada hari ini, <span>{dataProjectDetail || "(Tanggal Surat BAP Terbilang)"}</span> ({" "}
          <span>
            {(dataProjectDetail &&
              new Date(dataProjectDetail)
                .toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, "-")) ||
              "(Tanggal Surat BAP)"}
          </span>
          ), kami yang bertanda tangan dibawah
        </div>
        <div className="bap-termin-wrapper">
          <div class="bap-termin-container">
            <div class="bap-termin-item">
              <span class="bap-label">Nama</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span>{dataProjectDetail || "(Nama Pihak 1)"}</span>
              </span>
            </div>
            <div class="bap-termin-item">
              <span class="bap-label">Jabatan</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span>{dataProjectDetail || "(Jabatan Pihak 1)"}</span>
              </span>
            </div>
            <div class="bap-termin-item">
              <span class="bap-label">Alamat</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span>{dataProjectDetail || "(Alamat Pihak 1)"}</span>
              </span>
            </div>
          </div>
          <p class="bap-pihak-pertama">
            Yang selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>
          </p>

          <div class="bap-termin-container">
            <div class="bap-termin-item">
              <span class="bap-label">Nama</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span>{dataProjectDetail || "(Nama Pihak 2)"}</span>
              </span>
            </div>
            <div class="bap-termin-item">
              <span class="bap-label">Jabatan</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span>{dataProjectDetail || "(Jabatan Pihak 2)"}</span>
              </span>
            </div>
            <div class="bap-termin-item">
              <span class="bap-label">Alamat</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span>{dataProjectDetail || "(Alamat Pihak 2)"}</span>
              </span>
            </div>
          </div>
          <p class="bap-pihak-pertama">
            Yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>
          </p>
        </div>

        <div class="bap-termin-detail">
          <span class="bap-termin-number">1.</span>
          <p class="bap-termin-text">
            Berdasarkan Berita Acara Pemeriksaan Pekerjaan Nomor :
            <span class="bap-termin-highlight">
              <span>{dataProjectDetail || "(Nomor BAP)"}</span>
            </span>
            , Tanggal
            <span class="bap-termin-highlight">
              {" "}
              <span>
                {(dataProjectDetail &&
                  new Date(dataProjectDetail).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal BAP)"}
              </span>
            </span>
            , bahwa prestasi pekerjaan telah mencapai{" "}
            <span class="bap-termin-highlight">
              <span>{formDataPreview.persentase_pekerjaan || "(Prestasi Pekerjaan %)"}%</span>
            </span>
            .
          </p>
        </div>

        <div class="termin-payment-detail">
          <span class="termin-payment-number">2.</span>
          <p class="termin-payment-text">Kepada PIHAK KEDUA belum pernah dilakukan pembayaran.</p>
        </div>

        <div class="termin-payment-table">
          <div class="termin-payment-row">
            <span class="termin-payment-label">Uang Muka</span>
            <span class="termin-payment-value">
              <span>{formDataPreview.persentase_uangmuka || "(Persentase uang muka %)"}%</span> x <span>{formDataPreview.uang_muka.masked || "(Jumlah Uang Muka)"}</span> :
            </span>
            <span class="termin-payment-amount">
              <span>{formDataPreview.total_uangmuka.masked || "(Total Uang Muka)"}</span>
            </span>
          </div>
          <div class="termin-payment-row">
            <span class="termin-payment-label">Termin 1</span>
            <span class="termin-payment-value">:</span>
            <span class="termin-payment-amount">Rp 123.045.075,00</span>
          </div>
          <div class="termin-payment-row">
            <span class="termin-payment-label">Termin 2</span>
            <span class="termin-payment-value">:</span>
            <span class="termin-payment-amount">Rp 153.806.345,00</span>
          </div>
          <div class="termin-payment-row">
            <span class="termin-payment-label">Jumlah yang sudah dibayar kepada PIHAK KEDUA</span>
            <span class="termin-payment-amount">
              <span>{formDataPreview.jumlah_yang_sudah_dibayar.masked || "(Jumlah yang sudah dibayar pihak 2)"}</span>
            </span>
          </div>
        </div>

        <div class="bap-termin-detail">
          <span class="bap-termin-number">3.</span>
          <p class="bap-termin-text">
            Berdasarkan Surat Perjanjian Kerja/Kontrak Nomor :
            <span class="bap-termin-highlight">
              <span>{dataProjectDetail || "(Nomor Surat Perjanjian Kontrak)"}</span>
            </span>
            , Tanggal{" "}
            <span class="bap-termin-highlight">
              <span>
                {(dataProjectDetail &&
                  new Date(dataProjectDetail).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Surat Perjanjian Kontrak)"}
              </span>
            </span>{" "}
            kepada <span class="bap-termin-highlight">PIHAK KEDUA</span> dapat dibayarkan uang muka dengan rincian sebagai berikut :
          </p>
        </div>
      </div>
      <div class="a4-container-landscape">
        <div class="termin-payment-table">
          <div class="termin-payment-row">
            <span class="termin-payment-label">Progres Fisik</span>
            <span class="termin-payment-value">
              <span>{formDataPreview.persentase_progres_fisik || "(Persentase Progres Fisik)"}</span>% x <span>{formDataPreview.progres_fisik.masked || "(Nominal Progres Fisik)"}</span> :
            </span>
            <span class="termin-payment-amount">
              <span>{formDataPreview.total_progres_fisik.masked || "(Total Nominal Progress Fisik)"}</span>
            </span>
          </div>
          <div class="termin-payment-row">
            <span class="termin-payment-label">Retensi Pekerjaan</span>
            <span class="termin-payment-value">
              <span>{formDataPreview.persentase_retensi_pekerjaan || "(Persentase Retensi Pekerjaan)"}</span>% x <span>{formDataPreview.retensi_pekerjaan.masked || "(Nominal Retensi Pekerjaan)"}</span> :
            </span>
            <span class="termin-payment-amount">
              <span>{formDataPreview.total_retensi_pekerjaan.masked || "(Total Nominal Retensi Pekerjaan)"}</span>
            </span>
          </div>
          <div class="termin-payment-row">
            <span class="termin-payment-label">Pengembalian Uang Muka</span>
            <span class="termin-payment-value">
              <span>{formDataPreview.persentase_pengembalian_uang_muka || "(Persentase Pengembalian Uang Muka)"}</span>% x <span>{formDataPreview.pengembalian_uang_muka.masked || "(Nominal Pengembalian Uang Muka)"}</span>:
            </span>
            <span class="termin-payment-amount">
              <span>{formDataPreview.total_pengembalian_uang_muka.masked || "(Total Pengembalian Uang Muka)"}</span>
            </span>
          </div>
          <div class="termin-payment-row">
            <span class="termin-payment-label">Termin 1</span>
            <span class="termin-payment-value">:</span>
            <span class="termin-payment-amount">Rp 153.806.345,00</span>
          </div>

          <div class="termin-payment-row">
            <span class="termin-payment-label">Termin 2</span>
            <span class="termin-payment-value">:</span>
            <span class="termin-payment-amount">Rp 153.806.345,00</span>
          </div>

          <div class="termin-payment-row">
            <span class="termin-payment-label">Jumlah yang harus dibayar saat ini kepada PIHAK KEDUA</span>
            <span class="termin-payment-value">:</span>
            <span class="termin-payment-amount">
              <span>{formDataPreview.jumlah_yang_harus_dibayar.masked || "(Nominal)"}</span>
            </span>
          </div>
          <div class="termin-payment-row">
            <span class="termin-payment-label">Jumlah yang dibulatkan</span>
            <span class="termin-payment-amount">
              <span>{formDataPreview.jumlah_yang_dibulatkan.masked || "(Nominal)"}</span>
            </span>
          </div>
        </div>

        <div className="terbilang-bap-wrapper">
          <div className="terbilang-bap-var">
            Terbilang:{" "}
            <span className="terbilang-bap-value">
              <span>{formDataPreview.jumlah_yang_dibulatkan_terbilang || "(Nominal Terbilang)"}</span>
            </span>
          </div>
        </div>

        <div class="bap-termin-detail">
          <span class="bap-termin-number">4.</span>
          <p class="bap-termin-text">
            <span class="bap-termin-highlight">PIHAK KEDUA </span>sepakat atas jumlah pembayaran tersebut diatas ditransper ke rekening Giro Nomor : :
            <span class="bap-termin-highlight">
              <span>{dataProjectDetail || "(Nomor rek pihak 1)"}</span> pada BANK <span>{dataProjectDetail || "(Nama Bank pihak 1)"}</span>
            </span>
          </p>
        </div>

        <div className="last-paragraph-bap">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>

        <div className="ttd-bap-layout">
          <div className="ttd-pihak-kedua">
            <div className="ttd-pihak-kedua-bold">PIHAK KEDUA</div>
            <div className="ttd-pihak-kedua-light">KONTRAKTOR PELAKSANA</div>
            <div className="ttd-pihak-kedua-bold">
              {" "}
              <span>{dataProjectDetail || "(Perusahaan Pihak 2)"}</span>
            </div>
            <div className="nip-bap-layout">
              <div className="ttd-pihak-kedua">
                <div className="nip-bap-name">
                  <span>{dataProjectDetail || "(Nama Pihak 2)"}</span>
                </div>
                <div className="nip-bap-nip">
                  <span>{dataProjectDetail || "(Jabatan Pihak 2)"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ttd-pihak-kedua">
            <div className="ttd-pihak-kedua-bold">PIHAK PERTAMA</div>
            <div className="ttd-pihak-kedua-light">
              <span>{dataProjectDetail || "(Jabatan Pihak 1)"}</span>
              <div className="ttd-pihak-kedua-bold">UNIVERSITAS BENGKULU</div>
            </div>

            <div className="nip-bap-layout">
              <div className="ttd-pihak-kedua">
                <div className="nip-bap-name">
                  <span>{dataProjectDetail || "(Nama Pihak 1)"}</span>
                </div>
                <div className="nip-bap-nip">
                  NIP. <span>{dataProjectDetail || "(NIP Pihak 1)"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BapTerminKeWord;

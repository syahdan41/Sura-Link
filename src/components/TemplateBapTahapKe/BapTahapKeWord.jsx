import "./BapTahapKe.css";

const BapTahapKeWord = ({ formDataPreview, dataProjectDetail }) => {
  return (
    <div className="preview-layout">
      <div class="a4-container">
        <div className="surat-header-bap">
          <div className="table-container-bap-tahap">
            <table className="custom-table-bap-tahap">
              <tbody>
                <tr>
                  <td>
                    <div className="surat-header-bap-tahap-text-bold">
                      KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
                      <br />
                      DAN TEKNOLOGI
                      <br /> UNIVERSITAS BENGKULU
                    </div>
                  </td>
                  <td>
                    <div className="surat-header-bap-tahap-text-bold-right">
                      BERITA ACARA PEMBAYARAN Tahap Ke-
                      <span style={{ color: "red" }}>
                        {formDataPreview.tahap_ke || "(Tahap)"}(<span style={{ color: "red" }}>{formDataPreview.tahap_ke_terbilang || "(Terbilang)"}</span>)
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="row-table-bap-tahap">
                      <span className="label-table-bap-tahap">Pekerjaan</span>
                      <span className="separator-table-bap-tahap">:</span>
                      <span className="value-table-bap-tahap">
                        <span style={{ color: "red" }}>{dataProjectDetail.pekerjaan || "(Pekerjaan)"}</span>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="row-table-bap-tahap">
                      <span className="label-table-bap-tahap">Nomor</span>
                      <span className="separator-table-bap-tahap">:</span>
                      <span className="value-table-bap-tahap">
                        <span style={{ color: "red" }}>{formDataPreview.nomorSuratBAP || "(Nomor BAP)"}</span>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="row-table-bap-tahap">
                      <span className="label-table-bap-tahap">Lokasi</span>
                      <span className="separator-table-bap-tahap">:</span>
                      <span className="value-table-bap-tahap">
                        <span style={{ color: "red" }}>{dataProjectDetail.lokasi_pekerjaan || "(Lokasi Pekerjaan)"}</span>
                      </span>
                    </div>
                  </td>
                  <td>
                    {" "}
                    <div className="row-table-bap-tahap">
                      <span className="label-table-bap-tahap">Tanggal</span>
                      <span className="separator-table-bap-tahap">:</span>
                      <span className="value-table-bap-tahap">
                        <span style={{ color: "red" }}>
                          {(formDataPreview.tanggalSuratBAP &&
                            new Date(formDataPreview.tanggalSuratBAP).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })) ||
                            "(Tanggal Surat BAP)"}
                        </span>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="first-paragraph-bap">
          Pada hari ini, <span style={{ color: "red" }}>{formDataPreview.tanggalSuratBAPTerbilang || "(Tanggal Surat BAP Terbilang)"}</span> ({" "}
          <span style={{ color: "red" }}>
            {(formDataPreview.tanggalSuratBAP &&
              new Date(formDataPreview.tanggalSuratBAP)
                .toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, "-")) ||
              "(Tanggal Surat BAP)"}
          </span>
          ), kami yang bertanda tangan dibawah ini
        </div>
        <div className="bap-termin-wrapper">
          <div class="bap-termin-container">
            <div class="bap-termin-item">
              <span class="bap-label">Nama</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_1 || "(Nama Pihak 1)"}</span>
              </span>
            </div>
            <div class="bap-termin-item">
              <span class="bap-label">Jabatan</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
              </span>
            </div>
            <div class="bap-termin-item">
              <span class="bap-label">Alamat</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span style={{ color: "red" }}>{dataProjectDetail.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
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
                <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_2 || "(Nama Pihak 2)"}</span>
              </span>
            </div>
            <div class="bap-termin-item">
              <span class="bap-label">Jabatan</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
              </span>
            </div>
            <div class="bap-termin-item">
              <span class="bap-label">Alamat</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span style={{ color: "red" }}>{dataProjectDetail.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
              </span>
            </div>
          </div>
          <p class="bap-pihak-pertama">
            Yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>
          </p>
        </div>

        <div className="berdasarkan-text-underline">Berdasarkan :</div>
        <div className="termin-detail-tahap-wrapper">
          <div class="bap-termin-detail-tahap">
            <span class="bap-termin-number">1.</span>
            <p class="bap-termin-text">
              Surat Perjanjian/Kontrak Nomor :
              <span class="bap-termin-highlight">
                <span style={{ color: "red" }}>{dataProjectDetail.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>{" "}
              </span>
              , Tanggal
              <span class="bap-termin-highlight">
                {" "}
                <span style={{ color: "red" }}>
                  {(dataProjectDetail.tanggal_surat_perjanjian_kontrak &&
                    new Date(dataProjectDetail.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Surat Perjanjian Kontrak)"}
                </span>
              </span>
            </p>
          </div>
          <div class="bap-termin-detail-tahap">
            <span class="bap-termin-number">2.</span>
            <p class="bap-termin-text">
              Berita Acara Pemeriksaan Nomor :{" "}
              <span class="bap-termin-highlight">
                <span style={{ color: "red" }}>{dataProjectDetail.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan)"}</span>{" "}
              </span>
              , Tanggal
              <span class="bap-termin-highlight">
                {" "}
                <span style={{ color: "red" }}>
                  {(dataProjectDetail.tanggal_berita_acara_pemeriksaan_pekerjaan &&
                    new Date(dataProjectDetail.tanggal_berita_acara_pemeriksaan_pekerjaan).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal BAP Pemeriksaan)"}
                </span>
              </span>
            </p>
          </div>
          <div class="bap-termin-detail-tahap">
            <span class="bap-termin-number">3.</span>
            <p class="bap-termin-text">
              Berita Acara Serah Terima Nomor :
              <span class="bap-termin-highlight">
                <span style={{ color: "red" }}>{formDataPreview.nomor_bap_serahterima || "(Nomor Berita acara serah terima)"}</span>{" "}
              </span>
              , Tanggal
              <span class="bap-termin-highlight">
                {" "}
                <span style={{ color: "red" }}>
                  {(formDataPreview.tanggal_bap_serahterima &&
                    new Date(formDataPreview.tanggal_bap_serahterima).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal berita acara serah terima)"}
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className="berdasarkan-text-underline-2">Dengan ini menyatakan :</div>
        <div style={{ marginTop: "20px" }}>
          <div class="bap-termin-detail-tahap">
            <span class="bap-termin-number">1.</span>
            <p class="bap-termin-text">
              Bahwa Berdasarkan Surat Perjanjian/Kontrak Nomor : <span style={{ color: "red" }}>{dataProjectDetail.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span> tanggal{" "}
              <span style={{ color: "red" }}>
                {(dataProjectDetail.tanggal_surat_perjanjian_kontrak &&
                  new Date(dataProjectDetail.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Surat Perjanjian Kontrak)"}
              </span>{" "}
              dengan Nilai Kontrak : <span style={{ color: "red" }}>{formDataPreview.nilai_kontrak.masked || "(Nominal Nilai Kontrak)"}</span>(
              <span style={{ color: "red" }}>{formDataPreview.nilai_kontrak_terbilang || "(Nilai Kontrak Terbilang)"}</span>) maka kepada PIHAK KEDUA dapat dilakukan pembayaran pekerjaan Tahap Ke-
              <span style={{ color: "red" }}>{formDataPreview.tahap_ke || "(Tahap Angka)"}</span>(<span style={{ color: "red" }}>{formDataPreview.tahap_ke_terbilang || "(Tahap terbilang)"}</span>) untuk bulan{" "}
              <span style={{ color: "red" }}>{formDataPreview.pembayaran_bulan || "(Pembayaran Bulan)"}</span> yaitu sebesar <span style={{ color: "red" }}>{formDataPreview.pembayaran_pekerjaan.masked || "(Pembayaran Pekerjaan)"}</span>(
              <span style={{ color: "red" }}>{formDataPreview.pembayaran_pekerjaan_terbilang || "(Pembayaran Pekerjaan terbilang)"}</span>)
            </p>
          </div>
          <div class="bap-termin-detail-tahap">
            <span class="bap-termin-number">2.</span>
            <p class="bap-termin-text">
              PIHAK KESATU dan PIHAK KEDUA telah sepakat atas jumlah pembayaran tersebut diatas ditransfer ke Rekening Nomor : <span style={{ color: "red" }}>{dataProjectDetail.nomor_rekening_pihak_2 || "(Nomor rek pihak 2)"}</span> Pada :{" "}
              <span style={{ color: "red" }}>{dataProjectDetail.nama_bank_pihak_2 || "(Nama bank pihak 2)"}</span> Atas Nama : <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan/Instansi Pihak 2)"}</span>
            </p>
          </div>
        </div>

        <div className="last-paragraph-bap">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>
        <div className="ttd-bap-layout">
          <div className="ttd-pihak-kedua-tahap">
            <div className="ttd-pihak-kedua-bold">PIHAK KESATU</div>
            <div className="ttd-pihak-kedua-light">
              <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
            </div>
            <div className="ttd-pihak-kedua-bold"> Universitas Bengkulu</div>
            <div className="nip-bap-layout">
              <div className="ttd-pihak-kedua-tahap">
                <div className="nip-bap-name-tahap">
                  <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                </div>
                <div className="nip-bap-nip">
                  NIP. <span style={{ color: "red" }}>{dataProjectDetail.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ttd-pihak-kedua-tahap">
            <div className="ttd-pihak-kedua-bold">PIHAK KEDUA</div>
            <div className="ttd-pihak-kedua-light">KONTRAKTOR PELAKSANA</div>
            <div className="ttd-pihak-kedua-bold">
              {" "}
              <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
            </div>
            <div className="nip-bap-layout">
              <div className="ttd-pihak-kedua-tahap">
                <div className="nip-bap-name-tahap">
                  <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                </div>
                <div className="nip-bap-nip-tahap">
                  <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BapTahapKeWord;

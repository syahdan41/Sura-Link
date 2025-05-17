import "./BapTahapKeUI.css";

const BapTahapKePreview = ({ formDataPreview, dataProjectDetail }) => {
  return (
    <div className="preview-layout-ui">
      <div className="preview-bar-ui">Preview</div>
      <div class="a4-container-ui">
        <div className="surat-header-bap-ui">
          <div className="table-container-bap-tahap-ui">
            <table className="custom-table-bap-tahap-ui">
              <tbody>
                <tr>
                  <td>
                    <div className="surat-header-bap-tahap-text-bold-ui">
                      KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
                      <br />
                      DAN TEKNOLOGI
                      <br /> UNIVERSITAS BENGKULU
                    </div>
                  </td>
                  <td>
                    <div className="surat-header-bap-tahap-text-bold-right-ui">
                      BERITA ACARA PEMBAYARAN Tahap Ke-
                      <span style={{ color: "red" }}>
                        {formDataPreview.tahap_ke || "(Tahap)"}(<span style={{ color: "red" }}>{formDataPreview.tahap_ke_terbilang || "(Terbilang)"}</span>)
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="row-table-bap-tahap-ui">
                      <span className="label-table-bap-tahap-ui">Pekerjaan</span>
                      <span className="separator-table-bap-tahap-ui">:</span>
                      <span className="value-table-bap-tahap-ui">
                        <span style={{ color: "red" }}>{dataProjectDetail.pekerjaan || "(Pekerjaan)"}</span>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="row-table-bap-tahap-ui">
                      <span className="label-table-bap-tahap-ui">Nomor</span>
                      <span className="separator-table-bap-tahap-ui">:</span>
                      <span className="value-table-bap-tahap-ui">
                        <span style={{ color: "red" }}>{formDataPreview.nomorSuratBAP || "(Nomor BAP)"}</span>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="row-table-bap-tahap-ui">
                      <span className="label-table-bap-tahap-ui">Lokasi</span>
                      <span className="separator-table-bap-tahap-ui">:</span>
                      <span className="value-table-bap-tahap-ui">
                        <span style={{ color: "red" }}>{dataProjectDetail.lokasi_pekerjaan || "(Lokasi Pekerjaan)"}</span>
                      </span>
                    </div>
                  </td>
                  <td>
                    {" "}
                    <div className="row-table-bap-tahap-ui">
                      <span className="label-table-bap-tahap-ui">Tanggal</span>
                      <span className="separator-table-bap-tahap-ui">:</span>
                      <span className="value-table-bap-tahap-ui">
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

        <div className="first-paragraph-bap-ui">
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
        <div className="bap-termin-wrapper-ui">
          <div class="bap-termin-container-ui">
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Nama</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_1 || "(Nama Pihak 1)"}</span>
              </span>
            </div>
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Jabatan</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
              </span>
            </div>
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Alamat</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
              </span>
            </div>
          </div>
          <p class="bap-pihak-pertama-ui">
            Yang selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>
          </p>

          <div class="bap-termin-container-ui">
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Nama</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_2 || "(Nama Pihak 2)"}</span>
              </span>
            </div>
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Jabatan</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
              </span>
            </div>
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Alamat</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
              </span>
            </div>
          </div>
          <p class="bap-pihak-pertama-ui">
            Yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>
          </p>
        </div>

        <div className="berdasarkan-text-underline-ui">Berdasarkan :</div>
        <div className="termin-detail-tahap-wrapper-ui">
          <div class="bap-termin-detail-tahap-ui">
            <span class="bap-termin-number-ui">1.</span>
            <p class="bap-termin-text-ui">
              Surat Perjanjian/Kontrak Nomor :
              <span class="bap-termin-highlight-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>{" "}
              </span>
              , Tanggal
              <span class="bap-termin-highlight-ui">
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
          <div class="bap-termin-detail-tahap-ui">
            <span class="bap-termin-number-ui">2.</span>
            <p class="bap-termin-text-ui">
              Berita Acara Pemeriksaan Nomor :{" "}
              <span class="bap-termin-highlight-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan)"}</span>{" "}
              </span>
              , Tanggal
              <span class="bap-termin-highlight-ui">
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
          <div class="bap-termin-detail-tahap-ui">
            <span class="bap-termin-number-ui">3.</span>
            <p class="bap-termin-text-ui">
              Berita Acara Serah Terima Nomor :
              <span class="bap-termin-highlight-ui">
                <span style={{ color: "red" }}>{formDataPreview.nomor_bap_serahterima || "(Nomor Berita acara serah terima)"}</span>{" "}
              </span>
              , Tanggal
              <span class="bap-termin-highlight-ui">
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
        <div className="berdasarkan-text-underline-2-ui">Dengan ini menyatakan :</div>
        <div class="bap-termin-detail-ui">
          <span class="bap-termin-number-ui">1.</span>
          <p class="bap-termin-text-ui">
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

        <div class="bap-termin-detail-ui">
          <span class="bap-termin-number-ui">2.</span>
          <p class="bap-termin-text-ui">
            PIHAK KESATU dan PIHAK KEDUA telah sepakat atas jumlah pembayaran tersebut diatas ditransfer ke Rekening Nomor : <span style={{ color: "red" }}>{dataProjectDetail.nomor_rekening_pihak_2 || "(Nomor rek pihak 2)"}</span> Pada :{" "}
            <span style={{ color: "red" }}>{dataProjectDetail.nama_bank_pihak_2 || "(Nama bank pihak 2)"}</span> Atas Nama : <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan/Instansi Pihak 2)"}</span>
          </p>
        </div>
        <div className="last-paragraph-bap-ui">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>
        <div className="ttd-bap-layout-ui">
          <div className="ttd-pihak-kedua-tahap-ui">
            <div className="ttd-pihak-kedua-bold-ui">PIHAK KESATU</div>
            <div className="ttd-pihak-kedua-light-ui">
              <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
            </div>
            <div className="ttd-pihak-kedua-bold-ui"> Universitas Bengkulu</div>
            <div className="nip-bap-layout-ui">
              <div className="ttd-pihak-kedua-tahap-ui">
                <div className="nip-bap-name-tahap-ui">
                  <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                </div>
                <div className="nip-bap-nip-ui">
                  NIP. <span style={{ color: "red" }}>{dataProjectDetail.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ttd-pihak-kedua-tahap-ui">
            <div className="ttd-pihak-kedua-bold-ui">PIHAK KEDUA</div>
            <div className="ttd-pihak-kedua-light-ui">KONTRAKTOR PELAKSANA</div>
            <div className="ttd-pihak-kedua-bold-ui">
              {" "}
              <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
            </div>
            <div className="nip-bap-layout-ui">
              <div className="ttd-pihak-kedua-tahap-ui">
                <div className="nip-bap-name-tahap-ui">
                  <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                </div>
                <div className="nip-bap-nip-tahap-ui">
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

export default BapTahapKePreview;

import "./BapPekerjaanPerencanaan.css";

const BapPekerjaanPerencananWord = ({ formDataPreview, dataProjectDetail }) => {
  return (
    <>
      <div className="preview-layout">
        <div class="a4-container-bastperencanaan">
          <div className="table-container-header">
            <table className="custom-table-header">
              <tbody>
                <tr>
                  <td>
                    <div className="surat-header-bap-perencanaan-text-bold">
                      KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
                      <br />
                      DAN TEKNOLOGI
                      <br /> UNIVERSITAS BENGKULU
                    </div>
                  </td>
                  <td>
                    <div className="surat-header-bap-perencanaan-text-bold-right">BERITA ACARA SERAH TERIMA PEKERJAAN PERENCANAAN</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="pekerjaan-bap-perencanaan">
                      <div className="pekerjaan-title-bap-perencanaan">
                        JENIS PEKERJAAN :{" "}
                        <span className="pekerjaan-bap-perencanaan-value">
                          <span>{dataProjectDetail || "(Jenis Pekerjaan)"}</span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="bap-perencanaan-header-container">
                      <span className="label-bap">Nomor</span>
                      <span className="separator-bap">:</span>
                      <span className="value-bap">
                        <span>{formDataPreview.nomor_bap_serahterima || "(Nomor BAP)"}</span>
                      </span>

                      <span className="label-bap">Tanggal</span>
                      <span className="separator-bap">:</span>
                      <span className="value-bap">
                        <span>
                          {(formDataPreview.tanggal_bap_serahterima &&
                            new Date(formDataPreview.tanggal_bap_serahterima).toLocaleDateString("id-ID", {
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

          <div className="paragraf-text-justify">
            Pada hari ini, <span>{formDataPreview.tanggal_bap_serahterima_terbilang || "(Hari dan Tanggal Terbilang)"}</span> ({" "}
            <span>
              {(formDataPreview.tanggal_bap_serahterima &&
                new Date(formDataPreview.tanggal_bap_serahterima)
                  .toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  .replace(/\//g, "-")) ||
                "(Tanggal Surat BAP)"}
            </span>
            ) , kami yang bertanda tangan di bawah ini :
          </div>
          <div className="bap-termin-wrapper">
            {/* PIHAK PERTAMA */}
            <div className="bap-termin-container">
              <div className="bap-termin-item">
                <span className="bap-number">1.</span>
                <span className="bap-label">Nama</span> <span className="bap-separator">:</span>
                <span className="bap-value">
                  <span>{dataProjectDetail || "(Nama Pihak 1)"}</span>
                </span>
              </div>
              <div className="bap-termin-item">
                <span className="bap-number"></span>
                <span className="bap-label">Jabatan</span> <span className="bap-separator">:</span>
                <span className="bap-value">
                  <span>{dataProjectDetail || "(Jabatan Pihak 1)"}</span>
                </span>
              </div>
              <div className="bap-termin-item">
                <span className="bap-number"></span>
                <span className="bap-label">Alamat</span> <span className="bap-separator">:</span>
                <span className="bap-value">
                  <span>{dataProjectDetail || "(Alamat Pihak 1)"}</span>
                </span>
              </div>
            </div>
            <p className="bap-pihak-pertama-perencanaan">
              Yang selanjutnya disebut sebagai <strong>PIHAK KESATU</strong>
            </p>

            {/* PIHAK KEDUA */}
            <div className="bap-termin-container">
              <div className="bap-termin-item">
                <span className="bap-number">2.</span>
                <span className="bap-label">Nama</span> <span className="bap-separator">:</span>
                <span className="bap-value">
                  <span>{dataProjectDetail || "(Nama Pihak 2)"}</span>
                </span>
              </div>
              <div className="bap-termin-item">
                <span className="bap-number"></span>
                <span className="bap-label">Jabatan</span> <span className="bap-separator">:</span>
                <span className="bap-value">
                  <span>{dataProjectDetail || "(Jabatan Pihak 2)"}</span>
                </span>
              </div>
              <div className="bap-termin-item">
                <span className="bap-number"></span>
                <span className="bap-label">Alamat</span> <span className="bap-separator">:</span>
                <span className="bap-value">
                  <span>{dataProjectDetail || "(Alamat Pihak 2)"}</span>
                </span>
              </div>
            </div>
            <p className="bap-pihak-pertama-perencanaan">
              Yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>
            </p>
          </div>
          <div className="paragraf-text-justify">
            Berdasarkan Surat Perintah Kerja Nomor : <span>{formDataPreview.nomor_surat_perintah_kerja || "(Nomor Surat Perintah Kerja)"}</span> tanggal{" "}
            <span>
              {(formDataPreview.tanggal_surat_perintah_kerja &&
                new Date(formDataPreview.tanggal_surat_perintah_kerja).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })) ||
                "(Tanggal Surat Perintah Kerja)"}
            </span>
            , dengan ini telah setuju dan sepakat untuk melakukan Serah Terima Pekerjaan Perencanaan dengan ketentuan sebagai berikut : <strong> PIHAK KEDUA</strong> menyerahkan kepada <strong>PIHAK KESATU</strong> dan{" "}
            <strong>PIHAK KESATU</strong> menyatakan menerima seluruh hasil pekerjaan pelaksanaan untuk :
          </div>
          <div className="bast-perencanaan-container">
            <div className="bast-perencanaan-item">
              <span className="bast-perencanaan-label">
                <strong>a.</strong> Pekerjaan
              </span>
              <span className="bast-perencanaan-separator">:</span>
              <span className="bast-perencanaan-value">
                <span>{dataProjectDetail || "(Jenis Pekerjaan)"}</span>
              </span>
            </div>

            <div className="bast-perencanaan-item">
              <span className="bast-perencanaan-label">
                <strong>b.</strong> Lokasi
              </span>
              <span className="bast-perencanaan-separator">:</span>
              <span className="bast-perencanaan-value">Kampus Universitas Bengkulu</span>
            </div>

            <div className="bast-perencanaan-item">
              <span className="bast-perencanaan-label">
                <strong>c.</strong> Sumber Dana
              </span>
              <span className="bast-perencanaan-separator">:</span>
              <span className="bast-perencanaan-value">DIPA Universitas Bengkulu</span>
            </div>

            <div className="bast-perencanaan-sub-item">
              <span className="bast-perencanaan-sub-label">Nomor</span>
              <span className="bast-perencanaan-separator">:</span>
              <span className="bast-perencanaan-value">
                <span>{formDataPreview.nomor_surat_dipa || "(Nomor Surat DIPA)"}</span>
              </span>
            </div>

            <div className="bast-perencanaan-sub-item">
              <span className="bast-perencanaan-sub-label">Tanggal</span>
              <span className="bast-perencanaan-separator">:</span>
              <span className="bast-perencanaan-value">
                {" "}
                <span>
                  {(formDataPreview.tanggal_surat_DIPA &&
                    new Date(formDataPreview.tanggal_surat_DIPA).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Surat DIPA)"}
                </span>
              </span>
            </div>

            <div className="bast-perencanaan-item">
              <span className="bast-perencanaan-label">
                <strong>d.</strong> Konsultan Perencana
              </span>
              <span className="bast-perencanaan-separator">:</span>
              <span className="bast-perencanaan-value">
                <span>{dataProjectDetail || "(Perusahaan Pihak 2)"}</span>
              </span>
            </div>

            <div className="bast-perencanaan-item">
              <span className="bast-perencanaan-label">
                <strong>e.</strong> Kontrak
              </span>
              <span className="bast-perencanaan-separator">:</span>
              <span className="bast-perencanaan-sub-label">Nomor</span>
              <span className="bast-perencanaan-separator">:</span>
              <span className="bast-perencanaan-value">
                <span>{dataProjectDetail || "(Nomor Kontrak)"}</span>
              </span>
            </div>

            <div className="bast-perencanaan-sub-item">
              <span className="bast-perencanaan-sub-label">Tanggal</span>
              <span className="bast-perencanaan-separator">:</span>
              <span className="bast-perencanaan-value">
                <span>
                  {(dataProjectDetail &&
                    new Date(dataProjectDetail).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Surat Kontrak)"}
                </span>
              </span>
            </div>

            <div className="bast-perencanaan-item">
              <span className="bast-perencanaan-label">
                <strong>f.</strong> Nilai Kontrak
              </span>
              <span className="bast-perencanaan-separator">:</span>
              <span className="bast-perencanaan-value">
                <strong>
                  <span>{formDataPreview.nilai_kontrak.masked || "(Nilai Kontrak)"}</span>
                  ,-
                </strong>
              </span>
            </div>

            <div className="bast-perencanaan-sub-item">
              <span className="bast-perencanaan-value">
                <strong>
                  (<span>{formDataPreview.nilai_kontrak_terbilang || "(Nilai kontrak terbilang)"}</span>)
                </strong>
              </span>
            </div>

            <div className="bast-perencanaan-item">
              <span className="bast-perencanaan-label">
                <strong>g.</strong> Waktu Pekerjaan
              </span>
              <span className="bast-perencanaan-separator">:</span>
              <span className="bast-perencanaan-sub-label">Mulai</span>
              <span className="bast-perencanaan-separator">:</span>
              <span className="bast-perencanaan-value">
                <span>
                  {(formDataPreview.waktu_mulai &&
                    new Date(formDataPreview.waktu_mulai).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Waktu Mulai)"}
                </span>
              </span>
            </div>

            <div className="bast-perencanaan-sub-item">
              <span className="bast-perencanaan-sub-label">Selesai</span>
              <span className="bast-perencanaan-separator">:</span>
              <span className="bast-perencanaan-value">
                <span>
                  {(formDataPreview.waktu_selesai &&
                    new Date(formDataPreview.waktu_selesai).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Waktu Selesai)"}
                </span>
              </span>
            </div>
          </div>
          <div className="paragraf-text-justify">
            Demikian berita acara Serah Terima Pekerjaan Perencanaan ini dibuat dan ditanda tangani di Bengkulu pada tanggal tersebut diatas dalam secukupnya untuk dapat dipergunakan sebagaimana mestinya.
          </div>
          <div className="ttd-bast-perencanaan-layout">
            <div className="ttd-bast-perencanaan-ph1">
              <strong>PIHAK KESATU</strong>
              <div>PPK Universitas Bengkulu</div>
              <div className="tertanda-bast-perencanaan">
                <div className="tertanda-bast-underline">
                  <span>{dataProjectDetail || "(Nama Pihak 1)"}</span>
                </div>
                <div>
                  NIP. <span>{dataProjectDetail || "(NIP Pihak 1)"}</span>
                </div>
              </div>
            </div>
            <div className="ttd-bast-perencanaan-ph1">
              <strong>PIHAK KEDUA</strong>
              <div>Konsultan Perencana</div>
              <div>
                <span>{dataProjectDetail || "(Perusahaan Pihak 2)"}</span>
              </div>
              <div className="tertanda-bast-perencanaan">
                <div className="tertanda-bast-underline">
                  <span>{dataProjectDetail || "(Nama Pihak 2)"}</span>
                </div>
                <div>
                  <span>{dataProjectDetail || "(Jabatan Pihak 2)"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-footer"></div>
        </div>
      </div>
    </>
  );
};

export default BapPekerjaanPerencananWord;

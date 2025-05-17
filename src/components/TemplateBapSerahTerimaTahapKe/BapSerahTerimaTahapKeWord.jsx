import "./BapSerahTerimaTahapKe.css";

const BapSerahTerimaTahapWord = ({ formDataPreview, projectDetailData, dataLampiran }) => {
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
                      BERITA ACARA SERAH TERIMA Tahap Ke-
                      <span>
                        {formDataPreview.tahap_ke || "(Tahap)"}(<span>{formDataPreview.tahap_ke_terbilang || "(Terbilang)"}</span>)
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
                        <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="row-table-bap-tahap">
                      <span className="label-table-bap-tahap">Nomor</span>
                      <span className="separator-table-bap-tahap">:</span>
                      <span className="value-table-bap-tahap">
                        <span>{formDataPreview.nomor_bap_serahterima || "(Nomor Surat BAP)"}</span>
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
                        <span>{projectDetailData.lokasi_pekerjaan || "(Lokasi Pekerjaan)"}</span>
                      </span>
                    </div>
                  </td>
                  <td>
                    {" "}
                    <div className="row-table-bap-tahap">
                      <span className="label-table-bap-tahap">Tanggal</span>
                      <span className="separator-table-bap-tahap">:</span>
                      <span className="value-table-bap-tahap">
                        <span>
                          {(formDataPreview.tanggal_bap_serahterima &&
                            new Date(formDataPreview.tanggal_bap_serahterima).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })) ||
                            "(Tanggal BAP Serah Terima)"}
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
          Pada hari ini, <span>{formDataPreview.tanggal_bap_serahterima_terbilang || "(Tanggal BAP Serah Terima Terbilang)"}</span> ({" "}
          <span>
            {(formDataPreview.tanggal_bap_serahterima &&
              new Date(formDataPreview.tanggal_bap_serahterima)
                .toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, "-")) ||
              "(Tanggal Surat BAP Serah terima)"}
          </span>
          ), kami yang bertanda tangan dibawah ini
        </div>
        <div className="bap-termin-wrapper">
          <div class="bap-termin-container">
            <div class="bap-termin-item">
              <span class="bap-label">Nama</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
              </span>
            </div>
            <div class="bap-termin-item">
              <span class="bap-label">Jabatan</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
              </span>
            </div>
            <div class="bap-termin-item">
              <span class="bap-label">Alamat</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span>{projectDetailData.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
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
                <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
              </span>
            </div>
            <div class="bap-termin-item">
              <span class="bap-label">Jabatan</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
              </span>
            </div>
            <div class="bap-termin-item">
              <span class="bap-label">Alamat</span> <span class="bap-separator">:</span>
              <span class="bap-value">
                <span>{projectDetailData.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
              </span>
            </div>
          </div>
          <p class="bap-pihak-pertama">
            Yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>
          </p>
        </div>
        <div className="last-paragraph-bap-serahterima">
          Berdasarkan Berita Acara Pemeriksaan Nomor : <span>{projectDetailData.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan)"} </span>
          tanggal{" "}
          <span>
            {(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan &&
              new Date(projectDetailData.tanggal_berita_acara_pemeriksaan_pekerjaan).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })) ||
              "(Tanggal BAP Pemeriksaan)"}
          </span>{" "}
          Setuju dan sepakat untuk melakukan Serah Terima Pekerjaan Tahap Ke-<span>{formDataPreview.tahap_ke || "(Tahap Ke)"}</span> (<span>{formDataPreview.tahap_ke_terbilang || "(Tahap Ke terbilang)"}</span>) untuk bulan{" "}
          <span>{formDataPreview.untuk_bulan || "(Bulan)"}</span> dengan ketentuan sebagai berikut:
        </div>

        <div className="bast-serah-terima-container">
          <div className="bast-serah-terima-section">
            <p className="bast-serah-terima-paragraph">1. PIHAK KEDUA menyerahkan kepada PIHAK KESATU dan PIHAK KESATU menyatakan menerima hasil pelaksanaan pekerjaan sebagai berikut:</p>
            <div className="bast-serah-terima-item">
              <span className="bast-serah-terima-label">a. Pekerjaan</span>
              <span className="bast-serah-terima-separator">:</span>
              <span className="bast-serah-terima-value">
                <span>{projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
              </span>
            </div>
            <div className="bast-serah-terima-item">
              <span className="bast-serah-terima-label">b. Nama Penyedia/Perusahaan</span>
              <span className="bast-serah-terima-separator">:</span>
              <span className="bast-serah-terima-value">
                <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
              </span>
            </div>
            <div className="bast-serah-terima-item">
              <span className="bast-serah-terima-label">c. Surat Perjanjian/Kontrak</span>
              <span className="bast-serah-terima-separator">:</span>
              <span className="bast-serah-terima-value">
                <span>{projectDetailData.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>
              </span>
            </div>
            <div className="bast-serah-terima-item">
              <span className="bast-serah-terima-label">d. Nilai Kontrak</span>
              <span className="bast-serah-terima-separator">:</span>
              <span className="bast-serah-terima-value">
                <span>{formDataPreview.nilai_kontrak.masked || "(Nominal Nilai Kontrak)"}</span>
              </span>
            </div>
            <div className="bast-serah-terima-item">
              <span className="bast-serah-terima-label"></span>
              <span className="bast-serah-terima-label-terbilang">
                <span>{formDataPreview.nilai_kontrak_terbilang || "(Nominal Nilai Kontrak Terbilang)"}</span>.
              </span>
            </div>
            <div className="bast-serah-terima-item">
              <span className="bast-serah-terima-label">e. Sumber Dana</span>
              <span className="bast-serah-terima-separator">:</span>
              <span className="bast-serah-terima-value">
                <span>{formDataPreview.nomor_surat_DIPA || "(Nomor Surat DIPA)"}</span>, tanggal{" "}
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
          </div>

          <div className="bast-serah-terima-section">
            <p className="bast-serah-terima-paragraph">Hasil Pekerjaan tersebut adalah sebagai berikut:</p>
            <div className="bast-serah-terima-item">
              <div className="bast-serah-terima-label-hasil-pekerjaan">a.</div> Pekerjaan tersebut telah mencapai <span> {formDataPreview.persentase_pekerjaan || "(Persentase)"}</span>% dari seluruh pekerjaan (rincian terlampir).
            </div>
            <div className="bast-serah-terima-item">
              <div className="bast-serah-terima-label-hasil-pekerjaan">b.</div> Pekerjaan <span> {projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"} </span> dalam kondisi Baik dan Lancar.
            </div>
          </div>
          <div className="last-paragraph-bap-serahterima">
            Dengan ditanda tanganinya Berita Acara Serah Terima Hasil Pekerjaan ini, PIHAK KEDUA berhak menerima pembayaran pekerjaan Tahap Ke-<span>{formDataPreview.tahap_ke || "(Tahap Ke)"}</span> (
            <span>{formDataPreview.tahap_ke_terbilang || "(Tahap ke terbilang)"}</span>) untuk bulan <span>{formDataPreview.untuk_bulan || "(Bulan)"}</span> Sebesar{" "}
            <span>{formDataPreview.nilai_pembayaran.masked || "(Nominal Pembayaran)"}</span> ( <span>{formDataPreview.nilai_pembayaran_terbilang || "(Nominal Pembayaran terbilang)"}</span> )
          </div>
          <div className="last-paragraph-bap-serahterima">
            Demikian Berita Acara Serah Terima Hasil Pekerjaan ini dibuat dan ditanda tangani atas kedua belah pihak pada tanggal tersebut diatas dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.
          </div>
        </div>

        <div className="ttd-bap-layout-serahterima">
          <div className="ttd-pihak-kesatu-tahap-serahterima">
            <div className="ttd-pihak-kesatu-bold-serahterima">PIHAK KESATU</div>
            <div className="ttd-pihak-kesatu-light-serahterima">Yang Menerima</div>
            <div className="ttd-pihak-kesatu-light-serahterima">
              <span>{projectDetailData.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
            </div>
            <div className="ttd-pihak-kesatu-light-serahterima">Universitas Bengkulu</div>

            <div className="nip-bap-layout-pihak1">
              <div className="ttd-pihak-kedua-tahap-serahterima">
                <div className="nip-bap-name-tahap-serahterima">
                  <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                </div>
                <div className="nip-bap-nip-tahap-serahterima">
                  NIP. <span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ttd-pihak-kedua-tahap-serahterima">
            <div className="ttd-pihak-kedua-bold">PIHAK KEDUA</div>
            <div className="ttd-pihak-kedua-light-serahterima">Yang Menyerahkan Penyedia</div>
            <div className="ttd-pihak-kedua-light">
              <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan/Instansi Pihak 2)"}</span>
            </div>

            <div className="nip-bap-layout-pihak2">
              <div className="ttd-pihak-kedua-tahap">
                <div className="nip-bap-name-tahap">
                  <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                </div>
                <div className="nip-bap-nip-tahap-serahterima">
                  <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lampiran-container">
        <div className="lampiran-header-tittle-layout">
          <div className="lampiran-header-tittle-text">
            Lampiran Berita Acara Serah Terima Tahap Ke-{formDataPreview.tahap_ke || "(Tahap)"} ({formDataPreview.tahap_ke_terbilang || "(Terbilang)"}) untuk bulan {formDataPreview.untuk_bulan || "(Bulan)"} Hasil Pekerjaan{" "}
            {projectDetailData.ruang_lingkup_pekerjaan || "(Pekerjaan)"}{" "}
          </div>
        </div>
        <div className="lampiran-separator-bar"></div>
        <div className="table-container">
          <table className="table-bast-serah-terima">
            <thead>
              <tr>
                <th>No</th>
                <th>Uraian Pekerjaan</th>
                <th>Satuan Ukuran</th>
                <th>Jumlah</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {dataLampiran.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.uraian || "(Uraian)"}</td>
                  <td>{item.satuan || "(Satuan)"}</td>
                  <td>{item.jumlah || "(Jumlah)"}</td>
                  <td>{item.keterangan || "(Keterangan)"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ttd-bap-layout-lampiran">
          <div className="ttd-pihak-kesatu-tahap-serahterima">
            <div className="ttd-pihak-kesatu-bold-serahterima">PIHAK KESATU</div>
            <div className="ttd-pihak-kesatu-light-serahterima">Yang Menerima</div>
            <div className="ttd-pihak-kesatu-light-serahterima">
              <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 1)"}</span>
            </div>
            <div className="ttd-pihak-kesatu-light-serahterima">Universitas Bengkulu</div>

            <div className="nip-bap-layout-pihak1">
              <div className="ttd-pihak-kedua-tahap">
                <div className="nip-bap-name-tahap">
                  <span>{projectDetailData.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                </div>
                <div className="nip-bap-nip">
                  NIP. <span>{projectDetailData.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ttd-pihak-kedua-tahap-serahterima">
            <div className="ttd-pihak-kedua-bold">PIHAK KEDUA</div>
            <div className="ttd-pihak-kedua-light-serahterima">Yang Menyerahkan Penyedia</div>
            <div className="ttd-pihak-kedua-light">
              <span>{projectDetailData.perusahaan_pihak_2 || "(Perusahaan/Instansi Pihak 2)"}</span>
            </div>

            <div className="nip-bap-layout-pihak2">
              <div className="ttd-pihak-kedua-tahap">
                <div className="nip-bap-name-tahap">
                  <span>{projectDetailData.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                </div>
                <div className="nip-bap-nip-tahap">
                  <span>{projectDetailData.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BapSerahTerimaTahapWord;

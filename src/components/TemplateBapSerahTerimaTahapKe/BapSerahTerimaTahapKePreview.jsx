import "./BapSerahTerimaTahapKeUI.css";

const BapSerahTerimaTahapKePreview = ({ formDataPreview, dataProjectDetail, dataLampiran }) => {
  return (
    <div className="preview-layout-ui">
      <div className="preview-bar-ui">Preview</div>
      <div class="a4-container-ui-bapserahterima">
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
                      BERITA ACARA SERAH TERIMA Tahap Ke-
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
                        <span style={{ color: "red" }}>{dataProjectDetail.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="row-table-bap-tahap-ui">
                      <span className="label-table-bap-tahap-ui">Nomor</span>
                      <span className="separator-table-bap-tahap-ui">:</span>
                      <span className="value-table-bap-tahap-ui">
                        <span style={{ color: "red" }}>{formDataPreview.nomor_bap_serahterima || "(Nomor Surat BAP)"}</span>
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

        <div className="first-paragraph-bap-ui">
          Pada hari ini, <span style={{ color: "red" }}>{formDataPreview.tanggal_bap_serahterima_terbilang || "(Tanggal BAP Serah Terima Terbilang)"}</span> ({" "}
          <span style={{ color: "red" }}>
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

        <div className="last-paragraph-bap-serahterima-ui">
          Berdasarkan Berita Acara Pemeriksaan Nomor : <span style={{ color: "red" }}>{dataProjectDetail.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan)"} </span>
          tanggal{" "}
          <span style={{ color: "red" }}>
            {(dataProjectDetail.tanggal_berita_acara_pemeriksaan_pekerjaan &&
              new Date(dataProjectDetail.tanggal_berita_acara_pemeriksaan_pekerjaan).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })) ||
              "(Tanggal BAP Pemeriksaan)"}
          </span>{" "}
          Setuju dan sepakat untuk melakukan Serah Terima Pekerjaan Tahap Ke-<span style={{ color: "red" }}>{formDataPreview.tahap_ke || "(Tahap Ke)"}</span> (
          <span style={{ color: "red" }}>{formDataPreview.tahap_ke_terbilang || "(Tahap Ke terbilang)"}</span>) untuk bulan <span style={{ color: "red" }}>{formDataPreview.untuk_bulan || "(Bulan)"}</span> dengan ketentuan sebagai berikut:
        </div>
        <div className="bast-serah-terima-container-ui">
          <div className="bast-serah-terima-section-ui">
            <p className="bast-serah-terima-paragraph-ui">1. PIHAK KEDUA menyerahkan kepada PIHAK KESATU dan PIHAK KESATU menyatakan menerima hasil pelaksanaan pekerjaan sebagai berikut:</p>
            <div className="bast-serah-terima-item-ui">
              <span className="bast-serah-terima-label-ui">a. Pekerjaan</span>
              <span className="bast-serah-terima-separator-ui">:</span>
              <span className="bast-serah-terima-value-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
              </span>
            </div>
            <div className="bast-serah-terima-item-ui">
              <span className="bast-serah-terima-label-ui">b. Nama Penyedia/Perusahaan</span>
              <span className="bast-serah-terima-separator-ui">:</span>
              <span className="bast-serah-terima-value-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
              </span>
            </div>
            <div className="bast-serah-terima-item-ui">
              <span className="bast-serah-terima-label-ui">c. Surat Perjanjian/Kontrak</span>
              <span className="bast-serah-terima-separator-ui">:</span>
              <span className="bast-serah-terima-value-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>
              </span>
            </div>
            <div className="bast-serah-terima-item-ui">
              <span className="bast-serah-terima-label-ui">d. Nilai Kontrak</span>
              <span className="bast-serah-terima-separator-ui">:</span>
              <span className="bast-serah-terima-value-ui">
                <span style={{ color: "red" }}>{formDataPreview.nilai_kontrak.masked || "(Nominal Nilai Kontrak)"}</span>
              </span>
            </div>
            <div className="bast-serah-terima-item-ui">
              <span className="bast-serah-terima-label-ui"></span>
              <span className="bast-serah-terima-label-terbilang-ui">
                <span style={{ color: "red" }}>{formDataPreview.nilai_kontrak_terbilang || "(Nominal Nilai Kontrak Terbilang)"}</span>.
              </span>
            </div>
            <div className="bast-serah-terima-item-ui">
              <span className="bast-serah-terima-label-ui">e. Sumber Dana</span>
              <span className="bast-serah-terima-separator-ui">:</span>
              <span className="bast-serah-terima-value-ui">
                <span style={{ color: "red" }}>{formDataPreview.nomor_surat_DIPA || "(Nomor Surat DIPA)"}</span>, tanggal{" "}
                <span style={{ color: "red" }}>
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

          <div className="bast-serah-terima-section-ui">
            <p className="bast-serah-terima-paragraph-ui">Hasil Pekerjaan tersebut adalah sebagai berikut:</p>
            <div className="bast-serah-terima-item-ui">
              <div className="bast-serah-terima-label-hasil-pekerjaan-ui">a.</div> Pekerjaan tersebut telah mencapai <span style={{ color: "red" }}> {formDataPreview.persentase_pekerjaan || "(Persentase)"}</span>% dari seluruh pekerjaan
              (rincian terlampir).
            </div>
            <div className="bast-serah-terima-item-ui">
              <div className="bast-serah-terima-label-hasil-pekerjaan-ui">b.</div> Pekerjaan <span style={{ color: "red" }}> {dataProjectDetail.ruang_lingkup_pekerjaan || "(Pekerjaan)"} </span> dalam kondisi Baik dan Lancar.
            </div>
          </div>
          <div className="last-paragraph-bap-serahterima-ui">
            Dengan ditanda tanganinya Berita Acara Serah Terima Hasil Pekerjaan ini, PIHAK KEDUA berhak menerima pembayaran pekerjaan Tahap Ke-<span style={{ color: "red" }}>{formDataPreview.tahap_ke || "(Tahap Ke)"}</span> (
            <span style={{ color: "red" }}>{formDataPreview.tahap_ke_terbilang || "(Tahap ke terbilang)"}</span>) untuk bulan <span style={{ color: "red" }}>{formDataPreview.untuk_bulan || "(Bulan)"}</span> Sebesar{" "}
            <span style={{ color: "red" }}>{formDataPreview.nilai_pembayaran.masked || "(Nominal Pembayaran)"}</span> ( <span style={{ color: "red" }}>{formDataPreview.nilai_pembayaran_terbilang || "(Nominal Pembayaran terbilang)"}</span> )
          </div>
          <div className="last-paragraph-bap-serahterima-ui">
            Demikian Berita Acara Serah Terima Hasil Pekerjaan ini dibuat dan ditanda tangani atas kedua belah pihak pada tanggal tersebut diatas dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.
          </div>
        </div>
        <div className="ttd-bap-layout-serahterima-ui">
          <div className="ttd-pihak-kesatu-tahap-serahterima-ui">
            <div className="ttd-pihak-kesatu-bold-serahterima-ui">PIHAK KESATU</div>
            <div className="ttd-pihak-kesatu-light-serahterima-ui">Yang Menerima</div>
            <div className="ttd-pihak-kesatu-light-serahterima-ui">
              <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
            </div>
            <div className="ttd-pihak-kesatu-light-serahterima-ui">Universitas Bengkulu</div>

            <div className="nip-bap-layout-pihak1-ui">
              <div className="ttd-pihak-kedua-tahap-serahterima-ui">
                <div className="nip-bap-name-tahap-serahterima-ui">
                  <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                </div>
                <div className="nip-bap-nip-tahap-serahterima-ui">
                  NIP. <span style={{ color: "red" }}>{dataProjectDetail.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ttd-pihak-kedua-tahap-serahterima-ui">
            <div className="ttd-pihak-kedua-bold-ui">PIHAK KEDUA</div>
            <div className="ttd-pihak-kedua-light-serahterima-ui">Yang Menyerahkan Penyedia</div>
            <div className="ttd-pihak-kedua-light-ui">
              <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan/Instansi Pihak 2)"}</span>
            </div>

            <div className="nip-bap-layout-pihak2-ui">
              <div className="ttd-pihak-kedua-tahap-ui">
                <div className="nip-bap-name-tahap-ui">
                  <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                </div>
                <div className="nip-bap-nip-tahap-serahterima-ui">
                  <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="a4-container-ui-bapserahterima">
        <div className="lampiran-header-tittle-layout-ui">
          <div className="lampiran-header-tittle-text-ui">
            Lampiran Berita Acara Serah Terima Tahap Ke-{formDataPreview.tahap_ke || "(Tahap)"} ({formDataPreview.tahap_ke_terbilang || "(Terbilang)"}) untuk bulan {formDataPreview.untuk_bulan || "(Bulan)"} Hasil Pekerjaan{" "}
            {dataProjectDetail.ruang_lingkup_pekerjaan || "(Pekerjaan)"}{" "}
          </div>
        </div>
        <div className="lampiran-separator-bar-ui"></div>
        <div className="table-container-ui">
          <table className="table-bast-serah-terima-ui">
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
        <div className="ttd-bap-layout-lampiran-ui">
          <div className="ttd-pihak-kesatu-tahap-serahterima-ui">
            <div className="ttd-pihak-kesatu-bold-serahterima-ui">PIHAK KESATU</div>
            <div className="ttd-pihak-kesatu-light-serahterima-ui">Yang Menerima</div>
            <div className="ttd-pihak-kesatu-light-serahterima-ui">
              <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
            </div>
            <div className="ttd-pihak-kesatu-light-serahterima-ui">Universitas Bengkulu</div>

            <div className="nip-bap-layout-pihak1-ui">
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
          <div className="ttd-pihak-kedua-tahap-serahterima-ui">
            <div className="ttd-pihak-kedua-bold-ui">PIHAK KEDUA</div>
            <div className="ttd-pihak-kedua-light-serahterima-ui">Yang Menyerahkan Penyedia</div>
            <div className="ttd-pihak-kedua-light">
              <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan/Instansi Pihak 2)"}</span>
            </div>

            <div className="nip-bap-layout-pihak2-ui">
              <div className="ttd-pihak-kedua-tahap-ui">
                <div className="nip-bap-name-tahap-ui">
                  <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_1 || "(Nama Pihak 2)"}</span>
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

export default BapSerahTerimaTahapKePreview;

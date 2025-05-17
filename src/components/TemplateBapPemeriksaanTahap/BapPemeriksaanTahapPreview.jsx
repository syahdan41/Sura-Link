import "./BapPemeriksaanTahapUI.css";

const BapSerahTerimaTahapKePreview = ({ formDataPreview, dataProjectDetail, dataLampiran }) => {
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
                      BERITA ACARA PEMERIKSAAN Tahap Ke-
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
                        <span style={{ color: "red" }}>{formDataPreview.nomor_bap_pemeriksaan || "(Nomor Surat BAP)"}</span>
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
                          {(formDataPreview.tanggal_bap_pemeriksaan &&
                            new Date(formDataPreview.tanggal_bap_pemeriksaan).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })) ||
                            "(Tanggal BAP Pemeriksaan)"}
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
          Pada hari ini, <span style={{ color: "red" }}>{formDataPreview.tanggal_bap_pemeriksaan_terbilang || "(Tanggal BAP Pemeriksaan Terbilang)"}</span> ({" "}
          <span style={{ color: "red" }}>
            {(formDataPreview.tanggal_bap_pemeriksaan &&
              new Date(formDataPreview.tanggal_bap_pemeriksaan)
                .toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, "-")) ||
              "(Tanggal Surat BAP Pemeriksaan)"}
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
                <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>, dalam hal ini bertindak untuk dan atas nama Pemerintah Republik Indonesia Selanjutnya disebut sebagai PIHAK KESATU.
              </span>
            </div>
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Alamat</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
              </span>
            </div>
          </div>

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
                <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span> <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan/Instansi Pihak 2)"}</span>, dalam hal ini
                bertindak untuk dan atas nama Perusahaan disebut Sebagai PIHAK KEDUA .
              </span>
            </div>
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Alamat</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="bast-serah-terima-container-ui">
          <div className="bast-serah-terima-section-ui">
            <p className="bast-serah-terima-paragraph">
              PIHAK KESATU dan PIHAK KEDUA telah melakukan pemeriksaan Tahap Ke-<span style={{ color: "red" }}>{formDataPreview.tahap_ke || "(Tahap)"}</span> (
              <span style={{ color: "red" }}>{formDataPreview.tahap_ke_terbilang || "(Tahap terbilang)"}</span>) untuk bulan <span style={{ color: "red" }}>{formDataPreview.untuk_bulan || "(Untuk Bulan)"}</span> Hasil Pekerjaan{" "}
              <span style={{ color: "red" }}>{dataProjectDetail.pekerjaan || "(Pekerjaan)"}</span> yang dikerjakan oleh <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan pihak 2)"}</span> Berdasarkan Surat
              Perjanjian/Kontrak Nomor :<span style={{ color: "red" }}>{dataProjectDetail.nomor_surat_perjanjian_kontrak || "(Nomor Kontrak Perjanjian)"}</span> tanggal{" "}
              <span style={{ color: "red" }}>
                {(dataProjectDetail.tanggal_surat_perjanjian_kontrak &&
                  new Date(dataProjectDetail.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Surat Kontrak)"}
              </span>
              dengan Nilai Kontrak <span style={{ color: "red" }}>{formDataPreview.nilai_kontrak.masked || "(Nilai Kontrak))"}</span> (
              <span style={{ color: "red" }}>{formDataPreview.nilai_kontrak_terbilang || "(Nilai Kontrak Terbilang)"}</span>) terhitung mulai tanggal{" "}
              <span style={{ color: "red" }}>
                {(formDataPreview.tanggal_awal &&
                  new Date(formDataPreview.tanggal_awal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Awal)"}
              </span>
              <span> </span> sampai dengan{" "}
              <span style={{ color: "red" }}>
                {(formDataPreview.tanggal_akhir &&
                  new Date(formDataPreview.tanggal_akhir).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Akhir)"}
              </span>
              <span> </span>dengan perincian sebagai berikut:
            </p>
            {(formDataPreview.deskripsi_pemeriksaan || "Rincian").split("\n").map((item, index) => (
              <div key={index} className="bast-serah-terima-item-ui">
                <div className="bast-serah-terima-label-hasil-pekerjaan-ui">{index + 1}.</div>
                {item.replace(/^\d+\.\s*/, "")}
              </div>
            ))}
          </div>
          <div className="last-paragraph-bap-serahterima">Perincian dan keterangan dalam lampiran merupakan bagian yang tidak terpisahkan dari berita acara ini.</div>
          <div className="last-paragraph-bap-serahterima-ui">
            Demikian Berita Acara Pemeriksaan Hasil Pekerjaan ini dibuat dan ditanda tangani atas kedua belah pihak pada tanggal tersebut diatas dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.
          </div>
        </div>
        <div className="ttd-bap-layout-serahterima-ui">
          <div className="ttd-pihak-kesatu-tahap-serahterima-ui">
            <div className="ttd-pihak-kesatu-bold-serahterima-ui">PIHAK KESATU</div>

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
            <div className="ttd-pihak-kedua-light-serahterima-ui">Mengetahui, Menyetujui :</div>
            <div className="ttd-pihak-kedua-light-ui">
              <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan pihak 2)"}</span>
            </div>

            <div className="nip-bap-layout-pihak2-ui">
              <div className="ttd-pihak-kedua-tahap-ui">
                <div className="nip-bap-name-tahap-ui">
                  <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_2 || "(nama pihak 2)"}</span>
                </div>
                <div className="nip-bap-nip-tahap-serahterima-ui">
                  <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_2 || "(Jabatan pihak 2)"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="a4-container-ui">
        <div className="lampiran-header-tittle-layout-ui">
          <div className="lampiran-header-tittle-text-ui">
            Lampiran Berita Acara Pemeriksaan Tahap Ke-<span style={{ color: "red" }}>{formDataPreview.tahap_ke || "(Tahap)"}</span> (<span style={{ color: "red" }}>{formDataPreview.tahap_ke_terbilang || "(Tahap Terbilang)"}</span>) untuk
            bulan <span style={{ color: "red" }}>{formDataPreview.untuk_bulan || "(bulan)"}</span> Hasil Pekerjaan <span style={{ color: "red" }}>{dataProjectDetail.pekerjaan || "(Pekerjaan)"}</span>{" "}
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
                  NIP. <span style={{ color: "red" }}>{dataProjectDetail.nip_pihak_1 || "(Nip Pihak 1)"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ttd-pihak-kedua-tahap-serahterima-ui">
            <div className="ttd-pihak-kedua-bold-ui">PIHAK KEDUA</div>
            <div className="ttd-pihak-kedua-light-serahterima-ui">Mengetahui, Menyetujui :</div>
            <div className="ttd-pihak-kedua-light">
              <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan pihak 2)"}</span>
            </div>

            <div className="nip-bap-layout-pihak2-ui">
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

export default BapSerahTerimaTahapKePreview;

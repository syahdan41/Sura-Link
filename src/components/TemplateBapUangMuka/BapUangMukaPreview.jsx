import "./BapUangMukaUI.css";

const BapUangMukaPreview = ({ previewDataForm, detailDataProject }) => {
  console.log("dataproject detail :", detailDataProject);
  return (
    <>
      <div className="preview-layout-ui">
        <div className="preview-bar-ui">Preview</div>
        <div class="a4-container-landscape-ui">
          <div className="surat-header-bap-ui">
            <div className="header-table-bap-ui">
              <div className="surat-header-bap-text-bold-ui">
                KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
                <br />
                DAN TEKNOLOGI
                <br /> UNIVERSITAS BENGKULU
              </div>
              <div className="pekerjaan-bap-ui">
                <div className="pekerjaan-title-ui">PEKERJAAN</div>
                <div className="pekerjaan-value-ui">
                  <span style={{ color: "red" }}>{detailDataProject.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                </div>
              </div>
              <div className="lokasi-bap-ui">
                <div className="lokasi-bap-tittle-ui">Lokasi</div>
                <div className="lokasi-bap-value-ui">
                  <span style={{ color: "red" }}>{detailDataProject.lokasi_pekerjaan || "(Pekerjaan)"}</span>
                </div>
              </div>
            </div>
            <div className="header-table-bap-ui">
              <div className="surat-header-bap-text-bold-right-ui">
                BERITA ACARA
                <br />
                SERAH TERIMA UANG MUKA
              </div>
              <div className="bap-header-container-ui">
                <span className="label-bap-ui">Nomor</span>
                <span className="separator-bap-ui">:</span>
                <span className="value-bap-ui">
                  <span style={{ color: "red" }}>{previewDataForm.nomor_bap_uangmuka || "(Nomor BAP)"}</span>
                </span>

                <span className="label-bap-ui">Tanggal</span>
                <span className="separator-bap-ui">:</span>
                <span className="value-bap-ui">
                  <span style={{ color: "red" }}>
                    {(previewDataForm.tanggal_bap_uangmuka &&
                      new Date(previewDataForm.tanggal_bap_uangmuka).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })) ||
                      "(Tanggal Surat BAP)"}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="first-paragraph-bap-ui">
            Pada hari ini,
            <span style={{ color: "red" }}>
              {previewDataForm.tanggal_bap_uangmuka_terbilang || "(Tanggal BAP Terbilang)"} (
              {(previewDataForm.tanggal_bap_uangmuka &&
                new Date(previewDataForm.tanggal_bap_uangmuka)
                  .toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  .replace(/\//g, "-")) ||
                "(Tanggal Surat BAP)"}
              ){" "}
            </span>{" "}
            , kami yang bertanda tangan dibawah
          </div>
          <div className="bap-termin-wrapper-ui">
            <div class="bap-termin-container-ui">
              <div class="bap-termin-item-ui">
                <span class="bap-label-ui">Nama</span> <span class="bap-separator">:</span>
                <span class="bap-value-ui">
                  <span style={{ color: "red" }}>{detailDataProject.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                </span>
              </div>
              <div class="bap-termin-item-ui">
                <span class="bap-label-ui">Jabatan</span> <span class="bap-separator">:</span>
                <span class="bap-value-ui">
                  <span style={{ color: "red" }}>{detailDataProject.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                </span>
              </div>
              <div class="bap-termin-item-ui">
                <span class="bap-label-ui">Alamat</span> <span class="bap-separator">:</span>
                <span class="bap-value-ui">
                  <span style={{ color: "red" }}>{detailDataProject.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
                </span>
              </div>
            </div>
            <p class="bap-pihak-pertama-ui">
              Yang selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>
            </p>

            <div class="bap-termin-container">
              <div class="bap-termin-item-ui">
                <span class="bap-label-ui">Nama</span> <span class="bap-separator">:</span>
                <span class="bap-value-ui">
                  <span style={{ color: "red" }}>{detailDataProject.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                </span>
              </div>
              <div class="bap-termin-item-ui">
                <span class="bap-label-ui">Jabatan</span> <span class="bap-separator">:</span>
                <span class="bap-value-ui">
                  <span style={{ color: "red" }}>{detailDataProject.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                </span>
              </div>
              <div class="bap-termin-item-ui">
                <span class="bap-label-ui">Alamat</span> <span class="bap-separator">:</span>
                <span class="bap-value-ui">
                  <span style={{ color: "red" }}>{detailDataProject.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
                </span>
              </div>
            </div>
            <p class="bap-pihak-pertama-ui">
              Yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>
            </p>
          </div>

          <div className="bast-uangmuka-container-ui">
            <div className="bast-uangmuka-section-ui">
              <p className="bast-uangmuka-paragraph-ui">Dengan ini menyatakan :</p>
              <p className="bast-uangmuka-paragraph-ui">1. Telah Mengadakan pemeriksaan di lapangan untuk pekerjaan :</p>
              <div className="bast-uangmuka-list-ui">
                <div className="bast-uangmuka-item-ui">
                  <b>a. Pekerjaan</b>: <span style={{ color: "red" }}>{detailDataProject.pekerjaan || "(Pekerjaan)"}</span>
                </div>
                <div className="bast-uangmuka-item-ui">
                  <b>b. Lokasi</b>: <span style={{ color: "red" }}>{detailDataProject.lokasi_pekerjaan || "(Pekerjaan)"}</span>
                </div>
                <div className="bast-uangmuka-item-ui">
                  <b>c. Pelaksana</b>: <span style={{ color: "red" }}>{detailDataProject.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                </div>
                <div className="bast-uangmuka-item-ui">
                  <b>d. Nomor Kontrak</b>: <span style={{ color: "red" }}>{detailDataProject.nomor_surat_perjanjian_kontrak || "(Nomor Kontrak)"}</span>
                </div>
                <div className="bast-uangmuka-item-ui">
                  <b>e. Nilai Kontrak</b>: <span style={{ color: "red" }}>{previewDataForm.nilai_kontrak.masked || "(Nilai Kontrak)"}</span>
                </div>
                <div className="bast-uangmuka-item-ui">
                  <b>f. Tanggal Kontrak</b>:{" "}
                  <span style={{ color: "red" }}>
                    {(detailDataProject.tanggal_surat_perjanjian_kontrak &&
                      new Date(detailDataProject.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })) ||
                      "(Tanggal Surat Kontrak)"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bast-uangmuka-section-ui">
              <p className="bast-uangmuka-paragraph-ui">2. Berdasarkan Berita Acara Pemeriksaan dapat dilaporkan sebagai berikut :</p>
              <div className="bast-uangmuka-list-ui">
                <div className="bast-uangmuka-item-ui">a. Pekerjaan Fisik sudah dimulai dikerjakan</div>
              </div>
            </div>
          </div>
        </div>
        <div class="a4-container-landscape-ui">
          <div className="bast-uangmuka-container-ui">
            <div className="bast-uangmuka-section-ui">
              <div className="bast-uangmuka-list-ui">
                <div className="bast-uangmuka-item-ui">
                  b. Kontraktor pelaksana telah melaksanakan pekerjaan dengan baik sesuai dengan Surat Perjanjian Kerja/Kontrak Nomor:{" "}
                  <span style={{ color: "red" }}>{detailDataProject.nomor_surat_perjanjian_kontrak || "(Nomor Kontrak)"}</span>, Tanggal{" "}
                  <span style={{ color: "red" }}>
                    {(detailDataProject.tanggal_surat_perjanjian_kontrak &&
                      new Date(detailDataProject.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })) ||
                      "(Tanggal Surat Kontrak)"}
                  </span>
                  .
                </div>
                <div className="bast-uangmuka-item-ui">
                  Dengan ditandatanganinya Berita Acara Serah Terima Hasil Pekerjaan ini, PIHAK KEDUA berhak menerima pembayaran pekerjaan Uang Muka untuk bulan{" "}
                  <span style={{ color: "red" }}>{previewDataForm.untuk_bulan || "(Pembayaran untuk bulan)"}</span> sebesar{" "}
                  <span className="bast-uangmuka-amount">
                    <span style={{ color: "red" }}>{previewDataForm.nilai_pembayaran_uangmuka.masked || "(Nilai Pembayaran Uang Muka)"}</span>
                  </span>{" "}
                  <span style={{ color: "red" }}>{previewDataForm.nilai_pembayaran_uangmuka_terbilang || "(Nilai Pembayaran Uang Muka Terbilang)"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="last-paragraph-bap-ui">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>
          <div className="ttd-bap-layout-ui">
            <div className="ttd-pihak-kedua-ui">
              <div className="ttd-pihak-kedua-bold-ui">PIHAK KEDUA</div>
              <div className="ttd-pihak-kedua-light-ui">KONTRAKTOR PELAKSANA</div>
              <div className="ttd-pihak-kedua-bold-ui">
                {" "}
                <span style={{ color: "red" }}>{detailDataProject.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
              </div>
              <div className="nip-bap-layout-ui">
                <div className="ttd-pihak-kedua-ui">
                  <div className="nip-bap-name-ui">
                    <span style={{ color: "red" }}>{detailDataProject.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                  </div>
                  <div className="nip-bap-nip-ui">
                    <span style={{ color: "red" }}>{detailDataProject.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ttd-pihak-kedua">
              <div className="ttd-pihak-kedua-bold-ui">PIHAK PERTAMA</div>
              <div className="ttd-pihak-kedua-light-ui">KONTRAKTOR PELAKSANA</div>
              <div className="ttd-pihak-kedua-bold-ui">
                {" "}
                <span style={{ color: "red" }}>{detailDataProject.perusahaan_pihak_1 || "(Perusahaan Pihak 1)"}</span>
              </div>
              <div className="nip-bap-layout-ui">
                <div className="ttd-pihak-kedua">
                  <div className="nip-bap-name-ui">
                    <span style={{ color: "red" }}>{detailDataProject.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                  </div>
                  <div className="nip-bap-nip-ui">
                    <span style={{ color: "red" }}>{detailDataProject.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BapUangMukaPreview;

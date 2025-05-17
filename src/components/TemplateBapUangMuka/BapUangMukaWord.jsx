import "./BapUangMuka.css";

const BapUangMukaWord = ({ previewDataForm, detailDataProject }) => {
  return (
    <>
      <div>
        <div>
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
                  <span>{detailDataProject.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                </div>
              </div>
              <div className="lokasi-bap">
                <div className="lokasi-bap-tittle">Lokasi</div>
                <div className="lokasi-bap-value">
                  <span>{detailDataProject.lokasi_pekerjaan || "(Pekerjaan)"}</span>
                </div>
              </div>
            </div>
            <div className="header-table-bap">
              <div className="surat-header-bap-text-bold-right">
                BERITA ACARA
                <br />
                SERAH TERIMA UANG MUKA
              </div>
              <div className="bap-header-container">
                <span className="label-bap">Nomor</span>
                <span className="separator-bap">:</span>
                <span className="value-bap">
                  <span>{previewDataForm.nomor_bap_uangmuka || "(Nomor BAP)"}</span>
                </span>

                <span className="label-bap">Tanggal</span>
                <span className="separator-bap">:</span>
                <span className="value-bap">
                  <span>
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
          <div className="first-paragraph-bap">
            Pada hari ini,
            <span>
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
          <div className="bap-termin-wrapper">
            <div class="bap-termin-container">
              <div class="bap-termin-item">
                <span class="bap-label">Nama</span> <span class="bap-separator">:</span>
                <span class="bap-value">
                  <span>{detailDataProject.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                </span>
              </div>
              <div class="bap-termin-item">
                <span class="bap-label">Jabatan</span> <span class="bap-separator">:</span>
                <span class="bap-value">
                  <span>{detailDataProject.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                </span>
              </div>
              <div class="bap-termin-item">
                <span class="bap-label">Alamat</span> <span class="bap-separator">:</span>
                <span class="bap-value">
                  <span>{detailDataProject.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
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
                  <span>{detailDataProject.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                </span>
              </div>
              <div class="bap-termin-item">
                <span class="bap-label">Jabatan</span> <span class="bap-separator">:</span>
                <span class="bap-value">
                  <span>{detailDataProject.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                </span>
              </div>
              <div class="bap-termin-item">
                <span class="bap-label">Alamat</span> <span class="bap-separator">:</span>
                <span class="bap-value">
                  <span>{detailDataProject.alamat_pihak_2 || "(Alamat Pihak 2)"}</span>
                </span>
              </div>
            </div>
            <p class="bap-pihak-pertama">
              Yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>
            </p>
          </div>

          <div className="bast-uangmuka-container">
            <div className="bast-uangmuka-section">
              <p className="bast-uangmuka-paragraph">Dengan ini menyatakan :</p>
              <p className="bast-uangmuka-paragraph">1. Telah Mengadakan pemeriksaan di lapangan untuk pekerjaan :</p>
              <div className="bast-uangmuka-list">
                <div className="bast-uangmuka-item">
                  <b>a. Pekerjaan</b>: <span>{detailDataProject.pekerjaan || "(Pekerjaan)"}</span>
                </div>
                <div className="bast-uangmuka-item">
                  <b>b. Lokasi</b>: <span>{detailDataProject.lokasi_pekerjaan || "(Pekerjaan)"}</span>
                </div>
                <div className="bast-uangmuka-item">
                  <b>c. Pelaksana</b>: <span>{detailDataProject.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                </div>
                <div className="bast-uangmuka-item">
                  <b>d. Nomor Kontrak</b>: <span>{detailDataProject.nomor_surat_perjanjian_kontrak || "(Nomor Kontrak)"}</span>
                </div>
                <div className="bast-uangmuka-item">
                  <b>e. Nilai Kontrak</b>: <span>{previewDataForm.nilai_kontrak.masked || "(Nilai Kontrak)"}</span>
                </div>
                <div className="bast-uangmuka-item">
                  <b>f. Tanggal Kontrak</b>:{" "}
                  <span>
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

            <div className="bast-uangmuka-section">
              <p className="bast-uangmuka-paragraph">2. Berdasarkan Berita Acara Pemeriksaan dapat dilaporkan sebagai berikut :</p>
              <div className="bast-uangmuka-list">
                <div className="bast-uangmuka-item">a. Pekerjaan Fisik sudah dimulai dikerjakan</div>
              </div>
            </div>
          </div>
          <div>
            <div className="bast-uangmuka-container">
              <div className="bast-uangmuka-section">
                <div className="bast-uangmuka-list">
                  <div className="bast-uangmuka-item">
                    b. Kontraktor pelaksana telah melaksanakan pekerjaan dengan baik sesuai dengan Surat Perjanjian Kerja/Kontrak Nomor: <span>{detailDataProject.nomor_surat_perjanjian_kontrak || "(Nomor Kontrak)"}</span>, Tanggal{" "}
                    <span>
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
                  <div className="bast-uangmuka-item">
                    Dengan ditandatanganinya Berita Acara Serah Terima Hasil Pekerjaan ini, PIHAK KEDUA berhak menerima pembayaran pekerjaan Uang Muka untuk bulan <span>{previewDataForm.untuk_bulan || "(Pembayaran untuk bulan)"}</span>{" "}
                    sebesar{" "}
                    <span className="bast-uangmuka-amount">
                      <span>{previewDataForm.nilai_pembayaran_uangmuka.masked || "(Nilai Pembayaran Uang Muka)"}</span>
                    </span>{" "}
                    <span>{previewDataForm.nilai_pembayaran_uangmuka_terbilang || "(Nilai Pembayaran Uang Muka Terbilang)"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="last-paragraph-bap">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>
            <div className="ttd-bap-layout">
              <div className="ttd-pihak-kedua">
                <div className="ttd-pihak-kedua-bold">PIHAK KEDUA</div>
                <div className="ttd-pihak-kedua-light">KONTRAKTOR PELAKSANA</div>
                <div className="ttd-pihak-kedua-bold">
                  {" "}
                  <span>{detailDataProject.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                </div>
                <div className="nip-bap-layout">
                  <div className="ttd-pihak-kedua">
                    <div className="nip-bap-name">
                      <span>{detailDataProject.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                    </div>
                    <div className="nip-bap-nip">
                      <span>{detailDataProject.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ttd-pihak-kedua">
                <div className="ttd-pihak-kedua-bold">PIHAK PERTAMA</div>
                <div className="ttd-pihak-kedua-light">KONTRAKTOR PELAKSANA</div>
                <div className="ttd-pihak-kedua-bold">
                  {" "}
                  <span>{detailDataProject.perusahaan_pihak_1 || "(Perusahaan Pihak 1)"}</span>
                </div>
                <div className="nip-bap-layout">
                  <div className="ttd-pihak-kedua">
                    <div className="nip-bap-name">
                      <span>{detailDataProject.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                    </div>
                    <div className="nip-bap-nip">
                      <span>{detailDataProject.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                    </div>
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

export default BapUangMukaWord;

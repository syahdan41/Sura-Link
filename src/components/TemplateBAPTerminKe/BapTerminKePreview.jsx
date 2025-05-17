import "./BapTerminKeUI.css";

const BapTerminKePreview = ({ formDataPreview, dataProjectDetail, previousTerminData, isInputFieldDpShown, dataDp, suffixParam }) => {
  if (suffixParam != null || suffixParam === "0" || suffixParam === 0) {
    return (
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
                  <span style={{ color: "red" }}>{dataProjectDetail.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                </div>
              </div>
              <div className="lokasi-bap-ui">
                <div className="lokasi-bap-tittle-ui">Lokasi</div>
                <div className="lokasi-bap-value-ui">
                  <span style={{ color: "red" }}>{dataProjectDetail.lokasi_pekerjaan || "(Pekerjaan)"}</span>
                </div>
              </div>
            </div>
            <div className="header-table-bap-ui">
              <div className="surat-header-bap-text-bold-right-ui">
                BERITA ACARA
                <br />
                PEMBAYARAN TERMIN {formDataPreview.nama_termin_ke !== "0" && formDataPreview.nama_termin_ke !== 0 ? formDataPreview.nama_termin_ke || "(Termin Ke)" : ""}
              </div>
              <div className="bap-header-container-ui">
                <span className="label-bap-ui">Nomor</span>
                <span className="separator-bap-ui">:</span>
                <span className="value-bap-ui">
                  <span style={{ color: "red" }}>{formDataPreview.nomorSuratBAP || "(Nomor BAP)"}</span>
                </span>

                <span className="label-bap-ui">Tanggal</span>
                <span className="separator-bap-ui">:</span>
                <span className="value-bap-ui">
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
            ), kami yang bertanda tangan dibawah
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

          <div class="bap-termin-detail-ui">
            <span class="bap-termin-number-ui">1.</span>
            <p class="bap-termin-text-ui">
              Berdasarkan Berita Acara Pemeriksaan Pekerjaan Nomor :
              <span class="bap-termin-highlight-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan Pekerjaan)"}</span>
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
                    "(Tanggal BAP Pemeriksaan Pekerjaan)"}
                </span>
              </span>
              , bahwa prestasi pekerjaan telah mencapai{" "}
              <span class="bap-termin-highlight-ui">
                <span style={{ color: "red" }}>{formDataPreview.persentase_pekerjaan || "(Prestasi Pekerjaan %)"}%</span>
              </span>
              .
            </p>
          </div>

          <div class="termin-payment-detail-ui">
            <span class="termin-payment-number-ui">2.</span>
            <p class="termin-payment-text-ui">Kepada PIHAK KEDUA belum pernah dilakukan pembayaran.</p>
          </div>

          <div class="termin-payment-table-ui">
            <div class="termin-payment-row-ui">
              <span class="termin-payment-label-ui">Uang Muka</span>
              <span class="termin-payment-value-ui">
                <span style={{ color: "red" }}>{isInputFieldDpShown ? formDataPreview.persentase_uangmuka || "(Persentase uang muka %)" : dataDp.persentase_uangmuka || "(Persentase uang muka %)"}%</span> x{" "}
                <span style={{ color: "red" }}>{isInputFieldDpShown ? formDataPreview.uang_muka.masked || "(Jumlah Uang Muka)" : dataDp.uang_muka.masked || "(Jumlah Uang Muka)"}</span> :
              </span>
              <span class="termin-payment-amount-ui">
                <span style={{ color: "red" }}>{isInputFieldDpShown ? formDataPreview.total_uangmuka.masked || "(Total Uang Muka)" : dataDp.total_uangmuka.masked || "(Total Uang Muka)"}</span>
              </span>
            </div>

            {previousTerminData?.length > 0 &&
              previousTerminData.map(
                (termin, index) =>
                  Number(termin.nominal_termin.raw) > 0 && (
                    <div className="termin-payment-row-ui" key={termin.id || index}>
                      <span className="termin-payment-label-ui">Termin {termin.nama_termin_ke}</span>
                      <span className="termin-payment-value-ui">:</span>
                      <span className="termin-payment-amount-ui">
                        <span style={{ color: "red" }}>{termin.nominal_termin.masked}</span>
                      </span>
                    </div>
                  )
              )}

            <div class="termin-payment-row-ui">
              <span class="termin-payment-label-ui">Jumlah yang sudah dibayar kepada PIHAK KEDUA</span>
              <span class="termin-payment-amount-ui">
                <span style={{ color: "red" }}>{formDataPreview.jumlah_yang_sudah_dibayar.masked || "(Jumlah yang sudah dibayar pihak 2)"}</span>
              </span>
            </div>
          </div>

          <div class="bap-termin-detail-ui">
            <span class="bap-termin-number-ui">3.</span>
            <p class="bap-termin-text-ui">
              Berdasarkan Surat Perjanjian Kerja/Kontrak Nomor :
              <span class="bap-termin-highlight-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.nomor_surat_perjanjian_kontrak || "(Nomor Surat Perjanjian Kontrak)"}</span>
              </span>
              , Tanggal{" "}
              <span class="bap-termin-highlight-ui">
                <span style={{ color: "red" }}>
                  {(dataProjectDetail.tanggal_surat_perjanjian_kontrak &&
                    new Date(dataProjectDetail.tanggal_surat_perjanjian_kontrak).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })) ||
                    "(Tanggal Surat Perjanjian Kontrak)"}
                </span>
              </span>{" "}
              kepada <span class="bap-termin-highlight-ui">PIHAK KEDUA</span> dapat dibayarkan uang muka dengan rincian sebagai berikut :
            </p>
          </div>
        </div>
        <div class="a4-container-landscape-ui">
          <div class="termin-payment-table-ui">
            <div class="termin-payment-row-ui">
              <span class="termin-payment-label-ui">Progres Fisik</span>
              <span class="termin-payment-value-ui">
                <span style={{ color: "red" }}>{formDataPreview.persentase_progres_fisik || "(Persentase Progres Fisik)"}</span>% x <span style={{ color: "red" }}>{formDataPreview.progres_fisik.masked || "(Nominal Progres Fisik)"}</span> :
              </span>
              <span class="termin-payment-amount-ui">
                <span style={{ color: "red" }}>{formDataPreview.total_progres_fisik.masked || "(Total Nominal Progress Fisik)"}</span>
              </span>
            </div>
            <div class="termin-payment-row-ui">
              <span class="termin-payment-label-ui">Retensi Pekerjaan</span>
              <span class="termin-payment-value-ui">
                <span style={{ color: "red" }}>{formDataPreview.persentase_retensi_pekerjaan || "(Persentase Retensi Pekerjaan)"}</span>% x{" "}
                <span style={{ color: "red" }}>{formDataPreview.retensi_pekerjaan.masked || "(Nominal Retensi Pekerjaan)"}</span> :
              </span>
              <span class="termin-payment-amount-ui">
                <span style={{ color: "red" }}>{formDataPreview.total_retensi_pekerjaan.masked || "(Total Nominal Retensi Pekerjaan)"}</span>
              </span>
            </div>{" "}
            <div class="termin-payment-row-ui">
              <span class="termin-payment-label-ui">Pengembalian Uang Muka</span>
              <span class="termin-payment-value-ui">
                <span style={{ color: "red" }}>{formDataPreview.persentase_pengembalian_uang_muka || "(Persentase Pengembalian Uang Muka)"}</span>% x{" "}
                <span style={{ color: "red" }}>{formDataPreview.pengembalian_uang_muka.masked || "(Nominal Pengembalian Uang Muka)"}</span>:
              </span>
              <span class="termin-payment-amount-ui">
                <span style={{ color: "red" }}>{formDataPreview.total_pengembalian_uang_muka.masked || "(Total Pengembalian Uang Muka)"}</span>
              </span>
            </div>
            {previousTerminData?.length > 0 &&
              previousTerminData.map(
                (termin, index) =>
                  Number(termin.nominal_termin.raw) > 0 && (
                    <div className="termin-payment-row-ui" key={termin.id || index}>
                      <span className="termin-payment-label-ui">Termin {termin.nama_termin_ke}</span>
                      <span className="termin-payment-value-ui">:</span>
                      <span className="termin-payment-amount-ui">
                        <span style={{ color: "red" }}>{termin.nominal_termin.masked}</span>
                      </span>
                    </div>
                  )
              )}
            <div class="termin-payment-row-ui">
              <span class="termin-payment-label-ui">Jumlah yang harus dibayar saat ini kepada PIHAK KEDUA</span>
              <span class="termin-payment-value-ui">:</span>
              <span class="termin-payment-amount-ui">
                <span style={{ color: "red" }}>{formDataPreview.jumlah_yang_harus_dibayar.masked || "(Nominal)"}</span>
              </span>
            </div>
            <div class="termin-payment-row-ui">
              <span class="termin-payment-label-ui">Jumlah yang dibulatkan</span>
              <span class="termin-payment-amount-ui">
                <span style={{ color: "red" }}>{formDataPreview.jumlah_yang_dibulatkan.masked || "(Nominal)"}</span>
              </span>
            </div>
          </div>

          <div className="terbilang-bap-wrapper-ui">
            <div className="terbilang-bap-var-ui">
              Terbilang:{" "}
              <span className="terbilang-bap-value-ui">
                <span style={{ color: "red" }}>{formDataPreview.jumlah_yang_dibulatkan_terbilang || "(Nominal Terbilang)"}</span>
              </span>
            </div>
          </div>

          <div class="bap-termin-detail-ui">
            <span class="bap-termin-number-ui">4.</span>
            <p class="bap-termin-text-ui">
              <span class="bap-termin-highlight-ui">PIHAK KEDUA </span>sepakat atas jumlah pembayaran tersebut diatas ditransper ke rekening Giro Nomor : :
              <span class="bap-termin-highlight">
                <span style={{ color: "red" }}>{dataProjectDetail.nomor_rekening_pihak_1 || "(Nomor rek pihak 1)"}</span> pada BANK <span style={{ color: "red" }}>{dataProjectDetail.nama_bank_pihak_1 || "(Nama Bank pihak 1)"}</span>
              </span>
            </p>
          </div>

          <div className="last-paragraph-bap-ui">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>

          <div className="ttd-bap-layout-ui">
            <div className="ttd-pihak-kedua-ui">
              <div className="ttd-pihak-kedua-bold-ui">PIHAK KEDUA</div>
              <div className="ttd-pihak-kedua-light-ui">KONTRAKTOR PELAKSANA</div>
              <div className="ttd-pihak-kedua-bold-ui">
                {" "}
                <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
              </div>
              <div className="nip-bap-layout-ui">
                <div className="ttd-pihak-kedua-ui">
                  <div className="nip-bap-name-ui">
                    <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                  </div>
                  <div className="nip-bap-nip-ui">
                    <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ttd-pihak-kedua-ui">
              <div class="ttd-pihak-kedua-light-ui">{dataProjectDetail.tempat_ttd || "(Tempat TTD)"}, Tanggal tesebut diatas</div>
              <div className="ttd-pihak-kedua-bold-ui">PIHAK PERTAMA</div>
              <div className="ttd-pihak-kedua-light-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                <div className="ttd-pihak-kedua-bold-ui">UNIVERSITAS BENGKULU</div>
              </div>

              <div className="nip-bap-layout-ui">
                <div className="ttd-pihak-kedua-ui">
                  <div className="nip-bap-name-ui">
                    <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                  </div>
                  <div className="nip-bap-nip-ui">
                    NIP. <span style={{ color: "red" }}>{dataProjectDetail.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
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
                  <span style={{ color: "red" }}>{dataProjectDetail.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
                </div>
              </div>
              <div className="lokasi-bap-ui">
                <div className="lokasi-bap-tittle-ui">Lokasi</div>
                <div className="lokasi-bap-value-ui">
                  <span style={{ color: "red" }}>{dataProjectDetail.lokasi_pekerjaan || "(Pekerjaan)"}</span>
                </div>
              </div>
            </div>
            <div className="header-table-bap-ui">
              <div className="surat-header-bap-text-bold-right-ui">
                BERITA ACARA
                <br />
                PEMBAYARAN TERMIN {formDataPreview.nama_termin_ke !== "0" && formDataPreview.nama_termin_ke !== 0 ? formDataPreview.nama_termin_ke || "(Termin Ke)" : ""}
              </div>
              <div className="bap-header-container-ui">
                <span className="label-bap-ui">Nomor</span>
                <span className="separator-bap-ui">:</span>
                <span className="value-bap-ui">
                  <span style={{ color: "red" }}>{formDataPreview.nomorSuratBAP || "(Nomor BAP)"}</span>
                </span>

                <span className="label-bap-ui">Tanggal</span>
                <span className="separator-bap-ui">:</span>
                <span className="value-bap-ui">
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
            ), kami yang bertanda tangan dibawah
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

          <div class="bap-termin-detail-ui">
            <span class="bap-termin-number-ui">1.</span>
            <p class="bap-termin-text-ui">
              Berdasarkan Berita Acara Pemeriksaan Pekerjaan Nomor :
              <span class="bap-termin-highlight-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.nomor_berita_acara_pemeriksaan_pekerjaan || "(Nomor BAP Pemeriksaan Pekerjaan)"}</span>
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
                    "(Tanggal BAP Pemeriksaan Pekerjaan)"}
                </span>
              </span>
              , bahwa prestasi pekerjaan telah mencapai{" "}
              <span class="bap-termin-highlight-ui">
                <span style={{ color: "red" }}>{formDataPreview.persentase_pekerjaan || "(Prestasi Pekerjaan %)"}%</span>
              </span>
              .
            </p>
          </div>

          <div class="termin-payment-detail-ui">
            <span class="termin-payment-number-ui">2.</span>
            <p class="termin-payment-text-ui">Kepada PIHAK KEDUA belum pernah dilakukan pembayaran.</p>
          </div>

          <div class="termin-payment-table-ui">
            <div class="termin-payment-row-ui">
              <span class="termin-payment-label-ui">Uang Muka</span>
              <span class="termin-payment-value-ui">
                <span style={{ color: "red" }}>{isInputFieldDpShown ? formDataPreview.persentase_uangmuka || "(Persentase uang muka %)" : dataDp.persentase_uangmuka || "(Persentase uang muka %)"}%</span> x{" "}
                <span style={{ color: "red" }}>{isInputFieldDpShown ? formDataPreview.uang_muka.masked || "(Jumlah Uang Muka)" : dataDp.uang_muka.masked || "(Jumlah Uang Muka)"}</span> :
              </span>
              <span class="termin-payment-amount-ui">
                <span style={{ color: "red" }}>{isInputFieldDpShown ? formDataPreview.total_uangmuka.masked || "(Total Uang Muka)" : dataDp.total_uangmuka.masked || "(Total Uang Muka)"}</span>
              </span>
            </div>
          </div>
          <div class="termin-payment-table-ui">
            <div class="termin-payment-row-ui">
              <span class="termin-payment-label-ui">Jumlah yang harus dibayar saat ini kepada PIHAK KEDUA</span>
              <span class="termin-payment-value-ui">:</span>
              <span class="termin-payment-amount-ui">
                <span style={{ color: "red" }}>{formDataPreview.jumlah_yang_harus_dibayar.masked || "(Nominal)"}</span>
              </span>
            </div>
            <div class="termin-payment-row-ui">
              <span class="termin-payment-label-ui">Jumlah yang dibulatkan</span>
              <span class="termin-payment-amount-ui">
                <span style={{ color: "red" }}>{formDataPreview.jumlah_yang_dibulatkan.masked || "(Nominal)"}</span>
              </span>
            </div>
          </div>
          <div className="terbilang-bap-wrapper-ui">
            <div className="terbilang-bap-var-ui">
              Terbilang:{" "}
              <span className="terbilang-bap-value-ui">
                <span style={{ color: "red" }}>{formDataPreview.jumlah_yang_dibulatkan_terbilang || "(Nominal Terbilang)"}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="a4-container-landscape-ui">
          <div class="bap-termin-detail-ui">
            <span class="bap-termin-number-ui">3.</span>
            <p class="bap-termin-text-ui">
              <span class="bap-termin-highlight-ui">PIHAK KEDUA </span>sepakat atas jumlah pembayaran tersebut diatas ditransper ke rekening Giro Nomor : :
              <span class="bap-termin-highlight">
                <span style={{ color: "red" }}>{dataProjectDetail.nomor_rekening_pihak_1 || "(Nomor rek pihak 1)"}</span> pada BANK <span style={{ color: "red" }}>{dataProjectDetail.nama_bank_pihak_1 || "(Nama Bank pihak 1)"}</span>
              </span>
            </p>
          </div>

          <div className="last-paragraph-bap-ui">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>

          <div className="ttd-bap-layout-ui">
            <div className="ttd-pihak-kedua-ui">
              <div className="ttd-pihak-kedua-bold-ui">PIHAK KEDUA</div>
              <div className="ttd-pihak-kedua-light-ui">KONTRAKTOR PELAKSANA</div>
              <div className="ttd-pihak-kedua-bold-ui">
                {" "}
                <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
              </div>
              <div className="nip-bap-layout-ui">
                <div className="ttd-pihak-kedua-ui">
                  <div className="nip-bap-name-ui">
                    <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_2 || "(Nama Pihak 2)"}</span>
                  </div>
                  <div className="nip-bap-nip-ui">
                    <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ttd-pihak-kedua-ui">
              <div class="ttd-pihak-kedua-light-ui">{dataProjectDetail.tempat_ttd || "(Tempat TTD)"}, Tanggal tesebut diatas</div>
              <div className="ttd-pihak-kedua-bold-ui">PIHAK PERTAMA</div>
              <div className="ttd-pihak-kedua-light-ui">
                <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                <div className="ttd-pihak-kedua-bold-ui">UNIVERSITAS BENGKULU</div>
              </div>

              <div className="nip-bap-layout-ui">
                <div className="ttd-pihak-kedua-ui">
                  <div className="nip-bap-name-ui">
                    <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                  </div>
                  <div className="nip-bap-nip-ui">
                    NIP. <span style={{ color: "red" }}>{dataProjectDetail.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default BapTerminKePreview;

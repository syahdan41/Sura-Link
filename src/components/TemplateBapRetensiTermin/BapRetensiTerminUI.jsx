import "./BapRetensiTerminUI.css";

const BapRetensiTerminUI = () => {
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
              <div className="pekerjaan-value-ui">sadsadasdsasfasfasfsafasadsadsadsadsa</div>
            </div>
            <div className="lokasi-bap-ui">
              <div className="lokasi-bap-tittle-ui">Lokasi</div>
              <div className="lokasi-bap-value-ui">Universitas Bengkulu</div>
            </div>
          </div>
          <div className="header-table-bap-ui">
            <div className="surat-header-bap-text-bold-right-ui">
              BERITA ACARA
              <br />
              PEMBAYARAN
              <br /> Retensi 5%
            </div>
            <div className="bap-header-container-ui">
              <span className="label-bap-ui">Nomor</span>
              <span className="separator-bap-ui">:</span>
              <span className="value-bap-ui">123/114141/1121</span>

              <span className="label-bap-ui">Tanggal</span>
              <span className="separator-bap-ui">:</span>
              <span className="value-bap-ui">03 Juli 2024</span>
            </div>
          </div>
        </div>

        <div className="first-paragraph-bap-ui">Pada hari ini, Selasa tanggal Dua Puluh Satu Bulan November tahun Dua Ribu Dua Puluh Tiga ( 21-11-2023 ), kami yang bertanda tangan dibawah</div>
        <div className="bap-termin-wrapper-ui">
          <div class="bap-termin-container-ui">
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Nama</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">CENCI HIDAYAT</span>
            </div>
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Jabatan</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">PEJABAT PEMBUAT KOMITMEN UNIVERSITAS BENGKULU</span>
            </div>
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Alamat</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">Jl. W.R. Supratman Kandang Limun Bengkulu</span>
            </div>
          </div>
          <p class="bap-pihak-pertama-ui">
            Yang selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>
          </p>

          <div class="bap-termin-container-ui">
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Nama</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">CENCI HIDAYAT</span>
            </div>
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Jabatan</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">PEJABAT PEMBUAT KOMITMEN UNIVERSITAS BENGKULU</span>
            </div>
            <div class="bap-termin-item-ui">
              <span class="bap-label-ui">Alamat</span> <span class="bap-separator-ui">:</span>
              <span class="bap-value-ui">Jl. W.R. Supratman Kandang Limun Bengkulu</span>
            </div>
          </div>
          <p class="bap-pihak-pertama-ui">
            Yang selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>
          </p>
        </div>

        <div class="bap-termin-detail-ui">
          <span class="bap-termin-number-ui">1.</span>
          <p class="bap-termin-text-ui">
            Berdasarkan Berita Acara Pemeriksaan Pekerjaan Nomor :<span class="bap-termin-highlight-ui">10250/UN30.6.6/HK/2023</span>, Tanggal
            <span class="bap-termin-highlight-ui">20 November 2023</span>, bahwa prestasi pekerjaan telah mencapai <span class="bap-termin-highlight-ui">89,04%</span>.
          </p>
        </div>

        <div class="termin-payment-detail-ui">
          <span class="termin-payment-number-ui">2.</span>
          <p class="termin-payment-text-ui">Kepada PIHAK KEDUA belum pernah dilakukan pembayaran.</p>
        </div>

        <div class="termin-payment-table-ui">
          <div class="termin-payment-row-ui">
            <span class="termin-payment-label-ui">Uang Muka</span>
            <span class="termin-payment-value-ui">30% x Rp 878.893.394,88 :</span>
            <span class="termin-payment-amount-ui">Rp 263.668.018,00</span>
          </div>
          <div class="termin-payment-row-ui">
            <span class="termin-payment-label-ui">Termin 1</span>
            <span class="termin-payment-value-ui">:</span>
            <span class="termin-payment-amount-ui">Rp 123.045.075,00</span>
          </div>
          <div class="termin-payment-row-ui">
            <span class="termin-payment-label-ui">Termin 2</span>
            <span class="termin-payment-value-ui">:</span>
            <span class="termin-payment-amount-ui">Rp 153.806.345,00</span>
          </div>
          <div class="termin-payment-row-ui">
            <span class="termin-payment-label-ui">Jumlah yang sudah dibayar kepada PIHAK KEDUA</span>
            <span class="termin-payment-amount-ui">Rp 540.519.438,00</span>
          </div>
        </div>

        <div class="bap-termin-detail-ui">
          <span class="bap-termin-number-ui">3.</span>
          <p class="bap-termin-text-ui">
            Berdasarkan Surat Perjanjian Kerja/Kontrak Nomor :<span class="bap-termin-highlight-ui">7518/UN30.6.6/HK/2023</span>, Tanggal
            <span class="bap-termin-highlight-ui"> 11 September 2023</span> yang telah di Addendum Nomor :<span class="bap-termin-highlight-ui">7518/UN30.6.6/HK/2023</span>, Tanggal
            <span class="bap-termin-highlight-ui"> 20 November 2023</span> kepada <span class="bap-termin-highlight-ui">PIHAK KEDUA</span> dapat dibayarkan dengan rincian sebagai berikut :{" "}
          </p>
        </div>
      </div>
      <div class="a4-container-landscape-ui">
        <div class="termin-payment-table-ui">
          <div class="termin-payment-row-ui">
            <span class="termin-payment-label-ui">Retensi Pekerjaan</span>
            <span class="termin-payment-value-ui">30% x Rp 878.893.394,88 :</span>
            <span class="termin-payment-amount-ui">Rp 263.668.018,00</span>
          </div>

          <div class="termin-payment-row-ui">
            <span class="termin-payment-label-ui">Jumlah yang sudah dibayar kepada PIHAK KEDUA</span>
            <span class="termin-payment-value-ui">:</span>
            <span class="termin-payment-amount-ui">Rp 153.806.345,00</span>
          </div>
        </div>

        <div className="terbilang-bap-wrapper-ui">
          <div className="terbilang-bap-var-ui">
            Terbilang: <span className="terbilang-bap-value-ui">Seratus berapa aja boleh hehehe</span>
          </div>
        </div>

        <div class="bap-termin-detail-ui">
          <span class="bap-termin-number-ui">4.</span>
          <p class="bap-termin-text-ui">
            <span class="bap-termin-highlight-ui">PIHAK KEDUA </span>sepakat atas jumlah pembayaran tersebut diatas ditransper ke rekening Giro Nomor : :<span class="bap-termin-highlight-ui">179-00-0403574-2 pada BANK MANDIRI</span>
          </p>
        </div>

        <div className="last-paragraph-bap-ui">Demikian Berita Acara Pembayaran Angsuran ini dibuat dalam rangkap secukupnya untuk dapat dipergunakan sebagaimana mestinya.</div>

        <div className="ttd-bap-layout-ui">
          <div className="ttd-pihak-kedua-ui">
            <div className="ttd-pihak-kedua-bold-ui">PIHAK KEDUA</div>
            <div className="ttd-pihak-kedua-light-ui">KONTRAKTOR PELAKSANA</div>
            <div className="ttd-pihak-kedua-bold-ui">
              {" "}
              CV. <span>SM Entertaintment</span>
            </div>
            <div className="nip-bap-layout-ui">
              <div className="ttd-pihak-kedua-ui">
                <div className="nip-bap-name-ui">Kang Seulgi</div>
                <div className="nip-bap-nip-ui">Wakil Direktur</div>
              </div>
            </div>
          </div>
          <div className="ttd-pihak-kedua-ui">
            <div className="ttd-pihak-kedua-bold-ui">PIHAK PERTAMA</div>
            <div className="ttd-pihak-kedua-light-ui">KONTRAKTOR PELAKSANA</div>
            <div className="ttd-pihak-kedua-bold-ui">
              {" "}
              CV. <span>JYP Entertaintment</span>
            </div>
            <div className="nip-bap-layout-ui">
              <div className="ttd-pihak-kedua-ui">
                <div className="nip-bap-name-ui">Hwang Yeji</div>
                <div className="nip-bap-nip-ui">111901310001</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BapRetensiTerminUI;

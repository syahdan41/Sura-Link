import LogoKampus from "../../Assets/Images/LogoKampus.png";
import "./SuratPerjanjianKontrak.css";

const SuratPerjanjianKontrakWord = ({ formDataPreview, dataProjectDetail, dataSPPBJ }) => {
  return (
    <div className="preview-layout">
      <div class="a4-container">
        <div className="surat-header">
          <img src={LogoKampus} alt="logo-kampus" />
          <div className="surat-header-text-bold">
            KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
            <br />
            DAN TEKNOLOGI
            <br /> UNIVERSITAS BENGKULU
          </div>
        </div>
        <div className="surat-header-text-light">
          Jalan WR. Supratman Kandang Limun Bengkulu 38371 A
          <br />
          Telepon (0736) 21170, 21884 Faksimile (0736) 22105
          <br /> Laman : www.unib.ac.id e-mail : rektorat@unib.ac.id
        </div>
        <div className="separator-black"></div>
        <div className="tittle-surat-ringkasan-kontrak">SURAT PERJANJIAN</div>
        <div className="tittle-nomor-ringkasan-kontrak">Kontrak Harga Satuan</div>
        <div className="spmk-nomor-paket-layout">
          <div>
            <span>{dataProjectDetail.pekerjaan || "(Paket Pekerjaan)"}</span>
          </div>
          <div>
            <strong>
              <span>{dataProjectDetail.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
            </strong>
          </div>
          <div>Nomor: 5961/UN30.6.6/HK/2024</div>
        </div>
        <div className="spmk-justify-text">
          SURAT PERJANJIAN ini berikut semua lampirannya adalah Kontrak Kerja Konstruksi Harga Satuan, yang selanjutnya disebut <strong>“Kontrak”</strong> dibuat dan ditandatangani di Bengkulu pada hari{" "}
          <span>{dataProjectDetail.tanggal_surat_perjanjian_kontrak_huruf || "(Tanggal surat perjanjian kontrak terbilang)"}</span> [
          <span>
            {(dataProjectDetail.tanggal_surat_perjanjian_kontrak &&
              new Date(dataProjectDetail.tanggal_surat_perjanjian_kontrak)
                .toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, "/")) ||
              "(Tanggal Surat perjanjian kontrak)"}
          </span>
          ], berdasarkan Berita Acara Hasil Pemilihan Nomor <span>{formDataPreview.nomor_surat_hasil_pemilihan || "(Nomor Surat Hasil Pemilihan)"}</span> tanggal{" "}
          <span>
            {(formDataPreview.tanggal_nomor_surat_pemilihan &&
              new Date(formDataPreview.tanggal_nomor_surat_pemilihan).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })) ||
              "(Tanggal Surat Pemilihan)"}
          </span>
          , Surat Penunjukan Penyedia Barang/Jasa (SPPBJ) Nomor <span>{formDataPreview.nomor_sppbj || "(Nomor Surat SPPBJ)"}</span> tanggal{" "}
          <span>
            {(formDataPreview.tanggal_sppbj &&
              new Date(formDataPreview.tanggal_sppbj).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })) ||
              "(Tanggal Surat SPPBJ)"}
          </span>
          , antara:
        </div>
        <div className="spk-container">
          <p className="spmk-intro"></p>

          <div className="spmk-item">
            <span className="suratkontrak-label">Nama</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              <span>{dataProjectDetail.nama_pihak_1 || "(Nama pihak 1)"}</span>
            </span>
          </div>

          <div className="spmk-item">
            <span className="suratkontrak-label">NIP</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              <span>{dataProjectDetail.nip_pihak_1 || "(NIP pihak 1)"}</span>
            </span>
          </div>

          <div className="spmk-item">
            <span className="suratkontrak-label">Jabatan</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              <span>{dataProjectDetail.jabatan_pihak_1 || "(Jabatan pihak 1)"}</span>
            </span>
          </div>

          <div className="spmk-item">
            <span className="suratkontrak-label">Berkedudukan di</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              <span>{dataProjectDetail.alamat_pihak_1 || "(alamat pihak 1)"}</span>
            </span>
          </div>
        </div>
        <div className="spmk-justify-text">
          yang bertindak untuk dan atas nama Pemerintah Indonesia c.q. Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi c.q. Direktorat Jenderal Pendidikan Tinggi, Riset, dan Teknologi c.q. Satuan Kerja Universitas Bengkulu
          berdasarkan Surat Keputusan Rektor Universitas Bengkulu Nomor <span>{formDataPreview.nomor_surat_keputusan_rektor || "(Nomor Surat Keputusan Rektor)"}</span> tanggal{" "}
          <span>
            {(formDataPreview.tanggal_surat_keputusan_rektor &&
              new Date(formDataPreview.tanggal_surat_keputusan_rektor).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })) ||
              "(Tanggal Surat Keputusan Rektor)"}
          </span>{" "}
          tentang <span>{formDataPreview.rincian_surat_keputusan || "(Rincian)"}</span> selanjutnya disebut “Pejabat Penandatangan Kontrak”, dengan:
        </div>
        <div className="spk-container">
          <p className="spmk-intro"></p>

          <div className="spmk-item">
            <span className="suratkontrak-label">Nama</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              <span>{dataProjectDetail.nama_pihak_2 || "(Nama pihak 2)"}</span>
            </span>
          </div>

          <div className="spmk-item">
            <span className="suratkontrak-label">Jabatan</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              <span>{dataProjectDetail.jabatan_pihak_2 || "(Jabatan pihak 2)"}</span>
            </span>
          </div>

          <div className="spmk-item">
            <span className="suratkontrak-label">Berkedudukan di</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              <span>{dataProjectDetail.alamat_pihak_2 || "(Alamat pihak 2)"}</span>
            </span>
          </div>

          <div className="spmk-item">
            <span className="suratkontrak-label">Akta Notaris Nomor</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              <span>{dataProjectDetail.nomor_akta_notaris_pihak_2 || "(Nomor akta notaris)"}</span>
            </span>
          </div>
          <div className="spmk-item">
            <span className="suratkontrak-label">Tanggal</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              <span>
                {(dataProjectDetail.tanggal_nomor_akta_notaris_pihak_2 &&
                  new Date(dataProjectDetail.tanggal_nomor_akta_notaris_pihak_2).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })) ||
                  "(Tanggal Akta Notaris)"}
              </span>
            </span>
          </div>
          <div className="spmk-item">
            <span className="suratkontrak-label">Notaris</span>
            <span className="spmk-separator">:</span>
            <span className="spmk-value">
              <span>{dataProjectDetail.nama_notaris_pihak_2 || "(Nama akta notaris)"}</span>
            </span>
          </div>
        </div>
        <div className="spmk-justify-text">
          yang bertindak untuk dan atas nama <span>{dataProjectDetail.perusahaan_pihak_2 || "(Nama perusahaan pihak 2)"}</span> selanjutnya disebut <strong>“Penyedia”.</strong>{" "}
        </div>

        <div className="spk-dasar-hukum-container">
          <div className="spk-dasar-hukum-title">Dan dengan memperhatikan:</div>
          {formDataPreview.ketentuan_persetujuan.map((item, index) => (
            <div className="spk-dasar-hukum-item" key={index}>
              <span className="spk-dasar-hukum-label">{index + 1}.</span>
              <span className="spk-dasar-hukum-value">{item.replace(/^\d+\.\s*/, "")}</span>
            </div>
          ))}

          <div className="spk-dasar-hukum-note">*) Disesuaikan dengan nama K/L/PD</div>
        </div>

        <div className="tittle-perpage">PARA PIHAK MENERANGKAN TERLEBIH DAHULU BAHWA:</div>

        <div className="spk-dasar-hukum-container">
          <div className="spk-dasar-hukum-item">
            <span className="spk-dasar-hukum-label">(a)</span>
            <span className="spk-dasar-hukum-value">telah dilakukan proses pemilihan Penyedia yang telah sesuai dengan Dokumen Pemilihan;</span>
          </div>

          <div className="spk-dasar-hukum-item">
            <span className="spk-dasar-hukum-label">(b)</span>
            <span className="spk-dasar-hukum-value">
              Pejabat Penandatangan Kontrak telah menunjuk Penyedia menjadi pihak dalam Kontrak ini melalui Surat Penunjukan Penyediaan Barang/Jasa (SPPBJ) untuk melaksanakan Pekerjaan Konstruksi{" "}
              <strong>
                <span>{dataProjectDetail.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
              </strong>{" "}
              sebagaimana diterangkan dalam dokumen Kontrak ini selanjutnya disebut “Pekerjaan Konstruksi”;
            </span>
          </div>

          <div className="spk-dasar-hukum-item">
            <span className="spk-dasar-hukum-label">(c)</span>
            <span className="spk-dasar-hukum-value">
              Penyedia telah menyatakan kepada Pejabat y Penandatangan Kontrak, memiliki keahlian profesional, tenaga kerja konstruksi, dan sumber daya teknis, serta telah menyetujui untuk melaksanakan Pekerjaan Konstruksi sesuai dengan
              persyaratan dan ketentuan dalam Kontrak ini;
            </span>
          </div>

          <div className="spk-dasar-hukum-item">
            <span className="spk-dasar-hukum-label">(d)</span>
            <span className="spk-dasar-hukum-value">Pejabat Penandatangan Kontrak dan Penyedia menyatakan memiliki kewenangan untuk menandatangani Kontrak ini, dan mengikat pihak yang diwakili;</span>
          </div>

          <div className="spk-dasar-hukum-item">
            <span className="spk-dasar-hukum-label">(e)</span>
            <div className="spk-dasar-hukum-value">
              Pejabat Penandatangan Kontrak dan Penyedia mengakui dan menyatakan bahwa sehubungan dengan penandatanganan Kontrak ini masing-masing pihak :
              <div className="spk-dasar-hukum-subitems">
                <div className="spk-dasar-hukum-subitem">
                  <span className="spk-dasar-hukum-label">(1)</span>
                  <span className="spk-dasar-hukum-value">telah dan senantiasa diberikan kesempatan untuk didampingi oleh advokat; </span>
                </div>
                <div className="spk-dasar-hukum-subitem">
                  <span className="spk-dasar-hukum-label">(2)</span>
                  <span className="spk-dasar-hukum-value">menandatangani Kontrak ini setelah meneliti secara patut; </span>
                </div>
                <div className="spk-dasar-hukum-subitem">
                  <span className="spk-dasar-hukum-label">(3)</span>
                  <span className="spk-dasar-hukum-value">telah membaca dan memahami secara penuh ketentuan Kontrak ini;</span>
                </div>
                <div className="spk-dasar-hukum-subitem">
                  <span className="spk-dasar-hukum-label">(4)</span>
                  <span className="spk-dasar-hukum-value">telah mendapatkan kesempatan yang memadai untuk memeriksa dan mengkonfirmasikan semua ketentuan dalam Kontrak ini beserta semua fakta dan kondisi yang terkait.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="spmk-justify-text-2">
          Maka oleh karena itu, Pejabat Penandatangan Kontrak dan Penyedia dengan ini bersepakat dan menyetujui untuk membuat perjanjian pelaksanaan paket Pekerjaan Konstruksi{" "}
          <strong>
            <span>{dataProjectDetail.ruang_lingkup_pekerjaan || "(Pekerjaan)"}</span>
          </strong>{" "}
          dengan syarat dan ketentuan sebagai berikut.
        </div>

        <div className="tittle-onpage">
          <p>Pasal 1</p>
          <p>ISTILAH DAN UNGKAPAN</p>
        </div>
        <div className="spmk-justify-text">Peristilahan dan ungkapan dalam Surat Perjanjian ini memiliki arti dan makna yang sama seperti yang tercantum dalam lampiran Surat Perjanjian ini.</div>
        <div className="tittle-onpage">
          <p>Pasal 2</p>
          <p>RUANG LINGKUP PEKERJAAN UTAMA</p>
        </div>

        <div className="spmk-text-container">
          <div>Ruang lingkup pekerjaan utama terdiri dari:</div>
          {formDataPreview.ruang_lingkup_pekerjaan.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>

        <div className="tittle-onpage">
          <p>Pasal 3</p>
          <p>HARGA KONTRAK, SUMBER PEMBIAYAAN DAN PEMBAYARAN</p>
        </div>
        <div className="spk-dasar-hukum-container">
          <div className="spk-dasar-hukum-item">
            <span className="spk-dasar-hukum-label">(1)</span>
            <span className="spk-dasar-hukum-value">
              Harga Kontrak termasuk Pajak Pertambahan Nilai (PPN) yang diperoleh berdasarkan total harga penawaran terkoreksi sebagaimana tercantum dalam Daftar Kuantitas dan Harga adalah sebesar{" "}
              <strong>
                <span>{formDataPreview.harga_kuantitas_total.masked || "(Rp Nominal)"}</span>
              </strong>{" "}
              (<span>{formDataPreview.harga_kuantitas_total_terbilang || "(Nominal Terbilang)"}</span>) dengan kode akun kegiatan <span>{formDataPreview.kode_akun_kegiatan || "(Kode Akun Kegiatan)"}</span>;
            </span>
          </div>

          <div className="spk-dasar-hukum-item">
            <span className="spk-dasar-hukum-label">(2)</span>
            <span className="spk-dasar-hukum-value">Kontrak ini dibiayai dari DIPA Universitas Bengkulu;</span>
          </div>

          <div className="spk-dasar-hukum-item">
            <span className="spk-dasar-hukum-label">(3)</span>
            <span className="spk-dasar-hukum-value">
              Pembayaran untuk kontrak ini dilakukan ke{" "}
              <strong>
                <span>{dataProjectDetail.nama_bank_pihak_2 || "(Nama Bank Pihak 2)"}</span>
              </strong>{" "}
              rekening nomor :{" "}
              <strong>
                <span>{dataProjectDetail.nomor_rekening_pihak_2 || "(Rekening Bank Pihak 2)"}</span>
              </strong>{" "}
              atas nama Penyedia :{" "}
              <strong>
                <span>{dataProjectDetail.perusahaan_pihak_2 || "(Nama Pemilik Rekening Bank Pihak 2)"}</span>
              </strong>
            </span>
          </div>

          <div className="spk-dasar-hukum-note">[Catatan : untuk kontrak tahun jamak agar dicantumkan rincian pendanaan untuk masing-masing Tahun Anggarannya]</div>
        </div>

        <div className="tittle-onpage">
          <p>Pasal 4</p>
          <p>DOKUMEN KONTRAK</p>
        </div>

        <div className="spk-dasar-hukum-container">
          <div className="spk-dasar-hukum-item">
            <span className="spk-dasar-hukum-label">(1)</span>
            <span className="spk-dasar-hukum-value">
              Kelengkapan dokumen-dokumen berikut merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Kontrak ini terdiri dari adendum Kontrak (apabila ada), Surat Perjanjian, Surat Penawaran, Daftar Kuantitas dan Harga,
              Syarat-Syarat Umum Kontrak, Syarat-Syarat Khusus Kontrak beserta lampiranya berupa lampiran A (daftar harga satuan timpang, subkontraktor, personel manajerial, dan peralatan utama), lampiran B (Rencana Keselamatan Konstruksi),
              spesifikasi teknis, gambar-gambar, dan dokumen lainnya seperti: Surat Penunjukan Penyedia Barang/Jasa, Jadwal Pelaksanaan Pekerjaan, jaminan-jaminan, Berita Acara Rapat Persiapan Penandatanganan Kontrak, Berita Acara Rapat
              Persiapan Pelaksanaan Kontrak.
            </span>
          </div>

          <div className="spk-dasar-hukum-item">
            <span className="spk-dasar-hukum-label">(2)</span>
            <div className="spk-dasar-hukum-value">
              Pejabat Penandatangan Kontrak dan Penyedia mengakui dan menyatakan bahwa sehubungan dengan penandatanganan Kontrak ini masing-masing pihak :
              <div className="spk-dasar-hukum-subitems">
                {formDataPreview.ketentuan_hierarki.map((item, index) => (
                  <div className="spk-dasar-hukum-subitem" key={index}>
                    <span className="spk-dasar-hukum-label">({String.fromCharCode(97 + index)})</span>
                    <span className="spk-dasar-hukum-value">{item.replace(/^[a-z]\.\s*/, "")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="tittle-onpage">
          <p>Pasal 5</p>
          <p>MASA KONTRAK</p>
        </div>

        <div className="spk-dasar-hukum-container">
          <div className="spk-dasar-hukum-item">
            <span className="spk-dasar-hukum-label">(1)</span>
            <span className="spk-dasar-hukum-value">Masa Kontrak adalah jangka waktu berlakunya Kontrak ini terhitung sejak tanggal penandatangananan Kontrak sampai dengan Tanggal Penyerahan Akhir Pekerjaan;</span>
          </div>

          <div className="spk-dasar-hukum-item">
            <span className="spk-dasar-hukum-label">(2)</span>
            <span className="spk-dasar-hukum-value">
              Masa Pelaksanaan ditentukan dalam Syarat-Syarat Khusus Kontrak, dihitung sejak Tanggal Mulai Kerja yang tercantum dalam SPMK sampai dengan Tanggal Penyerahan Pertama Pekerjaan selama{" "}
              <span>{formDataPreview.masa_pelaksanaan_pekerjaan || "(Masa Pelaksanaan Pekerjaan)"}</span> (
              <em>
                <span>{formDataPreview.masa_pelaksanaan_pekerjaan_terbilang || "(Masa Pelaksanaan Pekerjaan Terbilang)"}</span>
              </em>
              ) hari kalender;
            </span>
          </div>

          <div className="spk-dasar-hukum-item">
            <span className="spk-dasar-hukum-label">(3)</span>
            <span className="spk-dasar-hukum-value">
              Masa Pemeliharaan ditentukan dalam Syarat-Syarat Khusus Kontrak dihitung sejak Tanggal Penyerahan Pertama Pekerjaan sampai dengan Tanggal Penyerahan Akhir Pekerjaan selama{" "}
              <span>{formDataPreview.masa_pemeliharaan_pekerjaan || "(Masa Pemeliharaan Pekerjaan)"}</span> (
              <em>
                <span>{formDataPreview.masa_pemeliharaan_pekerjaan_terbilang || "(Masa Pemeliharaan Pekerjaan Terbilang)"}</span>
              </em>
              ) hari kalender.
            </span>
          </div>
        </div>

        <div className="spmk-justify-text">
          Dengan demikian, Pejabat Penandatangan Kontrak dan Penyedia telah bersepakat untuk menandatangani Kontrak ini pada tanggal tersebut di atas dan melaksanakan Kontrak sesuai dengan ketentuan peraturan perundang-undangan di Republik
          Indonesia dan dibuat dalam 2 (dua) rangkap, masing-masing dibubuhi dengan meterai, mempunyai kekuatan hukum yang sama dan mengikat bagi para pihak, rangkap yang lain dapat diperbanyak sesuai kebutuhan tanpa dibubuhi meterai.
        </div>
        <div className="ttd-spk-main">
          <div className="ttd-spk-layout">
            <div className="ttd-spk-text-container">
              <div>Untuk dan atas nama</div>
              <div>
                <em>
                  <span>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                </em>
              </div>
            </div>
            <div className="ttd-spk-text-container">
              <div>
                <em>
                  [<span>{dataProjectDetail.nama_pihak_2 || "(Nama Pihak 2)"}</span>]
                </em>
              </div>
              <div>
                <em>
                  <span>{dataProjectDetail.jabatan_pihak_2 || "(Jabatan Pihak 2)"}</span>
                </em>
              </div>
            </div>
          </div>
          <div className="ttd-spk-layout">
            <div className="ttd-spk-text-container">
              <div>Untuk dan atas nama</div>
              <div>
                <em>
                  <span>{dataProjectDetail.jabatan_pihak_1 || "(Jabatan Pihak 1)"}</span>
                </em>
              </div>
            </div>
            <div className="ttd-spk-text-container">
              <div>
                <em>
                  [<span>{dataProjectDetail.nama_pihak_1 || "(Nama Pihak 1)"}</span>]
                </em>
              </div>
              <div>
                <em>
                  NIP. <span>{dataProjectDetail.nip_pihak_1 || "(NIP Pihak 1)"}</span>
                </em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuratPerjanjianKontrakWord;

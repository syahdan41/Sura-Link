import "./SyaratKhususKontrak.css";
import SskkTable from "../../Assets/Images/tablesskk.png";

const SyaratKhususKontrakWord = ({ formDataPreview, dataProjectDetail, dataSatuanTimpang, dataPekerjaanUtama, dataPekerjaanBukanPekerjaanUtama, dataDaftarPersonilManajerial, dataDaftarPeralatanUtama, dataPembayaranPrestasi }) => {
  return (
    <div className="preview-layout">
      <div class="a4-container-skk">
        <div className="skk-page-tittle">SYARAT-SYARAT KHUSUS KONTRAK (SSKK)</div>
        <div className="border-separator-black-skk"></div>
        <div className="skk-table-container">
          <table className="skk-table">
            <thead>
              <tr>
                <th>Pasal dalam SSUK</th>
                <th>Ketentuan</th>
                <th>Pengaturan dalam SSKK</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4.1 & 4.2</td>
                <td>Korespondensi</td>
                <td>
                  <div className="sskk-alamat-container">
                    <div className="sskk-section">
                      <div className="sskk-title">Alamat Para Pihak sebagai berikut:</div>

                      <br />
                      <div>Satuan Kerja Pejabat Penandatangan Kontrak:</div>
                      <div className="sskk-row">
                        <span className="sskk-label">Nama</span>
                        <span className="sskk-separator">:</span>
                        <span className="sskk-value">
                          <span>{dataProjectDetail.perusahaan_pihak_1 || "(Nama Perusahaan Pihak 1)"}</span>
                        </span>
                      </div>
                      <div className="sskk-row">
                        <span className="sskk-label">Alamat</span>
                        <span className="sskk-separator">:</span>
                        <span className="sskk-value">
                          <span>{dataProjectDetail.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
                        </span>
                      </div>
                      <div className="sskk-row">
                        <span className="sskk-label">Website</span>
                        <span className="sskk-separator">:</span>
                        <span className="sskk-value">
                          <span>{formDataPreview.website_pihak_1 || "(Website Pihak 1)"}</span>
                        </span>
                      </div>
                      <div className="sskk-row">
                        <span className="sskk-label">E-mail</span>
                        <span className="sskk-separator">:</span>
                        <span className="sskk-value">
                          <span>{dataProjectDetail.email_pihak_1 || "(Email Pihak 1)"}</span>
                        </span>
                      </div>
                      <div className="sskk-row">
                        <span className="sskk-label">Faksimili</span>
                        <span className="sskk-separator">:</span>
                        <span className="sskk-value">
                          <span>{formDataPreview.fax_pihak_1 || "(Website Pihak 1)"}</span>
                        </span>
                      </div>

                      <br />
                      <div className="sskk-title">Penyedia:</div>
                      <div className="sskk-row">
                        <span className="sskk-label">Nama</span>
                        <span className="sskk-separator">:</span>
                        <span className="sskk-value">
                          <span>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                        </span>
                      </div>
                      <div className="sskk-row">
                        <span className="sskk-label">Alamat</span>
                        <span className="sskk-separator">:</span>
                        <span className="sskk-value">
                          <span>{dataProjectDetail.alamat_pihak_2 || "(Alamat pihak 2)"}</span>
                        </span>
                      </div>
                      <div className="sskk-row">
                        <span className="sskk-label">E-mail</span>
                        <span className="sskk-separator">:</span>
                        <span className="sskk-value">
                          <span>{dataProjectDetail.email_pihak_2 || "(Email pihak 2)"}</span>
                        </span>
                      </div>
                      <div className="sskk-row">
                        <span className="sskk-label">Faksimili</span>
                        <span className="sskk-separator">:</span>
                        <span className="sskk-value">
                          <span>{formDataPreview.fax_pihak_2 || "(Fax pihak 2)"}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>4.2 & 5.1</td>
                <td>Wakil sah para pihak</td>
                <td>
                  <div className="sskk-alamat-container">
                    <div className="sskk-section">
                      <div className="sskk-title">Wakil Sah Para Pihak sebagai berikut:</div>

                      <br />
                      <div>Untuk Pejabat Penandatangan Kontrak:</div>
                      <div className="sskk-row">
                        <span className="sskk-label">Nama</span>
                        <span className="sskk-separator">:</span>
                        <span className="sskk-value">
                          <span>{dataProjectDetail.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                        </span>
                      </div>
                      <div className="sskk-row">
                        <span className="sskk-label">Jabatan</span>
                        <span className="sskk-separator">:</span>
                        <span className="sskk-value">
                          <span>{dataProjectDetail.jabatan_pihak_1 || "(Jabatan pihak 1)"}</span>
                        </span>
                      </div>

                      <br />
                      <div className="sskk-title">Untuk Penyedia:</div>
                      <div className="sskk-row">
                        <span className="sskk-label">Nama</span>
                        <span className="sskk-separator">:</span>
                        <span className="sskk-value">
                          <span>{dataProjectDetail.nama_pihak_2 || "(Nama pihak 2)"}</span>
                        </span>
                      </div>
                      <div className="sskk-row">
                        <span className="sskk-label">Jabatan</span>
                        <span className="sskk-separator">:</span>
                        <span className="sskk-value">
                          <span>{dataProjectDetail.jabatan_pihak_2 || "(Jabatan pihak 2)"}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>6.3.2 & 6.3.3 44.4 & 44.6</td>
                <td>Pencairan Jaminan</td>
                <td>
                  <div className="regular-text-value">Jaminan dicairkan dan disetorkan pada Universitas Bengkulu</div>
                </td>
              </tr>
              <tr>
                <td>27.1</td>
                <td>Masa Pelaksanaan</td>
                <td>
                  <div className="regular-text-value">
                    Masa Pelaksanaan selama <span>{formDataPreview.masa_pelaksanaan_pekerjaan || "(Masa Pelaksanaan Pekerjaan)"}</span> (<span>{formDataPreview.masa_pelaksanaan_pekerjaan_terbilang || "(Terbilang)"}</span>) hari kalender
                    terhitung sejak Tanggal Mulai Kerja yang tercantum dalam SPMK.
                  </div>
                </td>
              </tr>
              <tr>
                <td>27.4</td>
                <td>Masa Pelaksanaan untuk Serah Terima Sebagian Pekerjaan (Bagian Kontrak)</td>
                <td>
                  <div className="regular-text-perpoint">
                    {formDataPreview.ketentuan_masa_pelaksanaan.map((item, index) => (
                      <div className="regular-text-value" key={index}>
                        {item}
                      </div>
                    ))}
                    <div className="regular-text-value">
                      <em>Catatan: Ketentuan di atas diisi apabila diberlakukan serah terima sebagian pekerjaan (secara parsial) sesuai dengan yang dicantumkan dalam dokumen pemilihan (rancangan kontrak)</em>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="skk-table-container">
          <table className="skk-table">
            <tbody>
              <tr>
                <td>33.8</td>
                <td>Masa Pemeliharaan</td>
                <td>
                  <div className="regular-text-value">
                    Masa Pemeliharaan berlaku selama <span>{formDataPreview.masa_pemeliharaan_pekerjaan || "(Masa Pemeliharaan Pekerjaan)"}</span> [<span>{formDataPreview.masa_pemeliharaan_pekerjaan_terbilang || "(Terbilang)"}</span>] hari
                    kalender terhitung sejak Tanggal Penyerahan Pertama Pekerjaan (PHO).
                  </div>
                </td>
              </tr>
              <tr>
                <td>33.19</td>
                <td>Serah Terima Sebagian Pekerjaan (Bagian Kontrak)</td>
                <td>
                  <div className="regular-text-value">Dalam Kontrak ini diberlakukan serah terima pekerjaan sebagian atau secara parsial untuk bagian kontrak sebagai berikut:</div>
                  <div className="regular-text-perpoint">
                    {formDataPreview.list_serah_terima_pekerjaan.map((item, index) => (
                      <div className="regular-text-value" key={index}>
                        {item}
                      </div>
                    ))}
                    <div className="regular-text-value">
                      <em>diisi bagian pekerjaan yang akan dilakukan serah terima sebagian pekerjaan (secara parsial sesuai dengan yang dicantumkan dalam dokumen pemilihan (rancangan kontrak)</em>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>33.22</td>
                <td>Masa Pemeliharaan untuk Serah Terima Sebagian Pekerjaan (Bagian Kontrak)</td>
                <td>
                  <div className="regular-text-perpoint">
                    {formDataPreview.ketentuan_masa_pemeliharaan.map((item, index) => (
                      <div className="regular-text-value" key={index}>
                        {item}
                      </div>
                    ))}
                    <div className="regular-text-value">
                      <em>Catatan: Ketentuan di atas diisi apabila diberlakukan serah terima sebagian pekerjaan (secara parsial) dan sudah ditetapkan dalam Dokumen Pemilihan.</em>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>35.1</td>
                <td>Gambar As Built dan Pedoman Pengoperasian dan Perawatan/ Pemeliharaan</td>
                <td>
                  <div className="regular-text-value">
                    Gambar ”As built” diserahkan paling lambat <span>{formDataPreview.waktu_penyerahan_gambar || "..... (...... dalam huruf .........)"}</span>
                  </div>
                  <br />
                  <div className="regular-text-value">
                    dan/atau pedoman pengoperasian dan perawatan/pemeliharaan harus diserahkan paling lambat <span>{formDataPreview.waktu_pedoman_pengoperasian || "..... (...... dalam huruf .........)"}</span> hari kalender setelah Tanggal
                    Penyerahan Pertama Pekerjaan.
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="skk-table-container">
        <table className="skk-table">
          <tbody>
            <tr>
              <td>38.7</td>
              <td>Penyesuaian Harga</td>
              <td>
                <div className="regular-text-value">
                  <span>{formDataPreview.penyesuaian_harga || "-"}</span>
                </div>
                <table class="sskk-inner-table">
                  <tr>
                    <th>Hn</th>
                    <th>=</th>
                    <th>Ho (a+b.Bn/Bo+c.Cn/Co+d.Dn/Do+.....)</th>
                  </tr>
                  <tr>
                    <td>Hn</td>
                    <td>=</td>
                    <td>Harga Satuan pada saat pekerjaan dilaksanakan;</td>
                  </tr>
                  <tr>
                    <td>Ho</td>
                    <td>=</td>
                    <td>Harga Satuan pada saat harga penawaran;</td>
                  </tr>
                  <tr>
                    <td>A</td>
                    <td>=</td>
                    <td>Koefisien tetap yang terdiri atas keuntungan dan overhead, dalam hal penawaran tidak mencantumkan besaran komponen keuntungan dan overhead maka a = 0,15</td>
                  </tr>
                  <tr>
                    <td>b, c, d</td>
                    <td>=</td>
                    <td>Koefisien komponen kontrak seperti tenaga kerja, bahan, alat kerja, dsb; Penjumlahan a+b+c+d+....dst adalah 1,00</td>
                  </tr>
                  <tr>
                    <td>Bn, Cn, Dn</td>
                    <td>=</td>
                    <td>Indeks harga komponen pada bulan saat pekerjaan dilaksanakan</td>
                  </tr>
                  <tr>
                    <td>Bo, Co, Do</td>
                    <td>=</td>
                    <td>Indeks harga komponen pada bulan penyampaian penawaran.</td>
                  </tr>
                </table>
                <div className="regular-text-value">Rumusan tersebut diatas memperhatikan hal-hal sebagai berikut: </div>
                <div className="rumusan-text-sskk">
                  <div className="regular-text-value">
                    a) Penetapan koefisien bahan, tenaga kerja, alat kerja, bahan bakar, dan sebagainya ditetapkan <strong>seperti contoh sebagai berikut:</strong>{" "}
                  </div>
                  <img src={SskkTable} alt="table-inner" />
                  <div className="regular-text-value">
                    b) Koefisien komponen kontrak ditetapkan oleh Pejabat Penandatangan Kontrak dari perbandingan antara harga bahan, tenaga kerja, alat kerja, dan sebagainya (apabila ada) terhadap Harga Satuan dari pembobotan HPS dan
                    dicantumkan dalam Dokumen Pemilihan (Rancangan Kontrak).
                  </div>
                  <div className="regular-text-value">c) Indeks harga yang digunakan bersumber dari penerbitan BPS.</div>
                  <div className="regular-text-value">d) Dalam hal indeks harga tidak dimuat dalam penerbitan BPS, digunakan indeks harga yang dikeluarkan oleh instansi teknis.</div>
                  <div className="regular-text-value">e) Rumusan penyesuaian Harga Kontrak ditetapkan sebagai berikut:</div>
                  <div className="rumusan-text-sskk-sub-item">
                    <div className="regular-text-value">Pn = (Hn1xV1)+(Hn2xV2)+(Hn3xV3)+.... dst .</div>
                    <div className="regular-text-value">Pn = Harga Kontrak setelah dilakukan penyesuaian Harga Satuan;</div>
                    <div className="regular-text-value">Hn = Harga Satuan baru setiap jenis komponen pekerjaan setelah dilakukan penyesuaian harga menggunakan rumusan penyesuaian Harga Satuan;</div>
                    <div className="regular-text-value">V = Volume setiap jenis komponen pekerjaan yang dilaksanakan.</div>
                  </div>
                  <div className="regular-text-value">
                    f) Pembayaran penyesuaian harga dilakukan oleh Pejabat Penandatangan Kontrak, apabila Penyedia telah mengajukan tagihan disertai perhitungan beserta data-data dan telah dilakukan audit sesuai dengan ketentuan peraturan
                    perundang-undangan.
                  </div>
                  <div className="regular-text-value">g) Penyedia dapat mengajukan tagihan secara berkala paling cepat 6 (enam) bulan setelah pekerjaan yang diberikan penyesuaian harga tersebut dilaksanakan.</div>
                  <div className="regular-text-value">
                    h) Pembayaran penyesuaian harga dilakukan oleh Pejabat Penandatangan Kontrak, apabila Penyedia telah mengajukan tagihan disertai perhitungan beserta data-data dan telah dilakukan audit sesuai dengan ketentuan peraturan
                    perundang-undangan.
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="skk-table-container">
        <table className="skk-table">
          <tbody>
            <tr>
              <td>45.2</td>
              <td>Pembayaran Tagihan</td>
              <td>
                <div className="regular-text-value">
                  <span>{formDataPreview.pembayaran_tagihan || "(Pembayaran Tagihan)"}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>49.i</td>
              <td>Hak dan Kewajiban Penyedia</td>
              <td>
                <div className="regular-text-value">Hak dan kewajiban Penyedia :</div>
                <div className="rumusan-text-sskk">
                  {formDataPreview.hak_dan_kewajiban_penyedia.map((item, index) => (
                    <div className="regular-text-value" key={index}>
                      {item}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td>56.3</td>
              <td>Tindakan Penyedia yang Mensyaratkan Persetujuan Pejabat Penandatangan Kontrak</td>
              <td>
                <div className="regular-text-value">
                  <span>{formDataPreview.persetujuan_tindakan_penyedia || "(Persetujuan Tindakan Penyedia)"}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>56.3</td>
              <td>Tindakan Penyedia yang Mensyaratkan Persetujuan Pengawas Pekerjaan</td>
              <td>
                <div className="regular-text-value">
                  <span>{formDataPreview.persetujuan_tindakan_pengawas || "(Persetujuan Tindakan Pengawas)"}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>58.</td>
              <td>Kepemilikan Dokumen</td>
              <td>
                <div className="regular-text-value">Penyedia diperbolehkan menggunakan salinan dokumen dan piranti lunak yang dihasilkan dari Pekerjaan Konstruksi ini dengan pembatasan sebagai berikut:</div>
                <div className="regular-text-value">
                  {formDataPreview.kepemilikan_dokumen ? (
                    <span>{formDataPreview.kepemilikan_dokumen}</span>
                  ) : (
                    <em>.................... [diisi batasan/ketentuan yang dibolehkan dalam penggunaannya, misalnya: untuk penelitian/riset setelah mendapat persetujuan tertulis dari Pejabat Penandatangan Kontrak]</em>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td>65.</td>
              <td>Fasilitas</td>
              <td>
                <div className="regular-text-value">
                  Pejabat Penandatangan Kontrak akan memberikan fasilitas berupa :{" "}
                  {formDataPreview.fasilitas ? (
                    <span>{formDataPreview.fasilitas}</span>
                  ) : (
                    <em> .................... [diisi fasilitas milik Pejabat Penandatangan Kontrak yang akan diberikan kepada Penyedia untuk kelancaran pelaksanan pekerjaan ini (apabila ada)]</em>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td>66.1.h</td>
              <td>Peristiwa Kompensasi</td>
              <td>
                <div className="regular-text-value">
                  Termasuk Peristiwa Kompensasi yang dapat diberikan kepada Penyedia adalah:
                  {formDataPreview.peristiwa_kompensasi ? <span>{formDataPreview.peristiwa_kompensasi}</span> : <em>..................... [diisi apabila ada Peristiwa Kompensasi lain, selain yang telah tertuang dalam SSUK]</em>}
                </div>
              </td>
            </tr>
            <tr>
              <td>70.1.e</td>
              <td>Besaran Uang Muka</td>
              <td>
                {" "}
                <div className="regular-text-value">
                  <span>{formDataPreview.besaran_uang_muka || "(Besaran Uang Muka)"}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="skk-table-container">
        <table className="skk-table">
          <tbody>
            <tr>
              <td>70.2.d</td>
              <td>Pembayaran Prestasi Pekerjaan</td>
              <td>
                <div className="regular-text-value">Pembayaran prestasi pekerjaan dilakukan dengan cara: Termin</div>
                <table class="sskk-inner-table">
                  <tr>
                    <th>No.</th>
                    <th>
                      Tahapan Pembayaran <em>(milestone)</em>
                    </th>
                    <th>Besaran % Pembayaran dari Harga Kontrak</th>
                    <th>Keterangan</th>
                  </tr>
                  <tbody>
                    {dataPembayaranPrestasi.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.tahapan_pembayaran || "(.........)"}</td>
                        <td>
                          {item.persentase_pembayaran || "(.........)"}
                          <span> %</span>
                        </td>
                        <td>{item.keterangan_pembayaran || "(.........)"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="regular-text-value">Dokumen penunjang yang disyaratkan untuk mengajukan tagihan pembayaran prestasi pekerjaan : </div>
                <div className="rumusan-text-sskk">
                  {formDataPreview.dokumen_tagihan_prestasi.map((item, index) => (
                    <div className="regular-text-value" key={index}>
                      {item}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td>70.3.e</td>
              <td>Pembayaran Bahan dan/atau Peralatan</td>
              <td>
                <div className="regular-text-value">Penentuan dan besaran pembayaran untuk bahan dan/atau peralatan yang menjadi bagian permanen dari pekerjaan utama (material on site), ditetapkan sebagai berikut: </div>
                <div className="rumusan-text-sskk">
                  {formDataPreview.pembayaran_bahan_peralatan.map((item, index) => (
                    <div className="regular-text-value" key={index}>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="regular-text-value">
                  <em>
                    [contoh yang termasuk material on site peralatan: eskalator, lift, pompa air stationer, turbin, peralatan elektromekanik; bahan fabrikasi: sheet pile, geosintetik, konduktor, tower, insulator,wiremesh pabrikasi bahan
                    jadi: beton pracetak]
                  </em>
                </div>
                <br />
                <div className="regular-text-value">
                  <em>[contoh yang tidak termasuk material on site: pasir, batu, semen, aspal, besi tulangan]</em>
                </div>
              </td>
            </tr>
            <tr>
              <td>70.4.(c)</td>
              <td>Denda akibat Keterlambatan</td>
              <td>
                <div className="regular-text-value">Untuk pekerjaan ini besar denda keterlambatan untuk setiap hari keterlambatan adalah 1/1000 (satu per seribu) dari Nilai Kontrak atau bagian tertentu dari Nilai Kontrak</div>
              </td>
            </tr>
            <tr>
              <td>78.2</td>
              <td>Umur Konstruksi dan Pertanggungan terhadap Kegagalan Bangunan</td>
              <td>
                <div className="rumusan-text-sskk">
                  {formDataPreview.umur_konstruksi_gagal_bangunan.map((item, index) => (
                    <div className="regular-text-value" key={index}>
                      {item}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td>79.3</td>
              <td>Penyelesaian Perselisihan/ Sengketa</td>
              <td>
                <div className="regular-text-value">
                  <span>{formDataPreview.perselisihan_sengketa || "(Perselisihan sengketa)"}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="skk-page-tittle">LAMPIRAN A SYARAT-SYARAT KHUSUS KONTRAK</div>
      <div className="skk-page-subtittle">DAFTAR HARGA SATUAN TIMPANG</div>
      <div className="skk-table-layout">
        <table class="skk-table">
          <tr>
            <th>No</th>
            <th>Mata Pembayaran</th>
            <th>Satuan Ukuran</th>
            <th>Kuantitas</th>
            <th>Harga Satuan HPS (Rp)</th>
            <th>Harga Satuan Penawaran (Rp)</th>
            <th>% Terhadap HPS</th>
            <th>Keterangan</th>
          </tr>
          <tbody>
            {dataSatuanTimpang.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.mata_pembayaran || "……….."}</td>
                <td>{item.satuan || "……….."}</td>
                <td>{item.kuantitas || "……….."}</td>
                <td>{item.harga_satuan_hps.masked || "……….."}</td>
                <td>{item.harga_satuan_penawaran.masked || "……….."}</td>
                <td>{item.persentase_terhadap_hps || "……….."}</td>
                <td>{item.keterangan || "……….."}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-bold-skk">Catatan:</div>
      <div className="text-bold-skk">*)Didapatkan dari pokja pemilihan (apabila ada)</div>
      <div className="skk-page-subtittle">DAFTAR PEKERJAAN YANG DISUBKONTRAKKAN DAN SUBKONTRAKTOR (apabila ada)</div>
      <div className="text-bold-skk">1) Pekerjaan Utama</div>
      <table class="skk-table">
        <tr>
          <th>No</th>
          <th>Bagian Pekerjaan yang Disubkontrakkan</th>
          <th>Nama Subkontraktor</th>
          <th>Alamat Subkontraktor</th>
          <th>Kualifikasi Subkontraktor</th>
          <th>Keterangan</th>
        </tr>
        <tbody>
          {dataPekerjaanUtama.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.pekerjaan_yang_disubkontrakan || "……….."}</td>
              <td>{item.nama_subkontraktor || "……….."}</td>
              <td>{item.alamat_subkontraktor || "……….."}</td>
              <td>{item.kualifikasi_subkontraktor || "……….."}</td>
              <td>{item.keterangan || "……….."}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="regular-text-perpoint">
        <div className="regular-text-value">Catatan:</div>
        <div className="regular-text-value">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
        <div className="regular-text-value">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
      </div>
      <div className="text-bold-skk">2) Pekerjaan bukan Pekerjaan Utama</div>
      <table class="skk-table">
        <tr>
          <th>No</th>
          <th>Bagian Pekerjaan yang Disubkontrakkan</th>
          <th>Nama Subkontraktor</th>
          <th>Alamat Subkontraktor</th>
          <th>Kualifikasi Subkontraktor</th>
          <th>Keterangan</th>
        </tr>
        <tbody>
          {dataPekerjaanBukanPekerjaanUtama.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.pekerjaan_yang_disubkontrakan || "……….."}</td>
              <td>{item.nama_subkontraktor || "……….."}</td>
              <td>{item.alamat_subkontraktor || "……….."}</td>
              <td>{item.kualifikasi_subkontraktor || "……….."}</td>
              <td>{item.keterangan || "……….."}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="regular-text-perpoint">
        <div className="regular-text-value">Catatan:</div>
        <div className="regular-text-value">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
        <div className="regular-text-value">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
      </div>
      <div className="skk-page-subtittle">DAFTAR PERSONEL MANAJERIAL</div>
      <table class="skk-table">
        <tr>
          <th>No</th>
          <th>Nama Personel Manajerial</th>
          <th>Jabatan dalam Pekerjaan ini</th>
          <th>Tingkat Pendidikan/Ijazah</th>
          <th>Pengalaman Kerja Profesional (Tahun)</th>
          <th>Sertifikat Kompetensi Kerja</th>
          <th>Keterangan</th>
        </tr>
        <tbody>
          {dataDaftarPersonilManajerial.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.nama_personel || "……….."}</td>
              <td>{item.jabatan_dalam_pekerjaan || "……….."}</td>
              <td>{item.tingkat_pendidikan || "……….."}</td>
              <td>{item.pengalaman_kerja || "……….."}</td>
              <td>{item.sertifikat_kompetensi || "……….."}</td>
              <td>{item.keterangan || "……….."}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="regular-text-perpoint">
        <div className="regular-text-value">Catatan:</div>
        <div className="regular-text-value">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
        <div className="regular-text-value">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
      </div>{" "}
      <div className="skk-page-subtittle">DAFTAR PERALATAN UTAMA</div>
      <table class="skk-table">
        <tr>
          <th>No</th>
          <th>Nama Peralatan Utama</th>
          <th>Merek dan Tipe</th>
          <th>Kapasitas</th>
          <th>Jumlah</th>
          <th>Kondisi</th>
          <th>Status Kepemilikan</th>
          <th>Keterangan</th>
        </tr>
        <tbody>
          {dataDaftarPeralatanUtama.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.nama_peralatan_utama || "……….."}</td>
              <td>{item.merek || "……….."}</td>
              <td>{item.kapasitas || "……….."}</td>
              <td>{item.jumlah || "……….."}</td>
              <td>{item.kondisi || "……….."}</td>
              <td>{item.status_kepemilikan || "……….."}</td>
              <td>{item.keterangan || "……….."}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="regular-text-perpoint">
        <div className="regular-text-value">Catatan:</div>
        <div className="regular-text-value">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
        <div className="regular-text-value">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
      </div>
    </div>
  );
};

export default SyaratKhususKontrakWord;

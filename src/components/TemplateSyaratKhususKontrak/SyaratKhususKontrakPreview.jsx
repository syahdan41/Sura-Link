import "./SyaratKhususKontrakUI.css";
import SskkTable from "../../Assets/Images/tablesskk.png";

const SyaratKhususKontrakPreview = ({ formDataPreview, dataProjectDetail, dataSatuanTimpang, dataPekerjaanUtama, dataPekerjaanBukanPekerjaanUtama, dataDaftarPersonilManajerial, dataDaftarPeralatanUtama, dataPembayaranPrestasi }) => {
  return (
    <>
      <div className="preview-layout">
        <div className="preview-bar-ui">Preview</div>
        <div class="a4-container-ui-skk">
          <div className="skk-page-tittle-ui">SYARAT-SYARAT KHUSUS KONTRAK (SSKK)</div>
          <div className="border-separator-black-skk-ui"></div>
          <div className="skk-table-container-ui">
            <table className="skk-table-ui">
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
                    <div className="sskk-alamat-container-ui">
                      <div className="sskk-section-ui">
                        <div className="sskk-title-ui">Alamat Para Pihak sebagai berikut:</div>

                        <br />
                        <div>Satuan Kerja Pejabat Penandatangan Kontrak:</div>
                        <div className="sskk-row-ui">
                          <span className="sskk-label-ui">Nama</span>
                          <span className="sskk-separator-ui">:</span>
                          <span className="sskk-value-ui">
                            <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_1 || "(Nama Perusahaan Pihak 1)"}</span>
                          </span>
                        </div>
                        <div className="sskk-row-ui">
                          <span className="sskk-label-ui">Alamat</span>
                          <span className="sskk-separator-ui">:</span>
                          <span className="sskk-value-ui">
                            <span style={{ color: "red" }}>{dataProjectDetail.alamat_pihak_1 || "(Alamat Pihak 1)"}</span>
                          </span>
                        </div>
                        <div className="sskk-row-ui">
                          <span className="sskk-label-ui">Website</span>
                          <span className="sskk-separator-ui">:</span>
                          <span className="sskk-value-ui">
                            <span style={{ color: "red" }}>{formDataPreview.website_pihak_1 || "(Website Pihak 1)"}</span>
                          </span>
                        </div>
                        <div className="sskk-row-ui">
                          <span className="sskk-label-ui">E-mail</span>
                          <span className="sskk-separator-ui">:</span>
                          <span className="sskk-value-ui">
                            <span style={{ color: "red" }}>{dataProjectDetail.email_pihak_1 || "(Email Pihak 1)"}</span>
                          </span>
                        </div>
                        <div className="sskk-row-ui">
                          <span className="sskk-label-ui">Faksimili</span>
                          <span className="sskk-separator-ui">:</span>
                          <span className="sskk-value-ui">
                            <span style={{ color: "red" }}>{formDataPreview.fax_pihak_1 || "(Website Pihak 1)"}</span>
                          </span>
                        </div>

                        <br />
                        <div className="sskk-title-ui">Penyedia:</div>
                        <div className="sskk-row-ui">
                          <span className="sskk-label-ui">Nama</span>
                          <span className="sskk-separator-ui">:</span>
                          <span className="sskk-value-ui">
                            <span style={{ color: "red" }}>{dataProjectDetail.perusahaan_pihak_2 || "(Perusahaan Pihak 2)"}</span>
                          </span>
                        </div>
                        <div className="sskk-row-ui">
                          <span className="sskk-label-ui">Alamat</span>
                          <span className="sskk-separator-ui">:</span>
                          <span className="sskk-value-ui">
                            <span style={{ color: "red" }}>{dataProjectDetail.alamat_pihak_2 || "(Alamat pihak 2)"}</span>
                          </span>
                        </div>
                        <div className="sskk-row-ui">
                          <span className="sskk-label-ui">E-mail</span>
                          <span className="sskk-separator-ui">:</span>
                          <span className="sskk-value-ui">
                            <span style={{ color: "red" }}>{dataProjectDetail.email_pihak_2 || "(Email pihak 2)"}</span>
                          </span>
                        </div>
                        <div className="sskk-row-ui">
                          <span className="sskk-label-ui">Faksimili</span>
                          <span className="sskk-separator-ui">:</span>
                          <span className="sskk-value-ui">
                            <span style={{ color: "red" }}>{formDataPreview.fax_pihak_2 || "(Fax pihak 2)"}</span>
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
                    <div className="sskk-alamat-container-ui">
                      <div className="sskk-section-ui">
                        <div className="sskk-title-ui">Wakil Sah Para Pihak sebagai berikut:</div>

                        <br />
                        <div>Untuk Pejabat Penandatangan Kontrak:</div>
                        <div className="sskk-row-ui">
                          <span className="sskk-label-ui">Nama</span>
                          <span className="sskk-separator-ui">:</span>
                          <span className="sskk-value-ui">
                            <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_1 || "(Nama Pihak 1)"}</span>
                          </span>
                        </div>
                        <div className="sskk-row-ui">
                          <span className="sskk-label-ui">Jabatan</span>
                          <span className="sskk-separator-ui">:</span>
                          <span className="sskk-value-ui">
                            <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_1 || "(Jabatan pihak 1)"}</span>
                          </span>
                        </div>

                        <br />
                        <div className="sskk-title-ui">Untuk Penyedia:</div>
                        <div className="sskk-row-ui">
                          <span className="sskk-label-ui">Nama</span>
                          <span className="sskk-separator-ui">:</span>
                          <span className="sskk-value-ui">
                            <span style={{ color: "red" }}>{dataProjectDetail.nama_pihak_2 || "(Nama pihak 2)"}</span>
                          </span>
                        </div>
                        <div className="sskk-row-ui">
                          <span className="sskk-label-ui">Jabatan</span>
                          <span className="sskk-separator-ui">:</span>
                          <span className="sskk-value-ui">
                            <span style={{ color: "red" }}>{dataProjectDetail.jabatan_pihak_2 || "(Jabatan pihak 2)"}</span>
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
                    <div className="regular-text-value-ui">Jaminan dicairkan dan disetorkan pada Universitas Bengkulu</div>
                  </td>
                </tr>
                <tr>
                  <td>27.1</td>
                  <td>Masa Pelaksanaan</td>
                  <td>
                    <div className="regular-text-value-ui">
                      Masa Pelaksanaan selama <span style={{ color: "red" }}>{formDataPreview.masa_pelaksanaan_pekerjaan || "(Masa Pelaksanaan Pekerjaan)"}</span> (
                      <span style={{ color: "red" }}>{formDataPreview.masa_pelaksanaan_pekerjaan_terbilang || "(Terbilang)"}</span>) hari kalender terhitung sejak Tanggal Mulai Kerja yang tercantum dalam SPMK.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>27.4</td>
                  <td>Masa Pelaksanaan untuk Serah Terima Sebagian Pekerjaan (Bagian Kontrak)</td>
                  <td>
                    <div className="regular-text-perpoint-ui">
                      {formDataPreview.ketentuan_masa_pelaksanaan.map((item, index) => (
                        <div className="regular-text-value" key={index}>
                          {item}
                        </div>
                      ))}
                      <div className="regular-text-value-ui">
                        <em>Catatan: Ketentuan di atas diisi apabila diberlakukan serah terima sebagian pekerjaan (secara parsial) sesuai dengan yang dicantumkan dalam dokumen pemilihan (rancangan kontrak)</em>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="a4-container-ui-skk">
          <div className="skk-table-container-ui">
            <table className="skk-table">
              <tbody>
                <tr>
                  <td>33.8</td>
                  <td>Masa Pemeliharaan</td>
                  <td>
                    <div className="regular-text-value">
                      Masa Pemeliharaan berlaku selama <span style={{ color: "red" }}>{formDataPreview.masa_pemeliharaan_pekerjaan || "(Masa Pemeliharaan Pekerjaan)"}</span> [
                      <span style={{ color: "red" }}>{formDataPreview.masa_pemeliharaan_pekerjaan_terbilang || "(Terbilang)"}</span>] hari kalender terhitung sejak Tanggal Penyerahan Pertama Pekerjaan (PHO).
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
                  {formDataPreview?.masukan_gambar_proyek?.length > 0 && (
                    <div className="image-list-preview">
                      {formDataPreview.masukan_gambar_proyek.map((imageName, idx) => (
                        <div key={idx} style={{ marginBottom: "10px" }}>
                          <img src={`${process.env.REACT_APP_BASE_IMAGE_URL}/${imageName}`} alt={`Gambar ${idx}`} style={{ width: "150px", height: "auto", borderRadius: "8px" }} />
                        </div>
                      ))}
                    </div>
                  )}
                  <td>Gambar As Built dan Pedoman Pengoperasian dan Perawatan/ Pemeliharaan</td>
                  <td>
                    <div className="regular-text-value">
                      Gambar "As built" diserahkan paling lambat <span style={{ color: "red" }}>{formDataPreview.waktu_penyerahan_gambar || "..... (...... dalam huruf .........)"}</span>
                    </div>
                    <br />
                    <div className="regular-text-value">
                      dan/atau pedoman pengoperasian dan perawatan/pemeliharaan harus diserahkan paling lambat <span style={{ color: "red" }}>{formDataPreview.waktu_pedoman_pengoperasian || "..... (...... dalam huruf .........)"}</span>{" "}
                      hari kalender setelah Tanggal Penyerahan Pertama Pekerjaan.
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="a4-container-ui-skk">
          <div className="skk-table-container-ui">
            <table className="skk-table-ui">
              <tbody>
                <tr>
                  <td>38.7</td>
                  <td>Penyesuaian Harga</td>
                  <td>
                    <div className="regular-text-value-ui">
                      <span style={{ color: "red" }}>{formDataPreview.penyesuaian_harga || "-"}</span>
                    </div>
                    <table class="sskk-inner-table-ui">
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
                    <div className="regular-text-value-ui">Rumusan tersebut diatas memperhatikan hal-hal sebagai berikut: </div>
                    <div className="rumusan-text-sskk-ui">
                      <div className="regular-text-value-ui">
                        a) Penetapan koefisien bahan, tenaga kerja, alat kerja, bahan bakar, dan sebagainya ditetapkan <strong>seperti contoh sebagai berikut:</strong>{" "}
                      </div>
                      <img src={SskkTable} alt="table-inner" />
                      <div className="regular-text-value-ui">
                        b) Koefisien komponen kontrak ditetapkan oleh Pejabat Penandatangan Kontrak dari perbandingan antara harga bahan, tenaga kerja, alat kerja, dan sebagainya (apabila ada) terhadap Harga Satuan dari pembobotan HPS dan
                        dicantumkan dalam Dokumen Pemilihan (Rancangan Kontrak).
                      </div>
                      <div className="regular-text-value-ui">c) Indeks harga yang digunakan bersumber dari penerbitan BPS.</div>
                      <div className="regular-text-value-ui">d) Dalam hal indeks harga tidak dimuat dalam penerbitan BPS, digunakan indeks harga yang dikeluarkan oleh instansi teknis.</div>
                      <div className="regular-text-value-ui">e) Rumusan penyesuaian Harga Kontrak ditetapkan sebagai berikut:</div>
                      <div className="rumusan-text-sskk-sub-item-ui">
                        <div className="regular-text-value-ui">Pn = (Hn1xV1)+(Hn2xV2)+(Hn3xV3)+.... dst .</div>
                        <div className="regular-text-value-ui">Pn = Harga Kontrak setelah dilakukan penyesuaian Harga Satuan;</div>
                        <div className="regular-text-value-ui">Hn = Harga Satuan baru setiap jenis komponen pekerjaan setelah dilakukan penyesuaian harga menggunakan rumusan penyesuaian Harga Satuan;</div>
                        <div className="regular-text-value-ui">V = Volume setiap jenis komponen pekerjaan yang dilaksanakan.</div>
                      </div>
                      <div className="regular-text-value-ui">
                        f) Pembayaran penyesuaian harga dilakukan oleh Pejabat Penandatangan Kontrak, apabila Penyedia telah mengajukan tagihan disertai perhitungan beserta data-data dan telah dilakukan audit sesuai dengan ketentuan
                        peraturan perundang-undangan.
                      </div>
                      <div className="regular-text-value-ui">g) Penyedia dapat mengajukan tagihan secara berkala paling cepat 6 (enam) bulan setelah pekerjaan yang diberikan penyesuaian harga tersebut dilaksanakan.</div>
                      <div className="regular-text-value-ui">
                        h) Pembayaran penyesuaian harga dilakukan oleh Pejabat Penandatangan Kontrak, apabila Penyedia telah mengajukan tagihan disertai perhitungan beserta data-data dan telah dilakukan audit sesuai dengan ketentuan
                        peraturan perundang-undangan.
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="a4-container-ui-skk">
          <div className="skk-table-container-ui">
            <table className="skk-table-ui">
              <tbody>
                <tr>
                  <td>45.2</td>
                  <td>Pembayaran Tagihan</td>
                  <td>
                    <div className="regular-text-value-ui">
                      <span style={{ color: "red" }}>{formDataPreview.pembayaran_tagihan || "(Pembayaran Tagihan)"}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>49.i</td>
                  <td>Hak dan Kewajiban Penyedia</td>
                  <td>
                    <div className="regular-text-value-ui">Hak dan kewajiban Penyedia :</div>
                    <div className="rumusan-text-sskk-ui">
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
                    <div className="regular-text-value-ui">
                      <span style={{ color: "red" }}>{formDataPreview.persetujuan_tindakan_penyedia || "(Persetujuan Tindakan Penyedia)"}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>56.3</td>
                  <td>Tindakan Penyedia yang Mensyaratkan Persetujuan Pengawas Pekerjaan</td>
                  <td>
                    <div className="regular-text-value-ui">
                      <span style={{ color: "red" }}>{formDataPreview.persetujuan_tindakan_pengawas || "(Persetujuan Tindakan Pengawas)"}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>58.</td>
                  <td>Kepemilikan Dokumen</td>
                  <td>
                    <div className="regular-text-value-ui">Penyedia diperbolehkan menggunakan salinan dokumen dan piranti lunak yang dihasilkan dari Pekerjaan Konstruksi ini dengan pembatasan sebagai berikut:</div>
                    <div className="regular-text-value-ui">
                      {formDataPreview.kepemilikan_dokumen ? (
                        <span style={{ color: "red" }}>{formDataPreview.kepemilikan_dokumen}</span>
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
                    <div className="regular-text-value-ui">
                      Pejabat Penandatangan Kontrak akan memberikan fasilitas berupa :{" "}
                      {formDataPreview.fasilitas ? (
                        <span style={{ color: "red" }}>{formDataPreview.fasilitas}</span>
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
                    <div className="regular-text-value-ui">
                      Termasuk Peristiwa Kompensasi yang dapat diberikan kepada Penyedia adalah:
                      {formDataPreview.peristiwa_kompensasi ? (
                        <span style={{ color: "red" }}>{formDataPreview.peristiwa_kompensasi}</span>
                      ) : (
                        <em>..................... [diisi apabila ada Peristiwa Kompensasi lain, selain yang telah tertuang dalam SSUK]</em>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>70.1.e</td>
                  <td>Besaran Uang Muka</td>
                  <td>
                    {" "}
                    <div className="regular-text-value-ui">
                      <span style={{ color: "red" }}>{formDataPreview.besaran_uang_muka || "(Besaran Uang Muka)"}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="a4-container-ui-skk">
          <div className="skk-table-container-ui">
            <table className="skk-table-ui">
              <tbody>
                <tr>
                  <td>70.2.d</td>
                  <td>Pembayaran Prestasi Pekerjaan</td>
                  <td>
                    <div className="regular-text-value-ui">Pembayaran prestasi pekerjaan dilakukan dengan cara: Termin</div>
                    <table class="sskk-inner-table-ui">
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
                    <div className="regular-text-value-ui">Dokumen penunjang yang disyaratkan untuk mengajukan tagihan pembayaran prestasi pekerjaan : </div>
                    <div className="rumusan-text-sskk-ui">
                      {formDataPreview.dokumen_tagihan_prestasi.map((item, index) => (
                        <div className="regular-text-value-ui" key={index}>
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
                    <div className="regular-text-value-ui">Penentuan dan besaran pembayaran untuk bahan dan/atau peralatan yang menjadi bagian permanen dari pekerjaan utama (material on site), ditetapkan sebagai berikut: </div>
                    <div className="rumusan-text-sskk-ui">
                      {formDataPreview.pembayaran_bahan_peralatan.map((item, index) => (
                        <div className="regular-text-value-ui" key={index}>
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="regular-text-value-ui">
                      <em>
                        [contoh yang termasuk material on site peralatan: eskalator, lift, pompa air stationer, turbin, peralatan elektromekanik; bahan fabrikasi: sheet pile, geosintetik, konduktor, tower, insulator,wiremesh pabrikasi bahan
                        jadi: beton pracetak]
                      </em>
                    </div>
                    <br />
                    <div className="regular-text-value-ui">
                      <em>[contoh yang tidak termasuk material on site: pasir, batu, semen, aspal, besi tulangan]</em>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>70.4.(c)</td>
                  <td>Denda akibat Keterlambatan</td>
                  <td>
                    <div className="regular-text-value-ui">Untuk pekerjaan ini besar denda keterlambatan untuk setiap hari keterlambatan adalah 1/1000 (satu per seribu) dari Nilai Kontrak atau bagian tertentu dari Nilai Kontrak</div>
                  </td>
                </tr>
                <tr>
                  <td>78.2</td>
                  <td>Umur Konstruksi dan Pertanggungan terhadap Kegagalan Bangunan</td>
                  <td>
                    <div className="rumusan-text-sskk-ui">
                      {formDataPreview.umur_konstruksi_gagal_bangunan.map((item, index) => (
                        <div className="regular-text-value-ui" key={index}>
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
                    <div className="regular-text-value-ui">
                      <span style={{ color: "red" }}>{formDataPreview.perselisihan_sengketa || "(Perselisihan sengketa)"}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="a4-container-ui-skk">
          <div className="skk-page-tittle-ui">LAMPIRAN A SYARAT-SYARAT KHUSUS KONTRAK</div>
          <div className="skk-page-subtittle-ui">DAFTAR HARGA SATUAN TIMPANG</div>
          <div className="skk-table-layout-ui">
            <table class="skk-table-ui">
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

          <div className="text-bold-skk-ui">Catatan:</div>
          <div className="text-bold-skk-ui">*)Didapatkan dari pokja pemilihan (apabila ada)</div>
          <div className="skk-page-subtittle-ui">DAFTAR PEKERJAAN YANG DISUBKONTRAKKAN DAN SUBKONTRAKTOR (apabila ada)</div>
          <div className="text-bold-skk-ui">1) Pekerjaan Utama</div>
          <table class="skk-table-ui">
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
          <div className="regular-text-perpoint-ui">
            <div className="regular-text-value-ui">Catatan:</div>
            <div className="regular-text-value-ui">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
            <div className="regular-text-value-ui">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
          </div>

          <div className="text-bold-skk-ui">2) Pekerjaan bukan Pekerjaan Utama</div>
          <table class="skk-table-ui">
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
          <div className="regular-text-perpoint-ui">
            <div className="regular-text-value-ui">Catatan:</div>
            <div className="regular-text-value-ui">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
            <div className="regular-text-value-ui">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
          </div>
          <div className="skk-page-subtittle-ui">DAFTAR PERSONEL MANAJERIAL</div>

          <table class="skk-table-ui">
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
          <div className="regular-text-perpoint-ui">
            <div className="regular-text-value-ui">Catatan:</div>
            <div className="regular-text-value-ui">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
            <div className="regular-text-value-ui">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
          </div>
        </div>
        <div class="a4-container-ui-skk">
          {" "}
          <div className="skk-page-subtittle-ui">DAFTAR PERALATAN UTAMA</div>
          <table class="skk-table-ui">
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
          <div className="regular-text-perpoint-ui">
            <div className="regular-text-value-ui">Catatan:</div>
            <div className="regular-text-value-ui">1. Wajib diisi oleh Pejabat Penandatangan Kontrak sewaktu penyusunan rancangan kontrak</div>
            <div className="regular-text-value-ui">2. Wajib diisi saat rapat persiapan penandatanganan kontrak berdasarkan dokumen penawaran</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SyaratKhususKontrakPreview;

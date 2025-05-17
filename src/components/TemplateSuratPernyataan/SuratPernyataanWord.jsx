import LogoKampusLarge from "../../Assets/Images/image 1.png";
import "./PreviewSurat.css";

const SuratPernyataanWord = ({ formDataPreview, detailProjectData }) => {
  return (
    <div class="a4-container">
      <div className="surat-header">
        <img src={LogoKampusLarge} alt="logo-kampus" />
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

      <hr className="separator-black"></hr>
      <div className="tittle-surat">SURAT PERNYATAAN</div>
      <div className="text-var-tanggal">
        Pada hari ini, <span>{formDataPreview.tanggal_surat_pernyataan_terbilang || "(Tanggal terbilang)"}</span> (
        <span>
          {(formDataPreview.tanggal_surat_pernyataan &&
            (() => {
              const date = new Date(formDataPreview.tanggal_surat_pernyataan);
              const day = String(date.getDate()).padStart(2, "0");
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const year = date.getFullYear();
              return `${day}/${month}/${year}`;
            })()) ||
            "(Tanggal Surat Pernyataan)"}
        </span>
        ), saya yang bertanda tangan dibawah ini menyatakan:
      </div>
      <div className="pihak1-container">
        <table>
          <tbody>
            <tr>
              <td>Nama</td>
              <td>:</td>
              <td>{detailProjectData.nama_pihak_1 || "Nama Pihak 1"}</td>
            </tr>
            <tr>
              <td>NIP</td>
              <td>:</td>
              <td>{detailProjectData.nip_pihak_1 || "NIP Pihak 1"}</td>
            </tr>
            <tr>
              <td>Jabatan</td>
              <td>:</td>
              <td>{detailProjectData.jabatan_pihak_1 || "Jabatan Pihak 1"}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>:</td>
              <td>{detailProjectData.alamat_pihak_1 || "Alamat Pihak 1"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="isi-surat">
        Berdasarkan Surat Keputusan Rektor Universitas Bengkulu No : <span>{formDataPreview.nomor_surat_keputusan_rektor || "(Nomor Surat)"}</span> Tanggal{" "}
        <span>
          {(formDataPreview.tanggal_surat_keputusan_rektor &&
            new Date(formDataPreview.tanggal_surat_keputusan_rektor).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })) ||
            "(Tanggal Surat Keputusan Rektor)"}
        </span>{" "}
        tentang <span>{formDataPreview.keterangan_surat || "(Keterangan Surat)"}</span>, atas Pelaksanaan Pekerjaan <span>{detailProjectData.ruang_lingkup_pekerjaan || "(Ruang Lingkup Pekerjaan)"}</span>, dengan Nilai Kontrak{" "}
        <span>{formDataPreview.nilai_kontrak.masked || "(Nilai Kontrak Angka)"}</span> ( <span>{formDataPreview.nilai_kontrak_terbilang || "(Nilai Kontrak Terbilang)"}</span> ), Untuk pembayaran{" "}
        <span>{formDataPreview.dalam_rangka_pembayaran || "Dalam Rangka Pembayaran"}</span> sebesar <span>{formDataPreview.nominal_pembayaran.masked || "Nominal Pembayaran"}</span> (
        <span>{formDataPreview.nominal_pembayaran_terbilang || "Nominal Pembayaran Terbilang"}</span>). yang terdapat dalam DIPA Universitas Bengkulu Tahun Anggaran <span>{formDataPreview.tahun_anggaran || "Tahun Anggaran"}</span>, dan
        mengangkat saya sebagai Pejabat Pembuat Komitmen Universitas Bengkulu yang diberi kewenangan Kuasa Pengguna Anggaran untuk melaksanakan tindakan yang mengakibatkan terjadinya pengeluaran anggaran belanja yang bersumber dari PNBP
        dengan ini Saya menyatakan dengan sesungguhnya bahwa berkenaan dengan pelaksanaan anggaran pada Universitas Bengkulu, dengan ini menyatakan bahwa:
      </div>
      <div className="ketentuan-sanksi">
        {formDataPreview.ketentuan_sanksi.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className="isi-surat">Demikian pernyataan ini saya buat dengan sebenarnya dengan mengingat Sumpah Pegawai Negeri Sipil.</div>
      <div className="surat-ttd-pernyataan">
        Bengkulu,{" "}
        <span>
          {" "}
          {(formDataPreview.tanggal_surat_pernyataan &&
            new Date(formDataPreview.tanggal_surat_pernyataan).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })) ||
            "(Tanggal Surat Pernyataan)"}
        </span>{" "}
        <br />
        a.n. Kuasa Pengguna Anggaran/ <br /> <span>{detailProjectData.jabatan_pihak_1 || "Jabatan Pihak 1"}</span> <br />
        UNIVERSITAS BENGKULU
      </div>
      <div className="identity-surat-pernyataan">
        <div>
          <span className="name-surat-pernyataan">
            <span>{detailProjectData.nama_pihak_1 || "Nama Pihak 1"}</span>
          </span>
        </div>
        <div>
          {" "}
          <span className="nip-surat-pernyataan">
            NIP: <span>{detailProjectData.nip_pihak_1 || "NIP Pihak 1"}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SuratPernyataanWord;

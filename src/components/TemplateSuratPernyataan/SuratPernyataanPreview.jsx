import LogoKampus from "../../Assets/Images/LogoKampus.png";
import "./PreviewSuratUI.css";

const SuratPernyataanPreview = ({ formDataPreview, detailProjectData }) => {
  return (
    <div className="preview-layout">
      <div className="preview-bar-ui">Preview</div>
      <div class="a4-container-ui">
        <div className="surat-header-ui">
          <img src={LogoKampus} alt="logo-kampus" />
          <div className="surat-header-text-bold-ui">
            KEMENTERIAN PENDIDIKAN TINGGI, SAINS,
            <br />
            DAN TEKNOLOGI
            <br /> UNIVERSITAS BENGKULU
          </div>
        </div>
        <div className="surat-header-text-light-ui">
          Jalan WR. Supratman Kandang Limun Bengkulu 38371 A
          <br />
          Telepon (0736) 21170, 21884 Faksimile (0736) 22105
          <br /> Laman : www.unib.ac.id e-mail : rektorat@unib.ac.id
        </div>
        <div className="separator-black-ui"></div>
        <div className="tittle-surat-ui">SURAT PERNYATAAN</div>
        <div className="text-var-tanggal-ui">
          Pada hari ini, <span style={{ color: "red" }}>{formDataPreview.tanggal_surat_pernyataan_terbilang || "(Tanggal terbilang)"}</span> (
          <span style={{ color: "red" }}>
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
        <div className="pihak1-container-ui">
          <span className="label-ui">Nama</span>
          <span className="separator-ui">:</span>
          <span className="value-ui">
            <span style={{ color: "red" }}>{detailProjectData.nama_pihak_1 || "Nama Pihak 1"}</span>
          </span>

          <span className="label-ui">NIP</span>
          <span className="separator-ui">:</span>
          <span className="value-ui">
            <span style={{ color: "red" }}>{detailProjectData.nip_pihak_1 || "NIP Pihak 1"}</span>
          </span>

          <span className="label-ui">Jabatan</span>
          <span className="separator-ui">:</span>
          <span className="value-ui">
            <span style={{ color: "red" }}>{detailProjectData.jabatan_pihak_1 || "Jabatan Pihak 1"}</span>
          </span>

          <span className="label-ui">Alamat</span>
          <span className="separator-ui">:</span>
          <span className="value-ui">
            <span style={{ color: "red" }}>{detailProjectData.alamat_pihak_1 || "Alamat Pihak 1"}</span>
          </span>
        </div>
        <div className="isi-surat-ui">
          Berdasarkan Surat Keputusan Rektor Universitas Bengkulu No : <span style={{ color: "red" }}>{formDataPreview.nomor_surat_keputusan_rektor || "(Nomor Surat)"}</span> Tanggal{" "}
          <span style={{ color: "red" }}>
            {(formDataPreview.tanggal_surat_keputusan_rektor &&
              new Date(formDataPreview.tanggal_surat_keputusan_rektor).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })) ||
              "(Tanggal Surat Keputusan Rektor)"}
          </span>{" "}
          tentang <span style={{ color: "red" }}>{formDataPreview.keterangan_surat || "(Keterangan Surat)"}</span>, atas Pelaksanaan Pekerjaan{" "}
          <span style={{ color: "red" }}>{detailProjectData.ruang_lingkup_pekerjaan || "(Ruang Lingkup Pekerjaan)"}</span>, dengan Nilai Kontrak{" "}
          <span style={{ color: "red" }}>{formDataPreview.nilai_kontrak.masked || "(Nilai Kontrak Angka)"}</span> ( <span style={{ color: "red" }}>{formDataPreview.nilai_kontrak_terbilang || "(Nilai Kontrak Terbilang)"}</span> ), Untuk
          pembayaran <span style={{ color: "red" }}>{formDataPreview.dalam_rangka_pembayaran || "Dalam Rangka Pembayaran"}</span> sebesar{" "}
          <span style={{ color: "red" }}>{formDataPreview.nominal_pembayaran.masked || "Nominal Pembayaran"}</span> (<span style={{ color: "red" }}>{formDataPreview.nominal_pembayaran_terbilang || "Nominal Pembayaran Terbilang"}</span>).
          yang terdapat dalam DIPA Universitas Bengkulu Tahun Anggaran <span style={{ color: "red" }}>{formDataPreview.tahun_anggaran || "Tahun Anggaran"}</span>, dan mengangkat saya sebagai Pejabat Pembuat Komitmen Universitas Bengkulu
          yang diberi kewenangan Kuasa Pengguna Anggaran untuk melaksanakan tindakan yang mengakibatkan terjadinya pengeluaran anggaran belanja yang bersumber dari PNBP dengan ini Saya menyatakan dengan sesungguhnya bahwa berkenaan dengan
          pelaksanaan anggaran pada Universitas Bengkulu, dengan ini menyatakan bahwa:
        </div>
        <div className="ketentuan-sanksi-ui">
          {formDataPreview.ketentuan_sanksi.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
        <div className="isi-surat-ui">Demikian pernyataan ini saya buat dengan sebenarnya dengan mengingat Sumpah Pegawai Negeri Sipil.</div>
        <div className="surat-ttd-ui">
          Bengkulu,{" "}
          <span style={{ color: "red" }}>
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
          a.n. Kuasa Pengguna Anggaran/ <br /> <span style={{ color: "red" }}>{detailProjectData.jabatan_pihak_1 || "Jabatan Pihak 1"}</span> <br />
          UNIVERSITAS BENGKULU
        </div>
        <div className="identity-ui-surat-pernyataan">
          <span className="name-ui-surat-pernyataan">
            <span style={{ color: "red", textDecoration: "underline" }}>{detailProjectData.nama_pihak_1 || "Nama Pihak 1"}</span>
          </span>
          <span className="nip-ui-surat-pernyataan">
            NIP: <span style={{ color: "red" }}>{detailProjectData.nip_pihak_1 || "NIP Pihak 1"}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SuratPernyataanPreview;

const bapPemeriksaanTahapStyle = `
<style>

.surat-header-bap-tahap-text-bold {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  text-align: center;
  font-weight: bold;
  white-space: pre-line; /* Memungkinkan enter pada teks */
  font-size: 19px;
  line-height: 1.1;
}
.header-table-bap {
  display: flex;
  flex-direction: column;
  gap: 0px;
}
.surat-header-bap-tahap-text-bold-right {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  text-align: center;
  font-weight: bold;
  white-space: pre-line; /* Memungkinkan enter pada teks */
  font-size: 19px;
  min-width: 290px;
  padding: 10px 10px 9px 10px;
}

.surat-header-bap {
  display: flex;
  gap: 20px;
}

.table-container-bap-tahap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.custom-table-bap-tahap {
  width: 900px;
  border-collapse: collapse;
}

.custom-table-bap-tahap td {
  border: 2px solid #000;
  padding: 10px;
  text-align: center;
}

.custom-table-bap-tahap tr:nth-child(even) {
  background-color: #ffff;
}
.row-table-bap-tahap {
  display: flex;
  justify-content: flex-start;
  padding: 5px 0;
}

.label-table-bap-tahap {
  font-weight: bold;
  min-width: 100px; /* Supaya label sejajar */
  text-align: left;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  color: #000;
  margin-top: 4px;
}
.separator-table-bap-tahap {
  color: #000;
  margin-left: -20px;
}

.value-table-bap-tahap {
  flex: 1;
  text-align: left;
  margin-left: 10px;
  margin-top: 4px;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  color: #000;
  font-weight: lighter;
}
.bap-header-container-tahap {
  display: grid;
  grid-template-columns: auto minmax(5px, 25px) 1fr; /* Kolom tengah (:) bisa diubah */
  gap: 0px;
  text-align: left;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 16px 64px 17px 10px;
  margin-left: -20px;
}

.label-bap-tahap {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: bold;
}
.separator-bap-tahap {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
  min-width: 10px;
  margin-left: 10px;
}
.value-bap-tahap {
  text-align: left;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
}
.first-paragraph-bap {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-weight: lighter;
  font-size: 16px;
  text-align: justify;
  margin-top: 30px;
}
.bap-termin-wrapper {
  margin-top: 30px;
}
.bap-termin-container {
  display: flex;
  flex-direction: column;
  gap: 5px; /* Jarak antar baris */
  max-width: 600px; /* Bisa disesuaikan sesuai kebutuhan */
  margin-top: 20px;
}

.bap-termin-item {
  display: flex;
  align-items: center;
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-weight: lighter;
  font-size: 16px;
  text-align: justify;
}
.berdasarkan-text-underline {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-weight: lighter;
  font-size: 16px;
  text-decoration: underline;
  margin-left: 25px;
  margin-top:90px;
}

.berdasarkan-text-underline-2 {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-weight: lighter;
  font-size: 16px;
  text-decoration: underline;
}
.termin-detail-tahap-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}

.bap-termin-detail-tahap {
  display: flex;
  align-items: flex-start;
  max-width: 800px;
  margin-top: 5px;
}

.bap-termin-number {
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  font-weight: normal;
  min-width: 20px; /* Tetap untuk jaga posisi angka sejajar */
  margin-right: 5px;
  color: #000;
}

.bap-termin-text {
  flex: 1;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  font-weight: normal;
  text-align: justify;
  margin: 0; /* Buat paragrafnya rapat */
  color: #000;
}

.bap-termin-highlight {
  font-weight: bold;
  color: #000; /* Pastikan tidak ada warna merah */
}


.termin-payment-detail {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 800px;
}

.termin-payment-number {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-weight: lighter;
  font-size: 16px;
  min-width: 20px;
}

.termin-payment-text {
  flex: 1;
  text-align: justify;
  line-height: 1.5;
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-weight: lighter;
  font-size: 16px;
  margin-top: -2px;
}

.bap-label {
  min-width: 100px; /* Sesuaikan agar label sejajar */

  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-weight: lighter;
  font-size: 16px;
  text-align: justify;
}

.bap-separator {
  margin: 0 5px; /* Jarak antara ":" dan value */
}

.bap-value {
  flex: 1; /* Biar teks di sisi kanan tidak kepotong */
}

.bap-pihak-pertama {
  margin-top: 10px;
  font-style: italic;
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-weight: lighter;
  font-size: 16px;
  text-align: justify;
}

.tittle-surat-ringkasan-kontrak {
  color: #000;
  font-size: 19px;
  font-family: "Times New Roman", Times, serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  margin-top: 20px;
  text-decoration: underline;
}
.tittle-nomor-ringkasan-kontrak {
  color: #000;
  font-size: 16px;
  font-family: "Times New Roman", Times, serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: lighter;
  margin-top: 0px;
}

.terbilang-bap-wrapper {
  margin-left: 30px;
  margin-bottom: 20px;
}

.terbilang-bap-var {
  text-align: left;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: bold;
}

.terbilang-bap-value {
  text-align: left;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
}

.surat-ttd-ringkasan {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  text-align: left;
  font-weight: lighter;
  white-space: pre-line; /* Memungkinkan enter pada teks */
  font-size: 16px;
  margin-left: 530px;
  margin-top: 55px;
}

.identity {
  display: flex;
  flex-direction: column;
  align-items: left; /* Jika ingin teks di tengah */
  margin-left: 540px;
  margin-top: 75px;
}

.name {
  text-decoration: underline;
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
}

.nip {
  margin-top: 3px; /* Mengurangi jarak agar lebih rapat */
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
}
.ttd-bap-layout {
  display: flex;
  margin-left: 50px;
}

.ttd-pihak-kesatu-tahap {
  white-space: pre-line;
  text-align: left;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  line-height: 20px;
}
.ttd-pihak-kedua-tahap {
  white-space: pre-line;
  text-align: left;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  line-height: 20px;
  margin-left:400px;
}
.ttd-pihak-kedua-bold {
  font-weight: bold;
}

.ttd-pihak-kedua-light {
  font-weight: lighter;
}

.nip-bap-layout {
  margin-top: 100px;
}
.nip-bap-name-tahap {
  white-space: pre-line;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  line-height: 20px;
}
.nip-bap-nip-tahap {
  white-space: pre-line;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  line-height: 20px;
  margin-left: 0px;
}
.last-paragraph-bap {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-weight: lighter;
  font-size: 16px;
  text-align: justify;
  margin-top: 10px;
  margin-left: 10px;
}

.bast-serah-terima-container {
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  color: #000;
  text-align: justify;
  margin-top:50px;
}

.ttd-bap-layout-serahterima {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 40px 100px 0 100px; /* kasih ruang kiri-kanan */
  box-sizing: border-box;
}

.ttd-pihak-kesatu-tahap-serahterima,
.ttd-pihak-kedua-tahap-serahterima {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  line-height: 20px;
  width: 40%;
  white-space: pre-line;
}

.ttd-pihak-kesatu-bold-serahterima,
.ttd-pihak-kedua-bold-serahterima {
  font-weight: bold;
}

.ttd-pihak-kesatu-light-serahterima,
.ttd-pihak-kedua-light-serahterima {
  font-weight: normal;
}

.nip-bap-layout-pihak1,
.nip-bap-layout-pihak2 {
  margin-top: 65px;
}

.last-paragraph-bap-serahterima {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-weight: lighter;
  font-size: 16px;
  text-align: justify;
  margin-top: 10px;
}

.lampiran-header-tittle-layout {
  display: flex;
  justify-content: center;
  align-items: center;
}

.lampiran-header-tittle-text {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  text-align: center;
  font-size: 19px;
  max-width: 700px;
  font-weight: bold;
}

.table-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.table-bast-serah-terima {
  border-collapse: collapse;
  width: 90%;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  text-align: center;
  color: #000;
}

.table-bast-serah-terima th {
  border: 2px solid black;
  padding: 10px;
}
.table-bast-serah-terima td {
  border: 2px solid black;
  padding: 10px;
  text-align: left;
}

.table-bast-serah-terima th {
  background-color: #ffff;
}

.ttd-bap-layout-lampiran {
  display: flex;
  gap: 320px;
  margin-top: 120px;
  margin-left: 190px;
}



</style>
`;

export default bapPemeriksaanTahapStyle;

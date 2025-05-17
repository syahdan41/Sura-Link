const suratPernyataanStyle = `
<style>
 
.a4-container {
  width: 794px;
  height: 1123px;
  padding: 40px;
  background: #000;
  box-sizing: border-box;
  font-family: "Times New Roman", Times, serif;}

.center-header {
  margin-left: 30px;
}

.header-table {
  width: 100%;
  table-layout: fixed;
}

.surat-header-img {
  width: 120px;
  height: 120px;
  vertical-align: top;
  margin-top:40px
}

.surat-header-img img {
  width: 100%;
  height: auto;
}

.surat-header-text-cell {
  display: flex;
  flex-direction: column;
}

.surat-header-text-bold {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  text-align: center;
  font-weight: bold;
  white-space: pre-line;
  font-size: 19px;
}

.surat-header-text-light {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  text-align: center;
  font-weight: lighter;
  white-space: pre-line;
  font-size: 16px;
  margin-top: 10px;
}

.separator-black {
  width: 100%;
  height: 3px;
  color:#000;
  margin-top:-20px;
}

.tittle-surat {
  color: #000;
  font-size: 19px;
  font-family: "Times New Roman", Times, serif;
  text-align: center;
  font-weight: bolder;
  margin-top: 20px;
}

.text-var-tanggal,
.isi-surat {
  margin-top: 5px;
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  text-align: justify;
}

.pihak1-container {
  margin-left: 35px;
}
  
.pihak1-container table {
  border-collapse: collapse;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  color: #000;
  font-weight: lighter;
  line-height: 1; /* Lebih rapat antar baris */
  
}

.pihak1-container td {
 padding: 0px 2px; /* sempitkan padding vertikal dan horizontal */
  margin: 0;
}


.label, .separator, .value {
  font-weight: normal;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  color: #000;
}

.ketentuan-sanksi {
  margin-left: 35px;
  margin-top: 25px;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  text-align: justify;
  padding-left: 20px;
  text-indent: -20px;
}

.surat-ttd-pernyataan {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  text-align: left;
  font-weight: lighter;
  white-space: pre-line; /* Memungkinkan enter pada teks */
  font-size: 16px;
  margin-left: 350px;
  margin-top: 35px;
}

.identity-surat-pernyataan {
  display:flex;
  flex-direction: column;
  align-items: left; /* Jika ingin teks di tengah */
  margin-left: 352px;
  margin-top: 95px;
}

.name-surat-pernyataan {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
}

.nip-surat-pernyataan {
  margin-top: -2px; /* Mengurangi jarak agar lebih rapat */
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
}


</style>
`;

export default suratPernyataanStyle;

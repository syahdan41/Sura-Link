const suratSPPBJStyle = `
<style>
 


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

.spmk-nomor-paket-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
  text-align: center;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: 500;
}

.spmk-justify-text {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  margin-top: 30px;
  text-align: justify;
}

.spmk-text-container {
  text-align: left;
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  font-weight: lighter;
  margin-top: 20px;
}

.spmk-container {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.spmk-intro {
  margin-bottom: 12px;
}

.sppbj-item {
  display: flex;
  align-items: flex-start;
}

.spmk-label {
  flex: 0 0 220px; /* Menyesuaikan lebar label agar rata */
  font-weight: bold;
}

.spmk-separator {
  margin-right: 8px;
}

.spmk-value {
  flex: 1;
  text-align: justify;
}

.ttd-sppbj-layout {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 80px;
  justify-content: flex-end;
  align-items: flex-end;
  text-align: left;
}
.ttd-spmk-text-container {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
}

.sec-page-content-sppbj {
  margin-top: 150px;
}



</style>
`;

export default suratSPPBJStyle;

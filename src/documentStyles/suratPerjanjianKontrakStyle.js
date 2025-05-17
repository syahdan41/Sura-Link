const suratPerjanjianKontrakStyle = `
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

.spk-container {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.spmk-intro {
  margin-bottom: 12px;
}

.spmk-item {
  display: flex;
  align-items: flex-start;
  margin-left: 30px;
}

.suratkontrak-label {
  flex: 0 0 220px; /* Menyesuaikan lebar label agar rata */
  font-weight: lighter;
}

.spmk-separator {
  margin-right: 8px;
}

.spmk-value {
  flex: 1;
  text-align: justify;
}

.spk-dasar-hukum-container {
  font-family: "Times New Roman", serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 17px;
}

.spk-dasar-hukum-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.spk-dasar-hukum-label {
  min-width: 20px;
  font-weight: bold;
}

.spk-dasar-hukum-value {
  text-align: justify;
}

.spk-dasar-hukum-subitems {
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  gap: 4px;
  
}

.spk-dasar-hukum-subitem {
  display: flex;
  gap: 6px;
}

.spk-dasar-hukum-note {
  font-style: italic;
}

.tittle-perpage {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  font-weight: lighter;
  color: #000;
  margin-top: 20px;
}
.tittle-onpage {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  font-weight: lighter;
  color: #000;
  margin-top: 10px;
}

.tittle-onpage p {
  margin-bottom: -10px;
}
.ttd-spk-main {
  display: flex;
  flex-direction: row;
  gap: 250px;
  justify-content: center;
  align-items: center;
}
.ttd-spk-layout {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 80px;
  text-align: center;
}
.ttd-spk-text-container {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
  display: flex;
  flex-direction: column;
  max-width: 250px;
}

.sec-page-content {
  margin-top: 90px;
}

</style>
`;

export default suratPerjanjianKontrakStyle;

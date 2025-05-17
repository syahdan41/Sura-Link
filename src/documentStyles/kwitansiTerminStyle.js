const kwitansiTerminStyle = `
<style>
 
.kwitansi-content {
  padding: 10px;

  display: flex;
  flex-direction: column;
}

.kwitansi-tittle-bar {
  background-color: #bfbfbf;
  
  font-size: 28px;
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  letter-spacing: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: #000;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.bank-detail-table-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-right: 90px;
  margin-top: 20px;
}

.bank-detail-table-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-right: 90px;
  margin-top: 20px;
}

.bank-detail-table {
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  color: #000;
  border-collapse: collapse;
}

.bank-label {
  font-weight: bold;
  padding-right: 5px;
  white-space: nowrap;
}

.bank-separator {
  padding: 0 5px;
}

.bank-value {
  font-weight: lighter;
}

.jumlah-layout {
  text-align: left;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-weight: bold;
  
  margin-top: 75px;
  
  border: 2px solid #000;
  width: 100px;
  padding: 20px;
  font-style: italic;
}

.label-jumlah-kwitansi {
  white-space: nowrap;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 22px;
  min-width: 0px;
}
.separator-jumlah-kwitansi {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 22px;
  min-width: 10px;
  margin-left: 0px;
}
.value-jumlah-kwitansi {
  text-align: left;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 22px;
  flex: 1;
  margin-left: 40px;
}

.tertanda-layout {
  display: flex;
  
  
}

.ttd-1 {
  display: flex;
  flex-direction: column;
  text-align: left;
  
}

.setuju-dibayar {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
}

.ttd-2 {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 370px;
}

.tanggal-kwitansi-layout {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
  
}

.yang-menerima {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
}



.nip-kwitansi-layout {
  margin-top: 100px;
}
.nip-kwitansi-name {
  white-space: pre-line;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  line-height: 20px;
  text-decoration: underline;
}
.nip-kwitansi-nip {
  white-space: pre-line;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  line-height: 20px;
  
}



</style>
`;

export default kwitansiTerminStyle;

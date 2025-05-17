const bapTerminStyle = `
<style>


.first-paragraph-bap {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-weight: lighter;
  font-size: 16px;
  text-align: justify;
  margin-top: 30px;
  width: 650px;
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

.bap-termin-detail {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 800px;
  margin-top:40px;
}

.bap-termin-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 12px;
}

.bap-termin-number {
  width: 25px;
  vertical-align: top;
  font-size: 16px;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-weight: lighter;
}

.bap-termin-text {
  text-align: justify;
  font-size: 16px;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-weight: lighter;
}

.bap-termin-highlight {
  font-weight: bold;
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

.termin-payment-table {
  width: 100%;
  max-width: 610px;
  margin-top: -20px;
  margin-left: 30px;
  margin-bottom: 20px;
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

.bap-header-container {
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
  padding: 12.5px 64px 12.5px 10px;
  margin-left: -20px;
}

.label-bap {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: bold;
}
.separator-bap {
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
  min-width: 10px;
  margin-left: 10px;
}
.value-bap {
  text-align: left;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-size: 16px;
  font-weight: lighter;
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

.ttd-bap-layout {
  width: 100%;
  border-collapse: collapse;
}

.ttd-pihak {
  width: 50%;
  text-align: center;
  vertical-align: top;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  color: #000;
  line-height: 20px;
  padding: 0 20px;
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

.nip-bap-name {
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  text-decoration: underline;
  color: #000;
  white-space: pre-line;
}

.nip-bap-nip {
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  color: #000;
  margin-left: 0;
}
.last-paragraph-bap {
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-weight: lighter;
  font-size: 16px;
  text-align: justify;
  margin-top: 10px;
  margin-left: 10px;
  width: 610px;
}

// style adjustment


.bap-termin-tabel-pembayaran {
  width: 100%;
  border-collapse: collapse;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  color: #000;
  padding: 2px 8px;
}

.bap-termin-tabel-pembayaran td {
  padding: 4px 8px;
  vertical-align: top;
}

.bap-termin-keterangan {
  text-align: left;
  width: 50%;
}

.bap-termin-perhitungan {
  text-align: right;
  width: 30%;
}

.bap-termin-nominal {
  text-align: right;
  font-weight: bold;
  width: 20%;
  white-space: nowrap;
}

.bap-termin-garis-atas td {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}



</style>
`;

export default bapTerminStyle;

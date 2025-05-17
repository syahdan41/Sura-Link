import React, { useState } from "react";
import DatePicker from "react-datepicker";
import BapRetensiTerminWord from "./BapRetensiTerminWord";
import BapRetensiTerminUI from "./BapRetensiTerminUI";

import "react-datepicker/dist/react-datepicker.css";

const BapRetensiTermin = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="main-form-container">
        {" "}
        <div className="form-container">
          <div className="input-container-form">
            <label className="input-label-form">Nomor Surat BAP</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Tanggal Surat BAP</label>
            <DatePicker className="input-field-form-date" selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Tanggal Surat BAP (Terbilang)</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Paket Pekerjaan</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>

          <div className="input-container-form">
            <label className="input-label-form">Jabatan Pihak 1</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Alamat Pihak 1</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>

          <div className="input-container-form">
            <label className="input-label-form">Perusahaan Pihak 2</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Jabatan Pihak 2</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Alamat Pihak 2</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Persentase Pekerjaan</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Nomor Surat Berita Acara Pemeriksaan Pekerjaan</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Tanggal Surat Berita Acara Pemeriksaan Pekerjaan</label>
            <DatePicker className="input-field-form-date" selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Nomor Surat Perjanjian/Kontrak</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Tanggal Surat Perjanjian/Kontrak</label>
            <DatePicker className="input-field-form-date" selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Nomor Surat Addendun</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Tanggal Surat Addendun</label>
            <DatePicker className="input-field-form-date" selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div className="input-form-flex">
            <div className="input-container-column">
              {" "}
              <label className="input-label-flex">Uang Muka</label>
              <input type="text" className="input-field-form-flex" placeholder="Isi bagian ini" />
            </div>

            <div className="input-container-column">
              {" "}
              <label className="input-label-flex">Persentase</label>
              <input type="text" className="input-field-form-flex" placeholder="Isi bagian ini" />
            </div>

            <div className="input-container-column">
              {" "}
              <label className="input-label-flex">Total</label>
              <input type="text" className="input-field-form-flex" placeholder="Isi bagian ini" />
            </div>
          </div>

          <div className="input-form-flex">
            <div className="input-container-column">
              {" "}
              <label className="input-label-flex">Retensi Pekerjaan</label>
              <input type="text" className="input-field-form-flex" placeholder="Isi bagian ini" />
            </div>

            <div className="input-container-column">
              {" "}
              <label className="input-label-flex">Persentase</label>
              <input type="text" className="input-field-form-flex" placeholder="Isi bagian ini" />
            </div>

            <div className="input-container-column">
              {" "}
              <label className="input-label-flex">Total</label>
              <input type="text" className="input-field-form-flex" placeholder="Isi bagian ini" />
            </div>
          </div>

          <div className="input-container-form">
            <label className="input-label-form">Termin 1</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Jumlah Total</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Jumlah Total (Terbilang)</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Nama Bank Pihak 2</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Nomor Rekening Pihak 2</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
          <div className="input-container-form">
            <label className="input-label-form">Nama Pemilik Rekening Pihak 2</label>
            <input type="text" className="input-field-form" placeholder="Isi bagian ini" />
          </div>
        </div>
        {/* <BapRetensiTerminWord /> */}
        <BapRetensiTerminUI />
      </div>

      <button className="button-simpan-blue">Simpan</button>
    </>
  );
};

export default BapRetensiTermin;

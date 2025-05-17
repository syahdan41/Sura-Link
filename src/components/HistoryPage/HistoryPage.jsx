import NavbarWhite from "../NavbarWhite/NavbarWhite";
import iconfile from "../../Assets/Images/outlinefile.png";
import HistoryIcon from "../../Assets/Images/history_icon.png";
import TripleDot from "../../Assets/Images/tripledot_grey.png";
import ModalHistory from "../ModalHistory/ModalHistory";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner/spinner";
import "./HistoryPage.css";

const HistoryPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("Proyek");
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dynamic/crud/get/history`);

      const sortedData = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setHistoryData(sortedData);
    } catch (error) {
      console.error("Gagal mengambil data history:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format waktu Indonesia
  const formatTimestamp = (timestamp) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return new Date(timestamp).toLocaleString("id-ID", options);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      <NavbarWhite isForm={false} />
      <div className="history-content-layout">
        <div className="history-text-content">
          <p>Riwayat</p>
          <div className="top-menu">
            <div className={`menu ${selectedMenu === "Proyek" ? "selected" : ""}`} onClick={() => setSelectedMenu("Proyek")}>
              Proyek
            </div>
          </div>
          {/* end of top menu */}
        </div>
        <div className="content-table-layout">
          <div className="grey-large-bar"></div>
          <div className="grey-vertical-bar"></div>
          <div className="header-table-layout">
            <div className="grey-horizontal-bar"></div>
            <div className="icon-text">
              <img src={iconfile} alt="icon-file" />
              <p>Nama</p>
            </div>
            <div className="data-modifikasi">Data Modifikasi</div>
            <p>Aksi</p>
          </div>

          <div className="data-history-layout">
            {/* mapping from here */}

            {historyData.map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex-row" style={{ position: "relative" }}>
                  <img src={HistoryIcon} alt="history-icon" />
                  <div className="flex-column-history">
                    <p>{item.project_name.toUpperCase()}</p>
                    <div className="folder-location">
                      {item.action_type} - {item.description}
                    </div>
                  </div>
                  <div className="date-style">{formatTimestamp(item.timestamp)}</div>
                  <div className="triple-dot-grey" onClick={() => setActiveModalIndex(activeModalIndex === index ? null : index)}>
                    <img src={TripleDot} alt="action-menu" />
                  </div>

                  {/* Modal muncul tepat di item yang diklik */}
                  {activeModalIndex === index && <ModalHistory isOpen={true} projectId={item.id} onDeleted={fetchHistory} onClose={() => setActiveModalIndex(null)} />}
                </div>

                <div className="grey-separator-bar-history"></div>
              </React.Fragment>
            ))}

            {/* end of mapping */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryPage;

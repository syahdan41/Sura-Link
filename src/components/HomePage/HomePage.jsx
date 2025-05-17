import NavbarBlue from "../NavbarBlue/NavbarBlue";
import LogoProject from "../../Assets/Images/Projects.png";

import ImageGroup from "../../Assets/Images/imagegrup.png";
import TripleDot from "../../Assets/Images/tripledot.png";
import arrowNext from "../../Assets/Images/arrow_next.png";
import arrowPrevious from "../../Assets/Images/arrow_previous.png";
import ModalNewProject from "../ModalNewProject/ModalNewProject";
import Spinner from "../Spinner/spinner";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 10, left: 0 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/projects`);
        setProjects(response.data); // pastiin struktur data nya sesuai
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCardClick = (projectId) => {
    navigate("/Project", { state: { projectId: projectId } });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/projects/${selectedProjectId}`);
      alert("Project deleted successfully!");
      // Optional: Refresh the list or remove the deleted project from state
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project.");
    }
    setShowPopup(false); // Hide pop-up after delete
    window.location.reload();
  };

  const handleTripleDotClick = (e, projectId) => {
    e.stopPropagation(); // Prevent card click event
    const { top, left, height } = e.target.getBoundingClientRect(); // Get the position of the triple dot
    setPopupPosition({ top: top + height + 280, left: left - 2 }); // Adjust pop-up position relative to the icon
    setSelectedProjectId(projectId);
    setShowPopup(true); // Tampilkan pop-up saat triple dot di klik
  };

  const handleCancel = (e) => {
    e.preventDefault(); // Prevent redirect or default action
    setShowPopup(false); // Close the pop-up
  };
  return (
    <>
      {loading && <Spinner />}
      <NavbarBlue />
      <div className="content-layout">
        <p>Pilih template proyek atau berkas satuan</p>
        {/* start card new project & new File UI */}
        <div className="card-file-layout">
          <div className="card-style-dashed">
            <img src={LogoProject} alt="project-icon" />
            <div className="button-style" onClick={() => setModalOpen(true)}>
              NEW PROJECT
            </div>
          </div>
        </div>
        <ModalNewProject isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        {/* end card new project & new File UI */}
        <div className="riwayat-text-layout">
          <p>Riwayat proyek dan dokumen</p>
          <Link to="/History">
            <div className="riwayat-text">Riwayat &gt;</div>
          </Link>
        </div>

        <div className="separator-grey">
          <p>Proyek</p>
          <div className="separator-bar"></div>
        </div>
        {/* Card history */}
        <div className="history-layout-home">
          {!loading &&
            currentProjects.map((project, index) => (
              <div className="card-history-home" key={index} onClick={() => handleCardClick(project.id)}>
                <img src={ImageGroup} alt="project-history" />

                <div className="info-box">
                  <div className="text-and-option">
                    <p>{project.project_name}</p>
                    <img src={TripleDot} alt="triple dot" onClick={(e) => handleTripleDotClick(e, project.id)} />
                  </div>
                  <div className="date-home">
                    <p>{project.createdAt}</p>
                  </div>
                </div>
              </div>
            ))}

          {/* Conditional Pop-up for delete */}
          {showPopup && selectedProjectId && (
            <div
              className="popup"
              style={{
                top: `${popupPosition.top}px`,
                left: `${popupPosition.left}px`,
                position: "absolute", // Pop-up tetap di posisi tetap relatif ke screen
                transition: "top 0.3s ease-out", // Animasi perpindahan pop-up
                width: "120px", // Sesuaikan lebar pop-up
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Efek bayangan pada pop-up
                backgroundColor: "white",
                zIndex: "1000", // Pop-up di atas konten lainnya
              }}
            >
              <div className="popup-content" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => handleCardClick(selectedProjectId)}>Edit</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        {/* end of Card History */}
      </div>
      {totalPages > 1 && (
        <div className="pagination-home">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="pagination-arrow">
            <img src={arrowPrevious} alt="arrow-prev" />
          </button>

          <span className="pagination-info">
            Halaman {currentPage} dari {totalPages}
          </span>

          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="pagination-arrow">
            <img src={arrowNext} alt="arrow-next" />
          </button>
        </div>
      )}
    </>
  );
};

export default HomePage;

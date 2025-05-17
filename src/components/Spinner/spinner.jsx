import "./spinner.css"; // buat style spinner-nya

const Spinner = () => {
  return (
    <>
      <div className="overlay">
        <div className="spinner"></div>
      </div>
    </>
  );
};

export default Spinner;

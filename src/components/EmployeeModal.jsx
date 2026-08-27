const EmployeeModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <img
          className="modal-image"
          src={employee.image}
          alt={employee.firstName}
        />

        <h2>
          {employee.firstName} {employee.lastName}
        </h2>

        <div className="details">
          <p>
            <strong>Email:</strong> {employee.email}
          </p>

          <p>
            <strong>Phone:</strong> {employee.phone}
          </p>

          <p>
            <strong>Age:</strong> {employee.age}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {employee.company?.department || "N/A"}
          </p>

          <p>
            <strong>Company:</strong>{" "}
            {employee.company?.name || "N/A"}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {employee.address?.address},{" "}
            {employee.address?.city},{" "}
            {employee.address?.state}
          </p>

          <p>
            <strong>Postal Code:</strong>{" "}
            {employee.address?.postalCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;

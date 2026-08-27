import { useEmployees } from "../context/EmployeeContext";

const EmployeeCard = ({ employee, onClick }) => {
  const { favorites, toggleFavorite } = useEmployees();

  const isFavorite = favorites.includes(employee.id);

  return (
    <div className="employee-card" onClick={onClick}>
      <div className="card-header">
        <img
          src={employee.image}
          alt={`${employee.firstName} ${employee.lastName}`}
        />

        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(employee.id);
          }}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <div className="employee-info">
        <h3>
          {employee.firstName} {employee.lastName}
        </h3>

        <p>{employee.email}</p>

        <p>{employee.phone}</p>

        <p>
          <strong>Department:</strong>{" "}
          {employee.company?.department || "N/A"}
        </p>

        <p>
          <strong>Age:</strong> {employee.age}
        </p>

        <span className="status">Active</span>
      </div>
    </div>
  );
};

export default EmployeeCard;


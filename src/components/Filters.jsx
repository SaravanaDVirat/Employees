const Filters = ({
  department,
  setDepartment,
  view,
  setView,
  departments,
}) => {
  return (
    <div className="filters">
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="All">All Departments</option>

        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <select value={view} onChange={(e) => setView(e.target.value)}>
        <option value="all">All Employees</option>
        <option value="favorites">Favorites</option>
      </select>
    </div>
  );
};

export default Filters;

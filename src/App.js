import { useEffect, useMemo, useState } from "react";

import { useEmployees } from "./context/EmployeeContext";

import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeModal from "./components/EmployeeModal";

import "./App.css";

function App() {
  const {
    employees,
    favorites,
    loading,
    error,
  } = useEmployees();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [department, setDepartment] = useState("All");
  const [view, setView] = useState("all");

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);
  const departments = useMemo(() => {
    return [
      ...new Set(
        employees
          .map((employee) => employee.company?.department)
          .filter(Boolean)
      ),
    ];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const fullName =
        `${employee.firstName} ${employee.lastName}`.toLowerCase();

      const email = employee.email.toLowerCase();

      const searchText = debouncedSearch.toLowerCase();

      const matchesSearch =
        fullName.includes(searchText) ||
        email.includes(searchText);

      const employeeDepartment =
        employee.company?.department;

      const matchesDepartment =
        department === "All" ||
        employeeDepartment === department;

      const matchesFavorite =
        view === "all" ||
        favorites.includes(employee.id);

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesFavorite
      );
    });
  }, [
    employees,
    debouncedSearch,
    department,
    view,
    favorites,
  ]);

  if (loading) {
    return (
      <div className="center-message">
        <h2>Loading employees...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="center-message error">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Employee Management</h1>
          <p>Manage and view employees</p>
        </div>

        <div className="employee-count">
          {filteredEmployees.length} Employees
        </div>
      </header>

      <div className="toolbar">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <Filters
          department={department}
          setDepartment={setDepartment}
          view={view}
          setView={setView}
          departments={departments}
        />
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="empty-state">
          <h2>No employees found</h2>
          <p>
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="employee-grid">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onClick={() =>
                setSelectedEmployee(employee)
              }
            />
          ))}
        </div>
      )}

      <EmployeeModal
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
}

export default App;

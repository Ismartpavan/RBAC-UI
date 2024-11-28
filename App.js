import React, { useState } from "react";
import "./style.css";

// Utility functions for validation and sanitization
const sanitizeInput = (input) => input.replace(/[^a-zA-Z0-9\s]/g, "").trim();
const validateUserForm = (form) => {
  if (!form.name.trim() || !form.role.trim()) return "Name and Role are required.";
  return null;
};
const validateRoleForm = (form) => {
  if (!form.name.trim()) return "Role name is required.";
  return null;
};

const App = () => {
  const [currentTab, setCurrentTab] = useState("users");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Predefined admin credentials
  const adminUsername = "admin";
  const adminPassword = "admin123";

  // User Management State
  const [users, setUsers] = useState([
    { id: 1, name: "Ram", role: "Admin", status: "Active" },
    { id: 2, name: "Krishna", role: "Editor", status: "Inactive" },
    
  ]);
  const [userForm, setUserForm] = useState({ id: null, name: "", role: "", status: "Active" });
  const [isEditingUser, setIsEditingUser] = useState(false);

  // Role Management State
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: { Read: true, Write: true, Delete: true } },
    { id: 2, name: "Editor", permissions: { Read: true, Write: true, Delete: false } },
  ]);
  const [roleForm, setRoleForm] = useState({
    id: null,
    name: "",
    permissions: { Read: false, Write: false, Delete: false },
  });
  const [isEditingRole, setIsEditingRole] = useState(false);

  // Search and Sorting State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Login Handler with validation
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if username or password is empty
    if (!username) {
      return alert("Please enter your username.");
    }

    if (!password) {
      return alert("Please enter your password.");
    }

    // Check if password is too short (assuming minimum 6 characters)
    if (password.length < 6) {
      return alert("Please enter the full password.");
    }

    // Check if credentials are correct
    if (username === adminUsername && password === adminPassword) {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect username or password. Please try again.");
    }
  };

  // User Management Handlers
  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleAddOrEditUser = async () => {
    const sanitizedForm = {
      ...userForm,
      name: sanitizeInput(userForm.name),
      role: sanitizeInput(userForm.role),
    };

    const error = validateUserForm(sanitizedForm);
    if (error) return alert(error);

    if (sanitizedForm.id) {
      setUsers((prev) => prev.map((u) => (u.id === sanitizedForm.id ? sanitizedForm : u)));
    } else {
      setUsers((prev) => [...prev, { ...sanitizedForm, id: Date.now() }]);
    }

    setUserForm({ id: null, name: "", role: "", status: "Active" });
    setIsEditingUser(false);
  };

  const handleEditUser = (user) => {
    setUserForm(user);
    setIsEditingUser(true);
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // Role Management Handlers
  const handleRoleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setRoleForm({ ...roleForm, permissions: { ...roleForm.permissions, [name]: checked } });
    } else {
      setRoleForm({ ...roleForm, [name]: value });
    }
  };

  const handleAddOrEditRole = async () => {
    const sanitizedForm = {
      ...roleForm,
      name: sanitizeInput(roleForm.name),
    };

    const error = validateRoleForm(sanitizedForm);
    if (error) return alert(error);

    if (sanitizedForm.id) {
      setRoles((prev) => prev.map((r) => (r.id === sanitizedForm.id ? sanitizedForm : r)));
    } else {
      setRoles((prev) => [...prev, { ...sanitizedForm, id: Date.now() }]);
    }

    setRoleForm({ id: null, name: "", permissions: { Read: false, Write: false, Delete: false } });
    setIsEditingRole(false);
  };

  const handleEditRole = (role) => {
    setRoleForm(role);
    setIsEditingRole(true);
  };

  const handleDeleteRole = (id) => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  // Search and Sort Users
  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));

  // If not logged in, show the login form
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>RBAC Management</h1>
      <div className="tabs">
        <button onClick={() => setCurrentTab("users")} className={currentTab === "users" ? "active" : ""}>
          Users
        </button>
        <button onClick={() => setCurrentTab("roles")} className={currentTab === "roles" ? "active" : ""}>
          Roles
        </button>
      </div>

      {currentTab === "users" ? (
        <div className="user-management">
          <h2>User Management</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <button onClick={() => handleEditUser(user)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>{isEditingUser ? "Edit User" : "Add User"}</h3>
          <input
            name="name"
            placeholder="User Name"
            value={userForm.name}
            onChange={handleUserFormChange}
          />
          <input
            name="role"
            placeholder="Role"
            value={userForm.role}
            onChange={handleUserFormChange}
          />
          <select
            name="status"
            value={userForm.status}
            onChange={handleUserFormChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button onClick={handleAddOrEditUser}>{isEditingUser ? "Update" : "Add"}</button>
        </div>
      ) : (
        <div className="role-management">
          <h2>Role Management</h2>
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>{Object.keys(role.permissions).filter((p) => role.permissions[p]).join(", ")}</td>
                  <td>
                    <button onClick={() => handleEditRole(role)}>Edit</button>
                    <button onClick={() => handleDeleteRole(role.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>{isEditingRole ? "Edit Role" : "Add Role"}</h3>
          <input
            name="name"
            placeholder="Role Name"
            value={roleForm.name}
            onChange={handleRoleFormChange}
          />
          <div className="permissions">
            {["Read", "Write", "Delete"].map((perm) => (
              <label key={perm}>
                <input
                  type="checkbox"
                  name={perm}
                  checked={roleForm.permissions[perm]}
                  onChange={handleRoleFormChange}
                />
                {perm}
              </label>
            ))}
          </div>
          <button onClick={handleAddOrEditRole}>{isEditingRole ? "Update" : "Add"}</button>
        </div>
      )}
    </div>
  );
};

export default App;

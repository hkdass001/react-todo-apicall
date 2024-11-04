import { useState, useEffect } from "react";
import "./UserTable.css";

const UserTable = () => {
  // State to store fetched users and new users
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch initial users from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    };

    fetchUserData();
  }, []);

  // Add new user to the table
  const addUser = () => {
    if (name.trim() && email.trim()) {
      const newUser = {
        id: users.length + 1, // Temporary ID
        name: name,
        email: email,
      };
      setUsers([...users, newUser]);
      setName("");
      setEmail("");
    }
  };

  // Delete a user by filtering them out of the users array
  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const usersPerPage = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const endIdx = currentPage * usersPerPage;
  const startIdx = endIdx - usersPerPage;
  const currentUsers = users.slice(startIdx, endIdx);

  const totalPage = Math.ceil(users.length / usersPerPage);

  const pageArr = [...Array(totalPage).keys()];

  return (
    <div>
      {/* Input fields for adding new user */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      {/* Table to display users */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>

        {pageArr.map((pno) => (
          <button
            key={pno + 1}
            onClick={() => paginate(pno + 1)}
            className={currentPage === pno + 1 ? "active" : ""}
          >
            {pno + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPage}
          onClick={() => paginate(currentPage + 1)}
        >
          Previous
        </button>
      </div>
    </div>
  );
};

export default UserTable;

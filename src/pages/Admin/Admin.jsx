import "./Admin.css";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { bringAllUsers, deleteUserAdmin } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { Modal } from "../../components/Modal/Modal";
import { userData } from "../userSlice.js";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    handleConfirm: () => {},
  });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const userRdxData = useSelector(userData);

  const token = userRdxData.credentials.token;
  const decoded = userRdxData.credentials.userData;

  const fetchUsers = useCallback(
    (params) => {
      return bringAllUsers(token, params)
        .then((res) => {
          const { results, ...resQuery } = res;
          setUsers(results);
          setQuery(resQuery);
        })
        .catch((err) => {
          console.error("bringAllUsers Error: ", err);
        });
    },
    [token]
  );

  useEffect(() => {
    if (!decoded?.userRoles?.includes("admin")) {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [decoded?.userRoles, navigate, fetchUsers]);

  const handleDeleteUser = useCallback(
    (thisUser) => {
      setModalData({
        title: "Confirm deletion",
        message: `${thisUser.id} - ${thisUser.email}`,
        handleConfirm: () => {
          deleteUserAdmin(token, thisUser.id)
            .then(() => {
              fetchUsers({ page: currentPage });
              setSelectedUser(null);
              setShowModal(false);
            })
            .catch(() => {
              setModalData({
                title: "Error while deleting user",
                message: "",
              });
            });
        },
      });
      setShowModal(true);
    },
    [currentPage, fetchUsers, token]
  );

  const handlePagination = useCallback(
    (page) => {
      setCurrentPage(page);
      fetchUsers({ page });
    },
    [fetchUsers]
  );

  return (
    <div className="admin-page">
      <div className="list">
        <div>
          {users.map((user) => (
            <div
              className="userRow"
              key={user.id}
              onClick={() => setSelectedUser(user)}
            >
              {user.email}
            </div>
          ))}
        </div>
        <div className="pagination-buttons-container">
          <button
            className="filters-button"
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            className="filters-button"
            onClick={() => handlePagination(currentPage + 1)}
            disabled={query?.skip < 10}
          >
            Next
          </button>
        </div>
      </div>
      <div className="userDetail">
        {selectedUser && (
          <>
            <div>
              <p>
                <b>id:</b> {selectedUser.id}
              </p>
            </div>
            <div>
              <p>
                <b>username: </b>
                {selectedUser.username}
              </p>
            </div>
            <div>
              <b>email: </b>
              {selectedUser.email}
            </div>
            <div style={{ marginTop: 20 }}>
              <button onClick={() => handleDeleteUser(selectedUser)}>
                Delete user
              </button>
            </div>
          </>
        )}
      </div>
      <Modal
        show={showModal}
        title={modalData.title}
        message={modalData.message}
        handleConfirm={modalData.handleConfirm}
        handleClose={() => setShowModal(false)}
        handleCancel={() => setShowModal(false)}
        confirmText={"Delete user"}
      />
    </div>
  );
};

// Search string not available in API
// const [searchString, setSearchString] = useState("");
// const handleSearchStringChange = (e) => {
//   setSearchString(e.target.value);
// };

// const handleSearch = () => {
//   fetchUsers()
// }
{
  /* <div className="search-input-container">
  <CustomInput
    placeholder={"buscar usuario"}
    type={"text"}
    name={"userFinder"}
    handler={handleSearchStringChange}
  ></CustomInput>
  <button
    className="filters-button"
    onClick={handleSearch}
  >
    Search
  </button>
</div> */
}

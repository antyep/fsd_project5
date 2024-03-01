import "./Admin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  bringAllUsers,
  bringFilteredUsers,
  bringUsersByRole,
  getUserById,
} from "../../services/apiCalls";
import { A } from "../../components/Accordion/Accordion.jsx";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import { viewUserDetail } from "../userDetailSlice.js";
import { CustomInput } from "../../components/CustomInput/CustomInput.jsx";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [finder, setFinder] = useState("");
  const [usuariosEncontrados, setUsuariosEncontrados] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);

  const token = userRdxData.credentials.token;
  const decoded = userRdxData.credentials.userData;
  const roles = ["USER", "DOCTOR", "ADMIN", "ROL FALSO PAL SELECT"];

  const deleteUserButtonHandler = (e) => {
    getUserById(token, e.target.id).then((res) => {
      console.log(res, "soy la respuesta del server");
      setSelectedUser(res);
      console.log(e.target.id);
    });
  };

  const inputHandler = (e) => {
    setFinder(e.target.value);
  };

  const roleFilterHandler = (e) => {
    const role = e.target.value;
    bringUsersByRole(role).then((res) => {
      setUsuariosEncontrados(res)
      console.log(res, 'soy res de bringUsersByRole');
    });
  };

  const megafiltradoHandler = (e) => {
    const role = e.target.value;
    const username = finder
    console.log(username, role, "estos son los datos en la vista ADMIN")
    bringFilteredUsers(username, role)
    .then((res) => {
      console.log(res)
      setUsuariosEncontrados(res)
    })
    .catch((err) => { console.log(err, ' el megafiltro nos ha fallado por última vez')})
  }

  const bringPaginatedUsers = (arg) => {
    bringAllUsers(page).then((res) => {
      setUsers(res);
      setCurrentPage();
    });
  };

  useEffect(() => {
    console.log(currentPage, " Página actual");
    if (currentPage < 1) {
      setCurrentPage(1);
    }
    bringAllUsers(currentPage)
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        console.error(console.log(res, "mi paginasion ta malita"), err);
      });
  }, [currentPage]);

  useEffect(() => {
    if (decoded.role !== "ADMIN") {
      navigate("/");
    } else {
      setTimeout(() => {
        bringAllUsers().then((res) => {
          console.log(res);
          setUsers(res);
        });
      }, 1000);
    }
  }, []);

  // //input con debounce
  // useEffect(() => {
  //   // si estamos tecleando en el buscador
  //   if (finder !== "") {
  //     // creamos un temporizador que filtrará los usuarios
  //     // (normalmente esto sería una llamada a BBDD) y los setea
  //     const filterUsers = setTimeout(() => {
  //       const found = users.filter((user) => user.name.includes(finder));
  //       setUsuariosEncontrados(found);
  //     }, 1000);
  //     // preparamos un return con una función que borra el temporizador anterior.
  //     // como está en el return de un useEffect, se ejecutará la próxima vez
  //     // que se ejecute el useEffect
  //     return () => clearTimeout(filterUsers);
  //     // si no estamos buscando nada, se traen todos los usuarios con normalidad
  //   } else {
  //     setUsuariosEncontrados([]);
  //   }
  // }, [finder]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="adminDesign">
      <div className="userList">
        <div className="filterDesign">
          <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
          <CustomInput
            placeholder={"buscar usuario"}
            type={"text"}
            name={"userFinder"}
            handler={inputHandler}
          ></CustomInput>
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
        {usuariosEncontrados.length > 0 ? (
          <>
            {usuariosEncontrados.map((user) => {
              return (
                <div className="userRow" key={user._id}>
                  <A
                    name={user.name}
                    key={user._id}
                    email={user.email}
                    role={user.role}
                    id={user._id}
                    handler={deleteUserButtonHandler}
                  ></A>
                </div>
              );
            })}
          </>
        ) : users.length > 0 ? (
          <>
            {users.map((user) => {
              return (
                <div className="userRow" key={user._id}>
                  <A
                    name={user.name}
                    key={user._id}
                    email={user.email}
                    role={user.role}
                    id={user._id}
                    handler={deleteUserButtonHandler}
                  ></A>
                </div>
              );
            })}
          </>
        ) : (
          <img src="../../../public/loading.gif"></img>
        )}
        <select className="form-select" onChange={(e) => megafiltradoHandler(e)}>
          <option>Selecciona un rol</option>
          {roles.map((rol, i) => {
            return (
              <option value={rol} key={i}>
                {rol}
              </option>
            );
          })}
        </select>
      </div>
      <div className="userDetail">
        <h3>
          Name: <span className="userDetailText">{selectedUser.name}</span>
        </h3>
        <h3>Lastname: {selectedUser.lastname}</h3>
        <h3>email: {selectedUser.email}</h3>
        <h3>phone: {selectedUser.phone}</h3>
        <h3>role: {selectedUser.role}</h3>
        <h3>created at: {Date(selectedUser.createdAt)}</h3>
      </div>
    </div>
  );
};

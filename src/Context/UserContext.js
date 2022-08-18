import { createContext, useState } from "react";
import axios from "axios";
export const UserContext = createContext();
const UserContextProvider = (props) => {
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    const response = await fetch("https://ms.stagingsdei.com:4011/user/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    // console.log(res.data.result[0].userId);
    setUsers(res.data.result);
  };
  const deleteUser = async (id) => {
    const response = await fetch(
      `https://ms.stagingsdei.com:4011/delete/user?userId=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //   console.log(response.stastatusCode);

    // console.log("2", id);
    console.log("userID deleted", id);
    // const json = response.json();
    const delUser = users.filter((user) => user.id !== id);
    setUsers(delUser);
  };

  //editand
  const updateUser = (id, updatedUser) => {
    //console.log("from context", updatedUser);

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));

    axios
      .post("https://ms.stagingsdei.com:4011/update/user", {
        userId: updatedUser.id,
        firstName: updatedUser.fname,
        lastName: updatedUser.lname,
        companyName: updatedUser.cname,
        email: updatedUser.email,
        phone: updatedUser.phone,
        userName: updatedUser.uname,
      })
      .then((response) => {
        console.log("hhh", response);
      })

      .catch((error) => {
        console.log(error);
      });

    // console.log("from btm", updatedUser.id);

    //console.log("from btm", updatedUser.fname);
  };

  return (
    <UserContext.Provider value={{ users, deleteUser, updateUser, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

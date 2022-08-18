import React from "react";
import UserContextProvider from "../../Context/UserContext";
import UserList from "./UserList";
export default function UserProvider() {
  return (
    <UserContextProvider>
      <UserList />
    </UserContextProvider>
  );
}

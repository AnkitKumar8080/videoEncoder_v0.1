import React from "react";
import UserContext from "./UserContext";

export default function UserContextProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [metadata, setMetadata] = React.useState(null);
  return (
    <UserContext.Provider value={{ user, setUser, metadata, setMetadata }}>
      {children}
    </UserContext.Provider>
  );
}

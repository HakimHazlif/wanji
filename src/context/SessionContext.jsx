import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

function SessionProvider({ children }) {
  const [email, setEmail] = useState("");

  return (
    <SessionContext.Provider
      value={{
        email,
        setEmail,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context)
    throw new Error("SessionContext was used outside of SessionProvider");

  return context;
}

export default SessionProvider;

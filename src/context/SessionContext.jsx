import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { IoWarning } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useListsContext } from "./ListsContext";
import { logout } from "../features/authentication/api/apiAuth";

const SessionContext = createContext();

function SessionProvider({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setItemsStatusMap } = useListsContext();
  const [email, setEmail] = useState("");
  const { isLoggedIn } = useSelector((state) => state.user);

  const handleLoginAction = (handleSuccess) => {
    if (isLoggedIn) handleSuccess();
    else
      toast.custom(
        () => (
          <div className="bg-[#faf7f5] text-yellow-600 py-4 px-6 rounded-lg shadow-lg text-base max-w-[500px] font-medium flex gap-2 items-center">
            <IoWarning size={25} />
            <span>Please sign in to access this feature</span>
          </div>
        ),
        {
          duration: 6000,
          position: "top-center",
        }
      );
  };

  function handleLogOut(onClose) {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/");
        onClose();
        setItemsStatusMap({
          movie: new Map(),
          tv: new Map(),
          episode: new Map(),
        });
      });
  }

  return (
    <SessionContext.Provider
      value={{
        email,
        setEmail,
        handleLoginAction,
        handleLogOut,
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

import { useSelector } from "react-redux";

const UserSide = () => {
  const { user, isLoggedin } = useSelector((state) => state.user);

  return <aside className=""></aside>;
};

export default UserSide;

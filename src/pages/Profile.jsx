import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { bgPopcorn } from "../assets/icons";
import { updateDateFormat } from "../utils/helper";
import { useLists } from "../features/lists/useLists";
import HeaderBackDrop from "../ui/HeaderBackDrop";
import ProfileHeader from "../components/ProfileHeader";

const Profile = () => {
  return (
    <main>
      <HeaderBackDrop
        backdrop={bgPopcorn}
        alt="User backdrop"
        height="h-[400px]"
      />

      <ProfileHeader />
    </main>
  );
};

export default Profile;

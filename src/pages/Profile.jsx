import { bgPopcorn } from "../assets/icons";
import HeaderBackDrop from "../ui/HeaderBackDrop";
import ProfileHeader from "../components/ProfileHeader";
import ProfileLists from "../components/ProfileLists";

const Profile = () => {
  return (
    <main>
      <HeaderBackDrop
        backdrop={bgPopcorn}
        alt="User backdrop"
        height="h-[400px]"
      />

      <ProfileHeader />
      <ProfileLists />
    </main>
  );
};

export default Profile;

import { bgPopcorn } from "../assets/icons";
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

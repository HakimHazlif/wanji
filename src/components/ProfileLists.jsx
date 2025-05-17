import ProfileCustomLists from "./ProfileCustomLists";
import ProfileReviews from "../features/reviews/components/ProfileReviews";
import ProfileList from "./ProfileList";

const ProfileLists = () => {
  return (
    <section className="padding-x">
      <ProfileList listName="ratings" />
      <ProfileList listName="watchlist" />
      <ProfileList listName="favorites" />
      <ProfileCustomLists />
      <ProfileReviews />
    </section>
  );
};

export default ProfileLists;

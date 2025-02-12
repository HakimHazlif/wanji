import SpinnerMini from "../ui/SpinnerMini";
import { useDispatch, useSelector } from "react-redux";
import { BiUpload } from "react-icons/bi";
import { useState } from "react";
import { updateProfile } from "../services/apiAuth";
import { useNavigate } from "react-router";
import UserAvatar from "../ui/UserAvatar";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  const { uid, username, bio, avatar } = useSelector(
    (state) => state.user.user
  );

  console.log(avatar);

  const [userData, setUserData] = useState({
    username,
    bio,
    avatar: null,
  });
  const [error, setError] = useState("");

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setError("File size must be less than 25MB");
        setUserData((prev) => ({
          ...prev,
          avatar,
        }));
        return;
      }

      setUserData((prev) => ({
        ...prev,
        avatar: file,
      }));
      setError("");
    }
  }

  function handleTextCange(e, lable) {
    const { value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [lable]: value,
    }));
  }

  function handleSaveUserData(e) {
    e.preventDefault();

    const usernameInput =
      userData.username.trim() === ""
        ? username.trim()
        : userData.username.trim();
    const bioInput = userData.bio.trim();
    const avatarInput = userData.avatar;

    if (uid) {
      dispatch(updateProfile(usernameInput, bioInput, avatarInput));

      navigate(`/u/${username.replace(" ", "-")}`);
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Profile Settings</h2>
      <p className="text-gray-400 mb-8">
        Update your username or bio to let people know a little bit about you
      </p>
      <form className="space-y-6" onSubmit={handleSaveUserData}>
        <div className="mb-8 w-full flex items-center gap-4">
          <UserAvatar size="w-[100px] h-[100px]" textSize="text-5xl" />

          <div className="flex flex-col items-center gap-3 py-4 px-10 flex-1 bg-bluish-black border border-slate-400 rounded-lg shadow-lg">
            <p className="text-sm text-gray-400">
              Upload an image with a max size of 25MB.
            </p>

            <label
              htmlFor="file-upload"
              className="flex gap-2 items-center justify-center font-medium py-2 px-8 hover:bg-slate-600 bg-slate-700 duration-200 transition-colors rounded-full cursor-pointer"
            >
              <BiUpload className="w-5 h-5" /> Select a file
            </label>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={status === "loading"}
            />

            {error ? (
              <p className="text-sm text-strawberry">{error}</p>
            ) : (
              userData.avatar && (
                <p className="text-sm text-gray-300">{userData.avatar.name}</p>
              )
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-200"
          >
            Username
          </label>
          <input
            type="text"
            value={userData.username}
            onChange={(e) => handleTextCange(e, "username")}
            name="username"
            id="username"
            className="mt-2 block w-full px-3 py-2  bg-bluish-black border border-slate-400 outline-none rounded-lg shadow-sm focus:border-orange-coral transition-colors"
            disabled={status === "loading"}
          />
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-200 "
          >
            Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            value={userData.bio}
            onChange={(e) => handleTextCange(e, "bio")}
            rows={4}
            className="mt-2 block w-full px-3 py-2  bg-bluish-black border border-slate-400 outline-none rounded-lg shadow-sm focus:border-orange-coral transition-colors"
            disabled={status === "loading"}
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-3 w-full text-gray-800 font-medium rounded-lg bg-orange-amber transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {status === "loading" ? <SpinnerMini size={25} /> : "Save Changes"}
        </button>
      </form>
    </section>
  );
};

export default ProfileEdit;

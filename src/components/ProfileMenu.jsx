import ProfileElements from "./ProfileElement";
import { profileMenuElements } from "../constants/uiElements";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ProfileMenu = ({ setHandle }) => {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const { avatar, username, email } = user;

  return (
    <div
      className="absolute z-30 right-0 top-0 w-screen h-screen cursor-default transparental-black"
      onClick={setHandle}
    >
      <aside className="bg-white absolute right-28 top-16 z-40 text-black w-[300px] max-w-[380px] min-w-[200px]  rounded-lg py-3 px-3">
        <div className="flex gap-4 justify-start items-center px-3 pt-3 pb-4">
          <div className="bg-orange-coral w-11 h-11 rounded-full flex justify-center items-center relative">
            {avatar ? (
              <img src={avatar} alt="avatar" />
            ) : (
              <i className="fa-solid fa-user text-xl"></i>
            )}
            {isLoggedIn && (
              <div className="absolute w-[10px] h-[10px] bg-green-500 rounded-full bottom-[4px] right-0"></div>
            )}
          </div>
          <div>
            <p className="font-bold text-xl">{username}</p>
            <p className="text-slate-500 font-medium text-sm">{email}</p>
          </div>
        </div>
        <>
          {profileMenuElements.map((item, index) => (
            <ul key={index}>
              {index < profileMenuElements.length && (
                <hr className="border-[1.5px] my-2" />
              )}
              {item.map((element) => (
                <ProfileElements
                  key={element.id}
                  icon={element.iconSVG}
                  route={element.route}
                  itemName={element.name}
                />
              ))}
            </ul>
          ))}
        </>
      </aside>
    </div>
  );
};

export default ProfileMenu;

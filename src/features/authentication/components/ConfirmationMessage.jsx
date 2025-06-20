import { messageIconSvg } from "../../../constants/uiElements";
import { useSession } from "../../../context/SessionContext";

const ConfirmationMessage = () => {
  const { email } = useSession();

  return (
    <div className="flex flex-col text-center justify-center items-center gap-5 py-8 lg:px-36 md:px-32 sm:px-28 xs:px-20 px-14">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        id="Send-Email-Paper-Plane-1--Streamline-Freehand"
        height="50"
        width="50"
      >
        {messageIconSvg.map((el, index) => (
          <path key={index} fill={el.fill} d={el.d} strokeWidth="1"></path>
        ))}
      </svg>
      <h3 className="text-orange-coral text-3xl font-bold">Check your email</h3>
      <p className="text-slate-500 text-center">
        We&apos;ve sent instructions on how to reset your password to{" "}
        <span className="text-black font-semibold">{`${email}`}</span>
      </p>
    </div>
  );
};

export default ConfirmationMessage;

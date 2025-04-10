import { bgPopcorn } from "../assets/icons";

const HeaderBackDrop = ({
  backdrop = null,
  alt = "wanji backdrop",
  height = "h-[600px]",
}) => {
  return (
    <div className="absolute top-0 right-0 w-full -z-10">
      <img
        src={backdrop ? backdrop : bgPopcorn}
        alt={alt}
        className={`${height} w-full object-cover object-center masking`}
      />
      <div className="bg-[#272831] opacity-60 masking h-[600px] w-full absolute bottom-0 right-0 z-10"></div>
    </div>
  );
};

export default HeaderBackDrop;

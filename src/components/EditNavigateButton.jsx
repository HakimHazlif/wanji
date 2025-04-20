import { useTransitionNavigate } from "../hooks/useTransitionNavigate";

const EditNavigateButton = ({
  navigateLink,
  children,
  style = "py-[10px] px-8 bg-bluish-black hover:bg-bluish-black/50",
}) => {
  const { transitionNavigate, isPending } = useTransitionNavigate();

  return (
    <button
      className={`flex gap-2 items-center justify-center font-medium ${style} duration-200 transition-colors rounded-full lg:text-base md:text-sm text-xs`}
      disabled={isPending}
      onClick={() => transitionNavigate(navigateLink)}
    >
      {children}
    </button>
  );
};

export default EditNavigateButton;

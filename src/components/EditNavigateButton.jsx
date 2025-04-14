import { useTransitionNavigate } from "../hooks/useTransitionNavigate";

const EditNavigateButton = ({ navigateLink, tooltipTitle, children }) => {
  const { transitionNavigate, isPending } = useTransitionNavigate();

  return (
    <button
      className="flex gap-2 items-center justify-center font-medium py-2 px-8 hover:bg-slate-600 bg-slate-700 duration-200 transition-colors rounded-full"
      disabled={isPending}
      onClick={() => transitionNavigate(navigateLink)}
    >
      {children}
    </button>
  );
};

export default EditNavigateButton;

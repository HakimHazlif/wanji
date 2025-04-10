import { useTransition } from "react";
import { useNavigate } from "react-router";

export function useTransitionNavigate() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const transitionNavigate = (to, options) => {
    startTransition(() => navigate(to, options));
  };

  return { transitionNavigate, isPending };
}

import { useEffect } from "react";

export default function useClickOutside(refsWithSetters = []) {
  useEffect(() => {
    function handleClosePopup(e) {
      refsWithSetters.forEach(({ ref, setter }) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setter(false);
        }
      });
    }

    document.addEventListener("mousedown", handleClosePopup);

    return () => document.removeEventListener("mousedown", handleClosePopup);
  }, [refsWithSetters]);
}

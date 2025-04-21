import { useFormikContext } from "formik";

const SubmitionButton = ({ children }) => {
  const { isSubmitting } = useFormikContext();
  return (
    <button
      className="bg-orange-amber text-white font-semibold text-lg py-2 w-full rounded-xl my-4"
      type="submit"
      disabled={isSubmitting}
    >
      {children}
    </button>
  );
};

export default SubmitionButton;

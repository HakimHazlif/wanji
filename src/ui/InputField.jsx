import { ErrorMessage, Field, useFormikContext } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";

const InputField = ({
  id,
  label,
  icon = null,
  type,
  placeholder,
  forPassword = false,
  showPassword = null,
  setShowPassword = null,
}) => {
  const { errors, touched } = useFormikContext();

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <Field
          type={type}
          name={id}
          id={id}
          className={`block w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-2 border ${
            errors[id] && touched[id]
              ? "border-red-500"
              : "border-gray-300 dark:border-grayish-700"
          } rounded-md focus:outline-none focus:ring-neon-500 focus:border-neon-500 sm:text-sm`}
          placeholder={placeholder}
        />
        {forPassword && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5" />
              ) : (
                <FiEye className="h-5 w-5" />
              )}
            </button>
          </div>
        )}
      </div>
      <ErrorMessage
        name={id}
        component="div"
        className="mt-1 text-sm text-red-600"
      />
    </div>
  );
};

export default InputField;

import { useRef, useState } from "react";
import { useSession } from "../context/UserContext";

const InputText = ({ type, label, labelText, unmatchError = false }) => {
  const {
    user,
    emptyFields,
    isRegex,
    isValidLength,
    handleChangeUser,
    handleCancelError,
    isConfirmed,
  } = useSession();

  const hasError =
    emptyFields[label] ||
    (!isRegex && label === "email") ||
    (isValidLength && label === "password") ||
    (isConfirmed && label === "passwordConfirm");

  const inputValue = user[label];

  return (
    <div className="relative">
      <input
        className={`peer w-full px-3 py-2 text-lg rounded-md focus:outline-orange-amber ${
          hasError ? "bg-red-200 border-red" : "bg-orange-100 border-orange"
        }`}
        type={type}
        name={label}
        id={label}
        value={inputValue}
        onFocus={() => handleCancelError(label)}
        onChange={(e) => handleChangeUser(e, label)}
      />
      {emptyFields[label] && (
        <p className="mt-1 ml-2 text-sm text-strawberry">
          * This field is required
        </p>
      )}
      {unmatchError && (
        <p className="mt-1 ml-2 text-sm text-strawberry">
          * Passwords do not match. Please make sure they are the same.
        </p>
      )}
      {!isRegex && label === "email" && (
        <p className="mt-1 ml-2 text-sm text-strawberry">
          * Invalid email address. Please check if you are typing in the correct
          format.
        </p>
      )}
      {isValidLength && label === "password" && (
        <p className="mt-1 ml-2 text-sm text-strawberry">
          * Make sure your password contains at least 8 characters.
        </p>
      )}
      <label
        htmlFor={label}
        className={`absolute transform -translate-y-[50%] pointer-events-none transition-all duration-300 peer-focus:-top-[1px] peer-focus:left-4 ${
          hasError ? "text-strawberry" : "text-orange-600"
        } ${
          !user[label]
            ? hasError
              ? "left-2 top-[30%]"
              : "left-2 top-[50%]"
            : "top-0 left-4"
        }`}
      >
        <div className="w-full relative">
          <p className="ml-1">{labelText}</p>
          <div className="absolute h-5 w-[105%] top-0 -z-10">
            <div className={`w-full h-1/2`}></div>
            <div
              className={`w-[105%] h-1/2 ${
                hasError ? "bg-red-200" : "bg-orange-100"
              }`}
            ></div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default InputText;

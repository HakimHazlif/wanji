import { useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../ui/SpinnerMini";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";

const AccountEdit = () => {
  const { transitionNavigate } = useTransitionNavigate();
  const dispatch = useDispatch();
  const { error, user, status } = useSelector((state) => state.user);
  const { uid, email, username } = user;

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmedPassword: "",
  });
  const { oldPassword, newPassword, confirmedPassword } = passwords;
  const [errors, setErrors] = useState({
    oldPasswordError: "",
    newPasswordError: "",
    confirmedPasswordError: "",
  });
  const { oldPasswordError, newPasswordError, confirmedPasswordError } = errors;
  const [sendChange, setSendChang] = useState(false);

  function handleTextCange(e, label) {
    const { value } = e.target;

    setErrors((prev) => ({
      ...prev,
      [`${label}Error`]: "",
    }));

    setPasswords((prev) => ({
      ...prev,
      [label]: value,
    }));
  }

  function confirmNewPassword() {
    if (newPassword === confirmedPassword) return true;
    setErrors((prev) => ({
      ...prev,
      confirmedPasswordError:
        "The passwords do not match. Please make sure they are the same.",
    }));
    return false;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmedPassword) {
      const newErrors = {
        oldPasswordError: oldPassword === "" ? "This field is required" : "",
        newPasswordError: newPassword === "" ? "This field is required" : "",
        confirmedPasswordError:
          confirmedPassword === "" ? "This field is required" : "",
      };

      setErrors(newErrors);
      return;
    }

    if (newPassword.length < 8) {
      setErrors((prev) => ({
        ...prev,
        newPasswordError:
          "Please make sure your new password contains at least 8 characters.",
      }));
      return;
    }

    const isConfirmed = confirmNewPassword();

    if (isConfirmed && uid) {
      dispatch(updatePassword({ email, oldPassword, newPassword }));
      setSendChang(true);
    }
  }

  useEffect(() => {
    if (error)
      setErrors((prev) => ({
        ...prev,
        oldPasswordError:
          "Invalid Password. Please make sure you enter the correct one.",
      }));

    if (status === "succeeded" && sendChange) {
      transitionNavigate(`/u/${username.replace(" ", "-")}`);
      setSendChang(false);
    }
  }, [error, status, transitionNavigate, sendChange, username]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
      <p className="text-gray-400 mb-8">Update your password</p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="old-password"
            className="block text-sm font-medium text-gray-200"
          >
            Old Password
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => handleTextCange(e, "oldPassword")}
            name="old-password"
            id="old-password"
            className={`mt-2 block w-full px-3 py-2  bg-slate-800 border ${
              oldPasswordError ? "border-strawberry" : "border-slate-400"
            }  outline-none rounded-lg shadow-sm focus:border-orange-coral transition-colors`}
            disabled={status === "loading"}
          />
          {oldPasswordError && (
            <p className="text-sm text-strawberry ml-1 mt-1">
              {oldPasswordError}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-200"
          >
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => handleTextCange(e, "newPassword")}
            name="new-password"
            id="new-password"
            className={`mt-2 block w-full px-3 py-2  bg-slate-800 border ${
              newPasswordError ? "border-strawberry" : "border-slate-400"
            } outline-none rounded-lg shadow-sm focus:border-orange-coral transition-colors`}
            disabled={status === "loading"}
          />
          {newPasswordError && (
            <p className="text-sm text-strawberry ml-1 mt-1">
              {newPasswordError}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmed-password"
            className="block text-sm font-medium text-gray-200"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmedPassword}
            onChange={(e) => handleTextCange(e, "confirmedPassword")}
            name="confirmed-password"
            id="confirmed-password"
            className={`mt-2 block w-full px-3 py-2  bg-slate-800 border ${
              confirmedPasswordError ? "border-strawberry" : "border-slate-400"
            } outline-none rounded-lg shadow-sm focus:border-orange-coral transition-colors`}
            disabled={status === "loading"}
          />
          {confirmedPasswordError && (
            <p className="text-sm text-strawberry ml-1 mt-1">
              {confirmedPasswordError}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-3 w-full text-gray-800 font-medium rounded-lg bg-orange-amber transition-colors duration-200 flex items-center justify-center gap-2"
          disabled={status === "loading"}
        >
          {status === "loading" ? <SpinnerMini size={25} /> : "Save Changes"}
        </button>
      </form>
    </section>
  );
};

export default AccountEdit;

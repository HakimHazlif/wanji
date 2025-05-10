import { useState } from "react";
import { bgPopcorn } from "../assets/icons";
import { useCreateList } from "../features/userLists/hooks/useCreateList";
import SpinnerMini from "../ui/SpinnerMini";
import { useSelector } from "react-redux";
import { FiAlertCircle } from "react-icons/fi";
import { useQueryClient } from "react-query";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_NAME_LENGTH,
} from "../constants/inputRules";
import CancelButton from "../components/CancelButton";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";
import HeaderBackDrop from "../ui/HeaderBackDrop";

const CreateNewList = () => {
  const { transitionNavigate } = useTransitionNavigate();
  const queryClient = useQueryClient();
  const { uid, username } = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const { creatList, isLoading, error } = useCreateList();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "List name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "List name must be at least 3 characters";
    } else if (formData.name.length > MAX_NAME_LENGTH) {
      newErrors.name = `List name cannot exceed ${MAX_NAME_LENGTH} characters`;
    }

    if (formData.description.length > MAX_DESCRIPTION_LENGTH) {
      newErrors.description = `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      creatList(
        {
          userId: uid,
          name: formData.name,
          description: formData.description,
        },
        {
          onSuccess: (data) => {
            queryClient.setQueryData(["lists"], (oldData) => {
              return oldData
                ? [...oldData, data.listData[0]]
                : [data.listData[0]];
            });
            transitionNavigate(
              `/u/${username.replace(" ", "-")}/Lists?listId=${
                data.listData[0].id
              }`,
              {
                replace: true,
              }
            );
          },
        }
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <main>
      <HeaderBackDrop backdrop={bgPopcorn} alt="backdrop" height="h-[400px]" />

      <section className="padding-x py-14">
        <div className="mb-20">
          <h2 className="font-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl mb-5">
            Create a new list
          </h2>
          <p className="font-medium text-gray-300 lg:text-base md:text-sm text-xs leading-relaxed">
            Create and customize lists to organize your movies and TV shows
            however you like. Whether by genre, mood, or theme, these lists give
            you full control over curating and managing your collection.
          </p>
        </div>

        <div>
          {error && (
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
              (
              <div className="max-w-2xl mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
                <div className="flex items-center gap-2 text-red-500">
                  <FiAlertCircle className="w-5 h-5" />
                  <span>
                    {error.message ||
                      "An error occurred while creating the list. Please try again."}
                  </span>
                </div>
              </div>
              )
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-200"
                >
                  List Name<span className="text-orange-coral ml-1">*</span>
                </label>
                <span
                  className={`text-sm ${
                    formData.name.length > MAX_NAME_LENGTH
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {formData.name.length}/{MAX_NAME_LENGTH}
                </span>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter a name for your list"
                maxLength={MAX_NAME_LENGTH}
                className={`block w-full p-3 bg-slate-800 border outline-none ${
                  errors.name ? "border-red-500" : "border-gray-600"
                } rounded-lg shadow-sm focus:ring-2 focus:ring-orange-coral focus:border-transparent transition-colors`}
              />
              {errors.name && (
                <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
                  {errors.name}
                </div>
              )}
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-200"
                >
                  Description <span className="text-gray-400">(Optional)</span>
                </label>
                <span
                  className={`text-sm ${
                    formData.description.length > MAX_DESCRIPTION_LENGTH
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {formData.description.length}/{MAX_DESCRIPTION_LENGTH}
                </span>
              </div>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe what kind of items this list will contain"
                maxLength={MAX_DESCRIPTION_LENGTH}
                className={`block w-full p-3 bg-slate-800 border outline-none ${
                  errors.description ? "border-red-500" : "border-gray-600"
                } rounded-lg shadow-sm focus:ring-2 focus:ring-orange-coral focus:border-transparent transition-colors`}
              />
              {errors.description && (
                <div className="mt-2 flex items-center gap-2 text-red-500">
                  <span className="text-sm">{errors.description}</span>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <CancelButton />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 md:py-3 py-2 text-gray-800 font-medium rounded-lg bg-orange-amber transition-colors duration-200 flex items-center justify-center gap-2 md:text-base text-sm"
              >
                {isLoading ? <SpinnerMini size={25} /> : "Create List"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateNewList;

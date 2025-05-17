import { useEffect, useRef, useState } from "react";
import { useReview } from "../hooks/useReview";
import { useAddReview } from "../hooks/useAddReview";
import { useUpdateReview } from "../hooks/useUpdateReview";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import ReviewPopupHeader from "./ReviewPopupHeader";
import ReviewInput from "./ReviewInput";
import WatchedDateInputs from "./WatchedDateInputs";
import { useDeleteReview } from "../hooks/useDeleteReview";
import DeleteListConfirm from "../../../ui/DeleteListConfirm";
import SpinnerMini from "../../../ui/SpinnerMini";

const ReviewPopup = ({
  show,
  type,
  onClose,
  triggerRef,
  forUpdateReview = false,
}) => {
  const { uid } = useSelector((state) => state.user.user);
  const { userReview } = useReview();
  const { addReview, isLoading: isAdding } = useAddReview();
  const { updateReview, isLoading: isUpdating } = useUpdateReview();
  const { deleteReview, isLoading: isDeleting } = useDeleteReview();

  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);

  const [reviewInput, setReviewInput] = useState(userReview?.review || "");
  const [watchedDate, setWatchedDate] = useState(
    userReview?.watched_date || {
      startedDate: "",
      finishedDate: "",
    }
  );
  const [rewatchedDates, setRewatchedDates] = useState(
    userReview?.rewatched_dates || []
  );
  const [containsSpoilers, setContainsSpoilers] = useState(
    userReview?.has_spoiler || false
  );

  const modalRef = useRef(null);

  function handleDeleteReview() {
    const query = { itemId: show?.id, type, userId: uid };

    if (uid && query.itemId && forUpdateReview) {
      deleteReview(query, {
        onSuccess: () => {
          setIsDeleteConfirmation(false);
          onClose();
        },
      });
    }
  }

  function handleSubmit() {
    const query = {
      itemId: show?.id,
      type,
      review: reviewInput,
      userId: uid,
      parentId: null,
      season: null,
      episode: null,
      watchedDate,
      rewatchedDates,
      hasSpoiler: containsSpoilers,
    };

    if (uid && reviewInput !== "") {
      if (!forUpdateReview) {
        addReview(query, { onSuccess: () => onClose() });
      }

      if (forUpdateReview) {
        updateReview(query, { onSuccess: () => onClose() });
      }
    }
  }

  function setToday(label, index = null) {
    const today = new Date().toISOString().split("T")[0];

    if (index === null) {
      setWatchedDate({
        ...watchedDate,
        [label]: today,
      });
      return;
    }

    const updatedDates = [...rewatchedDates];
    updatedDates[index] = {
      ...updatedDates[index],
      [label]: today,
    };
    setRewatchedDates(updatedDates);
  }

  function addRewatchedDate() {
    setRewatchedDates([
      ...rewatchedDates,
      {
        startedDate: "",
        finishedDate: "",
      },
    ]);
  }

  function handleDateChange(e, label, index = null) {
    if (index === null) {
      setWatchedDate({
        ...watchedDate,
        [label]: e.target.value,
      });
      return;
    }

    const updatedDates = [...rewatchedDates];
    updatedDates[index] = {
      ...updatedDates[index],
      [label]: e.target.value,
    };
    setRewatchedDates(updatedDates);
  }

  function removeRewatchedDate(index) {
    setRewatchedDates(rewatchedDates.filter((_, i) => i !== index));
  }

  useEffect(() => {
    function handleClickOutsite(e) {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        onClose(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsite);

    return () => document.removeEventListener("mousedown", handleClickOutsite);
  }, [onClose, triggerRef]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div
        ref={modalRef}
        className="rounded-xl bg-bluish-black py-4 px-5 absolute z-40 w-full h-full mx-4 max-h-[90vh] xl:max-w-[70vw] lg:max-w-[80vw] sm:max-w-[85vw] max-w-[90vw] overflow-y-auto scrollbar-custom"
      >
        <div className="flex justify-between items-center mb-6 pl-4">
          <h2 className="text-2xl font-semibold">Your Review</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200"
          >
            <IoClose size={30} />
          </button>
        </div>

        <ReviewPopupHeader show={show} />

        <ReviewInput
          reviewInput={reviewInput}
          setReviewInput={setReviewInput}
          containsSpoilers={containsSpoilers}
          setContainsSpoilers={setContainsSpoilers}
        />

        <div className="py-2 pb-4 sm:px-4 px-1 border-b border-slate-700">
          <div className="mb-3">
            <h3 className="font-medium">Dates Watched</h3>
            <p className="text-sm text-slate-400">
              Now you can track all the times you have watched a {type}.
            </p>
          </div>
          <div className="my-4">
            <h4 className="text-sm font-medium text-slate-300 mb-2">
              Watched Date (Optional)
            </h4>
            <WatchedDateInputs
              startedValue={watchedDate.startedDate}
              finishedValue={watchedDate.finishedDate}
              handleChange={handleDateChange}
              setToday={setToday}
              type={type}
            />
          </div>

          {rewatchedDates.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium text-slate-300">
                Rewatched Dates (Optional)
              </h4>
              <div className="flex flex-wrap gap-3 mt-2">
                {rewatchedDates.map((date, index) => (
                  <WatchedDateInputs
                    key={date}
                    startedValue={date.startedDate}
                    finishedValue={date.finishedDate}
                    handleChange={handleDateChange}
                    setToday={setToday}
                    removeDate={removeRewatchedDate}
                    type={type}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={addRewatchedDate}
            className="px-8 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-200 mt-2 "
          >
            Add Date
          </button>
        </div>

        <div className="py-4 sm:px-4 px-1 flex sm:flex-row flex-col gap-4 sm:justify-between ">
          <div className="flex sm:justify-start gap-3 max-sm:flex-1">
            <button
              onClick={handleSubmit}
              disabled={!reviewInput || isAdding || isUpdating}
              className="max-sm:w-3/5 px-6 py-2 bg-orange-amber text-gray-900 font-medium rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isAdding || isUpdating ? (
                <SpinnerMini />
              ) : forUpdateReview ? (
                "Update Review"
              ) : (
                "Add Review"
              )}
            </button>
            <button
              onClick={onClose}
              className="max-sm:w-2/5 px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-500 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Cancel
            </button>
          </div>
          {forUpdateReview && (
            <button
              onClick={() => setIsDeleteConfirmation(true)}
              className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-500 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Delete Review
            </button>
          )}
          {isDeleteConfirmation && (
            <DeleteListConfirm
              onClose={() => setIsDeleteConfirmation(false)}
              onDelete={handleDeleteReview}
              type="deleteReview"
              isDeleting={isDeleting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;

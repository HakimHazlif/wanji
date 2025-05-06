import SpinnerMini from "../ui/SpinnerMini";
import { useEffect, useState } from "react";
import { useRenameList } from "../features/userLists/hooks/useRenameList";
import EditButton from "./EditButton";
import { useSelector } from "react-redux";
import InputEditButton from "./InputEditButton";
import { ImPencil } from "react-icons/im";
import { MAX_DESCRIPTION_LENGTH } from "../constants/variables";

const EditingDescription = ({ list }) => {
  const { isLoading, renameList } = useRenameList();
  const { uid } = useSelector((state) => state.user.user);

  const [editingDescription, setEditingDescription] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  const handleDescriptionEdit = () => {
    setEditingDescription(true);
  };

  const handleDescriptionSave = () => {
    if (newDescription.trim() !== list?.description?.trim() && list?.id) {
      renameList(
        { userId: uid, listId: list?.id, newDescription },
        {
          onSuccess: () => {
            setEditingDescription(false);
          },
        }
      );
    } else {
      setEditingDescription(false);
    }
  };

  useEffect(() => {
    if (list?.id) {
      setNewDescription(list?.description);
    }
  }, [list?.id, list?.description]);

  return (
    <div className="flex items-center gap-4 mb-5">
      {editingDescription ? (
        <div className="flex sm:flex-row flex-col items-end gap-2 w-full mt-5">
          <div className="w-full">
            <div>
              <label htmlFor="list-name" className="hidden">
                List description
              </label>
              <p className="w-full text-gray-300 text-sm text-end pr-1">
                {newDescription.length} / {MAX_DESCRIPTION_LENGTH} character
              </p>
            </div>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              maxLength={MAX_DESCRIPTION_LENGTH}
              className="block w-full p-3 bg-slate-800 border outline-none rounded-lg shadow-sm focus:ring-2 focus:ring-orange-coral focus:border-transparent transition-colors md:text-lg sm:text-base text-sm"
              rows="3"
            />
          </div>

          <div className="flex gap-2">
            <InputEditButton
              handleClick={() => setEditingDescription(false)}
              isLoading={isLoading}
              backgroundColor="bg-slate-500"
              textColor="text-white"
              hover="hover:bg-slate-400"
            >
              Cancel
            </InputEditButton>
            <InputEditButton
              handleClick={handleDescriptionSave}
              isLoading={isLoading}
              backgroundColor="bg-amber-400"
              textColor="text-gray-800"
              hover="hover:bg-amber-300"
            >
              {isLoading ? <SpinnerMini /> : "Save"}
            </InputEditButton>
          </div>
        </div>
      ) : (
        <>
          {list?.description ? (
            <div className="flex items-end gap-2">
              <p className="font-sembold text-gray-300 mt-5 md:text-xl sm:text-lg text-base">
                {list?.description}
              </p>
              <EditButton
                handleEdit={handleDescriptionEdit}
                title="Update your description"
              >
                <ImPencil size={20} className="text-blue-500" />
              </EditButton>
            </div>
          ) : (
            <div className="font-sembold text-xl text-gray-300 mt-5">
              <EditButton
                handleEdit={handleDescriptionEdit}
                title="Describe your list"
              >
                <span>Add a description to your list</span>
                <ImPencil size={15} className="text-blue-500 mb-1" />
              </EditButton>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EditingDescription;

import SpinnerMini from "../ui/SpinnerMini";
import { useEffect, useState } from "react";
import { useRenameList } from "../features/userLists/hooks/useRenameList";
import EditButton from "./EditButton";
import { useSelector } from "react-redux";
import InputEditButton from "./InputEditButton";
import { ImPencil } from "react-icons/im";
import { MAX_NAME_LENGTH } from "../constants/variables";

const EditingName = ({ list }) => {
  const { isLoading, renameList } = useRenameList();
  const { uid } = useSelector((state) => state.user.user);

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");

  const handleNameEdit = () => {
    setEditingName(true);
  };

  const handleNameSave = () => {
    if (newName && newName.trim() !== list?.name?.trim() && list?.id) {
      renameList(
        { userId: uid, listId: list?.id, newName },
        {
          onSuccess: () => {
            setEditingName(false);
          },
        }
      );
    } else {
      setEditingName(false);
    }
  };

  useEffect(() => {
    if (list?.id) {
      setNewName(list?.name);
    }
  }, [list?.id, list?.name]);

  return (
    <div className="flex items-center gap-4 mb-5">
      {editingName ? (
        <div className="flex sm:flex-row flex-col items-end gap-2 w-full">
          <div>
            <div>
              <label htmlFor="list-name" className="hidden">
                List name
              </label>
              <p className="w-full text-gray-300 text-sm text-end pr-1">
                {newName.length} / {MAX_NAME_LENGTH} character
              </p>
            </div>
            <input
              type="text"
              id="list-name"
              name="list-name"
              value={newName}
              maxLength={MAX_NAME_LENGTH}
              onChange={(e) => setNewName(e.target.value)}
              className="block w-full px-3 py-1 md:text-4xl sm:text-3xl text-2xl bg-slate-800 border outline-none rounded-lg shadow-sm focus:ring-2 focus:ring-orange-coral focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <InputEditButton
              handleClick={() => setEditingName(false)}
              isLoading={isLoading}
              backgroundColor="bg-slate-500"
              textColor="text-white"
              hover="hover:bg-slate-400"
            >
              Cancel
            </InputEditButton>
            <InputEditButton
              handleClick={handleNameSave}
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
        <div className="flex items-end gap-5">
          <h2 className="font-bold md:text-5xl sm:text-4xl text-3xl">
            {list?.name}
          </h2>
          <EditButton title="Rename your list" handleEdit={handleNameEdit}>
            <ImPencil size={24} className="text-blue-500" />
          </EditButton>
        </div>
      )}
    </div>
  );
};

export default EditingName;

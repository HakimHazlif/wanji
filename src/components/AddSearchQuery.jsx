import { FaPlus } from "react-icons/fa";
import { getPictureUrlFormat } from "../utils/helper";
import { useAddShow } from "../features/lists/useAddShow";
import SpinnerMini from "../ui/SpinnerMini";
import { useQueryClient } from "react-query";

const AddSearchQuery = ({ show, list, onClose }) => {
  const queryClient = useQueryClient();
  // add uid check to not allow the user whos not register yet .. add toast
  const id = show?.id;
  const image = show?.poster_path;
  const title = show?.title || show?.name;
  const originalTitle = show?.original_title || show?.original_name;

  const category = show["title"] ? "movie" : "tv";

  const { addShow, isLoading } = useAddShow();

  function handleAddShowToList() {
    if (id && list?.id) {
      console.log(id);
      const alreadyExist = list?.items_list?.some((item) => {
        console.log(item.item_id);
        console.log(item.type);
        return Number(item.item_id) === id && item.type === category;
      });

      console.log(alreadyExist);

      if (!alreadyExist) {
        addShow(
          {
            id,
            listId: list?.id,
            type: category,
          },
          {
            onSuccess: () => {
              onClose();
            },
          }
        );
      } else {
        console.log(`This ${category} already exist in this list`);
      }
    }
  }

  return (
    <button
      className="flex items-center justify-between w-full px-5 py-2 hover:bg-slate-700 cursor-pointer"
      onClick={handleAddShowToList}
    >
      <div className="flex items-center gap-5">
        <img
          src={getPictureUrlFormat(image, 500)}
          alt="poster"
          className="h-[80px] w-auto"
        />
        <h4 className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
          {title}{" "}
          <span className="font-medium text-slate-700 text-sm">
            {originalTitle !== title && `(${originalTitle})`}
          </span>
        </h4>
      </div>

      {isLoading ? (
        <SpinnerMini size={30} />
      ) : (
        <FaPlus size={30} className="text-slate-600 ml-10" />
      )}
    </button>
  );
};

export default AddSearchQuery;

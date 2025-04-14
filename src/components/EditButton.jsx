const EditButton = ({ handleEdit, title, children = null }) => {
  return (
    <button onClick={handleEdit} className="py-1 flex items-end gap-3">
      {children}
    </button>
  );
};

export default EditButton;

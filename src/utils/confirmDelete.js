import Swal from "sweetalert2";

export const confirmDelete = async ({
  itemName = "item",
  onDelete, // function to call on confirmed deletion
  confirmButtonColor = "#3085d6",
  cancelButtonColor = "#d33",
}) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: `You won't be able to revert this ${itemName}!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText: `Yes, delete it!`,
  });

  if (result.isConfirmed) {
    await onDelete();
    Swal.fire("Deleted!", `Your ${itemName} has been deleted.`, "success");
  }
};

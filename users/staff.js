const cornerBtn = document.getElementById("staffManagement");
const deleteBtns = document.querySelectorAll(".delete-btn");
const actionBtns = document.querySelectorAll(".action-btn");

if (role === "Staff") {
  cornerBtn.style.display = "none";
  deleteBtns.forEach((btn) => {
    btn.setAttribute("disabled", true);
  });
  actionBtns.forEach((btn) => {
    btn.setAttribute("disabled", true);
  });
}

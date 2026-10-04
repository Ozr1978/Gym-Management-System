const staffMembers = JSON.parse(localStorage.getItem("allSystemsUsers")) || [];
const selectTrainer = document.getElementById("trainer");
const editSelectTrainer = document.getElementById("editTrainer");
const selectCoach = document.getElementById("selectCoach");
const editSelectedCoach = document.getElementById("editSelectCoach");
const coachName =
  JSON.parse(sessionStorage.getItem("current_user_name")) || null;
const body = document.querySelector("body");

const trainers = [];

for (let staff of staffMembers) {
  if (staff.role === "Coach") trainers.push(staff);
}

function trainersOptions(trainer) {
  return `<option value="${trainer.username}">${trainer.username}</option>`;
}

function trainersSelectOption(trainers) {
  for (let trainer of trainers) {
    editSelectTrainer.innerHTML += trainersOptions(trainer);
    selectTrainer.innerHTML += trainersOptions(trainer);
    selectCoach.innerHTML += trainersOptions(trainer);
    editSelectedCoach.innerHTML += trainersOptions(trainer);
  }
}

trainersSelectOption(trainers);
function applyCoachPermissions() {
  if (role === "Coach") {
    for (let i = 0; i < classesTableBody.children.length; i++) {
      const row = classesTableBody.children[i];
      const coachCell = row.children[1];

      if (coachCell.textContent !== `Coach ${coachName}`) {
        row
          .querySelector(".action-btn.edit-class-btn")
          .setAttribute("hidden", true);
        row.querySelector(".delete-btn").setAttribute("hidden", true);
        row.querySelector(".add-member-btn").setAttribute("hidden", true);
      }
    }
  }
}

applyCoachPermissions();

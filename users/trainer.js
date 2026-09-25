const staffMembers = JSON.parse(localStorage.getItem("allSystemsUsers")) || [];
const selectTrainer = document.getElementById("trainer");
const editSelectTrainer = document.getElementById("editTrainer");
const selectCoach = document.getElementById("selectCoach");
const editSelectedCoach = document.getElementById("editSelectCoach");

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

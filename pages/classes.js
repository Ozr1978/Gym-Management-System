const classesTableBody = document.getElementById("classesTableBody");
const classesData = JSON.parse(localStorage.getItem("classesData")) || [];
const addClassBtn = document.getElementById("addMemberBtn");
const addClassForm = document.getElementById("addClassForm");
const cancelAddClasseBtn = document.getElementById("cancelAddClasseBtn");
const classSearchInput = document.getElementById("classSearchInput");
const editClassContainer = document.getElementById("editClass-container");
const cancelEditClassBtn = document.getElementById("cancelEditClassBtn");
const saveEditClassBtn = document.getElementById("saveEditClassBtn");

// hidden form data
const className = document.getElementById("className");
const classTime = document.getElementById("classTime");
const classCoach = document.getElementById("classCoach");
const maxNumberOfMembers = document.getElementById("maxNumberOfMembers");

// hidden edit form data
const editClassName = document.getElementById("editClassName");
const editClassTime = document.getElementById("editClassTime");
const editClassCoach = document.getElementById("editClassCoach");
const editMaxNumberOfMembers = document.getElementById(
  "editMaxNumberOfMembers",
);

function classString(classObj) {
  return `
            <td class="user-name">${classObj.name}</td>
                <td class="class-time">${classObj.startTime}</td>
                <td>Coach ${classObj.coach}</td>
                <td class="class-booked">${classObj.enrolledMembers.length}</td>
                <td class="class-max">${classObj.maxCapacity}</td>
                <td><span class="${classObj.enrolledMembers < maxCapacity ? "badge status-active" : "badge status-inactive"}">Open</span></td>
                <td class="actions-cell">
                  <button
                    class="action-btn edit-class-btn"
                    title="Manage Class"
                  >
                    <svg
                      class="icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </button>
                  <button class="delete-btn" title="Delete">
                    <svg
                      class="icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </td>
          `;
}

function displayMembers() {
  for (let user of members) {
    let member = document.createElement("tr");
    member.setAttribute("id", user.name);
    member.innerHTML = memberString(user);

    classesTableBody.appendChild(member);
  }
}

function saveEditedMember(member) {
  const editedMember = {
    name: editClassName.value,
    membershipType: editClassTime.value,
    membershipStartDate: editClassCoach.value,
    membershipEndDate: editMaxNumberOfMembers.value,
    contactNumber: editContactNumber.value,
    trainer: editTrainer.value,
    status: member?.status,
  };
  let index;
  members.some((user) => {
    if (member.name === user.name) {
      index = members.indexOf(user);
      return true;
    }
  });
  members[index] = editedMember;
  localStorage.setItem("membersData", JSON.stringify(members));

  editClassContainer.setAttribute("hidden", true);
  document.getElementById(member.name).innerHTML = memberString(editedMember);
}

function addMember(
  name,
  membershipType,
  membershipStartDate,
  membershipEndDate,
  contactNumber,
  status,
  trainer,
) {
  const user = {
    name,
    membershipType,
    membershipStartDate,
    membershipEndDate,
    contactNumber,
    status,
    trainer,
  };
  members.push(user);
  localStorage.setItem("membersData", JSON.stringify(members));

  let member = document.createElement("tr");
  member.setAttribute("id", name);
  member.innerHTML = memberString(user);

  classesTableBody.appendChild(member);
}

classesTableBody.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  const editBtn = e.target.closest(".action-btn");
  if (deleteBtn) {
    const row = deleteBtn.closest("tr");
    const index = Array.from(classesTableBody.children).indexOf(row);

    members.splice(index, 1);
    localStorage.setItem("membersData", JSON.stringify(members));
    row.remove();
  } else if (editBtn) {
    const row = editBtn.closest("tr");
    const index = Array.from(classesTableBody.children).indexOf(row);
    const member = members[index];
    editClassContainer.removeAttribute("hidden");
    editClassName.value = member.name;
    editClassTime.value = member.membershipType;
    editClassCoach.value = member.membershipStartDate;
    editMaxNumberOfMembers.value = member.membershipEndDate;
    editContactNumber.value = member.contactNumber;
    editTrainer.value = member.trainer ? member.trainer : "No Trainer";
  }
});

addBtn.addEventListener("click", () => {
  addClassForm.removeAttribute("hidden");
});

cancelAddClasseBtn.addEventListener("click", () => {
  addClassForm.setAttribute("hidden", true);
  className.value = "";
  membershipType.value = "basic";
  membershipStartDate.value = "";
  membershipEndDate.value = "";
  contactNumber.value = "";
  trainer.value = "No Trainer";
});

addClassForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const startDate = new Date(membershipStartDate.value);
  const endDate = new Date(membershipEndDate.value);

  if (endDate - startDate <= 0) {
    alert("Enter A Valid date length");
    return;
  }

  addMember(
    className.value,
    membershipType.value,
    membershipStartDate.value,
    membershipEndDate.value,
    contactNumber.value,
    "active",
    trainer.value,
  );

  addClassForm.setAttribute("hidden", true);
  className.value = "";
  membershipType.value = "basic";
  membershipStartDate.value = "";
  membershipEndDate.value = "";
  contactNumber.value = "";
  trainer.value = "No Trainer";
});

classSearchInput.addEventListener("input", () => {
  const searchTerm = classSearchInput.value.toLowerCase();

  for (let i = 0; i < classesTableBody.children.length; i++) {
    if (
      !classesTableBody.children[i].children[0].textContent
        .toLowerCase()
        .includes(searchTerm)
    )
      classesTableBody.children[i].style.display = "none";
    else classesTableBody.children[i].style.display = "";
  }
});

cancelEditClassBtn.addEventListener("click", () => {
  editClassContainer.setAttribute("hidden", true);
});

saveEditClassBtn.addEventListener("click", () => {
  const row = document.getElementById(editClassName.value);
  const member = members.find((user) => user.name === row.id);
  saveEditedMember(member);
  editClassContainer.setAttribute("hidden", true);
});

displayMembers();

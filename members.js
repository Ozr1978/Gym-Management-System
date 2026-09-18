const membersTableBody = document.getElementById("membersTableBody");
const members = JSON.parse(localStorage.getItem("membersData")) || [];
const addBtn = document.getElementById("addMemberBtn");
const addMemberForm = document.getElementById("addMemberForm");
const cancelAddMemberBtn = document.getElementById("cancelAddMemberBtn");
const submitBtn = document.getElementById("sendFormDataBtn");
const memberSearchInput = document.getElementById("memberSearchInput");
const editContainer = document.getElementById("edit-container");
const cancelEditMemberBtn = document.getElementById("cancelEditMemberBtn");
const saveEditMemberBtn = document.getElementById("saveEditMemberBtn");

// hidden form data
const fullName = document.getElementById("memberName");
const membershipType = document.getElementById("membershipType");
const membershipStartDate = document.getElementById("membershipStartDate");
const membershipEndDate = document.getElementById("membershipEndDate");
const contactNumber = document.getElementById("contactNumber");
const status = document.getElementById("status");
const trainer = document.getElementById("trainer");
// hidden edit form data
const editMemberName = document.getElementById("editMemberName");
const editMembershipType = document.getElementById("editMembershipType");
const editMembershipStartDate = document.getElementById(
  "editMembershipStartDate",
);
const editMembershipEndDate = document.getElementById("editMembershipEndDate");
const editContactNumber = document.getElementById("editContactNumber");
const editTrainer = document.getElementById("editTrainer");

function memberString(member) {
  return `
            <td class="user-name">${member.name}</td>
            <td><span class="badge role-badge">${member.membershipType}</span></td>
            <td>${member.membershipStartDate}</td>
            <td>${member.membershipEndDate}</td>
            <td><span class="${member.status === "active" ? "badge status-active" : member.status === "expiring soon" ? "badge status-expiring" : "badge status-inactive"}">${member.status}</span></td>
            <td>${member.contactNumber}</td>
            <td>${member?.trainer === undefined ? "No Trainer" : member.trainer}</td>
            <td class="actions-cell">
              <button class="action-btn" title="Edit"><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
              <button class="delete-btn" title="Delete"><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
            </td>
          `;
}

function displayMembers() {
  for (let user of members) {
    let member = document.createElement("tr");
    member.setAttribute("id", user.name);
    member.innerHTML = memberString(user);

    membersTableBody.appendChild(member);
  }
}

function saveEditedMember(member) {
  const editedMember = {
    name: editMemberName.value,
    membershipType: editMembershipType.value,
    membershipStartDate: editMembershipStartDate.value,
    membershipEndDate: editMembershipEndDate.value,
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

  editContainer.setAttribute("hidden", true);
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

  membersTableBody.appendChild(member);
}

membersTableBody.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  const editBtn = e.target.closest(".action-btn");
  if (deleteBtn) {
    const row = deleteBtn.closest("tr");
    const index = Array.from(membersTableBody.children).indexOf(row);

    members.splice(index, 1);
    localStorage.setItem("membersData", JSON.stringify(members));
    row.remove();
  } else if (editBtn) {
    const row = editBtn.closest("tr");
    const index = Array.from(membersTableBody.children).indexOf(row);
    const member = members[index];
    editContainer.removeAttribute("hidden");
    editMemberName.value = member.name;
    editMembershipType.value = member.membershipType;
    editMembershipStartDate.value = member.membershipStartDate;
    editMembershipEndDate.value = member.membershipEndDate;
    editContactNumber.value = member.contactNumber;
    editTrainer.value = member.trainer ? member.trainer : "No Trainer";
  }
});

addBtn.addEventListener("click", () => {
  addMemberForm.removeAttribute("hidden");
});

cancelAddMemberBtn.addEventListener("click", () => {
  addMemberForm.setAttribute("hidden", true);
  fullName.value = "";
  membershipType.value = "basic";
  membershipStartDate.value = "";
  membershipEndDate.value = "";
  contactNumber.value = "";
  trainer.value = "No Trainer";
});

addMemberForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const startDate = new Date(membershipStartDate.value);
  const endDate = new Date(membershipEndDate.value);

  if (endDate - startDate <= 0) {
    alert("Enter A Valid date length");
    return;
  }

  addMember(
    fullName.value,
    membershipType.value,
    membershipStartDate.value,
    membershipEndDate.value,
    contactNumber.value,
    "active",
    trainer.value,
  );

  addMemberForm.setAttribute("hidden", true);
  fullName.value = "";
  membershipType.value = "basic";
  membershipStartDate.value = "";
  membershipEndDate.value = "";
  contactNumber.value = "";
  trainer.value = "No Trainer";
});

memberSearchInput.addEventListener("input", () => {
  const searchTerm = memberSearchInput.value.toLowerCase();

  for (let i = 0; i < membersTableBody.children.length; i++) {
    if (
      !membersTableBody.children[i].children[0].textContent
        .toLowerCase()
        .includes(searchTerm)
    )
      membersTableBody.children[i].style.display = "none";
    else membersTableBody.children[i].style.display = "";
  }
});

cancelEditMemberBtn.addEventListener("click", () => {
  editContainer.setAttribute("hidden", true);
});

saveEditMemberBtn.addEventListener("click", () => {
  const row = document.getElementById(editMemberName.value);
  const member = members.find((user) => user.name === row.id);
  saveEditedMember(member);
  editContainer.setAttribute("hidden", true);
});

displayMembers();

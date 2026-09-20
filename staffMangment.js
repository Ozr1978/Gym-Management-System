const staffTableBody = document.getElementById("staffTableBody");
const staffMembers = JSON.parse(localStorage.getItem("allSystemsUsers")) || [];
const addStaffBtn = document.getElementById("addStaffBtn");
const addStaffForm = document.getElementById("addStaffForm");
const cancelAddStaffBtn = document.getElementById("cancelAddStaffBtn");
const searchInput = document.getElementById("searchInput");
const editStaffContainer = document.getElementById("editStaff-container");
const cancelEditStaffBtn = document.getElementById("cancelEditStaffBtn");
const saveEditStaffBtn = document.getElementById("saveEditStaffBtn");

// hidden form data
const fullName = document.getElementById("staffName");
const staffRole = document.getElementById("staffRole");
const staffEmail = document.getElementById("staffEmail");
const staffNumber = document.getElementById("staffNumber");
const staffPassword = document.getElementById("staffPassword");
// hidden edit form data
const editStaffName = document.getElementById("editStaffName");
const editStaffRole = document.getElementById("editStaffRole");
const editStaffEmail = document.getElementById("editStaffEmail");
const editPhoneNumber = document.getElementById("editPhoneNumber");
const editPassword = document.getElementById("editPassword");

function staffString(staff) {
  return `
            <td class="user-name">${staff.name}</td>
            <td><span class="badge role-badge">${staff.membershipType}</span></td>
            <td>${staff.staffshipStartDate}</td>
            <td>${staff.staffshipEndDate}</td>
            <td><span class="${staff.status === "active" ? "badge status-active" : staff.status === "expiring soon" ? "badge status-expiring" : "badge status-inactive"}">${staff.status}</span></td>
            <td>${staff.contactNumber}</td>
            <td>${staff?.trainer === undefined ? "No Trainer" : staff.trainer}</td>
            <td class="actions-cell">
              <button class="action-btn" title="Edit"><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
              <button class="delete-btn" title="Delete"><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
            </td>
          `;
}

function displayStaff() {
  for (let staff of staffMembers) {
    let member = document.createElement("tr");
    member.setAttribute("id", staff.username);
    member.innerHTML = staffString(staff);

    staffTableBody.appendChild(member);
  }
}

function saveEditedStaff(staff) {
  const editedMember = {
    name: editStaffName.value,
    role: editStaffRole.value,
    email: editStaffEmail.value,
    number: editPhoneNumber.value,
    password: editPassword.value,
  };
  let index;
  staffMembers.some((user) => {
    if (staff.username === user.username) {
      index = staffMembers.indexOf(user);
      return true;
    }
  });
  staffMembers[index] = editedMember;
  localStorage.setItem("allSystemsUsers", JSON.stringify(staffMembers));

  editStaffContainer.setAttribute("hidden", true);
  document.getElementById(staff.username).innerHTML =
    memberString(editedMember);
}

function addMember(username, role, email, number, password) {
  const user = {
    username,
    email,
    role,
    number,
    password,
  };
  members.push(user);
  localStorage.setItem("allSystemsUsers", JSON.stringify(staffMembers));

  let member = document.createElement("tr");
  member.setAttribute("id", username);
  member.innerHTML = memberString(user);

  staffTableBody.appendChild(member);
}

staffTableBody.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  const editBtn = e.target.closest(".action-btn");
  if (deleteBtn) {
    const row = deleteBtn.closest("tr");
    const index = Array.from(staffTableBody.children).indexOf(row);

    staffMembers.splice(index, 1);
    localStorage.setItem("allSystemsUsers", JSON.stringify(staffMembers));
    row.remove();
  } else if (editBtn) {
    const row = editBtn.closest("tr");
    const index = Array.from(staffTableBody.children).indexOf(row);
    const member = staffMembers[index];
    editStaffContainer.removeAttribute("hidden");
    editStaffName.value = member.username;
    editStaffRole.value = member.role;
    editStaffEmail.value = member.email;
    editPhoneNumber = member.phone;
    editPassword = member.password;
  }
});

addStaffBtn.addEventListener("click", () => {
  addStaffForm.removeAttribute("hidden");
});

cancelAddStaffBtn.addEventListener("click", () => {
  addStaffForm.setAttribute("hidden", true);
  fullName.value = "";
  membershipType.value = "basic";
  membershipStartDate.value = "";
  membershipEndDate.value = "";
  contactNumber.value = "";
  trainer.value = "No Trainer";
});

addStaffForm.addEventListener("submit", (event) => {
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

  addStaffForm.setAttribute("hidden", true);
  fullName.value = "";
  membershipType.value = "basic";
  membershipStartDate.value = "";
  membershipEndDate.value = "";
  contactNumber.value = "";
  trainer.value = "No Trainer";
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  for (let i = 0; i < staffTableBody.children.length; i++) {
    if (
      !staffTableBody.children[i].children[0].textContent
        .toLowerCase()
        .includes(searchTerm)
    )
      staffTableBody.children[i].style.display = "none";
    else staffTableBody.children[i].style.display = "";
  }
});

cancelEditStaffBtn.addEventListener("click", () => {
  editContainer.setAttribute("hidden", true);
});

saveEditStaffBtn.addEventListener("click", () => {
  const row = document.getElementById(editStaffName.value);
  const member = members.find((user) => user.name === row.id);
  saveEditedMember(member);
  editContainer.setAttribute("hidden", true);
});

displayStaff();

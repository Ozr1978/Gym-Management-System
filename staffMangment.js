const staffTable = document.getElementById("staffTableBody");
const staffMember = JSON.parse(localStorage.getItem("allSystemsUsers")) || [];
const addStaffBtn = document.getElementById("addStaffBtn");
const addStaffForm = document.getElementById("addStaffForm");
const cancelAddStaffBtn = document.getElementById("cancelAddStaffBtn");
const searchInput = document.getElementById("searchInput");
const editStaffContainer = document.getElementById("editStaff-container");
const cancelEditStaffBtn = document.getElementById("cancelEditStaffBtn");
const saveEditStaffBtn = document.getElementById("saveEditStaffBtn");

// hidden form data
const staffFullName = document.getElementById("staffName");
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
            <td class="user-name">${staff.username}</td>
                <td><span class="badge role-badge">${staff.role}</span></td>
                <td>${staff.email}</td>
                <td>${staff.phone}</td>
                <td>${staff.password}</td>
                <td>${staff.id}</td>
                <td class="actions-cell">
                  <button class="action-btn" title="Edit">
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

function displayStaff() {
  for (let staff of staffMember) {
    let member = document.createElement("tr");
    member.setAttribute("id", staff.username);
    member.innerHTML = staffString(staff);

    staffTable.appendChild(member);
  }
}

function saveEditedStaff(staff) {
  const editedMember = {
    username: editStaffName.value,
    role:
      staff.role !== "Owner"
        ? editStaffRole.value.charAt(0).toUpperCase() +
          editStaffRole.value.slice(1)
        : "Owner",
    email: editStaffEmail.value,
    phone: editPhoneNumber.value,
    password: editPassword.value,
    id: staff.id,
  };
  let index;
  staffMember.some((user) => {
    if (staff.username === user.username) {
      index = staffMember.indexOf(user);
      return true;
    }
  });
  staffMember[index] = editedMember;
  localStorage.setItem("allSystemsUsers", JSON.stringify(staffMember));

  editStaffContainer.setAttribute("hidden", true);
  document.getElementById(staff.username).innerHTML = staffString(editedMember);
}

function addMember(username, role, email, phone, password) {
  const user = {
    username,
    email,
    role: role.charAt(0).toUpperCase() + role.slice(1),
    phone,
    password,
    id: staffMember.length + 1,
  };
  staffMember.push(user);
  localStorage.setItem("allSystemsUsers", JSON.stringify(staffMember));

  let member = document.createElement("tr");
  member.setAttribute("id", username);
  member.innerHTML = staffString(user);

  staffTable.appendChild(member);
}
staffTable.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  const editBtn = e.target.closest(".action-btn");
  if (deleteBtn) {
    const row = deleteBtn.closest("tr");
    const index = Array.from(staffTable.children).indexOf(row);

    if (staffMember[index].role === "Owner") {
      alert("You can't delete the owner");
      return;
    }
    staffMember.splice(index, 1);
    localStorage.setItem("allSystemsUsers", JSON.stringify(staffMember));
    row.remove();
  } else if (editBtn) {
    const row = editBtn.closest("tr");
    const index = Array.from(staffTable.children).indexOf(row);
    const member = staffMember[index];
    editStaffContainer.removeAttribute("hidden");
    editStaffName.value = member.username;
    editStaffRole.value = member.role.toLowerCase();
    editStaffEmail.value = member.email;
    editPhoneNumber.value = member.phone;
    editPassword.value = member.password;
  }
});

addStaffBtn.addEventListener("click", () => {
  addStaffForm.removeAttribute("hidden");
});

cancelAddStaffBtn.addEventListener("click", () => {
  addStaffForm.setAttribute("hidden", true);
  staffFullName.value = "";
  staffRole.value = "Coach";
  staffEmail.value = "";
  staffNumber.value = "";
  staffPassword.value = "";
});

addStaffForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addMember(
    staffFullName.value,
    staffRole.value,
    staffEmail.value,
    staffNumber.value,
    staffPassword.value,
  );

  addStaffForm.setAttribute("hidden", true);
  staffFullName.value = "";
  staffRole.value = "Coach";
  staffEmail.value = "";
  staffNumber.value = "";
  staffPassword.value = "";
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  for (let i = 0; i < staffTable.children.length; i++) {
    if (
      !staffTable.children[i].children[0].textContent
        .toLowerCase()
        .includes(searchTerm)
    )
      staffTable.children[i].style.display = "none";
    else staffTable.children[i].style.display = "";
  }
});

cancelEditStaffBtn.addEventListener("click", () => {
  editStaffContainer.setAttribute("hidden", true);
});

saveEditStaffBtn.addEventListener("click", () => {
  const row = document.getElementById(editStaffName.value);
  const member = staffMember.find((user) => user.username === row.id);
  saveEditedStaff(member);
  editStaffContainer.setAttribute("hidden", true);
});

displayStaff();

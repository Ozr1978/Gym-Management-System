const classesTableBody = document.getElementById("classesTableBody");
const classeStorge = JSON.parse(localStorage.getItem("classesData")) || [];
const addClassBtn = document.getElementById("add-class-btn");
const addClassForm = document.getElementById("addClassForm");
const cancelAddClasseBtn = document.getElementById("cancelAddClasseBtn");
const classSearchInput = document.getElementById("classSearchInput");
const editClassContainer = document.getElementById("editClass-container");
const cancelEditClassBtn = document.getElementById("cancelEditClassBtn");
const saveEditClassBtn = document.getElementById("saveEditClassBtn");
const cancelBookMemberBtn = document.getElementById("cancelBookMemberBtn");
const addMemberToClass = document.getElementById("add-member-to-class");
const membersDashboard = document.getElementById("members-dashboard");

// hidden form data
const className = document.getElementById("className");
const classStartTime = document.getElementById("classStartTime");
const classEndTime = document.getElementById("classEndTime");
const selectedCoach = document.getElementById("selectCoach");
const maxNumberOfMembers = document.getElementById("maxNumberOfMembers");

// hidden edit form data
const editClassName = document.getElementById("editClassName");
const editClassStartTime = document.getElementById("editClassStartTime");
const editClassEndTime = document.getElementById("editClassEndTime");
const editMaxNumberOfMembers = document.getElementById(
  "editMaxNumberOfMembers",
);
const editSelectCoach = document.getElementById("editSelectCoach");

function classString(classObj) {
  return `
             <td class="user-name">${classObj.name}</td>
                <td>Coach ${classObj.coach}</td>
                <td class="class-time">${classObj.startTime}</td>
                <td class="class-time">${classObj.endTime}</td>
                <td>${classObj.day}</td>
                <td class="class-booked">${classObj.enrolledMembers.length}</td>
                <td class="class-max">${classObj.maxCapacity}</td>
                <td><span class="${classObj.enrolledMembers.length < classObj.maxCapacity ? "badge status-active" : "badge status-inactive"}">${classObj.enrolledMembers.length < classObj.maxCapacity ? "Open" : "Full"}</span></td>
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
                  <button class="add-member-btn" title="Add Member">
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
                        d="M12 4v16m8-8H4"
                      ></path>
                    </svg>
                  </button>
                </td>
          `;
}

function displayClasses() {
  for (let user of classeStorge) {
    let member = document.createElement("tr");
    member.setAttribute("id", user.name);
    member.innerHTML = classString(user);

    classesTableBody.appendChild(member);
  }
}

function saveEditedClass(member) {
  const days = [
    ...document.querySelectorAll('input[name="editedDays"]:checked'),
  ]
    .map((cb) => cb.value.charAt(0).toUpperCase() + cb.value.slice(1))
    .join(" / ");
  // ["mon", "wed"]

  const editedClass = {
    name: editClassName.value,
    coach: editSelectCoach.value,
    startTime: editClassStartTime.value,
    endTime: editClassEndTime.value,
    day: days,
    maxCapacity: editMaxNumberOfMembers.value,
    enrolledMembers: member.enrolledMembers,
  };
  let index;
  classeStorge.some((user) => {
    if (member.name === user.name) {
      index = classeStorge.indexOf(user);
      return true;
    }
  });
  classeStorge[index] = editedClass;
  localStorage.setItem("classesData", JSON.stringify(classeStorge));

  editClassContainer.setAttribute("hidden", true);
  document.getElementById(member.name).innerHTML = classString(editedClass);
}

function addClass(
  name,
  coach,
  startTime,
  endTime,
  day,
  maxCapacity,
  enrolledMembers,
) {
  const user = {
    name,
    coach,
    startTime,
    endTime,
    day,
    maxCapacity,
    enrolledMembers,
  };
  classeStorge.push(user);
  localStorage.setItem("classesData", JSON.stringify(classeStorge));

  let member = document.createElement("tr");
  member.setAttribute("id", name);
  member.innerHTML = classString(user);

  classesTableBody.appendChild(member);
}

function renderBookedMembers(bookedMembers) {
  const container = document.getElementById("bookedMembersList");

  if (bookedMembers.length === 0) {
    container.textContent = "No members booked yet.";
    return;
  }

  container.replaceChildren(
    ...bookedMembers.map((m) => {
      const p = document.createElement("p");
      p.textContent = m.name;
      return p;
    }),
  );
}

classesTableBody.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  const editBtn = e.target.closest(".action-btn");
  const bookMemberBtn = e.target.closest(".add-member-btn");
  if (deleteBtn) {
    const row = deleteBtn.closest("tr");
    const index = Array.from(classesTableBody.children).indexOf(row);

    classeStorge.splice(index, 1);
    localStorage.setItem("classesData", JSON.stringify(classeStorge));
    row.remove();
  } else if (editBtn) {
    const row = editBtn.closest("tr");
    const index = Array.from(classesTableBody.children).indexOf(row);
    const member = classeStorge[index];
    editClassContainer.removeAttribute("hidden");
    editClassName.value = member.name;
    editClassStartTime.value = member.startTime;
    editSelectCoach.value = member.coach;
    editMaxNumberOfMembers.value = member.maxCapacity;
    editClassEndTime.value = member.endTime;
    const days = member.day.split(" / ").map((day) => day.toLowerCase());
    document.querySelectorAll('input[name="editedDays"]').forEach((cb) => {
      cb.checked = days.includes(cb.value);
    });
  } else if (bookMemberBtn) {
    const row = bookMemberBtn.closest("tr");
    const index = Array.from(classesTableBody.children).indexOf(row);
    const member = classeStorge[index];
    addMemberToClass.removeAttribute("hidden");

    renderBookedMembers(member.enrolledMembers);
  }
});

addClassBtn.addEventListener("click", () => {
  addClassForm.removeAttribute("hidden");
});

cancelAddClasseBtn.addEventListener("click", () => {
  addClassForm.setAttribute("hidden", true);
  className.value = "";
  classStartTime.value = "";
  classEndTime.value = "";
  maxNumberOfMembers.value = "";
});

addClassForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const days = new FormData(event.target)
    .getAll("days")
    .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
    .join(" / ");

  addClass(
    className.value,
    selectedCoach.value,
    classStartTime.value,
    classEndTime.value,
    days,
    maxNumberOfMembers.value,
    [],
  );

  addClassForm.setAttribute("hidden", true);
  className.value = "";
  classStartTime.value = "";
  classEndTime.value = "";
  selectedCoach.value = "";
  maxNumberOfMembers.value = "";
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
  const member = classeStorge.find((user) => user.name === row.id);
  saveEditedClass(member);
  editClassContainer.setAttribute("hidden", true);
});
addMemberToClass.addEventListener("submit", (event) => {
  event.preventDefault();
});

cancelBookMemberBtn.addEventListener("click", () => {
  addMemberToClass.setAttribute("hidden", true);
});

displayClasses();

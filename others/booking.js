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

function removeBookedMember(btns) {
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {});
  });
}

function bookMemberToClass(klass, memberName) {
  let isBooked = false;
  for (let enrolled of klass.enrolledMembers) {
    if (enrolled.name === memberName) isBooked = true;
  }

  if (isBooked) {
    alert("This Member Has Already Booked This Class");
    addMemberToClass.removeChild(document.querySelector(".target"));
    return;
  }
  if (klass.enrolledMembers.length >= klass.maxCapacity) {
    alert("Maximam Capacity Reached");
    return;
  }

  const member = users.find((user) => memberName === user.name);
  klass.enrolledMembers.push(member);
  const index = classeStorge.findIndex((c) => c.name === klass.name);
  classeStorge[index] = klass;

  addMemberToClass.removeChild(document.querySelector(".target"));
  localStorage.setItem("classesData", JSON.stringify(classeStorge));
  document.getElementById(klass.name).innerHTML = classString(klass);
}

addMemberToClass.addEventListener("submit", (event) => {
  event.preventDefault();

  const elem = event.target.querySelector(".target");
  const klass = classeStorge.find((c) => c.name === elem.id);
  const deleteBtns = event.target.querySelectorAll(".delete-btn");
  bookMemberToClass(klass, memberToAdd.value);
  addMemberToClass.setAttribute("hidden", true);
});

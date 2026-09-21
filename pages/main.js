const membersNumberElement = document.getElementById("members-number");
const expiringNumberElement = document.getElementById("expiring-number");
const classesNumberElement = document.getElementById("classes-number");
const bookingsNumberElement = document.getElementById("bookings-number");
const upComingClasses = document.getElementById("upcoming-classes");
const users = JSON.parse(localStorage.getItem("membersData")) || [];
const classes = JSON.parse(localStorage.getItem("classesData")) || [];

function updateDashboardStats() {
  const activeMembersCount = users.filter(
    (user) => user.status !== "expired",
  ).length;
  const expiringSoonCount = users.filter(
    (user) => user.status === "expiring soon",
  ).length;
  const classesCount = classes.length;
  const bookingsCount = classes.reduce(
    (total, classItem) =>
      total +
      (classItem.enrolledMembers.length > 0
        ? classItem.enrolledMembers.length
        : 0),
    0,
  );

  membersNumberElement.textContent = activeMembersCount;
  expiringNumberElement.textContent = expiringSoonCount;
  classesNumberElement.textContent = classesCount;
  bookingsNumberElement.textContent = bookingsCount;
}

function updateClassesDashboard() {
  const currentDate = new Date();
  const comingClasses = classes
    .filter((classItem) => {
      const classDate = classItem.startTime.split(":");
      return Number(classDate[0]) >= Number(currentDate.getHours());
    })
    .sort()
    .slice(0, 3);

  if (comingClasses.length === 0) {
    upComingClasses.innerHTML = `<tr><header>there is no classes at the moment</header></tr>`;
  } else {
    for (let i = 0; i < comingClasses.length; i++) {
      const child = document.createElement("tr");
      child.innerHTML = `
            <td>${comingClasses[i].name}</td>
            <td>${comingClasses[i].startTime}</td>
            <td style="text-align: right;">
              <span class="badge status-active">${comingClasses[i].enrolledMembers.length}/${comingClasses[i].maxCapacity}</span>
            </td>`;
      upComingClasses.appendChild(child);
    }
  }
}

updateDashboardStats();
//updateClassesDashboard();

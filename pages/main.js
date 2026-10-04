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

function parseDays(days) {
  return days.split("/").map((d) => d.trim().toLowerCase().slice(0, 3));
}

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function updateClassesDashboard() {
  const DAY_NAMES = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const now = new Date();
  const today = DAY_NAMES[now.getDay()];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const comingClasses = classes
    .filter(
      (c) =>
        parseDays(c.day).includes(today) &&
        toMinutes(c.startTime) >= nowMinutes,
    )
    .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime))
    .slice(0, 3);

  upComingClasses.innerHTML = "";

  if (comingClasses.length === 0) {
    upComingClasses.innerHTML = `
      <tr><td colspan="3">There are no more classes today</td></tr>`;
    return;
  }

  comingClasses.forEach((c) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.startTime}</td>
      <td style="text-align: right;">
        <span class="badge status-active">${c.enrolledMembers.length}/${c.maxCapacity}</span>
      </td>`;
    upComingClasses.appendChild(row);
  });
}

updateDashboardStats();
updateClassesDashboard();

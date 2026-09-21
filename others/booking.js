function addClass(className) {


}

function removeClass(className) {

}

function addMemberToClass(className, memberName) {


    return `<span><strong>${memberName}</strong> booked ${className}</span>`;
}

const times =["18:00" ,"17:00","22:00","13:00","12:00","23:00"];

const up =times.filter(time =>{
const r =time.split(":");
const date = new Date();
return Number(date.getHours()) <= Number(r[0]);

}).sort().slice(0,3);
console.log(up);


const currTime = document.querySelector("#current-time");
const setHours = document.querySelector("#hours");
const setMin = document.querySelector("#minutes");
const setSec = document.querySelector("#seconds");
const setAm_Pm = document.querySelector("#am-pm");
const setAlarmBtn = document.querySelector("#submitBtn");
const alarmDiv = document.querySelector("#alarms-container");

// Adding Hours, Minutes, Seconds in DropDown Menu
window.addEventListener("DOMContentLoaded", (event) => {
  
  selectMenu(0, 12, setHours);
 
  selectMenu(0, 59, setMin);

  selectMenu(0, 59, setSec);

  setInterval(getCurrentTime, 1000);
  fetchAlarm();
});

//  added to Set Alarm Button
setAlarmBtn.addEventListener("click", getInput);


function selectMenu(start, end, element) {
  for (let i = start; i <= end; i++) {
    const dropDown = document.createElement("option");
    dropDown.value = i < 10 ? "0" + i : i;
    dropDown.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(dropDown);
  }
}


function getCurrentTime() {
  let time = new Date();
  time = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  currTime.innerHTML = time;

  return time;
}


function getInput(e) {
  e.preventDefault();
  const hourValue = setHours.value;
  const minuteValue = setMin.value;
  const secondValue = setSec.value;
  const amPmValue = setAm_Pm.value;

  const alarmTime = timeFormate(
    hourValue,
    minuteValue,
    secondValue,
    amPmValue
  );
  setAlarm(alarmTime);
}

// Converting time to 24 hour format
function timeFormate(hour, minute, second, amPm) {
  return `${parseInt(hour)}:${minute}:${second} ${amPm}`;
}


function setAlarm(time, fetching = false) {
  const alarm = setInterval(() => {
    if (time === getCurrentTime()) {
      alert("Alarm Ringing");
    }
    console.log("running");
  }, 500);

  addAlaramToDom(time, alarm);
  if (!fetching) {
    saveAlarm(time);
  }
}

// Alarms set by user Dislayed 
function addAlaramToDom(time, intervalId) {
  const alarm = document.createElement("div");
  alarm.classList.add("alarm", "mb");
  alarm.innerHTML = `
              <div class="time">${time}</div>
              <button class="btn delete-alarm" data-id=${intervalId}>Delete</button>
              `;
  const deleteButton = alarm.querySelector(".delete-alarm");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e, time, intervalId));

  alarmDiv.prepend(alarm);
}

// alarms save Local Storage?
function checkAlarams() {
  let alarms = [];
  const isPresent = localStorage.getItem("alarms");
  if (isPresent) alarms = JSON.parse(isPresent);

  return alarms;
}

// save alarm to localStorage
function saveAlarm(time) {
  const alarms = checkAlarams();

  alarms.push(time);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}

// Fetching alarms from local storage
function fetchAlarm() {
  const alarms = checkAlarams();

  alarms.forEach((time) => {
    setAlarm(time, true);
  });
}


function deleteAlarm(event, time, intervalId) {
  const self = event.target;

  clearInterval(intervalId);

  const alarm = self.parentElement;
  console.log(time);

  deleteLocal(time);
  alarm.remove();
}

function deleteLocal(time) {
  const alarms = checkAlarams();

  const index = alarms.indexOf(time);
  alarms.splice(index, 1);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}


// display current time by the second
// var currentTime = setInterval(function(){
// 	var date = new Date();
	
// 	var hours = (12 - (date.getHours()));
// 	// var hours = date.getHours();
	
// 	var minutes = date.getMinutes();
	
// 	var seconds = date.getSeconds();
	
// 	var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';


// 	//convert military time to standard time

// 	if (hours < 0) {
// 		hours = hours * -1;
// 	} else if (hours == 00) {
// 		hours = 12;
// 	} else {
// 		hours = hours;
// 	}

	
// 	currTime.innerHTML = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;

	
// },1000);
// function addZero(time) {

//     return (time < 10) ? "0" + time : time;

// }


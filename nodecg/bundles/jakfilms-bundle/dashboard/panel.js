// You can access the NodeCG api anytime from the `window.nodecg` object
// Or just `nodecg` for short. Like this!:
nodecg.log.info("Here's an example of using NodeCG's logging API!");
const speakerRep = nodecg.Replicant("speakerReplicant");
const roleRep = nodecg.Replicant("roleReplicant");

const broadcasterRep = nodecg.Replicant("broadcasterReplicant");
const broadcastRep = nodecg.Replicant("broadcastReplicant");

const speaker = document.getElementById("speaker");
const role = document.getElementById("role");

const broadcaster = document.getElementById("broadcaster")
const broadcast = document.getElementById("broadcast")

const isToggled = nodecg.Replicant("isToggled");
const toggled = document.getElementById("toggled");

let toggle = true;

const timerRep = nodecg.Replicant("timerReplicant");
const timerInput = document.getElementById("countdown");
const timerForm = document.getElementById("countdownForm");

const countdownTimeInput = document.getElementById("countdownTime");
const setCountdownButton = document.getElementById("setCountdownButton");
let typingTimer; // Timer to delay updating the timerReplicant
const doneTypingInterval = 1000; // Adjust this delay as needed (in milliseconds)

function updateCountdownTime() {
  const newCountdownTime = countdownTimeInput.value;
  timerRep.value = newCountdownTime;
  timerForm.submit(); // Optionally submit the form if needed
}

// Event listener for the button click
setCountdownButton.addEventListener("click", () => {
  // Update the timerReplicant immediately when the button is clicked
  updateCountdownTime();
});


speakerRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  speaker.value = newValue;
});


roleRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  role.value = newValue;
});

broadcasterRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  broadcaster.value = newValue;
});

broadcastRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  broadcast.value = newValue;
});

isToggled.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);

});

const speakerForm = document.getElementById("speakerForm");

const broadcastForm = document.getElementById("broadcastForm");



const submitForm = () => {
  speakerRep.value = speaker.value;
  roleRep.value = role.value;
  speakerForm.submit();
};

const submitBroadcastForm = () => {
  broadcasterRep.value = broadcaster.value;
  broadcastRep.value = broadcast.value;
  broadcastForm.submit();
};

const submitTimerForm = () => {
  timerRep.value = timerInput.value;
  timerForm.submit();
};

let timeoutId;
// automaattinen vaihto 5 sekunnin inputin lopetuksen jälkeen

speaker.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(submitForm, 5000);
});
// automaattinen vaihto 5 sekunnin inputin lopetuksen jälkeen
role.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(submitForm, 5000);
});
// napilla vaihto
speakerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm();
});

timerForm.addEventListener("submit", (e) => {
  submitTimerForm();
});

broadcastForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBroadcastForm();
});


toggled.addEventListener("click", () => {
  if (toggled.textContent === "Piilota") {
    toggle = false;
    isToggled.value = toggle;
    console.log(toggle);
    toggled.textContent = "Päälle";


    return;
  }

  toggle = true;
  isToggled.value = toggle;
  toggled.textContent = "Piilota";
  console.log(toggle);

});


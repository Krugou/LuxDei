// You can access the NodeCG api anytime from the `window.nodecg` object
// Or just `nodecg` for short. Like this!:
nodecg.log.info("Here's an example of using NodeCG's logging API!");
const speakerRep = nodecg.Replicant("speakerReplicant");
const roleRep = nodecg.Replicant("roleReplicant");
const timerRep = nodecg.Replicant("timerReplicant");
const speaker = document.getElementById("speaker");
const timer = document.getElementById("countdown");
const role = document.getElementById("role");
const isToggled = nodecg.Replicant("isToggled");
const toggled = document.getElementById("toggled");
let toggle = true;
speakerRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  speaker.value = newValue;
});
roleRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  role.value = newValue;
});

timerRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  timer.value = newValue;
});
isToggled.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);

});
const speakerForm = document.getElementById("speakerForm");

const timerForm = document.getElementById("countdownForm");


const submitForm = () => {
  speakerRep.value = speaker.value;
  roleRep.value = role.value;
  timerRep.value = timer.value;

  timerForm.submit();
  speakerForm.submit();
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
  e.preventDefault();
  submitForm();
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

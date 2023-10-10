// You can access the NodeCG api anytime from the `window.nodecg` object
// Or just `nodecg` for short. Like this!:
nodecg.log.info("Here's an example of using NodeCG's logging API!");
const speakerRep = nodecg.Replicant("speakerReplicant");
const roleRep = nodecg.Replicant("roleReplicant");
const broadcasterRep = nodecg.Replicant("broadcasterReplicant");
const broadcastRep = nodecg.Replicant("broadcastReplicant");
const blokki = document.getElementById("blokki");
const puhuja = document.getElementById("puhuja");
const tokablokki = document.getElementById("tokablokki");
const kolmasblokki = document.getElementById("kolmasblokki");
const lahetys = document.getElementById("lahetys");
const lahetystyyppi = document.getElementById("lahetystyyppi");
const laskuri = document.getElementById("laskuri")
const rooli = document.getElementById("rooli");
const isToggled = nodecg.Replicant("isToggled");
const isToggled2 = nodecg.Replicant("isToggled2");
const lowerthird = document.getElementById("lowerThird");
const timerRep = nodecg.Replicant("timerReplicant");
const countdownDisplay = document.getElementById("laskuri");


console.log(isToggled.value);

isToggled.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  if (newValue === true) {
    console.log("true");
    lowerthird.classList.remove("hidden");
  } else if (newValue === false) {
    console.log("false");
    lowerthird.classList.add("hidden");
  }
});
timerRep.on("change", (newValue, oldValue) => {
  countdownDisplay.textContent = newValue;
});


let startTime;
let endTime = null;


timerRep.on("change", (newValue, oldValue) => {
  const [hours, minutes, seconds] = newValue.split(":").map(Number);
  const currentTime = new Date().getTime();
  endTime = currentTime + (hours * 3600 + minutes * 60 + seconds) * 1000;

  updateCountdown();
});

function updateCountdown() {
  if (endTime === null) {
    countdownDisplay.textContent = "00:00:00";
    return;
  }

  const currentTime = new Date().getTime();
  const timeRemaining = endTime - currentTime;

  if (timeRemaining <= 0) {
    countdownDisplay.textContent = "00:00:00";
  } else {
    const hours = Math.floor(timeRemaining / 3600000);
    const minutes = Math.floor((timeRemaining % 3600000) / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    countdownDisplay.textContent = formattedTime;

    setTimeout(updateCountdown);
  }
}

updateCountdown();

speakerRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  puhuja.innerHTML = newValue;
  animations();
});
roleRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  rooli.innerHTML = newValue;
  animations();
});

broadcasterRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  lahetys.innerHTML = newValue;
  broadcastAnimations();
});
broadcastRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  lahetystyyppi.innerHTML = newValue;
  broadcastAnimations();
});
timerRep.on("change", (newValue, oldValue) => {
  countdownDisplay.textContent = newValue;
  timerAnimations()
});

const animations = () => {

  puhuja.classList.remove("title-h1-animation");
  puhuja.offsetWidth;
  puhuja.classList.add("title-h1-animation");

  tokablokki.classList.remove("role-block-animation");
  tokablokki.offsetWidth;
  tokablokki.classList.add("role-block-animation");
  tokablokki.classList.remove("hidden");


  rooli.classList.remove("role-p-animation");
  rooli.offsetWidth;
  rooli.classList.add("role-p-animation");
};

const timerAnimations = () => {
  kolmasblokki.classList.remove("role-block-animation");
  kolmasblokki.offsetWidth;
  kolmasblokki.classList.add("role-block-animation");
  kolmasblokki.classList.remove("hidden");


  laskuri.classList.remove("role-p-animation");
  laskuri.offsetWidth;
  laskuri.classList.add("role-p-animation");
}
const broadcastAnimations = () => {
  blokki.classList.remove("title-block-animation");
  blokki.offsetWidth;
  blokki.classList.add("title-block-animation");
  blokki.classList.remove("hidden");

  lahetys.classList.remove("title-h1-animation");
  lahetys.offsetWidth;
  lahetys.classList.add("title-h1-animation");

  lahetystyyppi.classList.remove("role-p-animation");
  lahetystyyppi.offsetWidth;
  lahetystyyppi.classList.add("role-p-animation");

}

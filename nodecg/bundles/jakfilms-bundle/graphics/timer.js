nodecg.log.info("Here's an example of using NodeCG's logging API!");
const timeRep = nodecg.Replicant("timerReplicant");
const laskuri = document.getElementById("laskuri");
const kolmasblokki = document.getElementById("kolmasblokki");
const isToggled = nodecg.Replicant("isToggled");
const lowerthird = document.getElementById("lowerThird");
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

timeRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  laskuri.innerHTML = newValue;
  timeranimations();
});

const timeranimations = () => {

  kolmasblokki.classList.remove("role-block-animation");
  kolmasblokki.offsetWidth;
  kolmasblokki.classList.add("role-block-animation");
  kolmasblokki.classList.remove("hidden");


  laskuri.classList.remove("role-p-animation");
  laskuri.offsetWidth;
  laskuri.classList.add("role-p-animation");

};

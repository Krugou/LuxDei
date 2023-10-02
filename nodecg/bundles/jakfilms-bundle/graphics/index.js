// You can access the NodeCG api anytime from the `window.nodecg` object
// Or just `nodecg` for short. Like this!:
nodecg.log.info("Here's an example of using NodeCG's logging API!");
const speakerRep = nodecg.Replicant("speakerReplicant");
const roleRep = nodecg.Replicant("roleReplicant");
const blokki = document.getElementById("blokki");
const puhuja = document.getElementById("puhuja");
const tokablokki = document.getElementById("tokablokki");
const rooli = document.getElementById("rooli");
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

const animations = () => {
  blokki.classList.remove("title-block-animation");
  blokki.offsetWidth;
  blokki.classList.add("title-block-animation");
  blokki.classList.remove("hidden");


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

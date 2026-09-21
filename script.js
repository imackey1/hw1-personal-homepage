// Dice roller: click the die to jump to a random section of the page.
// This is a small bonus feature - the page still works with plain
// navigation-menu clicks if JavaScript is off (see the <noscript> note).

document.addEventListener("DOMContentLoaded", function () {
  var dieButton = document.getElementById("dieButton");
  var dieFace = document.getElementById("dieFace");
  var diceStatus = document.getElementById("diceStatus");

  if (!dieButton || !dieFace) return;

  // One symbol per destination section - four sections, so this behaves
  // like a four-sided die (a d4).
  var faces = [
    { id: "about", symbol: "👤", label: "About Me" },       // 👤
    { id: "coursework", symbol: "🎓", label: "Coursework" }, // 🎓
    { id: "hobbies", symbol: "🎮", label: "Hobbies" },       // 🎮
    { id: "contact", symbol: "✉️", label: "Contact" }        // ✉️
  ];

  var rolling = false;

  dieButton.addEventListener("click", function () {
    if (rolling) return;
    rolling = true;

    dieButton.classList.remove("landed");
    dieButton.classList.add("rolling");
    diceStatus.textContent = "Rolling...";

    var ticks = 0;
    var maxTicks = 14;

    var spin = setInterval(function () {
      var randomFace = faces[Math.floor(Math.random() * faces.length)];
      dieFace.textContent = randomFace.symbol;
      ticks++;

      if (ticks >= maxTicks) {
        clearInterval(spin);

        var finalFace = faces[Math.floor(Math.random() * faces.length)];
        dieFace.textContent = finalFace.symbol;
        dieButton.classList.remove("rolling");
        dieButton.classList.add("landed");
        diceStatus.textContent = "Landed on " + finalFace.label + "! Taking you there...";

        // Pause briefly so the landed symbol is visible before navigating.
        setTimeout(function () {
          dieButton.classList.remove("landed");
          var target = document.getElementById(finalFace.id);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            history.pushState(null, "", "#" + finalFace.id);
          }
          rolling = false;
        }, 550);
      }
    }, 80);
  });
});

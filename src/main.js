import "./scss/app.scss";

let controller;
let slideScene;

function animateSlides() {
  //Init Controller
  controller = new ScrollMagic.Controller();
  //Select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //Loop over each sllide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
    //Create Scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.5,
      reverse: false,
    })
      .setTween(slideTl)
      .addIndicators({
        colorStart: "black",
        colorTrigger: "blue",
        name: "slide",
      })
      .addTo(controller);
    // New Animation
  });
}

/******  Cursor Animation ******/
let mouse = document.querySelector(".cursor");
let mouseTxt = mouse.querySelector("span");
// Function to move cursor
function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
  const item = e.target;
  // Logo
  if (item.id === "logo") {
    mouse.classList.add("logo-active");
  } else {
    mouse.classList.remove("logo-active");
  }
  // img
  if (item.classList.contains("images")) {
    mouse.classList.add("blur");
  } else {
    mouse.classList.remove("blur");
  }
  // burger
  if (item.classList.contains("burger")) {
    mouse.classList.add("burger-active");
  } else {
    mouse.classList.remove("burger-active");
  }
  // explore btn
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    mouseTxt.innerText = "Explore!";
    gsap.to(".title-swipe", 1, { y: "0%" });

    gsap.fromTo(".explore", 0.1, { opacity: 1 }, { opacity: 0 });
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = "";
    gsap.fromTo(".explore", 0.1, { opacity: 0 }, { opacity: 1 });
    gsap.to(".title-swipe", 1, { y: "100%" });
  }
}

// Event listeners

window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

animateSlides();

import "./scss/app.scss";
import navSlide from "./nav";

let controller;
let slideScene;

function animateSlides() {
  //Init Controller
  controller = new ScrollMagic.Controller();
  //Select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector("nav");
  //Loop over the slides
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const desc = slide.querySelector(".hero-desc");

    //GSAP - Create a timeline
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(desc, { x: "200%" }, { x: "0%" }, "-=0.75");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

    //Create Scene to activate when scrolled
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.4,
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

//! ********  Cursor Animation ******/
const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");
const links = document.querySelectorAll(".nav-links li");

//! Animation for the nav links
links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    mouse.classList.add("link-grow");
  });
  link.addEventListener("mouseleave", () => {
    mouse.classList.remove("link-grow");
  });
});

//! Function to move cursor
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
  if (
    item.classList.contains("burger") ||
    item.classList.contains("line1") ||
    item.classList.contains("line2") ||
    item.classList.contains("line3")
  ) {
    mouse.classList.add("burger-active");
  } else {
    mouse.classList.remove("burger-active");
  }
  // explore btn
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    mouseTxt.innerText = "Explore!";
    // gsap.to(".title-swipe", 1, { y: "0%" });
    // gsap.fromTo(".fill", 0.1, { opacity: 1 }, { opacity: 0 });

    gsap.fromTo(".explore", 0.1, { opacity: 1 }, { opacity: 0 });
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = "";
    gsap.fromTo(".explore", 0.1, { opacity: 0 }, { opacity: 1 });
    // gsap.to(".title-swipe", 1, { y: "100%" });
  }
}

// Event listeners
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

animateSlides();
navSlide();

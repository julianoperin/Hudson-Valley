const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links li");
  const corp = document.querySelector("body");

  //! Toggle Nav
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    //! Animate Links
    links.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 2 + 0.3
        }s`;
      }
    });

    //! Burger Animation
    burger.classList.toggle("toggle");

    //! Body overflow and disappear
    corp.classList.toggle("over");
  });
};

export default navSlide;

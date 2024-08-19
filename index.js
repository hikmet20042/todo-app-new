let hamburger = document.querySelector(".hamburger");
//
// hamburger.addEventListener("click", function (e) {
//   let aside =
//     e.currentTarget.parentElement.parentElement.previousElementSibling;
//   if (aside.classList.contains("hide")) {
//     aside.style.marginLeft = 0;
//     aside.classList.remove("hide");
//   } else {
//     aside.style.marginLeft = "";
//     aside.classList.add("hide");
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  loadStars();
  hamburger.addEventListener("click", function (e) {
    let aside =
      e.currentTarget.parentElement.parentElement.previousElementSibling;
    if (aside.classList.contains("hide")) {
      aside.style.marginLeft = 0;
      aside.classList.remove("hide");
    } else {
      aside.style.marginLeft = "";
      aside.classList.add("hide");
    }
  });
});

let all_stars = document.querySelectorAll(".star");

all_stars.forEach((star, index) => {
  star.addEventListener("mouseover", function (e) {
    if (e.currentTarget.classList.contains("filled")) return;
    let previous = e.currentTarget.previousElementSibling;
    e.currentTarget.firstElementChild.className = "fa-solid fa-star";
    e.currentTarget.classList.add("shadow");
    for (let i = 0; i < index; i++) {
      previous.classList.add("shadow");
      previous.firstElementChild.className = "fa-solid fa-star";
      previous = previous.previousElementSibling;
    }
  });
  star.addEventListener("mouseout", function (e) {
    let previous = e.currentTarget.previousElementSibling;
    e.currentTarget.classList.remove("shadow");
    for (let i = 0; i < index; i++) {
      previous.classList.remove("shadow");
      previous = previous.previousElementSibling;
    }
    loadStars();
  });
  star.addEventListener("click", function (e) {
    localStorage.setItem("star_count", index + 1);
    loadStars();
  });
});

function loadStars() {
  let star_count = +localStorage.getItem("star_count");
  all_stars.forEach((star, index) => {
    if (index < star_count) {
      star.firstElementChild.className = "fa-solid fa-star";
      star.classList.remove("shadow");
      star.classList.add("filled");
    } else {
      star.firstElementChild.className = "fa-regular fa-star";

      star.classList.remove("filled");
    }
  });
}

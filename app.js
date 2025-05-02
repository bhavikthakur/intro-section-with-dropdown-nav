document.addEventListener("DOMContentLoaded", function () {
  // Select all elements
  const navBar = document.querySelector(".header__navbar");
  const hamburgerBtn = document.querySelector(".header__menu-btn");
  const closeBtn = document.querySelector(".header__close-menu-btn");
  const featuresLink = document.querySelector(".header__link--features");
  const companyLink = document.querySelector(".header__link--company");
  const moreFeatures = document.querySelector(
    ".header__dropdown-container--features"
  );
  const moreCompany = document.querySelector(
    ".header__dropdown-container--company"
  );
  const arrowsDown = document.querySelectorAll(".header__arrow--down");
  const arrowsUp = document.querySelectorAll(".header__arrow--up");
  const header = document.querySelector(".header");

  // Timers for hover delay
  let featuresTimer, companyTimer;

  // Create close button if it doesn't exist
  if (!closeBtn) {
    const newCloseBtn = document.createElement("button");
    newCloseBtn.className = "header__close-menu-btn hidden";
    newCloseBtn.innerHTML =
      '<img src="./images/icon-close-menu.svg" alt="" class="header__close-menu-icon">';
    header.appendChild(newCloseBtn);
  }
  const finalCloseBtn =
    closeBtn || document.querySelector(".header__close-menu-btn");

  // Check if mobile view
  function isMobile() {
    return window.innerWidth <= 950;
  }

  // Toggle dropdown function
  function toggleDropdown(dropdown, arrowIndex) {
    const isOpen = dropdown.classList.contains("active__dropdown");

    // Close all dropdowns first
    closeAllDropdowns();

    // Toggle the clicked dropdown
    if (!isOpen) {
      dropdown.classList.add("active__dropdown");
      arrowsDown[arrowIndex].classList.add("hidden");
      arrowsUp[arrowIndex].classList.remove("hidden");
    }
  }

  // Close all dropdowns
  function closeAllDropdowns() {
    [moreFeatures, moreCompany].forEach((dropdown, index) => {
      dropdown.classList.remove("active__dropdown");
      arrowsDown[index].classList.remove("hidden");
      arrowsUp[index].classList.add("hidden");
    });
  }

  // Close mobile menu
  function closeMobileMenu() {
    navBar.classList.remove("active__nav");
    document.body.classList.remove("menu__opened");
    finalCloseBtn.classList.add("hidden");
    closeAllDropdowns();
  }

  // Mobile menu toggle
  hamburgerBtn.addEventListener("click", function () {
    navBar.classList.add("active__nav");
    document.body.classList.add("menu__opened");
    finalCloseBtn.classList.remove("hidden");
    finalCloseBtn.classList.add("active__menu");
  });

  finalCloseBtn.addEventListener("click", closeMobileMenu);

  // Mobile dropdown behavior
  function setupMobileDropdowns() {
    if (featuresLink) {
      featuresLink.addEventListener("click", function (e) {
        if (isMobile()) {
          e.preventDefault();
          toggleDropdown(moreFeatures, 0);
        }
      });
    }

    if (companyLink) {
      companyLink.addEventListener("click", function (e) {
        if (isMobile()) {
          e.preventDefault();
          toggleDropdown(moreCompany, 1);
        }
      });
    }
  }

  // Desktop hover behavior with delay
  function setupDesktopDropdowns() {
    if (featuresLink) {
      featuresLink.addEventListener("mouseenter", function () {
        if (!isMobile()) {
          clearTimeout(featuresTimer);
          closeAllDropdowns();
          moreFeatures.classList.add("active__dropdown");
          arrowsDown[0].classList.add("hidden");
          arrowsUp[0].classList.remove("hidden");
        }
      });

      featuresLink.addEventListener("mouseleave", function () {
        if (!isMobile()) {
          featuresTimer = setTimeout(() => {
            if (!moreFeatures.matches(":hover")) {
              moreFeatures.classList.remove("active__dropdown");
              arrowsDown[0].classList.remove("hidden");
              arrowsUp[0].classList.add("hidden");
            }
          }, 200); // 200ms delay before closing
        }
      });

      moreFeatures.addEventListener("mouseenter", function () {
        clearTimeout(featuresTimer);
      });

      moreFeatures.addEventListener("mouseleave", function () {
        moreFeatures.classList.remove("active__dropdown");
        arrowsDown[0].classList.remove("hidden");
        arrowsUp[0].classList.add("hidden");
      });
    }

    if (companyLink) {
      companyLink.addEventListener("mouseenter", function () {
        if (!isMobile()) {
          clearTimeout(companyTimer);
          closeAllDropdowns();
          moreCompany.classList.add("active__dropdown");
          arrowsDown[1].classList.add("hidden");
          arrowsUp[1].classList.remove("hidden");
        }
      });

      companyLink.addEventListener("mouseleave", function () {
        if (!isMobile()) {
          companyTimer = setTimeout(() => {
            if (!moreCompany.matches(":hover")) {
              moreCompany.classList.remove("active__dropdown");
              arrowsDown[1].classList.remove("hidden");
              arrowsUp[1].classList.add("hidden");
            }
          }, 200); // 200ms delay before closing
        }
      });

      moreCompany.addEventListener("mouseenter", function () {
        clearTimeout(companyTimer);
      });

      moreCompany.addEventListener("mouseleave", function () {
        moreCompany.classList.remove("active__dropdown");
        arrowsDown[1].classList.remove("hidden");
        arrowsUp[1].classList.add("hidden");
      });
    }
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (isMobile() && navBar.classList.contains("active__nav")) {
      // Check if clicked outside of navbar
      const clickedInsideNavbar =
        navBar.contains(e.target) ||
        hamburgerBtn.contains(e.target) ||
        finalCloseBtn.contains(e.target);

      if (!clickedInsideNavbar) {
        closeMobileMenu();
      }

      // Existing dropdown close logic
      const clickedInsideDropdown =
        (featuresLink && featuresLink.contains(e.target)) ||
        (companyLink && companyLink.contains(e.target)) ||
        (moreFeatures && moreFeatures.contains(e.target)) ||
        (moreCompany && moreCompany.contains(e.target));

      if (!clickedInsideDropdown) {
        closeAllDropdowns();
      }
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (!isMobile()) {
      closeAllDropdowns();
    }
  });

  // Initialize
  setupMobileDropdowns();
  setupDesktopDropdowns();
});

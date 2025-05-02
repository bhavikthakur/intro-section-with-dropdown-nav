const menuIcon = document.querySelector(".header__menu-icon");
const navBar = document.querySelector(".header__navbar");
const header = document.querySelector(".header");
const features = document.querySelector(".header__list--features");
const featuresLink = document.querySelector(".header__link--features");
const companyLink = document.querySelector(".header__link--company");
const company = document.querySelector(".header__list--company");
const upArrow = document.querySelectorAll(".header__arrow--up");
const downArrow = document.querySelectorAll(".header__arrow--down");
const moreFeatures = document.querySelector(
  ".header__dropdown-container--features"
);
const moreCompany = document.querySelector(
  ".header__dropdown-container--company"
);

// Timers for hover delay
let featuresTimer, companyTimer;

// ==================== FEATURES DROPDOWN ==================== //

features.addEventListener("mouseenter", () => {
  clearTimeout(featuresTimer);
  openDropdown(features, moreFeatures, 0, featuresLink);
});

features.addEventListener("mouseleave", () => {
  // Set delay before closing to allow mouse to reach dropdown
  featuresTimer = setTimeout(() => {
    // Only close if mouse didn't enter dropdown
    if (!moreFeatures.matches(":hover")) {
      closeDropdown(features, moreFeatures, 0, featuresLink);
    }
  }, 200);
});

// Handle dropdown container hover
moreFeatures.addEventListener("mouseenter", () => {
  clearTimeout(featuresTimer);
});

moreFeatures.addEventListener("mouseleave", () => {
  closeDropdown(features, moreFeatures, 0, featuresLink);
});

// ==================== COMPANY DROPDOWN ==================== //

company.addEventListener("mouseenter", () => {
  clearTimeout(companyTimer);
  openDropdown(company, moreCompany, 1, companyLink);
});

company.addEventListener("mouseleave", () => {
  companyTimer = setTimeout(() => {
    if (!moreCompany.matches(":hover")) {
      closeDropdown(company, moreCompany, 1, companyLink);
    }
  }, 200);
});

moreCompany.addEventListener("mouseenter", () => {
  clearTimeout(companyTimer);
});

moreCompany.addEventListener("mouseleave", () => {
  closeDropdown(company, moreCompany, 1, companyLink);
});

// ==================== HELPER FUNCTIONS ==================== //

/**
 * Params dropdown function
 * @param {HTMLElement} parent - The parent list item
 * @param {HTMLElement} dropdown - The dropdown container
 * @param {number} index - Index for arrow icons (0 = features, 1 = company)
 * @param {HTMLElement} link - The navigation link element
 */
function openDropdown(parent, dropdown, index, link) {
  dropdown.classList.add("active__dropdown");
  downArrow[index].classList.add("hidden");
  upArrow[index].classList.remove("hidden");
  link.style.color = "hsl(0, 0%, 8%)";
}

function closeDropdown(parent, dropdown, index, link) {
  dropdown.classList.remove("active__dropdown");
  downArrow[index].classList.remove("hidden");
  upArrow[index].classList.add("hidden");
  link.style.color = "";
}

// ==================== SAFETY NET ==================== //
// Close dropdowns when clicking anywhere outside
document.addEventListener("click", (evt) => {
  if (!features.contains(evt.target)) {
    closeDropdown(features, moreFeatures, 0, featuresLink);
  }
  if (!company.contains(evt.target)) {
    closeDropdown(company, moreCompany, 1, companyLink);
  }
});

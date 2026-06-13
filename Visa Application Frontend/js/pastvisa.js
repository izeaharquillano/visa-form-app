console.log("pastvisa.js loaded");

const pastVisaCheckbox = document.getElementById("past-visa");
const visaHistorySection = document.getElementById("visa-history-section");

console.log(pastVisaCheckbox);
console.log(visaHistorySection);

pastVisaCheckbox.addEventListener("change", () => {
    console.log("checkbox changed");

    if (pastVisaCheckbox.checked) {
        visaHistorySection.style.display = "flex";
    } else {
        visaHistorySection.style.display = "none";
    }
});
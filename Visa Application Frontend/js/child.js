const addChildBtn = document.getElementById("add-child-btn");
const childrenContainer = document.getElementById("children-container");

const childTemplate =
    document.querySelector(".child-card").cloneNode(true);

addChildBtn.addEventListener("click", () => {

    const newCard = childTemplate.cloneNode(true);

    newCard.querySelectorAll("input").forEach(input => {
        input.value = "";
    });

    newCard.querySelectorAll("select").forEach(select => {
        select.selectedIndex = 0;
    });

    childrenContainer.appendChild(newCard);

    renumberChildren();
});

window.renumberChildren = function () {

    document.querySelectorAll(".child-card")
        .forEach((card, index) => {

            card.querySelector(
                ".child-header span"
            ).textContent =
                `Child #${index + 1} | 孩子#${index + 1}`;

        });

};

document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("remove-btn")) return;

    const cards = document.querySelectorAll(".child-card");

    if (cards.length === 1) {
        alert("At least one child form must remain.");
        return;
    }

    e.target.closest(".child-card").remove();

    renumberChildren();
});


function saveAndNext() {

    savePage1();

    window.location.href =
        "page2.html";
}

window.addEventListener("DOMContentLoaded", () => {

    const application = getApplication();

    if (!application.applicant) return;

    // Applicant Information

    document.getElementById("surname").value =
        application.applicant.surname || "";

    document.getElementById("firstname").value =
        application.applicant.firstname || "";

    document.getElementById("sex").value =
        application.applicant.sex || "";

    document.getElementById("birthdate").value =
        application.applicant.birthdate || "";

    document.getElementById("birthplace").value =
        application.applicant.birthplace || "";

    document.getElementById("citizenship").value =
        application.applicant.citizenship || "";

    document.getElementById("applicant-address").value =
        application.applicant.address || "";

    document.getElementById("contact-number").value =
        application.applicant.contact || "";

    document.getElementById("occupation").value =
        application.applicant.occupation || "";

    document.getElementById("employment-address").value =
        application.applicant.employmentAddress || "";

    document.getElementById("father-name").value =
        application.applicant.father || "";

    document.getElementById("mother-name").value =
        application.applicant.mother || "";

    document.getElementById("civil-status").value =
        application.applicant.civilStatus || "";

    document.getElementById("spouse-name").value =
        application.applicant.spouse || "";

    document.getElementById("spouse-citizenship").value =
        application.applicant.spouseCitizenship || "";



    // Passport Information

    if (application.passport) {

        document.getElementById("passport-number").value =
            application.passport.number || "";

        document.getElementById("passport-issued-date").value =
            application.passport.issuedDate || "";

        document.getElementById("passport-expiry-date").value =
            application.passport.expiryDate || "";

        document.getElementById("passport-issued-by").value =
            application.passport.issuedBy || "";
    }

    if (application.children && application.children.length > 0) {

    const childrenContainer =
        document.getElementById("children-container");

    const firstCard =
        document.querySelector(".child-card");

    // Remove any extra cards that may exist
    document
        .querySelectorAll(".child-card")
        .forEach((card, index) => {

            if (index > 0) {
                card.remove();
            }

        });

    application.children.forEach((child, index) => {

        let card;

        if (index === 0) {

            card = firstCard;

        } else {

            card = firstCard.cloneNode(true);

            childrenContainer.appendChild(card);

        }

        card.querySelector(".child-name").value =
            child.name || "";

        card.querySelector(".child-age").value =
            child.age || "";

        card.querySelector(".child-relationship").value =
            child.relationship || "";

    });

    renumberChildren();
}

});
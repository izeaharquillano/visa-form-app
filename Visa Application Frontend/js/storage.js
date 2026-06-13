function getApplication() {

    return JSON.parse(
        localStorage.getItem("visaApplication")
    ) || {};

}

function saveApplication(application) {

    localStorage.setItem(
        "visaApplication",
        JSON.stringify(application)
    );

}

function savePage1() {

    const application =
        getApplication();

    application.applicant = {

        surname:
            document.getElementById("surname").value,

        firstname:
            document.getElementById("firstname").value,

        sex:
            document.getElementById("sex").value,

        birthdate:
            document.getElementById("birthdate").value,

        birthplace:
            document.getElementById("birthplace").value,

        citizenship:
            document.getElementById("citizenship").value,

        address:
            document.getElementById(
                "applicant-address"
            ).value,

        contact:
            document.getElementById(
                "contact-number"
            ).value,

        occupation:
            document.getElementById(
                "occupation"
            ).value,

        employmentAddress:
            document.getElementById(
                "employment-address"
            ).value,

        father:
            document.getElementById(
                "father-name"
            ).value,

        mother:
            document.getElementById(
                "mother-name"
            ).value,

        civilStatus:
            document.getElementById(
                "civil-status"
            ).value,

        spouse:
            document.getElementById(
                "spouse-name"
            ).value,

        spouseCitizenship:
            document.getElementById(
                "spouse-citizenship"
            ).value
    };

    application.passport = {

        number:
            document.getElementById(
                "passport-number"
            ).value,

        issuedDate:
            document.getElementById(
                "passport-issued-date"
            ).value,

        expiryDate:
            document.getElementById(
                "passport-expiry-date"
            ).value,

        issuedBy:
            document.getElementById(
                "passport-issued-by"
            ).value
    };

    application.children = [];

    document
        .querySelectorAll(".child-card")
        .forEach(card => {

            application.children.push({

                name:
                    card.querySelector(
                        ".child-name"
                    ).value,

                age:
                    card.querySelector(
                        ".child-age"
                    ).value,

                relationship:
                    card.querySelector(
                        ".child-relationship"
                    ).value
            });

        });

    saveApplication(application);
}

function savePage2() {

    const application =
        getApplication();

    application.applicationInfo = {

        portOfEntry:
            document.getElementById(
                "port-of-entry"
            ).value,

        stayLength:
            document.getElementById(
                "stay-length"
            ).value,

        entryPurpose:
            document.getElementById(
                "entry-purpose"
            ).value,

        ageAtApplication:
            document.getElementById(
                "age-at-application"
            ).value,

        companionName:
            document.getElementById(
                "companion-name"
            ).value,

        destinationAfterPH:
            document.getElementById(
                "destination-after-ph"
            ).value
    };

   const hasPastVisa =
    document.getElementById(
        "past-visa"
    ).checked;

if (hasPastVisa) {

    application.visaHistory = {

        hasPastVisa: true,

        visaType:
            document.getElementById(
                "visa-type"
            ).value,

        visaIssuedBy:
            document.getElementById(
                "visa-issued-by"
            ).value,

        visaIssuedDate:
            document.getElementById(
                "visa-issued-date"
            ).value,

        stayDuration:
            document.getElementById(
                "stay-duration"
            ).value,

        entryDate:
            document.getElementById(
                "entry-date"
            ).value,

        exitDate:
            document.getElementById(
                "exit-date"
            ).value
    };

} else {

    application.visaHistory = null;

}

saveApplication(application);
}
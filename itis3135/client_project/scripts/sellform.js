// !!! Used the assistance of ChatGPT to help debug and improve my original script, and had it add comments for neatness and clarity
document.addEventListener("DOMContentLoaded", () => {

    const introForm = document.getElementById("introForm");
    const pictureInput = document.getElementById("pictureInput");
    const previewImage = document.getElementById("preview-image");

    //-------------------------------------------------------
    // IMAGE PREVIEW
    //-------------------------------------------------------
    pictureInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            previewImage.src = URL.createObjectURL(file);
        }
    });

    //-------------------------------------------------------
    // FORM SUBMISSION & VALIDATION
    //-------------------------------------------------------
    introForm.addEventListener("submit", function (event) {
        event.preventDefault(); // prevent page reload

        // Collect values
        const firstName = document.getElementById("first_name").value.trim();
        const lastName = document.getElementById("last_name").value.trim();
        const quote = document.getElementById("quote").value.trim();
        const extra = document.getElementById("something_to_share").value.trim();
        const imageFile = pictureInput.files[0];

        // Validation checks
        if (firstName === "" || lastName === "" || quote === "") {
            alert("❌ Please fill out all required fields: First name, Last name, and Collection link");
            return;
        }

        if (!imageFile) {
            alert("❌ Please upload at least one picture of your cards/collection.");
            return;
        }

        // If all good:
        alert("✅ Thank you! Your form has been submitted!");

        //-------------------------------------------------------
        // DISPLAY SUBMITTED INFO BELOW THE FORM
        //-------------------------------------------------------
        displaySubmission(firstName, lastName, quote, extra, imageFile);
    });

    //-------------------------------------------------------
    // FUNCTION TO DISPLAY USER INFO AFTER SUBMISSION
    //-------------------------------------------------------
    function displaySubmission(firstName, lastName, quote, extra, imageFile) {
        // Remove existing display, if any
        let oldDisplay = document.getElementById("submitted-info");
        if (oldDisplay) oldDisplay.remove();

        // Create a container
        const container = document.createElement("div");
        container.id = "submitted-info";
        container.style.marginTop = "40px";
        container.style.padding = "20px";
        container.style.border = "2px solid #ddd";
        container.style.borderRadius = "10px";
        container.style.background = "#363434ff";

        // Create image preview
        const img = document.createElement("img");
        img.src = URL.createObjectURL(imageFile);
        img.width = 250;
        img.style.display = "block";
        img.style.marginBottom = "20px";
        img.style.margin = "0 auto 20px auto";

        // Add text info
        container.innerHTML += `
            <h3>Submission Received:</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>TCGPlayer/Collectr Link:</strong> "${quote}"</p>
            ${extra ? `<p><strong>Additional Comments:</strong> ${extra}</p>` : ""}
        `;

        // Attach image and container to page
        container.prepend(img);
        document.querySelector("main").appendChild(container);
    }

});
// !!! Used the assistance of ChatGPT to help debug and improve my original script, and had it add comments for neatness and clarity
document.addEventListener("DOMContentLoaded", () => {
  // ============================
  // FIX: Get the actual form element by the id we added in HTML
  // ============================
  const formElement = document.getElementById("introForm");

  // ============================
  // 1) Prevent default submission & validate required fields before building page
  // ============================
  formElement.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent page reload
    if (!requiredInfo()) return; // stop if validation fails
    handleFormSubmit(); // proceed to create the new "page"
  });

  // ============================
  // 2) requiredInfo() checks all required fields inside the form
  // ============================
  function requiredInfo() {
    // Only check fields inside this form
    const requiredFields = formElement.querySelectorAll("[required]");
    for (let field of requiredFields) {
      // trim to avoid spaces-only
      if (field.value.trim() === "") {
        alert("⚠️ Please fill out all required fields before submitting.");
        field.focus();
        return false;
      }
    }
    return true;
  }

  // ============================
  // 3) Clear button functionality — clears inputs, textareas, selects, file inputs, and removes dynamic courses
  // ============================
  const clearBtn = document.getElementById("clearBtn");
  clearBtn.addEventListener("click", () => {
    // Clear input, textarea, select inside the form
    formElement.querySelectorAll("input, textarea, select").forEach((field) => {
      if (field.type === "file") {
        // Reliable way to clear file inputs across browsers: replace node
        const newField = field.cloneNode(true);
        field.parentNode.replaceChild(newField, field);
      } else if (field.type === "checkbox" || field.type === "radio") {
        field.checked = false;
      } else {
        field.value = "";
      }
    });

    // Remove dynamically added course-item rows (and also the initial ones if desired)
    formElement.querySelectorAll(".course-item").forEach((node) => node.remove());

    // If you want at least one empty course row to remain, re-add one empty row:
    // (optional — remove or keep depending on assignment expectations)
    const coursesDiv = document.getElementById("courses");
    const emptyCourse = document.createElement("div");
    emptyCourse.className = "course-item";
    emptyCourse.innerHTML = `
      <input type="text" class="course-dept" name="course_dept" placeholder="Dept (e.g. ITIS)">
      <input type="text" class="course-num" name="course_num" placeholder="Number (e.g. 3135)">
      <input type="text" class="course-name" name="course_name" placeholder="Course Name">
      <input type="text" class="course-reason" name="course_reason" placeholder="Reason">
      <button type="button" class="deleteCourseBtn">Delete</button>
    `;
    coursesDiv.appendChild(emptyCourse);

    // Reset preview image to default
    const previewImage = document.getElementById("preview-image");
    if (previewImage) previewImage.src = "images/parth-at-the-beach.jpg";

    // Re-attach delete listener to the new delete button
    attachDeleteListeners();
  });

  // ============================
  // 4) Reset button handler: after native reset runs, restore preview image to default
  // ============================
  formElement.addEventListener("reset", () => {
    // Use a timeout to allow the native reset to finish
    setTimeout(() => {
      const previewImage = document.getElementById("preview-image");
      if (previewImage) previewImage.src = "images/parth-at-the-beach.jpg";
    }, 0);
  });

  // 5) Image preview when user selects a file
  const pictureInput = document.getElementById("pictureInput");
  pictureInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById("preview-image");
      if (preview) preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  // ============================
  // 6) addCourse: dynamically add a course row and attach its delete button
  // ============================
  const addCourseBtn = document.getElementById("addCourseBtn");
  addCourseBtn.addEventListener("click", addCourse);

  function addCourse() {
    const coursesDiv = document.getElementById("courses");
    const courseContainer = document.createElement("div");
    courseContainer.classList.add("course-item");
    courseContainer.style.marginBottom = "10px";

    // Create inputs with same class names the rest of the script expects
    courseContainer.innerHTML = `
      <input type="text" class="course-dept" name="course_dept" placeholder="Dept (e.g. ITIS)" required>
      <input type="text" class="course-num" name="course_num" placeholder="Number (e.g. 3135)" required>
      <input type="text" class="course-name" name="course_name" placeholder="Course Name" required>
      <input type="text" class="course-reason" name="course_reason" placeholder="Reason for taking the course" required>
      <button type="button" class="deleteCourseBtn">Delete</button>
    `;

    coursesDiv.appendChild(courseContainer);

    // Attach delete handler for this new row
    courseContainer.querySelector(".deleteCourseBtn").addEventListener("click", () => {
      courseContainer.remove();
    });
  }

  // Helper to attach delete listeners for any static/delete buttons (useful after Clear)
  function attachDeleteListeners() {
    formElement.querySelectorAll(".deleteCourseBtn").forEach(btn => {
      btn.removeEventListener("click", () => {}); // safe no-op remove
      btn.addEventListener("click", (e) => {
        const parent = e.target.closest(".course-item");
        if (parent) parent.remove();
      });
    });
  }
  // attach to initial delete buttons on load
  attachDeleteListeners();

  // ============================
  // 7) handleFormSubmit: gather data and replace form with formatted introduction
  // ============================
  function handleFormSubmit() {
    // Use FormData to read values (name attributes must match)
    const fd = new FormData(formElement);

    // Gather courses from remaining .course-item elements
    const courses = Array.from(document.querySelectorAll(".course-item")).map(ci => {
      const dept = ci.querySelector(".course-dept") ? ci.querySelector(".course-dept").value : "";
      const num = ci.querySelector(".course-num") ? ci.querySelector(".course-num").value : "";
      const name = ci.querySelector(".course-name") ? ci.querySelector(".course-name").value : "";
      const reason = ci.querySelector(".course-reason") ? ci.querySelector(".course-reason").value : "";
      return {dept, num, name, reason};
    });

    // Build the HTML for the generated introduction page
    const first = fd.get("first_name") || "";
    const middle = fd.get("middle_name") || "";
    const last = fd.get("last_name") || "";
    const nickname = fd.get("nickname") || "";
    const caption = fd.get("picture_caption") || "";
    const personal = fd.get("personal_statement") || "";
    const personal_background = fd.get("personal_background") || "";
    const academic_background = fd.get("academic_background") || "";
    const primary_computer = fd.get("primary_computer") || "";
    const funny_thing = fd.get("funny_thing") || "";
    const something_to_share = fd.get("something_to_share") || "";
    const quote = fd.get("quote") || "";
    const quote_author = fd.get("quote_author") || "";
    const imageSrc = document.getElementById("preview-image").src; // already set by preview or default

    // Compose final HTML (keeps structure similar to your original Introduction)
    const introHTML = `
      <main>
        <h2>Introduction</h2>
        <h2>${first} ${middle} ${last} | ${nickname}</h2>
        <figure>
          <img src="${imageSrc}" alt="${first} ${last}">
          <br><br>
          <figcaption><em>${escapeHTML(caption)}</em></figcaption>
        </figure>
        <ul>
          <li><b>Personal Background:</b> ${escapeHTML(personal_background)}</li>
          <li><b>Academic Background:</b> ${escapeHTML(academic_background)}</li>
          <li><b>Primary Computer:</b> ${escapeHTML(primary_computer)}</li>
          <li><b>Courses I’m taking & Why:</b>
            <ul>
              ${courses.map(c => `<li><b>${escapeHTML(c.dept)} ${escapeHTML(c.num)} - ${escapeHTML(c.name)}:</b> ${escapeHTML(c.reason)}</li>`).join("")}
            </ul>
          </li>
          <li><b>Funny/Interesting Item to Remember me by:</b> ${escapeHTML(funny_thing)}</li>
          <li><b>I’d also like to Share:</b> ${escapeHTML(something_to_share)}</li>
        </ul>
        <br>
        <p><b>“${escapeHTML(quote)}” <b>- ${escapeHTML(quote_author)}</b></b></p>
        <br>
        <button id="redoBtn">Reset and Redo Form</button>
      </main>
    `;

    // Replace existing page content inside <body> with the generated intro
    // Note: we replace the entire main element to avoid leaving the form markup behind
    document.querySelector("main").outerHTML = introHTML;

    // Attach listener to redo button to go back to the original form (reload)
    const redoBtn = document.getElementById("redoBtn");
    if (redoBtn) {
      redoBtn.addEventListener("click", () => {
        window.location.reload(); // reloads original form page and defaults
      });
    }
  }

  // small utility to prevent XSS when injecting user text into HTML
  function escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
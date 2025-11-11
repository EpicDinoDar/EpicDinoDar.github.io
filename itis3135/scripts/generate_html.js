document.getElementById("generateHTMLBtn").addEventListener("click", function () {
  const form = document.getElementById("introForm");
  const formData = new FormData(form);

  const first = formData.get("first_name");
  const middle = formData.get("middle_name") || "";
  const last = formData.get("last_name");
  const preferred = formData.get("nickname") || "";
  const divider = formData.get("divider") || "|";
  const mascotAdj = formData.get("mascot_adjective");
  const mascotAnimal = formData.get("mascot_animal");
  const caption = formData.get("picture_caption");
  const personalStatement = formData.get("personal_statement");
  const personalBackground = formData.get("personal_background");
  const academicBackground = formData.get("academic_background");
  const primaryComputer = formData.get("primary_computer");
  const quote = formData.get("quote");
  const quoteAuthor = formData.get("quote_author");
  const funnyThing = formData.get("funny_thing");
  const somethingToShare = formData.get("something_to_share");

  const courses = [];
  document.querySelectorAll("#courses .course-item").forEach((div) => {
    const inputs = div.querySelectorAll("input");
    courses.push({
      department: inputs[0].value,
      number: inputs[1].value,
      name: inputs[2].value,
      reason: inputs[3].value
    });
  });

  const htmlOutput = `
<h2>Introduction HTML</h2>
<h3>${first} ${middle ? middle + " " : ""}"${preferred}" ${last} ${divider} ${mascotAdj} ${mascotAnimal}</h3>
<figure>
  <img src="images/headshot.jpeg" alt="Headshot of ${first} ${last}" />
  <figcaption>${caption}</figcaption>
</figure>
<ul>
  <li><strong>Personal Statement:</strong> ${personalStatement}</li>
  <li><strong>Personal Background:</strong> ${personalBackground}</li>
  <li><strong>Academic Background:</strong> ${academicBackground}</li>
  <li><strong>Primary Computer:</strong> ${primaryComputer}</li>
  <li><strong>Favorite Quote:</strong> "${quote}" - ${quoteAuthor}</li>
  <li><strong>Funny Thing:</strong> ${funnyThing}</li>
  <li><strong>Something to Share:</strong> ${somethingToShare}</li>
</ul>
<h4>Courses:</h4>
<ul>
  ${courses.map((c) => `<li>${c.department} ${c.number}: ${c.name} — ${c.reason}</li>`).join("\n")}
</ul>
`;

  const main = document.querySelector("main");
  main.innerHTML = `
    <h2>Introduction HTML</h2>
    <section class="code-output">
      <pre><code class="language-html">${htmlOutput.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
      <button id="resetPageBtn">Reset Form</button>
    </section>
  `;
  hljs.highlightAll();

  document.getElementById("resetPageBtn").addEventListener("click", () => location.reload());
});
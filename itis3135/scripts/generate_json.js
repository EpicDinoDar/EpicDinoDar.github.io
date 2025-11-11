document.getElementById("generateJSONBtn").addEventListener("click", function () {
  const form = document.getElementById("introForm");
  const formData = new FormData(form);

  const data = {
    firstName: formData.get("first_name"),
    preferredName: formData.get("nickname"),
    middleInitial: formData.get("middle_name"),
    lastName: formData.get("last_name"),
    divider: formData.get("divider"),
    mascotAdjective: formData.get("mascot_adjective"),
    mascotAnimal: formData.get("mascot_animal"),
    image: "images/headshot.jpeg",
    imageCaption: formData.get("picture_caption"),
    personalStatement: formData.get("personal_statement"),
    personalBackground: formData.get("personal_background"),
    academicBackground: formData.get("academic_background"),
    primaryComputer: formData.get("primary_computer"),
    quote: formData.get("quote"),
    quoteAuthor: formData.get("quote_author"),
    funnyThing: formData.get("funny_thing"),
    somethingToShare: formData.get("something_to_share"),
    courses: []
  };

  document.querySelectorAll("#courses .course-item").forEach((div) => {
    const inputs = div.querySelectorAll("input");
    data.courses.push({
      department: inputs[0].value,
      number: inputs[1].value,
      name: inputs[2].value,
      reason: inputs[3].value
    });
  });

  const jsonOutput = JSON.stringify(data, null, 2);

  const main = document.querySelector("main");
  main.innerHTML = `
    <h2>Introduction JSON</h2>
    <section class="code-output">
      <pre><code class="language-json">${jsonOutput}</code></pre>
      <button id="resetPageBtn">Reset Form</button>
    </section>
  `;
  hljs.highlightAll();

  document.getElementById("resetPageBtn").addEventListener("click", () => location.reload());
});
let data = [];

fetch("suspects.json")
  .then(response => response.json())
  .then(json => {
    data = json;
    displayResults(data);
  });

const input = document.getElementById("searchInput");
input.addEventListener("input", () => {
  const value = input.value.toLowerCase();
  const filtered = data.filter(entry =>
    JSON.stringify(entry).toLowerCase().includes(value)
  );
  displayResults(filtered);
});

function displayResults(entries) {
  const ul = document.getElementById("results");
  ul.innerHTML = "";

  if (entries.length === 0) {
    ul.innerHTML = "<li>Aucun résultat trouvé.</li>";
    return;
  }

  entries.forEach(entry => {
    const li = document.createElement("li");
    const name = entry.commenter_name || entry.author || "Inconnu";
    const text = entry.comment_text || entry.text || "(aucun texte)";
    li.innerHTML = `<strong>${name}</strong><br>${text}`;
    ul.appendChild(li);
  });
}

<script>
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
    const comment = entry.comment_text || entry.text || "(aucun texte)";
    const videoId = entry.video_id || "Non précisé";
    const timestamp = entry.timestamp || "Non précisé";
    const profile = entry.profile_details || {};
    const profileUrl = profile.channel_url || `https://www.youtube.com/channel/${profile.channelId}`;
    
    const suspicion = [];
    if (entry.is_pseudo_suspect) suspicion.push("🔴 Pseudo suspect");
    if (entry.is_comment_text_suspect) suspicion.push("🟠 Commentaire suspect");

    const suspicionText = suspicion.length > 0 ? suspicion.join(", ") : "🟢 Aucun signe suspect";

    li.innerHTML = `
      <strong>${name}</strong> (${entry.commenter_id})<br>
      <em>${comment}</em><br>
      📺 <strong>Vidéo :</strong> <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">${videoId}</a><br>
      🕒 <strong>Date :</strong> ${timestamp}<br>
      <hr>
      👤 <strong>Chaîne :</strong> <a href="${profileUrl}" target="_blank">${profile.title || "Non précisé"}</a><br>
      📅 Créée le : ${new Date(profile.publishedAt).toLocaleDateString()}<br>
      👁️‍🗨️ Vues : ${profile.viewCount || 0} | 🎥 Vidéos : ${profile.videoCount || 0} | 👥 Abonnés : ${profile.subscriberCount || 0}<br>
      ⚠️ <strong>Statut :</strong> ${suspicionText}
    `;
    
    ul.appendChild(li);
  });
}
</script>


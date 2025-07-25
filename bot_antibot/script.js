document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const ul = document.getElementById("results");
  let data = [];

  async function loadData() {
    try {
      const response = await fetch("suspects.json");
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const json = await response.json();
      data = Array.isArray(json) ? json : [];
      displayResults(data);
    } catch (error) {
      ul.innerHTML = `<li style="color:red;">Erreur de chargement : ${error.message}</li>`;
      console.error("Erreur lors du chargement du JSON :", error);
    }
  }

  function displayResults(entries) {
    ul.innerHTML = "";

    if (!entries || entries.length === 0) {
      ul.innerHTML = "<li>Aucun résultat trouvé.</li>";
      return;
    }

    for (const entry of entries) {
      const li = document.createElement("li");

      const name = entry.commenter_name || entry.author || "Inconnu";
      const comment = entry.comment_text || entry.text || "(aucun texte)";
      const videoId = entry.video_id || "Non précisé";
      const timestamp = entry.timestamp || "Non précisé";

      const profile = entry.profile_details || {};
      const channelId = profile.channelId || "unknown";
      const profileUrl = profile.channel_url || `https://www.youtube.com/channel/${channelId}`;
      const profileTitle = profile.title || "Chaîne inconnue";
      const profileDate = profile.publishedAt ? new Date(profile.publishedAt).toLocaleDateString() : "Non précisée";
      const profileViews = profile.viewCount ?? "Inconnu";
      const profileVideos = profile.videoCount ?? "Inconnu";
      const profileSubs = profile.subscriberCount ?? "Inconnu";

      const suspicions = [];
      if (entry.is_pseudo_suspect) suspicions.push("🔴 Pseudo suspect");
      if (entry.is_comment_text_suspect) suspicions.push("🟠 Commentaire suspect");

      const suspicionText = suspicions.length > 0 ? suspicions.join(" / ") : "🟢 Aucun signe suspect";

      li.innerHTML = `
        <div style="margin-bottom: 10px;">
          <strong>🧑 Nom :</strong> ${name}<br>
          <strong>🆔 ID :</strong> ${entry.commenter_id || "Non précisé"}<br>
          <strong>💬 Commentaire :</strong> <em>${comment}</em><br>
          <strong>📺 Vidéo :</strong> <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">${videoId}</a><br>
          <strong>🕒 Date :</strong> ${timestamp}<br>
          <hr>
          <strong>Chaîne :</strong> <a href="${profileUrl}" target="_blank">${profileTitle}</a><br>
          <strong>📅 Créée le :</strong> ${profileDate}<br>
          <strong>👁️‍🗨️ Vues :</strong> ${profileViews} | 
          <strong>🎥 Vidéos :</strong> ${profileVideos} | 
          <strong>👥 Abonnés :</strong> ${profileSubs}<br>
          <strong>⚠️ Statut :</strong> ${suspicionText}
        </div>
      `;

      ul.appendChild(li);
    }
  }

  input.addEventListener("input", () => {
    const value = input.value.trim().toLowerCase();
    const filtered = data.filter(entry =>
      JSON.stringify(entry).toLowerCase().includes(value)
    );
    displayResults(filtered);
  });

  loadData();
});

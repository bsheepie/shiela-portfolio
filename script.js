document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const muteButton = document.getElementById("muteButton");
  const iconMuted = document.getElementById("iconMuted");
  const iconPlaying = document.getElementById("iconPlaying");

  if (!bgMusic || !muteButton || !iconMuted || !iconPlaying) {
    return;
  }

  let isPlaying = false;

  function updateButton() {
    const playing = isPlaying && !bgMusic.muted;

    iconMuted.style.display = playing ? "none" : "block";
    iconPlaying.style.display = playing ? "block" : "none";

    muteButton.setAttribute(
      "aria-label",
      playing ? "Mute background music" : "Play background music"
    );
    muteButton.setAttribute(
      "title",
      playing ? "Mute background music" : "Play background music"
    );
  }

  muteButton.addEventListener("click", async () => {
    if (!isPlaying) {
      try {
        bgMusic.muted = false;
        await bgMusic.play();

        isPlaying = true;
        updateButton();
      } catch (error) {
        console.error("Music could not be played:", error);
      }

      return;
    }

    bgMusic.muted = !bgMusic.muted;
    updateButton();
  });

  updateButton();
});
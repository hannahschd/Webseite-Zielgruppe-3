const section = document.querySelector(".zoom-section");
const text = document.querySelector(".zoom-text");
const image = document.querySelector(".zoom-image");
const icons = document.querySelectorAll(".icon"); // NEU
const bottomText = document.querySelector(".bottom-text");

function animateOnScroll() {
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const scrollProgress = 1 - Math.max(0, Math.min(1, rect.top / windowHeight));

  // TEXT ZOOM
  const textScale = 1 + scrollProgress * 1.5;
  text.style.transform = `translate(-50%, -50%) scale(${textScale})`;

  // BILD ZOOM
  if (scrollProgress > 0.4) {
    const imgProgress = (scrollProgress - 0.4) / 0.6;
    const imageScale = 0.4 + imgProgress * 0.6;
    image.style.opacity = `${Math.min(imgProgress, 1)}`;
    image.style.transform = `translate(-50%, -50%) scale(${imageScale})`;
  } else {
    image.style.opacity = 0;
    image.style.transform = `translate(-50%, -50%) scale(0.4)`;
  }

  // ICON ANIMATION (NEU)
  icons.forEach(icon => {
  if (scrollProgress > 0.4) {
    const iconProgress = (scrollProgress - 0.4) / 0.6; // normalisieren auf 0–1
    const iconScale = 1 + iconProgress * 0.3;
    const iconOpacity = iconProgress > 1 ? 1 : iconProgress;
    icon.style.opacity = iconOpacity;
    icon.style.transform = `scale(${iconScale})`;
  } else {
    icon.style.opacity = 0;
    icon.style.transform = "scale(1)";
  }
});

// BOTTOM TEXT – einblenden bei Scrollfortschritt > 0.5
if (scrollProgress > 0.5) {
  const textProgress = (scrollProgress - 0.5) / 0.5; // normalisieren
  const opacity = Math.min(textProgress, 1);
  bottomText.style.opacity = opacity;
} else {
  bottomText.style.opacity = 0;
}

  requestAnimationFrame(animateOnScroll);
}

window.addEventListener('scroll', animateOnScroll); // <--- Das hinzufügen!
animateOnScroll();
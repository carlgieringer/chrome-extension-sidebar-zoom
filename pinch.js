const div = document.getElementById("the-div");
const rect = document.getElementById("inner-rect");

let isDragging = false;
let startX, startY;
let translateX = 0,
  translateY = 0;
let scale = 1;
const minScale = 0.5;
const maxScale = 3;

div.addEventListener("wheel", handleZoom);

function handleZoom(event) {
  event.preventDefault();
  const { ctrlKey, deltaX, deltaY } = event;

  if (ctrlKey) {
    console.log("User is pinch-zooming.");
    const delta = event.deltaY > 0 ? 0.9 : 1.1;
    scale *= delta;
    scale = Math.max(minScale, Math.min(maxScale, scale));
  } else {
    console.log("User is panning.");
    translateX += deltaX;
    translateY += deltaY;
  }
  updateRectTransform();
}

function updateRectTransform() {
  const maxTranslateX = (div.clientWidth - rect.clientWidth * scale) / 2;
  const maxTranslateY = (div.clientHeight - rect.clientHeight * scale) / 2;

  translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
  translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));

  rect.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

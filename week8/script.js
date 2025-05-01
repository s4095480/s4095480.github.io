const myVideo = document.querySelector("#my-video");
console.log(myVideo);

//play pause logic/muteunmute logic
//1. fetch the right plau pause button
const fullscreenButton = document.querySelector("#fullscreen-button");
console.log(fullscreenButton);

myVideo.addEventListener("dblclick", goFullscreen);
//2. listen to the click event on the button
fullscreenButton.addEventListener("click", goFullscreen);

//3. write the function that will play and pause the video
function goFullscreen() {
  //   if (myVideo.paused || myVideo.ended) {
  //     myVideo.play();
  //   } else {
  //     myVideo.pause();
  //   }
  if (!document.fullscreenElement) {
    myVideo.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
// ------------------------------------------------

//play pause logic/muteunmute logic
//1. fetch the right plau pause button
const heartButton = document.querySelector("#heart-button");
console.log(heartButton);

//2. listen to the click event on the button
heartButton.addEventListener("click", updateLikes);

let likes = 0;
const likesContainer = document.querySelector("#likes");
console.log(likesContainer);

//3. write the function that will play and pause the video
function updateLikes() {
  likes++;
  likesContainer.textContent = likes;
}
// ------------------------------------------------

//play pause logic/muteunmute logic
//1. fetch the right plau pause button
myVideo.addEventListener("timeupdate", updateProgress);

const progressBar = document.querySelector("#progress-bar");
console.log(progressBar);

//2. listen to the click event on the button
function updateProgress() {
  let progress = (myVideo.currentTime / myVideo.duration) * 100;
  progressBar.style.width = progress + "%";
}

// ------------------------------------------------

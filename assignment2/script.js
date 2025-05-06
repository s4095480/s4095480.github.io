const video = document.querySelector("#custom-video-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");

//
const play = document.querySelector(".play");
previous = document.querySelector(".prev");
next = document.querySelector(".next");
//
trackImage = document.querySelector(".track-image");
title = document.querySelector(".title");
artist = document.querySelector(".artist");
//
showVolume = document.querySelector("#show-volume");
volumeIcon = document.querySelector("#volume-icon");
currentVolume = document.querySelector("#volume");
//
trackCurrentTime = document.querySelector(".current-time");
trackDuration = document.querySelector(".duration-time");

//TRACKLIST!!!

let trackList = [
  {
    name: "Hes",
    path: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Hes.mp3",
    artist: "blank",
  },
  {
    name: "Dry Down feat Ben Snaath",
    path: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Dry-Down-feat-Ben-Snaath.mp3",
    artist: "blank",
  },
  {
    name: "Leapt",
    path: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Leapt.mp3",
    artist: "blank",
  },
  {
    name: "Water Feature",
    path: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Water-Feature.mp3",
    artist: "blank",
  },
];

video.removeAttribute("controls");
playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("timeupdate", updateProgressBar);
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

//mute sound
function muteSound() {
  track.volume = 0;
  showVolume.innerHTML = 0;
  currentVolume.value = 0;
}

//change volume
function changeVolume() {
  showVolume.value = currentVolume.value;
  track.volume = currentVolume.value / 100;
}

function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}
// Add other functionalities here

// Flip album cover
function flipCover(el) {
  el.classList.toggle("flipped");
}

// let stuff
let track = document.createElement("audio");
let indexTrack = 0;
let songIsPlaying = false;

// all event listeners
play.addEventListener("click", justPlay);
next.addEventListener("click", nextSong);
previous.addEventListener("click", prevSong);
volumeIcon.addEventListener("click", muteSound);
currentVolume.addEventListener("change", changeVolume);

//load tracks
function loadTrack(indexTrack) {
  clearInterval(timer);
  track.src = trackList[indexTrack].path;
  trackImage.src = trackList[indexTrack].img;
  title.innerHTML = trackList[indexTrack].name;
  artist.innerHTML = trackList[indexTrack].artist;
  track.load();

  timer = setInterval(updateSlider, 1000);
}
loadTrack(indexTrack);

//play song or pause song
function justPlay() {
  if (songIsPlaying == false) {
    playSong();
  } else {
    pauseSong();
  }
}

//play song
function playSong() {
  track.play();
  songIsPlaying = true;
  play.innerHTML = '<i class="fas fa-pause"></i>';
}

//pause song
function pauseSong() {
  track.pause();
  songIsPlaying = false;
  play.innerHTML = '<i class="fas fa-play"></i>';
}

//display tracks in a playlist
let counter = 1;
function displayTracks() {
  for (let i = 0; i < trackList.length; i++) {
    console.log(trackList[1].name);
    let div = document.createElement("div");
    div.classList.add("playlist");
    div.innerHTML = `
    <span class="song-index">${counter++}</span>
            <p class="single-song">${trackList[1].name}</p>
    `;
    pDiv.appendChild(div);
  }
  playFromPlaylist();
}
// displayTracks();

// //Play song from playlist
// function playFromPlaylist() {
//   pDiv.addEventListener("click", (e) => {
//     if (e.target.classList.contains("single-song")) {
//       alert(e.target.innerHTML);
//       const indexNum = trackList.findIndex((item, index) => {
//         if (item.name === e.target.innerHTML) {
//           return true;
//         }
//       });
//       loadTrack(indexNum);
//       playSong();
//     }
//   });
// }
function playFromPlaylist() {
  playlistContainer.addEventListener("click", (e) => {
    const songElement = e.target.closest(".playlist");
    if (songElement) {
      const indexNum = songElement.getAttribute("data-index");
      loadTrack(indexNum);
      playSong();
    }
  });
}

// Define the playlist container
const playlistContainer = document.querySelector(".playlist-div");

function displayTracks() {
  playlistContainer.innerHTML = ""; // clear before adding
  trackList.forEach((track, index) => {
    const div = document.createElement("div");
    div.classList.add("playlist");
    div.setAttribute("data-index", index);
    div.innerHTML = `
      <span class="song-index">${index + 1}</span>
      <p class="single-song">${track.name}</p>
    `;
    playlistContainer.appendChild(div);
  });
}

displayTracks();
playFromPlaylist();

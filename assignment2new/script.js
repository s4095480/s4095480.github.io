const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause-btn");
const playPauseImg = document.getElementById("play-pause-img");
const progressBar = document.getElementById("progress-bar-fill");
const playlist = document.getElementById("playlist").getElementsByTagName("li");
const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const muteUnmuteBtn = document.getElementById("mute-unmute-btn");
const muteUnmuteImg = document.getElementById("mute-unmute-img");
const trackName = document.getElementById("track-name"); //references the span element
const decreaseVolumeBtn = document.getElementById("decrease-volume-btn");
const increaseVolumeBtn = document.getElementById("increase-volume-btn"); //references the new volume buttons
const currentTime = document.getElementById("current-time"); //references the current time element
const totalTime = document.getElementById("total-time"); //references the total time element
const flipCardInner = document.querySelector(".flip-card-inner");
const trackImage = document.getElementById("track-image");
const trackInfoTitle = document.getElementById("track-info-title");
const trackInfo = document.getElementById("track-info"); //related to flippy card thingy

let isPlaying = false;
let currentIndex = 0;
let isFlipped = false;

// Playlist array with images and info
const playlistArray = [
  {
    // included the image source
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Hes.mp3",
    // and the name of the track
    name: "Hes",
    image:
      "https://mrwallpaper.com/images/hd/liquid-abstract-dark-and-blue-aesthetic-laptop-15hvaune8yxlqlss.jpg",
    // and minimal information (made up since i dont know anything about the tracks themselves)
    info: "Electronic track from IM-2250",
  },
  {
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Dry-Down-feat-Ben-Snaath.mp3",
    name: "Dry Down feat Ben Snaath",
    image:
      "https://t4.ftcdn.net/jpg/13/75/68/05/360_F_1375680595_cHiZkjFj2UDgyMLRGdh2Z5qO7QWBEbNg.jpg",
    info: "Collaborative electronic piece from IM-2250",
  },
  {
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Leapt.mp3",
    name: "Leapt",
    image:
      "https://t3.ftcdn.net/jpg/13/75/68/60/360_F_1375686007_XfPdpvc4Gz7YxNXxrQ6Y1EUx1l0d5DSq.jpg",
    info: "Upbeat electronic track from IM-2250",
  },
  {
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Water-Feature.mp3",
    name: "Water Feature",
    image:
      "https://www.shutterstock.com/image-illustration/illustration-woman-falling-underwater-surreal-600nw-1847404702.jpg",
    info: "Ambient electronic track from IM-2250",
  },
];

//  i set the first track as the default audio source and the flip card
audio.src = playlistArray[0].src;
trackImage.src = playlistArray[0].image;
trackInfoTitle.textContent = playlistArray[0].name;
trackInfo.textContent = playlistArray[0].info;

// Toggle flip card on click
flipCardInner.addEventListener("click", () => {
  isFlipped = !isFlipped;
  flipCardInner.style.transform = isFlipped
    ? "rotateY(180deg)"
    : "rotateY(0deg)";
});

//update the total time when the metadata is loaded
//meant to ensure that the total time shows up as soon as the track loads
audio.addEventListener("loadedmetadata", () => {
  totalTime.textContent = formatTime(audio.duration);
});

//format time in minutes and seconds (MM:SS)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`; //this confused me so i did have to watch a youtube video to understand and figure this out
}

// Toggle play/pause
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseImg.src =
      "https://img.icons8.com/ios-glyphs/30/ffffff/pause--v1.png";
    isPlaying = true;
    //setting the track name for only when the user presses play
    trackName.textContent = playlistArray[currentIndex].name;
  } else {
    audio.pause();
    playPauseImg.src =
      "https://img.icons8.com/ios-glyphs/30/ffffff/play--v1.png";
    isPlaying = false;
  }
});

// Toggle mute/unmute
muteUnmuteBtn.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/ffffff/no-audio--v1.png";
  } else {
    audio.muted = true;
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/ffffff/mute--v1.png";
  }
});

//decreases the volume
decreaseVolumeBtn.addEventListener("click", () => {
  if (audio.volume > 0.1) {
    //adjusts the volume by 0.1 increments and avoids negative or overly large values
    audio.volume -= 0.1;
  }
});

//increases the volume
increaseVolumeBtn.addEventListener("click", () => {
  if (audio.volume < 0.9) {
    audio.volume += 0.1;
  }
});

//i noticed that when i pressed the play button when first loading the website, nothing happened unless i pressed a certain track.
//this allowed me to have the first track as the default audio source upon the page loading.
audio.src = playlistArray[0].src;
// trackName.textContent = playlistArray[0].name;
// ^ removed this to prevent the now playing from showing the track name unti lthe user presses the play button

// Update progress bar as well as the current time
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + "%";
  currentTime.textContent = formatTime(audio.currentTime);
});

// Play previous track
previousBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + playlistArray.length) % playlistArray.length;
  playTrack(currentIndex);
});

// Play next track
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlistArray.length;
  playTrack(currentIndex);
});

// Click on playlist item
Array.from(playlist).forEach((item, index) => {
  item.addEventListener("click", () => {
    currentIndex = index;
    playTrack(currentIndex);
  });
});

// Function to play a track at a specific index
function playTrack(index) {
  audio.src = playlistArray[index].src;
  trackName.textContent = playlistArray[index].name; //ensuring the current name is displayed when a track is played
  trackImage.src = playlistArray[index].image;
  trackInfoTitle.textContent = playlistArray[index].name;
  trackInfo.textContent = playlistArray[index].info;
  //   track image decided not to work once i did the flippy thing and kept staying on the 'hes' track for now playing and image
  //  ensures the flip cards image and information update to the selected track
  audio.play();
  playPauseImg.src =
    "https://img.icons8.com/ios-glyphs/30/ffffff/pause--v1.png";
  isPlaying = true;
  isFlipped = false;
  audio.addEventListener(
    "loadedmetadata",
    () => {
      totalTime.textContent = formatTime(audio.duration);
    },
    { once: true } //ensures the event listener is removed after going once to avoid multiple triggers
  );
}

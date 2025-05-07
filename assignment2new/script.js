// theres probably going to be a lot of notes here, i apologise, a lot of it was actually for my own reference so i wouldnt get confused. i know the limit was 300-500, i might be way over that so i apologise!!
//also i did use ai to 'clean up' a lot of the code after, mainly because i did include things that repeated, so it essentially just got rid of the unnecessary code/elements and rearranged some things
// youtube tutorial i used https://www.youtube.com/playlist?list=PLQfqQHJBFM1-58ouvTLQgrBKCEV67o0ow
//card flipping https://www.w3schools.com/howto/howto_css_flip_card.asp
// and https://codepen.io/wochap/pen/BzvOep
//understanding arrays https://www.w3schools.com/jS/js_arrays.asp
// more arrays and index https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

const audio = document.getElementById("audio"); //references audio
const playPauseBtn = document.getElementById("play-pause-btn"); //references the play/pause button
const playPauseImg = document.getElementById("play-pause-img"); //references the play/pause image
const progressBar = document.getElementById("progress-bar-fill"); //references the progress bar fillign
const playlist = document.getElementById("playlist").getElementsByTagName("li"); //references the playlist
const previousBtn = document.getElementById("previous-btn"); //references the previous button
const nextBtn = document.getElementById("next-btn"); //references the next button
const muteUnmuteBtn = document.getElementById("mute-unmute-btn"); //references mute/unmute button
const muteUnmuteImg = document.getElementById("mute-unmute-img"); //references the mute/unmute image
const trackName = document.getElementById("track-name"); //references the span element
const decreaseVolumeBtn = document.getElementById("decrease-volume-btn");
const increaseVolumeBtn = document.getElementById("increase-volume-btn"); //references the new volume buttons
const currentTime = document.getElementById("current-time"); //references the current time element
const totalTime = document.getElementById("total-time"); //references the total time element
const flipCardInner = document.querySelector(".flip-card-inner");
const trackImage = document.getElementById("track-image");
const trackInfoTitle = document.getElementById("track-info-title");
const trackInfo = document.getElementById("track-info"); //related to flippy card thingy

//initialises the state variables
let isPlaying = false;
//tracks whether the audio is playing
let currentIndex = 0;
//index of the current track in the playlistArray
let isFlipped = false;
//tracks whether the flip card is flipped to the back side

// Playlist array with images and info including source and name
const playlistArray = [
  {
    // included the image source
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Hes.mp3",
    // and the name of the track
    name: "Hes",
    image:
      "https://mrwallpaper.com/images/hd/liquid-abstract-dark-and-blue-aesthetic-laptop-15hvaune8yxlqlss.jpg",
    // and minimal information (made up since i dont know anything about the tracks themselves but felt like a cool feature to include)
    info: "Dark, blue, abstract track",
  },
  {
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Dry-Down-feat-Ben-Snaath.mp3",
    name: "Dry Down feat Ben Snaath",
    image:
      "https://t4.ftcdn.net/jpg/13/75/68/05/360_F_1375680595_cHiZkjFj2UDgyMLRGdh2Z5qO7QWBEbNg.jpg",
    info: "Defiant, energetic track",
  },
  {
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Leapt.mp3",
    name: "Leapt",
    image:
      "https://t3.ftcdn.net/jpg/13/75/68/60/360_F_1375686007_XfPdpvc4Gz7YxNXxrQ6Y1EUx1l0d5DSq.jpg",
    info: "Upbeat energetic acceptance track",
  },
  {
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Water-Feature.mp3",
    name: "Water Feature",
    image:
      "https://www.shutterstock.com/image-illustration/illustration-woman-falling-underwater-surreal-600nw-1847404702.jpg",
    info: "Ambient sad abstract track",
    // all of these images should be royalty/copyright free. i sincerely apologise if they aren't.
  },
];

//  i set the first track as the default audio source and the flip card
audio.src = playlistArray[0].src;
// i noticed that when i pressed the play button when first loading the website, nothing happened until i pressed a certain rtrack
// this allowed me to have the first track as the default audio source upon the page loading
// i also purposefully had it so that when something was paused, it would say no audio playing when the card is flipped and now playing doesnt show anything.
// this was to encourage the user to play the music, which is the site's overall purpose and function.

// Toggle flip card on click
flipCardInner.addEventListener("click", () => {
  isFlipped = !isFlipped;
  //   toggles the flip state
  flipCardInner.style.transform = isFlipped
    ? "rotateY(180deg)"
    : "rotateY(0deg)";
  // rotates to the back or the front
});

//update the total time when the metadata is loaded
//meant to ensure that the total time shows up as soon as the track loads
audio.addEventListener("loadedmetadata", () => {
  totalTime.textContent = formatTime(audio.duration);
});

//format time in minutes and seconds (MM:SS)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  // calculates the minutes
  const secs = Math.floor(seconds % 60);
  //   calculates the remaining seconds
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`; //this confused me so i did have to search up to understand and figure this out
  // but as i understand it, this formats it as MM:SS and adds a zero at the front if the seconds are less than 10
  // https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
}

// Toggle play/pause button clicks
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    // if the audio is paused or stopped
    audio.play();
    // starts playing
    playPauseImg.src =
      "https://img.icons8.com/ios-glyphs/30/ffffff/pause--v1.png";
    //   this shows the pause icon
    isPlaying = true;
    //setting the track name for only when the user presses play
    trackName.textContent = playlistArray[currentIndex].name;
    trackImage.src = playlistArray[currentIndex].image;
    // updates the flip card image
    trackInfoTitle.textContent = playlistArray[currentIndex].name;
    // updates the flip card track name
    trackInfo.textContent = playlistArray[currentIndex].info;
    //updating the event listener to set the flip card image when its actually playing
  } else {
    // so if the audio is playing
    audio.pause();
    // pause the playback
    playPauseImg.src =
      "https://img.icons8.com/ios-glyphs/30/ffffff/play--v1.png";
    //   show the play icon
    isPlaying = false;
    // update the playing state
    trackName.textContent = "";
    // clear the now playing text
    trackInfoTitle.textContent = "No Track Playing";
    trackInfo.textContent = "Select a track to start";
    // resets the flip card title and information
  }
});

// Toggle mute/unmute button clicks
muteUnmuteBtn.addEventListener("click", () => {
  if (audio.muted) {
    //if the audio is muted
    audio.muted = false;
    //unmute
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/ffffff/no-audio--v1.png";
    //   show the unmute icon
  } else {
    //if the audio isnt muted
    audio.muted = true;
    // mute it
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/ffffff/mute--v1.png";
  }
  //   and then show the mute icon
});

//decreases the volume
decreaseVolumeBtn.addEventListener("click", () => {
  if (audio.volume > 0.1) {
    //if the volume is above the minimum
    //adjusts the volume by 0.1 increments and avoids negative or overly large values
    audio.volume -= 0.1;
  }
});

//increases the volume
increaseVolumeBtn.addEventListener("click", () => {
  if (audio.volume < 0.9) {
    audio.volume += 0.1;
  }
  //   so pretty much the same as above but if the volume is below the maximum
});

//i noticed that when i pressed the play button when first loading the website, nothing happened unless i pressed a certain track.
//this allowed me to have the first track as the default audio source upon the page loading.
audio.src = playlistArray[0].src;
// trackName.textContent = playlistArray[0].name;
// ^ removed this to prevent the now playing from showing the track name unti lthe user presses the play button

// Update progress bar as well as the current time
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  //   calculates the progress percentage
  progressBar.style.width = percent + "%";
  //   updates the progress bar width
  currentTime.textContent = formatTime(audio.currentTime);
  //   updates the current time (but displaying it)
});

// Play previous track button clicks
previousBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + playlistArray.length) % playlistArray.length;
  // move to the previous track and wraps it around if its at the start
  playTrack(currentIndex);
  //   plays the selected track
});

// Play next track button clicks
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlistArray.length;
  //   move to the next track and wrap it around if its at the end
  playTrack(currentIndex);
  //   play the selected track
});

// Click on the playlist item
Array.from(playlist).forEach((item, index) => {
  item.addEventListener("click", () => {
    currentIndex = index;
    // selects the current track index
    playTrack(currentIndex);
    // play the selected track
  });
});

// Function to play a track at a specific index
function playTrack(index) {
  audio.src = playlistArray[index].src;
  //   set the audio source to the track's url
  trackName.textContent = playlistArray[index].name; //ensuring the current name is displayed when a track is played
  trackImage.src = playlistArray[index].image; //then updating the flip card image
  trackInfoTitle.textContent = playlistArray[index].name; //and then updating the flip card track name
  trackInfo.textContent = playlistArray[index].info; //and then the flip card information
  //   track image decided not to work once i did the flippy thing and kept staying on the 'hes' track for now playing and image
  //  ensures the flip cards image and information update to the selected track
  audio.play();
  //   starts playing the track
  playPauseImg.src =
    "https://img.icons8.com/ios-glyphs/30/ffffff/pause--v1.png";
  // shows the pause icon
  isPlaying = true;
  //   update playing state
  isFlipped = false;
  //   reset flip card to the front side
  audio.addEventListener(
    "loadedmetadata",
    () => {
      totalTime.textContent = formatTime(audio.duration);
    },
    { once: true } //ensures the event listener is removed after going once to avoid multiple triggers
  );
}

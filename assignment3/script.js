// Getting references to the html elements here:
const audio = document.getElementById("audio"); // references the audio player
const playPauseBtn = document.getElementById("play-pause-btn"); // play/pause button
const playPauseImg = document.getElementById("play-pause-img"); // play/pause icon/image
const menuBtn = document.getElementById("menu-btn"); // menu button
const previousBtn = document.getElementById("previous-btn"); // previous button
const nextBtn = document.getElementById("next-btn"); // next button
const albumCover = document.getElementById("album-cover"); // album/song cover image
const songDetails = document.getElementById("song-details"); // song details div
const songTitle = document.getElementById("song-title"); // song title
const songArtist = document.getElementById("song-artist"); // song artist
const songWeeks = document.getElementById("song-weeks"); // weeks at #1
const songRelease = document.getElementById("song-release"); // release date
const defaultScreen = document.getElementById("default-screen"); //default screen reference
const songAlbum = document.getElementById("song-album"); //song album name
const songGenre = document.getElementById("song-genre"); //song genre name
const songYear = document.getElementById("song-year"); //song year

// initialises the state variables
let isPlaying = false; // Tracks audio playback
let currentIndex = -1; // Start at -1 for default screen (normally would be 0 for 2010)
let isDetailsView = false; // Tracks the screen view (album cover or details)

// Song data for 2010–2019 Billboard Hot 100 #1 songs
// These are for songs that were ultimately number 1 that topped the end of year chart, not necessarily the longest running number 1 song of the year.
// For example, in 2016 'Closer' by The Chainsmokers was the longest running number 1 song of the year, Love Yourself by Justin Bieber was the number 1 song in the year end chart.
// The images I've used here are for the most part copy and pasted from that song's Wikipedia page. From the site you sent me about legal stuff, it seems as though I'm allowed to use it as long as it's for educational purposes and I credit them.
// I've chosen to use royalty free music to avoid legal issues. These songs are highly different to the original pop songs, but I figured it would be more amusing this way.
const songs = [
  {
    title: "Tik Tok",
    year: 2010,
    artist: "Kesha",
    album: "Animal",
    weeks: 9,
    release: "Aug 7, 2009",
    cover: "https://i.scdn.co/image/ab67616d0000b27319637de797a19338d059acb7",
    audio:
      "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Dance%20of%20the%20Sugar%20Plum%20Fairy.mp3",
    genre: "Dance-Pop",
  },
  {
    title: "Rolling in the Deep",
    year: 2011,
    artist: "Adele",
    album: "21",
    weeks: 7,
    release: "Nov 29, 2010",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/7/74/Adele_-_Rolling_in_the_Deep.png",
    audio:
      "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Shades%20of%20Spring.mp3",
    genre: "Soul-Pop",
  },
  {
    title: "Somebody That I Used to Know",
    year: 2012,
    artist: "Gotye ft. Kimbra",
    album: "Making Mirrors",
    weeks: 8,
    release: "Jul 5, 2011",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/c/c1/Gotye_featuring_Kimbra_-_Somebody_That_I_Used_to_Know.png",
    audio:
      "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Carefree.mp3",
    genre: "Indie-Pop",
  },
  {
    title: "Thrift Shop",
    year: 2013,
    artist: "Macklemore & Ryan Lewis ft. Wanz",
    album: "The Heist",
    weeks: 6,
    release: "Aug 27, 2012",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/0/0e/Macklemore_-_Thrift_Shop.jpg",
    audio:
      "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Funkorama.mp3",
    genre: "Pop-Rap",
  },
  {
    title: "Happy",
    year: 2014,
    artist: "Pharrell Williams",
    album: "Despicable Me 2: Original Motion Picture Soundtrack",
    weeks: 10,
    release: "Nov 21, 2013",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/23/Pharrell_Williams_-_Happy.jpg",
    audio:
      "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Beachfront%20Celebration.mp3",
    genre: "Soul-Pop",
  },
  {
    title: "Uptown Funk",
    year: 2015,
    artist: "Mark Ronson ft. Bruno Mars",
    album: "Uptown Special",
    weeks: 14,
    release: "Nov 10, 2014",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/a/a7/Mark_Ronson_-_Uptown_Funk_%28feat._Bruno_Mars%29_%28Official_Single_Cover%29.png",
    audio:
      "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Funky%20Chunk.mp3",
    genre: "Funk-Pop",
  },
  //   The album/song cover for Uptown Funk is just like that (with the white borders)
  // It doesn't look very pretty, but I wanted to stay consistent with using the same covers as each other (from Wikipedia)
  {
    title: "Love Yourself",
    year: 2016,
    artist: "Justin Bieber",
    album: "Purpose",
    weeks: 2,
    release: "Nov 9, 2015",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/0/0b/JustinBieberLoveYourself.png",
    audio:
      "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Easy%20Lemon.mp3",
    genre: "Soul-Pop",
  },
  {
    title: "Shape of You",
    year: 2017,
    artist: "Ed Sheeran",
    album: "÷",
    weeks: 12,
    release: "Jan 6, 2017",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
    audio:
      "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Cheery%20Monday.mp3",
    genre: "Pop",
  },
  {
    title: "God’s Plan",
    year: 2018,
    artist: "Drake",
    album: "Scorpion",
    weeks: 11,
    release: "Jan 19, 2018",
    cover:
      "https://i.namu.wiki/i/o5aUU8_xJle1YZBGEOAg82SbYo9ax-PvC-gOhovQT3mMjpjSPtep7932c2bLintNKqJOr9pD2FGtkd8oJr1NmA.webp",
    audio:
      "https://incompetech.com/music/royalty-free/mp3-royaltyfree/B-Roll.mp3",
    genre: "Pop-Rap",
  },
  {
    title: "Old Town Road",
    year: 2019,
    artist: "Lil Nas X ft. Billy Ray Cyrus",
    album: "7",
    weeks: 19,
    release: "Dec 3, 2018",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/1/1c/Old_Town_Road_cover.jpg",
    audio:
      "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Whiskey%20on%20the%20Mississippi.mp3",
    genre: "Country-Rap",
  },
];

// the function that updates the screen content
function updateScreen() {
  if (currentIndex === -1) {
    defaultScreen.classList.remove("hidden");
    albumCover.classList.add("hidden");
    songDetails.classList.add("hidden");
  } else {
    defaultScreen.classList.add("hidden");
    const song = songs[currentIndex];
    if (isDetailsView) {
      //shows the song details
      albumCover.classList.add("hidden");
      songDetails.classList.remove("hidden");
      songTitle.textContent = song.title;
      songYear.textContent = song.year;
      songArtist.textContent = `Artist: ${song.artist}`;
      songAlbum.textContent = `Album: ${song.album}`;
      songWeeks.textContent = `Weeks at #1: ${song.weeks}`;
      songRelease.textContent = `Release Date: ${song.release}`;
      songGenre.textContent = `Genre: ${song.genre}`;
    } else {
      //or else, show the album/song cover
      albumCover.classList.remove("hidden");
      songDetails.classList.add("hidden");
      albumCover.src = song.cover;
    }
  }
}
// I used freeCodeCamp's "“JavaScript DOM Manipulation – Full Course for Beginners” (https://www.freecodecamp.org/news/javascript-dom-manipulation/).
// It refreshed my memory on how to use document.getElementById() to select elements (like the default screen and album cover) but also to toggle visibility with classList.add() and classList.remove() and update hidden content with textContent

// Function to play a track
function playTrack(index) {
  if (index === -1) return; // Do nothing on default screen
  const song = songs[index];
  audio.src = song.audio;
  // Set audio source
  audio.play();
  // Start playback
  playPauseImg.src =
    "https://img.icons8.com/ios-glyphs/30/c0c0c0/pause--v1.png"; // Show pause icon
  // Here, i purposefully changed the icon of the play/pause button to be better suited for the web.
  // While the original iPod classic is a physical button that can be pressed and doesn't change, I figured that this is simply inspired by the iPod classic, and is not *literally* an iPod classic.
  // I figured that it would be better to change the state of the icon to be better suited for the web, since most users are used to visual feedback.
  isPlaying = true;
  // Update state
  updateScreen();
  // Update screen content
}

// Menu button: toggle between the album/song cover and details
menuBtn.addEventListener("click", () => {
  if (currentIndex === -1) return; // Do nothing on default screen
  isDetailsView = !isDetailsView;
  // Toggles the view
  updateScreen();
  // Update screen with information based on toggle
});

// Previous button: go to previous year
previousBtn.addEventListener("click", () => {
  if (currentIndex === -1) {
    currentIndex = songs.length - 1; // from default screen, go to last song (2019)
  } else {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length; // or else, it wraps around other songs
  }
  if (isPlaying) {
    playTrack(currentIndex);
    // Play new track if playing
  } else {
    //or else,
    updateScreen();
    // Update screen only
  }
});

// Next button: go to next year, same as above but for next button
nextBtn.addEventListener("click", () => {
  if (currentIndex === -1) {
    currentIndex = 0; // from default screen, go to first song (2010)
  } else {
    currentIndex = (currentIndex + 1) % songs.length; // or else, it wraps around the other songs
  }
  if (isPlaying) {
    playTrack(currentIndex);
  } else {
    updateScreen();
  }
});

// Play/pause button: toggle playback
playPauseBtn.addEventListener("click", () => {
  if (audio.paused && currentIndex !== -1) {
    playTrack(currentIndex);
    //play current track
  } else if (!audio.paused) {
    audio.pause();
    //pause playback
    playPauseImg.src =
      "https://img.icons8.com/ios-glyphs/30/c0c0c0/play--v1.png";
    //shows the play icon as explained prior
    isPlaying = false;
  }
});

// Initialise the screen with the default screen
updateScreen();

// this shows the default screen when the index is -1 or else itll show the original song logic.
// i wanted to include the default screen to ONLY show when the user loads the page, otherwise, if the user continues pressing next and goes from 2019 to 2010, it wouldnt show the default screen again, as it was unnecessary since they already knew what site they were using.

// Future benefits:
// I could see/improve this by expanding it to other decades or charts (like billboard 200) with a playlist menu and a track progress bar.
// I aligned the song details to the top as to mirror the actual iPod feel, where it would normally have a progress bar and other things (relative to being an actual music player).
// However, i decided against actually including the player details (such as a progress bar) to take away from the whole idea of being a music player and more of an interactive timeline.
// It also could be ideal for teaching music history or web development

// One of the biggest challenges I faced was balancing aesthetics with functionality. I wanted the UI to feel nostalgic but still modern enough for users to navigate intuitively//
//This meant that i needed to simplify the choices of colour and avoiding overly complex layouts. While adding animations or transitions for song changes would have enhanced the visual experience, I decided against it to keep the prototype minimal and focused on the main interaction//
// It would be interesting to explore how to incorporate user customisation features (like being able to favourite songs or create playlists), but for this prototype, I kept it intentionally simple and limited to ensure clarity of interaction and actually complying with the assignment restrictions//

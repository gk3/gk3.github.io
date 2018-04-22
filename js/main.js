var config = {
 apiKey: "AIzaSyAoNWwsp9RaarHBeKwyl7diDA3VfUT-sGw",
 authDomain: "inspireme-8655c.firebaseapp.com",
 databaseURL: "https://inspireme-8655c.firebaseio.com",
 projectId: "inspireme-8655c",
 storageBucket: "inspireme-8655c.appspot.com",
 messagingSenderId: "596009452969"
};
firebase.initializeApp(config);

var GIF = []
var tweets = []
var currentGIF = null
var nextGIF = null
var updated = null
var GIFbank = null

var request = new XMLHttpRequest();
request.open('GET', 'https://api.giphy.com/v1/gifs/search?api_key=er6a877s34lCzAE3fK3czrKploSgnomp&q=kanye%20west&limit=200&offset=0&rating=R&lang=en', true);
request.onload = function () {
 if (request.status >= 200 && request.status < 400) {

  response = JSON.parse(request.responseText);
  console.log(response)
  GIFbank = randomNoRepeats(response.data)

 }
}
request.send()

var queueGIF = function () {
 console.log("queueing")
 if (GIFbank == null) {
  setTimeout(function () {
   queueGIF();
  }, 500);
 } else {
  if (nextGIF == null) {
   nextGIF = {}
   response = GIFbank();
   console.log(response)
   nextGIF.preview = response.images.fixed_height_small_still.url
   nextGIF.image = new Image();
   nextGIF.image.src = response.images.original.mp4
   nextGIF.width = response.images.original_mp4.width
   nextGIF.height = response.images.original_mp4.height
   if (currentGIF == null) {
    console.log("getting second")
    getGIF()
   }
  }
 }
}


var getGIF = function () {
 console.log(nextGIF)
 if (nextGIF == null) {
  console.log("queueing first")
  queueGIF()
 } else {
  console.log("got one, setting", nextGIF)
  currentGIF = nextGIF
  nextGIF = null
  queueGIF()
  var gifContainer = document.getElementById("gif")
  var gifContainer2 = document.getElementById("gif2")
  var gifImg = document.getElementById("gifInner")
  var gifZoom = document.getElementById("gifZoomed")
  var scroll = document.querySelector("div.scroll")
  var thresh = 20
  var xPos = getRandomArbitrary(-100, 30);
  var yPos = 50 + getRandomArbitrary(0, 20);
  var scale = getRandomArbitrary(1, 1.5)
  var color = colors()
  var flipped = false
  if (!Math.floor(Math.random() * 2)) {
   //   xPos *= -1
   flipped = true
  }
  gifContainer.setAttribute("style", "width:" + currentGIF.width + "px; height:" + currentGIF.height + "px; transform: translateX(" + xPos + "%) translateY(-" + yPos + "%) scale(" + scale + ");")
  //  xPos -= getRandomArbitrary(20, 40);
  yPos = getRandomArbitrary(-60, 30);
  if (xPos > -20) {
   xPos = getRandomArbitrary(-100, -20);
  } else {
   xPos = getRandomArbitrary(-20, 30)
  }
  gifContainer2.setAttribute("style", "transform: translateX(" + (xPos) + "%) translateY(" + (yPos) + "%); background-color: #" + color.gif + ";")
  getTweet(color.text, xPos, yPos)
  gifImg.setAttribute('poster', currentGIF.preview)
  gifImg.setAttribute('src', currentGIF.image.src)
  gifZoom.setAttribute('poster', currentGIF.preview)
  var cachebuster = Math.round(new Date().getTime() / 1000);
  gifZoom.setAttribute('src', gifImg.src + "?cache=" + cachebuster)
  scroll.setAttribute("style", "height:" + getRandomArbitrary(50, 200) + "px; transform: translateX(" + getRandomArbitrary(-300, 300) + "px) translateY(" + getRandomArbitrary(-60, -40) + "%)")
 }
}


var database = firebase.database();

firebase.database().ref('/').once('value').then(function (snapshot) {

 tweets = randomNoRepeats(snapshot.val().tweets)
 colors = randomNoRepeats(snapshot.val().colors)
 updated = snapshot.val().updated

 document.getElementById("date").innerHTML = updated

 console.log("getting gif")
 getGIF()
});

var firstTweet = false
var getTweet = function (color, x, y) {

 var newTweet = tweets()
 var tweetContents = document.getElementById("tweetContent")
 tweetContents.innerHTML = newTweet.content
 tweetContents.parentElement.setAttribute('href', 'https://twitter.com/kanyewest/status/' + newTweet.id)
 // tweetContents.parentElement.classList.remove("loading")
 if (!firstTweet) {
  var loading = document.querySelectorAll(".loading")
  loading.forEach(function (el) {
   el.classList.remove("loading")
  })
  firstTweet = true;
 }
if(window.innerWidth	> 756){


 //	tweetContents.parentElement.setAttribute('style', 'color: #' + color + ";")
 var thresh = 20
 if (x > -20) {
  var xPos = x + getRandomArbitrary(-100, -20);
 } else {
  var xPos = x + getRandomArbitrary(-20, 30);
 }

 var yPos = y + getRandomArbitrary(20, 60);
 var scale = getRandomArbitrary(.8, 1.1);
 tweetContents.parentElement.setAttribute("style", "color: #" + color + "; transform: translateX(" + xPos + "%) translateY(" + yPos + "%) scale(" + scale + ")")
}
 }



var audio = new Audio('https://github.com/gk3/gk3.github.io/raw/master/mp3/ye-fade.mp3');
audio.volume = .5

document.addEventListener("DOMContentLoaded", function () {


 var yeBtn = document.getElementById('yeButton');

 //add event listener
 yeBtn.addEventListener('click', function (event) {

  audio.play();
  getGIF()
 });


});
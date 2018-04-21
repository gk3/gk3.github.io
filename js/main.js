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


var queueGIF = function () {
 console.log("queueing")
  if (nextGIF == null) {
   nextGIF = {}
   var request = new XMLHttpRequest();
   request.open('GET', 'https://api.giphy.com/v1/gifs/random?api_key=er6a877s34lCzAE3fK3czrKploSgnomp&tag=kanye%20west&rating=R', true);
   request.onload = function () {
    if (request.status >= 200 && request.status < 400) {

     response = JSON.parse(request.responseText);
     console.log(response)
     nextGIF.preview = response.data.fixed_height_small_still_url
     nextGIF.image = new Image();
     nextGIF.image.src = response.data.image_url
     nextGIF.width = response.data.image_width
     nextGIF.height = response.data.image_height
     if(currentGIF == null){
       console.log("getting second")
        getGIF()
     }
    }
   }
   request.send()
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
  var gifImg = document.getElementById("gifInner")
  var thresh = 20
  var xPos = 50 + getRandomArbitrary(-thresh, thresh);
  var yPos = 50 + getRandomArbitrary(-thresh, thresh);
  var scale = getRandomArbitrary(.8, 1.5)
  var color = colors()
  gifContainer.setAttribute("style", "width:" + currentGIF.width + "px; height:" + currentGIF.height + "px; transform: translateX(-" + xPos + "%) translateY(-" + yPos + "%) scale(" + scale + "); background-color: #" + color.gif + ";")
  getTweet(color.text)
  gifImg.setAttribute('src', '')
  gifImg.setAttribute('src', currentGIF.image.src)
 }
}


  var database = firebase.database();

  firebase.database().ref('/').once('value').then(function (snapshot) {

   tweets = randomNoRepeats(snapshot.val().tweets)
   colors = randomNoRepeats(snapshot.val().colors)
   console.log("getting gif")
   getGIF()
  });


  var getTweet = function (color) {
   var newTweet = tweets()
   var tweetContents = document.getElementById("tweetContent")
   tweetContents.innerHTML = newTweet.content
   tweetContents.parentElement.setAttribute('href', 'https://twitter.com/kanyewest/status/' + newTweet.id)
   tweetContents.parentElement.classList.remove("loading")
   //	tweetContents.parentElement.setAttribute('style', 'color: #' + color + ";")
   var thresh = 20
   var xPos = 50 + getRandomArbitrary(-thresh, thresh);
   var yPos = 50 + getRandomArbitrary(-thresh, thresh);
   var scale = getRandomArbitrary(.8, 1.5);
   tweetContents.parentElement.setAttribute("style", "color: #" + color + "; transform: translateX(-" + xPos + "%) translateY(-" + yPos + "%) scale(" + scale + ")")
  }
  var audio = new Audio('https://github.com/gk3/gk3.github.io/raw/master/inspire/mp3/yebtn-micro.mp3');
  audio.volume = .5

  document.addEventListener("DOMContentLoaded", function () {


   var yeBtn = document.getElementById('yeButton');

   //add event listener
   yeBtn.addEventListener('click', function (event) {

    audio.play();
    getGIF()
   });


  });
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
var getGIF = function(){
	var request = new XMLHttpRequest();
	request.open('GET', 'https://api.giphy.com/v1/gifs/random?api_key=er6a877s34lCzAE3fK3czrKploSgnomp&tag=kanye&rating=PG-13', true);

	request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
					// Success!
				GIF = JSON.parse(request.responseText);
				console.log(GIF)
				var gifSrc = GIF.data.image_url
				 var image = new Image();

				// this will occur when the image is successfully loaded
				// no matter if seconds past
				image.onload = function () {

				var gifW = GIF.data.image_width
				var gifH = GIF.data.image_height
				var gifSrc = GIF.data.image_url
     
				var gifContainer = document.getElementById("gif")
				console.log(gifContainer)
				var thresh = 20
				var xPos = 50 + getRandomArbitrary(-thresh, thresh);
				var yPos = 50 + getRandomArbitrary(-thresh, thresh);
				var scale = getRandomArbitrary(.8,1.5)
				gifContainer.setAttribute("style", "width:" + gifW + "px; height:" + gifH + "px; background-image: url(" + gifSrc + "); transform: translateX(-" + xPos + "%) translateY(-" + yPos + "%) scale(" + scale  +")")
					getTweet()
				}
				  	image.src = gifSrc;
			} else {
					// We reached our target server, but it returned an error

			}
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();

}

var database = firebase.database();

firebase.database().ref('/').once('value').then(function(snapshot) {

	tweets = randomNoRepeats(snapshot.val().tweets)
	console.log("getting gif")

});


var getTweet = function(){
	var newTweet = tweets()
	var tweetContents = document.getElementById("tweetContent")
	tweetContents.innerHTML = newTweet.content
	tweetContents.parentElement.setAttribute('href', 'https://twitter.com/kanyewest/status/' + newTweet.id)
					var thresh = 20
				var xPos = 50 + getRandomArbitrary(-thresh, thresh);
				var yPos = 50 + getRandomArbitrary(-thresh, thresh);
				var scale = getRandomArbitrary(.8,1.5);
	tweetContents.parentElement.setAttribute("style", "transform: translateX(-" + xPos + "%) translateY(-" + yPos + "%) scale(" + scale  +")")
}
var audio = new Audio('https://github.com/gk3/gk3.github.io/raw/master/inspire/mp3/yebtn-micro.mp3');
audio.volume = .5

document.addEventListener("DOMContentLoaded", function () {
  getGIF()

	var yeBtn = document.getElementById('yeButton');

  //add event listener
  yeBtn.addEventListener('click', function(event) {

			audio.play();
    getGIF()
  });


});



var anotherOne = debounce(function () {
  var headline = document.querySelector('h1')

  headline.classList.add('intro')
  var rand = list()
  var url = rand.get('file').url()
  var img = rand.get('img').url()
  makeHeadlines(rand.get('text'))
  var audio = document.querySelector('audio');
  var ig = document.querySelector('#ig')
  ig.setAttribute('href', img)
  audio.setAttribute('src', url)
  audio.play()
}, 100, true)
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
	request.open('GET', 'https://api.giphy.com/v1/gifs/random?api_key=er6a877s34lCzAE3fK3czrKploSgnomp&tag=kanye%20west&rating=R', true);

	request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
					// Success!
				GIF = JSON.parse(request.responseText);
				console.log(GIF)
				var gifSrc = GIF.data.image_url
				var gifSrcLow = GIF.data.fixed_height_small_still_url
				 var image = new Image();

				
								var gifW = GIF.data.image_width
				var gifH = GIF.data.image_height
				var gifSrc = GIF.data.image_url
							var gifContainer = document.getElementById("gif")
				var gifImg = document.getElementById("gifInner")
				// this will occur when the image is successfully loaded
				// no matter if seconds past
				var thresh = 20
				var xPos = 50 + getRandomArbitrary(-thresh, thresh);
				var yPos = 50 + getRandomArbitrary(-thresh, thresh);
				var scale = getRandomArbitrary(.8,1.5)
				var color = colors()
				gifContainer.setAttribute("style", "width:" + gifW + "px; height:" + gifH + "px; transform: translateX(-" + xPos + "%) translateY(-" + yPos + "%) scale(" + scale  +"); background-color: #" + color.gif + ";")
				getTweet(color.text)
				gifImg.setAttribute('src', '')
				gifImg.setAttribute('src', gifSrcLow)
				image.onload = function () {
					console.log("loaded")

     
				var gifContainer = document.getElementById("gif")
				var gifImg = document.getElementById("gifInner")
				console.log(gifContainer)
					var gifSrc = GIF.data.image_url
					gifImg.setAttribute('src', gifSrc)
					
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
	colors = randomNoRepeats(snapshot.val().colors)
	console.log("getting gif")
  getGIF()
});


var getTweet = function(color){
	var newTweet = tweets()
	var tweetContents = document.getElementById("tweetContent")
	tweetContents.innerHTML = newTweet.content
	tweetContents.parentElement.setAttribute('href', 'https://twitter.com/kanyewest/status/' + newTweet.id)
	tweetContents.parentElement.classList.remove("loading")
//	tweetContents.parentElement.setAttribute('style', 'color: #' + color + ";")
					var thresh = 20
				var xPos = 50 + getRandomArbitrary(-thresh, thresh);
				var yPos = 50 + getRandomArbitrary(-thresh, thresh);
				var scale = getRandomArbitrary(.8,1.5);
	tweetContents.parentElement.setAttribute("style", "color: #" + color + "; transform: translateX(-" + xPos + "%) translateY(-" + yPos + "%) scale(" + scale  +")")
}
var audio = new Audio('https://github.com/gk3/gk3.github.io/raw/master/inspire/mp3/yebtn-micro.mp3');
audio.volume = .5

document.addEventListener("DOMContentLoaded", function () {


	var yeBtn = document.getElementById('yeButton');

  //add event listener
  yeBtn.addEventListener('click', function(event) {

			audio.play();
    getGIF()
  });


});




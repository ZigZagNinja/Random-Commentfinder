//random Video

var ChannelId;
var informationVar; 
var vidTitle;

function buttonClicked(){
	ChannelId = document.getElementById("videoIdElement").value;
	console.log(ChannelId);


	var xhttp2 = new XMLHttpRequest();
	xhttp2.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var response2 = JSON.parse(xhttp2.responseText);
		
			var randomVideo = Math.floor(Math.random()*response2.items.length);

			console.log("randomVideo: "+ randomVideo);



			if(response2.items[randomVideo].contentDetails.upload){
				randomVideoId = response2.items[randomVideo].contentDetails.upload.videoId;
				console.log(randomVideoId);
			}
			else if(response2.items[randomVideo].contentDetails.bulletin){
				randomVideoId = response2.items[randomVideo].contentDetails.bulletin.resourceId.videoId;
			}
			else{
				randomVideoId = response2.items[randomVideo].contentDetails.bulletin
			}


		var commentUrl = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId="+randomVideoId+"&key=AIzaSyAxBMdV7XkQCYiAj5EvDti4_XiymvTTQfw"
		console.log(commentUrl);






		//random comment
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				var response = JSON.parse(xhttp.responseText);

				var randomComment = Math.floor(Math.random()*response.items.length);
				console.log(randomComment);

				var randomCommentText = response.items[randomComment].snippet.topLevelComment.snippet.textDisplay;
				informationVar = "Author: "+ response.items[randomComment].snippet.topLevelComment.snippet.authorDisplayName+ "/ like count: "+ response.items[randomComment].snippet.topLevelComment.snippet.likeCount;
				vidTitle = response2.items[randomVideo].snippet.title; 

				document.getElementById("information").innerHTML = informationVar;
				document.getElementById("video").innerHTML = "Random video(of last 5):  "+ "https://www.youtube.com/watch?v="+ randomVideoId;
				document.getElementById("title").innerHTML = "Video title: "+ vidTitle;
				document.getElementById("comment").innerHTML = "Random comment:";
				document.getElementById("header").innerHTML = randomCommentText;
			}
		};

		xhttp.open("GET", commentUrl, true);
		xhttp.send();
			
	}


};
xhttp2.open("GET", "https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId="+ChannelId+"&key=AIzaSyAxBMdV7XkQCYiAj5EvDti4_XiymvTTQfw", true);
xhttp2.send();
}







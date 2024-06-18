var lastfmData = {
	baseURL: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
	// Your Last.fm Username
	user: "shiina_yuu",
	// Your API key
	// Please get your own API key, don't use mine.
	api_key: "bde036d13c21082d57a7397805ce68c5",
	additional: "&format=json&limit=1"
};

var getSetLastFM = function() {
	$.ajax({
		type: "GET",
		url: lastfmData.baseURL +
			lastfmData.user +
			"&api_key=" +
			lastfmData.api_key +
			lastfmData.additional,
		dataType: "json",
    success: function(resp) {
      var recentTrack = resp.recenttracks.track[0];
      var formattedTitle = recentTrack.name;
      var formattedArtist = recentTrack.artist["#text"];
      var formattedAlbum = recentTrack.album["#text"];
  
      $("a#tracktitle")
          .html(formattedTitle)
          .attr("href", recentTrack.url)
          .attr("target", "_blank");
  
      // Modify this part to make the artist a link
      $("a#trackartist")
          .html(formattedArtist)
          .attr("href", "https://www.last.fm/music/" + encodeURIComponent(formattedArtist))
          .attr("target", "_blank");
  
      // Modify this part to make the album a link
      $("a#trackalbum")
          .html(formattedAlbum)
          .attr("href", "https://www.last.fm/music/" + encodeURIComponent(formattedArtist) + "/" + encodeURIComponent(formattedAlbum))
          .attr("target", "_blank");
  
      $("img#trackart")
          .attr("src", recentTrack.image[2]["#text"])
          .attr("alt", "");
    },
		error: function(resp) {
			$("a#tracktitle").html("null");
			$("img#trackart").attr("src", "/assets/img/common/music-error.png");
			var artistFormatted = "null";
			$("a#trackartist, marquee#trackartist")
				.html(artistFormatted)
				.attr("href", "#");

			$("a#trackalbum, marquee#trackalbum")
				.html("")
				.attr("title", "");
		}
	});
};

// Get the new one.
getSetLastFM();
// Start the countdown.
setInterval(getSetLastFM, 10 * 1000);
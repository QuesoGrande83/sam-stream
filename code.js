// video element ids
var live_player_id = "video_player_live";
// HLS endpoint
var video_source = "https://3ae97e9482b0d011.mediapackage.us-west-2.amazonaws.com/out/v1/6b1501bcc4ce49c8b06340362b81eabf/index.m3u8";

// initalize the page
$(document).ready(() => {
    // default replay start time is 15 mins ago
    var start = new Date(Date.now() - (15 * 60 * 1000)).toISOString();
    // default replay end time is 5 mins ago
    var end = new Date(Date.now() - (5 * 60 * 1000)).toISOString();
    // set the default field values
    $("input[type=text][name=starttime]").val(start);
    $("input[type=text][name=endtime]").val(end);
    
    // set the live player
    prepare_player(live_player_id, video_source);
    //display the source URLs of the two players
    $("#live_source_URL").text("URL: " + video_source);
});

// set the specified player with the source URL
var prepare_player = (id, source) => {
    console.log("id = " + id);
    console.log("source = " + source);
    let player = videojs("#" + id);
    player.reset();
    player.src({
        "src": source,
        "type": "application/x-mpegURL"
    });
    player.load();
}

var shifted_url = (source) => {
    // get the current field values
    start = $("input[type=text][name=starttime]").val();
    end = $("input[type=text][name=endtime]").val();
    var shifted = source;
    // we need both values
    if (start != null && end != null) {
        // create a new url with the restart parameters
        shifted = source + "?start" + "=" + start + "&end=" + end;
    }
    return shifted;
}
var numberOfLoadedPages = 0;
var bar;

function onBodyLoad(){
	bar=new RadialProgress(document.getElementById("bar"), {indeterminate:true,colorBg:"rgba(0,0,0,0)",colorFg:"#FFFFFF",thick:5} );
	document.getElementById("loadMoreBtn").style.display = "none";
	loadShow();
}

function loadShow(){
	document.getElementById("loadMoreBtn").style.display = "none";
	document.getElementById("bar").style.display = "block";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			numberOfLoadedPages++;
    		onShowsResponse(this.responseText);
    	}
  	};
  	xhttp.open("GET", "http://api.tvmaze.com/shows?page="+numberOfLoadedPages, true);
  	xhttp.send();
}

function onShowsResponse(responseText){
	var shows = JSON.parse(responseText);
	for (i = 0; i < shows.length; i++) {
		if(i%3==0){
			document.getElementById("mainContainer").innerHTML+="<div class=\"row\">"; //beginning of row
		}
		document.getElementById("mainContainer").innerHTML+= "<div class=\"col-sm-4\">" +
				"<img src="+shows[i].image.medium + " style=\"margin-top: 20px;\">"
				+ "</div>";
		if(i%3==0){
			document.getElementById("mainContainer").innerHTML+="</div>"; // end of row
		}
	}
	document.getElementById("loadMoreBtn").style.display = "block";
	document.getElementById("bar").style.display = "none";
}
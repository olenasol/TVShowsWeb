
function onBodyLoad(){

	loadShow(0);
}

function loadShow(numberOfPage){
	
	var xhttp = new XMLHttpRequest();
	for(i=0; i<10; i++){
		var strId = "btn_"+i;
		document.getElementById(strId).disabled = false;
	}
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("btn_"+numberOfPage).disabled = true;
			document.getElementById("mainContainer").innerHTML = "";
    		onShowsResponse(this.responseText);
    	}
  	};
  	xhttp.open("GET", "http://api.tvmaze.com/shows?page="+ numberOfPage, true);
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
}
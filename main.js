
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
    		onShowsResponse(this.responseText,false);
    	}
  	};
  	xhttp.open("GET", "http://api.tvmaze.com/shows?page="+ numberOfPage, true);
  	xhttp.send();
}

function searchShow(){
	document.getElementById("btm_btns").style.visibility = "hidden";
	var searchString = document.getElementById('inputSearch').value;
	if (searchString == ""){
		loadShow(0);
	} else{
		searchShowRequest(searchString);
	}
}

function searchShowRequest(searchString){	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("mainContainer").innerHTML = "";
    		onSearchResponse(this.responseText,true);
    	}
  	};
  	xhttp.open("GET", "http://api.tvmaze.com/search/shows?q="+ searchString, true);
  	xhttp.send();
}

function getGenres(genres){
	if(genres == null){
		return "";
	}else{
		var str = "";
	 	if(genres.length>1){
			str+= "Genres: ";
		} else{
			str+= "Genre: ";
		}
		for (j = 0; j < genres.length; j++){
			str += genres[j];
			if(j != (genres.length-1)){
				str+=",";
			}
		}
		return str;
	}
}

function getStars(rating) {
	if(rating == null){
		return "";
	}else if(rating.average == null){
		return "";
	} else{
		var numberOfFullStars = Math.round(rating.average);
		var str = "";
		for (j = 0; j < numberOfFullStars; j++){
			str += "<img src=\"images/fullStar.png\" class= \"star\" >";
		}
		for(m = numberOfFullStars; m < 10; m++){
			str += "<img src=\"images/blankStar.png\" class= \"star\" >";
		}
		return str;
	}
}
function getBeginningOfRow(i){
	if(i%2==0){
		return "<div class=\"row\">"; //beginning of row
	} else{
		return "";
	}
}
function getEndingOfRow(i){
	if(i%2!=0){
		return "</div>"; //ending of row
	} else{
		return "";
	}	
}

function getImage(image){
	if (image==null){
		return "";
	} else{
		return "<img src="+ image.medium + ">";
	}
}

function onShowsResponse(responseText, isSearch){
	var innerText = "";
	var shows = JSON.parse(responseText);
	for (i = 0; i < shows.length; i++) {
		innerText += getBeginningOfRow(i)
				+"<div class=\"col-sm-6 columnDiv \">" 
				+"<p style=\"float: left;\">"+ getImage(shows[i].image) +"</p>"
				+ "<br><b>"+shows[i].name +"</b><br><br>"
				+ getStars(shows[i].rating) + "<br><br>"
				+ "<p>"+getGenres(shows[i].genres) + "</p><br>"
				+ shows[i].summary
				+ "</div>"
				+ getEndingOfRow(i);
	}
	document.getElementById("mainContainer").innerHTML+=innerText;
	if (!isSearch){
		document.getElementById("btm_btns").style.visibility = "visible";
	}
}

function onSearchResponse(responseText, isSearch){
	var innerText = "";
	var shows = JSON.parse(responseText);
	for (i = 0; i < shows.length; i++) {
		innerText += getBeginningOfRow(i)
				+"<div class=\"col-sm-6 columnDiv \">" 
				+"<p style=\"float: left;\">"+ getImage(shows[i].show.image) +"</p>"
				+ "<br><b>"+shows[i].show.name +"</b><br><br>"
				+ getStars(shows[i].show.rating) + "<br><br>"
				+ "<p>"+getGenres(shows[i].show.genres) + "</p><br>"
				+ shows[i].show.summary
				+ "</div>"
				+ getEndingOfRow(i);
	}
	document.getElementById("mainContainer").innerHTML+=innerText;
	if (!isSearch){
		document.getElementById("btm_btns").style.visibility = "visible";
	}
}
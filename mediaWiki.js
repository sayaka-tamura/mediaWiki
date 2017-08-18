window.onload = function(){
    var button = document.getElementById("button");
    button.addEventListener('click', newSearch, false);
    button.addEventListener('click', previewHandler, true);
    //button.onclick = newSearch;previewHandler;
}

function newSearch() {

    var searchBox = document.getElementById("searchText");
    var searchTerm = searchBox.value;
    console.log(searchTerm);
    var scriptTag = document.createElement("script");
	       //this sets the src of the script
	       //first concatenate the search term with the rest of the script tag src
            var newRequest= "http://en.wikipedia.org/w/api.php?action=query&prop=info&format=json&inprop=url&generator=search&gsrsearch="+searchTerm+"&gsrlimit=10&callback=updateSearchInfo";
            //then set the src

    //console.log(newRequest);
            scriptTag.src = newRequest;


    //pull out head element by tagName
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(scriptTag);
    searchBox.value="";
}

//for handling data
function updateSearchInfo(data){

    var resultsDiv = document.getElementById("results");
    var newResults = document.createElement("div");

    var results = data.query.pages;

    //use for in loop to count through objects that are returned
    for(var prop in results){
    //store each object into a variable
    var item = results[prop];
            console.log(item);
        // pull out properties
    var title = item.title;
    var url = item.fullurl;
    //console.log(url);

    //create elements
        var div = document.createElement("div");
        var a = document.createElement("a");
        var textNode = document.createTextNode(url);

        //set properties of elements
    a.href= url;

    a.appendChild(textNode);

    var h3 = document.createElement("h3");

    h3.innerHTML = title;

    div.appendChild(h3);
    div.appendChild(a);

    newResults.appendChild(div);

    }

    resultsDiv.innerHTML = newResults.innerHTML;
}

function previewHandler() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    for (var circles = 0; circles < 20; circles++) {
        drawCircle(canvas, context);
    }

    drawCircle(canvas,context);
}

// Draws a circle at a random location
function drawCircle(canvas, context) {
    var radius = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);

    context.beginPath();
    context.arc(x, y, radius, 0, degreesToRadians(360), true);

    context.fillStyle = "#99FFCC";
    context.fill();
}

    //utility function to turn degrees into radians for arc method
    function degreesToRadians(degrees) {
        return (degrees * Math.PI)/180;
    }

//clearRect
    context.clearRect(0, 0, canvas.width, canvas.height);
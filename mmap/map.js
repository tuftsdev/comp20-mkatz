var myLat, myLng, jsonLocation;

function init() {
        getLocation();
}

function getLocation() {
        console.log("get location");
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(pos) {
                        myLat = pos.coords.latitude;
                        myLng = pos.coords.longitude;
                        sendLocation("SheriMcKelvey", myLat, myLng);
                });
        } else {
                alert("Oops! Your browser doesn't support GeoLocation");
        }
        me = new google.maps.LatLng(myLat, myLng);
        mapOptions = {
                zoom: 12,
                center: me,
                mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        map.panTo(me);
}

function sendLocation(login, lat, lng) {
        console.log("send location");
        request = new XMLHttpRequest();
        request.open("POST", "https://secret-about-box.herokuapp.com/sendLocation", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function() {
                if (request.readyState == 4) {
                        jsonLocation = JSON.parse(request.responseText);
                        drawMap();
                }
        }
        query = "login=" + login + "&lat=" + myLat + "&lng=" + myLng;
        request.send(query);
}

function drawMap() {
        console.log("draw");
        console.log(myLat + " " + myLng);
        console.log(jsonLocation);
        for (x in jsonLocation) {
                console.log("looping");
                marker = new google.maps.Marker({
                        position: new google.maps.LatLng(jsonLocation[x].lat, jsonLocation[x].lng),
                        title: jsonLocation[x].login
                });
                marker.setMap(map);
        }
        console.log("out of loop");
}
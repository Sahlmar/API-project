
// Google map

var map;
var infowindow;

function initMap() {
  var stockholm = {lat: 59.311442, lng: 18.074374};

  map = new google.maps.Map(document.getElementById('map'), {
    center: stockholm,
    zoom: 14
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: stockholm,
    radius: 800,
    keyword: ['ice cream']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}



// Flickr


function getImages(needle) {
    
    var key = "8154c3dca0fe74651286f3c7687664f7";

    var endpoint = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+key+"&text="+encodeURIComponent(needle)+"&format=json";

    console.log(endpoint);
    var scriptElem = document.createElement('script');
    scriptElem.type="text/javascript";
    scriptElem.src=endpoint;
    document.body.appendChild(scriptElem);
}

function jsonFlickrApi(jsonText) {
    console.log(jsonText);

    var output = document.getElementById('output');
    console.log(jsonText.photos.photo.length);
    for (var i = 0; i < jsonText.photos.photo.length; i++) {
        var elem = document.createElement('img');

     var farmId = jsonText.photos.photo[i].farm;
        var serverId = jsonText.photos.photo[i].server;
        var id = jsonText.photos.photo[i].id;
        var secret = jsonText.photos.photo[i].secret;

        var src="https://farm"+farmId+".staticflickr.com/"+serverId+"/"+id+"_"+secret+".jpg";
        console.log(src);
        elem.src = src;
        output.appendChild(elem);

    }
}
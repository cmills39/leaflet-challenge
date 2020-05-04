function markerSize(propertiesStats) {
  return propertiesStats * 10000;
}

function chooseColor (mag)
  {
      switch(mag)
      {
          case"<=1":
              return "yellow";
          case "<=2":
              return "red";
          case "<=3":
              return "orange";
          case "<=4":
              return "green";
          case "<=5":
              return "purple";
          default:
              return "black";
      }
}

// Load in geojson data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var geoJSON;
  // Perform a GET request to the query URL
var EQD = d3.json(geoData, function(data) {
  console.log(data.features);
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

      // Define a function we want to run once for each feature in the features array
        // Give each feature a popup describing the place and time of the earthquake
        function onEachFeature(feature, layer) {
          layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"+
            "<hr>" + feature.properties.mag);
        };


        var earthquakes= L.geoJson(earthquakeData, {
          onEachFeature:onEachFeature
        });
        
        // Sending our earthquakes layer to the createMap function
       createMap(earthquakes);

      }
/*
      earthquakes.push(
        L.circle(geometry.coordinates, {
          stroke: false,
          fillOpacity: 0.75,
          color: "chooseColor(feature.properties.mag)",
          fillColor: "white",
          radius: markerSize(feature.properties.mag)
        })
      );
*/
      function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  var grayscale = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Grey Map": grayscale,
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
} 

  /* L.geoJSON(geoJSON, {
    pointToLayer: function (feature, latlng) {
        return new L.circleMarker(latlng, {radius:markerSize(feature.properties.mag)});
    }
}).addTo(map);

*/


  /*
  // Adding tile layer
  var earthquake = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  var myMap = L.map("map", {
    center: [29.158628, -9.678791],
    zoom: 2
  });
  
d3.json(geoData, function(response) {

var EQD=(response.features);
console.log(EQD);


for (var i = 0; i < EQD.length; i++) {
  var geometry = EQD[i].geometry;
 
  var properties  = EQD[i].properties;
  
  var propertiesStats =  properties.mag;
  var propertiesTitle = properties.title
     // console.log(propertiesTitle)


  if (geometry) {
    L.marker([geometry.coordinates[1], geometry.coordinates[0],
    chooseColor(propertiesStats)])
    .bindPopup(propertiesTitle).addTo(myMap);
  }
  
}


*/


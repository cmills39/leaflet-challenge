// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
   // layers: [streetmap, earthquakes]
  });

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
    });
    streetmap.addTo(myMap);
  
// Load in geojson data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var geoJSON;
  // Perform a GET request to the query URL
d3.json(geoData, function(data) {
  console.log(data.features);
 

        function style(feature) {
            return {
              opacity: 1,
              fillOpacity: 1,
              fillColor: chooseColor(feature.properties.mag),
              color: "#000000",
              radius: getRadius(feature.properties.mag),
              stroke: true,
              weight: 0.5
            };
          }

        function chooseColor (mag)
          {
              switch(true)
              {
                  case mag >5:
                      return "yellow";
                  case mag >4:
                      return "red";
                  case mag >3:
                      return "orange";
                  case mag >2:
                      return "green";
                  case mag >1:
                      return "purple";
                  default:
                      return "black";
              }
        }

        function getRadius(magnitude) 
        {
          if (magnitude === 0) {
            return 1;
          }
          return magnitude * 4;
        }
        L.geoJson(data,{

          pointToLayer:function(feature, latlng){
           return L.circleMarker(latlng)
          },
            style:style,
          onEachFeature:function(feature,layer){
            layer.bindPopup("<h3>" + feature.properties.place +
              "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"+
              "<hr>" + feature.properties.mag);
          }
        
        
        }).addTo(myMap);

      var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0,1,2,3,4,5],
        color = ['yellow','red','orange','green','purple'];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + chooseColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

});

//these variables will be passed in on change with javascript
state = "Ohio";
start_date = new Date('1/30/2020');
end_date = new Date('12/31/2021');







//create a function that can be called when the variables change
mapping = function(state,start_date,end_date)
{


// This block just sets the default zoom and and center based on the state input
var state_cord = Object.values(state_cord_data);
var state_name = Object.keys(state_cord_data);
var center_cord = [39.8283, -98.5795];
var zoom_num = 4;
for (var i = 0; i < state_name.length; i++) {
  if(state_name[i]==state)
  {
    var center_latitude = state_cord[i].Latitude;
    var center_longitude = state_cord[i].Longitude;
    var center_cord = [center_latitude,center_longitude]
    var zoom_num = 6      
  }
};

// Creating the map object
var myMap = L.map("map", {
  center: center_cord,
  zoom: zoom_num
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Assemble the API query URL.
var url = "https://us-gun-sale-and-violence-report-api.azurewebsites.net/api/v1.0/completedata";


// Get the data with d3.
d3.json(url).then(function(response) {

  // Create a new marker cluster group.
  var markers = L.markerClusterGroup();

  // Loop through the data.
  for (var i = 0; i < response.length; i++) {

    var monthday = response[i].feature.Date;
    var year = response[i].feature.Year
    var date = new Date(monthday +', '+year)
    var state1 = response[i].feature.State;
    var incident = response[i].IncidentID;

    if (response[i].feature.State==state && date>=start_date && date<=end_date)
    {
      // Set the data location property to a variable.
      var latitude = response[i].feature.Latitude;
      var longitude = response[i].feature.Longitude;
      

      // Check for the location property.
      if (latitude) {
      // Add a new marker to the cluster group, and bind a popup.
      markers.addLayer(L.marker([latitude, longitude]).bindPopup(state1 + '</br>' + longitude + '</br>' + incident));
      }
    }
   
    else if (state=='All' && date>=start_date && date<=end_date)
    {
        // Set the data location property to a variable.
      var latitude = response[i].feature.Latitude;
      var longitude = response[i].feature.Longitude;
      

      // Check for the location property.
      if (latitude) {
      // Add a new marker to the cluster group, and bind a popup.
      markers.addLayer(L.marker([latitude, longitude]).bindPopup(state1 + '</br>' + longitude + '</br>' + incident));
      }
    }


  }

 // Add our marker cluster layer to the map.
 myMap.addLayer(markers);

});

}
 


mapping(state,start_date,end_date)

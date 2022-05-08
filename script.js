//----------------Tsunami----------------
$(document).ready(function(){
  $.ajax({
    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
    dataType: "json",
    complete: function(data){
      var response = data.responseJSON;
      var features = response.features;
      var feature = features[0];
      var properties=feature.properties;
      tsunami = properties.tsunami;
      tsunami = tsunami * 100;
    }
  });
});
//--------------Earth-Quake--------------
$(document).ready(function(){
  $.ajax({
    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
    dataType: "json",
    complete: function(data){
      var response = data.responseJSON;
      var features = response.features;
      var feature = features[0];
      var geometry = feature.geometry;
      var coordinates = geometry.coordinates;
      earthQuakeLongitude = coordinates[0];
      earthQuakeLatitude = coordinates[1];
    }
  });
});
//---------------Magnitude---------------
$(document).ready(function(){
  $.ajax({
    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
    dataType: "json",
    complete: function(data){
      var response = data.responseJSON;
      var features = response.features;
      var feature = features[0];
      var properties=feature.properties;
      mag = properties.mag;
    }
  });
});
//---------------Location----------------
var locationText  = document.getElementById("locationText");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    locationText.innerHTML = "Geolocation is not supported by this browser.";
  }
}
//------Distance-Between-Two-Points------
function showPosition(position) {
  const userLatitude = position.coords.latitude;
  const userLongitude = position.coords.longitude;
  const userLatitudeDegrees = userLatitude/57.29577951;
  const userLongitudeDegrees = userLongitude/57.29577951;
  const earthQuakeLatitudeDegrees = earthQuakeLatitude/57.29577951;
  const earthQuakeLongitudeDegrees = earthQuakeLongitude/57.29577951;
  Distance = 6378.8*(Math.acos((Math.sin(userLatitudeDegrees)*Math.sin(earthQuakeLatitudeDegrees))+Math.cos(userLatitudeDegrees)*Math.cos(earthQuakeLatitudeDegrees)*Math.cos((earthQuakeLongitudeDegrees-userLongitudeDegrees))));
  document.getElementById("locationText").innerHTML = 'Drop, Cover and Hold.<br> A 8.0 magnitude earthquake just occured ' + Distance.toFixed(2) + 'Km away from you. <br> There is a ' + tsunami + "% chance there is going to be a tsunami so if you are neer the sea we recomend you either go on a stable building or get at least 15 Km distance from the seashore";
  console.log(Distance.toFixed(2))
  console.log(mag)
}
//-----------Distance-Functions----------
function mag7() {
  if(Distance <= 500) {
    alert('Drop, Cover and Hold. A'+ mag +'magnitude earthquake just occured ' + Distance.toFixed(2) + 'Km away from you.');
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ff0000";
    if(tsunami > 0) {
      document.getElementById("locationText").innerHTML('Drop, Cover and Hold <br> a '+ mag +'magnitude earthquake just occured ' + Distance.toFixed(2) + 'Km away from you. <br> There is a ' + tsunami + "% chance there is going to be a tsunami so if you are neer the sea we recomend you either go on a stable building or get at least 15 Km distance from the seashore" )
    }
  } else if(Distance <= 750) {
    alert('Drop, Cover and Hold. A '+ mag +'magnitude earthquake just occured ' + Distance.toFixed(2) + 'Km away from you.');
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ffd000";
  }
}
function mag6() {
  if(Distance <= 250) {
    alert('Drop, Cover and Hold. A '+ mag +'magnitude earthquake just occured ' + Distance.toFixed(2) + 'Km away from you.');
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ff0000";
  } else if(Distance <= 500) {
    alert('Drop, Cover and Hold. A '+ mag +'magnitude earthquake just occured ' + Distance.toFixed(2) + 'Km away from you.');
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ffd000";
  }
}
function mag4() {
  if(Distance <= 200) {
    alert('Drop, Cover and Hold. A '+ mag +'magnitude earthquake just occured ' + Distance.toFixed(2) + 'Km away from you.');
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ff0000";
  } else if(Distance <= 350) {
    alert('Drop, Cover and Hold. A '+ mag +'magnitude earthquake just occured ' + Distance.toFixed(2) + 'Km away from you.');
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ffd000";
  }
}
function mag2() {
  if(Distance <= 100) {
    alert('A '+ mag +'magnitude earthquake just occured ' + Distance.toFixed(2) + 'Km away from you.');
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ffd000";
  } else if(Distance <= 150) {
    alert('A '+ mag +'magnitude earthquake just occured ' + Distance.toFixed(2) + 'Km away from you.');
    document.getElementById("safety").innerHTML("SAFE");
    document.getElementById("safety").style.background = "#90ee90";
  }
}
function mag0() {
  alert('A '+ mag +'magnitude earthquake just occured ' + Distance.toFixed(2) + 'Km away from you.');
  document.getElementById("safety").innerHTML("SAFE");
  document.getElementById("safety").style.background = "#90ee90";
}
//------------Call-Functions-------------
switch(true) {
  case mag >= 7.0:
    mag7();
    break;
    //7.0+
  case mag >= 6.0:
    mag6();
    break;
    //6.0-7.0
  case mag >= 4.0:
    mag4();
    break;
    //4.0-6.0
  case mag >= 2.5:
    mag2();
    break;
    //2.5-4.0
  case mag >= 0:
    mag0();
    //0-2.5
}

//---------------Location----------------
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    locationText.innerHTML = "Geolocation is not supported by this browser.";
  }
}
//---------------API-Call----------------
let earthQuake = { longitude: undefined, latitude: undefined};
let magnitude = undefined;
let tsunami = undefined;
fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson")
  .then(data => data.json())
  .then(featureCollection => {
    const feature0 = featureCollection.features[0];
    earthQuake.longitude = feature0.geometry.coordinates[0];
    earthQuake.latitude = feature0.geometry.coordinates[1];
    magnitude = feature0.properties.earthQuake;
    tsunami = feature0.properties.tsunami * 100;
  })
//------Distance-Between-Two-Points------
let userCoordinates = {longitude: undefined, latitude: undefined}
function showPosition(position) {
  userCoordinates.latitude = position.coords.latitude;
  userCoordinates.longitude = position.coords.longitude;
  userCoordinates.latitude = userCoordinates.latitude/57.29577951;
  userCoordinates.longitude = userCoordinates.longitude/57.29577951;
  earthQuake.latitude = earthQuake.latitude/57.29577951;
  earthQuake.longitude = earthQuake.longitude/57.29577951;
  Distance = (6378.8*(Math.acos(
              Math.sin(userCoordinates.latitude) * 
              Math.sin(earthQuake.latitude) + 
              Math.cos(userCoordinates.latitude) * 
              Math.cos(earthQuake.latitude) * 
              Math.cos((earthQuake.longitude-userCoordinates.longitude))))).toFixed(2);
}
//-----------Distance-Functions----------
let info1 = ('Drop, Cover and Hold. A '+ magnitude +' magnitude earthquake just occured ' + Distance + 'Km away from you.');
let info0 = ('A '+ magnitude +' magnitude earthquake just occured ' + Distance + 'Km away from you.')
function mag7() {
  if(Distance <= 500) {
    alert(info1);
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ff0000";
    if(tsunami > 0) {
      document.getElementById("locationText").innerHTML('Drop, Cover and Hold <br> a '+ magnitude +' magnitude earthquake just occured ' + Distance + 'Km away from you. <br> There is a ' + tsunami + "% chance there is going to be a tsunami so if you are neer the sea we recomend you either go on a stable building or get at least 15 Km distance from the seashore" )
    }
  } else if(Distance <= 750) {
    alert(info1);
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ffd000";
  }
}
function mag6() {
  if(Distance <= 250) {
    alert(info1);
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ff0000";
  } else if(Distance <= 500) {
    alert(info1);
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ffd000";
  }
}
function mag4() {
  if(Distance <= 200) {
    alert(info1);
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ff0000";
  } else if(Distance <= 350) {
    alert(info1);
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ffd000";
  }
}
function mag2() {
  if(Distance <= 100) {
    alert(info0);
    document.getElementById("safety").innerHTML("UNSAFE");
    document.getElementById("safety").style.background = "#ffd000";
  } else if(Distance <= 150) {
    alert(info0);
    document.getElementById("safety").innerHTML("SAFE");
    document.getElementById("safety").style.background = "#90ee90";
  }
}
function mag0() {
  alert(info0);
  document.getElementById("safety").innerHTML("SAFE");
  document.getElementById("safety").style.background = "#90ee90";
}
//---Call-Functions-------------
if (magnitude >= 7.0) mag7(); // 7.0 +
if (magnitude >= 6.0) mag6(); // 6.0 - 7.0
if (magnitude >= 4.0) mag4(); // 4.0 - 6.0
if (magnitude >= 2.5) mag2(); // 2.5 - 4.0
if (magnitude >= 0.0) mag0(); // 0   - 2.5

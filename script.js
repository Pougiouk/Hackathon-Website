if (!navigator.geolocation) {
  locationText.innerHTML = 'Geolocation is not supported by this browser.';
} else {
  findLocation.addEventListener('click', getLocation);
}

//------Get EarthQuake/Tsunami Data------

function getActivity() {
  return fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
    .then((data) => data.json());
}

// get location

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    async function (geolocationPosition) {
      const activity = await getActivity();

      const feature0 = getFeatureData(activity.features[0]);
      const distance0 = getDistance(geolocationPosition, feature0);

      displayWarning(distance0, feature0);
    }
  );
}

// get distance

function getDistance(position, feature) {
  const userLatitude = position.coords.latitude;
  const userLongitude = position.coords.longitude;
  const userLatitudeDegrees = userLatitude / 57.29577951;
  const userLongitudeDegrees = userLongitude / 57.29577951;
  const earthQuakeLatitudeDegrees = feature.latitude / 57.29577951;
  const earthQuakeLongitudeDegrees = feature.longitude / 57.29577951;

  return 6378.8 *
    Math.acos(
      Math.sin(userLatitudeDegrees) *
      Math.sin(earthQuakeLatitudeDegrees) +
      Math.cos(userLatitudeDegrees) *
      Math.cos(earthQuakeLatitudeDegrees) *
      Math.cos(earthQuakeLongitudeDegrees - userLongitudeDegrees)
    );
}

// wrap feature data you need into an object

function getFeatureData(feature) {
  return {
    longitude: feature.geometry.coordinates[0],
    latitude: feature.geometry.coordinates[1],
    magnitude: feature.properties.mag,
    tsunami: feature.properties.tsunami * 100,
    place: feature.properties.place,
  };
}

// warn the user about the activity

function setUnsafe(warning, bgcolor) {
  safety.innerHTML = "UNSAFE";
  safety.style.background = bgcolor;
  alert(warning);
}

function setSafe(warning) {
  safety.innerHTML = "SAFE";
  safety.style.background = "#90ee90";
  locationText.innerHTML = warning
}

function displayWarning(distance, feature) {
  const mag = feature.magnitude;
  const place = feature.place;

  let info = `A ${mag.toFixed(2)} magnitude earthquake just occured, ${distance.toFixed(2)}km away from you (${place}).`;
  let warning = `Drop, Cover and Hold. ${info}`;

  if (mag >= 7.0 && distance <= 500) {
    if (tsunami > 0) {
      locationText.innerHTML = 'Drop, Cover and Hold <br> a ' + mag.toFixed(2) + ' magnitude earthquake just occured ' + distance + 'Km away from you. <br> There is a ' + tsunami + "% chance there is going to be a tsunami so if you are neer the sea we recomend you either go on a stable building or get at least 15 Km distance from the seashore";
    }
    return setUnsafe(warning, "#ff0000");
  }

  if (mag >= 7.0 && distance <= 750) return setUnsafe(warning, "#ffd000");

  if (mag >= 6.0 && distance <= 250) return setUnsafe(warning, "#ff0000");
  if (mag >= 6.0 && distance <= 500) return setUnsafe(warning, "#ffd000");

  if (mag >= 4.0 && distance <= 350) return setUnsafe(warning, "#ffd000");
  if (mag >= 4.0 && distance <= 200) return setUnsafe(warning, "#ff0000");

  if (mag >= 2.5 && distance <= 100) return setUnsafe(warning, "#ffd000");
  if (mag >= 2.5 && distance <= 150) return setSafe(info);

  if (mag >= 0.0) return setSafe(info);
}

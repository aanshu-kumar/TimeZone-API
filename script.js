
getLocation();
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
    let data;

fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=2534abee8fde4cf593b4798756b1a43a`)
.then(resp => resp.json())
.then((result) => {
    data = result;
  console.log(data)

  document.getElementById("current").innerHTML = `
        <h1>Your Current Time Zone</h1>
       <div class="time-container" style="border: 2px solid black;">
        <p>Name of the Time Zone: <b>${data.results[0].timezone.name}</b></p>
        <div class="lat-long">
            <p>Lat: <b>${data.query.lat}</b></p>
            <p>Long: <b>${data.query.lon}</b></p>
        </div>
        <p>Offset STD: <b>${data.results[0].timezone.offset_STD}</b></p>
        <p>Offset STD Seconds: <b>${data.results[0].timezone.offset_STD_seconds}</b></p>
        <p>Offset DST: <b>${data.results[0].timezone.offset_DST}</b></p>
        <p>Offset DST Seconds: <b>${data.results[0].timezone.offset_DST_seconds}</b></p>
        <p>Country: <b>${data.results[0].country}</b></p>
        <p>Postcode: <b>${data.results[0].postcode}</b></p>
        <p>City: <b>${data.results[0].city}</b></p>
       </div>
`




});



}



// {
//     "results": [
//         {
//             "datasource": {
//                 "sourcename": "openstreetmap",
//                 "attribution": "© OpenStreetMap contributors",
//                 "license": "Open Database License",
//                 "url": "https://www.openstreetmap.org/copyright"
//             },
//             "country": "India",
//             "country_code": "in",
//             "state": "Jharkhand",
//             "county": "Kanke",
//             "state_district": "Ranchi",
//             "city": "Ranchi",
//             "postcode": "834001",
//             "suburb": "Chadri",
//             "lon": 85.3313146,
//             "lat": 23.3803312,
//             "state_code": "JH",
//             "distance": 4.416909982055671,
//             "result_type": "suburb",
//             "formatted": "Chadri, Ranchi - 834001, JH, India",
//             "address_line1": "Chadri",
//             "address_line2": "Ranchi - 834001, JH, India",
//             "timezone": {
//                 "name": "Asia/Kolkata",
//                 "offset_STD": "+05:30",
//                 "offset_STD_seconds": 19800,
//                 "offset_DST": "+05:30",
//                 "offset_DST_seconds": 19800,
//                 "abbreviation_STD": "IST",
//                 "abbreviation_DST": "IST"
//             },
//             "plus_code": "7MM798JJ+4G",
//             "plus_code_short": "98JJ+4G Ranchi, Kanke, India",
//             "rank": {
//                 "importance": 0.0533433333333333,
//                 "popularity": 0.9884339096724286
//             },
//             "place_id": "51fdeb2642345555405900a6b1625d613740f00102f9019977b81500000000c00205",
//             "bbox": {
//                 "lon1": 85.3310191,
//                 "lat1": 23.3797808,
//                 "lon2": 85.3314872,
//                 "lat2": 23.3809756
//             }
//         }
//     ],
//     "query": {
//         "lat": 23.379968,
//         "lon": 85.3311488,
//         "plus_code": "7MM798HJ+XF"
//     }
// }
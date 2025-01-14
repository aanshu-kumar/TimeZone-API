
getLocation();
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

let count = 0;

function showPosition(position) {
let data;
let set_id= count == 0 ? "current" : "result"
fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=2534abee8fde4cf593b4798756b1a43a`)
.then(resp => resp.json())
.then((result) => {
  
  data = result;

  document.getElementById(set_id).innerHTML = `
        <h1>${count == 0 ? "Your Current Time Zone" : "Your Result"}</h1>
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

let submit_btn = document.getElementById("submit_btn");
let address = document.getElementById("address");

submit_btn.addEventListener("click",()=>{

  let search_add = address.value;
  fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(search_add)}&apiKey=2534abee8fde4cf593b4798756b1a43a`)
  .then(resp => resp.json())
  .then((geocodingResult) => {
  if(geocodingResult.error)
  {
  document.getElementById("result").innerHTML = `
  <p style="background-color: red;">Can't Get Your Address.</p>
  `
  }
  else{
    let position = {
      coords:{
        latitude:Number(geocodingResult.features[0].properties.lat),
        longitude:Number(geocodingResult.features[0].properties.lon),
      }
    }
    count=1;
    showPosition(position);
  }

  


  });


})
'use strict';

// const { EROFS } = require("constants");


// const { default: Axios } = require("axios");

//  const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Initialize and add the map
// const axios = require("axios").default

// [START maps_map_geolocation]
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

// [END maps_map_geolocation]
function initMap() {
    // The location of Uluru
    //const uluru = { lat: -25.344, lng: 131.036 };
    const timesSquare = {lat: 40.7580, lng: -73.9855}
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: timesSquare,
    });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({
      position: timesSquare,
      map: map,
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("current position is: long: " + position.coords.longitude + " ,latitude: " + position.coords.latitude);
            map.setCenter({lat:position.coords.latitude,lng:position.coords.longitude});
            marker.setPosition({lat:position.coords.latitude,lng:position.coords.longitude})
        }, (error) => {

        }, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
   

      console.log("request data called")
      const location = {
        "lat": 40.7580, 
        "long": -73.9855
    }

   const heatMap = requestData(location).then(function (heatMapData) {
        //    console.log("plan sucess");
        //    console.log("heat Map Data: " + JSON.stringify(heatMapData));


        //    const gradient = [
        //     "rgba(0, 255, 255, 0)",
        //     "rgba(0, 255, 255, 1)",
        //     "rgba(0, 191, 255, 1)",
        //     "rgba(0, 127, 255, 1)",
        //     "rgba(0, 63, 255, 1)",
        //     "rgba(0, 0, 255, 1)",
        //     "rgba(0, 0, 223, 1)",
        //     "rgba(0, 0, 191, 1)",
        //     "rgba(0, 0, 159, 1)",
        //     "rgba(0, 0, 127, 1)",
        //     "rgba(63, 0, 91, 1)",
        //     "rgba(127, 0, 63, 1)",
        //     "rgba(191, 0, 31, 1)",
        //     "rgba(255, 0, 0, 1)",
        //   ];


        const gradient = [
            'rgba(0, 255, 0, 0)',
            'rgba(0, 255, 0, 1)',
            'rgba(255, 255, 0, 0)',
            'rgba(255, 255, 0, 1)',
            'rgba(255, 127, 0, 0)',
            'rgba(255, 127, 0, 1)',
            'rgba(255, 0, 0, 0)',
            'rgba(255, 0, 0, 1)',
            'rgba(127, 0, 127, 0)',
            'rgba(127, 0, 127, 1)'
          ];

           var heatMap = new google.maps.visualization.HeatmapLayer({
               data: heatMapData,
               map: map,
               dissipating: true
           });

        //    heatMap.set("gradient", heatMap.get("gradient") ? null : gradient);
           heatMap.set("radius", heatMap.get("radius") ? null : 20);
           heatMap.set("opacity", heatMap.get("opacity") ? null : 0.7);
           return heatMap;
       })
       .catch((error)=>{
       console.log("plan failed: " + error);
       return error;
   }).finally((end)=>{
      const spinner = document.getElementById("loader");
      spinner.remove();
       return;
   });

  

  
}

async function requestData(location){

   location.origin = 'web'
   return axios.post("https://8wm236gv0l.execute-api.us-east-1.amazonaws.com/Combined-Data/get-combined-data?=apikey",location,{
        headers:{
            "x-api-key":"k1hc3AeZl8o6HMAjlJAeazZSHO8TEMaR96Aru613",
            "Content-Type": "application/json",
            "Content-Type":"application/json",
        }
        }).then((result) => {
            // console.log(result.data.body);
            const heatMapData = parseData(JSON.parse(result.data.body));
            
            return heatMapData
        }).catch((error) => {
            return error;
        });
  }


  function parseData(data){
    const weightedLocations = data.map((row)=>{
        const weight = row.crowd_estimation <= 0 ? 0 : Math.log2(row.crowd_estimation);
        const lat = row.latitude;
        const long = row.longitude;

        return {location: new google.maps.LatLng(lat, long), weight: weight};
    })

    return weightedLocations;

  }

  function addResources(){
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'url';
      document.body.appendChild(script);
  }



  function getLocation(map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, positionError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    // Success, can use position.
    console.log("Your position is: " + position);

  }
  
  function positionError(error) {
    if (error.PERMISSION_DENIED) {
      console.log("Error: permission denied");
      // Your custom modal here.
      showError('Geolocation is not enabled. Please enable to use this feature.');
    } else {
      // Handle other kinds of errors.
      console.log("Other kind of error: " + error);
    }
  }
  
  function showError(message) {
    // TODO
  }


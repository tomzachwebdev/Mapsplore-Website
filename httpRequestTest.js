var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

async function requestData(){
    let request = new XMLHttpRequest();
    
    const location = {
      "lat": 40.7580, 
      "long": -73.9855
  }


    request.open("OPTIONS","https://8wm236gv0l.execute-api.us-east-1.amazonaws.com/Combined-Data/get-combined-data?=apikey",true);
    
    request.setRequestHeader("x-api-key","k1hc3AeZl8o6HMAjlJAeazZSHO8TEMaR96Aru613")
    request.setRequestHeader("Content-Type", "application/json")
    // request.setRequestHeader("data",`{"lat":40.6125658,"long":-73.9070706}`)
    request.send(JSON.stringify(location))

    // request.open("GET","http://ip.jsontest.com/")
    request.onload = () => {
        console.log("response loaded")
        console.log(JSON.parse(request.responseText));

        // var data = JSON.parse(request.responseText);
    }

    request.onerror = (err) => {
        console.log("error getting response: \n" + err);
    }

    request.send()
    // request.onreadystatechange = ()=>{
    //   if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    //       // Request finished. Do processing here.
    //       var result = request.response;
    //       console.log("resonse: " + result);
    //   }else{
    //       console.log("an error occurred")
    //   }
    // }
}

requestData()
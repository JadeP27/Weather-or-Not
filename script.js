$(document).ready(function () {
 
    const APIkey = "fe699990845e66b1c83e0051ad8fd349";
    var location = $(".cityname");
    var weatherConditions = $(".conditions");
    var temp = $(".temperature");
    var humidityPer = $(".humidity");
    var wind = $(".wind-speed");
    let city = $("#user-input");
    let 

    //Run function
    function selectCity() {

    // Constructing a queryURL using the user input for the weather call
        var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID="
       + APIkey

    // Performing an AJAX request with the queryURL
        $.ajax({
         url: queryURL,
         method: "GET"
        })
      // After data comes back from the request
        .then(function(response) {
        console.log(queryURL);
        console.log(response);
    
      // storing the data from the AJAX request in the results variable
        localStorage.setItem("weather-heading", response.name);
        localStorage.setItem("conditions", response.weather.description.icon);
        localStorage.setItem("temperature", response.main.temp);
        localStorage.setItem("humidity", response.main.humidity);
        localStorage.setItem("wind-speed", response.wind.speed);
        localStorage.setItem("id", response.id);
        const idNum = (response.id);

        // getting the information from localstorage
        location.textContent=localStorage.getItem("weather-heading");
        weatherConditions.textContent=localStorage.getItem("conditions");
        temp.textContent=localStorage.getItem("temperature");
        humidityPer.textContent=localStorage.getItem("humidity");
        wind.textContent=localStorage.getItem("wind-speed");
    
        // Constructing a queryURL using the user input for the forecast call
        var queryURL = "api.openweathermap.org/data/2.5/forecast?id=" + idNum  + "&APPID=" + APIkey;
    
        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
           })
         // After data comes back from the request
           .then(function(response) {
           console.log(queryURL);
           console.log(response).data;

          // Add forecast content to html
           $("weekly-forecase").text("forecast" + response.data); 

          // Adding the city locations to Previously Searched field
          $("searched-city").text=city;
    });

    // Adding click event listen listener to select button
    $("selectbutton").on("click", selectCity()); 

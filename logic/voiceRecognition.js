$(document).ready(function(){
    var testString = "what is the weather in Philadelphia";

    function modifyString(string){
        var n = string.split(" ");                      // ? Turn the expression into an arr
        var lastWord = n.pop();                         // ? Pop to remove/return the last element
        console.log("Last word test: "+ lastWord);      // ? Testing the last element

        var modifiedExpression = n.splice(0, n.length); // ? Splice the array to remove the last element
        console.log(modifiedExpression);                // ? Testing the array

        // * Now that we have the last word, we can test further
        // * Since for the weather command, the last word is the location, we can pass that into an API. 
        var apiKey = "45fcf52b47d79723b15c821561fb0595"
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=48.13&lon=17.12&APPID=45fcf52b47d79723b15c821561fb0595"
        console.log("API Call... "+queryURL);

        $.ajax({
            URL: queryURL,
            method: "GET"
        }).then(function(data){
            console.log(data);
        })
    };

    modifyString(testString);
});
module.exports = function(app) {

    // * Route for the home page (At present this is hosting the facial recognition)
    app.get("/", function(req, res){
        console.log("Hit the home route");  // * Upon hitting the route, console log...
        res.render("home");                 // * ... then render
    });

    // * Route for voice recognition
    app.get("/voice", function(req, res){
        console.log("Hit the voice route");
        res.render("voiceRecognition");
    });
    
};
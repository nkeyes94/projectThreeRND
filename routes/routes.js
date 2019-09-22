module.exports = function(app) {

    // * Route for the home page
    app.get("/", function(req, res){
        console.log("Hit the home route");  // * Upon hitting the route, console log...
        res.render("home");                 // * ... then render
    });
    
};
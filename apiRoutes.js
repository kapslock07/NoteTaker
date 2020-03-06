// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");
var notesArray = require("./db/db");
// var tableArray = require("./tableData");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------



    app.get("/api/notes", function (req, res) {
        return res.json(notesArray);
    });

    // If no matching route is found default to home
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

    // Displays a single note, or returns false
    app.get("/api/notes/:notes", function (req, res) {
        var chosen = req.params.note;

        console.log(chosen);

        for (var i = 0; i < notesArray.length; i++) {
            if (chosen === notesArray[i].id) {
                return res.json(notesArray[i]);
            }
        }

        return res.json(false);
    });

    //HTML POST Requests

    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        notesArray.push(newNote);
        res.json(newNote);
    });

    // Delete Requests
    app.delete("/api/notes/:notes", function (req, res) {
        res.send('Got a DELETE request at /notes')
    })
};




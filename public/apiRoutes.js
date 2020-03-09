// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");
var notesArray = require("../db/db");
var fs = require('fs');

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



    // Displays a single note, or returns false
    app.get("/api/notes/:id", function (req, res) {
        var chosen = req.params.id;

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

        if (notesArray.length === 0) newNote.id = 1;
        else newNote.id = notesArray[notesArray.length-1].id + 1;

        notesArray.push(newNote);

        fs.writeFileSync("./db/db.json", JSON.stringify(notesArray));

        res.json(newNote);
    });

    // Delete Requests
    app.delete("/api/notes/:id", function (req, res) {
        var id = parseInt(req.params.id);
        console.log(id, notesArray)
        notesArray = notesArray.filter(note => {
            // console.log(id, note.id)
            return id !== note.id
        });

        fs.writeFileSync("./db/db.json", JSON.stringify(notesArray));

        res.json(true)
    })
};




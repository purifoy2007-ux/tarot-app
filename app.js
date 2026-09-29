const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home page
app.get("/", (req, res) => {
    res.render("index", {
        card: null,
        error: null
    });
});

// Draw a tarot card
app.post("/draw", async (req, res) => {

    try {

        // Ask the Tarot API for one random card
        const response = await axios.get(
            "https://tarotapi.dev/api/v1/cards/random?n=1"
        );

        // The API returns cards inside an array
        const card = response.data.cards[0];

        console.log(card);

        // Send the card to the EJS page
        res.render("index", {
            card: card,
            error: null
        });

    } catch (error) {

        console.error("API Error:", error.message);

        res.render("index", {
            card: null,
            error: "Sorry, we couldn't retrieve a tarot card. Please try again."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

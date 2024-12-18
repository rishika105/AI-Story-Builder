const express = require("express");
const { generatePrompt, genres } = require("../controllers/AIController");
const router = express.Router();
const {auth} = require("../middlewares/auth")

router.post("/generate-prompt", auth,  generatePrompt);

router.get("/genres", auth, (req, res) => res.status(200).json({ genres }));
console.log(genres);

module.exports = router;

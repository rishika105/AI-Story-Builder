const express = require("express");
const { generatePrompt, genres } = require("../controllers/aiController");
const router = express.Router();

router.post("/generate-prompt", generatePrompt);
router.get("/genres", (req, res) => res.status(200).json({ genres }));

module.exports = router;

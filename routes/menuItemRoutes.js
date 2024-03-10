const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");

// POST route to add a menu
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Menu Data saved to Database");
    res.status(200).json(response);
  } catch (error) {
    console.log("Error in saving menu:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET method to get the menu
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json({ error: "Internal Server Error" });
  }
});

// parameterised GET method on the basis of taste
router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;

    if (tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Work Type" });
    }
  } catch (error) {
    console.error("Error fetching persons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const MenuId = req.params.id;
    const updatedMenuData = req.body;

    const response = await MenuItem.findByIdAndUpdate(MenuId, updatedMenuData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }
    console.log("Data updated");
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching Menu:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuID = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuID);
    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }
    console.log("Menu Deleted");
    res.status(404).json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error("Error deleting Menu:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Comment added for testing purpose for git
module.exports = router;

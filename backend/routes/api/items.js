const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item Model
const Item = require("../../models/Item");

//@route GET api/items
//@desc GET All Items
//@access Public
router.get("/", (req, res) => {
  //? sort() method ref : https://www.tutorialspoint.com/mongodb/mongodb_sort_record.htm
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//@route GET api/items/:id
//@desc GET a list by id
//@access Private
router.get("/:listId", (req, res) => {
  Item.findById(req.params.listId).then((list) => res.json(list));
});

//@route POST api/items
//@desc  Create A Item
//@access Private
// router.post("/", auth, (req, res) => {
//   const newItem = new Item({
//     name: req.body.name,
//   });

//   newItem.save().then((item) => res.json(item));
// });
// ? NEW
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    list: req.body.list,
  });

  newItem.save().then((item) => res.json(item));
});

//@route POST api/items
//@desc  Create a Default List
//@access Private
router.post("/defaultList", (req, res) => {
  const newItem = new Item({
    list: [
      {
        itemName: "Eggs",
        done: false,
      },
      {
        itemName: "EAT",
        done: false,
      },
    ],
  });

  newItem.save().then((item) => res.json(item));
});

//@route PUT api/items
//@desc  Update the list
//@access Private
router.put("/", auth, (req, res) => {
  Item.updateOne(
    { _id: req.body._id },
    {
      $push: {
        list: {
          itemName: req.body.newItem.itemName,
          done: req.body.newItem.done,
        },
      },
    }
  ).then((item) => res.json(item));
});

//@route PUT api/items/
//@desc  Update the list (remove item)
//@access Private
router.put("/deleteItem", auth, (req, res) => {
  Item.updateOne(
    { _id: req.body._id },
    {
      $pull: {
        list: {
          itemName: req.body.itemToDelete.itemName,
          done: req.body.itemToDelete.done,
        },
      },
    },
    { multi: false }
  ).then((item) => res.json(item));
});

//@route DELETE api/items/:id
//@desc  Delete A Item
//@access Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      item.remove().then(() =>
        res.json({
          success: true,
        })
      );
    })
    .catch((err) =>
      res.status(404).json({
        success: false,
      })
    );
});

module.exports = router;

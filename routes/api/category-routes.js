const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: [
      'id',
      'category_name',
    ],

    include: [

      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      },
      
    ]

  })
    .then(dbPostData => res.json(dbPostData))
      .catch((err) => {
        if (err) throw err;
      });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },

    include: [

      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }

    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  })
  .then((categoryData) => {
    res.json(categoryData);
  })
  .catch((err) =>{
    if (err) throw err;
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((categoryName) =>{
    res.json(categoryName);
  })
  .catch((err) =>{
    if (err) throw err ;
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      if (err) throw err ;
    });
});

module.exports = router;
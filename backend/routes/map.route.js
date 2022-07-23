let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Map Model
let liquidMapSchema = require('../Models/liquidMap')

// CREATE Student
router.route('/create-map').post((req, res, next) => {
  liquidMapSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})

// READ Maps
router.route('/').get((req, res) => {
  liquidMapSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// GET Map BY ID
router.route('/get-map/:id').get((req, res) => {
  liquidMapSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// GET Map Version BY ID
router.route('/get-map-version/:id/:vid').get((req, res) => {
  liquidMapSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data.versionMap[req.params.vid])
    }
  })
})
// Update map
router.route('/update-map/:id').put((req, res, next) => {
  liquidMapSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body.obj,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        console.log('Map updated successfully !')
      }
    },
  )
  liquidMapSchema.findByIdAndUpdate(
    req.params.id,
    {$push: {"versionMap": req.body.vMap}},
    {upsert: true, new : true},
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        console.log('Map updated successfully !')
      }
    },
  )
})

// Delete map
router.route('/delete-map/:id').delete((req, res, next) => {
  liquidMapSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = router

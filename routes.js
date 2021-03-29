const { validateUsernameExist, verify } = require('./middleware.js')
const User = require('./schemas/User.js')
const Survey = require('./schemas/Survey.js')
const { CourseRating } = require('./constants/constants.js')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const path = require('path')
const { validateEmailExist } = require('./middleware')
const { updateUserWeight } = require('./utils')
const { calculateRating } = require('./utils')
const { getUserId } = require('./utils')


router.post('/users/register',
  validateEmailExist,
  async (req, res) => {
    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,
        weight: 1,
      })
      await newUser.save()
      res.send({
        code: 200,
        data: null,
        message: 'Registration successful',
      })
    } catch (err) {
      res.send({
        code: 400,
        data: null,
        message: err,
      })
    }
  })

router.post('/users/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user || user.password !== req.body.password) {
    res.send({
      code: 400,
      data: null,
      message: 'Email or password incorrect. Please try again.',
    })
  } else {
    const token = jwt.sign({ _id: user._id, userType: user.userType }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({
      code: 200,
      data: token,
      message: '',
      userType: user.userType,
    })
  }
})

router.get('/users',
  async (req, res) => {
    try {
      const courseId = req.query.surveyId
      let users = await User.find({ deleted: false }).sort({updatedDate: -1}).lean()
      if (courseId) {
        const course = await Survey.findById(courseId).lean()
        const ratedUserIds = course.results.map(result => result.userId.toString())
        users = users.filter(user => !ratedUserIds.includes(user._id.toString()))
      }
      res.send({
        code: 200,
        data: users,
        message: 'OK',
      })
    } catch (err) {
      res.send({
        code: 400,
        data: null,
        message: err,
      })
    }
  })

router.post('/users',
  validateEmailExist,
  async (req, res) => {
    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        userType: req.body.type,
        weight: 1,
        deleted: false,
      })
      await newUser.save()
      res.send({
        code: 200,
        data: null,
        message: 'OK',
      })
    } catch (err) {
      res.send({
        code: 400,
        data: null,
        message: err,
      })
    }
  })

router.put('/users/:id',
  async (req, res) => {
    try {
      await User.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        email: req.body.email,
        userType: req.body.type,
        updatedDate: Date.now()
      })
      res.send({
        code: 200,
        data: null,
        message: 'OK',
      })
    } catch (err) {
      res.send({
        code: 400,
        data: null,
        message: err,
      })
    }
  })

router.delete('/users/:id',
  async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        deleted: true,
        updatedDate: new Date()
      })
      res.send({
        code: 200,
        data: null,
        message: 'OK',
      })
    } catch (err) {
      res.send({
        code: 400,
        data: null,
        message: err,
      })
    }
  })

router.get('/surveys',
  async (req, res) => {
    try {
      const type = req.query.type
      let surveys = []
      if (type === 'user') {
        surveys = await Survey.find({
          isOpen: true,
        }).sort({ isOpen: -1, updatedDate: -1 })
      } else {
        surveys = await Survey.find({}).sort({ isOpen: -1, updatedDate: -1 })
      }
      res.send({
        code: 200,
        data: surveys,
        message: '',
      })
    } catch (err) {
      res.send({
        code: 400,
        data: null,
        message: err,
      })
    }
  })

router.post('/surveys',
  async (req, res) => {
    const survey = new Survey({
      courseName: req.body.courseName,
      isOpen: true,
      score: null,
      rating: null,
      results: [],
    })

    try {
      const newSurvey = await survey.save()
      res.send({
        code: 200,
        data: newSurvey,
        message: '',
      })
    } catch (err) {
      res.send({
        code: 400,
        data: null,
        message: err,
      })
    }
  })

// Close survey
router.post('/surveys/:id',
  async (req, res) => {
    try {
      const surveyRatings = (await Survey.findById(req.params.id).lean()).results
      const userIds = surveyRatings.map(rating => rating.userId)
      const users = await User.find({
        _id: {
          $in: userIds,
        },
      }).lean()
      const result = calculateRating(surveyRatings, users)
      await Survey.findByIdAndUpdate(req.params.id,
        {
          isOpen: false,
          score: result.score,
          rating: result.rating,
          updatedDate: new Date()
        })
      await updateUserWeight(surveyRatings)
      res.send({
        code: 200,
        data: null,
        message: '',
      })
    } catch (err) {
      res.send({
        code: 400,
        data: null,
        message: err,
      })
    }
  })

router.put('/surveys/:id',
  async (req, res) => {
    try {
      await Survey.findByIdAndUpdate(req.params.id, {
        courseName: req.body.courseName,
        updatedDate: Date.now()
      })
      res.send({
        code: 200,
        data: null,
        message: 'OK',
      })
    } catch (err) {
      res.send({
        code: 400,
        data: null,
        message: err,
      })
    }
  })

router.delete('/surveys/:id',
  async (req, res) => {
    try {
      await Survey.findByIdAndDelete(req.params.id)
      res.send({
        code: 200,
        data: null,
        message: 'OK',
      })
    } catch (err) {
      res.send({
        code: 400,
        data: null,
        message: err,
      })
    }
  })

router.post('/surveys/:id/submit',
  async (req, res) => {
    try {
      const userId = req.body.userId
      const surveyRatings = (await Survey.findById(req.params.id).lean()).results
      const userIds = surveyRatings.map(rating => rating.userId).concat(userId)
      const users = await User.find({
        _id: {
          $in: userIds,
        },
      }).lean()
      surveyRatings.push({
        userId,
        rating: req.body.rating,
      })
      const result = calculateRating(surveyRatings, users)
      await Survey.findByIdAndUpdate(req.params.id, {
        $push: {
          results: {
            userId,
            rating: req.body.rating,
          },
        },
        score: result.score,
        rating: result.rating,
        updatedDate: Date.now()
      })
      res.send({
        code: 200,
        data: null,
        message: 'OK',
      })
    } catch (err) {
      res.send({
        code: 400,
        data: null,
        message: err,
      })
    }
  },
)

router.get('/statistics',
  async (req, res) => {
    try {
      const userCount = await User.find({ deleted: false }).count()
      const courseCount = await Survey.find({}).count()
      const openSurveyCount = await Survey.find({ isOpen: true }).count()
      const closedSurveyCount = await Survey.find({ isOpen: false }).count()
      res.send({
        code: 200,
        data: { userCount, courseCount, openSurveyCount, closedSurveyCount },
        message: 'OK',
      })
    } catch (err) {
      res.send({
        code: 400,
        data: null,
        message: err,
      })
    }
  },
)



module.exports = router
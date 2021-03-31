const jwt = require('jsonwebtoken')
const User = require('./schemas/User')
const { CourseRating } = require('./constants/constants')

const getUserId = (req) => {
  const userInfo = jwt.decode(req.header('Authorization'))
  return userInfo._id
}

const updateUserWeight = async (ratingList) => {
  const userIds = ratingList.map(rating => rating.userId)
  const users = await User.find({
    _id: {
      $in: userIds,
    },
  }).lean()

  const M = buildM(ratingList, users)

  const G = buildG(M, M.length)

  const userWeightById = {}
  users.forEach(user => {
    userWeightById[user._id.toString()] = user.weight
  })

  const userWeightAndId = []
  ratingList.forEach(userRating => {
    let diff = 0
    let weight = userWeightById[userRating.userId.toString()]
    const results = Object.values(userRating.rating)
    for (let i = 0; i < results.length; i++) {
      diff += Math.abs(G[i] - results[i])
    }
    (diff /= 50).toFixed(2)
    if (diff <= 0.15) {
      if (weight + diff > 1) {
        weight = 1
      } else {
        weight += diff
      }
    } else {
      if (diff <= 0.2) {
        if (weight - diff < 0) {
          weight = 0
        } else {
          weight -= diff
        }
      } else {
        weight -= 0.2
      }

    }
    userWeightAndId.push({
      userId: userRating.userId.toString(),
      weight: weight.toFixed(2),
    })
  })

  const updateUsers = userWeightAndId.map(element => User
    .findByIdAndUpdate(element.userId, { weight: element.weight, updatedDate: Date.now() }))

  return Promise.all(updateUsers)
}

const buildM = (ratingList, users) => {

  const weightByUserId = {}
  users.forEach(user => {
    weightByUserId[user._id] = user.weight
  })

  const M = [[], [], [], [], [], [], [], [], [], []]
  ratingList.forEach(result => {
    if (result.rating !== null && result.rating !== undefined) {
      Object.values(result.rating).forEach((value, subIndex) => {
        M[subIndex].push({
          weight: weightByUserId[result.userId],
          rating: value,
        })
      })
    }
  })

  return M
}

const buildG = (M) => {
  return M.map(itemM => {
    return itemM.reduce((acc, val) => acc + val.weight * val.rating, 0)
  })
}

const buildE = (G, count) => {
  return G.map((value) => {
    return [
      fuzzyFunctions(value / count, 'E'),
      fuzzyFunctions(value / count, 'G'),
      fuzzyFunctions(value / count, 'S'),
      fuzzyFunctions(value / count, 'M'),
      fuzzyFunctions(value / count, 'P'),
    ]
  })
}

const buildY = (E, R) => {
  const Y = []
  for (let i = 0; i < 5; i++) {
    Y[i] = R.reduce((acc, valR, index) => acc + valR * E[index][i], 0)
  }

  return Y
}

const calculateRating = (ratingList, userList) => {
  if (ratingList.length === 0) {
    return {
      score: null,
      rating: null,
    }
  }

  const M = buildM(ratingList, userList)

  const G = buildG(M)

  const E = buildE(G, ratingList.length)

  const R = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]

  const Y = buildY(E, R)

  let maxValue = {
    value: 0,
    index: 0,
  }

  Y.forEach((value, index) => {
    if (value >= maxValue.value) {
      maxValue = {
        value,
        index,
      }
    }
  })

  const finalScore = ((G.reduce((acc, val) => acc + val, 0)) * 2 / ratingList.length).toFixed(2)
  let finalRating = null
  switch (maxValue.index) {
    case 0:
      finalRating = CourseRating.EXCELLENT
      break
    case 1:
      finalRating = CourseRating.GOOD
      break
    case 2:
      finalRating = CourseRating.SATISFACTORY
      break
    case 3:
      finalRating = CourseRating.MEDIUM
      break
    case 4:
      finalRating = CourseRating.POOR
      break
    default:
      break
  }

  return {
    score: finalScore,
    rating: finalRating,
  }
}

const fuzzyFunctions = (score, type) => {
  switch (type) {
    case 'E':
      if (score >= 0 && score <= 4.25) {
        return 0
      } else if (score > 4.25 && score <= 4.5) {
        return (score - 4.25) / 0.25
      } else {
        return 1
      }
    case 'G':
      if (score >= 0 && score <= 3.75) {
        return 0
      } else if (score > 3.75 && score <= 4) {
        return (score - 3.75) / 0.25
      } else if (score > 4 && score <= 4.25) {
        return 1
      } else if (score > 4.25 && score <= 4.5) {
        return (4.5 - score) / 0.25
      } else {
        return 0
      }
    case 'S':
      if (score >= 0 && score <= 3) {
        return 0
      } else if (score > 3 && score <= 3.25) {
        return (score - 3) / 0.25
      } else if (score > 3.25 && score <= 3.75) {
        return 1
      } else if (score > 3.75 && score <= 4) {
        return (4 - score) / 0.25
      } else {
        return 0
      }
    case 'M':
      if (score >= 0 && score <= 2) {
        return 0
      } else if (score > 2 && score <= 2.25) {
        return (score - 2) / 0.25
      } else if (score > 2.25 && score <= 2.75) {
        return 1
      } else if (score > 2.75 && score <= 3.25) {
        return (3.25 - score) / 0.25
      } else {
        return 0
      }
    case 'P':
      if (score >= 0 && score <= 2) {
        return 1
      } else if (score > 2 && score <= 2.25) {
        return (2.25 - score) / 0.25
      } else {
        return 0
      }
    default:
      return 0
  }
}

module.exports = {
  getUserId,
  calculateRating,
  updateUserWeight,
}
import Axios from 'axios'

const server = "http://localhost:3001"

export const login = async (email, password) => {
    return Axios.post( '/api/users/login', {email, password})
    // return Axios.post( server + 'users/login', {email, password})
}

export const register = async (userInfo) => {
    return Axios.post('api/users/register', userInfo)
}

export const getUsers = async (surveyId = null) => {
    if (surveyId) {
        return Axios.get('/api/users?surveyId=' + surveyId)
    }
    return Axios.get('/api/users')
}

export const addUser = async (userInfo) => {
    return Axios.post('/api/users', userInfo)
}

export const updateUser = async (userId, userInfo) => {
    return Axios.put('/api/users/' + userId, userInfo)
}

export const deleteUser = async (userId) => {
    return Axios.delete('/api/users/' + userId)
}
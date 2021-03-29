import Axios from 'axios'

const server = 'http://localhost:3001'

export const getSurveys = async (type) => {
    return Axios.get('/api/surveys?type=' + type)
}

export const createSurvey = async (surveyInfo) => {
    return Axios.post('/api/surveys', surveyInfo)
}

export const closeSurvey = async (surveyId) => {
    return Axios.post('/api/surveys/' + surveyId)
}

export const updateSurvey = async (surveyId, surveyInfo) => {
    return Axios.put('/api/surveys/' + surveyId, surveyInfo);
}

export const deleteSurvey = async (surveyId) => {
    return Axios.delete('/api/surveys/' + surveyId);
}

export const submitSurveyResult = async (surveyId, payload) => {
    return Axios.post('/api/surveys/' + surveyId + '/submit', payload)
}

export const getStatistics = async () => {
    return Axios.get('/api/statistics');
}
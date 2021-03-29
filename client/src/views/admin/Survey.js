import Box from '@material-ui/core/Box'
import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import componentStyles from '../../assets/theme/views/admin/icons'
import { FormControlLabel, Radio } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import Button from '@material-ui/core/Button'
import { submitSurveyResult } from '../../actions/survey'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useStyles = makeStyles(componentStyles)

const handleChange = (index, value, rating, setRating) => {
  const newRating = { ...rating }
  newRating['criterion' + (index + 1)] = value
  setRating(newRating)
}

const tableRow = (
  criterion,
  formClasses,
  classes,
  index,
  rating,
  setRating,
) => {
  return (
    <TableRow key={criterion}>
      <TableCell
        classes={{
          root: classes.tableCellRoot + ' ' + classes.tableCellRootBodyHead,
        }}
        component='th'
        variant='head'
        scope='row'
      >
        <Box alignItems='center' display='flex'>
          <Box display='flex' alignItems='flex-end'>
            <Box fontSize='.775rem' component='span' width='90%'
                 style={{ overflowWrap: 'break-word', whiteSpace: 'normal' }}>
              {criterion}
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        <FormControlLabel
          control={<Radio color='primary' />}
          label=''
          value={1}
          classes={formClasses}
          checked={rating['criterion' + (index + 1)] === 1}
          onChange={() => handleChange(index, 1, rating, setRating)}
        />
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        <FormControlLabel
          control={<Radio color='primary' />}
          label=''
          value={2}
          classes={formClasses}
          checked={rating['criterion' + (index + 1)] === 2}
          onChange={() => handleChange(index, 2, rating, setRating)}
        />
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        <FormControlLabel
          control={<Radio color='primary' />}
          label=''
          value={3}
          classes={formClasses}
          checked={rating['criterion' + (index + 1)] === 3}
          onChange={() => handleChange(index, 3, rating, setRating)}
        />
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        <FormControlLabel
          control={<Radio color='primary' />}
          label=''
          value={4}
          classes={formClasses}
          checked={rating['criterion' + (index + 1)] === 4}
          onChange={() => handleChange(index, 4, rating, setRating)}
        />
      </TableCell>
      <TableCell classes={{ root: classes.tableCellRoot }}>
        <FormControlLabel
          control={<Radio color='primary' />}
          label=''
          value={5}
          classes={formClasses}
          checked={rating['criterion' + (index + 1)] === 5}
          onChange={() => handleChange(index, 5, rating, setRating)}
        />
      </TableCell>
    </TableRow>
  )
}

const studentCriteria = [
  'Does a hybrid class have the same quality as a face-to-face one?',
  'Do the E-learning materials (videos, e-books, slides etc.) in the course match the content and training objectives of the subject and bring good results in learning?',
  'Is the distribution rate for classroom and online activities streamlined and well-supported in the learning process?',
  'Does hybrid training affect the learning results positively (improved understanding, more well-organized knowledge, easy-to-review lessons)?',
  'Do teachers who teach hybrid classes regularly interact with, answer questions to, and ask questions of students on the LMS system?',
  'Do the tests/evaluations/exercises used by teachers on the LMS system bring positive effects?',
  'Does a hybrid class offers materials which are easy to find and are suitable for the needs (assignments, books, references) better than a traditional class?',
  'Does the website load fast enough? Can students easily view the website as well as download the necessary documents?',
  'Is the arrangement of classes on the LMS system logical and visual, which helps with the transition between courses and lessons?',
  'Are you satisfied with the hybrid training and will continue to participate in hybrid teaching classes in the near future (if any)?',
]

const teacherCriteria = [
  'Does a hybrid class have the same quality as a face-to-face one?',
  'Is the duration of the course appropriate?',
  'Is the duration for practical exercises or interactive situations and discussions participation suitable for the students?',
  'Are the exercises within the topics appropriate and sufficient?',
  'Are the learning materials (ppt, files, videos) within each course appropriate and sufficient?',
  'Can the teachers effectively manage the students\' results using the LMS system?',
  'Do the teachers have more time to organize cooperative/collective activities in class?',
  'Are students excited and actively participating in a hybrid course taught by their teachers?',
  'Do the teachers get technical support in time when needed?',
  'Are you satisfied with the hybrid training and will continue to participate in hybrid teaching classes in the near future (if any)?',
]

const initialRating = {
  criterion1: null,
  criterion2: null,
  criterion3: null,
  criterion4: null,
  criterion5: null,
  criterion6: null,
  criterion7: null,
  criterion8: null,
  criterion9: null,
  criterion10: null,
}

const Survey = (props) => {
  const classes = useStyles()
  const [rating, setRating] = useState(initialRating)
  const toastOption = {
    autoClose: 3000,
  }

  const handleSubmit = async () => {
    if (Object.values(rating).some(result => result === null)) {
      toast.error('Please rate all criteria before submitting', toastOption)
    } else {
      try {
        const { data } = await submitSurveyResult(props.surveyId, { userId: props.userId, rating })
        if (data.code === 200) {
          toast.success('Submitted successfully!', toastOption)
        }
        if (data.code === 400) {
          toast.error('Something went wrong. Please try again later.', toastOption)
        }
      } catch (err) {
        console.log(err)
        toast.error('Something went wrong. Please try again later.', toastOption)
      }
      props.handleClose()
    }
  }

  const handleGoBack = () => {
    props.handleClose()
  }

  const formClasses = {
    root: classes.formControlCheckboxLabelRoot,
    label: classes.formControlCheckboxLabelLabel,
  }
  const theme = useTheme()
  return (
    <TableContainer>
      <Box component={Table} alignItems='center' marginBottom='0!important'>
        <TableHead>
          <TableRow>
            <TableCell
              classes={{
                root: classes.tableCellRoot + ' ' + classes.tableCellRootHead,
              }}
            />
            <TableCell
              classes={{
                root: classes.tableCellRoot + ' ' + classes.tableCellRootHead,
              }}
            >
              Very Negative
            </TableCell>
            <TableCell
              classes={{
                root: classes.tableCellRoot + ' ' + classes.tableCellRootHead,
              }}
            >
              Negative
            </TableCell>
            <TableCell
              classes={{
                root: classes.tableCellRoot + ' ' + classes.tableCellRootHead,
              }}
            >
              Normal
            </TableCell>
            <TableCell
              classes={{
                root: classes.tableCellRoot + ' ' + classes.tableCellRootHead,
              }}
            >
              Positive
            </TableCell>
            <TableCell
              classes={{
                root: classes.tableCellRoot + ' ' + classes.tableCellRootHead,
              }}
            >
              Very Positive
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(props.userType === 'TEACHER' ? teacherCriteria : studentCriteria).map((criterion, index) =>
            tableRow(criterion, formClasses, classes, index, rating, setRating),
          )}
        </TableBody>
      </Box>
      <Button
        color='disabled'
        variant='contained'
        style={{ float: 'left', marginTop: '30px', marginLeft: '10px' }}
        onClick={handleGoBack}
      >
        Cancel
      </Button>
      <Button
        color='primary'
        variant='contained'
        style={{ float: 'right', marginTop: '30px', marginRight: '10px' }}
        onClick={() => handleSubmit(rating)}
      >
        Submit
      </Button>
    </TableContainer>
  )
}

export default Survey
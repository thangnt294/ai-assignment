import React, { useEffect, useState } from 'react'
// @material-ui/core components
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import FilledInput from '@material-ui/core/FilledInput'
import FormControl from '@material-ui/core/FormControl'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import InputAdornment from '@material-ui/core/InputAdornment'
import Slide from '@material-ui/core/Slide'
// @material-ui/icons components

import componentStyles from 'assets/theme/views/auth/login.js'
import School from '@material-ui/icons/School'
import { createSurvey, updateSurvey } from '../../actions/survey'
import { toast } from 'react-toastify'

const useStyles = makeStyles(componentStyles)

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

export default function EditCourse(props) {
  const classes = useStyles()
  const theme = useTheme()
  const toastOption = {
    autoClose: 3000,
  }
  const cardClasses = { root: classes.cardRoot }
  const cardContentClasses = { root: classes.cardContent }
  const titleTypographyProps = {
    component: Box,
    textAlign: 'center',
    marginBottom: '1rem!important',
    marginTop: '.5rem!important',
    fontSize: '1rem!important',
  }

  useEffect(() => {
    setCourseName(props.item?.courseName)
  }, [props.item?.courseName])

  const handleSubmit = async () => {
    try {
      let data
      if (props.action === 'ADD') {
        data = (await createSurvey({courseName})).data
      } else if (props.action === 'EDIT') {
        data = (await updateSurvey(props.item._id, {courseName})).data
      }
      if (data.code === 200) {
        if (props.action === 'ADD') {
          toast.success('Added a new course!', toastOption)
        } else if (props.action === 'EDIT') {
          toast.success('Updated successfully!', toastOption)
        }
        props.handleFinishAddCourse()
      }
      if (data.code === 400) {
        toast.error('Something went wrong. Please try again later.', toastOption)
      }
    } catch(err) {
      console.log(err)
      toast.error('Something went wrong. Please try again later.', toastOption)
    }

  }

  const handleChange = (event) => {
    setCourseName(event.target.value)
  }
  
  const [courseName, setCourseName] = useState('')
  return (
    <>
      <Dialog
        maxWidth='xs'
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleCloseAddCourse}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogContent>
          <Card classes={cardClasses}>
            <CardHeader
              className={classes.cardHeader}
              title={
                <Box
                  fontSize='150%'
                  fontWeight='400'
                  component='small'
                  color={theme.palette.gray[600]}
                >
                  {props.action === 'ADD' ? 'Add a course' : 'Edit course'}
                </Box>
              }
              titleTypographyProps={titleTypographyProps}
            />
            <CardContent classes={cardContentClasses}>
              <FormControl
                variant='filled'
                component={Box}
                width='100%'
                marginBottom='1rem!important'
              >
                <FilledInput
                  autoComplete='off'
                  type='text'
                  value={courseName}
                  onChange={handleChange}
                  placeholder='Course Name'
                  startAdornment={
                    <InputAdornment position='start'>
                      <School />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box textAlign='center' marginTop='1.5rem' marginBottom='1.5rem'>
                <Button color='primary' variant='contained' onClick={handleSubmit}>
                  {props.action === 'ADD' ? 'Add course' : 'Edit course'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  )
}
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
import { Radio, RadioGroup } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Email from '@material-ui/icons/Email'
import { addUser, updateUser } from '../../actions/account'
import { toast } from 'react-toastify'

const useStyles = makeStyles(componentStyles)

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

const toastOption = {
  autoClose: 3000,
}

export default function AddUser(props) {
  const classes = useStyles()
  const theme = useTheme()

  const cardClasses = { root: classes.cardRoot }
  const cardContentClasses = { root: classes.cardContent }
  const titleTypographyProps = {
    component: Box,
    textAlign: 'center',
    marginBottom: '1rem!important',
    marginTop: '.5rem!important',
    fontSize: '1rem!important',
  }
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState(null)

  useEffect(() => {
    setName(props.item?.name)
    setEmail(props.item?.email)
    setType(props.item?.type)
  }, [props.item?.name, props.item?.email, props.item?.type])

  const handleSubmit = async () => {
    try {
      let data
      if (props.action === 'ADD') {
        data = (await addUser({ name, email, type })).data
      } else if (props.action === 'EDIT') {
        data = (await updateUser(props.item.id, { name, email, type })).data
      }
      if (data.code === 200) {
        if (props.action === 'ADD') {
          toast.success('Added a new user!', toastOption)
        } else if (props.action === 'EDIT') {
          toast.info('Updated successfully!', toastOption)
        }
        props.handleFinishAddUser()
      }
      if (data.code === 400) {
        toast.error('Something went wrong. Please try again.', toastOption)
      }
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong. Please try again.', toastOption)
    }
  }

  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleChangeType = (event) => {
    setType(event.target.value)
  }


  return (
    <>
      <Dialog
        maxWidth='xs'
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleCloseAddUser}
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
                  {props.action === 'ADD' ? 'Add user' : 'Edit user'}
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
                  value={name}
                  onChange={handleChangeName}
                  placeholder='Name'
                  style={{marginBottom: '15px'}}
                  startAdornment={
                    <InputAdornment position='start'>
                      <School />
                    </InputAdornment>
                  }
                />
                <FilledInput
                  autoComplete='off'
                  type='text'
                  value={email}
                  onChange={handleChangeEmail}
                  placeholder='Email'
                  startAdornment={
                    <InputAdornment position='start'>
                      <Email />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box
                fontStyle='italic'
                fontSize='1rem'
                color={theme.palette.gray[600]}
                marginBottom='.5rem'
              >
                <Box component='small' fontSize='80%'>
                  User type:
                  <Box
                    component={RadioGroup}
                    aria-label='userType'
                    name='user-type'
                    value={type}
                    onChange={handleChangeType}
                    flexDirection='row!important'
                    fontSize='80%'
                  >
                    <FormControlLabel
                      control={<Radio color='primary' />}
                      label='Teacher'
                      value='TEACHER'
                      labelPlacement='end'
                      fontSize='80%'
                      classes={{
                        root: classes.formControlLabelRoot,
                        label: classes.formControlLabelLabel,
                      }}
                    />
                    <FormControlLabel
                      control={<Radio color='primary' />}
                      label='Student'
                      labelPlacement='end'
                      value='STUDENT'
                      fontSize='80%'
                      classes={{
                        root: classes.formControlLabelRoot,
                        label: classes.formControlLabelLabel,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box textAlign='center' marginTop='1.5rem' marginBottom='1.5rem'>
                <Button color='primary' variant='contained' onClick={handleSubmit}>
                  {props.action === 'ADD' ? 'Add user' : 'Edit user'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  )
}
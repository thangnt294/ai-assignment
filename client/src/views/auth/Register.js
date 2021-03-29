import React, { useState } from 'react'
// @material-ui/core components
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import FilledInput from '@material-ui/core/FilledInput'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
// @material-ui/icons components
import Email from '@material-ui/icons/Email'
import Lock from '@material-ui/icons/Lock'
import School from '@material-ui/icons/School'
import { register } from '../../actions/account'

// core components
import componentStyles from 'assets/theme/views/auth/register.js'
import { Radio, RadioGroup } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(componentStyles)

function Register() {
  const classes = useStyles()
  const theme = useTheme()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState(0)
  const history = useHistory()

  const handleRegister = async () => {
    try {
      const res = await register({
        name, email, password, userType,
      })
      if (res.data.code === 200) {
        alert('Registration Successful')
        history.push('/auth/login')
      }
      if (res.data.code === 400) {
        alert(res.data.message)
      }
    } catch (err) {
      alert('Something went wrong. Please try again later.')
    }

  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleChangeUserType = (event) => {
    setUserType(event.target.value)
  }

  return (
    <>
      <Grid item xs={12} lg={6} md={8}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <Box
                fontSize='120%'
                fontWeight='400'
                component='small'
                color={theme.palette.gray[600]}
              >
                Sign Up
              </Box>
            }
            titleTypographyProps={{
              component: Box,
              textAlign: 'center',
              marginBottom: '1rem!important',
              marginTop: '.5rem!important',
              fontSize: '1rem!important',
            }}
          />
          <CardContent classes={{ root: classes.cardContent }}>
            <FormControl
              variant='filled'
              component={Box}
              width='100%'
              marginBottom='1.5rem!important'
            >
              <FilledInput
                autoComplete='off'
                type='text'
                placeholder='Name'
                onChange={handleChangeName}
                startAdornment={
                  <InputAdornment position='start'>
                    <School />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant='filled'
              component={Box}
              width='100%'
              marginBottom='1.5rem!important'
            >
              <FilledInput
                autoComplete='off'
                type='email'
                placeholder='Email'
                onChange={handleChangeEmail}
                startAdornment={
                  <InputAdornment position='start'>
                    <Email />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant='filled'
              component={Box}
              width='100%'
              marginBottom='1.5rem!important'
            >
              <FilledInput
                autoComplete='off'
                type='password'
                placeholder='Password'
                onChange={handleChangePassword}
                startAdornment={
                  <InputAdornment position='start'>
                    <Lock />
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
                I am a:
                <Box
                  component={RadioGroup}
                  aria-label='userType'
                  name='user-type'
                  value={userType}
                  onChange={handleChangeUserType}
                  flexDirection='row!important'
                  fontSize='80%'
                >
                  <FormControlLabel
                    control={<Radio color='primary' />}
                    label='Teacher'
                    value='1'
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
                    value='2'
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
              <Button color='primary' variant='contained' onClick={handleRegister}>
                Create account
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default Register

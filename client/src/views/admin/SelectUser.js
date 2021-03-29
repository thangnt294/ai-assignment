import React, { useEffect, useState } from 'react'
// @material-ui/core components
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
// @material-ui/icons components
import componentStyles from 'assets/theme/views/auth/login.js'
import { getUsers } from '../../actions/account'
import { toast } from 'react-toastify'
import CardHeader from '@material-ui/core/CardHeader'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Pagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles(componentStyles)

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

const userRender = (id, name, weight, type, handleSelectUser, classes) => {
  const iconClass = type === 'STUDENT' ? 'ni ni-hat-3' : 'ni ni-circle-08'
  return (
  <Box
    component='button'
    fontFamily='inherit'
    fontSize='16px'
    fontWeight='400'
    lineHeight='1'
    height='80%!important'
    display='inline-block'
    width='100%'
    margin='.5rem 0'
    padding='15px'
    textAlign='left'
    style={{ border: '2px solid #11cdef', backgroundColor: '#d8e0ea' }}
    border='0'
    key={id}
    onClick={() => {
      handleSelectUser(id, type)
    }}
    borderRadius='4px'
    className={classes.button}
    data-clipboard-text='album-2'
    type='button'
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <i className={iconClass} style={{ color: 'black', marginRight: '10px' }} />
        <span style={{ color: 'black', justifySelf: 'self-end' }}>{name}</span>
      </div>
      <span style={{ color: 'black', justifySelf: 'self-end' }}>{weight}</span>
    </div>
  </Box>
)
}

export default function SelectUser(props) {
  const [userList, setUserList] = useState([])
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
  const toastOption = {
    autoClose: 3000,
  }
  const pageSize = 5
  const [page, setPage] = useState(1)
  const [currentUserList, setCurrentUserList] = useState([])

  const handleChangePage = (event, page) => {
    setPage(page)
    setCurrentUserList(userList.slice((page - 1) * pageSize, page * pageSize))
  }

  useEffect(() => {
    fetchData().then()
  }, [])

  async function fetchData() {
    const { data } = await getUsers(props.surveyId)
    if (data.code === 200) {
      setUserList(data.data)
      setCurrentUserList(data.data.slice(0, 5))
    }
    if (data.code === 400) {
      toast.error('Something went wrong. Please reload the page.', toastOption)
      console.log(data.message)
    }
  }

  return (
    <>
      <Dialog
        maxWidth='xs'
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleCloseSelectUser}
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
                  Select an evaluator
                </Box>
              }
              titleTypographyProps={titleTypographyProps}
            />
          </Card>
          <CardContent classes={cardContentClasses} style={{textAlign: 'center'}}>
            {userList.length > 0 ?
              currentUserList.map(user => userRender(user._id, user.name, user.weight, user.userType, props.handleSelectUser, classes))
            : <p>No available evaluator</p>}
          </CardContent>
          <Box justifyContent="center" display="flex">
          <Pagination count={Math.floor((userList.length - 1) / pageSize) + 1} color='primary' variant='outlined'
                      page={page} onChange={handleChangePage} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
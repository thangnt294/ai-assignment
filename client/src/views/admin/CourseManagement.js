import React, { useEffect, useState } from 'react'

// @material-ui/core components
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
// @material-ui/lab components
import Pagination from '@material-ui/lab/Pagination'
// @material-ui/icons components
import MoreVert from '@material-ui/icons/MoreVert'

// core components
// import Header from "components/Headers/Header.js";
import componentStyles from 'assets/theme/views/admin/tables.js'
import CustomHeader from '../../components/Headers/CustomHeader'
import { closeSurvey, deleteSurvey, getSurveys } from '../../actions/survey'
import EditCourse from './EditCourse'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useStyles = makeStyles(componentStyles)

const Tables = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [anchorEl1, setAnchorEl1] = React.useState(null)
  const [anchorEl2, setAnchorEl2] = React.useState(null)
  const [anchorEl3, setAnchorEl3] = React.useState(null)
  const [anchorEl4, setAnchorEl4] = React.useState(null)
  const [anchorEl5, setAnchorEl5] = React.useState(null)
  const toastOption = {
    autoClose: 3000,
  }
  const handleClick = (event) => {
    switch (event.currentTarget.getAttribute('aria-controls')) {
      case 'simple-menu-1':
        setAnchorEl1(event.currentTarget)
        break
      case 'simple-menu-2':
        setAnchorEl2(event.currentTarget)
        break
      case 'simple-menu-3':
        setAnchorEl3(event.currentTarget)
        break
      case 'simple-menu-4':
        setAnchorEl4(event.currentTarget)
        break
      case 'simple-menu-5':
        setAnchorEl5(event.currentTarget)
        break
      default:
    }
  }
  const handleClose = () => {
    setAnchorEl1(null)
    setAnchorEl2(null)
    setAnchorEl3(null)
    setAnchorEl4(null)
    setAnchorEl5(null)
  }

  const header = (handleAddCourse) => (
    <div>
      <p style={{ display: 'inline-block', marginTop: '10px' }}>Course Management</p>
      <Button color='primary' variant='contained' style={{ float: 'right' }} onClick={handleAddCourse}>
        Add Course
      </Button>
    </div>
  )

  const myStyle = (isOpen) => {
    if (isOpen) {
      return null
    }
    return { backgroundColor: 'gray' }
  }

  const tableRow = (_id, courseName, isOpen, score, rating, index) => {
    let progress = null
    switch(rating) {
      case 'Excellent':
        progress = classes.bgGradientPrimary
        break
      case 'Good':
        progress = classes.bgGradientSuccess
        break
      case 'Satisfactory':
        progress = classes.bgGradientInfo
        break
      case 'Medium':
        progress = classes.bgGradientWarning
        break
      case 'Poor':
        progress = classes.bgGradientError
        break
      default:
        break
    }
    let ariaControls = ''
    let anchorEl = {}
    switch(index) {
      case 0:
        ariaControls = 'simple-menu-1'
        anchorEl = anchorEl1
        break
      case 1:
        ariaControls = 'simple-menu-2'
        anchorEl = anchorEl2
        break
      case 2:
        ariaControls = 'simple-menu-3'
        anchorEl = anchorEl3
        break
      case 3:
        ariaControls = 'simple-menu-4'
        anchorEl = anchorEl4
        break
      case 4:
        ariaControls = 'simple-menu-5'
        anchorEl = anchorEl5
        break
      default:
        break
    }
    return (
      <TableRow key={_id}>
        <TableCell
          classes={{
            root:
              classes.tableCellRoot +
              ' ' +
              classes.tableCellRootBodyHead,
          }}
          component='th'
          variant='head'
          scope='row'
        >
          <Box alignItems='center' display='flex'>
            <Box display='flex' alignItems='flex-start'>
              <Box fontSize='.875rem' component='span'>
                {courseName}
              </Box>
            </Box>
          </Box>
        </TableCell>
        <TableCell classes={{ root: classes.tableCellRoot }}>
          <Box paddingTop='.35rem' paddingBottom='.35rem'>
            <Box
              marginRight='10px'
              component='i'
              width='.375rem'
              height='.375rem'
              borderRadius='50%'
              display='inline-block'
              className={
                classes.verticalAlignMiddle + ' ' + (isOpen ? classes.bgSuccess : classes.bgWarning)
              }
            />
            {isOpen ? 'Open' : 'Closed'}
          </Box>
        </TableCell>
        <TableCell classes={{ root: classes.tableCellRoot }}>
          {rating ? rating : 'NA'}
        </TableCell>
        <TableCell classes={{ root: classes.tableCellRoot }}>
          <Box display='flex' alignItems='center'>
            <Box component='span' marginRight='.5rem'>
              {score ? score : 'NA'}
            </Box>
            <Box width='100%'>
              <LinearProgress
                variant='determinate'
                value={score ? score : 0}
                classes={{
                  root: classes.linearProgressRoot,
                  bar: progress != null ? progress : classes.bgGradientError,
                }}
              />
            </Box>
          </Box>
        </TableCell>
        <TableCell
          classes={{ root: classes.tableCellRoot }}
          align='left'
        >
          <Box
            aria-controls={ariaControls}
            aria-haspopup='true'
            onClick={handleClick}
            size='small'
            style={myStyle(isOpen)}
            component={Button}
            disabled={!isOpen}
            width='2rem!important'
            height='2rem!important'
            minWidth='2rem!important'
            minHeight='2rem!important'
          >
            <Box
              component={MoreVert}
              width='1.25rem!important'
              height='1.25rem!important'
              position='relative'
              top='2px'
              color={theme.palette.grey[500]}
              // color="#fff"
            />
          </Box>
          <Menu
            // id='simple-menu-1'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleCloseSurvey(_id)}>Close Survey</MenuItem>
            <MenuItem onClick={() => handleEditSurvey({ _id, courseName, isOpen, score, rating })}>Edit</MenuItem>
            <MenuItem onClick={() => handleDeleteSurvey(_id)}>Delete</MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    )
  }

  const renderCourses = (surveyList) => {
    return surveyList.map((survey, index) => tableRow(survey._id, survey.courseName, survey.isOpen, survey.score, survey.rating, index))
  }

  const handleCloseSurvey = async (id) => {
    try {
      handleClose()
      const { data } = await closeSurvey(id)
      if (data.code === 200) {
        toast.info('Successfully closed the course', toastOption)
        await fetchData()
      }
      if (data.code === 400) {
        toast.error('Something went wrong. Please try again.', toastOption)
      }
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong. Please try again.', toastOption)
    }
  }

  const handleEditSurvey = (item) => {
    setCurrentItem(item)
    setAction('EDIT')
    setIsAddingCourse(true)
    handleClose()
  }

  const handleDeleteSurvey = async (id) => {
    try {
      const { data } = await deleteSurvey(id)
      if (data.code === 200) {
        toast.info('You deleted a course')
        fetchData().then()
      }
      if (data.code === 400) {
        toast.error('Something went wrong. Please try again.')
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
      console.log(err)
    }
    handleClose()
  }

  async function fetchData() {
    const { data } = await getSurveys('admin')
    if (data.code === 200) {
      setSurveyList(data.data)
      setCurrentSurveyList(data.data.slice(0, 5))
      setPage(1)
    }
    if (data.code === 400) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  useEffect(() => {
    fetchData().then()
  }, [])

  const [surveyList, setSurveyList] = useState([])
  const [currentSurveyList, setCurrentSurveyList] = useState([])
  const [isAddingCourse, setIsAddingCourse] = useState(false)
  const [action, setAction] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [page, setPage] = useState(1)
  const pageSize = 5

  const handleChangePage = (event, page) => {
    setPage(page)
    setCurrentSurveyList(surveyList.slice((page - 1) * pageSize, page * pageSize))
  }

  const handleOpenAddCourse = () => {
    setIsAddingCourse(true)
    setCurrentItem(null)
    setAction('ADD')
  }

  const handleFinishAddCourse = () => {
    setIsAddingCourse(false)
    fetchData().then()
  }

  const handleCloseAddCourse = () => {
    setIsAddingCourse(false)
  }

  return (
    <>
      <CustomHeader />
      <Container
        maxWidth={false}
        component={Box}
        marginTop='-6rem'
        classes={{ root: classes.containerRoot }}
      >
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title={header(handleOpenAddCourse)}
            titleTypographyProps={{
              component: Box,
              marginBottom: '0!important',
              variant: 'h3',
            }}
          >
          </CardHeader>
          <TableContainer>
            <Box
              component={Table}
              alignItems='center'
              marginBottom='0!important'
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Course
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Score
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Rating
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderCourses(currentSurveyList)}
              </TableBody>
            </Box>
          </TableContainer>
          <Box
            classes={{ root: classes.cardActionsRoot }}
            component={CardActions}
            justifyContent='flex-end'
          >
            <Pagination count={Math.floor((surveyList.length - 1) / pageSize) + 1} color='primary' variant='outlined'
                        page={page} onChange={handleChangePage} />
          </Box>
        </Card>
        <Box
          component={Card}
          marginTop='3rem'
          classes={{ root: classes.cardRoot + ' ' + classes.cardRootDark }}
        >
        </Box>
      </Container>
      {isAddingCourse &&
      <EditCourse handleCloseAddCourse={handleCloseAddCourse} handleFinishAddCourse={handleFinishAddCourse}
                  action={action} item={currentItem} />}
    </>
  )
}

export default Tables

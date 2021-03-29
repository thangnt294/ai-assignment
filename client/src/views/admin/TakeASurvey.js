// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// import Hidden from "@material-ui/core/Hidden";
import Tooltip from "@material-ui/core/Tooltip";

// core components
import Header from "components/Headers/CustomHeader.js";

import componentStyles from "assets/theme/views/admin/icons.js";
import Survey from "./Survey";
import { useEffect, useState } from 'react'
import { getSurveys } from '../../actions/survey'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SelectUser from './SelectUser'
const useStyles = makeStyles(componentStyles);

const survey = (setIsSelectingUser, setSurveyId, setSurveyName, classes, theme, id, name) => {
  return (
    <Grid
      item
      lg={3}
      md={6}
      xs={12}
      component={Box}
      paddingLeft="15px"
      paddingRight="15px"
      key={id}
    >
      <Tooltip title={name} placement="top">
        <Box
          component="button"
          fontFamily="inherit"
          fontSize="16px"
          fontWeight="400"
          lineHeight="1.25"
          display="inline-block"
          width="100%"
          margin=".5rem 0"
          padding="24px"
          textAlign="left"
          style={{border: "2px solid #11cdef", backgroundColor: "#d8e0ea"}}
          border="0"
          onClick={() => {
            setSurveyId(id)
            setSurveyName(name)
            setIsSelectingUser(true);
          }}
          borderRadius="4px"
          className={classes.button}
          data-clipboard-text="album-2"
          type="button"
        >
          <div>
            <i className="ni ni-tv-2" style={{color: "black"}}/>
            <span style={{color: "black"}}>{name}</span>
          </div>
        </Box>
      </Tooltip>
    </Grid>
  );
};

const getCourseList = (setIsTakingSurvey, setSurveyId, setSurveyName, classes, theme, courseList) =>
  courseList?.map((course) =>
    survey(setIsTakingSurvey, setSurveyId, setSurveyName, classes, theme, course._id, course.courseName)
  );

const TakeASurvey = () => {
  const [isTakingSurvey, setIsTakingSurvey] = useState(false)
  const [isSelectingUser, setIsSelectingUser] = useState(false)
  const [surveyList, setSurveyList] = useState([])
  const [userId, setUserId] = useState(null)
  const [userType, setUserType] = useState(null)
  const classes = useStyles();
  const theme = useTheme();
  const [surveyId, setSurveyId] = useState(null)
  const [surveyName, setSurveyName] = useState(null)

  useEffect(() => {
    fetchData().then()
  }, [])

  const handleClose = () => {
    setIsTakingSurvey(false)
    setIsSelectingUser(false)
    setSurveyName(null)
  }

  const handleSelectUser = (id, type) => {
    setUserId(id)
    setUserType(type)
    setIsTakingSurvey(true)
    setIsSelectingUser(false)
  }

  const handleCloseSelectUser = () => {
    setIsSelectingUser(false)
    setSurveyName(null)
  }

  const toastOption = {
    autoClose: 3000,
  }

  const fetchData = async () => {
    try {
      const {data} = await getSurveys('user')
      if (data.code === 200) {
        setSurveyList(data.data)
      }
      if (data.code === 400) {
        toast.error("Something went wrong. Please reload the page.", toastOption)
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong. Please reload the page.", toastOption)
    }

  }
  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container component={Box} marginBottom="39px">
          <Grid item xs={12}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                title={surveyName != null && isTakingSurvey ? surveyName : "Take A Survey"}
                titleTypographyProps={{
                  component: Box,
                  marginBottom: "0!important",
                  variant: "h3",
                }}
              />
              <CardContent>
                <Grid container>
                  {isTakingSurvey ? <Survey userId={userId} userType={userType} surveyId={surveyId} handleClose={handleClose} /> : getCourseList(setIsSelectingUser, setSurveyId, setSurveyName, classes, theme, surveyList)}
                  {isSelectingUser && <SelectUser surveyId={surveyId} handleCloseSelectUser={handleCloseSelectUser} handleSelectUser={handleSelectUser} handleClose={handleClose}/>}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TakeASurvey;

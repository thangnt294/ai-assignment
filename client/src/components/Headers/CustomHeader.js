import React, { useEffect, useState } from 'react'
// @material-ui/core components
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
// @material-ui/icons components
import EmojiEvents from '@material-ui/icons/EmojiEvents'
import GroupAdd from '@material-ui/icons/GroupAdd'
import InsertChartOutlined from '@material-ui/icons/InsertChartOutlined'
import PieChart from '@material-ui/icons/PieChart'

// core components
import CardStats from 'components/Cards/CardStats.js'

import componentStyles from 'assets/theme/components/header.js'
import { getStatistics } from '../../actions/survey'
import 'react-toastify/dist/ReactToastify.css'

const useStyles = makeStyles(componentStyles)

const Header = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [statistics, setStatistics] = useState({})

  useEffect(() => {
    fetchData().then()
  }, [])

  const fetchData = async () => {
    const { data } = await getStatistics()
    if (data.code === 200) {
      setStatistics(data.data)
    }
    if (data.code === 400) {
      console.log(data.message)
    }
  }

  return (
    <div>
      <div className={classes.header}>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <div>
            <Grid container>
              <Grid item xl={3} lg={6} xs={12}>
                <CardStats
                  subtitle='Users'
                  title={statistics?.userCount?.toString() || '0'}
                  icon={InsertChartOutlined}
                  color='bgError'
                  footer={
                    <>
                      <Box
                        component='span'
                        fontSize='.875rem'
                        color={theme.palette.success.main}
                        marginRight='.5rem'
                        display='flex'
                        alignItems='center'
                      >
                        <Box
                          width='1.5rem!important'
                          height='1.5rem!important'
                        />{' '}
                      </Box>
                      <Box component='span' whiteSpace='nowrap'>
                      </Box>
                    </>
                  }
                />
              </Grid>
              <Grid item xl={3} lg={6} xs={12}>
                <CardStats
                  subtitle='Courses'
                  title={statistics?.courseCount?.toString() || '0'}
                  icon={PieChart}
                  color='bgWarning'
                  footer={
                    <>
                      <Box
                        component='span'
                        fontSize='.875rem'
                        color={theme.palette.error.main}
                        marginRight='.5rem'
                        display='flex'
                        alignItems='center'
                      >
                        <Box
                          width='1.5rem!important'
                          height='1.5rem!important'
                        />{' '}
                      </Box>
                      <Box component='span' whiteSpace='nowrap'>
                      </Box>
                    </>
                  }
                />
              </Grid>
              <Grid item xl={3} lg={6} xs={12}>
                <CardStats
                  subtitle='Open Surveys'
                  title={statistics?.openSurveyCount?.toString() || '0'}
                  icon={GroupAdd}
                  color='bgWarningLight'
                  footer={
                    <>
                      <Box
                        component='span'
                        fontSize='.875rem'
                        color={theme.palette.warning.main}
                        marginRight='.5rem'
                        display='flex'
                        alignItems='center'
                      >
                        <Box
                          width='1.5rem!important'
                          height='1.5rem!important'
                        />{' '}
                      </Box>
                      <Box component='span' whiteSpace='nowrap'>
                      </Box>
                    </>
                  }
                />
              </Grid>
              <Grid item xl={3} lg={6} xs={12}>
                <CardStats
                  subtitle='Closed Surveys'
                  title={statistics?.closedSurveyCount?.toString() || '0'}
                  icon={EmojiEvents}
                  color='bgInfo'
                  footer={
                    <>
                      <Box
                        component='span'
                        fontSize='.875rem'
                        color={theme.palette.success.main}
                        marginRight='.5rem'
                        display='flex'
                        alignItems='center'
                      >
                        <Box
                          width='1.5rem!important'
                          height='1.5rem!important'
                        />{' '}
                      </Box>
                      <Box component='span' whiteSpace='nowrap'>
                      </Box>
                    </>
                  }
                />
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Header

import React, {useState} from "react";
// @material-ui/core components
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";

// core components
import componentStyles from "assets/theme/views/auth/login.js";
import {Link, useHistory} from "react-router-dom";
import {login} from "../../actions/account.js";
import setAuthToken from "./setAuthToken";

const useStyles = makeStyles(componentStyles);

function Login() {
    const classes = useStyles();
    const theme = useTheme();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const res = await login(email, password)
            if (res.data.code === 200) {
                setAuthToken(res.data.data)
                localStorage.setItem('jwtToken', res.data.data)
                localStorage.setItem('userType', res.data.userType)
                res.data.userType === 0 ? history.push('/admin/course-management') : history.push('/user/take-a-survey')
            }
            if (res.data.code === 400) {
                alert(res.data.message)
            }
        } catch (err) {
            alert('ERROR')
        }
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <>
            <Grid item xs={12} lg={5} md={7}>
                <Card classes={{root: classes.cardRoot}}>
                    <CardHeader
                        className={classes.cardHeader}
                        title={
                            <Box
                                fontSize="120%"
                                fontWeight="400"
                                component="small"
                                color={theme.palette.gray[600]}
                            >
                                Log In
                            </Box>
                        }
                        titleTypographyProps={{
                            component: Box,
                            textAlign: "center",
                            marginBottom: "1rem!important",
                            marginTop: "1rem!important",
                            fontSize: "1rem!important",
                        }}
                    />
                    <CardContent classes={{root: classes.cardContent}}>
                        <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                        >
                            <FilledInput
                                autoComplete="off"
                                type="email"
                                placeholder="Email"
                                onChange={handleChangeEmail}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Email/>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl
                            variant="filled"
                            component={Box}
                            width="100%"
                            marginBottom="1rem!important"
                        >
                            <FilledInput
                                autoComplete="off"
                                type="password"
                                placeholder="Password"
                                onChange={handleChangePassword}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Lock/>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControlLabel
                            value="end"
                            control={<Checkbox color="primary"/>}
                            label="Remember me"
                            labelPlacement="end"
                            classes={{
                                root: classes.formControlLabelRoot,
                                label: classes.formControlLabelLabel,
                            }}
                        />
                        <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                            <Button color="primary" variant="contained" onClick={handleLogin}>
                                Log in
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
                <Grid container component={Box} marginTop="1rem">
                    <Grid item xs={6} component={Box} textAlign="left">
                        <a
                            href="#admui"
                            onClick={(e) => e.preventDefault()}
                            className={classes.footerLinks}
                        >
                            Forgot password
                        </a>
                    </Grid>
                    <Grid item xs={6} component={Box} textAlign="right">
                        <Link
                            to="/auth/register"
                            className={classes.footerLinks}
                        >
                            Create new account
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Login;

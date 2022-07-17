/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from 'react';
import * as React from 'react';

// react-router-dom components
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

// @mui material components
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { TransitionProps } from '@mui/material/transitions';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Basic() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [dialogMessage, setDialogMessage] = React.useState('');
  const navigate = useNavigate();

  const logout = () => {
    console.log(localStorage.getItem('token'));
    localStorage.setItem('token', '');
    navigate('/feed');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignIn = (event) => {
    console.log(userName);
    console.log(password);

    axios({
      url: '/api/v1/users/login',
      method: 'POST',
      data: {
        name: userName,
        password: password,
      },
    })
      .then((res) => {
        console.log('success');
        setDialogTitle('success');
        setDialogMessage('');
        setOpen(true);
        localStorage.setItem('token', res.data.result.token);
        console.log(res.data.result.token);
      })
      .catch((error) => {
        setDialogTitle(error.response.data.resultCode);
        setDialogMessage(error.response.data.resultMessage);
        setOpen(true);
        console.log(error);
      });
  };

  if (localStorage.getItem('token') == '') {
    return (
      <DashboardLayout>
        <MDBox mt={30} mb={3}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} lg={8}>
              <Card>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  mx={2}
                  mt={-3}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                    Sign in
                  </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox component="form" role="form">
                    <MDBox mb={2}>
                      <MDInput
                        type="userName"
                        label="User Name"
                        onChange={(v) => setUserName(v.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="password"
                        label="Password"
                        onChange={(v) => setPassword(v.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={4} mb={1}>
                      <MDButton onClick={handleSignIn} variant="gradient" color="info" fullWidth>
                        sign in
                      </MDButton>
                    </MDBox>
                    <MDBox mt={3} mb={1} textAlign="center">
                      <MDTypography variant="button" color="text">
                        Don&apos;t have an account?{' '}
                        <MDTypography
                          component={Link}
                          to="/authentication/sign-up"
                          variant="button"
                          color="info"
                          fontWeight="medium"
                          textGradient
                        >
                          Sign Up
                        </MDTypography>
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </MDBox>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{dialogTitle}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      {dialogMessage}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                  </DialogActions>
                </Dialog>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    );
  } else {
    return (
      <DashboardLayout>
        <MDBox mt={30} mb={3}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} lg={8}>
              <Card>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  mx={2}
                  mt={-3}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                    Already login
                  </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox component="form" role="form">
                    <MDBox mt={4} mb={1}>
                      <MDButton onClick={logout} variant="gradient" color="info" fullWidth>
                        logout
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{dialogTitle}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      {dialogMessage}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                  </DialogActions>
                </Dialog>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    );
  }
}

export default Basic;

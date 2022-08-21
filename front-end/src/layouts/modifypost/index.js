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

import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import axios from 'axios';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModifyPost() {
  const { state } = useLocation();
  console.log(state);
  const [title, setTitle] = useState(state.title);
  const [body, setBody] = useState(state.body);
  const [id, setId] = useState(state.id);
  const [open, setOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [dialogMessage, setDialogMessage] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModifyPost = (event) => {
    console.log(localStorage.getItem('token'));
    console.log('title : ' + title);
    console.log('body : ' + body);
    console.log('id : ' + id);

    axios({
      url: '/api/v1/posts/' + id,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: {
        title: title,
        body: body,
      },
    })
      .then((res) => {
        setDialogTitle('success');
        setOpen(true);
        console.log('success');
      })
      .catch((error) => {
        setDialogTitle(error.response.data.resultCode);
        setDialogMessage(error.response.data.resultMessage);
        setOpen(true);

        console.log(error);
      });
  };

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  label="Title"
                  defaultValue={title}
                  onChange={(v) => setTitle(v.target.value)}
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  label="Body"
                  defaultValue={body}
                  multiline
                  rows={20}
                  onChange={(v) => setBody(v.target.value)}
                  fullWidth
                />
              </MDBox>
              <MDBox mt={4} mb={1} right>
                <MDButton onClick={handleModifyPost} variant="gradient" color="info">
                  Update
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
      </MDBox>
    </DashboardLayout>
  );
}

export default ModifyPost;

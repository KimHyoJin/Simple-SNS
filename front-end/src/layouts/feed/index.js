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
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import MDPagination from 'components/MDPagination';

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

// Data
import axios from 'axios';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Feed() {
  const [page, setPage] = useState(0);
  const [render, setRender] = useState(false);
  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [open, setOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [dialogMessage, setDialogMessage] = React.useState('');
  const navigate = useNavigate();

  const handleDetail = (post) => {
    console.log('handleDetail');
    console.log(post);
    navigate('/post-detail', { state: post });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changePage = (pageNum) => {
    console.log('change pages');
    console.log(pageNum);
    console.log(page);
    setPage(pageNum);
    handleGetPosts(pageNum);
  };

  const handleGetPosts = (pageNum, event) => {
    console.log('handleGetPosts');
    axios({
      url: '/api/v1/posts?size=5&sort=id&page=' + pageNum,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        console.log('success');
        console.log(res);
        setPosts(res.data.result.content);
        setTotalPage(res.data.result.totalPages);
      })
      .catch((error) => {
        console.log(error);
        navigate('/authentication/sign-in');
      });
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <DashboardLayout>
      <MDBox pt={3} pb={3}>
        {posts.map((post) => (
          <MDBox pt={2} pb={2} px={3}>
            <Card>
              <MDBox pt={2} pb={2} px={3}>
                <Grid container>
                  <Grid item xs={6}>
                    <MDTypography fontWeight="bold" variant="body2">
                      {post.title}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6}>
                    <MDTypography variant="body2" textAlign="right">
                      {post.user.userName}
                    </MDTypography>
                  </Grid>
                </Grid>
                <MDTypography variant="body2">{post.body}</MDTypography>
                <Grid container>
                  <Grid item xs={11}></Grid>
                  <Grid item xs={1}>
                    <Button onClick={() => handleDetail(post)}>Detail</Button>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </MDBox>
        ))}

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
      </MDBox>

      <MDPagination>
        <MDPagination item>
          <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
        </MDPagination>
        {[...Array(totalPage).keys()].map((i) => (
          <MDPagination item onClick={() => changePage(i)}>
            {i + 1}
          </MDPagination>
        ))}
        <MDPagination item>
          <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
        </MDPagination>
      </MDPagination>
    </DashboardLayout>
  );
}

export default Feed;

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
import { Link, useNavigate, useLocation } from 'react-router-dom';

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

import axios from 'axios';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PostDetail() {
  const { state } = useLocation();
  console.log(state);
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState(state.title);
  const [writer, setWriter] = useState(state.user.userName);
  const [body, setBody] = useState(state.body);
  const [id, setId] = useState(state.id);

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [comment, setComment] = useState();

  const handleLikePost = (event) => {
    console.log(localStorage.getItem('token'));
    axios({
      url: '/api/v1/posts/' + id + '/likes',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        console.log('success');
        handleLikeCounts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLikeCounts = (event) => {
    console.log(localStorage.getItem('token'));
    axios({
      url: '/api/v1/posts/' + id + '/likes',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        console.log('success');
        setLikes(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changePage = (pageNum) => {
    console.log('change pages');
    console.log(pageNum);
    console.log(page);
    setPage(pageNum);
    handleGetComments(pageNum);
  };

  const handleGetComments = (pageNum, event) => {
    console.log('handleGetComments');
    axios({
      url: '/api/v1/posts/' + id + '/comments?size=5&sort=id&page=' + pageNum,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        console.log('success');
        console.log(res);
        setComments(res.data.result.content);
        setTotalPage(res.data.result.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleWriteComment = (pageNum, event) => {
    console.log('handleWriteComment');
    axios({
      url: '/api/v1/posts/' + id + '/comments',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: {
        comment: comment,
      },
    })
      .then((res) => {
        console.log('success');
        handleGetComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetComments();
    handleLikeCounts();
  }, '');

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox pt={4} pb={3} px={3}>
            <Grid container>
              <Grid item xs={6}>
                <MDTypography fontWeight="bold" variant="body2">
                  {title}
                </MDTypography>
              </Grid>
              <Grid item xs={6}>
                <MDTypography variant="body2" textAlign="right">
                  {writer}
                </MDTypography>
              </Grid>
            </Grid>
            <MDTypography variant="body2">{body}</MDTypography>
            <MDTypography variant="body2">{likes} LIKES</MDTypography>
          </MDBox>
        </Card>
      </MDBox>

      <MDButton onClick={handleLikePost} variant="gradient" color="info">
        LIKE
      </MDButton>



          {comments.map((comment) => (
            <MDBox pt={2} pb={2}>
              <Card>
                <MDBox pt={2} pb={2} px={3}>
                  <Grid container>
                    <Grid item xs={6}>
                      <MDTypography fontWeight="bold" variant="body2">
                        {comment.comment}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={6}>
                      <MDTypography variant="body2" textAlign="right">
                        {comment.userName}
                      </MDTypography>
                    </Grid>
                  </Grid>
                  <MDTypography variant="body2">{comment.body}</MDTypography>
                </MDBox>
              </Card>
            </MDBox>
          ))}
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


      <MDBox pt={3} pb={3}>
        <Card>
          <MDBox component="form" role="form">
            <MDBox pt={2} pb={2} px={3}>
              <MDInput label="comment" onChange={(v) => setComment(v.target.value)} fullWidth />
            </MDBox>
            <MDBox pt={2} pb={2} px={3} right>
              <MDButton onClick={handleWriteComment} variant="gradient" color="info">
                Comment
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default PostDetail;

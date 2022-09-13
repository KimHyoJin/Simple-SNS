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

function Alarm() {
  const [page, setPage] = useState(0);
  const [render, setRender] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [alarmEvent, setAlarmEvent] = useState(undefined);

  const navigate = useNavigate();
  let eventSource = undefined;

  const changePage = (pageNum) => {
    console.log('change pages');
    console.log(pageNum);
    console.log(page);
    setPage(pageNum);
    handleGetAlarm(pageNum);
  };

  const handleGetAlarm = (pageNum, event) => {
    console.log('handleGetAlarm');
    axios({
      url: '/api/v1/users/alarm?size=5&sort=id,desc&page=' + pageNum,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        console.log('success');
        console.log(res);
        setAlarms(res.data.result.content);
        setTotalPage(res.data.result.totalPages);
      })
      .catch((error) => {
        console.log(error);
        navigate('/authentication/sign-in');
      });
  };

  useEffect(() => {
    handleGetAlarm();

    eventSource = new EventSource("http://localhost:8080/api/v1/users/alarm/subscribe?token=" + localStorage.getItem('token'));

    setAlarmEvent(eventSource);

    eventSource.addEventListener("open", function (event) {
      console.log("connection opened");
    });

    eventSource.addEventListener("alarm", function (event) {
       console.log(event.data);
       handleGetAlarm();
    });

    eventSource.addEventListener("error", function (event) {
      console.log(event.target.readyState);
      if (event.target.readyState === EventSource.CLOSED) {
        console.log("eventsource closed (" + event.target.readyState + ")");
      }
      eventSource.close();
    });

  }, []);

  return (
    <DashboardLayout>
      <MDBox pt={3} pb={3}>
        {alarms.map((alarm) => (
          <MDBox pt={2} pb={2} px={3}>
            <Card>
              <MDBox pt={2} pb={2} px={3}>
                <Grid container>
                  <Grid item xs={12}>
                    <MDTypography fontWeight="bold" variant="body2">
                      {alarm.text}
                    </MDTypography>
                  </Grid>
                  </Grid>
              </MDBox>
            </Card>
          </MDBox>
        ))}
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

export default Alarm;

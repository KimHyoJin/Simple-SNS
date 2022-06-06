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

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart';
import ReportsLineChart from 'examples/Charts/LineCharts/ReportsLineChart';
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard';
import DataTable from 'examples/Tables/DataTable';

// Data
import reportsBarChartData from 'layouts/feed/data/reportsBarChartData';
import reportsLineChartData from 'layouts/feed/data/reportsLineChartData';
import authorsTableData from 'layouts/post/data/authorsTableData';
import projectsTableData from 'layouts/post/data/projectsTableData';

// Dashboard components
import Projects from 'layouts/feed/components/Projects';
import OrdersOverview from 'layouts/feed/components/OrdersOverview';

function Feed() {
  const { sales, tasks } = reportsLineChartData;
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        Feed
      </MDBox>
    </DashboardLayout>
  );
}

export default Feed;

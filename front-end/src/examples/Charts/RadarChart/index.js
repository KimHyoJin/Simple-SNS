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

import { useMemo } from 'react';

// porp-types is a library for typechecking of props
import PropTypes from 'prop-types';

// react-chartjs-2 components
import { Radar } from 'react-chartjs-2';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// RadarChart configurations
import configs from 'examples/Charts/RadarChart/configs';

// Material Dashboard 2 React base styles
import colors from 'assets/theme/base/colors';

// Material Dashboard 2 React helper functions
import rgba from 'assets/theme/functions/rgba';

function RadarChart({ icon, title, description, chart }) {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: colors[dataset.color]
          ? rgba(colors[dataset.color || 'dark'].main, 0.2)
          : rgba(colors.dark.main, 0.2),
      }))
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);

  const renderChart = (
    <MDBox py={2} pr={2} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <MDBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
          {icon.component && (
            <MDBox
              width="4rem"
              height="4rem"
              bgColor={icon.color || 'info'}
              variant="gradient"
              coloredShadow={icon.color || 'info'}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={2}
            >
              <Icon fontSize="medium">{icon.component}</Icon>
            </MDBox>
          )}
          <MDBox mt={icon.component ? -2 : 0}>
            {title && <MDTypography variant="h6">{title}</MDTypography>}
            <MDBox mb={2}>
              <MDTypography component="div" variant="button" color="text">
                {description}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      ) : null}
      {useMemo(
        () => (
          <MDBox p={6}>
            <Radar data={data} options={options} />
          </MDBox>
        ),
        [chart],
      )}
    </MDBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of RadarChart
RadarChart.defaultProps = {
  icon: { color: 'info', component: '' },
  title: '',
  description: '',
};

// Typechecking props for the RadarChart
RadarChart.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
      'light',
      'dark',
    ]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default RadarChart;

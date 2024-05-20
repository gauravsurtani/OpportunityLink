import React from 'react';
import Plot from 'react-plotly.js';

const TimeSeriesChart = ({ data, companyName }) => {
  if (!data || !companyName) {
    return <p>No data or company name provided.</p>;
  }

  // Assuming data is already the array of [date, value] pairs for the given companyName
  const dates = data[0].map(entry => new Date(entry[0])); // Parsing the dates
  const values = data[0].map(entry => entry[1]); // Extracting the values


  const trace = {
    type: 'scatter', // Or 'line', depending on how you want the chart to look
    mode: 'lines+markers', // This shows both lines and markers on the plot
    x: dates, // The dates
    y: values, // The values
    marker: {
      color: 'blue'
    }
  };

  const layout = {
    title: `${companyName} Company Size`,
    xaxis: {
      title: 'Date',
      type: 'date' // Specify that x-axis should treat data as date
    },
    yaxis: {
      title: 'Count'
    },
    showlegend: false
  };

  return (
    <Plot
      data={[trace]}
      layout={layout}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%', minWidth:'800px' }}
    />
  );
};

export default TimeSeriesChart;

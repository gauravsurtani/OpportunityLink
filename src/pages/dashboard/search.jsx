import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { CompanyCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

import { Input, Button } from "@material-tailwind/react";
import { func } from "prop-types";
import Plot from 'react-plotly.js';
import TimeSeriesChart from "@/widgets/charts/time-series-chart";


export function Search() {

  const [companyName, setCompanyName] = React.useState("");
  const [job, setJob] = useState(null);
  const onCompanyNameChange = ({ target }) => { setCompanyName(target.value); };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = 'http://localhost:3001'

  const [companyData, setCompanyData] = useState([]);


  const zooxDetails = {
    name: "Zoox",
    id: "c8c92ea1-07fd-4ae0-8142-9ab65d9a98a3",
    logo: "https://storage.googleapis.com/simplify-imgs/companies/c8c92ea1-07fd-4ae0-8142-9ab65d9a98a3/logo.png",
    description: "Zoox is reinventing personal transportation—making the future safer, cleaner, and more enjoyable for everyone. The company is building the infrastructure for self-driving cars.",
    short_description: "Self driving car robotics company",
    url: "https://zoox.com/",
    twitter: "https://twitter.com/zoox",
    crunchbase: "https://www.crunchbase.com/organization/zoox",
    linkedin: "https://linkedin.com/company/zoox-inc",
    year_founded: 2014,
    company_size: 6,
    funding_stage: "M_AND_A",
    funding_total: 2290000000
  };

  function onCompanyNameClick(event) {
    console.log(companyName)
  }

  const fetchHighWageJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = "get-company-data-simplify";  // Endpoint to which the request will be sent
      // Encode the company name to safely include it in a URL
      const query = `name=${encodeURIComponent(companyName)}`;

      // Construct the full URL with the query parameter
      const url = `${API_URL}/${endpoint}?${query}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setJob(data);
    } catch (e) {
      setError(`Failed to fetch: ${e.message}`);
      setJob(null);
    } finally {
      setIsLoading(false);
      getCompanyInsights()
    }
  };

  const getCompanyInsights = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = "api/get-company-insights";  // Endpoint to which the request will be sent
      // Encode the company name to safely include it in a URL
      const query = `companyName=${encodeURIComponent(companyName)}`;

      // Construct the full URL with the query parameter
      const url = `${API_URL}/${endpoint}?${query}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCompanyData(data);
    } catch (e) {
      setError(`Failed to fetch: ${e.message}`);
      setJob(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-8 gap-x-6 md:grid-cols-1 grid-rows-2 relative m-auto">
        <h1 className="m-auto block font-sans text-5xl antialiased font-semibold leading-tight tracking-normal text-inherit">
          Company Look-up tool
        </h1>
        <div className="relative flex w-full max-w-[24rem] m-auto">
          <Input
            type="text"
            label="Company Name"
            value={companyName}
            onChange={onCompanyNameChange}
            className="pr-20"
            containerProps={{
              className: "min-w-0 bg-white",
            }}
          />
          <Button
            size="sm"
            color={companyName ? "gray" : "blue-gray"}
            disabled={!companyName}
            className="!absolute right-1 top-1 rounded"
            onClick={fetchHighWageJobs}
          >
            Search
          </Button>
        </div>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-8 gap-x-6">
        { job != null ? <CompanyCard company={job} /> : <></> }
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* <Plot
          data={[
            // {
            //   x: [1, 2, 3],
            //   y: [2, 6, 3],
            //   type: 'scatter',
            //   mode: 'lines+markers',
            //   marker: {color: 'red'},
            // },
            { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{ width: 800, height: 600, title: 'A Fancy Plot' }}
        /> */}
        <div className="w-auto">
          {companyData != [] ? <TimeSeriesChart data={companyData[companyName]} companyName={companyName} />
            : <p>Loading...</p>}
        </div>

      </div>
    </div>
  );
}

export default Search;

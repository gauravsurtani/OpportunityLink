import React, { useState } from "react";
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
 

export function Search() {

  const [companyName, setCompanyName] = React.useState("");
  const [job, setJob] = useState(null);
  const onCompanyNameChange = ({ target }) => {setCompanyName(target.value);};
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = 'http://localhost:3001'

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
  
  function onCompanyNameClick(event){
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
        <CompanyCard company={zooxDetails} />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                <strong>30 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["companies", "members", "budget", "completion"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                  }`}
                              />
                            </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                      }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Search;

import React from 'react';
import { Card, CardHeader, CardBody, Typography, Menu, MenuHandler, MenuList, MenuItem, IconButton, Avatar } from '@material-tailwind/react';
import { EllipsisVerticalIcon, CheckCircleIcon } from '@heroicons/react/24/solid'; // Make sure to install heroicons or replace with equivalent icons

export function CompanyCard({ company }) {
    return (
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center flex-start p-6 "
            >
                <Avatar className="mr-4"  src={company.logo} alt={`${company.name} Logo`} size="lg" />
                <div>
                    <Typography variant="h6" color="blue-gray" className="mb-1">
                        {company.name}
                    </Typography>
                    <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600">
                        {/* <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" /> */}
                        Founded in {company.year_founded}
                    </Typography>
                </div>
                <div className='ml-auto'>
                    <Menu placement="left-start">
                        <MenuHandler>
                            <IconButton size="sm" variant="text" color="blue-gray">
                                <EllipsisVerticalIcon strokeWidth={3} fill="currentColor" className="h-6 w-6" />
                            </IconButton>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem>Action</MenuItem>
                            <MenuItem>Another Action</MenuItem>
                            <MenuItem>Something else here</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <div className="w-full min-w-[640px]">
                    <div className="flex items-center gap-4 py-3 px-5">
                        
                        <Typography variant="small" color="blue-gray" className="font-bold">
                            {company.short_description}
                        </Typography>
                    </div>
                    <Typography variant="small" className="py-3 px-5 text-xs font-medium text-blue-gray-600">
                        {company.description}
                    </Typography>
                </div>
            </CardBody>
        </Card>
    );
}

export default CompanyCard;

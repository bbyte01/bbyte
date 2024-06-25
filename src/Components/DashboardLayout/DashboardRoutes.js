import React from 'react'
import { Route, Router, Routes, useParams } from 'react-router-dom'
import Homepage from '../Homepage/Dashboard/DashboardContent/Homepage/Homepage';
import Totaluser from '../Totaluser/Totaluser';
import Usertable from '../Homepage/Usertable/Usertable';
import Totaluservideo from '../Uservideo/Totaluservideo';
import Totalvideo from '../Totalvideo/Totalvideo';
import { Box } from '@mui/material';
import Report from '../Report/Report';

function DashboardRoutes() {
    const params = useParams()
    const { page_type } = params;
    return (
        <Box
            sx={{
                p : '20px',
                height : `calc(100vh - ${80}px)`,
                overflowY : 'auto',
                backgroundColor : '#E7EBFF'
            }}
        >
            <Routes>
                <Route path='dashboard' element={<Homepage />} />
                <Route path='totaluser' element={<Totaluser />} />
                <Route path='usertable' element={<Usertable />} />
                <Route path='uservideo' element={<Totaluservideo />}>
                    <Route path=':userId' element={<></>} />
                </Route>
                    <Route path ='report' element={<Report/>} />
                <Route path='totalvideo' element={<Totalvideo />} />
            </Routes>
        </Box>
    )
}

export default DashboardRoutes

import React from 'react'
import { Route, Router, Routes, useParams } from 'react-router-dom'
import Homepage from '../Homepage/Dashboard/DashboardContent/Homepage/Homepage';
import Totaluser from '../Totaluser/Totaluser';
import Usertable from '../Homepage/Usertable/Usertable';
import Totaluservideo from '../Uservideo/Totaluservideo';
import Totalvideo from '../Totalvideo/Totalvideo';
import { Box } from '@mui/material';

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
                <Route path='totalvideo' element={<Totalvideo />} />
            </Routes>
            {/* {(() => {
                switch(page_type) {
                    case 'dashboard' :
                        return <Homepage />
                    case 'totaluser' :
                        return <Totaluser />
                    case 'usertable' : 
                        return <Usertable />
                    case 'uservideo' :
                        return <Totaluservideo />
                    case 'totalvideo' :
                        return <Totalvideo />
                      
                    default :
                        return <Homepage />

                }
            })()} */}
        </Box>
    )
}

export default DashboardRoutes

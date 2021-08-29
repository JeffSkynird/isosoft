import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import {ENTRYPOINT} from '../../config/API'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import TabPanel from './components/TabPanel'
import Crm from './Sgi'
import Payment from './Payment'
export default function Logs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <div style={{paddingTop:15,paddingLeft:15,paddingRight:15}}>
          
            <Grid container justify='space-between' alignItems="center" style={{marginBottom:'10px'}}>
                <Box>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" onClick={()=>props.history.push("dashboard")}>
                    Dashboard
                    </Link>
                    <Typography color="textPrimary">Logs</Typography>
                </Breadcrumbs>
                </Box>
              
            </Grid>
     
            <Grid container>
                <Grid item xs="12">
                <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
                  <Tab label="Pagos" />
        <Tab label="SGI" />

      </Tabs>
    </Paper>
    <TabPanel value={value} index={1}>
    <Crm/>
      </TabPanel>
      <TabPanel value={value} index={0}>
      <Payment/>
      </TabPanel>
   
                </Grid>
            </Grid>
        </div>
        
    )
}

import { useState, React, forwardRef } from "react";
import Typography from '@mui/material/Typography';
import Footer from './Components/footer.js';
import "./App.css";
import TopBar from './Components/topbar.js';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Button from '@mui/material/Button';
import { useRestaurants } from "./APIs/useRestaurants.js";
import { useDirections } from "./APIs/useDirections.js";
import { useMenu } from "./APIs/useMenu.js";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// Global Helper Functions and consts.
function createData(name, calories, fat, carbs, protein, fiber) {
  return { name, calories, fat, carbs, protein, fiber };
}

var google_key = process.env.REACT_APP_googleAPIKey;

var placeholder_map = `https://www.google.com/maps/embed/v1/view?zoom=9&center=-27.4705%2C153.0260&key=${google_key}`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#28559A',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function FoodieAPI() {
  const [region, setRegion] = useState('');
  const [location, setLocation] = useState('');
  const [regionsend, setRegionSend] = useState('');
  const [locationsend, setLocationSend] = useState('');
  const [start, setStart] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const rows = [];
  const [popup, setPopup] = useState(true);
  const [openalert, setOpenalert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { restaurantsloading, restaurantsData, restaurantsError } = useRestaurants(regionsend, start);
  var map;
  const { directionsloading, directiondata, directionsError } = useDirections(locationsend, restaurantsData, start);
  if (directiondata.length > 0) {
    map = `https://www.google.com/maps/embed/v1/directions?origin=${restaurantsData?.data[selectedIndex]?.geo?.latitude},${restaurantsData?.data[selectedIndex]?.geo?.longitude}&destination=${locationsend}&key=${google_key}`;
  }
  const { menuloading, menudata, menuerror } = useMenu(restaurantsData, start, directiondata, selectedIndex);

  if (menudata.length > 0) {
    for (var i = 0; i < menudata.length; i++) {
      rows.push(createData(menudata[i].food.label, menudata[i].food.nutrients.ENERC_KCAL, menudata[i].food.nutrients.FAT, menudata[i].food.nutrients.CHOCDF,
        menudata[i].food.nutrients.PROCNT, menudata[i].food.nutrients.FIBTG))
    }
  }

  if (restaurantsData === "Unknown City" && popup) {
    setOpenalert(true);
    setPopup(false);
    window.location.reload(false);
  }

  const handleCloseerror = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  // Testing Data
  // console.log("restdata", restaurantsData);
  // console.log("direction data", directiondata);
  // console.log("menudata", menudata);
  // console.log("menuloading", menuloading);

  const handleChangeText = (event) => {
    setRegion(event.target.value);
  };

  const handleChangeTextLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  function renderRow(props) {
    const { index, style } = props;
    return (
      <ListItem style={style} key={index} component="div" disablePadding >
        <ListItemButton selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index)}>
          {
            restaurantsData?.data?.length && directiondata?.length === 10 ? <ListItemText primary={`${restaurantsData.data[index].name} - ${directiondata[index].distance} - ${directiondata[index].duration}`} /> : null
          }
        </ListItemButton>
      </ListItem>
    )
  }

  return (
    <div className='Page'>
      <TopBar />
      <div className='body'>

        <Typography variant="h1" sx={{ marginTop: 10 }}>
          Foodie API Mashup
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 10 }}>
          {restaurantsError}  {directionsError} {menuerror}
        </Typography>

        <div className='center'>
          <Paper elevation={3} sx={{ height: 500 }}>

            <TextField id="outlined-basic" label="Search City" variant="outlined" onChange={handleChangeText} sx={{ marginRight: 60, marginTop: 15, width: 400, }} />
            <TextField id="outlined-basic" label="My Location" variant="outlined" onChange={handleChangeTextLocation} sx={{ marginRight: 60, marginTop: 5, width: 400, }} />
            <Typography variant="h3" sx={{ marginRight: 70, marginTop: -30, }}>
              Find Restraunts
            </Typography>


            <Box
              sx={{ width: '100%', height: 400, maxWidth: 450, bgcolor: '#28559A', color: 'white', marginLeft: 60, marginTop: -5, }}>
              {restaurantsloading && directionsloading ? (<></>) : (<FixedSizeList
                height={400}
                width={450}
                itemSize={46}
                itemCount={restaurantsData?.data?.length}
                overscanCount={5}
                component="nav">
                {renderRow}
              </FixedSizeList>)}
            </Box>

            <Button variant="contained" sx={{ bgcolor: '#28559A', marginRight: 60, marginTop: -35, width: 100, }}
              onClick={async () => {
                setRegionSend(region)
                setLocationSend(location);
                setStart(true);
              }}>
              Find
            </Button>
            <div className="Progressbar">
              {(!start || !directionsloading) ? (<></>) : (<CircularProgress />)}

            </div>
          </Paper>

        </div>

        <div className="Map" >
          {selectedIndex === -1 ? (<iframe width="700" height="500" loading="lazy" title='map'
            src={placeholder_map}></iframe>
          ) : (<iframe width="700" height="500" loading="lazy" title='map'
            src={map}></iframe>)}

          {menudata.length > 0 && !menuloading ? (<Button variant="contained" sx={{ bgcolor: '#28559A', width: 170, top: 20, }}
            onClick={handleClickOpen}>
            Menu
          </Button>) : (<Button variant="contained" disabled sx={{ bgcolor: '#28559A', width: 170, top: 20, }}
            onClick={handleClickOpen}>
            Menu
          </Button>)}


          <Dialog open={open} onClose={handleClose} maxWidth="800">
            {selectedIndex === -1 ? (<DialogTitle>No Name</DialogTitle>) : (<DialogTitle>{restaurantsData?.data[selectedIndex].name}</DialogTitle>)}
            <DialogContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 850 }} aria-label="table">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#28559A' }} >
                      <StyledTableCell color="#00ff00">Items</StyledTableCell>
                      <StyledTableCell align="right">Calories</StyledTableCell>
                      <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                      <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                      <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                      <StyledTableCell align="right">Fiber&nbsp;(g)</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        <TableCell align="right">{row.fiber}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Back</Button>
            </DialogActions>
          </Dialog>
        </div>

        <Snackbar open={openalert} autoHideDuration={6000} onClose={handleCloseerror}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Error: {restaurantsData}
          </Alert>
        </Snackbar>

      </div>
      <Footer />
    </div >
  );
}



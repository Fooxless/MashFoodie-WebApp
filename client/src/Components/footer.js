import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./footer.css";
import { useCounter } from "../APIs/useCounter.js";

export default function StickyFooter() {

    const [loaded, setLoaded] = React.useState(true);
    // eslint-disable-next-line no-unused-vars
    const { counterloading, counterdata, countererror } = useCounter(loaded);

    // if (counterdata.counter) {
    //     setLoaded(false);
    // }
    return (
        <Box

            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '20vh',

            }}
        >
            <CssBaseline />

            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <div className="foot">
                        <Typography variant="h6">
                            CAB432 Cloud Computing
                        </Typography>
                        <Typography variant="body1">
                            Connor Gryphon -  n10776800
                        </Typography>
                        <Typography variant="h7">
                            <b>Page Counter: {counterdata.counter}</b>
                        </Typography>
                    </div>

                </Container>
            </Box>
        </Box>
    );
}
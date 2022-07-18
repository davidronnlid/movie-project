import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import DRConfTransparent from "../images/drConfTransparent.png"
import TMDB from "../images/tmdb.png"


export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <Box className="footer">
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    background: "var(--third-color)", height: "100%",
                    boxShadow: "0px -4px 3px rgba(50, 50, 50, 0.75)"
                }}
            >
                <Tooltip title="This product uses the TMDB API but is not endorsed or certified by TMDB.">
                    <BottomNavigationAction
                        sx={{ color: "var(--text-color)" }}
                        label="This product uses the TMDB API but is not endorsed or certified by TMDB." icon={
                            <img alt="TMDB logo" src={TMDB} className="footerIcon" />
                        } />
                </Tooltip>
                <Tooltip title="Go to Davids portfolio">
                    <Link href="https://davidronnlidportfolio.netlify.app/"><BottomNavigationAction icon={
                        <img alt="he" src={DRConfTransparent} className="footerIcon" />
                    } /></Link>
                </Tooltip>

            </BottomNavigation>
        </Box >
    );
}

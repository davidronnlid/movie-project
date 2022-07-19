import { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import DRConfTransparent from "../images/drConfTransparent.png"
import TMDB from "../images/tmdb.png"


export default function SimpleBottomNavigation() {
    const [value, setValue] = useState('TMDB Credits');

    const handleChange = (event: SyntheticEvent, newValue: "TMDB Credits" | "Davids portfolio") => {
        setValue(newValue);
    };

    // "value" state of bottom navigation state currently does nothing in this app, but is kept for clarity as it is expected by default in MUI BottomNavigation components

    return (
        <Box className="footer">
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    handleChange(event, newValue);
                }}
                sx={{
                    background: "var(--third-color)", height: "100%",
                }}>
                <BottomNavigationAction
                    sx={{ color: "var(--text-color)", cursor: "default" }}
                    value="TMDB Credits"
                    label="This product uses the TMDB API but is not endorsed or certified by TMDB." icon={
                        <img alt="TMDB logo" src={TMDB} className="footerIcon" />
                    } />

                <Tooltip title="Go to Davids portfolio">
                    <Link href="https://davidronnlidportfolio.netlify.app/">
                        <BottomNavigationAction value="Davids portfolio" icon={
                            <img alt="David Rönnlid smiling confidently" src={DRConfTransparent} className="footerIcon dRSC" />
                        } /></Link>
                </Tooltip>

            </BottomNavigation >
        </Box >
    );
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Link } from 'react-router-dom';

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function HideAppBar(props: Props) {
    return (
        <>
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar sx={{ background: "var(--third-color)" }}>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Typography variant="h2" component="div" sx={{ color: "var(--text-color)", fontFamily: "'Kanit', sans-serif", py: 2 }}>
                                DRMovies
                            </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />

        </>
    );
}

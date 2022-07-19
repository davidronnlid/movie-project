import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import useScrollTrigger from '@mui/material/useScrollTrigger';

interface ScrollTopProps {
    children: React.ReactElement;
}

function ScrollTop(props: ScrollTopProps) {
    const { children } = props;
    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };
    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 10000 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

export default function BackToTop(props: ScrollTopProps) {
    return (
        <ScrollTop {...props}>
            <Fab size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
            </Fab>
        </ScrollTop>)
}

import { AppBar, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import InboxIcon from "@mui/icons-material/Inbox"
import MenuIcon from "@mui/icons-material/Menu"

import { useState } from "react"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {NavLink} from "react-router-dom";

const Navbar = ({navLinks}) => {

    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(true)
    }
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar>
                <Toolbar>

                    <IconButton
                        color="inherit"
                        size="large"
                        onClick={() => setOpen(true)}
                        edge="start"
                    >

                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Menú</Typography>
                    {
                        navLinks.map(item => (
                            <Button color="inherit" variant="h6" key={item.title} component={NavLink} to={item.path}>{item.title}</Button>
                        ))
                    }
                </Toolbar>
            </AppBar>



            <Drawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}>

                <Box sx={{
                    width: 250
                }}>
                    <nav>
                        <List>
                            {
                                navLinks.map(item => (
                                    <ListItem disablePadding key={item.title}>
                                        <ListItemButton component={NavLink} to={item.path}>
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.title} />
                                        </ListItemButton>
                                    </ListItem>

                                ))
                            }
                        </List>
                    </nav>
                </Box>
            </Drawer>
        </ThemeProvider>
    )
}

export default Navbar
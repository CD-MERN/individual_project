import styled from "@emotion/styled"
import { Button, Container, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Navbar from "./Navbar"
import image from "../assets/fondo2.jpg"
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const Portada = () => {

    const Img = styled("img")({
        width: "80vw",
        height: "100vh",
        objectFit: "cover",
        objectPosition: "center"
    })

    const navLinks = [{
        title: "Login", path: "/login", icon: <LoginIcon />
    },
    {
        title: "Register", path: "/register", icon: <AppRegistrationIcon />
    }
    ]

    return (
        <>
            <Navbar navLinks={navLinks} />
            <Container sx={{
                height: "100vh", backgroundImage: `url(${image})`,
                backgroundSize: "contain", backgroundRepeat: "revert", bgcolor: "black", backgroundPosition: "center"
            }}
                maxWidth="false"
            >

            </Container>

        </>
    )
}

export default Portada
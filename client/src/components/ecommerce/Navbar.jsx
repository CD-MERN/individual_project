import Icons from './Icons'
import logo from '../../images/logo.png';
import logoname from '../../images/logoname.png';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const NavBar = ({ renderIcons = true }) => {

    return (
        // <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <Navbar bg='light' expand='lg' className="border-bottom">
            <Container className="px-4 px-lg-5">
                <a href='/ecommerce'>
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        alt="Logo"
                        className='me-3'
                    />
                    <img
                        src={logoname}
                        height="25"
                        alt="Logo"
                        id='logoname'
                    />
                </a>
                {renderIcons && <Icons />}
            </Container>
        </Navbar>
    )
}

export default NavBar

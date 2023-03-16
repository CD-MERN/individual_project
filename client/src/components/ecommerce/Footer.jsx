import logo from '../../images/logo.png';
import logoname from '../../images/logoname.png';

const Footer = () => {

    return (
        <footer className="py-5 bg-dark mt-auto">
            <div className="container">
                <div className="text-center">
                    <img
                        src={logo}
                        width="80"
                        height="80"
                        alt="Logo"
                        className='mb-2'
                    />
                </div>
                <div className="text-center">
                    <img
                        src={logoname}
                        // height="40"
                        alt="Logo"
                        className='mb-2 w-50'
                    />
                </div>
                <p className="m-0 text-center text-white">Copyleft &copy; Awesome Ecommerce 2023</p>
            </div>
        </footer>
    )
}

export default Footer

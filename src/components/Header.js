import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import LogoHome from "../image/logo.png"
import Font from "../image/font.png"
import Cart from "../image/cart.png"
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

function Header() {
    const NavBar=()=>{
        return(

            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
                <Image src={Font}  style={{width: '100%', height: '150px',  position:'absolute',zIndex:-101}}/>
                <Nav.Item >
                    <Nav.Link href="/home"><Image src={LogoHome}  style={{  height: '150px'}} roundedCircle /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" style={{  marginLeft: '150px',color:'black'}}>Оплата</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" style={{  marginLeft: '150px',color:'black'}}>Доставка</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" style={{  marginLeft: '150px',color:'black'}}>Гарантия и сервис</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" style={{  marginLeft: '150px',color:'black'}}>Личный кабинет</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <DropdownButton id="dropdown-basic-button" title="⠀☰⠀⠀КАТАЛОГ ТОВАРОВ⠀⠀⠀" style={{  marginTop:'80px', position:"absolute",marginLeft:'-1050px'}}>
                        <Dropdown.Item href="#/action-1">evdf⠀⠀⠀⠀⠀⠀⠀</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </Nav.Item>
            <Nav.Item>
                <Form className="d-flex" style={{  marginTop:'80px', position:"absolute",width:'550px',marginLeft:'-690px'}}>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"

                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Nav.Item>
                <Nav.Item >
                    <Nav.Link href="/home"><Image src={Cart}  style={{  height: '50px', marginLeft:'-50px',marginTop:'60px'}}  /></Nav.Link>
                </Nav.Item>
            </Nav>

        )
    }
    return (

       <NavBar/>
    );
}

export default Header;

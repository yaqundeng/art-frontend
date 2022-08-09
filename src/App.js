import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import Login from './components/Login';
// import Logout from './components/Logout';
import PublicPhotos from './components/PublicPhotos';
import PersonalPhotos from './components/PersonalPhotos';
import WebDes from './components/WebDes';
import './App.css';

function App() {
  
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   let loginData = JSON.parse(localStorage.getItem("login"));
  //   if (loginData) {
  //     let loginExp = loginData.exp;
  //     let now = Date.now()/1000;
  //     if (now < loginExp) {
  //       // Not expired
  //       setUser(loginData);
  //     } else {
  //       // Expired
  //       localStorage.setItem("login", null);
  //     }
  //   }
  // }, []);

  return (
    <div className="App">
      <Navbar bg="dark" expand="lg" stick="top" variant="dark" >
        <Container className="container-fluid">
        <Navbar.Brand className="brand" href="/">
          <img src="/logo.png" alt="frontpage logo" className="moviesLogo"/>
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="ml-auto">
            <Nav.Link as={Link} to={"/home"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/photos"}>
              Photos
            </Nav.Link>
            {user ? (
              <Nav.Link as={Link} to={"/mypage"}>
                My Page
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to={"/photos"}> </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        {/* { user ? (
          <Logout setUser={setUser} />
        ) : (
          <Login setUser={setUser} />
        )} */}
        </Container>
      </Navbar>

      <Routes>
        <Route exact path={"/"} element={
          <WebDes />
        }/>

        <Route exact path={"/home"} element={
          <WebDes />
        }/>

        <Route exact path={"/photos"} element={
          <PublicPhotos user={ user } />
        }/>

        <Route path={"/mypage"} element={
          user ? 
          <PersonalPhotos
            user = {user}
          />
          :
          <WebDes />
        }/>
      </Routes>
    </div>
  );
}

export default App;

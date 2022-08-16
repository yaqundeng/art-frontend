import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './components/Login';
import Logout from './components/Logout';
import PublicPhotos from './components/PublicPhotos';
import PersonalPhotos from './components/PersonalPhotos';
import WebDes from './components/WebDes';
import './App.css';
import EditPhoto from './components/EditPhoto';
import Review from './components/Review';
import UploadImages from './components/UploadPhoto';

function App() {
  
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const [user, setUser] = useState(null);

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
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
        { user ? (
          <Logout setUser={setUser} />
        ) : (
          <Login setUser={setUser} />
        )}
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

        <Route path={"/photos/:id"} element={
          <EditPhoto
          user = {user}
          />
        }/>

        <Route path={"/photos/:id/review"} element={
          <Review
          user = {user}
          />
        }/>

        <Route path={"/photos/:id/upload"} element={
          <UploadImages
          user = {user}
          />
        }/>

      </Routes>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;

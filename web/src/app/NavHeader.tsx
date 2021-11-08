import { logout, selectIsLoggedIn } from "auth/slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavHeader() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const onLogout = () => dispatch(logout());

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">Vampire Diary</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            {isLoggedIn ? (
              <Nav.Link as={Link} to="/vampires">
                Vampires
              </Nav.Link>
            ) : null}
          </Nav>
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/settings">
                  Account
                </Nav.Link>
                <Nav.Link href="#" onClick={onLogout}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>{" "}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

import { logout, selectIsLoggedIn } from "auth/slice";
import { useAppDispatch, useAppSelector } from "hooks";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavHeader() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const onLogout = () => dispatch(logout());

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Vampire Diary</Navbar.Brand>
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
              <NavDropdown title="Account">
                <NavDropdown.Item as={Link} to="/settings">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
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

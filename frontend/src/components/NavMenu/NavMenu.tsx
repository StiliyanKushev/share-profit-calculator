import { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, Icon, Menu } from "semantic-ui-react";
import { AuthContext } from "../../contexts/Auth/provider";

const NavMenu: React.FC = () => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const isLoggedIn = authState.isLoggedIn;

  const handleLogoutClicked = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    authDispatch({
      type: "auth_logout",
    });
  };

  return (
    <Menu fixed="top" borderless size="large">
      <Container>
        <Menu.Item as={Link} to="/" header>
          Share Profit Calculator
        </Menu.Item>
        <Menu.Menu position="right">
          {isLoggedIn ? (
            <Menu.Item as={Link} onClick={handleLogoutClicked}>
              <Icon name="sign out" size="large" />
              Logout
            </Menu.Item>
          ) : (
            <Dropdown item text="Account">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/login">
                  Login
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/register">
                  Register
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default NavMenu;

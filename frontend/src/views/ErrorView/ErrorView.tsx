import { Container, Header } from "semantic-ui-react";

const styles = {
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
};

const headerStyles = {
  fontSize: "6rem",
};

const ErrorView = () => (
  <div className="view-container" style={styles}>
    <Container style={{ marginTop: "-5rem" }} textAlign="center">
      <Header size="huge">
        <span style={headerStyles}>404</span> Not Found
      </Header>
      <Header size="medium">The page you are looking for doesn't exist.</Header>
    </Container>
  </div>
);

export default ErrorView;

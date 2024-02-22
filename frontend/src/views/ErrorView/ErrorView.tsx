import { Container, Header, Icon } from "semantic-ui-react";

const ErrorView = () => {
  return (
    <Container
      textAlign="center"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header as="h1" icon>
        <Icon name="warning circle" size="massive" />
        404
        <Header.Subheader>Page Not Found</Header.Subheader>
      </Header>
      <Header as="h2">The page you are looking for doesn't exist.</Header>
    </Container>
  );
};

export default ErrorView;

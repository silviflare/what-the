import { Container } from "@mui/material";
import { Balancer } from "react-wrap-balancer";

function ContactPage() {
  return (
    <div className="container-all terms-conditions">
      <Container maxWidth="md">
        <Balancer ratio={0.6}>
          <h1>Contact</h1>
        </Balancer>
      </Container>
    </div>
  );
}

export default ContactPage;

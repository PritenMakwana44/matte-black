import React from "react";
import styles from "../../styles/ContactConfirmation.module.css";
import appStyles from "../../App.module.css";
import { useRedirect } from "../../hooks/useRedirect";

import {
  Col,
  Row,
  Container,
} from "react-bootstrap";


const Confirmation = () => {
  useRedirect("loggedOut");
  return (    
    <Row className={styles.Row}>
      
      <Col>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Thank you for your message</h1>
          <p className="text-center">We will be in touch soon!</p>
        </Container>
      </Col>
    </Row>
  );
};

export default Confirmation;
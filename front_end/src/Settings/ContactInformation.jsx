import { Button, Col, Row } from "react-bootstrap";
import { Github, Linkedin, Whatsapp } from "react-bootstrap-icons";


export default function ContactInformation() {

  return (
            <div
              style={{
                textAlign: "center",
                marginTop: "10%",
              }}
            >
              <Row>
                <Col>
                  <Button
                    variant="link"
                    style={{ width: "fit-content" }}
                    onClick={() =>
                      window.open("https://www.linkedin.com/in/yosefgeller")
                    }
                  >
                    <Linkedin strokeWidth={3} width={24} height={24} />
                  </Button>
                  <p>Linkedin</p>
                </Col>
                <Col>
                  <Button
                    variant="link"
                    style={{ width: "fit-content" }}
                    onClick={() =>
                      window.open("https://wa.me/message/4BAFYQ42O6OVH1")
                    }
                  >
                    <Whatsapp
                      strokeWidth={3}
                      width={24}
                      height={24}
                      color="#25D366"
                    />
                  </Button>
                  <p>Whatsapp </p>
                </Col>
                <Col>
                  <Button
                    variant="link"
                    style={{ width: "fit-content" }}
                    onClick={() => window.open("https://github.com/yosg050")}
                  >
                    <Github
                      strokeWidth={3}
                      width={24}
                      height={24}
                      color="block"
                    />
                  </Button>
                  <p>Github </p>
                </Col>
              </Row>
            </div>
          
  );
}





import BootstrapAccordion from "react-bootstrap/Accordion";
import "./Accordion.css";

export const Accordion = ({ name, email, role, id, handler }) => {
  return (
    <BootstrapAccordion>
      <BootstrapAccordion.Item eventKey="0">
        <BootstrapAccordion.Header className="bg-dark">
          {name}
        </BootstrapAccordion.Header>
        <BootstrapAccordion.Body>{email}</BootstrapAccordion.Body>
        <BootstrapAccordion.Body className="bg-light">
          {role}{" "}
          <div
            className="apiCallButton"
            id={id}
            key={id}
            onClick={(e) => {
              handler(e);
            }}
          ></div>
        </BootstrapAccordion.Body>
      </BootstrapAccordion.Item>
    </BootstrapAccordion>
  );
};

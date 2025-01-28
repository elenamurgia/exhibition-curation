import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ArtworkFilter = ({ onFilterChange }) => {
  const [selectedMuseum, setSelectedMuseum] = useState("");

  const handleMuseumChange = (e) => {
    setSelectedMuseum(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Filter by Museum</Form.Label>
        <Form.Control
          as="select"
          value={selectedMuseum}
          onChange={handleMuseumChange}
        >
          <option value="">All Museums</option>
          <option value="Harvard Art Museums">Harvard Art Museums</option>
          <option value="Rijksmuseum">Rijksmuseum</option>
          <option value="Art Institute of Chicago">Art Institute of Chicago</option>
          <option value="MET Museum">MET Museum</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default ArtworkFilter;

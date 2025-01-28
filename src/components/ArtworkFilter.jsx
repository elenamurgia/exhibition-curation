import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ArtworkFilter = ({ onFilterChange, onDateFilterChange }) => {
  const [selectedMuseum, setSelectedMuseum] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleMuseumChange = (e) => {
    setSelectedMuseum(e.target.value);
    onFilterChange(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    onDateFilterChange(e.target.value, endDate); 
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    onDateFilterChange(startDate, e.target.value); 
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
      <Form.Group className="mt-3">
        <Form.Label>Filter by Date Range</Form.Label>
        <div className="d-flex">
          <Form.Control
            type="number"
            placeholder="Start Year"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <span className="mx-2">to</span>
          <Form.Control
            type="number"
            placeholder="End Year"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </Form.Group>
    </Form>
  );
};

export default ArtworkFilter;

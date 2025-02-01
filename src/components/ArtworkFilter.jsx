import React from "react";
import { Form } from "react-bootstrap";

const ArtworkFilter = ({ onFilterChange, onDateFilterChange, selectedMuseum, startDate, endDate }) => {
    const handleMuseumChange = (e) => {
        onFilterChange(e.target.value);
    };

    const handleStartDateChange = (e) => {
        onDateFilterChange(e.target.value, endDate);
    };

    const handleEndDateChange = (e) => {
        onDateFilterChange(startDate, e.target.value);
    };

    return (
        <Form style={{ 
            backgroundColor: "#FFFFFF", 
            padding: "1.5rem", 
            borderRadius: "10px", 
            color: "#0D0C0A",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
        }}>
            <Form.Group>
                <Form.Label style={{ color: "#0D0C0A", fontWeight: "bold" }}>Filter by Museum</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedMuseum}
                    onChange={handleMuseumChange}
                    style={{
                        color: "#0D0C0A", 
                        backgroundColor: "#FFFFFF", 
                        border: "1px solid #0D0C0A",
                        fontWeight: "bold",
                    }}
                >
                    <option value="">All Museums</option>
                    <option value="Harvard Art Museums">Harvard Art Museums</option>
                    <option value="Rijksmuseum">Rijksmuseum</option>
                    <option value="Art Institute of Chicago">Art Institute of Chicago</option>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label style={{ color: "#0D0C0A", fontWeight: "bold" }}>Filter by Date Range</Form.Label>
                <div className="d-flex">
                    <Form.Control
                        type="number"
                        placeholder="Start Year"
                        value={startDate}
                        onChange={handleStartDateChange}
                        style={{
                            color: "#0D0C0A", 
                            backgroundColor: "#FFFFFF", 
                            border: "1px solid #0D0C0A",
                            fontWeight: "bold",
                        }}
                        className="custom-placeholder" 
                    />
                    <span className="mx-2" style={{ color: "#0D0C0A", fontWeight: "bold" }}>to</span>
                    <Form.Control
                        type="number"
                        placeholder="End Year"
                        value={endDate}
                        onChange={handleEndDateChange}
                        style={{
                            color: "#0D0C0A", 
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #0D0C0A",
                            fontWeight: "bold",
                        }}
                        className="custom-placeholder" 
                    />
                </div>
            </Form.Group>
        </Form>
    );
};

export default ArtworkFilter;
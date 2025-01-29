import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button, Row, Col, Collapse, Alert, Dropdown } from 'react-bootstrap';
import { getUnifiedArtworks } from '../utils/api';
import ArtworkCard from './ArtworkCard';
import ArtworkFilter from './ArtworkFilter';
import { FaFilter, FaSort } from "react-icons/fa";

const ArtworksList = () => {
    const [artworks, setArtworks] = useState([]);
    const [filteredArtworks, setFilteredArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedMuseum, setSelectedMuseum] = useState(""); 
    const [startDate, setStartDate] = useState(""); 
    const [endDate, setEndDate] = useState(""); 
    const [filterVisible, setFilterVisible] = useState(false);
    const [sortBy, setSortBy] = useState("title"); // Default sorting by title
    const [sortOrder, setSortOrder] = useState("asc"); // Default order is ascending

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            setError(false);
            try {
                console.log('Fetching artworks...');
                const data = await getUnifiedArtworks(page, 20, selectedMuseum, startDate, endDate, sortBy, sortOrder);
                console.log('Fetched artworks:', data);
                setArtworks(data);
                setFilteredArtworks(data);
            } catch (error) {
                console.error('Failed to fetch artworks', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchArtworks();
    }, [page, selectedMuseum, startDate, endDate, sortBy, sortOrder]);

    const handleMuseumFilter = (selectedMuseum) => {
        setSelectedMuseum(selectedMuseum); 
        setPage(1); 
    };

    const handleDateFilter = (startDate, endDate) => {
        setStartDate(startDate); 
        setEndDate(endDate); 
        setPage(1); 
    };

    const resetFilters = () => {
        setSelectedMuseum("");
        setStartDate("");
        setEndDate("");
        setPage(1);
        setFilteredArtworks(artworks);
    };

    const handleSortChange = (option, order) => {
        setSortBy(option);
        setSortOrder(order);
    };

    useEffect(() => {
        if (sortBy !== "none") {
            const sortedData = [...artworks].sort((a, b) => {
                if (!a[sortBy] || !b[sortBy]) return 0;
                if (sortBy === 'date') return (parseInt(a.date) || 0) - (parseInt(b.date) || 0);
                return a[sortBy].localeCompare(b[sortBy]);
            });
            if (sortOrder === "desc") sortedData.reverse();
            setFilteredArtworks(sortedData);
        } else {
            setFilteredArtworks(artworks);
        }
    }, [artworks, sortBy, sortOrder]);

    return (
        <Container>
            <h2 className="mb-4">Artworks</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Dropdown className="me-2">
                    <Dropdown.Toggle variant="outline-secondary">
                        {sortBy !== "none" ? `Sort by: ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}` : "Sort by"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSortChange("none", "asc")}>No Sorting</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("title", "asc")}>Title (A-Z)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("title", "desc")}>Title (Z-A)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("artist", "asc")}>Artist (A-Z)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("artist", "desc")}>Artist (Z-A)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("date", "asc")}>Date (0-2025)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("date", "desc")}>Date (2025-0)</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button variant="outline-secondary" onClick={() => setFilterVisible(!filterVisible)}>
                    <FaFilter /> {filterVisible ? "Hide Filters" : "Show Filters"}
                </Button>
            </div>
            <Collapse in={filterVisible}>
                <div>
                    <ArtworkFilter 
                        onFilterChange={handleMuseumFilter}
                        onDateFilterChange={handleDateFilter}
                        selectedMuseum={selectedMuseum}
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <Button variant="outline-secondary" onClick={resetFilters}>Reset Filters</Button>
                </div>
            </Collapse>
            {error ? (
                <Alert variant="danger" className="mt-3">
                    There was a problem fetching artworks {selectedMuseum && `for ${selectedMuseum}`}. Please try again later or select another museum.
                </Alert>
            ) : loading ? (
                <Spinner animation="border" />
            ) : filteredArtworks.length > 0 ? (
                <>
                <Row className="artwork-grid">
                    {filteredArtworks.map((artwork) => (
                        <Col md={4} sm={6} xs={12} key={artwork.id}>
                            <ArtworkCard {...artwork} />
                        </Col>
                    ))}
                </Row>
                <div className="d-flex justify-content-between mt-3">
                    {page > 1 && (
                        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} variant="secondary">
                            Previous
                        </Button>
                    )}
                    {filteredArtworks.length > 0 && (
                        <Button onClick={() => setPage((prev) => prev + 1)} variant="secondary" className="ms-auto">
                            Next
                        </Button>
                    )}
                </div>
                </>
            ) : (
                <p>No artworks found matching your criteria. Please try again later</p>
            )}
        </Container>
    );
};

export default ArtworksList;

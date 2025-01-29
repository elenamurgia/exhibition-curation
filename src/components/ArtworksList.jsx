import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button, Row, Col, Collapse, Alert } from 'react-bootstrap';
import { getUnifiedArtworks } from '../utils/api';
import ArtworkCard from './ArtworkCard';
import ArtworkFilter from './ArtworkFilter';
import { FaFilter } from "react-icons/fa";

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

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            setError(false);
            try {
                console.log('Fetching artworks...');
                const data = await getUnifiedArtworks(page, 20, selectedMuseum, startDate, endDate); // Fixed size of 20
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
    }, [page, selectedMuseum, startDate, endDate]);

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

    return (
        <Container>
            <h2 className="mb-4">Artworks</h2>
            <div className="d-flex justify-content-end align-items-center mb-3">
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
                <p>No artworks found matching your criteria. Please reset the filters and try again later</p>
            )}
        </Container>
    );
};

export default ArtworksList;
import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button, Row, Col, Collapse, Dropdown } from 'react-bootstrap';
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
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc"); 

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            setError(false);
            try {
                const data = await getUnifiedArtworks(page, 20, selectedMuseum, startDate, endDate, sortBy, sortOrder);
                if (data.length === 0) {
                    setError("No artworks found matching your criteria. Please adjust your filters and try again.");
                } else {
                    setArtworks(data);
                    applyFilters(data); 
                }
            } catch (error) {
                console.error("Failed to fetch artworks", error);
                setError("Error fetching artworks. Please check your internet connection and try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchArtworks();
    }, [page, selectedMuseum, startDate, endDate, sortBy, sortOrder]);

    const applyFilters = (data) => {
        let filtered = data;

        if (selectedMuseum) {
            filtered = filtered.filter(artwork => artwork.source === selectedMuseum);
        }

        if (startDate && endDate) {
            filtered = filtered.filter(artwork => {
                const artworkDate = parseInt(artwork.date);
                return artworkDate >= parseInt(startDate) && artworkDate <= parseInt(endDate);
            });
        }

        setFilteredArtworks(filtered);
    };

    const handleMuseumFilter = (museum) => {
        setSelectedMuseum(museum); 
        setPage(1); 
    };

    const handleDateFilter = (start, end) => {
        setStartDate(start); 
        setEndDate(end); 
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
            let sortedData = [...artworks];

            sortedData.sort((a, b) => {
                const valA = a[sortBy] || "";
                const valB = b[sortBy] || "";

                if (sortBy === "date") {
                    const dateA = parseInt(valA) || 0;
                    const dateB = parseInt(valB) || 0;

                    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
                }

                return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
            });

            setFilteredArtworks(sortedData);
        }
    }, [sortBy, sortOrder, artworks]); 

    return (
        <Container fluid style={{ width: "100%", padding: "0", margin: "0" }}>
            <h2 className="mb-4" style={{ fontWeight: "bold", fontSize: "3rem",  color: "#0D0C0A", paddingTop: "1rem"}}>Artworks</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Dropdown className="me-2">
                    <Dropdown.Toggle style={{ 
                        backgroundColor: "#0D0C0A",  
                        fontWeight: "bold", 
                        fontSize: "1rem", 
                        border: "none" 
                    }}>
                        <FaSort /> {sortBy !== "none" ? `Sort by: ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}` : "Sort by"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSortChange("none", "asc")}>No Sorting</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("title", "asc")}>Title (A-Z)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("title", "desc")}>Title (Z-A)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("artist", "asc")}>Artist (A-Z)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("artist", "desc")}>Artist (Z-A)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("date", "asc")}>Date (Asc)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("date", "desc")}>Date (Desc)</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button 
                    variant="outline-secondary" 
                    onClick={() => setFilterVisible(!filterVisible)}
                    style={{
                        backgroundColor: "#0D0C0A",
                        color: "#FFFFFF",  
                        fontWeight: "bold", 
                        fontSize: "1rem", 
                        border: "none"
                    }}
                >
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
                    <Button 
                        variant="outline-secondary" 
                        className="d-flex justify-content-end mt-3"
                        onClick={resetFilters} 
                        style={{
                            backgroundColor: "#0D0C0A", 
                            color: "#FFFFFF", 
                            marginBottom: "0.5rem", 
                            marginLeft: "auto", 
                            fontWeight: "bold", 
                            fontSize: "1rem", 
                        }}
                    >
                        Reset Filters
                    </Button>
                </div>
            </Collapse>
            {error ? (
                <p className="text-center mt-3">{error}</p>
            ) : loading ? (
                    <Spinner animation="border" style={{ width: '4rem', height: '4rem', color: "#0D0C0A" }} />
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
                        <Button 
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
                            variant="secondary"
                            style={{backgroundColor: "#0D0C0A", color: "#FFFFFF"}}
                        >
                            Previous
                        </Button>
                    )}
                    {filteredArtworks.length > 0 && (
                        <Button 
                        onClick={() => setPage((prev) => prev + 1)} 
                        variant="secondary" 
                        className="ms-auto"
                        style={{backgroundColor: "#0D0C0A", color: "#FFFFFF"}}
                        >
                            Next
                        </Button>
                    )}
                </div>
                </>
            ) : (
                <p className="text-center mt-4">No artworks found matching your criteria. Please try again later</p>
            )}
        </Container>
    );
};

export default ArtworksList;

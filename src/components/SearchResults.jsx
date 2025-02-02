import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { searchArtworks } from "../utils/api";
import ArtworkCard from "./ArtworkCard"; 

function SearchResults() {
  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const artworks = await searchArtworks(searchTerm);
        if (!artworks || artworks.length === 0) {
          setError(`No results found for "${searchTerm}". Please try a different keyword.`);
        } else {
          setResults(artworks);
        }
      } catch (err) {
        setError("Failed to load artworks. Please check your internet connection or try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  if (!searchTerm) {
    return (
      <Container className="text-center mt-5">
        <p>Please use the search bar above to look for artworks.</p>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" style={{ width: '4rem', height: '4rem', color: "#0D0C0A" }} />
        <p className="loading-text" style={{fontSize: "1.5rem", color: "#0D0C0A"}}>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container fluid style={{ width: "100%", padding: "0", margin: "0" }}>
      <h5 className="text-center">Artworks found for "{searchTerm}"</h5>
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      <Row>
        {results.length > 0 ? (
          results.map((artwork) => (
            <Col key={artwork.id} md={4} className="mb-4">
              <ArtworkCard
                id={artwork.id}
                title={artwork.title}
                image={artwork.image}
                artist={artwork.artist}
                date={artwork.date}
                source={artwork.source}
              />
            </Col>
          ))
        ) : (
          <div>
          <p>Search results for "{searchTerm}".</p>
          <Button variant="dark" onClick={() => window.location.reload()}>Retry</Button>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default SearchResults;

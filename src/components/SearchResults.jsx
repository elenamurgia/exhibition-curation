import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
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
      try {
        const artworks = await searchArtworks(searchTerm);
        setResults(artworks);
        setIsLoading(false);
      } catch (err) {
        setError("Something went wrong, please try again.");
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
        <Spinner animation="border" />
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
    <Container className="mt-4">
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
          <p>No artworks found for "{searchTerm}".</p>
        )}
      </Row>
    </Container>
  );
}

export default SearchResults;

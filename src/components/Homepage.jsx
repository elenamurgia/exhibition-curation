import { useState, useEffect } from "react";
import { getHarvardExhibitions } from "../utils/api";
import { Row, Container, Col, Spinner } from "react-bootstrap";

function Homepage() {
    const [exhibitions, setExhibitions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getHarvardExhibitions()
            .then((data) => {
                if (data.length === 0) {
                    setError("No exhibition found")
                } else {
                    setExhibitions(data);
                }
                setIsLoading(false);
            })
            .catch(() => {
                setError("Something went wrong, please try again");
                setIsLoading(false);
      });
    }, []);

    if (isLoading) {
    return (
      <>
        <Spinner animation="border" variant="secondary" size="sm" />
      </>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
        <Container style={{ paddingTop: "0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 style={{ color: "#012E40", fontWeight: "bold", margin: 0 }}>Exhibitions</h2>
            </div>

            <Row>
                {exhibitions.map((exhibition) => (
                    <Col key={exhibition.id} xs={12} s={6} md={4} lg={3} xl={2} className="mb-4">
                        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
                            {exhibition.primaryimageurl ? (
                                <img
                                    src={exhibition.primaryimageurl}
                                    alt={exhibition.title || "Exhibition Image"}
                                    style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "150px",
                                        backgroundColor: "#e0e0e0",
                                        borderRadius: "8px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <span style={{ color: "#757575" }}>No Image Available</span>
                                </div>
                            )}
                            <h5>{exhibition.title || "Untitled"}</h5>
                            <p>{exhibition.description || "No description available"}</p>
                            <p>
                                <strong>Dates:</strong>{" "}
                                {exhibition.begindate ? `${exhibition.begindate} - ${exhibition.enddate}` : "N/A"}
                            </p>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Homepage;

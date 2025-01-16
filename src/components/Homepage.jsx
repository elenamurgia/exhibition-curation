import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, } from "react-bootstrap";

function Homepage() {
    const sections = [
        { name: 'Artworks', path: '/artworks', description: 'Explore our collection of stunning artworks.'},
        { name: 'Artists', path: '/artists', description: 'Discover famous artists and their stories.' },
        { name: 'Museums', path: '/museums', description: 'Find museums and their exhibitions.' },
        { name: 'Art Books', path: '/art-books', description: 'Browse through a curated collection of art books.' },
        { name: 'My Gallery', path: '/my-gallery', description: 'Create and manage your virtual gallery.' },
    ];
    
  return (
    <div>
        <h1 className='text-center mb-4'>Welcome to Art Gallery</h1>
        <Row>
            {sections.map((section) => (
                <Col key={section.name} xs={12} sm={6} lg={4} className='mb-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>{section.name}</Card.Title>
                            <Card.Text>{section.description}</Card.Text>
                            <Link to={section.path} className="btn btn-primary">
                                Explore
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </div>
    );
}

export default Homepage;

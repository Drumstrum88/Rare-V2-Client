import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function CategoryCard({ categoryObj }) {
  return (
    <Card className="catCard">
      <Card.Body>
        <Card.Title>{categoryObj.label}</Card.Title>
      </Card.Body>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
};

export default CategoryCard;

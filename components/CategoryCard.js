import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function CategoryCard({ categoryObj }) {
  return (
    <Card className="catCard">
      <Card.Body>
        <div id="catBody">
          <Card.Title className="catTitle">{categoryObj.label}</Card.Title>
        </div>
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

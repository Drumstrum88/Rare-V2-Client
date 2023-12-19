import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import getCategories from '../../utils/data/categoryData';
import CategoryCard from '../../components/CategoryCard';

function CategoryPage() {
  const [categories, setCategories] = useState([]);

  const showCategories = () => {
    getCategories().then((data) => setCategories(data));
  };

  useEffect(() => {
    showCategories();
  }, []);

  return (
    <Container>
      <h1>Categories</h1>
      <Row>
        {categories.map((category) => (
          <Col key={category.id} sm={12} md={6} lg={4}>
            <CategoryCard categoryObj={category} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CategoryPage;

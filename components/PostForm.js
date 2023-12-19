import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createPost, updatePost } from '../utils/data/postData';
// import getCategories?

const initialState = {
  rare_user_id: '',
  title: '',
  image_url: '',
  content: '',
};

// add const [categoryArray, setCategoryArray] = useState([]);
// add [categories, setCategories] = useState([]);
function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  const userId = localStorage.auth_token;

  console.warn(obj.id);

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  // useEffect(() => {
  //   getCategories().then((res) => setCategories(res));
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, rare_user_id: userId };
    if (obj.id) {
      updatePost(payload).then(() => router.push(`/posts/${obj.id}`));
    } else {
      createPost(payload).then(() => {
        router.push('/posts');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>

      <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Title:"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Post Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Image:"
          name="image_url"
          value={formInput.image_url}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Post Date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Date:"
          name="publication_date"
          value={formInput.publication_date}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Post Content" className="mb-3">
        <Form.Control
          type="textarea"
          placeholder="Content:"
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <div>
        <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
      </div>

    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
import '../styles/ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  // const { user } = useAuth();

  useEffect(() => {
    // Fetch product details
    // For now, we'll use dummy data
    const dummyProduct = {
      id: id,
      title: 'Abstract Harmony',
      artist: 'Jane Doe',
      description: 'A beautiful abstract painting with vibrant colors.',
      price: 500,
      image: 'https://example.com/abstract-harmony.jpg',
      category: 'Abstract',
    };
    setProduct(dummyProduct);
  }, [id]);

  const handleAddToCart = () => {
    // Here you would typically make an API call to add the item to the cart
    console.log(`Added ${quantity} of ${product.title} to cart`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="artist">By {product.artist}</p>
        <p className="price">Rs.{product.price}</p>
        <p className="category">Category: {product.category}</p>
        <p className="description">{product.description}</p>
        <div className="add-to-cart">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;


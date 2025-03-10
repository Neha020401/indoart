import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faShoppingCart, 
  faStar, 
  faArrowLeft, 
  faCheck, 
  faTruck, 
  faUndo, 
  faShieldAlt,
  faUserCircle,
  faComments,    // Add this line for faComments icon
  faSpinner     // Add this line for faSpinner icon
} from '@fortawesome/free-solid-svg-icons';

import Chat from './Chat';  // Correct import for files in the same folder
import '../styles/ArtworkDetail.css';

const artworksData = [
  { 
    id: 1, 
    title: 'Ocean Abstract Painting', 
    artist: 'Emma Johnson', 
    price: 8368.61, 
    originalPrice: 9298.45, 
    "image": require("../images/ocean_paint.jpg"),
    category: 'Vintage', 
    rating: 4.3, 
    reviews: 35, 
    discount: 22, 
    isFlashSale: true,
    description: "A mesmerizing abstract representation of the ocean's depths, this painting captures the fluid motion and vibrant colors of underwater life. Emma Johnson's masterful brushstrokes create a sense of movement and depth, inviting viewers to lose themselves in the aquatic world she has created.",
    medium: "Acrylic on canvas",
    dimensions: "48 x 36 inches",
    yearCreated: 2021,
    artStyle: "Abstract Expressionism",
    framingOptions: ["Unframed", "Black wood frame", "White floating frame"],
    shippingInfo: "Free shipping worldwide. Arrives in 5-7 business days.",
    returnPolicy: {
      days: 30,
      condition: "Unopened and in original packaging",
      restockingFee: "10% of item price",
      nonRefundable: ["Shipping costs", "Handling fees"]
    },
    artistBio: "Emma Johnson is a renowned abstract artist known for her vibrant seascapes and nature-inspired works. With over 15 years of experience, her paintings have been featured in galleries across Europe and North America.",
    artistImage: "../images/emma_johnson.jpg",
    artistRating: 4.8,
    totalSales: 127,
    joinedDate: "2015-03-15"
  },
  { 
    id: 2, 
    title: 'Village Abstract Painting', 
    artist: 'Michael Chen', 
    price: 7526, 
    originalPrice: 9999, 
    "image": require("../images/village_paint.jpg"),
    category: 'Vintage', 
    rating: 4.6, 
    reviews: 75, 
    discount: 16, 
    isFlashSale: true,
    description: "This abstract interpretation of a village scene blends warm earth tones with bold geometric shapes, creating a harmonious yet dynamic composition. Michael Chen's unique style brings a modern twist to traditional rural landscapes, offering viewers a fresh perspective on village life.",
    medium: "Oil on canvas",
    dimensions: "60 x 40 inches",
    yearCreated: 2020,
    artStyle: "Geometric Abstraction",
    framingOptions: ["Unframed", "Rustic wood frame", "Modern silver frame"],
    shippingInfo: "Free shipping within the US. International shipping available at additional cost.",
    returnPolicy: "14-day return policy, buyer pays return shipping",
    artistBio: "Michael Chen is an emerging artist known for his bold, geometric abstractions of everyday scenes. His work has been praised for its innovative use of color and form, earning him recognition in several international art competitions."
  },
  { 
    id: 3, 
    title: 'Peacock, Japanese Vintage Art', 
    artist: 'Yuki Tanaka', 
    price: 6368.61, 
    originalPrice: 7298.45, 
    "image": require("../images/peacock_paint.webp"),
    category: 'Vintage', 
    rating: 4.2, 
    reviews: 65, 
    discount: 12, 
    isFlashSale: false,
    description: "This exquisite piece showcases the timeless beauty of Japanese art, featuring a majestic peacock rendered in vibrant, traditional pigments. Yuki Tanaka's masterful brushwork and attention to detail bring the bird to life, capturing its grace and elegance against a backdrop of delicate cherry blossoms.",
    medium: "Ink and watercolor on rice paper",
    dimensions: "24 x 36 inches",
    yearCreated: 1985,
    artStyle: "Traditional Japanese",
    framingOptions: ["Traditional Japanese scroll mounting", "Modern black frame with mat"],
    shippingInfo: "Shipped in a protective tube. Please allow 10-14 days for delivery.",
    returnPolicy: "Returns accepted within 21 days of delivery",
    artistBio: "Yuki Tanaka is a respected Japanese artist with over 40 years of experience in traditional painting techniques. Her works are highly sought after by collectors worldwide and have been exhibited in prestigious museums across Asia and Europe."
  },
  { 
    id: 4, 
    title: 'Modern City Skyline', 
    artist: 'Alex Rivera', 
    price: 9268.61, 
    originalPrice: 10298.45, 
    "image": require("../images/city_paint.jpeg"), 
    category: 'Modern', 
    rating: 4.7, 
    reviews: 95, 
    discount: 10, 
    isFlashSale: false,
    description: "Alex Rivera's 'Modern City Skyline' is a striking representation of urban life, blending photorealistic elements with abstract flourishes. The painting captures the energy and dynamism of a bustling metropolis, with gleaming skyscrapers reaching towards a vibrant sky streaked with bold colors.",
    medium: "Mixed media on canvas",
    dimensions: "72 x 48 inches",
    yearCreated: 2022,
    artStyle: "Contemporary Realism",
    framingOptions: ["Unframed", "Minimalist black frame", "Floating frame with LED backlighting"],
    shippingInfo: "White glove delivery service included. Please allow 3-4 weeks for delivery.",
    returnPolicy: "Non-returnable. Certificate of authenticity included.",
    artistBio: "Alex Rivera is a rising star in the world of contemporary urban landscapes. His unique style, which combines realistic architectural details with abstract color fields, has earned him critical acclaim and a growing collector base in major cities around the world."
  },
  { 
    id: 5, 
    title: 'Sunset over Mountains', 
    artist: 'Sarah Thompson', 
    price: 5868.61, 
    originalPrice: 6598.45, 
    "image": require("../images/sunset_mountain_paint.jpg"),  
    category: 'Landscape', 
    rating: 4.6, 
    reviews: 78, 
    discount: 11, 
    isFlashSale: false,
    description: "Sarah Thompson's 'Sunset over Mountains' is a breathtaking landscape that captures the magical moment when day turns to night. The painting showcases a panoramic view of rugged mountain peaks bathed in the warm, golden light of the setting sun, with the sky ablaze in a spectrum of oranges, pinks, and purples.",
    medium: "Oil on linen",
    dimensions: "40 x 60 inches",
    yearCreated: 2019,
    artStyle: "Impressionistic Realism",
    framingOptions: ["Unframed", "Weathered wood frame", "Gold leaf frame"],
    shippingInfo: "Insured shipping. Delivery within 7-10 business days.",
    returnPolicy: "30-day return policy, full refund minus shipping costs",
    artistBio: "Sarah Thompson is a celebrated landscape artist known for her ability to capture the ephemeral beauty of natural light. Her work has been featured in numerous solo exhibitions and is part of several prestigious private collections."
  },
  { 
    id: 6, 
    title: 'Abstract Geometric Shapes', 
    artist: 'David Lee', 
    price: 7168.61, 
    originalPrice: 7998.45, 
    "image": require("../images/geometric_paint.jpg"),  
    category: 'Abstract', 
    rating: 4.3, 
    reviews: 55, 
    discount: 10, 
    isFlashSale: false,
    description: "David Lee's 'Abstract Geometric Shapes' is a bold exploration of form and color. This striking composition features a complex arrangement of geometric shapes in a vibrant color palette, creating a sense of depth and movement that challenges the viewer's perception of space and dimension.",
    medium: "Acrylic on panel",
    dimensions: "36 x 36 inches",
    yearCreated: 2023,
    artStyle: "Hard-edge Abstraction",
    framingOptions: ["Unframed", "Floating frame in white", "Custom-colored frame to match artwork"],
    shippingInfo: "Flat-packed and double-boxed for protection. Ships within 5 business days.",
    returnPolicy: "14-day return window, buyer responsible for return shipping",
    artistBio: "David Lee is an abstract artist known for his precise, geometric compositions and bold use of color. His work is influenced by the Op Art movement and explores the intersection of mathematics and visual perception."
  },
  { 
    id: 7, 
    title: 'Vibrant Floral Still Life', 
    artist: 'Maria Garcia', 
    price: 6768.61, 
    originalPrice: 7498.45, 
    "image": require("../images/floral_paint.jpg"), 
    category: 'Still Life', 
    rating: 4.9, 
    reviews: 110, 
    discount: 9, 
    isFlashSale: true,
    description: "Maria Garcia's 'Vibrant Floral Still Life' is a joyous celebration of color and nature. This exuberant painting features a lush bouquet of various flowers in full bloom, their petals rendered in rich, saturated hues that seem to leap off the canvas. Garcia's masterful use of light and shadow brings depth and dimension to each blossom.",
    medium: "Oil on canvas",
    dimensions: "30 x 40 inches",
    yearCreated: 2022,
    artStyle: "Contemporary Realism",
    framingOptions: ["Unframed", "Ornate gold frame", "Modern white frame"],
    shippingInfo: "Carefully packed and shipped. Delivery in 5-7 business days.",
    returnPolicy: "30-day money-back guarantee, free returns",
    artistBio: "Maria Garcia is a renowned still life painter whose work is characterized by its vivid colors and photorealistic detail. Her paintings have been featured in major art publications and are highly sought after by collectors of contemporary realism."
  },
  { 
    id: 8, 
    title: 'Surrealist Dream Landscape', 
    artist: 'Lucas Dubois', 
    price: 8968.61, 
    originalPrice: 9998.45, 
    "image": require("../images/surreal_dream_paint.jpg"),
    category: 'Surrealism', 
    rating: 4.7, 
    reviews: 88, 
    discount: 10, 
    isFlashSale: false,
    description: "Lucas Dubois' 'Surrealist Dream Landscape' is a mesmerizing journey into the subconscious. This enigmatic painting depicts a dreamlike world where reality bends and familiar objects take on new, mysterious forms. Dubois' meticulous technique and rich symbolism invite viewers to explore the depths of their own imagination.",
    medium: "Oil on panel",
    dimensions: "48 x 36 inches",
    yearCreated: 2021,
    artStyle: "Surrealism",
    framingOptions: ["Unframed", "Antique gold frame", "Custom shadow box frame"],
    shippingInfo: "Insured shipping with tracking. Please allow 10-14 days for delivery.",
    returnPolicy: "All sales final. Certificate of authenticity provided.",
    artistBio: "Lucas Dubois is a contemporary surrealist painter whose work continues in the tradition of Salvador Dalí and René Magritte. His paintings explore themes of dreams, memory, and the unconscious mind, earning him a dedicated following in the surrealist art community."
  },
  { 
    id: 9, 
    title: 'Minimalist Portrait', 
    artist: 'Emily White', 
    price: 5468.61, 
    originalPrice: 5998.45, 
    "image": require("../images/portrait_paint.jpg"), 
    category: 'Portrait', 
    rating: 4.4, 
    reviews: 72, 
    discount: 8, 
    isFlashSale: false,
    description: "Emily White's 'Minimalist Portrait' is a striking example of contemporary portraiture. Using a limited color palette and bold, simplified forms, White captures the essence of her subject with remarkable economy. The portrait's piercing gaze and enigmatic expression invite contemplation and emotional connection.",
    medium: "Acrylic on canvas",
    dimensions: "24 x 30 inches",
    yearCreated: 2023,
    artStyle: "Minimalist",
    framingOptions: ["Unframed", "Slim black frame", "Floating frame in natural wood"],
    shippingInfo: "Securely packaged and shipped. Arrives in 3-5 business days.",
    returnPolicy: "14-day return policy. Artwork must be in original condition.",
    artistBio: "Emily White is an up-and-coming portrait artist known for her minimalist approach to capturing human essence. Her work has been featured in several group exhibitions focusing on contemporary portraiture and figurative art."
  },
  { 
    id: 10, 
    title: 'Expressionist Cityscape', 
    artist: 'Marcus Brown', 
    price: 7868.61, 
    originalPrice: 8798.45, 
    "image": require("../images/cityscape_paint.jpg"), 
    category: 'Modern', 
    rating: 4.6, 
    reviews: 98, 
    discount: 10, 
    isFlashSale: false,
    description: "Marcus Brown's 'Expressionist Cityscape' is a dynamic and emotive portrayal of urban life. Through bold brushstrokes and a vibrant, almost fauvist color palette, Brown captures the energy and chaos of a bustling city. The distorted perspectives and exaggerated forms convey the sensory overload of modern urban existence.",
    medium: "Oil on canvas",
    dimensions: "60 x 48 inches",
    yearCreated: 2020,
    artStyle: "Neo-Expressionism",
    framingOptions: ["Unframed", "Heavy black frame", "Floating frame with distressed finish"],
    shippingInfo: "Crated and insured shipping. Delivery within 2-3 weeks.",
    returnPolicy: "Returns accepted within 21 days. Buyer pays return shipping.",
    artistBio: "Marcus Brown is a celebrated neo-expressionist painter whose work focuses on urban themes and the human experience in modern cities. His paintings have been exhibited in major galleries across Europe and North America."
  },
  { 
    id: 11, 
    title: 'Impressionist Garden Scene', 
    artist: 'Sophie Martin', 
    price: 6968.61, 
    originalPrice: 7798.45, 
    "image": require("../images/garden_paint.jpg"),
    category: 'Impressionism', 
    rating: 4.8, 
    reviews: 105, 
    discount: 10, 
    isFlashSale: true,
    description: "Sophie Martin's 'Impressionist Garden Scene' is a delightful homage to the masters of Impressionism. This luminous painting captures a sun-dappled garden in full bloom, with deft brushstrokes creating a sense of movement and atmosphere. Martin's use of light and color brings the scene to life, inviting viewers to lose themselves in this tranquil oasis.",
    medium: "Oil on linen",
    dimensions: "36 x 48 inches",
    yearCreated: 2021,
    artStyle: "Neo-Impressionism",
    framingOptions: ["Unframed", "Ornate gold frame", "Natural wood frame with linen liner"],
    shippingInfo: "Carefully packed and shipped. Please allow 7-10 days for delivery.",
    returnPolicy: "30-day satisfaction guarantee. Full refund available for returns.",
    artistBio: "Sophie Martin is a contemporary impressionist painter who draws inspiration from the great masters of the 19th century. Her garden scenes are particularly celebrated for their ability to capture the fleeting effects of light and atmosphere."
  },
  { 
    id: 12, 
    title: 'Abstract Color Field', 
    artist: 'Ryan Taylor', 
    price: 7368.61, 
    originalPrice: 8198.45, 
    "image": require("../images/colorfield_paint.jpg"),
    category: 'Abstract', 
    rating: 4.5, 
    reviews: 80, 
    discount: 10, 
    isFlashSale: false,
    description: "Ryan Taylor's 'Abstract Color Field' is a mesmerizing exploration of color and form. This large-scale painting features expansive fields of vibrant hues that seem to pulse and shift as the viewer's eye moves across the canvas. Taylor's masterful use of color creates a sense of depth and movement within the abstract composition.",
    medium: "Acrylic on canvas",
    dimensions: "72 x 60 inches",
    yearCreated: 2022,
    artStyle: "Color Field Painting",
    framingOptions: ["Unframed", "Minimalist white frame", "Floating frame in brushed metal"],
    shippingInfo: "Due to size, special shipping arrangements required. Please allow 3-4 weeks for delivery.",
    returnPolicy: "All sales final. Certificate of authenticity included.",
    artistBio: "Ryan Taylor is a rising star in the world of abstract art, known for his bold color field paintings. His work has been compared to that of Mark Rothko and Helen Frankenthaler, and has been featured in several high-profile gallery shows."
  },
  { 
    id: 13, 
    title: 'Futuristic Sci-Fi Landscape', 
    artist: 'Zoe Anderson', 
    price: 8568.61, 
    originalPrice: 9498.45, 
    "image": require("../images/scifi_future_paint.jpg"), 
    category: 'Contemporary', 
    rating: 4.7, 
    reviews: 92, 
    discount: 9, 
    isFlashSale: false,
    description: "Zoe Anderson's 'Futuristic Sci-Fi Landscape' is a captivating vision of a possible future world. This digital painting showcases a sprawling cityscape of sleek, towering structures bathed in the glow of multiple moons. Anderson's attention to detail and mastery of digital techniques create a hyper-realistic yet fantastical scene that sparks the imagination.",
    medium: "Digital painting, limited edition print on aluminum",
    dimensions: "40 x 60 inches",
    yearCreated: 2023,
    artStyle: "Digital Sci-Fi Art",
    framingOptions: ["Unframed", "Floating mount", "Custom LED-backlit frame"],
    shippingInfo: "Shipped flat in reinforced packaging. Delivery in 5-7 business days.",
    returnPolicy: "14-day return policy. Artwork must be in original condition and packaging.",
    artistBio: "Zoe Anderson is a digital artist at the forefront of sci-fi and futuristic art. Her work blends traditional painting techniques with cutting-edge digital tools to create immersive, thought-provoking landscapes of potential future worlds."
  },
  { 
    id: 14, 
    title: 'Classical Still Life with Fruits', 
    artist: 'Thomas Moore', 
    price: 6168.61, 
    originalPrice: 6898.45, 
    "image": require("../images/fruit_paint.jpg"),
    category: 'Still Life', 
    rating: 4.6, 
    reviews: 75, 
    discount: 10, 
    isFlashSale: false,
    description: "Thomas Moore's 'Classical Still Life with Fruits' is a stunning example of contemporary realism. This meticulously painted composition features a variety of fruits arranged on a draped table, rendered with exquisite detail and a masterful use of light and shadow. Moore's technique pays homage to the Dutch Golden Age while bringing a modern sensibility to the genre.",
    medium: "Oil on panel",
    dimensions: "24 x 30 inches",
    yearCreated: 2020,
    artStyle: "Contemporary Realism",
    framingOptions: ["Unframed", "Classic gold frame", "Modern black frame with linen liner"],
    shippingInfo: "Carefully packed and shipped. Please allow 5-7 business days for delivery.",
    returnPolicy: "30-day return policy. Buyer responsible for return shipping costs.",
    artistBio: "Thomas Moore is a classically trained painter known for his exquisite still life compositions. His work has been exhibited in prestigious galleries specializing in contemporary realism and has earned him numerous awards in national art competitions."
  },
  { 
    id: 15, 
    title: 'Pop Art Celebrity Portrait', 
    artist: 'Olivia Clark', 
    price: 7668.61, 
    originalPrice: 8598.45, 
    "image": require("../images/popart_celeb_paint.jpg"),
    category: 'Pop Art', 
    rating: 4.9, 
    reviews: 115, 
    discount: 10, 
    isFlashSale: true,
    description: "Olivia Clark's 'Pop Art Celebrity Portrait' is a vibrant and iconic representation of a well-known cultural figure. Using bold colors and graphic patterns reminiscent of Andy Warhol's style, Clark creates a striking portrait that captures both the likeness and the larger-than-life persona of the subject. This piece is a commentary on fame, popular culture, and the power of imagery in the modern world.",
    medium: "Silkscreen and acrylic on canvas",
    dimensions: "48 x 48 inches",
    yearCreated: 2022,
    artStyle: "Pop Art",
    framingOptions: ["Unframed", "Lucite box frame", "Slim metal frame in bright color"],
    shippingInfo: "Insured shipping with tracking. Delivery within 7-10 business days.",
    returnPolicy: "14-day money-back guarantee. Artwork must be returned in original condition.",
    artistBio: "Olivia Clark is a contemporary pop artist whose work explores themes of celebrity, consumerism, and media culture. Her bold, graphic style and choice of subjects have made her a favorite among collectors of contemporary pop art."
  },
  { 
    id: 16, 
    title: 'Atmospheric Seascape', 
    artist: 'Nathan Reed', 
    price: 6568.61, 
    originalPrice: 7298.45, 
    "image": require("../images/seascape_paint.jpg"),
    category: 'Landscape', 
    rating: 4.7, 
    reviews: 88, 
    discount: 10, 
    isFlashSale: false,
    description: "Nathan Reed's 'Atmospheric Seascape' is a breathtaking depiction of the power and beauty of the ocean. This large-scale painting captures the mood of a stormy sea, with dramatic clouds looming over turbulent waves. Reed's skillful use of color and texture creates a sense of movement and atmosphere, immersing the viewer in the maritime scene.",
    medium: "Oil on canvas",
    dimensions: "60 x 40 inches",
    yearCreated: 2021,
    artStyle: "Contemporary Impressionism",
    framingOptions: ["Unframed", "Weathered wood frame", "Floating frame in dark blue"],
    shippingInfo: "Carefully packed and shipped. Please allow 10-14 days for delivery.",
    returnPolicy: "30-day satisfaction guarantee. Buyer pays return shipping.",
    artistBio: "Nathan Reed is a celebrated seascape painter known for his ability to capture the ever-changing moods of the ocean. His work has been featured in maritime art exhibitions around the world and is prized by collectors for its emotive power and technical mastery."
  }
];

function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Define isChatOpen and isChatLoading state variables
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    const selectedArtwork = artworksData.find(art => art.id === parseInt(id));
    if (selectedArtwork) {
      setArtwork(selectedArtwork);
      setIsInWishlist(localStorage.getItem(`wishlist_${id}`) === 'true');
      setSelectedFrame(selectedArtwork.framingOptions[0]);
    }
  }, [id]);

  const handleAddToCart = () => {
    const cartItem = { ...artwork, quantity };
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  const handleAddToWishlist = () => {
    // Add to wishlist logic
    console.log('Adding to wishlist:', artwork);
    // Simulate adding to wishlist
    localStorage.setItem('wishlistItem', JSON.stringify(artwork));
  };

  const handleOpenChat = () => {
    setIsChatLoading(true);
    // Simulating chat loading time
    setTimeout(() => {
      setIsChatOpen(true);
      setIsChatLoading(false);
    }, 1500);
  };

  if (!artwork) return <div>Loading...</div>;

  const returnPolicy = artwork.returnPolicy || {}; // Default empty object if returnPolicy is missing
  const nonRefundable = returnPolicy.nonRefundable || []; // Default to an empty array if undefined
  const daysReturn = returnPolicy.days || 7; // Default to 0 if days is not defined
  const restockingFee = returnPolicy.restockingFee || 'None'; // Default to 'None' if restockingFee is undefined
  const condition = returnPolicy.condition || 'N/A'; // Default to 'N/A' if condition is missing
  
  return (
    <div className="artwork-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Gallery
      </button>
      <div className="artwork-detail-content">
        <div className="artwork-image-container">
          <img src={artwork.image} alt={artwork.title} className="artwork-image" />
        </div>
        <div className="artwork-info">
          <h1 className="artwork-title">{artwork.title}</h1>
          <p className="artist-name">by <Link to={`/artist/${artwork.artist.replace(' ', '-').toLowerCase()}`}>{artwork.artist}</Link></p>
          <div className="artwork-meta">
            <p className="artwork-price">Rs.{artwork.price.toFixed(2)}</p>
            {artwork.discount > 0 && (
              <p className="artwork-original-price">Rs.{artwork.originalPrice.toFixed(2)}</p>
            )}
            <div className="artwork-rating">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={index < Math.floor(artwork.rating) ? 'star filled' : 'star'}
                />
              ))}
              <span>({artwork.reviews} reviews)</span>
            </div>
          </div>
          <p className="artwork-description">{artwork.description}</p>
          <div className="artwork-details">
            <p><strong>Medium:</strong> {artwork.medium}</p>
            <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
            <p><strong>Year Created:</strong> {artwork.yearCreated}</p>
            <p><strong>Art Style:</strong> {artwork.artStyle}</p>
          </div>
          <div className="framing-options">
            <h3>Framing Options:</h3>
            <select 
              value={selectedFrame} 
              onChange={(e) => setSelectedFrame(e.target.value)}
              className="frame-select"
            >
              {artwork.framingOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="quantity-selector">
            <h3>Quantity:</h3>
            <input 
              type="number" 
              min="1" 
              max="10" 
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="quantity-input"
            />
          </div>
          <div className="shipping-info">
            <h3>Shipping Information:</h3>
            <p><FontAwesomeIcon icon={faTruck} /> {artwork.shippingInfo}</p>
          </div>
          <div className="return-policy">
            <h3>Return Policy:</h3>
            <ul>
              <li><FontAwesomeIcon icon={faUndo} /> {daysReturn}-day returns</li>
              <li><FontAwesomeIcon icon={faCheck} /> {condition}</li>
              <li><FontAwesomeIcon icon={faShieldAlt} /> Restocking fee: {restockingFee}</li>
              <li>Non-refundable: {nonRefundable.length > 0 ? nonRefundable.join(', ') : 'No'}</li>
            </ul>
          </div>
          <div className="artw-actions">
  <button className="artw-add-to-cart" onClick={handleAddToCart}>
    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
  </button>
  <button className="artw-add-to-wishlist" onClick={handleAddToWishlist}>
    <FontAwesomeIcon icon={faHeart} /> Add to Wishlist
  </button>
</div>

        </div>
      </div>
      <div className="artwork-actions">
        <button className="artw-chat-btn" onClick={handleOpenChat} disabled={isChatLoading}>
          <FontAwesomeIcon icon={faComments} /> 
          {isChatLoading ? 'Loading Chat...' : 'Chat with Seller'}
        </button>
      </div>
      {isChatLoading ? (
        <div className="chat-loading">
          <FontAwesomeIcon icon={faSpinner} spin /> Loading chat...
        </div>
      ) : (
        <Chat
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          artworkId={artwork.id}
          sellerName={artwork.artist}
        />
      )}
      <div className="seller-profile">
      <h2>About the Artist</h2>
<div className="artw-seller-info">
  <img
    src={artwork.artistImage || '/path-to-default-image.jpg'} // Fallback image if artistImage is undefined
    alt={artwork.artist}
    className="artw-seller-image"
  />
  <div className="artw-seller-details">
    <h3 className="artw-artist-name">{artwork.artist}</h3>
    <p>
      <FontAwesomeIcon icon={faStar} /> Artist Rating: 
      {artwork.artistRating ? artwork.artistRating.toFixed(1) : "Not Rated"}
    </p>
    <p>
      <FontAwesomeIcon icon={faShoppingCart} /> Total Sales: {artwork.totalSales}
    </p>
    <p>
      <FontAwesomeIcon icon={faUserCircle} /> Joined: {new Date(artwork.joinedDate).toLocaleDateString()}
    </p>
  </div>
</div>
<p className="artw-artist-bio">{artwork.artistBio}</p>
<Link to={`/artist/${artwork.artist.replace(' ', '-').toLowerCase()}`} className="artw-view-profile-btn">
  View Full Profile
</Link>

</div>
<Chat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        artworkId={artwork.id}
        sellerName={artwork.artist}
      />
    </div>
  );
}

export default ArtworkDetail;
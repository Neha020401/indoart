export const chatResponses = [
    {
      keywords: ['price', 'cost', 'how much'],
      response: (artworkId) => `The current price for this artwork (ID: ${artworkId}) is $X. However, I might be able to offer a small discount for an immediate purchase. How about we discuss it?`
    },
    {
      keywords: ['discount', 'offer', 'deal'],
      response: () => `I can offer a 5% discount if you're ready to make a purchase today. The discount will be automatically applied at checkout. Would you like to proceed with the order?`
    },
    {
      keywords: ['shipping', 'delivery', 'send'],
      response: () => `We offer worldwide shipping. The cost and delivery time depend on your location. Could you please share your shipping address or country?`
    },
    {
      keywords: ['technique', 'medium', 'materials'],
      response: () => `This artwork was created using a blend of traditional and modern techniques, with acrylics on canvas and a touch of mixed media. It's designed to bring depth and dimension to any room.`
    },
    {
      keywords: ['size', 'dimensions', 'how big'],
      response: () => `The dimensions of this piece are 24x36 inches (61x91 cm), perfect for showcasing in larger spaces like living rooms or offices.`
    },
    {
      keywords: ['framing', 'frame', 'display'],
      response: () => `The artwork comes unframed, but I can suggest some framing options. Would you like me to send you some ideas for a complementary frame?`
    },
    {
      keywords: ['more discount', 'better offer', 'lower price', 'better discount'],
      response: () => `I understand you'd like a better deal. While I can offer a 5% discount today, I occasionally have exclusive promotions. Please subscribe to my newsletter for updates on future offers!`
    },
    {
      keywords: ['style', 'genre', 'type of art'],
      response: () => `This piece is a contemporary abstract work, blending elements of expressionism with geometric patterns. It's designed to evoke emotion and spark conversation.`
    },
    {
      keywords: ['inspiration', 'meaning', 'story behind'],
      response: () => `The inspiration for this piece came from the interplay of light and shadow in urban landscapes. It represents the dynamic energy of city life and the quiet moments of reflection we find within it.`
    },
    {
      keywords: ['care', 'maintenance', 'clean'],
      response: () => `To care for this artwork, keep it out of direct sunlight and dust it gently with a soft, dry cloth. Avoid using any cleaning products directly on the canvas.`
    },
    {
      keywords: ['certificate', 'authenticity', 'proof'],
      response: () => `Yes, this artwork comes with a certificate of authenticity. It includes details about the piece, my signature, and a unique identification number for provenance.`
    },
    {
      keywords: ['custom', 'commission', 'similar work'],
      response: () => `I do accept commissions for custom pieces. If you'd like something similar to this artwork but with specific modifications, we can certainly discuss that. What did you have in mind?`
    },
    {
      keywords: ['series', 'collection', 'set'],
      response: () => `This piece is part of my 'Urban Reflections' series. There are five other works in this collection, each exploring different aspects of city life. Would you like to see the others?`
    },
    {
      keywords: ['exhibition', 'show', 'gallery'],
      response: () => `This artwork was first exhibited at the Modern Expressions Gallery in New York last spring. It received positive reviews and was featured in several art publications.`
    },
    {
      keywords: ['process', 'create', 'make'],
      response: () => `My creative process involves layering colors and textures over several sessions. This piece took about three weeks to complete, with time for each layer to dry and for me to reflect on the composition.`
    },
    {
      keywords: ['colors', 'palette', 'shades'],
      response: () => `The color palette for this piece includes deep blues, vibrant teals, and touches of warm orange and gold. These colors were chosen to create a sense of depth and energy in the composition.`
    },
    {
      keywords: ['hang', 'install', 'mount'],
      response: () => `The artwork comes ready to hang with a wire mounting on the back. I recommend using two hooks for stability. If you need advice on placement, I'd be happy to offer suggestions based on your space.`
    },
    {
      keywords: ['lighting', 'display recommendations'],
      response: () => `This piece looks best in soft, ambient lighting. Avoid harsh direct light as it can create glare. A small spotlight or picture light can enhance the texture and depth of the painting.`
    },
    {
      keywords: ['signature', 'sign', 'mark'],
      response: () => `Yes, the artwork is signed. You'll find my signature in the lower right corner of the canvas. It's done subtly so as not to distract from the overall composition.`
    },
    {
      keywords: ['varnish', 'finish', 'protection'],
      response: () => `The painting is finished with a high-quality, UV-resistant varnish. This protects the colors from fading and makes it easier to clean, ensuring the artwork will maintain its vibrancy for years to come.`
    },
    // ... (continue with more cases to reach at least 100)
    {
      keywords: ['return', 'refund', 'exchange'],
      response: () => `I offer a 14-day return policy. If you're not completely satisfied, you can return the artwork in its original condition for a full refund, minus shipping costs. However, I'm confident you'll love it!`
    },
    {
      keywords: ['insurance', 'damage', 'protection during shipping'],
      response: () => `All artworks are fully insured during shipping. In the unlikely event of any damage during transit, please document it immediately and contact me. I'll arrange for repair or replacement at no cost to you.`
    },
    {
        keywords: ['price', 'cost', 'how much'],
        response: (artworkId) => `The current price for this artwork (ID: ${artworkId}) is $X. However, I might be able to offer a small discount for an immediate purchase. How about we discuss it?`
      },
      {
        keywords: ['shipping', 'delivery', 'send'],
        response: () => `We offer worldwide shipping. The cost and delivery time depend on your location. Could you please share your shipping address or country?`
      },
      {
        keywords: ['technique', 'medium', 'materials'],
        response: () => `This artwork was created using a blend of traditional and modern techniques, with acrylics on canvas and a touch of mixed media. It's designed to bring depth and dimension to any room.`
      },
      {
        keywords: ['size', 'dimensions', 'how big'],
        response: () => `The dimensions of this piece are 24x36 inches (61x91 cm), perfect for showcasing in larger spaces like living rooms or offices.`
      },
      {
        keywords: ['framing', 'frame', 'display'],
        response: () => `The artwork comes unframed, but I can suggest some framing options. Would you like me to send you some ideas for a complementary frame?`
      },
      {
        keywords: ['style', 'genre', 'type of art'],
        response: () => `This piece is a contemporary abstract work, blending elements of expressionism with geometric patterns. It's designed to evoke emotion and spark conversation.`
      },
      {
        keywords: ['inspiration', 'meaning', 'story behind'],
        response: () => `The inspiration for this piece came from the interplay of light and shadow in urban landscapes. It represents the dynamic energy of city life and the quiet moments of reflection we find within it.`
      },
      {
        keywords: ['care', 'maintenance', 'clean'],
        response: () => `To care for this artwork, keep it out of direct sunlight and dust it gently with a soft, dry cloth. Avoid using any cleaning products directly on the canvas.`
      },
      {
        keywords: ['certificate', 'authenticity', 'proof'],
        response: () => `Yes, this artwork comes with a certificate of authenticity. It includes details about the piece, my signature, and a unique identification number for provenance.`
      },
      {
        keywords: ['custom', 'commission', 'similar work'],
        response: () => `I do accept commissions for custom pieces. If you'd like something similar to this artwork but with specific modifications, we can certainly discuss that. What did you have in mind?`
      },
      {
        keywords: ['series', 'collection', 'set'],
        response: () => `This piece is part of my 'Urban Reflections' series. There are five other works in this collection, each exploring different aspects of city life. Would you like to see the others?`
      },
      {
        keywords: ['exhibition', 'show', 'gallery'],
        response: () => `This artwork was first exhibited at the Modern Expressions Gallery in New York last spring. It received positive reviews and was featured in several art publications.`
      },
      {
        keywords: ['process', 'create', 'make'],
        response: () => `My creative process involves layering colors and textures over several sessions. This piece took about three weeks to complete, with time for each layer to dry and for me to reflect on the composition.`
      },
      {
        keywords: ['colors', 'palette', 'shades'],
        response: () => `The color palette for this piece includes deep blues, vibrant teals, and touches of warm orange and gold. These colors were chosen to create a sense of depth and energy in the composition.`
      },
      {
        keywords: ['hang', 'install', 'mount'],
        response: () => `The artwork comes ready to hang with a wire mounting on the back. I recommend using two hooks for stability. If you need advice on placement, I'd be happy to offer suggestions based on your space.`
      },
      {
        keywords: ['lighting', 'display recommendations'],
        response: () => `This piece looks best in soft, ambient lighting. Avoid harsh direct light as it can create glare. A small spotlight or picture light can enhance the texture and depth of the painting.`
      },
      {
        keywords: ['signature', 'sign', 'mark'],
        response: () => `Yes, the artwork is signed. You'll find my signature in the lower right corner of the canvas. It's done subtly so as not to distract from the overall composition.`
      },
      {
        keywords: ['varnish', 'finish', 'protection'],
        response: () => `The painting is finished with a high-quality, UV-resistant varnish. This protects the colors from fading and makes it easier to clean, ensuring the artwork will maintain its vibrancy for years to come.`
      },
      {
        keywords: ['return', 'refund', 'exchange'],
        response: () => `I offer a 14-day return policy. If you're not completely satisfied, you can return the artwork in its original condition for a full refund, minus shipping costs. However, I'm confident you'll love it!`
      },
      {
        keywords: ['insurance', 'damage', 'protection during shipping'],
        response: () => `All artworks are fully insured during shipping. In the unlikely event of any damage during transit, please document it immediately and contact me. I'll arrange for repair or replacement at no cost to you.`
      },
      {
        keywords: ['investment', 'value', 'appreciation'],
        response: () => `While I can't guarantee future value, my artworks have been known to appreciate over time. Many collectors have found them to be worthwhile investments. The key is to choose a piece that resonates with you personally.`
      },
      {
        keywords: ['storage', 'preserve', 'longevity'],
        response: () => `To preserve the artwork long-term, store it in a cool, dry place away from direct sunlight. If you need to store it unframed, lay it flat between acid-free materials. Avoid storing in damp basements or hot attics.`
      },
      {
        keywords: ['print', 'reproduction', 'copy'],
        response: () => `This is an original piece, but I do offer high-quality, limited edition prints of some of my works. If you're interested in a print version, I'd be happy to discuss options and availability.`
      },
      {
        keywords: ['texture', 'surface', 'feel'],
        response: () => `The texture of this piece is quite unique. I've used various techniques to create a tactile surface with subtle ridges and smooth areas. While it's best not to touch the painting, the texture adds visual interest and depth.`
      },
      {
        keywords: ['availability', 'stock', 'is this available'],
        response: (artworkId) => 
          `Yes, this artwork (ID: ${artworkId}) is currently available. Let me know if you'd like me to reserve it for you!`
      },
      {
        keywords: ['payment options', 'pay', 'how to pay'],
        response: () => 
          `We accept payments via credit/debit cards, PayPal, and bank transfers. Let me know if you'd like detailed instructions for your preferred payment method.`
      },
      {
        keywords: ['bulk order', 'multiple pieces', 'wholesale'],
        response: () => 
          `Yes, I do offer discounts for bulk orders. Could you let me know how many pieces you're interested in? I'd be happy to provide a custom quote.`
      },
      {
        keywords: ['timeline', 'how long', 'delivery time'],
        response: () => 
          `Delivery times depend on your location. Typically, domestic orders take 5-7 days, while international shipping can take 2-3 weeks. I’ll confirm once you share your address.`
      },
      {
        keywords: ['refund policy', 'cancellation', 'money back'],
        response: () => 
          `You can cancel your order within 24 hours for a full refund. For cancellations after that period, please reach out to discuss options.`
      },
      {
        keywords: ['gift', 'present', 'gift packaging'],
        response: () => 
          `Yes, I offer gift packaging options! Let me know if you’d like the artwork gift-wrapped and if you'd like me to include a personalized note.`
      },
      {
        keywords: ['installation service', 'help with hanging', 'setup'],
        response: () => 
          `While I don't offer installation services directly, I can provide guidance or recommend professionals in your area to help with proper hanging and placement.`
      },
      {
        keywords: ['resale', 'invest', 'value'],
        response: () => 
          `Art is a timeless investment. Many of my collectors have seen the value of my works appreciate over time. If you'd like, I can share insights on the current market trends.`
      },
      {
        keywords: ['customization', 'change size', 'adjust'],
        response: () => 
          `Yes, I can create a custom version of this artwork to suit your space. Let me know the dimensions or changes you have in mind.`
      },
      {
        keywords: ['virtual tour', 'video', 'preview'],
        response: () => 
          `If you'd like a closer look, I can arrange a virtual tour or send a detailed video of the artwork. Let me know how you'd like to proceed!`
      },
      {
        keywords: ['more discount', 'extra discount', 'better deal', 'bargain'],
        response: () => 
          `I’m glad you’re interested! While I usually offer a standard 5% discount, I can provide a higher discount for returning customers or bulk purchases. Let me know if that applies to you!`
      },
      {
        keywords: ['bulk discount', 'large order', 'multiple artworks'],
        response: (quantity) => 
          `For bulk orders of ${quantity} or more artworks, I can offer a discount beyond 5%. Let me know the total pieces you're considering, and I’ll provide the best deal!`
      },
      {
        keywords: ['first-time discount', 'new customer', 'special offer'],
        response: () => 
          `As a first-time customer, you’re eligible for an additional discount of 3%! Combine it with the standard 5% discount for a total of 8%. Let me know if you'd like to proceed!`
      },
      {
        keywords: ['special occasions', 'festival discount', 'holiday sale'],
        response: () => 
          `We’re currently running a holiday sale! You can avail of an extra 10% discount on top of the regular 5%. Let me know if this works for you!`
      },
      {
        keywords: ['coupon', 'promo code', 'voucher'],
        response: () => 
          `If you have a promo code, please share it with me! I’ll check if it’s applicable and apply any additional discount to your order.`
      },
      {
        keywords: ['membership', 'loyalty program', 'reward points'],
        response: () => 
          `As part of our loyalty program, members get up to 15% off on all purchases. If you’re not a member yet, sign up to enjoy these exclusive discounts!`
      },
      {
        keywords: ['free shipping', 'shipping cost', 'delivery charges'],
        response: () => 
          `For orders above a certain amount, I offer free shipping as a bonus. If your order doesn’t qualify, I can still try to minimize shipping costs. Let me know your total!`
      },
      {
        keywords: ['custom quote', 'special price', 'negotiate'],
        response: () => 
          `If you’re looking for a better price, I’d be happy to discuss. Could you share your budget or expectations? I’ll see how I can accommodate!`
      },
      {
        keywords: ['seasonal sale', 'clearance', 'limited-time offer'],
        response: () => 
          `We’re currently offering exclusive seasonal discounts up to 20%! Act fast, as these deals are available for a limited time only. Let me know if you’d like to take advantage of them!`
      },
      {
        keywords: ['payment in installments', 'EMI', 'split payment'],
        response: () => 
          `To make it easier, I offer payment in installments for orders above a certain amount. Let me know if you’d like to explore this option and the terms!`
      },
      {
        keywords: ['more discount', 'higher discount', 'extra discount', 'better price', 'reduce price'],
        response: () => 
          `I understand you’re looking for a better deal! While I typically offer 5%, let me see if I can provide an extra discount to meet your expectations. Let me know your preferred price, and we’ll try to work something out!`
      },
      {
        keywords: ['price too high', 'too expensive', 'can’t afford', 'lower price'],
        response: () => 
          `I completely understand your concern. Let me offer a one-time additional discount of 2% on this piece. I hope this makes it more affordable for you!`
      },
      {
        keywords: ['student discount', 'low budget', 'special price for students'],
        response: () => 
          `If you’re a student or working with a limited budget, I’d be happy to offer a special student discount of an additional 3%! Let me know if this works for you!`
      },
      {
        keywords: ['first-time customer', 'new buyer', 'extra discount for first time'],
        response: () => 
          `As a first-time customer, I can provide you with an extra discount of 3% on your purchase. I hope this makes it easier for you to decide!`
      },
      {
        keywords: ['festival offer', 'seasonal discount', 'special discount', 'sale'],
        response: () => 
          `It’s the perfect time to buy! I can offer an additional seasonal discount of 5% on this piece just for you. Let me know if this works!`
      },
      {
        keywords: ['final price', 'last offer', 'best price', 'lowest price'],
        response: () => 
          `Here’s my best offer: I can give you an additional 3% discount on this item, making it a total of 8%. This is my final price—let me know if it works!`
      },
      {
        keywords: ['can you do better?', 'is this negotiable?', 'discount negotiation'],
        response: () => 
          `I always aim to provide the best value! While I’ve already offered a 5% discount, I can stretch it to 7% as a goodwill gesture. Let me know if this helps!`
      },
      {
        keywords: ['tight budget', 'financial issues', 'need help with price'],
        response: () => 
          `I completely understand budgeting concerns. As a gesture of goodwill, I can offer an additional discount of 4%. I hope this helps make it more affordable for you!`
      },
      {
        keywords: ['exclusive deal', 'special offer', 'unique discount'],
        response: () => 
          `Since you’re interested in this piece, let me give you a special one-time discount of 6%. I hope this exclusive deal works for you!`
      },
      {
        keywords: ['single piece', 'only one', 'individual item'],
        response: () => 
          `For this single piece, I can offer an extra 2% discount, bringing the total discount to 7%. Let me know if this fits your budget!`
      },
      {
        keywords: ['about platform', 'what is Art Gallery', 'what do you sell', 'about this website'],
        response: () => 
          `Art Gallery is an online platform where we bring together unique, handcrafted, and stunning pieces of art. We aim to connect art enthusiasts with talented artists, offering paintings, sculptures, digital art, and more. Let us know how we can help you find your perfect piece!`
      },
      {
        keywords: ['what types of art', 'do you sell paintings?', 'sculptures available?', 'digital art available?', 'types of art'],
        response: () => 
          `We offer a wide range of artwork, including original paintings, sculptures, digital art, sketches, and photography. If you’re looking for something specific, feel free to ask, and we’ll help you find it!`
      },
      {
        keywords: ['artist information', 'who made this', 'artist details', 'about the creator'],
        response: () => 
          `Each piece on Art Gallery is crafted by talented and passionate artists. If you’d like to know more about the creator of a specific artwork, please let us know, and we’ll share their details with you!`
      },
      {
        keywords: ['is this original?', 'authentic art', 'authenticity guarantee', 'real art'],
        response: () => 
          `We guarantee that every piece sold on Art Gallery is 100% authentic and original, created by skilled artists. Your purchase also comes with a certificate of authenticity to ensure its value.`
      },
      {
        keywords: ['pricing explanation', 'why so expensive?', 'pricing of art', 'why high price'],
        response: () => 
          `Every piece of art on Art Gallery is unique and reflects the artist’s skill, effort, and creativity. The price not only covers the time spent crafting the art but also its exclusivity and value as a collectible.`
      },
      {
        keywords: ['custom art', 'customized artwork', 'can I request custom art?', 'custom orders'],
        response: () => 
          `Yes, Art Gallery offers the option for custom or commissioned artwork. Let us know your ideas or preferences, and we’ll connect you with an artist to bring your vision to life!`
      },
      {
        keywords: ['shipping', 'delivery', 'when will I get my order?', 'delivery time'],
        response: () => 
          `We deliver artwork safely and securely to your doorstep. Delivery times may vary depending on your location, but we aim to ship within 7-10 business days. Let us know if you’d like more details about your specific order!`
      },
      {
        keywords: ['return policy', 'refund', 'can I return?', 'policy on returns'],
        response: () => 
          `At Art Gallery, we ensure customer satisfaction. If your order arrives damaged or is not as described, we offer a hassle-free return and refund policy. Please contact us within 7 days of delivery to initiate a return.`
      },
      {
        keywords: ['discount on art', 'more discount on painting', 'special offer on artwork'],
        response: () => 
          `We value your interest in our art pieces! While we typically offer a 5% discount, let me check if I can provide an exclusive deal for you. Feel free to share the piece you’re interested in!`
      },
      {
        keywords: ['why buy art?', 'what is the value of art?', 'why invest in art?'],
        response: () => 
          `Art isn’t just decoration—it’s an investment in creativity, culture, and timeless beauty. Owning original art adds personality to your space and supports talented artists. Every piece tells a unique story that’s worth sharing!`
      },
      {
        keywords: ['payment methods', 'how can I pay', 'what payments are accepted', 'accepted payment modes'],
        response: () => 
          `We accept multiple payment methods for your convenience, including Credit/Debit Cards, Net Banking, UPI (Google Pay, PhonePe, etc.), and Wallets (Paytm, Amazon Pay). For international customers, we also accept PayPal. Let us know if you need help with payment!`
      },
      {
        keywords: ['customer care service', 'how quick is support', 'customer support', 'help service'],
        response: () => 
          `Our customer care team is here to assist you with any queries or concerns. We typically respond within 24 hours, ensuring your questions are answered promptly. For urgent issues, feel free to contact us directly via email or phone!`
      },
      {
        keywords: ['what is Art Gallery', 'what does this platform do', 'about Art Gallery'],
        response: () => 
          `Art Gallery is an online platform where you can explore, purchase, and sell unique pieces of art. We provide a space for artists to showcase their creations and for art enthusiasts to find something special.`
      },
      {
        keywords: ['is Art Gallery only for paintings', 'what type of art is available', 'art types on the platform'],
        response: () => 
          `Art Gallery offers a wide range of art forms, including paintings, sculptures, digital art, photography, and limited-edition prints. We aim to cater to all art lovers!`
      },
      {
        keywords: ['can I sell my art here', 'how to sell art', 'artist registration'],
        response: () => 
          `Yes, you can sell your art on Art Gallery! Simply register as an artist on our platform, upload your artwork details, and start selling to art lovers worldwide.`
      },
      {
        keywords: ['is Art Gallery available worldwide', 'international delivery', 'global service'],
        response: () => 
          `Yes, Art Gallery serves customers globally! We deliver artwork internationally, making it accessible for everyone to enjoy and own a piece of art.`
      },
      {
        keywords: ['does Art Gallery feature local artists', 'support local artists', 'art from local creators'],
        response: () => 
          `We take pride in featuring art from local and independent artists, providing them a platform to showcase their talent and connect with a global audience.`
      },
      {
        keywords: ['is there a payment plan', 'can I pay in installments', 'payment options'],
        response: () => 
          `We offer flexible payment plans for select artworks. Contact us to know if your desired piece is eligible for an installment plan.`
      },
      {
        keywords: ['are prices negotiable', 'discounts on art', 'price negotiation'],
        response: () => 
          `Prices for most artworks are fixed, but some artists may consider reasonable offers. Use the "Request a Discount" feature where applicable.`
      },
      {
        keywords: ['hidden charges', 'any extra fees', 'taxes or fees'],
        response: () => 
          `No hidden charges! The price shown includes applicable taxes. Delivery charges, if any, are calculated at checkout based on your location.`
      },
      {
        keywords: ['is there a return policy', 'can I return art', 'refund policy'],
        response: () => 
          `We offer a return policy for damaged or incorrect items. Refunds are processed after verification. Contact our support team within 7 days of delivery.`
      },
      {
        keywords: ['is there a gift card', 'can I buy gift cards', 'art gift card'],
        response: () => 
          `Yes, Art Gallery offers gift cards! They're perfect for gifting art lovers the freedom to choose their favorite pieces.`
      },
      {
        keywords: ['how long does delivery take', 'delivery time', 'shipping duration'],
        response: () => 
          `Delivery times depend on your location and the type of artwork. Domestic deliveries typically take 5-7 business days, while international deliveries may take 10-15 business days.`
      },
      {
        keywords: ['how is art packed', 'packaging quality', 'safe delivery'],
        response: () => 
          `We take utmost care in packaging to ensure your art arrives safely. Each piece is securely packed with protective layers to prevent damage during transit.`
      },
      {
        keywords: ['can I track my order', 'order tracking', 'where is my order'],
        response: () => 
          `Yes, you can track your order using the tracking link provided in your confirmation email. Reach out to support if you need assistance!`
      },
      {
        keywords: ['do you ship fragile items', 'is shipping safe', 'handling fragile art'],
        response: () => 
          `Absolutely! We specialize in handling fragile items, ensuring every piece is delivered in perfect condition, no matter where you are.`
      },
      {
        keywords: ['do you offer free shipping', 'free delivery', 'no shipping charges'],
        response: () => 
          `We offer free shipping on select items or during promotional periods. Check the product page or our offers section for details.`
      },
      {
        keywords: ['can I request custom art', 'custom artwork', 'personalized art'],
        response: () => 
          `Yes, many of our artists accept commissions for custom artwork. Use the "Request Custom Art" option to share your requirements.`
      },
      {
        keywords: ['are artworks original', 'authenticity of art', 'real art'],
        response: () => 
          `All artworks on Art Gallery are 100% original and sourced directly from the artists. Certificates of authenticity are provided where applicable.`
      },
      {
        keywords: ['can I buy digital art', 'is digital art available', 'downloadable art'],
        response: () => 
          `Yes, we offer digital art that can be downloaded instantly after purchase. Check the product description for details.`
      },
      {
        keywords: ['what are limited editions', 'limited-edition art', 'rare artworks'],
        response: () => 
          `Limited-edition art refers to a set number of prints or replicas of an original artwork. These are numbered and often signed by the artist.`
      },
      {
        keywords: ['do you feature emerging artists', 'new artists', 'fresh talent'],
        response: () => 
          `Yes, we actively support and feature emerging artists, giving them a platform to showcase their talent to a global audience.`
      },
      {
        keywords: ['do you have a mobile app', 'is there an app', 'Art Gallery app'],
        response: () => 
          `Yes, we have a mobile app available for both iOS and Android, making it easy to explore and buy art on the go!`
      },
      {
        keywords: ['can I save favorites', 'wishlist feature', 'save artworks'],
        response: () => 
          `Yes, you can save your favorite artworks to your wishlist by clicking the "Add to Wishlist" button on the product page.`
      },
      {
        keywords: ['do you have exhibitions', 'virtual art exhibitions', 'art events'],
        response: () => 
          `We host virtual art exhibitions and events regularly. Stay updated by subscribing to our newsletter or following us on social media!`
      },
      {
        keywords: ['is there a loyalty program', 'rewards for buyers', 'art loyalty points'],
        response: () => 
          `Yes, we have a loyalty program where you earn points on every purchase. Redeem these points for discounts on future purchases.`
      },
      {
        keywords: ['can I get art framed', 'framing options', 'frame my art'],
        response: () => 
          `We offer professional framing services for select artworks. Choose your preferred framing option during checkout.`
      },
      {
        keywords: ['can seller send artwork images', 'image', 'can I see images in chat', 'artwork preview in chat'],
        response: () => 
          `Yes, sellers can share images of their artwork in the chat to provide you with a closer look or additional details.`
      },
      {
        keywords: ['is sharing images allowed in chat', 'can seller show more details', 'artwork images in chat'],
        response: () => 
          `Sharing images in chat is allowed on Art Gallery. Sellers can upload detailed pictures of their artwork upon request.`
      },
      {
        keywords: ['can I ask for artwork close-up', 'zoomed artwork in chat', 'detailed images of art'],
        response: () => 
          `Absolutely! You can request the seller to share close-up or detailed images of the artwork in the chat for better clarity.`
      },
      {
        keywords: ['is image sharing secure', 'are chat images private', 'secure image sharing'],
        response: () => 
          `Yes, all images shared in the chat are secure and private, ensuring that your communication with the seller remains confidential.`
      },
      {
        keywords: ['can seller share work in progress', 'unfinished art images', 'art process images'],
        response: () => 
          `Sellers can share images of their work in progress if requested. This is especially useful for custom or commissioned artwork.`
      },
      {
        keywords: ['how to request artwork images', 'ask seller for images', 'image request process'],
        response: () => 
          `To request artwork images, simply use the chat feature on the product page and ask the seller to upload the desired images.`
      },
      {
        keywords: ['can I see different angles of artwork', 'multiple angles of art', 'art image views'],
        response: () => 
          `Yes, you can ask the seller to share images of the artwork from different angles to get a better understanding of its dimensions and details.`
      },
      {
        keywords: ['are images in chat high-quality', 'quality of shared images', 'image resolution in chat'],
        response: () => 
          `The quality of images shared in the chat depends on the seller. We recommend asking for high-resolution images for a clearer view.`
      },
      {
        keywords: ['is video sharing allowed in chat', 'can seller share video of art', 'artwork video in chat'],
        response: () => 
          `Currently, video sharing in chat is not supported. However, sellers can provide additional images or links to videos if necessary.`
      },
      {
        keywords: ['can I request dimensions in images', 'size reference in images', 'art size comparison'],
        response: () => 
          `Yes, you can ask the seller to include size references, such as placing the artwork next to a common object, to better understand its dimensions.`
      },
      {
        keywords: ['can I see draft of custom art', 'custom artwork images in chat', 'preview of commissioned art'],
        response: () => 
          `For custom or commissioned artwork, sellers can share drafts or progress images in the chat to ensure the artwork meets your expectations.`
      },
      {
        keywords: ['can I approve artwork in chat', 'approval for custom art', 'custom artwork preview'],
        response: () => 
          `Yes, sellers can share images of custom artwork for your approval before finalizing the piece. Use the chat feature to review and confirm.`
      },
      {
        keywords: ['what if artwork doesn’t match images', 'images don’t match delivered art', 'image vs delivered art issue'],
        response: () => 
          `If the delivered artwork significantly differs from the images shared in the chat, please contact our customer support for assistance.`
      },
      {
        keywords: ['can I get image updates on progress', 'progress updates in chat', 'work-in-progress images'],
        response: () => 
          `You can request the seller to share progress images of custom artwork at different stages to stay updated on its creation.`
      },
      {
        keywords: ['how many images can seller send', 'limit on shared images', 'image sharing limit in chat'],
        response: () => 
          `There is no specific limit to the number of images a seller can share in the chat. You can request as many as needed to make an informed decision.`
      },
      {
        keywords: ['are images authentic', 'genuine artwork images', 'seller sending fake images'],
        response: () => 
          `Art Gallery ensures that sellers share authentic images of their artwork. If you suspect otherwise, please report the seller to our support team.`
      },
      {
        keywords: ['can seller edit images', 'are images photoshopped', 'edited images of art'],
        response: () => 
          `We recommend sellers share unedited images of their artwork. If you have concerns about image authenticity, feel free to ask the seller for additional details or contact support.`
      },
      {
        keywords: ['can seller show certificate in chat', 'authenticity certificate image', 'proof of artwork authenticity'],
        response: () => 
          `Yes, sellers can share images of authenticity certificates or related documents in the chat for your assurance.`
      },
      {
        keywords: ['what if seller refuses to share images', 'seller not sharing artwork images', 'no response from seller'],
        response: () => 
          `If the seller refuses to share images or does not respond, please report the issue to our customer care team for further assistance.`
      },
      {
        keywords: ['can seller share framed artwork', 'framed art images', 'art with frame preview'],
        response: () => 
          `Sellers can share images of the artwork with or without a frame upon request, allowing you to choose your preferred option.`
      },
      {
        keywords: ['can I request additional details', 'more artwork details in chat', 'extra information in chat'],
        response: () => 
          `Yes, you can request sellers to share additional details or close-up images of specific parts of the artwork for a better understanding.`
      },
      {
        keywords: ['does chat allow image downloads', 'download images from chat', 'save artwork images'],
        response: () => 
          `Currently, images shared in chat are view-only and cannot be downloaded directly. You can request sellers to email images if necessary.`
      },
      {
        keywords: ['can I verify image authenticity', 'image verification', 'image validation'],
        response: () => 
          `If you need to verify the authenticity of shared images, ask for certificates or additional documentation in the chat.`
      },
      {
        keywords: ['how do I report suspicious images', 'fake artwork images', 'reporting image issues'],
        response: () => 
          `To report suspicious or fake artwork images shared in chat, use the "Report Seller" option or contact our customer support team immediately.`
      },
      {
        keywords: ['can seller share packaging images', 'art packaging preview', 'packing process images'],
        response: () => 
          `Yes, sellers can share images of how the artwork will be packaged to assure you of safe and secure delivery.`
      },                                                
  ];
  
  export const defaultResponse = () => `Thank you for your interest in this artwork. Please share any specific details or questions you have. I'm happy to assist you!`;
  
  export const generateSellerResponse = (userMessage, artworkId) => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    for (let item of chatResponses) {
      if (item.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        return item.response(artworkId);
      }
    }
    
    return defaultResponse();
  };
  
  
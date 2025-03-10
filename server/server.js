const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt
const users = require('./models/users');
const artists = require('./models/artists')
const artistjson = require('./artistsjson.json')
const artworks = require('./models/artworks');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Register endpoint
app.post('/register', async (req, res) => {
    const { formData } = req.body;

    if (!formData) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    const { fullName, email, password, gender } = formData;
    const { isArtist } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.json("Email already in use");
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save a new user with the hashed password
        const newUser = new users({
            fullName,
            email,
            password: hashedPassword, // Save the hashed password
            gender,
            isArtist
        });

        const savedUser = await newUser.save();

        // Respond with success message and user details (excluding sensitive info like password)
        res.status(201).json({
            message: "User Registered",
            user: {
                id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                gender: savedUser.gender,
                isArtist: savedUser.isArtist
            },
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

app.post('/login', async (req, res) => {
    const { formData } = req.body;

    if (!formData) {
        return res.json("Invalid request data");
    }

    const { email, password } = formData;

    try {
        // Find the user by email
        const userData = await users.findOne({ email: email });
        if (!userData) {
            return res.json("User not found");
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.json("Invalid email or password");
        }

        // Login successful
        const isArtist = userData.isArtist;
        res.json({message:"success",isArtist:isArtist});
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

app.get('/fetchArtworks', async (req, res) => {
    try {
      const artData = await artworks.find({}); // Make sure to use the correct model name (capitalized 'Artwork')
      
      if (artData && artData.length > 0) {
        console.log(artData.id);
        
        return res.json(artData);
      }
  
      return res.status(404).json({ message: 'No artworks found' }); // Return a message if no artworks are found
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' }); // Handle the error properly
    }
  });
  

// Start server
app.listen(3001, () => {
    console.log("Server running on port 3001");
});

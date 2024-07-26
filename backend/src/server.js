
require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const connectDB = require('./connect');
const User = require('./models/User'); // Import Mongoose User model
const Candidate = require('./models/Candidate'); // Import Mongoose Candidate model
const Vote = require('./models/Vote'); // Import Mongoose Vote model
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.get('/test', async (req, res) => {
    try {
        const users = await User.find({});
        console.log('Found documents =>', users);
        res.send(users);
    } catch (err) {
        console.log(err);
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        console.log("username", username);
        console.log("email", email);
        console.log("password", password);
        console.log("role", role);

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const isCandidate = role === 'candidate';
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role,
            isCandidate
        });

        await user.save(); // Save the user document
        console.log('User registered:', user);
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }
        console.log("user._id",user._id);
        

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid password');
        }
        res.status
        res.status(200).send({ message: 'Login successful', userId: user._id , isCandidate: user.isCandidate});
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
});

app.post('/candidates', async (req, res) => {
    try {
        const candidate = new Candidate({
            name: req.body.name
        });

        await candidate.save();
        console.log('Candidate added:', candidate);
        res.status(201).send('Candidate added successfully');
    } catch (error) {
        console.error('Error adding candidate:', error);
        res.status(500).send('Error adding candidate');
    }
});

app.get('/candidates', async (req, res) => {
    try {
        const candidates = await User.find({isCandidate:'true'});
        console.log("candidates",candidates);
        res.status(200).json(candidates);
    } catch (error) {
        console.error('Error fetching candidates:', error);
        res.status(500).send('Error fetching candidates');
    }
});

app.post('/vote', async (req, res) => {
    try {
        const { userId, candidateId } = req.body;
     
        // Check if user exists and has not voted yet
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).send('User not found');
        }
        if (user.hasVoted) {
            return res.status(400).send('You have already voted');
        }

        // Check if candidate exists
        const candidate = await User.findById(candidateId);
        if (!candidate) {
            return res.status(400).send('Candidate not found');
        }

        // Create a Vote document
        const vote = new Vote({ userId, candidateId });
        await vote.save();

        // Update candidate vote count
        candidate.voteCount = (candidate.voteCount || 0) + 1;
        await candidate.save();

        // Update user hasVoted status
        user.hasVoted = true;
        await user.save();

        res.status(200).send('Vote cast successfully');
    } catch (error) {
        console.error('Error casting vote:', error);
        res.status(500).send('Error casting vote');
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('winston');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Winston logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
});

// Morgan setup to use Winston for logging HTTP requests
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

mongoose.connect('mongodb://localhost:27017');

const pollSchema = new mongoose.Schema({
    question: String,
    answerA: String,
    answerB: String,
    VoteA: { type: Number, default: 0 },
    VoteB: { type: Number, default: 0 }
});

const Poll = mongoose.model('Poll', pollSchema);

app.use(bodyParser.json());
app.use(cors());

app.get('/polls', async(req, res) => {
    try {
        const polls = await Poll.find();
        res.json(polls);
        logger.info('Successfully retrieved polls');
    } catch (error) {
        logger.error('Error retrieving polls: ' + error.message);
        res.status(500).json({ message: error.message });
    }
});

app.post('/polls', async(req, res) => {
    try {
        const poll = new Poll(req.body);
        await poll.save();
        res.status(201).json(poll);
        logger.info('Poll created successfully');
    } catch (error) {
        logger.error('Error creating poll: ' + error.message);
        res.status(400).json({ message: error.message });
    }
});

app.delete('/polls/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const poll = await Poll.findByIdAndDelete(id);
        if (!poll) {
            logger.warn(`Poll not found: ${id}`);
            return res.status(404).json({ message: 'Poll not found' });
        }
        res.json({ message: 'Poll deleted successfully' });
        logger.info(`Poll deleted successfully: ${id}`);
    } catch (error) {
        logger.error('Error deleting poll: ' + error.message);
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    logger.info(`Poll Service running on port ${PORT}`);
    console.log(`Poll Service running on port ${PORT}`);
});
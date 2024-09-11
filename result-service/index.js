const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('winston');
const app = express();
const PORT = 3003;

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

app.get('/results', async(req, res) => {
    try {
        const polls = await Poll.find();
        res.json(polls);
        logger.info('Successfully retrieved results');
    } catch (error) {
        logger.error('Error retrieving results: ' + error.message);
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    logger.info(`Result Service running on port ${PORT}`);
    console.log(`Result Service running on port ${PORT}`);
});
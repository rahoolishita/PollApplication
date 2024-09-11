const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('winston');
const cors = require('cors');
const app = express();
const PORT = 3002;

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

app.post('/vote', async(req, res) => {
    const { pollId, vote } = req.body;
    try {
        const poll = await Poll.findById(pollId);
        if (!poll) {
            logger.warn(`Poll not found: ${pollId}`);
            return res.status(404).json({ message: 'Poll not found' });
        }
        if (vote === 'a') {
            poll.VoteA++;
        } else if (vote === 'b') {
            poll.VoteB++;
        }
        await poll.save();
        res.json(poll);
        logger.info(`Vote recorded successfully for poll ${pollId}`);
    } catch (error) {
        logger.error('Error recording vote: ' + error.message);
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    logger.info(`Vote Service running on port ${PORT}`);
    console.log(`Vote Service running on port ${PORT}`);
});
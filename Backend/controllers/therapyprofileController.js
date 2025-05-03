const prisma = require('../db/db');
const logger = require("../logger/logger");
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');


// Create a TherapistProfile for a user (therapist)
const createTherapistProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { specialization } = req.body;

        // Check if the therapist profile already exists for this user
        const existingProfile = await prisma.therapistProfile.findUnique({
            where: { userId }
        });

        if (existingProfile) {
            logger.error("Therapist profile already exists for this user");
            return res.status(400).json({ error: "Therapist profile already exists for this user" });
        }

        const therapistProfile = await prisma.therapistProfile.create({
            data: {
                userId,
                specialization,
            },
        });

        logger.info("Therapist profile created");
        res.status(201).json({ message: "Therapist profile created", therapistProfile });
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all therapist profiles

const getAllTherapistProfiles = async (req, res) => {
    try {
        const therapistProfiles = await prisma.therapistProfile.findMany({
            include: { availableSlots: true } // Optionally include available slots
        });

        logger.info("Therapist profiles retrieved");
        res.status(200).json({ therapistProfiles });
    }
    catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get therapist profile for the current user
const getTherapistProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const therapistProfile = await prisma.therapistProfile.findUnique({
            where: { userId },
            include: { availableSlots: true } // Optionally include available slots
        });

        if (!therapistProfile) {
            logger.error("Therapist profile not found");
            return res.status(404).json({ error: "Therapist profile not found" });
        }

        logger.info("Therapist profile retrieved");
        res.status(200).json({ therapistProfile });
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a therapist's profile (specialization or ratings)
const updateTherapistProfile = async (req, res) => {
    try {
        const userId = req.userId;
        
        const { specialization, ratings } = req.body;
        

        const updatedProfile = await prisma.therapistProfile.update({
            where: {
                userId,
            },
            data: {
                specialization,
                ratings: ratings ? parseFloat(ratings) : undefined, // Optional ratings update
            },
        });

        logger.info("Therapist profile updated");
        res.status(200).json({ message: "Therapist profile updated", updatedProfile });
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateTherapistProfilebyUser = async (req, res) => {
    try {
        
        const { specialization, ratings, id } = req.body;
        

        const updatedProfile = await prisma.therapistProfile.update({
            where: {
                id,
            },
            data: {
                specialization,
                ratings: ratings ? parseFloat(ratings) : undefined, // Optional ratings update
            },
        });

        logger.info("Therapist profile updated");
        res.status(200).json({ message: "Therapist profile updated", updatedProfile });
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete therapist profile for a user
const deleteTherapistProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const deletedProfile = await prisma.therapistProfile.delete({
            where: {
                userId,
            },
        });

        logger.info("Therapist profile deleted");
        res.status(200).json({ message: "Therapist profile deleted", deletedProfile });
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Function to handle AI chat interactions
async function runChat(userInput) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1000,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
                role: "user",
                parts: [{ 
                    text: "You are a compassionate therapy assistant named Feelix. Your role is to listen attentively, provide mental and emotional support, and offer practical suggestions where possible. Use an empathetic tone, show genuine care, and encourage the user to express themselves openly. When responding, use conversational language that makes the user feel supported and understood. Avoid making statements like 'I am an AI' or 'I can’t do that.' When appropriate, offer gentle suggestions to help the user work through their thoughts or emotions, validate their feelings, and encourage them to prioritize self-care." 
                }],
            },
            {
                role: "model",
                parts: [{ text: "Hello! I'm Feelix, here to support you. What’s on your mind today?" }],
            },
            {
                role: "user",
                parts: [{ text: "I'm feeling overwhelmed with everything going on in my life." }],
            },
            {
                role: "model",
                parts: [{ text: "I'm here for you. It sounds like things are really challenging right now, and it's completely okay to feel this way. Would you like to share more about what's been overwhelming for you? Sometimes talking through things can help." }],
            },
        ],
        
    });

    const result = await chat.sendMessage(userInput);
    return result.response.text();
}

const chatHandler = async (req, res) => {
    try {
        const userInput = req.body?.userInput;
        
        if (!userInput) {
            logger.error('Invalid request body for /chat endpoint');
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const response = await runChat(userInput);
        
        logger.info('Chat interaction processed successfully');
        res.json({ response });
    } catch (error) {
        logger.error(`Error in /chat endpoint: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createTherapistProfile, getAllTherapistProfiles, getTherapistProfile, updateTherapistProfile, deleteTherapistProfile, chatHandler, updateTherapistProfilebyUser };

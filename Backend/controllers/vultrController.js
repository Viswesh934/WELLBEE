const axios = require('axios');
const logger = require('../logger/logger');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const wellbeeContext = `
# Wellbee: Health & Wellness Platform

## Overview
Wellbee is a comprehensive health and wellness platform that supports both physical and mental well - being through personalized features and professional support.

## Main Features

### 1. Personal Coaching
    - Input height and weight
        - Receive customized exercise recommendations
            - Get personalized diet tips
                - Track progress over time

### 2. Anonymous Group Chat
    - Join mental health discussions anonymously
        - Real - time sentiment analysis of conversations
            - View emotional tone scores
                - Connect with others facing similar challenges

### 3. Mood Meter
    - Automated mood detection
        - Personalized music recommendations
            - Curated playlists based on emotional state
                - Save favorite songs for quick access

### 4. Professional Therapy
    - Schedule consultation sessions
        - Connect with licensed therapists
            - Access professional mental health support
                - Manage appointments

## Website Navigation

### Home Page
    - Platform overview
        - Login / Register options
            - Featured wellness tips
                - Quick access to all main features

### Coaching Dashboard
    - Personal metrics input
        - Exercise recommendations
            - Diet planning
                - Progress tracking

### Group Chat
    - Anonymous chat interface
        - Sentiment analysis display
            - Community guidelines
                - Topic - based chat rooms

### Mood Meter
    - Current mood display
        - Music player
            - Playlist management
                - Mood history tracking

### Therapy Portal
    - Therapist profiles
        - Appointment scheduling
            - Session history
                - Resource library

### User Profile
    - Personal information
        - Preferences settings
            - Progress analytics
                - Account management

## Key User Flows

1. Physical Wellness
    - Home → Coaching Dashboard → Input Metrics → View Recommendations

2. Mental Health Support
    - Home → Group Chat → Join Discussion → View Sentiment Analysis

3. Mood Management
    - Home → Mood Meter → Select Mood → Play Music

4. Professional Help
    - Home → Therapy Portal → Browse Therapists → Schedule Session
`;

async function runChat(userInput) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const generationConfig = {
        temperature: 0.8,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 512,
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
                    text: `You are a helpful assistant for the Wellbee health and wellness platform. 
                    Use this context to inform your responses: ${wellbeeContext}
                    
                    Please provide helpful, relevant responses based on Wellbee's features and capabilities.
                    If questions are not related to Wellbee or health/wellness, politely redirect the conversation 
                    to Wellbee's services.` 
                }],
            },
            {
                role: "model",
                parts: [{ text: "I understand Wellbee's features and services. I'm here to help users with their health and wellness needs through the platform. How can I assist you today?" }],
            },
        ],
    });

    const result = await chat.sendMessage(userInput);
    return result.response.text();
}

exports.getVultrChatResponse = async (req, res) => {
    try {
        const userInput = req.body?.userInput;
        
        if (!userInput) {
            logger.error('Invalid request body for chat endpoint');
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const response = await runChat(userInput);
        
        logger.info('Gemini API response generated successfully');
        res.json({ botMessage: response });
    } catch (error) {
        logger.error(`An error occurred while fetching response from Gemini API: ${error.message}`);
        res.status(500).json({ error: 'An error occurred while fetching response from Gemini API.' });
    }
};

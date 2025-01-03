# Well Bee - Health & Well-being Platform 🐝

Well Bee is a comprehensive health and well-being platform designed to support and foster a healthy environment for users. The platform combines mental health support, physical wellness tracking, and personalized recommendations to provide a holistic approach to well-being.
Live link : https://wellbee-jade.vercel.app/

Demo login: sigireddyviswesh@gmail.com pass:1234

![Screenshot 2024-11-05 131110](https://github.com/user-attachments/assets/7adc583a-edfd-4724-80c9-241d0373be9e)


## 🌟 Features

### 🧘 Mental Health Support
- **Anonymous Chat**: Connect with others worldwide while maintaining privacy
- **Mood Meter**: Get song recommendations based on sentiment analysis of your chat messages
- **Professional Therapy**: Access both AI-assisted and human therapist consultations
- **Appointment Management**: Schedule and manage therapy sessions seamlessly

### 💪 Physical Wellness
- **Health Metrics Tracking**: Monitor vital statistics and daily activities
- **Fitbit Integration**: Sync your Fitbit data for comprehensive health monitoring
- **Exercise Recommendations**: Receive personalized exercise tips based on your BMI
- **Dietary Guidance**: Get customized nutrition advice and dietary tips

### 🎵 Mood-Based Music
- **Spotify Integration**: Receive music recommendations based on your emotional state
- **Sentiment Analysis**: Advanced emotion detection for personalized music suggestions

### 🤖 Smart Assistance
- **Vultr Assistant**: AI-powered guide to help navigate platform features
- **Personalized Recommendations**: Get tailored health and wellness suggestions

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Material UI
- Framer Motion
- Socket.io Client

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Socket.io

### Microservices
- FastAPI (Emotion Detection Service)
- Docker & Docker Compose

### Cloud Services
- Vultr Cloud Platform
- AWS S3 (Image Storage)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.9+ (for FastAPI microservice)
- Docker & Docker Compose
- PostgreSQL
- npm or yarn

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/well-bee.git
cd well-bee
```

2. Set up environment variables:
```bash
# Create .env files in both frontend and backend directories
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

3. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# FastAPI Microservice
cd ../emotion-service
pip install -r requirements.txt
```

### Running the Application

#### Using Docker (Recommended)
```bash
# From the root directory
docker-compose up
```

#### Manual Setup

1. Start the Backend:
```bash
cd backend
npm run dev
```

2. Start the Frontend:
```bash
cd frontend
npm run dev
```

3. Start the Emotion Detection Service:
```bash
cd emotion-service
uvicorn main:app --reload
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Emotion Service: http://localhost:8000

## 📝 API Documentation

API documentation is available through Swagger UI:
- Backend API: http://localhost:3000/api-docs
- Emotion Service: http://localhost:8000/docs

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- [Gyanavardhan](https://github.com/gyanavardhana) - Full stack and devops engineer
- [Viswesh](https://github.com/Viswesh934) - Full stack and devops engineer
- [Prem Kumar](https://github.com/Manchina) - Devops engineer

## 🙏 Acknowledgments
- Vultr Cloud Platform for hosting and infrastructure support
- All our contributors and early adopters

---

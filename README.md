# SkillSense HR Dashboard

AI-Powered Candidate Matching Dashboard built with React and TypeScript. Match candidates to job descriptions using GPT-4o for intelligent hiring decisions.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

- **AI-Powered Matching**: Uses OpenAI GPT-4o to analyze candidates against job descriptions
- **Detailed Analysis**: Get match scores (0-100), key strengths, concerns, and skill gaps for each candidate
- **Smart Recommendations**: Hiring recommendations (Highly Recommended/Recommended/Maybe/Not Recommended)
- **Comprehensive Profiles**: View detailed candidate information including CV data, GitHub analysis, web presence, and Stack Overflow expertise
- **Admin Authentication**: Secure access with JWT-based authentication
- **Responsive UI**: Clean, professional interface built with custom CSS utilities

## 📋 Prerequisites

- Node.js 16+ and npm
- Backend API running (SkillSense Backend)
- Admin credentials

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/K1ta141k/skillsense-hr.git
cd skillsense-hr

# Install dependencies
npm install

# Create .env file
echo "PORT=3000" > .env
echo "REACT_APP_API_URL=http://localhost:8000/api/v1" >> .env

# Start the development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
REACT_APP_API_URL=http://localhost:8000/api/v1
```

## 📖 Usage

### 1. Login
- Navigate to `http://localhost:3000`
- Login with admin credentials (default: `admin@skillsense.com` / `admin123`)

### 2. Match Candidates
- Paste a job description (minimum 50 characters)
- Click "Find Best Candidates"
- Wait for AI analysis to complete

### 3. Review Results
- View ranked candidates with match scores
- Expand cards to see detailed analysis
- Click "Show More" for complete breakdowns
- View full profiles for comprehensive candidate data

## 🏗️ Project Structure

```
skillsense-hr/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Layout.tsx   # Main layout with header/footer
│   │   └── ProtectedRoute.tsx  # Authentication guard
│   ├── context/         # React Context providers
│   │   └── AuthContext.tsx     # Authentication state
│   ├── pages/           # Page components
│   │   ├── Login.tsx            # Login page
│   │   ├── Dashboard.tsx        # Job description input
│   │   ├── Results.tsx          # Match results display
│   │   └── CandidateProfile.tsx # Individual candidate view
│   ├── utils/           # Utility functions
│   │   └── api.ts       # API client and endpoints
│   ├── App.tsx          # Main app component with routing
│   └── index.tsx        # App entry point
├── .env                 # Environment variables (not committed)
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🔌 API Integration

The app integrates with the SkillSense Backend API:

- **GET** `/api/v1/hr/candidates` - Fetch all candidates
- **GET** `/api/v1/hr/candidates/:id` - Get candidate profile
- **POST** `/api/v1/hr/match-candidates` - AI-powered matching
- **GET** `/api/v1/hr/summary` - Candidate statistics

## 🎨 UI Components

### Dashboard
- Job description input with character counter
- Clear and submit buttons
- "How it works" section

### Results Page
- Ranked candidate list
- Expandable candidate cards
- Match scores and recommendations
- Key strengths and concerns
- Links to GitHub, LinkedIn, and full profiles

### Candidate Profile
- Comprehensive candidate data
- Professional summary
- Technical skills breakdown
- Work history and education
- GitHub activity metrics
- Stack Overflow reputation
- Strengths and growth areas

## 🔐 Authentication

The app uses JWT-based authentication:
- Tokens stored in `localStorage` as `hr_token`
- Automatic token validation on app load
- Admin role required for access
- Auto-redirect to login on 401 errors

## 📱 Responsive Design

Built with mobile-first approach using custom CSS utility classes (Tailwind-style):
- Responsive grid layouts
- Mobile-friendly navigation
- Adaptive card designs

## 🧪 Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Powered by [OpenAI GPT-4o](https://openai.com/)
- Backend API: SkillSense Backend (FastAPI)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**🤖 Generated with [Claude Code](https://claude.com/claude-code)**

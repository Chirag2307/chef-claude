# Chef Claude Setup Guide

## Required API Keys

### 1. Hugging Face API Token (Required)
The application currently uses Hugging Face's inference API for recipe generation.

**How to get your API token:**
1. Go to [Hugging Face Settings](https://huggingface.co/settings/tokens)
2. Sign in or create an account
3. Click "New token"
4. Give it a name (e.g., "Chef Claude")
5. Select "Read" permissions
6. Copy the generated token

**Environment Variables Needed:**
- `HF_ACCESS_TOKEN` - Your Hugging Face access token
- `HF_TOKEN` - Same token (used by different parts of the code)

### 2. Anthropic Claude API Key (Optional)
Currently commented out but available for use with Claude-3-Haiku model.

**How to get your API key:**
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign in or create an account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the generated key

**Environment Variable:**
- `ANTHROPIC_API_KEY` - Your Anthropic API key

## Setup Instructions

### Step 1: Install Dependencies
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Configure Environment Variables
Create a `.env` file in the `backend` directory:

```env
# Hugging Face API Configuration
HF_ACCESS_TOKEN=your_huggingface_access_token_here
HF_TOKEN=your_huggingface_token_here

# Optional: Anthropic Claude API
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Step 3: Start the Backend
```bash
cd backend
node index.js
```

You should see: `✅ Backend running on port 5000`

### Step 4: Start the Frontend
In a new terminal:
```bash
npm run dev
```

The application should be available at `http://localhost:5173`

## Troubleshooting

### Common Issues:

1. **"Failed to fetch recipe" error**
   - Check that your Hugging Face API token is valid
   - Ensure the backend is running on port 5000
   - Verify the token has proper permissions

2. **Backend won't start**
   - Make sure all dependencies are installed
   - Check that the `.env` file exists in the backend directory
   - Verify the API tokens are correctly set

3. **CORS errors**
   - The backend includes CORS configuration, but if you're still getting errors, check that the frontend is making requests to the correct backend URL

## Security Notes

⚠️ **Important Security Warnings:**
- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore` to prevent accidental commits
- For production deployment, use environment variables on your hosting platform
- Consider using a backend proxy to keep API keys secure in production

## API Usage

The application uses the following AI models:
- **DeepSeek-V3-0324** (via Hugging Face) - Currently active
- **Claude-3-Haiku** (via Anthropic) - Available but commented out

Both models are configured to generate recipes based on provided ingredients. 
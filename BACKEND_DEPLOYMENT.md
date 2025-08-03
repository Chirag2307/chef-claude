# Backend Deployment Guide for Render

## 🚀 **Deploy Backend to Render**

### **Step 1: Create Web Service**
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**

### **Step 2: Configure Backend Service**
- **Name**: `chef-claude-backend` (or your preferred name)
- **Root Directory**: `backend` (important!)
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### **Step 3: Environment Variables**
Add these in Render dashboard:
```
OPENAI_API_KEY=your_openai_api_key_here
FRONTEND_URL=https://your-frontend-app.onrender.com
```

### **Step 4: Deploy**
- Click **"Create Web Service"**
- Wait for deployment to complete
- Copy the **URL** (e.g., `https://chef-claude-backend.onrender.com`)

### **Step 5: Update Frontend**
In your frontend's environment variables on Render:
```
VITE_API_URL=https://chef-claude-backend.onrender.com
```

## 🔧 **Troubleshooting**

### **Common Issues:**
1. **Port Error**: ✅ Fixed - now uses `process.env.PORT`
2. **Build Error**: ✅ Fixed - added build script
3. **CORS Error**: ✅ Fixed - updated CORS configuration

### **Test Backend:**
```bash
curl https://your-backend-url.onrender.com/health
```

### **Expected Response:**
```json
{"status":"OK"}
```

## 📝 **Important Notes:**
- **Root Directory**: Must be `backend` (not root)
- **Environment Variables**: Set in Render dashboard
- **Frontend URL**: Update after frontend deployment
- **API Key**: Use your actual OpenAI API key

## 🎯 **Next Steps:**
1. Deploy backend first
2. Get backend URL
3. Deploy frontend with backend URL
4. Test the full app! 
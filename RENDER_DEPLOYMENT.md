# Chef Claude - Render Deployment Guide

## Why Render is Perfect for Chef Claude

✅ **All-in-One Platform**: Frontend + Backend in one place  
✅ **Free Tier**: 750 hours/month (perfect for personal projects)  
✅ **Easy Setup**: Connect GitHub, deploy automatically  
✅ **Secure**: Environment variables for API keys  
✅ **Professional**: Custom domains, SSL, monitoring  

## Quick Deployment (5 minutes!)

### Step 1: Prepare Your Repository
Make sure your GitHub repo is ready:
```bash
# Your current structure is perfect:
chef-claude/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── .env (create this locally)
├── components/
├── package.json
└── vite.config.mjs
```

### Step 2: Deploy Backend to Render

1. **Go to [Render.com](https://render.com)** and sign up
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service**:
   - **Name**: `chef-claude-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Plan**: Free

5. **Add Environment Variables**:
   - `HF_ACCESS_TOKEN` = your_huggingface_token
   - `HF_TOKEN` = your_huggingface_token
   - `ANTHROPIC_API_KEY` = your_anthropic_key (optional)
   - `NODE_ENV` = production

6. **Click "Create Web Service"**

### Step 3: Deploy Frontend to Render

1. **Click "New +"** → **"Static Site"**
2. **Connect the same GitHub repository**
3. **Configure the service**:
   - **Name**: `chef-claude-frontend`
   - **Root Directory**: `/` (leave empty)
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

4. **Add Environment Variable**:
   - `VITE_API_URL` = `https://your-backend-name.onrender.com`

5. **Click "Create Static Site"**

### Step 4: Update Your Code

#### Update `ai.js` to use environment variable:
```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    try {
        const response = await fetch(`${API_URL}/recipe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients: ingredientsArr }),
        });

        const data = await response.json();
        return data.recipe;
    } catch (err) {
        console.error(err.message);
        return "Failed to fetch recipe";
    }
}
```

#### Update `backend/index.js` CORS:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
```

## Your URLs After Deployment

- **Frontend**: `https://chef-claude-frontend.onrender.com`
- **Backend**: `https://chef-claude-backend.onrender.com`

## Custom Domain Setup

1. **Purchase domain** (Namecheap, GoDaddy, etc.)
2. **In Render dashboard**:
   - Go to your service
   - Click "Settings" → "Custom Domains"
   - Add your domain
3. **Configure DNS**:
   ```
   Type: CNAME
   Name: www
   Value: chef-claude-frontend.onrender.com
   
   Type: CNAME
   Name: api
   Value: chef-claude-backend.onrender.com
   ```

## Monitoring & Maintenance

### Health Check Endpoint
Add to `backend/index.js`:
```javascript
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});
```

### Render Dashboard Features
- **Real-time logs** for debugging
- **Deployment history** and rollbacks
- **Performance metrics**
- **Automatic scaling** (if needed)

## Cost Breakdown

### Free Tier (Perfect for Personal Projects)
- **Backend**: 750 hours/month free
- **Frontend**: Unlimited bandwidth
- **Custom domains**: Included
- **SSL certificates**: Automatic
- **Total cost**: $0

### If You Need More
- **Pro plan**: $7/month (unlimited hours)
- **Team plan**: $19/month (collaboration features)

## Troubleshooting

### Common Issues & Solutions

1. **"Build failed"**
   - Check Node.js version compatibility
   - Verify all dependencies in package.json
   - Check build logs in Render dashboard

2. **"API key not found"**
   - Verify environment variables are set correctly
   - Check variable names match your code
   - Redeploy after adding variables

3. **"CORS errors"**
   - Update CORS configuration in backend
   - Verify frontend URL is correct
   - Check environment variables

4. **"Service not responding"**
   - Check health endpoint: `/health`
   - Review logs in Render dashboard
   - Verify start command is correct

### Render Support
- **Documentation**: https://render.com/docs
- **Community**: https://community.render.com
- **Status**: https://status.render.com

## Advantages Over Other Platforms

| Feature | Render | Vercel + Railway | Heroku |
|---------|--------|------------------|--------|
| **Setup Time** | 5 minutes | 15 minutes | 20 minutes |
| **Cost** | Free | Free | $7/month |
| **Management** | Single dashboard | Two dashboards | Single dashboard |
| **Deployment** | Automatic | Automatic | Manual/CLI |
| **Learning Curve** | Minimal | Medium | Medium |

## Next Steps After Deployment

1. **Test your application** thoroughly
2. **Set up monitoring** and alerts
3. **Configure custom domain** (optional)
4. **Add to your portfolio** with live demo
5. **Share with friends** and get feedback

## Security Checklist

✅ Environment variables set in Render  
✅ API keys not committed to GitHub  
✅ HTTPS enabled automatically  
✅ CORS properly configured  
✅ Health check endpoint added  
✅ Error handling implemented  

Your Chef Claude app will be live and professional in minutes! 🚀 
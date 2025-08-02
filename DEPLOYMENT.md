# Chef Claude Deployment Guide

## Deployment Options

Since your application uses API keys that must be kept secure, here are the best deployment strategies:

## Option 1: Vercel + Railway (Recommended)

### Frontend (Vercel)
- **Platform**: Vercel (free tier available)
- **Best for**: React applications
- **Features**: Automatic deployments, custom domains, SSL

### Backend (Railway)
- **Platform**: Railway (free tier available)
- **Best for**: Node.js applications
- **Features**: Environment variables, automatic deployments

### Steps:
1. **Deploy Backend to Railway**:
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Initialize and deploy
   cd backend
   railway init
   railway up
   ```

2. **Set Environment Variables in Railway**:
   - Go to your Railway project dashboard
   - Navigate to Variables tab
   - Add your API keys:
     - `HF_ACCESS_TOKEN`
     - `HF_TOKEN`
     - `ANTHROPIC_API_KEY` (optional)

3. **Deploy Frontend to Vercel**:
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy
   vercel
   ```

4. **Update Frontend API URL**:
   - Replace `http://localhost:5000` with your Railway backend URL
   - Update the fetch URL in `ai.js`

## Option 2: Render (All-in-One)

### Full Stack Deployment
- **Platform**: Render (free tier available)
- **Features**: Frontend + Backend, environment variables, custom domains

### Steps:
1. **Create Render Account**: https://render.com
2. **Deploy Backend**:
   - Create new Web Service
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && node index.js`
   - Add environment variables

3. **Deploy Frontend**:
   - Create new Static Site
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

## Option 3: Netlify + Render

### Frontend (Netlify)
- **Platform**: Netlify (free tier available)
- **Features**: Git-based deployments, form handling, functions

### Backend (Render)
- Same as Option 2 backend deployment

## Option 4: Heroku (Paid)

### Full Stack Deployment
- **Platform**: Heroku (paid, but reliable)
- **Features**: Easy deployment, add-ons, monitoring

### Steps:
1. **Install Heroku CLI**
2. **Deploy Backend**:
   ```bash
   cd backend
   heroku create your-app-name
   heroku config:set HF_ACCESS_TOKEN=your_token
   heroku config:set HF_TOKEN=your_token
   git push heroku main
   ```

3. **Deploy Frontend**:
   - Use Heroku's static site hosting
   - Or deploy to Vercel/Netlify and connect

## Required Code Changes

### 1. Update API URL in Frontend
In `ai.js`, replace the localhost URL:

```javascript
// Before
const response = await fetch("http://localhost:5000/recipe", {

// After (example for Railway)
const response = await fetch("https://your-app-name.railway.app/recipe", {
```

### 2. Environment Variables for Frontend
Create `.env` in root directory for frontend:

```env
VITE_API_URL=https://your-backend-url.com
```

Then update `ai.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const response = await fetch(`${API_URL}/recipe`, {
```

### 3. CORS Configuration
Update backend CORS settings in `backend/index.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
```

## Environment Variables Setup

### Backend (.env)
```env
HF_ACCESS_TOKEN=your_huggingface_token
HF_TOKEN=your_huggingface_token
ANTHROPIC_API_KEY=your_anthropic_key
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com
```

## Domain and SSL

### Custom Domain Setup
1. **Purchase domain** (Namecheap, GoDaddy, etc.)
2. **Configure DNS** to point to your deployment platform
3. **Enable SSL** (automatic on most platforms)

### Example DNS Configuration
```
Type: CNAME
Name: api
Value: your-app-name.railway.app

Type: CNAME  
Name: www
Value: your-app-name.vercel.app
```

## Monitoring and Maintenance

### Health Checks
Add health check endpoint to backend:

```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
```

### Error Logging
Consider adding logging services:
- **Sentry** for error tracking
- **LogRocket** for user session replay
- **Railway/Heroku logs** for backend monitoring

## Cost Estimation

### Free Tier Options:
- **Vercel**: Free (100GB bandwidth/month)
- **Railway**: Free ($5 credit/month)
- **Render**: Free (750 hours/month)
- **Netlify**: Free (100GB bandwidth/month)

### Paid Options:
- **Heroku**: $7/month (Basic dyno)
- **Railway**: $5/month (Pro plan)
- **Render**: $7/month (Individual plan)

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** on deployment platforms
3. **Enable CORS** properly for production
4. **Use HTTPS** for all API calls
5. **Regular security updates** for dependencies
6. **Monitor API usage** to prevent abuse

## Recommended Deployment Flow

1. **Start with Railway + Vercel** (easiest)
2. **Test thoroughly** in development
3. **Set up monitoring** and logging
4. **Configure custom domain** if needed
5. **Set up CI/CD** for automatic deployments

## Troubleshooting

### Common Issues:
- **CORS errors**: Check origin configuration
- **API key not found**: Verify environment variables
- **Build failures**: Check Node.js version compatibility
- **Domain issues**: Verify DNS configuration

### Support Resources:
- Railway: https://docs.railway.app
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- Heroku: https://devcenter.heroku.com 
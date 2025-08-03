# Frontend Deployment Guide for Render

## 🚀 **Deploy Frontend to Render**

### **Step 1: Create Static Site**
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. **Click "New +"** → **"Static Site"**
3. **Connect your GitHub repository**

### **Step 2: Configure Frontend Service**
- **Name**: `chef-claude-frontend` (or your preferred name)
- **Root Directory**: Leave empty (use root directory)
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

### **Step 3: Environment Variables**
Add these in Render dashboard:
```
VITE_API_URL=https://chef-claude-1wr4.onrender.com
```

### **Step 4: Deploy**
- Click **"Create Static Site"**
- Wait for deployment to complete
- Copy the **URL** (e.g., `https://chef-claude-1.onrender.com`)

## 🔧 **Troubleshooting Common Issues**

### **Issue 1: Build Fails**
**Error**: `npm run build` fails
**Solution**: 
- Check if all dependencies are in `package.json`
- Ensure React version is stable (not RC)
- Verify Vite configuration

### **Issue 2: Environment Variables Not Working**
**Error**: Frontend can't connect to backend
**Solution**:
- Make sure `VITE_API_URL` is set correctly
- Check that backend URL is accessible
- Verify CORS is configured properly

### **Issue 3: 404 Errors**
**Error**: Page not found on refresh
**Solution**: 
- Add `_redirects` file in `public` folder:
```
/*    /index.html   200
```

### **Issue 4: API Calls Fail**
**Error**: CORS errors or network issues
**Solution**:
- Verify backend is running
- Check environment variables
- Test backend health endpoint

## 📝 **Important Notes:**
- **Root Directory**: Use root (not `/frontend`)
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**: Must start with `VITE_` for Vite
- **Backend URL**: Use your actual backend URL

## 🎯 **Testing Steps:**
1. **Deploy frontend**
2. **Test health endpoint**: `https://your-backend-url.onrender.com/health`
3. **Test recipe generation**: Add ingredients and get recipe
4. **Check console** for any errors

## ✅ **Expected Result:**
- Frontend loads without errors
- Can add/remove ingredients
- Can generate recipes
- No CORS errors in console 
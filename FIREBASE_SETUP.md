# Firebase Blog Integration Setup Guide

This guide walks you through setting up Firebase Firestore to power the blog feature.

## Implementation Summary

✅ **Completed:**
- Updated Next.js configuration to support server-side rendering (removed static export)
- Installed Firebase and Firebase Admin SDK dependencies
- Created Firebase client & server configuration files
- Set up blog API routes (`/api/blogs` and `/api/blogs/[id]`)
- Created blog components (BlogCard, BlogList, BlogModal)
- Added blog page at `/blog` route
- Updated navigation to include blog link

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name (e.g., "portfolio-blog")
4. Enable Google Analytics (optional)
5. Click **"Create project"**
6. Wait for Firebase to initialize

## Step 2: Get Firebase Configuration

### For Client-Side (Public Keys)

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Click **"Your apps"** section
3. Click the **"</>Web"** icon to register a web app
4. Follow the setup wizard
5. Copy the Firebase config object - it will look like:

```javascript
const firebaseConfig = {
  apiKey: "xxxxx",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "xxxxx",
  appId: "xxxxx"
};
```

### For Server-Side (Admin Credentials)

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Click **"Service accounts"** tab
3. Select **"Node.js"** as language
4. Click **"Generate a new private key"**
5. A JSON file will download - save it securely
6. Extract these values:
   - `project_id` (string)
   - `client_email` (string)
   - `private_key` (large string with \n characters)

## Step 3: Set Environment Variables

Create a `.env.local` file in the project root with:

```bash
# Firebase Client Configuration (Public - safe to expose)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin Configuration (Server-side only - NEVER expose to client)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIB...\n-----END PRIVATE KEY-----\n"
```

**Important:** Make sure `FIREBASE_PRIVATE_KEY` includes the literal `\n` characters for newlines.

## Step 4: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **"Create Database"**
3. Choose region (select closest to your users)
4. Select **"Start in production mode"** or **"Start in test mode"** (test mode is easier for development)
5. Click **"Create"**

## Step 5: Set Firestore Rules

If you chose **production mode**, update security rules to allow reading:

1. Go to **Firestore > Rules**
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read blogs (unauthenticated)
    match /blogs/{document=**} {
      allow read;
    }
    // Protect writes - only admin can create/update blogs
    match /blogs/{document=**} {
      allow create, update, delete: if false;
    }
  }
}
```

3. Click **"Publish"**

## Step 6: Create Blog Documents

1. In Firestore Console, click **"Create collection"**
2. Name it **"blogs"**
3. Click **"Save"**
4. Click **"Add document"**
5. Set the document ID (e.g., "blog-1") or let Firestore auto-generate
6. Add the following fields:

```
title (string): "Your Blog Title"
content (string): "Your blog content here..."
createdAt (timestamp): Current timestamp
updatedAt (timestamp): Current timestamp
```

Example fields to add:
- **Field:** `title` | **Type:** String | **Value:** "Getting Started with Next.js"
- **Field:** `content` | **Type:** String | **Value:** "Blog post content goes here..."
- **Field:** `createdAt` | **Type:** Timestamp | **Value:** (current date/time)
- **Field:** `updatedAt` | **Type:** Timestamp | **Value:** (current date/time)

7. Click **"Save"**
8. Repeat for more blog posts

## Step 7: Run Your Project

```bash
npm run dev
```

Navigate to `http://localhost:3000/blog` to see your blogs displayed!

## Testing the Integration

1. Navigate to `/blog` in your browser
2. You should see a list of blog posts with titles and previews
3. Click **"Read More"** on any post to open the full content in a modal
4. Close the modal by clicking the X or pressing Escape

## Troubleshooting

### Error: "Service account object must contain a string 'project_id' property"
- Check that `FIREBASE_PROJECT_ID` environment variable is set correctly
- Verify the JSON file values are properly copied

### Error: "Failed to fetch blogs"
- Check browser console for error messages
- Verify Firestore is created and has blog documents
- Check that security rules allow reading

### Error: "Blog not found" when clicking a post
- The blog ID in the URL might not exist in Firestore
- Verify the document ID matches exactly

### Blogs not showing up
- Check that documents are in the `blogs` collection
- Verify `createdAt` field exists and is a timestamp
- Check browser Network tab to see if `/api/blogs` request succeeds

## Adding More Blogs

To add new blogs:

1. Go to Firestore Console
2. Click the **"blogs"** collection
3. Click **"Add document"**
4. Fill in `title`, `content`, `createdAt`, `updatedAt`
5. Click **"Save"**
6. Your new blog will appear on the site within seconds

## Blog Schema Reference

```typescript
interface IBlogPost {
  id: string;              // Auto-generated by Firestore
  title: string;           // Blog post title
  content: string;         // Full blog post content
  createdAt: Date | string; // When the blog was created
  updatedAt: Date | string; // When the blog was last updated
}
```

## Future Enhancements

You can extend the blog with:
- Categories/Tags for filtering
- Author information
- Featured image
- Reading time estimate
- Comment system
- Search functionality

## Security Notes

- ✅ `NEXT_PUBLIC_*` variables are safe - they're public
- 🔒 `FIREBASE_*` variables are secret - NEVER commit to git
- Use `.env.local` which is in `.gitignore`
- Firestore rules ensure only public read access unless you add authentication

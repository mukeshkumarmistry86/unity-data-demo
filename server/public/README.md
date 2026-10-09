# Unity WebGL + Node.js + MongoDB City Data Demo

A full-stack demo where city data is managed via a Node.js admin panel and displayed live in a Unity WebGL build.

## Architecture
- **Backend:** Node.js, Express, MongoDB (Mongoose), Multer (Image Uploads)
- **Frontend (Admin):** HTML, Bootstrap, Vanilla JS
- **Client:** Unity 3D (WebGL), C#, UnityWebRequest

## Project Structure
- `/server` - Node.js API and Admin Panel
- `/unity-webgl` - Compiled Unity WebGL build (not tracked in git, build locally)
- Unity Project files (Assets, ProjectSettings)

## Setup Instructions

### 1. Backend
```bash
cd server
npm install
# Create a .env file with MONGODB_URI and PORT
node server.js
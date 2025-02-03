# Exhibition Curator

## Project Overview

Exhibition Curator is a web application designed for art enthusiasts to explore and curate virtual exhibitions. It leverages the following museum APIs:
- Harvard Art Museums
- Rijksmuseum
- Art Institute of Chicago
- The Met

Visit the hosted version of the application here: [Exhibition Curator] (https://exhibition-curator-six.vercel.app/) 

## Features
- Browse and search artworks from Harvard Art Museums, Rijksmuseum, Art Institute of Chicago and The Met APIs
- Filter and sort artworks based on various criteria
- Curate and organise exhibitions by adding artworks
- Register and log in using Firebase authentication
- Responsive and user-friendly interface using React and Bootstrap
- Client-side routing with React Router

## Technologies Used
- **Frontend**: React and Bootstrap
- **State Management & API Requests**: Axios
- **Authentication & Storage**: Firebase
- **Build Tools**: Vite

## Getting Started
### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) 

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/elenamurgia/exhibition-curator.git
   cd exhibition-curator
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Environment Variables
Create a `.env` file in the root directory and add the following environment variables:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_HARVARD_API_KEY=your_harvard_art_museums_api_key
VITE_RIJKSMUSEUM_API_KEY=your_rijksmuseum_api_key
```
You must obtain your own API keys from Firebase and Harvard and Rijksmuseum APIs and replace `your_*` with your actual values.

### Running the Project
To start the development server:
```sh
npm run dev
```
This will launch the application in development mode. Open [http://localhost:5173](http://localhost:5173) in your browser to view it.



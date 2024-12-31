# AI STORY BUILDER

Welcome to our Story Generation Platform! This AI-powered platform combines creativity and advanced technology to provide an interactive and fun way to create stories sentence by sentence. Whether you're a budding writer, a storyteller, or someone who loves engaging in games or exploring the magic of words, this platform has something for you!

## Features

### 1. **AI-Powered Story Generation**
   - Create imaginative and engaging stories with the help of AI.
   - The system remembers your previous sentences to ensure the flow and coherence of your story.

### 2. **Interactive Gameplay**
   - Treat storytelling as a game by unfolding your narrative one sentence at a time.
   - Engage with AI to explore different genres and unexpected plot twists.

### 3. **Explore Genres First**
   - Visit the "Genres" page to choose the type of story you want to create.
   - Pick from a wide range of genres to set the tone of your story, including fantasy, sci-fi, mystery, and more!

### 4. **Share and Collaborate**
   - Copy the entire story prompt to share with friends, post online, or save for personal use.

### 5. **Visual and Immersive Experience**
   - Stunning visuals, such as the Earth and starry background, enhance your storytelling experience.


## Usage Instructions

1. **Sign Up/Login**:
   - Create an account or log in to access the full features.

2. **Explore Genres First**:
   - Navigate to the "Genres" page to select the tone and type of story you want to create.

3. **Start Generating Stories**:
   - Use the Story Generation page to begin crafting your story one sentence at a time.

4. **Interactive AI Chatbot**:
   - Use the AI-powered chatbot to generate dynamic and exciting storylines.

5. **Contact Us**:
   - Have questions or need support? Use the Contact Us form to get in touch.


## Technologies Used

### Frontend
- **React.js**: Used for building an interactive and dynamic user interface.
- **Three.js** and **React Three Fiber**: For rendering 3D elements like Earth and Stars.

### Backend
- **Node.js**: Handles server-side logic and API interactions.
- **Express.js**: Facilitates routing and middleware for the backend.
- **MongoDB**: Manages user data securely.

### AI Integration
- **Gemini Flash 1.5 API**: Powers the story generation and chatbot functionalities.

### Other Tools
- **CSS Modules/Tailwind**: Styling the user interface.


## How to Run Locally

### Prerequisites
- Node.js installed on your system.
- MongoDB set up for database operations.

### Steps
1. Clone the repository.
   ```bash
   git clone https://github.com/rishika105/AI-Story-Builder.git
   ```
2. Navigate to the project directory.
   ```bash
   cd AI-Story-Builder
   ```
3. Install dependencies for both frontend and backend.
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

4. Create a `.env` file in the `server` directory and add the required environment variables:

   - `MONGODB_URL=<Your MongoDB connection string>`
   - `PORT=4000`
   - `GEMINI_API_KEY=<Your Gemini Flash 1.5 API key>`

5. Create a `.env` file in the `client` directory and add the following environment variables:

   - `REACT_APP_BASE_URL=http://localhost:4000/api/v1`
   - `GENERATE_SOURCEMAP=false`

   
6. Run the server and client.
   ```bash
   
   # In client folder
   npm run dev
   ```
7. Open the application in your browser at `http://localhost:3000`.


## Future Enhancements

- Adding more genres and customization options.
- Improving the chatbot's storytelling capabilities.
- Introducing multiplayer storytelling for collaborative creativity.

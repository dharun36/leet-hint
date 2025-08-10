# LeetHint - AI-Powered LeetCode Hints Extension

LeetHint is a Chrome extension that provides AI-powered hints for LeetCode problems without revealing the full solutions, helping you learn and solve problems more effectively.

![LeetHint Logo](extension/icon.png)

## Features

- 🤖 **AI-Powered Hints**: Get step-by-step hints using Google's Gemini AI model
- 💡 **Contextual Assistance**: Automatically recognizes the current LeetCode problem
- 💬 **Chat Interface**: Ask specific questions about the problem
- 🔗 **Additional Resources**: Quick access to community solutions
- 🎨 **User-Friendly Design**: Clean, dark-themed interface

## Project Structure

```
leetcode_extension/
├── backend/                # Flask server
│   ├── app.py              # Backend API for Gemini AI integration
│   └── requirements.txt    # Python dependencies
└── extension/              # Chrome Extension
    ├── content.js          # Content script for LeetCode pages
    ├── icon.png/jpg        # Extension icon
    ├── manifest.json       # Extension manifest
    ├── popup.html          # Extension popup UI
    └── popup.js            # Extension popup logic
```

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

3. Run the Flask server:
   ```
   python app.py
   ```
   The server will start on `http://127.0.0.1:5000`.

### Chrome Extension Installation

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" in the top-right corner.
3. Click "Load unpacked" and select the `extension` folder from this project.
4. The LeetHint extension should now appear in your extensions list and be available in the toolbar.

## Usage

1. Navigate to any LeetCode problem page.
2. Click the LeetHint extension icon in your browser toolbar.
3. The extension will automatically recognize the current problem.
4. Click "Get AI Hint" to receive step-by-step guidance for the problem.
5. Alternatively, type your specific question about the problem in the input field.
6. Use the "Open Community Solution" button to access additional resources for the problem.

## API Integration

LeetHint uses Google's Gemini 2.0 Flash API for generating hints. The backend handles the API communication and provides a simple endpoint for the extension to consume.

## Development

### Backend Development

- The Flask server (`app.py`) provides a single endpoint `/get-hint` that accepts POST requests with the problem title or custom query.
- It communicates with Google's Gemini API and returns the generated hint.

### Extension Development

- `popup.html` & `popup.js`: Handle the extension's UI and interaction logic.
- `manifest.json`: Defines the extension's properties and permissions.
- `content.js`: Designed to interact with LeetCode problem pages.

## Security Note

The current implementation includes an API key in the source code. For production use, consider:

- Moving the API key to environment variables
- Implementing proper authentication between the extension and backend
- Adding rate limiting and other security measures

## License

[MIT License](LICENSE)

## Acknowledgements

- Google Gemini API for AI-powered hints
- LeetCode for providing the platform for coding practice

---

*Created by [dharun36](https://github.com/dharun36)*

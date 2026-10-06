# QuickNotes

QuickNotes is a light, fast, and fully responsive note-taking web application designed to help users capture, organize, and filter their thoughts effortlessly. Built completely from scratch using vanilla web technologies, the app allows users to categorize notes into Personal, Work, or Study groups, filter existing notes dynamically via real-time search, and keep track of their total note count. With built-in input validation and local storage persistence, QuickNotes ensures your ideas remain organized, readable, and saved directly in your browser without requiring external dependencies or backend infrastructure.

## Features

- **Categorized Note Creation**: Add notes categorized as Personal, Work, or Study, each visually distinguished with custom category indicator colors.
- **Real-Time Search & Filtering**: Instant keyword search filtering across all note entries as you type.
- **Input Validation**: Front-end checks that prevent empty notes or notes exceeding 200 characters, displaying clear error messages.
- **Local Storage Persistence**: Notes are saved using browser `localStorage` (`JSON.stringify` and `JSON.parse`) so content persists across page reloads.
- **Dynamic Note Counter**: Accurate note count tracking with correct pluralization for zero, one, and multiple notes.
- **Responsive Flexbox Design**: Optimized user interface with white card containers and full responsiveness for mobile screens up to 600px wide.
- **Safe DOM Rendering**: Built using standard `createElement` and `textContent` methods to eliminate cross-site scripting (XSS) risks.


## How to Run Locally

Because QuickNotes is built using pure HTML, CSS, and JavaScript, no complex installations, build tools, or server setups are required.

1. **Clone or Download the Repository**:
   Download the project files (`index.html`, `style.css`, and `script.js`) into a single directory on your machine.

2. **Open directly in a Browser**:
   Double-click the `index.html` file to open it in any modern web browser (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge).

3. **(Optional) Run with Live Server**:
   If using Visual Studio Code, right-click `index.html` and select **Open with Live Server** for live page reloading during development.
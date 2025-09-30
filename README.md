# <i class="fab fa-github"></i> GitHub User Finder

[Live Demo](https://github.com/yourusername/github-user-finder-live)  

A simple and interactive web app to search for GitHub users and display their profiles and repositories in real-time.

---

## Features

This project demonstrates modern **JavaScript, HTML, and CSS** techniques. Key features include:

### JavaScript Features:
- **Fetch API & Async/Await**  
  Fetches GitHub user data and repositories asynchronously with proper error handling.

- **DOM Manipulation**  
  Dynamically updates user profile, repository list, and error messages.

- **Event Listeners**  
  Handles clicks, form input (`Enter` key), and theme toggle button.

- **Local Storage**  
  Saves the user's preferred theme (light/dark) across sessions.

- **Load More Pagination**  
  Displays repositories in batches of 6, with a "Load More" button to fetch more.

- **Date Formatting**  
  Formats GitHub timestamps to a readable `DD MMM YYYY` format.

- **Error Handling**  
  Shows informative messages for invalid usernames or API rate limits.

### CSS Features:
- Light/Dark Mode with smooth transitions
- Responsive grid layout for repositories and additional info
- Hover effects for buttons and repository cards
- Truncated repository descriptions for cleaner layout

---

## How to Use

1. Open the live demo or clone the repository.
2. Enter any GitHub username in the search bar.
3. View the user profile, stats, and latest repositories.
4. Click "Load More" to see additional repositories if available.
5. Toggle between **Light** and **Dark** mode using the theme button.

---

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Custom Properties)
- JavaScript (ES6+)
- GitHub REST API
- Font Awesome for icons

---

## License

This project is licensed under the [MIT License](LICENSE).

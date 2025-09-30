// ===== DOM Elements =====
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const profileContainer = document.getElementById("profile-container");
const errorContainer = document.getElementById("error-container");
const avatar = document.getElementById("avatar");
const nameElement = document.getElementById("name");
const usernameElement = document.getElementById("username");
const bioElement = document.getElementById("bio");
const locationElement = document.getElementById("location");
const joinedDateElement = document.getElementById("joined-date");
const profileLink = document.getElementById("profile-link");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const companyElement = document.getElementById("company");
const blogElement = document.getElementById("blog");
const twitterElement = document.getElementById("twitter");
const reposContainer = document.getElementById("repos-container");
const loadMoreBtn = document.getElementById("load-more-btn");
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// ===== Repos State =====
let currentRepos = [];
let reposIndex = 0;
const REPOS_PER_PAGE = 6;
let firstSearchDone = false; // لتجنب اظهار الخطأ عند التحميل

// ===== Event Listeners =====
searchBtn.addEventListener("click", searchUser);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchUser();
});
loadMoreBtn.addEventListener("click", displayMoreRepos);

// ===== Main Search =====
async function searchUser() {
  const username = searchInput.value.trim();
  if (!username) return;

  try {
    profileContainer.classList.add("hidden");
    errorContainer.classList.add("hidden");

    const response = await fetch(`https://api.github.com/users/${username}`);

    if (response.status === 403) {
      throw new Error("API rate limit exceeded. Please try again later.");
    }
    if (!response.ok) throw new Error("User not found");

    const userData = await response.json();
    displayUserData(userData);
    fetchRepositories(userData.repos_url);
    firstSearchDone = true;
  } catch (error) {
    if (firstSearchDone || searchInput.value.trim() !== "") {
      showError(error.message);
    }
  }
}

// ===== Fetch Repos =====
async function fetchRepositories(reposUrl) {
  reposContainer.innerHTML =
    '<div class="loading-repos">Loading repositories...</div>';
  loadMoreBtn.classList.add("hidden");

  try {
    const response = await fetch(reposUrl + "?per_page=100&sort=updated");
    const reposData = await response.json();
    currentRepos = reposData;
    reposIndex = 0;
    displayMoreRepos();
  } catch (error) {
    reposContainer.innerHTML = `<div class="no-repos">${error.message}</div>`;
  }
}

// ===== Display More Repos =====
function displayMoreRepos() {
  const nextRepos = currentRepos.slice(reposIndex, reposIndex + REPOS_PER_PAGE);
  if (reposIndex === 0) reposContainer.innerHTML = "";

  nextRepos.forEach((repo) => {
    const repoCard = document.createElement("div");
    repoCard.className = "repo-card";
    const updatedAt = formatDate(repo.updated_at);
    repoCard.innerHTML = `
      <a href="${repo.html_url}" target="_blank" class="repo-name">
        <i class="fas fa-code-branch"></i> ${repo.name}
      </a>
      <p class="repo-description">${
        repo.description || "No description available"
      }</p>
      <div class="repo-meta">
        ${
          repo.language
            ? `<div class="repo-meta-item"><i class="fas fa-circle"></i> ${repo.language}</div>`
            : ""
        }
        <div class="repo-meta-item"><i class="fas fa-star"></i> ${
          repo.stargazers_count
        }</div>
        <div class="repo-meta-item"><i class="fas fa-code-fork"></i> ${
          repo.forks_count
        }</div>
        <div class="repo-meta-item"><i class="fas fa-history"></i> ${updatedAt}</div>
      </div>
    `;
    reposContainer.appendChild(repoCard);
  });

  reposIndex += REPOS_PER_PAGE;

  if (reposIndex < currentRepos.length) loadMoreBtn.classList.remove("hidden");
  else loadMoreBtn.classList.add("hidden");
}

// ===== Display User Data =====
function displayUserData(user) {
  avatar.src = user.avatar_url;
  avatar.alt = `${user.login} avatar`;
  nameElement.textContent = user.name || user.login;
  usernameElement.textContent = `@${user.login}`;
  bioElement.textContent = user.bio || "No bio available";

  locationElement.textContent = user.location || "Not specified";
  joinedDateElement.textContent = formatDate(user.created_at);

  profileLink.href = user.html_url;
  followers.textContent = user.followers;
  following.textContent = user.following;
  repos.textContent = user.public_repos;

  companyElement.textContent = user.company || "Not specified";

  if (user.blog) {
    blogElement.textContent = user.blog;
    blogElement.href = user.blog.startsWith("http")
      ? user.blog
      : `https://${user.blog}`;
  } else {
    blogElement.textContent = "No website";
    blogElement.removeAttribute("href");
  }

  if (user.twitter_username) {
    twitterElement.textContent = `@${user.twitter_username}`;
    twitterElement.href = `https://twitter.com/${user.twitter_username}`;
  } else {
    twitterElement.textContent = "No Twitter";
    twitterElement.removeAttribute("href");
  }

  profileContainer.classList.remove("hidden");
}

// ===== Show Error =====
function showError(message = "No user found. Please try another username.") {
  profileContainer.classList.add("hidden");
  errorContainer.classList.remove("hidden");
  errorContainer.querySelector("p").textContent = message;
}

// ===== Format Date =====
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ===== Theme Toggle =====
themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  themeToggleBtn.classList.add("rotate");

  const icon = themeToggleBtn.querySelector("i");
  if (body.classList.contains("light-mode")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }

  localStorage.setItem(
    "theme",
    body.classList.contains("light-mode") ? "light" : "dark"
  );

  setTimeout(() => themeToggleBtn.classList.remove("rotate"), 400);
});

// ===== Remember Theme & Default Username =====
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    themeToggleBtn.querySelector("i").classList.replace("fa-moon", "fa-sun");
  }

  searchInput.value = "youssefsabrii";
});

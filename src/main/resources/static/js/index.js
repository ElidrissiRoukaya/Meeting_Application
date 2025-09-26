// Function to load and display all connected users
function loadAndDisplayUsers() {

    // Check if a user is logged in (saved in localStorage)
    const connectedUser = localStorage.getItem('connectedUser');
    if (!connectedUser) {
        // If not logged in, redirect to login page
        window.location = 'login.html';
        return;
    }

    const userListElement = document.getElementById("userList");
    // Show temporary "Loading..." message
    userListElement.innerHTML = "Loading...";

    // Fetch all users from backend API
    fetch('http://localhost:8080/api/v1/users')
        .then((response) => response.json()) // Convert response to JSON
        .then((data) => {
            console.log(data); // Debug: log the user list
            displayUsers(data, userListElement); // Show users on the page
        });
}

// Function to display the list of users in the UI
function displayUsers(userList, userListElement) {
    // Clear previous content
    userListElement.innerHTML = "";

    // Loop through all users and create a "card" for each one
    userList.forEach(user => {
        const li = document.createElement("li");
        li.classList.add("user-card");
        li.innerHTML = `
            <div class="user-info">
                <!-- Show a circle: green if online, gray if offline -->
                <span class="user-circle ${user.status === "online" ? "online" : "offline"}"></span>
                <span>${user.username}</span>
            </div>
        `;
        userListElement.appendChild(li);
    });
}

// Run loadAndDisplayUsers() automatically when the page is loaded
window.addEventListener("load", loadAndDisplayUsers);

// Handle logout action
function handleLogout() {
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    // Call backend logout API
    fetch('http://localhost:8080/api/v1/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: connectedUser.email }) // Send email of the user
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Logout failed");
            }
            // Remove user from localStorage and redirect to login page
            localStorage.removeItem('connectedUser');
            window.location.href = "login.html";
        })
        .catch(err => {
            console.error("Logout error:", err);
        });
}

// Attach logout function to logout button
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", handleLogout);

// Handle "Create New Meeting" action
function handleNewMeeting() {
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    // Open a new tab with a new meeting room
    window.open(`meeting.html?username=${connectedUser.username}`, "_blank");
}

// Attach "Create New Meeting" function to button
const newMeetingBtn = document.getElementById("newMeetingBtn");
newMeetingBtn.addEventListener("click", handleNewMeeting);

// Handle "Join Meeting" action
function handleJoinMeeting() {
    const roomId = document.getElementById("meetingName").value.trim();
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    // If no Meeting ID entered, show alert
    if (!roomId) {
        alert("️ Please enter a Meeting ID before joining.");
        return;
    }

    // Debug logs
    console.log("ConnectedUser:", connectedUser);
    console.log("URL:", `meeting.html?roomID=${roomId}&username=${connectedUser.username}`);

    // Open the meeting page with room ID and username as parameters
    const url = `meeting.html?roomID=${roomId}&username=${encodeURIComponent(connectedUser.username)}`;
    window.open(url, "_blank");
}

// Attach "Join Meeting" function to button
document.getElementById("joinMeetingBtn").addEventListener("click", handleJoinMeeting);

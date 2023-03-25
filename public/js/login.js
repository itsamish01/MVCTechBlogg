// Store the username and password values from the input fields in a user object
const userObj = {
    username: document.querySelector("#loginUsername").value,
    password: document.querySelector("#loginPassword").value,
}

console.log(userObj);

// Send a POST request to the "/api/users/login" route with the user object in the request body
fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
        "Content-Type": "application/json"
    }
}).then(res => {
    if (res.ok) {
        // If the response is successful, log a message and redirect the user to the dashboard
        console.log("User is logged in");
        location.href = "/dashboard";
    } else {
        // If the response is unsuccessful, show an alert to the user to try again
        alert("Please try again");
    }
});
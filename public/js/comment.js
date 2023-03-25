// Select the form element with ID "newComment" and add a submit event listener
document.querySelector("#newComment").addEventListener("submit", event => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Create a comment object with body and blogId properties
    const comment = {
      body: document.querySelector("#comment").value,
      blogId: document.querySelector("#hiddenCommentId").value,
    };
  
    // Send a POST request to the /api/comments endpoint with the comment data
    fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      // If the response status is OK, log a message and reload the page
      if (res.ok) {
        console.log("comment posted");
        location.reload();
      } 
      // Otherwise, display an error message
      else {
        alert("please try again");
      }
    });
  });
// main.js

// This function will be triggered when the "Learn!" button is clicked.
// It sends the user's input to the Tasker system for processing.
function submitQuery() {
  const query = document.getElementById("queryInput").value;
  if (query.trim() === "") {
    alert("Please enter a query.");
    return;
  }

  // Here, we would trigger a Tasker action.
  // In a real web app, this would involve an API call.
  // For a no-code approach with KWGT and Tasker, this is a placeholder
  // for the logic that would trigger a Tasker task.
  // A Tasker Task could be configured to read a file, or listen to a web request.
  console.log(`Sending query to Tasker: "${query}"`);

  // This is a simplified example. Your Tasker setup might have
  // a specific way of receiving this data, for example, by
  // writing to a specific text file that a Tasker Profile watches.
  
  // A real implementation would need to write the query to a file
  // that the Tasker "CommandWatcher" profile monitors.
  // For now, this is a conceptual log.
  document.getElementById("results").innerHTML = `<p>Query submitted: "${query}". Awaiting planet response...</p>`;
}

// This function would be called by your Tasker system
// to update the UI after it has processed a command or query.
// In a real web app, Tasker would need to make a web request
// to update the browser. With a local KWGT setup, you would just
// be seeing the visual changes on your widget.
function updateUI(newState) {
  // This is a placeholder.
  // In your no-code approach, Tasker updates the widget directly.
  // If you later graduate to a native app, this function would
  // update the HTML elements with new state data.
  // For example:
  // document.getElementById("planet-level").textContent = newState.planet.level;
  // document.getElementById("evolution-ring").style.width = newState.planet.evolution * 100 + "%";
  console.log("UI updated with new state:", newState);
}

// Event listener for the "Learn!" button
document.getElementById("submitQuery").addEventListener("click", submitQuery);

// Add a keypress listener for the "Enter" key on the input field
document.getElementById("queryInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("submitQuery").click();
  }
});

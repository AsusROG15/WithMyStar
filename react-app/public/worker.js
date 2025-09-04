
// react-app/public/worker.js

self.onmessage = function(e) {
  const query = e.data.query;
  console.log('Worker received query:', query);

  // Simulate a CPU-intensive task or a long-running operation
  setTimeout(() => {
    const processedResult = `Worker processed: ${query.toUpperCase()} (simulated)`;
    self.postMessage({ result: processedResult });
  }, 1500); // Simulate 1.5 seconds of processing
};

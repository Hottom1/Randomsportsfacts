document.addEventListener('DOMContentLoaded', function () {
    const factElement = document.getElementById('fact'); // Element to display the fact
    const factButton = document.getElementById('factButton'); // Button to get a new fact
    const tweetButton = document.getElementById('tweet'); // Button to share on Twitter
    const facebookButton = document.getElementById('facebook'); // Button to share on Facebook

    let currentFact = ''; // Variable to store the current fact

    // Fetch random sports fact from facts.json
    async function fetchFact() {
        try {
            // Fetch the facts.json file
            const response = await fetch('facts.json');
            const data = await response.json();

            // Select a random fact from the array
            const randomFact = data[Math.floor(Math.random() * data.length)];
            currentFact = randomFact.fact; // Store the fact in the variable

            // Display the fact on the webpage
            factElement.textContent = currentFact;

            // Update the social media share buttons
            updateShareButtons();
        } catch (error) {
            console.error('Error fetching sports fact:', error);
            factElement.textContent = 'Failed to fetch a fact. Please try again later.';
        }
    }

    // Update social media share buttons with the current fact
    function updateShareButtons() {
        // Create Twitter share URL
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentFact)}`;
        tweetButton.href = tweetUrl;

        // Create Facebook share URL
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        facebookButton.href = facebookUrl;
    }

    // Event listener for the "Get Fact" button
    factButton.addEventListener('click', fetchFact);

    // Fetch a fact when the page loads
    fetchFact();
});
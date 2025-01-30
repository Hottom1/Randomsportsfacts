document.addEventListener('DOMContentLoaded', function () {
    const factElement = document.getElementById('fact');
    const factButton = document.getElementById('factButton');
    const tweetButton = document.getElementById('tweet');
    const facebookButton = document.getElementById('facebook');

    let currentFact = '';

    // Fetch random sports fact from facts.json
    async function fetchFact() {
        try {
            const response = await fetch('facts.json');
            const data = await response.json();
            const randomFact = data[Math.floor(Math.random() * data.length)];
            currentFact = randomFact.fact;
            factElement.textContent = currentFact;
            updateShareButtons();
        } catch (error) {
            console.error('Error fetching sports fact:', error);
            factElement.textContent = 'Failed to fetch a fact. Please try again later.';
        }
    }

    // Update social media share buttons
    function updateShareButtons() {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentFact)}`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;

        tweetButton.href = tweetUrl;
        facebookButton.href = facebookUrl;
    }

    // Event listener for the "Get Fact" button
    factButton.addEventListener('click', fetchFact);

    // Initial fetch
    fetchFact();
});
   
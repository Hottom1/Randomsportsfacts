document.addEventListener('DOMContentLoaded', function () {
    const factElement = document.getElementById('fact');
    const factButton = document.getElementById('factButton');
    const sportFilter = document.getElementById('sportFilter');
    const tweetButton = document.getElementById('tweet');
    const facebookButton = document.getElementById('facebook');

    let currentFact = '';

    // Fetch random sports fact from TheSportsDB API
    async function fetchFact(sport = 'all') {
        let url;
        if (sport === 'all') {
            // Fetch random events if no sport is selected
            url = 'https://www.thesportsdb.com/api/v1/json/3/eventsrandom.php';
        } else {
            // Fetch events for a specific sport
            url = `https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=${encodeURIComponent(sport)}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.event && data.event.length > 0) {
                const randomEvent = data.event[Math.floor(Math.random() * data.event.length)];
                currentFact = `${randomEvent.strEvent}: ${randomEvent.strDescriptionEN || 'No description available.'}`;
            } else {
                currentFact = `No facts found for ${sport}. Try another sport!`;
            }
        } catch (error) {
            console.error('Error fetching sports fact:', error);
            currentFact = 'Failed to fetch a fact. Please try again later.';
        }

        factElement.textContent = currentFact;
        updateShareButtons();
    }

    // Update social media share buttons
    function updateShareButtons() {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentFact)}`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;

        tweetButton.href = tweetUrl;
        facebookButton.href = facebookUrl;
    }

    // Event listeners
    factButton.addEventListener('click', () => {
        const selectedSport = sportFilter.value;
        fetchFact(selectedSport);
    });

    sportFilter.addEventListener('change', () => {
        const selectedSport = sportFilter.value;
        fetchFact(selectedSport);
    });

    // Initial fetch
    fetchFact();
});
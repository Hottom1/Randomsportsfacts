document.addEventListener('DOMContentLoaded', function () {
    const factElement = document.getElementById('fact');
    const factButton = document.getElementById('factButton');
    const sportFilter = document.getElementById('sportFilter');
    const tweetButton = document.getElementById('tweet');
    const facebookButton = document.getElementById('facebook');

    let currentFact = '';

    // Fetch random sports fact from TheSportsDB API or fallback to local JSON
    async function fetchFact(sport = 'all') {
        let url = 'https://www.thesportsdb.com/api/v1/json/3/eventsrandom.php';
        if (sport !== 'all') {
            url = `https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?${sport}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            const events = data.events;

            if (events && events.length > 0) {
                const randomEvent = events[Math.floor(Math.random() * events.length)];
                currentFact = `${randomEvent.strEvent}: ${randomEvent.strDescription || 'No description available.'}`;
            } else {
                throw new Error('No events found');
            }
        } catch (error) {
            console.error('Error fetching sports fact from API:', error);
            // Fallback to local JSON
            const localResponse = await fetch('facts.json');
            const localData = await localResponse.json();
            currentFact = localData[Math.floor(Math.random() * localData.length)];
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
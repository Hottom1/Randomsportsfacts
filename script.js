document.getElementById('factButton').addEventListener('click', function() {
    fetch('facts.json')
        .then(response => response.json())
        .then(data => {
            const randomFact = data[Math.floor(Math.random() * data.length)];
            document.getElementById('fact').textContent = randomFact;
        })
        .catch(error => console.error('Error fetching facts:', error));
});
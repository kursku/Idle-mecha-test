let scraps = 0;

function gatherScraps() {
    scraps += 1;
    document.getElementById('scrap-count').innerText = scraps;
    checkUnlocks();
}

function checkUnlocks() {
    if (scraps >= 10) {
        document.getElementById('player-profile-tab').classList.remove('hidden');
    }
    if (scraps >= 20) {
        document.getElementById('resource-management-tab').classList.remove('hidden');
    }
    if (scraps >= 30) {
        document.getElementById('skills-tree-tab').classList.remove('hidden');
    }
    if (scraps >= 40) {
        document.getElementById('map-tab').classList.remove('hidden');
    }
    if (scraps >= 50) {
        document.getElementById('mecha-garage-tab').classList.remove('hidden');
    }
    if (scraps >= 60) {
        document.getElementById('fighting-mecha-tab').classList.remove('hidden');
    }
}

function openTab(evt, tabName) {
    fetch(`tabs/${tabName}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('tab-content').innerHTML = data;

            // Add active class to the clicked tab and remove from others
            const tablinks = document.getElementsByClassName("tablink");
            for (let i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            if (evt) {
                evt.currentTarget.className += " active";
            }

            // Execute any inline scripts
            const scripts = document.getElementById('tab-content').getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                eval(scripts[i].innerHTML);
            }
        })
        .catch(error => console.error('Error fetching tab content:', error));
}

// Open the first tab by default
document.addEventListener("DOMContentLoaded", function() {
    openTab(null, 'scrapyard'); // Open "The Scrapyard" tab content by default
    document.getElementById('scrapyard-tab').className += " active"; // Set "The Scrapyard" tab as active
});
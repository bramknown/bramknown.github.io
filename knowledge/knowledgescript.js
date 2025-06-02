function showList(listId) {
    // Hide all lists
    document.querySelectorAll('.list').forEach(list => list.classList.add('hidden'));
    // Show the selected list
    const list = document.getElementById(listId);
    if (list) list.classList.remove('hidden');
}

function loadContent(page) {
    document.getElementById('content').src = page;
}

// On page load, show only the general list and load home.html
window.onload = function() {
    showList('general');
    loadContent('home.html');
};
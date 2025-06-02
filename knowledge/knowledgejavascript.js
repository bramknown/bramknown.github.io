function showList(listId) {
    document.querySelectorAll('.list').forEach(list => list.classList.add('hidden'));
    document.getElementById(listId).classList.remove('hidden');
}

function loadContent(page) {
    document.getElementById('content').src = page;
}
document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addBook();
    });
    
    const buttonSearch = document.getElementById('search-button');

    buttonSearch.addEventListener('click', function(event) {
        event.preventDefault();
        searchTitleBook();
    });

});

document.addEventListener(RENDER_EVENT, () => {
    const uncompletedReading = document.getElementById('uncompleteBookShelfList');
    uncompletedReading.innerHTML = '';

    const completedReading = document.getElementById('completeBookShelfList');
    completedReading.innerHTML = '';
   
    for (const book of books) {
       const bookElement = makeBook(book);
       if (!book.isCompleted) {
        uncompletedReading.append(bookElement);
       } else {
        completedReading.append(bookElement);
       }
    }
});

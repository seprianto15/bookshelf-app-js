const books = [];
const RENDER_EVENT = 'render-book';

const addBook = () => {
    const textTitle = document.getElementById('inputTitle').value;
    const textAuthor = document.getElementById('inputAuthor').value;
    const textRelease = document.getElementById('inputDate').value;
    const checkbox = document.getElementById('inputBookIsComplete').checked;
    
    const generateID = generateId();
    const bookObject = generateBookObject(generateID, textTitle, textAuthor, textRelease, checkbox);
    books.push(bookObject);
    
    document.dispatchEvent(new Event(RENDER_EVENT));
}

const generateId = () => {
    return +new Date();
}

const generateBookObject = (id, title, author, release, isCompleted) => {
    return {
        id,
        title,
        author,
        release,
        isCompleted
    }
}

const makeBook = (bookObject) => {
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookObject.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = bookObject.author;

    const textRelease = document.createElement('p');
    textRelease.innerText = bookObject.release;

    const textContainer = document.createElement('div');
    textContainer.classList.add('book_item');
    textContainer.append(textTitle, textAuthor, textRelease);
    textContainer.setAttribute('id', `book-${bookObject.id}`);

    if (bookObject.isCompleted) {
        const completeButton = document.createElement('button');
        completeButton.classList.add('material-symbols-outlined');
        completeButton.textContent = 'undo';

        completeButton.addEventListener('click', function() {
            addBookToUncompleted(bookObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('material-symbols-outlined');
        trashButton.textContent = 'delete'

        trashButton.addEventListener('click', function() {
            if (confirm('Hapus Buku')) {
                removeBook(bookObject.id)
            }
        });

        textContainer.append(completeButton, trashButton)
        
    } else {
        const uncompleteButton = document.createElement('button');
        uncompleteButton.classList.add('material-symbols-outlined');
        uncompleteButton.textContent = 'redo'

        uncompleteButton.addEventListener('click', function() {
            addBookToCompleted(bookObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('material-symbols-outlined');
        trashButton.textContent = 'delete'

        trashButton.addEventListener('click', function() {
            if (confirm('Hapus Buku')) {
                removeBook(bookObject.id)
            }
        });

        textContainer.append(uncompleteButton, trashButton)
    }

    return textContainer;
}

const addBookToCompleted = (bookId) => {
    const bookTarget = findBook(bookId);

    if (bookTarget === null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

const addBookToUncompleted = (bookId) => {
    const bookTarget = findBook(bookId);

    if (bookTarget === null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

const findBook = (bookId) => {
    for (const book of books) {
        if (book.id === bookId) {
            return book;
        }
    }
    return null;
}

const removeBook = (bookId) => {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event (RENDER_EVENT));
}

const findBookIndex = (bookId) => {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

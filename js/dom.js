const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APPS';


// Menambah buku
const addBook = () => {
    const textTitle = document.getElementById('inputTitle').value;
    const textAuthor = document.getElementById('inputAuthor').value;
    const textRelease = document.getElementById('inputDate').value;
    const checkbox = document.getElementById('inputBookIsComplete').checked;
    
    const generateID = generateId();
    const bookObject = generateBookObject(generateID, textTitle, textAuthor, textRelease, checkbox);
    books.push(bookObject);
    
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

// Membuat id menjadi unik
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

// Menampilkan buku
const makeBook = (bookObject) => {
    const textTitle = document.createElement('h3');
    textTitle.innerText = `Title : ` +bookObject.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = `Author : ` +bookObject.author;

    const textRelease = document.createElement('p');
    textRelease.innerText = `Release : ` +bookObject.release;

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

        const editButton = document.createElement('button');
        editButton.classList.add('material-symbols-outlined');
        editButton.textContent = 'edit';
        editButton.addEventListener('click', function() {
            updateBook(bookObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('material-symbols-outlined');
        trashButton.textContent = 'delete'  
        trashButton.addEventListener('click', function() {
            if (confirm('Hapus buku')) {
                removeBook(bookObject.id);
            }
        });

        textContainer.append(completeButton, editButton, trashButton)
        
    } else {
        const uncompleteButton = document.createElement('button');
        uncompleteButton.classList.add('material-symbols-outlined');
        uncompleteButton.textContent = 'redo'
        uncompleteButton.addEventListener('click', function() {
            addBookToCompleted(bookObject.id);
        });

        const editButton = document.createElement('button');
        editButton.classList.add('material-symbols-outlined');
        editButton.textContent = 'edit';
        editButton.addEventListener('click', function() {
            updateBook(bookObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('material-symbols-outlined');
        trashButton.textContent = 'delete'
        trashButton.addEventListener('click', function() {
            if (confirm('Hapus buku')) {
                removeBook(bookObject.id)
            }
        });

        textContainer.append(uncompleteButton, editButton, trashButton)
    }

    return textContainer;
}

const addBookToCompleted = (bookId) => {
    const bookTarget = findBook(bookId);

    if (bookTarget === null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

const addBookToUncompleted = (bookId) => {
    const bookTarget = findBook(bookId);

    if (bookTarget === null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
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
    saveData();
}

const findBookIndex = (bookId) => {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

// Mencari dan menampilkan buku sesuai dengan keyword yang diberikan
const searchTitleBook = () => {
    const title = document.getElementById('searchBookTitle').value.toLowerCase();
    const titleBooks = document.querySelectorAll('.book_item');
        
        for (titleBook of titleBooks) {
            const searchTitle = titleBook.firstElementChild.textContent.toLowerCase();
            
            if (searchTitle.indexOf(title) !== -1) {
                titleBook.style.display = 'block';
            } else {
                titleBook.setAttribute('style', 'display : none');
            }
        }
}

const saveData = () => {
    if (isStorageExist()) {
        const parsed =JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

const isStorageExist = () => {
    if (typeof(Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}
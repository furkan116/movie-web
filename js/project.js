const form = document.getElementById("film-form");

const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");

const filmList = document.getElementById("films")

const deleteAll = document.getElementById("clear-films")

const ui = new UI();
const storage = new Storage();

eventListener();

function eventListener() {
    form.addEventListener("submit", addFilm);
    filmList.addEventListener("click", deleteFilm);
    document.addEventListener("DOMContentLoaded", function() {
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    })
    deleteAll.addEventListener("click", deleteAllFilms);
}

function addFilm(e) {

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title == "" || url == "" || director == "") {
        //ERROR
    }
    else {
        const newFilm = new Film(title, director, url);

        ui.addFilmToUI(newFilm);
        storage.addFilmToStorage(newFilm);
    }

    ui.clearInputs(titleElement, directorElement, urlElement);

    e.preventDefault();
}

function deleteFilm(e) {

    if(e.target.id === "delete-film") {

        ui.deleteFilmFromUI(e);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    }
}

function deleteAllFilms() {
    
    ui.deleteAllFilmsFromUI(filmList);
    storage.deleteAllFilmsFromStorage();
}
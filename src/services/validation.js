
export default function validation(name, price) {

    let valid = true;

    if (name === "" || name === undefined) {
        alert("A név nem lehet üres!");
        valid = false;
    }
    else if(name.length < 2) {
        alert("A név legalább 2 karakter hosszú legyen!");
        valid = false;
    }
    if(name !== "" && !isNaN(Number(name))) {
        alert("A név nem lehet csak szám!");
        valid = false;
    }
    if(price === "" || price === undefined) {
        alert("Az ár nem lehet üres!");
        valid = false;
    }
    else if(isNaN(Number(price))) {
        alert("Az ár csak szám lehet!");
        valid = false;
    }

    return valid;
}
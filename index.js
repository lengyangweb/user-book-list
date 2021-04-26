const tbody = document.querySelector('#tbody');
const userForm = document.querySelector('#user-form');
const submitBtn = document.querySelector('.addBtn');
const name = document.querySelector('#name');
const email = document.querySelector('#email');

/*
    A user class
*/
class Users {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

/*
    A storage class that read, add, and remove user from
    localStorage.
*/
class Storage {
    // Get users from localStorage
    static getUsers() {
        let users;

        if(localStorage.getItem('users') === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem('users'));
        }

        return users;
    }

    // Add user to localStorage
    static addUser(user) {
        const users = Storage.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Remove user from localStorage
    static removeUser(user) {
        const users = Storage.getUsers();

        const name = user.firstElementChild.innerHTML;
        
        users.forEach((user, index) => {
            if(user.name === name) {
                users.splice(index, 1);
            }
        });

        localStorage.setItem('users', JSON.stringify(users));
    }
}

/*
    A UI class that display, create, and remove users from
    the UI.
*/
class UI {
    // display users to the UI
    static displayUsers() {
        const users = Storage.getUsers();
        users.forEach(user => UI.createUser(user));
    }
    // add users to the UI
    static createUser(user) {
        const { name, email } = user;
        tbody.innerHTML += `
            <tr>
                <td>${name}</td>
                <td>${email}</td>
                <td>
                    <button class="delete">X</button>
                </td<
            </tr>
        `
    }
    // Remove user from the UI
    static removeUser(el) {
        tbody.removeChild(el);
    }

    // Generate alert message to the UI
    static showAlert(alert, message) {

        const warningMsg = document.querySelector('.warning-message');

        const warning = document.createElement('div');

        if(alert === 'fail') {
            warning.className = 'warning-fail';
            warning.innerHTML = message;
            warningMsg.appendChild(warning);
            setTimeout(() => {
                warningMsg.removeChild(warning);
            }, 3000)
        } else if('alert' === 'exist'){
            warning.className = 'warning-exist';
            warning.innerHTML = message;
            warningMsg.appendChild(warning);
            setTimeout(() => {
                warningMsg.removeChild(warning);
            }, 3000)
        }
        else if(alert === 'delete') {
            warning.className = 'warning-delete';
            warning.innerHTML = message;
            warningMsg.appendChild(warning);
            setTimeout(() => {
                warningMsg.removeChild(warning);
            }, 3000)
        }else {
            warning.className = 'warning-success';
            warning.innerHTML = message;
            warningMsg.appendChild(warning);
            setTimeout(() => {
                warningMsg.removeChild(warning);
            }, 3000)
        }

    }
}

// Form Handling
userForm.addEventListener('submit', (e) => {
    const users = Storage.getUsers();
    e.preventDefault();
    if(name.value === '' && email.value === '') {
        UI.showAlert('fail', 'Please enter in all fields.');
    } else {
        const newUser =  new Users(name.value, email.value);
        UI.createUser(newUser);
        UI.showAlert('success', 'User added Successfully.')
        Storage.addUser(newUser);

        // Reset form
        name.value = '';
        email.value = '';
    }
})

// Displaying all of the users to the UI
document.addEventListener('DOMContentLoaded', UI.displayUsers());

// Remove users
tbody.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')) {
        const tr = e.target.parentElement.parentElement;
        UI.removeUser(tr);
        UI.showAlert('delete', 'User has been remove.')
        Storage.removeUser(tr);
    } 
})
// Client side javascript file

const form = document.querySelector('form');
const msg1 = document.getElementById('message-1');
const msg2 = document.getElementById('message-2');
const locationInput = document.querySelector('input');

form.addEventListener('click', (e) => {
    e.preventDefault();
    msg1.textContent = 'Loading...';
    msg2.textContent = '';
    fetch(`weather/?address=${locationInput.value}`).then((response) => {  // fetching a JSON from the URL       
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;
            } else {
                msg1.textContent = data.location;
                msg2.textContent = data.forecast;
            }
        });
    });
});

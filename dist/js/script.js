//navbar fixed
window.onscroll = () => {
    const header = document.querySelector('header')
    const fixedNav = header.offsetTop

    if (window.pageYOffset > fixedNav) {
        header.classList.add("navbar-fixed")
    } else {
        header.classList.remove("navbar-fixed")
    }
}

// Hamburger
const hamburger = document.querySelector('#hamburger')
const navMenu = document.querySelector("#nav-menu")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle('hamburger-active')
    navMenu.classList.toggle('hidden')
})

// contact form
const scriptURL = 'https://script.google.com/macros/s/AKfycbzlkQQcc_HoSgPuGS3CFlubs1E5GF4Q2Wm71arcnqTBRGNbxvaJs6q78avdwnFu-cKb/exec'
const form = document.forms['submit-to-google-sheet']
const btnSend = document.querySelector("#btnSend")
const btnSending = document.querySelector("#btnSending")
const alert = document.querySelector("#alert")
const exitAlert = document.querySelector("#exitAlert")

// function to change the button if sending
const toggleButton = () => {
    btnSend.classList.toggle("hidden")
    btnSending.classList.toggle("hidden")
}

// function to toggle alert
const toggleAlert = () => {
    alert.classList.toggle("hidden")
}

// function alert close
exitAlert.addEventListener("click", () => {
    toggleAlert()
})

// // submit with ctrl and enter
// document.body.addEventListener('keydown', (event) => {
//     if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
//         event.target.form?.submit();
//     }
// });

// when the form is sending
form.addEventListener('submit', e => {
    toggleButton()
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            toggleButton()
            toggleAlert()
            form.reset()
            console.log('Success!', response)
        })
        .catch(error => console.error('Error!', error.message))
})
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

// form validation
const clearErrors = () => {
    const errors = document.getElementsByClassName('when-error')
    for (let item of errors) {
        item.innerHTML = ""
    }
}

const setError = (id, error) => {
    elMessage = document.getElementById(id)
    elMessage.getElementsByClassName('when-error')[0].innerHTML = error
}

const validateForm = () => {
    console.log('lagi ngecek')
    let valid = true
    clearErrors()

    // name form check
    const nameForm = form.name.value
    if (nameForm == '') {
        setError('name', '*Please enter your name')
        valid = false
    }

    // email form check
    const emailForm = form.email.value
    const emailExpression = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (emailForm == "") {
        setError('email', '*Please enter your email')
        valid = false
    }else if (!emailExpression.test(emailForm)) {
        setError("email", "*Please enter a valid email")
        valid = false
    }
    // message form check
    const messageForm = form.message.value
    if (messageForm == "") {
        setError("message", "*Please enter your message")
        valid = false
    }
    return valid
}

// function to change the button if sending
const toggleButton = () => {
    btnSend.classList.toggle("hidden")
    btnSending.classList.toggle("hidden")
    // alert.classList.toggle("hidden")
}

// submit with ctrl and enter
document.body.addEventListener('keydown', (event) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
        // event.target.form?.submit();
        console.log('ctrl enter kepencet')
        formSubmit(event)
    }
});



// when the form is sending
const formSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) {
        return
    }
    toggleButton()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            toggleButton()
            alert.classList.toggle("hidden")
            form.reset()
            console.log('Success!', response)
        })
        .catch(error => console.error('Error!', error.message))
}
form.addEventListener('submit', e => {
    formSubmit(e)
})

exitAlert.addEventListener('click', () => {
    alert.classList.toggle("hidden")
})
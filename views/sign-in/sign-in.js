var sign_in_form = document.getElementById("signInForm")
var error_msg = document.getElementById("error-msg")
var error_exit = document.getElementById("error-exit")


sign_in_form.addEventListener("submit", function (e) {
    var entered_email = document.getElementById("floatingEmail")
    var entered_password = document.getElementById("floatingPassword-1")

    var authentication = authenticateLogger(entered_email.value, entered_password.value)
    if (authentication) {
        console.log("authenticated")
        window.location.replace("http://127.0.0.1:5500/views/test-intro/intro.html")
    } else {
        showError(entered_password)

    }

    e.preventDefault()

})

function showError(password_field) {
    password_field.value = ""
    error_msg.classList.replace("invisible", "visible")

}
function authenticateLogger(entered_email, entered_password) {
    var result = false
    var logger = entered_email
    var stored_email = getCookie(logger + "_email")
    var stored_pass = getCookie(logger + "_password")
    console.log(stored_pass, entered_password)

    if (stored_email === entered_email && entered_password === stored_pass) {
        var logged = logger
        setCookie('logged', logged, CurrentfullDate)
        result = true
    }
    return result
}
error_exit.addEventListener("click", function () {
    console.log(error_msg.classList.add("invisible"))
})
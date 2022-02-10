
init()

function init() {

    sign_up_form_submit()
    login_form_submit()

}


function sign_up_form_submit() {
    var first_name = document.getElementById("floatingFirstName")
    var last_name = document.getElementById("floatingLastName")
    var email = document.getElementById("floatingEmail")
    var password = document.getElementById("floatingPassword-1")
    var re_password = document.getElementById("floatingPassword-2")
    var current


    var sign_up_form = document.getElementById("signUpForm")

    sign_up_form.addEventListener("submit", function (e) {

        if (check_password_equality(password, re_password)) {
            current = email.value
            setCookie(current + "_email", email.value, CurrentfullDate)
            setCookie(current + "_password", password.value, CurrentfullDate)
            setCookie(current + "_firstName", first_name.value, CurrentfullDate)
            setCookie(current + "_lastName", last_name.lvalue, CurrentfullDate)

            location.replace("http://127.0.0.1:5500/views/sign-in/sign-in.html")
        }

        e.preventDefault()

    })


}

function login_form_submit() {
    var sign_in_form = document.getElementById("signInForm")
    var error_msg = document.getElementById("error-msg")
    var error_exit = document.getElementById("error-exit")


    sign_in_form.addEventListener("submit", function (e) {
        var entered_email = document.getElementById("floatingEmail-i")
        var entered_password = document.getElementById("floatingPassword-1-i")

        var authentication = authenticateLogger(entered_email.value, entered_password.value)
        if (authentication) {

            console.log("authenticated")
            location.replace("http://127.0.0.1:5500/views/test-intro/intro.html")
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
        var stored_email = getCookie("email")
        var stored_pass = getCookie("password")
        if (stored_email === entered_email && entered_password === stored_pass) {
            result = true
        }
        return result
    }
    error_exit.addEventListener("click", function () {
        console.log(error_msg.classList.add("invisible"))
    })
}

function check_password_equality(password_1, password_2) {
    if (password_1.value == password_2.value) {
        return true
    }
    console.log(password_1.value)
    console.log(password_2.value)
    fireWarningMsg(password_2)
    return false

}
function fireWarningMsg(password) {
    var re_password_msg = document.getElementById("re-password-invalid")
    re_password_msg.setAttribute("class", "visible text-danger")
    password.setAttribute("class", "form-control border-danger")
    password.value = ""
    setTimeout(function () {
        re_password_msg.setAttribute("class", "invisible text-danger")
        password.setAttribute("class", "form-control")
    }, 2000)
}

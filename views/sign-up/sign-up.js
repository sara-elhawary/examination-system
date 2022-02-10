
Start()

function Start() {

    sign_up_form_submit()

}


function sign_up_form_submit() {
    var first_name = document.getElementById("floatingFirstName")
    var last_name = document.getElementById("floatingLastName")
    var email = document.getElementById("floatingEmail")
    var password = document.getElementById("floatingPassword-1")
    var re_password = document.getElementById("floatingPassword-2")


    var sign_up_form = document.getElementById("signUpForm")

    sign_up_form.addEventListener("submit", function (e) {

        if (check_password_equality(password, re_password)) {
            // localStorage.setItem(`user ${email.value}`, email.value)
            // localStorage.setItem(`user ${email.value} password`, password.value)
            setCookie("email", email.value, CurrentfullDate)
            setCookie("password", password.value, CurrentfullDate)
            setCookie("firstName", first_name.value, CurrentfullDate)
            setCookie("lastName", last_name.value, CurrentfullDate)

            console.log("here")
            location.replace("http://127.0.0.1:5500/views/sign-in/sign-in.html")
        }
        console.log(first_name.value)
        console.log(last_name.value)
        console.log(email.value)
        console.log(password.value)

        e.preventDefault()

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

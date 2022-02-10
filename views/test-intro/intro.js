var container = document.getElementsByClassName("container")[0]

container.addEventListener("click", function (e) {
    var clicked_id = e.target.id
    if (e.target != this && (clicked_id == "eng" || clicked_id == "fr")) {
        var logged = getCookie("logged")
        setCookie(logged + "_exam-type", e.target.id, CurrentfullDate)
        window.location.replace("http://127.0.0.1:5500/views/examination/examination.html")
    }
})
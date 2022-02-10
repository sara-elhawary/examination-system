var score_div = document.getElementsByClassName("score")[0]
var score_num = document.getElementById("score-num")
var msg_div = document.getElementById("message-div")
var msg = document.getElementById("message")
var calendar = document.getElementById("calendar")
var container = document.getElementsByClassName("container")[0]

msg_div.addEventListener("click", function (e) {
    if (e.target.id == "schedule") {
        calendar.innerHTML = '<iframe src="https://calendar.google.com/calendar/embed?height=380&wkst=1&bgcolor=%23ffffff&ctz=Africa%2FCairo&showTitle=0&showNav=0&showTz=0&showPrint=0&showDate=0&showTabs=1&showCalendars=0&hl=en_GB&src=c2FyYWguZWxod2FyaWk5MkBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZmFtaWx5MTM0NTg1MjQ4NjM3ODU3Nzk1OTNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZW4uZWcjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4uc2F1ZGlhcmFiaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZGZobmxvbmszaXYxaHFhdnNnZXNyZXRkcHNhMWVidHFAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%2333B679&color=%23795548&color=%237986CB&color=%230B8043&color=%23A79B8E" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>'
    }
    if (e.target.id == "test") {
        window.location.replace("http://127.0.0.1:5500/views/tests-menu/menu.html")
    }
    if (e.target.id == "home") {
        window.location.replace("http://127.0.0.1:5500/bookify.html")

    }
})
var logged = getCookie("logged")
var score_val = 0
var end_score_val = getCookie(logged + "_score")
var user_name = getCookie(logged + "_firstName")
// var fullname = getCookie("firstName") + " " + getCookie("lastName")

score_num.textContent = score_val

if (end_score_val == 0) {
    showMessage()
} else {
    showScore()
}



function showScore() {
    var inc_score = setInterval(() => {
        score_val++
        if (score_val == end_score_val) {
            clearInterval(inc_score)
            highlightEffect()

        }
        score_num.textContent = score_val
    }, 80);
}

function highlightEffect() {
    score_num.style.transform = 'scale(3)'
    setTimeout(function () {
        score_num.style.transform = 'scale(1)'
        setTimeout(function () {
            appendPercent()
            showMessage()
        }, 200)

    }, 500)
}


function showMessage() {
    if (end_score_val > 60) {
        msg_div.innerHTML = " <h1 class='mt-3 mb-3'>Whoa!!Congratulations " + user_name + " </h1><h1> Keep Rockin'</h1>"
        msg_div.innerHTML += "<button id='test' class='btn btn-primary mt-3 me-2 border-none fs-3'>take another test</button><button id='home' class='btn btn-primary mt-3 ms-2 border-none fs-3'>Homepage</button>"
    } else {
        msg_div.innerHTML = " <h1 class='mt-3 mb-3'>You've got this " + user_name + "</h1><h1>just keep up the hard work</h1>"
        msg_div.innerHTML += "<button id='schedule' class='btn btn-primary mt-3 me-2 border-none fs-3'>schedule another test</button><button id='home' class='btn btn-primary mt-3 ms-2 border-none fs-3'>Homepage</button>"
    }
}

function appendPercent() {
    score_num.textContent += "/100"
}

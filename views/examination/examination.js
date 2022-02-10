var score = {}
var questions_id = []
var q_indexer = 0
var progress_count = 0
var logged = getCookie("logged")
var exam_topic = getCookie(logged + "_exam-type")
var exam_questions = exams[exam_topic]
var range = 10

init()
countdown_timer()


function init() {
    var next_btn = document.getElementById("next")
    var prev_btn = document.getElementById("pre")
    var mark_btn = document.getElementById("mark-btn")
    var submit_btn = document.getElementById("submit-btn")
    var mark_column = document.getElementById("mark-col")


    initialScore()
    deleteCookie(logged + "_score")
    pickQuestions()
    showQuestion(questions_id[q_indexer])
    prev_btn.disabled = true


    next_btn.addEventListener("click", function () {
        evaluateBeforeMove(questions_id[q_indexer])
        var last_check = checkLast(next_btn, prev_btn)
        if (last_check) {
            showQuestion(questions_id[q_indexer])
        }
    })

    prev_btn.addEventListener("click", function () {

        evaluateBeforeMove(questions_id[q_indexer])
        var first_check = checkFirst(next_btn, prev_btn)
        if (first_check) {
            showQuestion(questions_id[q_indexer])
        }
    })
    mark_btn.addEventListener("click", function () {
        markQuestion(mark_btn)
    })

    submit_btn.addEventListener("click", function () {
        evaluateBeforeMove(questions_id[q_indexer])
        if (confirmExit()) {
            score_redirect()
        }
    })

    mark_column.addEventListener("click", function (e) {
        if (e.target.classList.contains("marker")) {
            var marker_id = e.target.children[0].textContent
            // console.log(e.target)
            q_indexer = marker_id - 1
            showQuestion(questions_id[q_indexer])
        }
    })

}
function initialScore() {
    for (var i = 0; i < range; i++) {
        score[i + 1] = 0;
    }
}
function score_redirect() {
    var total_score = calculateScore()
    setCookie(logged + "_score", total_score, CurrentfullDate)
    window.location.replace("http://127.0.0.1:5500/views/score/score.html")
}

function evaluateBeforeMove(question_id) {
    var choice = storeChoice(question_id)

    if (choice) {
        gradeQuestion()
    }
}


function pickQuestions() {

    var min = 1
    var max = 11

    while (questions_id.length != range) {
        var random_num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!questions_id.includes(random_num)) {
            questions_id.push(random_num)
        }
    }
    return questions_id
}


function showQuestion(id) {
    var ui_q_id = document.getElementById("question-id")
    var ui_question_body = document.getElementById("question-body").children[0]
    var ui_current_q = document.getElementById("current")
    var radio_answers = document.getElementsByClassName("form-check-label")
    var radio_inputs = document.getElementsByClassName("form-check-input")
    var q_answers = exam_questions[questions_id[q_indexer]]["answers"]
    var shown_q = exam_questions[questions_id[q_indexer]]



    unselectRadios()
    restoreUserChoice(shown_q)
    checkForMark(id)


    for (var i = 0; i < radio_answers.length; i++) {
        radio_answers[i].textContent = q_answers["op_" + (i + 1)]
    }


    ui_q_id.textContent = q_indexer + 1
    ui_question_body.textContent = exam_questions[id].body
    ui_current_q.textContent = q_indexer + 1

    for (var i = 0; i < radio_inputs.length; i++) {
        radio_inputs[i].addEventListener("change", function () {
            if (!shown_q.answered) {
                updateBar()
                shown_q.answered = true
            }

        })
    }


}
function checkForMark(current_id) {
    var mark_btn = document.getElementById("mark-btn")
    if (!exam_questions[current_id].marked) {
        mark_btn.textContent = "mark"
    } else {
        mark_btn.textContent = "unmark"
    }
}

function storeChoice(question_id) {
    var result = false
    var radios = document.getElementsByClassName("form-check-input")
    var question = exam_questions[question_id]
    // console.log(question_id)
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            question.userChoice = i + 1
            result = true
        }
    }
    return result
}

function gradeQuestion() {
    var grade = exam_questions[questions_id[q_indexer]].grade()
    score[q_indexer + 1] = grade
    // console.log(score)
}
function checkLast(next_btn, prev_btn) {

    var retVal = true
    if (q_indexer < range - 1) {
        prev_btn.disabled = false
        q_indexer++
        if (q_indexer == range - 1) {
            next_btn.disabled = true
        }
    } else {
        retVal = false
    }
    return retVal
}


function checkFirst(next_btn, prev_btn) {
    var retVal = true
    if (q_indexer > 0) {
        q_indexer--
        next_btn.disabled = false
        if (q_indexer == 0) {
            prev_btn.disabled = true
        }
    } else {
        retVal = false
    }
    return retVal
}
function unselectRadios() {
    var radios = document.getElementsByClassName("form-check-input")
    for (var i = 0; i < radios.length; i++) {

        radios[i].checked = false
    }
}

function markQuestion(mark_btn) {
    //project on question object
    // var current_id = document.getElementById("current").textContent
    var current_question = exam_questions[questions_id[q_indexer]]
    var current_id = q_indexer + 1
    var mark_check = current_question.marked
    var mark_column = document.getElementById("mark-col")
    // var mark_btn = document.getElementById("mark-btn")
    var markers = document.getElementsByClassName("q-mark")

    if (!mark_check) {
        current_question.mark()
        mark_btn.textContent = 'Unmark'
        // console.log(current_question)
        //project on ui

        mark_column.innerHTML += '<div class="q-mark border text-center rounded px-4 py-2 mb-2"><p class="marker">Question <span>' + current_id + '<span></p></div >'

    } else {
        current_question.unmark()
        mark_btn.textContent = 'mark'
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].children[0].children[0].textContent == current_id) {
                markers[i].style.display = "none"
            }
        }
    }

}

function confirmExit() {
    var unfinished_flag = false
    var response = true
    for (var i = 1; i <= range; i++) {
        if (!score.hasOwnProperty(i)) {
            unfinished_flag = true
        }
    }
    if (unfinished_flag) {
        response = confirm("you left some questions unanswered")
    }
    return response
}

function calculateScore() {
    var total_score = 0
    for (var i = 0; i < range; i++) {
        if (score.hasOwnProperty(i + 1)) {
            if (score[i + 1] == 10) {
                total_score += 10
            }
        }
    }
    return total_score
}
function restoreUserChoice(q) {
    var radios = document.getElementsByClassName("form-check-input")
    for (var i = 0; i < radios.length; i++) {
        if (q.userChoice == radios[i].id.split("-")[1]) {
            radios[i].checked = true
        }
    }
}


function updateBar() {
    var progress = document.getElementById("progress")
    var step = 1063.88 / range
    progress_count++

    if (progress_count <= range) {
        // progress.style.width = (Number(getComputedStyle(progress)["width"].split("px")[0]) + step) + "px"
        console.log(progress_count)
        progress.style.width = (progress_count * step) + "px"

    }
}


function countdown_timer() {
    var minutes = document.getElementById("minutes")
    var seconds = document.getElementById("seconds")
    var colon = document.getElementById("colon")

    var s_minutes = 1
    var s_seconds = 2

    minutes.textContent = s_minutes
    seconds.textContent = s_seconds
    var timer = setInterval(() => {
        s_seconds--
        if (s_seconds < 0) {
            s_minutes--
            if (s_minutes == 0) {
                minutes.style.color = "red"
                seconds.style.color = "red"
                colon.style.color = "red"
            }
            s_seconds = 59
        }
        if (s_minutes == "00" && s_seconds == "00") {
            clearInterval(timer)
            alert("your time is up!!")
            score_redirect()
        }

        minutes.textContent = (s_minutes).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        seconds.textContent = (s_seconds).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    }, 1000);


}
var c_array = []
var current_date = new Date()
var day = current_date.getDate();
var month = current_date.getMonth() + 1;
var year = current_date.getFullYear();
var CurrentfullDate = new Date(year, month, day)
// var other_date = new Date("2000-04-01")
// console.log(CurrentfullDate);

function setCookie(key, value, expiration_date) {
    // console.log(arguments)
    if (arguments.length != 3) {
        throw "error:set with 3 args"
    }
    document.cookie = `${key}=${value};expires=${expiration_date};path=/;`
    rearrangeCookies()
}

function getCookie(key) {
    var c_array = arrangeCookies()
    // console.log(c_array)
    var key_value
    c_array.forEach(function (ele) {
        if (ele[0] === key) {
            key_value = ele[1]
        }
    })
    return key_value
}

function deleteCookie(key) {
    var d_flag = false
    if (hasCookie(key)) {
        var expired_date = new Date(11 / 11 / 1900)
        setCookie(key, "", expired_date)
        d_flag = true
    }
    return d_flag

    // var cookie_str = ""
    // var splitted_All = document.cookie.split(" ")
    // var split_start

    // splitted_All.filter(function (ele) {
    //     console.log(ele[0])
    //     return ele[0] != "age"
    // })
    // // console.log(cookie_str)
    // // console.log(indexOf(sara))
    // // console.log(splitted_All)

    rearrangeCookies()

}



function hasCookie(key) {
    // console.log(c_array)
    var found = false
    c_array.forEach(function (ele) {
        if (ele[0] === key) {
            found = true
        }
    })
    return found
}

function arrangeCookies() {
    var cookies_arr = document.cookie.split("; ")
    var c_array = []
    cookies_arr.forEach(function (c) {
        c_array.push(c.split("="))
    })
    // console.log(c_array)
    return c_array

}
function rearrangeCookies() {
    c_array = []
    arrangeCookies()
}
function listAllCookies() {
    return c_array
}

function deleteAllCookies() {
    document.cookie = ""
}
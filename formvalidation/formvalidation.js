let val =()=>{

let name = document.querySelector("#Name").value.trim()
let number = document.querySelector("#Num").value
let email = document.querySelector("#Email").value 
let password = document.querySelector("#Password").value
let confirmpassword = document.querySelector("#ConfirmPassword").value

let errname = document.querySelector("#errname")
let errnumber = document.querySelector("#errnumber")
let erremail = document.querySelector("#erremail")
let errpassword = document.querySelector("#errpassword")
let errconfirmpassword = document.querySelector("#errconfirmpassword")

if(name==""){
    errname.innerHTML=" Please Enter Your Name"

    return false
}

else if(isNaN(number)){
    errnumber.innerHTML=" Please Enter Valid Number"
    return false

} 

else if(number.length!=10){
    errnumber.innerHTML=" Please Enter Valid 10 Digit Number"
    return false

} 

 else if(!(email.includes('@') && email.includes('.com'))){
    erremail.innerHTML=" Please Enter Valid Email"
    return false

}

 else if(password!==confirmpassword){
    errpassword.innerHTML=" Please Enter Password"
    
    return false
} 

else if(!(password.match(/[1234567890]/))
    && !(password.match(/[!@#$%^&*()_+]/))
    && !(password.match(/[A-Z]/))
    && !(password.match(/[a-z]/))
){
    errconfirmpassword.innerHTML="Please Enter correct password"
    return false
}
}
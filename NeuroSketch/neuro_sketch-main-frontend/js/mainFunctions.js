let otp = Math.floor(1000 + Math.random() * 9000);

function sendEmail() {
    var params = {
        user_email: document.getElementById('emailAddress').value,
        OTP_CODE: otp
    }
    emailjs.send("service_lpt3ood", "template_c4ccm61", params).then(function (res) {
        alert("OTP Code Send Success !");
    });
}

$('#btnSignUp').click(function () {

    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let emailAddress = $('#emailAddress').val();
    let mobileNumber = $('#mobileNumber').val();
    let password = $('#passWord').val();
    let confirmPassword = $('#confirmPassWord').val();
    let otpCode = $('#emailCodeSend').val();


    if (firstName.length === 0) {
        alert("please enter first name")
    } else {
        if (lastName.length === 0) {
            alert("please enter last name")
        } else {
            if (emailAddress.length === 0) {
                alert("please enter email address")
            } else {
                if (mobileNumber.length === 0) {
                    alert("please enter mobile number")
                } else {
                    if (password.length === 0) {
                        alert("please enter password")
                    } else {
                        if (confirmPassword.length === 0) {
                            alert("please enter confirm password")
                        } else {
                            if (password !== confirmPassword) {
                                alert("password differance")
                            } else {
                                if (otp == otpCode) {
                                    userSave()
                                } else {
                                    alert("OTP Code Error!")
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

function clear() {
    $('#firstName').val(null);
    $('#lastName').val(null);
    $('#emailAddress').val(null);
    $('#mobileNumber').val(null);
    $('#passWord').val(null);
    $('#confirmPassWord').val(null);
    $('#emailCodeSend').val(null);
}

function userSave() {

    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var emailAddress = $('#emailAddress').val();
    var mobileNumber = $('#mobileNumber').val();
    var password = $('#passWord').val();

    try {
        $.ajax({
            method: 'POST',
            url: "/api/v1/neuro_sketch/user-save",
            contentType: "application/json",
            async: false,
            data: JSON.stringify(
                {
                    first_name: firstName,
                    last_name: lastName,
                    email: emailAddress,
                    phone: mobileNumber,
                    password: password
                }
            ),
            success: function (response) {
                if (response.message === "User added successfully!") {
                    alert(response.message);
                    window.location.href = '/signin ';
                } else {
                    alert("User already registered! please sign in now!")
                }
                clear();
            }
        });
    } catch (e) {
    }
}

$('#btnSignIn').click(function () {

    let userEmail = $('#emailAddress').val();
    let userPassword = $('#passWord').val();

    if (userEmail.length === 0) {
        alert("please enter email address")
    } else {
        if (userPassword.length === 0) {
            alert("please enter password")
        } else {
            userLogin();
        }
    }
});

function userLogin() {

    let userEmail = $('#emailAddress').val();
    let userPassword = $('#passWord').val();

    const userLoginURL = `/api/v1/neuro_sketch/${userEmail}`;

    try {
        $.ajax({
            method: "get",
            url: userLoginURL,
            async: true,
            dataType: 'json',
            success: function (response) {
                console.log(response[0].email)
                console.log(response[0].password)

                if (response[0].email === userEmail) {
                    if (response[0].password === userPassword) {
                        window.location.href = '/neuro_sketch';
                    } else {
                        alert("User password wrong!")
                    }
                } else {
                    alert("User Not Register! please sign up now!")
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}


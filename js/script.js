const form = document.getElementById('form');

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirmation = document.getElementById('password-confirmation');

const showPassword = document.querySelector('.eye-password');
const showPasswordConfirmation = document.querySelector('.eye-password-confirmation');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Retirar o reccaregamento da página quando clicar no botão enviar

    checkInput();
})

function checkInput() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmationValue = passwordConfirmation.value;

    // USERNAME
    if (usernameValue === '') {
        setErrorFor(username, 'O nome de usuário é obrigatório.')
    } else if (!checkUsername(usernameValue)) {
        setErrorFor(username, 'Apenas letras, números e sublinhados')
    } else {
        setSuccessFor(username);
    }

    // EMAIL
    if (emailValue === '') {
        setErrorFor(email, 'O email é obrigatório.')
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, 'Insira um email válido.')
    } else {
        setSuccessFor(email);
    }

    // PASSWORD 
    if (passwordValue === '') {
        setErrorFor(password, 'A senha é obrigatória.');

        document.querySelector('.eye-password').style.visibility = "hidden"; // hide
    } else if (passwordValue.length < 7) {
        setErrorFor(password, 'A senha precisa ter no mínimo 7 caracteres.');

        document.querySelector('.eye-password').style.visibility = "visible"; // show
    } else {
        setSuccessFor(password);

        document.querySelector('.eye-password').style.visibility = "visible"; // show
    }

    // PASSWORD CONFIRMATION
    if (passwordConfirmationValue === '') {
        setErrorFor(passwordConfirmation, 'A senha é obrigatório.');

        document.querySelector('.eye-password-confirmation').style.visibility = "hidden"; // hide
    } else if (passwordValue != passwordConfirmationValue) {
        setErrorFor(passwordConfirmation, 'As senhas precisam ser iguais.');

        document.querySelector('.eye-password-confirmation').style.visibility = "visible"; // show
    } else if (passwordValue.length < 7) {
        setErrorFor(passwordConfirmation, '');

        document.querySelector('.eye-password-confirmation').style.visibility = "visible"; // show
    } else {
        setSuccessFor(passwordConfirmation);
        document.querySelector('.eye-password-confirmation').style.visibility = "visible"; // hide
    }

    const formControls = form.querySelectorAll('.form-control');

    const formIsValid = [...formControls].every(formControl => {
        return formControl.className === 'form-control success'
    });

    if(formIsValid) {
        console.log('Formulário preenchido')
    }
}

function setErrorFor(input, message) {
    let formControl = input.parentElement;
    let small = formControl.querySelector('small')

    // Adicionar a mensagem de error
    small.innerText = message;


    // Adicioanr a classe de erro
    formControl.className = 'form-control error'
}

function setSuccessFor(input) {
    let formControl = input.parentElement;

    // Adicionar a classe de sucesso
    formControl.className = 'form-control success';
}



// Mostrar/Ocultar SENHA
showPassword.addEventListener('click', function () {
    if (password.type == 'password') {
        password.type = 'text'
        this.style.opacity = '1'
    } else {
        password.type = 'password'
        this.style.opacity = '.4'
    }
})

//Mostrar/Ocultar CONFIRMAÇÃO DE SENHA


showPasswordConfirmation.addEventListener('click', function () {
    if (passwordConfirmation.type == 'password') {
        passwordConfirmation.type = 'text'
        this.style.opacity = '1'
    } else {
        passwordConfirmation.type = 'password'
        this.style.opacity = '.4'
    }
})



// VERIFICAR EMAIL
function checkEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
}

// VERIFICAR USERNAME
function checkUsername(username) {
    return /^\w+$/.test(username)
}

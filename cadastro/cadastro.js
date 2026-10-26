const inputEmail = document.querySelector("#email-input")
const passwordInput = document.querySelector("#password-input")
const phoneInput = document.querySelector("#tel-input")
const cpfInput = document.querySelector("#cpf-input")
const birthdayInput = document.querySelector("#birthday-input")
const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const userCredentials = {
        email: inputEmail.value,
        password: passwordInput.value,
        phone: phoneInput.value,
        cpf: cpfInput.value,
        birthday: birthdayInput.value,
    }

    const totalUsers = localStorage.length
    try {
        localStorage.setItem(totalUsers, JSON.stringify(userCredentials))
        alert("Usuário cadastrado com sucesso")
    }catch(err){
        alert("Erro ao cadastrar usuário")
        throw new Error(err)
    }
})

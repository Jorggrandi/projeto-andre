// Árvore DOM
const inputEmail = document.querySelector("#email-input")
const passwordInput = document.querySelector("#password-input")
const passwordInput2 = document.querySelector("#password2-input")
const returnMessage = document.querySelector("#returnMsg")
const phoneInput = document.querySelector("#tel-input")
const cpfInput = document.querySelector("#cpf-input")
const birthdayInput = document.querySelector("#birthday-input")
const form = document.querySelector("form")

const userList = []

for (let i = 0; i < localStorage.length; i++) {
    const userKey = localStorage.key(i)
    const userCredentials = localStorage.getItem(userKey)
    userList.push(JSON.parse(userCredentials))
}

// Ação principal, evento de sumbit do form
form.addEventListener("submit", (e) => {
    e.preventDefault()

    const userCredentials = {
        email: inputEmail.value.trim(),
        password: passwordInput.value.trim(),
        phone: phoneInput.value.trim(),
        cpf: cpfInput.value.trim(),
        birthday: birthdayInput.value.trim(),
    }

    const usuario = userList.find((user) => {
        return userCredentials.email === user.email
    })
    if(usuario){
        tentativasAcesso++
        alert("Email já cadastrado")
        return
    }

    const agora = new Date.now()

    if(tentativasAcesso >= 5){
        alert("Aguarde 5 minutos pra tentar acessar novamente")
    }
    if(agora < tempoAcesso){
        alert("Aguarde até seu acesso ser liberado.")
    }



    const totalUsers = localStorage.length
    try {
        localStorage.setItem(totalUsers, JSON.stringify(userCredentials))
        alert("Usuário cadastrado com sucesso")
    } catch (err) {
        alert("Erro ao cadastrar usuário")
        throw new Error(err)
    }

    userList.push(userCredentials)


    if(userCredentials.password === passwordInput2.value.trim() ){
        returnMessage.textContent == `As duas senhas devem ser iguais.`
    }
    
    form.reset()
})

// Máscara de CPF
cpfInput.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");

    valor = valor.replace(/^(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

    e.target.value = valor;
})  

passwordInput2.addEventListener("input", (e) => {
    const senha1 = passwordInput.value.trim() 

    if(e.target.value != senha1){
        returnMessage.innerText = "As duas senhas devem ser iguais."
    }else{
        returnMessage.innerHTML = ""
    }
})
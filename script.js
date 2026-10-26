const inputEmail = document.querySelector("#email-input")
const passwordInput = document.querySelector("#password-input")
const form = document.querySelector("form")

const userList = []

for (let i = 0; i < localStorage.length; i++) {
    const userKey = localStorage.key(i)
    const userCredentials = localStorage.getItem(userKey)
    userList.push(JSON.parse(userCredentials))
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const userCredentials = {
        login: inputEmail.value,
        password: passwordInput.value,
    }

    const user = userList.find((user) => {
        return (user.login === userCredentials.login && user.password === userCredentials.password)
        
    })
    if(!user){
        return alert("Usuário não encontrado")
    }else{
        alert(`Seja bem vindo ${user.login}`)
    }

})


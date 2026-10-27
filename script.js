const inputEmail = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const form = document.querySelector("form");

const userList = [];

const MAX_ATTEMPTS = 5;
const RATE_LIMIT_TIME = 5 * 60 * 1000; // 5 minutos

let attempts = Number(sessionStorage.getItem("loginAttempts")) || 0;
let lockUntil = Number(sessionStorage.getItem("loginLockUntil")) || 0;

// Carrega os usuários
for (let i = 0; i < localStorage.length; i++) {
    const userKey = localStorage.key(i);
    const userCredentials = localStorage.getItem(userKey);

    try {
        const user = JSON.parse(userCredentials);

        if (user && user.login && user.password) {
            userList.push(user);
        }
    } catch {
        // Ignora valores inválidos
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const now = Date.now();

    // Verifica o bloqueio
    if (now < lockUntil) {
        const remaining = Math.ceil((lockUntil - now) / 1000);
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;

        return alert(
            `Muitas tentativas! Tente novamente em ${minutes}m ${seconds}s.`
        );
    }

    // Reseta o bloqueio expirado
    if (lockUntil && now >= lockUntil) {
        attempts = 0;
        lockUntil = 0;

        sessionStorage.removeItem("loginAttempts");
        sessionStorage.removeItem("loginLockUntil");
    }

    const login = inputEmail.value.trim();
    const password = passwordInput.value;

    if (!login || !password) {
        return alert("Preencha todos os campos");
    }

    const user = userList.find((user) => {
        return user.login === login &&
               user.password === password;
    });

    if (!user) {
        attempts++;

        sessionStorage.setItem("loginAttempts", attempts);

        if (attempts >= MAX_ATTEMPTS) {
            lockUntil = Date.now() + RATE_LIMIT_TIME;

            sessionStorage.setItem("loginLockUntil", lockUntil);

            return alert(
                "Muitas tentativas inválidas! Login bloqueado por 5 minutos."
            );
        }

        return alert(
            `Usuário não encontrado. Tentativas restantes: ${
                MAX_ATTEMPTS - attempts
            }`
        );
    }

    // Login bem-sucedido: limpa o rate limit
    attempts = 0;
    lockUntil = 0;

    sessionStorage.removeItem("loginAttempts");
    sessionStorage.removeItem("loginLockUntil");

    alert(`Seja bem-vindo ${user.login}`);
});
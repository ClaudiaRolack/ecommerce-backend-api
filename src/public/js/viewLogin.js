document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    const response = await fetch("/api/sessions/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data)
        window.location.href = "/api/products/view"
    } else {
        console.error("Error en el inicio de sesión")
    }
})
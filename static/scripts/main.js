button = document.getElementById('button')

button.addEventListener('click', async function(ev) {
    let response = await fetch('/analyse', {
        method: 'POST'
    })

    let response_json = await response.json()

    mean_age = document.getElementById('age')

    mean_age.innerHTML = response_json.mean_age
})

if (document.querySelector('#new-org')) {
    document.querySelector('#new-org').addEventListener('submit', (e) => {
        e.preventDefault();
        // Use FormData to grab everything now that we have files mixed in with text
        var form = document.getElementById("new-org");
        var charity = new FormData(form);

        // Assign the multipart/form-data headers to axios does a proper post
        axios.post('/charities', charity, {
                headers: {
                    'Content-Type': 'multipart/form-data;'
                }
            })
            .then(function (response) {
                console.log("response: " + response)
                window.location.replace(`/charities/${response.data.charity._id}`);
            })
            .catch(function (error) {
                // const alert = document.getElementById('alert')
                // alert.classList.add('alert-warning');
                // alert.textContent = 'Oops, something went wrong saving your pet. Please check your information and try again.';
                // alert.style.display = 'block';
                // setTimeout(() => {
                //     alert.style.display = 'none';
                //     alert.classList.remove('alert-warning');
                // }, 3000)
                alert("catch error on client side")
            });
    });
}
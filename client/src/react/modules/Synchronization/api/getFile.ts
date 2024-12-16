const getFile = (platform : string) => {
    fetch("http://localhost:4000/api/" + platform, {
        credentials: "include"
    })
    .then(response => {
        return response.blob()
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'result.json'; // Укажите имя файла
        document.body.appendChild(a);
        a.click();
        a.remove();
    })
    .catch(error => console.error(error));
}


export default getFile;
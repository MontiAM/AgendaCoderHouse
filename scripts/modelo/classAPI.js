class APIinteraccion {
    obtenerFotos = () => {
        let fotos = [];
        let api_key = "563492ad6f9170000100000185c5e543e55a434481064f96fd668c88";
        let img = "montaña";

        $.ajax({
            url: `https://api.pexels.com/v1/search?query=${img}&per_page=15&page=1`,
            type: 'GET',
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', api_key);
            },
            success: (data) => { 
                for(let dato of data.photos) {
                    fotos.push(dato.src.tiny);
                }
            },
            error: (err) => {console.log(err);
            },
        });
        return fotos;
    }
}

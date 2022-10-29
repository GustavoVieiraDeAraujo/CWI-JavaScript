import axios from "axios";

// O que dá para requisitar:
// "itens-habilidades"
// "empregos"
// "interacoes"
// "cheats"

export const get = async (OQueEstaRequisitando) => {
    try {
        const request = await axios.get(`https://emilyspecht.github.io/the-cresim/${OQueEstaRequisitando}.json`)
        return request.data
    } catch (e) {
        console.log(e)
    }
}
import axios from "axios";

export async function get(OQueEstaRequisitando){
    try {
        const request = await axios.get(`https://emilyspecht.github.io/the-cresim/${OQueEstaRequisitando}.json`)
        return request.data
    } catch (e) {
        console.log(e)
    }
}
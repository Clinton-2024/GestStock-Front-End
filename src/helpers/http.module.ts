import axios from "axios";
import { baseUrl } from "../constants/url.constant";

const httpModule = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept':'*/*'
    }
   
});

export default httpModule;
import axios from "axios";
import { accountService } from "./account.service";


const Axios = axios.create({

    baseURL: "http://gaetanpujol.ide.3wa.io:9000",

});

Axios.interceptors.request.use(request => {

    if (accountService.isLogged()) {

        request.headers.Authorization = `${accountService.getToken()}`;

    }

    return request;

})

Axios.interceptors.response.use(response => {

    return response;

}, error => {

    if (error.response.status === 401) {

        accountService.logout();

    }

    return Promise.reject(error);

});

export default Axios;

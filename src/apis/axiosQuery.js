import axiosInstance from './axiosInstance';

//using create get request from client to server
export function getRequest(URL, config) {
    return axiosInstance.get(URL, config).then((response) => response);
}

//using create post request from client to server
export function postRequest(URL, payload, config) {
    return axiosInstance.post(URL, payload, config).then((response) => response);
}

//using create put request from client to server
export function putRequest(URL, payload, config) {
    return axiosInstance.put(URL, payload, config).then((response) => response);
}

//using create patch request from client to server
export function patchRequest(URL, payload, config) {
    return axiosInstance.patch(URL, payload, config).then((response) => response);
}

//using create delete request from client to server
export function deleteRequest(URL, config) {
    return axiosInstance.delete(URL, config).then((response) => response);
}

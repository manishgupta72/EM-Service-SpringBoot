import axios from "axios";

const BASE_URL = "http://localhost:8081/employees";



export const saveEmployeeData = (employee) => {

    return axios.post(BASE_URL, employee);

}

export const getEmployees = () => {
    return axios.get(BASE_URL);
}

export const getEmployeeById = (id) => {
    return axios.get(BASE_URL + "/" + id);
}
export const deleteEmployeeById = (id) => {
    return axios.delete(BASE_URL + "/" + id);
}
export const updateEmployeeById = (employee, id) => {
    return axios.put(BASE_URL + "/" + id, employee);
}

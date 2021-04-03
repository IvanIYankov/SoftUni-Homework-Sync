import * as api from "./api.js"

const host = "http://localhost:3030"
api.settings.host = host;



export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllListings() {
    let data = await api.get(host + "/data/cars?sortBy=_createdOn%20desc");
    return data;
}

export async function createListing(listing) {
    await api.post(host + "/data/cars", listing)
}

export async function getListingById(id) {
    let car = await api.get(host + "/data/cars/" + id);
    return car;
}

export async function deleteCar(id) {
    await api.del(host + "/data/cars/" + id);
}

export async function editCar(id, data) {
    await api.put(host + "/data/cars/" + id, data)
}

export async function getMyListings() {
    let userId = sessionStorage.getItem("userId");
    let data = await api.get(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return data;
}

export async function getCarsByYear(year) {
    let result = await api.get(host + `/data/cars?where=year%3D${year}`);
    return result;
}
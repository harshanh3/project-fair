import commonAPI from "./commonAPI"
import SERVER_URL from "./serverurl"


//registerAPI  
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody)
}

// loginAPI called by Auth
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/login`, reqBody)
}
// addProjectAPI called by Add component when user click add button 
export const addProjectAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/add-project`, reqBody, reqHeader)
}


// getHomeProjectAPI called by home component when page loaded in browser 
export const getHomeProjectAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/home-project`, {})
}

// allProjectAPI called by project compoenent
export const allProjectAPI = async (searchkey,reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/all-projects?search=${searchkey}`, {},reqHeader)
}

// userProjectAPI is called by view component
export const userProjectAPI = async (reqHeader)=>{
    return await commonAPI("GET", `${SERVER_URL}/user-projects`,{},reqHeader)
}

// update projectAPI called by edit component when user click update button projects/67270285045382f01170428e/edit
export const updateProjectAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI("PUT", `${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}
// userProjectRemoveAPi called by view
export const userProjectRemoveAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE", `${SERVER_URL}/projects/${id}/remove`,{},reqHeader)
}
// updateUserAPI called by profile component whwn user click update btn edit-user 
export const updateUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}

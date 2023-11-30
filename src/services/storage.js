export const storage = (data) => { 
    window.localStorage.setItem(data.name, data.value)
}

export const getFromStorage = (name) => {
    return window.localStorage.getItem(name)
}
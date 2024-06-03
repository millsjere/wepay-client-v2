import { combineReducers } from 'redux'


export const loaderReducer = ( loader = true, action) => {
    switch (action.type) {
        case "LOADING":
            return true
        case "EXIT_LOADING":
            return false
        default:
            return loader;
    }
}

export const popupReducer = ( popup = true, action) => {
    switch (action.type) {
        case "SHOW_POPUP":
            return false
        case "DONT_SHOW_POPUP":
            return false
        default:
            return popup;
    }
}

export const userReducer = (user = null, action) => {
    switch (action.type) {
        case "NEW_USER":
            return {...action.payload}
        case "LOGIN_USER":
            return {...action.payload}
        case "NO_USER":
            return false 
        case "LOGOUT_USER":
            return null
        default:
           return user
    }
}

export const notifyReducer = (notifications = [], action) => {
    switch (action.type) {
        case "USER_NOTIFICATIONS":
            return action.payload
        case "NO_USER_NOTIFICATIONS":
            return []
        default:
            return notifications;
    }
}

export const interestReducer = (interest = [], action) => {
    switch (action.type) {
        case "INTEREST_RATES":
            return action.payload
        case "NO_INTEREST_RATES":
            return []
        default:
            return interest;
    }
}

export const paymentReducer = ( payment = { items: [], total: 0 }, action) => {
    switch (action.type) {
        case "USER_PAYMENT":
            const amtArray = action.payload.filter(pay => pay.status === 'confirmed').map(el => el.amount)
            const initialValue = 0;
            const totalAmt = amtArray.reduce((prev, curr) => (parseInt(prev) + parseInt(curr)), initialValue)
            return { items: action.payload, total: totalAmt }
        case "NO_USER_PAYMENT":
            return payment
        default:
            return payment;
    }
}

export const cardReducer = (card = {}, action) => {
    switch (action.type) {
        case "USER_CARD":
            return action.payload
        case "NO_USER_CARD":
            return card
        default:
            return card;
    }
}


export const modalReducer = (modal = null, action) => {
    switch (action.type) {
        case "LOADING_MODAL":
            return { message : action.payload, status: 'loading' }
        case "SUCCESS_MODAL":
            return { message : action.payload, status: 'success' }
        case "ERROR_MODAL":
            return { message : action.payload, status: 'error' }
        case "RESET_MODAL":
            return null
        default:
           return modal
    }
}


export default combineReducers({
    loader: loaderReducer,
    currentUser: userReducer, 
    modal: modalReducer, 
    card: cardReducer, 
    notifications: notifyReducer,
    payment: paymentReducer,
    interest: interestReducer,
    popup: popupReducer
})


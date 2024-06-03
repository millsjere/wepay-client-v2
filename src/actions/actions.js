import axios from 'axios'


export const axiosInstance = axios.create({
    baseURL: "https://wepaygh.com/"
});


export const authRequest = () =>{
    return async (dispatch) => {
        try {
            const res = await axiosInstance.get('/auth/request');
            //console.log(res.data)
            if(res.data.status === 'user found'){
                dispatch({type: "NEW_USER", payload: res.data.data})
                dispatch({type: "EXIT_LOADING"});
            }
            if(res.data.status === 'no user found'){
                dispatch({type: "NO_USER"});
                dispatch({type: "EXIT_LOADING"});
            }
        } catch (error) {
            console.log(error.response)
        }
    }
}

export const registerUser = (data) => {
    return async(dispatch) => {
        try {
            dispatch(successModal('Creating your account...'))
            const res = await axiosInstance.post('/auth/register', data, {
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            })
            if(res.data.status === 'success'){
                dispatch(successModal('Registration successful'))
                window.location.assign('/u/account/dashboard')
                setTimeout(()=>{
                    dispatch({type: "NEW_USER", payload: res.data.data})
                },1500)
            }

        } catch (error) {
            //console.log(error.response);

            if(error.response.data.status === 'failed' && error.response.data.error.code === 11000) {
                const errMessage = `Sorry, ${Object.keys(error.response.data.error.keyValue)[0]} is already taken.`
                dispatch(errorModal(errMessage))
                //console.log(errMessage)
            }
            if(error.response.data.status === 'failed' && error.response.data.error.name === "ValidationError") {
                const errMessage = error.response.data.message.split(':')[2].trim();
                dispatch(errorModal(errMessage))
            }
            // else {
            //     dispatch(errorModal(`Sorry, something went wrong. Please try again`))
            // }
        }
    }
}

export const activateAccount = (token) => {
    return async(dispatch) => {
        try {
            const res = await axiosInstance.get(`/auth/activate/${token}`)
            //console.log(res.data)
            if(res.data.status === 'success'){
              dispatch(successModal('Email verification successful'))
              setTimeout(()=>{
                  window.location.assign('/u/account/dashboard')
              },1500)
            }
            if(res.data.status === 'email verified'){
                dispatch(successModal('Your email address is already verified'))
                setTimeout(()=>{
                    window.location.assign('/u/account/dashboard')
                },1500)
              }
          } catch (error) {
            console.log(error.response)
            dispatch(errorModal(error.response.data.message))
          }
    }
}

export const resendEmailVerification = () => {
    return async(dispatch) => {
        try {
            const res = await axiosInstance.get(`/u/account/resendEmail`)
            if(res.data.status === 'success'){
              dispatch(successModal('Verification email sent. Please check your inbox'))
            }
            
          } catch (error) {
            console.log(error.response)
            dispatch(errorModal('Sorry, could not send email. Please try again'))
          }
    }
}

export const forgortPassword = (email) => {
    return async(dispatch)=> {
        try {
            const res = await axiosInstance.post('/auth/forgotpassword', email)
            if(res.data.status === 'success'){
                dispatch(successModal('A password reset link has been sent to your email'))
            }
        } catch (error) {
            console.log(error.response)
            dispatch(errorModal(error.response.data.message))
          }
    }
}

export const resetPassword = (token, data) => {
    return async(dispatch)=> {
        try {
            const res = await axiosInstance.patch(`/auth/resetpassword/${token}`, data)
            if(res.data.status === 'success'){
                dispatch(successModal('Password reset successful. Please login'))
                setTimeout(()=>{
                    window.location.assign('/auth/login')
                },1500)
            }
        } catch (error) {
            console.log(error.response)
            dispatch(errorModal(error.response.data.message))
          }
    }
}

export const loginUser = (data, token) => {
    return async(dispatch) => {
        if(token) {
            try {
                const res = await axiosInstance.post('/auth/login', data)
                const activate = await axiosInstance.get(`/auth/activate/${token}`)
                
                if((res.data.status === 'success' && activate.data.status === 'success') || (res.data.status === 'success' && activate.data.status === 'email verified')) {
                    dispatch(successModal('Account activated successfully'))
                    window.location.assign(`/u/account/dashboard`)
                    setTimeout(()=>{
                        dispatch({type: "LOGIN_USER", payload: res.data.data})
                        dispatch({type: "EXIT_LOADING"});
                    }, 800)
                }
            } catch (error) {
                if(error.response.data.status === 'failed') {
                    dispatch(errorModal(error.response.data.message))
                }
            }
        }else{
            try {
                const res = await axiosInstance.post('/auth/login', data)
    
                if(res.data.status === 'success') {
                    dispatch(successModal('Login successful...'))
                    window.location.assign(`/auth/verify`)
                    setTimeout(()=>{
                        dispatch({type: "LOGIN_USER", payload: res.data.data})
                        dispatch({type: "EXIT_LOADING"});
                    },500)  
                }
    
            } catch (error) {
                // console.log(error);
                if(error.response.data.status === 'failed') {
                    dispatch(errorModal(error.response.data.message))
                }
            }
        }
        
    }
}

export const verifyUser = (code) => {
    return async(dispatch) => {
        try {
            const res = await axiosInstance.post('/auth/verify', code)
            //console.log(res.data)
            if(res.data.status === 'success') {
                dispatch(successModal('Verification successful...'))
                window.location.assign('/u/account/dashboard')
                setTimeout(() => {
                    dispatch( {type: "LOGIN_USER", payload: res.data.data} )
                },1000)
            }

        } catch (error) {
            // console.log(error);
             // console.log(error.response.data.message)
            if(error.response.data.status === 'failed') {
                dispatch(errorModal(error.response.data.message))
            }
        }
    }
} 


export const updateDetails = (data, field) => {
    return async (dispatch) => {
        try {
            const res = await axiosInstance.patch(`/u/account/profile/edit/${field}`, data)
            // console.log(res.data)
            if(res.data.status === 'success') {
                dispatch(successModal(`${field} details updated successfully`))
                    dispatch( {type: "LOGIN_USER", payload: res.data.data} )
                    setTimeout(()=> {
                        window.location.assign('/u/account/dashboard')
                    }, 1000)
            }
        } catch (error) {
            //console.log(error);
             // console.log(error.response.data.message);
            if(error.response.data.status === 'failed') {
                dispatch(errorModal(`Sorry, could not upload ${field}. Try again`))
            }
        }
    }
}

export const uploadDocuments = (data, field) => {
    return async(dispatch) => {
        try {
            const res = await axiosInstance.patch(`/u/account/profile/${field}`, data, {
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            })
            if(res.data.status === 'success') {
                dispatch(successModal(`${field} updated successfully`))
                    dispatch( {type: "LOGIN_USER", payload: res.data.data} )
                    setTimeout(()=> {
                        window.location.assign('/u/account/dashboard')
                    }, 1000)
            }
        } catch (error) {
            // console.log(error);
            // console.log(error.response.data.message)
            if(error.response.data.status === 'failed') {
                dispatch(errorModal(`Sorry, could not upload ${field}. Try again`))
            }
        }
    }
}

export const changePassword = (data) => {
    return async(dispatch) => {
        try {
            const res = await axiosInstance.patch('/u/account/settings', data)
            if(res.data.status === 'success'){
                dispatch(successModal('Password updated successfully'))
                setTimeout(()=>{
                    window.location.reload();
                }, 1000)
            }
        } catch (error) {
            dispatch(errorModal(error.response.data.message))
        }
    }
}

export const logoutUser = () => {
    return async(dispatch) => {
        try {
            const res = await axiosInstance.get('/auth/logout')
            if(res.data.status === 'success') {
                dispatch( {type: "LOGOUT_USER"} )
            }
            
        } catch (error) {
            console.log(error.response)
        }
    }
}

// USER NOTIFICATIONS ACTIONS //

export const getUserNotifications = () => {
    return async(dispatch) => {
        try {
            const res = await axiosInstance.get('/api/v1/notifications')
            //console.log(res.data)
            if(res.data.status === 'success'){
                dispatch({type: "USER_NOTIFICATIONS", payload: res.data.data})
            }else {
                dispatch({type: "NO_USER_NOTIFICATIONS"})
            }
        } catch (error) {
            dispatch(errorModal('Sorry, could not fetch user notifications'))
            console.log(error)
        }
    }
}

export const markAsRead = (id) => {
    return async(dispatch) => {
        try {
            const res = await axiosInstance.patch(`/api/v1/notifications/${id}`)
            //console.log(res.data)
            if(res.data.status === 'success'){
                dispatch({type: "USER_NOTIFICATIONS", payload: res.data.data})
            }
        }catch(error) {
            dispatch(errorModal('Sorry, could not update your notification'))
            console.log(error)
        }
    }
}

// CARD ACTION CREATIONS
export const getUserCard = () => {
    return async(dispatch) => {
        try {
            const res = await axiosInstance.get(`/api/v1/cards/user`)
            //console.log(res.data)
            if(res.data.status === 'success'){
                dispatch({type: "USER_CARD", payload: res.data.data})
            }else{
                dispatch({type: "NO_USER_CARD"})
            }
        }catch(error) {
            dispatch(errorModal('Sorry, could not fetch your card'))
            console.log(error)
        }
    }
}

// USER PAYMENT ACTION CREATIONS
export const getUserPayment = () => {
    return async(dispatch) => {
        try {
            const res = await axiosInstance.get(`/api/v1/payment`)
            //console.log(res.data)
            if(res.data.status === 'success'){
                dispatch({type: "USER_PAYMENT", payload: res.data.data})
            }else{
                dispatch({type: "NO_USER_PAYMENT"})
            }
        }catch(error) {
            dispatch(errorModal('Something went wrong. Could not fetch your payment'))
            //console.log(error)
        }
    }
}

export const getInterestRates = () => {
    return async (dispatch) => {
        try {
            const res = await axiosInstance.get('/api/v1/settings/interest');
            //console.log(res.data.data)
            dispatch({type: "INTEREST_RATES", payload: res.data.data})
            
        } catch (error) {
            dispatch(errorModal('Could not fetch interest rates. Please check your connection'))
        }
    }
}

export const requestLoan = (data) => {
    return async (dispatch) => {
        try {
            const res = await axiosInstance.patch('/api/v1/loan', data)
            //console.log(res.data)
            if(res.data.status === 'success'){
                dispatch(successModal('Congratulations!! Your loan request has been submitted'))
                setTimeout(()=>{
                    window.location.reload()
                }, 1500)
            }
            
        } catch (error) {
            dispatch(errorModal('Sorry, something went wrong. Could not submit your loan request'))
        }
    }
}

//POPUPS
export const popupSettings = () => {
    return async (dispatch) => {
        try {
            const res = await axiosInstance.get('/u/account/popup/settings')
            //console.log(res.data)
            if(res.data.status === 'success'){
                dispatch({type: "LOGIN_USER", payload: res.data.data})
            }
            
        } catch (error) {
            dispatch(errorModal('Sorry, something went wrong. Reload'))
        }
    }
}

export const welcomePopup = () => {
    return async (dispatch) => {
        try {
            const res = await axiosInstance.get('/u/account/popup/welcome')
            //console.log(res.data)
            if(res.data.status === 'success'){
                dispatch({type: "LOGIN_USER", payload: res.data.data})
            }
            
        } catch (error) {
            dispatch(errorModal('Sorry, something went wrong. Reload'))
        }
    }
}

// MODAL ACTIONS

export const successModal = (message) => {
    return {
        type : "SUCCESS_MODAL",
        payload : message
    }
}

export const loadingModal = (message) => {
    return {
        type : "LOADING_MODAL",
        payload : message
    }
}

export const errorModal = (message) => {
    return {
        type : "ERROR_MODAL",
        payload : message
    }
}

export const resetModal = () => {
    return {
        type : "RESET_MODAL"
    }
}
import generalTypes from "./general.types";

export const enableLoading = () => ({
  type: generalTypes.ENABLE_LOADING,
});

export const disableLoading = () => ({
  type: generalTypes.DISABLE_LOADING,
});

//notifications
export const updateSuccessNotification = (message: string) => ({
  type: generalTypes.UPDATE_SUCCESS_NOTIFICATION,
  payload: message,
});

export const updateFailNotification = (message: string) => ({
  type: generalTypes.UPDATE_FAIL_NOTIFICATION,
  payload: message,
});

export const updateInformationNotification = (message: string) => ({
  type: generalTypes.UPDATE_INFORMATION_NOTIFICATION,
  payload: message,
});

export const clearNotification = () => ({
  type: generalTypes.CLEAR_NOTIFICATION,
});

// API requests
export const updateSuccessApiRequest = (message: string) => ({
  type: generalTypes.UPDATE_SUCCESS_API_REQUEST,
  payload: message,
});

export const updateFailApiRequest = (message: string) => ({
  type: generalTypes.UPDATE_FAIL_API_REQUEST,
  payload: message,
});

export const clearApiRequest = () => ({
  type: generalTypes.CLEAR_API_REQUEST,
});

export const saveLastEndpoint = (endpoint:string) => ({
  type: generalTypes.SAVE_LAST_ENDPOINT,
  payload: endpoint
})

export const removeLastEndpoint = () => ({
  type: generalTypes.REMOVE_LAST_ENDPOINT,
  
})

export const updateLang = (lang:string) => ({
  type: generalTypes.UPDATE_LANG,
  payload: lang
})


export const scrollToContacts = (signal:boolean) => ({
  type: generalTypes.SCROLL_CONTACTS,
  payload: signal
})

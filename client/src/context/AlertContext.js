import React, { useState} from 'react'

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export const AlertContext = React.createContext(null)

const AlertContextProvider = ({children}) => {
    const [alertText, setAlertText] = useState(null)
    const [alertStyle, setAlertStyle] = useState('error')

    const setAlert = (text, style) => {
        setAlertStyle(style)
        setAlertText(text)
    }

    return (
        <AlertContext.Provider value={{setAlert}}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={!!alertText}
                autoHideDuration={5000}
                onClose={() => setAlertText(null)}
            >
                <Alert severity={alertStyle} variant="filled">{alertText}</Alert>
            </Snackbar>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertContextProvider

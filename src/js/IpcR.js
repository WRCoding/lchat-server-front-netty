const {ipcRenderer} = window.require('electron')

export default {
    login(data){
        ipcRenderer.send('login',data)
    }
}


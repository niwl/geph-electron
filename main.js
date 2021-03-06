const {
	app,
	BrowserWindow
} = require('electron')
const path = require('path')
const url = require('url')

//app.disableHardwareAcceleration()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
	// Create the browser window.
	const os = require('os')
	const {shell} = require('electron')

	if (os.platform() == "win32") {
		win = new BrowserWindow({
			width: 400,
			height: 400,
			resizable: false,
			maximizable: false
		})
	} else {
		win = new BrowserWindow({
			width: 400,
			height: 380,
			resizable: false,
			maximizable: false
		})
	}
	win.webContents.on('new-window', function(event, url) {
		event.preventDefault()
		shell.openExternal(url)
	})

	win.setMenu(null);
	// Prevent the UI itself from being routed through Geph
	win.webContents.session.setProxy({proxyRules:"direct://"}, () => console.log("UI proxy unset"))

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'login.html'),
		protocol: 'file:',
		slashes: true
	}))

	// Open the DevTools.
	//win.webContents.openDevTools()
	//win.setResizable(true);

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	app.quit()
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

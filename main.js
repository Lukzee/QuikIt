const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

// init win
let win;

// run create window function
app.on('ready', function(){
    // create browser window
    win = new BrowserWindow({
        width:900,
        height:900,
        webPreferences: {
            nodeIntegration: true
        },
        icon:__dirname+'/img/myIcon.png'
    });

    // load index.html
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    // open devtools
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });

    // build menu temp
    const mainmenu = Menu.buildFromTemplate(mainmenuTemp);
    // insert menu
    Menu.setApplicationMenu(mainmenu);
});

//quit when all window are closed

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

// create menu temp
const mainmenuTemp = [
    {
        label:'Edit',
        submenu: [
            { role: 'Save'},
            { role: 'exit'}
        ]
    },
    {
        label:'Veiw',
        submenu: [
            { role: 'reload'},
            { role: 'undo'},
            { role: 'redo'},
            { role: 'selectall'}
        ]
    }
];
const electron = require('electron');
const path = require('path');
const url = require('url');

const {app, BrowserWindow, Menu} = electron;

// Set environment
process.env.NODE_ENV = 'production';

// init win
let win;

// run create window function
app.on('ready', function(){
    // create browser window
    win = new BrowserWindow({
        width:1000,
        height:1000,
        webPreferences: {
            nodeIntegration: true
        },
        icon:__dirname+'/img/Grap.jpg'
    });

    // load index.html
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

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
        label: 'Veiw',
        submenu: [
            { role: 'Reload'},
            { role: 'Quit'}
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Report bug'
            },
            {
                label: 'Comment'
            }
        ]
    }
];

// if mac, add empty object to menu
if(process.platform == 'darwin') {
    mainmenuTemp.unshift({});
}

// add developer tools item if not in prod
if(process.env.NODE_ENV !== 'production') {
    mainmenuTemp.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
}
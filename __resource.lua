resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

description 'FiveM Lua Menu Framework'

ui_page 'html/ui.html'

client_script { 
    'client/main.lua',
}

exports {
    'CreateMenu',
    'DestroyMenus',
    'AddButton',
    'AddAdvancedButton',
    'AddCheckButton',
    'AddSlider',
    'AddSubMenu',
    'AddSubMenuBack',
    'OpenMenu',
}

files {
    'html/ui.html',
    'html/css/style.css',
    'html/js/app.js',

    'html/libs/jquery-ui.min.css',
    'html/libs/bootstrap.min.css',
    'html/libs/all.min.css',
    'html/libs/jquery.min.js',
    'html/libs/jquery-ui.min.js',
    'html/libs/bootstrap.min.js',
    'html/libs/popper.min.js',
    'html/libs/all.min.js',
}
var isMenuOpen = false;
var menus = new Array();


function CreateMenu(title, subtitle, optionChange, close) {
    menus.push(new Menu(title, subtitle, optionChange, close));
    return (menus.length - 1);
}

function DestroyMenus() {
    menus = new Array();
}

class Menu {
    constructor(title, subtitle, optionChange, close) {
        this.title = title;
        this.subtitle = subtitle;
        this.optionCb = optionChange;
        this.closeCb = close;
        this.buttons = new Array();
    }
}

function AddButton(index, label, data, disabled, select) {
    menus[index].buttons.push({
        type: 1,
        label: label,
        disabled: disabled,
        data: data,
        select: select
    });
}

function AddAdvancedButton(index, label, right, data, disabled, select) {
    menus[index].buttons.push({
        type: 4,
        label: label,
        right: right,
        disabled: disabled,
        data: data,
        select: select
    });
}

function AddCheckButton(index, label, data, disabled, select) {
    menus[index].buttons.push({
        type: 5,
        label: label,
        disabled: disabled,
        data: data,
        select: select
    });
}

function AddSlider(index, label, data, max, disabled, select, valChange) {
    menus[index].buttons.push({
        type: 2,
        label: label,
        max: max,
        disabled: disabled,
        data: data,
        select: select,
        slideChange: valChange
    });
}

function AddSubMenu(index, label, sub, disabled) {
    menus[index].buttons.push({
        type: 0,
        label: label,
        disabled: disabled,
        data: sub
    });
}

function AddSubMenuBack(index, label) {
    menus[index].buttons.push({
        type: -1,
        label: label
    });
}

function OpenMenu(resource) {
    setTimeout(function(){
        SendNuiMessage(JSON.stringify({
            action: "display",
            resource: resource,
            data: menus
        }));

        SetNuiFocus(true, false)
        DisableControls()
        isMenuOpen = true
    }, 100); 
}

function DisableControls() {
    let ped = PlayerPedId();
    let timer = setInterval(function(){
        if (!isMenuOpen) {
            console.log('boop');
            clearInterval(timer);
        } else {
            console.log('lol');
            DisableControlAction(0, 75, true); // disable exit vehicle
            DisablePlayerFiring(PlayerId(), true);    // Disable weapon firing
            DisableControlAction(0, 24, true); // disable attack
            DisableControlAction(0, 25, true); // disable aim
            DisableControlAction(1, 37, true); // disable weapon select
            DisableControlAction(0, 47, true); // disable weapon
            DisableControlAction(0, 58, true); // disable weapon
            DisableControlAction(0, 140, true); // disable melee
            DisableControlAction(0, 141, true); // disable melee
            DisableControlAction(0, 142, true); // disable melee
            DisableControlAction(0, 143, true); // disable melee
            DisableControlAction(0, 263, true); // disable melee
            DisableControlAction(0, 264, true); // disable melee
            DisableControlAction(0, 257, true); // disable melee
        }
      }, 500);
}

RegisterNuiCallbackType("CloseUI");
on("__cfx_nui:CloseUI", (data) => {
    PlaySoundFrontend(-1, "QUIT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
    SetNuiFocus(false, false)
    isMenuOpen = false
    callingResource = null
});

RegisterNuiCallbackType("CloseCb");
on("__cfx_nui:CloseCb", (data) => {
    if (data.callback != 'none') {
        emit(data.resource + ':client:' + data.callback, data.data)
    }
});

RegisterNuiCallbackType("SelectItem");
on("__cfx_nui:SelectItem", (data) => {
    if (data.callback != 'none') {
        emit(data.resource + ':client:' + data.callback, data.data)
    }
});

RegisterNuiCallbackType("SlideValueChange");
on("__cfx_nui:SlideValueChange", (data) => {
    if (data.callback != 'none') {
        emit(data.resource + ':client:' + data.callback, data.data)
    }
});

RegisterNuiCallbackType("MenuOptionChange");
on("__cfx_nui:MenuOptionChange", (data) => {
    if (data.callback != 'none') {
        emit(data.resource + ':client:' + data.callback, data.data)
    }
});

RegisterNuiCallbackType("MenuUpDown");
on("__cfx_nui:MenuUpDown", (data) => {
    PlaySoundFrontend(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
});

RegisterNuiCallbackType("MenuSelect");
on("__cfx_nui:MenuSelect", (data) => {
    PlaySoundFrontend(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
});


RegisterNuiCallbackType("MenuSelectDisabled");
on("__cfx_nui:MenuSelectDisabled", (data) => {
    PlaySoundFrontend(-1, "ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
});

RegisterNuiCallbackType("MenuSlideChange");
on("__cfx_nui:MenuSlideChange", (data) => {
    PlaySoundFrontend(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
});

RegisterNuiCallbackType("MenuBack");
on("__cfx_nui:MenuBack", (data) => {
    PlaySoundFrontend(-1, "CANCEL", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
});
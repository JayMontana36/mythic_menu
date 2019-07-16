# Mythic Menu

This is a NUI-Based Menu that was custom built for use with Mythic Framework & resources made for it. Opted to go for this as pretty much all other menu frameworks either miss the rather simple feature of remembering the parents menu location and/or are extremely resource heavy when using.

This is built using NUI so there is no draw calls having to be made every frame, but because of that there is a lot of settings to configure to have communication back and forth for all events you'd need in a menu.

Due to this not being a real proper release and being added for sake of VC, the documentation for it is going to be extremely lacking. But I'll include a code snippet from my LS Customs script to show how to create it. Apart from that I'd suggest reading the code to get a sense of what's happening.

![Mythic Menu](https://i.imgur.com/OyDqIof.png)

### Use Snippet - 

```LUA
function SetupMenu()
    local player = PlayerPedId()
    local veh = GetVehiclePedIsIn(player, false)
    SetVehicleModKit(veh, 0)

    local primaryColor, secondaryColor = GetVehicleColours(veh)
    local pearlescentColor, wheelColor = GetVehicleExtraColours(veh)

    currentMods.primaryColor = primaryColor
    currentMods.secondaryColor = secondaryColor
    currentMods.pearlescentColor = pearlescentColor
    currentMods.wheelColor = wheelColor
    
    exports['mythic_menu']:DestroyMenus()
    local menu = exports['mythic_menu']:CreateMenu('Los Santos Customs', 'Modify Your Vehicle', nil, 'ExitLSCustoms')

    if IsVehicleDamaged(veh) then
        local vehHp = GetEntityHealth(veh)
        local repairCost = (1000 - vehHp) * 5

        exports['mythic_menu']:AddAdvancedButton(menu, 'Repair Vehicle', '$' .. FormatCurrency(repairCost), { cost = repairCost }, false, 'RepairVehicle')
    end

    local respray = exports['mythic_menu']:CreateMenu('Respray', 'Paint Your Vehicle', nil, 'ResetColors')

    for i = 1, 2, 1 do
        local titleStr = ''
        sTitleStr = ''
        if i == 1 then
            titleStr = 'Primary Color'
            sTitleStr = 'Change Your Vehicle\'s Primary Color'
        else
            titleStr = 'Secondary Color'
            sTitleStr = 'Change Your Vehicle\'s Secondary Color'
        end

        local colors = exports['mythic_menu']:CreateMenu(titleStr, sTitleStr, nil, 'ResetColors')
        for k, v in pairs(Config.Colors) do
            if k == 'Metalic' and i == 2 or k == 'Pearls' then 

            else
                local colors2 = exports['mythic_menu']:CreateMenu(k, 'Paint Your Vehicle', 'ShowColor', 'ResetColors')
                for k2, v2 in pairs(v) do
                    exports['mythic_menu']:AddAdvancedButton(colors2, v2.name, '$' .. FormatCurrency(v2.cost), { type = i, color = v2 }, false, 'ChangeColor')
                end

                exports['mythic_menu']:AddSubMenu(colors, k, { index = colors2 }, false)
            end
        end
        
        exports['mythic_menu']:AddSubMenu(respray, titleStr, { index = colors }, false)
    end

    local pearl = exports['mythic_menu']:CreateMenu('Pearlescent', 'Paint Your Vehicle', 'ShowColor', 'ResetColors')
    for k, v in pairs(Config.Colors['Pearls']) do
        exports['mythic_menu']:AddAdvancedButton(pearl, v.name, '$' .. FormatCurrency(v.cost), { type = 3, color = v }, false, 'ChangeColor')
    end
    exports['mythic_menu']:AddSubMenu(respray, 'Pearlescent', { index = pearl }, false)

    exports['mythic_menu']:AddSubMenu(menu, 'Respray', { index = respray }, false)

    for i = 1, 48, 1 do
        local mods = exports['mythic_menu']:CreateMenu(Config.Categories[i].name, 'Modify Your Vehicle', nil, 'ResetColors')

        local count = GetNumVehicleMods(veh, i)

        if count > 0 then
            local mod = GetVehicleMod(veh, i)
            for j = 1, count, 1 do
                local titleStr = ''
                if GetModTextLabel(veh, i, j) ~= nil then
                    titleStr = GetModTextLabel(veh, i, j)
                else
                    titleStr = j
                end

                exports['mythic_menu']:AddAdvancedButton(mods, titleStr, '$' .. FormatCurrency(100 * (i + 1)), { type = i, mod = j }, false, 'AddMod')
            end

            exports['mythic_menu']:AddSubMenu(menu, Config.Categories[i].name, { index = fuck }, false)
        end
    end

    exports['mythic_menu']:OpenMenu(GetCurrentResourceName())

    if not inLSCustom then
        EnterLSCustom()
    end
end
```

>NOTE: The above is a single function from my LS Customs Script, please don't expect it to work. If it's not released on our Github yet please don't ask for the full script.
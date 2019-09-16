# Mythic Menu

This is a NUI-Based Menu that was custom built for use with Mythic Framework & resources made for it. Opted to go for this as pretty much all other menu frameworks either miss the rather simple feature of remembering the parents menu location and/or are extremely resource heavy when using.

This is built using NUI so there is no draw calls having to be made every frame, but because of that there is a lot of settings to configure to have communication back and forth for all events you'd need in a menu.

Due to this not being a real proper release and being added for sake of VC, the documentation for it is going to be extremely lacking. But I'll include a code snippet from my LS Customs script to show how to create it. Apart from that I'd suggest reading the code to get a sense of what's happening.

![Mythic Menu](https://i.imgur.com/PERXLHS.png)

### Use Snippet - 

```LUA
function SetupMenu()

    -- ... TRUNCATED ... --

    for k, v in pairs(Config.ModsCategories) do
        local mods = Menu:CreateMenu(v.name, 'Modify Your Vehicle', 'ShowMods', 'ResetMods')
        local count = GetNumVehicleMods(veh, v.index) - 1

        if count > 0 then
            local mod = GetVehicleMod(veh, v.index)

            if mod == -1 then
                Menu:AddAdvancedButton(mods, 'Stock', 'INSTALLED', { item = { index = v.index, mod = -1, category = 0, cat_index = 0 } }, true, 'AddMod')
            else
                Menu:AddAdvancedButton(mods, 'Stock', '$' .. FormatCurrency(0), { item = { index = v.index, mod = -1, category = 0, cat_index = 0 } }, false, 'AddMod')
            end

            for j = 1, count, 1 do
                local titleStr = ''
                if GetModTextLabel(veh, v.index, j) ~= nil then
                    titleStr = GetLabelText(GetModTextLabel(veh, v.index, j))
                else
                    titleStr = v.name .. ' Tier ' .. j
                end

                local price = 0
                if type(v.price) == "table" then
                    price = v.price[j]
                else
                    price = v.price
                end
                
                if mod == j then
                    Menu:AddAdvancedButton(mods, titleStr, 'INSTALLED', { item = { index = v.index, mod = j, category = k, cat_index = j } }, true, 'AddMod')
                else
                    Menu:AddAdvancedButton(mods, titleStr, '$' .. FormatCurrency(price), { item = { index = v.index, mod = j, category = k, cat_index = j } }, false, 'AddMod')
                end
            end

            Menu:AddSubMenu(menu, v.name, { index = mods }, false)
        end
    end

    Menu:AddSubMenu(menu, 'Horns', { index = SetupHorns(veh) }, false)

    Menu:OpenMenu(GetCurrentResourceName())

    -- ... TRUNCATED ... --

end
```

>NOTE: The above is a single function from my LS Customs Script, please don't expect it to work. If it's not released on our Github yet please don't ask for the full script.

>NOTE: Yes, there is a JS client file. I was looking to see what sort of overhead there was using JS for the client stuff opposed to the LUA. From the bit of testing it was a significant overhead compared to the LUA implementation so I did abandon it. Left it for the sake of having it in case I change my mind down the road.
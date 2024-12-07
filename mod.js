if (D2RMM.getVersion == null || D2RMM.getVersion() < 1.6) {
    D2RMM.error('Requires D2RMM version 1.6 or higher.');
    return;
}

const language = config.language
const controllerAvailable = false

addStyleToProfileHD();
addItemDictionaryToPauseMenu();
addItemDictionaryToHelpPanel();
addCubeRecipeButtonToCube();
addString();




function addStyleToProfileHD()
{
    const profileHDFilename = 'global\\ui\\layouts\\_profilehd.json';
    const profileHD = D2RMM.readJson(profileHDFilename);

    profileHD.DictionaryModCreditRect = { 'x': 12, 'y': 12 };
    profileHD.DictionaryModCreditText = '@dictCredit';
    profileHD.DictionaryModCreditStyle = {
        'fontColor': '$FontColorGoldYellow',
        'pointSize': '$MediumLargeFontSize',
        'alignment': { 'h': 'left' },
        'options': { 'newlineHandling': 'standard' }
    };

    profileHD.StyleDictionaryDefaultImageRect = { 'x': 16, 'y': 16 };

    profileHD.DictionaryOptionScrollImage = 'items/misc/quest/bark_scroll';

    profileHD.StyleDictionaryNotice = {
        'fontColor': '$FontColorGreen',
        'pointSize': '$XMediumFontSize',
        'alignment': { 'h': 'left', 'v': 'center' },
        'options': { 'newlineHandling': 'standard' },
        'spacing': { 'kerning': 0.9 }
    };

    profileHD.StyleDictionaryCategory = {
        'fontColor': '$FontColorGoldYellow',
        'pointSize': '$LargeFontSize',
        'alignment': { 'h': 'left', 'v': 'top' },
        'options': { 'newlineHandling': 'standard' },
        'spacing': { 'kerning': 0.9 },
        'dropShadow': '$DefaultDropShadow'
    };

    profileHD.StyleDictionaryItemDescription = {
        'fontColor': '$FontColorWhite',
        'pointSize': '$XMediumFontSize',
        'alignment': { 'h': 'left', 'v': 'top' },
        'options': { 'newlineHandling': 'standard' },
        'spacing': { 'kerning': 0.9 }
    };
        
    profileHD.StyleDictionaryRunewordRune = {
        'fontColor': '$FontColorWhite',
        'pointSize': '$MediumLargeFontSize',
        'alignment': { 'h': 'center', 'v': 'top' },
        'options': { 'newlineHandling': 'standard' },
        'spacing': { 'kerning': 0.9 },
        'dropShadow': '$DefaultDropShadow'
    };
        
    profileHD.StyleDictionaryRunewordDescription = {
        'fontColor': '$FontColorWhite',
        'pointSize': '$XMediumFontSize',
        'alignment': { 'h': 'left', 'v': 'top' },
        'options': { 'newlineHandling': 'standard' },
        'spacing': { 'kerning': 0.9 }
    };

    profileHD.DictionaryNormalItemTableColumnLeft = { "width": 500, "alignment": { "h": "left", "v": "fit" } };
    profileHD.DictionaryNormalItemTableColumnCenter = { "width": 500, "alignment": { "h": "center", "v": "fit" } };
    profileHD.DictionaryNormalItemTableColumnRight = { "width": 500, "alignment": { "h": "right", "v": "fit" } };
    profileHD.DictionaryNormalItemRowHeight = 110;

    D2RMM.writeJson(profileHDFilename, profileHD);
}


function addItemDictionaryToPauseMenu()
{
    if (config.addButtonToPauseMenu == false) {
        return;
    }

    const pauselayouthdFilename = 'global\\ui\\layouts\\pauselayouthd.json';
    const pauselayouthd = D2RMM.readJson(pauselayouthdFilename);

    function buttonWidgetMaker(name, textString, onClickMessage)
    {
        const buttonWidget =  { "fields": {} };
        buttonWidget.type = "ButtonWidget";
        buttonWidget.name = name;
        buttonWidget.fields.filename = "PauseMenu\\PauseButton";
        buttonWidget.fields.hoveredFrame = 3;
        buttonWidget.fields.textString = textString;
        buttonWidget.fields.pressLabelOffset = [ 0, 0 ];
        buttonWidget.fields.onClickMessage = "PanelManager:OpenPanel:" + onClickMessage;
        buttonWidget.fields.textColor = "$FontColorLightTeal";
        buttonWidget.fields["text/style"] = "$StyleFEButtonText";
        buttonWidget.fields.acceptsReturnKey = true;
        buttonWidget.fields.focusOnMouseOver = true;
        buttonWidget.fields.sound = "select";
        return buttonWidget;
    }

    const itemDictionaryTableWidget = {
        "type": "TableWidget", "name": "PauseInfoTable",
        "fields": {
            "anchor": { "x": 0.5, "y": 0.5 },
            "rect": { "x": -680, "y": 180 },
            "columns": [
                { "width": 680, "alignment": { "h": "center", "v": "center" } },
                { "width": 680, "alignment": { "h": "center", "v": "center" } }
                ],
            "rowHeight": 140,
            "generateFocusLinks": true
        },
        "children": []
    };

    const itemDictionaryTableControllerWidget = {
        "type": "TableWidget", "name": "PauseInfoTable",
        "fields": {
            "anchor": { "x": 0.5, "y": 0.5 },
            "rect": { "x": 564 - 340, "y": 840 },
            "columns": [
                { "width": 680, "alignment": { "h": "center", "v": "center" } },
                { "width": 680, "alignment": { "h": "center", "v": "center" } }
                ],
            "rowHeight": 140,
            "generateFocusLinks": true
        },
        "children": []
    };

    const nameArray = [ ["NormalWeaponDictionary", "NormalArmorDictionary"], ["UniqueWeaponDictionary", "UniqueArmorDictionary"], ["RunewordItemDictionary", "SetItemDictionary"], ["CubeRecipeDictionary"] ];
    const buttonTextList = [
        ["@dictTextNormalWeapons", "@dictTextNormalArmors"],
        ["@dictTextUniqueWeapons", "@dictTextUniqueArmors"],
        ["@dictTextRunewords", "@dictTextSetItems"],
        ["@dictTextCubeRecipes"]
    ];


    const onClickMessageArray = [
        [
            {"enUS": "ItemDictionaryNormalWeaponMainPanel", "koKR": "ItemDictionaryNormalWeaponMainPanel"},
            {"enUS": "ItemDictionaryNormalArmorMainPanel", "koKR": "ItemDictionaryNormalArmorMainPanel"}
        ],
        [
            {"enUS": "ItemDictionaryUniqueWeaponMainPanelEng", "koKR": "ItemDictionaryUniqueWeaponMainPanelKor"},
            {"enUS": "ItemDictionaryUniqueArmorMainPanelEng", "koKR": "ItemDictionaryUniqueArmorMainPanelKor"}
        ],
        [
            {"enUS": "ItemDictionaryRunewordMainPanelEng", "koKR": "ItemDictionaryRunewordMainPanelKor"},
            {"enUS": "ItemDictionarySetItemMainPanelEng", "koKR": "ItemDictionarySetItemMainPanelKor"}
        ],
        [
            {"enUS": "ItemDictionaryCubeRecipeMainPanelEng", "koKR": "ItemDictionaryCubeRecipeMainPanelKor"},
        ]
    ];
    // json file name must be "{onClickMessage}hd.json"

    for (let i = 0; i < nameArray.length; ++i)
    {
        const tableRowWidget = {
            "type": "TableRowWidget", "name": 'RowItemDictionary' + String(i + 1), "children": []
        };
        for (let j = 0; j < nameArray[i].length; ++j)
        {
            tableRowWidget.children.push(buttonWidgetMaker(nameArray[i][j], buttonTextList[i][j], onClickMessageArray[i][j][language]));
        }

        itemDictionaryTableWidget.children.push(tableRowWidget);
        itemDictionaryTableControllerWidget.children.push(tableRowWidget);
    }

    pauselayouthd.children.push(itemDictionaryTableWidget);

    D2RMM.writeJson(pauselayouthdFilename, pauselayouthd);

    // Controller
    if (controllerAvailable == false) {
        return;
    }
    const pauselayouthdControllerFilename = 'global\\ui\\layouts\\controller\\pauselayouthd.json';
    const pauselayouthdController = D2RMM.readJson(pauselayouthdControllerFilename);

    const buttonNameList = ['MessageLog', 'Settings', 'Help', 'Exit'];
    pauselayouthdController.children.forEach((element) => {
        if (buttonNameList.includes(element.name)) {
            element.fields.rect.y -= 272;
        }
    });

    pauselayouthdController.children.push(itemDictionaryTableControllerWidget);
    pauselayouthdController.children[0].fields.filename = 'Controller/Panel/Options/Panel_Options_BG';
    D2RMM.writeJson(pauselayouthdControllerFilename, pauselayouthdController);
}


function addItemDictionaryToHelpPanel()
{
    if (config.addButtonToHelpMenu == false) {
        return;
    }

    const helppanelhdFilename = 'global\\ui\\layouts\\helppanelhd.json';
    const helppanelhd = D2RMM.readJson(helppanelhdFilename);

    function buttonWidgetMaker(name, textString, onClickMessage)
    {
        const buttonWidget =  { "fields": {} };
        buttonWidget.type = "ButtonWidget";
        buttonWidget.name = name;
        buttonWidget.fields.filename = "PauseMenu\\PauseButton";
        buttonWidget.fields.hoveredFrame = 3;
        buttonWidget.fields.textString = textString;
        buttonWidget.fields.pressLabelOffset = [ 0, 0 ];
        buttonWidget.fields.onClickMessage = "PanelManager:OpenPanel:" + onClickMessage;
        buttonWidget.fields.textColor = "$FontColorLightTeal";
        buttonWidget.fields["text/style"] = "$StyleFEButtonText";
        buttonWidget.fields.acceptsReturnKey = true;
        buttonWidget.fields.focusOnMouseOver = true;
        buttonWidget.fields.sound = "select";
        return buttonWidget;
    }

    const itemDictionaryTableWidget = {
        "type": "TableWidget", "name": "PauseInfoTable",
        "fields": {
            "anchor": { "x": 0.5, "y": 0.5 },
            "rect": { "x": -680, "y": 240 },
            "columns": [
                { "width": 720, "alignment": { "h": "center", "v": "center" } },
                { "width": 720, "alignment": { "h": "center", "v": "center" } }
                ],
            "rowHeight": 180,
            "generateFocusLinks": true
        },
        "children": []
    };

    const nameArray = [ ["NormalWeaponDictionary", "NormalArmorDictionary"], ["UniqueWeaponDictionary", "UniqueArmorDictionary"], ["RunewordItemDictionary", "SetItemDictionary"], ["CubeRecipeDictionary"] ];
    const buttonTextList = [
        ["@dictTextNormalWeapons", "@dictTextNormalArmors"],
        ["@dictTextUniqueWeapons", "@dictTextUniqueArmors"],
        ["@dictTextRunewords", "@dictTextSetItems"],
        ["@dictTextCubeRecipes"]
    ];


    const onClickMessageArray = [
        [
            {"enUS": "ItemDictionaryNormalWeaponMainPanel", "koKR": "ItemDictionaryNormalWeaponMainPanel"},
            {"enUS": "ItemDictionaryNormalArmorMainPanel", "koKR": "ItemDictionaryNormalArmorMainPanel"}
        ],
        [
            {"enUS": "ItemDictionaryUniqueWeaponMainPanelEng", "koKR": "ItemDictionaryUniqueWeaponMainPanelKor"},
            {"enUS": "ItemDictionaryUniqueArmorMainPanelEng", "koKR": "ItemDictionaryUniqueArmorMainPanelKor"}
        ],
        [
            {"enUS": "ItemDictionaryRunewordMainPanelEng", "koKR": "ItemDictionaryRunewordMainPanelKor"},
            {"enUS": "ItemDictionarySetItemMainPanelEng", "koKR": "ItemDictionarySetItemMainPanelKor"}
        ],
        [
            {"enUS": "ItemDictionaryCubeRecipeMainPanelEng", "koKR": "ItemDictionaryCubeRecipeMainPanelKor"},
        ]
    ];
    // json file name must be "{onClickMessage}hd.json"

    for (let i = 0; i < nameArray.length; ++i)
    {
        const tableRowWidget = {
            "type": "TableRowWidget", "name": 'RowItemDictionary' + String(i + 1), "children": []
        };
        for (let j = 0; j < nameArray[i].length; ++j)
        {
            tableRowWidget.children.push(buttonWidgetMaker(nameArray[i][j], buttonTextList[i][j], onClickMessageArray[i][j][language]));
        }

        itemDictionaryTableWidget.children.push(tableRowWidget);
    }

    const removeList = [
        "GameplayLabel", "HelpRun", "HelpHighItems", "HelpStandAttack",
        "UILabel", "HelpAutoMap", "HelpGameMenu", "HelpchatMode", "Helpskillbind", "HelpRenderToggle", "HelpZoom", "HelpMercenaryScreen", "HelpMercenaryPotion"
    ];
    const target = helppanelhd.children.find(item => item.name === "CenterSection");
    if (target) {
        target.children = target.children.filter(child => !removeList.includes(child.name));
    }

    const index = target.children.findIndex(child => child.name === "Title");
    if (index !== -1) {
        target.children.splice(index + 1, 0, itemDictionaryTableWidget);
    }

    D2RMM.writeJson(helppanelhdFilename, helppanelhd);
}


function addCubeRecipeButtonToCube()
{
    if (config.addRecipeButtonToCube == false) {
        return;
    }

    const horadriccubelayouthdFilename = 'global\\ui\\layouts\\horadriccubelayouthd.json';
    const horadriccubelayouthd = D2RMM.readJson(horadriccubelayouthdFilename);

    const onClickMessage = {
        "enUS": "ItemDictionaryCubeRecipeMainPanelEng",
        "koKR": "ItemDictionaryCubeRecipeMainPanelKor"
    }

    horadriccubelayouthd.children.push(
        {
            "type": "ButtonWidget", "name": "cuberecipes",
            "fields": {
                "rect": { "x": 1000, "y": 9 },
                "filename": "itemDictionary\\recipesbtn_x4",
                "hoveredFrame": 3,
                "tooltipString": "@dictTooltipCubeRecipes",
                "sound": "cursor_close_window_hd",
                "onClickMessage": "PanelManager:OpenPanel:" + onClickMessage[language],
            },
        }
    );

    D2RMM.writeJson(horadriccubelayouthdFilename, horadriccubelayouthd);
}

function addString()
{
    const uiJsonFileName = 'local\\lng\\strings\\ui.json';
    const uiJson = D2RMM.readJson(uiJsonFileName);

    const stringKeyList = 
[{"Key":"dictCraftHitPowerCommon","koKR":"ÿc3피격 시 5% 확률로 4 레벨 서릿발 시전\n공격자가 피해를 3~7 받음 ÿcT(변함)","enUS":"ÿc35% Chance to cast level 4 Frost Nova when struck\nAttacker Takes Damage of 3-7 ÿcT(Varies)"},
{"Key":"dictCraftBloodCommon","koKR":"ÿc3적중당 생명력 1~3% 훔침 ÿcT(변함)\nÿc3생명력 +10~20 ÿcT(변함)","enUS":"ÿc31-3% Life stolen per hit ÿcT(Varies)\nÿc3+10-20 to Life ÿcT(Varies)"},
{"Key":"dictCraftCasterCommon","koKR":"ÿc3마나 재생 4~10% ÿcT(변함)\nÿc3마나 +10~20 ÿcT(변함)","enUS":"ÿc3Regenerate Mana 4-10% ÿcT(Varies)\nÿc3+10-20 to Mana ÿcT(Varies)"},
{"Key":"dictCraftSafetyCommon","koKR":"ÿc3마법 피해 1~2 감소 ÿcT(변함)\nÿc3피해 1~4 감소 ÿcT(변함)","enUS":"ÿc3Magic Damage Reduced By 1-2 ÿcT(Varies)\nÿc3Damage Reduced By 1-4 ÿcT(Varies)"},
{"Key":"dictSetArticGear","koKR":"ÿc4최대 냉기 피해 +2~198 (캐릭터 레벨에 비례)\n힘 +5 (2 세트)\n생명력 +50 (3 세트)\n빙결되지 않음","enUS":"ÿc4+2-198 to Maximum Cold Damage (Based on Character Level)\n+5 to Strength (2 Items)\n+50 to Life (3 Items)\nCannot Be Frozen"},
{"Key":"dictSetArticHorn","koKR":"ÿc3피해 +50% 증가\n명중률 보너스 20%\nÿc2냉기 피해 20 - 30 추가 (3 세트)\n명중률 +8~792 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+50% Enhanced Damage\n20% Bonus to Attack Rating\nÿc2Adds 20-30 cold damage (3 Items)\n+8-792 to Attack Rating (Based on Character Level) (2 Items)"},
{"Key":"dictSetArcticFurs","koKR":"ÿc3방어력 +275~325% 증가 ÿcT(변함)\nÿc3모든 저항 +10\nÿc2냉기 저항 +15% (3 세트)\n방어력 +3~297 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+275-325% Enhanced Defense ÿcT(Varies)\nÿc3All Resistances +10\nÿc2Cold Resist +15% (3 Items)\n+3-297 Defense (Based on Character Level) (2 Items)"},
{"Key":"dictSetArcticMitts","koKR":"ÿc3공격 속도 +10%\n생명력 +20\nÿc2민첩 +10 (3 세트)\n명중률 +50 (2 세트)","enUS":"ÿc3+10% Increased Attack Speed\n+20 to Life\nÿc2+10 to Dexterity (3 Items)\n+50 to Attack Rating (2 Items)"},
{"Key":"dictSetArcticBinding","koKR":"ÿc3방어력 +30\n냉기 저항 +40%\nÿc2냉기 저항 +10% (3 세트)\n마법 아이템 발견 확률 40% 증가 (2 세트)","enUS":"ÿc3+30 Defense\nCold Resist +40%\nÿc2Cold Resist +10% (3 Items)\n40% Better Chance of Getting Magic Items (2 Items)"},
{"Key":"dictSetHsarusDefense","koKR":"ÿc4최대 피해 +5\n번개 저항 +25%\n빙결되지 않음\n공격자가 피해를 5 받음 (2 세트)","enUS":"ÿc4+5 to Maximum Damage\nLightning Resist +25%\nCannot Be Frozen\nAttacker Takes Damage of 5 (2 Items)"},
{"Key":"dictSetHsarusIronFist","koKR":"ÿc3힘 +10\n피해 2 감소\nÿc2방어력 +2~247 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+10 to Strength\nDamage Reduced by 2\nÿc2+2-247 Defense (Based on Character Level) (2 Items)"},
{"Key":"dictSetHsarusIronStay","koKR":"ÿc3생명력 +20\n냉기 저항 +20%\nÿc2방어력 +2~247 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+20 to Life\nCold Resist +20%\nÿc2+2-247 Defense (Based on Character Level) (2 Items)"},
{"Key":"dictSetHsarusIronHeel","koKR":"ÿc3달리기/걷기 속도 +20%\n화염 저항 +25%\nÿc2명중률 +10~990 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+20% Faster Run/Walk\nFire Resist +25%\nÿc2+10-990 to Attack Rating (Based on Character Level) (2 Items)"},
{"Key":"dictSetBerserkersArsenal","koKR":"ÿc4독 피해 5 - 9 추가 (3초에 걸쳐)\n방어력 +75\n생명력 +50 (2 세트)\n독 지속시간 75% 감소","enUS":"ÿc4Adds 5-9 poison damage over 3 seconds\n+75 Defense\n+50 to Life (2 Items)\nPoison Length Reduced by 75%"},
{"Key":"dictSetBerserkersHeadgear","koKR":"ÿc3방어력 +15\n화염 저항 +25%\nÿc2명중률 +8~792 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+15 Defense\nFire Resist +25%\nÿc2+8-792 to Attack Rating (Based on Character Level) (2 Items)"},
{"Key":"dictSetBerserkersHatchet","koKR":"ÿc3명중률 보너스 30%\n적중당 마나 5% 훔침\nÿc2피해 +50% 증가 (2 세트)","enUS":"ÿc330% Bonus to Attack Rating\n5% Mana stolen per hit\nÿc2+50% Enhanced Damage (2 Items)"},
{"Key":"dictSetBerserkersHauberk","koKR":"ÿc3야만용사 기술 레벨 +1\n마법 피해 2 감소\nÿc2방어력 +3~297 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+1 to Barbarian Skill Levels\nMagic Damage Reduced by 2\nÿc2+3-297 Defense (Based on Character Level) (2 Items)"},
{"Key":"dictSetCleglawsBrace","koKR":"ÿc4방어력 +50 (2 세트)\n공격 속도 +20%\n적중당 마나 6% 훔침\n강타 확률 +35%\n방어력 +50","enUS":"ÿc4+50 Defense (2 Items)\n+20% Increased Attack Speed\n6% Mana stolen per hit\n+35% Chance of Crushing Blow\n+50 Defense"},
{"Key":"dictSetCleglawsTooth","koKR":"ÿc3명중률 보너스 30%\n치명적 공격 +50%\nÿc2최대 피해 +1~123 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc330% Bonus to Attack Rating\n+50% Deadly Strike\nÿc2+1-123 to Maximum Damage (Based on Character Level) (2 Items)"},
{"Key":"dictSetCleglawsClaw","koKR":"ÿc3방어력 +17\n독 지속시간 75% 감소\nÿc2모든 저항 +15 (2 세트)","enUS":"ÿc3+17 Defense\nPoison Length Reduced by 75%\nÿc2All Resistances +15 (2 Items)"},
{"Key":"dictSetCleglawsPincers","koKR":"ÿc3대상 감속 25%\n밀쳐내기\n명중률 +10~990 (캐릭터 레벨에 비례)","enUS":"ÿc3Slows Target by 25%\nKnockback\n+10-990 to Attack Rating (Based on Character Level)"},
{"Key":"dictSetInfernalTools","koKR":"ÿc4강령술사 기술 레벨 +1\n명중률 보너스 20%\n독 피해 +8 (3초에 걸쳐) (2 세트)\n적중당 마나 6% 훔침\n상처 악화 확률 +20%\n최대 마나 20% 증가\n빙결되지 않음","enUS":"ÿc4+1 to Necromancer Skill Levels\n20% Bonus to Attack Rating\n+8 poison damage over 3 seconds (2 Items)\n6% Mana stolen per hit\n+20% Chance of Open Wounds\nIncrease Maximum Mana 20%\nCannot Be Frozen"},
{"Key":"dictSetInfernalCranium","koKR":"ÿc3모든 저항 +10\n받는 피해의 +20%만큼 마나 회복\nÿc2방어력 +2~198 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3All Resistances +10\n+20% Damage Taken Goes To Mana\nÿc2+2-198 Defense (Based on Character Level) (2 Items)"},
{"Key":"dictSetInfernalTorch","koKR":"ÿc3강령술사 기술 레벨 +1\n최소 피해 +8\n언데드에게 주는 피해 +50%\nÿc2 명중률 +10~990 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+1 to Necromancer Skill Levels\n+8 to Minimum Damage\n+50% Damage to Undead\nÿc2 +10-990 to Attack Rating (Based on Character Level) (2 Items)"},
{"Key":"dictSetInfernalSign","koKR":"ÿc3방어력 +25\n생명력 +20\nÿc2독 저항 +25% (2 세트)\n빙결 지속시간 절반으로 감소 (3 세트)","enUS":"ÿc3+25 Defense\n+20 to Life\nÿc2Poison Resist +25% (2 Items)\nHalf Freeze Duration (3 Items)"},
{"Key":"dictSetDeathsDisguise","koKR":"ÿc4최소 피해 +10\n명중률 보너스 40%\n적중당 생명력 8% 훔침 (2 세트)\n모든 저항 +25","enUS":"ÿc4+10 to Minimum Damage\n40% Bonus to Attack Rating\n8% Life stolen per hit (2 Items)\nAll Resistances +25"},
{"Key":"dictSetDeathsTouch","koKR":"ÿc3피해 +25% 증가\n적중당 생명력 4% 훔침\nÿc2냉기 피해 25 - 75 추가 (2 세트)","enUS":"ÿc3+25% Enhanced Damage\n4% Life stolen per hit\nÿc2Adds 25-75 cold damage (2 Items)"},
{"Key":"dictSetDeathsHand","koKR":"ÿc3독 저항 +50%\n독 지속시간 75% 감소\nÿc2공격 속도 +30% (2 세트)","enUS":"ÿc3Poison Resist +50%\nPoison Length Reduced by 75%\nÿc2+30% Increased Attack Speed (2 Items)"},
{"Key":"dictSetDeathsGuard","koKR":"ÿc3방어력 +20\n빙결되지 않음\nÿc2모든 저항 +15 (2 세트)","enUS":"ÿc3+20 Defense\nCannot Be Frozen\nÿc2All Resistances +15 (2 Items)"},
{"Key":"dictSetSigonsCompleteSteel","koKR":"ÿc4최대 화염 피해 +24\n적중당 생명력 10% 훔침 (2 세트)\n방어력 +100 (3 세트)\n마나 +20\n화염 저항 +12%\n피해 7 감소\n공격자가 피해를 12 받음","enUS":"ÿc4+24 to Maximum Fire Damage\n10% Life stolen per hit (2 Items)\n+100 Defense (3 Items)\n+20 to Mana\nFire Resist +12%\nDamage Reduced by 7\nAttacker Takes Damage of 12"},
{"Key":"dictSetSigonsVisor","koKR":"ÿc3방어력 +25\n마나 +30\nÿc2명중률 +8~792 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+25 Defense\n+30 to Mana\nÿc2+8-792 to Attack Rating (Based on Character Level) (2 Items)"},
{"Key":"dictSetSigonsShelter","koKR":"ÿc3방어력 +25% 증가\n번개 저항 +30%\nÿc2공격자가 피해를 20 받음 (2 세트)","enUS":"ÿc3+25% Enhanced Defense\nLightning Resist +30%\nÿc2Attacker Takes Damage of 20 (2 Items)"},
{"Key":"dictSetSigonsGuard","koKR":"ÿc3모든 기술 +1\n막기 확률 20% 증가","enUS":"ÿc3+1 to All Skills\n20% Increased Chance of Blocking"},
{"Key":"dictSetSigonsGage","koKR":"ÿc3명중률 +20\n힘 +10\nÿc2공격 속도 +30% (2 세트)","enUS":"ÿc3+20 to Attack Rating\n+10 to Strength\nÿc2+30% Increased Attack Speed (2 Items)"},
{"Key":"dictSetSigonsWrap","koKR":"ÿc3생명력 +20\n화염 저항 +20%\nÿc2방어력 +2~198 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+20 to Life\nFire Resist +20%\nÿc2+2-198 Defense (Based on Character Level) (2 Items)"},
{"Key":"dictSetSigonsSabot","koKR":"ÿc3달리기/걷기 속도 +20%\n냉기 저항 +40%\nÿc2마법 아이템 발견 확률 50% 증가 (3 세트)\n명중률 +50 (2 세트)","enUS":"ÿc3+20% Faster Run/Walk\nCold Resist +40%\nÿc250% Better Chance of Getting Magic Items (3 Items)\n+50 to Attack Rating (2 Items)"},
{"Key":"dictSetIsenhartsArmory","koKR":"ÿc4달리기/걷기 속도 +20%\n막기 확률 30% 증가\n명중률 보너스 35%\n적중당 생명력 5% 훔침\n힘 +10 (2 세트)\n민첩 +10 (3 세트)\n모든 저항 +10","enUS":"ÿc4+20% Faster Run/Walk\n30% Increased Chance of Blocking\n35% Bonus to Attack Rating\n5% Life stolen per hit\n+10 to Strength (2 Items)\n+10 to Dexterity (3 Items)\nAll Resistances +10"},
{"Key":"dictSetIsenhartsHorns","koKR":"ÿc3민첩 +6\n피해 2 감소\nÿc2모든 저항 +8 (2 세트)","enUS":"ÿc3+6 to Dexterity\nDamage Reduced by 2\nÿc2All Resistances +8 (2 Items)"},
{"Key":"dictSetIsenhartsLightbrand","koKR":"ÿc3공격 속도 +20%\n최소 피해 +10\nÿc2명중률 +5~495 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+20% Increased Attack Speed\n+10 to Minimum Damage\nÿc2+5-495 to Attack Rating (Based on Character Level) (2 Items)"},
{"Key":"dictSetIsenhartsCase","koKR":"ÿc3방어력 +40\n마법 피해 2 감소\nÿc2방어력 +2~198 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+40 Defense\nMagic Damage Reduced by 2\nÿc2+2-198 Defense (Based on Character Level) (2 Items)"},
{"Key":"dictSetIsenhartsParry","koKR":"ÿc3방어력 +40\n공격자가 번개 피해를 4 받음\nÿc2모든 저항 +8 (2 세트)","enUS":"ÿc3+40 Defense\nAttacker Takes Lightning Damage of 4\nÿc2All Resistances +8 (2 Items)"},
{"Key":"dictSetCiverbsVestments","koKR":"ÿc4명중률 보너스 25%\n언데드에게 주는 피해 +200%\n방어력 +50\n힘 +15\n번개 저항 +25%\n화염 저항 +25% (2 세트)","enUS":"ÿc425% Bonus to Attack Rating\n+200% Damage to Undead\n+50 Defense\n+15 to Strength\nLightning Resist +25%\nFire Resist +25% (2 Items)"},
{"Key":"dictSetCiverbsIcon","koKR":"ÿc3생명력 회복 +4\n마나 재생 40%\nÿc2방어력 +25 (3 세트)\n냉기 저항 +25% (2 세트)","enUS":"ÿc3Reflensh Life +4\nRegenerate Mana 40%\nÿc2+25 Defense (3 Items)\nCold Resist +25% (2 Items)"},
{"Key":"dictSetCiverbsCudgel","koKR":"ÿc3최대 피해 +17~23 ÿcT(변함)\nÿc3최대 피해 +1~99 (캐릭터 레벨에 비례)\n명중률 +75\n언데드에게 주는 피해 +50%","enUS":"ÿc3+17-23 to Maximum Damage ÿcT(Varies)\nÿc3+1-99 to Maximum Damage (Based on Character Level)\n+75 to Attack Rating\n+50% Damage to Undead"},
{"Key":"dictSetCiverbsWard","koKR":"ÿc3막기 확률 15% 증가\n방어력 +15\nÿc2독 저항 +25~26% (2 세트) ÿcT(변함)\nÿc2마나 +21~22 (3 세트) ÿcT(변함)","enUS":"ÿc315% Increased Chance of Blocking\n+15 Defense\nÿc2Poison Resist +25-26% (2 Items) ÿcT(Varies)\nÿc2+21-22 to Mana (3 Items) ÿcT(Varies)"},
{"Key":"dictSetCathansTraps","koKR":"ÿc4시전 속도 +10%\n명중률 +60\n화염 피해 15 - 20 추가 (2 세트)\n마나 +20\n마나 재생 16%\n냉기 저항 +25%\n번개 저항 +25% (3 세트)\n번개 저항 +25%\n화염 저항 +25%\n독 저항 +25%\n마법 피해 3 감소","enUS":"ÿc4+10% Faster Cast Rate\n+60 to Attack Rating\nAdds 15-20 fire damage (2 Items)\n+20 to Mana\nRegenerate Mana 16%\nCold Resist +25%\nLightning Resist +25% (3 Items)\nLightning Resist +25%\nFire Resist +25%\nPoison Resist +25%\nMagic Damage Reduced by 3"},
{"Key":"dictSetCathansVisage","koKR":"ÿc3마나 +20\n냉기 저항 +25%\nÿc2방어력 +2~198 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+20 to Mana\nCold Resist +25%\nÿc2+2-198 Defense (Based on Character Level) (2 Items)"},
{"Key":"dictSetCathansSigil","koKR":"ÿc3타격 회복 속도 +10%\n공격자가 번개 피해를 5 받음\nÿc2마법 아이템 발견 확률 25% 증가 (3 세트)\n명중률 +50 (2 세트)","enUS":"ÿc3+10% Faster Hit Recovery\nAttacker Takes Lightning Damage of 5\nÿc225% Better Chance of Getting Magic Items (3 Items)\n+50 to Attack Rating (2 Items)"},
{"Key":"dictSetCathansRule","koKR":"ÿc3화염 기술 +1\n최대 화염 피해 +10\n언데드에게 주는 피해 +50%\nÿc2모든 저항 +10 (3 세트)\n마나 +50 (2 세트)","enUS":"ÿc3+1 to Fire Skills\n+10 to Maximum Fire Damage\n+50% Damage to Undead\nÿc2All Resistances +10 (3 Items)\n+50 to Mana (2 Items)"},
{"Key":"dictSetCathansMesh","koKR":"ÿc3방어력 +15\n착용 조건 -50%\nÿc2화염 저항 +30% (3 세트)\n공격자가 피해를 5 받음 (2 세트)","enUS":"ÿc3+15 Defense\nRequirements -50%\nÿc2Fire Resist +30% (3 Items)\nAttacker Takes Damage of 5 (2 Items)"},
{"Key":"dictSetCathansSeal","koKR":"ÿc3적중당 생명력 6% 훔침\n피해 2 감소\nÿc2힘 +10 (2 세트)","enUS":"ÿc36% Life stolen per hit\nDamage Reduced by 2\nÿc2+10 to Strength (2 Items)"},
{"Key":"dictSetAngelicRaiment","koKR":"ÿc4민첩 +10 (2 세트)\n마나 +50 (3 세트)\n마나 재생 8%\n모든 저항 +25\n빙결 지속시간 절반으로 감소\n마법 아이템 발견 확률 40% 증가","enUS":"ÿc4+10 to Dexterity (2 Items)\n+50 to Mana (3 Items)\nRegenerate Mana 8%\nAll Resistances +25\nHalf Freeze Duration\n40% Better Chance of Getting Magic Items"},
{"Key":"dictSetAngelicWings","koKR":"ÿc3받는 피해의 +20%만큼 마나 회복\n시야 +3\nÿc2모든 기술 +1 (3 세트)\n생명력 +75 (2 세트)","enUS":"ÿc3+20% Damage Taken Goes To Mana\n+3 to Light Radius\nÿc2+1 to All Skills (3 Items)\n+75 to Life (2 Items)"},
{"Key":"dictSetAngelicSickle","koKR":"ÿc3명중률 +75\n언데드에게 주는 피해 +250%\nÿc2공격 속도 +30% (3 세트)\n피해 +75% 증가 (2 세트)","enUS":"ÿc3+75 to Attack Rating\n+250% Damage to Undead\nÿc2+30% Increased Attack Speed (3 Items)\n+75% Enhanced Damage (2 Items)"},
{"Key":"dictSetAngelicMantle","koKR":"ÿc3방어력 +40% 증가\n피해 3 감소\nÿc2화염 저항 +50% (3 세트)\n방어력 +150 (2 세트)","enUS":"ÿc3+40% Enhanced Defense\nDamage Reduced by 3\nÿc2Fire Resist +50% (3 Items)\n+150 Defense (2 Items)"},
{"Key":"dictSetAngelicHalo","koKR":"ÿc3생명력 +20\n생명력 회복 +6\nÿc2마법 아이템 발견 확률 50% 증가 (3 세트)\n명중률 +12~1188 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+20 to Life\nReflensh Life +6\nÿc250% Better Chance of Getting Magic Items (3 Items)\n+12-1188 to Attack Rating (Based on Character Level) (2 Items)"},
{"Key":"dictSetVidalasRig","koKR":"ÿc4관통 공격 +50%\n명중률 +75 (2 세트)\n최대 냉기 피해 +1~127 (캐릭터 레벨에 비례)\n적중당 마나 7% 훔침 (2 세트)\n대상 빙결\n힘 +10\n민첩 +15 (3 세트)","enUS":"ÿc4+50% Piercing Attack\n+75 to Attack Rating (2 Items)\n+1-127 to Maximum Cold Damage (Based on Character Level)\n7% Mana stolen per hit (2 Items)\nFreezes Target\n+10 to Strength\n+15 to Dexterity (3 Items)"},
{"Key":"dictSetVidalasSnare","koKR":"ÿc3생명력 +15\n냉기 저항 +20%\nÿc2마법 아이템 발견 확률 50% 증가 (2 세트)","enUS":"ÿc3+15 to Life\nCold Resist +20%\nÿc250% Better Chance of Getting Magic Items (2 Items)"},
{"Key":"dictSetVidalasBarb","koKR":"ÿc3번개 피해 1 - 20 추가\nÿc2명중률 +8~792 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3Adds 1-20 lightning damage\nÿc2+8-792 to Attack Rating (Based on Character Level) (2 Items)"},
{"Key":"dictSetVidalasAmbush","koKR":"ÿc3방어력 +50\n민첩 +11\nÿc2방어력 +2~247 (캐릭터 레벨에 비례) (3 세트)\n화염 저항 +24% (2 세트)","enUS":"ÿc3+50 Defense\n+11 to Dexterity\nÿc2+2-247 Defense (Based on Character Level) (3 Items)\nFire Resist +24% (2 Items)"},
{"Key":"dictSetVidalasFetlock","koKR":"ÿc3달리기/걷기 속도 +30%\n최대 지구력 +150\nÿc2모든 저항 +8 (2 세트)","enUS":"ÿc3+30% Faster Run/Walk\n+150 Maximum Stamina\nÿc2All Resistances +8 (2 Items)"},
{"Key":"dictSetArcannasTricks","koKR":"ÿc4모든 기술 +1\n시전 속도 +20%\n적중당 마나 5% 훔침\n생명력 +50 (3 세트)\n마나 +50 (2 세트)\n마나 +25\n마나 재생 12%","enUS":"ÿc4+1 to All Skills\n+20% Faster Cast Rate\n5% Mana stolen per hit\n+50 to Life (3 Items)\n+50 to Mana (2 Items)\n+25 to Mana\nRegenerate Mana 12%"},
{"Key":"dictSetArcannasHead","koKR":"ÿc3생명력 회복 +4\n공격자가 피해를 2 받음\nÿc2번개 저항 +15% (3 세트)\n방어력 +3~297 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3Reflensh Life +4\nAttacker Takes Damage of 2\nÿc2Lightning Resist +15% (3 Items)\n+3-297 Defense (Based on Character Level) (2 Items)"},
{"Key":"dictSetArcannasSign","koKR":"ÿc3마나 +15\n마나 재생 20%\nÿc2화염 저항 +20% (3 세트)\n마법 아이템 발견 확률 50% 증가 (2 세트)","enUS":"ÿc3+15 to Mana\nRegenerate Mana 20%\nÿc2Fire Resist +20% (3 Items)\n50% Better Chance of Getting Magic Items (2 Items)"},
{"Key":"dictSetArcannasDeathwand","koKR":"ÿc3원소술사 기술 레벨 +1\n치명적 공격 +25%\n언데드에게 주는 피해 +50%\nÿc2마나 재생 5% (3 세트)\n마나 +50 (2 세트)","enUS":"ÿc3+1 to Sorceress Skill Levels\n+25% Deadly Strike\n+50% Damage to Undead\nÿc2Regenerate Mana 5% (3 Items)\n+50 to Mana (2 Items)"},
{"Key":"dictSetArcannasFlesh","koKR":"ÿc3피해 3 감소\n시야 +2\nÿc2마력 +10 (3 세트)\n방어력 +100 (2 세트)","enUS":"ÿc3Damage Reduced by 3\n+2 to Light Radius\nÿc2+10 to Energy (3 Items)\n+100 Defense (2 Items)"},
{"Key":"dictSetIrathasFinery","koKR":"ÿc4달리기/걷기 속도 +20%\n관통 공격 +24%\n방어력 +50\n민첩 +15\n최대 독 저항 +10%\n최대 냉기 저항 +10%\n최대 번개 저항 +10%\n최대 화염 저항 +10%\n모든 저항 +20","enUS":"ÿc4+20% Faster Run/Walk\n+24% Piercing Attack\n+50 Defense\n+15 to Dexterity\n+10% to Maximum Poison Resist\n+10% to Maximum Cold Resist\n+10% to Maximum Lightning Resist\n+10% to Maximum Fire Resist\nAll Resistances +20"},
{"Key":"dictSetIrathasCoil","koKR":"ÿc3번개 저항 +30%\n화염 저항 +30%\nÿc2방어력 +2~198 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3Lightning Resist +30%\nFire Resist +30%\nÿc2+2-198 Defense (Based on Character Level) (2 Items)"},
{"Key":"dictSetIrathasCollar","koKR":"ÿc3독 저항 +30%\n독 지속시간 75% 감소\nÿc2모든 저항 +15 (2 세트)","enUS":"ÿc3Poison Resist +30%\nPoison Length Reduced by 75%\nÿc2All Resistances +15 (2 Items)"},
{"Key":"dictSetIrathasCuff","koKR":"ÿc3냉기 저항 +30%\n빙결 지속시간 절반으로 감소\nÿc2공격 속도 +20% (2 세트)","enUS":"ÿc3Cold Resist +30%\nHalf Freeze Duration\nÿc2+20% Increased Attack Speed (2 Items)"},
{"Key":"dictSetIrathasCord","koKR":"ÿc3최소 피해 +5\n방어력 +25\nÿc2민첩 +10 (2 세트)","enUS":"ÿc3+5 to Minimum Damage\n+25 Defense\nÿc2+10 to Dexterity (2 Items)"},
{"Key":"dictSetMilabregasRegalia","koKR":"ÿc4성기사 기술 레벨 +2\n명중률 +75 (2 세트)\n명중률 +125 (3 세트)\n최대 번개 피해 +2~198 (캐릭터 레벨에 비례)\n적중당 마나 10% 훔침\n적중당 생명력 8% 훔침\n독 저항 +15%\n빙결되지 않음","enUS":"ÿc4+2 to Paladin Skill Levels\n+75 to Attack Rating (2 Items)\n+125 to Attack Rating (3 Items)\n+2-198 to Maximum Lightning Damage (Based on Character Level)\n10% Mana stolen per hit\n8% Life stolen per hit\nPoison Resist +15%\nCannot Be Frozen"},
{"Key":"dictSetMilabregasDiadem","koKR":"ÿc3생명력 +15\n마나 +15\nÿc2냉기 저항 +40% (2 세트)","enUS":"ÿc3+15 to Life\n+15 to Mana\nÿc2Cold Resist +40% (2 Items)"},
{"Key":"dictSetMilabregasRod","koKR":"ÿc3성기사 기술 레벨 +1\n피해 +50% 증가\n시야 +2\n언데드에게 주는 피해 +50%","enUS":"ÿc3+1 to Paladin Skill Levels\n+50% Enhanced Damage\n+2 to Light Radius\n+50% Damage to Undead"},
{"Key":"dictSetMilabregasRobe","koKR":"ÿc3피해 2 감소\n공격자가 피해를 3 받음\nÿc2방어력 +100% 증가 (2 세트)","enUS":"ÿc3Damage Reduced by 2\nAttacker Takes Damage of 3\nÿc2+100% Enhanced Defense (2 Items)"},
{"Key":"dictSetMilabregasOrb","koKR":"ÿc3방어력 +25\n마법 아이템 발견 확률 20% 증가\nÿc2방어력 +50% 증가 (3 세트)\n생명력 +50 (2 세트)","enUS":"ÿc3+25 Defense\n20% Better Chance of Getting Magic Items\nÿc2+50% Enhanced Defense (3 Items)\n+50 to Life (2 Items)"},
{"Key":"dictSetTancredsBattlegear","koKR":"ÿc4번개 피해 +15 (2 세트)\n적중당 마나 5% 훔침\n적중당 생명력 5% 훔침 (3 세트)\n대상 감속 35%\n모든 저항 +10\n괴물에게서 얻는 금화 75% 증가","enUS":"ÿc4+15 lightning damage (2 Items)\n5% Mana stolen per hit\n5% Life stolen per hit (3 Items)\nSlows Target by 35%\nAll Resistances +10\n75% Extra Gold from Monsters"},
{"Key":"dictSetTancredsSkull","koKR":"ÿc3피해 +10% 증가\n명중률 +40\nÿc2모든 저항 +10 (2 세트)","enUS":"ÿc3+10% Enhanced Damage\n+40 to Attack Rating\nÿc2All Resistances +10 (2 Items)"},
{"Key":"dictSetTancredsWeird","koKR":"ÿc3피해 2 감소\n마법 피해 1 감소\nÿc2명중률 +60 (3 세트)\n마법 아이템 발견 확률 78% 증가 (2 세트)","enUS":"ÿc3Damage Reduced by 2\nMagic Damage Reduced by 1\nÿc2+60 to Attack Rating (3 Items)\n78% Better Chance of Getting Magic Items (2 Items)"},
{"Key":"dictSetTancredsCrowbill","koKR":"ÿc3피해 +80% 증가\n명중률 +75\nÿc2공격 속도 +20% (3 세트)\n마나 +20 (2 세트)","enUS":"ÿc3+80% Enhanced Damage\n+75 to Attack Rating\nÿc2+20% Increased Attack Speed (3 Items)\n+20 to Mana (2 Items)"},
{"Key":"dictSetTancredsSpine","koKR":"ÿc3힘 +15\n생명력 +40\nÿc2방어력 +2~198 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc3+15 to Strength\n+40 to Life\nÿc2+2-198 Defense (Based on Character Level) (2 Items)"},
{"Key":"dictSetTancredsHobnails","koKR":"ÿc3민첩 +10\n지구력 회복 속도 25% 증가\nÿc2힘 +10 (3 세트)\n달리기/걷기 속도 +30% (2 세트)","enUS":"ÿc3+10 to Dexterity\nHeal Stamina Plus 25%\nÿc2+10 to Strength (3 Items)\n+30% Faster Run/Walk (2 Items)"},
{"Key":"dictSetCowKingsLeathers","koKR":"ÿc4피격 시 25% 확률로 5 레벨 전자기장 시전\n모든 기술 +1\n공격 속도 +30%\n방어력 +100\n힘 +20\n생명력 +100\n최대 지구력 +100\n독 저항 +25% (2 세트)\n괴물에게서 얻는 금화 100% 증가\n마법 아이템 발견 확률 100% 증가","enUS":"ÿc425% Chance to cast level 5 Static Field when struck\n+1 to All Skills\n+30% Increased Attack Speed\n+100 Defense\n+20 to Strength\n+100 to Life\n+100 Maximum Stamina\nPoison Resist +25% (2 Items)\n100% Extra Gold from Monsters\n100% Better Chance of Getting Magic Items"},
{"Key":"dictSetCowKingsHorns","koKR":"ÿc3방어력 +75\n빙결 지속시간 절반으로 감소\n공격자가 피해를 10 받음\n받는 피해의 +35%만큼 마나 회복","enUS":"ÿc3+75 Defense\nHalf Freeze Duration\nAttacker Takes Damage of 10\n+35% Damage Taken Goes To Mana"},
{"Key":"dictSetCowKingsHide","koKR":"ÿc3피격 시 18% 확률로 5 레벨 연쇄 번개 시전\n방어력 +60% 증가\n생명력 +30\n모든 저항 +18","enUS":"ÿc318% Chance to cast level 5 Chain Lightning when struck\n+60% Enhanced Defense\n+30 to Life\nAll Resistances +18"},
{"Key":"dictSetCowKingsHooves","koKR":"ÿc3달리기/걷기 속도 +30%\n화염 피해 25 - 35 추가\n방어력 +25~35 ÿcT(변함)\nÿc3민첩 +20\n마법 아이템 발견 확률 25% 증가","enUS":"ÿc3+30% Faster Run/Walk\nAdds 25-35 fire damage\n+25-35 Defense ÿcT(Varies)\nÿc3+20 to Dexterity\n25% Better Chance of Getting Magic Items"},
{"Key":"dictSetSandersFolly","koKR":"ÿc4모든 기술 +1\n명중률 +75 (3 세트)\n적중당 생명력 4% 훔침\n방어력 +50 (2 세트)\n마나 +50\n마법 아이템 발견 확률 50% 증가","enUS":"ÿc4+1 to All Skills\n+75 to Attack Rating (3 Items)\n4% Life stolen per hit\n+50 Defense (2 Items)\n+50 to Mana\n50% Better Chance of Getting Magic Items"},
{"Key":"dictSetSandersParagon","koKR":"ÿc3방어력 +1~99 (캐릭터 레벨에 비례)\n공격자가 피해를 8 받음\n마법 아이템 발견 확률 35% 증가","enUS":"ÿc3+1-99 Defense (Based on Character Level)\nAttacker Takes Damage of 8\n35% Better Chance of Getting Magic Items"},
{"Key":"dictSetSandersSuperstition","koKR":"ÿc3시전 속도 +20%\n피해 +75% 증가\n냉기 피해 25 - 75 추가\n적중당 마나 8% 훔침\n마나 +25\n언데드에게 주는 피해 +50%","enUS":"ÿc3+20% Faster Cast Rate\n+75% Enhanced Damage\nAdds 25-75 cold damage\n8% Mana stolen per hit\n+25 to Mana\n+50% Damage to Undead"},
{"Key":"dictSetSandersTaboo","koKR":"ÿc3공격 속도 +20%\n독 피해 9 - 11 추가 (3초에 걸쳐)\n방어력 +20~25 ÿcT(변함)\nÿc3생명력 +40","enUS":"ÿc3+20% Increased Attack Speed\nAdds 9-11 poison damage over 3 seconds\n+20-25 Defense ÿcT(Varies)\nÿc3+40 to Life"},
{"Key":"dictSetSandersRiprap","koKR":"ÿc3달리기/걷기 속도 +40%\n명중률 +100\n힘 +5\n민첩 +10","enUS":"ÿc3+40% Faster Run/Walk\n+100 to Attack Rating\n+5 to Strength\n+10 to Dexterity"},
{"Key":"dictSetMavinasBattleHymn","koKR":"ÿc4아마존 기술 레벨 +3\n명중률 +100\n방어력 +100\n힘 +20 (2 세트)\n민첩 +30 (3 세트)\n모든 저항 +50\n마법 아이템 발견 확률 100% 증가","enUS":"ÿc4+3 to Amazon Skill Levels\n+100 to Attack Rating\n+100 Defense\n+20 to Strength (2 Items)\n+30 to Dexterity (3 Items)\nAll Resistances +50\n100% Better Chance of Getting Magic Items"},
{"Key":"dictSetMavinasTrueSight","koKR":"ÿc3공격 속도 +30%\n방어력 +150\n생명력 회복 +10\n마나 +25\nÿc2모든 저항 +25 (4 세트)\n명중률 보너스 50% (3 세트)\n모든 기술 +1 (2 세트)","enUS":"ÿc3+30% Increased Attack Speed\n+150 Defense\nReflensh Life +10\n+25 to Mana\nÿc2All Resistances +25 (4 Items)\n50% Bonus to Attack Rating (3 Items)\n+1 to All Skills (2 Items)"},
{"Key":"dictSetMavinasCaster","koKR":"ÿc3공격 속도 +40%\n마법 화살 발사\n피해 +188% 증가\n명중률 +50\nÿc2활과 쇠뇌 기술 +2 (아마존 전용) (4 세트)\n타격 시 10% 확률로 15 레벨 번개 파장 시전 (3 세트)\n마법 피해 114 - 377 추가 (2 세트)","enUS":"ÿc3+40% Increased Attack Speed\nFires Magic Arrows\n+188% Enhanced Damage\n+50 to Attack Rating\nÿc2+2 to Bow and Crossbow Skills (Amazon Only) (4 Items)\n10% Chance to cast level 15 Nova on striking (3 Items)\nAdds 114-377 magic damage (2 Items)"},
{"Key":"dictSetMavinasEmbrace","koKR":"ÿc3피격 시 10% 확률로 3 레벨 빙하 가시 시전\n지속 효과와 마법 기술 +2 (아마존 전용)\n방어력 +4~396 (캐릭터 레벨에 비례)\n방어력 +350\n마법 피해 5~12 감소 ÿcT(변함)\nÿc3착용 조건 -30%\nÿc2타격 회복 속도 +30% (3 세트)","enUS":"ÿc310% Chance to cast level 3 Glacial Spike when struck\n+2 to Passive and Magic Skills (Amazon Only)\n+4-396 Defense (Based on Character Level)\n+350 Defense\nMagic Damage Reduced by 5-12 ÿcT(Varies)\nÿc3Requirements -30%\nÿc2+30% Faster Hit Recovery (3 Items)"},
{"Key":"dictSetMavinasIcyClutch","koKR":"ÿc3냉기 피해 6 - 18 추가\n방어력 +45~50 ÿcT(변함)\nÿc3힘 +10\n민첩 +15\n빙결 지속시간 절반으로 감소\n괴물에게서 얻는 금화 56% 증가\nÿc2냉기 기술 피해 +20% (완성)\n냉기 피해 131 - 252 추가 (4 세트)","enUS":"ÿc3Adds 6-18 cold damage\n+45-50 Defense ÿcT(Varies)\nÿc3+10 to Strength\n+15 to Dexterity\nHalf Freeze Duration\n56% Extra Gold from Monsters\nÿc2+20% to Cold Skill Damage (Full Set)\nAdds 131-252 cold damage (4 Items)"},
{"Key":"dictSetMavinasTenet","koKR":"ÿc3달리기/걷기 속도 +20%\n적중당 마나 5% 훔침\n방어력 +50\n시야 +5\nÿc2모든 저항 +25 (4 세트)","enUS":"ÿc3+20% Faster Run/Walk\n5% Mana stolen per hit\n+50 Defense\n+5 to Light Radius\nÿc2All Resistances +25 (4 Items)"},
{"Key":"dictSetNatalyasOdium","koKR":"ÿc4암살자 기술 레벨 +3\n적중당 마나 14% 훔침\n적중당 생명력 14% 훔침\n방어력 +200 (3 세트)\n방어력 +150\n모든 저항 +50\n받는 물리 피해 30% 감소\n마법 피해 15 감소 (2 세트)","enUS":"ÿc4+3 to Assassin Skill Levels\n14% Mana stolen per hit\n14% Life stolen per hit\n+200 Defense (3 Items)\n+150 Defense\nAll Resistances +50\nPhysical Damage Received Reduced by 30%\nMagic Damage Reduced by 15 (2 Items)"},
{"Key":"dictSetNatalyasTotem","koKR":"ÿc3방어력 +135~175 ÿcT(변함)\nÿc3힘 +10~20 ÿcT(변함)\nÿc3민첩 +20~30 ÿcT(변함)\nÿc3모든 저항 +10~20 ÿcT(변함)\nÿc3마법 피해 3 감소","enUS":"ÿc3+135-175 Defense ÿcT(Varies)\nÿc3+10-20 to Strength ÿcT(Varies)\nÿc3+20-30 to Dexterity ÿcT(Varies)\nÿc3All Resistances +10-20 ÿcT(Varies)\nÿc3Magic Damage Reduced by 3"},
{"Key":"dictSetNatalyasMark","koKR":"ÿc3공격 속도 +40%\n피해 +200% 증가\n대상의 방어력 무시\n악마에게 주는 피해 +200%\n언데드에게 주는 피해 +200%\n화염 피해 12 - 17 추가\n냉기 피해 +50","enUS":"ÿc3+40% Increased Attack Speed\n+200% Enhanced Damage\nIgnore Target's Defense\n+200% Damage to Demons\n+200% Damage to Undead\nAdds 12-17 fire damage\n+50 cold damage"},
{"Key":"dictSetNatalyasShadow","koKR":"ÿc3그림자 단련 +2 (암살자 전용)\n방어력 +150~225 ÿcT(변함)\nÿc3생명력 +1~99 (캐릭터 레벨에 비례)\n독 저항 +25%\n독 지속시간 75% 감소\n홈 있음 (1~3) ÿcT(변함)","enUS":"ÿc3+2 to Shadow Disciplines (Assassin Only)\n+150-225 Defense ÿcT(Varies)\nÿc3+1-99 to Life (Based on Character Level)\nPoison Resist +25%\nPoison Length Reduced by 75%\nSocketed (1-3) ÿcT(Varies)"},
{"Key":"dictSetNatalyasSoul","koKR":"ÿc3달리기/걷기 속도 +40%\n방어력 +75~125 ÿcT(변함)\nÿc3지구력 회복 속도 0~24% 증가 (캐릭터 레벨에 비례)\n냉기 저항 +15~25% ÿcT(변함)\nÿc3번개 저항 +15~25% ÿcT(변함)","enUS":"ÿc3+40% Faster Run/Walk\n+75-125 Defense ÿcT(Varies)\nÿc3Heal Stamina Plus 0-24% (Based on Character Level)\nCold Resist +15-25% ÿcT(Varies)\nÿc3Lightning Resist +15-25% ÿcT(Varies)"},
{"Key":"dictSetTalRashasWrappings","koKR":"ÿc4원소술사 기술 레벨 +3\n타격 회복 속도 +25% (4 세트)\n방어력 +150\n원거리 공격 방어력 +50\n생명력 +150\n생명력 회복 +10 (2 세트)\n모든 저항 +50\n마법 아이템 발견 확률 65% 증가 (3 세트)","enUS":"ÿc4+3 to Sorceress Skill Levels\n+25% Faster Hit Recovery (4 Items)\n+150 Defense\n+50 Defense vs. Missile\n+150 to Life\nReflensh Life +10 (2 Items)\nAll Resistances +50\n65% Better Chance of Getting Magic Items (3 Items)"},
{"Key":"dictSetTalRashasHoradricCrest","koKR":"ÿc3적중당 마나 10% 훔침\n적중당 생명력 10% 훔침\n방어력 +45\n생명력 +60\n마나 +30\n모든 저항 +15","enUS":"ÿc310% Mana stolen per hit\n10% Life stolen per hit\n+45 Defense\n+60 to Life\n+30 to Mana\nAll Resistances +15"},
{"Key":"dictSetTalRashasAdjudication","koKR":"ÿc3원소술사 기술 레벨 +2\n번개 피해 3 - 32 추가\n생명력 +50\n마나 +42\n번개 저항 +33%\nÿc2시전 속도 +10% (4 세트)","enUS":"ÿc3+2 to Sorceress Skill Levels\nAdds 3-32 lightning damage\n+50 to Life\n+42 to Mana\nLightning Resist +33%\nÿc2+10% Faster Cast Rate (4 Items)"},
{"Key":"dictSetTalRashasLidlessEye","koKR":"ÿc3시전 속도 +20%\n+1~2 냉기 숙련 (원소술사 전용) ÿcT(변함)\nÿc3+1~2 번개 숙련 (원소술사 전용) ÿcT(변함)\nÿc3+1~2 화염 숙련 (원소술사 전용) ÿcT(변함)\nÿc3마력 +10\n생명력 +57\n마나 +77\nÿc2냉기 기술 피해 +15% (완성)\n적의 번개 저항 -15% (4 세트)\n적의 화염 저항 -15% (3 세트)\n원소술사 기술 레벨 +1 (2 세트)","enUS":"ÿc3+20% Faster Cast Rate\n+1-2 to Cold Mastery (Sorceress Only) ÿcT(Varies)\nÿc3+1-2 to Lightning Mastery (Sorceress Only) ÿcT(Varies)\nÿc3+1-2 to Fire Mastery (Sorceress Only) ÿcT(Varies)\nÿc3+10 to Energy\n+57 to Life\n+77 to Mana\nÿc2+15% to Cold Skill Damage (Full Set)\n-15% to Enemy Lightning Resistance (4 Items)\n-15% to Enemy Fire Resistance (3 Items)\n+1 to Sorceress Skill Levels (2 Items)"},
{"Key":"dictSetTalRashasGuardianship","koKR":"ÿc3방어력 +400\n냉기 저항 +40%\n번개 저항 +40%\n화염 저항 +40%\n마법 피해 15 감소\n마법 아이템 발견 확률 88% 증가\n착용 조건 -60%\nÿc2시전 속도 +10% (2 세트)","enUS":"ÿc3+400 Defense\nCold Resist +40%\nLightning Resist +40%\nFire Resist +40%\nMagic Damage Reduced by 15\n88% Better Chance of Getting Magic Items\nRequirements -60%\nÿc2+10% Faster Cast Rate (2 Items)"},
{"Key":"dictSetTalRashasFineSpunCloth","koKR":"ÿc3민첩 +20\n마나 +30\n받는 피해의 +37%만큼 마나 회복\n마법 아이템 발견 확률 10~15% 증가 ÿcT(변함)\nÿc3착용 조건 -20%\nÿc2시전 속도 +10% (3 세트)\n방어력 +60 (2 세트)","enUS":"ÿc3+20 to Dexterity\n+30 to Mana\n+37% Damage Taken Goes To Mana\n10-15% Better Chance of Getting Magic Items ÿcT(Varies)\nÿc3Requirements -20%\nÿc2+10% Faster Cast Rate (3 Items)\n+60 Defense (2 Items)"},
{"Key":"dictSetHwaninsMajesty","koKR":"ÿc4모든 기술 +2\n달리기/걷기 속도 +30%\n적중당 생명력 20% 훔침\n방어력 +100 (2 세트)\n방어력 +200 (3 세트)\n모든 저항 +30","enUS":"ÿc4+2 to All Skills\n+30% Faster Run/Walk\n20% Life stolen per hit\n+100 Defense (2 Items)\n+200 Defense (3 Items)\nAll Resistances +30"},
{"Key":"dictSetHwaninsSplendor","koKR":"ÿc3방어력 +100% 증가\n생명력 회복 +20\n냉기 저항 +37%\n마법 피해 10 감소","enUS":"ÿc3+100% Enhanced Defense\nReflensh Life +20\nCold Resist +37%\nMagic Damage Reduced by 10"},
{"Key":"dictSetHwaninsJustice","koKR":"ÿc3파괴 불가\n타격 시 10% 확률로 3 레벨 얼음 작렬 시전\n공격 속도 +40%\n피해 +200% 증가\n명중률 +330\n번개 피해 5 - 25 추가","enUS":"ÿc3Indestructible\n10% Chance to cast level 3 Ice Blast on striking\n+40% Increased Attack Speed\n+200% Enhanced Damage\n+330 to Attack Rating\nAdds 5-25 lightning damage"},
{"Key":"dictSetHwaninsRefuge","koKR":"ÿc3피격 시 10% 확률로 3 레벨 전자기장 시전\n방어력 +200\n생명력 +100\n독 저항 +27%","enUS":"ÿc310% Chance to cast level 3 Static Field when struck\n+200 Defense\n+100 to Life\nPoison Resist +27%"},
{"Key":"dictSetHwaninsBlessing","koKR":"ÿc3번개 피해 3 - 33 추가\n괴물 회복 저지\n방어력 +1~148 (캐릭터 레벨에 비례)\n받는 피해의 +12%만큼 마나 회복","enUS":"ÿc3Adds 3-33 lightning damage\nPrevent Monster Heal\n+1-148 Defense (Based on Character Level)\n+12% Damage Taken Goes To Mana"},
{"Key":"dictSetAldursWatchtower","koKR":"ÿc4드루이드 기술 레벨 +3\n피해 +350% 증가\n명중률 보너스 150% (2 세트)\n적중당 마나 10% 훔침\n방어력 +150\n마나 +150\n모든 저항 +50\n마법 아이템 발견 확률 50% 증가 (3 세트)","enUS":"ÿc4+3 to Druid Skill Levels\n+350% Enhanced Damage\n150% Bonus to Attack Rating (2 Items)\n10% Mana stolen per hit\n+150 Defense\n+150 to Mana\nAll Resistances +50\n50% Better Chance of Getting Magic Items (3 Items)"},
{"Key":"dictSetAldursStonyGaze","koKR":"ÿc3타격 회복 속도 +25%\n방어력 +90\n마나 재생 17%\n냉기 저항 +40~50% ÿcT(변함)\nÿc3시야 +5\n홈 있음 (2)\nÿc2마력 +15 (완성)\n마력 +15 (3 세트)\n마력 +15 (2 세트)","enUS":"ÿc3+25% Faster Hit Recovery\n+90 Defense\nRegenerate Mana 17%\nCold Resist +40-50% ÿcT(Varies)\nÿc3+5 to Light Radius\nSocketed (2)\nÿc2+15 to Energy (Full Set)\n+15 to Energy (3 Items)\n+15 to Energy (2 Items)"},
{"Key":"dictSetAldursRhythm","koKR":"ÿc3공격 속도 +30%\n피해 40 - 62 추가\n악마에게 주는 피해 +200%\n번개 피해 50 - 75 추가\n적중당 마나 5% 훔침\n적중당 생명력 10% 훔침\n언데드에게 주는 피해 +50%\n홈 있음 (2~3) ÿcT(변함)\nÿc2힘 +15 (완성)\n힘 +15 (3 세트)\n힘 +15 (2 세트)","enUS":"ÿc3+30% Increased Attack Speed\nAdds 40-62 damage\n+200% Damage to Demons\nAdds 50-75 lightning damage\n5% Mana stolen per hit\n10% Life stolen per hit\n+50% Damage to Undead\nSocketed (2-3) ÿcT(Varies)\nÿc2+15 to Strength (Full Set)\n+15 to Strength (3 Items)\n+15 to Strength (2 Items)"},
{"Key":"dictSetAldursDeception","koKR":"ÿc3원소 기술 +1 (드루이드 전용)\n변신 기술 +1 (드루이드 전용)\n방어력 +300\n힘 +20\n민첩 +15\n번개 저항 +40~50% ÿcT(변함)\nÿc3착용 조건 -50%\nÿc2생명력 +15 (완성)\n생명력 +15 (3 세트)\n생명력 +15 (2 세트)","enUS":"ÿc3+1 to Elemental Skills (Druid Only)\n+1 to Shape Shifting Skills (Druid Only)\n+300 Defense\n+20 to Strength\n+15 to Dexterity\nLightning Resist +40-50% ÿcT(Varies)\nÿc3Requirements -50%\nÿc2+15 to Life (Full Set)\n+15 to Life (3 Items)\n+15 to Life (2 Items)"},
{"Key":"dictSetAldursAdvance","koKR":"ÿc3파괴 불가\n달리기/걷기 속도 +40%\n생명력 +50\n최대 지구력 +180\n지구력 회복 속도 32% 증가\n화염 저항 +40~50% ÿcT(변함)\nÿc3받는 피해의 +10%만큼 마나 회복\nÿc2민첩 +15 (완성)\n민첩 +15 (3 세트)\n민첩 +15 (2 세트)","enUS":"ÿc3Indestructible\n+40% Faster Run/Walk\n+50 to Life\n+180 Maximum Stamina\nHeal Stamina Plus 32%\nFire Resist +40-50% ÿcT(Varies)\nÿc3+10% Damage Taken Goes To Mana\nÿc2+15 to Dexterity (Full Set)\n+15 to Dexterity (3 Items)\n+15 to Dexterity (2 Items)"},
{"Key":"dictSetTrangOulsAvatar","koKR":"ÿc4강령술사 기술 레벨 +3\n적중당 생명력 20% 훔침\n+3 화염 숙련\n+10 운석 낙하 (4 세트)\n+13 화염벽 (3 세트)\n+18 화염구 (2 세트)\n방어력 +200\n마나 +100\n마나 재생 15%\n마나 재생 15% (4 세트)\n마나 재생 15% (3 세트)\n마나 재생 15% (2 세트)\n모든 저항 +50","enUS":"ÿc4+3 to Necromancer Skill Levels\n20% Life stolen per hit\n+3 Fire Mastery\n+10 Meteor (4 Items)\n+13 Fire Wall (3 Items)\n+18 Fire Ball (2 Items)\n+200 Defense\n+100 to Mana\nRegenerate Mana 15%\nRegenerate Mana 15% (4 Items)\nRegenerate Mana 15% (3 Items)\nRegenerate Mana 15% (2 Items)\nAll Resistances +50"},
{"Key":"dictSetTrangOulsGuise","koKR":"ÿc3타격 회복 속도 +25%\n방어력 +80~100 ÿcT(변함)\nÿc3생명력 회복 +5\n마나 +150\n공격자가 피해를 20 받음","enUS":"ÿc3+25% Faster Hit Recovery\n+80-100 Defense ÿcT(Varies)\nÿc3Reflensh Life +5\n+150 to Mana\nAttacker Takes Damage of 20"},
{"Key":"dictSetTrangOulsScales","koKR":"ÿc3소환 기술 +2 (강령술사 전용)\n달리기/걷기 속도 +40%\n방어력 +150% 증가\n원거리 공격 방어력 +100\n독 저항 +40%\n착용 조건 -40%\nÿc2받는 물리 피해 25% 감소 (완성)\n번개 저항 +50% (3 세트)","enUS":"ÿc3+2 to Summoning Skills (Necromancer Only)\n+40% Faster Run/Walk\n+150% Enhanced Defense\n+100 Defense vs. Missile\nPoison Resist +40%\nRequirements -40%\nÿc2Physical Damage Received Reduced by 25% (Full Set)\nLightning Resist +50% (3 Items)"},
{"Key":"dictSetTrangOulsWing","koKR":"ÿc3독과 뼈 기술 +2 (강령술사 전용)\n막기 확률 30% 증가\n방어력 +125\n힘 +25\n민첩 +15\n화염 저항 +38~45% ÿcT(변함)\nÿc3독 저항 +40%\nÿc2생명력 회복 +15 (4 세트)\n적의 독 저항 -25% (3 세트)","enUS":"ÿc3+2 to Poison and Bone Skills (Necromancer Only)\n30% Increased Chance of Blocking\n+125 Defense\n+25 to Strength\n+15 to Dexterity\nFire Resist +38-45% ÿcT(Varies)\nÿc3Poison Resist +40%\nÿc2Reflensh Life +15 (4 Items)\n-25% to Enemy Poison Resistance (3 Items)"},
{"Key":"dictSetTrangOulsClaws","koKR":"ÿc3저주 +2 (강령술사 전용)\n시전 속도 +20%\n독 기술 피해 +25%\n방어력 +30\n냉기 저항 +30%","enUS":"ÿc3+2 to Curses (Necromancer Only)\n+20% Faster Cast Rate\n+25% to Poison Skill Damage\n+30 Defense\nCold Resist +30%"},
{"Key":"dictSetTrangOulsGirth","koKR":"ÿc3방어력 +75~100 ÿcT(변함)\nÿc3생명력 +66\n생명력 회복 +5\n마나 +25~50 ÿcT(변함)\nÿc3최대 지구력 +30\n빙결되지 않음\n착용 조건 -40%\nÿc2냉기 저항 +40% (3 세트)","enUS":"ÿc3+75-100 Defense ÿcT(Varies)\nÿc3+66 to Life\nReflensh Life +5\n+25-50 to Mana ÿcT(Varies)\nÿc3+30 Maximum Stamina\nCannot Be Frozen\nRequirements -40%\nÿc2Cold Resist +40% (3 Items)"},
{"Key":"dictSetSazabisGrandTribute","koKR":"ÿc4모든 기술 +1\n달리기/걷기 속도 +40% (2 세트)\n적중당 생명력 15% 훔침\n최대 생명력 27% 증가\n모든 저항 +30\n받는 물리 피해 16% 감소\n독 지속시간 75% 감소 (2 세트)","enUS":"ÿc4+1 to All Skills\n+40% Faster Run/Walk (2 Items)\n15% Life stolen per hit\nIncrease Maximum Life 27%\nAll Resistances +30\nPhysical Damage Received Reduced by 16%\nPoison Length Reduced by 75% (2 Items)"},
{"Key":"dictSetSazabisMentalSheath","koKR":"ÿc3모든 기술 +1\n방어력 +100\n번개 저항 +15~20% ÿcT(변함)\nÿc3화염 저항 +15~20% ÿcT(변함)","enUS":"ÿc3+1 to All Skills\n+100 Defense\nLightning Resist +15-20% ÿcT(Varies)\nÿc3Fire Resist +15-20% ÿcT(Varies)"},
{"Key":"dictSetSazabisCobaltRedeemer","koKR":"ÿc3파괴 불가\n공격 속도 +40%\n피해 +150% 증가\n악마에게 주는 피해 +318%\n냉기 피해 25 - 35 추가\n힘 +5\n민첩 +15","enUS":"ÿc3Indestructible\n+40% Increased Attack Speed\n+150% Enhanced Damage\n+318% Damage to Demons\nAdds 25-35 cold damage\n+5 to Strength\n+15 to Dexterity"},
{"Key":"dictSetSazabisGhostLiberator","koKR":"ÿc3타격 회복 속도 +30%\n악마에 대한 명중률 +300\n방어력 +400\n힘 +25\n생명력 +50~75 ÿcT(변함)","enUS":"ÿc3+30% Faster Hit Recovery\n+300 to Attack Rating against Demons\n+400 Defense\n+25 to Strength\n+50-75 to Life ÿcT(Varies)"},
{"Key":"dictSetImmortalKing","koKR":"ÿc4야만용사 기술 레벨 +3\n명중률 +50 (2 세트)\n명중률 +75 (3 세트)\n명중률 +125 (4 세트)\n명중률 +200 (5 세트)\n생명력 +150\n모든 저항 +50\n마법 피해 10 감소","enUS":"ÿc4+3 to Barbarian Skill Levels\n+50 to Attack Rating (2 Items)\n+75 to Attack Rating (3 Items)\n+125 to Attack Rating (4 Items)\n+200 to Attack Rating (5 Items)\n+150 to Life\nAll Resistances +50\nMagic Damage Reduced by 10"},
{"Key":"dictSetImmortalKingsWill","koKR":"ÿc3함성 +2 (야만용사 전용)\n방어력 +125\n괴물에게서 얻는 금화 37% 증가\n마법 아이템 발견 확률 25~40% 증가 ÿcT(변함)\nÿc3시야 +4\n홈 있음 (2)","enUS":"ÿc3+2 to Warcries (Barbarian Only)\n+125 Defense\n37% Extra Gold from Monsters\n25-40% Better Chance of Getting Magic Items ÿcT(Varies)\nÿc3+4 to Light Radius\nSocketed (2)"},
{"Key":"dictSetImmortalKingsStoneCrusher","koKR":"ÿc3파괴 불가\n공격 속도 +40%\n피해 +200% 증가\n악마에게 주는 피해 +200%\n언데드에게 주는 피해 +250%\n강타 확률 +35~40% ÿcT(변함)\nÿc3홈 있음 (2)\nÿc2마법 피해 250 - 361 추가 (완성)\n독 피해 +204 (6초에 걸쳐) (5 세트)\n냉기 피해 127 - 364 추가 (4 세트)\n번개 피해 7 - 477 추가 (3 세트)\n화염 피해 211 - 397 추가 (2 세트)","enUS":"ÿc3Indestructible\n+40% Increased Attack Speed\n+200% Enhanced Damage\n+200% Damage to Demons\n+250% Damage to Undead\n+35-40% Chance of Crushing Blow ÿcT(Varies)\nÿc3Socketed (2)\nÿc2Adds 250-361 magic damage (Full Set)\n+204 poison damage over 6 seconds (5 Items)\nAdds 127-364 cold damage (4 Items)\nAdds 7-477 lightning damage (3 Items)\nAdds 211-397 fire damage (2 Items)"},
{"Key":"dictSetImmortalKingsSoulCage","koKR":"ÿc3피격 시 5% 확률로 5 레벨 마법부여 시전\n전투 기술 +2 (야만용사 전용)\n방어력 +400\n독 저항 +50%\nÿc2방어력 +50% 증가 (완성)\n번개 저항 +40% (5 세트)\n화염 저항 +40% (4 세트)\n냉기 저항 +40% (3 세트)\n타격 회복 속도 +25% (2 세트)","enUS":"ÿc35% Chance to cast level 5 Enchant when struck\n+2 to Combat Skills (Barbarian Only)\n+400 Defense\nPoison Resist +50%\nÿc2+50% Enhanced Defense (Full Set)\nLightning Resist +40% (5 Items)\nFire Resist +40% (4 Items)\nCold Resist +40% (3 Items)\n+25% Faster Hit Recovery (2 Items)"},
{"Key":"dictSetImmortalKingsForge","koKR":"ÿc3피격 시 12% 확률로 4 레벨 번개 줄기 시전\n방어력 +65\n힘 +20\n민첩 +20\nÿc2대상 빙결 +2 (완성)\n적중당 마나 10% 훔침 (5 세트)\n적중당 생명력 10% 훔침 (4 세트)\n방어력 +120 (3 세트)\n공격 속도 +25% (2 세트)","enUS":"ÿc312% Chance to cast level 4 Charged Bolt when struck\n+65 Defense\n+20 to Strength\n+20 to Dexterity\nÿc2Freezes Target +2 (Full Set)\n10% Mana stolen per hit (5 Items)\n10% Life stolen per hit (4 Items)\n+120 Defense (3 Items)\n+25% Increased Attack Speed (2 Items)"},
{"Key":"dictSetImmortalKingsDetail","koKR":"ÿc3방어력 +36\n힘 +25\n번개 저항 +31%\n화염 저항 +28%\nÿc2숙련 +2 (야만용사 전용) (완성)\n받는 물리 피해 20% 감소 (5 세트)\n방어력 +100% 증가 (4 세트)\n타격 회복 속도 +25% (3 세트)\n방어력 +105 (2 세트)","enUS":"ÿc3+36 Defense\n+25 to Strength\nLightning Resist +31%\nFire Resist +28%\nÿc2+2 to Masteries (Barbarian Only) (Full Set)\nPhysical Damage Received Reduced by 20% (5 Items)\n+100% Enhanced Defense (4 Items)\n+25% Faster Hit Recovery (3 Items)\n+105 Defense (2 Items)"},
{"Key":"dictSetImmortalKingsPillar","koKR":"ÿc3달리기/걷기 속도 +40%\n명중률 +110\n방어력 +75\n생명력 +44\nÿc2빙결 지속시간 절반으로 감소 (5 세트)\n방어력 +160 (4 세트)\n전투 기술 +2 (야만용사 전용) (3 세트)\n마법 아이템 발견 확률 25% 증가 (2 세트)","enUS":"ÿc3+40% Faster Run/Walk\n+110 to Attack Rating\n+75 Defense\n+44 to Life\nÿc2Half Freeze Duration (5 Items)\n+160 Defense (4 Items)\n+2 to Combat Skills (Barbarian Only) (3 Items)\n25% Better Chance of Getting Magic Items (2 Items)"},
{"Key":"dictSetTheDisciple","koKR":"ÿc4모든 기술 +2\n독 피해 +11 (1초에 걸쳐) (3 세트)\n방어력 +150 (2 세트)\n힘 +10 (4 세트)\n마나 +100\n모든 저항 +50","enUS":"ÿc4+2 to All Skills\n+11 poison damage over 1 seconds (3 Items)\n+150 Defense (2 Items)\n+10 to Strength (4 Items)\n+100 to Mana\nAll Resistances +50"},
{"Key":"dictSetTellingofBeads","koKR":"ÿc3모든 기술 +1\n냉기 저항 +18%\n독 저항 +35~50% ÿcT(변함)\nÿc3공격자가 피해를 8~10 받음 ÿcT(변함)","enUS":"ÿc3+1 to All Skills\nCold Resist +18%\nPoison Resist +35-50% ÿcT(Varies)\nÿc3Attacker Takes Damage of 8-10 ÿcT(Varies)"},
{"Key":"dictSetDarkAdherent","koKR":"ÿc3피격 시 25% 확률로 3 레벨 번개 파장 시전\n독 피해 24 - 34 추가 (2초에 걸쳐)\n방어력 +305~415 ÿcT(변함)\nÿc3화염 저항 +24%","enUS":"ÿc325% Chance to cast level 3 Nova when struck\nAdds 24-34 poison damage over 2 seconds\n+305-415 Defense ÿcT(Varies)\nÿc3Fire Resist +24%"},
{"Key":"dictSetLayingofHands","koKR":"ÿc3타격 시 10% 확률로 3 레벨 신성한 빛줄기 시전\n공격 속도 +20%\n악마에게 주는 피해 +350%\n방어력 +25\n화염 저항 +50%","enUS":"ÿc310% Chance to cast level 3 Holy Bolt on striking\n+20% Increased Attack Speed\n+350% Damage to Demons\n+25 Defense\nFire Resist +50%"},
{"Key":"dictSetCredendum","koKR":"ÿc3방어력 +50\n힘 +10\n민첩 +10\n모든 저항 +15","enUS":"ÿc3+50 Defense\n+10 to Strength\n+10 to Dexterity\nAll Resistances +15"},
{"Key":"dictSetRiteofPassage","koKR":"ÿc3달리기/걷기 속도 +30%\n방어력 +25\n최대 지구력 +15~25 ÿcT(변함)\nÿc3빙결 지속시간 절반으로 감소","enUS":"ÿc3+30% Faster Run/Walk\n+25 Defense\n+15-25 Maximum Stamina ÿcT(Varies)\nÿc3Half Freeze Duration"},
{"Key":"dictSetOrphansCall","koKR":"ÿc4방어력 +100\n힘 +20\n민첩 +10\n생명력 +35 (2 세트)\n생명력 +50\n모든 저항 +15\n공격자가 피해를 5 받음 (3 세트)\n마법 아이템 발견 확률 80% 증가","enUS":"ÿc4+100 Defense\n+20 to Strength\n+10 to Dexterity\n+35 to Life (2 Items)\n+50 to Life\nAll Resistances +15\nAttacker Takes Damage of 5 (3 Items)\n80% Better Chance of Getting Magic Items"},
{"Key":"dictSetGuillaumesFace","koKR":"ÿc3타격 회복 속도 +30%\n강타 확률 +35%\n치명적 공격 +15%\n방어력 +120% 증가\n힘 +15","enUS":"ÿc3+30% Faster Hit Recovery\n+35% Chance of Crushing Blow\n+15% Deadly Strike\n+120% Enhanced Defense\n+15 to Strength"},
{"Key":"dictSetWhitstansGuard","koKR":"ÿc3막기 속도 +40%\n막기 확률 55% 증가\n방어력 +175% 증가\n빙결 지속시간 절반으로 감소\n시야 +5","enUS":"ÿc3+40% Faster Block Rate\n55% Increased Chance of Blocking\n+175% Enhanced Defense\nHalf Freeze Duration\n+5 to Light Radius"},
{"Key":"dictSetMagnusSkin","koKR":"ÿc3공격 속도 +20%\n명중률 +100\n방어력 +50% 증가\n화염 저항 +15%\n시야 +3","enUS":"ÿc3+20% Increased Attack Speed\n+100 to Attack Rating\n+50% Enhanced Defense\nFire Resist +15%\n+3 to Light Radius"},
{"Key":"dictSetWilhelmsPride","koKR":"ÿc3적중당 마나 5% 훔침\n적중당 생명력 5% 훔침\n방어력 +75% 증가\n냉기 저항 +10%","enUS":"ÿc35% Mana stolen per hit\n5% Life stolen per hit\n+75% Enhanced Defense\nCold Resist +10%"},
{"Key":"dictSetNajsAncientVestige","koKR":"ÿc4모든 기술 +1\n화염 기술 +2\n방어력 +175 (2 세트)\n힘 +20\n민첩 +15\n최대 생명력 12% 증가\n생명력 회복 +20\n마나 +100\n모든 저항 +50\n마법 아이템 발견 확률 1~148% 증가 (캐릭터 레벨에 비례) (2 세트)","enUS":"ÿc4+1 to All Skills\n+2 to Fire Skills\n+175 Defense (2 Items)\n+20 to Strength\n+15 to Dexterity\nIncrease Maximum Life 12%\nReflensh Life +20\n+100 to Mana\nAll Resistances +50\n1-148% Better Chance of Getting Magic Items (Based on Character Level) (2 Items)"},
{"Key":"dictSetNajsCirclet","koKR":"ÿc3피격 시 12% 확률로 5 레벨 연쇄 번개 시전\n화염 피해 25 - 35 추가\n방어력 +75\n힘 +15\n시야 +5","enUS":"ÿc312% Chance to cast level 5 Chain Lightning when struck\nAdds 25-35 fire damage\n+75 Defense\n+15 to Strength\n+5 to Light Radius"},
{"Key":"dictSetNajsPuzzler","koKR":"ÿc3모든 기술 +1\n시전 속도 +30%\n피해 +150% 증가\n번개 피해 6 - 45 추가\n마력 +35\n마나 +70\n11 레벨 순간이동 (충전 69회)\n언데드에게 주는 피해 +50%","enUS":"ÿc3+1 to All Skills\n+30% Faster Cast Rate\n+150% Enhanced Damage\nAdds 6-45 lightning damage\n+35 to Energy\n+70 to Mana\nLevel 11 Teleportation (69 Charges)\n+50% Damage to Undead"},
{"Key":"dictSetNajsLightPlate","koKR":"ÿc3모든 기술 +1\n방어력 +300\n생명력 +65\n모든 저항 +25\n받는 피해의 +45%만큼 마나 회복\n착용 조건 -60%","enUS":"ÿc3+1 to All Skills\n+300 Defense\n+65 to Life\nAll Resistances +25\n+45% Damage Taken Goes To Mana\nRequirements -60%"},
{"Key":"dictSetGriswoldsLegacy","koKR":"ÿc4성기사 기술 레벨 +3\n타격 회복 속도 +30%\n명중률 +200\n힘 +20 (2 세트)\n민첩 +30 (3 세트)\n생명력 +150\n모든 저항 +50","enUS":"ÿc4+3 to Paladin Skill Levels\n+30% Faster Hit Recovery\n+200 to Attack Rating\n+20 to Strength (2 Items)\n+30 to Dexterity (3 Items)\n+150 to Life\nAll Resistances +50"},
{"Key":"dictSetGriswoldsValor","koKR":"ÿc3방어력 +50~75% 증가 ÿcT(변함)\nÿc3모든 저항 +5\n냉기 피해 흡수 +0~24 (캐릭터 레벨에 비례)\n마법 아이템 발견 확률 20~30% 증가 ÿcT(변함)\nÿc3착용 조건 -40%\n홈 있음 (2)\nÿc2공격 오라 +2 (성기사 전용) (2 세트)","enUS":"ÿc3+50-75% Enhanced Defense ÿcT(Varies)\nÿc3All Resistances +5\n+0-24 Absorbs Cold Damage (Based on Character Level)\n20-30% Better Chance of Getting Magic Items ÿcT(Varies)\nÿc3Requirements -40%\nSocketed (2)\nÿc2+2 to Offensive Auras (Paladin Only) (2 Items)"},
{"Key":"dictSetGriswoldsRedemption","koKR":"ÿc3공격 속도 +40%\n피해 +200~240% 증가 ÿcT(변함)\nÿc3언데드에게 주는 피해 +250%\n착용 조건 -20%\n홈 있음 (3~4) ÿcT(변함)\nÿc2전투 기술 +2 (성기사 전용) (2 세트)\n피해 10 - 20 추가 (3 세트)\n피해 10 - 20 추가 (완성)","enUS":"ÿc3+40% Increased Attack Speed\n+200-240% Enhanced Damage ÿcT(Varies)\nÿc3+250% Damage to Undead\nRequirements -20%\nSocketed (3-4) ÿcT(Varies)\nÿc2+2 to Combat Skills (Paladin Only) (2 Items)\nAdds 10-20 damage (3 Items)\nAdds 10-20 damage (Full Set)"},
{"Key":"dictSetGriswoldsHeart","koKR":"ÿc3방어 오라 +2 (성기사 전용)\n방어력 +500\n힘 +20\n착용 조건 -40%\n홈 있음 (3)","enUS":"ÿc3+2 to Defensive Auras (Paladin Only)\n+500 Defense\n+20 to Strength\nRequirements -40%\nSocketed (3)"},
{"Key":"dictSetGriswoldsHonor","koKR":"ÿc3막기 속도 +65%\n막기 확률 20% 증가\n방어력 +108\n모든 저항 +45\n홈 있음 (3)","enUS":"ÿc3+65% Faster Block Rate\n20% Increased Chance of Blocking\n+108 Defense\nAll Resistances +45\nSocketed (3)"},
{"Key":"dictSetBulKathosChildren","koKR":"ÿc4모든 기술 +2\n명중률 +200\n악마에게 주는 피해 +200%\n언데드에게 주는 피해 +200%\n화염 피해 +200\n적중당 생명력 10% 훔침\n치명적 공격 +20%\n방어력 +200","enUS":"ÿc4+2 to All Skills\n+200 to Attack Rating\n+200% Damage to Demons\n+200% Damage to Undead\n+200 fire damage\n10% Life stolen per hit\n+20% Deadly Strike\n+200 Defense"},
{"Key":"dictSetBulKathosTribalGuardian","koKR":"ÿc3공격 속도 +20%\n피해 +200% 증가\n독 피해 +50 (2초에 걸쳐)\n힘 +20\n화염 저항 +50%","enUS":"ÿc3+20% Increased Attack Speed\n+200% Enhanced Damage\n+50 poison damage over 2 seconds\n+20 to Strength\nFire Resist +50%"},
{"Key":"dictSetBulKathosSacredCharge","koKR":"ÿc3공격 속도 +20%\n피해 +200% 증가\n강타 확률 +35%\n모든 저항 +20","enUS":"ÿc3+20% Increased Attack Speed\n+200% Enhanced Damage\n+35% Chance of Crushing Blow\nAll Resistances +20"},
{"Key":"dictSetHeavensBrethren","koKR":"ÿc4모든 기술 +2\n최대 화염 피해 +3~297 (캐릭터 레벨에 비례) (3 세트)\n적중당 생명력 10% 훔침 (2 세트)\n생명력 회복 +30 (3 세트)\n모든 저항 +50\n받는 물리 피해 24% 감소\n빙결되지 않음\n시야 +5","enUS":"ÿc4+2 to All Skills\n+3-297 to Maximum Fire Damage (Based on Character Level) (3 Items)\n10% Life stolen per hit (2 Items)\nReflensh Life +30 (3 Items)\nAll Resistances +50\nPhysical Damage Received Reduced by 24%\nCannot Be Frozen\n+5 to Light Radius"},
{"Key":"dictSetOndalsAlmighty","koKR":"ÿc3타격 시 10% 확률로 3 레벨 약화 시전\n타격 회복 속도 +24%\n방어력 +50\n힘 +10\n민첩 +15\n착용 조건 -40%","enUS":"ÿc310% Chance to cast level 3 Weaken on striking\n+24% Faster Hit Recovery\n+50 Defense\n+10 to Strength\n+15 to Dexterity\nRequirements -40%"},
{"Key":"dictSetDangoonsTeaching","koKR":"ÿc3타격 시 10% 확률로 3 레벨 서릿발 시전\n공격 속도 +40%\n최대 피해 +1~148 (캐릭터 레벨에 비례)\n화염 피해 20 - 30 추가\n언데드에게 주는 피해 +50%","enUS":"ÿc310% Chance to cast level 3 Frost Nova on striking\n+40% Increased Attack Speed\n+1-148 to Maximum Damage (Based on Character Level)\nAdds 20-30 fire damage\n+50% Damage to Undead"},
{"Key":"dictSetHaemosusAdamant","koKR":"ÿc3방어력 +500\n근접 공격 방어력 +40\n원거리 공격 방어력 +35\n생명력 +75\n착용 조건 -20%","enUS":"ÿc3+500 Defense\n+40 Defense vs. Melee\n+35 Defense vs. Missile\n+75 to Life\nRequirements -20%"},
{"Key":"dictSetTaebaeksGlory","koKR":"ÿc3파괴 불가\n막기 속도 +30%\n막기 확률 25% 증가\n방어력 +50\n마나 +100\n번개 저항 +30%\n공격자가 피해를 30 받음","enUS":"ÿc3Indestructible\n+30% Faster Block Rate\n25% Increased Chance of Blocking\n+50 Defense\n+100 to Mana\nLightning Resist +30%\nAttacker Takes Damage of 30"},
{"Key":"dictNoticeSockets","koKR":"최대 홈 개수는 아이템 레벨 1~25 / 26~40 / 41이상 순서로 표시","enUS":"Max Sockets are Based on Item Level: 1-25 / 26-40 / 41+"},
{"Key":"dictNoticeBlockChance","koKR":"막기 확률은 성기사 / 야만용사, 아마존, 암살자 / 드루이드, 강령술사, 원소술사 순서로 표시","enUS":"Block chance is in order: Paladin / Barb, Amazon, Assassin / Druid, Necro, Sorc."},
{"Key":"dictChippedGemSkull","koKR":"최하급 보석/해골","enUS":"Chipped Gem/Skull"},
{"Key":"dictFlawedGemSkull","koKR":"하급 보석/해골","enUS":"Flawed Gem/Skull"},
{"Key":"dictStandardGemSkull","koKR":"일반 등급 보석/해골","enUS":"Standard Gem/Skull"},
{"Key":"dictFlawlessGemSkull","koKR":"상급 보석/해골","enUS":"Flawless Gem/Skull"},
{"Key":"dictPerfectGemSkull","koKR":"최상급 보석/해골","enUS":"Perfect Gem/Skull"},
{"Key":"dictGemUpgradeSameType","koKR":"같은 종류","enUS":"Same Type"},
{"Key":"dictCraftHitPowerCommon","koKR":"ÿc3피격 시 5% 확률로 4 레벨 서릿발 시전\n공격자가 피해를 3~7 받음 ÿcT(변함)","enUS":"ÿc35% Chance to cast level 4 Frost Nova when struck\nAttacker Takes Damage of 3-7 ÿcT(Varies)"},
{"Key":"dictCraftBloodCommon","koKR":"ÿc3적중당 생명력 1~3% 훔침 ÿcT(변함)\nÿc3생명력 +10~20 ÿcT(변함)","enUS":"ÿc31-3% Life stolen per hit ÿcT(Varies)\nÿc3+10-20 to Life ÿcT(Varies)"},
{"Key":"dictCraftCasterCommon","koKR":"ÿc3마나 재생 4~10% ÿcT(변함)\nÿc3마나 +10~20 ÿcT(변함)","enUS":"ÿc3Regenerate Mana 4-10% ÿcT(Varies)\nÿc3+10-20 to Mana ÿcT(Varies)"},
{"Key":"dictCraftSafetyCommon","koKR":"ÿc3마법 피해 1~2 감소 ÿcT(변함)\nÿc3피해 1~4 감소 ÿcT(변함)","enUS":"ÿc3Magic Damage Reduced By 1-2 ÿcT(Varies)\nÿc3Damage Reduced By 1-4 ÿcT(Varies)"},
{"Key":"dictCredit","koKR":"아이템 사전 모드 ver 2.5\nCreated by 강낭땅콩","enUS":"Item Dictionary Mod ver 2.5\nCreated by jeffjks"},
{"Key":"dictLadderOnly","koKR":"(래더 전용)","enUS":"(Ladder Only)"},
{"Key":"dictMaxSocketNumber","koKR":"ÿc3최대 홈 개수","enUS":"ÿc3Max Sockets"},
{"Key":"dictWhite","koKR":"ÿc0","enUS":"ÿc0"},
{"Key":"dictGold","koKR":"ÿc4","enUS":"ÿc4"},
{"Key":"dictBlue","koKR":"ÿc3","enUS":"ÿc3"},
{"Key":"dictOrange","koKR":"ÿc8","enUS":"ÿc8"},
{"Key":"dictGreen","koKR":"ÿc2","enUS":"ÿc2"},
{"Key":"dictRange","koKR":"~","enUS":"-"},
{"Key":"dictVariable","koKR":"ÿcT(변함)","enUS":"ÿcT(Varies)"},
{"Key":"dictTextNormalWeapons","koKR":"일반 무기 목록","enUS":"Normal Weapons"},
{"Key":"dictTextNormalArmors","koKR":"일반 방어구 목록","enUS":"Normal Armors"},
{"Key":"dictTextUniqueWeapons","koKR":"유니크 무기 목록","enUS":"Unique Weapons"},
{"Key":"dictTextUniqueArmors","koKR":"유니크 방어구/기타 목록","enUS":"Unique Armors/Other"},
{"Key":"dictTextRunewords","koKR":"룬어 아이템 목록","enUS":"Runewords"},
{"Key":"dictTextSetItems","koKR":"세트 아이템 목록","enUS":"Set Items"},
{"Key":"dictTextCubeRecipes","koKR":"큐브 조합법 목록","enUS":"Cube Recipes"},
{"Key":"dictTooltipCubeRecipes","koKR":"큐브 조합법 창 열기","enUS":"Open Cube Recipes"},
{"Key":"dictCraftAdditionalProperties","koKR":"ÿcT외 추가 속성 최대 4개","enUS":"ÿcTUp to 4 Random Prefixes/Suffixes"},
{"Key":"dictItemLevel","koKR":"아이템 레벨","enUS":"Item Level"},
{"Key":"dictSameItemLevel","koKR":"아이템 레벨 유지","enUS":"Same Item Level"},
{"Key":"dictRequiredLevel","koKR":"요구 레벨","enUS":"Required Level"},
{"Key":"dictRequiredStrength","koKR":"필요 힘","enUS":"Required Strength"},
{"Key":"dictRequiredDexterity","koKR":"필요 민첩","enUS":"Required Dexterity"},
{"Key":"dictBlockRate","koKR":"막기 확률","enUS":"Chance to Block"},
{"Key":"dictSmiteDamage","koKR":"강타 피해","enUS":"Smite Damage"},
{"Key":"dictKickDamage","koKR":"발차기 피해","enUS":"Kick Damage"},
{"Key":"dictBeltSize","koKR":"허리띠 크기","enUS":"Belt Size"},
{"Key":"dictBeltSlots","koKR":"칸","enUS":" Slots"},
{"Key":"dictOneHandDamage","koKR":"한손 피해","enUS":"One-Hand Damage"},
{"Key":"dictTwoHandDamage","koKR":"양손 피해","enUS":"Two-Hand Damage"},
{"Key":"dictThrowDamage","koKR":"투척 피해","enUS":"Throw Damage"},
{"Key":"dictQuantity","koKR":"수량","enUS":"Quantity"},
{"Key":"dictBaseItem","koKR":"원재료","enUS":"Base"},
{"Key":"dictRuneUpgrade","koKR":"룬 업그레이드","enUS":"Rune Upgrade"},
{"Key":"dictGemUpgrade","koKR":"보석 업그레이드","enUS":"Gem Upgrade"},
{"Key":"dictBaseAttackSpeed","koKR":"계열 - 기본 공격 속도","enUS":"Class - Base Attack Speed"},
{"Key":"dictS","koKR":"","enUS":"s"},
{"Key":"dictClassDagger","koKR":"단도","enUS":"Dagger"},
{"Key":"dictClassSword","koKR":"도검","enUS":"Sword"},
{"Key":"dictClassAxe","koKR":"도끼","enUS":"Axe"},
{"Key":"dictClassPolearm","koKR":"미늘창","enUS":"Polearm"},
{"Key":"dictClassSpear","koKR":"창","enUS":"Spear"},
{"Key":"dictClassAmazonSpear","koKR":"아마존 전용 창","enUS":"Amazon Spear"},
{"Key":"dictClassStaff","koKR":"지팡이","enUS":"Staff"},
{"Key":"dictClassStaves","koKR":"지팡이","enUS":"Staves"},
{"Key":"dictClassWand","koKR":"마법봉 (원드)","enUS":"Wand"},
{"Key":"dictClassOrb","koKR":"보주 (오브)","enUS":"Orb"},
{"Key":"dictClassClub","koKR":"곤봉","enUS":"Club"},
{"Key":"dictClassMace","koKR":"철퇴","enUS":"Mace"},
{"Key":"dictClassHammer","koKR":"망치","enUS":"Hammer"},
{"Key":"dictClassScepter","koKR":"홀 (셉터)","enUS":"Scepter"},
{"Key":"dictClassBow","koKR":"활","enUS":"Bow"},
{"Key":"dictClassAmazonBow","koKR":"아마존 전용 활","enUS":"Amazon Bow"},
{"Key":"dictClassCrossbow","koKR":"쇠뇌","enUS":"Crossbow"},
{"Key":"dictClassThrowing","koKR":"투척","enUS":"Throwing"},
{"Key":"dictClassThrowingKnifeAxe","koKR":"투척 단도/도끼","enUS":"Throwing Knives/Axes"},
{"Key":"dictClassJavelin","koKR":"투창","enUS":"Javelin"},
{"Key":"dictClassAmazonJavelin","koKR":"아마존 전용 투창","enUS":"Amazon Javelin"},
{"Key":"dictClassClaw","koKR":"손톱","enUS":"Claw"},
{"Key":"dictClassHelm","koKR":"투구","enUS":"Helm"},
{"Key":"dictClassCirclet","koKR":"띠관","enUS":"Circlet"},
{"Key":"dictClassBarbarianHelm","koKR":"야만용사 전용 투구","enUS":"Barbarian Helm"},
{"Key":"dictClassPelt","koKR":"드루이드 전용 투구","enUS":"Pelt"},
{"Key":"dictClassArmor","koKR":"갑옷","enUS":"Armor"},
{"Key":"dictClassShield","koKR":"방패","enUS":"Shield"},
{"Key":"dictClassPaladinShield","koKR":"성기사 전용 방패","enUS":"Paladin Shield"},
{"Key":"dictClassShrunkenHead","koKR":"강령술사 전용 방패","enUS":"Shrunken Head"},
{"Key":"dictClassGlove","koKR":"장갑","enUS":"Glove"},
{"Key":"dictClassBelt","koKR":"허리띠","enUS":"Belt"},
{"Key":"dictClassBoot","koKR":"신발","enUS":"Boot"}];

    stringKeyList.forEach((item) => {
        uiJson.push(
            {
                'id': D2RMM.getNextStringID(),
                'Key': item['Key'],
                'koKR': item['koKR'],
                'enUS': item['enUS']
            }
        );
    });

    D2RMM.writeJson(uiJsonFileName, uiJson);
}

D2RMM.copyFile(
    'global', // <mod folder>\global
    'global', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\global
    true // overwrite any conflicts
);

D2RMM.copyFile(
    'hd', // <mod folder>\hd
    'hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
    true // overwrite any conflicts
);

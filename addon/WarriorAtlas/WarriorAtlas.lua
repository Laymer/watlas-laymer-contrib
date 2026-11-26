-- Warrior Atlas for WoW: Forever 1.60.1. No addon messages or combat-log access.
local addonName = ...
local eventFrame = CreateFrame("Frame")
local db, panel, exportPanel
local xpToNextFrom46 = {123200, 129100, 135100, 141200, 147500, 153900, 160400,
    167100, 173900, 180800, 187900, 195000, 202300, 209800 }
local modes = {questing="Questing", dungeon="Dungeon", grinding="Grinding", mixed="Mixed"}
local regions = {[1]="US", [2]="KR", [3]="EU", [4]="TW", [5]="CN"}
local floor, format = math.floor, string.format

local function say(message)
    print("|cff83caadWarrior Atlas|r  " .. message)
end

local function clean(value)
    if issecretvalue and issecretvalue(value) then return nil end
    return value
end

local function readAPI(fn, ...)
    if type(fn) ~= "function" then return nil end
    local ok, a, b = pcall(fn, ...)
    if ok then return clean(a), clean(b) end
end

local function now()
    return GetServerTime()
end

local function progress()
    local level = readAPI(UnitLevel, "player")
    if type(level) ~= "number" or level < 46 or level > 60 then return nil end
    if level == 60 then return 60, 0 end
    local xp = readAPI(UnitXP, "player")
    if type(xp) ~= "number" or xp < 0 or xp >= xpToNextFrom46[level-45] then return nil end
    return level, xp
end

local function totalXP(level, xp)
    local total = xp
    for previous = 46, level - 1 do total = total + xpToNextFrom46[previous-45] end
    return total
end

local function name()
    local first, second = readAPI(UnitFullName, "player")
    first = first or readAPI(UnitName, "player")
    if not first then return nil end
    if second and second ~= "" and not first:find(" ", 1, true)
        and second ~= readAPI(GetRealmName) and second ~= readAPI(GetNormalizedRealmName) then
        return first .. " " .. second
    end
    return first
end

local function equipped()
    local link = readAPI(GetInventoryItemLink, "player", 16) -- MainHandSlot
    if type(link) == "string" then return link:match("%[(.-)%]") end
end

local function pvpTime(session, timestamp)
    return session.pvpSeconds + (session.pvpStarted and math.max(0, timestamp-session.pvpStarted) or 0)
end

local function elapsed(seconds)
    return format("%d:%02d:%02d", floor(seconds/3600), floor(seconds/60)%60, floor(seconds)%60)
end

local function money(copper)
    local amount = math.abs(copper)
    return format("%s%dg %ds %dc", copper < 0 and "-" or "+", floor(amount/10000),
        floor(amount/100)%100, floor(amount)%100)
end

local function weightedPace(mode, level)
    local gain, seconds = 0, 0
    for _, old in ipairs(db.history) do
        if old.mode == mode and math.abs(old.startLevel-level) <= 2 then
            gain = gain + totalXP(old.endLevel, old.endXP) - totalXP(old.startLevel, old.startXP)
            seconds = seconds + old.endEpoch-old.startEpoch
        end
    end
    if seconds >= 600 then return gain*3600/seconds end
end

local function advice(s, level, seconds, pace)
    if level == 60 then return "Level 60 reached. Stop this session and export your journal entry." end
    if s.pvpStarted then return "PvP downtime is marked. Use /watlas pvp again when leveling resumes." end
    if s.pvpMarks >= 2 and pvpTime(s, now()) >= 180 then
        return "Repeated PvP delays: move to a second quest cluster or tank with a ready group."
    end
    if seconds >= 600 and pace then
        local other = s.mode == "Dungeon" and "Questing" or "Dungeon"
        local reference = weightedPace(other, level)
        if reference and reference > pace then
            if other == "Questing" then
                return format("Your nearby-level questing pace was %.0fk/h. Switch if the next run adds another wait.", reference/1000)
            end
            return format("Your dungeon pace was %.0fk/h near this level. Compare only if a group is ready.", reference/1000)
        end
    end
    if s.mode == "Dungeon" then
        return "Keep the clock running through recruitment, travel and resets. Recheck pace at the next clear."
    elseif level < 48 then
        return "Tanaris: pair the pirate quests at Lost Rigger Cove. Tank Zul'Farrak if a group is ready."
    elseif level <= 50 then
        return "Pair Hinterlands or Tanaris objectives. Try Alcaz Prison with a ready level-appropriate group."
    elseif level <= 54 then
        return "Stack Un'Goro kill and collection objectives before returning to Marshal's Refuge."
    elseif level <= 57 then
        return "Pair Western Plaguelands objectives. Benchmark a ready Blackmaw Hold group against solo pace."
    end
    return "Finish short Plaguelands clusters. Compare a ready Shaper's Terrace group, counting travel."
end

local function currentStats(s)
    local level, xp = progress()
    local duration = math.max(0, now()-s.startEpoch)
    if not level then return duration end
    local gain = totalXP(level, xp) - totalXP(s.startLevel, s.startXP)
    -- Client readings can briefly be inconsistent during a level-up or loading screen.
    if gain < 0 then return duration end
    return duration, level, gain, duration > 0 and gain*3600/duration or 0
end

local function draw()
    if not db or not panel then return end
    local s = db.active
    if not s then
        panel.stats:SetText("Session idle")
        panel.detail:SetText("Use /watlas start questing (or dungeon, grinding, mixed).")
        panel.hint:SetText(#db.history > 0 and "Last session saved. Use /watlas export to copy it." or "Start before travel and group assembly to measure the whole trip.")
        return
    end
    local duration, level, gain, pace = currentStats(s)
    panel.stats:SetText(format("%s  |  %s  |  %s", s.mode, elapsed(duration), pace and format("%.1fk XP/h", pace/1000) or "reading XP"))
    local wallet = readAPI(GetMoney)
    local delta = wallet and s.startCopper and money(wallet-s.startCopper) or "unavailable"
    panel.detail:SetText(format("%s XP  ·  Wallet %s\nDeaths %d  ·  Marked PvP %s", gain and "+"..gain or "—", delta, s.deaths, elapsed(pvpTime(s,now()))))
    panel.hint:SetText(advice(s, level or s.startLevel, duration, pace))
end

local function font(parent, style, x, y, width)
    local label = parent:CreateFontString(nil, "OVERLAY", style)
    label:SetPoint("TOPLEFT",x,y)
    label:SetWidth(width)
    label:SetJustifyH("LEFT")
    label:SetJustifyV("TOP")
    return label
end

local function placePanel()
    panel:ClearAllPoints()
    if db.position then
        panel:SetPoint(db.position.point, UIParent, db.position.relativePoint, db.position.x, db.position.y)
    else
        panel:SetPoint("RIGHT", UIParent, "RIGHT", -50, 80)
    end
end

local function buildPanel()
    panel = CreateFrame("Frame", "WarriorAtlasMeter", UIParent, "BackdropTemplate")
    panel:SetSize(318,148)
    panel:SetFrameStrata("MEDIUM")
    panel:SetBackdrop({bgFile="Interface\\Buttons\\WHITE8X8",edgeFile="Interface\\Buttons\\WHITE8X8",edgeSize=1})
    panel:SetBackdropColor(0.035,0.080,0.074,0.94)
    panel:SetBackdropBorderColor(.42,.53,.43,.9)
    panel:SetMovable(true)
    panel:SetClampedToScreen(true)
    panel:EnableMouse(true)
    panel:RegisterForDrag("LeftButton")
    panel:SetScript("OnDragStart",function(self) self:StartMoving() end)
    panel:SetScript("OnDragStop",function(self)
        self:StopMovingOrSizing()
        local p, _, r, x, y = self:GetPoint()
        db.position = {point=p, relativePoint=r, x=x, y=y}
    end)
    placePanel()
    local title = font(panel, "GameFontNormal", 12, -10, 245)
    title:SetText("WARRIOR ATLAS")
    title:SetTextColor(.70,.82,.65)
    local close = CreateFrame("Button", nil, panel, "UIPanelCloseButton")
    close:SetSize(22,22)
    close:SetPoint("TOPRIGHT",-3,-2)
    close:SetScript("OnClick",function() db.hidden=true; panel:Hide() end)
    panel.stats = font(panel,"GameFontHighlight",12,-33,294)
    panel.detail = font(panel,"GameFontHighlightSmall",12,-56,294)
    panel.hint = font(panel,"GameFontNormalSmall",12,-94,294)
    local since = 0
    panel:SetScript("OnUpdate",function(_,delta)
        since=since+delta
        if since >= 1 then since=0; draw() end
    end)
    if not db.active or db.hidden then panel:Hide() end
    draw()
end

local function start(mode)
    if db.active then say("A session is already running. Use /watlas stop to finish it."); return end
    local startingZone = readAPI(GetRealZoneText)
    if not startingZone or startingZone == "" then say("Wait for the zone to finish loading."); return end
    local level, xp = progress()
    if not level or level == 60 then say("Start in the game world at level 46–59 with a readable XP bar."); return end
    local enteredMode = mode:lower()
    if enteredMode == "" then
        local inside, kind = readAPI(IsInInstance)
        enteredMode = inside and kind=="party" and "dungeon" or "questing"
    end
    if not modes[enteredMode] then say("Choose questing, dungeon, grinding or mixed."); return end
    local timestamp = now()
    local character = name()
    if not character then say("Wait for your character to finish loading."); return end
    db.sequence = db.sequence+1
    local s = {
        schema="warrior-atlas.session.v1",id=format("WA1-%s-%d-%d",character,timestamp,db.sequence),
        character=character,region=regions[readAPI(GetCurrentRegion)],startEpoch=timestamp,
        startLevel=level,startXP=xp,startCopper=readAPI(GetMoney),mode=modes[enteredMode],zone=startingZone,
        deaths=0,pvpSeconds=0,pvpMarks=0
    }
    db.active=s
    if not db.hidden then panel:Show() end
    draw()
    say(s.mode.." session started in "..s.zone..". /watlas stop saves it.")
end

local function stop()
    local s = db.active
    if not s then say("There is no active session."); return end
    local timestamp, level, xp = now(), progress()
    if not level or totalXP(level,xp) < totalXP(s.startLevel,s.startXP) then
        say("XP is temporarily unavailable. Try again after the zone or level transition."); return
    end
    if timestamp <= s.startEpoch then say("Wait at least one second before stopping."); return end
    s.endEpoch, s.endLevel, s.endXP = timestamp, level, xp
    s.endCopper, s.weapon = readAPI(GetMoney), equipped()
    s.pvpMinutes = pvpTime(s,timestamp)/60
    s.pvpStarted = nil
    table.insert(db.history,1,s)
    if #db.history > 50 then table.remove(db.history) end
    db.active=nil
    draw()
    say(format("Saved %s, %s, +%d XP. Use /watlas export to copy it.",s.mode,elapsed(timestamp-s.startEpoch),
        totalXP(level,xp)-totalXP(s.startLevel,s.startXP)))
end

local function togglePvP()
    local s=db.active
    if not s then say("Start a session before marking PvP downtime."); return end
    if s.pvpStarted then
        s.pvpSeconds=pvpTime(s,now())
        s.pvpStarted=nil
        say("PvP downtime ended. Your session timer kept running.")
    else
        s.pvpStarted=now()
        s.pvpMarks=s.pvpMarks+1
        say("Marking time lost to world PvP. Repeat /watlas pvp to end the interval.")
    end
    draw()
end

local escapes = {['"']='\\"', ['\\']='\\\\', ['\n']='\\n', ['\r']='\\r', ['\t']='\\t'}
local function quote(value)
    return '"' .. value:gsub('[%z\1-\31\\"]',function(ch)
        return escapes[ch] or format("\\u%04x",string.byte(ch))
    end) .. '"'
end

local function encode(s)
    local fields = {"schema","id","character","region","startEpoch","endEpoch","startLevel","startXP",
        "endLevel","endXP","startCopper","endCopper","weapon","pvpMinutes","deaths","zone","mode"}
    local entries = {}
    for _,k in ipairs(fields) do
        local v=s[k]
        if type(v)=="string" then table.insert(entries, quote(k)..":"..quote(v))
        elseif type(v)=="number" then table.insert(entries, quote(k)..":"..format("%.8f",v):gsub("0+$",""):gsub("%.$","")) end
    end
    return "{"..table.concat(entries,",").."}"
end

local function showExport(index)
    local s=db.history[index]
    if not s then say("No saved session at that index. /watlas history lists the latest entries."); return end
    if not exportPanel then
        exportPanel=CreateFrame("Frame","WarriorAtlasExport",UIParent,"BackdropTemplate")
        exportPanel:SetSize(440,105)
        exportPanel:SetPoint("CENTER")
        exportPanel:SetFrameStrata("DIALOG")
        exportPanel:SetClampedToScreen(true)
        exportPanel:SetBackdrop({bgFile="Interface\\Buttons\\WHITE8X8",edgeFile="Interface\\Buttons\\WHITE8X8",edgeSize=1})
        exportPanel:SetBackdropColor(.045,.09,.08,.98)
        exportPanel:SetBackdropBorderColor(.5,.61,.45,1)
        local title=font(exportPanel,"GameFontNormal",16,-13,380)
        title:SetText("Warrior Atlas  ·  Copy session")
        local subtitle=font(exportPanel,"GameFontHighlightSmall",16,-37,405)
        subtitle:SetText("Press Ctrl+C (Cmd+C on Mac), then paste into the website's session import.")
        local edit=CreateFrame("EditBox",nil,exportPanel,"InputBoxTemplate")
        edit:SetSize(400,24)
        edit:SetPoint("BOTTOMLEFT",21,13)
        edit:SetMaxLetters(8192)
        edit:SetAutoFocus(false)
        edit:SetScript("OnEscapePressed",function() exportPanel:Hide() end)
        edit:SetScript("OnEnterPressed",function() exportPanel:Hide() end)
        exportPanel.edit=edit
        local close=CreateFrame("Button",nil,exportPanel,"UIPanelCloseButton")
        close:SetPoint("TOPRIGHT")
        close:SetScript("OnClick",function() exportPanel:Hide() end)
    end
    exportPanel:Show()
    exportPanel.edit:SetText(encode(s))
    exportPanel.edit:SetFocus()
    exportPanel.edit:HighlightText()
end

local function command(message)
    local commandName, arg=message:match("^%s*(%S*)%s*(.-)%s*$")
    commandName=commandName:lower()
    if commandName=="start" then start(arg)
    elseif commandName=="stop" then stop()
    elseif commandName=="pvp" then togglePvP()
    elseif commandName=="show" or commandName=="" then db.hidden=false; panel:Show(); draw()
    elseif commandName=="hide" then db.hidden=true; panel:Hide()
    elseif commandName=="export" then
        local n=arg=="" and 1 or tonumber(arg)
        if n and n==floor(n) and n>=1 then showExport(n) else say("Use /watlas export or /watlas export 2.") end
    elseif commandName=="history" then
        if #db.history==0 then say("No completed sessions yet.") end
        for i=1,math.min(#db.history,10) do
            local s=db.history[i]
            say(format("%d. %s, %s, %s, level %d. /watlas export %d",i,s.zone,s.mode,elapsed(s.endEpoch-s.startEpoch),s.startLevel,i))
        end
    else
        say("Commands: start [questing|dungeon|grinding|mixed], stop, pvp, export [number], history, show, hide.")
    end
end

eventFrame:RegisterEvent("ADDON_LOADED")
eventFrame:SetScript("OnEvent",function(self,event,arg)
    if event=="ADDON_LOADED" then
        if arg~=addonName then return end
        WarriorAtlasCharacterDB=WarriorAtlasCharacterDB or {history={},sequence=0}
        db=WarriorAtlasCharacterDB
        self:UnregisterEvent("ADDON_LOADED")
        self:RegisterEvent("PLAYER_LOGIN")
        self:RegisterEvent("PLAYER_DEAD")
        SLASH_WARRIORATLAS1="/watlas"
        SlashCmdList.WARRIORATLAS=command
    elseif event=="PLAYER_LOGIN" then
        buildPanel()
        if db.active then say("Session resumed. The wall clock includes time since start.") end
    elseif event=="PLAYER_DEAD" and db.active then
        db.active.deaths=db.active.deaths+1
        draw()
    end
end)

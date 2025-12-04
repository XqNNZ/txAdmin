# Changes Since Commit ed72cd4e1483b6fbb9de1aa1f78f6dd8e30038ca

This document lists all changes made since commit `ed72cd4e1483b6fbb9de1aa1f78f6dd8e30038ca` that need to be reapplied to the newer version.

## Commits Summary
1. `42da05d2` - chore: Get rid of SVG
2. `f5f33f4d` - feat: Build batch file cuz im lazy
3. `cafda645` - chore: Remove Troll options
4. `354f4444` - chore(lang): Admin > Staff
5. `ed9bd366` - chore: Disable troll actions
6. `b27cd8f8` - chore: Warn -> Kick

---

## 1. BUILD.bat (NEW FILE)

**Location:** `BUILD.bat` (root directory)

**Action:** Create new file

**Content:**
```batch
@echo off

npm run build
```

---

## 2. locale/en.json

**Location:** `locale/en.json`

**Changes:**
- Line 86: Change `"directmessage_title": "DM from admin %{author}:"` to `"directmessage_title": "DM from staff %{author}:"`
- Line 92: Change `"was_frozen": "You have been frozen by a server admin!"` to `"was_frozen": "You have been frozen by a server staff!"`

**Full context:**
```json
"directmessage_title": "DM from staff %{author}:",
...
"was_frozen": "You have been frozen by a server staff!"
```

---

## 3. nui/src/components/PlayerModal/Tabs/DialogActionView.tsx

**Location:** `nui/src/components/PlayerModal/Tabs/DialogActionView.tsx`

**Action:** Remove the entire troll actions section

**Remove these lines (approximately lines 384-418):**
```tsx
<Typography className={classes.sectionTitle}>
  {t("nui_menu.player_modal.actions.troll.title")}
</Typography>
<Box className={classes.actionGrid}>
  <Button
    variant="outlined"
    color="primary"
    onClick={handleDrunk}
    disabled={!userHasPerm("players.troll", playerPerms)}
  >
    {t("nui_menu.player_modal.actions.troll.options.drunk")}
  </Button>
  <Button
    variant="outlined"
    color="primary"
    onClick={handleSetOnFire}
    disabled={!userHasPerm("players.troll", playerPerms)}
  >
    {t("nui_menu.player_modal.actions.troll.options.fire")}
  </Button>
  <Button
    variant="outlined"
    color="primary"
    onClick={handleWildAttack}
    disabled={!userHasPerm("players.troll", playerPerms)}
  >
    {t("nui_menu.player_modal.actions.troll.options.wild_attack")}
  </Button>
</Box>
```

**Note:** Also check if `handleDrunk`, `handleSetOnFire`, and `handleWildAttack` functions need to be removed if they're no longer used.

---

## 4. nui/src/components/PlayerModal/Tabs/DialogHistoryView.tsx

**Location:** `nui/src/components/PlayerModal/Tabs/DialogHistoryView.tsx`

**Change:** Update translation key for kick action (fix bug where kick actions showed wrong message)

**Line ~68:** Change from:
```tsx
actionMessage = t("nui_menu.player_modal.history.warned_by", {
  author: action.author,
});
```

**To:**
```tsx
actionMessage = t("nui_menu.player_modal.history.kicked_by", {
  author: action.author,
});
```

**Note:** This fixes a bug where kick actions in the history were incorrectly using the "warned_by" translation key instead of "kicked_by".

---

## 5. panel/src/components/Logos.tsx

**Location:** `panel/src/components/Logos.tsx`

**Action:** Complete refactor - Replace SVG logos with image-based logos

**Major Changes:**
- Remove all SVG code
- Replace with image-based implementation using external URL: `https://bhrp.nz/assets/server/tx-banner.png`
- Change from `useId` hook to React imports
- Implement `BalancedLogo` component for responsive sizing

**Key Implementation Details:**
- Logo URL: `https://bhrp.nz/assets/server/tx-banner.png`
- Uses responsive height with `clamp()` CSS function
- Default heights:
  - `LogoFullSolidThin`: `clamp(88px, 11vh, 136px)`
  - `LogoFullSquareGreen`: `clamp(76px, 9.5vh, 120px)`
  - `LogoSquareGreen`: `clamp(76px, 9.5vh, 120px)`
- Supports `boxHeight` and `boxWidth` props for customization

**Full replacement needed** - See git diff for complete file content.

---

## 6. resource/menu/client/cl_trollactions.lua

**Location:** `resource/menu/client/cl_trollactions.lua`

**Action:** Disable troll action functionality

**Changes:**

1. **RegisterNetEvent('txcl:setDrunk')** - Replace function body:
   ```lua
   -- OLD:
   drunkThreadFivem()
   -- or
   drunkThreadRedm()
   
   -- NEW:
   -- oops nothing happened 🤭
   ```

2. **RegisterNetEvent('txcl:setOnFire')** - Replace function body:
   ```lua
   -- OLD:
   debugPrint('Setting player on fire')
   local playerPed = PlayerPedId()
   StartEntityFire(playerPed)
   
   -- NEW:
   -- oops nothing happened 🤭
   ```

3. **RegisterNetEvent('txcl:wildAttack')** - Replace function body:
   ```lua
   -- OLD:
   startWildAttack()
   
   -- NEW:
   -- oops nothing happened 🤭
   ```

---

## Summary Checklist

When reapplying to the newer version:

- [ ] Create `BUILD.bat` file with npm build command
- [ ] Update `locale/en.json` - change "admin" to "staff" (2 locations)
- [ ] Remove troll actions section from `DialogActionView.tsx`
- [ ] Update `DialogHistoryView.tsx` - change "warned_by" to "kicked_by"
- [ ] Refactor `panel/src/components/Logos.tsx` - replace SVG with image-based logos
- [ ] Disable troll actions in `resource/menu/client/cl_trollactions.lua` (3 functions)

---

---

## 7. Kick Feature Implementation (PRESERVE)

**Important:** The kick feature was implemented in earlier commits and should be preserved when moving to the newer version. While only a bug fix was made in the tracked commits, the full kick feature implementation includes:

### Backend Implementation:

1. **`core/webroutes/player/actions.ts`**
   - `handleKick()` function (lines ~327-386)
   - Handles POST requests to `/player/kick`
   - Validates permissions (`players.kick`)
   - Registers kick action in database
   - Dispatches `txAdmin:events:playerKicked` event

2. **`core/components/PlayerDatabase/index.ts`**
   - `registerKickAction()` method (lines ~337-379)
   - Stores kick actions in the database
   - Returns action ID for tracking

3. **`core/components/PlayerDatabase/databaseTypes.ts`**
   - `DatabaseActionKickType` type definition
   - Includes kick actions in `DatabaseActionType` union

### Frontend Implementation:

1. **`nui/src/components/PlayerModal/Tabs/DialogActionView.tsx`**
   - `handleKick()` function (lines ~151-179)
   - Kick button in moderation section (line ~328-331)
   - Opens dialog for kick reason input
   - Calls `/player/kick` API endpoint

2. **`nui/src/components/PlayerModal/Tabs/DialogHistoryView.tsx`**
   - Displays kick actions in history (line ~66-69)
   - Uses `action.type == "kick"` to identify kick actions
   - Shows "kicked_by" translation

3. **`nui/src/components/PlayerModal/Tabs/DialogInfoView.tsx`**
   - Tracks kick count in player stats (line ~107)
   - Displays kick count in info tab (lines ~170-171)

4. **`nui/src/state/permissions.state.ts`**
   - `"players.kick"` permission defined (line ~14)

### Resource Implementation:

1. **`resource/sv_main.lua`**
   - `TX_EVENT_HANDLERS.playerKicked` event handler (line ~215)
   - Handles kick events from txAdmin
   - Uses `DropPlayer()` to actually kick the player

### When Moving to Newer Version:

- [ ] Verify kick feature still exists in newer version
- [ ] Ensure all kick-related code is preserved
- [ ] Test kick functionality after migration
- [ ] Verify permissions system includes `players.kick`
- [ ] Check that database schema supports kick actions
- [ ] Ensure translation keys exist for kick messages

---

## Notes

- The logo change is the most significant refactor, replacing complex SVG code with a simpler image-based approach
- Troll actions are disabled but not removed (commented out with a message)
- Language changes reflect a shift from "admin" terminology to "staff" terminology
- The build batch file is a convenience script for Windows users
- **The kick feature bug fix (warned_by → kicked_by) is a critical fix** - ensure kick actions display correctly in history


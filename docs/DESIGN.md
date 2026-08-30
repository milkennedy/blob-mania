# BLOB MANIA — Game Design & Build Prompt

**Designer:** Sam
**Target platform:** Roblox (Luau, Roblox Studio)
**Existing prototype:** `blob_brawl_dig.html` — a playable HTML version Sam already built. This
document is the plan for turning that prototype into a real Roblox game.
**Genre:** Top-down arena shooter with a dig-to-discover collection meta
**Audience:** Roblox players 9–16 — All Ages / Mild, no blood, no gore
**Status:** v1 build plan. Single source of truth for the Roblox build.

> **How to use this file:** hand it to Claude and say *"build Phase 1 of Blob Mania from this
> document."* Every phase at the bottom has a definition of done. Build them in order.

---

## 0. The pitch

You are a blob in an arena full of other blobs. Last blob standing wins. Between fights you
**dig** — three digs at a buried dig site and you discover a new brawler. Five blobs to
discover, each one better than the last, each one with a wardrobe of skins where **the skin
changes what your shot looks like, never what it does.** The final blob, the Gold Blob, costs a
million gold. Almost nobody will ever have it. That's the point.

The prototype already proves the core: mouse aim, WASD move, enemy blobs that fight back, dig
sites, saved discoveries, last-blob-standing rounds. The Roblox build keeps that exact feel and
adds what a real multiplayer game needs — friends, parties, fair teams, and four **Arena
Sports** modes where the ball is just another thing to shoot.

---

## 1. Design pillars

1. **Thirty seconds to fun.** Green Blob is unlocked from the first second. No tutorial wall.
2. **Cosmetics are fireworks, not power.** A skin changes colour, trail, impact VFX and sound.
   It **never** changes damage, range, fire rate, speed or hitbox. This keeps the game fair and
   keeps the skins worth chasing.
3. **Digging is the hook.** Every round should end with the player thinking *"one more, I'm two
   digs off the Blue Blob."* The dig is the reason to play the next match.
4. **Read the fight in one glance.** Big visible projectiles, distinct silhouettes, a wind-up
   tell on every ability. If a player can't say why they died, the design failed.
5. **100% original.** See §2.

---

## 2. Originality rules — READ THIS FIRST

This is a genre game. It is *inspired by* arena brawlers, and nothing in it may be lifted from
one.

**What's safe:**

- **Mechanics are free.** A super meter, a dash, an ammo bar, last-blob-standing, bushes you
  hide in, a minimap — these are ideas, and ideas aren't copyrightable. Build them freely.
- **"Blob Mania" is a fine title.** "Brawl" is an ordinary English word that
  nobody owns. Sam's title is Sam's.

**What isn't:**

- **No other game's names.** Not its title, characters, abilities, modes, currencies or UI
  labels — in the game, the description, the tags, or a thumbnail. Specifically: never put
  another game's trademarked name in the Roblox title, description or tags. That is the single
  fastest way to get an experience taken down, and it's the mistake most kid-made Roblox games
  make.
- **No copied assets.** No ripped models, textures, icons, fonts, sounds or music. Everything is
  (a) made by Sam, (b) from the Roblox Creator Store or Roblox audio library under a licence
  that permits it, or (c) generated/commissioned and owned by us. Keep a one-line source note
  per third-party asset in `docs/ASSET_SOURCES.md`.
- **No trade-dress cloning.** Don't rebuild another game's exact HUD layout, health-bar shape,
  card-reveal animation or menu flow beat for beat. A pixel-copy of someone's screen is not a
  mechanic.

**Patents:** not a real risk here. Copyright and trademark are, and the rules above cover both.

If a step is ever ambiguous about whether something is copied, it doesn't ship — log it in §11
and ask Sam.

---

## 3. The five blobs

Discovered in a **fixed order** — never randomly. Green is free; every other blob must be both
**discovered by digging** and **bought with gold**.

```
🟢 Green ──dig──▶ 🟣 Purple ──dig──▶ 🔵 Blue ──dig──▶ 🟡 Yellow ──dig──▶ ✨ Gold
   free            500 gold           700 gold         1,000 gold        1,000,000 gold
   starter         Rare               Epic             Legendary         Mythic
```

Health is on the prototype's scale — Green Blob has 500, so everything sits around there.
Speed is Roblox studs/second (default humanoid walk is 16).

| Blob | Rarity | HP | Speed | Weapon | Damage | Fire rate | Range | Super |
|---|---|---|---|---|---|---|---|---|
| **🟢 Green** | Starter | 500 | 16 | **Plasma Blaster** — 3-orb spray | 45 ×3 | 2.0/s | 28 studs | **Toxic Bloom** — poison pool, 20/s for 6s |
| **🟣 Purple** | Rare | 450 | 16 | **Void Cannon** — single heavy orb | 130 + 30% slow 1.5s | 1.2/s | 34 studs | **Singularity** — pulls enemies in 1.5s, pops for 100 |
| **🔵 Blue** | Epic | 380 | 15 | **Frost Rifle** — piercing bolt, hits 2 | 145 + 25% slow 1s | 1.0/s | 46 studs | **Glacier Wall** — 20-stud ice wall, melts in 8s |
| **🟡 Yellow** | Legendary | 470 | 17 | **Solar Burst** — 5-round fast burst | 32 ×5 | 2.6/s | 26 studs | **Solar Flare** — 60° cone, 130 burn over 3s |
| **✨ Gold** | Mythic | 800 | 13 | **Golden Cannon** — slow cannonball | 200 splash, 3-stud radius | 0.7/s | 24 studs | **Golden Meteor** — 180 + knockback, 10-stud radius |

**Shared rules for every blob**

- **Dash** — 12 studs, 4s cooldown, with an on-screen dash-ready indicator. Dashing does not
  cancel your shot cooldown.
- **Super meter** — fills from damage dealt, not damage taken. Roughly three landed magazines
  = one super. On-screen super indicator; the button is locked until it's full. Keeps **50%**
  on death.
- **Ammo** — 3 shot charges, one refills every 1.6s (Gold 2.4s, Yellow 1.1s).
- **Respawn** (in modes with respawns) 3.0s with 1.5s of spawn protection that breaks the
  instant you shoot.
- **No hitscan anywhere.** Every attack is a visible travelling projectile. Pillar 4.

> ⚠️ **Balance flag:** Gold Blob at 800 HP and 200 splash is meaningfully stronger than the
> rest, which conflicts with Pillar 2. That's a deliberate exception — Gold is the million-gold
> Mythic and it's allowed to feel like a reward. But it means **Gold Blob must be excluded from
> any ranked or competitive mode** if one is ever added. Fine in the core PvE-flavoured arena.
> Flagged in §12.

---

## 4. The dig system (the meta layer)

This is the part that makes the game Sam's, so build it carefully.

- **Dig sites** are buried around the map — visible as a small mound with a faint sparkle.
- **Three digs at the same site** discovers the next blob in the order. Digs persist across
  rounds; the counter is saved.
- A dig takes ~1.2s with a visible progress ring. You are vulnerable while digging — that's the
  tension. Taking damage interrupts the dig (progress on that dig is lost, the site's total is
  not).
- **Discovery ≠ ownership.** Digging up a blob reveals it in the collection screen with its
  price. You still have to buy it with gold. This gives the player two goals at once instead of
  one, and it means digging never feels wasted.
- **Discovered blobs are saved permanently** to the player's profile. A discovery is never lost.
- Sites respawn elsewhere on the map after being fully dug, so there's always one to hunt.
- **Loot digs:** sites that don't hold a brawler drop **25–75 gold**. Most digs are loot digs —
  brawler digs are the rare, exciting ones.

---

## 5. Game modes

Every mode is built on the same skill: **aim and shoot goo.** Nothing here is a mini-game
bolted onto the side — if you're good at the arena, you're good at the sports.

### 5.1 Core mode — Last Blob Standing

Up to 10 blobs in one arena (players plus AI blobs, so a match always starts instantly). No
respawns. Dig sites active. The arena shrinks with a rising goo tide every 30 seconds. Last
blob alive wins. Round cap 3:00. This is the mode the whole game rests on — it works at any
player count and never waits for a full lobby.

### 5.2 Boss Blobs

Every few rounds a large elite blob spawns in the middle, guarding a guaranteed brawler dig
site. High HP, slow, telegraphed attacks, **250 gold**. Anyone can fight it; anyone can steal
the dig once it's down.

### 5.3 Arena Sports — four team modes

Team modes, symmetric teams (see §6), 2:30–3:00 rounds.

**The one rule that ties them together — and the thing that makes them ours:**

> **You never carry the ball. You shoot it.**
> There is no pickup, no dribble, no possession. The ball is a physics object and your blaster
> is how you move it. Body bumps and dashes nudge it; shots send it flying. Passing is just
> shooting to a teammate. Every sport is therefore an aiming game, not a sports sim.

| Mode | Field | How you score | The twist |
|---|---|---|---|
| **Blob Kickoff** | Open pitch, a net at each end | Shoot the goo ball into their net | The ball **charges** as it's hit — 5+ hits and it glows, and a charged ball splats the first defender it touches. First to 3, or lead at 3:00 |
| **Blob Hoops** | Court with one hoop at each end, mounted on a rail | Shoot the ball through the hoop | **The hoop will not hold still** — it slides side to side along the back line, and it gets faster every time you score. See §5.4. First to 15 |
| **Blob Volley** | Two halves split by a goo net | Ball touches their floor | **Max 3 team touches** per side, and a **Super is a spike** — heavy, fast, hard to return. Rally scoring, first to 5 |
| **Blob Puck** | Low-friction goo-ice rink | Shoot the puck into their net | **Everything slides** — puck and players. Dash is a legal body check with a 1s stun. First to 3, or lead at 3:00 |

### 5.4 Blob Hoops — the moving hoop

Sam's idea, and it's the best thing in the sports set: **the hoop is never in the same place
twice.**

- The hoop hangs from a **rail spanning the back of each half**, sitting just inside the
  three-point arc. It never leaves the back line — you always know where to look, you just
  don't know where it'll be.
- It **slides side to side** at a base 6 studs/second, reversing when it reaches either end of
  the rail. Smooth and constant, so it can be led like any moving target.
- **Scoring:** 2 points from inside the arc, **3 from beyond it**.
- **It speeds up as you win.** Every time your team scores, the hoop *you shoot at* gets 15%
  faster, up to a 2× cap. It drops back to base speed when the other team scores. A team
  running away with the game faces a harder target — catch-up that costs the leader nothing but
  difficulty, and never takes points away from anyone.
- **After a score the hoop pauses for 1.5 seconds** before it starts sliding again, which gives
  the restart a clean window and makes a scoring run feel possible.
- The core rule still holds: you can't carry the ball, so scoring is always a shot at a moving
  target from wherever you happen to be standing. That's the whole skill of the mode.

*Why this is worth building first among the sports twists:* a moving hoop turns an ordinary
basketball court into an aiming test, which is exactly what this game is good at.

### 5.5 Getting into a mode

Sam asked to be able to "go into a different game" for the sports — that's exactly how it
should work, and Roblox supports it properly:

- The whole game is **one Roblox universe with several places**: the Arena, and one place per
  sports field. The lobby has a mode picker; choosing a sport **teleports** you into that place
  (`TeleportService`), and there's a Back to Lobby door in every sports field.
- **Your stuff follows you.** Gold, skins, discovered brawlers and dig progress live in the
  DataStore profile, not in the place, so everything you own is there in every mode.
- **A party teleports together** into the same server (`TeleportPartyAsync`), and a private
  match uses a **reserved server** so a room code lands your friends in a game nobody else can
  join.

**On originality:** sports themselves belong to everybody — nobody owns basketball, and a game
with hoops in it isn't copying anyone. What we don't do is take another game's characters, art,
names, UI or story. Our shoot-the-ball-only rule, our blobs and our charged ball are ours.
See §2.

**Ship order:** Blob Kickoff → Blob Hoops → Blob Puck → Blob Volley. Kickoff proves the ball
physics; the others reuse it. Volley last because 3-touch tracking and a net are the fiddliest.

---

## 6. Parties, friends and team sizes

### 6.1 Parties

- A **party** is up to 5 players who queue and play together. The party is **always on the same
  team** — never split.
- The **leader** invites from the player's Roblox friends list, picks the mode and picks the
  team size. Everyone else sees the choice and can ready up.
- The party **survives the round.** You finish a match and stay together for the next one; no
  re-inviting between games.
- **Private match:** the leader can generate a 6-character room code and play friends-only, no
  strangers. Good for Sam and his friends specifically.
- Invites go **only to Roblox friends** — no invite-by-username, no free-text party names. This
  keeps the whole feature inside Roblox's safety model with no custom text to moderate.

### 6.2 Team size

The leader picks the size before queuing:

```
1v1     2v2     3v3     4v4     5v5
```

### 6.3 The symmetry rule — teams are ALWAYS equal

**The game will never start 5v1, or 3v2, or anything uneven.** This is a hard rule in
`MatchmakerService`, not a UI suggestion:

1. A match cannot start unless both teams have the same number of slots filled.
2. If a player leaves mid-match, an **AI blob takes their slot immediately** so the sides stay
   even. It doesn't inherit their score.
3. If a party is bigger than the chosen team size, the queue button is disabled and the UI says
   so plainly: *"Your party has 4 blobs. Pick 4v4 or bigger."* — with a one-tap button to bump
   the size, rather than an error the player has to decode.
4. Solo queuers fill the other side first; AI blobs fill whatever's left over. Nobody ever waits
   more than a few seconds for a match.

The reason for the rule: an uneven team isn't a challenge, it's a bad time for six people. Fair
sides are what makes losing survivable.

---

## 7. The map and arenas

From the prototype, plus what Roblox makes possible:

- **Bushes** — stand in one to become hidden to players more than 10 studs away. Shooting
  reveals you for 2s. The single best source of drama in the game.
- **Crates** — destructible cover, 150 HP, drops 10 gold when broken.
- **Crystals** — indestructible hard cover, defines the lanes.
- **Walls and arena** — detailed, with clear sightline breaks. No long open sniping lanes
  except one deliberate one for the Blue Blob.
- **Minimap** — top-right, shows all blobs (hidden ones don't appear), dig sites, and the goo
  tide edge.
- Arena is roughly 200 × 200 studs for 10 blobs. Build one great arena before building two.

**Sports fields** are separate, smaller maps (about 120 × 80 studs) with no dig sites, no goo
tide and no bushes — sports are pure skill, and hiding has no place in them. They share the
arena's art kit so they feel like the same game: same goo ground, same crystal walls, same
blobs.

---

## 8. Economy

**One currency: Gold.** No second currency in v1 — Sam's prices are in gold, and a second
currency would just complicate a game that doesn't need it.

| Source | Gold |
|---|---|
| Win a round | **100** |
| Splat another blob | 10 |
| Loot dig | 25–75 |
| Boss Blob kill | 250 |
| Break a crate | 10 |
| Daily first win | 150 bonus |

**Costs** (exactly as Sam specified):

| Unlock | Cost |
|---|---|
| 🟢 Green Blob | Free, starts unlocked, no digging |
| 🟣 Purple Blob | 500 gold |
| 🔵 Blue Blob | 700 gold |
| 🟡 Yellow Blob | 1,000 gold |
| ✨ Gold Blob | **1,000,000 gold** |
| Common skin | 400 gold |
| Rare skin | 1,200 gold |
| Epic skin | 3,000 gold |
| Legendary skin | 8,000 gold |

> ⚠️ **Flagged for Sam — the million-gold problem.** At 100 gold per win, the Gold Blob is
> 10,000 wins. At three minutes a round that's about 500 hours. Nobody gets there, and a goal
> nobody reaches stops being a goal and starts being a joke.
> **Built as specified** — the price stays at 1,000,000, because "the impossible one" is a real
> and good design idea. But the *earn rate* is built to make it reachable for a dedicated
> player in a few months instead of never: loot digs, boss blobs, crates and the daily bonus
> mean a good session earns 600–1,000 gold rather than 100. That's roughly 1,000–1,500 sessions
> — still legendary, no longer fictional. If Sam wants it truly unobtainable-by-design, say so
> and we drop the extra sources back out. See §12.

**Robux (optional, add in Phase 6, all cosmetic):**
- Gold packs (Developer Products).
- **2× Gold gamepass** — earn rate only.
- **No paid loot boxes in v1.** If a random crate is ever added, Roblox policy requires exact
  odds shown for every outcome before purchase, and it must never be the only route to an item.
- **Nothing sells power.** No paid blob, no paid stat. Pillar 2 applies to the store too.

---

## 9. Skins

Each blob has its own skin collection. Skins come in **variant families** that mean the same
thing on every blob:

| Variant | Look |
|---|---|
| 💎 **Diamond** | Crystal blue/white, glowing outline |
| 💚 **Emerald** | Deep green, emerald particles |
| 🪙 **Gold** | Metallic gold with a shine effect |
| ❤️‍🔥 **Ruby** | Red crystal appearance |
| 🌌 **Void** | Dark purple with a cosmic glow |
| ⚡ **Electric** | Blue/yellow energy effects |
| 🌈 **Prismatic** | Shifting rainbow colours |
| 👑 **Royal** | Crown, cape, premium detailing |

### The v1 roster — 25 skins, 5 per blob

Every skin's entry below is its **shooting effect**. Same damage, same speed, same hitbox —
different show.

**🟢 Green Blob**

| Skin | Rarity | Effect | What it does |
|---|---|---|---|
| Classic Green | Common | Plasma Bolt | Green glowing orb that bursts into tiny green sparks |
| Emerald Green | Rare | Emerald Shards | Crystal shard that breaks into 4 emerald fragments |
| Diamond Green | Epic | Diamond Beam | Cyan-white bolt with a diamond-shaped impact |
| Gold Green | Epic | Golden Plasma | Gold projectile with a coin-spark explosion |
| Toxic Green | Legendary | Toxic Slime | Splatters green poison around the impact |

**🟣 Purple Blob**

| Skin | Rarity | Effect | What it does |
|---|---|---|---|
| Classic Purple | Common | Void Bolt | Purple energy orb with a dark explosion |
| Amethyst | Rare | Crystal Burst | Purple crystals shoot outward on impact |
| Diamond Purple | Epic | Diamond Pulse | Brilliant white-blue pulse ring |
| Royal Purple | Epic | Royal Blast | Purple-and-gold projectile, crown-shaped explosion |
| Void Purple | Legendary | Black Hole Shot | Projectile briefly creates a tiny black hole |

**🔵 Blue Blob**

| Skin | Rarity | Effect | What it does |
|---|---|---|---|
| Classic Blue | Common | Ice Bolt | Blue projectile that leaves a frosty trail |
| Sapphire | Rare | Sapphire Shard | Crystal projectile that fragments on impact |
| Diamond Blue | Epic | Diamond Ray | Sparkling laser-like shot |
| Electric Blue | Epic | Lightning Shot | Lightning arcs toward nearby enemies *(visual only)* |
| Frozen Blue | Legendary | Frost Cannon | Snowflake projectile with an ice burst |

**🟡 Yellow Blob**

| Skin | Rarity | Effect | What it does |
|---|---|---|---|
| Classic Yellow | Common | Solar Shot | Bright yellow energy ball |
| Diamond Yellow | Rare | Prism Beam | Rainbow sparkles around a diamond projectile |
| Gold Yellow | Epic | Gold Burst | Gold coins and sparks explode from the target |
| Solar Yellow | Epic | Sun Ray | Miniature sun projectile with a fiery ring |
| Emerald Yellow | Legendary | Emerald Comet | Yellow-green crystal comet with a long trail |

**✨ Gold Blob**

| Skin | Rarity | Effect | What it does |
|---|---|---|---|
| Classic Gold | Common | Golden Cannonball | Heavy gold projectile, large impact |
| Diamond Gold | Rare | Diamond Nova | Diamond projectile explodes into crystal rays |
| Emerald Gold | Epic | Emerald Beam | Green-and-gold energy beam |
| Ruby Gold | Epic | Ruby Explosion | Red crystal blast with gold sparks |
| **Ultimate Golden** | **Mythic** | **Golden Meteor** | Enormous glowing gold projectile with a huge golden shockwave |

**Ultimate Golden is the rarest thing in the game** — the Mythic skin on the Mythic blob. It
gets a golden nameplate, a landing animation and the loudest impact in the game. It is never
bundled and never given away.

> ⚠️ **Electric Blue's "chains lightning to nearby enemies"** would be extra damage, which
> breaks Pillar 2. Built as a **cosmetic arc that deals zero damage**. If Sam wants a real
> chain, it becomes a Blue Blob *ability* that every Blue skin gets — not a skin perk. §12.

---

## 10. Technical architecture

### 10.1 How to build it

- **Track A (recommended for Sam):** build directly in Roblox Studio, scripts in the places
  below, Team Create on, publish often.
- **Track B (if Claude is doing the heavy lifting):** [Rojo](https://rojo.space) with the source
  in git, synced into Studio. Same layout, proper version control.

### 10.2 Folder layout

```
ReplicatedStorage/
  Shared/
    CombatConfig.lua      -- ALL tuning numbers. One file. Never hard-code a number elsewhere.
    BlobRegistry.lua      -- the 5 blobs: stats, rarity, unlock order, price, ability ids
    SkinRegistry.lua      -- the 25 skins: rarity, price, vfxId   (NO stats in here, ever)
    DigConfig.lua         -- digs-per-site, dig time, loot table, site respawn
    ModeRegistry.lua      -- the 6 modes: rules, score limits, timers, legal team sizes
    Net.lua               -- typed RemoteEvent/RemoteFunction wrappers, one place
    Enums.lua
  Assets/
    BlobModels/           -- 5 rigs
    ProjectileTemplates/  -- one template per vfxId
    VFX/                  -- ParticleEmitters, Beams, Trails, named by vfxId
    Sounds/

ServerScriptService/
  Services/
    MatchService.lua      -- round lifecycle, goo tide, win condition
    CombatService.lua     -- authoritative damage. The ONLY place HP changes.
    ProjectileService.lua -- spawns, simulates and resolves every projectile server-side
    AbilityService.lua    -- super meters, dashes, the 5 supers
    DigService.lua        -- dig sites, progress, discovery order, loot rolls
    BossService.lua       -- boss blob spawn, AI, rewards
    BotService.lua        -- AI blobs so a match starts instantly, and slot-filling (§6.3)
    PartyService.lua      -- parties, friend invites, room codes, leader authority
    MatchmakerService.lua -- team size, THE SYMMETRY RULE, queueing, backfill
    BallService.lua       -- the sports ball/puck: physics, charge state, scoring
    HoopService.lua       -- the Blob Hoops rail: hoop position, speed escalation, arc scoring
    TravelService.lua     -- mode picker, place teleports, party teleports, reserved servers
    ProfileService.lua    -- DataStore load/save with session locking
    EconomyService.lua    -- gold ledger, purchases, receipts
    AntiCheatService.lua  -- rate limits, sanity checks, telemetry
  init.server.lua         -- boots services in a fixed, declared order

StarterPlayer/StarterPlayerScripts/
  Controllers/
    InputController.lua   -- WASD/arrows + mouse aim; mobile joysticks; gamepad
    PredictionController.lua -- local projectile ghost, reconciled against the server
    VFXController.lua     -- reads vfxId and plays the show. Knows nothing about damage.
    HUDController.lua     -- health, ammo, super indicator, dash indicator, minimap
    UIController.lua      -- brawler selection screen, collection, store, party + team size
    CameraController.lua  -- top-down follow with a slight aim lead

StarterGui/
  HUD/                    -- health, ammo, super, dash, minimap, round timer, blobs-left
  Menus/                  -- Play, Brawler Select, Collection, Store, Settings
```

### 10.3 The rules that keep this sane

1. **The server owns everything that matters** — health, damage, gold, discoveries, unlocks.
   The client sends *intent* ("I want to fire this direction") and nothing else. Never trust a
   client-reported hit, position, damage number, dig completion or purchase.
2. **`CombatConfig.lua` is the only place numbers live.** Balance = one file.
3. **Skins can't touch damage, structurally.** `CombatService` receives a blob id and an ability
   id and *has no access to a skin id at all*. `VFXController` receives a skin id and never
   computes damage. Two paths, no crossing. This is how Pillar 2 stops being a promise and
   starts being a fact.
4. **One RemoteEvent per verb**, defined in `Net.lua`, rate-limited server-side.
5. **Nothing gameplay-relevant in a LocalScript** except prediction, which is always provisional.
6. **Every service is a module with `:Init()` and `:Start()`**, booted in a declared order.

### 10.4 Server-authoritative shooting

```lua
-- ServerScriptService/Services/ProjectileService.lua  (shape, not final code)
local ProjectileService = {}
local active = {}

function ProjectileService:Fire(player, dir)
    local state = CombatService:GetState(player)
    if not state or state.dead then return end
    if state.ammo < 1 then return end                          -- the server owns the ammo
    if not RateLimit:Allow(player, "fire", 8) then return end   -- hard ceiling, 8/sec

    dir = dir.Unit                                              -- normalise; never trust magnitude
    state.ammo -= 1

    local cfg = CombatConfig.Blobs[state.blobId].Weapon
    local id  = self:_spawn(player, state.blobId, cfg, state.rootPos, dir)

    -- Tell clients to play the show. The skin id is COSMETIC PAYLOAD ONLY.
    Net.ProjectileSpawned:FireAllClients(id, state.blobId, state.rootPos, dir,
                                         SkinRegistry.VfxFor(state.equippedSkin))
end

function ProjectileService:_step(dt)
    for id, p in pairs(active) do
        local from = p.pos
        p.pos = p.pos + p.dir * p.speed * dt
        local hit = Hitscan:Segment(from, p.pos, p.owner)  -- swept, so fast shots can't tunnel
        if hit and hit.character then
            CombatService:ApplyDamage(hit.character, p.owner, p.blobId, p.abilityId)  -- no skin arg. On purpose.
            self:_despawn(id, p.pos, "hit")
        elseif hit or (os.clock() - p.spawnedAt) > p.lifetime then
            self:_despawn(id, p.pos, "expire")
        end
    end
end
```

The client fires a **ghost projectile** immediately so shooting feels instant, and deletes it
when the server's authoritative one arrives (~60–100ms). The ghost never deals damage, and a
ghost/truth mismatch never costs the player health.

### 10.5 Save data

```lua
-- One DataStore key per player: "profile_<userId>"
-- Load with session locking (ProfileStore / ProfileService pattern) so two servers can't
-- both hold the same profile and race each other's writes.
Profile = {
  version     = 1,             -- bump + migrate; never break an old save
  gold        = 0,
  discovered  = { Green = true },              -- dug up, visible in the collection
  owned       = { Green = true },              -- actually bought and playable
  ownedSkins  = { ClassicGreen = true },
  equipped    = { blob = "Green", skins = { Green = "ClassicGreen" } },
  digProgress = { },                           -- [siteId] = digs so far
  stats       = { rounds = 0, wins = 0, splats = 0, bossKills = 0 },
  createdAt   = 0, lastSeen = 0,
}
```

- Save on: round end, purchase, discovery, and `PlayerRemoving` — plus `BindToClose` so a server
  shutdown mid-round doesn't eat someone's Gold Blob progress.
- **Every gold change goes through `EconomyService`** and writes a ledger line. When a kid says
  "I had 900 gold and now it's gone", the ledger is how you find out what really happened.
- Robux purchases: `ProcessReceipt` must be idempotent — record the receipt id *before*
  granting, and return `PurchaseGranted` only after the grant is saved.

### 10.6 Anti-exploit

- Rate limit every remote: fire, dash, super, dig, purchase, equip. Log first, kick on sustained
  abuse.
- **Digs are server-timed.** The client asks to start a dig; the server decides when it's done.
  A client that "completes" a 1.2s dig in 0.2s gets the dig rejected and a flag.
- Movement sanity: flag anyone exceeding `speed * 1.4` sustained over a second.
- Validate every remote argument's type on arrival. No exceptions.
- Don't replicate hidden (in-bush) players' exact positions to clients that shouldn't see them —
  otherwise a modified client sees through every bush and the best mechanic in the game dies.
- Nothing that matters stored in a client-visible Value object.

### 10.7 Performance budget (phones and school Chromebooks)

- ≤ 40 live projectiles server-side; **pool and reuse parts**, never `Instance.new` per shot.
- ≤ 250 particles per impact, impacts auto-despawn in 1.2s.
- Arena ≤ 6,000 parts, all anchored, `StreamingEnabled` on.
- Target 60fps desktop / 30fps mobile. Profile with the MicroProfiler *before* adding VFX
  polish. The Legendary and Mythic effects are what will blow the budget — build them with a
  quality tier that scales down on low-end devices.

---

## 11. Controls & feel

| Action | Keyboard/Mouse | Mobile | Gamepad |
|---|---|---|---|
| Move | WASD / arrow keys | Left stick | Left stick |
| Aim + shoot | Mouse aim, LMB | Right stick drag-and-release | Right stick + RT |
| Dash | Shift | Dash button | A |
| Super | Space or RMB | Super button (locked till full) | RB |
| Dig | E (on a site) | Dig prompt | X |

Feel notes: 0.1s fire wind-up with a squash on the blob, 1.5° camera kick, hit confirm is a
white flash plus 0.05s of hitstop on the target, death is a goo splat puddle that fades over 4s.
**Juice is the whole game** — a plain projectile with great feedback beats a fancy one without.

---

## 12. Open questions for Sam

Working assumptions are built as stated. Overrule any of them.

1. **The million-gold Gold Blob.** Built at 1,000,000 with extra gold sources so it's reachable
   in a few months rather than never (§7). *Alternative: keep 100/win as the only source and let
   it be genuinely unobtainable.* Which does Sam want?
2. **Gold Blob's power.** Built stronger than the rest (800 HP) as a Mythic reward, which means
   it can't go in a ranked mode later. *Alternative: same power as the others, rarity is the
   whole reward.*
3. **Electric Blue's lightning chain** — built cosmetic (zero damage). *Alternative: make it a
   real Blue Blob ability every Blue skin gets.*
4. **Do digs persist between rounds or reset?** Built to persist — resetting would make digging
   feel pointless.
5. **AI blobs in every match?** Built yes, so a round always starts instantly. *Alternative:
   players-only, which means waiting for a lobby.*
6. **Skins per blob or shared?** Built per-blob (more to collect). *Alternative: buy "Diamond"
   once, use it on every blob.*
7. **Do sports modes pay gold?** Built yes — 100 for a win, same as the arena, so playing with
   friends isn't a waste of a session. *Alternative: arena-only gold, sports purely for fun.*
8. **Can you dig in sports modes?** Built no — sports fields have no dig sites. *Alternative:
   one dig site at centre court, which would make sports the fastest way to discover blobs.*
9. **Team size default?** Built 3v3. *Alternative: 2v2, which fills faster.*
10. **Does the moving hoop speed up forever?** Built with a 2× cap that resets when the other
    team scores. *Alternative: no cap, which would make a blowout genuinely impossible to
    finish.*

---

## 13. Build phases

Each phase ends with something playable. Don't start a phase until the previous definition of
done is actually true.

**Phase 0 — Foundations.** Studio place + folder layout, service boot order, `CombatConfig`,
`BlobRegistry`, `SkinRegistry`, `DigConfig` with the real data from §3/§4/§9, `Net.lua` with
rate-limited remotes.
*Done when:* the place runs, services log "started" in order, no gameplay yet.

**Phase 1 — Green Blob, one arena, real shooting.** Green only, Classic Green only. Server
projectiles + client ghost. Health, damage, death. Dash. HUD: health, ammo, dash.
*Done when:* two players on two devices shoot each other, both agree on who died, and it feels
good with VFX off.

**Phase 2 — The round.** Last Blob Standing: 10 blobs, AI bots to fill, goo tide, 3:00 cap,
winner screen, clean restart. Bushes, crates, crystals, minimap.
*Done when:* a full round starts, ends, declares a winner and restarts — 20 times straight with
no leak and no stuck state.

**Phase 3 — Digging.** Dig sites, 3-digs-to-discover, server-timed progress, loot digs, the
fixed discovery order, discoveries saved, collection screen.
*Done when:* a player digs up the Purple Blob, rejoins the next day, and it's still discovered.

**Phase 4 — All five blobs.** Remaining four with weapons, supers, rarity display, brawler
selection screen. First balance pass against §3.
*Done when:* every blob is pickable, every super works, and no blob (except Gold, by design)
wins more than 60% of rounds in testing.

**Phase 5 — Skins & VFX.** All 25 effects from §9, skin select per blob, rarity presentation.
**Plus the parity test:** an automated check that damage output is byte-identical across all 5
skins of a blob.
*Done when:* all 25 effects play correctly and the skin-parity test passes.

**Phase 6 — Economy & save.** Profiles, gold, the unlock ladder, store UI, ledger, Robux
products and receipts.
*Done when:* a player can earn, spend, rejoin and still own everything — including after a
server shutdown mid-round.

**Phase 7 — Parties & team sizes.** Party of up to 5, friend invites, room codes, leader
controls, the 1v1–5v5 picker, and `MatchmakerService` with the symmetry rule and bot backfill.
*Done when:* Sam and three friends can party up, pick 4v4, and land on the same team — and no
sequence of joins, leaves or party sizes can ever produce uneven teams.

**Phase 8 — Arena Sports.** `TravelService` and the mode picker first, then `BallService`, then
Blob Kickoff. Then Hoops (with the rail and the speed escalation), Puck, Volley.
*Done when:* a 3v3 Kickoff match plays start to finish with the ball charging, scoring and
resetting correctly — the ball never gets stuck in a wall, and a party of four teleports into
the same sports server together and back to the lobby afterwards.

**Phase 9 — Boss Blobs.** Elite blob, guarded brawler dig site, 250 gold payout.
*Done when:* a boss can be fought, killed and its dig site claimed by anyone.

**Phase 10 — Polish & launch.** Sounds, emotes, lobby, a 30-second tutorial arena with dummies,
settings, low-end quality mode, reporting, analytics.
*Done when:* ten new players join cold and nine finish a round without asking a question.

---

## 14. Safety & compliance

- Roblox's chat filter is mandatory — never build a chat path that skips
  `TextService:FilterStringAsync`.
- No user-entered free text displayed anywhere unless filtered first.
- Report + block available from the scoreboard.
- Experience Guidelines: **Mild** at most. Goo splats, no blood, no realistic weapons, no gore.
  Keep it there — it protects the audience size.
- Set the age recommendation and description honestly. Misleading tags get experiences pulled
  faster than bad code does.

---

## 15. Not in v1

Trading · clubs · a map editor · voice chat · pets · a second currency · a ranked ladder ·
seasonal maps · spectating · replays · paid random crates · anything that sells power.

All fine ideas for v2. None of them makes the first playable better, and each one is a place a
small project goes to die.

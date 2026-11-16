/* Atomic Sparkle — rules data for D&D Basic (1981 Basic Set, magenta box, levels 1-3).
   Tables checked against the Basic Rulebook edited by Tom Moldvay (TSR, 1981). Mechanics and tables only. */
(function(){
const R={id:'basic',label:'D&D Basic Set (1981)',bookName:'Basic rulebook',noRaces:true,defaultRace:'none',wtUnit:'cn',rangeUnit:"'",
 footer:'Rules follow the 1981 D&D Basic Set (levels 1 to 3). Full monster descriptions, magic item explanations and adventures stay in the book.',
 maxNote:' in the Basic rules (the Expert set continues from here)'};
R.abilities=['str','int','wis','dex','con','cha'];
R.abilityNames={str:'Strength',int:'Intelligence',wis:'Wisdom',dex:'Dexterity',con:'Constitution',cha:'Charisma'};
// The standard bonus/penalty table
R.mod=function(s){ return s<=3?-3:s<=5?-2:s<=8?-1:s<=12?0:s<=15?1:s<=17?2:3; };
const clamp=s=>Math.max(3,Math.min(18,s||10));
R.strength=function(score){ const m=R.mod(clamp(score)); return [m,m,0,'1 or 2 on d6'+(m?', roll adjusted '+(m>0?'+':'−')+Math.abs(m):''),0]; };
R.dex={}; R.con={}; R.cha={}; R.intLang={}; R.wisMagAdj={};
for(let s=3;s<=19;s++){ const c=clamp(s), m=R.mod(c);
 R.dex[s]=[m,-m]; R.con[s]=[m,m,null,null]; R.wisMagAdj[s]=m; R.intLang[s]=c>=18?3:c>=16?2:c>=13?1:0;
 R.cha[s]=c<=3?[1,4,-2]:c<=5?[2,5,-1]:c<=8?[3,6,-1]:c<=12?[4,7,0]:c<=15?[5,8,1]:c<=17?[6,9,1]:[7,10,2]; }
R.initAdj=function(d){ const c=clamp(d); return c<=3?-2:c<=8?-1:c<=12?0:c<=17?1:2; };
R.literacy=function(i){ const c=clamp(i); return c<=3?'Has trouble speaking; cannot read or write':c<=5?'Cannot read or write Common':c<=8?'Can write simple Common words':'Reads and writes Common and alignment tongue'; };
const sg=n=>n>0?'+'+n:n===0?'—':'−'+Math.abs(n);
R.abilityNotes=function(d){ const a=d.ab, m=k=>R.mod(clamp(a[k])); return {str:`hit, damage, doors ${sg(m('str'))}`,int:`+${R.intLang[clamp(a.int)]} languages`,wis:`magic saves ${sg(m('wis'))}`,dex:`missiles ${sg(m('dex'))}, AC ${sg(-m('dex'))}`,con:`${sg(m('con'))} hp/die`,cha:`${R.cha[clamp(a.cha)][0]} retainers`}; };
R.abilityDetails=function(d){ const a=d.ab, ch=R.cha[clamp(a.cha)]; return [['Force open a door',R.strength(a.str)[3]],['Reading and writing',R.literacy(a.int)],['Individual initiative (optional)',sg(R.initAdj(a.dex))],['Reaction adjustment',sg(ch[2])],['Retainer morale',String(ch[1])]]; };

R.alignments=['Lawful','Neutral','Chaotic'];
const CLS=['cleric','dwarf','elf','fighter','halfling','magicuser','thief'];
R.races={none:{name:'',adj:{},min:{},max:{},infra:0,classes:CLS,multi:[],langs:['Common'],extraLang:0,notes:[]}};
R.raceOrder=['none'];
R.levelLimit=function(){ return 0; };
const A=R.alignments;
R.classes={
 cleric:{name:'Cleric',group:'cleric',hd:6,hdMax:3,hpAfter:0,maxLevel:3,min:{},prime:['wis'],align:A,gold:[3,6,10],xp:[0,1500,3000],titles:['Acolyte','Adept','Priest (or Priestess)'],armor:'any',shield:'any',weapons:['Club','Mace','Sling','War hammer'],spells:'cleric',saves:[11,12,14,16,15],
  notes:['No edged weapons: nothing that cuts or pierces.','Turns undead from 1st level.','No spells at 1st level; one 1st level spell at 2nd level, two at 3rd.','Spells are prayed for each day, from the whole list.']},
 dwarf:{name:'Dwarf',group:'fighter',hd:8,hdMax:3,hpAfter:0,maxLevel:3,min:{con:9},prime:['str'],align:A,gold:[3,6,10],xp:[0,2200,4400],titles:['Dwarven Veteran','Dwarven Warrior','Dwarven Swordmaster'],armor:'any',shield:'any',weapons:'any except long bows and two-handed swords',saves:[10,11,12,13,14],langs:['Dwarvish','Gnome','Goblin','Kobold'],
  notes:['Infravision 60\'.','Finds slanting passages, traps, shifting walls and new construction on 1-2 on d6 when looking.','About 4\' tall: may not use long bows or two-handed swords.']},
 elf:{name:'Elf',group:'fighter',hd:6,hdMax:3,hpAfter:0,maxLevel:3,min:{int:9},prime:['str','int'],align:A,gold:[3,6,10],xp:[0,4000,8000],titles:['Veteran-Medium','Warrior-Seer','Swordmaster-Conjurer'],armor:'any',shield:'any',weapons:'any',spells:'magicuser',saves:[12,13,13,15,15],langs:['Elvish','Gnoll','Hobgoblin','Orcish'],
  notes:['Fights as a fighter and casts magic-user spells, in any armor.','Infravision 60\'.','Finds secret and hidden doors on 1-2 on d6 when looking.','Immune to the paralysis of ghouls.']},
 fighter:{name:'Fighter',group:'fighter',hd:8,hdMax:3,hpAfter:0,maxLevel:3,min:{},prime:['str'],align:A,gold:[3,6,10],xp:[0,2000,4000],titles:['Veteran','Warrior','Swordsmaster'],armor:'any',shield:'any',weapons:'any',saves:[12,13,14,15,16],notes:['May use any weapon and any armor.']},
 halfling:{name:'Halfling',group:'fighter',hd:6,hdMax:3,hpAfter:0,maxLevel:3,min:{dex:9,con:9},prime:['str','dex'],align:A,gold:[3,6,10],xp:[0,2000,4000],titles:['Halfling Veteran','Halfling Warrior','Halfling Swordmaster'],armor:'any (halfling sized)',shield:'any',weapons:'any except long bows and two-handed swords',saves:[10,11,12,13,14],
  notes:['+1 to hit with missile weapons.','-2 bonus to armor class against creatures larger than man-sized.','+1 to individual initiative.','Outdoors in woods or underbrush, only a 10% chance of being detected; in dungeons unseen on 1 or 2 on d6 with cover, if still and quiet.','About 3\' tall: may not use long bows or two-handed swords.']},
 magicuser:{name:'Magic-User',group:'magicuser',hd:4,hdMax:3,hpAfter:0,maxLevel:3,min:{},prime:['int'],align:A,gold:[3,6,10],xp:[0,2500,5000],titles:['Medium','Seer','Conjurer'],armor:'none',shield:'none',weapons:['Dagger'],spells:'magicuser',saves:[13,14,13,16,15],
  notes:['No armor or shield; dagger only.','The spell book holds exactly the spells the character can cast: one 1st level spell at 1st level.','Spells are memorized after a night of rest and are gone once cast.']},
 thief:{name:'Thief',group:'thief',hd:4,hdMax:3,hpAfter:0,maxLevel:3,min:{},prime:['dex'],align:A,gold:[3,6,10],xp:[0,1200,2400],titles:['Apprentice','Footpad','Robber'],armor:'leather',shield:'none',weapons:'any',thief:0,saves:[13,14,13,16,15],
  notes:['Leather armor only, no shield.','Striking unnoticed from behind: +4 to hit and double damage.']}
};
R.classOrder=['cleric','dwarf','elf','fighter','halfling','magicuser','thief'];
R.bookClasses=['magicuser','elf'];
R.saveNames=['Death ray or poison','Magic wands','Paralysis or turn to stone','Dragon breath','Rods, staves or spells'];
// Character attacks, levels 1-3: d20 roll needed to hit each armor class
R.toHitRow=function(){ const o=[]; for(let ac=9;ac>=-3;ac--) o.push([ac,Math.min(20,19-ac)]); return o; };
R.thiefNames=['Open Locks','Find or Remove Traps','Pick Pockets','Move Silently','Climb Sheer Surfaces','Hide in Shadows','Hear Noise'];
R.thief=[[15,10,20,20,87,10,'1-2 on d6'],[20,15,25,25,88,15,'1-2 on d6'],[25,20,30,30,89,20,'1-3 on d6']];
R.turn=[['Skeleton','7','T','T'],['Zombie','9','7','T'],['Ghoul','11','9','7'],['Wight','—','11','9'],['Wraith','—','—','11']];
R.slots={cleric:{1:[0],2:[1],3:[2]},magicuser:{1:[1],2:[2],3:[2,1]}};
R.spellListNames={cleric:'Cleric',magicuser:'Magic-user and elf'};
R.spells={
 cleric:[['Cure Light Wounds','Detect Evil','Detect Magic','Light','Protection from Evil','Purify Food and Water','Remove Fear','Resist Cold']],
 magicuser:[['Charm Person','Detect Magic','Floating Disc','Hold Portal','Light','Magic Missile','Protection from Evil','Read Languages','Read Magic','Shield','Sleep','Ventriloquism'],
  ['Continual Light','Detect Evil','Detect Invisible','ESP','Invisibility','Knock','Levitate','Locate Object','Mirror Image','Phantasmal Force','Web','Wizard Lock']]
};
// Armor: [name, AC, cost g.p., weight in coins]
R.armor=[['None',9,0,0],['Leather',7,20,200],['Chain mail',5,40,400],['Plate mail',3,60,500]];
R.shields=[['None',0,0,0],['Shield',1,10,100]];
R.coins={cp:1,sp:10,ep:50,gp:100,pp:500};
R.coinNames={cp:'Copper',sp:'Silver',ep:'Electrum',gp:'Gold',pp:'Platinum'};
const G=100;
// [name, price in c.p., weight in coins]
R.equipment={
 'Weapons':[['Battle axe (two-handed)',7*G,50],['Hand axe',4*G,30],['Crossbow',30*G,50],['Case with 30 quarrels',10*G,0],['Long bow',40*G,30],['Short bow',25*G,30],['Quiver with 20 arrows',5*G,0],['Silver-tipped arrow',5*G,0],['Dagger',3*G,10],['Silver dagger',30*G,10],['Short sword',7*G,30],['Sword',10*G,60],['Two-handed sword',15*G,150],['Mace',5*G,30],['Club',3*G,50],['Pole arm (two-handed)',7*G,150],['Sling with 30 stones',2*G,0],['Spear',3*G,30],['War hammer',5*G,30]],
 'Armor':[['Chain mail',40*G,400],['Leather',20*G,200],['Plate mail',60*G,500],['Shield',10*G,100]],
 'Equipment':[['Backpack',5*G,0],['Flask of oil',2*G,0],['Hammer (small)',2*G,0],['Holy symbol',25*G,0],['Holy water (1 vial)',25*G,0],['Iron spikes (12)',1*G,0],['Lantern',10*G,0],['Mirror (hand-sized, steel)',5*G,0],['Rations, iron (1 week)',15*G,0],['Rations, standard (1 week)',5*G,0],['Rope (50\')',1*G,0],['Sack, small',1*G,0],['Sack, large',2*G,0],['Thieves\' tools',25*G,0],['Tinder box (flint and steel)',3*G,0],['Torches (6)',1*G,0],['Water or wine skin',1*G,0],['Wine (1 quart)',1*G,0],['Wolfsbane (1 bunch)',10*G,0],['Wooden pole (10\')',1*G,0]]
};
R.weaponDamage=[['Battle axe','1d8','two-handed',50],['Hand axe','1d6','',30],['Club','1d4','',50],['Crossbow','1d6','two-handed',50],['Dagger','1d4','',10],['Silver dagger','1d4','',10],['Long bow','1d6','two-handed',30],['Short bow','1d6','two-handed',30],['Mace','1d6','',30],['Pole arm','1d10','two-handed',150],['Sling','1d4','',0],['Spear','1d6','',30],['Short sword','1d6','',30],['Sword','1d8','',60],['Two-handed sword','1d10','two-handed',150],['Torch','1d4','',0],['War hammer','1d6','',30],['Flask of oil (thrown)','1d8','burns for 2 rounds',0],['Holy water (thrown)','1d8','undead only',0]].map(w=>({n:w[0],sm:w[1],note:w[2],wt:String(w[3])}));
R.meleeData=[];
R.missileData=[['Crossbow',[80,160,240]],['Long bow',[70,140,210]],['Short bow',[50,100,150]],['Sling',[40,80,160]],['Spear',[20,40,60]],['Hand axe',[10,20,30]],['Dagger',[10,20,30]],['Silver dagger',[10,20,30]],['Flask of oil (thrown)',[10,30,50]],['Holy water (thrown)',[10,30,50]]].map(m=>({n:m[0],rof:'1',r:m[1]}));
R.damageNote='Variable weapon damage is optional; without it every weapon does 1d6. Two-handed weapons lose initiative and allow no shield.';
// Encumbrance (optional), in coins carried: [limit, name, move per turn (per round), note]
R.encumbrance=[[400,'Unencumbered','120\' (40\')','Normal'],[600,'Lightly loaded','90\' (30\')','Normal'],[800,'Loaded','60\' (20\')','Normal'],[1600,'Heavily loaded','30\' (10\')','Normal'],[Infinity,'Overloaded','0','Cannot move']];
R.encFor=function(wt){ for(const r of R.encumbrance) if(wt<=r[0]) return r; };
R.miscWeight=80; // "miscellaneous equipment and provisions" counts as 80 coins when using encumbrance
R.lights={'Torch':[30,6],'Lantern':[30,24]};
// Clock units, in 10-second rounds
R.T={round:1,turn:60,hour:360,day:8640,seg:false};
R.restDice=[1,3];
R.quickRolls=[{label:'Wandering monsters (1 on d6)',n:1,s:6},{label:'Surprise (1 or 2 on d6)',n:1,s:6},{label:'Find trap (1 on d6)',n:1,s:6},{label:'Monster reaction (2d6)',n:2,s:6},{label:'Morale check (2d6)',n:2,s:6},{label:'Listen at door (1 on d6)',n:1,s:6},{label:'Find secret door (1 on d6)',n:1,s:6}];
R.languages=['Bugbear','Doppleganger','Dragon','Dwarvish','Elvish','Gargoyle','Gnoll','Gnome','Goblin','Halfling','Harpy','Hobgoblin','Kobold','Lizard man','Medusa','Minotaur','Ogre','Orcish','Pixie'];
R.reference=[
 ['Time','A turn is 10 minutes. A round is 10 seconds, so 60 rounds make a turn. Encounters and combat run in rounds; exploring runs in turns.'],
 ['Movement','Unencumbered characters move 120\' per turn exploring and 40\' per round in an encounter. Running is three times the encounter speed.'],
 ['Resting','The party must rest 1 turn in every 6. Without rest: -1 to hit and damage until they do.'],
 ['Light','A torch burns for 6 turns and a flask of oil keeps a lantern lit for 24 turns. Both light a 30\' radius.'],
 ['Doors','Dungeon doors must be forced: a 1 or 2 on d6 opens one, with the roll adjusted by strength. Listening at a door: 1 on d6 (1 or 2 for dwarves, elves and halflings), once per door.'],
 ['Searching','Secret doors: 1 in 6 when a character searches the right area (2 in 6 for elves). Traps: 1 in 6 (2 in 6 for dwarves; not magical traps). Searching a 10\' by 10\' area takes a turn.'],
 ['Wandering monsters','The DM checks at the end of every 2 turns: a 1 on d6 means an encounter in the next turn, 2d6 × 10 feet away.'],
 ['Order of an encounter','Surprise, then initiative, then reactions, then the round: morale, movement, missile fire, magic, melee — the side with initiative first.'],
 ['Surprise','Each side rolls d6: a 1 or 2 means that side is surprised. The side that is not surprised may move and attack for one round; if both are surprised it cancels out.'],
 ['Initiative','Each side rolls d6 every round; the higher roll acts first, ties are simultaneous. Dexterity may adjust individual initiative.'],
 ['Monster reactions','Roll 2d6, adjusted by charisma: 2 immediate attack; 3-5 hostile, possible attack; 6-8 uncertain; 9-11 no attack, leaves or considers offers; 12 enthusiastic friendship.'],
 ['Morale','Monsters check on 2d6 when first losing a member and when half are down; a roll over their morale score means they retreat or surrender.'],
 ['Attacks','Roll d20. Strength adjusts melee to hit and damage; dexterity adjusts missile to hit. Missiles: +1 at short range, 0 at medium, -1 at long.'],
 ['Fighting withdrawal and retreat','Backing away at half speed keeps your defences. Turning to run gives the enemy +2 to hit and ignores your shield.'],
 ['Saving throws','Roll d20 and meet or beat the number for the attack type. Wisdom adjusts magic-based saves (wands, turn to stone, rods, staves and spells), but not dragon breath.'],
 ['Damage and death','At 0 hit points a character is dead.'],
 ['Healing','Each full day of complete rest restores 1-3 hit points. Clerical magic heals faster.'],
 ['Falling','1d6 damage for every 10\' fallen.'],
 ['Experience','1 x.p. per gold piece of treasure recovered, plus x.p. for monsters defeated. A single adventure never gives enough to advance more than one level.'],
 ['Prime requisite','3-5: -20% experience. 6-8: -10%. 13-15: +5%. 16-18: +10%. Elves and halflings use two abilities.'],
 ['Adjusting scores','At creation a prime requisite goes up 1 point for every 2 points another ability is lowered; nothing may go below 9. Strength may be lowered by magic-users and clerics; intelligence by fighters, dwarves, halflings, thieves and clerics; wisdom by magic-users, fighters, dwarves, elves, halflings and thieves. Dexterity may only be raised. Constitution and charisma never change.'],
 ['Money','10 c.p. = 1 s.p. · 10 s.p. = 1 g.p. · 2 e.p. = 1 g.p. · 1 p.p. = 5 g.p. Every coin weighs the same: 10 coins to the pound.'],
 ['Retainers','Hired adventurers. Charisma sets how many will serve and their morale. They take a share of treasure and half a share of experience.']
];
// ---- helpers (same shape as the AD&D rule set) ----
R.levelFor=function(cls,xp){ const c=R.classes[cls]; let l=1; c.xp.forEach((x,i)=>{ if(xp>=x) l=i+1; }); return l; };
R.xpFor=function(cls,level){ const c=R.classes[cls]; return level<=c.xp.length?c.xp[level-1]:null; };
R.titleFor=function(cls,level){ const c=R.classes[cls]; return c.titles[Math.min(level,c.titles.length)-1]; };
R.hpGain=function(cls,level){ return {dice:1,flat:0}; };
R.conAdj=function(cls,con){ return R.mod(clamp(con)); };
R.xpMult=function(cls,ab){ const s=k=>clamp(ab[k]);
 if(cls==='elf') return (s('int')>=16&&s('str')>=13)?1.1:(s('int')>=13&&s('str')>=13)?1.05:1;
 if(cls==='halfling') return (s('str')>=13&&s('dex')>=13)?1.1:(s('str')>=13||s('dex')>=13)?1.05:1;
 const p=s(R.classes[cls].prime[0]); return p<=5?0.8:p<=8?0.9:p<=12?1:p<=15?1.05:1.1; };
R.xpNote=function(cls,ab){ const m=R.xpMult(cls,ab); return m===1?'':' · '+(m>1?'+':'−')+Math.round(Math.abs(m-1)*100)+'% experience'; };
R.slotsFor=function(cls,level){ const c=R.classes[cls], out={}; if(c.spells){ const s=(R.slots[c.spells][Math.min(level,3)]||[]).slice(); if(s.some(n=>n>0)) out[c.spells]=s; } return out; };
R.thiefFor=function(cls,level){ return R.classes[cls].thief===undefined?null:R.thief[Math.min(level,3)-1].slice(); };
R.attacksFor=function(){ return '1 per round'; };
R.profFor=function(){ return null; };
R.savesFor=function(d){ const c=d.classes[0]; if(!c) return null; const w=R.mod(clamp(d.ab.wis)); return R.classes[c.id].saves.map((v,i)=>[R.saveNames[i],String(v)]).concat(w?[['Wisdom adjustment vs. magic',sg(w)]]:[]); };
R.extraCards=function(d){ const out=[]; const c=d.classes[0]; if(c&&c.id==='cleric'){ const col=Math.min(c.level,3); out.push({title:'Turn undead',rows:R.turn.map(r=>[r[0],r[col]==='T'?'Turned automatically':r[col]==='—'?'No effect':r[col]+' or more on 2d6']),note:'On a success, roll 2d6 again for how many hit dice of undead turn away.',roll:{n:2,s:6,label:'Turn undead'}}); } return out; };
R.money=function(cp){ cp=Math.round(cp); const g=Math.floor(cp/100), s=Math.floor((cp%100)/10), c=cp%10; return [g?g.toLocaleString()+' g.p.':'',s?s+' s.p.':'',c?c+' c.p.':''].filter(Boolean).join(' ')||'0 g.p.'; };
R.checkRace=function(){ return []; };
R.checkClass=function(cls,ab){ const c=R.classes[cls], errs=[]; for(const k in c.min) if((ab[k]||0)<c.min[k]) errs.push(c.name+' needs '+R.abilityNames[k]+' '+c.min[k]+'+'); return errs; };
R.maxExStr=function(){ return 0; };
if(typeof module!=='undefined') module.exports=R; else { window.RULESETS=window.RULESETS||{}; window.RULESETS.basic=R; }
})();

// ══ 场景图片 (base64) ══
var SCENE_IMGS={
  bedroom:"assets/bedroom.png",
  corridor:"assets/corridor.png",
  peek:"assets/peek.png",
  living:"assets/living.png",
  kitchen:"assets/kitchen.png",
  bathroom:"assets/bathroom.png",
  study:"assets/study.png",
  storage:"assets/storage.png",
  balcony:"assets/balcony.png",
  dark:"assets/bedroom-warm.png",
};
// image mode: using SCENE_IMGS
function drawRoom(id){} // no-op, images handle display now


// ══════════════════════════════════════════════
// game data — inner monologue style, surreal
// ══════════════════════════════════════════════
var ITEMS={
  dinosaur: {id:'dinosaur',  name:'Dinosaur Toy',   icon:'🦕', spin:'12s',
    pickup:'It is lighter than you remember. Or maybe memory never had weight at all.',
    desc:'You called it Little Green when you were three. It is missing a leg. You always thought that was your fault.'},
  chocolate:{id:'chocolate', name:'Coin Chocolate', icon:'🪙', spin:'9s',
    pickup:'The crinkle of the foil wrapper is the only real sound in this dream.',
    desc:'You saved it for a long time. You do not know what for, or who for.'},
  key:      {id:'key',       name:'Small Key',     icon:'🗝',  spin:'15s',
    pickup:'It is colder than the air. Cold enough that you suspect it came from somewhere else.',
    desc:'Tied with a red string. You do not recognize the lock, but you are sure you once did.'},
  milk_tooth:{id:'milk_tooth',name:'Baby Tooth',      icon:'🦷', spin:'20s',
    pickup:'This is a piece of you. Left behind by time. You thought you had forgotten all of it.',
    desc:'Kept in a small envelope, your name and a date written on it in ballpoint pen.'},
  note:     {id:'note',      name:'Mom\'s Note', icon:'📝', spin:'11s',
    pickup:'The handwriting is familiar. But you are not sure you understood what it says.',
    desc:'We love you. Keep going.\n\n— You have always known this. But in dreams, you forgot.'},
};

var ROOMS={
  bedroom:{
    id:'bedroom', name:'Your Room', icon:'◈', mapName:'My Room',
    desc:function(){
      if(G.threatLevel===0)
        return 'You woke up.\n\nNo — not quite.\n\nYou are sitting in bed, but the bed feels wrong — smaller than you remember. The clock on the wall is ticking, but the hands point somewhere unfamiliar.\n\nThere is light under the door.';
      return 'You are back here.\n\nThe room knows you. You are not sure you know it.';
    },
    choices:function(){
      var l=[{text:'Look through the door crack',next:'corridor_peek',icon:'→'}];
      if(!G.has('dinosaur'))l.push({text:'Search the room first',next:'bedroom_search',icon:'↓'});
      l.push({text:'Hide under the bed',next:'bedroom_hide',icon:'↳',isHide:true});
      return l;
    }
  },
  bedroom_search:{
    id:'bedroom_search', name:'Your Room', icon:'◈', mapName:'My Room',
    desc:'You search in the dark.\n\nSomething lies at the foot of the bed — your dinosaur toy. Its eyes face the ceiling. There is nothing on the ceiling.',
    choices:function(){return[
      {text:'Pick it up',action:'pickup',item:'dinosaur',next:'bedroom',icon:'✦'},
      {text:'Go look through the door crack',next:'corridor_peek',icon:'→'},
    ];}
  },
  bedroom_hide:{
    id:'bedroom_hide', name:'Under the Bed', icon:'▽', mapName:'My Room',
    isHidden:true,
    desc:'The space under the bed is low. You are not sure how you got in.\n\nThe dust has a shape, like letters, but you cannot read them.\n\nThe sounds outside come and go.',
    choices:function(){return[{text:'Come out',next:'bedroom',icon:'→'}];}
  },

  corridor_peek:{
    id:'corridor_peek', name:'Door Crack', icon:'◁', mapName:'Hallway',
    desc:'You press your eye to the gap.\n\nTwo figures stand in the hallway. They wear clothes you recognize, but their proportions are wrong — one too tall, one too short, as if someone got the scale confused.\n\nThey are speaking. You only catch one line:\n\n"... that child, when will..."\n\nYour heartbeat gets very loud. So loud you think they might hear it.',
    choices:function(){return[
      {text:'Keep listening',next:'corridor_listen',icon:'→'},
      {text:'Retreat. Hide under the bed',next:'bedroom_hide',icon:'←',isHide:true},
    ];}
  },
  corridor_listen:{
    id:'corridor_listen', name:'Door Crack', icon:'◁', mapName:'Hallway',
    desc:'"... that child, when will they finally fall asleep, how much longer do we have to watch..."\n\nThen one of them turns its head.\n\nIt has no eyes. But you know it is looking at you.',
    choices:function(){return[
      {text:'Run to the living room',next:'living',icon:'→'},
      {text:'Run toward the kitchen',next:'kitchen',icon:'→'},
    ];}
  },
  corridor_return:{
    id:'corridor_return', name:'Hallway', icon:'◈', mapName:'Hallway',
    desc:'The hallway is longer than when you entered.\n\nYou stand here. The weight in your pockets reminds you who you are.',
    choices:function(){return[
      {text:'Go back to your room',next:'bedroom',icon:'→'},
      {text:'Go to the living room',next:'living',icon:'→'},
      {text:'Go to the kitchen',next:'kitchen',icon:'→'},
    ];}
  },

  living:{
    id:'living', name:'Living Room', icon:'◫', mapName:'Living Room',
    desc:'The living room furniture is all here, but in the wrong places.\n\nThe sofa faces the wall. The TV is off, but its screen reflects light from somewhere — not this room.\n\nFootsteps come from behind you. Then stop.',
    choices:function(){
      var l=[
        {text:'Hide behind the sofa',next:'living_hide',icon:'↳',isHide:true},
        {text:'Go to the kitchen',next:'kitchen',icon:'→'},
        {text:'Go to the bathroom',next:'bathroom',icon:'→'},
        {text:'Go to the balcony',next:'balcony',icon:'→'},
      ];
      if(!G.has('chocolate'))l.splice(1,0,{text:'Search the coffee table drawer',next:'living_search',icon:'↓'});
      return l;
    }
  },
  living_hide:{
    id:'living_hide', name:'Behind the Sofa', icon:'▽', mapName:'Living Room',
    isHidden:true,
    desc:'You squeeze between the sofa and the wall.\n\nIt smells like afternoon naps from childhood.\n\nThe footsteps pass. Pause. Then move on.',
    choices:function(){return[{text:'Come out',next:'living',icon:'→'}];}
  },
  living_search:{
    id:'living_search', name:'Coffee Table', icon:'◫', mapName:'Living Room',
    desc:'The drawer sticks before it opens.\n\nInside: a remote, an expired bill, and something round in foil — lighter than a real coin.\n\nYour coin chocolate. Still here.',
    choices:function(){return[
      {text:'Put it in your pocket',action:'pickup',item:'chocolate',next:'living',icon:'✦'},
    ];}
  },

  kitchen:{
    id:'kitchen', name:'Kitchen', icon:'⬡', mapName:'Kitchen',
    desc:'The fridge hums unevenly, like something breathing inside.\n\nThe floor is cold. You are barefoot. You do not remember taking your shoes off.',
    choices:function(){
      var l=[
        {text:'Open the fridge',next:'kitchen_fridge',icon:'↓'},
        {text:'Go to the living room',next:'living',icon:'→'},
        {text:'Go to the bathroom',next:'bathroom',icon:'→'},
        {text:'Go to the storage room',next:'storage',icon:'→'},
      ];
      if(!G.has('key'))l.splice(1,0,{text:'Search the cupboard',next:'kitchen_cabinet',icon:'↓'});
      return l;
    }
  },
  kitchen_fridge:{
    id:'kitchen_fridge', name:'Fridge', icon:'⬡', mapName:'Kitchen',
    desc:'The door opens. The light inside stretches your shadow long.\n\nMilk. Leftovers. A container you do not recognize — something moves inside, and you look away.\n\nA sticky note on the milk carton: "Sweetie, remember to drink your milk before bed."\n\nMom\'s handwriting.',
    choices:function(){return[{text:'Close the fridge',next:'kitchen',icon:'←'}];}
  },
  kitchen_cabinet:{
    id:'kitchen_cabinet', name:'Cupboard', icon:'⬡', mapName:'Kitchen',
    desc:'You have to stand on your toes to reach the top shelf.\n\nJars and bottles, and one key — tied with red string, hanging from a hook you have no memory of.\n\nColder than you imagined.',
    choices:function(){return[
      {text:'Take the key',action:'pickup',item:'key',next:'kitchen',icon:'✦'},
    ];}
  },

  bathroom:{
    id:'bathroom', name:'Bathroom', icon:'◎', mapName:'Bathroom',
    desc:'You are in the mirror.\n\nBut the reflection is half a second behind — you raise your hand, then it raises its hand. You look away, then it looks away.\n\nYou decide not to look anymore.',
    choices:function(){
      var l=[
        {text:'Hide in the tub and pull the curtain',next:'bathroom_hide',icon:'↳',isHide:true},
        {text:'Go to the study',next:'study',icon:'→'},
        {text:'Go back to the living room',next:'living',icon:'←'},
      ];
      if(!G.has('milk_tooth'))l.splice(0,0,{text:'Check the drawer under the sink',next:'bathroom_drawer',icon:'↓'});
      return l;
    }
  },
  bathroom_drawer:{
    id:'bathroom_drawer', name:'Bathroom Drawer', icon:'◎', mapName:'Bathroom',
    desc:'The drawer makes a sound you do not recognize when it opens.\n\nCotton swabs. Band-aids. A small glass bottle. You take it out and look.\n\nTeeth. Your teeth. Mom kept every one you ever lost.',
    choices:function(){return[
      {text:'Put them in your pocket',action:'pickup',item:'milk_tooth',next:'bathroom',icon:'✦'},
    ];}
  },
  bathroom_hide:{
    id:'bathroom_hide', name:'In the Tub', icon:'▽', mapName:'Bathroom',
    isHidden:true,
    desc:'The tub is cold. You pull the curtain shut. Total darkness.\n\nFootsteps enter. Stop just outside. The faucet turns on for a second, then off. They leave.\n\nYou lie in the bottom of the tub. Your heart beats very slowly.',
    choices:function(){return[{text:'Come out',next:'bathroom',icon:'→'}];}
  },

  study:{
    id:'study', name:'Parents\' Study', icon:'◧', mapName:'Study',
    desc:'Their smell is here, and every spine of every book you recognize — but the order is wrong, as if someone scrambled them and shoved them back.\n\nThe lights are off. You are not going to turn them on.',
    choices:function(){
      var l=[
        {text:'Look at the bedside table',next:'study_bedside',icon:'↓'},
        {text:'Hide in the wardrobe',next:'wardrobe',icon:'↳',isHide:true},
        {text:'Go back to the hallway',next:'corridor_return',icon:'←'},
      ];
      if(!G.has('note'))l.splice(0,0,{text:'Search the bookshelf',next:'study_shelf',icon:'↓'});
      return l;
    }
  },
  study_shelf:{
    id:'study_shelf', name:'Bookshelf', icon:'◧', mapName:'Study',
    desc:'Your fingers trace every spine. Third row, far right — something is tucked inside a book. Not a bookmark. Folded paper.\n\nYou open it. Mom\'s handwriting.\n\n"Sweetie, you are our greatest pride. No matter what happens, we love you. Keep going."\n\nThe light in the dream shifts for a moment, then returns.',
    choices:function(){return[
      {text:'Fold it and put it in your pocket',action:'pickup',item:'note',next:'study',icon:'✦'},
    ];}
  },
  study_bedside:{
    id:'study_bedside', name:'Bedside Table', icon:'◧', mapName:'Study',
    desc:'First drawer: eye drops and a book, bookmark near the end.\n\nSecond drawer: a small locked wooden box. The keyhole looks familiar.\n\nBut you have no key right now.',
    choices:function(){return[{text:'Go back',next:'study',icon:'←'}];}
  },
  wardrobe:{
    id:'wardrobe', name:'Inside the Wardrobe', icon:'▽', mapName:'Study',
    isHidden:true,
    desc:'Dark inside the wardrobe. Clothes press against you.\n\nYour father\'s coat. Your mother\'s fabric softener. Something else — a smell with no name, maybe from childhood.\n\nYou suddenly want to cry. You do not know why.',
    choices:function(){return[{text:'Push open the door and come out',next:'study',icon:'→'}];}
  },

  storage:{
    id:'storage', name:'Storage Room', icon:'▣', mapName:'Storage',
    desc:'The storage room is locked, but it opens when you push.\n\nSo many things inside. More than this house should hold. You do not know where any of it came from.',
    choices:function(){return[
      {text:'Search the big box on the floor',next:'storage_box',icon:'↓'},
      {text:'Look at the shelves',next:'storage_shelf',icon:'↓'},
      {text:'Go back to the hallway',next:'corridor_return',icon:'←'},
    ];}
  },
  storage_box:{
    id:'storage_box', name:'Big Box', icon:'▣', mapName:'Storage',
    desc:'The box is locked. You pull at it. Heavy.\n\nA label with your name — written in a child\'s hand, every letter reversed.\n\nThe lock will not open.',
    choices:function(){return[{text:'Go back',next:'storage',icon:'←'}];}
  },
  storage_shelf:{
    id:'storage_shelf', name:'Storage Shelf', icon:'▣', mapName:'Storage',
    desc:'A toolbox. Old photo albums — you do not open them. You feel that if you did, you would never wake up.\n\nSome empty cardboard boxes. Empty, but when you shake them they sound full.',
    choices:function(){return[{text:'Go back',next:'storage',icon:'←'}];}
  },

  balcony:{
    id:'balcony', name:'Balcony', icon:'◌', mapName:'Balcony',
    desc:'The night wind is cool, but you do not feel cold.\n\nCity lights glow far away. The moon is not in the sky — it is stuck to the side of a building, flat against the wall like a sticker.\n\nYou are here. But you are not sure your feet are touching the floor.',
    choices:function(){return[
      {text:'Search the flowerpots and drying rack',next:'balcony_search',icon:'↓'},
      {text:'Go back to the hallway',next:'corridor_return',icon:'←'},
    ];}
  },
  balcony_search:{
    id:'balcony_search', name:'Balcony', icon:'◌', mapName:'Balcony',
    desc:'Plants you cannot name grow in the pots. Black leaves, but they are alive.\n\nA sweater on the drying rack — yours, but you do not remember it.\n\nNothing else to find.',
    choices:function(){return[{text:'Go back',next:'balcony',icon:'←'}];}
  },

  bedroom_end:{
    id:'bedroom_end', name:'Your Room', icon:'◈', mapName:'My Room',
    desc:'You push open the door and walk back in.\n\nThe bed is still there. A little smaller than before you left.\n\nYou sit down and lay everything from your pockets on the bed, one by one.',
    choices:function(){return[
      {text:'Count what you brought back ('+G.inventory.length+'/5)',next:'__check_win__',icon:'✦'},
      {text:'Not enough — keep looking',next:'corridor_return',icon:'→'},
    ];}
  },
};

// ══════════════════════════════════════════════
// game state
// ══════════════════════════════════════════════
var G={
  room:'bedroom',inventory:[],visited:new Set(),caught:new Set(),
  threatLevel:0,hidden:false,gameOver:false,caughtOnce:false,
  has:function(id){return this.inventory.indexOf(id)!==-1;},
};

// ══════════════════════════════════════════════
// DREAM UI HELPERS
// ══════════════════════════════════════════════
// dream tilt effect for buttons
function applyDreamStyle(btn,index){
  var tilts=[-1.2,-0.6,0.4,1.0,-0.3,0.8,-0.9,0.3];
  var drifts=[-3,-2,-4,-2,-3,-2,-4,-3];
  var durs=[3.2,2.8,3.6,3.0,2.6,3.4,2.9,3.1];
  var tilt=tilts[index%tilts.length];
  var drift=drifts[index%drifts.length];
  var dur=durs[index%durs.length];
  btn.style.setProperty('--tilt','rotate('+tilt+'deg)');
  btn.style.setProperty('--drift',drift+'px');
  btn.style.animation='btn-float '+dur+'s ease-in-out infinite';
  btn.style.marginBottom='4px';
}

// ══════════════════════════════════════════════
// core
// ══════════════════════════════════════════════
function startGame(){
  G={room:'bedroom',inventory:[],visited:new Set(),caught:new Set(),
     threatLevel:0,hidden:false,gameOver:false,caughtOnce:false,
     has:function(id){return this.inventory.indexOf(id)!==-1;}};
  document.getElementById('story-text').innerHTML='';
  updateInv();updatePips();updateMap();updateThreat();
  showScreen('game-screen');
  goToRoom('bedroom');
}

function goToRoom(id){
  if(id==='__check_win__'){
    if(G.inventory.length>=5){showWin();return;}
    appendStory('You are still missing '+(5-G.inventory.length)+' thing'+(5-G.inventory.length)===1?'':' s'+'. The dream is waiting.','warn');
    var r=ROOMS['bedroom_end'];
    renderChoices(r.choices());
    return;
  }
  var room=ROOMS[id];
  if(!room){return;}

  G.room=id;G.visited.add(room.mapName||room.name);
  G.hidden=room.isHidden||false;

  if(id==='corridor_listen')G.threatLevel=2;
  else if(id==='corridor_peek'&&G.threatLevel===0)G.threatLevel=1;
  if(G.hidden&&G.threatLevel>=2)G.threatLevel=1;

  // triggered when chased
  var dangerRooms=['living','kitchen','study','storage','bathroom','balcony','corridor_return'];
  if(G.threatLevel>=2&&!G.hidden&&dangerRooms.indexOf(id)!==-1){
    if(Math.random()<0.08){
      drawRoom(id);
      document.getElementById('room-icon').textContent=room.icon||'◈';
      document.getElementById('room-name').textContent=room.name||'?';
      appendStory('It appears in front of you without warning.\n\nIt does not speak. But you know it is over.','danger');
      setTimeout(function(){triggerGameOver(room);},1400);
      return;
    }
  }

  // clear story for main rooms
  var subRooms=['bedroom_search','bedroom_hide','living_hide','living_search',
    'kitchen_fridge','kitchen_cabinet','bathroom_drawer','bathroom_hide',
    'study_shelf','study_bedside','wardrobe','storage_box','storage_shelf',
    'balcony_search','corridor_listen','corridor_peek'];
  if(subRooms.indexOf(id)===-1)
    document.getElementById('story-text').innerHTML='';

  // show scene image
  var imgKey=ROOM_IMG[id]||'bedroom';
  var sceneEl=document.getElementById('scene-img');
  if(sceneEl){
    if(imgKey==='dark'||!SCENE_IMGS[imgKey]){
      sceneEl.style.background='#000';
      sceneEl.src='';
      sceneEl.style.display='none';
    } else {
      sceneEl.style.display='block';
      sceneEl.style.background='#000';
      sceneEl.src=SCENE_IMGS[imgKey];
      // first bedroom entry: show warm image, then blink transition
      if((id==='bedroom')&&!G._bedroomVisited){
        G._bedroomVisited=true;
        var warmEl=document.getElementById('warm-img');
        if(warmEl){
          warmEl.style.display='block';
          warmEl.style.opacity='1';
          // start transition after delay
          var cvs2=document.getElementById('glitch-canvas');
          sceneEl.style.opacity='0';
          setTimeout(function(){
            startGlitchTransition(warmEl,cvs2,sceneEl);
          },3000);
        }
      }
    }
  }
  document.getElementById('img-room-lbl').textContent=(room.name||'?')+' · dream';
  document.getElementById('room-icon').textContent=room.icon||'◈';

  // room name shake effect (danger)
  var rn=document.getElementById('room-name');
  rn.textContent=room.name||'?';
  if(G.threatLevel>=2)rn.classList.add('shaking');
  else rn.classList.remove('shaking');

  updateThreat();updatePips();updateMap();

  var desc=typeof room.desc==='function'?room.desc():(room.desc||'');
  appendStory(desc,'');

  // dream whisper (random)
  if(Math.random()>0.65&&G.threatLevel<2){
    var whispers=[
      'The walls here are thinner than yesterday.',
      'You forgot something. You do not know what.',
      'There was a sound just now. Now there is not.',
      'Your shadow falls in the wrong direction.',
      'Time does not work right here.',
    ];
    setTimeout(function(){
      appendStory(whispers[Math.floor(Math.random()*whispers.length)],'whisper');
    },800);
  }

  var choices=typeof room.choices==='function'?room.choices():(room.choices||[]);
  renderChoices(choices);
}

function handleChoice(c){
  if(c.action==='pickup'&&c.item){
    if(!G.has(c.item)){
      G.inventory.push(c.item);
      var it=ITEMS[c.item];
      if(it){
        appendStory(it.pickup,'item');
        setTimeout(function(){appendStory('—  '+it.name+'  slipped into your pocket.','mono');},400);
      }
      updateInv();updatePips();
      if(G.inventory.length>=5){setTimeout(showWin,700);return;}
    }
  }
  if(c.next)setTimeout(function(){goToRoom(c.next);},160);
}

function triggerGameOver(room){
  G.gameOver=true;
  document.getElementById('go-room').textContent='in '+( room.name||'somewhere');
  var msgs=[
    'The moment it catches you, you realize you always knew this would happen.',
    'You cannot run anymore.\n\nDreams never let you run fast enough.',
    'You forgot what you were looking for. Then you forgot who you were.',
  ];
  document.getElementById('go-text').innerHTML=msgs[Math.floor(Math.random()*msgs.length)].replace(/\n/g,'<br>');
  showScreen('gameover-screen');
}

function showWin(){
  var wi=document.getElementById('win-items');wi.innerHTML='';
  G.inventory.forEach(function(id){
    var it=ITEMS[id];if(!it)return;
    var el=document.createElement('div');el.className='win-item';
    el.textContent=it.icon+' '+it.name;wi.appendChild(el);
  });

  // 渐进式揭示真相
  var reveal=document.getElementById('win-reveal');
  reveal.innerHTML='';
  var paras=[
    'Light begins at the edge of the sky. Not the hallway kind — a different light. Real. Warm.',
    'You hold the five things and slowly sit back down on the bed.',
    'Then you hear the door open.',
    'It is Mom. She is in her pajamas, hair messy, eyes full of the worry you know.',
    '"You were sleepwalking again," she says softly. "We followed you. We were afraid you\'d get hurt."',
    'Dad appears in the doorway, rubbing his eyes. They are both exhausted.',
    '"Every time you sleepwalk, we follow you all night," he says. "You silly child."',
    'You look down at what is in your hands. You do not know how you held onto all of it while asleep.',
  ];
  paras.forEach(function(p){var el=document.createElement('p');el.textContent=p;reveal.appendChild(el);});

  var truth=document.getElementById('win-truth');
  truth.innerHTML='The two "things" in the hallway<br>were only your parents.<br><br>They followed you<br>because they were afraid you would get hurt.<br><br>"When will that child..."<br>meant "when will they go back to bed."<br><br>You were safe the whole time.<br>You were always being watched over.';

  showScreen('win-screen');
}

// ── UI ──
function showScreen(id){
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});
  document.getElementById(id).classList.add('active');
}

var entryDelay=0;
function appendStory(text,cls2){
  var container=document.getElementById('story-text');
  var d=document.createElement('div');
  d.className='entry '+(cls2||'');
  d.innerHTML=text.replace(/\n/g,'<br>');
  d.style.animationDelay=(entryDelay)+'ms';
  entryDelay=Math.min(entryDelay+80,300);
  container.appendChild(d);

  setTimeout(function(){entryDelay=0;},500);
  setTimeout(function(){
    var l=document.getElementById('story-log');
    if(l)l.scrollTop=l.scrollHeight;
  },100);
}

function renderChoices(choices){
  var list=document.getElementById('choices-list');
  list.innerHTML='';
  choices.forEach(function(c,i){
    var btn=document.createElement('button');
    btn.className='choice-btn'+(c.isHide?' hide-btn':'');
    var hasIt=!c.requireItem||G.has(c.requireItem);
    if(hasIt){
      btn.innerHTML='<span class="cpfx">'+(c.icon||'›')+'</span>'+c.text;
      btn.addEventListener('click',function(){handleChoice(c);});
      // 梦境漂浮效果
      applyDreamStyle(btn,i);
    }else{
      btn.innerHTML='<span class="cpfx" style="color:var(--dim)">—</span><span style="color:var(--dim)">'+(c.lockedText||c.text)+'</span>';
      btn.disabled=true;
    }
    list.appendChild(btn);
  });
}

function updateInv(){
  var list=document.getElementById('inv-list');
  if(!G.inventory.length){list.innerHTML='<span class="empty">Nothing to hold onto</span>';return;}
  list.innerHTML='';
  G.inventory.forEach(function(id){
    var it=ITEMS[id];if(!it)return;
    var el=document.createElement('div');el.className='inv-item';
    el.innerHTML='<span class="iico" style="--spd:'+it.spin+'">'+it.icon+'</span><span>'+it.name+'</span>';
    list.appendChild(el);
  });
}

function updatePips(){
  for(var i=0;i<5;i++){
    var p=document.getElementById('p'+i);
    if(!p)continue;
    var wasFilled=p.classList.contains('filled');
    var nowFilled=i<G.inventory.length;
    p.className='pip'+(nowFilled?' filled':'');
    if(nowFilled&&!wasFilled)p.style.animation='none',p.offsetHeight,p.style.animation='';
  }
}

function updateThreat(){
  var dot=document.getElementById('threat-dot');
  var lbl=document.getElementById('threat-lbl');
  dot.className='';lbl.className='';
  dot.style.background='';lbl.style.color='';
  if(G.hidden){
    dot.style.background='var(--dim)';lbl.textContent='hidden';lbl.style.color='var(--dim)';
  }else if(G.threatLevel>=2){
    dot.className='close';lbl.className='close';lbl.textContent='danger';
  }else if(G.threatLevel>=1){
    dot.className='near';lbl.className='near';lbl.textContent='alert';
  }else{
    dot.style.background='var(--dim)';lbl.textContent='quiet';lbl.style.color='var(--dim)';
  }
}


// 房间→图片key映射
var ROOM_IMG={
  bedroom:'bedroom', bedroom_search:'bedroom', bedroom_hide:'dark', bedroom_end:'bedroom',
  corridor_peek:'peek', corridor_listen:'peek', corridor_return:'corridor',
  living:'living', living_hide:'dark', living_search:'living',
  kitchen:'kitchen', kitchen_fridge:'kitchen', kitchen_cabinet:'kitchen',
  bathroom:'bathroom', bathroom_drawer:'bathroom', bathroom_hide:'dark',
  study:'study', study_shelf:'study', study_bedside:'study', wardrobe:'dark',
  storage:'storage', storage_box:'storage', storage_shelf:'storage',
  balcony:'balcony', balcony_search:'balcony',
};

// 每个房间在小地图SVG(viewBox 260x210)里的中心坐标
// 对照SVG里每个 rect 的 x+w/2, y+h/2
var ROOM_COORDS={
  // 一楼
  balcony:         {x:18,  y:46},   // rect x=4,y=20,w=28,h=52
  living:          {x:75,  y:56},   // rect x=30,y=12,w=90,h=88
  living_hide:     {x:75,  y:56},
  living_search:   {x:75,  y:56},
  corridor_peek:   {x:52,  y:163},  // floor 2 hallway left, near bedroom door
  corridor_listen: {x:52,  y:163},
  corridor_return: {x:62,  y:163},  // floor 2 hallway left center
  kitchen:         {x:217, y:35},   // rect x=176,y=12,w=82,h=46
  kitchen_fridge:  {x:217, y:35},
  kitchen_cabinet: {x:217, y:35},
  storage:         {x:217, y:79},   // rect x=176,y=58,w=82,h=42
  storage_box:     {x:217, y:79},
  storage_shelf:   {x:217, y:79},
  // 二楼
  bedroom:         {x:40,  y:134},  // rect x=4,y=117,w=72,h=35
  bedroom_search:  {x:40,  y:134},
  bedroom_hide:    {x:40,  y:134},  // under bed → same as bedroom
  bedroom_end:     {x:40,  y:134},
  bathroom:        {x:98,  y:134},  // rect x=76,y=117,w=44,h=35
  bathroom_drawer: {x:98,  y:134},
  bathroom_hide:   {x:98,  y:134},  // in tub → same as bathroom
  study:           {x:203, y:134},  // rect x=150,y=117,w=106,h=35
  study_shelf:     {x:203, y:134},
  study_bedside:   {x:203, y:134},
  wardrobe:        {x:203, y:134},  // in wardrobe → same as study
};

var ROOM_HIGHLIGHT={
  balcony:'mr-balcony',
  living:'mr-living', living_hide:'mr-living', living_search:'mr-living',
  corridor_peek:'mr-hall2-left', corridor_listen:'mr-hall2-left', corridor_return:'mr-hall2-left',
  kitchen:'mr-kitchen', kitchen_fridge:'mr-kitchen', kitchen_cabinet:'mr-kitchen',
  storage:'mr-storage', storage_box:'mr-storage', storage_shelf:'mr-storage',
  bedroom:'mr-bedroom', bedroom_search:'mr-bedroom', bedroom_hide:'mr-bedroom', bedroom_end:'mr-bedroom',
  bathroom:'mr-bathroom', bathroom_drawer:'mr-bathroom', bathroom_hide:'mr-bathroom',
  study:'mr-study', study_shelf:'mr-study', study_bedside:'mr-study', wardrobe:'mr-study',
};

var _lastHighlight=null;

function updateMap(){
  var roomId=G.room;
  var star=document.getElementById('player-star');
  var coords=ROOM_COORDS[roomId];
  if(star&&coords){
    // 用 style.transform 才能触发 CSS transition
    star.style.transform='translate('+coords.x+'px,'+coords.y+'px)';
  }
  // 重置上一个高亮
  if(_lastHighlight){
    var prev=document.getElementById(_lastHighlight);
    if(prev){prev.style.stroke='';prev.style.strokeWidth='';}
  }
  // 高亮当前房间
  var hlId=ROOM_HIGHLIGHT[roomId];
  if(hlId){
    var el=document.getElementById(hlId);
    if(el){el.style.stroke='rgba(160,140,255,0.7)';el.style.strokeWidth='1.5';}
    _lastHighlight=hlId;
  }
}

// ══════════════════════════════════════════════
// GLITCH ENGINE
// ══════════════════════════════════════════════
var glitchCanvas=null,glitchCtx=null,glitchTimer=null;


// ══════════════════════════════════════════════
// 暖色图层 — 两个固定位置若隐若现
// ══════════════════════════════════════════════
// 两个固定的暖光位置（玩具熊 + 电视），用canvas绘制
var warmCanvas=null, warmCtx=null, warmTimer=null;

// 玩具熊：左下角约 20%x 75%y；电视屏幕：约 38%x 47%y
var WARM_SPOTS=[
  {x:0.20, y:0.75, r:0.10},  // 玩具熊
  {x:0.38, y:0.47, r:0.12},  // 电视
];







function initGlitch(){
  if(!glitchCanvas)return;
  glitchCtx=glitchCanvas.getContext('2d');
}

function updateGlitch(){
  if(!glitchCanvas||!glitchCtx)return;
  if(glitchTimer){clearInterval(glitchTimer);glitchTimer=null;}
  if(G.hidden||G.inventory.length===0){
    glitchCtx.clearRect(0,0,glitchCanvas.width,glitchCanvas.height);
    glitchCanvas.style.opacity='0';
    return;
  }
  glitchCanvas.style.opacity='1';
  var n=G.inventory.length;
  var interval=Math.max(300,2200-n*380);
  glitchTimer=setInterval(runGlitch,interval);
}

function runGlitch(){
  if(!glitchCanvas||!glitchCtx)return;
  if(G.hidden){glitchCtx.clearRect(0,0,glitchCanvas.width,glitchCanvas.height);return;}
  var img=document.getElementById('scene-img');
  if(!img||!img.naturalWidth)return;

  var w=glitchCanvas.offsetWidth;
  var h=glitchCanvas.offsetHeight;
  glitchCanvas.width=w;
  glitchCanvas.height=h;
  glitchCtx.clearRect(0,0,w,h);

  var n=G.inventory.length;
  var slices=2+n*2;          // 4~12条
  var maxShift=20+n*20;      // 40~120px位移

  // 把原图画进canvas
  glitchCtx.drawImage(img,0,0,w,h);

  for(var s=0;s<slices;s++){
    if(Math.random()>0.7)continue;
    var y=Math.floor(Math.random()*h);
    var sh=Math.floor(4+Math.random()*30);
    var shift=Math.floor((Math.random()-0.5)*2*maxShift);
    var sl=glitchCtx.getImageData(0,y,w,Math.min(sh,h-y));
    glitchCtx.clearRect(0,y,w,sh);
    glitchCtx.putImageData(sl,shift,y);

    // 色差
    glitchCtx.globalCompositeOperation='screen';
    glitchCtx.fillStyle='rgba(255,0,60,0.12)';
    glitchCtx.fillRect(shift,y,w,sh);
    glitchCtx.fillStyle='rgba(0,200,255,0.08)';
    glitchCtx.fillRect(shift+4,y,w,sh);
    glitchCtx.globalCompositeOperation='source-over';
  }

  // 清除
  setTimeout(function(){
    if(glitchCtx)glitchCtx.clearRect(0,0,glitchCanvas.width,glitchCanvas.height);
  },80+Math.random()*150);
}

// 事件
document.getElementById('start-btn').addEventListener('click',startGame);
document.getElementById('retry-btn').addEventListener('click',startGame);
document.getElementById('winrestart-btn').addEventListener('click',startGame);

function startGlitchTransition(warmEl, cvs, sceneEl){
  if(!cvs) return;
  var container = document.getElementById('img-area');
  var W = container.offsetWidth  || 800;
  var H = container.offsetHeight || 450;
  cvs.width  = W;
  cvs.height = H;
  cvs.style.display = 'block';
  cvs.style.opacity = '1';

  var ctx = cvs.getContext('2d');

  // 眨眼序列：[闭合时长ms, 睁开时长ms]
  // 第一下：慢慢闭 → 快速睁（还是温馨图）
  // 第二下：快速闭 → 慢慢睁（已是梦境图）
  var blinks = [
    { closeMs: 350, openMs: 280 },  // 第一下眨眼
    { closeMs: 180, openMs: 600 },  // 第二下眨眼，睁开后是梦境图
  ];

  var switchDone = false;

  function drawLid(progress){
    // progress: 0=全开, 1=全闭
    // 上下两片眼皮从边缘向中间合拢
    ctx.clearRect(0, 0, W, H);
    if(progress <= 0) return;

    var half = H / 2;
    var lidH = half * progress;

    // 用纯黑模拟闭眼
    ctx.fillStyle = '#000000';
    // 上眼皮
    ctx.fillRect(0, 0, W, lidH);
    // 下眼皮
    ctx.fillRect(0, H - lidH, W, lidH);

    // 两片中间留缝时加一点睫毛感（细线）
    if(progress < 0.95){
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, lidH);
      ctx.lineTo(W, lidH);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, H - lidH);
      ctx.lineTo(W, H - lidH);
      ctx.stroke();
    }
  }

  function runBlink(index, onDone){
    if(index >= blinks.length){ onDone(); return; }
    var b = blinks[index];
    var closeStart = performance.now();

    function closing(ts){
      var p = Math.min((ts - closeStart) / b.closeMs, 1);
      // ease in（慢开始快结束）
      var ease = p * p;
      drawLid(ease);
      if(p < 1){
        requestAnimationFrame(closing);
      } else {
        // 全闭：第一次闭上时不切换，第二次闭上时切换
        if(index === 1 && !switchDone){
          switchDone = true;
          // 切换底层图片（梦境图）：warm隐藏，scene显示但透明，眨眼睁开后再淡入
          warmEl.style.display  = 'none';
          sceneEl.style.opacity = '1';
        }
        var openStart = performance.now();
        function opening(ts2){
          var p2 = Math.min((ts2 - openStart) / b.openMs, 1);
          // ease out（快开始慢结束）
          var ease2 = 1 - (1-p2)*(1-p2);
          drawLid(1 - ease2);
          if(p2 < 1){
            requestAnimationFrame(opening);
          } else {
            drawLid(0);
            // 两次眨眼之间停顿
            setTimeout(function(){
              runBlink(index + 1, onDone);
            }, index === 0 ? 300 : 0);
          }
        }
        requestAnimationFrame(opening);
      }
    }
    requestAnimationFrame(closing);
  }

  runBlink(0, function(){
    // 全部结束
    cvs.style.display = 'none';
    ctx.clearRect(0, 0, W, H);
  });
}
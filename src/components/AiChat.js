import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  TextField,
  IconButton,
  Typography,
  Stack,
  CircularProgress,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  Send as SendIcon,
  Psychology as BrainIcon,
  Memory as CPUIcon,
} from '@mui/icons-material';
import { useData } from '../context/DataContext';

const LOADING_MESSAGES = [
  "processing ur vibe...",
  "analyzing brain.exe...",
  "loading emotional support...",
  "decoding ur feels...",
  "calibrating empathy.dll...",
];

// Add casual responses for quick acknowledgments
const CASUAL_RESPONSES = {
  yes: [
    "yessss bestie! 💫",
    "fr fr! 💅",
    "100% yes! ✨",
    "absolutely bestie! 🌟",
    "periodt! 💯"
  ],
  no: [
    "nah bestie 🙅‍♀️",
    "not rly tbh 💭",
    "probs not fr fr 🤔",
    "doesn't seem like it bestie 🚫",
    "nahh 🙅‍♀️"
  ],
  ok: [
    "bet bet! 💫",
    "ight bestie! ✨",
    "fs fs! 🌟",
    "gotchu! 💅",
    "slay! 💯"
  ],
  welcome: [
    "ofc bestie! 💖",
    "anytime fr! ✨",
    "always here for u! 🫂",
    "that's what besties are for! 💫",
    "ily bestie! 💝"
  ],
  thanks: [
    "yw bestie! 💖",
    "ofc anytime! ✨",
    "here for u always! 🫂",
    "that's what im here for! 💫",
    "gotchu bestie! 💝"
  ],
  mood: {
    hype: [
      "periodt queen! 👑",
      "slay bestie! ✨",
      "as u should! 💅",
      "main character energy! 🌟",
      "we love to see it! 💫"
    ],
    comfort: [
      "sending hugs bestie 🫂",
      "im here for u fr fr 💕",
      "we'll get thru this tg 💪",
      "ur so strong for this 🌟",
      "take ur time bestie 💭"
    ],
    encourage: [
      "u got this bestie! 💫",
      "rooting for u fr! 🌟",
      "believe in u sm! ✨",
      "ur gonna eat this up! 💅",
      "show em what u got! 💪"
    ]
  },
  
  reactions: {
    excited: ["YAAAS! 🎉", "PERIODT! 💅", "SLAY! ✨", "THIS! 🙌", "FR FR! 💫"],
    sad: ["nooo 😔", "bestie... 🥺", "that's rough fr 💔", "im so sorry bb 🫂", "here for u 💕"],
    shocked: ["OMG! 😱", "NO WAY! 🤯", "FR?! 😮", "WAIT WHAT! 😳", "SPILL! 👀"],
    proud: ["SO PROUD! 🥹", "LOOK AT U! 💫", "UR SLAYING! 💅", "ICON BEHAVIOR! 👑", "AS U SHOULD! ✨"]
  }
};

// Topic-based response templates with detailed advice
const RESPONSE_TEMPLATES = {
  sleep: {
    keywords: ['sleep', 'insomnia', 'tired', 'bed', 'rest', 'nap', 'procrastination', 'cant sleep', 'staying up', 'bedtime'],
    responses: [
      "bestie, let's tackle that sleep situation! what's ur main struggle:\n\n" +
      "1. can't fall asleep? 😴\n" +
      "2. staying up scrolling? 📱\n" +
      "3. racing thoughts? 💭\n" +
      "4. irregular schedule? ⏰\n\n" +
      "lmk which one hits different and we'll work on it together!",
      
      "for better sleep vibes, try these bestie:\n" +
      "• warm shower 1hr before bed 🚿\n" +
      "• no caffeine after 2pm ☕\n" +
      "• 4-7-8 breathing technique 💨\n" +
      "• white noise or rain sounds 🌧️\n\n" +
      "which one sounds doable to u?",
      
      "phone addiction is real fr fr! let's try:\n" +
      "• set app timers ⏰\n" +
      "• grayscale mode after 9pm 🔲\n" +
      "• charge phone away from bed 📱\n" +
      "• find a bedtime book instead 📚\n\n" +
      "what usually keeps u scrolling?"
    ]
  },
  anxiety: {
    keywords: ['anxiety', 'worried', 'stress', 'nervous', 'panic', 'fear', 'overthinking', 'overwhelmed'],
    responses: [
      "anxiety is heavy fr fr. let's break this down:\n\n" +
      "• physical symptoms? (heart racing, breathing) 💓\n" +
      "• thought spirals? 🌀\n" +
      "• specific triggers? ⚡\n" +
      "• general unease? 😰\n\n" +
      "what's hitting u the hardest rn?",
      
      "bestie let's ground ourselves rn:\n" +
      "1. 5 things u can see 👀\n" +
      "2. 4 things u can touch 🤚\n" +
      "3. 3 things u can hear 👂\n" +
      "4. 2 things u can smell 👃\n" +
      "5. 1 thing u can taste 👅\n\n" +
      "try this with me?",
      
      "those thought spirals are wild! let's try:\n" +
      "• fact check ur thoughts 🔍\n" +
      "• write them down 📝\n" +
      "• challenge the narrative 💭\n\n" +
      "what thoughts keep coming back?"
    ]
  },
  depression: {
    keywords: ['sad', 'depressed', 'lonely', 'hopeless', 'miserable', 'empty', 'unmotivated', 'worthless'],
    responses: [
      "im here with u bestie 💜 let's take it step by step. what's the hardest part rn:\n\n" +
      "• no motivation? 📉\n" +
      "• feeling lonely? 🫂\n" +
      "• everything feels heavy? 🏋️\n" +
      "• cant feel joy? 🌧️\n\n" +
      "u don't have to carry this alone",
      
      "small wins are still wins bestie! let's start tiny:\n" +
      "• make ur bed 🛏️\n" +
      "• drink water 💧\n" +
      "• 5 min stretch 🧘‍♀️\n" +
      "• open a window 🪟\n\n" +
      "which one feels possible today?",
      
      "feeling lonely is so valid. would u be open to:\n" +
      "• texting one friend 📱\n" +
      "• joining an online community 🌐\n" +
      "• support group chat 💭\n\n" +
      "we can explore what feels comfortable"
    ]
  },
  relationships: {
    keywords: ['relationship', 'dating', 'crush', 'love', 'breakup', 'partner', 'boyfriend', 'girlfriend', 'friend', 'friendship', 'family', 'parents', 'siblings'],
    responses: [
      "relationships can be complicated fr fr! what's on ur mind:\n\n" +
      "• dating stuff? 💕\n" +
      "• friend drama? 👥\n" +
      "• family issues? 🏠\n" +
      "• healing from past? 🌱\n\n" +
      "im here to listen bestie!",

      "dating is wild these days fr! let's talk about:\n" +
      "• setting boundaries 🛡️\n" +
      "• red vs green flags 🚩\n" +
      "• communication tips 💭\n" +
      "• self-worth in relationships ✨\n\n" +
      "what's ur situation rn?",

      "bestie remember:\n" +
      "• ur feelings are valid 💫\n" +
      "• u deserve respect n love 💝\n" +
      "• it's ok to take space 🌸\n" +
      "• healing isn't linear 🌈\n\n" +
      "what support do u need rn?"
    ]
  },
  selfEsteem: {
    keywords: ['confidence', 'self-esteem', 'hate myself', 'ugly', 'worthless', 'not good enough', 'compare'],
    responses: [
      "ur worth is infinite bestie! what's making u doubt urself:\n\n" +
      "• comparison to others? 👥\n" +
      "• negative self-talk? 🗣️\n" +
      "• past experiences? 📝\n" +
      "• body image? 🪞\n\n" +
      "let's build u up together! 💫",
      
      "comparison is the thief of joy fr fr! let's:\n" +
      "• limit social media time 📱\n" +
      "• focus on ur progress only 📈\n" +
      "• celebrate ur unique wins 🎉\n\n" +
      "what qualities make u uniquely u?",
      
      "we're rewiring that inner voice bestie! try:\n" +
      "• catch negative thoughts 🕸️\n" +
      "• challenge them with facts 📝\n" +
      "• add 'yet' to limitations 🌱\n\n" +
      "what negative thought comes up most?"
    ]
  },
  general: {
    responses: [
      "bestie im here to listen! what's been on ur mind:\n\n" +
      "• need to vent? 📢\n" +
      "• looking for advice? 💭\n" +
      "• just wanna chat? 💫\n" +
      "• need distraction? 🎮\n\n" +
      "im here for whatever u need!",
      
      "let it all out bestie! no judgment here 💕",
      
      "that's a lot to process fr fr. what would help u feel better rn? im here to listen and support u! ✨"
    ]
  },
  career: {
    keywords: ['job', 'career', 'work', 'interview', 'unemployed', 'lost', 'future', 'college', 'study'],
    responses: [
      "feeling lost about ur future is totally valid bestie! let's break this down:\n\n" +
      "• career exploration? 🔍\n" +
      "• job search stress? 💼\n" +
      "• interview anxiety? 🎯\n" +
      "• study pressure? 📚\n\n" +
      "what's weighing on u the most?",

      "let's tackle this step by step bestie:\n" +
      "• start with small daily goals 📝\n" +
      "• explore different fields ur curious about 🌟\n" +
      "• connect with people in ur dream jobs 🤝\n" +
      "• practice self-care during the journey 💆‍♀️\n\n" +
      "which step feels most doable rn?",

      "remember ur worth isn't tied to ur job bestie! while ur figuring things out:\n" +
      "• build skills u enjoy 📱\n" +
      "• volunteer or freelance to explore 🌱\n" +
      "• join online communities 🌐\n" +
      "• take breaks when needed 🧘‍♀️\n\n" +
      "ur journey is valid, even if it's different from others!"
    ]
  },
  identity: {
    keywords: ['who am i', 'identity', 'purpose', 'meaning', 'lost', 'direction', 'confused', 'real me'],
    responses: [
      "questioning who u are is such a deep journey bestie! let's explore:\n\n" +
      "• feeling disconnected from urself? 🌊\n" +
      "• searching for purpose? ⭐\n" +
      "• comparing to others? 👥\n" +
      "• wanting change? 🦋\n\n" +
      "what's on ur mind?",

      "ur journey of self-discovery is so valid! try:\n" +
      "• journaling ur thoughts n feels 📝\n" +
      "• trying new things that interest u 🎨\n" +
      "• spending time in nature 🌿\n" +
      "• connecting with supportive people 🫂\n\n" +
      "which resonates with u?",

      "remember bestie, it's ok to:\n" +
      "• change and grow 🌱\n" +
      "• not have it all figured out 💫\n" +
      "• take time to find ur path 🛣️\n" +
      "• be different from others ✨\n\n" +
      "ur journey is uniquely urs!"
    ]
  },
  burnout: {
    keywords: ['tired', 'exhausted', 'overwhelmed', 'burnt out', 'burnout', 'too much', 'cant handle'],
    responses: [
      "burnout is real fr fr! let's check where ur at:\n\n" +
      "• physical exhaustion? 😴\n" +
      "• emotional drain? 🫂\n" +
      "• mental fog? 🌫️\n" +
      "• motivation gone? 📉\n\n" +
      "what's hitting hardest rn?",

      "ur body n mind need rest bestie! try:\n" +
      "• set boundaries (it's ok to say no!) 🛡️\n" +
      "• schedule proper breaks ⏰\n" +
      "• delegate what u can 🤝\n" +
      "• find joy in small things 🌸\n\n" +
      "which one can u try today?",

      "recovery takes time n that's ok! focus on:\n" +
      "• gentle movement (even just stretching) 🧘‍♀️\n" +
      "• nourishing foods n drinks 🥤\n" +
      "• connecting with support system 💕\n" +
      "• baby steps, no pressure 🐣\n\n" +
      "ur healing journey matters!"
    ]
  },
  lifestyle: {
    keywords: ['life', 'balance', 'routine', 'habits', 'healthy', 'exercise', 'food', 'diet', 'sleep', 'money', 'finance', 'saving'],
    responses: [
      "let's level up ur life bestie! what area needs attention:\n\n" +
      "• health n fitness? 💪\n" +
      "• money matters? 💰\n" +
      "• daily routines? ⏰\n" +
      "• self-care vibes? 🌺\n\n" +
      "where should we start?",

      "building healthy habits fr fr:\n" +
      "• start tiny (like fr tiny) 🌱\n" +
      "• stack on existing habits 📚\n" +
      "• celebrate small wins 🎉\n" +
      "• be patient w urself 💫\n\n" +
      "which one feels doable?",

      "money tips that actually help:\n" +
      "• track ur spending 📱\n" +
      "• save a little each week 💰\n" +
      "• budget for fun too! 🎮\n" +
      "• learn bout investing 📈\n\n" +
      "what's ur biggest money goal?"
    ]
  },
  creativity: {
    keywords: ['creative', 'art', 'music', 'write', 'writing', 'hobby', 'passion', 'project', 'inspiration', 'stuck', 'block'],
    responses: [
      "creative vibes check! what's up:\n\n" +
      "• artistic block? 🎨\n" +
      "• starting something new? 🌟\n" +
      "• sharing ur work? 🎭\n" +
      "• finding inspiration? 💫\n\n" +
      "let's get those creative juices flowing!",

      "stuck in a creative rut? try:\n" +
      "• change ur environment 🏡\n" +
      "• mix up ur routine 🔄\n" +
      "• try new mediums 🎨\n" +
      "• collab w others 🤝\n\n" +
      "what usually inspires u?",

      "remember bestie:\n" +
      "• perfect is the enemy of done ✨\n" +
      "• ur art is valid 🎭\n" +
      "• comparison kills creativity 🌱\n" +
      "• just start somewhere 💫\n\n" +
      "what's ur creative dream?"
    ]
  },
  personal_growth: {
    keywords: ['grow', 'growth', 'change', 'better', 'improve', 'learn', 'goals', 'dream', 'future', 'stuck', 'progress'],
    responses: [
      "growth journey check! what's on ur mind:\n\n" +
      "• personal development? 🌱\n" +
      "• setting new goals? 🎯\n" +
      "• breaking old patterns? 🔄\n" +
      "• finding ur path? 🌟\n\n" +
      "let's explore together!",

      "small steps lead to big changes fr:\n" +
      "• journal ur progress 📝\n" +
      "• celebrate tiny wins 🎉\n" +
      "• learn from setbacks 📚\n" +
      "• stay consistent 💫\n\n" +
      "what's ur next small step?",

      "growth mindset tips:\n" +
      "• add 'yet' to ur limits 🌱\n" +
      "• embrace challenges 💪\n" +
      "• learn from feedback 🎯\n" +
      "• be patient w urself 💕\n\n" +
      "what growth are u proud of?"
    ]
  },
  social_life: {
    keywords: ['social', 'friends', 'party', 'meetup', 'lonely', 'connection', 'network', 'people', 'group', 'community'],
    responses: [
      "social life check! what's happening:\n\n" +
      "• making new friends? 👥\n" +
      "• social anxiety? 😰\n" +
      "• finding ur crowd? 🎭\n" +
      "• need more connection? 💫\n\n" +
      "let's figure this out!",

      "connecting irl tips:\n" +
      "• join groups u vibe with 🎮\n" +
      "• say yes to invites 🎉\n" +
      "• be genuinely curious 💭\n" +
      "• start small talk 💫\n\n" +
      "which one feels possible?",

      "remember bestie:\n" +
      "• quality > quantity in friends 💫\n" +
      "• ur vibe attracts ur tribe ✨\n" +
      "• it's ok to be selective 🌟\n" +
      "• authentic > perfect 💝\n\n" +
      "what kind of friends u looking for?"
    ]
  },
  tech_digital: {
    keywords: ['online', 'digital', 'social media', 'internet', 'gaming', 'screen time', 'addiction', 'phone', 'technology'],
    responses: [
      "digital life check! what's up:\n\n" +
      "• social media stress? 📱\n" +
      "• screen time struggles? 🖥️\n" +
      "• online vs irl balance? ⚖️\n" +
      "• digital wellbeing? 🌱\n\n" +
      "let's talk about it!",

      "healthy digital habits fr fr:\n" +
      "• set app timers ⏰\n" +
      "• curate ur feed 🌈\n" +
      "• digital detox breaks 🧘‍♀️\n" +
      "• mindful scrolling 🤳\n\n" +
      "which one could help u?",

      "online wellness tips:\n" +
      "• follow accounts that uplift u 💫\n" +
      "• mute what drains u 🔇\n" +
      "• set boundaries 🛡️\n" +
      "• real connections > likes 💝\n\n" +
      "how's ur digital space feeling?"
    ]
  },
  education_learning: {
    keywords: ['study', 'school', 'college', 'university', 'exam', 'test', 'homework', 'grades', 'learning', 'class'],
    responses: [
      "study vibes check! what's stressing u:\n\n" +
      "• exam pressure? 📚\n" +
      "• study motivation? 💪\n" +
      "• time management? ⏰\n" +
      "• subject struggles? 🤔\n\n" +
      "let's tackle this together!",

      "study tips that actually work:\n" +
      "• pomodoro method (25min focus) ⏱️\n" +
      "• teach others what u learn 📚\n" +
      "• active recall > re-reading 🧠\n" +
      "• break it down small 📝\n\n" +
      "which one sounds helpful?",

      "remember bestie:\n" +
      "• grades don't define u 💫\n" +
      "• progress > perfection 📈\n" +
      "• ask for help when needed 🤝\n" +
      "• take care of ur brain 🧠\n\n" +
      "what's ur study goal rn?"
    ]
  },
  self_expression: {
    keywords: ['style', 'fashion', 'express', 'authentic', 'true self', 'identity', 'unique', 'different', 'confidence'],
    responses: [
      "express urself check! what's on ur mind:\n\n" +
      "• finding ur style? 👗\n" +
      "• being authentic? 💫\n" +
      "• standing out? 🌟\n" +
      "• confidence boost? ✨\n\n" +
      "let's explore ur vibe!",

      "authenticity tips fr fr:\n" +
      "• experiment w styles 👕\n" +
      "• ignore the haters 🛡️\n" +
      "• trust ur instincts 💫\n" +
      "• be unapologetically u ✨\n\n" +
      "what makes u feel most u?",

      "confidence boosters:\n" +
      "• wear what makes u happy 👗\n" +
      "• practice self-expression 🎨\n" +
      "• celebrate ur uniqueness 🌟\n" +
      "• surround urself w support 💝\n\n" +
      "what's ur favorite way to express urself?"
    ]
  },
  life_decisions: {
    keywords: ['decision', 'choose', 'choice', 'stuck', 'confused', 'crossroads', 'path', 'option', 'unsure', 'regret'],
    responses: [
      "big decisions can be scary fr! what's on ur plate:\n\n" +
      "• life changing choice? 🔄\n" +
      "• multiple options? 🛣️\n" +
      "• fear of regret? 😰\n" +
      "• need clarity? 🔍\n\n" +
      "let's figure this out together!",

      "decision making tips fr fr:\n" +
      "• list pros n cons 📝\n" +
      "• trust ur gut feeling 💫\n" +
      "• ask trusted friends 🤝\n" +
      "• visualize outcomes 🎯\n\n" +
      "what's holding u back rn?",

      "remember bestie:\n" +
      "• no perfect choice exists ✨\n" +
      "• u can always adjust course 🚗\n" +
      "• growth comes from any path 🌱\n" +
      "• ur intuition knows things 💫\n\n" +
      "what does ur gut say?"
    ]
  },
  hobbies_interests: {
    keywords: ['hobby', 'interest', 'bored', 'fun', 'activity', 'passion', 'try new', 'learn', 'skills'],
    responses: [
      "hobby hunting time! what interests u:\n\n" +
      "• creative stuff? 🎨\n" +
      "• active things? 🏃‍♀️\n" +
      "• tech projects? 💻\n" +
      "• chill vibes? 🎮\n\n" +
      "let's find ur thing!",

      "trying new things tips:\n" +
      "• start small n cheap 🌱\n" +
      "• join online communities 🌐\n" +
      "• watch tutorials first 📱\n" +
      "• don't pressure urself 💫\n\n" +
      "what've u always wanted to try?",

      "hobby ideas fr fr:\n" +
      "• digital art / editing 🎨\n" +
      "• plants / gardening 🌿\n" +
      "• coding / game dev 💻\n" +
      "• cooking / baking 🍳\n\n" +
      "any of these vibe w u?"
    ]
  },
  productivity: {
    keywords: ['productive', 'focus', 'procrastination', 'distracted', 'motivation', 'lazy', 'work', 'task', 'todo'],
    responses: [
      "productivity check! what's the struggle:\n\n" +
      "• procrastination? ⏰\n" +
      "• can't focus? 🎯\n" +
      "• too many tasks? 📝\n" +
      "• no motivation? 💪\n\n" +
      "let's get u unstuck!",

      "focus hacks that actually work:\n" +
      "• 5 min rule (just start!) ⏱️\n" +
      "• break tasks super small 📝\n" +
      "• remove distractions 🔕\n" +
      "• reward progress 🎉\n\n" +
      "which one u wanna try?",

      "productivity mindset:\n" +
      "• progress > perfection 📈\n" +
      "• rest is productive too 😴\n" +
      "• start anywhere 🌱\n" +
      "• celebrate small wins ✨\n\n" +
      "what's one thing u can do rn?"
    ]
  },
  self_care: {
    keywords: ['self care', 'stress', 'overwhelmed', 'relax', 'break', 'rest', 'peace', 'calm', 'mindful'],
    responses: [
      "self care check! what do u need:\n\n" +
      "• mental break? 🧠\n" +
      "• physical rest? 💆‍♀️\n" +
      "• emotional release? 💕\n" +
      "• spiritual peace? ✨\n\n" +
      "let's take care of u!",

      "quick self care ideas:\n" +
      "• 5 min meditation 🧘‍♀️\n" +
      "• comfort playlist 🎵\n" +
      "• gentle stretching 💫\n" +
      "• nature time 🌿\n\n" +
      "what helps u feel peaceful?",

      "remember bestie:\n" +
      "• self care isn't selfish 💝\n" +
      "• small acts add up 🌱\n" +
      "• listen to ur body 💫\n" +
      "• it's ok to rest ✨\n\n" +
      "how can u show urself love today?"
    ]
  },
  future_planning: {
    keywords: ['future', 'plan', 'goal', 'dream', 'achieve', 'success', 'ambition', 'aspire', 'hope'],
    responses: [
      "future planning vibes! what's on ur mind:\n\n" +
      "• short term goals? 📈\n" +
      "• big dreams? 🌟\n" +
      "• career path? 💼\n" +
      "• life vision? 🔮\n\n" +
      "let's manifest together!",

      "goal setting tips fr fr:\n" +
      "• make it specific 🎯\n" +
      "• break it down small 📝\n" +
      "• set deadlines ⏰\n" +
      "• track progress 📈\n\n" +
      "what's ur biggest dream?",

      "manifesting ur dreams:\n" +
      "• visualize success 🌟\n" +
      "• take daily steps 👣\n" +
      "• believe in urself 💫\n" +
      "• adjust as needed 🔄\n\n" +
      "what's ur first step gonna be?"
    ]
  },
  confidence_worth: {
    keywords: ['confidence', 'insecure', 'worth', 'value', 'self esteem', 'doubt', 'validation', 'acceptance'],
    responses: [
      "confidence check! what's up:\n\n" +
      "• self doubt? 🤔\n" +
      "• comparing to others? 👥\n" +
      "• need validation? 💫\n" +
      "• inner critic? 🗣️\n\n" +
      "let's build u up!",

      "confidence boosters fr:\n" +
      "• list ur wins (all of them!) 📝\n" +
      "• positive self talk 💭\n" +
      "• set small challenges 🎯\n" +
      "• celebrate progress 🎉\n\n" +
      "what makes u feel confident?",

      "ur worth is infinite bestie:\n" +
      "• ur not ur thoughts 💭\n" +
      "• ur journey is valid 🌱\n" +
      "• ur enough as u are ✨\n" +
      "• ur growing everyday 💫\n\n" +
      "what do u love about urself?"
    ]
  },
  // Add teenage-specific topics
  teen_life: {
    keywords: ['teen', 'teenage', 'young', 'growing up', 'puberty', 'adolescent', 'youth'],
    responses: [
      "teen life can be wild fr! what's on ur mind:\n\n" +
      "• body changes? 🫂\n" +
      "• parent stuff? 🏠\n" +
      "• fitting in? 👥\n" +
      "• future worry? 🌟\n\n" +
      "let's talk it out bestie!",

      "growing up tips fr fr:\n" +
      "• ur body = ur timeline 🌱\n" +
      "• everyone's different 💫\n" +
      "• it's ok to be confused 🤔\n" +
      "• ask for help when needed 🤝\n\n" +
      "what's been on ur mind?",

      "remember bestie:\n" +
      "• ur not alone in this 🫂\n" +
      "• these years don't define u 💫\n" +
      "• it's ok to take ur time 🌱\n" +
      "• u got this fr fr ✨\n\n" +
      "how can i support u rn?"
    ]
  },
  school_drama: {
    keywords: ['school', 'class', 'teacher', 'homework', 'bully', 'drama', 'gossip', 'popular', 'grades'],
    responses: [
      "school stuff got u stressed? let's talk:\n\n" +
      "• drama w others? 🎭\n" +
      "• teacher problems? 📚\n" +
      "• grade pressure? 📝\n" +
      "• social stuff? 👥\n\n" +
      "spill the tea bestie!",

      "dealing w school drama:\n" +
      "• stay true to urself 💫\n" +
      "• find ur real ones 🤝\n" +
      "• don't feed the drama 🙅‍♀️\n" +
      "• focus on ur growth 📈\n\n" +
      "what's been happening?",

      "school survival guide:\n" +
      "• grades ≠ ur worth 📚\n" +
      "• this phase is temporary 🌱\n" +
      "• build ur support squad 👥\n" +
      "• take mental health days 🧠\n\n" +
      "how can we make it better?"
    ]
  },
  first_love: {
    keywords: ['crush', 'love', 'relationship', 'dating', 'heartbreak', 'breakup', 'like someone', 'feelings for'],
    responses: [
      "feelings can be intense fr! what's happening:\n\n" +
      "• new crush? 💘\n" +
      "• relationship stuff? 💑\n" +
      "• heartbreak? 💔\n" +
      "• confused feelings? 🤔\n\n" +
      "let's figure this out!",

      "crush advice fr fr:\n" +
      "• take it slow 🐢\n" +
      "• be urself always ✨\n" +
      "• respect boundaries 🛡️\n" +
      "• trust ur gut 💫\n\n" +
      "what's ur situation?",

      "heartbreak healing:\n" +
      "• feel ur feelings 💕\n" +
      "• focus on self-love 🫂\n" +
      "• lean on friends 👥\n" +
      "• time helps fr fr 🌱\n\n" +
      "how're u holding up?"
    ]
  },
  identity_exploration: {
    keywords: ['identity', 'who am i', 'different', 'fit in', 'belong', 'real me', 'true self', 'questioning'],
    responses: [
      "finding urself is a journey fr! what's up:\n\n" +
      "• questioning stuff? 🤔\n" +
      "• feeling different? 🌈\n" +
      "• pressure to fit in? 👥\n" +
      "• exploring identity? 💫\n\n" +
      "let's talk it through!",

      "being ur authentic self:\n" +
      "• ur journey = ur pace 🌱\n" +
      "• it's ok to explore 🔍\n" +
      "• find ur people 🤝\n" +
      "• trust ur heart 💖\n\n" +
      "what's on ur mind?",

      "remember bestie:\n" +
      "• ur valid exactly as u are 💫\n" +
      "• labels don't define u ✨\n" +
      "• it's ok to change 🦋\n" +
      "• ur not alone 🫂\n\n" +
      "how can i support u?"
    ]
  },
  social_media_pressure: {
    keywords: ['social media', 'instagram', 'tiktok', 'snapchat', 'followers', 'likes', 'viral', 'trending', 'fomo'],
    responses: [
      "social media got u stressed? let's chat:\n\n" +
      "• comparison feels? 📱\n" +
      "• fomo hitting hard? 😔\n" +
      "• online drama? 😤\n" +
      "• pressure to post? 📸\n\n" +
      "spill bestie!",

      "social media survival:\n" +
      "• curate ur feed 🌈\n" +
      "• set boundaries ⏰\n" +
      "• remember it's filtered 🎭\n" +
      "• take breaks when needed 🧘‍♀️\n\n" +
      "what's been bothering u?",

      "digital wellness check:\n" +
      "• real life > online 💫\n" +
      "• ur worth isn't in likes 💖\n" +
      "• post for u, not others ✨\n" +
      "• protect ur peace 🛡️\n\n" +
      "how can we make it better?"
    ]
  },
  body_image: {
    keywords: ['body', 'weight', 'fat', 'skinny', 'ugly', 'pretty', 'beautiful', 'looks', 'appearance'],
    responses: [
      "body image stuff is tough fr! what's on ur mind:\n\n" +
      "• comparison thoughts? 🤔\n" +
      "• feeling insecure? 💭\n" +
      "• beauty standards? 🌟\n" +
      "• self-image stuff? 🪞\n\n" +
      "let's talk it out!",

      "body positivity reminders:\n" +
      "• ur body = ur home 🏠\n" +
      "• all bodies valid 💫\n" +
      "• beauty = diverse ✨\n" +
      "• focus on health 💖\n\n" +
      "what's been heavy on ur mind?",

      "self-love practices:\n" +
      "• gratitude for ur body 🙏\n" +
      "• positive self-talk 💭\n" +
      "• unfollow triggers 📱\n" +
      "• celebrate uniqueness 🌟\n\n" +
      "how can we boost ur confidence?"
    ]
  },
  friend_group: {
    keywords: ['friend', 'bestie', 'friendship', 'group', 'squad', 'clique', 'bff', 'friends'],
    responses: [
      "friendship check! what's the tea:\n\n" +
      "• friend drama? 👥\n" +
      "• feeling left out? 💔\n" +
      "• toxic friendship? 🚩\n" +
      "• making new friends? 💫\n\n" +
      "let's figure this out bestie!",

      "friendship advice fr fr:\n" +
      "• real ones stay loyal 💕\n" +
      "• boundaries r healthy 🛡️\n" +
      "• quality > quantity 💫\n" +
      "• communicate openly 🗣️\n\n" +
      "what's been going on?",

      "toxic friendship signs:\n" +
      "• one-sided energy 🚩\n" +
      "• constant drama 😤\n" +
      "• jealousy/competition 👀\n" +
      "• no support system 💔\n\n" +
      "notice any of these?"
    ]
  },
  family_stuff: {
    keywords: ['parent', 'mom', 'dad', 'family', 'sibling', 'brother', 'sister', 'home'],
    responses: [
      "family stuff can be tough fr! what's up:\n\n" +
      "• parent problems? 🏠\n" +
      "• sibling drama? 👥\n" +
      "• strict rules? 📜\n" +
      "• need space? 🚪\n\n" +
      "let's talk it out!",

      "dealing w parents fr fr:\n" +
      "• stay calm in convos 🧘‍♀️\n" +
      "• explain ur feelings 💭\n" +
      "• find compromise 🤝\n" +
      "• choose ur battles 💫\n\n" +
      "what's been hard?",

      "home survival guide:\n" +
      "• set boundaries kindly 🛡️\n" +
      "• find ur safe space 🏡\n" +
      "• express don't explode 💭\n" +
      "• build trust slowly 🌱\n\n" +
      "what could help rn?"
    ]
  },
  style_expression: {
    keywords: ['style', 'clothes', 'fashion', 'outfit', 'hair', 'makeup', 'look', 'aesthetic'],
    responses: [
      "style check! what's on ur mind:\n\n" +
      "• finding ur aesthetic? 👗\n" +
      "• trying new looks? 💄\n" +
      "• confidence tips? ✨\n" +
      "• style inspiration? 🎨\n\n" +
      "let's glow up together!",

      "style tips fr fr:\n" +
      "• experiment w looks 👚\n" +
      "• thrift unique pieces 🛍️\n" +
      "• mix n match vibes 🎨\n" +
      "• wear what feels good 💫\n\n" +
      "what's ur dream aesthetic?",

      "confidence boosters:\n" +
      "• rock ur unique style 💅\n" +
      "• ignore the haters 🙅‍♀️\n" +
      "• comfort = confidence ✨\n" +
      "• ur body = ur canvas 🎨\n\n" +
      "what makes u feel powerful?"
    ]
  },
  internet_life: {
    keywords: ['online', 'internet', 'social media', 'viral', 'trending', 'influencer', 'content', 'youtube', 'stream'],
    responses: [
      "online life check! what's the tea:\n\n" +
      "• content creation? 🎥\n" +
      "• going viral? 🌟\n" +
      "• online friends? 👥\n" +
      "• streaming stuff? 🎮\n\n" +
      "spill bestie!",

      "content creator tips:\n" +
      "• stay authentic 💫\n" +
      "• engage w community 🤝\n" +
      "• consistent posting 📱\n" +
      "• protect ur peace 🛡️\n\n" +
      "what content u make?",

      "online safety check:\n" +
      "• protect ur info 🔒\n" +
      "• trust ur gut online 🤔\n" +
      "• real life > internet 💫\n" +
      "• take breaks often 🧘‍♀️\n\n" +
      "staying safe out there?"
    ]
  },
  mental_health: {
    keywords: ['anxiety', 'depression', 'stress', 'mental health', 'therapy', 'counseling', 'help', 'sad', 'worried'],
    responses: [
      "mental health check! how u feeling:\n\n" +
      "• anxiety high? 😰\n" +
      "• feeling down? 💙\n" +
      "• need support? 🫂\n" +
      "• want resources? 📚\n\n" +
      "im here to listen bestie!",

      "coping skills fr fr:\n" +
      "• deep breathing 🧘‍♀️\n" +
      "• journal feelings 📝\n" +
      "• talk to someone 🗣️\n" +
      "• small self care acts 💕\n\n" +
      "what helps u feel grounded?",

      "remember bestie:\n" +
      "• ur feelings r valid 💫\n" +
      "• asking for help = strong 💪\n" +
      "• ur not alone in this 🫂\n" +
      "• recovery isn't linear 📈\n\n" +
      "need resources or just wanna talk?"
    ]
  },
  future_goals: {
    keywords: ['future', 'college', 'university', 'career', 'job', 'dream', 'goals', 'plan'],
    responses: [
      "future planning check! what's on ur mind:\n\n" +
      "• college stress? 📚\n" +
      "• career dreams? 💼\n" +
      "• life goals? 🎯\n" +
      "• feeling lost? 🌟\n\n" +
      "let's figure it out together!",

      "future tips fr fr:\n" +
      "• explore interests 🔍\n" +
      "• research options 📱\n" +
      "• talk to mentors 🤝\n" +
      "• trust ur journey 🌱\n\n" +
      "what's ur dream scenario?",

      "remember bestie:\n" +
      "• ur path = ur pace 🌟\n" +
      "• it's ok to change plans 🔄\n" +
      "• success looks different 💫\n" +
      "• u got time to grow ✨\n\n" +
      "what's step 1 for ur goals?"
    ]
  }
};

const getMoodDescription = (score, recentMoods, emotion) => {
  const trend = recentMoods.length > 1 
    ? recentMoods[recentMoods.length - 1].score - recentMoods[recentMoods.length - 2].score
    : 0;

  const trendText = trend > 0.5 ? "improving significantly 📈" : 
                    trend > 0 ? "slightly better 📈" :
                    trend < -0.5 ? "needs extra support 📉" :
                    trend < 0 ? "slightly challenging 📉" : "stable ⚖️";

  // Dynamic suggestions based on score and emotion
  const getSuggestion = (score, emotion) => {
    if (emotion === 'anxiety') {
      return score < 5 ? "try some deep breathing or let's talk about what's on ur mind" :
                        "maybe try some grounding exercises or gentle movement";
    }
    if (emotion === 'depression') {
      return score < 5 ? "remember ur not alone, even tiny steps count today" :
                        "celebrate the small wins, ur doing better than u think";
    }
    if (emotion === 'anger') {
      return score < 5 ? "let's find healthy ways to express these feelings" :
                        "ur handling things well, keep using those coping skills";
    }
    return score < 5 ? "take it one moment at a time, im here to listen" :
                      "ur doing great bestie, keep this energy going!";
  };

  if (score >= 8) {
    return {
      emoji: "🌟",
      label: "Thriving",
      color: "#00ff9d",
      description: `${trendText} and feeling strong!`,
      suggestion: getSuggestion(score, emotion)
    };
  } else if (score >= 6) {
    return {
      emoji: "😊",
      label: "Stable",
      color: "#00b7ff",
      description: `${trendText} and managing well`,
      suggestion: getSuggestion(score, emotion)
    };
  } else if (score >= 4) {
    return {
      emoji: "😰",
      label: "Struggling",
      color: "#7c4dff",
      description: `${trendText} but hanging in there`,
      suggestion: getSuggestion(score, emotion)
    };
  } else if (score >= 2) {
    return {
      emoji: "😢",
      label: "Having a Hard Time",
      color: "#ff71ce",
      description: `${trendText} - it's ok to not be ok`,
      suggestion: getSuggestion(score, emotion)
    };
  }
  return {
    emoji: "💜",
    label: "Need Support",
    color: "#ff0000",
    description: `${trendText} - ur so brave for sharing`,
    suggestion: getSuggestion(score, emotion)
  };
};

const getInteractionPattern = (moodHistory) => {
  if (moodHistory.length < 2) return null;

  const last24Hours = moodHistory.filter(entry => 
    new Date().getTime() - new Date(entry.timestamp).getTime() < 24 * 60 * 60 * 1000
  );

  const averageMood = last24Hours.reduce((acc, curr) => acc + curr.score, 0) / (last24Hours.length || 1);
  const moodSwings = last24Hours.length > 1 
    ? last24Hours.slice(1).reduce((acc, curr, i) => 
        acc + Math.abs(curr.score - last24Hours[i].score), 0) / (last24Hours.length - 1)
    : 0;

  return {
    frequency: last24Hours.length,
    averageMood: averageMood.toFixed(1),
    moodSwings: moodSwings.toFixed(1)
  };
};

// Conversation analysis helper
const analyzeConversationContext = (messages, currentMessage) => {
  // Get last 5 messages for context
  const recentMessages = messages.slice(-5);
  
  // Keywords and their weights for different moods
  const moodKeywords = {
    positive: {
      words: ['good', 'great', 'happy', 'better', 'awesome', 'love', 'excited', 'slay', 'lit', 'amazing'],
      weight: 1
    },
    negative: {
      words: ['bad', 'sad', 'worse', 'terrible', 'hate', 'miserable', 'awful', 'horrible', 'depressed'],
      weight: -1
    },
    anxious: {
      words: ['worried', 'anxious', 'nervous', 'stress', 'scared', 'fear', 'panic', 'overwhelmed'],
      weight: -0.5
    },
    angry: {
      words: ['angry', 'mad', 'furious', 'hate', 'upset', 'frustrated', 'annoyed'],
      weight: -0.7
    }
  };

  // Analyze message patterns
  const patterns = {
    shortResponses: 0,
    negationCount: 0,
    exclamationCount: 0,
    questionCount: 0,
    emojiCount: 0
  };

  let totalScore = 5; // Start at neutral
  let messageCount = 0;
  let conversationTone = 0;

  recentMessages.forEach(msg => {
    if (msg.sender === 'user') {
      messageCount++;
      const text = msg.text.toLowerCase();
      
      // Pattern analysis
      patterns.shortResponses += text.split(' ').length < 3 ? 1 : 0;
      patterns.negationCount += (text.includes('no ') || text.includes('not ') || text.includes('dont ')) ? 1 : 0;
      patterns.exclamationCount += (text.match(/!/g) || []).length;
      patterns.questionCount += (text.match(/\?/g) || []).length;
      patterns.emojiCount += (text.match(/[\u{1F300}-\u{1F9FF}]/gu) || []).length;

      // Keyword analysis
      Object.entries(moodKeywords).forEach(([mood, data]) => {
        data.words.forEach(word => {
          if (text.includes(word)) {
            totalScore += data.weight;
            conversationTone += data.weight;
          }
        });
      });

      // Context-based adjustments
      if (patterns.shortResponses > 2) totalScore -= 0.5; // Multiple short responses suggest disengagement
      if (patterns.negationCount > 2) totalScore -= 0.5; // Frequent negations suggest resistance
      if (patterns.exclamationCount > 2) totalScore += patterns.emojiCount > 0 ? 0.5 : -0.5; // Exclamations with emojis are positive, without are negative
    }
  });

  // Analyze current message for immediate mood
  const currentText = currentMessage.toLowerCase();
  let immediateScore = 0;

  Object.entries(moodKeywords).forEach(([mood, data]) => {
    data.words.forEach(word => {
      if (currentText.includes(word)) {
        immediateScore += data.weight;
      }
    });
  });

  // Calculate final score considering both history and current message
  const historicalWeight = 0.7;
  const immediateWeight = 0.3;
  
  let finalScore = (
    (totalScore / (messageCount || 1)) * historicalWeight + 
    immediateScore * immediateWeight
  );

  // Normalize score between 1 and 10
  finalScore = Math.max(1, Math.min(10, finalScore + 5));

  // Predict mood progression
  const moodProgression = conversationTone > 0 ? "improving" :
                         conversationTone < 0 ? "declining" : "stable";

  return {
    score: finalScore,
    patterns,
    progression: moodProgression
  };
};

const MoodBoard = ({ moodHistory, messages }) => {
  const [predictedMood, setPredictedMood] = useState(null);
  const latestMood = moodHistory[moodHistory.length - 1]?.score || 5;
  const moodInfo = getMoodDescription(latestMood, moodHistory, null);
  const pattern = getInteractionPattern(moodHistory);
  
  // Format the date to show only time if today, otherwise show date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    return isToday 
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Predict next mood based on conversation patterns
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const analysis = analyzeConversationContext(messages, lastMessage.text);
      setPredictedMood(analysis);
    }
  }, [messages]);

  return (
    <Card
      className="glass-morphism"
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6" className="neon-text" sx={{ textAlign: 'center' }}>
        mood board
      </Typography>
      
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h2" sx={{ color: moodInfo.color, mb: 1 }}>
          {moodInfo.emoji}
        </Typography>
        <Typography variant="h5" sx={{ color: moodInfo.color }}>
          {moodInfo.label}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255,255,255,0.7)', 
            mt: 1,
            fontStyle: 'italic'
          }}
        >
          {moodInfo.description}
        </Typography>
      </Box>

      <Box sx={{ width: '100%', mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1, color: 'var(--neon-green)' }}>
          current mood level
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(latestMood / 10) * 100}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(0, 255, 157, 0.2)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: moodInfo.color,
            },
          }}
        />
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'var(--neon-green)',
            display: 'block',
            mt: 1,
            textAlign: 'center',
            fontFamily: 'Share Tech Mono'
          }}
        >
          {moodInfo.suggestion}
        </Typography>
      </Box>

      {pattern && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1, color: 'var(--neon-green)' }}>
            last 24h insights
          </Typography>
          <Box sx={{ 
            backgroundColor: 'rgba(0,0,0,0.3)', 
            p: 1.5, 
            borderRadius: 1,
            border: '1px solid rgba(0, 255, 157, 0.2)'
          }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              • check-ins: {pattern.frequency}x
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              • avg mood: {pattern.averageMood}/10
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              • mood variation: {pattern.moodSwings} pts
            </Typography>
          </Box>
        </Box>
      )}

      <Box sx={{ width: '100%', mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1, color: 'var(--neon-green)' }}>
          mood prediction
        </Typography>
        {predictedMood && (
          <Box sx={{ 
            backgroundColor: 'rgba(0,0,0,0.3)', 
            p: 1.5, 
            borderRadius: 1,
            border: '1px solid rgba(0, 255, 157, 0.2)'
          }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              conversation tone: {predictedMood.progression} {
                predictedMood.progression === "improving" ? "📈" :
                predictedMood.progression === "declining" ? "📉" : "⚖️"
              }
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              engagement: {
                predictedMood.patterns.shortResponses > 2 ? "low 📉" :
                predictedMood.patterns.emojiCount > 2 ? "high 📈" : "moderate ⚖️"
              }
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              emotional state: {
                predictedMood.patterns.exclamationCount > 2 ? "intense" :
                predictedMood.patterns.questionCount > 2 ? "uncertain" : "stable"
              }
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ mb: 1, color: 'var(--neon-green)' }}>
          mood history
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            maxHeight: 200,
            overflowY: 'auto',
          }}
        >
          {moodHistory.slice(-5).reverse().map((entry, index) => {
            const { label, color, emoji } = getMoodDescription(entry.score, moodHistory, null);
            return (
              <Paper
                key={index}
                sx={{
                  p: 1,
                  backgroundColor: 'rgba(10, 10, 10, 0.8)',
                  border: `1px solid ${color}`,
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 0.5
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">{emoji}</Typography>
                    <Typography variant="body2" sx={{ color }}>
                      {label}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'var(--neon-green)' }}>
                    {entry.score}/10
                  </Typography>
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.5)',
                    display: 'block',
                    textAlign: 'right',
                    fontFamily: 'Share Tech Mono'
                  }}
                >
                  {formatDate(entry.timestamp)}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Box>
    </Card>
  );
};

const AiChat = () => {
  const { updateMood, updateActivity, addActivity } = useData();
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [
      {
        text: "hey bestie! im ur ai therapist fr fr. spill the tea about whats on ur mind rn ✨",
        sender: 'bot',
        timestamp: new Date(),
      },
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [moodHistory, setMoodHistory] = useState(() => {
    const savedMoods = localStorage.getItem('moodHistory');
    return savedMoods ? JSON.parse(savedMoods) : [{
      score: 5,
      timestamp: new Date().toISOString()
    }];
  });
  const messagesEndRef = useRef(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const generateResponse = async (userMessage, messageHistory) => {
    try {
      const lowerMessage = userMessage.toLowerCase();
      
      // Check for casual responses
      if (/^(ye[sp]|yup|yeah|sure|ok|okay|yea|right)(\s|$)/i.test(lowerMessage)) {
        return CASUAL_RESPONSES.yes[Math.floor(Math.random() * CASUAL_RESPONSES.yes.length)];
      }
      if (/^(no|nah|nope|not|never)(\s|$)/i.test(lowerMessage)) {
        return CASUAL_RESPONSES.no[Math.floor(Math.random() * CASUAL_RESPONSES.no.length)];
      }
      if (/^(ok|okay|k|cool|alright|fine|bet)(\s|$)/i.test(lowerMessage)) {
        return CASUAL_RESPONSES.ok[Math.floor(Math.random() * CASUAL_RESPONSES.ok.length)];
      }
      if (/^(ty|thx|thanks|thank|thanku|thank you)(\s|$)/i.test(lowerMessage)) {
        return CASUAL_RESPONSES.thanks[Math.floor(Math.random() * CASUAL_RESPONSES.thanks.length)];
      }

      // Check for emotional reactions
      if (/^(omg|wow|wtf|whoa|wth|wait)/i.test(lowerMessage)) {
        return CASUAL_RESPONSES.reactions.shocked[Math.floor(Math.random() * CASUAL_RESPONSES.reactions.shocked.length)];
      }
      if (/^(yay|lets go|amazing|awesome|great)/i.test(lowerMessage)) {
        return CASUAL_RESPONSES.reactions.excited[Math.floor(Math.random() * CASUAL_RESPONSES.reactions.excited.length)];
      }
      if (/^(sad|crying|upset|hurt)/i.test(lowerMessage)) {
        return CASUAL_RESPONSES.reactions.sad[Math.floor(Math.random() * CASUAL_RESPONSES.reactions.sad.length)];
      }

      // Topic-based responses with context awareness
      const topic = Object.entries(RESPONSE_TEMPLATES).find(([category, data]) => {
        if (category === 'general') return false;
        return data.keywords?.some(keyword => 
          lowerMessage.includes(keyword.toLowerCase())
        );
      })?.[0] || 'general';

      const relevantResponses = RESPONSE_TEMPLATES[topic].responses;
      
      // Choose response based on conversation context
      const recentMessages = messageHistory.slice(-3);
      const availableResponses = relevantResponses.filter(
        response => !recentMessages.some(msg => msg.text === response)
      );

      let response = availableResponses.length > 0 ?
        availableResponses[Math.floor(Math.random() * availableResponses.length)] :
        relevantResponses[0];

      // Add supportive reactions for emotional messages
      if (lowerMessage.includes('sad') || lowerMessage.includes('hurt') || lowerMessage.includes('lonely')) {
        response = CASUAL_RESPONSES.mood.comfort[Math.floor(Math.random() * CASUAL_RESPONSES.mood.comfort.length)] + "\n\n" + response;
      }
      if (lowerMessage.includes('happy') || lowerMessage.includes('excited') || lowerMessage.includes('proud')) {
        response = CASUAL_RESPONSES.mood.hype[Math.floor(Math.random() * CASUAL_RESPONSES.mood.hype.length)] + "\n\n" + response;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      return response;
    } catch (error) {
      console.error('Error generating response:', error);
      return "bestie the system is glitching rn, try again in a sec 😭";
    }
  };

  const analyzeSentiment = (text, messageHistory) => {
    const analysis = analyzeConversationContext(messageHistory, text);
    
    // Identify emotional themes
    const emotionalThemes = {
      anxiety: ['worried', 'nervous', 'stress', 'panic', 'fear'],
      depression: ['sad', 'hopeless', 'empty', 'tired', 'alone'],
      anger: ['angry', 'mad', 'frustrated', 'upset', 'hate'],
      hope: ['better', 'trying', 'hope', 'improve', 'good'],
      joy: ['happy', 'excited', 'great', 'wonderful', 'love']
    };

    let dominantEmotion = null;
    let maxCount = 0;

    Object.entries(emotionalThemes).forEach(([emotion, keywords]) => {
      const count = keywords.reduce((acc, word) => 
        acc + (text.toLowerCase().includes(word) ? 1 : 0), 0
      );
      if (count > maxCount) {
        maxCount = count;
        dominantEmotion = emotion;
      }
    });

    // Adjust score based on emotional context
    let baseScore = analysis.score;
    if (dominantEmotion === 'anxiety') baseScore *= 0.8;
    if (dominantEmotion === 'depression') baseScore *= 0.7;
    if (dominantEmotion === 'anger') baseScore *= 0.75;
    if (dominantEmotion === 'hope') baseScore *= 1.2;
    if (dominantEmotion === 'joy') baseScore *= 1.3;

    // Consider message history for trend
    const recentMessages = messageHistory.slice(-5);
    const emotionalTrend = recentMessages.reduce((acc, msg) => {
      if (msg.sender === 'user') {
        Object.entries(emotionalThemes).forEach(([emotion, keywords]) => {
          keywords.forEach(word => {
            if (msg.text.toLowerCase().includes(word)) {
              acc[emotion] = (acc[emotion] || 0) + 1;
            }
          });
        });
      }
      return acc;
    }, {});

    // Adjust score based on emotional trend
    const dominantTrend = Object.entries(emotionalTrend)
      .sort(([,a], [,b]) => b - a)[0]?.[0];

    if (dominantTrend === dominantEmotion) {
      baseScore *= 0.9; // Persistent negative emotion
    }

    return {
      score: Math.max(1, Math.min(10, baseScore)),
      emotion: dominantEmotion,
      trend: dominantTrend
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
      type: 'chat',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Update activity count
    updateActivity('Chat');
    
    // Analyze sentiment and update mood with emotional context
    const moodAnalysis = analyzeSentiment(input, messages);
    
    // Update mood history with emotional context
    setMoodHistory(prev => {
      const newEntry = {
        score: moodAnalysis.score,
        emotion: moodAnalysis.emotion,
        timestamp: new Date().toISOString(),
        patterns: moodAnalysis.patterns
      };
      const newHistory = [...prev, newEntry];
      localStorage.setItem('moodHistory', JSON.stringify(newHistory));
      return newHistory;
    });
    
    // Update overall mood
    updateMood(moodAnalysis.score);

    try {
      const response = await generateResponse(input, messages);
      const botMessage = {
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        type: 'chat',
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Add chat activity
      addActivity({
        type: 'chat',
        message: 'Completed a therapy session',
        time: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ 
      height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)', md: '100vh' }, 
      display: 'flex', 
      flexDirection: 'column', 
      p: { xs: 1, sm: 2, md: 3 },
      maxWidth: '100%',
      margin: '0 auto',
    }}>
      <div className="matrix-bg" />
      
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Share Tech Mono',
          color: 'var(--neon-green)',
          mb: 3,
          textAlign: 'center',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}
      >
        ai therapy chat
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        height: 'calc(100% - 100px)',
        maxWidth: { sm: '900px', md: '1200px', lg: '1400px' },
        mx: 'auto',
        width: '100%',
      }}>
        {/* Chat Container */}
        <Card
          sx={{
            flex: 1,
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--neon-green)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Messages Area */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: { xs: 1, sm: 2 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '100%',
                }}
              >
                <Card
                  sx={{
                    maxWidth: { xs: '85%', sm: '70%' },
                    background: message.sender === 'user'
                      ? 'rgba(var(--neon-blue-rgb), 0.2)'
                      : 'rgba(var(--neon-green-rgb), 0.2)',
                    border: `1px solid ${
                      message.sender === 'user'
                        ? 'var(--neon-blue)'
                        : 'var(--neon-green)'
                    }`,
                    p: { xs: 1, sm: 2 },
                  }}
                >
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {message.sender === 'bot' ? (
                        <BrainIcon sx={{ color: 'var(--neon-green)', fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                      ) : (
                        <CPUIcon sx={{ color: 'var(--neon-blue)', fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                      )}
                      <Typography
                        sx={{
                          fontFamily: 'Share Tech Mono',
                          color: message.sender === 'user'
                            ? 'var(--neon-blue)'
                            : 'var(--neon-green)',
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                        }}
                      >
                        {message.sender === 'user' ? 'you' : 'ai bestie'}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: 'Fira Code',
                        color: '#fff',
                        whiteSpace: 'pre-wrap',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        wordBreak: 'break-word',
                      }}
                    >
                      {message.text}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Share Tech Mono',
                        color: '#666',
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                      }}
                    >
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Stack>
                </Card>
              </Box>
            ))}
            {isLoading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
                <CircularProgress size={20} sx={{ color: 'var(--neon-green)' }} />
                <Typography
                  sx={{
                    fontFamily: 'Share Tech Mono',
                    color: 'var(--neon-green)',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  {loadingMessage}
                </Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Box sx={{ p: { xs: 1, sm: 2 }, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="spill the tea bestie..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    fontFamily: 'Fira Code',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    '& fieldset': {
                      borderColor: 'var(--neon-green)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--neon-blue)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--neon-pink)',
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                sx={{
                  color: 'var(--neon-green)',
                  '&:hover': {
                    color: 'var(--neon-blue)',
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Card>

        {/* Mood Board */}
        <Box sx={{ 
          width: '280px',
          display: { xs: 'none', md: 'block' },
        }}>
          <MoodBoard moodHistory={moodHistory} messages={messages} />
        </Box>
      </Box>
    </Box>
  );
};

export default AiChat; 
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  IconButton,
  Typography,
  Stack,
  Button,
  Collapse,
  Fade,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  LinearProgress,
  Grid,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Avatar,
  AvatarGroup,
  Divider,
  Drawer,
  Badge,
  Zoom,
} from '@mui/material';
import {
  Send as SendIcon,
  SentimentVeryDissatisfied as SadIcon,
  SentimentVerySatisfied as HappyIcon,
  Favorite as HeartIcon,
  Psychology as TherapyIcon,
  CheckCircle as CheckIcon,
  LocalHospital as MedicalIcon,
  SelfImprovement as MeditateIcon,
  EmojiObjects as InsightIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Lightbulb as InsightIcon,
  Celebration as CelebrationIcon,
  EmojiEmotions as EmotionIcon,
  Spa as RelaxIcon,
  Psychology as ThinkingIcon,
  Refresh as ResetIcon,
  Favorite as LoveIcon,
  Mood as MoodIcon,
  Timer as TimerIcon,
  Insights as InsightsIcon,
  Fingerprint as PersonalityIcon,
  Group as SocialIcon,
  School as LearningIcon,
  Bolt as EnergyIcon,
  WbSunny as PositiveIcon,
  NightsStay as RestIcon,
  Palette as CreativeIcon,
  Nature as NatureIcon,
  Pets as AnimalIcon,
  MusicNote as MusicIcon,
  Brush as ArtIcon,
  LocalCafe as CafeIcon,
  Restaurant as FoodIcon,
  Hiking as OutdoorIcon,
  LocalFireDepartment as LocalFireDepartmentIcon,
} from '@mui/icons-material';
import { useData } from '../context/DataContext';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// Sentiment thresholds
const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'want to die', 'end it all', 'better off dead',
  'no reason to live', 'can\'t take it', 'give up', 'hopeless'
];

const SEVERE_NEGATIVE_KEYWORDS = [
  'depressed', 'anxiety', 'panic', 'worthless', 'hate myself',
  'alone', 'scared', 'trapped', 'overwhelmed', 'exhausted'
];

// Enhanced coping strategies with more specific categories
const COPING_STRATEGIES = {
  anxiety: [
    "let's try some grounding exercises together:\n1. take 5 deep breaths\n2. name 5 things u can see\n3. 4 things u can touch\n4. 3 things u can hear\n5. 2 things u can smell\n6. 1 thing u can taste\nwanna try this rn?",
    "here's a quick anxiety hack: try the 4-7-8 breathing technique:\n1. breathe in for 4 seconds\n2. hold for 7 seconds\n3. exhale for 8 seconds\nlets do it together bestie!",
    "when anxiety hits, try this:\n1. put on ur fav comfort show\n2. wrap urself in a cozy blanket\n3. hold something cold (ice cube works gr8)\n4. focus on the physical sensation\nwhich one sounds good rn?",
    "lets try progressive muscle relaxation:\n1. tense ur shoulders (5s)\n2. release & feel the calm (10s)\n3. move to ur arms\n4. then legs\n5. finally ur whole body\nready to try?",
    "anxiety grounding technique:\n1. put on noise-canceling headphones\n2. find a comfy spot\n3. place hand on ur chest\n4. breathe with this pattern: ⬆️4s ⏸️4s ⬇️4s\nshall we?",
    "quick anxiety relief:\n1. run cold water over ur wrists\n2. count backward from 100 by 7s\n3. name 5 random objects u see\n4. describe their details\nwhich step first?"
  ],
  depression: [
    "lets build ur energy back up with tiny wins:\n1. open a window for fresh air\n2. drink some water\n3. change into fresh clothes\nwhich one feels doable rn?",
    "here's a 5-min mood boost routine:\n1. put on ur fav upbeat song\n2. stretch ur arms up high\n3. dance or move for just 1 song\nwanna try it together?",
    "depression is tough fr fr, but lets try:\n1. text one friend or family member\n2. do one small act of self-care\n3. set one tiny goal for today\nwhich feels most manageable?",
    "5-minute energy boost:\n1. open spotify/music app\n2. play ur most upbeat song\n3. move/dance for just 30 secs\n4. gradually increase to full song\nwanna pick a song?",
    "depression-fighting routine:\n1. take a 5-min hot shower\n2. put on clean comfy clothes\n3. make ur fav warm drink\n4. sit by natural light\nwhich feels most doable?",
    "tiny task challenge:\n1. pick the smallest task (literally anything)\n2. break it into 3 micro-steps\n3. do just step 1\n4. celebrate that win!\nwhat tiny task should we tackle?"
  ],
  stress: [
    "time for a quick stress reset:\n1. shake out ur hands\n2. roll ur shoulders\n3. stretch ur neck\n4. take 3 deep breaths\nlets do it rn bestie!",
    "here's a 5-min stress buster:\n1. put on calming lofi beats\n2. close ur eyes\n3. imagine ur fav peaceful place\n4. breathe slowly\nwanna try?",
    "stress relief speedrun:\n1. drink cold water\n2. step outside for 2 mins\n3. listen to ur fav song\nwhich one first?",
    "desk stress relief:\n1. roll shoulders 5x backward\n2. gentle neck stretches\n3. finger + wrist rolls\n4. take a deep breath each time\nlets do it together!",
    "quick stress reset:\n1. put on rain sounds\n2. close eyes 30 secs\n3. imagine ur fav place\n4. take 3 slow breaths there\nready to try?",
    "stress relief visualization:\n1. picture a protective bubble\n2. make it ur fav color\n3. watch stress bounce off\n4. feel safe inside\nwhat color is ur bubble?"
  ],
  overwhelm: [
    "lets break it down bestie:\n1. grab paper + pen\n2. list 3 things stressing u most\n3. pick the smallest one\n4. break it into tiny steps\nwanna do this together?",
    "overwhelm rescue plan:\n1. close ur eyes\n2. count to 10 slowly\n3. name one thing u can handle rn\n4. focus just on that\nshall we try?",
    "quick overwhelm reset:\n1. put phone on silent\n2. set a 10-min timer\n3. focus on just one small task\nwhich task should we tackle?",
    "brain dump technique:\n1. grab notes app/paper\n2. set 2-min timer\n3. write EVERYTHING stressing u\n4. mark top 3 priorities\nwanna start the timer?",
    "overwhelm cleanup:\n1. clear ur immediate space\n2. put phone on DND\n3. close extra browser tabs\n4. focus on ONE thing\nready to declutter?",
    "5-4-3-2-1 priority method:\n1. list 5 tasks stressing u\n2. pick 4 to postpone\n3. break down 3 steps\n4. choose 2 resources needed\n5. start 1 small part\nshall we begin?"
  ],
  sleep: [
    "bedtime wind-down:\n1. dim lights/use blue light filter\n2. do 4-7-8 breathing\n3. progressive muscle relaxation\n4. imagine peaceful scene\nready for better sleep?",
    "sleep prep routine:\n1. set calming alarm for tmrw\n2. write 3 things ur grateful for\n3. put devices on silent\n4. gentle stretches\nwhich step first?",
    "cant sleep rescue plan:\n1. get up, change location\n2. dim lights, soft music\n3. light reading/puzzle\n4. return to bed when sleepy\nwanna try?"
  ],
  anger: [
    "anger cooldown:\n1. step away if safe\n2. punch pillow/squeeze stress ball\n3. loud exhales x5\n4. write angry thoughts\nwhich would help rn?",
    "rage release safely:\n1. scream into pillow\n2. tear paper/bubble wrap\n3. stomp/march in place\n4. shake it out\nlets release safely!",
    "anger to calm:\n1. count to 10 in diff languages\n2. drink ice cold water\n3. name opposites (hot/cold)\n4. tense & release fists\nready to try?"
  ]
};

// Enhanced solution prompts with more specific actions
const SOLUTION_PROMPTS = {
  positive: [
    "love that energy bestie! wanna explore some ways to:\n1. maintain this vibe\n2. document these good feels\n3. spread the positivity?\nwhich one interests u?",
    "ur thriving rn! lets:\n1. identify what's working\n2. create a good vibes playlist\n3. plan something fun\nwhat sounds good?",
    "we love to see u winning! should we:\n1. celebrate this moment\n2. plan more good times\n3. share with ur support squad?\npick ur fav!"
  ],
  negative: [
    "sending u support bestie! would u like to:\n1. try a quick mood boost exercise\n2. talk through what's bothering u\n3. learn some coping strategies\nwhat feels right?",
    "its ok to not be ok! lets:\n1. do a grounding exercise\n2. find a distraction activity\n3. make an action plan\nwhich would help most?",
    "im here for u fr fr! should we:\n1. practice self-care together\n2. problem-solve the situation\n3. find professional resources\nwhat do u need rn?"
  ],
  neutral: [
    "lets make today better! wanna:\n1. set some smol goals\n2. try a mood-lifting activity\n3. explore new interests\nwhich one vibes with u?",
    "how about we:\n1. do a quick energy check\n2. find something fun to do\n3. plan something to look forward to\nwhat interests u?",
    "lets level up ur day! should we:\n1. try something new\n2. work on personal growth\n3. find ways to feel more alive\nwhich speaks to u?"
  ],
  severe_negative: [
    "ur feelings r valid & im worried abt u. lets:\n1. call/text a trusted friend\n2. try a grounding exercise\n3. explore professional help\nwhat feels safe rn?",
    "taking this srsly bestie. would u:\n1. check crisis resources\n2. call warmline (not crisis)\n3. try guided meditation\nwhich feels ok?",
    "ur not alone in this fr fr. can we:\n1. list safe people to talk to\n2. make a comfort playlist\n3. create a safety plan\nwhat works?"
  ]
};

// Add mood tracking
const MOOD_SCALE = {
  crisis: 1,
  severe_negative: 2,
  negative: 3,
  neutral: 4,
  positive: 5
};

// Add interactive exercises
const INTERACTIVE_EXERCISES = {
  breathing: {
    title: "4-7-8 Breathing",
    steps: [
      "Breathe in (4s)",
      "Hold (7s)",
      "Exhale (8s)",
      "Pause (1s)"
    ],
    duration: 20000 // 20 seconds per cycle
  },
  grounding: {
    title: "5-4-3-2-1 Grounding",
    steps: [
      "Name 5 things you can see",
      "Name 4 things you can touch",
      "Name 3 things you can hear",
      "Name 2 things you can smell",
      "Name 1 thing you can taste"
    ],
    duration: 30000
  },
  muscleRelaxation: {
    title: "Progressive Relaxation",
    steps: [
      "Tense shoulders (5s)",
      "Release shoulders (5s)",
      "Tense arms (5s)",
      "Release arms (5s)",
      "Tense legs (5s)",
      "Release legs (5s)"
    ],
    duration: 30000
  },
  visualization: {
    title: "Peaceful Place Visualization",
    steps: [
      "Close your eyes gently",
      "Picture your safe place",
      "Notice the colors there",
      "Feel the temperature",
      "Hear the peaceful sounds",
      "Breathe in the scents",
      "Feel completely safe",
      "Stay here as long as needed"
    ],
    duration: 40000
  },
  gratitude: {
    title: "Gratitude Practice",
    steps: [
      "Think of something small you're grateful for",
      "Picture it clearly in your mind",
      "Feel the appreciation grow",
      "Send thanks to this thing/person",
      "Notice how gratitude feels"
    ],
    duration: 25000
  },
  bodyPositivity: {
    title: "Body Appreciation",
    steps: [
      "Thank your feet for carrying you",
      "Appreciate your hands' abilities",
      "Thank your heart for beating",
      "Appreciate your mind's power",
      "Send love to your whole self"
    ],
    duration: 25000
  },
  energyShift: {
    title: "Energy Reset",
    steps: [
      "Shake out your hands",
      "Roll your shoulders",
      "Gentle neck stretches",
      "Small jump or bounce",
      "Take a power breath",
      "Smile (even tiny)",
    ],
    duration: 30000
  },
  mindfulWalking: {
    title: "Mindful Walking",
    steps: [
      "Stand up if you can",
      "Notice your feet on ground",
      "Take slow mindful steps",
      "Feel each movement",
      "Notice balance shifts",
      "Breathe naturally",
      "Continue mindful steps"
    ],
    duration: 35000
  },
  soundAwareness: {
    title: "Sound Meditation",
    steps: [
      "Find a quiet space",
      "Close your eyes gently",
      "Notice distant sounds",
      "Notice close sounds",
      "Notice inner sounds",
      "Let sounds come & go",
      "Open eyes slowly"
    ],
    duration: 30000
  },
  selfCompassion: {
    title: "Self-Compassion Break",
    steps: [
      "Acknowledge difficulty",
      "This is a moment of struggle",
      "Struggle is human",
      "May I be kind to myself",
      "Send yourself comfort",
      "Feel the warmth",
      "You're doing your best"
    ],
    duration: 35000
  },
  thoughtDefusion: {
    title: "Thought Defusion",
    steps: [
      "Notice a thought",
      "See it as just words",
      "Put 'I'm having the thought that...'",
      "Watch it float by",
      "It's just a thought",
      "Not necessarily true",
      "Let it pass"
    ],
    duration: 30000
  },
  energyGrounding: {
    title: "Energy Grounding",
    steps: [
      "Feel energy in hands",
      "Rub hands together",
      "Create warmth & tingling",
      "Place on heart",
      "Send care to self",
      "Feel the connection",
      "Breathe with hands"
    ],
    duration: 30000
  },
  artTherapy: {
    title: "Creative Expression",
    steps: [
      "Grab paper/drawing app",
      "Choose colors that match feelings",
      "Draw without judgment",
      "Let emotions flow",
      "Add details freely",
      "Notice the process",
      "Title your creation"
    ],
    duration: 40000
  },
  natureMindfulness: {
    title: "Nature Connection",
    steps: [
      "Find/imagine nature spot",
      "Notice natural colors",
      "Feel air/temperature",
      "Listen to nature sounds",
      "Smell natural scents",
      "Connect with elements",
      "Feel grounded here"
    ],
    duration: 35000
  },
  animalBonding: {
    title: "Pet/Animal Connection",
    steps: [
      "Be with/imagine pet",
      "Notice their presence",
      "Feel their energy",
      "Share gentle moment",
      "Express care/gratitude",
      "Receive their support",
      "Feel the connection"
    ],
    duration: 30000
  },
  musicHealing: {
    title: "Music Therapy",
    steps: [
      "Choose calming song",
      "Focus on melody",
      "Feel the rhythm",
      "Notice emotions rise",
      "Move if you want",
      "Let music hold you",
      "Breathe with sound"
    ],
    duration: 35000
  },
  comfortFood: {
    title: "Mindful Eating",
    steps: [
      "Choose comfort food/drink",
      "Notice its appearance",
      "Smell the aroma",
      "Take mindful bite/sip",
      "Feel the texture",
      "Taste fully",
      "Appreciate nourishment"
    ],
    duration: 30000
  }
};

const FOLLOW_UP_QUESTIONS = {
  anxiety: [
    "how long have u been feeling anxious?",
    "what usually triggers ur anxiety?",
    "have u tried any breathing exercises before?"
  ],
  depression: [
    "when did u start feeling this way?",
    "what usually helps lift ur mood?",
    "have u talked to anyone else about this?"
  ],
  stress: [
    "whats the biggest source of stress rn?",
    "how does stress usually show up for u?",
    "what helps u relax usually?"
  ],
  overwhelm: [
    "whats contributing most to feeling overwhelmed?",
    "what could u take off ur plate rn?",
    "who could help u with some of this?"
  ]
};

// Add more emotion categories
const EMOTION_CATEGORIES = {
  ...COPING_STRATEGIES,
  grief: [
    "processing grief together:\n1. light a candle/memorial\n2. write a letter to express feelings\n3. look at photos if ur ready\n4. take deep breaths between\nwhich feels right?",
    "gentle grief support:\n1. create a memory box\n2. share a story/memory\n3. do something they loved\n4. honor ur feelings\nwhat resonates?",
    "grief comfort routine:\n1. find a quiet space\n2. hold something meaningful\n3. allow any emotions\n4. practice self-compassion\nshall we try?"
  ],
  loneliness: [
    "connection builders:\n1. text one friend rn\n2. join an online community\n3. plan a virtual hangout\n4. share a meme/story\nwhich one first?",
    "self-connection practice:\n1. write urself a kind note\n2. do a hobby u love\n3. create something\n4. practice self-date ideas\nwhat sounds good?",
    "digital connection time:\n1. join a discord server\n2. comment on shared interests\n3. schedule online game night\n4. reach out to old friend\nready to try?"
  ],
  confidence: [
    "confidence boosters:\n1. list 3 recent wins\n2. power pose 2 mins\n3. wear something that slays\n4. positive self-talk\nlets start!",
    "self-worth builders:\n1. write ur strengths\n2. set a small challenge\n3. celebrate completion\n4. share ur win\nwhich first?",
    "confidence practice:\n1. mirror affirmations\n2. record achievements\n3. help someone else\n4. learn something new\nwhat appeals?"
  ],
  frustration: [
    "frustration release:\n1. punch a pillow safely\n2. scribble aggressively\n3. tear paper/bubble wrap\n4. stomp or march\nwhich feels right?",
    "frustration transform:\n1. list what u can control\n2. take a quick movement break\n3. express it creatively\n4. problem-solve one thing\nwhere should we start?",
    "frustration cooldown:\n1. count backward from 20\n2. squeeze & release fists\n3. write it all out\n4. take space if needed\nwhat works for u?"
  ],
  shame: [
    "shame release work:\n1. 'im human & learning'\n2. share with safe person\n3. practice self-forgiveness\n4. challenge inner critic\nlets try together?",
    "shame healing:\n1. write compassion letter\n2. list ur growth moments\n3. remember ur worth\n4. be ur own bestie\nwhich resonates?",
    "shame transformation:\n1. identify shame trigger\n2. question its truth\n3. find evidence against it\n4. rewrite the story\nready to explore?"
  ],
  jealousy: [
    "jealousy reframe:\n1. list ur unique qualities\n2. focus on ur journey\n3. celebrate others wins\n4. plan ur next step\nwhich helps most?",
    "jealousy release:\n1. write the feeling out\n2. find inspiration in it\n3. set personal goals\n4. practice gratitude\nwhere to start?",
    "jealousy transform:\n1. examine the trigger\n2. what it says about ur dreams\n3. make action plan\n4. focus on ur path\nshall we begin?"
  ],
  burnout: [
    "burnout recovery:\n1. identify energy drains\n2. set tiny boundaries\n3. add micro-breaks\n4. assess priorities\nwhat feels doable?",
    "burnout healing:\n1. permission to rest\n2. delegate if possible\n3. simplify tasks\n4. add joy moments\nwhich one first?",
    "burnout prevention:\n1. schedule rest time\n2. identify early signs\n3. protect ur energy\n4. ask for support\nlets plan this!"
  ],
  excitement: [
    "excitement channel:\n1. share with supporter\n2. plan next steps\n3. capture the feeling\n4. use the energy\nwhat sounds fun?",
    "excitement amplify:\n1. celebrate small wins\n2. spread good vibes\n3. document the moment\n4. build momentum\nlets maximize this!",
    "excitement ground:\n1. deep happy breaths\n2. present moment joy\n3. gratitude pause\n4. mindful celebration\nready to savor?"
  ],
  creative_block: [
    "creativity unlock:\n1. free write 2 mins\n2. doodle randomly\n3. change environment\n4. play with colors\nwhich sparks joy?",
    "inspiration boost:\n1. browse art/music\n2. take inspiration walk\n3. mix random things\n4. play like a kid\nwhere to start?",
    "creative flow:\n1. set timer for play\n2. no judgment zone\n3. try new medium\n4. combine ideas\nready to explore?"
  ],
  imposter_syndrome: [
    "imposter feels:\n1. list ur real wins\n2. read past feedback\n3. share with friend\n4. challenge those thoughts\nlets tackle this!",
    "confidence rebuild:\n1. document ur journey\n2. celebrate small wins\n3. remember ur growth\n4. gather evidence\nwhich helps most?",
    "worth reminder:\n1. ur here for a reason\n2. everyone starts somewhere\n3. ur learning & growing\n4. ur path is valid\nlets reinforce this!"
  ],
  seasonal_mood: [
    "seasonal support:\n1. light therapy lamp\n2. vitamin d check\n3. cozy space setup\n4. routine refresh\nwhat sounds good?",
    "winter wellness:\n1. morning light time\n2. movement snacks\n3. social connection\n4. comfort activities\nlets plan this!",
    "season shift care:\n1. adjust sleep schedule\n2. plan indoor joy\n3. mood-boosting foods\n4. light exposure\nwhere to start?"
  ],
  decision_paralysis: [
    "decision unlock:\n1. pros/cons list\n2. gut check pause\n3. future self check\n4. tiny step forward\nwhich method first?",
    "choice clarity:\n1. remove options\n2. set time limit\n3. phone a friend\n4. test drive choice\nlets try one!",
    "decision ease:\n1. what matters most?\n2. whats reversible?\n3. quick gut check\n4. small experiment\nready to explore?"
  ],
  motivation_dip: [
    "motivation spark:\n1. tiny win first\n2. reward setup\n3. accountability buddy\n4. progress tracker\nwhat works for u?",
    "energy boost:\n1. change location\n2. music/podcast on\n3. 5min starting rule\n4. break it smaller\nlets get moving!",
    "momentum build:\n1. visualize done feel\n2. set mini timer\n3. stack with fun thing\n4. progress photo\nwhich helps most?"
  ]
};

// Add mood tracking visualization data
const MOOD_COLORS = {
  crisis: '#ff1744',
  severe_negative: '#ff4081',
  negative: '#7c4dff',
  neutral: '#29b6f6',
  positive: '#00e676'
};

const MOOD_EMOJIS = {
  crisis: '😰',
  severe_negative: '😢',
  negative: '😕',
  neutral: '😐',
  positive: '😊'
};

// Progress tracking categories
const PROGRESS_CATEGORIES = {
  coping_skills: {
    icon: <MeditateIcon />,
    label: 'Coping Skills Used'
  },
  mood_improvement: {
    icon: <EmotionIcon />,
    label: 'Mood Changes'
  },
  exercise_completion: {
    icon: <CheckIcon />,
    label: 'Exercises Done'
  },
  engagement: {
    icon: <InsightIcon />,
    label: 'Chat Sessions'
  }
};

// Enhanced mood tracking
const MOOD_TRACKING = {
  dimensions: {
    energy: {
      label: 'Energy Level',
      icon: <EnergyIcon />,
      range: ['Depleted', 'Low', 'Moderate', 'Energized', 'High'],
    },
    outlook: {
      label: 'Outlook',
      icon: <PositiveIcon />,
      range: ['Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive'],
    },
    social: {
      label: 'Social Connection',
      icon: <SocialIcon />,
      range: ['Isolated', 'Distant', 'Connected', 'Supported', 'Deeply Connected'],
    },
    growth: {
      label: 'Personal Growth',
      icon: <LearningIcon />,
      range: ['Stuck', 'Small Steps', 'Progress', 'Growing', 'Thriving'],
    },
    creativity: {
      label: 'Creative Flow',
      icon: <CreativeIcon />,
      range: ['Blocked', 'Limited', 'Flowing', 'Inspired', 'Peak'],
    },
    nature: {
      label: 'Nature Connection',
      icon: <NatureIcon />,
      range: ['Disconnected', 'Minimal', 'Connected', 'Immersed', 'One with Nature'],
    },
    physical: {
      label: 'Body Awareness',
      icon: <SelfImprovement />,
      range: ['Disconnected', 'Tense', 'Neutral', 'Comfortable', 'Embodied'],
    },
    purpose: {
      label: 'Sense of Purpose',
      icon: <InsightIcon />,
      range: ['Lost', 'Questioning', 'Stable', 'Clear', 'Inspired'],
    }
  },
  patterns: {
    upward: 'Consistent improvement 📈',
    downward: 'Needs attention 📉',
    stable: 'Maintaining well 📊',
    variable: 'Normal fluctuation 🔄'
  },
  activities: {
    creative: {
      icon: <ArtIcon />,
      label: 'Creative Expression',
      benefits: ['Stress Relief', 'Self-Discovery', 'Joy']
    },
    nature: {
      icon: <OutdoorIcon />,
      label: 'Nature Time',
      benefits: ['Grounding', 'Peace', 'Connection']
    },
    comfort: {
      icon: <CafeIcon />,
      label: 'Comfort Activities',
      benefits: ['Soothing', 'Pleasure', 'Care']
    },
    nourish: {
      icon: <FoodIcon />,
      label: 'Nourishment',
      benefits: ['Energy', 'Health', 'Balance']
    }
  }
};

// Enhanced progress metrics
const PROGRESS_METRICS = {
  ...PROGRESS_CATEGORIES,
  response_time: {
    icon: <TimerIcon />,
    label: 'Response Speed',
    description: 'How quickly you engage with exercises'
  },
  strategy_variety: {
    icon: <InsightsIcon />,
    label: 'Strategy Diversity',
    description: 'Different techniques tried'
  },
  consistency: {
    icon: <CheckIcon />,
    label: 'Practice Consistency',
    description: 'Regular engagement'
  },
  growth_indicators: {
    icon: <PersonalityIcon />,
    label: 'Growth Markers',
    description: 'Personal development signs'
  },
  rest_quality: {
    icon: <RestIcon />,
    label: 'Rest & Recovery',
    description: 'Balance of activity and rest'
  },
  creative_expression: {
    icon: <ArtIcon />,
    label: 'Creative Outlets',
    description: 'Using art, music, writing for healing'
  },
  nature_connection: {
    icon: <NatureIcon />,
    label: 'Nature Connection',
    description: 'Time spent in/with nature'
  },
  comfort_activities: {
    icon: <CafeIcon />,
    label: 'Comfort Practice',
    description: 'Self-soothing activities'
  },
  physical_awareness: {
    icon: <SelfImprovement />,
    label: 'Body Connection',
    description: 'Embodiment practices'
  }
};

// Add mood prediction patterns
const MOOD_PREDICTION_PATTERNS = {
  positive: {
    keywords: ['happy', 'excited', 'great', 'amazing', 'love', 'wonderful', 'blessed', 'grateful', 'good', 'better'],
    emojis: ['😊', '🌟', '✨', '💖', '🎉'],
    color: '#00e676'
  },
  negative: {
    keywords: ['sad', 'upset', 'tired', 'exhausted', 'stressed', 'worried', 'anxious', 'frustrated', 'bad', 'worse'],
    emojis: ['😔', '😢', '😞', '😫', '😩'],
    color: '#7c4dff'
  },
  angry: {
    keywords: ['angry', 'mad', 'furious', 'annoyed', 'irritated', 'rage', 'hate', 'unfair', 'ugh', 'ugh'],
    emojis: ['😠', '😡', '💢', '🤬', '😤'],
    color: '#ff1744'
  },
  anxious: {
    keywords: ['nervous', 'panic', 'worry', 'scared', 'fear', 'stress', 'overthinking', 'cant', 'help', 'what if'],
    emojis: ['😰', '😨', '😱', '😣', '😖'],
    color: '#ff4081'
  },
  neutral: {
    keywords: ['okay', 'fine', 'alright', 'meh', 'whatever', 'normal', 'idk', 'dunno', 'maybe', 'guess'],
    emojis: ['😐', '🤔', '😶', '😕', '🤷'],
    color: '#29b6f6'
  }
};

const ChatBot = () => {
  const { updateActivity, addActivity } = useData();
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [
      {
        type: 'bot',
        content: 'hey bestie! im here to listen and support u fr fr. how r u feeling today?',
        sentiment: 'neutral',
      }
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisInfo, setShowCrisisInfo] = useState(false);
  const [userMoodState, setUserMoodState] = useState('neutral');
  const messagesEndRef = useRef(null);
  const [exerciseActive, setExerciseActive] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [exerciseStep, setExerciseStep] = useState(0);
  const [exerciseProgress, setExerciseProgress] = useState(0);
  const [showMoodRating, setShowMoodRating] = useState(false);
  const [moodRating, setMoodRating] = useState(3);
  const [userResponses, setUserResponses] = useState({});
  const [showProgress, setShowProgress] = useState(false);
  const [progressTimeframe, setProgressTimeframe] = useState('week');
  const [showExerciseMenu, setShowExerciseMenu] = useState(false);
  const [progressStats, setProgressStats] = useState({
    coping_skills: 0,
    mood_improvement: 0,
    exercise_completion: 0,
    engagement: 0
  });

  // Track conversation context
  const [conversationContext, setConversationContext] = useState({
    lastMoodType: null,
    strategiesUsed: [],
    moodHistory: [],
    lastInteraction: null
  });

  const [moodDimensions, setMoodDimensions] = useState({
    energy: 3,
    outlook: 3,
    social: 3,
    growth: 3
  });
  const [showMoodDetails, setShowMoodDetails] = useState(false);
  const [extendedStats, setExtendedStats] = useState({
    response_time: [],
    strategy_variety: new Set(),
    consistency_streak: 0,
    growth_markers: [],
    rest_periods: []
  });

  const [activityLog, setActivityLog] = useState({
    creative: [],
    nature: [],
    comfort: [],
    nourish: []
  });

  const [moodBoard, setMoodBoard] = useState({
    visible: true,
    predictedMood: 'neutral',
    confidence: 0,
    recentMoods: [],
    moodStreak: 0
  });

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (exerciseActive && currentExercise) {
      const timer = setInterval(() => {
        setExerciseProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setExerciseStep(prevStep => {
              if (prevStep >= currentExercise.steps.length - 1) {
                setExerciseActive(false);
                setShowMoodRating(true);
                return 0;
              }
              return prevStep + 1;
            });
            return 0;
          }
          return newProgress;
        });
      }, currentExercise.duration / 100);

      return () => clearInterval(timer);
    }
  }, [exerciseActive, currentExercise]);

  // Track exercise completion
  useEffect(() => {
    if (exerciseActive === false && currentExercise) {
      setProgressStats(prev => ({
        ...prev,
        exercise_completion: prev.exercise_completion + 1
      }));
    }
  }, [exerciseActive, currentExercise]);

  // Track mood improvements
  useEffect(() => {
    const recentMoods = conversationContext.moodHistory.slice(-2);
    if (recentMoods.length === 2 && recentMoods[1].rating > recentMoods[0].rating) {
      setProgressStats(prev => ({
        ...prev,
        mood_improvement: prev.mood_improvement + 1
      }));
    }
  }, [conversationContext.moodHistory]);

  // Track response times
  useEffect(() => {
    if (messages.length >= 2) {
      const lastResponse = new Date(messages[messages.length - 1].timestamp);
      const prevMessage = new Date(messages[messages.length - 2].timestamp);
      const responseTime = lastResponse - prevMessage;
      
      setExtendedStats(prev => ({
        ...prev,
        response_time: [...prev.response_time, responseTime]
      }));
    }
  }, [messages]);

  // Track strategy variety
  useEffect(() => {
    if (currentExercise) {
      setExtendedStats(prev => ({
        ...prev,
        strategy_variety: new Set([...prev.strategy_variety, currentExercise.title])
      }));
    }
  }, [currentExercise]);

  const analyzeSentiment = (text) => {
    const lowerText = text.toLowerCase();
    
    // Check for crisis keywords first
    if (CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword))) {
      return 'crisis';
    }
    
    // Check for severe negative sentiment
    if (SEVERE_NEGATIVE_KEYWORDS.some(keyword => lowerText.includes(keyword))) {
      return 'severe_negative';
    }
    
    // Basic sentiment analysis
    const positiveWords = ['happy', 'good', 'great', 'awesome', 'amazing', 'love', 'excited', 'blessed', 'grateful'];
    const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'worried', 'stressed', 'tired', 'upset'];
    
    let score = 0;
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) score += 1;
    });
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) score -= 1;
    });
    
    if (score > 0) return 'positive';
    if (score < 0) return 'negative';
    return 'neutral';
  };

  const identifyMoodKeywords = (text) => {
    const lowerText = text.toLowerCase();
    
    if (CRISIS_KEYWORDS.some(word => lowerText.includes(word))) {
      return 'crisis';
    }
    
    const moodPatterns = {
      anxiety: ['anxious', 'nervous', 'panic', 'worry', 'stressed', 'overthinking'],
      depression: ['depressed', 'sad', 'hopeless', 'empty', 'tired', 'lonely'],
      stress: ['stressed', 'pressure', 'overwhelmed', 'too much', 'cant handle'],
      overwhelm: ['overwhelmed', 'too much', 'cant cope', 'drowning', 'exhausted']
    };

    for (const [mood, patterns] of Object.entries(moodPatterns)) {
      if (patterns.some(pattern => lowerText.includes(pattern))) {
        return mood;
      }
    }

    return null;
  };

  const startExercise = (exerciseType) => {
    setCurrentExercise(INTERACTIVE_EXERCISES[exerciseType]);
    setExerciseActive(true);
    setExerciseStep(0);
    setExerciseProgress(0);
  };

  const handleMoodRating = (rating) => {
    setMoodRating(rating);
    setShowMoodRating(false);
    
    // Update conversation context
    setConversationContext(prev => ({
      ...prev,
      moodHistory: [...prev.moodHistory, { rating, timestamp: new Date() }]
    }));

    // Generate appropriate response based on rating change
    const response = generateMoodProgressResponse(rating);
    setMessages(prev => [...prev, {
      type: 'bot',
      content: response,
      sentiment: 'supportive',
      timestamp: new Date().toISOString()
    }]);
  };

  const generateMoodProgressResponse = (rating) => {
    const previousRating = conversationContext.moodHistory[conversationContext.moodHistory.length - 2]?.rating;
    
    if (!previousRating) return "thanks for sharing how ur feeling bestie! this helps me support u better 💚";
    
    if (rating > previousRating) {
      return "yass bestie! love to see that improvement! what helped u feel better? lets keep that energy! 🌟";
    } else if (rating < previousRating) {
      return "thanks for being honest bestie. its ok if things feel harder rn. wanna try something that might help? 💜";
    } else {
      return "thanks for checking in bestie! ur feelings r valid. wanna try something new to shift the energy? ✨";
    }
  };

  const generateResponse = (userMessage, sentiment) => {
    const moodType = identifyMoodKeywords(userMessage);
    
    // Update conversation context
    setConversationContext(prev => ({
      ...prev,
      lastMoodType: moodType,
      lastInteraction: new Date(),
      strategiesUsed: moodType ? [...prev.strategiesUsed, moodType] : prev.strategiesUsed
    }));

    // Crisis response with enhanced support
    if (sentiment === 'crisis') {
      setShowCrisisInfo(true);
      return {
        content: "im really concerned about what ur saying bestie. ur life matters & ur not alone in this. can we:\n1. call crisis support together (988)\n2. text crisis line (741741)\n3. contact someone u trust\n\nim here with u & want u to be safe. which option feels most doable rn?",
        sentiment: 'supportive',
        action: 'crisis',
        suggestions: ['Call 988', 'Text HOME to 741741', 'Contact trusted person']
      };
    }

    // Check conversation context for better responses
    const isRepeatMood = moodType === conversationContext.lastMoodType;
    const hasUsedStrategy = conversationContext.strategiesUsed.includes(moodType);

    if (moodType && COPING_STRATEGIES[moodType]) {
      const strategies = COPING_STRATEGIES[moodType];
      const followUps = FOLLOW_UP_QUESTIONS[moodType];
      
      // If user has already tried strategies for this mood, offer different support
      if (isRepeatMood && hasUsedStrategy) {
        return {
          content: "seems like ur still struggling with this bestie. would u like to:\n1. try a different approach\n2. talk to someone professional\n3. just have me listen\nwhat would help most rn?",
          sentiment: 'supportive',
          action: 'offer_alternatives',
          suggestions: ['Try new strategy', 'Find professional', 'Just listen']
        };
      }

      const strategy = strategies[Math.floor(Math.random() * strategies.length)];
      const followUp = followUps[Math.floor(Math.random() * followUps.length)];
      
      return {
        content: `${strategy}\n\n${followUp}`,
        sentiment: 'solution_focused',
        action: 'provide_strategy',
        suggestions: ['Start exercise', 'Try different strategy', 'Need more support']
      };
    }

    // Enhanced general responses
    const solutions = SOLUTION_PROMPTS[sentiment] || SOLUTION_PROMPTS.neutral;
    return {
      content: solutions[Math.floor(Math.random() * solutions.length)],
      sentiment,
      action: 'explore_solutions',
      suggestions: ['Try exercise', 'Talk more', 'Get resources']
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userSentiment = analyzeSentiment(input);
    setUserMoodState(userSentiment);

    // Add user message
    const userMessage = {
      type: 'user',
      content: input,
      sentiment: userSentiment,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Generate response with solutions
    setTimeout(() => {
      const response = generateResponse(input, userSentiment);
      
      setMessages(prev => [...prev, {
        type: 'bot',
        ...response,
        timestamp: new Date().toISOString(),
      }]);
      
      setIsTyping(false);

      // Track in analytics
      addActivity({
        type: 'chat',
        message: `Chat interaction - Sentiment: ${userSentiment}, Action: ${response.action}`,
        time: new Date().toISOString(),
      });
      updateActivity('Chat');
    }, 1000 + Math.random() * 1000);
  };

  const getMessageStyle = (type, sentiment) => {
    const baseStyle = {
      p: 2,
      borderRadius: 2,
      maxWidth: '80%',
      wordBreak: 'break-word',
    };

    if (type === 'user') {
      return {
        ...baseStyle,
        bgcolor: 'rgba(0, 255, 157, 0.1)',
        borderColor: 'var(--neon-green)',
        borderWidth: 1,
        borderStyle: 'solid',
        ml: 'auto',
      };
    }

    const botStyles = {
      crisis: {
        bgcolor: 'rgba(255, 113, 206, 0.1)',
        borderColor: 'var(--neon-pink)',
      },
      severe_negative: {
        bgcolor: 'rgba(255, 113, 206, 0.1)',
        borderColor: 'var(--neon-purple)',
      },
      positive: {
        bgcolor: 'rgba(0, 255, 157, 0.1)',
        borderColor: 'var(--neon-green)',
      },
      negative: {
        bgcolor: 'rgba(0, 183, 255, 0.1)',
        borderColor: 'var(--neon-blue)',
      },
      neutral: {
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        borderColor: '#666',
      },
    };

    return {
      ...baseStyle,
      ...botStyles[sentiment || 'neutral'],
      borderWidth: 1,
      borderStyle: 'solid',
      mr: 'auto',
    };
  };

  const handleProgressTimeframeChange = (event, newTimeframe) => {
    if (newTimeframe !== null) {
      setProgressTimeframe(newTimeframe);
    }
  };

  const getProgressData = () => {
    const now = new Date();
    const timeframes = {
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000
    };

    const filteredMoods = conversationContext.moodHistory.filter(mood => 
      (now - new Date(mood.timestamp)) <= timeframes[progressTimeframe]
    );

    return {
      moodTrend: filteredMoods.map(mood => ({
        value: mood.rating,
        time: new Date(mood.timestamp).toLocaleTimeString()
      })),
      strategiesUsed: conversationContext.strategiesUsed.length,
      exercisesCompleted: progressStats.exercise_completion,
      improvements: progressStats.mood_improvement
    };
  };

  // Enhanced progress dashboard with detailed mood tracking
  const renderProgressDashboard = () => {
    const data = getProgressData();
    
    return (
      <Dialog
        open={showProgress}
        onClose={() => setShowProgress(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          fontFamily: 'Share Tech Mono', 
          color: 'var(--neon-green)',
          borderBottom: '1px solid var(--neon-green)'
        }}>
          progress.tracker.exe
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <ToggleButtonGroup
              value={progressTimeframe}
              exclusive
              onChange={handleProgressTimeframeChange}
              sx={{ mb: 3 }}
            >
              <ToggleButton value="day" sx={{ fontFamily: 'Share Tech Mono' }}>
                24h
              </ToggleButton>
              <ToggleButton value="week" sx={{ fontFamily: 'Share Tech Mono' }}>
                7d
              </ToggleButton>
              <ToggleButton value="month" sx={{ fontFamily: 'Share Tech Mono' }}>
                30d
              </ToggleButton>
            </ToggleButtonGroup>

            <Grid container spacing={3}>
              {Object.entries(PROGRESS_CATEGORIES).map(([key, { icon, label }]) => (
                <Grid item xs={12} sm={6} md={3} key={key}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      background: 'rgba(0, 255, 157, 0.1)',
                      border: '1px solid var(--neon-green)',
                    }}
                  >
                    <Box sx={{ mb: 1 }}>{icon}</Box>
                    <Typography sx={{ fontFamily: 'Share Tech Mono' }}>
                      {label}
                    </Typography>
                    <Typography variant="h4" sx={{ fontFamily: 'Share Tech Mono', color: 'var(--neon-green)' }}>
                      {progressStats[key]}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ fontFamily: 'Share Tech Mono', mb: 2 }}>
                mood journey
              </Typography>
              <Box sx={{ height: 200, position: 'relative' }}>
                {data.moodTrend.map((mood, index) => (
                  <Tooltip title={`${mood.time}: ${mood.value}/5`} key={index}>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: `${(index / (data.moodTrend.length - 1)) * 100}%`,
                        bottom: `${(mood.value / 5) * 100}%`,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: 'var(--neon-green)',
                        transform: 'translate(-50%, 50%)',
                      }}
                    />
                  </Tooltip>
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />
            
            {/* Add mood details button */}
            <Button
              variant="outlined"
              onClick={() => setShowMoodDetails(true)}
              sx={{
                color: 'var(--neon-green)',
                borderColor: 'var(--neon-green)',
                mb: 3
              }}
            >
              <MoodIcon sx={{ mr: 1 }} />
              Detailed Mood Analysis
            </Button>
            
            {renderMoodRadar()}
            {renderActivityTimeline()}
          </Box>
        </DialogContent>
      </Dialog>
    );
  };

  // Add SpeedDial for quick access to exercises
  const renderExerciseMenu = () => (
    <SpeedDial
      ariaLabel="Exercise Menu"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
      open={showExerciseMenu}
      onOpen={() => setShowExerciseMenu(true)}
      onClose={() => setShowExerciseMenu(false)}
    >
      {Object.entries(INTERACTIVE_EXERCISES).map(([key, exercise]) => (
        <SpeedDialAction
          key={key}
          icon={getExerciseIcon(key)}
          tooltipTitle={exercise.title}
          onClick={() => {
            startExercise(key);
            setShowExerciseMenu(false);
          }}
        />
      ))}
    </SpeedDial>
  );

  const getExerciseIcon = (type) => {
    const icons = {
      breathing: <RelaxIcon />,
      grounding: <MeditateIcon />,
      muscleRelaxation: <MeditateIcon />,
      visualization: <ThinkingIcon />,
      gratitude: <LoveIcon />,
      bodyPositivity: <CelebrationIcon />,
      energyShift: <ResetIcon />
    };
    return icons[type] || <InsightIcon />;
  };

  // Enhanced visualization components
  const renderMoodRadar = () => {
    const data = Object.entries(moodDimensions).map(([key, value]) => ({
      dimension: MOOD_TRACKING.dimensions[key].label,
      value: value
    }));

    return (
      <Box sx={{ height: 300, width: '100%', mt: 4 }}>
        <Typography variant="h6" sx={{ fontFamily: 'Share Tech Mono', mb: 2 }}>
          mood.radar.exe
        </Typography>
        <ResponsiveContainer>
          <RadarChart data={data}>
            <PolarGrid stroke="var(--neon-green)" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: '#fff', fontSize: 12, fontFamily: 'Share Tech Mono' }}
            />
            <PolarRadiusAxis stroke="var(--neon-green)" />
            <Radar
              name="Current Mood"
              dataKey="value"
              stroke="var(--neon-green)"
              fill="var(--neon-green)"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  const renderActivityTimeline = () => {
    const now = new Date();
    const timeframeStart = new Date(now - (24 * 60 * 60 * 1000)); // Last 24 hours

    const data = Object.entries(activityLog).map(([category, timestamps]) => ({
      category: MOOD_TRACKING.activities[category].label,
      count: timestamps.filter(t => t > timeframeStart).length
    }));

    return (
      <Box sx={{ height: 200, width: '100%', mt: 4 }}>
        <Typography variant="h6" sx={{ fontFamily: 'Share Tech Mono', mb: 2 }}>
          activity.timeline.exe
        </Typography>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 157, 0.2)" />
            <XAxis
              dataKey="category"
              tick={{ fill: '#fff', fontSize: 12, fontFamily: 'Share Tech Mono' }}
            />
            <YAxis tick={{ fill: '#fff' }} />
            <RechartsTooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid var(--neon-green)'
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="var(--neon-green)"
              strokeWidth={2}
              dot={{ fill: 'var(--neon-green)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  // Update mood details dialog
  const renderMoodDetailsDialog = () => (
    <Dialog
      open={showMoodDetails}
      onClose={() => setShowMoodDetails(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ 
        fontFamily: 'Share Tech Mono', 
        color: 'var(--neon-green)',
        borderBottom: '1px solid var(--neon-green)'
      }}>
        mood.analysis.exe
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          {Object.entries(MOOD_TRACKING.dimensions).map(([key, { label, icon, range }]) => (
            <Box key={key} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {icon}
                <Typography sx={{ ml: 1, fontFamily: 'Share Tech Mono' }}>
                  {label}
                </Typography>
              </Box>
              <Slider
                value={moodDimensions[key]}
                min={1}
                max={5}
                step={1}
                marks
                onChange={(e, value) => setMoodDimensions(prev => ({ ...prev, [key]: value }))}
                sx={{
                  color: 'var(--neon-green)',
                  '& .MuiSlider-mark': {
                    backgroundColor: 'var(--neon-green)',
                  }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {range.map((label, i) => (
                  <Typography key={i} sx={{ 
                    fontSize: '0.75rem',
                    fontFamily: 'Share Tech Mono',
                    color: moodDimensions[key] === i + 1 ? 'var(--neon-green)' : 'inherit'
                  }}>
                    {label}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}

          {renderMoodRadar()}
          {renderActivityTimeline()}

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ fontFamily: 'Share Tech Mono', mb: 2 }}>
              healing.activities.exe
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(MOOD_TRACKING.activities).map(([key, { icon, label, benefits }]) => (
                <Grid item xs={12} sm={6} md={3} key={key}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      background: 'rgba(0, 255, 157, 0.1)',
                      border: '1px solid var(--neon-green)',
                      cursor: 'pointer',
                      '&:hover': {
                        background: 'rgba(0, 255, 157, 0.2)',
                      }
                    }}
                    onClick={() => logActivity(key)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {icon}
                      <Typography sx={{ ml: 1, fontFamily: 'Share Tech Mono' }}>
                        {label}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      {benefits.map((benefit, i) => (
                        <Chip
                          key={i}
                          label={benefit}
                          size="small"
                          sx={{
                            fontFamily: 'Share Tech Mono',
                            color: 'var(--neon-green)',
                            border: '1px solid var(--neon-green)',
                          }}
                        />
                      ))}
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );

  // Track activity engagement
  const logActivity = (category, timestamp = new Date()) => {
    setActivityLog(prev => ({
      ...prev,
      [category]: [...prev[category], timestamp]
    }));
  };

  // Predict mood from text
  const predictMood = (text) => {
    const lowerText = text.toLowerCase();
    let maxScore = 0;
    let predictedMood = 'neutral';
    let confidence = 0;

    // Score each mood category
    Object.entries(MOOD_PREDICTION_PATTERNS).forEach(([mood, { keywords }]) => {
      const score = keywords.reduce((acc, keyword) => {
        const regex = new RegExp(keyword, 'gi');
        const matches = (lowerText.match(regex) || []).length;
        return acc + matches;
      }, 0);

      if (score > maxScore) {
        maxScore = score;
        predictedMood = mood;
        confidence = Math.min(score / 3, 1); // Normalize confidence
      }
    });

    return { mood: predictedMood, confidence };
  };

  // Update mood prediction when user sends message
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].type === 'user') {
      const { mood, confidence } = predictMood(messages[messages.length - 1].content);
      
      setMoodBoard(prev => {
        const newRecentMoods = [...prev.recentMoods, mood].slice(-5);
        const streak = mood === prev.predictedMood ? prev.moodStreak + 1 : 0;
        
        return {
          ...prev,
          predictedMood: mood,
          confidence,
          recentMoods: newRecentMoods,
          moodStreak: streak
        };
      });
    }
  }, [messages]);

  // Render persistent mood board
  const renderMoodBoard = () => (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          borderLeft: '1px solid var(--neon-green)',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ 
          fontFamily: 'Share Tech Mono',
          color: 'var(--neon-green)',
          borderBottom: '1px solid var(--neon-green)',
          pb: 1,
          mb: 2
        }}>
          mood.predictor.exe
        </Typography>

        {/* Current Mood */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 3,
            background: `rgba(${MOOD_PREDICTION_PATTERNS[moodBoard.predictedMood].color}, 0.1)`,
            border: `1px solid ${MOOD_PREDICTION_PATTERNS[moodBoard.predictedMood].color}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography sx={{ 
              fontFamily: 'Share Tech Mono',
              fontSize: '2rem',
              mr: 1
            }}>
              {MOOD_PREDICTION_PATTERNS[moodBoard.predictedMood].emojis[0]}
            </Typography>
            <Box>
              <Typography sx={{ fontFamily: 'Share Tech Mono' }}>
                Current Vibe
              </Typography>
              <Typography variant="h6" sx={{ 
                fontFamily: 'Share Tech Mono',
                color: MOOD_PREDICTION_PATTERNS[moodBoard.predictedMood].color
              }}>
                {moodBoard.predictedMood.toUpperCase()}
              </Typography>
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={moodBoard.confidence * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: MOOD_PREDICTION_PATTERNS[moodBoard.predictedMood].color,
              }
            }}
          />
        </Paper>

        {/* Mood History */}
        <Typography sx={{ 
          fontFamily: 'Share Tech Mono',
          mb: 1
        }}>
          Recent Moods
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          {moodBoard.recentMoods.map((mood, index) => (
            <Tooltip
              key={index}
              title={mood.toUpperCase()}
              TransitionComponent={Zoom}
              arrow
            >
              <Typography sx={{ fontSize: '1.5rem' }}>
                {MOOD_PREDICTION_PATTERNS[mood].emojis[0]}
              </Typography>
            </Tooltip>
          ))}
        </Stack>

        {/* Mood Streak */}
        {moodBoard.moodStreak > 0 && (
          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 3,
              background: 'rgba(0, 255, 157, 0.1)',
              border: '1px solid var(--neon-green)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                badgeContent={moodBoard.moodStreak}
                color="success"
                sx={{ mr: 1 }}
              >
                <LocalFireDepartmentIcon sx={{ color: 'var(--neon-green)' }} />
              </Badge>
              <Typography sx={{ fontFamily: 'Share Tech Mono' }}>
                Mood Streak!
              </Typography>
            </Box>
          </Paper>
        )}

        {/* Quick Actions */}
        <Stack spacing={1}>
          <Button
            variant="outlined"
            startIcon={<TimelineIcon />}
            onClick={() => setShowProgress(true)}
            sx={{
              fontFamily: 'Share Tech Mono',
              color: 'var(--neon-green)',
              borderColor: 'var(--neon-green)',
            }}
          >
            View Progress
          </Button>
          <Button
            variant="outlined"
            startIcon={<MoodIcon />}
            onClick={() => setShowMoodDetails(true)}
            sx={{
              fontFamily: 'Share Tech Mono',
              color: 'var(--neon-green)',
              borderColor: 'var(--neon-green)',
            }}
          >
            Mood Details
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );

  return (
    <Box sx={{ 
      display: 'flex',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <div className="matrix-bg" />
      
      {/* Main Chat Area */}
      <Box sx={{ 
        flex: 1,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        marginRight: '280px', // Space for mood board
        height: '100%',
        overflow: 'hidden'
      }}>
        {/* Crisis Support Info */}
        <Collapse in={showCrisisInfo}>
          <Card sx={{
            mb: 3,
            background: 'rgba(255, 113, 206, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--neon-pink)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <TherapyIcon sx={{ color: 'var(--neon-green)', mt: 1 }} />
                <Typography variant="h6" sx={{
                  fontFamily: 'Share Tech Mono',
                  color: 'var(--neon-pink)',
                }}>
                  crisis.support.exe
                </Typography>
              </Box>
              <Stack spacing={2}>
                <Typography sx={{ fontFamily: 'Fira Code' }}>
                  24/7 Crisis Support Available:
                </Typography>
                <Button
                  variant="outlined"
                  href="tel:988"
                  sx={{
                    color: 'var(--neon-pink)',
                    borderColor: 'var(--neon-pink)',
                    '&:hover': {
                      borderColor: 'var(--neon-pink)',
                      backgroundColor: 'rgba(255, 113, 206, 0.1)',
                    },
                  }}
                >
                  Call 988 - Crisis Lifeline
                </Button>
                <Button
                  variant="outlined"
                  href="sms:741741"
                  sx={{
                    color: 'var(--neon-pink)',
                    borderColor: 'var(--neon-pink)',
                    '&:hover': {
                      borderColor: 'var(--neon-pink)',
                      backgroundColor: 'rgba(255, 113, 206, 0.1)',
                    },
                  }}
                >
                  Text HOME to 741741
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Collapse>

        {/* Chat Messages */}
        <Box sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          mb: 3,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Stack spacing={2}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                {message.type === 'bot' && (
                  <TherapyIcon sx={{ color: 'var(--neon-green)', mt: 1 }} />
                )}
                <Box sx={getMessageStyle(message.type, message.sentiment)}>
                  <Typography
                    sx={{
                      fontFamily: message.type === 'user' ? 'Fira Code' : 'Share Tech Mono',
                      color: '#fff',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {message.content}
                  </Typography>
                  {message.suggestions && (
                    <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                      {message.suggestions.map((suggestion, i) => (
                        <Chip
                          key={i}
                          label={suggestion}
                          onClick={() => handleSuggestionClick(suggestion)}
                          sx={{
                            fontFamily: 'Share Tech Mono',
                            color: 'var(--neon-green)',
                            border: '1px solid var(--neon-green)',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 255, 157, 0.1)',
                            }
                          }}
                        />
                      ))}
                    </Stack>
                  )}
                </Box>
                {message.type === 'user' && (
                  <Box sx={{ mt: 1 }}>
                    {message.sentiment === 'positive' && <HappyIcon sx={{ color: 'var(--neon-green)' }} />}
                    {message.sentiment === 'negative' && <SadIcon sx={{ color: 'var(--neon-blue)' }} />}
                    {message.sentiment === 'severe_negative' && <HeartIcon sx={{ color: 'var(--neon-purple)' }} />}
                    {message.sentiment === 'crisis' && <MedicalIcon sx={{ color: 'var(--neon-pink)' }} />}
                  </Box>
                )}
              </Box>
            ))}
            {isTyping && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TherapyIcon sx={{ color: 'var(--neon-green)' }} />
                <Fade in={true}>
                  <CircularProgress size={20} sx={{ color: 'var(--neon-green)' }} />
                </Fade>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Stack>
        </Box>

        {/* Input Area */}
        <Card sx={{
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--neon-green)',
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                placeholder="tell me whats on ur mind bestie..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                InputProps={{
                  sx: {
                    fontFamily: 'Fira Code',
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--neon-green)',
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                sx={{
                  color: 'var(--neon-green)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 255, 157, 0.1)',
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Mood Board */}
      {renderMoodBoard()}

      {/* Dialogs */}
      {renderProgressDashboard()}
      {renderMoodDetailsDialog()}
      {renderExerciseMenu()}

      {/* Exercise Dialog */}
      <Dialog open={exerciseActive} onClose={() => setExerciseActive(false)}>
        <DialogTitle sx={{ fontFamily: 'Share Tech Mono', color: 'var(--neon-green)' }}>
          {currentExercise?.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontFamily: 'Fira Code', mb: 2 }}>
              {currentExercise?.steps[exerciseStep]}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={exerciseProgress}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(0, 255, 157, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'var(--neon-green)',
                }
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Mood Rating Dialog */}
      <Dialog open={showMoodRating} onClose={() => setShowMoodRating(false)}>
        <DialogTitle sx={{ fontFamily: 'Share Tech Mono', color: 'var(--neon-green)' }}>
          how r u feeling now bestie?
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Rating
              value={moodRating}
              onChange={(event, newValue) => handleMoodRating(newValue)}
              icon={<HappyIcon sx={{ color: 'var(--neon-green)' }} />}
              emptyIcon={<SadIcon sx={{ color: 'rgba(255, 255, 255, 0.3)' }} />}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ChatBot; 
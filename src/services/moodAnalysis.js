import * as tf from '@tensorflow/tfjs';
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

// Emotion categories
const emotions = {
  HAPPY: ['happy', 'joy', 'excited', 'great', 'awesome', 'lit', 'slay', 'W', 'win', 'good'],
  SAD: ['sad', 'depressed', 'down', 'unhappy', 'crying', 'L', 'loss', 'bad'],
  ANXIOUS: ['anxious', 'worried', 'nervous', 'stress', 'overthinking', 'panic'],
  ANGRY: ['angry', 'mad', 'furious', 'rage', 'hate', 'malding'],
  NEUTRAL: ['ok', 'fine', 'meh', 'whatever', 'idk', 'mid'],
};

// Convert text to tensor
const textToTensor = (text) => {
  // Simple bag of words approach
  const words = text.toLowerCase().split(/\s+/);
  const emotionScores = Object.keys(emotions).map(emotion => {
    return emotions[emotion].reduce((score, keyword) => {
      return score + words.filter(word => word.includes(keyword)).length;
    }, 0);
  });

  return tf.tensor2d([emotionScores]);
};

// Analyze mood using TF.js and sentiment analysis
export const analyzeMood = async (text) => {
  try {
    // Get sentiment score
    const sentimentResult = sentiment.analyze(text);
    
    // Convert text to tensor for emotion analysis
    const inputTensor = textToTensor(text);
    
    // Get emotion scores
    const emotionScores = await inputTensor.array();
    const maxEmotionIndex = emotionScores[0].indexOf(Math.max(...emotionScores[0]));
    const emotions = ['HAPPY', 'SAD', 'ANXIOUS', 'ANGRY', 'NEUTRAL'];
    
    // Combine sentiment and emotion analysis
    let mood = emotions[maxEmotionIndex];
    if (sentimentResult.score > 2) {
      mood = 'HAPPY';
    } else if (sentimentResult.score < -2) {
      mood = sentimentResult.score < -4 ? 'ANGRY' : 'SAD';
    }
    
    // Calculate confidence based on the strength of the signals
    const emotionStrength = Math.max(...emotionScores[0]);
    const sentimentStrength = Math.abs(sentimentResult.score);
    const confidence = Math.min(
      ((emotionStrength + sentimentStrength) / (emotions.length + 5)) * 100,
      100
    );

    return {
      mood,
      confidence,
      details: {
        sentiment: sentimentResult.score,
        emotionScores: emotionScores[0],
      },
    };
  } catch (error) {
    console.error('Error analyzing mood:', error);
    return {
      mood: 'NEUTRAL',
      confidence: 50,
      details: {
        sentiment: 0,
        emotionScores: [0, 0, 0, 0, 0],
      },
    };
  }
};

// Generate response based on mood and context
export const generateResponse = async (mood, confidence) => {
  const responses = {
    HAPPY: [
      "bestie ur energy is immaculate rn fr fr",
      "no cap detected, spitting straight facts",
      "ur literally slaying rn and i'm here for it",
      "main character energy detected",
      "keep this energy bestie, ur doing amazing sweetie",
    ],
    SAD: [
      "sending virtual hugs bestie, we'll get through this",
      "it's ok to not be ok, let's process these feels",
      "downloading emotional support.exe...",
      "ur feelings are valid bestie, let's work through this",
      "temporary L, but we're gonna bounce back fr fr",
    ],
    ANXIOUS: [
      "deep breaths bestie, let's debug these thoughts",
      "anxiety.exe has been detected, initiating calm protocols",
      "ur brain is just running too many tabs rn",
      "let's close some of those mental chrome tabs",
      "time to ctrl+alt+del those intrusive thoughts",
    ],
    ANGRY: [
      "malding detected, initiating chill protocols",
      "understandable, have u tried turning ur rage off and on again?",
      "anger.dll status: RUNNING... let's end that task",
      "rage quit from life? nah bestie, let's respawn",
      "ur anger is valid but let's not let it crash ur system",
    ],
    NEUTRAL: [
      "vibes are mid rn, let's upgrade that energy",
      "running diagnostics on ur mood...",
      "ur giving very much NPC energy rn bestie",
      "let's spice up these vibes fr fr",
      "mood status: loading... wanna talk about it?",
    ],
  };

  const moodResponses = responses[mood] || responses.NEUTRAL;
  return moodResponses[Math.floor(Math.random() * moodResponses.length)];
};

// Export mood constants
export const MOODS = {
  HAPPY: { color: '#00ff9d', label: 'vibing fr fr' },
  SAD: { color: '#ff71ce', label: 'down bad' },
  ANXIOUS: { color: '#b967ff', label: 'stressed bestie' },
  ANGRY: { color: '#ff0055', label: 'malding' },
  NEUTRAL: { color: '#ffffff', label: 'mid' },
}; 
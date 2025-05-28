import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  stats: {
    daysActive: { type: Number, default: 0 },
    therapySessionsCompleted: { type: Number, default: 0 },
    moodEntries: { type: Number, default: 0 },
    journalEntries: { type: Number, default: 0 },
    lastMoodCheck: { type: Date },
    streakCount: { type: Number, default: 0 },
  },
  preferences: {
    theme: { type: String, default: 'cyberpunk' },
    notifications: { type: Boolean, default: true },
    moodCheckFrequency: { type: String, default: 'daily' },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const journalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mood: [{
    type: String,
  }],
  tags: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  tags: [{
    type: String,
  }],
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const quizSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'mental_health'],
  },
  questions: [{
    question: String,
    answer: String,
    score: Number,
  }],
  totalScore: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['mood_check', 'journal', 'quiz', 'general'],
  },
  message: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'custom'],
  },
  nextReminder: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model('User', userSchema);
const Journal = mongoose.model('Journal', journalSchema);
const Mood = mongoose.model('Mood', moodSchema);
const Quiz = mongoose.model('Quiz', quizSchema);
const Reminder = mongoose.model('Reminder', reminderSchema);

export { User, Journal, Mood, Quiz, Reminder }; 
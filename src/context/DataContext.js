import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Load initial data from localStorage or use defaults
  const [moodTrends, setMoodTrends] = useState(() => {
    const saved = localStorage.getItem('moodTrends');
    return saved ? JSON.parse(saved) : generateDefaultMoodData();
  });

  const [reminderCompletion, setReminderCompletion] = useState(() => {
    const saved = localStorage.getItem('reminderCompletion');
    return saved ? JSON.parse(saved) : [
      { name: 'Hydration', value: 0 },
      { name: 'Mindfulness', value: 0 },
      { name: 'Exercise', value: 0 },
      { name: 'Sleep', value: 0 },
    ];
  });

  const [activityDistribution, setActivityDistribution] = useState(() => {
    const saved = localStorage.getItem('activityDistribution');
    return saved ? JSON.parse(saved) : [
      { name: 'Chat', value: 0 },
      { name: 'Journal', value: 0 },
      { name: 'Reminders', value: 0 },
      { name: 'Resources', value: 0 },
    ];
  });

  const [latestActivities, setLatestActivities] = useState(() => {
    const saved = localStorage.getItem('latestActivities');
    return saved ? JSON.parse(saved) : [];
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chat_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [journalEntries, setJournalEntries] = useState(() => {
    const saved = localStorage.getItem('journal_entries');
    return saved ? JSON.parse(saved) : [];
  });

  const [sentiment, setSentiment] = useState(0);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('moodTrends', JSON.stringify(moodTrends));
  }, [moodTrends]);

  useEffect(() => {
    localStorage.setItem('reminderCompletion', JSON.stringify(reminderCompletion));
  }, [reminderCompletion]);

  useEffect(() => {
    localStorage.setItem('activityDistribution', JSON.stringify(activityDistribution));
  }, [activityDistribution]);

  useEffect(() => {
    localStorage.setItem('latestActivities', JSON.stringify(latestActivities));
  }, [latestActivities]);

  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('journal_entries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Helper function to generate default mood data
  function generateDefaultMoodData() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({ name: day, value: 5 }));
  }

  // Function to update mood
  const updateMood = (value) => {
    const today = new Date().getDay();
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today];
    
    setMoodTrends(prev => {
      const newTrends = [...prev];
      const todayIndex = newTrends.findIndex(item => item.name === dayName);
      if (todayIndex !== -1) {
        newTrends[todayIndex].value = value;
      }
      return newTrends;
    });

    addActivity({
      type: 'mood',
      message: `Mood updated: ${value}/10`,
      time: new Date().toISOString(),
    });
  };

  // Function to update reminder completion
  const updateReminder = (reminderName, completed) => {
    setReminderCompletion(prev => {
      return prev.map(item => {
        if (item.name === reminderName) {
          return { ...item, value: item.value + (completed ? 1 : 0) };
        }
        return item;
      });
    });

    if (completed) {
      addActivity({
        type: 'reminder',
        message: `Completed ${reminderName.toLowerCase()} reminder`,
        time: new Date().toISOString(),
      });
    }
  };

  // Function to update activity distribution
  const updateActivity = (activityName) => {
    setActivityDistribution(prev => {
      return prev.map(item => {
        if (item.name === activityName) {
          return { ...item, value: item.value + 1 };
        }
        return item;
      });
    });
  };

  // Function to add new activity to latest activities
  const addActivity = (activity) => {
    setLatestActivities(prev => {
      const newActivities = [
        {
          ...activity,
          id: Date.now(),
        },
        ...prev,
      ].slice(0, 10); // Keep only last 10 activities
      return newActivities;
    });
  };

  const addMessage = async (message) => {
    const newMessages = [...messages, message];
    setMessages(newMessages);
    // Update sentiment based on new message
    const newSentiment = calculateSentiment(message.text);
    setSentiment(newSentiment);
  };

  const addJournalEntry = (entry) => {
    setJournalEntries(prev => [entry, ...prev]);
  };

  const updateJournalEntry = (id, updatedEntry) => {
    setJournalEntries(prev =>
      prev.map(entry => entry.id === id ? { ...entry, ...updatedEntry } : entry)
    );
  };

  const deleteJournalEntry = (id) => {
    setJournalEntries(prev => prev.filter(entry => entry.id !== id));
  };

  // Simple sentiment analysis function
  const calculateSentiment = (text) => {
    const positiveWords = ['happy', 'good', 'great', 'awesome', 'excellent', 'love', 'wonderful', 'fantastic'];
    const negativeWords = ['sad', 'bad', 'awful', 'terrible', 'hate', 'horrible', 'worst', 'angry'];
    
    const words = text.toLowerCase().split(/\s+/);
    let score = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) score += 1;
      if (negativeWords.includes(word)) score -= 1;
    });
    
    return score / (words.length || 1); // Normalize by text length
  };

  const value = {
    moodTrends,
    reminderCompletion,
    activityDistribution,
    latestActivities,
    updateMood,
    updateReminder,
    updateActivity,
    addActivity,
    messages,
    addMessage,
    sentiment,
    journalEntries,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}; 
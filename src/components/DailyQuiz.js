import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { Psychology as PsychologyIcon } from '@mui/icons-material';

const questions = [
  {
    question: "bestie how's ur energy level rn?",
    options: [
      "literally can't even 💀",
      "running on monster energy fr",
      "mid energy vibes",
      "lowkey slaying",
      "absolutely cracked rn no cap",
    ],
  },
  {
    question: "rate ur anxiety level bestie",
    options: [
      "zero anxiety, we vibing",
      "slight brain static",
      "brain go brrrr",
      "main character anxiety fr",
      "full mental breakdown loading...",
    ],
  },
  {
    question: "sleep check bestie (real)",
    options: [
      "slept like a log fr fr",
      "mid sleep tbh",
      "brain wouldn't shut up smh",
      "forgot to sleep (gaming moment)",
      "what is sleep? 💀",
    ],
  },
  {
    question: "social battery check?",
    options: [
      "hermit mode activated",
      "might respond to dms",
      "could vibe w/ the homies",
      "ready to touch grass",
      "extrovert mode unlocked",
    ],
  },
  {
    question: "focus level check rn",
    options: [
      "brain empty, no thoughts",
      "slight brainrot",
      "average rizz",
      "in the zone fr",
      "galaxy brain activated",
    ],
  },
];

function DailyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (event) => {
    setAnswers({
      ...answers,
      [currentQuestion]: event.target.value,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(answers).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const getResultMessage = () => {
    const score = calculateScore();
    if (score === 100) return "bestie ur literally so valid rn fr fr";
    if (score >= 80) return "almost there bestie, keep slaying";
    if (score >= 60) return "ur giving mid vibes but we can fix that";
    if (score >= 40) return "bestie we need to talk...";
    return "mental damage detected, initiating repair sequence";
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(45deg, rgba(0, 255, 157, 0.1), rgba(255, 113, 206, 0.1))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 255, 157, 0.2)',
        boxShadow: '0 0 15px rgba(0, 255, 157, 0.1)',
      }}
    >
      <CardContent>
        <Typography 
          variant="h5" 
          gutterBottom
          className="gradient-text"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            fontFamily: 'Share Tech Mono, monospace',
          }}
        >
          <PsychologyIcon /> daily vibe check (real)
        </Typography>

        <LinearProgress 
          variant="determinate" 
          value={(currentQuestion / questions.length) * 100}
          sx={{
            my: 2,
            height: 8,
            borderRadius: 4,
            bgcolor: 'rgba(0, 255, 157, 0.1)',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#00ff9d',
            },
          }}
        />

        {!showResults ? (
          <Box>
            <Typography 
              variant="h6"
              sx={{ 
                mb: 3,
                fontFamily: 'Share Tech Mono, monospace',
                color: '#fff',
              }}
            >
              {questions[currentQuestion].question}
            </Typography>

            <FormControl component="fieldset">
              <RadioGroup
                value={answers[currentQuestion] || ''}
                onChange={handleAnswer}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={
                      <Radio 
                        sx={{
                          color: 'rgba(0, 255, 157, 0.5)',
                          '&.Mui-checked': {
                            color: '#00ff9d',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography 
                        sx={{ 
                          fontFamily: 'Fira Code, monospace',
                          color: '#fff',
                        }}
                      >
                        {option}
                      </Typography>
                    }
                    sx={{
                      mb: 1,
                      '&:hover': {
                        bgcolor: 'rgba(0, 255, 157, 0.1)',
                        borderRadius: 1,
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              fullWidth
              sx={{
                mt: 3,
                background: 'linear-gradient(45deg, #00ff9d 30%, #00bf8f 90%)',
                color: '#000',
                fontFamily: 'Share Tech Mono, monospace',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00bf8f 30%, #006d4f 90%)',
                },
                '&.Mui-disabled': {
                  background: 'rgba(0, 255, 157, 0.1)',
                  color: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              {currentQuestion === questions.length - 1 ? 'finish' : 'next vibe check'}
            </Button>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h6"
              className="gradient-text"
              sx={{ 
                mb: 2,
                fontFamily: 'Share Tech Mono, monospace',
              }}
            >
              {getResultMessage()}
            </Typography>

            <Button
              variant="contained"
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers({});
                setShowResults(false);
              }}
              sx={{
                mt: 2,
                background: 'linear-gradient(45deg, #00ff9d 30%, #00bf8f 90%)',
                color: '#000',
                fontFamily: 'Share Tech Mono, monospace',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00bf8f 30%, #006d4f 90%)',
                },
              }}
            >
              retry vibe check
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default DailyQuiz; 
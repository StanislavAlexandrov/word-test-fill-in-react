import './App.css';
import DATA from './data/data';
import React, { useEffect, useState } from 'react';
import shuffleArray from './helpers/shuffleArray';
import Picker from './components/picker';
let questions = shuffleArray(DATA);
//lambda functions are not revaluated in useState; lazy initial state
export default function App() {
    const [currentStep, setCurrentStep] = useState(0);
    const [numberQuestions, setNumberQuestions] = useState(DATA.length);
    let currentQuestion = questions.slice(0, numberQuestions)[currentStep];
    const [currentWord, setCurrentWord] = useState(
        () => currentQuestion.answer
    );

    const [currentGuess, setCurrentGuess] = useState('');

    useEffect(
        () => setCurrentWord(currentQuestion.answer),
        [currentStep, numberQuestions, currentQuestion]
    );
    useEffect(() => setCurrentGuess(''), [currentStep]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let conditionCheck = currentStep < questions.length - 1;
        if (currentWord === currentGuess) {
            if (conditionCheck) {
                setCurrentStep((x) => ++x);
                setCurrentGuess('');
            } else {
                setCurrentStep(0);
            }
        }
        setCurrentGuess(e.target.value.toLowerCase().trim());
    };

    const checkGuess = () => {
        let conditionCheck = currentStep < questions.length - 1;
        if (currentWord === currentGuess) {
            if (conditionCheck) {
                setCurrentStep((x) => ++x);
                setCurrentGuess('');
            } else {
                setCurrentStep(0);
            }
        }
    };
    //what if: set a variable to true after the correct guess, then to false in...where? display the guess

    useEffect(() => {
        checkGuess();
    }, [currentGuess]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSpace = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Space') {
            setCurrentGuess('');
        }
    };
    //question about null className in return
    return (
        <div className="App">
            {/* <Picker
                numberQuestions={numberQuestions}
                setNumberQuestions={setNumberQuestions}
            /> */}
            <h2 className={currentGuess === '' ? 'highlight_right' : undefined}>
                This is green if the guess was correct. No need to use 'space'.
            </h2>
            <h3>
                current step: {currentStep + 1} of {questions.length}
            </h3>
            <h1>{questions[currentStep].question}</h1>
            <input
                className="guessInput"
                type="text"
                value={currentGuess}
                onChange={handleInput}
                onKeyDown={handleSpace}
            />
        </div>
    );
}

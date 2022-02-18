import './App.css';
import questions from './components/data.js';
import React, { useEffect, useState } from 'react';

export default function App() {
    const [currentStep, setCurrentStep] = useState(0);
    const [currentWord, setCurrentWord] = useState(
        questions[currentStep].answer
    );
    const [currentGuess, setCurrentGuess] = useState('');

    // function delay(ms: number) {
    //     return new Promise((resolve) => {
    //         setTimeout(resolve, ms);
    //     });
    // }

    useEffect(
        () => setCurrentWord(questions[currentStep].answer),
        [currentStep]
    );
    useEffect(() => setCurrentGuess(''), [currentStep]);

    useEffect(() => {
        checkGuess();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentGuess]);

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setCurrentGuess(() =>
            (e.target as HTMLInputElement).value.toLowerCase().trim()
        );
    };

    const checkGuess = () => {
        let conditionCheck = currentStep < questions.length - 1;
        if (currentWord === currentGuess) {
            if (conditionCheck) {
                setCurrentStep((x) => ++x);
                setCurrentGuess('');
                // makeGreen();
            } else {
                setCurrentStep(0);
            }
        }
    };

    const handleSpace = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Space') {
            setCurrentGuess('');
        }
    };

    // async function makeGreen() {
    //     setCurrentGuess((x) => 'bwahhahahahahah');
    //     await delay(3000);
    //     setCurrentGuess((x) => ' ');
    // }

    return (
        <div className="App">
            <h2 className={currentGuess === '' ? 'highlight_right' : ''}>
                This is green if the guess was correct. Press Spacebar to test.
            </h2>
            <h3>
                current step: {currentStep + 1} of {questions.length}
            </h3>
            <h1>{questions[currentStep].question}</h1>
            <input
                type="text"
                value={currentGuess}
                onChange={handleInput}
                onKeyDown={handleSpace}
            />
        </div>
    );
}

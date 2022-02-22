interface setNumberQuestionsProps {
    setNumberQuestions(arg: number): void;
    numberQuestions: number;
}

const Picker = ({ setNumberQuestions }: setNumberQuestionsProps) => {
    const handleInput = (questions: number) => {
        setNumberQuestions(questions);
    };

    return (
        <>
            <h2>How many questions?</h2>
            <button disabled={true} onClick={() => handleInput(1)}>
                1
            </button>
            <button onClick={() => handleInput(5)}>5</button>
            <button disabled={true} onClick={() => handleInput(10)}>
                10
            </button>
        </>
    );
};

export default Picker;

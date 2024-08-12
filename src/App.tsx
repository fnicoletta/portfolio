import './App.css'
import styled from "styled-components";
import frankyWizard from "./assets/franky-wizard.ts";
import wizard from "./assets/wizard-only-ascii.ts";
import {useEffect, useRef, useState} from "react";

const aboutMe = 'Code Wizard | React Warlock | TypeScript Mage | CSS Sorcerer\nHi! My name is Franky Khoury. I am based out of the South Bay Area.\nI am a self taught developer specializing in Front End Development.'

const $Ascii = styled.pre`
    //padding: 1rem;
    overflow: hidden;
    white-space: pre;
`

const $Terminal = styled.div`
    padding: 1.5rem 1rem 1rem;
    height: 100vh;
    width: 100vw;
`;

const $OpeningText = styled.div`
    margin-top: 3px;
`;

const $Output = styled.div`
    p {
        white-space: pre-line;
    }
`

const $Input = styled.input<{ value: string }>`
    opacity: 0;
    position: absolute;
    left: -10000px;
`;

export const $InputContent = styled.span``

const $InputContainer = styled.div`
    display: flex;
    align-items: center;

    p {
        margin-right: .4rem;
    }
`

const $Cursor = styled.div`
    animation: cursor infinite 2s;
    width: .3rem;
    height: .8rem;
    background-color: #00ef1c;
    box-shadow: 0 0 5px #46b97f;

    @keyframes cursor {
        0% {
            opacity: 0;
        }
        40% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`

const scry = [
    `'lore' - The tale of Franky Khoury`,
    `'projects' - Look into my personal spellbook`,
    `'social' - Since we don't use carrier pigeons anymore`,
    `'grimoire' - Learn the secrets of the dark arts`,
    `'clear' - Dispel any magic`,
]

function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

function App() {
    const [terminalInput, setTerminalInput] = useState<string>('');
    const [terminalOutput, setTerminalOutput] = useState<string>('');
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        inputRef?.current?.focus();
    }, [])

    function handleTerminalInput(e: React.ChangeEvent<HTMLInputElement>) {
        setTerminalInput(e.target.value);
    }

    function handleOutput() {
        let output: string;
        switch (terminalInput) {
            case "scry":
                output = scry.join('\n');
                break;
            case "lore":
                output = aboutMe;
                break;
            case "grimoire":
                // @ts-expect-error asdf
                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank').focus();
                output = 'Fool! The dark arts are forbidden!'
                break;
            case "clear":
                return '';
            default:
                output = `Your spell has been countered.\nFor a list of spells, type 'scry'`
        }
        return `${terminalOutput}\n$ ${terminalInput}\n ${output}\n`
    }

    function handleTerminalKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            const newOutput = handleOutput()
            setTerminalOutput(newOutput);
            setTerminalInput('');
        }
    }

    return (
        <$Terminal onClick={() => inputRef.current?.focus()}>
            <$Ascii>
                {windowDimensions.width > 1175 ? frankyWizard : wizard}
            </$Ascii>
            <$OpeningText>
                <p>Greetings Traveller</p>
                <p>Welcome to the seeing stone of the Code Wizard Franky</p>
                <p>To see the spell list, type 'scry'</p>
                <br/>
            </$OpeningText>
            <$Output>
                <p>{terminalOutput}</p>
                <br/>
            </$Output>
            <$InputContainer>
                <$Input ref={inputRef} value={terminalInput} onChange={handleTerminalInput}
                        onKeyDown={handleTerminalKey}/>
                <p>$</p>
                <$InputContent>{terminalInput}</$InputContent>
                <$Cursor/>
            </$InputContainer>

        </$Terminal>
    )
}

export default App

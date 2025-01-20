import React, { useEffect, useState } from 'react'
import Dropdown from '../Dropdown'
import Button from '../Button';
import { Play } from 'lucide-react';
import Editor from '@monaco-editor/react'

import Editorsettings from './Editorsettings';
import { useDispatch, useSelector } from 'react-redux';
import { updateCode, updateSelectedLang } from '../../features/examwindow/examSlice';
import { changeStatus } from '../../features/coderun/codeRunSlice';
import { batchRun } from '../../utils/CodeRunner';
import { selectCodeValues, selectInputs, selectSourceCode } from '../../redux/examSelector';


const Codeeditor = ({disabled, languages, runAction, language, defaultCode, tempHeight}) => {

    /*
        Editor props

        disabled - true -> only one language supported, pass the language throught lanaguage
        disabled - flase -> pass all languages throught languages
        theme -> atom-one-dark, leet-code, eye-killer
        defaultCode -> if any default code pass throuth this prop, (same for all languages -> may be update later)
        runAction -> when clicking run button, some action to perform may changed by redux
        fontSize -> fontSize may be changed by settings compnent (redux)

    */

    
    const values = useSelector(selectCodeValues);
    
    const [selectedLanguage, setSelectedLanguage] = useState(0);
    
    const dispatch = useDispatch();
    const {fontSize, theme} = useSelector((state) => state['editor-settings']);
    const runStatus = useSelector((state) => state['code-run'].isRunning);
    const qSelected = useSelector((state) => state['exam-data'].selected);
    const sourceCode = useSelector(selectSourceCode);
    const inputs = useSelector(selectInputs);
    //const inputs = useSelector();

    async function runCode() {
        let lang = languages[selectedLanguage];
        if(lang == 'c++') lang = 'cpp';
        if(lang == 'c#') lang = 'csharp';

        const fileNames = new Map();
        fileNames.set('java', 'Main.java');
        fileNames.set('python', 'main.py');
        fileNames.set('c', 'main.c');
        fileNames.set('csharp', 'Main.cs');
        fileNames.set('javascript', 'index.js');
        fileNames.set('cpp', 'main.cpp');

        const response = await batchRun(lang, inputs, sourceCode, fileNames.get(lang));

        //console.log(inputs);
        console.log(response);
        dispatch(changeStatus(false));
    }

    const createCustomTheme = (monaco) => {
        monaco.editor.defineTheme('leet-code', {
            base: 'vs-dark', 
            inherit: true,   
            rules: [
                
                { token: 'comment', foreground: '5C824B', fontStyle: 'italic' },
                { token: 'keyword', foreground: '569CD6' },
                { token: 'string', foreground: 'CE9178' },
                { token: 'number', foreground: 'B5CEA8' },
                

                
                { token: 'delimiter', foreground: 'D4D4D4' },
                { token: 'delimiter.bracket', foreground: 'D4D4D4' },
                { token: 'delimiter.parenthesis', foreground: 'D4D4D4' },
                { token: 'operator', foreground: 'FFFFFF' },

                { token: 'variable', foreground: '4EC9B0' },
                { token: 'variable.predefined', foreground: '4EC9B0' },
                { token: 'function', foreground: '4EC9B0' },
                { token: 'method', foreground: '4EC9B0' },
            ],
            colors: {
                
                'editor.background': '#262626',
                'editor.foreground': '#4EC9B0',
                'editorLineNumber.foreground': '#858585',
                'editorLineNumber.activeForeground': '#FFFFFF',
                'editor.selectionBackground': '#264F78',
                'editor.lineHighlightBackground': '#2D2D2D',
                'editorCursor.foreground': '#FFFFFF',
                'editorWhitespace.foreground': '#404040',
                'editorGutter.background': '#262626',  
            }
        });

        monaco.editor.defineTheme('atom-one-dark', {
            base: 'vs-dark', 
            inherit: true,   
            rules: [
                
                { token: 'comment', foreground: '718489', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'BE77DD' },
                { token: 'string', foreground: '86BC79' },
                { token: 'number', foreground: 'E5B568' },
                

                
                { token: 'delimiter', foreground: 'D4D4D4' },
                { token: 'delimiter.bracket', foreground: 'D4D4D4' },
                { token: 'delimiter.parenthesis', foreground: 'D4D4D4' },
                { token: 'operator', foreground: '4EC9B0' },

                { token: 'variable', foreground: 'E06B73' },
                { token: 'variable.predefined', foreground: 'E06B73' },
                { token: 'function', foreground: '4D98E1' },
                { token: 'method', foreground: '4D98E1' },
            ],
            colors: {
                
                'editor.background': '#23272E',
                'editor.foreground': '#E06B73',
                'editorLineNumber.foreground': '#858585',
                'editorLineNumber.activeForeground': '#FFFFFF',
                'editor.selectionBackground': '#264F78',
                'editor.lineHighlightBackground': '#2C313C',
                'editorCursor.foreground': '#FFFFFF',
                'editorWhitespace.foreground': '#404040',
                'editorGutter.background': '#23272E',  
            }
        });

        monaco.editor.defineTheme('swalih-theme', {
            base: 'vs-dark', 
            inherit: true,   
            rules: [
                { token: 'comment', foreground: 'A3BE8C', fontStyle: 'italic' }, // Updated to a softer green
                { token: 'keyword', foreground: '81A1C1' }, // Updated to a cooler blue
                { token: 'string', foreground: 'EBCB8B' }, // Updated to a warmer orange
                { token: 'number', foreground: 'B48EAD' }, // Updated to a lavender tone
                { token: 'delimiter', foreground: 'ECEFF4' }, // Updated to off-white
                { token: 'delimiter.bracket', foreground: 'ECEFF4' },
                { token: 'delimiter.parenthesis', foreground: 'ECEFF4' },
                { token: 'operator', foreground: 'D8DEE9' }, // Updated to light gray
                { token: 'variable', foreground: '88C0D0' }, // Updated to cyan
                { token: 'variable.predefined', foreground: '88C0D0' },
                { token: 'function', foreground: '8FBCBB' }, // Updated to aquamarine
                { token: 'method', foreground: '8FBCBB' },
            ],
            colors: {
                'editor.background': '#2E3440', // Updated to a darker gray-blue
                'editor.foreground': '#D8DEE9', // Updated to light gray
                'editorLineNumber.foreground': '#4C566A', // Updated to a muted gray
                'editorLineNumber.activeForeground': '#ECEFF4', // Updated to off-white
                'editor.selectionBackground': '#3B4252', // Updated to a dark blue-gray
                'editor.lineHighlightBackground': '#434C5E', // Updated to a muted blue-gray
                'editorCursor.foreground': '#88C0D0', // Updated to cyan
                'editorWhitespace.foreground': '#3B4252', // Updated to dark blue-gray
                'editorGutter.background': '#2E3440', // Matches updated editor background
            }
        });
    };


    const handleEditorBeforeMount = (monaco) => {
        createCustomTheme(monaco);
    };

    
    return (
        <div className='rounded-[4px] h-[100%]'>
            <div className='head w-[100%] items-center h-11 flex flex-row justify-between px-2 rounded-t-[5px] bg-secondaryGray' >
                <Dropdown action={(index) => {setSelectedLanguage(index); dispatch(updateSelectedLang(index))}} selected={languages?languages[selectedLanguage]: language} disabled={disabled ? disabled: false} items={languages?languages: [language]}/>
                
                <div className='flex flex-row gap-2'> 
                    <Editorsettings />
                    <Button  action={() => {if(!runStatus) {dispatch(changeStatus(true)); runCode()}}} iconStyle={{size: 14, className: ' translate-y-0 '}} Icon={Play} label={runStatus?"running": "run"} disabled={false} buttonClass={'text-textGray text-white bg-green-700 hover:text-textGreen'}/>
                </div>
            </div>

            <div className='p-[4px] pl-[10px] w-[100%]  bg-darkGray rounded-b-[4px] h-[calc(100%-2.75rem)]'  
            >

                <Editor value={values[selectedLanguage]|| ''} onChange={(value) => {dispatch(updateCode({value:value, language:languages[selectedLanguage]}))}} beforeMount={handleEditorBeforeMount} height="100%" width="100%" theme={theme} defaultValue={values[selectedLanguage] || defaultCode}  defaultLanguage={!disabled?languages[selectedLanguage]:language}  options={{ 
                    fontSize: fontSize, 
                    suggestOnTriggerCharacters: false, 
                    quickSuggestions: false, 
                    parameterHints: { enabled: false }, 
                    lineNumbersMinChars: 1, 
                }}/>
                    
            </div> 
            
        </div>
    )
}

export default Codeeditor;

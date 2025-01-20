import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [
        /* array of objects in the form
        
            {
                questionDetails: {
                    'questionname': {
                        title: -

                    }
                },
                languages: [...]
                codeValues: [...]
                selected: 0 -> langauage selected
                testCases: {
                    input:  [,]
                    output: [,]
                },
                testResult: {
                }
            }, 
            
            {
                ....
            }
        
        */
    ],
    selected: 0 //i number value eg. 0 1 2 (representing question of selection)
    ,initialized: false
}


const examDetailsReducer = createSlice({
    name: 'exam-data',
    initialState,
    reducers: {
        initialize(state, acitons) {
            state.questions = acitons.payload.questionDetails,
            state.selected = acitons.payload.selected
            state.initialized = true;           
        },
        setSelected(state, acitons) {
            state.selected = acitons.payload;
        },
        updateCode(state, actions) {
            // Extract the payload values
            const { value, language } = actions.payload;
        
            // Check if state is initialized
            if (!state.initialized) {
                console.error("State is not initialized. Cannot update code.");
                return;
            }
        
            // Find the currently selected question
            const selectedQuestion = state.questions[state.selected];
            if (!selectedQuestion) {
                console.error(`No question found for the selected index: ${state.selected}`);
                return;
            }
        
            // Find the index of the specified language
            const languageIndex = selectedQuestion.languages.findIndex((lang) => lang === language);
            if (languageIndex === -1) {
                console.error(`Language "${language}" not found in the question's languages.`);
                return;
            }
        
            // Update the corresponding code value immutably
            selectedQuestion.codeValues = [
                ...selectedQuestion.codeValues.slice(0, languageIndex),
                value, // New code value
                ...selectedQuestion.codeValues.slice(languageIndex + 1),
            ];
        }, updateSelectedLang(state, actions) {
            // Find the currently selected question
            const language = actions.payload;
            
            const selectedQuestion = state.questions[state.selected];
            

            // Update the selected language index
            selectedQuestion.selected = language;
        }
            
    }
});

export default examDetailsReducer.reducer;
export const {initialize, setSelected, updateCode, updateSelectedLang} = examDetailsReducer.actions;
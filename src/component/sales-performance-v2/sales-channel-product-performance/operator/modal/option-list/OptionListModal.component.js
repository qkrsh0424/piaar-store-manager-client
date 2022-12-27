import { useState } from "react";
import { Container, InputFieldWrapper, ListFieldWrapper } from "./OptionListModal.styled";

function InputField({ inputValue, onChangeInputValue }) {
    return (
        <InputFieldWrapper>
            <input
                type='text'
                className='input-el'
                placeholder='상품명을 입력해주세요.'
                value={inputValue || ''}
                onChange={(e) => onChangeInputValue(e)}
            ></input>
        </InputFieldWrapper>
    )
}

function ListField({ options, inputValue, onSubmitConfirm }) {
    return (
        <ListFieldWrapper>
            {options?.map(r => {
                if (r.defaultName.includes(inputValue)) {
                    return (
                        <button
                            key={r.id}
                            className='button-el'
                            onClick={() => onSubmitConfirm(r.id)}
                        >
                            <HighlightedText
                                text={`${r.defaultName}`}
                                query={inputValue}
                            />
                        </button>
                    )
                }
            })}
        </ListFieldWrapper>
    )
}

function HighlightedText({ text, query }) {
    if (query !== '' && text.includes(query)) {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));

        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <mark key={index}>{part}</mark>
                    ) : (
                        part
                    ),
                )}
            </>
        );
    }

    return text;
};

export default function OptionListModalComponent (props) {
    const [inputValue, setInputValue] = useState('');

    const __handle = {
        action: {
            changeInputValue: (e) => {
                setInputValue(e.target.value);
            }
        },
        submit: {
            confirmSelectedOption: (optionId) => {
                props.onActionSelectedOption(optionId);
            }
        }
    }

    return (
        <Container>
            <InputField
                inputValue={inputValue}
                onChangeInputValue={__handle.action.changeInputValue}
            />

            <ListField
                options={props.options}
                inputValue={inputValue}

                onSubmitConfirm={__handle.submit.confirmSelectedOption}
            />
        </Container>
    )
}
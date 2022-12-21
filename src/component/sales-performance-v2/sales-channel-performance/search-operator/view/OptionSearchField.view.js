import { useState } from "react";
import { OptionSearchFieldWrapper } from "../SearchOperator.styled";

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

export default function OptionSearchFieldView(props) {
    return (
        <OptionSearchFieldWrapper>
            <button
                type='button'
                className='button-el'
                onClick={(e) => props.onActionOpenOptionListModal(e)}
            >
                {props.selectedOption ? props.selectedOption.defaultName : '옵션 선택'}
            </button>
        </OptionSearchFieldWrapper>
    )
}
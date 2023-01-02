import { useState } from "react";
import { Container, InputFieldWrapper, ListFieldWrapper } from "./ProductListModal.styled";

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

function ListField({ products, inputValue, onSubmitConfirm }) {
    return (
        <ListFieldWrapper>
            {products?.map(r => {
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

export default function ProductListModalComponent (props) {
    const [inputValue, setInputValue] = useState('');

    const __handle = {
        action: {
            changeInputValue: (e) => {
                setInputValue(e.target.value);
            }
        },
        submit: {
            confirmSelectedProduct: (productId) => {
                props.onActionSelectedProduct(productId);
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
                products={props.products}
                inputValue={inputValue}

                onSubmitConfirm={__handle.submit.confirmSelectedProduct}
            />
        </Container>
    )
}
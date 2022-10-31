import { ListFieldWrapper } from "./OptionPackageModal.styled";

function HighlightedText({ text, query }) {
    if (query !== '' && text.includes(query)) {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));

        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <mark key={index} style={{ backgroundColor: '#7a7bda36', borderRadius: '15px' }}>{part}</mark>
                    ) : (
                        part
                    ),
                )}
            </>
        );
    }

    return text;
};

export default function ListFieldView (props) {
    return (
        <ListFieldWrapper>
            {props.productOptions?.map(r => {
                if (r.option.defaultName.includes(props.inputValue) || r.option.code.includes(props.inputValue) || r.product.defaultName.includes(props.inputValue)) {
                    return (
                        <button
                            key={r.option.id}
                            className='button-item'
                            onClick={() => props.onActionAddPackageOption(r)}
                        >
                            <HighlightedText
                                text={`[${r.option.code}]\t[${r.product.defaultName}]\t[${r.option.defaultName}]`}
                                query={props.inputValue}
                            />
                        </button>
                    );
                }
            })}
        </ListFieldWrapper>
    )
}
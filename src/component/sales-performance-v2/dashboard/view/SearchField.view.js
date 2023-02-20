import { PropaneSharp } from "@mui/icons-material";
import { SearchFieldWrapper } from "../Dashboard.styled";

export default function SearchFieldView(props) {
    return (
        <SearchFieldWrapper>
            <div>검색 기준 : </div>
            {props.periodType === 'registration' &&
                <div>
                    <button
                        className='button-el'
                        onClick={(e) => props.onChangePeriodType(e)}
                        value='registration'
                    >
                        주문 등록일
                    </button>
                </div>
            }
            {props.periodType === 'channelOrderDate' &&
                <div>
                    <button
                        className='button-el'
                        onClick={(e) => props.onChangePeriodType(e)}
                        value='channelOrderDate'
                    >
                        주문 일시
                    </button>
                </div>
            }
        </SearchFieldWrapper>
    )
}
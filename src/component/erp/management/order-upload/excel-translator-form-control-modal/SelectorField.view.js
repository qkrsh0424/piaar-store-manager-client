import { SelectorFieldWrapper } from "./ExcelTranslatorFormControl.styled";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';

export default function SelectorFieldView(props) {
    return (
        <SelectorFieldWrapper>
            <div className='selector-box'>
                <div className='box-info'>선택 목록</div>
                <div className='data-wrapper'>
                    {props.excelTranslatorData?.map((r, idx) => {
                        return(
                            <div
                                key={'excel-translator-idx'+idx}
                                className='option-item'
                                onClick={(e) => props.onActionAddViewForm(e, r.id)}
                            >
                                {`${r.uploadHeaderTitle} > ${r.downloadHeaderTitle} (헤더: ${r.rowStartNumber})`}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='selector-box'>
                <div className='box-info'>노출 목록</div>
                <div className='data-wrapper'>
                    <DragDropContext onDragEnd={(res) => props.onChangeViewFormOrder(res)}>
                        <Droppable droppableId={uuidv4()}>
                            {provided => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <div>
                                        {props.excelTranslatorViewData?.map((r, idx) => {
                                            return (
                                                <Draggable
                                                    key={r.id}
                                                    draggableId={r.id}
                                                    index={idx}
                                                >
                                                    {(provided => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <div
                                                                className='option-item'
                                                                onClick={(e) => props.onActionDeleteViewForm(e, r.id)}
                                                            >
                                                                <span className='index-el'>{idx + 1}.</span>
                                                                <span>{`${r.uploadHeaderTitle} > ${r.downloadHeaderTitle} (헤더: ${r.rowStartNumber})`}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </Draggable>
                                            )
                                        })}
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </SelectorFieldWrapper>
    );
}
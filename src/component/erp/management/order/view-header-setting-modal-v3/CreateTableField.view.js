import { CreateTableFieldWrapper } from "./ViewHeaderSettingModal.styled";
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SingleBlockButton from "../../../../module/button/SingleBlockButton";

export default function CreateTableFieldView(props) {
    return (
        <CreateTableFieldWrapper>
            <div
                className='list-wrapper'
            >
                <DragDropContext onDragEnd={props.onChangeOrderWithDragAndDrop}>
                    <Droppable
                        droppableId={uuidv4()}
                    >
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div
                                    className='list-head-box'
                                >
                                    <div
                                        className='list-item'
                                        style={{
                                            width: '15%'
                                        }}
                                    >순서</div>
                                    <div
                                        className='list-item'
                                        style={{
                                            flex: 1
                                        }}
                                    >헤더명 지정</div>
                                    <div
                                        className='list-item'
                                        style={{
                                            flex: 1
                                        }}
                                    >기준 항목</div>
                                    <div
                                        className='list-item'
                                        style={{
                                            width: '15%'
                                        }}
                                    >기준 순서</div>
                                    <div
                                        className='list-item'
                                        style={{
                                            width: '15%'
                                        }}
                                    >선택해제</div>
                                </div>
                                {props.viewHeaderDetails.map((r, index) => {
                                    return (
                                        <Draggable
                                            key={r.matchedColumnName}
                                            draggableId={r.matchedColumnName}
                                            index={index}

                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className='list-body-box'
                                                    style={{
                                                        ...provided.draggableProps.style
                                                    }}
                                                >
                                                    <div
                                                        className='list-item'
                                                        style={{
                                                            width: '15%'
                                                        }}
                                                    >
                                                        <img
                                                            src='/assets/icon/up_and_down_arrow.png'
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                left: 0,
                                                                transform: 'translate(0, -50%)',
                                                                width: 20,
                                                                height: 20
                                                            }}
                                                            alt='up and down arrow'
                                                        ></img>
                                                        <div
                                                            style={{
                                                                flex: 1
                                                            }}
                                                        >
                                                            [{index + 1}]
                                                        </div>
                                                    </div>
                                                    <div
                                                        className='list-item'
                                                        style={{
                                                            flex: 1
                                                        }}
                                                    >
                                                        <input
                                                            type='text'
                                                            name='customCellName'
                                                            value={r.customCellName || ''}
                                                            onChange={(e) => props.onChangeValueOfName(e, index)}
                                                            className='header-name-input'
                                                        ></input>
                                                    </div>
                                                    <div
                                                        className='list-item'
                                                        style={{
                                                            flex: 1,
                                                        }}
                                                    >
                                                        <div>[{r.originCellName}]</div>
                                                    </div>
                                                    <div
                                                        className='list-item'
                                                        style={{
                                                            width: '15%'
                                                        }}
                                                    >
                                                        <div>[{r.cellNumber + 1}]</div>
                                                    </div>
                                                    <div
                                                        className='list-item'
                                                        style={{
                                                            width: '15%'
                                                        }}
                                                    >
                                                        <SingleBlockButton
                                                            className='remove-button'
                                                            onClick={() => props.onActionRemoveOne(index)}
                                                        >
                                                            해제
                                                        </SingleBlockButton>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </CreateTableFieldWrapper>
    );
}
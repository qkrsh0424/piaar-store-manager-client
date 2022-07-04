import Ripple from '../../../../module/button/Ripple';
import { CombineOperatorsWrapper } from './ReleaseListModal.styled';

const CombineOperators = (props) => {
    return (
        <>
            <CombineOperatorsWrapper>
                <div className='flex-box'>
                    <div>
                        <button
                            type='button'
                            className={`${props.releaseUnitMergeYn && 'checked-button'}`+ ` button-item`}
                            onClick={props._onAction_combineReleaseItemList}
                        >
                            출고 항목 병합
                            <Ripple
                                color={'#fff'}
                                duration={1000}
                            ></Ripple>
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            className={`${!props.releaseUnitMergeYn && 'checked-button'}`+ ` button-item`}
                            onClick={props._onAction_insulateReleaseItemList}
                        >
                            출고 항목 병합 해제
                            <Ripple
                                color={'#fff'}
                                duration={1000}
                            ></Ripple>
                        </button>
                    </div>
                </div>
            </CombineOperatorsWrapper>
        </>
    );
}
export default CombineOperators;
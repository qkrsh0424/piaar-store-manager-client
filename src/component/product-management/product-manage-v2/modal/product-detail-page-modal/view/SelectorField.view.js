import { SelectorFieldWrapper } from "../ProductDetailPageModal.styled";

export default function SelectorFieldView (props) {
    return (
        <SelectorFieldWrapper>
            <div className='selector-box'>
                <select
                    className='select-item'
                    value={props.selectedDetailPage?.id || ''}
                    onChange={(e) => props.onChangeSelectedDetailPage(e)}
                >
                    <option value=''>선택</option>
                    {props.detailPages?.map((r, idx) => {
                        return (
                            <option key={'detail-page-idx' + idx} value={r.id}>{r.title}</option>
                        )
                    })}
                </select>
            </div>
            <div className='flex-item place-items-center control-btn-box'>
                <button
                    className='button-el'
                    onClick={(e) => props.onActionAddDetailPage(e)}
                >
                    <img
                        src='/assets/icon/add_default_000000.svg'
                        style={{ width: '40px', position: 'absolute', top: '50%', transform: 'translate(-50%,-50%)', border: 'none', padding: '7px' }}
                        alt=""
                        loading='lazy'
                    />
                </button>
                <button
                    className='button-el'
                    onClick={(e) => props.onSubmitDeleteDetailPage(e)}
                >
                    <img
                        src='/assets/icon/delete_default_ff3060.svg'
                        style={{ width: '40px', position: 'absolute', top: '50%', transform: 'translate(-50%,-50%)', border: 'none', padding: '7px' }}
                        alt=""
                        loading='lazy'
                    ></img>
                </button>
                <button
                    className='button-el'
                >
                    <img
                        src='/assets/icon/star_outline_444444.svg'
                        style={{ width: '40px', position: 'absolute', top: '50%', transform: 'translate(-50%,-50%)', border: 'none', padding: '7px' }}
                        alt=""
                        loading='lazy'
                    ></img>
                </button>
                <button
                    className='button-el'
                    onClick={(e) => props.onActionDownloadDetailPage(e)}
                    disabled={!props.selectedDetailPage}
                >
                    <img
                        src='/assets/icon/download_default_444444.svg'
                        style={{ width: '40px', position: 'absolute', top: '50%', transform: 'translate(-50%,-50%)', border: 'none', padding: '7px' }}
                        alt=""
                        loading='lazy'
                    ></img>
                </button>
            </div>
        </SelectorFieldWrapper>
    )
}
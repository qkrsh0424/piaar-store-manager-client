import styled from 'styled-components';

import _ from 'lodash';
import OperatorComponent from './operator/Operator.component';

const Container = styled.div`
    height: 100%;
    padding: 60px 30px 150px 230px;
    margin: 0 auto;
    transition: all 0.5s;

    padding-left: ${props=> !props.navbarOpen && '30px'};

    @media screen and (max-width: 768px) {
        padding-left: 30px !important;
    }
`;

function PageTitleFieldView({ title }) {
    return (
        <div>
            <div className='page-title'>{title}</div>
        </div>
    )
}

const SalesChannelPerformanceComponent = (props) => {
    return (
        <Container navbarOpen={props.navbarOpen}>
            <PageTitleFieldView title={'총 매출액 & 판매건'} />

            <OperatorComponent />

            {/* <PayAmountGraphComponent />
            <RegistrationAndUnitGraphComponent />
            <PayAmountDayOfWeekGraphComponent />
            <SummaryTableComponent /> */}
        </Container>
    )
}

export default SalesChannelPerformanceComponent;

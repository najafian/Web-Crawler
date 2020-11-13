import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import '../assets/scss/App.scss';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {IRootState} from "../reducer";

interface IProps extends StateProps, DispatchProps, RouteComponentProps<{}> {

}


class LandingPage extends React.Component<IProps> {

    componentDidMount(): void {
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {
    }

    public render() {
        return (
            <div className="limiter">
              this is a test component!
            </div>
        );
    }

}

const mapStateToProps = ({locale}: IRootState) => ({
    locale,
});

const mapDispatchToProps = {
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LandingPage));

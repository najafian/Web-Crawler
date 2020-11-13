import * as React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {hot} from 'react-hot-loader';
import LandingPage from "./landing-page";

interface IState {
    isSmallScreen: boolean;
}


class RouterComponent extends React.Component<Record<string, unknown>, IState> {


    constructor(props) {
        super(props);
        this.state = {isSmallScreen: false};
    }

    componentDidMount() {
        // window.addEventListener("resize", this.updateDimensions);

        // this.updateDimensions(null);
    }

    componentWillUnmount() {
        // window.removeEventListener("resize", this.updateDimensions);
    }

    private updateDimensions = (e: any) => {
        this.setState({isSmallScreen: window.innerWidth < 500});
    };

    public render() {
        return (
            <BrowserRouter>
                <div style={{width: '100%', height: '100%'}}>
                    {/*{ this.state.isSmallScreen ? <HeaderSmall /> : <Header /> }*/}
                    <Switch>
                        <Route exact path={ '/'}
                               component={LandingPage}/>
                        {/*<Route path={ "/test"}*/}
                        {/*       component={Component1}/>*/}
                        <Redirect to={'/'}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

declare let module: Record<string, unknown>;

export default hot(module)(RouterComponent);

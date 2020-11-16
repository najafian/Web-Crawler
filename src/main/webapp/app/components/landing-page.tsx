import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import '../assets/scss/App.scss';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {IRootState} from "../reducer";
import {Col, Row} from "react-bootstrap";
import {CustomGrid, ICustomWidgetProp} from "app/utils/widget/pager/custom-grid";
import {ButtonElement} from "app/utils/widget/button/button-element";
import {ButtonWidget} from "app/utils/widget/button/button-widget";
import {IWidgetOps} from "app/utils/widget/common/common";
import {InputElement} from "app/utils/widget/textbox/Input-element";
import {Input} from "app/utils/widget/textbox/Input";
import {crawlExpectedUrl, exhibitProductResults} from "app/reducer/web-crawler-reducer";
import {LoadingBar} from "app/utils/widget/spinner/loading-bar";
import {ToastWidget} from "app/utils/widget/toast/toast-widget";


interface IProps extends StateProps, DispatchProps, RouteComponentProps<{}> {

}


class LandingPage extends React.Component<IProps> {
    private gridWidget: ICustomWidgetProp = {};
    private iButtonCrawlElement: IWidgetOps<ButtonWidget> = {};
    private iButtonShowElement: IWidgetOps<ButtonWidget> = {};
    private iTextCrawlElement: IWidgetOps<Input> = {};
    private loadingBar: LoadingBar = new LoadingBar();
    private toast: ToastWidget = new ToastWidget();

    componentDidMount(): void {
        this.loadingBar = new LoadingBar('root');
        this.iButtonShowElement.setEnable(false);
        this.iButtonCrawlElement.getWidget().OnClick(() => {
                this.props.crawlExpectedUrl(this.iTextCrawlElement.getValue());
                this.loadingBar.showLoading();
                this.toast.show({content: 'Web-Crawling is started!', showCloseButton: true});
            }
        );
        this.iButtonShowElement.getWidget().OnClick(() => {
                this.props.exhibitProductResults({page: 0, size: 100, pagerAction: false});
                this.loadingBar.showLoading();
                this.toast.show({content: 'Retrieving  is started!', showCloseButton: true});
            }
        );
        this.iButtonCrawlElement.getWidget().setLabel('WEB-CRAWLING', true);
        this.iButtonShowElement.getWidget().setLabel('SHOW-RESULTS', true);
        this.iTextCrawlElement.setValue('https://magento-test.finology.com.my/breathe-easy-tank.html')
        this.gridWidget.widget.setEmptyPager();
        this.gridWidget.widget.setGridColumn([
            {headerText: 'rowNumber', field: 'rowNum', width: 80},
            {headerText: 'productName', field: 'productName',width:300},
            {headerText: 'productPrice', field: 'productPrice', width: 90},
            {headerText: 'productDetail', field: 'productDetail', minWidth: 130},
            {headerText: 'activity', field: 'activity', width: 90},
            {headerText: 'style', field: 'style', minWidth: 90},
            {headerText: 'material', field: 'material', minWidth: 90},
            {headerText: 'pattern', field: 'pattern', width: 90},
            {headerText: 'climate', field: 'climate', width: 90},
            {headerText: 'gender', field: 'gender', width: 90},
            {headerText: 'category', field: 'category', width: 90}
        ]);
        this.gridWidget.pagerCallBack = props => this.props.exhibitProductResults({
            size: props.pageSize,
            page: props.pageIndex,
            pagerAction: true
        });
        this.gridWidget.widget.gridWidget.setWidgetDirection(false);
        this.gridWidget.widget.gridWidget.setHeight('330px');
        // this.gridWidget.widget.setPagerPageIndex(0);
        // this.gridWidget.widget.setPagerPageSize(100);
        // this.gridWidget.widget.setPagerTotalRecord(10);
        this.gridWidget.widget.setGridDataSource([]);

    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {
        const crawlerReducer = this.props.webCrawlerReducer.crawlerReducer;
        if (prevProps.webCrawlerReducer.crawlerReducer !== crawlerReducer) {
            this.loadingBar.hideLoading();
            this.toast.show({content: 'Web-Crawling is finished!', showCloseButton: true});
            this.iButtonCrawlElement.setEnable(false);
            this.iButtonShowElement.setEnable(true);
        }
        const showProductReducer = this.props.webCrawlerReducer.showProductReducer;
        if (prevProps.webCrawlerReducer.showProductReducer !== showProductReducer) {
            const pageable = showProductReducer.Pageable;
            const pageSize = pageable.size;
            const pageNumber = showProductReducer.pageIndex;
            let rowNum = pageSize * pageNumber + 1;
            const dataItems = pageable.content.map(m => ({
                productName:m.productName,
                productPrice:m.productPrice,
                productDetail:m.productDetail,
                rowNum: rowNum++,
                activity:m.extra.activity,
                category:m.extra.category,
                climate:m.extra.climate,
                gender:m.extra.gender,
                material:m.extra.material,
                pattern:m.extra.pattern,
                style:m.extra.style
            }));
            if (!showProductReducer.pagerAction) {
                this.gridWidget.widget.setPagerPageIndex(pageNumber);
                this.gridWidget.widget.setPagerPageSize(pageSize);
                this.gridWidget.widget.setPagerTotalRecord(pageable.totalElements);
            }
            this.gridWidget.widget.setGridDataSource(dataItems);
            this.loadingBar.hideLoading();
            this.iButtonShowElement.setEnable(false)
        }
    }

    public render() {
        return (
            <div style={{
                margin: '20px',
                border: '1px solid gray',
                borderRadius: '5px',
                height: '540px',
                padding: '10px'
            }}>
                <div className={'row'}
                     style={{
                         width: '700px',
                         padding: '5px',
                         border: '1px solid gray',
                         margin: '10px',
                         borderRadius: '5px',
                     }}>
                    <Col md={4}><ButtonElement width={'170px'} widgetProp={this.iButtonCrawlElement}/></Col>
                    <Col md={8}><InputElement width={'427px'} widgetProp={this.iTextCrawlElement}/></Col>
                    <Col md={4}><ButtonElement width={'170px'} widgetProp={this.iButtonShowElement}/></Col>
                </div>
                <hr/>
                <div style={{height: 'calc(100% - 30px)'}}>
                    <div className={'col-md-12'} style={{height: '100%'}}>
                        <CustomGrid propInfo={this.gridWidget}/>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = ({webCrawlerReducer, locale}: IRootState) => ({
    locale,
    webCrawlerReducer
});

const mapDispatchToProps = {
    crawlExpectedUrl,
    exhibitProductResults
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LandingPage));

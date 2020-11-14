import React from 'react';
import {Column, ColumnModel, DataResult} from '@syncfusion/ej2-grids';
import {DataManager} from '@syncfusion/ej2-data';
import {translate} from 'react-jhipster';
import {IWidgetCommon} from "app/utils/widget/common/common";
import {Gridview} from "app/utils/widget/gridview/gridview";
import {LoadingBar} from "app/utils/widget/spinner/loading-bar";
import UniqueID from "app/utils/uniqueKey";

declare var $: any;

export interface ICustomWidgetProp {
    widget?: CustomGrid;

    pagerCallBack?(info: { pageIndex: number; pageSize: number; total: number }): void;
}

export interface IProps {
    propInfo: ICustomWidgetProp;
}

interface IPageType {
    pageIndex: number;
    pageSize: number;
}

export class CustomGrid extends React.Component<IProps> implements IWidgetCommon<any> {
    pageID: string;
    gridID: string;
    gridWidget: Gridview;
    pager: any;
    pagerSize: number;
    pageClicked: any = undefined;
    jumpClicked: any = undefined;
    pageSizeChanged: any = undefined;
    tosanLoading: LoadingBar;
    isRtl = true;
    private customGridID: string = UniqueID();

    setHeight(height: string | number) {
    }

    setWidth(width: string | number) {
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
    }

    destroy(): void {
        $('#' + this.gridID).pagination('destroy');
    }

    getWidget() {
        return this.props.propInfo.widget;
    }

    getElement() {
        return document.getElementById(this.customGridID);
    }

    getElementID() {
        return this.customGridID;
    }

    createWidget(element: any): void {
        throw new Error('Method not implemented.');
    }

    setWidgetDirection(isRtl: boolean): void {
        this.isRtl = isRtl;
        $('.m-pagination-page').css('float', isRtl ? 'right' : 'left');
        $('.m-pagination-size').css('float', isRtl ? 'right' : 'left');
        $('.m-pagination-jump').css('float', isRtl ? 'right' : 'left');
        $('.m-pagination-info').css('float', !isRtl ? 'right' : 'left');
        $('.m-pagination-info').css('direction', isRtl ? 'rtl' : 'ltr');

        this.gridWidget.setWidgetDirection(isRtl);
    }

    applyPermission(elementPermissionID: string, userPermissions: string[]): void {
        throw new Error('Method not implemented.');
    }

    getLabel(): string {
        throw new Error('Method not implemented.');
    }

    setLabel(label: string) {
        throw new Error('Method not implemented.');
    }

    constructor(props) {
        super(props);
        this.pageID = UniqueID();
        this.gridID = UniqueID();
        this.gridWidget = new Gridview();
        this.gridWidget.getWidget().allowResizing = true;
        $('#' + this.gridID).css('height', 'calc(100% - 26px)');
        this.props.propInfo.widget = this;
    }

    setEmptyPager() {
        this.setPagerDataSource({pageIndex: undefined, pageSize: 50, total: 0, pageSizeItems: [20, 50, 100, 200]});
    }

    setPagerDataSource(pagerInfo: { pageIndex: number; pageSize: number; total: number; pageSizeItems: number[] }) {
        const container = $('#' + this.pageID);
        this.pagerSize = pagerInfo.pageSize;
        const pageElementSort1 = this.isRtl ? ['$jump', '$page', '$size', '$info'] : ['$size', '$page', '$jump', '$info'];
        this.pager = container
            .pagination({
                pageIndex: pagerInfo.pageIndex,
                pageSize: pagerInfo.pageSize,
                total: pagerInfo.total,
                debug: true,
                showInfo: true,
                showJump: true,
                showPageSizes: true,
                pageSizeItems: pagerInfo.pageSizeItems,
                pageElementSort: pageElementSort1,
                showFirstLastBtn: true
            })
            .pagination();
        const callMyMethod = (index: number, size: number) => {
            this.pagerSize = size;
            this.props.propInfo.pagerCallBack({
                pageIndex: index,
                pageSize: size,
                total: this.pager.total
            });
        };
        container.on('pageClicked', (event, data: IPageType) => {
            callMyMethod(data.pageIndex, data.pageSize);
        });
        container.on('jumpClicked', (event, data: IPageType) => {
            callMyMethod(data.pageIndex, data.pageSize);
        });
        container.on('pageSizeChanged', (event, data: IPageType) => {
            callMyMethod(0, data.pageSize);
        });
        this.pager.renderPagination();
    }

    setPagerTotalRecord(total: number) {
        this.pager.total = total;
        this.pager.renderPagination();
    }

    setPagerPageSize(pageSize: number) {
        this.pager.setPageSize(pageSize);
        this.pager.renderPagination();
    }

    getPagerCurrentPageIndex() {
        return this.pager.currentPageIndex;
    }

    getPagerLastPageNum() {
        return this.pager.getLastPageNum();
    }

    setPagerPageIndex(pageIndex: number) {
        this.pager.setPageIndex(pageIndex);
        this.pager.renderPagination();
    }

    setGridColumn(columns: Column[] | string[] | ColumnModel[]) {
        this.gridWidget.getWidget().columns = columns;
    }

    setGridDataSource(dataSource: any | DataManager | DataResult) {
        this.gridWidget.getWidget().dataSource = dataSource;
    }

    showLoading() {
        this.tosanLoading.showLoading();
    }

    getLoadingBar() {
        return this.tosanLoading;
    }

    setLoadingCustomElement(element: string | HTMLElement) {
        this.tosanLoading.setLoadingElement(element);
    }

    hideLoading() {
        this.tosanLoading.hideLoading();
    }

    componentDidMount(): void {
        this.tosanLoading = new LoadingBar(this.customGridID);
        this.gridWidget.allowPaging(false);
        this.gridWidget.allowSorting(true);
        this.gridWidget.setWidgetDirection(true);
        this.gridWidget.createWidget(this.gridID);
        this.gridWidget.removeAutoDeselecting();
        let selectedItem;
        this.gridWidget.getElement().addEventListener('mousedown', e => {
            selectedItem = this.gridWidget.getSelectedItemByRowElement((e.target as any).parentElement);
        });
        // this.gridWidget.rowDeselecting(e => {
        //   if (selectedItem === e.data[0] && (e.data as any).length === 1) {
        //     e.cancel = true;
        //   }
        //   // e.data = [this.gridWidget.getSelectedRowItem()];
        // });
        $('#' + this.pageID)
            .on('pageClicked', (event, data) => {
                if (this.pageClicked) {
                    this.pageClicked(data);
                }
            })
            .on('jumpClicked', (event, data) => {
                if (this.jumpClicked) {
                    this.jumpClicked(data);
                }
            })
            .on('pageSizeChanged', (event, data) => {
                if (this.pageSizeChanged) {
                    this.pageSizeChanged(data);
                }
            });
        this.gridWidget.getWidget().dataBound = () => {
            this.getLoadingBar().hideLoading();
        };
    }

    render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div style={{height: '100%', width: '100%', overflow: 'hidden'}} id={this.customGridID}>
                <div style={{ overflowX: 'auto'}}>
                    <div id={this.gridID} className="gridFitContent"/>
                </div>
                <div
                    style={{
                        direction: 'rtl',
                        height: '35px',
                        backgroundColor: '#e0e0e0',
                        border: 'solid 1px #c9c7c7',
                        padding: '0 15px'
                    }}
                >
                    <div id={this.pageID}/>
                </div>
            </div>
        );
    }
}

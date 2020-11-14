import {
  ContextMenu,
  Resize,
  Grid,
  Filter,
  Page,
  Selection,
  Edit,
  Toolbar,
  // ToolbarItems,
  CommandColumn,
  Sort,
  DetailRow,
  ExcelExport,
  PdfExport,
  Group,
  SearchEventArgs,
  FilterEventArgs,
  GroupEventArgs,
  PageEventArgs,
  ActionEventArgs,
  EditEventArgs,
  DeleteEventArgs,
  SaveEventArgs,
  AddEventArgs,
  SortEventArgs,
  Column,
  ColumnModel,
  TextWrapSettingsModel,
  RowSelectEventArgs,
  EditMode,
  ToolbarItems,
  ToolbarItem,
  NewRowPosition,
  PageSettingsModel,
  CellSaveArgs,
  FilterSettingsModel,
  ContextMenuItem,
  ContextMenuItemModel,
  RowDeselectEventArgs
} from '@syncfusion/ej2-grids';
import { L10n, EmitType } from '@syncfusion/ej2-base';
import { ItemModel, DataSourceChangedEventArgs } from '@syncfusion/ej2-navigations';
import { translate } from 'react-jhipster';
import {IWidgetCommon} from "app/utils/widget/common/common";

Grid.Inject(ContextMenu, Resize, Filter, Page, Selection, Toolbar, CommandColumn, Sort, DetailRow, ExcelExport, PdfExport, Group, Edit);
L10n.load({
  'fa-IR': {
    grid: {
      EmptyRecord: 'ردیفی برای نمایش موجود نمی باشد'
    },
    gridList: {
      EmptyRecord: 'هیچ رکوردی برای نمایش موجود نمی باشد',
      GroupDropArea: 'محل گروه بندی',
      UnGroup: 'گروه بندی',
      EmptyDataSourceError: 'منبع خالی است',
      Item: 'آیتم',
      Items: 'موارد'
    },
    toolbar: {
      add: 'ایجاد'
    },
    pager: {
      currentPageInfo: 'صفحه {0} از {1} ',
      totalItemsInfo: '({0} مجموع)',
      firstPageTooltip: 'اولین صفحه',
      lastPageTooltip: 'آخرین صفحه',
      nextPageTooltip: 'صفحه بعد',
      previousPageTooltip: 'صفحه قبل',
      nextPagerTooltip: 'صفحه بعد',
      previousPagerTooltip: 'صفحه قبل',
      pagerDropDown: 'تعداد رکورد در صفحه',
      All: 'همه',
      FilterButton: 'فیلتر کردن',
      FilterMenu: 'فیلتر کردن',
      ClearButton: 'پاک کردن فیلتر'
    },
    FilterButton: 'فیلتر کردن',
    FilterMenu: 'فیلتر کردن',
    ClearButton: 'پاک کردن فیلتر'
  }
});

export enum TosanGridLocalization {
  EN = 'en-US',
  FA = 'fa-IR'
}

// this.grid.allowTextWrap(true);
// this.grid.textWrapSettings({ wrapMode: 'Content' });
// this.grid.contextMenuItems([
//   'AutoFit',
//   'AutoFitAll',
//   'SortAscending',
//   'SortDescending',
//   'Cancel',
//   'Copy',
//   'Edit',
//   'Delete',
//   'Save',
//   'Cancel',
//   'PdfExport',
//   'ExcelExport',
//   'CsvExport',
//   'FirstPage',
//   'PrevPage',
//   'LastPage',
//   'NextPage']);
export class Gridview implements IWidgetCommon<Grid> {
  private readonly grid: Grid;
  private rowItem: any;
  private isAuthenticated: boolean;

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
  }

  constructor() {
    this.grid = new Grid();
    this.grid.rowSelected = (e: RowSelectEventArgs) => {
      this.rowItem = e.data;
    };
    this.grid.gridLines = 'Both';
    this.grid.allowResizing = true;
    this.grid.allowTextWrap = false;
    this.allowSorting(true);
    // this.allowFiltering(true);
  }

  removeSelectedRow() {
    if (this.getSelectedRowItem() !== null) {
      this.grid.dataSource = (this.grid.dataSource as []).filter(f => f !== this.getSelectedRowItem());
      this.grid.dataBind();
    }
  }

  selectedEvent(rowSelected: EmitType<RowSelectEventArgs>) {
    this.grid.rowSelected = rowSelected;
  }

  setLocalization(location: TosanGridLocalization) {
    this.grid.locale = location;
  }

  rowDeselected(rowDeselected: EmitType<RowDeselectEventArgs>) {
    this.grid.rowDeselected = rowDeselected;
  }

  rowDeselecting(rowDeselecting: EmitType<RowDeselectEventArgs>) {
    this.grid.rowDeselecting = rowDeselecting;
  }

  getSelectedRowItem(): any {
    try {
      return this.grid.getRowObjectFromUID(this.grid.getSelectedRows()[0].getAttribute('data-uid')).data as any;
    } catch (e) {
      console.log(e.toString());
    }
    return null;
  }

  getSelectedItemByRowElement(tr: HTMLTableRowElement) {
    try {
      return this.grid.getRowObjectFromUID(tr.getAttribute('data-uid')).data as any;
    } catch (e) {
      console.log(e.toString());
    }
    return null;
  }

  getSelectedRowItemWithGeneric<T>(): T {
    try {
      return this.grid.getRowObjectFromUID(this.grid.getSelectedRows()[0].getAttribute('data-uid')).data as T;
    } catch (e) {
      console.log(e.toString());
    }
    return null;
  }

  allowTextWrap(allowTextWrap: boolean) {
    this.grid.allowTextWrap = allowTextWrap;
  }

  textWrapSettings(textWrapSettings: TextWrapSettingsModel) {
    this.grid.textWrapSettings = textWrapSettings;
  }

  removeAutoDeselecting() {
    let selectedItem;
    this.getElement().addEventListener('mousedown', e => {
      selectedItem = this.getSelectedItemByRowElement((e.target as any).parentElement);
    });
    this.rowDeselecting(e => {
      if (selectedItem === e.data[0] || selectedItem === e.data) {
        e.cancel = true;
      }
      // e.data = [this.gridWidget.getSelectedRowItem()];
    });
  }

  getElement() {
    return this.grid.element;
  }

  setDataSource(data: any): void {
    this.grid.dataSource = data;
    // this.grid.removeTextWrap();
    this.grid.dataBind();
  }

  addOrUpdateRow(data: any, idName: string) {
    const dataSource = this.getDataSource();
    // const filter = dataSource.filter(f => f[idName] !== data[idName]);
    let findStat = false;
    let index = 0;
    const filter = dataSource.map((m, i) => {
      if (!findStat && m[idName] === data[idName]) {
        index = i;
        m = data;
        findStat = true;
      }
      return m;
    });
    if (!findStat) {
      filter.push(data);
    }
    this.setDataSource(filter);
    // this.grid.sortColumn(idName, 'Ascending', false);
    this.dataBind();
    if (findStat) {
      setTimeout(() => {
        this.grid.selectRow(index);
      }, 200);
    }
  }

  onCellSaved(cellSaved: EmitType<CellSaveArgs>) {
    this.grid.cellSaved = cellSaved;
  }

  onDataSourceChanged(dataSourceChanged: EmitType<DataSourceChangedEventArgs>) {
    this.grid.dataSourceChanged = dataSourceChanged;
  }

  getDataSource(): any {
    return this.grid.dataSource;
  }

  getSelectedRows(): Element[] {
    return this.grid.getSelectedRows();
  }

  onSelect(rowSelected: EmitType<RowSelectEventArgs>) {
    this.grid.rowSelected = rowSelected;
  }

  onActionComplete(
    actionComplete: EmitType<
      | PageEventArgs
      | GroupEventArgs
      | FilterEventArgs
      | SearchEventArgs
      | SortEventArgs
      | AddEventArgs
      | SaveEventArgs
      | EditEventArgs
      | DeleteEventArgs
      | ActionEventArgs
    >
  ) {
    this.grid.actionComplete = actionComplete;
  }

  allowPaging(allowPaging: boolean): void {
    this.grid.allowPaging = allowPaging;
  }

  allowGrouping(allowGrouping: boolean): void {
    this.grid.allowGrouping = allowGrouping;
  }

  setWidgetDirection(isRtl: any): void {
    this.grid.enableRtl = isRtl;
    this.grid.locale = translate('settings.controlsLocation');
    // this.grid.dataBind();
  }

  actionBegin(
    actionBegin: EmitType<
      | PageEventArgs
      | GroupEventArgs
      | FilterEventArgs
      | SearchEventArgs
      | SortEventArgs
      | AddEventArgs
      | SaveEventArgs
      | EditEventArgs
      | DeleteEventArgs
      | ActionEventArgs
    >
  ) {
    this.grid.actionBegin = actionBegin;
  }

  allowReordering(allowReordering: boolean): void {
    this.grid.allowReordering = allowReordering;
  }

  allowFiltering(allowFiltering: boolean): void {
    this.grid.allowFiltering = allowFiltering;
  }

  allowSorting(allowSorting: boolean): void {
    this.grid.allowSorting = allowSorting;
  }

  allowExcelExport(allowExcelExport: boolean): void {
    this.grid.allowExcelExport = allowExcelExport;
  }

  allowPdfExport(allowPdfExport: boolean): void {
    this.grid.allowPdfExport = allowPdfExport;
  }

  editSettings(
    allowEditing?: boolean,
    allowAdding?: boolean,
    allowDeleting?: boolean,
    mode?: EditMode,
    newRowPosition?: NewRowPosition,
    editTemplate?: string
  ): void {
    if (allowEditing || allowAdding || allowDeleting) {
      Grid.Inject(Edit, Toolbar);
    }
    this.grid.editSettings.template = editTemplate;
    this.grid.editSettings.allowEditing = allowEditing;
    this.grid.editSettings.allowAdding = allowAdding;
    this.grid.editSettings.allowDeleting = allowDeleting;
    this.grid.editSettings.newRowPosition = newRowPosition;
    this.grid.editSettings.mode = mode;
  }

  showDeleteConfirmDialog(showDeleteConfirmDialog: boolean): void {
    this.grid.editSettings.showDeleteConfirmDialog = showDeleteConfirmDialog;
  }

  setGridLine(gridLine: any) {
    this.grid.gridLines = gridLine;
  }

  allowEditOnDblClick(allowEditOnDblClick: boolean): void {
    this.grid.editSettings.allowEditOnDblClick = allowEditOnDblClick;
  }

  allowNextRowEdit(allowNextRowEdit: boolean): void {
    this.grid.editSettings.allowNextRowEdit = allowNextRowEdit;
  }

  enableHover(enableHover: boolean): void {
    this.grid.enableHover = enableHover;
  }

  newRowPosition(newRowPosition: any): void {
    this.grid.editSettings.newRowPosition = newRowPosition;
  }

  showConfirmDialog(showConfirmDialog: boolean): void {
    this.grid.editSettings.showConfirmDialog = showConfirmDialog;
  }

  editTemplate(template: any): void {
    this.grid.editSettings.template = template;
  }

  contextMenuItems(contextMenuItems: ContextMenuItem[] | ContextMenuItemModel[]): void {
    // ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending','Cancel', 'Copy', 'Edit', 'Delete', 'Save',
    // 'Cancel','PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage','LastPage', 'NextPage']
    this.grid.contextMenuItems = contextMenuItems;
  }

  addToolbar(toolbar: Array<ToolbarItems | string | ItemModel | ToolbarItem>): void {
    //  toolbar: [ 'Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport', 'Search','PdfExport'],
    this.grid.toolbar = toolbar;
  }

  enableColumnVirtualization(enableVirtualization: boolean) {
    this.grid.enableColumnVirtualization = enableVirtualization;
  }

  enableVirtualization(enableVirtualization: boolean): void {
    this.grid.enableVirtualization = enableVirtualization;
  }

  filterSettings(filterSettings: FilterSettingsModel): void {
    // { type: 'Menu' },
    this.grid.filterSettings = filterSettings;
  }

  selectionSettings(
    persistSelection?: boolean,
    type?: any,
    checkboxOnly?: boolean,
    cellSelectionMode?: any,
    checkboxMode?: any,
    enableSimpleMultiRowSelection?: any,
    enableToggle?: any,
    mode?: any
  ): void {
    this.grid.selectionSettings.persistSelection = persistSelection;
    this.grid.selectionSettings.type = type;
    this.grid.selectionSettings.checkboxOnly = checkboxOnly;
    this.grid.selectionSettings.cellSelectionMode = cellSelectionMode;
    this.grid.selectionSettings.checkboxMode = checkboxMode;
    this.grid.selectionSettings.enableSimpleMultiRowSelection = enableSimpleMultiRowSelection;
    this.grid.selectionSettings.enableToggle = enableToggle;
    this.grid.selectionSettings.mode = mode;
  }

  rowHeight(rowHeight: number): void {
    this.grid.rowHeight = rowHeight;
  }

  addRecord(newRow, index?) {
    this.grid.addRecord(newRow, index);
    this.grid.dataBind();
  }

  pageSettings(pageSettings: PageSettingsModel): void {
    // { pageCount: 2, pageSizes: true },
    this.grid.pageSettings = pageSettings;
  }

  getPageSettings(): PageSettingsModel {
    return this.grid.pageSettings;
  }

  columns(columns: Column[] | string[] | ColumnModel[]): void {
    //  [{type: 'checkbox', allowFiltering: false, allowSorting: false, width: '60'},
    // { field: 'userID', headerText: 'شماره پذیرنده', isPrimaryKey: true, width: '100' ,filter: { type: 'Menu' }},
    // {field: 'userNameID', headerText: 'نام پذیرنده', width: '170', clipMode: 'EllipsisWithTooltip',template: '#empTemplate',filter: { type: 'CheckBox' }}
    // ,{
    //   headerText: 'Manage Records', width: 160,
    //   commands: [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    //     { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    //     { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    //     { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }]
    // }]
    this.grid.columns = columns;
  }

  setColumnHeaderText(columns: Column[] | string[] | ColumnModel[]) {
    columns.forEach(a => {
      const col = a as ColumnModel;
      this.grid.getColumnByField(col.field).headerText = col.headerText;
    });
    try {
      this.grid.refreshHeader();
    } catch (e) {
      console.log(e);
    }
  }

  actionComplete(
    actionComplete: EmitType<
      | PageEventArgs
      | GroupEventArgs
      | FilterEventArgs
      | SearchEventArgs
      | SortEventArgs
      | AddEventArgs
      | SaveEventArgs
      | EditEventArgs
      | DeleteEventArgs
      | ActionEventArgs
    >
  ): void {
    this.grid.actionComplete = actionComplete;
  }

  actionPageComplete(actionComplete: EmitType<PageEventArgs>): void {
    this.grid.actionComplete = actionComplete;
  }

  createWidget(element: any): void {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        this.grid.appendTo(element);
      } else {
        this.grid.appendTo('#' + element);
      }
      this.rowHeight(27);
      this.setGridLine('Both');
      this.enableHover(true);
      this.enableAltRow(true);
      this.removeAutoDeselecting();
    }
  }

  destroy(): void {
    this.grid.destroy();
  }

  getWidget(): Grid {
    return this.grid;
  }

  setHeight(height: number | string) {
    this.grid.height = height;
  }

  setWidth(width: number) {
    if (width !== undefined) {
      this.grid.width = width;
    }
  }

  dataBind(): void {
    try {
      this.grid.dataReady();
    } catch (e) {
      console.log(e);
    }
  }

  databound(dataBound: EmitType<any>) {
    this.grid.dataBound = dataBound;
  }

  refresh(): void {
    this.grid.refresh();
  }

  enableAltRow(enableAltRow: boolean): void {
    this.grid.enableAltRow = enableAltRow;
  }

  getLabel(): string {
    return '';
  }

  setLabel(label: string) {}

  private setDisability(b: boolean) {}
}

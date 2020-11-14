import axios from 'axios';
import {FAILURE, REQUEST, SUCCESS} from "../utils/action-type.util";
import {IGetResultValues} from "./model";

export const ACTION_TYPES = {
    WEB_CRAWLER_URL: 'locale/WEB_CRAWLER_URL',
    SHOW_CRAWLER_PRODUCTS: 'locale/SHOW_CRAWLER_PRODUCTS'
};

const initialState = {
    crawlerReducer: null,
    showProductReducer: null
};

export type WebCrawlerReducer = Readonly<typeof initialState>;

export default (state: WebCrawlerReducer = initialState, action): WebCrawlerReducer => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.WEB_CRAWLER_URL):
        case REQUEST(ACTION_TYPES.SHOW_CRAWLER_PRODUCTS):
            return {
                ...state
            }
        case FAILURE(ACTION_TYPES.WEB_CRAWLER_URL):
        case FAILURE(ACTION_TYPES.SHOW_CRAWLER_PRODUCTS):
            return {
                ...state
            }
        case SUCCESS(ACTION_TYPES.WEB_CRAWLER_URL):
            return {
                ...state,
                crawlerReducer: action.payload.data
            }
        case SUCCESS(ACTION_TYPES.SHOW_CRAWLER_PRODUCTS):
            return {
                ...state,
                showProductReducer: action.payload.data
            }
        default:
            return state;
    }
};

export const crawlExpectedUrl: IGetResultValues<any> = paramValue => ({
    type: ACTION_TYPES.WEB_CRAWLER_URL,
    payload: axios.get('api/crawling?url=' + paramValue)
});

export const exhibitProductResults: IGetResultValues<{ page: any; size; pagerAction }> = paramValue => ({
    type: ACTION_TYPES.SHOW_CRAWLER_PRODUCTS,
    payload: axios.get(`api/exhibitProducts?page=${paramValue.page}&size=${paramValue.size}&pagerAction=${paramValue.pagerAction}`)
});

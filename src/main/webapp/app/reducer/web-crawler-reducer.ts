import axios from 'axios';
import {FAILURE, REQUEST, SUCCESS} from "../utils/action-type.util";
import {IGetResultValues} from "./model";

export const ACTION_TYPES = {
    WEB_CRAWLER_URL: 'locale/WEB_CRAWLER_URL'
};

const initialState = {
    crawlerReducer: null
};

export type WebCrawlerReducer = Readonly<typeof initialState>;

export default (state: WebCrawlerReducer = initialState, action): WebCrawlerReducer => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.WEB_CRAWLER_URL):
            return {
                ...state
            }
        case FAILURE(ACTION_TYPES.WEB_CRAWLER_URL):
            return {
                ...state
            }
        case SUCCESS(ACTION_TYPES.WEB_CRAWLER_URL):
            return {
                ...state,
                crawlerReducer: action.payload.data
            }
        default:
            return state;
    }
};

export const getConfig: IGetResultValues<any> = () => ({
    type: ACTION_TYPES.WEB_CRAWLER_URL,
    payload: axios.get('api/test')
});

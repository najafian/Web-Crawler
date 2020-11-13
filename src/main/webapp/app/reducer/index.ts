import {combineReducers} from 'redux';
import locale, {LocaleState} from './locale';
import webCrawlerReducer,{WebCrawlerReducer} from "app/reducer/web-crawler-reducer";

export interface IRootState {
    readonly locale: LocaleState;
    readonly webCrawlerReducer: WebCrawlerReducer;
}

const rootReducer = combineReducers<IRootState>({
    webCrawlerReducer,
    locale
});

export default rootReducer;

import { IPayload } from 'react-jhipster';

export type IGetResultValues<T> = (
    data?: T,
    tabID?: string,
    page?: number,
    size?: number,
    sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

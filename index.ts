import { StoreApi } from 'zustand';
import { devtools as Devtools } from 'zustand/middleware';

interface IPayload {
  type: string;
  [key: string]: unknown;
}

const getCallerFunctionNameFromStack = () => {
  const error = new Error();
  const firefox = (error?.stack?.split('\n')[2].match(/^.*(?=@)/) || [])[0];
  const chrome = ((((error?.stack?.split('at ') || [])[3] || '').match(/(^|\.| <| )(.*[^(<])( \()/) || [])[2] || '').split('.').pop();
  const safari = error?.stack?.split('\n')[2];

  return firefox || chrome || safari || '';
};

const getAction = (payload: IPayload | string, nameCaller: string, devtoolsName?: string) => {
  const isObject = typeof payload === 'object';
  const name = isObject ? ('type' in payload ? payload.type : '') : payload;
  const actionName = [devtoolsName, name || nameCaller].filter(Boolean).join('/');

  return isObject ? { ...payload, type: actionName } : actionName;
};

export const devtools: typeof Devtools = (initializer, devtoolsOptions) =>
  Devtools((set, get, api) => {
    type S = ReturnType<typeof initializer> & {
      [store: string]: ReturnType<typeof initializer>;
    };

    (api.setState as StoreApi<S>['setState']) = (target, replace, ...arg) => {
      const nameCaller = getCallerFunctionNameFromStack();
      const action = getAction([...arg]?.[0], nameCaller, devtoolsOptions?.name);
      (set as Function)(target, replace, action);
    };

    return initializer(api.setState as typeof set, get, api);
  });

export type DevtoolsOptions = typeof Devtools;

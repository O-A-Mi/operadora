import { devBaseInf, prodBaseInf, baseInf } from './json';

export const getBaseConfig = () => {
  const isDev = baseInf.appMode === 'dev';
  
  return {
    baselinkJson: isDev ? '' : prodBaseInf.baselinkJson,
    baselink: isDev ? devBaseInf.baselink : prodBaseInf.baselink,
    companyId: isDev ? devBaseInf.cd_empresa : prodBaseInf.cd_empresa,
    endpoints: baseInf.endpoints,
    environment: baseInf.appMode
  };
};
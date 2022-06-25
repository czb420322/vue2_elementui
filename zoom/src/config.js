let config = ""; //这里是一个默认的url，可以没有
import config_dat from './env/config_dat.json';
import config_local from './env/config_local.json';
import config_prd from './env/config_prd.json';
import config_uat from './env/config_uat.json';
import config_sit from './env/config_sit.json';
console.log('process.env.VUE_APP_MODE', process.env.VUE_APP_MODE);
switch (process.env.VUE_APP_MODE) {
    case 'dat':
        config = config_dat
        break
    case 'local':
        config = config_local
        break
    case 'prd':
        config = config_prd
        break
    case 'uat':
        config = config_uat
        break
    case 'sit':
        config = config_sit
        break
    default:
        config = config_dat
}

export default config;
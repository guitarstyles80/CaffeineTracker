import { ExpressApi } from './modules/express-routes';
import { CoffeeApi } from './apis/coffee';

const Start = (app) => {    
    ExpressApi.run(app, [
        CoffeeApi
    ], true);    
}

export { Start }
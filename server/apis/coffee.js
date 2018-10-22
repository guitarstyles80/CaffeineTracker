import mongojs from 'mongoist'; 
import db from '../database';

import { Get, Post, Put, Delete } from '../modules/express-routes';

class CoffeeApi {

    @Get(`/api/coffee-list`)
    async coffeeList(req, res){        
        var coffee = await db.coffee.findAsCursor().sort({ name: 1 }).toArray();
        res.send(coffee);
    }

    @Get(`/api/caffeine-list`)
    async caffeineList(req, res){        
        var caffeineHistory = await db.caffeineHistory.findAsCursor().sort({ date: -1 }).toArray();
        res.send(caffeineHistory);
    }
    

    @Post(`/api/add-coffee`)
    async addCoffeeItem(req, res){            
        await db.coffee.save(req.body);
        res.send({ added : true });
    }


    @Post(`/api/add-caffeine`)
    async addCaffeineItem(req, res){            

        let body = req.body;

        let caffeineHistoryRecord = {
            "name" : body.coffee.name,
            "description" : body.coffee.description,
            "mg" : body.coffee.mg,
            "servings" : body.servings,
            "date" : new Date()
        }

        await db.caffeineHistory.save(caffeineHistoryRecord);

        res.send({ added : true });
    }

}

export { CoffeeApi }


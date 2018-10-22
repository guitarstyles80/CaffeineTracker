import _ from 'underscore';
// import request from 'supertest';
// import { Auth } from '../authorize/';
// import { ExpressValidate } from '../express-validate/';

function Route(method, route, auth, permissions){
    return (target, prop, descriptor) => {        
        let fn = descriptor.value; 
        descriptor.enumerable = true;
        descriptor.value = (app) =>{

            // if(fn.validate){
            //     ExpressValidate(app, method, route, fn.validate);
            //     fn = fn.func;
            // }
                   
            // if(auth){
            //     Auth(app, method, route, permissions);
            // }
            
            app[method](route, (req, res)=>{
                fn.call(target, req, res);
            });

            return { className: target.constructor.name, prop: prop, method: method, route: route } 

        }
    }
}


function Validate(validate){
    return (target, prop, descriptor) => {        
        let fn = descriptor.value;
        descriptor.enumerable = true;
        descriptor.value = {
            func : fn,
            validate: validate
        };    
    }
}

function Get(route, auth, permissions){
    return Route('get', route, auth, permissions);
}
function Post(route, auth, permissions){
    return Route('post', route, auth, permissions);
}
function Put(route, auth, permissions){
    return Route('put', route, auth, permissions);
}
function Delete(route, auth, permissions){
    return Route('delete', route, auth, permissions);
}

class ExpressApi {

    static run(app, controllers, unitTest) {

        let UnitTest = {}
        controllers = controllers.forEach((Controller, i)=>{

            let d = Object.create(Controller.prototype);

            var Descriptors = Object.getOwnPropertyDescriptors(Controller.prototype);

            let Keys =  _.keys(Descriptors);            
            Keys.forEach((v,i)=>{
                
                if(Descriptors[v].enumerable === true) {                           
                    d[v].call(Controller, app);
                }            
            })
        
            return Controller;

        });
    }
}

export { Get, Post, Put, Delete, ExpressApi }
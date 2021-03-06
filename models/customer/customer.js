let pool = require('../../database/connection');
const {decodeToken} = require('../../middleware/authMiddleware') // add this middle ware to authenticate without login


module.exports= class Customer {
    static getmenu(request) {
        return new Promise((resolve, reject) => {
            pool.query("CALL getMenu()",   
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    };
                    resolve(results);
                }
            )
        })
      
    }
    
    static add_to_cart(request){
        console.log('request'+request)
        // get the token from request
        const decodedToken = decodeToken(request)


        console.log(decodedToken);
        
        // extract the email
        const email = decodedToken.email;
        return new Promise((resolve,reject) =>{
            pool.query("CALL add_to_cart(?,?,?)",
            [
                email,
                request.body.prod,
                request.body.quantity
            ],
            (error, results, fields) => {
                if (error) {
                    reject(error);
                };
                resolve(console.log('added to cart'));
            }
        )

        })
        
    }
    static getCart(request) {
        console.log('request'+request)
        // get the token from request
        const decodedToken = decodeToken(request)
        
        console.log(decodedToken);
        
        // extract the email
        const email = decodedToken.email;
        return new Promise((resolve, reject) => {
            pool.query("CALL getcart(?)",
                [
                    email
                ],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    };
                    resolve(results);
                }
            )
        })
      
    }
    static getTotalPrice(request) {
        console.log('request'+request)
        // get the token from request
        const decodedToken = decodeToken(request)


        console.log(decodedToken);
        
        // extract the email
        const email = decodedToken.email;
        return new Promise((resolve, reject) => {
            pool.query("CALL totalPrice(?)",
                [
                    email,
                ],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    };
                    resolve(results);
                }
            )
        })
      
    }
    static removeCartItem(request) {
        console.log('request'+request)
        // get the token from request
        const decodedToken = decodeToken(request)


        console.log(decodedToken);
        
        // extract the email
        const email = decodedToken.email;
        return new Promise((resolve, reject) => {
            pool.query("CALL removeCartItem(?,?)",
                [
                    email,
                    request.body.prod
                ],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    };
                    resolve("removed cart item");
                }
            )
        })
      
    }

    static createOrder(request) {
        return new Promise((resolve, reject) => {
            console.log('request'+request)
            // get the token from request
            const decodedToken = decodeToken(request)

    
            console.log(decodedToken);
            
            // extract the email
            const email = decodedToken.email;
            pool.query("CALL create_order (?,?,?)",
                [
                    email,
                    request.body.route_id,
                    request.body.address
                    
    
                ],
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                    };
                    resolve(console.log("entered sucessfully"));
                }
            )
        })
    
      
    }
    static getRoutes() {
        return new Promise((resolve, reject) => {
            pool.query("CALL getRoutes()",
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    };
                    resolve(results);
                }
            )
        })
      
    }
    
    static getConfirmed(request) {
        const decodedToken = decodeToken(request)

    
            console.log(decodedToken);
            
            // extract the email
            const email = decodedToken.email;
        return new Promise((resolve, reject) => {
            pool.query("CALL get_confirmed_orders(?)",
            [
                email,
               

            ],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    };
                    resolve(results);
                }
            )
        })
      
    }

}
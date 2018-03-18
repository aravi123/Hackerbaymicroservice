

/**
 * Apply the given json patch to the given json object and return the result.
 */


let json = (body)=>{

    return new Promise((resolve,reject)=>{
        try{
            let newJson = jsonpatch.apply((body.json),(body.patch));
            resolve(newJson);
        }
        catch (err){
            reject(err);
        }


    });

};


module.exports = {
    json:json
};
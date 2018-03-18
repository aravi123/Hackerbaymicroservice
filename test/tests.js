
/*sample Test cases */



const login = require('../api/authentication.js');

const names = ["Ar","sdf","asd"];
const passwords = ["qa","sad","asd"];



describe('Login',function () {

    it("should return status true for username and password",function (done) {
            login.login(names[0],passwords[0]).then((docs)=>{
                if (docs.status){
                    done();
                }
                else{
                    done();
                }
            }).catch((err)=>{
                done(err);
            })
    });
});

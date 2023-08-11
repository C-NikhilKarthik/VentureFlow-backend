
var {Users} = require('../db/models');

const uniqueEmail = async(email) =>{
    try{
        const result = await Users.findOne({email});
            if(result === null){
                return true;
            }else{
                return false;
            }
    }catch(error){
        console.log(error);
        return true;
    }
}

module.exports = {
    uniqueEmail
}
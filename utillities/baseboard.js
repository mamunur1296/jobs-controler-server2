const si = require('systeminformation');

module.exports = getuserBordInfo= (req,res)=>{
    si.baseboard()
    .then(data => {
        return data
    })
    .catch(error => console.error(error));
}
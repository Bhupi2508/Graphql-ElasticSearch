// exports a function to have the Host and port configuration 
var hostConfig = require('./hostConfig');

module.exports = {
    getElasticClient: function(){        
        return hostConfig.Host+':'+hostConfig.Port;
    }

}
/**
 * Coding for the elastic client initialization
 */

var elasticSearch = require('elasticsearch');
var hostConfig = require('../config');

// initialize the elastic client
var elasticClient = new elasticSearch.Client({
    host: hostConfig.getElasticClient(),
    log: 'info'
});

module.exports.elasticClient = elasticClient;

'use strict';

module.exports = {
    port: 8081,
    host: '0.0.0.0',
    proxy: { // proxy config
        '/api' : {
            target: "http://172.16.0.166:8085",
            ignorePath: false,
            changeOrigin: true,
            secure: false
        }
    }
}
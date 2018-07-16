var express = require('express');
var router = express.Router();
var {
    Pool,
    Client
} = require('pg');
var _ = require('lodash');
var settings = require('../settings');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Monitor'
    });
});

router.post('/api/:_racknum', function (req, res, next) {
    var racknum = req.params['_racknum'];
    var resData = req.body;
    console.log('Recieved Data: ');
    console.log(resData);
    var save_querry = "INSERT INTO monitor(date_recorded, racknum, temprature, voltage, ampere, cpu, ram, cameras)"+
    " VALUES( $1, $2, $3, $4, $5, $6, $7, $8 )"
    const pool = new Pool(settings.database.postgres);
    var params = [];
    params.push(resData.date_recorded);
    params.push(racknum);
    params.push(resData.temperature);
    params.push(resData.voltage);
    params.push(resData.ampere);
    params.push(resData.cpu);
    params.push(resData.ram);
    params.push(resData.cameras);
    console.log('Params: ');
    console.log(params);
    (async () => {
        const monitorRes = await pool.query(save_querry, params);
        console.log(monitorRes);
        if (monitorRes.rowCount > 0) {
            res.json({
                success: true,
                msg: 'Data added Successfully',
                data: []
            });
        } else {
            res.json({
                success: false,
                msg: 'Nothing Added!',
                data: []
            });
        }
        pool.end()
    })().catch(e => setImmediate(() => {
        console.error(e);
    }))
})
module.exports = router;
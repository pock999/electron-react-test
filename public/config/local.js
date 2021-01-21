const electron = require("electron");
const fs = require('fs');

const APP_NAME = 'test-app'; // 系統名稱
const DB_TYPE_NAME = 'sqlite'; // 本地離線用資料庫名稱

const ELECTRON_PATH = electron.app.getPath('appData');
const APP_DATA_PATH = `${ELECTRON_PATH}/${APP_NAME}`;
console.log('APP_DATA_PATH =>', APP_DATA_PATH);
fs.mkdirSync(APP_DATA_PATH, { recursive: true });
electron.app.setPath('appData', APP_DATA_PATH);
electron.app.setPath('userData', APP_DATA_PATH);

// 建立本地離線用資料庫
const DB_NAME = `${APP_NAME}-${DB_TYPE_NAME}`;
const DB_FILE_PATH = `${APP_DATA_PATH}/${DB_NAME}.db`;
console.log('DB_FILE_PATH =>', DB_FILE_PATH);

module.exports = {
  APP_NAME,
  datastoreName: DB_TYPE_NAME,
  models: {
    connection: DB_TYPE_NAME,

    migrate: 'drop', // drop, alter, safe
    initSeedData: '0',
    initFakeData: '0',

    // migrate: 'safe', // drop, alter, safe
    // initSeedData: '1',
    // initFakeData: '1',
  },
  connections: {
    // mysql: {
    //   user: process.env.MYSQL_ENV_MYSQL_USER_NAME || 'root',
    //   password: process.env.MYSQL_ENV_MYSQL_USER_PASS || '1qaz!QAZ',
    //   database: process.env.MYSQL_ENV_MYSQL_USER_DB || 'sails-db',
    //   dialect: 'mysql',
    //   // query:
    //   options: {
    //     host: process.env.MYSQL_PORT_3306_TCP_ADDR || '127.0.0.1',
    //     port: process.env.MYSQL_PORT_3306_TCP_PORT || 3306,
    //     dialect: 'mysql',
    //     timezone: '+08:00',
    //     dialectOptions: {
    //       useUTC: false, //for reading from database
    //       dateStrings: true,
    //       typeCast: function (field, next) { // for reading from database
    //         if (field.type === 'DATETIME') {
    //           return field.string()
    //         }
    //         return next()
    //       },
    //     },
    //     // dialectOptions: {
    //     //   charset: 'utf8mb4',
    //     //   supportBigNumbers: true,
    //     //   bigNumberStrings: true,
    //     // },
    //     // charset: 'utf8mb4',
    //     // timezone: '+08:00',
    //     // pool: {
    //     //   idle: 30000,
    //     //   min: 1,
    //     //   max: 1,
    //     // },
    //     // logging: console.log
    //     logging: false,
    //   },
    // },
    sqlite: {
      database: 'sequelize',
      dialect: 'sqlite',
      options: {
        dialect: 'sqlite',
        dialectOptions: {
          charset: 'utf8mb4',
          supportBigNumbers: true,
          bigNumberStrings: true,
          pool: {
            idle: 30000,
            min: 1,
            max: 1,
          },
        },
        // use in-memory storage as default
        // storage: ':memory:',
        storage: DB_FILE_PATH,
        logging: false,
        // pool: false,
        pool: {
          idle: 30000,
          min: 1,
          max: 1,
        },
      },
    },
  },
};
const Sequelize = require('sequelize');

const CONFIG = require('../config/local');
const bootstrap = require('../config/bootstrap');
const models = require('./models');
const services = require('./services');

module.exports= {
  initConnections() {
    const connections = {};
    let connection;
    let connectionName;

    for (connectionName in CONFIG.connections) {
      connection = CONFIG.connections[connectionName];

      if (!connection.options) {
        connection.options = {};
      }

      if (connection.url) {
        connections[connectionName] = new Sequelize(
          connection.url,
          connection.options
        );
      } else {
        connections[connectionName] = new Sequelize(
          connection.database,
          connection.user,
          connection.password,
          connection.options
        );
      }
    }
    return connections;

  },
  setAssociation(modelDef) {
    if (modelDef.associations !== null) {
      if (typeof modelDef.associations === 'function') {
        modelDef.associations(modelDef);
      }
    }  
  },
  defineModels (models, connections) {
    let modelDef;
    let modelName;
    let modelClass;
    let cm;
    let im;
    let connectionName;

    const sequelizeMajVersion = parseInt(Sequelize.version.split('.')[0], 10);

    const defaultConnection = CONFIG.models.connection;
    for (modelName in models) {
      console.log('modelName =>', modelName);
      modelDef = models[modelName];

      // Skip models without options provided (possible Waterline models)
      if (!modelDef.options) {
        console.log(
          'Skip models without options provided (possible Waterline models)'
        );
        continue;
      }

      connectionName =
        modelDef.connection || modelDef.datastore || defaultConnection;
      modelClass = connections[connectionName].define(
        modelDef.globalId,
        modelDef.attributes,
        modelDef.options
      );

      if (sequelizeMajVersion >= 4) {
        for (cm in modelDef.options.classMethods) {
          modelClass[cm] = modelDef.options.classMethods[cm];
        }

        for (im in modelDef.options.instanceMethods) {
          modelClass.prototype[im] = modelDef.options.instanceMethods[im];
        }
      }

      global[modelDef.globalId] = modelClass;
    }

    for (modelName in models) {
      modelDef = models[modelName];
  
      // Skip models without options provided (possible Waterline models)
      if (!modelDef.options) {
        continue;
      }
  
      this.setAssociation(modelDef);
    }
  
  },
  async migrateSchema(connections, models) {
    let connectionDescription;
    let cn;
    let migrate;
    let forceSyncFlag;
    let alterFlag;
    const syncTasks = [];

    const datastores = CONFIG.connections;

    migrate = CONFIG.models.migrate;
    console.log(`Models migration strategy: ${migrate}`);

    switch (migrate) {
      case 'drop':
        forceSyncFlag = true;
        alterFlag = false;
        break;
      case 'alter':
        forceSyncFlag = false;
        alterFlag = true;
        break;
      default:
        forceSyncFlag = false;
        alterFlag = false;
    }
    for (cn in datastores) {
      (async (connectionName) => {
        const syncConnectionName = connectionName;
        connectionDescription = datastores[syncConnectionName];
  
        // Skip waterline and possible non sequelize connections
        if (
          connectionDescription.adapter ||
          !(
            connectionDescription.dialect || connectionDescription.options.dialect
          )
        ) {
          console.log(
            'INFO: Skip waterline and possible non sequelize connections'
          );
          return;
        }
  
        console.log(`Migrating schema in '${connectionName}' connection`);
  
        if (connectionDescription.dialect === 'postgres') {
          syncTasks.push(
            connections[syncConnectionName].showAllSchemas().then((schemas) => {
              let modelName;
              let modelDef;
              let tableSchema;
  
              for (modelName in models) {
                modelDef = models[modelName];
                tableSchema = modelDef.options.schema || '';
  
                if (tableSchema !== '' && schemas.indexOf(tableSchema) < 0) {
                  // there is no schema in db for model
                  connections[syncConnectionName].createSchema(tableSchema);
                  schemas.push(tableSchema);
                }
              }
              console.log(`migrateSchema in ${syncConnectionName}`);
              return connections[syncConnectionName].sync({
                force: forceSyncFlag,
                alter: alterFlag,
              });
            })
          );
        } else {
          try {
            await connections[syncConnectionName].sync({
              force: forceSyncFlag,
              alter: alterFlag,
            });
  
            for (let serviceName in services) {
              const serviceDef = services[serviceName];
              global[serviceName] = serviceDef;
            }
            // //
            // // 將 controllers 資料夾中所有的 controller 依序加到 global 變數當中
            // //
            // const controllers = includeAll({
            //   dirname: path.join(__dirname, 'controllers'),
            //   filter: /(.+)\.js$/,
            //   excludeDirs: /^\.(git|svn)$/,
            //   optional: true,
            // });
  
            // for (let controllerName in controllers) {
            //   const controllerDef = controllers[controllerName];
            //   global[controllerName] = controllerDef;
            // }
  
            //
            // 可以透過 bootstrap 這個 function 來建立預設資料到本地資料庫當中
            //
            await bootstrap();
          } catch (e) {
            console.log(e);
          }
        }
      })(cn);
    }  
  },
  initModels() {
    for (const modelName of Object.keys(models)) {
      models[modelName].globalId = modelName;
    }

    return models
  },
  async reload(models) {
    const connections = this.initConnections();
    this.defineModels(models, connections);
    await this.migrateSchema(connections, models);

    return connections;

  },
  async initializeSequelize () {
    console.log('=== initializeSequelize START ===');
    
    global.Sequelize = Sequelize;

    const models = this.initModels();
    const connections = await this.reload(models);


    console.log('=== initializeSequelize END ===');
  },
};
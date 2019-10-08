var Sequelize = require('sequelize'),
	crypto = require('crypto');

//var config = require('./database.json')[env];
var config = require('./database.json')['dev'];
//var password = config.password ? config.password : null;
var password = crypto.createHash('md5').update('miscojonesgordos').digest('hex');

// initialize database connection
var sequelize = new Sequelize(
	config.database,
	config.user,
	config.password,
	{
    dialect: config.driver,
    logging: console.log,
		define: {
			timestamps: false
		}
	}
);

var User = sequelize.define('usuarios', {
	nombre: Sequelize.STRING,
	password: Sequelize.STRING
});
User.sync();



var Pav = sequelize.define('pavimentos', {
    id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
    modelo: Sequelize.STRING,
	archivo: Sequelize.STRING,
	serie: Sequelize.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
			Pav.findAll({}, {raw: true})
			.then(onSuccess)
			.catch(onError);
	  },
	  conseguirArchivos: function(onSuccess, onError) {
		  Pav.findAll({attributes: ['archivo']}, {raw: true})
		  .then(onSuccess)
		  .catch(onError);
	  },
      retrieveById: function(pav_id, onSuccess, onError) {
			Pav.find({where: {id: pav_id}}, {raw: true}).success(onSuccess).error(onError);
	  },
      add: function(onSuccess, onError) {
		    var id = this.id;
			var modelo = this.modelo;
			var archivo = this.archivo;
			var serie = this.serie;

			//var shasum = crypto.createHash('sha1');
			//shasum.update(password);
			//password = shasum.digest('hex');

			Pav.build({ modelo: modelo, archivo: archivo })
			    .save().success(onSuccess).error(onError);
	   },
	  updateById: function(pav_id, onSuccess, onError) {
			var id = pav_id;
			var modelo = this.modelo;
			var archivo = this.archivo;
			var serie = this.serie;

			//var shasum = crypto.createHash('sha1');
			//shasum.update(password);
			//password = shasum.digest('hex');

			Pav.update({ modelo: modelo,archivo: archivo,serie: serie},{where: {id: id} }).success(onSuccess).error(onError);
	   },
      removeById: function(pav_id, onSuccess, onError) {
			Pav.destroy({where: {id: pav_id}}).success(onSuccess).error(onError);
	  },
	  borrarTodos: function(correcto, enError) {
		  Pav.destroy({where: {}}).then(correcto).catch(enError);
	  }
    }
  });

var Rev = sequelize.define('revestimientos', {
    id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
    modelo: Sequelize.STRING,
	archivo: Sequelize.STRING,
	serie: Sequelize.STRING
  }, {
    instanceMethods: {
      retrieveAll: function(onSuccess, onError) {
			Rev.findAll({}, {raw: true})
			.then(onSuccess)
			.catch(onError);
	  },
	  conseguirArchivos: function(onSuccess, onError) {
		  Rev.findAll({attributes: ['archivo']}, {raw: true})
		  .then(onSuccess)
		  .catch(onError);
	  },
      retrieveById: function(rev_id, onSuccess, onError) {
			Rev.find({where: {id: rev_id}}, {raw: true})
			.then(onSuccess)
			.catch(onError);
	  },
      add: function(onSuccess, onError) {
		    var id = this.id;
			var modelo = this.modelo;
			var archivo = this.archivo;
			var serie = this.serie;

			//var shasum = crypto.createHash('sha1');
			//shasum.update(password);
			//password = shasum.digest('hex');

			Rev.build({ modelo: modelo, archivo: archivo })
			    .save().success(onSuccess).error(onError);
	   },
	  updateById: function(rev_id, onSuccess, onError) {
			var id = rev_id;
			var modelo = this.modelo;
			var archivo = this.archivo;
			var serie = this.serie;

			//var shasum = crypto.createHash('sha1');
			//shasum.update(password);
			//password = shasum.digest('hex');

			Rev.update({ modelo: modelo,archivo: archivo,serie: serie},{where: {id: id} }).success(onSuccess).error(onError);
	   },
      removeById: function(rev_id, onSuccess, onError) {
			Rev.destroy({where: {id: rev_id}}).success(onSuccess).error(onError);
	  },
	  borrarTodos: function(correcto, enError) {
		  Rev.destroy({where: {}}).then(correcto).catch(enError);
	  }
    }
  });

module.exports = {
	Pav: Pav,
	Rev: Rev,
	User: User
};

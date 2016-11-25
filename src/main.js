//@flow
var roleHarvester = require('./role.harvester.js');
var roleUpgrader = require('./role.upgrader.js');
var roleBuilder = require('./role.builder.js');
var spawners = require('./spawners.js');

function runCreepRoles() {
  for (var name : string in Game.creeps) {
    let creep = Game.creeps[name];
    switch (creep.memory.role) {
      case 'harvester':
        roleHarvester.run(creep);
        break;
      case 'upgrader':
        roleUpgrader.run(creep);
        break;
      case 'builder':
        roleBuilder.run(creep);
        break;
      default:
        creep.say('Unassigned');
    }
  }
  // TODO: add defense role
}

module.exports.loop = function () {
    runCreepRoles();
    spawners.run();
    // TODO: add construction sites logic
}

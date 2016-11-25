//@flow
var actionHarvesting = {
  selectSourceInRoom: function(creep : Creep, [findPartial : boolean = false], [filterOutIds] : string[]) {
    if (!filterOutIds) {
      filterOutIds = [];
    }

    var source = creep.room.findClosestByPath(FIND_SOURCES, {
      filter: function(source) {
        for (var id in filterOutIds) {
          if (id === source.id) {
            return false;
          }
        }
        return true;
      }
    });

    // if no sources are full, see if there are any at all
    // TODO: if multiple rooms are controlled, start looking in another room.
    if (source === null) {
      return selectSourceInRoom(creep, true, filterOutIds);
    }

    // first look for sources that will fill the creep.
    if (!findPartial && source.energy > creep.energyCapacity) {
      return source;
    } else if (findPartial && source.energy > 0) {
      return source;
    } else {
      filterOutIds.push(source.id);
      return selectSourceInRoom(creep, false, filterOutIds);
    }
  },

  selectStorageInRoom: {
    // TODO
  }
}

module.exports = actionHarvesting;

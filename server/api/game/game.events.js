/**
 * Game model events
 */

'use strict';

import {EventEmitter} from 'events';
var Game = require('./game.model');
var GameEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GameEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Game.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    GameEvents.emit(event + ':' + doc._id, doc);
    GameEvents.emit(event, doc);
  }
}

export default GameEvents;

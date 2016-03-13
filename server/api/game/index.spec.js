'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var gameCtrlStub = {
  index: 'gameCtrl.index',
  show: 'gameCtrl.show',
  create: 'gameCtrl.create',
  update: 'gameCtrl.update',
  destroy: 'gameCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var gameIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './game.controller': gameCtrlStub
});

describe('Game API Router:', function() {

  it('should return an express router instance', function() {
    gameIndex.should.equal(routerStub);
  });

  describe('GET /api/games', function() {

    it('should route to game.controller.index', function() {
      routerStub.get
        .withArgs('/', 'gameCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/games/:id', function() {

    it('should route to game.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'gameCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/games', function() {

    it('should route to game.controller.create', function() {
      routerStub.post
        .withArgs('/', 'gameCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/games/:id', function() {

    it('should route to game.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'gameCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/games/:id', function() {

    it('should route to game.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'gameCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/games/:id', function() {

    it('should route to game.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'gameCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

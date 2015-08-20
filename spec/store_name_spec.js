// Generated by CoffeeScript 1.9.3
(function() {
  var Collection, Model, backboneSync, dualSync, localStorage, localSync, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  backboneSync = window.backboneSync, localSync = window.localSync, dualSync = window.dualSync, localStorage = window.localStorage;

  ref = {}, Collection = ref.Collection, Model = ref.Model;

  describe('storeName', function() {
    this.timeout(100);
    beforeEach(function() {
      localStorage.clear();
      Model = (function(superClass) {
        extend(Model, superClass);

        function Model() {
          return Model.__super__.constructor.apply(this, arguments);
        }

        Model.prototype.idAttribute = '_id';

        Model.prototype.urlRoot = 'things/';

        return Model;

      })(Backbone.Model);
      return Collection = (function(superClass) {
        extend(Collection, superClass);

        function Collection() {
          return Collection.__super__.constructor.apply(this, arguments);
        }

        Collection.prototype.model = Model;

        Collection.prototype.url = Model.prototype.urlRoot;

        return Collection;

      })(Backbone.Collection);
    });
    it('uses the same store for models with the same storeName', function(done) {
      var AnotherModel, OneModel, model, saved;
      OneModel = (function(superClass) {
        extend(OneModel, superClass);

        function OneModel() {
          return OneModel.__super__.constructor.apply(this, arguments);
        }

        OneModel.prototype.storeName = '/samePlace';

        return OneModel;

      })(Backbone.Model);
      AnotherModel = (function(superClass) {
        extend(AnotherModel, superClass);

        function AnotherModel() {
          return AnotherModel.__super__.constructor.apply(this, arguments);
        }

        AnotherModel.prototype.storeName = '/samePlace';

        return AnotherModel;

      })(Backbone.Model);
      saved = $.Deferred();
      model = new OneModel;
      model.save('paper', 'oragami', {
        errorStatus: 0,
        success: function() {
          return saved.resolve();
        }
      });
      return saved.done(function() {
        var fetchedLocally;
        fetchedLocally = $.Deferred();
        model = new AnotherModel({
          id: model.id
        });
        model.fetch({
          errorStatus: 0,
          success: function() {
            return fetchedLocally.resolve();
          }
        });
        return fetchedLocally.done(function() {
          expect(model.get('paper')).to.equal('oragami');
          return done();
        });
      });
    });
    describe('Model.url', function() {
      return it('is used as the store name, lacking anything below', function(done) {
        var AnotherModel, OneModel, model, saved;
        OneModel = (function(superClass) {
          extend(OneModel, superClass);

          function OneModel() {
            return OneModel.__super__.constructor.apply(this, arguments);
          }

          OneModel.prototype.url = '/someplace';

          return OneModel;

        })(Backbone.Model);
        AnotherModel = (function(superClass) {
          extend(AnotherModel, superClass);

          function AnotherModel() {
            return AnotherModel.__super__.constructor.apply(this, arguments);
          }

          AnotherModel.prototype.url = '/anotherPlace';

          return AnotherModel;

        })(Backbone.Model);
        saved = $.Deferred();
        model = new OneModel;
        model.save('paper', 'oragami', {
          errorStatus: 0,
          success: function() {
            return saved.resolve();
          }
        });
        return saved.done(function() {
          model = new AnotherModel({
            id: model.id
          });
          return model.fetch({
            errorStatus: 0,
            error: function() {
              return done();
            }
          });
        });
      });
    });
    describe('Model.urlRoot', function() {
      return it('is used as the store name, lacking anything below', function(done) {
        var AnotherModel, OneModel, model, saved;
        OneModel = (function(superClass) {
          extend(OneModel, superClass);

          function OneModel() {
            return OneModel.__super__.constructor.apply(this, arguments);
          }

          OneModel.prototype.url = '/samePlace';

          OneModel.prototype.urlRoot = '/onePlace';

          return OneModel;

        })(Backbone.Model);
        AnotherModel = (function(superClass) {
          extend(AnotherModel, superClass);

          function AnotherModel() {
            return AnotherModel.__super__.constructor.apply(this, arguments);
          }

          AnotherModel.prototype.url = '/samePlace';

          AnotherModel.prototype.urlRoot = '/anotherPlce';

          return AnotherModel;

        })(Backbone.Model);
        saved = $.Deferred();
        model = new OneModel;
        model.save('paper', 'oragami', {
          errorStatus: 0,
          success: function() {
            return saved.resolve();
          }
        });
        return saved.done(function() {
          model = new AnotherModel({
            id: model.id
          });
          return model.fetch({
            errorStatus: 0,
            error: function() {
              return done();
            }
          });
        });
      });
    });
    describe('Collection.url', function() {
      return it('is used as the store name, lacking anything below', function(done) {
        var DisconnectedCollection, MatchingCollection, model, saved;
        MatchingCollection = (function(superClass) {
          extend(MatchingCollection, superClass);

          function MatchingCollection() {
            return MatchingCollection.__super__.constructor.apply(this, arguments);
          }

          MatchingCollection.prototype.model = Model;

          MatchingCollection.prototype.url = 'things/';

          return MatchingCollection;

        })(Backbone.Collection);
        DisconnectedCollection = (function(superClass) {
          extend(DisconnectedCollection, superClass);

          function DisconnectedCollection() {
            return DisconnectedCollection.__super__.constructor.apply(this, arguments);
          }

          DisconnectedCollection.prototype.model = Model;

          DisconnectedCollection.prototype.url = 'does_not_match_the_model/';

          return DisconnectedCollection;

        })(Backbone.Collection);
        saved = $.Deferred();
        model = new Model;
        model.save('paper', 'oragami', {
          errorStatus: 0,
          success: function() {
            return saved.resolve();
          }
        });
        return saved.done(function() {
          var collection;
          collection = new MatchingCollection;
          return collection.fetch({
            errorStatus: 0,
            success: function() {
              var otherCollection;
              expect(collection.size()).to.eql(1);
              otherCollection = new DisconnectedCollection;
              return otherCollection.fetch({
                errorStatus: 0,
                error: function() {
                  return done();
                }
              });
            }
          });
        });
      });
    });
    describe('Model.storeName', function() {
      return it('is used as the store name, lacking anything below', function(done) {
        var AnotherModel, OneModel, model, saved;
        OneModel = (function(superClass) {
          extend(OneModel, superClass);

          function OneModel() {
            return OneModel.__super__.constructor.apply(this, arguments);
          }

          OneModel.prototype.urlRoot = 'commonURL/';

          OneModel.prototype.storeName = 'someName';

          return OneModel;

        })(Backbone.Model);
        AnotherModel = (function(superClass) {
          extend(AnotherModel, superClass);

          function AnotherModel() {
            return AnotherModel.__super__.constructor.apply(this, arguments);
          }

          AnotherModel.prototype.urlRoot = 'commonURL/';

          AnotherModel.prototype.storeName = 'anotherName';

          return AnotherModel;

        })(Backbone.Model);
        saved = $.Deferred();
        model = new OneModel;
        model.save('paper', 'oragami', {
          errorStatus: 0,
          success: function() {
            return saved.resolve();
          }
        });
        return saved.done(function() {
          model = new AnotherModel({
            id: model.id
          });
          return model.fetch({
            errorStatus: 0,
            error: function() {
              return done();
            }
          });
        });
      });
    });
    return describe('Collection.storeName', function() {
      return it('is used as the store name if given', function(done) {
        var DisconnectedCollection, MatchingCollection, model, saved;
        MatchingCollection = (function(superClass) {
          extend(MatchingCollection, superClass);

          function MatchingCollection() {
            return MatchingCollection.__super__.constructor.apply(this, arguments);
          }

          MatchingCollection.prototype.model = Model;

          MatchingCollection.prototype.url = 'commonURL/';

          MatchingCollection.prototype.storeName = 'things/';

          return MatchingCollection;

        })(Backbone.Collection);
        DisconnectedCollection = (function(superClass) {
          extend(DisconnectedCollection, superClass);

          function DisconnectedCollection() {
            return DisconnectedCollection.__super__.constructor.apply(this, arguments);
          }

          DisconnectedCollection.prototype.model = Model;

          DisconnectedCollection.prototype.url = 'commonURL/';

          DisconnectedCollection.prototype.storeName = 'does_not_match_the_model/';

          return DisconnectedCollection;

        })(Backbone.Collection);
        saved = $.Deferred();
        model = new Model;
        model.save('paper', 'oragami', {
          errorStatus: 0,
          success: function() {
            return saved.resolve();
          }
        });
        return saved.done(function() {
          var collection, fetchedMatching;
          collection = new MatchingCollection;
          fetchedMatching = $.Deferred();
          collection.fetch({
            errorStatus: 0,
            success: function() {
              return fetchedMatching.resolve();
            }
          });
          return fetchedMatching.done(function() {
            expect(collection.size()).to.eql(1);
            collection = new DisconnectedCollection;
            return collection.fetch({
              errorStatus: 0,
              error: function() {
                return done();
              }
            });
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=store_name_spec.js.map
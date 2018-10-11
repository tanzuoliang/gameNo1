/**
 * Created by Virtue on 16/6/2.
 */
var core = core || {};

core.Class = function(baseClass, properties) {
    // create a new class
    var cls = function(params) {
        this.initialize(params || {});
    };

    if (baseClass) {
        cls.prototype = Object.create(baseClass.prototype);
        cls.prototype.constructor = cls;
    }

    if (!cls.prototype.initialize) {
        cls.prototype.initialize = function() {};
    }

    if (properties) {
        for (var key in properties) {
            cls.prototype[key] = properties[key];
        }
    }
    return cls;
};

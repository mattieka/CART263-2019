//helpful tutorial here: https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-1/

//constructor
//i think were establishing what scene the plugin will belong to
let DialogModalPlugin = function (scene) {
  this.scene = scene;
  this.systems = scene.sys;

  if (!scene.sys.settings.isBooted) {
    scene.sys.events.once('boot',this.boot,this);
  }
};

//register with pluginmanager
DialogModalPlugin.register = function(PluginManager) {
  PluginManager.register('DialogModalPlugin',DialogModalPlugin,'dialogModal');
};

DialogModalPlugin.prototype = {
  //called when this plugin is called by the plugin manager
  boot: function() {
    let eventEmitter = this.systems.events;
    eventEmitter.on('shutdown',this.shutdown,this);
    eventEmitter.on('destroy',this.destroy,this);
  };

  
}

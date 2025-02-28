/**
 * @namespace flexygo.events
 */
declare namespace flexygo.events {
    type EventClass = "all" | "entity" | "property" | "process" | "module" | "page" | "post" | "dialog" | "push" | "message" | "gipe";
    type EventType = "all" | "inserted" | "updated" | "deleted" | "changed" | "selected" | "executed" | "loaded" | "closed" | "refreshed" | "resized" | "generic" | "notify" | "filtered" | "loading" | "error" | "warning" | "info" | "success" | "exception" | "askparams" | "askentity" | "askyesno" | "debugstep" | "jsreturn" | "start" | "finish";
    type EventAction = "refresh" | "process";
    /**
    * api for FlexygoEvent
    * @class FlexygoEvent
    * @constructor
    * @return {FlexygoEvent} .
    */
    class FlexygoEvent {
        class: EventClass;
        type: EventType;
        sender?: any;
        context?: object;
        masterIdentity?: string;
        detailIdentity?: string;
        firedBy?: string;
        constructor(eventClass: EventClass, eventType: EventType, sender?: object, masterIdentity?: string, detailIdentity?: string, firedBy?: string);
    }
    /**
        * Method to subscribe to flexygo events
        * @method on
        * @param {object} context - The subscriber
        * @param {flexygo.events.FlexygoEvent} eventDefinition - The FlexygoEvent to subscribe to in form of class.type (Example: entity.all)
        * @param {object} callback - Callback function to be called
        */
    function on(context: object, eventClass: EventClass, eventType: EventType, callback: object): void;
    /**
       * Method to unsubscribe to flexygo events
       * @method off
       * @param {object} context - The subscriber
       * @param {flexygo.events.FlexygoEvent} event
       */
    function off(context: object, eventClass: EventClass, eventType: EventType, callback?: object): void;
    /**
      * Method to trigger a flexygo event
      * @method trigger
      * @param {flexygo.events.FlexygoEvent} event - Event to be triggered
      */
    function trigger(event: FlexygoEvent): void;
    /**
       * Method to register a module to manage its events
       * @method registerModule
       * @param {flexygo.ui.wc.FlxModule} module - Module
       */
    function registerModule(module: flexygo.ui.wc.FlxModuleElement): void;
    /**
      * Method to unregister a module to manage its events
      * @method unRegisterModule
      * @param {flexygo.ui.wc.FlxModule} module - Module
      */
    function unRegisterModule(module: flexygo.ui.wc.FlxModuleElement): void;
}

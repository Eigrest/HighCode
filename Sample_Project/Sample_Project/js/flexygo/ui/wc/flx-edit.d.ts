/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the flx-edit web component.
    *
    * @class FlxEditElement
    * @constructor
    * @return {FlxEditElement} .
    */
    class FlxEditElement extends HTMLElement {
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        moduleName: string;
        objectname: string;
        objectwhere: string;
        processName: string;
        reportName: string;
        mode: string;
        tHeader: string;
        tBody: string;
        tFooter: string;
        templateId: string;
        templateList: {
            [name: string]: string;
        };
        defaults: any;
        properties: {
            [name: string]: flexygo.api.ObjectProperty;
        };
        data: any;
        constructor();
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Fires when element is dettached to DOM
        * @method connectedCallback
        */
        disconnectedCallback(): void;
        /**
        * Array of observed attributes.
        * @property observedAttributes {Array}
        */
        static readonly observedAttributes: string[];
        /**
       * Fires when the attribute value of the element is changed.
       * @method attributeChangedCallback
       */
        attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void;
        dependenciesLoaded: boolean;
        /**
        * Refresh de webcomponent.
        * @method init
        */
        init(): void;
        /**
        * Refresh de webcomponent.
        * @method refresh
        */
        refresh(): void;
        /**
       * Init the webcomponent in edit mode.
       * @method initEditMode
       */
        initEditMode(): void;
        /**
       * Init the webcomponent in edit report parameter mode.
       * @method initReportMode
       */
        initReportMode(): void;
        /**
        * Gets maximum tab index.
        * @method getMaxTabindex
        * @param {flexygo.api.ObjectPropertyCollection} props
        * @return {string}
        */
        getMaxTabindex(props: flexygo.api.ObjectPropertyCollection): string;
        /**
      * Init the webcomponent in edit process parameter mode.
      * @method initProcessMode
      */
        initProcessMode(): void;
        /**
        * Starts control validation.
        * @method initValidate
        */
        initValidate(): void;
        /**
        * Starts control rendering.
        * @method render
        */
        render(): void;
        /**
        * Checks if form is dirty.
        * @method checkDirtyEdit
        * @return {boolean}
        */
        checkDirtyEdit(): boolean;
        /**
       * Establish webcomponent settings
       * @method configure
       */
        configure(): void;
        /**
        * Establish webcomponent settings when in process mode
        * @method configureProcess
        */
        configureProcess(): void;
        /**
        * Establish webcomponent settings when object process
        * @method configureObjectProcess
        */
        configureObjectProcess(): void;
        /**
        * Opens configuration popup
        * @method openConfig
        */
        openConfig(): void;
        /**
       *Processes dependency loading
       * @method processLoadDependencies
       */
        processLoadDependencies(): void;
        /**
      *Sets layout x and y to starting position
      * @method restartPosition
      */
        restartPosition(): void;
        /**
       *Sets Form property values
       * @method setFormValues
       */
        setFormValues(): void;
        /**
      *Gets value from property
      * @method getValue
      * @param {flexygo.api.BasicPropertyLoweredKey} row
      * @param {string} tag
      * @return {string}
      */
        getValue(row: flexygo.api.BasicPropertyLoweredKey, tag: string): string;
        /**
        *Paints properties with template string
        * @method paintProperties
        * @param {any} data
        * @param {string} template
        * @return {string}
        */
        paintProperties(data: any, template: string): string;
        /**
        * Parses edit string
        * @method parseEditString
        * @param {string} str
        * @return {string}
        */
        parseEditString(str: string): string;
        /**
       *Translates string
       * @method translate
       * @param {string} str
       * @return {string}
       */
        translate(str: string): string;
        /**
      * Refreshes a property
      * @method refreshProperty
      * @param {flexygo.api.edit.DependencyAction} itm
      * @param {JQuery} prop
      * @param {JQuery} lblprop
      * @param {boolean} loadDependency
      * @return {string}
      */
        refreshProperty(itm: flexygo.api.edit.DependencyAction, prop: JQuery, lblprop: JQuery, loadDependency: boolean): void;
        /**
     * Removes property from the gridstack control
     * @method removeStack
     * @param {JQuery} prop
     */
        removeStack(prop: JQuery): void;
        /**
        * Appends property from the gridstack control
        * @method appendStack
        * @param {JQuery} prop
        */
        appendStack(prop: JQuery): void;
        /**
       * Gets module full Id using pagename objectname modulename
       * @method getModuleFullId
       * @return {string}
       */
        getModuleFullId(): string;
        /**
      * Captures property change event
      * @method onPropertyChanged
      * @param {flexygo.events.FlexygoEvent} e
      */
        onPropertyChanged(e: flexygo.events.FlexygoEvent): void;
    }
}

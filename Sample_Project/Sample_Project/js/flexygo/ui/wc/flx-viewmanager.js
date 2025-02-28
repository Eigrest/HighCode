/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            /**
            * Library for the FlxViewManagerElement web component.
            *
            * @class FlxViewManagerElement
            * @constructor
            * @return {FlxViewManagerElement}
            */
            class FlxViewManagerElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.objectname = null;
                    this.viewname = null;
                    this.newValue = 0;
                    this.tree = null;
                    this.cmb = null;
                    this.fields = null;
                }
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.objectname = element.attr('ObjectName');
                    this.viewname = element.attr('ViewName');
                    this.init();
                }
                static get observedAttributes() {
                    return [];
                }
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                }
                init() {
                    this.refresh();
                }
                refresh() {
                    this.config = new flexygo.obj.Entity(this.objectname).getConfig();
                    let me = $(this);
                    let btns = $('<div class="row"><div class="col-6"><div class="btn-group" role="listType" /></div><div class="col-6"><button style="float:right" class="btn btn-info btnSaveList">Save & Continue  <i class="flx-icon icon-order-right-2" /></button></div></div>');
                    btns.find('.btn-group').append('<button type="button" class="btn btn-success" name="btn-fields"><i class="flx-icon icon-listbox-2" /> From Fields</button>');
                    btns.find('.btn-group').append('<button type="button" class="btn btn-default" name="btn-sql"><i class="flx-icon icon-sql" /> From SQL</button>');
                    let pnl = $('<div class="pnlFields"></div>');
                    pnl.append('<div class="col-3" style="padding-right:15px"><div class=""><span class="label">' + flexygo.localization.translate('viewmanager.properties') + ':</span><br/><ul class="objtree list-group"></ul></div></div>');
                    pnl.append('<div class="col-9"><span class="label">' + flexygo.localization.translate('viewmanager.fields') + ':</span><br/><ul class="filterFields list-group"></ul></div>');
                    me.append(btns);
                    me.append(pnl);
                    me.append('<div class="pnlSQL" style="display:none"><flx-code type="sql" class="txtSQL" ></flx-code><button class="btnTestView btn btn-warning"><i class="flx-icon icon-double-check"></i> ' + flexygo.localization.translate('viewmanager.validate') + '</button></div>');
                    this.tree = me.find('.objtree');
                    this.loadObj(me.attr('ObjectName'), this.tree, true);
                    this.cmb = me.find('.filterCmb');
                    this.fields = me.find('.filterFields');
                    me.find('[role="listType"] button').on('click', (e) => {
                        me.find('[role="listType"] button.btn-success').removeClass('btn-success').addClass('btn-default');
                        switch ($(e.currentTarget).attr('name').toLowerCase()) {
                            case 'btn-fields':
                                me.find('.pnlSQL').hide();
                                me.find('.pnlFields').show();
                                break;
                            case 'btn-sql':
                                me.find('.pnlFields').hide();
                                me.find('.pnlSQL').show();
                                let myCm = me.find('.txtSQL')[0].myCM;
                                if (myCm) {
                                    myCm.refresh();
                                }
                                break;
                        }
                        $(e.currentTarget).addClass('btn-success');
                    });
                    me.find('.btnSaveList').on('click', (e) => {
                        this.saveView();
                    });
                    me.find('.btnTestView').on('click', (e) => {
                        this.validateView();
                    });
                    this.loadView();
                }
                validateView() {
                    let me = $(this);
                    let sqlStr = me.find('.txtSQL').val();
                    if (sqlStr == '') {
                        flexygo.msg.error(flexygo.localization.translate('viewmanager.errornosql'));
                    }
                    else {
                        let params = {
                            ObjectName: this.objectname,
                            SQL: sqlStr
                        };
                        flexygo.ajax.post('~/api/Sys', 'validateView', params, (response) => {
                            flexygo.msg.success('Test succesfully :)');
                        });
                    }
                }
                saveView() {
                    try {
                        let me = $(this);
                        let fils = new Array();
                        let sqlStr = '';
                        if (me.find('.filterFields').is(':visible')) {
                            let itms = this.fields.find('li');
                            if (itms.length == 0) {
                                throw new Error(flexygo.localization.translate('viewmanager.errornofields'));
                            }
                            else {
                                for (let i = 0; i < itms.length; i++) {
                                    let fil = new flexygo.api.SearchProperty();
                                    let ctl = $(itms[i]).data('extvalue');
                                    fil.ObjectName = ctl.ObjectPropertyName;
                                    fil.PropertyName = ctl.PropertyName;
                                    fil.ObjectPath = ctl.ObjectPath;
                                    fil.Order = i;
                                    fil.Label = $(itms[i]).find('input').val();
                                    fils.push(fil);
                                }
                            }
                        }
                        else {
                            sqlStr = me.find('.txtSQL').val();
                            if (sqlStr == '') {
                                throw new Error(flexygo.localization.translate('viewmanager.errornosql'));
                            }
                        }
                        let params = new flexygo.api.sys.saveViewParams();
                        params.ObjectName = this.objectname;
                        if (!this.viewname || this.viewname == '') {
                            params.ViewName = this.objectname + 'DefaultList';
                        }
                        else {
                            params.ViewName = this.viewname;
                        }
                        params.Properties = new Array();
                        params.SQL = sqlStr;
                        for (let i = 0; i < fils.length; i++) {
                            let itm = Object.assign({}, fils[i]);
                            params.Properties.push(itm);
                        }
                        flexygo.ajax.post('~/api/Sys', 'saveView', params, (view) => {
                            this.setView(view);
                            flexygo.msg.success('Saved :)');
                            //This is now handled via post event
                            //$(document).trigger("viewSaved", []);
                        });
                    }
                    catch (e) {
                        flexygo.msg.error(e.message);
                    }
                }
                loadView() {
                    let params = new flexygo.api.sys.getViewParams();
                    params.ObjectName = this.objectname;
                    params.ViewName = this.viewname;
                    flexygo.ajax.post('~/api/Sys', 'getView', params, (view) => {
                        this.setView(view);
                    });
                    this.fields.sortable();
                }
                setView(view) {
                    let me = $(this);
                    this.fields.empty();
                    if (view) {
                        this.viewname = view.Name;
                        me.find('.txtSQL').val(view.SQL);
                        let arrOrdered = flexygo.utils.sortObject(view.Properties, 'Order');
                        for (let i = 0; i < arrOrdered.length; i++) {
                            let prop = arrOrdered[i];
                            this.fields.append(this.createField(prop));
                        }
                        if (arrOrdered.length > 0) {
                            me.find('button[name="btn-fields"]').click();
                        }
                        else {
                            me.find('button[name="btn-sql"]').click();
                        }
                    }
                }
                loadObj(ObjectName, elm, first) {
                    let params = {
                        ObjectName: ObjectName
                    };
                    flexygo.ajax.post('~/api/Sys', 'getRelatedObjetsAndProps', params, (response) => {
                        for (let key in response.RelatedObjects) {
                            let prop = $('<li class="list-group-item objectFolder"></li>');
                            prop.html('<span><i class="flx-icon icon-folder" /> ' + key + '<span>');
                            prop.data('extvalue', response.RelatedObjects[key]);
                            prop.addClass('obj-filter');
                            prop.on('click', (e) => {
                                let el = $(e.currentTarget);
                                el.find('i:first').toggleClass('icon-folder').toggleClass('icon-folder-2');
                                if (el.find('ul').length > 0) {
                                    el.find('ul:first').toggle();
                                }
                                else {
                                    let itm = $('<ul class="list-group" />');
                                    this.loadObj(el.data('extvalue').ChildCollection, itm, false);
                                    el.append(itm);
                                }
                            });
                            elm.append(prop);
                        }
                        let itm = $('<li class="list-group-item"></li>');
                        for (let key in response.Properties) {
                            if (response.Properties[key].ControlType != 'separator' && response.Properties[key].ControlType != 'placeholder') {
                                let obj = $('<div />');
                                obj.html('<label><input type="checkbox" /> ' + response.Properties[key].Label + '</label>');
                                obj.data('extvalue', response.Properties[key]);
                                obj.addClass('prop-filter');
                                itm.append(obj);
                            }
                        }
                        itm.on('click', (e) => {
                            e.stopPropagation();
                        });
                        elm.append(itm);
                        if (first) {
                            let bitm = $('<li class="list-group-item"></li>');
                            let btn = $('<button class="btn btn-default bg-info"><i class="flx-icon icon-plus" /> ' + flexygo.localization.translate('viewmanager.add') + '</button>');
                            bitm.append(btn);
                            btn.on('click', (e) => {
                                this.appendFields();
                            });
                            elm.append(bitm);
                        }
                    });
                }
                appendFields() {
                    let me = $(this);
                    let inp = this.tree.find('input:checked');
                    for (let i = 0; i < inp.length; i++) {
                        let prop = $(inp[i]).closest('div').data('extvalue');
                        if (me.find('[prop="' + prop.ObjectName + '-' + prop.Name + '"]').length == 0) {
                            let fld = new flexygo.api.ObjectViewProperty();
                            fld.Label = this.getLabel(prop.Label);
                            fld.ObjectPropertyName = prop.ObjectName;
                            fld.ObjectPath = this.findPath($(inp[i]).closest('div'));
                            fld.PropertyName = prop.Name;
                            fld.Order = this.fields.find('.filterField').length;
                            let fil = this.createField(fld);
                            fil.hide();
                            this.fields.append(fil);
                        }
                        else {
                            flexygo.msg.error(flexygo.string.format(flexygo.localization.translate('viewmanager.errorduplicateprop'), prop.Label));
                        }
                    }
                    this.fields.find('li:not(:visible)').show('250');
                    this.fields.sortable();
                    inp.prop('checked', false);
                }
                getLabel(label) {
                    let newLabel = label;
                    if (this.config.KeyFields.length > 0) {
                        let existe = true;
                        let cnt = 0;
                        while (existe) {
                            existe = false;
                            for (let i = 0; i < this.config.KeyFields.length; i++) {
                                if (newLabel.toLowerCase() == this.config.KeyFields[i].toLowerCase()) {
                                    existe = true;
                                }
                            }
                            if (existe) {
                                cnt += 1;
                                newLabel = label + '_' + cnt;
                            }
                        }
                    }
                    return newLabel;
                }
                createField(fld) {
                    let itm = $('<li class="list-group-item filterField" />');
                    itm.attr('prop', fld.ObjectPropertyName + '-' + fld.PropertyName);
                    itm.data('extvalue', fld);
                    itm.html('<input class="form-control" type="text" value="' + fld.Label + '" />');
                    itm.append(' <span class="comment">(' + flexygo.utils.parser.replaceAll(fld.ObjectPath, '|', ' > ') + ') <i class="flx-icon icon-trash clickable size-l" /></span>');
                    itm.find('.icon-trash').on('click', (e) => {
                        let li = $(e.currentTarget).closest('li');
                        li.hide(250, () => {
                            li.remove();
                        });
                    });
                    return itm;
                }
                findPath(obj) {
                    let pathArr = new Array();
                    let parents = obj.parents('li.objectFolder');
                    for (let i = 0; i < parents.length; i++) {
                        pathArr.push($(parents[i]).data('extvalue').ObjectName);
                    }
                    pathArr.push(obj.data('extvalue').ObjectName);
                    return pathArr.reverse().join('|');
                }
            }
            wc.FlxViewManagerElement = FlxViewManagerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-viewmanager', flexygo.ui.wc.FlxViewManagerElement);
//# sourceMappingURL=flx-viewmanager.js.map
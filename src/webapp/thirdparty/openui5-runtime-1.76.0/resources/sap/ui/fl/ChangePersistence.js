/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/changes/DependencyHandler","sap/ui/fl/apply/_internal/StorageUtils","sap/ui/fl/Change","sap/ui/fl/Layer","sap/ui/fl/Variant","sap/ui/fl/Utils","sap/ui/fl/LayerUtils","sap/ui/fl/write/_internal/CompatibilityConnector","sap/ui/fl/Cache","sap/ui/fl/apply/_internal/changes/Applier","sap/ui/fl/write/_internal/Storage","sap/ui/fl/variants/VariantController","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Component","sap/ui/model/json/JSONModel","sap/ui/performance/Measurement","sap/ui/thirdparty/jquery","sap/base/util/includes","sap/base/util/merge","sap/base/util/isEmptyObject","sap/base/Log","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/apply/_internal/flexState/controlVariants/VariantManagementState"],function(D,S,C,L,V,U,a,b,c,A,d,e,J,f,g,M,q,i,m,h,j,F,k){"use strict";var l=function(p){this._mComponent=p;this._mChanges=D.createEmptyDependencyMap();this._mChangesInitial=m({},this._mChanges);this._mVariantsChanges={};if(!this._mComponent||!this._mComponent.name){j.error("The Control does not belong to an SAPUI5 component. Personalization and changes for this control might not work as expected.");throw new Error("Missing component name.");}this._oVariantController=new e(this._mComponent.name,this._mComponent.appVersion,{});this._aDirtyChanges=[];this._oMessagebundle=undefined;this._mChangesEntries={};this._bHasChangesOverMaxLayer=false;this.HIGHER_LAYER_CHANGES_EXIST="higher_layer_changes_exist";};function n(v,p){var s;Object.keys(v).some(function(t){return v[t].variants.some(function(u){if(u.content.fileName===p.getDefinition().variantReference){s=u;return true;}});});return s;}function r(v,p){return v.controlChanges.some(function(s,t){if(s.fileName===p.getDefinition().fileName){v.controlChanges.splice(t,1,p);return true;}});}function o(p,s){var t;if(s instanceof C){t=s;this._mChangesEntries[t.getFileName()]=t;}else{if(!this._mChangesEntries[s.fileName]){this._mChangesEntries[s.fileName]=new C(s);}t=this._mChangesEntries[s.fileName];t.setState(C.states.PERSISTED);if(t.getVariantReference()){var v=this._oVariantController.getChangeFileContent();var u=n.call(this,v,t);if(u&&r(u,t)){k.updateVariantsState({reference:this._mComponent.name,content:v});}}}return t;}l.prototype.getComponentName=function(){return this._mComponent.name;};l.prototype.getCacheKey=function(p){return c.getCacheKey(this._mComponent,p);};l.prototype._preconditionsFulfilled=function(I,p){var s=p instanceof C?p.getDefinition():p;if(!s.fileName){j.warning("A change without fileName is detected and excluded from component: "+this._mComponent.name);return false;}function t(){if(I){return(s.fileType==="change")||(s.fileType==="variant");}return(s.fileType==="change")&&(s.changeType!=="defaultVariant");}function u(){if(I){if((s.fileType==="variant")||(s.changeType==="defaultVariant")){return s.selector&&s.selector.persistencyKey;}}return true;}function v(){if((s.fileType==="ctrl_variant")||(s.fileType==="ctrl_variant_change")||(s.fileType==="ctrl_variant_management_change")){return s.variantManagementReference||s.variantReference||(s.selector&&s.selector.id);}}if(t()&&u()||v()){return true;}return false;};l.prototype.getChangesForComponent=function(p,I){return c.getChangesFillingCache(this._mComponent,p,I).then(function(p,w){var s=m({},w);var t=p&&p.component&&U.getAppComponentForControl(p.component);var H=S.isStorageResponseFilled(s.changes);if(!H){return[];}var u=s.changes.changes;if(!this._oMessagebundle&&s.messagebundle&&t){if(!t.getModel("i18nFlexVendor")){if(u.some(function(K){return K.layer===L.VENDOR;})){this._oMessagebundle=s.messagebundle;var v=new g(this._oMessagebundle);t.setModel(v,"i18nFlexVendor");}}}var x=p&&p.currentLayer;var y=!(p&&p.ignoreMaxLayerParameter);var z=function(){return true;};if(x){z=this._filterChangeForCurrentLayer.bind(this,x);u=u.filter(z);}else if(a.isLayerFilteringRequired()&&y){z=this._filterChangeForMaxLayer.bind(this);u=u.filter(z);}else if(this._bHasChangesOverMaxLayer&&!y){this._bHasChangesOverMaxLayer=false;return this.HIGHER_LAYER_CHANGES_EXIST;}var B=s.changes&&p&&p.includeCtrlVariants;this._oVariantController.setChangeFileContent(s);var E=this._getAllCtrlVariantChanges(s,B,z);u=u.concat(E);var G=p&&p.includeVariants;return this._checkAndGetChangeInstances(u,G,s);}.bind(this,p));};l.prototype._checkAndGetChangeInstances=function(p,I,s){return p.filter(this._preconditionsFulfilled.bind(this,I)).map(o.bind(this,s));};l.prototype._filterChangeForMaxLayer=function(p){if(a.isOverMaxLayer(this._getLayerFromChangeOrChangeContent(p))){if(!this._bHasChangesOverMaxLayer){this._bHasChangesOverMaxLayer=true;}return false;}return true;};l.prototype._filterChangeForCurrentLayer=function(s,p){return s===this._getLayerFromChangeOrChangeContent(p);};l.prototype._getLayerFromChangeOrChangeContent=function(p){var s;if(p instanceof V||p instanceof C){s=p.getLayer();}else{s=p.layer;}return s;};l.prototype._getAllCtrlVariantChanges=function(p,I,s){if(!I){return k.loadInitialChanges({reference:this._mComponent.name});}return["variants","variantChanges","variantDependentControlChanges","variantManagementChanges"].reduce(function(R,v){if(p.changes[v]){return R.concat(p.changes[v]);}return R;},[]).filter(s);};l.prototype.getSmartVariantManagementChangeMap=function(){return this._mVariantsChanges;};l.prototype.getChangesForVariant=function(s,p,P){if(this._mVariantsChanges[p]){return Promise.resolve(this._mVariantsChanges[p]);}var t=function(v){var w=false;var x=v._oDefinition.selector;q.each(x,function(y,z){if(y===s&&z===p){w=true;}});return w;};var u=function(v,w){j.error("key : "+v+" and text : "+w.value);};return this.getChangesForComponent(P).then(function(v){return v.filter(t);}).then(function(v){if(!this._mVariantsChanges[p]){this._mVariantsChanges[p]={};}var I;v.forEach(function(w){I=w.getId();if(w.isValid()){if(this._mVariantsChanges[p][I]&&w.isVariant()){j.error("Id collision - two or more variant files having the same id detected: "+I);q.each(w.getDefinition().texts,u);j.error("already exists in variant : ");q.each(this._mVariantsChanges[p][I].getDefinition().texts,u);}this._mVariantsChanges[p][I]=w;}}.bind(this));return this._mVariantsChanges[p];}.bind(this));};l.prototype.addChangeForVariant=function(s,p,P){var t;var I;var u;var v;var w;if(!P){return undefined;}if(!P.type){j.error("sap.ui.fl.Persistence.addChange : type is not defined");}var x=q.type(P.content);if(x!=='object'&&x!=='array'){j.error("mParameters.content is not of expected type object or array, but is: "+x,"sap.ui.fl.Persistence#addChange");}u={};if(typeof(P.texts)==="object"){q.each(P.texts,function(z,B){u[z]={value:B,type:"XFLD"};});}var y={creation:this._mComponent.appVersion,from:this._mComponent.appVersion};if(this._mComponent.appVersion&&P.developerMode){y.to=this._mComponent.appVersion;}I={changeType:P.type,service:P.ODataService,texts:u,content:P.content,reference:this._mComponent.name,isVariant:P.isVariant,packageName:P.packageName,isUserDependent:P.isUserDependent,validAppVersions:y};I.selector={};I.selector[s]=p;t=C.createInitialFileContent(I);if(P.id){t.fileName=P.id;}v=new C(t);w=v.getId();if(!this._mVariantsChanges[p]){this._mVariantsChanges[p]={};}this._mVariantsChanges[p][w]=v;return v.getId();};l.prototype.saveAllChangesForVariant=function(s){var p=[];q.each(this._mVariantsChanges[s],function(t,u){var v=u.getId();switch(u.getPendingAction()){case"NEW":p.push(b.create(u.getDefinition(),u.getRequest(),u.isVariant()).then(function(w){if(w&&w.response&&w.response[0]){u.setResponse(w.response[0]);}else{u.setState(C.states.PERSISTED);}c.addChange({name:this._mComponent.name,appVersion:this._mComponent.appVersion},u.getDefinition());return w;}.bind(this)));break;case"UPDATE":p.push(b.update(u.getDefinition(),u.getRequest()).then(function(w){if(w&&w.response){u.setResponse(w.response);}else{u.setState(C.states.PERSISTED);}c.updateChange({name:this._mComponent.name,appVersion:this._mComponent.appVersion},u.getDefinition());return w;}.bind(this)));break;case"DELETE":p.push(b.deleteChange(u.getDefinition(),u.getRequest()).then(function(w){var u=this._mVariantsChanges[s][v];if(u.getPendingAction()==="DELETE"){delete this._mVariantsChanges[s][v];}c.deleteChange({name:this._mComponent.name,appVersion:this._mComponent.appVersion},u.getDefinition());return w;}.bind(this)));break;default:break;}}.bind(this));return Promise.all(p);};l.prototype.loadChangesMapForComponent=function(p){return this.getChangesForComponent({component:p}).then(s.bind(this));function s(t){M.start("fl.createDependencyMap","Measurement of creating initial dependency map");this._mChanges=D.createEmptyDependencyMap();t.forEach(this._addChangeAndUpdateDependencies.bind(this,p));this._mChangesInitial=m({},this._mChanges);M.end("fl.createDependencyMap","Measurement of creating initial dependency map");return this.getChangesMapForComponent.bind(this);}};l.prototype.checkForOpenDependenciesForControl=function(s,p){return D.checkForOpenDependenciesForControl(this._mChanges,J.getControlIdBySelector(s,p),p);};l.prototype.copyDependenciesFromInitialChangesMap=function(p,s,t){var I=m({},this._mChangesInitial.mDependencies);var u=I[p.getId()];if(u){var N=[];u.dependencies.forEach(function(x){if(s(x)){this._mChanges.mDependentChangesOnMe[x]=this._mChanges.mDependentChangesOnMe[x]||[];this._mChanges.mDependentChangesOnMe[x].push(p.getId());N.push(x);}}.bind(this));var v;var w=[];u.controlsDependencies.forEach(function(x){if(!J.bySelector(x,t)){v=J.getControlIdBySelector(x,t);w.push(x);this._mChanges.mControlsWithDependencies[v]=this._mChanges.mControlsWithDependencies[v]||[];if(!i(this._mChanges.mControlsWithDependencies[v],p.getId())){this._mChanges.mControlsWithDependencies[v].push(p.getId());}}}.bind(this));u.dependencies=N;u.controlsDependencies=w;if(N.length||w.length){this._mChanges.mDependencies[p.getId()]=u;}}return this._mChanges;};l.prototype._addChangeAndUpdateDependencies=function(p,s){s.setInitialApplyState();D.addChangeAndUpdateDependencies(s,p,this._mChanges);};l.prototype._addRunTimeCreatedChangeAndUpdateDependencies=function(p,s){D.addRuntimeChangeAndUpdateDependencies(s,p,this._mChanges,this._mChangesInitial);};l.prototype.getChangesMapForComponent=function(){return this._mChanges;};function _(p,s){var t=p.modifier;var u=p.appComponent;var v=s.getSelector();if(!v||!p){return false;}if(v.viewSelector){var w=t.getControlIdBySelector(v.viewSelector,u);return w===p.viewId;}var x=v.id;if(x){var y;if(s.getSelector().idIsLocal){if(u){y=u.getLocalId(p.viewId);}}else{y=p.viewId;}var I=0;var z;do{I=x.indexOf("--",I);z=x.slice(0,I);I++;}while(z!==y&&I>0);return z===y;}return false;}l.prototype.getChangesForView=function(p){return this.getChangesForComponent(p).then(function(s){return s.filter(_.bind(this,p));}.bind(this));};l.prototype.addChange=function(v,p){var s=this.addDirtyChange(v);this._addRunTimeCreatedChangeAndUpdateDependencies(p,s);this._addPropagationListener(p);return s;};l.prototype.addDirtyChange=function(v){var N;if(v instanceof C||v instanceof V){N=v;}else{N=new C(v);}if(this._aDirtyChanges.indexOf(N)===-1){this._aDirtyChanges.push(N);}return N;};l.prototype._addPropagationListener=function(p){var s=U.getAppComponentForControl(p);if(s instanceof f){var t=function(P){return!P._bIsSapUiFlFlexControllerApplyChangesOnControl;};var N=s.getPropagationListeners().every(t);if(N){var u=s.getManifestObject();var v=U.getAppVersionFromManifest(u);var w=sap.ui.require("sap/ui/fl/FlexControllerFactory");var x=w.create(this.getComponentName(),v);var P=A.applyAllChangesForControl.bind(A,this.getChangesMapForComponent.bind(this),s,x);P._bIsSapUiFlFlexControllerApplyChangesOnControl=true;s.addPropagationListener(P);}}};l.prototype.saveDirtyChanges=function(s,p,t){var u=p||this._aDirtyChanges;var v=u.slice(0);var R=this._getRequests(u);var P=this._getPendingActions(u);if(P.length===1&&R.length===1&&P[0]==="NEW"){var w=R[0];var x=this._prepareDirtyChanges(u);return b.create(x,w,undefined,t).then(function(y){this._massUpdateCacheAndDirtyState(v,s);return y;}.bind(this));}return this.saveSequenceOfDirtyChanges(v,s,t);};l.prototype.saveSequenceOfDirtyChanges=function(p,s,t){return p.reduce(function(P,u){return P.then(this._performSingleSaveAction(u,t)).then(this._updateCacheAndDirtyState.bind(this,u,s));}.bind(this),Promise.resolve());};l.prototype._performSingleSaveAction=function(p,s){return function(){if(p.getPendingAction()==="NEW"){return b.create(p.getDefinition(),p.getRequest(),undefined,s);}if(p.getPendingAction()==="DELETE"){return b.deleteChange(p.getDefinition(),p.getRequest());}};};l.prototype._updateCacheAndDirtyState=function(p,s){if(!s){if(U.isChangeRelatedToVariants(p)){k.updateVariantsState({reference:this._mComponent.name,content:this._oVariantController.getChangeFileContent(),changeToBeAddedOrDeleted:p});}else if(p.getPendingAction()==="NEW"){c.addChange(this._mComponent,p.getDefinition());}else if(p.getPendingAction()==="DELETE"){c.deleteChange(this._mComponent,p.getDefinition());}}this._aDirtyChanges=this._aDirtyChanges.filter(function(E){return p.getId()!==E.getId();});};l.prototype._massUpdateCacheAndDirtyState=function(p,s){p.forEach(function(t){this._updateCacheAndDirtyState(t,s);},this);};l.prototype._getRequests=function(p){var R=[];p.forEach(function(s){var t=s.getRequest();if(R.indexOf(t)===-1){R.push(t);}});return R;};l.prototype._getPendingActions=function(p){var P=[];p.forEach(function(s){var t=s.getPendingAction();if(P.indexOf(t)===-1){P.push(t);}});return P;};l.prototype._prepareDirtyChanges=function(p){var s=[];p.forEach(function(t){s.push(t.getDefinition());});return s;};l.prototype.getDirtyChanges=function(){return this._aDirtyChanges;};l.prototype.deleteChange=function(p,R){var s=this._aDirtyChanges.indexOf(p);if(s>-1){if(p.getPendingAction()==="DELETE"){return;}this._aDirtyChanges.splice(s,1);this._deleteChangeInMap(p,R);return;}p.markForDeletion();this.addDirtyChange(p);this._deleteChangeInMap(p,R);};l.prototype._deleteChangeInMap=function(p,R){var s=p.getId();var t=this._mChanges.mChanges;var u=R?this._mChangesInitial:this._mChanges;var v=u.mDependencies;var w=u.mDependentChangesOnMe;Object.keys(t).some(function(x){var y=t[x];var z=y.map(function(E){return E.getId();}).indexOf(p.getId());if(z!==-1){y.splice(z,1);return true;}});Object.keys(v).forEach(function(x){if(x===s){delete v[x];}else if(v[x].dependencies&&Array.isArray(v[x].dependencies)&&v[x].dependencies.indexOf(s)!==-1){v[x].dependencies.splice(v[x].dependencies.indexOf(s),1);if(v[x].dependencies.length===0){delete v[x];}}});Object.keys(w).forEach(function(x){if(x===s){delete w[x];}else if(Array.isArray(w[x])&&w[x].indexOf(s)!==-1){w[x].splice(w[x].indexOf(s),1);if(w[x].length===0){delete w[x];}}});var I=this._mChanges.aChanges.indexOf(p);if(I!==-1){this._mChanges.aChanges.splice(I,1);}};l.prototype.loadSwitchChangesMapForComponent=function(p){p.changesMap=this._mChanges.mChanges;return this._oVariantController.getChangesForVariantSwitch(p);};l.prototype.transportAllUIChanges=function(R,s,p,t){return this.getChangesForComponent({currentLayer:p,includeCtrlVariants:true}).then(function(u){return d.publish({transportDialogSettings:{rootControl:R,styleClass:s},layer:p,reference:this.getComponentName(),appVersion:this._mComponent.appVersion,localChanges:u,appVariantDescriptors:t});}.bind(this));};l.prototype._getChangesFromMapByNames=function(N){return this._mChanges.aChanges.filter(function(p){return N.indexOf(p.getFileName())!==-1;});};l.prototype.resetChanges=function(s,G,p,t){var u=p&&p.length>0;var v=t&&t.length>0;if(!G&&!u&&!v){j.error("Of the generator, selector IDs and change types parameters at least one has to filled");return Promise.reject("Of the generator, selector IDs and change types parameters at least one has to filled");}return this.getChangesForComponent({currentLayer:s,includeCtrlVariants:true}).then(function(w){var P={reference:this.getComponentName(),appVersion:this._mComponent.appVersion,layer:s,changes:w};if(G){P.generator=G;}if(u){P.selectorIds=p;}if(v){P.changeTypes=t;}return b.resetChanges(P);}.bind(this)).then(function(R){var w=[];if(p||t){var N=[];if(R&&R.response&&R.response.length>0){R.response.forEach(function(x){N.push(x.name);});}c.removeChanges(this._mComponent,N);w=this._getChangesFromMapByNames(N);}return w;}.bind(this));};l.prototype.resetVariantMap=function(R){return this._oVariantController.resetMap(R);};l.prototype.getResetAndPublishInfo=function(p){return b.getFlexInfo(p);};return l;},true);
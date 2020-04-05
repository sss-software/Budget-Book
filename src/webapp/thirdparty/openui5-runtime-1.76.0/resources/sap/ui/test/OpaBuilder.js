/*!
* OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/base/util/merge","sap/base/strings/capitalize","sap/base/Log","sap/ui/test/Opa5","sap/ui/test/actions/Action","sap/ui/test/actions/Press","sap/ui/test/actions/EnterText","sap/ui/test/matchers/Matcher","sap/ui/test/matchers/MatcherFactory","sap/ui/test/pipelines/MatcherPipeline","sap/ui/test/pipelines/ActionPipeline"],function(m,c,L,O,A,P,E,M,a,b,d){"use strict";function _(){return m.apply(this,[{}].concat(Array.prototype.slice.call(arguments)));}function e(T,v,N){var V=Array.isArray(v)?v:[v];return V.reduce(function(I,u){if(I){return true;}if(u===null||u===undefined){return T===u;}if(T===null||T===undefined){return!!N;}if(typeof u==="function"){if(u===Boolean){return typeof T==="boolean";}if(u===Array){return Array.isArray(T);}if(u===String){return typeof T==="string"||T instanceof String;}if(u===Object){return typeof T==="object"&&T.constructor===Object;}return T instanceof u;}return typeof T===u;},false);}function f(u){var v=Array.prototype.slice.call(arguments,1);return u.reduce(function(w,x){if(e(v[0],x,true)){w.push(v.shift());}else{w.push(undefined);}return w;},[]);}function g(v,T,u){if(T===undefined){T=[];}else if(!Array.isArray(T)){T=[T];}else{T=T.slice(0);}if(Array.isArray(v)){T=u?v.slice(0).concat(T):T.concat(v);}else if(v!==undefined){if(u){T.unshift(v);}else{T.push(v);}}return T;}function h(N,u,R){if(!e(N,Function)){throw new Error("not a function");}if(!e(u,Function)){return N;}if(R){return function(v){return u(v)&&N(v);};}return function(v){u(v);N(v);};}function i(S){if(e(S,t)){return function(){return S.execute();};}if(!e(S,Function)){return function(){O.assert.ok(true,S||"Success");};}return S;}function j(u){var v="";v+=u.controlType||"Control";v+="#"+(u.id||"<undefined>");v+=u.matchers?" with "+(e(u.matchers,Array)?u.matchers.length:1)+" additional matcher(s)":"";v+=" not found";return v;}function k(u,v){if(!u){return null;}var w=u["get"+c(v,0)];if(!w){throw new Error("Object '"+u+"' does not have an aggregation called '"+v+"'");}return w.call(u);}function l(v,T){if(v&&T){s.process({actions:v,control:T});}}function n(v,T){return r.process({matchers:q.getFilteringMatchers({matchers:v}),control:T});}function o(F){var u=F.indexOf(">"),v=u===-1?undefined:F.substring(0,u),w=u===-1?F:F.substring(u+1);return{model:v,path:w};}var p={autoWait:true,visible:true},q=new a(),r=new b(),s=new d();var t=function(u,v){var w=f([O,Object],u,v);this._oOpaInstance=w[0];return this.options(p,w[1]);};t.defaultOptions=function(u){if(arguments.length>0){p=_(u);}return _(p);};t.create=function(u,I,C,D,v,w,x){var y=f([O,[String,RegExp],String,Boolean,[M,Function,Array,Object],[A,Function,Array],Object],u,I,C,D,v,w,x);return new t(y[0]).hasId(y[1]).hasType(y[2]).isDialogElement(!!y[3]).has(y[4]).do(y[5]).options(y[6]);};t.prototype.options=function(u){this._oOptions=_.apply(this,[this._oOptions].concat(Array.prototype.slice.call(arguments)));return this;};t.prototype.viewId=function(v){return this.options({viewId:v});};t.prototype.viewName=function(v){return this.options({viewName:v});};t.prototype.viewNamespace=function(v){return this.options({viewNamespace:v});};t.prototype.fragmentId=function(F){return this.options({fragmentId:F});};t.prototype.timeout=function(T){return this.options({timeout:T});};t.prototype.debugTimeout=function(D){return this.options({debugTimeout:D});};t.prototype.pollingInterval=function(u){return this.options({pollingInterval:u});};t.prototype.hasId=function(I){return this.options({id:I});};t.prototype.hasType=function(C){return this.options({controlType:C});};t.prototype.has=function(v,R){return this.options({matchers:R?v:g(v,this._oOptions.matchers)});};t.prototype.hasProperties=function(u){return this.has(t.Matchers.properties(u));};t.prototype.hasI18NText=function(u,v,w){return this.has(t.Matchers.i18n.apply(t.Matchers,arguments));};t.prototype.hasAggregation=function(u,v){return this.has(t.Matchers.aggregationMatcher(u,v));};t.prototype.hasAggregationProperties=function(u,v){return this.hasAggregation(u,t.Matchers.properties(v));};t.prototype.hasAggregationLength=function(u,N){return this.has(t.Matchers.aggregationLength(u,N));};t.prototype.hasConditional=function(C,S,v){return this.has(t.Matchers.conditional(C,S,v));};t.prototype.hasSome=function(u){return this.has(t.Matchers.some.apply(t.Matchers,arguments));};t.prototype.mustBeEnabled=function(u){return this.options({enabled:arguments.length?!!u:true});};t.prototype.mustBeVisible=function(v){return this.options({visible:arguments.length?!!v:true});};t.prototype.mustBeReady=function(R){return this.options({autoWait:arguments.length?!!R:true});};t.prototype.isDialogElement=function(D){return this.options({searchOpenDialogs:arguments.length?!!D:true});};t.prototype.check=function(C,R){return this.options({check:R?C:h(C,this._oOptions.check,true)});};t.prototype.checkNumberOfMatches=function(u){return this.check(function(C){if(!C){return u===0;}if(!e(C,Array)){C=[C];}return C.length===u;});};t.prototype.do=function(v,R){if(e(v,t)){L.error("(deprecated) OpaBuilder instance is incorrectly used in .do function - use .success instead");return this.success(v);}return this.options({actions:R?v:g(v,this._oOptions.actions)});};t.prototype.doConditional=function(C,S,v){if(e(S,t)||e(v,t)){L.error("(deprecated) OpaBuilder instance is incorrectly used in .doConditional function - use .success instead");return this.success(t.Actions.conditional(C,S,v));}return this.do(t.Actions.conditional(C,S,v));};t.prototype.doPress=function(I){return this.do(t.Actions.press(I));};t.prototype.doEnterText=function(T,C,K,I){var u=f([String,Boolean,Boolean,String],T,C,K,I);return this.do(t.Actions.enterText(u[0],u[1],u[2],u[3]));};t.prototype.doOnAggregation=function(u,v,w){if(arguments.length<3){w=v;v=undefined;}var F=t.Matchers.filter(v),x=l.bind(this,w);return this.do(function(C){F(k(C,u)).forEach(x);});};t.prototype.doOnChildren=function(C,v,D){var u=f([[M,Function,Array,Object,t],[A,Function,Array],Boolean],C,v,D);C=u[0];v=u[1];D=u[2];if(!e(C,t)){C=new t(this._getOpaInstance()).has(u[0]);}if(v){C.do(v);}return this.do(function(w){var x=C.build(),y=t.Matchers.children(C,D)(w);return t.Actions.executor(x.actions)(y);});};t.prototype.description=function(D){return this.success(D+" - OK").error(D+" - FAILURE");};t.prototype.success=function(S,R){var u=i(S);return this.options({success:R?u:h(u,this._oOptions.success)});};t.prototype.error=function(v,R){if(e(v,String)){return this.options({errorMessage:v});}return this.options({error:R?v:h(v,this._oOptions.error)});};t.prototype.build=function(){if(!this._oOptions.errorMessage){this.error(j(this._oOptions));}return _(this._oOptions);};t.prototype.execute=function(u){if(e(u,O)){this._setOpaInstance(u);}return this._getOpaInstance().waitFor(this.build());};t.prototype._setOpaInstance=function(u){if(!e(u,O)){throw new Error("Opa5 instance expected");}this._oOpaInstance=u;};t.prototype._getOpaInstance=function(){if(!e(this._oOpaInstance,O)){this._setOpaInstance(new O());}return this._oOpaInstance;};t.Matchers={TRUE:function(){return true;},FALSE:function(){return false;},not:function(v){var u=t.Matchers.match(v);return function(C){return!u(C);};},ancestor:function(v,D){return{ancestor:[[v,D]]};},descendant:function(D,u){return{descendant:[[D,u]]};},properties:function(u){return{properties:u};},i18n:function(u,v,w){var x=o(v),y=x.model||"i18n",T=x.path;if(arguments.length>3||(w&&!Array.isArray(w))){w=Array.prototype.slice.call(arguments,2);}return{I18NText:{propertyName:u,modelName:y,key:T,parameters:w}};},resourceBundle:function(u,v,T,w){if(arguments.length>4||(w&&!Array.isArray(w))){w=Array.prototype.slice.call(arguments,3);}return function(C){var R=sap.ui.getCore().getLibraryResourceBundle(v),x=R.getText(T,w),y={};y[u]=x;return n({properties:y},C);};},labelFor:function(u,T,v,w){var x=3,y;if(!e(T,Boolean)){x=2;w=v;v=T;T=false;}if(T){return{labelFor:{propertyName:u,text:v}};}y=o(v);if(arguments.length>x+1||(w&&!Array.isArray(w))){w=Array.prototype.slice.call(arguments,x);}return{labelFor:{propertyName:u,modelName:y.model||"i18n",key:y.path,parameters:w}};},children:function(B,D){var u=f([[M,Function,Array,Object,t],Boolean],B,D);B=u[0];D=u[1];if(!e(B,t)){B=new t().has(B);}return function(C){var v=B.build(),w=O.getPlugin().getMatchingControls(v),x=g(t.Matchers.ancestor(C,D),v.matchers,true);return t.Matchers.filter(x)(w);};},childrenMatcher:function(B,D){var C=t.Matchers.children(B,D);return function(u){return C(u).length>0;};},aggregation:function(u,v){var F=t.Matchers.filter(v);return function(C){return F(k(C,u));};},aggregationMatcher:function(u,v){var w=t.Matchers.aggregation(u,v);return function(C){return w(C).length>0;};},aggregationLength:function(u,v){return{aggregationLengthEquals:{name:u,length:v}};},aggregationAtIndex:function(u,I){return function(C){var v=k(C,u);return v&&I<v.length?v[I]:undefined;};},bindingProperties:function(u,v){return function(C){var w=C.getBindingContext(u),K,V;for(K in v){V=w.getProperty(K);if(V!==v[K]){return false;}}return true;};},bindingPath:function(u,v){var w=o(u);return{bindingPath:{modelName:w.model,path:w.path,propertyPath:v}};},customData:function(C){if(!C){return t.Matchers.TRUE;}return function(u){if(!u||typeof u.data!=="function"){return false;}return Object.keys(C).reduce(function(v,K){return v&&u.data(K)===C[K];},true);};},conditional:function(C,S,v){return function(u){if(n(C,u)){return n(S,u);}return v?n(v,u):true;};},focused:function(C){return function(u){var $=u&&u.isA("sap.ui.core.Element")&&u.$();return $&&($.is(":focus")||$.hasClass("sapMFocus")||(C&&$.find(":focus").length>0))||false;};},some:function(u){if(u.length>1||(u&&!Array.isArray(u))){u=Array.prototype.slice.call(arguments,0);}return function(C){var v=false;if(u.some(function(w){v=n(w,C);return v;})){return v;}return false;};},filter:function(v){return function(I){if(!e(I,Array)){I=[I];}return n(v,I)||[];};},match:function(v){return function(I){var R=n(v,[I]);return R.length?R[0]:false;};}};t.Actions={press:function(I){return new P({idSuffix:I});},enterText:function(T,C,K,I){return new E({text:T,clearTextFirst:C,keepFocus:K,idSuffix:I});},conditional:function(C,S,v){var u=t.Matchers.match(C),w=S,x=v;if(e(S,t)){w=function(){return S.execute();};}if(v&&e(v,t)){x=function(){return v.execute();};}return function(y){if(u(y)){return l(w,y);}else if(x){return l(x,y);}};},executor:function(v){return function(C){if(!C){return;}if(e(C,Array)){return C.map(function(u){return l(v,u);});}return l(v,C);};}};return t;});
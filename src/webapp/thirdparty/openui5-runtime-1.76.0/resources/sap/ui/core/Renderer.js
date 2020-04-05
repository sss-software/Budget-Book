/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/isPlainObject","sap/base/util/ObjectPath","sap/base/assert","sap/ui/thirdparty/jquery"],function(i,O,a,q){"use strict";var R={};var s;function c(n,r){a(this!=null,'BaseRenderer must be a non-null object');a(typeof n==='string'&&n,'Renderer.extend must be called with a non-empty name for the new renderer');a(r==null||(i(r)&&Object.keys(r).every(function(k){return r[k]!==undefined;})),'oRendererInfo can be omitted or must be a plain object without any undefined property values');var C=Object.create(this);C.extend=c;q.extend(C,r);O.set(n,C);return C;}R.extend=function(n,r){if(typeof n==='string'){return c.call(this,n,r);}else if(this===R){var C=Object.create(n||null);C._super=n;C.extend=c;return C;}else{throw new TypeError("The signature extend(BaseRenderer) without a name can only be called on sap.ui.core.Renderer");}};R.getTextAlign=function(t,T){if(!s){s=sap.ui.requireSync("sap/ui/core/library");}var b=s.TextAlign;var d=s.TextDirection;var e="",r=sap.ui.getCore().getConfiguration().getRTL();switch(t){case b.End:switch(T){case d.LTR:e="right";break;case d.RTL:e="left";break;default:e=r?"left":"right";break;}break;case b.Begin:switch(T){case d.LTR:e="left";break;case d.RTL:e="right";break;default:e=r?"right":"left";break;}break;case b.Right:if(!r||T==d.LTR){e="right";}break;case b.Center:e="center";break;case b.Left:if(r||T==d.RTL){e="left";}break;}return e;};return R;},true);
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/Device','sap/ui/core/ResizeHandler','sap/ui/layout/library','./FormLayout','./ColumnLayoutRenderer',"sap/ui/thirdparty/jquery"],function(D,R,l,F,C,q){"use strict";var a=F.extend("sap.ui.layout.form.ColumnLayout",{metadata:{library:"sap.ui.layout",properties:{columnsXL:{type:"sap.ui.layout.form.ColumnsXL",group:"Appearance",defaultValue:2},columnsL:{type:"sap.ui.layout.form.ColumnsL",group:"Appearance",defaultValue:2},columnsM:{type:"sap.ui.layout.form.ColumnsM",group:"Appearance",defaultValue:1},labelCellsLarge:{type:"sap.ui.layout.form.ColumnCells",group:"Appearance",defaultValue:4},emptyCellsLarge:{type:"sap.ui.layout.form.EmptyCells",group:"Appearance",defaultValue:0}}}});a.prototype.init=function(){this._iBreakPointTablet=D.media._predefinedRangeSets[D.media.RANGESETS.SAP_STANDARD_EXTENDED].points[0];this._iBreakPointDesktop=D.media._predefinedRangeSets[D.media.RANGESETS.SAP_STANDARD_EXTENDED].points[1];this._iBreakPointLargeDesktop=D.media._predefinedRangeSets[D.media.RANGESETS.SAP_STANDARD_EXTENDED].points[2];this._resizeProxy=q.proxy(b,this);};a.prototype.exit=function(){_.call(this);};a.prototype.onBeforeRendering=function(e){if(this.getColumnsM()>this.getColumnsL()||this.getColumnsL()>this.getColumnsXL()){throw new Error("Column size not correct defined for "+this);}_.call(this);};a.prototype.onAfterRendering=function(e){this._sResizeListener=R.register(this,this._resizeProxy);b.call(this);};a.prototype.toggleContainerExpanded=function(c){c.$().toggleClass("sapUiFormCLContainerColl",!c.getExpanded());};a.prototype.onLayoutDataChange=function(e){this.invalidate();};a.prototype.onsapup=function(e){this.onsapleft(e);};a.prototype.onsapdown=function(e){this.onsapright(e);};a.prototype.getContainerRenderedDomRef=function(c){return c.getDomRef();};a.prototype.getElementRenderedDomRef=function(e){return e.getDomRef();};a.prototype._getContainerSize=function(c){var f=this.getParent();var L=this.getLayoutDataForElement(c,"sap.ui.layout.form.ColumnContainerData");var d=f.getVisibleFormContainers();var e=d.length;var g=this.getColumnsM();var h=this.getColumnsL();var j=this.getColumnsXL();var o={S:{Size:1,Break:false,FirstRow:false},M:{Size:1,Break:false,FirstRow:false},L:{Size:1,Break:false,FirstRow:false},XL:{Size:1,Break:false,FirstRow:false}};var k=function(w,o,e,I,x){if(e<w){o.Size=Math.floor(w/e);if(x&&o.Size*e<w){o.Size=o.Size+w-o.Size*e;}}o.Break=w>1&&I>0&&(I%w)===0;o.FirstRow=e>1&&I<w;};if(L){o.M.Size=L.getColumnsM();o.L.Size=L.getColumnsL();o.XL.Size=L.getColumnsXL();if(o.M.Size>g||o.L.Size>h||o.XL.Size>j){throw new Error("More cells defined for FormContainer "+c.getId()+" than columns on "+this);}}if(e===1){if(!L){o.M.Size=g;o.L.Size=h;o.XL.Size=j;}o.S.FirstRow=true;o.M.FirstRow=true;o.L.FirstRow=true;o.XL.FirstRow=true;}else{var m=0;var M=0;var n=0;var O;var p=false;var r=0;var s=g;var t=h;var u=j;var i=0;for(i=0;i<e;i++){if(c===d[i]){m=i;O=L;}else{O=this.getLayoutDataForElement(d[i],"sap.ui.layout.form.ColumnContainerData");}if(!O){var E=d[i].getVisibleFormElements();if(M<E.length){M=E.length;n=i;}r++;}else{p=true;s=s-O.getColumnsM();t=t-O.getColumnsL();u=u-O.getColumnsXL();}}o.S.FirstRow=e>1&&m===0;o.S.Break=m>0;if(!p){k(g,o.M,e,m,m===n);k(h,o.L,e,m,m===n);k(j,o.XL,e,m,m===n);}else{if(!L){if(r<s){k(s,o.M,r,m,m===n);}if(r<t){k(t,o.L,r,m,m===n);}if(r<u){k(u,o.XL,r,m,m===n);}}var S={M:{rowColumns:0,lineBreak:false,first:true},L:{rowColumns:0,lineBreak:false,first:true},XL:{rowColumns:0,lineBreak:false,first:true}};var v=function(w,x,U){if(U){if(w.rowColumns+U<=x){w.rowColumns=w.rowColumns+U;w.lineBreak=false;}else{w.rowColumns=U;if(x>1){w.lineBreak=true;}w.first=false;}}else{if(w.rowColumns<x){w.rowColumns++;w.lineBreak=false;}else{w.rowColumns=1;if(x>1){w.lineBreak=true;}w.first=false;}}};for(i=0;i<e;i++){if(c===d[i]){O=L;}else{O=this.getLayoutDataForElement(d[i],"sap.ui.layout.form.ColumnContainerData");}v(S.M,g,(O?O.getColumnsM():0));v(S.L,h,(O?O.getColumnsL():0));v(S.XL,j,(O?O.getColumnsXL():0));if(c===d[i]){o.M.Break=S.M.lineBreak;o.L.Break=S.L.lineBreak;o.XL.Break=S.XL.lineBreak;o.M.FirstRow=S.M.first;o.L.FirstRow=S.L.first;o.XL.FirstRow=S.XL.first;break;}}}}return o;};a.prototype._getFieldSize=function(f){var c=12;var L=this.getLayoutDataForElement(f,"sap.ui.layout.form.ColumnElementData");var o={S:{Size:c,Break:false,Space:0},L:{Size:c,Break:false,Space:0}};var d=c;var e=this.getLabelCellsLarge();if(L){o.S.Size=L.getCellsSmall();o.L.Size=L.getCellsLarge();}var E=f.getParent();var g=E.getLabelControl();if(g===f){if(!L){o.S.Size=d;o.L.Size=e;}}else{var h=E.getFieldsForRendering();var j=h.length;var k=c;var m=c-this.getEmptyCellsLarge();if(g){var n=this.getLayoutDataForElement(g,"sap.ui.layout.form.ColumnElementData");if(n){d=n.getCellsSmall();e=n.getCellsLarge();}if(d<c){k=k-d;}if(e<c){m=m-e;}}else{d=0;e=0;}if(j===1){if(!L){o.S.Size=k;o.L.Size=m;}else if(g){if(o.S.Size>k){o.S.Break=true;}if(o.L.Size>m){o.L.Break=true;}}}else{var i=0;var r=[];var p=[];var s={availableCells:k,first:0,last:999,firstDefault:-1,defaultFields:0};var t=0;var u=0;var v=0;var O;r.push(q.extend({},s));s.availableCells=m;p.push(q.extend({},s));var w=function(A,B,I,c){A[B].last=I-1;A.push(q.extend({},s));B++;A[B].first=I;A[B].availableCells=c;return B;};var x=function(A,B,G,U,I){if(A[B].availableCells-A[B].defaultFields<G){if(G<=U){B=w(A,B,I,U);}else{B=w(A,B,I,c);}}A[B].availableCells=A[B].availableCells-G;return B;};var y=function(A,B,c,I){if(A[B].availableCells===A[B].defaultFields){B=w(A,B,I,c);}if(A[B].firstDefault<0){A[B].firstDefault=I;}A[B].defaultFields++;return B;};for(i=0;i<j;i++){if(f!==h[i]){O=this.getLayoutDataForElement(h[i],"sap.ui.layout.form.ColumnElementData");}else{O=L;v=i;}if(O){t=x(r,t,O.getCellsSmall(),k,i);u=x(p,u,O.getCellsLarge(),m,i);}else{t=y(r,t,k,i);u=y(p,u,m,i);}}var z=function(A,v,L,o,B){var G=0;var s;for(i=0;i<A.length;i++){if(v>=A[i].first&&v<=A[i].last){s=A[i];break;}}if(!L){o.Size=Math.floor(s.availableCells/s.defaultFields);}if(v===s.first&&v>0){o.Break=true;if(B>0&&B<c&&o.Size<=c-B){o.Space=B;}}if(v===s.firstDefault){G=s.availableCells-s.defaultFields*o.Size;if(G>0){o.Size=o.Size+G;}}};z(r,v,L,o.S,d);z(p,v,L,o.L,e);}}return o;};function _(){if(this._sResizeListener){R.deregister(this._sResizeListener);this._sResizeListener=undefined;}}function b(e,n){var d=this.getDomRef();if(!d){_.call(this);return;}var $=this.$();if(!$.is(":visible")){return;}var w=d.clientWidth;var c=1;if(w<=this._iBreakPointTablet){$.toggleClass("sapUiFormCLMedia-Std-Phone",true);$.toggleClass("sapUiFormCLMedia-Std-Desktop",false).toggleClass("sapUiFormCLMedia-Std-Tablet",false).toggleClass("sapUiFormCLMedia-Std-LargeDesktop",false);}else if((w>this._iBreakPointTablet)&&(w<=this._iBreakPointDesktop)){$.toggleClass("sapUiFormCLMedia-Std-Tablet",true);$.toggleClass("sapUiFormCLMedia-Std-Desktop",false).toggleClass("sapUiFormCLMedia-Std-Phone",false).toggleClass("sapUiFormCLMedia-Std-LargeDesktop",false);c=this.getColumnsM();}else if((w>this._iBreakPointDesktop)&&(w<=this._iBreakPointLargeDesktop)){$.toggleClass("sapUiFormCLMedia-Std-Desktop",true);$.toggleClass("sapUiFormCLMedia-Std-Phone",false).toggleClass("sapUiFormCLMedia-Std-Tablet",false).toggleClass("sapUiFormCLMedia-Std-LargeDesktop",false);c=this.getColumnsL();}else{$.toggleClass("sapUiFormCLMedia-Std-LargeDesktop",true);$.toggleClass("sapUiFormCLMedia-Std-Desktop",false).toggleClass("sapUiFormCLMedia-Std-Phone",false).toggleClass("sapUiFormCLMedia-Std-Tablet",false);c=this.getColumnsXL();}var W=this.getLabelCellsLarge()<12&&w/c>this._iBreakPointTablet;$.toggleClass("sapUiFormCLWideColumns",W);$.toggleClass("sapUiFormCLSmallColumns",!W);}return a;});
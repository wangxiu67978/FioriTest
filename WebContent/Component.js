/*
 * Copyright (C) 2009-2014 SAP AG or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ui.zfioriuserM.Component");
jQuery.sap.require("sap.ui.zfioriuserM.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ComponentBase");
sap.ca.scfld.md.ComponentBase
		.extend(
				"sap.ui.zfioriuserM.Component",
				{
					metadata : sap.ca.scfld.md.ComponentBase
							.createMetaData(
									"MD",
									{
										"name" : "Master Detail Sample",
										"version" : "1.0.0",
										"library" : "sap.ui.zfioriuserM",
										"includes" : [ "css/fioriuser.css" ],
										"dependencies" : {
											"libs" : [ "sap.m", "sap.me" ],
											"components" : [],
										},
										"config" : {
											"resourceBundle" : "i18n/i18n.properties",
											"titleResource" : "DISPLAY_NAME",
											"icon" : "sap-icon://Fiori2/F0018",
											"homeScreenIconPhone" : "./resources/sap/ca/ui/themes/base/img/launchicon/Create_Sales_Order/57_iPhone_Desktop_Launch.png",
											"homeScreenIconPhone@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/Create_Sales_Order/114_iPhone-Retina_Web_Clip.png",
											"homeScreenIconTablet" : "./resources/sap/ca/ui/themes/base/img/launchicon/Create_Sales_Order/72_iPad_Desktop_Launch.png",
											"homeScreenIconTablet@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/Create_Sales_Order/144_iPad_Retina_Web_Clip.png"
										},
										viewPath : "sap.ui.zfioriuserM.view",
										masterPageRoutes : {
											"master" : {
												"pattern" : "",
												"view" : "Master"
											}
										},
										detailPageRoutes : {
											"detail" : {
												"pattern" : "detail/{contextPath}",
												"view" : "Detail"
											},
										   "addUser" : {
											pattern : "addUser",
											view : "DetailForm"							
									    	},
									    	"ViewColumn" : {
												pattern : "ViewColumn",
												view : "Column"
											}
										},	
										fullScreenPageRoutes : {

											"editUser" : {
												pattern : "editUser/{Bname}",
												view : "DetailForm"
											},
											"submitOrder" : {
												pattern : "submitOrder/{Bname}",
												view : "ZMymm"
											},
											"ViewBar" : {
												pattern : "ViewBar",
												view : "Bar"
											},
											"ViewBar1" : {
												pattern : "ViewBar1",
												view : "Bar1"
											},
											"ViewColumn" : {
												pattern : "ViewColumn",
												view : "Column"
											},
											"ViewLine1" : {
												pattern : "ViewLine",
												view : "Line"
											}
				
										},
									}),
					createContent : function() {
						var v = {
							component : this
						};
						return sap.ui.view({
							viewName : "sap.ui.zfioriuserM.Main",
							type : sap.ui.core.mvc.ViewType.XML,
							viewData : v
						})
					}
				});

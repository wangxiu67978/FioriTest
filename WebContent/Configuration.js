/*
 * Copyright (C) 2009-2014 SAP AG or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ui.zfioriuserM.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("sap.ca.scfld.md.app.Application");
sap.ca.scfld.md.ConfigurationBase.extend(
		"sap.ui.zfioriuserM.Configuration", {
			oServiceParams : {
				serviceList : [ {
					name : "ZFIORIUSERM_SRV",
					masterCollection : "userSet",
					serviceUrl :"/sap/opu/odata/sap/ZFIORIUSERM_SRV",
					isDefault : true
				} ]
			},
			getServiceParams : function() {
				return this.oServiceParams
			},
			getServiceList : function() {
				return this.oServiceParams.serviceList
			},
			getMasterKeyAttributes : function() {
				return [ "Bname" ]
			}
		});

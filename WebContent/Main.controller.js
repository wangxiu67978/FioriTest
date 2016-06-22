/*
 * Copyright (C) 2009-2014 SAP AG or an SAP affiliate company. All rights reserved
 */
sap.ui.controller("sap.ui.zfioriuserM.Main", {
	onInit : function() {
		jQuery.sap.require("sap.ca.scfld.md.Startup");
		sap.ca.scfld.md.Startup.init('sap.ui.zfioriuserM', this);

	},
	onExit : function() {
	}
});

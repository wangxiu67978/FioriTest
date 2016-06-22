jQuery.sap.require("sap.ca.scfld.md.controller.BaseMasterController");
jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.ui.core.IconPool");
jQuery.sap.require("sap.ui.model.odata.Filter");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("jquery.sap.global");
sap.ca.scfld.md.controller.BaseMasterController
		.extend("sap.ui.zfioriuserM.view.Master",{
	onInit : function() {
		
				sap.ca.scfld.md.controller.BaseMasterController.prototype.onInit
						.call(this);		

	},
	
	handleListSelect : function (evt) {
		
		var context = evt.getParameter("listItem").getBindingContext();
		/*
		var url= "/sap/opu/odata/sap/ZFIORIUSERM_SRV";
		 var	oModel = new sap.ui.model.odata.ODataModel(url, true);
		
		this.getView().setModel(oModel) */
		this.oRouter.navTo("detail", {
			contextPath: context.sPath.substr(1)
		},!jQuery.device.is.phone)
		
		
	},
		

	USR_NEW : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.oRouter.navTo("addUser", {});		
	},

	handleSearch : function (evt) {
		
	},
	

	navBack : function (){
     window.history.go(-1);
	  
	},
	

});
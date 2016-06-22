jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");
jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("jquery.sap.history");

sap.ca.scfld.md.controller.BaseDetailController
		.extend("sap.ui.zfioriuserM.view.ZMymm", {
			
	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	},
	
	onInit : function() {
		sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit
		.call(this);
		var v = this.getView();
		this.unix_to_datetime;
		v.setModel(this.oApplicationFacade.getODataModel());
		this.oRouter.attachRouteMatched(this._loadData1, this);
		
		
			
	},
	to_Date:function(now){
		  var   year=now.getYear();       
        var   month=now.getMonth()+1;       
        var   date=now.getDate();       
        var   hour=now.getHours();       
        var   minute=now.getMinutes();       
        var   second=now.getSeconds();       
        return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;       
		
	},
	_loadData1:function(evt){
		
		

		if(evt.getParameter("name") === "submitOrder"){
			
			
			var v = this.getView();	
			var e1 = function(E) {
				
				sap.ca.ui.message.showMessageBox({
					type : sap.ca.ui.message.Type.SUCCESS,
					message : "创建失败",
				})
			};	
			var s1 = function(r) {
				//alert(r.results.length);
				//alert(r.results[0].WfId);
				var s={};
				var pp =r.results[0].WiCd.getDate();
				var ee =r.results[0].WiCd.getTime();
				var tt=r.results[0].WiCt.ms;
				for(var i=0;i<r.results.length;i++)
		        {
		        	var date=r.results[i].WiCd.getTime();
		        	var time=r.results[i].WiCt.ms;
		        	var dateTime=Number(date)+Number(time);
		        	var dateTime=new Date(dateTime);
		        	  var   year=dateTime.getFullYear();     
		              var   month=dateTime.getMonth()+1;     
		              var   date=dateTime.getDate();     
		              var   hour=dateTime.getHours();     
		              var   minute=dateTime.getMinutes();     
		              var   second=dateTime.getSeconds();     
		              dateTime=   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;     
		        	r.results[i].WiCd=dateTime;
		        }
				//var tt=r.results[0].WiCt.toLocalString();
				s.workFlowSet =r.results;
				
				var oProductModel = new sap.ui.model.json.JSONModel();
			    	oProductModel.setData(s);
					v.setModel(oProductModel,"order");
				//this.getView().setModel(oModel);
					v.getModel("order").getData();
					/*
				sap.ca.ui.message.showMessageBox({
					type : sap.ca.ui.message.Type.SUCCESS,
					message : "创建成功",
				})*/
				/*
				var url = "/sap/opu/odata/sap/ZFIORIUSERM_SRV";
				 var	oModel = new sap.ui.model.odata.ODataModel(url, true);
					v.setModel(oModel);
					*/
			};	
			var d = evt.getParameter("arguments").Bname;
			alert(d);
			/*
			v.setModel(this.oApplicationFacade.getApplicationModel("userSet"),"userSet1");	
			var c =  this.oApplicationFacade.getApplicationModel("userSet");
			var s =this.getView().getModel("userSet1");
			*/
			var saleOrderId="0000000028";
			var str="$filter=Busid eq 0000000028"
			var url= "/sap/opu/odata/SAP/ZWFEXTEND_SRV";
			var	oModel = new sap.ui.model.odata.ODataModel(url, true);
			this.getView().setModel(oModel,"a4");	
			var m=this.getView().getModel("a4");
			m.read("/FlowLogSet", null,
					[ "$filter=Busid eq '"+ saleOrderId+"'"], true, s1	, e1);	

		}
	},
	handleValueHelp : function (oEvent) {
		//alert("OK");
		//setModel()
		var t = this.getView().setModel("a4");
		
		var sInputValue = oEvent.getSource().getValue();

		this.inputId = oEvent.getSource().getId();
		// create value help dialog
		if (!this._valueHelpDialog) {
			this._valueHelpDialog = sap.ui.xmlfragment(
				"sap.ui.zfioriuserM.view.Dialog1",
				this
			);
			this.getView().addDependent(this._valueHelpDialog);
		}
/*
		// create a filter for the binding
		this._valueHelpDialog.getBinding("items").filter([new Filter(
			"Name",
			sap.ui.model.FilterOperator.Contains, sInputValue
		)]);
*/
		// open value help dialog filtered by the input value
		this._valueHelpDialog.open();
	},
	_handleValueHelpClose : function (evt) {
		var oSelectedItem = evt.getParameter("selectedItem");
		if (oSelectedItem) {
			var productInput = this.getView().byId(this.inputId);
			productInput.setValue(oSelectedItem.getTitle());
		}
		//evt.getSource().getBinding("items").filter([]);
	},
	 unix_to_datetime:function() {
	    var now = new Date(parseInt(1446422400000) * 1000);
	    alert( now.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "));
	},
	_onNavigateBack : function(e) {
		 // this.oRouter.navTo("soCreateCart", {})
			jQuery.sap.history.back()
		},
	getHeaderFooterOptions:function(){
		var b=[];
		//b.push({sI18nBtnTxt:"UPDATE",onBtnPressed:jQuery.proxy(this._handleSubmitUsr1,this)});
		return{sI18NFullscreenTitle:"SHIPPING_AND_PAYMENT",
			 buttonList:b,onBack:this._onNavigateBack,bSuppressBookmarkButton:true}
  }	
		});



















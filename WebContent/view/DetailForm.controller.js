jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ui.core.Fragment");
jQuery.sap.require("sap.m.ViewSettingsDialog");
jQuery.sap.require("jquery.sap.global");
sap.ca.scfld.md.controller.BaseFullscreenController
		.extend("sap.ui.zfioriuserM.view.DetailForm", {
	
	onInit : function() {
		sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit
		.call(this);
		var v = this.getView();
		v.setModel(this.oApplicationFacade.getODataModel());
		
		this.oRouter.attachRouteMatched(this._loadData1, this);	
		this.viewModes = {
				"NewTravel" : 1,
				"EditTravel" : 2
			};		
	
	},
	
	_loadData1:function(evt){
	
		if(evt.getParameter("name") === "addUser"){
			this.viewMode = this.viewModes.NewTravel;
			var t=this;
			this.cleanUpForm(t);
		}

		if(evt.getParameter("name") === "editUser"){
			this.viewMode = this.viewModes.EditTravel;
			userSetModel = new sap.ui.model.json.JSONModel();
			var v = this.getView();	
			
			v.setModel(this.oApplicationFacade.getApplicationModel("userSet"),"userSet1");	

		}
	},
	

	cleanUpForm : function(t) {
		var c={

				"Mandt" : "",
				"Bname" : "",
				"Uflag" : "",
				"roleuserSet": []
		}
		var roleSetModel = new sap.ui.model.json.JSONModel();
		roleSetModel.setData(c);
		this.getView().setModel(roleSetModel,"userSet1");
		this.getView().getModel("userSet1").updateBindings();

	},

	handleSelectDialogPress: function (oEvent) {
		var t = this;
		roleetModel = new sap.ui.model.json.JSONModel();
		if (! this._oDialog1) {
			this._oDialog1 = sap.ui.xmlfragment("sap.ui.zfioriuserM.view.Dialog", this);
		};
		
		var s1 = function(r) {
           var c = {roleSet:{}};
            c.roleSet = r.results;
            roleetModel.setData(c);
           t._oDialog1.setModel(roleetModel);
		}	
	
		var e1 = function(E) {

		};	

		cc = this.getView().getModel();
		cc.read("/roleSet", null,null, false, s1, e1);		
		

		var bMultiSelect = !!oEvent.getSource().data("multi");
		this._oDialog1.setMultiSelect(bMultiSelect);
		this._oDialog1.open();
	},
	
	handleClose: function(oEvent) {
		var aContexts = oEvent.getParameter("selectedContexts");
		if (aContexts.length) {
			var rolesChosen = aContexts.map(function(oContext) { return oContext.getObject().Rolename; }).join(",");
			var v=this.getView();
			if(rolesChosen!="")
		  {
				var userSet ={};
				
				var Rolename = rolesChosen.split(",");
				var Blength=Rolename.length;
				var model=v.getModel("userSet1");
				userSet = v.getModel("userSet1").getData();
				var Bname = userSet.Bname;
				
				if (userSet.roleuserSet.length===0){
					for(var i=0;i<Blength;i++)
					{
						var rolename=Rolename[i];
						var userAndRole ={};
						userAndRole.Bname=Bname;
						userAndRole.Rolename=rolename;
						userSet.roleuserSet.push(userAndRole);
					}					
				}
				else{
					for(var i=0;i<Blength;i++)
					{
						var rolename=Rolename[i];
						var userAndRole ={};
						userAndRole.Bname=Bname;
						userAndRole.Rolename=rolename;
						var j=userSet.roleuserSet.length;
						var bb=true;
						while(j>0){
							var t=userSet.roleuserSet[j-1].Rolename;
							if(rolename!=t){
								j--;
							}
							else{
								bb=false;
								break;
							}
						}
						if(bb==true){
							userSet.roleuserSet.push(userAndRole);
						}					
							
					}
				}
				
				model.setData(userSet);
				model.updateBindings();	
	
		}
		oEvent.getSource().getBinding("items").filter([]);
		
	}},
	
	removeItem : function(e) {
		var b = e.getSource();
		var l = b.getParent();
		var p = l.getBindingContext("userSet1").getPath();
		var i = p.substr(p.length - 1);
		l.setParent(null);
		
	    this.deleteCartItemAtIndex(i);
	    
		this.getView().byId("ROLE_LIST").removeItem(l)
	},
	
	deleteCartItemAtIndex : function(i) {
		var m = this.getView().getModel("userSet1");
				
		var d = m.getData();
		var a = d.roleuserSet;
		if ((a.length - 1) < i)
			i = 0;
		var t = a[i];
		var b = t.ItemNumber;
		if (b === undefined) {
			a.splice(i, 1)
		} else {
			var c = a.length;
			while (c--) {
				var e = a[c].ItemNumber;
				if (e === b) {
					a.splice(c, 1)
				}
			}
		}
		m.updateBindings();
	},
	handleSearch: function(oEvent) {
		var sValue = oEvent.getParameter("value");
		var oFilter = new Filter("Name", sap.ui.model.FilterOperator.Contains, sValue);
		var oBinding = oEvent.getSource().getBinding("items");
		oBinding.filter([oFilter]);
	},

	createEmptyRequestModel : function() {
		this.CreateUserRequestModel = // new sap.ui.model.json.JSONModel(
				{
					"Mandt" : "",
					"Bname" : "",
					"Uflag" : 0,
				};
		
	},
	
	onBeforeRendering:function(){
	
	},
	updateModelByForm : function(v) {
		this.CreateUserRequestModel.Mandt = "200";
		this.CreateUserRequestModel.Bname = this.byId("Bname").getValue();	
		//�������ͺܹؼ���Ҫǰ��̨ƥ�䣬����������ݽ�������
		this.CreateUserRequestModel.Uflag = parseInt(this.byId("Uflag").getValue());

		return true
	},	
	
	_handleSubmitUsr1:function(e){
		if (this.viewMode == this.viewModes.NewTravel) {
			//alert("new");
			//���������ķ��� 
			this._handleCreateCall(e)
		} else if (this.viewMode == this.viewModes.EditTravel) {
			//alert("update");
			//���ø��µķ���
			this._handleCreateCall(e)
		}
	},

	
	_handleCreateCall : function(e) {
		var t = this
		var m=this.getView().getModel();
		
		var s = this.getView().getModel("userSet1").getData();
		
		dd = {};
		dd.Bname = s.Bname;
		dd.Uflag = parseInt(s.Uflag);
		dd.Mandt = s.Mandt;
		
		if ( s.roleuserSet.length > 0 ) {
		  dd.roleuserSet = s.roleuserSet;	
		};
		
		m.create(
				'/userSet',
				dd,
				null,
				function(r) {
					t.userCreated(r.Bname);				
				},
				function(E) {
					t.showMessageToast("创建失败！")
				})

	},	
	
	userCreated : function(s) {
		var t = this;
		sap.ca.ui.message.showMessageBox({
			type : sap.ca.ui.message.Type.SUCCESS,
			message : "用户："+s+"创建成功",
		}, function() {
			t.onNavigateHome()
		})
	},	
	onNavigateHome : function() {
		this.oRouter.navTo("master", {})
	},	
	showMessageToast : function(v) {
		sap.ca.ui.message.showMessageToast(v, {
			duration : 3000
		})
	},
	_onRequestFailed : function(e) {
	//	this._setBusyOff();
		sap.ca.ui.message.showMessageBox({
			type : sap.ca.ui.message.Type.ERROR,
			message : e.message,
			details : e.response.body
		})
	},	
	_onNavigateBack : function(e) {
		 // this.oRouter.navTo("soCreateCart", {})
			jQuery.sap.history.back()
		},
	getHeaderFooterOptions:function(){
		var b=[];
		b.push({sI18nBtnTxt:"UPDATE",onBtnPressed:jQuery.proxy(this._handleSubmitUsr1,this)});
		return{sI18NFullscreenTitle:"SHIPPING_AND_PAYMENT",
			 buttonList:b,onBack:this._onNavigateBack,bSuppressBookmarkButton:true}
   }	
});
jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");
jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("jquery.sap.history");

sap.ca.scfld.md.controller.BaseDetailController
		.extend("sap.ui.zfioriuserM.view.Detail", {
			
	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	},
	
	onInit : function() {
		sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit
		.call(this);
		var v = this.getView();
		
		v.setModel(this.oApplicationFacade.getODataModel());
		var IsSubmitOrNot = true;
		this.oRouter.attachRouteMatched(function(e) {
			 //this.getView().byId("subWorkflow").setEnabled(true);
			this.buttonControl();
			if (e.getParameter("name") === "detail") {
			  d = e.getParameter("arguments").contextPath;
			  this.initData1(d);
			  this.readWorkFlow();
			  //this.initData2();
			}
		}, this);
		/*
		this.getView().addEventDelegate({
			onAfterShow : jQuery.proxy(this.onShow, this)
		});*/

	},
	buttonControl : function() {
		this.getView().byId("subWorkflow").setEnabled(true);
		
	},
	
	onShow : function() {
		alert("kkkkkkkk");
		this.getView().byId("subWorkflow").setEnabled(false);
		
	},

	
	
   initData1: function(contextPath) {
	  // t.byId("subWorkflow").setEnabled(false);
	  
    	var v = this.getView();
		var oProductModel = new sap.ui.model.json.JSONModel();
	
		var s1 = function(r) {
			var c = {
				Bname : r.Bname,
				Mandt : r.Mandt,
				Uflag : r.Uflag,
				roleuserSet:r.roleuserSet.results
			};

	    	oProductModel.setData(c);
			v.setModel(oProductModel,"userSet");
		}	
	
		var e1 = function(E) {

		};	
		
		cc = this.getView().getModel();
		//cc = this.oApplicationFacade.getODataModel();
		cc.read('/'+contextPath, null,
				[ "$expand=roleuserSet" ], false, s1, e1);	
		
		//this.readWorkFlow();
		
	},
	
	readWorkFlow:function(){
		    var t = this.getView();
			var s1 = function(r) {
				if(r.results.length>0){
					t.byId("subWorkflow").setEnabled(false); 
				}else{
					t.byId("subWorkflow").setEnabled(true);
				}
			}
			var e1 = function(r) {
				
			}
			var saleOrderId="0000100028";
			 var url= "/sap/opu/odata/SAP/ZWFEXTEND_SRV";
				var	oModel33 = new sap.ui.model.odata.ODataModel(url, true);
				this.getView().setModel(oModel33,"a3");
			oModel33.read("/FlowLogSet", null,
					[ "$filter=Busid eq '"+ saleOrderId+"'"], true, s1	, e1);
			
	},
	
	onBeforeRendering:function(){
		//var ee=e.getParameter("arguments").contextPath;
		//this.getView().byId("subWorkflow").setEnabled(false);
		/*
		var saleOrderId="0000000028";//这个是页面上获取的订单ID
		var url= "/sap/opu/odata/SAP/ZWFEXTEND_SRV";
		var	oModel = new sap.ui.model.odata.ODataModel(url, true);
		this.getView().setModel(oModel,"a3");
		var s1 = function(r) {
			if(r.result.length>0){
				alert(r.result.length);
				this.getView().byId("subWorkflow").setEnabled(false); //读取这个存在的话，就是说明已经提交，这个按钮就是不可用的
			}else{
				this.getView().byId("subWorkflow").setEnabled(true);
			}
			
		}
		var e1 = function(r) {
			
		}
		oModel.read("/FlowLogSet", null,
				[ "$filter=Busid eq '"+ saleOrderId+"'"], true, s1	, e1);
		*/

	},
	
	_handleEdit : function(evt) {
		var event=evt;
		var v = this.getView();
		var m = v.getModel("userSet");
		var key = m.getData().Bname;
		
		this.oApplicationFacade.setApplicationModel(
				"userSet", m);
		
		this.oRouter.navTo("editUser",
				{ Bname: key
				})
				
	},
	
	_handleDel : function() {
		var c =  this.getView().getModel("userSet").oData.Bname;
		sap.ca.ui.dialog.confirmation.open({
			question : "ȷ��ɾ����?",
			showNote : false,
			title : "ɾ��ȷ��",
			confirmButtonLabel : "ȷ��"
		}, jQuery.proxy(function(r) {
			this._handleDeCall(r,c)
		}, this))
	},
	_handleAdd : function(){
		alert("OK");
		var s = this.getView().getModel("userSet").getData();
	},
	_handleDeCall : function(r,c) {
		var t = this;
		var oDataModel=this.oApplicationFacade.getODataModel();;
		
		if (r.isConfirmed) {
			var p = {};
			p.fnSuccess = function() {
				oDataModel.setRefreshAfterChange(true);
				t._setBusyOff();
				sap.ca.ui.message
						.showMessageToast(t.oResourceBundle
								.getText("DELETE_OK"))
			};
			p.fnError = function(e) {
				oDataModel.setRefreshAfterChange(true);
			};
			oDataModel.setRefreshAfterChange(false);
			t._setBusyOn();
			
			oDataModel.remove("/userSet(Bname='"+ c +"')", p);
			this.oRouter.navTo("master", {})
			
		}
		
		
	},
	//测试Odata服务
	submittest: function(e){
		var t=this.getView();
		//首先获取订单的ID,点击这个按钮，调用后台的Odata 服务，，传给后台一个订单ID 
		var c =  this.getView().getModel("userSet").getData().Bname;
		
		//var url = "/sap/opu/odata/sap/ZFIORIUSERM_SRV";	
		//var url= "/sap/opu/odata/sap/ZSRA017_SALESORDER_CREATEEXT_SRV";
		var url= "/sap/opu/odata/SAP/ZWFEXTEND_SRV/";
		 var	oModel2 = new sap.ui.model.odata.ODataModel(url, true);
		this.getView().setModel(oModel2,"a1");	
		//var model=this.getView().getModel("a1");
		var e1 = function(E) {
			
			sap.ca.ui.message.showMessageBox({
				type : sap.ca.ui.message.Type.SUCCESS,
				message : "工作流启动失败",
			})
			/*
			var url = "/sap/opu/odata/sap/ZFIORIUSERM_SRV";
			 var	oModel2 = new sap.ui.model.odata.ODataModel(url, true);
				t.setModel(oModel2);
				*/
		};	
		var s1 = function(E) {
			
			sap.ca.ui.message.showMessageBox({
				type : sap.ca.ui.message.Type.SUCCESS,
				message : "工作流成功启动",
			})
			t.byId("subWorkflow").setEnabled(false);
			//$("#subWorkflow").setEnabled(false);
			/*
			var url = "/sap/opu/odata/sap/ZFIORIUSERM_SRV";
			 var	oModel = new sap.ui.model.odata.ODataModel(url, true);
				t.setModel(oModel);
				*/
		};	
		//var name="327";
		
		//model.read("/SalesOrders('" + name+"')", null,null, false, s1, e1)
		//var t = this
		//var s = this.getView().getModel("userSet1").getData();
		
		var m=this.getView().getModel("a1");
		var s={};
		//s.WsId="WS21500007";
		s.WsId="WS21500004";
		//var p="0000000028";
		var p="339";
		s.Busid=p;//这个是从页面获取的订单的ID
		s.Bustype="BUS2032";
		m.create(
				'/StartWorkflowSet',
				s,
				null,
				s1,
				e1)

		//model.read("/SalesOrders('" + name+"')", null,null, false, s1, e1);	
		
	},
	selectDetail: function(evt){
		
		//点击这个按钮，跳转到另一个页面，并且在另一个页面的初始化的时候进行设置新的Odata
		//先跳转到另一个页面
		var context = evt.getSource().getBindingContext();
		var c =  this.getView().getModel("userSet").getData().Bname;
		this.oRouter.navTo("submitOrder", {Bname: c});
		//下面这段代码是在新的一个页面的初始化的时候调用另一个Odata服务，进行页面展示数据用的
		/*
		var url = "/sap/opu/odata/sap/ZFIORIUSERM_SRV";	
		 var	oModel2 = new sap.ui.model.odata.ODataModel(url, true);
		this.getView().setModel(oModel2);
		*/	
		
	},
//添加Bar
	chartDetail: function(evt){
		var context = evt.getSource().getBindingContext();
	//	var c =  this.getView().getModel("userSet").getData().Bname;
		this.oRouter.navTo("ViewBar", {});
		
		
	},
	chartDetail1: function(evt){
		var context = evt.getSource().getBindingContext();
	//	var c =  this.getView().getModel("userSet").getData().Bname;
		this.oRouter.navTo("ViewBar1", {});
		
		
	},
	ColumnDetail:function(evt){
		var context = evt.getSource().getBindingContext();
		//	var c =  this.getView().getModel("userSet").getData().Bname;
			this.oRouter.navTo("ViewColumn", {});
			
			
		},
		LineDetail:function(evt){
			var context = evt.getSource().getBindingContext();
			//	var c =  this.getView().getModel("userSet").getData().Bname;
				this.oRouter.navTo("ViewLine", {});
				
				
			},
	showMessageToast : function(v) {
		sap.ca.ui.message.showMessageToast(v, {
			duration : 3000
		})
	},	
	_setBusyOn : function() {
		if (!this.busyOn) {
			this.busyOn = true;
			sap.ca.ui.utils.busydialog.requireBusyDialog({
				text : "load"
			})
		}
	},
	_setBusyOff : function() {
		if (this.busyOn) {
			this.busyOn = false;
			sap.ca.ui.utils.busydialog.releaseBusyDialog()
		}
	}

});
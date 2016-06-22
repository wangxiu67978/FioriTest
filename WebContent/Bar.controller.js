sap.ui.define([
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        'sap/viz/ui5/controls/common/feeds/FeedItem',
        'sap/viz/ui5/data/FlattenedDataset',
        './ControllerOverall'
    ], function(Controller, JSONModel, FeedItem, FlattenedDataset, ControllerOverall) {
    "use strict";

    var BarController = Controller.extend("sap.ui.zfioriuserM.Bar", {
        onInit: function(oEvent) {
            var oVizFrame = this.getView().byId("idVizFrameBar");
            var oFixFlex = this.getView().byId("idFixFlex");
            ControllerOverall.customFormat(); // set customized format
            ControllerOverall.loadLibrary(oVizFrame, oFixFlex); // load "sap.suite.ui.commons"

            var dataPath = "./model";
            oVizFrame.setVizType('bar');
            oVizFrame.setUiConfig({
                "applicationSet": "fiori"
            });
            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());

            var oModel = new JSONModel(dataPath + "/medium.json");
            var oModelS = new JSONModel(dataPath + "/small.json");
            var oModelL = new JSONModel(dataPath + "/large.json");
            var oDataset = new FlattenedDataset({
                dimensions: [{
                    name: "Store Name",
                    value: "{Store Name}"
                }],
                measures: [{
                    name: 'Revenue',
                    value: '{Revenue}'
                }, {
                    name: 'Cost',
                    value: '{Cost}'
                }],
                data: {
                    path: "/milk"
                }
            });
            oVizFrame.setDataset(oDataset);
            oVizFrame.setModel(oModel);

            var feedValueAxis = new FeedItem({
                    'uid': "valueAxis",
                    'type': "Measure",
                    'values': ["Revenue"]
                }),
                feedCategoryAxis = new FeedItem({
                    'uid': "categoryAxis",
                    'type': "Dimension",
                    'values': ["Store Name"]
                });
            oVizFrame.addFeed(feedValueAxis);
            oVizFrame.addFeed(feedCategoryAxis);

            oVizFrame.setVizProperties({
                general: {
                    layout: {
                        padding: 0.04
                    }
                },
                valueAxis: {
                    label: {
                        formatString: 'axisFormat'
                    },
                    title: {
                        visible: false
                    }
                },
                categoryAxis: {
                    title: {
                        visible: false
                    }
                },
                plotArea: {
                    dataLabel: {
                        visible: true,
                        formatString: 'datalabelFormat',
                        style: {
                            color: null
                        }
                    }
                },
                legend: {
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: false,
                    text: 'Revenue by City and Store Name'
                }
            });

            var oPanel1 = this.getView().byId("PN-1");
            var oContainer = this.getView().byId("idContainer");
            var oRadio1 = this.getView().byId("RB1-1");
            var oRadio2 = this.getView().byId("RB1-2");
            var oRadio3 = this.getView().byId("RB1-3");
            var oRadio4 = this.getView().byId("RB2-1");
            var oRadio5 = this.getView().byId("RB2-2");
            var oSwitch1 = this.getView().byId("SW-1");
            var oSwitch2 = this.getView().byId("SW-2");
            var oBox1 = this.getView().byId("BX-1");
            var oBox2 = this.getView().byId("BX-2");
            var oBox3 = this.getView().byId("BX-3");
            var oHBox = this.getView().byId("HB-1");
/*
            ControllerOverall.adjustStyle(oRadio1,oRadio2,oRadio3,oRadio4,oRadio5,
                null,null,null,null,null,oBox1,oBox2,oBox3,null,null,oHBox); // adjust style class to RTL mode
            ControllerOverall.setExpanding(oPanel1); // set automatic expanding of setting panel
*/
            // buttons control
            oRadio1.attachSelect(function() {
                oVizFrame.setModel(oModelS);
            });
            oRadio2.attachSelect(function() {
                oVizFrame.setModel(oModel);
            });
            oRadio3.attachSelect(function() {
                oVizFrame.setModel(oModelL);
            });
            oRadio4.attachSelect(function() {
                oVizFrame.removeFeed(feedValueAxis);
                feedValueAxis = new FeedItem({
                    'uid': "valueAxis",
                    'type': "Measure",
                    'values': ["Revenue"]
                });
                oVizFrame.addFeed(feedValueAxis);

            });
            oRadio5.attachSelect(function() {
                oVizFrame.removeFeed(feedValueAxis);
                feedValueAxis = new FeedItem({
                    'uid': "valueAxis",
                    'type': "Measure",
                    'values': ["Revenue", "Cost"]
                });
                oVizFrame.addFeed(feedValueAxis);
            });
            oSwitch1.attachChange(function() {
                if(this.getState()) {
                    oVizFrame.setVizProperties({
                        plotArea: {
                            dataLabel: {
                                visible: true
                            }
                        }
                    });
                }
                if(!this.getState()) {
                    oVizFrame.setVizProperties({
                        plotArea: {
                            dataLabel: {
                                visible: false
                            }
                        }
                    });
                }
            });
            oSwitch2.attachChange(function() {
                if(this.getState()) {
                    oVizFrame.setVizProperties({
                        valueAxis: {
                            title: {
                                visible: true
                            }
                        },
                        categoryAxis: {
                            title: {
                                visible: true
                            }
                        }
                    });
                }
                if(!this.getState()) {
                    oVizFrame.setVizProperties({
                        valueAxis: {
                            title: {
                                visible: false
                            }
                        },
                        categoryAxis: {
                            title: {
                                visible: false
                            }
                        }
                    });
                }
            });

        }
    });

    return BarController;

});

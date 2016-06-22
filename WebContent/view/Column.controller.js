sap.ui.controller("sap.ui.zfioriuserM.view.Column", {
    onInit: function(oEvent) {
        var oVizFrame = this.getView().byId("idVizFrameColumn");
        var oPopOver = this.getView().byId("idPopOver");
        var oModel = new sap.ui.model.json.JSONModel("http://bslxsvr03.besuretech.com:8000/sap/bc/ui5_demokit/test-resources/sap/viz/demokit/dataset/bookstore_fiori/ByYearCity_ProfitMin.json");
        var oDataset = new sap.viz.ui5.data.FlattenedDataset({
            dimensions: [{
                name: "Year",
                value: "{Year}"
            }
            , {
                name: 'City',
                value: '{City}'
            }],
            measures: [{
                name: 'Profit',
                value: '{Profit}'
            }],
            data: {
                path: "/book"
            }
        });

        oVizFrame.setDataset(oDataset);
        oVizFrame.setModel(oModel);

        var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "valueAxis",
                'type': "Measure",
                'values': ["Profit"]
            }),
            feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "categoryAxis",
                'type': "Dimension",
                'values': ["Year"]
            }),
        
            
            feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "color",
                'type': "Dimension",
                'values': ["City"]
            });

        oVizFrame.setVizProperties({
            plotArea: {
                dataLabel: {
                    visible: true,
                    formatString: "#,##0"
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


            legend: {
                title: {
                    visible: true
                }
            },
            title: {
                visible: true,
                text: 'Profit by City and Year'
            }
        });

        oVizFrame.addFeed(feedValueAxis);
        oVizFrame.addFeed(feedCategoryAxis);
        oVizFrame.addFeed(feedColor);
        oPopOver.connect(oVizFrame.getVizUid());
    }
});
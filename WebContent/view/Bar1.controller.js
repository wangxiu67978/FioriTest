sap.ui.controller("sap.ui.zfioriuserM.view.Bar1", {
    onInit: function(oEvent) {
        var oVizFrame = this.getView().byId("idVizFrameBar");
        var oPopOver = this.getView().byId("idPopOver");
        var oModel = new sap.ui.model.json.JSONModel("http://bslxsvr03.besuretech.com:8000/sap/bc/ui5_demokit/test-resources/sap/viz/demokit/dataset/bookstore_fiori/ByItemCity_sum.json");
        var oDataset = new sap.viz.ui5.data.FlattenedDataset({
            dimensions: [{
                name: "Item Category",
                value: "{Item Category}"
            }],
            measures: [{
                name: 'Revenue',
                value: '{Revenue}'
            }, {
                name: 'Cost',
                value: '{Cost}'
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
                'values': ["Revenue","Cost"]
            }),
            feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "categoryAxis",
                'type': "Dimension",
                'values': ["Item Category"]
            })
            ,
            feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "color",
                'type': "Dimension",
                'values': ["City"]
            })
            ;

        oVizFrame.setVizProperties({
        	
            valueAxis: {
                label: {
                    formatString: 'u'
                },
                title: {
                    visible: false
                }

            },
            plotArea: {
                dataLabel: {
                    visible: true,
                    formatString: "#,##0"
                }
            },
            legend: {
                title: {
                    visible: true
                }
            },

            title: {
                visible: true,
                text: 'Revenue by City and Item Category'
            }
        });



        oVizFrame.addFeed(feedValueAxis);
        oVizFrame.addFeed(feedCategoryAxis);
      //  oVizFrame.addFeed(feedColor);
        oPopOver.connect(oVizFrame.getVizUid());
    }
});
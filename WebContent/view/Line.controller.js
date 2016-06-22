sap.ui.controller("sap.ui.zfioriuserM.view.Line", {
  onInit: function(oEvent) {
    var oVizFrame = this.getView().byId("idVizFrameLine");
    var oPopOver = this.getView().byId("idPopOver");

    var oModel = new sap.ui.model.json.JSONModel("http://bslxsvr03.besuretech.com:8000/sap/bc/ui5_demokit/test-resources/sap/viz/demokit/dataset/bookstore_fiori/ByYearCity_sum.json");
    var oDataset = new sap.viz.ui5.data.FlattenedDataset({
      dimensions: [{
        name: 'Year',
        value: "{Year}"
      }, {
        name: 'City',
        value: "{City}"
      }],
      measures: [{
        name: 'Revenue',
        value: '{Revenue}'
      }],
      data: {
        path: "/book"
      }
    });

    oVizFrame.setVizProperties({
      valueAxis: {
        label: {
          formatString: 'u'
        }
      },
      plotArea: {
        dataLabel: {
          visible: true
        }
      /*,
        dataPointStyle: {
          "rules": [{
            "dataContext": [{
              "City": "New York "
            }],
            "properties": {
              "dataLabel": true
            },
            "displayName": ""
          }],
          "others": {
            "properties": {
              "dataLabel": false
            },
            "displayName": "Others"
          }
        },
        lineStyle: {
          rules: [{
            dataContext: [{
              City: "New York "
            }],
            properties: {
              width: 4
            }
          }]
        }*/
      },
      legend: {
        title: {
          visible: false
        }
      },

      title: {
        visible: true,
        text: 'Revenue by City and Year'
      }
    });
    oVizFrame.setDataset(oDataset);
    oVizFrame.setModel(oModel);

    var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
        'uid': "valueAxis",
        'type': "Measure",
        'values': ["Revenue"]
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

    oVizFrame.addFeed(feedValueAxis);
    oVizFrame.addFeed(feedCategoryAxis);
    oVizFrame.addFeed(feedColor);
    oPopOver.connect(oVizFrame.getVizUid());
  }
});
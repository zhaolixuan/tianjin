export default {
	state: {
		companyListData: [],
		rateData: [],
		scrollData: [],
		listData: [],
		subStages: [],
		projectNumber: 0,
		warningNumber: 0,

		geoCoordMap: {},
		size: 0,
		pointData: [],

		checkedProjectId: 0,

		// 地图标注用色
		legendColor: ['#FC9E50', '#FFC26D', '#03F1C3', '#FFF3A3', '#ADFBFF', '#ADFBFD', '#ADFBFB'],
		// 地图JSON
		mapJson: {
			"type": "FeatureCollection",
			"features": [{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								117.22251,
								39.11749
							],
							[
								117.2304,
								39.10834
							],
							[
								117.24135,
								39.09861
							],
							[
								117.24502,
								39.08925
							],
							[
								117.24856,
								39.08622
							],
							[
								117.26015,
								39.08091
							],
							[
								117.29245,
								39.07743
							],
							[
								117.29208,
								39.07541
							],
							[
								117.286,
								39.07047
							],
							[
								117.28847,
								39.0602
							],
							[
								117.27979,
								39.05926
							],
							[
								117.27951,
								39.06151
							],
							[
								117.27445,
								39.05904
							],
							[
								117.27302,
								39.06118
							],
							[
								117.26961,
								39.06092
							],
							[
								117.26825,
								39.0581
							],
							[
								117.26479,
								39.05769
							],
							[
								117.26758,
								39.05045
							],
							[
								117.25058,
								39.04996
							],
							[
								117.25047,
								39.05226
							],
							[
								117.22163,
								39.05186
							],
							[
								117.20388,
								39.07172
							],
							[
								117.18853,
								39.06692
							],
							[
								117.18445,
								39.07099
							],
							[
								117.18307,
								39.0742
							],
							[
								117.17972,
								39.08933
							],
							[
								117.17929,
								39.10199
							],
							[
								117.18881,
								39.10094
							],
							[
								117.1966,
								39.10162
							],
							[
								117.20574,
								39.10892
							],
							[
								117.21307,
								39.11199
							],
							[
								117.21327,
								39.11368
							],
							[
								117.22251,
								39.11749
							]
						]
					]
				},
				"properties": {
					"name": "河西区",
					"adcode": "120103",
					"telecode": "022",
					"level": "district",
					"parent": {
						"name": "天津市市辖区",
						"level": "city",
						"adcode": "120100",
						"center": {
							"crs": {
								"type": "name",
								"properties": {
									"name": "urn:ogc:def:crs:EPSG:6.3:4326"
								}
							},
							"type": "Point",
							"coordinates": [
								117.190182,
								39.125596
							]
						}
					},
					"center": {
						"lng": 117.217536,
						"lat": 39.101897
					}
				}
			}]
		}
	},
	mutations: {
		setCompanyListData: function(state, value) {
			state.companyListData = value
		},
		setRateData: function(state, value) {
			state.rateData = value
		},
		setScrollData: function(state, value) {
			state.scrollData = value
		},
		setListData: function(state, value) {
			state.listData = value
		},
		setSubStages: function(state, value) {
			state.subStages = value
		},
		setProjectNumber: function(state, value) {
			state.projectNumber = value
		},
		setWarningNumber: function(state, value) {
			state.warningNumber = value
		},
		setGeoCoordMap: function(state, value) {
			state.geoCoordMap = value
		},
		setPointData: function(state, value) {
			state.pointData = value
		},
		changeCheckedId: function(state, value) {
			state.checkedProjectId = value
		}
	}
}

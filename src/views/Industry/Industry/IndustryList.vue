<template>
	<div class="industry-wrapper-box">
		<div class="search search_box">
			<el-input
				placeholder="请输入内容"
				@focus="searchFocus"
				@blur="searchBlur"
				@keyup.enter.native="inputChange"
				v-model="searchValue"
				clearable
				@clear="cancelRadio"
				class="input-with-select"
			>
				<el-button slot="append" icon="el-icon-search" @click="inputChange"></el-button>
			</el-input>
			<ul v-if="searchList.length">
				<li v-for="(item, index) of searchList" :key="index" @click="searchItemClick(item.originalName)">{{ item.originalName }}</li>
			</ul>
		</div>
		<div class="table_box">
			<el-tabs v-model="activeName" @tab-click="didClickTab">
				<el-tab-pane v-for="item in titleTabData" :key="item.id" :label="item.title" :name="item.title">
					<div class="industry_table">
						<el-table :data="tableListData" style="width: 100%" @row-click="didClickCell">
							<el-table-column prop="entName" label="企业名称" show-overflow-tooltip></el-table-column>
							<el-table-column prop="industryPhyName" label="所属行业" show-overflow-tooltip :formatter="formatterStr"></el-table-column>
							<el-table-column prop="dom" label="注册地" show-overflow-tooltip :formatter="formatterStr"></el-table-column>
							<el-table-column prop="phoneNumber" label="电话" show-overflow-tooltip :formatter="formatterStr"></el-table-column>
							<el-table-column prop="email" label="邮箱" show-overflow-tooltip :formatter="formatterStr"></el-table-column>
							<el-table-column prop="regCap" label="注册资本" show-overflow-tooltip :formatter="formatterStr"></el-table-column>
							<el-table-column prop="esDate" label="成立日期" show-overflow-tooltip :formatter="formatterStr"></el-table-column>
							<el-table-column prop="param1" label="评分" show-overflow-tooltip :formatter="formatterStr"></el-table-column>
							<el-table-column prop="opScope" label="企业简介" show-overflow-tooltip :formatter="formatterStr"></el-table-column>
						</el-table>
						<div class="page">
							<el-pagination
								@current-change="handleCurrentChange"
								:current-page.sync="currPageNo"
								:page-size="paginationData.pageSize"
								layout="total, prev, pager, next"
								:total="paginationData.numberRecords"
							></el-pagination>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import api from '@/api/api';
export default {
	data() {
		return {
			titleTabData: [
				{
					id: 0,
					title: '大数据',
					queryString: '大数据'
				},
				{
					id: 1,
					title: '信息安全',
					queryString: '信息安全'
				},
				{
					id: 2,
					title: '新金融',
					queryString: '新金融'
				},
				{
					id: 3,
					title: '人工智能',
					queryString: '人工智能'
				}
			],
			activeName: '大数据',
			tableListData: [],
			activeTabIndex: 0,
			paginationData: {},
			searchValue: '', // 搜索
			searchList: [], // 搜索列表,
			currPageNo: 1,
		};
	},
	created() {
		if (this.$route.query.activeTabIndex>=0) {
			this.activeTabIndex = this.$route.query.activeTabIndex;
			this.activeName = this.titleTabData[this.activeTabIndex].title;
		}
		if (this.$route.query.currPageNo) this.currPageNo = this.$route.query.currPageNo;
		// if(this.$router)
	},
	methods: {
		formatterStr(row, column, cellValue, index) {
			if (cellValue && cellValue.length > 0) {
				return cellValue;
			} else {
				return '-';
			}
		},
		handleCurrentChange(index) {
			this.currPageNo = index;
			this.pushRouter()
			this.loadListData();
		},
		didClickTab(tab) {
			this.searchValue = '';
			this.activeTabIndex = parseInt(tab.index);
			this.currPageNo = 1;			
			this.pushRouter()
			this.loadListData();
		},
		didClickCell(row) {
			console.log(row);
			this.$router.push({
				name: 'IndustryInfo',
				query: {
					name: row.entName,
					activeTabIndex: this.activeTabIndex,
					currPageNo: this.currPageNo
				}
			});
		},
		pushRouter(){
			this.$router.push({
				name:'Industry',
				query:{
					key:this.$route.query.key,
					activeTabIndex: this.activeTabIndex,
					currPageNo: this.currPageNo					
				}
			})
		},
		loadListData() {
			this.getEntList();
		},
		inputChange() {
			this.currPageNo = 1;
			this.getEntList(() => {
				this.searchList = [];
			});
		},
		searchBlur() {
			if (!this.searchList.length) return;
			setTimeout(() => {
				this.searchList = [];
			}, 300);
		},
		searchFocus() {
			if (this.searchValue) {
				this.getEntFuzzyQuery();
			}
		},
		cancelRadio() {
			this.searchValue = '';
			this.currPageNo = 1;
			this.getEntList();
		},
		searchItemClick(name) {
			this.$router.push({
				name: 'IndustryInfo',
				query: {
					name: name
				}
			});
			this.searchList = [];
			this.searchValue = '';
		},
		getEntFuzzyQuery() {
			api
				.getEntFuzzyQuery({
					queryString: this.searchValue
				})
				.then(res => {
					this.searchList = [];
					if (res.result) {
						this.searchList = res.result.result;
					}
				});
		},
		getEntList(callBack) {
			api
				.getEntList({
					queryString: this.searchValue,
					industryType: this.titleTabData[this.activeTabIndex].queryString,
					pageIndex: this.currPageNo,
					pageSize: 12
				})
				.then(
					data => {
						let result = data.result;
						let r = [];
						this.paginationData = result.pagination;
						result.result.forEach((item, index) => {
							r.push(item.basicInfo);
						});
						this.tableListData = r;
						if (callBack) callBack();
					},
					error => {
						console.log('error', error);
					}
				);
		}
	},
	mounted() {
		this.loadListData();
	},
	watch: {
		searchValue(newValue) {
			if (!newValue) return;
			this.getEntFuzzyQuery();
		}
	}
};
</script>

<style scoped>
.wrapper-box {
	background: rgba(3, 130, 248, 0.08);
	margin: 0 0.2rem;
	height: 100%;
}
.table_box {
	padding: 0 0.4rem;
}

.search {
	font-size: 0;
	position: absolute;
	top: -0.55rem;
	right: 1rem;
	width: 3rem;
	/*height: 0.4rem;*/
	z-index: 99;
	background-color: #133674;
}

.search ul {
	border-top: 1px solid #183f84;
	margin: 0 0.15rem;
	padding: 0.08rem 0;
	font-size: 0.16rem;
	color: #fff;
}
.search ul li {
	padding: 0.05rem;
	cursor: pointer;
}
</style>
<style>
.el-tooltip__popper {
	max-width: 90%;
}
.table_box .el-tabs__item {
	color: #afdcfd;
	font-size: 0.2rem;
	padding: 0 0.3rem;
}
.table_box .el-tabs__header {
	margin: 0;
	top: -0.3rem;
}
.table_box .el-tabs__nav-wrap::after {
	background: none;
}
.table_box .el-tabs__active-bar {
	background: #00ffff;
}
.table_box .el-tabs__content {
	font-size: 0.18rem;
	color: #fff;
	margin-top: -0.3rem;
}

.page {
	text-align: right;
	margin-top: 0.3rem;
}
.page .el-pagination__total {
	color: #afdcfd;
	float: left;
}
.page .el-pagination button:disabled {
	background: no-repeat;
	border: 1px solid #0257a8;
}
.page .el-pagination {
	color: #0257a8;
}
.page .el-dialog,
.el-pager li {
	background: none;
	border: 1px solid #0257a8;
	min-width: 0.42rem;
	font-weight: normal;
	border-left: none;
}
.page .el-pager li.btn-quicknext,
.el-pager li.btn-quickprev {
	color: #0257a8;
}
.page .el-pagination .btn-next,
.el-pagination .btn-prev {
	background: none;
	border: 1px solid #0257a8;
	color: #fff;
}
.page .el-pagination button:disabled {
	color: #0256a6;
}
.page .el-pagination button,
.el-pagination span:not([class*='suffix']) {
	min-width: 0.2rem;
	padding-right: 0.1rem;
}
.page .el-pagination .btn-next {
	padding-left: 0.1rem;
}
.input-with-select input,
.input-with-select input:hover,
.input-with-select input:focus {
	background-color: rgba(3, 130, 248, 0.1);
	border: 1px solid #0257a8;
	color: #afdcfd;
	border-right: none;
}
.input-with-select div {
	background-color: rgba(3, 130, 248, 0.1);
	border: 1px solid #0257a8;
	border-left: none;
	color: #afdcfd;
}
.industry_table .el-table {
	color: #fff;
	font-size: 0.14rem;
	border: 1px solid #0257a8;
}
.industry_table.el-table th,
.el-table tr {
	background: none;
	border-bottom: 1px solid #0257a8;
}
.industry_table .el-table tr:last-child td {
	border-bottom: none;
}
.industry_table .el-table,
.el-table__expanded-cell {
	background: none;
}
.industry_table .el-table td {
	border-bottom: 1px solid #0257a8;
}
.industry_table .el-table .cell {
	font-weight: normal;
	color: #fff;
}
.industry_table .el-table .el-table_1_column_7 .cell {
	font-weight: normal;
}
.industry_table .el-table td,
.el-table th {
	padding: 0.1rem 0;
}
.industry_table .el-table th.is-leaf {
	border-bottom: 1px solid #0257a8;
	background: rgba(3, 130, 248, 0.1);
	color: #fff;
	font-size: 0.18rem;
	font-weight: normal;
}
.industry_table .el-table td {
	border-bottom: 1px solid #0257a8;
}
.industry_table .el-table tr:last-child td {
	border-bottom: none;
}
.industry_table .el-table--enable-row-hover .el-table__body tr:hover > td {
	background: none;
}
.industry_table .el-table--border::after,
.el-table--group::after,
.el-table::before {
	background: none;
}
.industry-wrapper-box .search .el-input__icon {
	width: 0.25rem;
	line-height: 0.45rem;
}
.el-popper[x-placement^='bottom'] .popper__arrow::after{
	border-bottom-color: #032995;
}
</style>

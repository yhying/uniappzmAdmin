<template>
	<view class="popup" v-if="show">
		<view class="popup" v-if="project_popup.show == true">
			<view class="project-popup">
				<view class="nav">
					<view class="_li" v-for="(item, index) in project_popup.nav.list" :key="index" :class="{on:project_popup.nav.index==index}"
					 v-text="item" @click="projectNavClick(index,'nav')"></view>
				</view>
				<view class="popup-centent" v-show="project_popup.nav.index == 0">
					<view class="_li" v-for="(item, index) in popupList.project" :key="index" :class="{on:item.status==true}" @click="popupListClick('project',item,index)">
						{{item.name}}
						<view class="info">
							<view class="money">
								￥
								<text v-text="item.price"></text>
								<text class="unit">元</text>
							</view>
							<image v-if="item.status == true" src="../../../static/style/project-jian-icon.png" mode="widthFix"></image>
							<image v-if="item.status == false" src="../../../static/style/project-jia-icon.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="popup-centent" v-show="project_popup.nav.index == 1">
					<view class="_li" v-for="(item, index) in popupList.product" :key="index" :class="{on:item.status==true}" @click="popupListClick('product',item,index)">
						{{item.name}}
						<view class="info">
							<view class="money">
								￥
								<text v-text="item.price"></text>
								<text class="unit">元</text>
							</view>
							<image v-if="item.status == true" src="../../../static/style/project-jian-icon.png" mode="widthFix"></image>
							<image v-if="item.status == false" src="../../../static/style/project-jia-icon.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="popup-centent" v-show="project_popup.nav.index == 2">
					<view class="_li" v-for="(item, index) in popupList.package" :key="index" :class="{on:item.status==true}" @click="popupListClick('package',item,index)">
						{{item.name}}
						<view class="info">
							<view class="money">
								￥
								<text v-text="item.price"></text>
								<text class="unit">元</text>
							</view>
							<image v-if="item.status == true" src="../../../static/style/project-jian-icon.png" mode="widthFix"></image>
							<image v-if="item.status == false" src="../../../static/style/project-jia-icon.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="popup-btn">
					<view class="btn-info">
						<text class="nums">已选择 {{project_popup.nums}} 件</text>
						<view class="money">
							￥<text v-text="project_popup.money"></text><text class="unit">元</text>
						</view>
					</view>
					<button @click="addProjectClick('button_popup')">确认</button>
				</view>
			</view>
		</view>
		<view class="popup-item register-popup" v-if="popup == 12">
			<view class="centent">
				<image src="../../static/style/success-icon.png" mode="widthFix"></image>
				<p>已收到你的申请</p>
				<p>请注意接听客服电话</p>
				<p>400-600-8888</p>
			</view>
			<view class="btn">
				<text @click="visitBtnClick(1,'register')" style="color: #007AFF;">确定</text>
			</view>
		</view>
		<view class="popup-item pay-item" v-if="popup == 11">
			<view class="nums-item">
				<view class="_li">
					<text v-text="popupPay.data.total_amount"></text>
					<view>应收 <span v-text="popupPay.data.total_amount"></span></view>
				</view>
				<view class="_li">
					<text v-text="popupPay.data.pay_amount"></text>
					<view>实收</view>
				</view>
				<view class="_li">
					<text v-text="popupPay.data.rest_amount"></text>
					<view>未付</view>
				</view>
			</view>
			<view class="centent">
				<view class="_h5 no-name">系统</view>
				<view class="select" v-for="(item, index) in popupPay.list" :key="index">
					<view class="_h6" v-text="item.pay_name"></view>
					<input type="text" :placeholder="currentIndex===index?' ':'￥0.0'" v-model="item.money" @focus='clearMoney(index)' />
				</view>
			</view>
			<view class="btn">
				<text v-for="(item, index) in visit.btn" :key="index" v-text="item" @click="visitBtnClick(index,'payItem')"></text>
			</view>
		</view>
		<view class="modifyReserveInfo-item popup-item" v-if="popup == 10">
			<view class="_h1">修改预约信息</view>
			<view class="centent">
				<view class="_h5">门店</view>
				<view class="select date">
					<text v-text="yuyueDetail.dept_name" style="width: 100%;" @click="visitDateClick('modifyReserveStore')"></text>
				</view>
				<view class="_h5">日期</view>
				<view class="select date">
					<text v-text="yuyueDetail.appoint_date" style="width: 100%;" @click="visitDateClick('modifyReserveDate')"></text>
				</view>
				<view class="_h5">项目</view>
				<view class="project-item">
					<view class="select project" v-for="(item, index) in yuyueDetail.items" :key="index">
						<view class="_h6" v-text="item.prod_name"></view>
						<view class="info">
							<view class="money">
								<input type="text" v-model="item.unit_price" />
								元
								<input type="text" v-model="item.buy_num" />
								次
							</view>
							<text @click="visitDateClick('modifyTeacher',index)" v-text="item.teacher_name"></text>
						</view>
						<image src="../../../static/style/popup-del-icon.png" class="del" mode="widthFix"></image>
					</view>
				</view>
				<view class="add-project" @click="addProjectClick('modifyReserveInfo',yuyueDetail.items)">
					<image src="../../../static/member/add-project-icon.png" class="icon" mode="widthFix"></image>
					添加新项目
				</view>
				<view class="_h5">时间</view>
				<view class="select date">
					<text v-text="yuyueDetail.appoint_btime" @click="visitTimeClick('modifyReserveTimeStart')"></text>
					至
					<text v-text="yuyueDetail.appoint_etime" @click="visitTimeClick('modifyReserveTimeEnd')"></text>
				</view>
				<view class="_h5 no-name">房间</view>
				<view class="select-user" @click="visitDateClick('modifyReserveRoom',popupList.room)">
					{{yuyueDetail.room_name}}
					<image src="../../../static/member/select-down-icon.png" mode="widthFix"></image>
				</view>
				<view class="_h5 no-name">备注</view>
				<view class="select">
					<input type="text" v-model="yuyueDetail.remarks" />
				</view>
			</view>
			<view class="btn">
				<text v-for="(item, index) in visit.btn" :key="index" v-text="item" @click="visitBtnClick(index,'modifyReserveInfo')"></text>
			</view>
		</view>
		<view class="reserveInfo-item popup-item" v-if="popup == 9">
			<view class="_h1">预约信息</view>
			<view class="centent">
				<view class="_h5 no-name">门店</view>
				<view class="select">
					<view class="_h6" v-text="yuyueDetail.dept_name"></view>
				</view>
				<view class="_h5 no-name">时间</view>
				<view class="_h5 no-name">{{yuyueDetail.appoint_date}}&nbsp;&nbsp;{{yuyueDetail.appoint_btime}}~{{yuyueDetail.appoint_etime}}</view>
				<view class="_h5 no-name">服务</view>
				<view class="select xiangmu" v-for="(item, index) in yuyueDetail.items" :key="index">
					<view class="_h6" v-text="item.prod_name"></view>
					<text class="xiangmu">{{item.unit_price}}元{{item.buy_num}}次</text>
				</view>
				<view class="_h5 no-name">技师</view>
				<view class="select">
					<text v-text="yuyueDetail.teachers"></text>
				</view>
				<view class="_h5 no-name">房间</view>
				<view class="select">
					<view class="_h6" v-text="yuyueDetail.room_name"></view>
				</view>
				<view class="_h5 no-name">备注</view>
				<view class="select">
					<view class="_h6" v-text="yuyueDetail.remarks"></view>
				</view>
			</view>
			<view class="btn">
				<text @click="visitBtnClick('reserveInfo')">取消</text>
				<text v-if="yuyueDetail.status != 4 && yuyueDetail.status != 2" @click="visitBtnClick('reserveInfo','modify',yuyueDetail)">修改预约</text>
				<text v-if="yuyueDetail.status != 4 && yuyueDetail.status != 2" @click="visitBtnClick('reserveInfo','cancel',yuyueDetail)">取消预约</text>
				<text v-if="yuyueDetail.status != 4 && yuyueDetail.status != 2" @click="visitBtnClick('reserveInfo','register',yuyueDetail)">收银</text>
			</view>
		</view>
		<view class="reserveInfo2-item popup-item" v-if="popup == 15">
			<view class="_h1">预约信息</view>
			<view class="centent">
				<view class="li_">
					<view class="_h5 no-name">门店</view>
					<view class="select">
						<view class="_h6" v-text="yuyueDetail.dept_name"></view>
					</view>
				</view>
				<view class="li_">
					<view class="_h5 no-name">时间</view>
					<view class="select no-name">{{yuyueDetail.appoint_date}}&nbsp;&nbsp;{{yuyueDetail.appoint_btime}}~{{yuyueDetail.appoint_etime}}</view>
				</view>
				<view class="_h5 no-name">服务</view>
				<view class="aa">
					<view class="select xiangmu" v-for="(item, index) in yuyueDetail.items" :key="index">
						<view class="_h6" v-text="item.prod_name"></view>
						<view class="_money">
							<span class="">{{item.unit_price}}</span>
							<span>元</span>
							<span>{{item.buy_num}}</span>次
						</view>
					</view>
				</view>
				<view class="li_">
					<view class="_h5 no-name">技师</view>
					<view class="select">
						<view class="_h6" v-text="yuyueDetail.teachers"></view>
					</view>
				</view>
				<view class="li_">
					<view class="_h5 no-name">房间</view>
					<view class="select">
						<view class="_h6" v-text="yuyueDetail.room_name"></view>
					</view>
				</view>
				<view class="li_">
					<view class="_h5 no-name">备注</view>
					<view class="select">
						<view class="_h6" v-text="yuyueDetail.remarks"></view>
					</view>
				</view>
			</view>
			<view class="btn">
				<text @click="visitBtnClick('reserveInfo')">取消</text>
				<text v-if="yuyueDetail.status != 4 && yuyueDetail.status != 2" @click="visitBtnClick('reserveInfo','modify',yuyueDetail)">修改预约</text>
				<text v-if="yuyueDetail.status != 4 && yuyueDetail.status != 2" @click="visitBtnClick('reserveInfo','cancel',yuyueDetail)">取消预约</text>
				<text v-if="yuyueDetail.status != 4 && yuyueDetail.status != 2" @click="visitBtnClick('reserveInfo','register',yuyueDetail)">收银</text>
			</view>
		</view>
		<view class="transfer-item popup-item" v-if="popup == 8">
			<view class="_h1">客户转交</view>
			<view class="centent">
				<view class="_h5 no-name">客户名称：{{transferForm.data.cus_name}}</view>
				<view class="_h5 no-name">当前归属：{{transferForm.data.name_ascr_dept}}-{{transferForm.data.name_ascr_op}}</view>
				<view class="_h5">转交给</view>
				<view class="select-user" @click="visitDateClick('transfer',transferForm.list)">
					{{transfer.userName.value}}
					<image src="../../static/member/select-down-icon.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="btn">
				<text v-for="(item, index) in visit.btn" :key="index" v-text="item" @click="visitBtnClick(index,'transfer')"></text>
			</view>
		</view>
		<view class="deposit-item popup-item" v-if="popup == 7">
			<view class="_h1">新定金</view>
			<view class="centent">
				<view class="_h5">转账方式</view>
				<view class="select">
					<text v-for="(item, index) in deposit.tabs.list" :key="index" :class="deposit.tabs.index==index ? 'on' : ''"
					 v-text="item" @click="depositTabsClick(index)"></text>
				</view>
				<view class="_h5">支付金额</view>
				<view class="select form">
					<input type="text" class="input nums" value="" v-model="deposit.money" />元
				</view>
				<view class="_h5">确认金额</view>
				<view class="select form">
					<input type="text" class="input nums" value="" v-model="deposit.verify" />元
				</view>
				<view class="_h5">支付日期</view>
				<view class="select date">
					<text v-text="deposit.date" style="width: 100%;" @click="visitDateClick('depositStart')"></text>
				</view>
			</view>
			<view class="btn">
				<text v-for="(item, index) in visit.btn" :key="index" v-text="item" @click="visitBtnClick(index,'deposit')"></text>
			</view>
		</view>
		<view class="follow-item popup-item" v-if="popup == 6">
			<view class="_h1">新跟进</view>
			<view class="centent">
				<view class="_h5">方式</view>
				<view class="select">
					<text v-for="(item, index) in follow.tabs.list" :key="index" :class="follow.tabs.index==index ? 'on' : ''" v-text="item"
					 @click="followTabsClick(index,'tabs')"></text>
				</view>
				<view class="_h5">类型</view>
				<view class="select">
					<text v-for="(item, index) in follow.type.list" :key="index" :class="follow.type.index==index ? 'on' : ''" style="width: 220upx;"
					 v-text="item" @click="followTabsClick(index,'type')"></text>
				</view>
				<view class="_h5">日期</view>
				<view class="select date">
					<text v-text="follow.select.date" style="width: 100%;" @click="visitDateClick('followStart')"></text>
				</view>
				<view class="_h5">下次跟进</view>
				<view class="select date">
					<text v-text="follow.select.time" style="width: 100%;" @click="visitDateClick('followTimeStart')"></text>
				</view>
				<view class="_h5 no-name">内容</view>
				<view class="select">
					<input type="text" class="input" value="" v-model="follow.remark" />
				</view>
			</view>
			<view class="btn">
				<text v-for="(item, index) in visit.btn" :key="index" v-text="item" @click="visitBtnClick(index,'follow')"></text>
			</view>
		</view>
		<view class="remind-item popup-item" v-if="popup == 5">
			<view class="_h1">新提醒</view>
			<view class="centent">
				<view class="_h5">提醒日期</view>
				<view class="select date">
					<text v-text="remind.select.date" style="width: 100%;" @click="visitDateClick('remindStart')"></text>
				</view>
				<view class="_h5">提醒时间</view>
				<view class="select date">
					<text v-text="remind.select.time" style="width: 100%;" @click="visitTimeClick('remindTimeStart')"></text>
				</view>
				<view class="_h5 no-name">内容</view>
				<view class="select">
					<input type="text" class="input" value="" v-model="remind.remark" />
				</view>
			</view>
			<view class="btn">
				<text v-for="(item, index) in visit.btn" :key="index" v-text="item" @click="visitBtnClick(index,'remind')"></text>
			</view>
		</view>
		<view class="reserve-item popup-item" v-if="popup == 4">
			<view class="_h1">新预约</view>
			<view class="centent">
				<view class="select">
					<view class="switch">
						<view class="_h4">跨店</view>
						<async-switch :checked="reserve.checked" @change="reserveChange"></async-switch>
						客户预约其他门店
					</view>
				</view>
				<view class="_h5" v-show="reserve.checked">跨预约门店</view>
				<view class="select-user" v-show="reserve.checked" @click="visitDateClick('reserve')">
					{{reserve.store.value}}
					<image src="../../static/member/select-down-icon.png" mode="widthFix"></image>
				</view>
				<view class="_h5">日期</view>
				<view class="select date">
					<text v-text="reserve.select.date" style="width: 100%;" @click="visitDateClick('reserveStart')"></text>
				</view>
				<view class="_h5">时间</view>
				<view class="select date">
					<text v-text="reserve.select.time.start" @click="visitTimeClick('reserveTimeStart')"></text>
					至
					<text v-text="reserve.select.time.end" @click="visitTimeClick('reserveTimeEnd')"></text>
				</view>
				<view class="_h5 no-name">备注</view>
				<view class="select">
					<input type="text" class="input" value="" v-model="reserve.remark" />
				</view>
				<view class="_h5 no-name">项目</view>
				<view class="select project" v-for="(item, index) in reserve.list" :key="index">
					<view class="_h6" v-text="item.prod_name"></view>
					<view class="info">
						<view class="money">
							<input type="text" v-model="item.unit_price" />
							元
							<input type="text" v-model="item.buy_num" />
							次
						</view>
						<text @click="visitDateClick('modifyTeacher',index)" v-text="item.teacher_name"></text>
					</view>
					<image src="../../../static/style/popup-del-icon.png" class="del" mode="widthFix"></image>
				</view>
				<view class="add-project" @click="addProjectClick('reserveList')">
					<image src="../../static/member/add-project-icon.png" class="icon" mode="widthFix"></image>
					添加新项目
				</view>
			</view>
			<view class="btn">
				<text v-for="(item, index) in visit.btn" :key="index" v-text="item" @click="visitBtnClick(index,'reserve')"></text>
			</view>
		</view>
		<view class="handselBalance-item popup-item" v-if="popup == 2">
			<view class="_h1">赠送余额</view>
			<view class="centent">
				<view class="_h5">数量</view>
				<view class="select">
					<input type="text" class="input nums" value="" v-model="handselBalance.nums" />个
				</view>
				<view class="_h5">备注</view>
				<view class="select">
					<input type="text" class="input" value="" v-model="handselBalance.remark" />
				</view>
			</view>
			<view class="btn">
				<text v-for="(item, index) in visit.btn" :key="index" v-text="item" @click="visitBtnClick(index,'handselBalance')"></text>
			</view>
		</view>
		<view class="handselBalance-item popup-item" v-if="popup == 3">
			<view class="_h1">赠送积分</view>
			<view class="centent">
				<view class="_h5">数量</view>
				<view class="select">
					<input type="text" class="input nums" value="" v-model="handselPoints.nums" />个
				</view>
				<view class="_h5">备注</view>
				<view class="select">
					<input type="text" class="input" value="" v-model="handselPoints.remark" />
				</view>
			</view>
			<view class="btn">
				<text v-for="(item, index) in visit.btn" :key="index" v-text="item" @click="visitBtnClick(index,'handselPoints')"></text>
			</view>
		</view>
		<view class="visit-item popup-item" v-if="popup == 1">
			<view class="_h1">新回访</view>
			<view class="tabs">
				<text v-for="(item, index) in visit.tabs.list" :key="index" :class="visit.tabs.index==index ? 'on' : ''" v-text="item.name"
				 @click="visitTabsClick(index,item)"></text>
			</view>
			<view class="centent" v-show="visit.tabs.index == 0">
				<view class="_h5">服务评价</view>
				<view class="select">
					<text v-for="(item, index) in visit.service.list" :key="index" :class="visit.service.index==index ? 'on' : ''"
					 v-text="item" @click="visitServiceClick('service',index)"></text>
				</view>
				<view class="_h5">技师评价</view>
				<view class="select">
					<text v-for="(item, index) in visit.technician.list" :key="index" :class="visit.technician.index==index ? 'on' : ''"
					 v-text="item" @click="visitServiceClick('technician',index)"></text>
				</view>
				<view class="_h5">门店评价</view>
				<view class="select">
					<text v-for="(item, index) in visit.store.list" :key="index" :class="visit.store.index==index ? 'on' : ''" v-text="item"
					 @click="visitServiceClick('store',index)"></text>
				</view>
				<view class="_h5">投诉</view>
				<view class="select">
					<text v-for="(item, index) in visit.complaint.list" :key="index" :class="visit.complaint.index==index ? 'on' : ''"
					 v-text="item" @click="visitServiceClick('complaint',index)" style="width: 220upx;"></text>
				</view>
				<view class="_h5">投诉状态</view>
				<view class="select">
					<text v-for="(item, index) in visit.status.list" :key="index" :class="visit.status.index==index ? 'on' : ''"
					 v-text="item" @click="visitServiceClick('status',index)"></text>
				</view>
				<view class="_h5">日期</view>
				<view class="select date">
					<text v-text="visit.connect.date" style="width: 100%;" @click="visitDateClick('visitConnectDate')"></text>
				</view>
				<view class="_h5 no-name">内容</view>
				<input type="text" class="input" v-model="visit.connect.centent" placeholder="请输入回访内容" />
			</view>
			<view class="centent" v-show="visit.tabs.index == 1">
				<view class="_h5">日期</view>
				<view class="select date">
					<text v-text="visit.select.date" style="width: 100%;" @click="visitDateClick('visitStart')"></text>
				</view>
				<view class="_h5">内容</view>
				<input type="text" class="input" v-model="visit.select.centent" placeholder="请输入回访内容" />
			</view>
			<view class="btn" v-show="visit.tabs.index == 0">
				<text v-for="(item, index) in visit.btn" :key="index" v-text="item" @click="visitBtnClick(index,'visit')"></text>
			</view>
			<view class="btn" v-show="visit.tabs.index == 1">
				<text v-for="(item, index) in visit.btn" :key="index" v-text="item" @click="visitBtnClick(index,'visit1')"></text>
			</view>
		</view>
		<view class="xuan-item popup-item" v-if="popup == 13">
			<view class="_h1">选择卡</view>
			<view class="tabs">
				<text v-for="(item, index) in xuanxiang.tabs.list" :key="index" :class="xuanxiang.tabs.index==index ? 'on' : ''"
				 v-text="item.name" @click="xuanxiangClick(index,item)"></text>
			</view>
			<view class="ul" v-show="xuanxiang.tabs.index == 0">
				<view class="li_" @click="selectClick('sel1')">
					<img src="../../static/order/1.png" class="img" alt="">
					<view class="name">
						<text>可用余额</text>
						<text>储值卡</text>
					</view>
					<view class="money">
						<span>￥</span>
						<span>7000.00</span>
					</view>
					<view class="time">有效期至：2019-12-28</view>
					<view class="circle">
						<img src="../../static/order/6.png" v-show="select1==true">
						<img src="../../static/order/7.png" v-show="select1==false">
					</view>
				</view>
				<view class="li_" @click="selectClick('sel2')">
					<img src="../../static/order/2.png" alt="">
					<view class="name">
						<text>可用折扣</text>
						<text>打折卡</text>
					</view>
					<view class="money">
						<span>折扣</span>
						<span>7折</span>
					</view>
					<view class="time">有效期至：2019-12-28</view>
					<view class="circle">
						<img src="../../static/order/6.png" v-show="select2==true">
						<img src="../../static/order/7.png" v-show="select2==false">
					</view>
				</view>
				<view class="li_" @click="selectClick('sel3')">
					<img src="../../static/order/3.png" alt="">
					<view class="name">
						<text>可用时段</text>
						<text>时段卡</text>
					</view>
					<view class="money">
						<span>时段</span>
						<span>15时~18时</span>
					</view>
					<view class="time">有效期至：2019-12-28</view>
					<view class="circle">
						<img src="../../static/order/6.png" v-show="select3==true">
						<img src="../../static/order/7.png" v-show="select3==false">
					</view>
				</view>
				<view class="li_" @click="selectClick('sel4')">
					<img src="../../static/order/4.png" alt="">
					<view class="name">
						<text>可用疗程</text>
						<text>疗程卡</text>
					</view>
					<view class="money">
						<span>次数</span>
						<span>15次</span>
					</view>
					<view class="time">有效期至：2019-12-28</view>
					<view class="circle">
						<img src="../../static/order/6.png" v-show="select4==true">
						<img src="../../static/order/7.png" v-show="select4==false">
					</view>
				</view>
			</view>
			<view class="ul" v-show="xuanxiang.tabs.index == 1">
				<view class="pic">
					<img src="../../static/order/5.png">
				</view>
			</view>
			<view class="btn btn1" v-show="xuanxiang.tabs.index == 0">
				<text v-for="(item, index) in xuanxiang.btn" :key="index" v-text="item" @click="xuanBtnClick(index,'xuan')"></text>
			</view>
			<view class="btn btn1" v-show="xuanxiang.tabs.index == 1">
				<text v-for="(item, index) in xuanxiang.btn" :key="index" v-text="item" @click="xuanBtnClick(index,'xuan1')"></text>
			</view>
		</view>
		<view class="reserveInfo2-item popup-item" v-if="popup == 16">
			<view class="_h1">新的跟进</view>
			<view class="centent">
				<view class="li_">
					<view class="_h5 no-name">方式</view>
					<view class="select">
						<view class="_h6">电话</view>
					</view>
				</view>
				<view class="li_">
					<view class="_h5 no-name">类型</view>
					<view class="select no-name">有效</view>
				</view>
				<view class="li_">
					<view class="_h5 no-name">日期</view>
					<view class="select">
						<view class="_h6">2019-01-16</view>
					</view>
				</view>
				<view class="li_">
					<view class="_h5 no-name">下次跟进</view>
					<view class="select">
						<view class="_h6">2019-11-16</view>
					</view>
				</view>
				<view class="_h5 no-name">内容</view>
				<text class="textarea">跟进内容</text>
			</view>
			<view class="btn2">
				<button @click="followClick()">确认查收</button>
			</view>
		</view>
		<view class="reserveInfo2-item popup-item" v-if="popup == 17">
			<view class="_h1">新的提醒</view>
			<view class="centent">
				<view class="li_">
					<view class="_h5 no-name">提醒日期</view>
					<view class="select">
						<view class="_h6">2019-01-16</view>
					</view>
				</view>
				<view class="li_">
					<view class="_h5 no-name">提醒时间</view>
					<view class="select no-name">07:45~07:46</view>
				</view>
				<view class="_h5 no-name">内容</view>
				<text class="textarea">跟进内容</text>
			</view>
			<view class="btn2">
				<button @click="tixingClick()">确认查收</button>
			</view>
		</view>
		<view class="reserveInfo2-item popup-item" v-if="popup == 18">
			<view class="_h1">预约信息</view>
			<view class="centent">
				<view class="li_">
					<view class="_h5 no-name">门店</view>
					<view class="select">
						<view class="_h6"></view>
					</view>
				</view>
				<view class="li_">
					<view class="_h5 no-name">时间</view>
					<view class="select no-name"></view>
				</view>
				<view class="_h5 no-name">服务</view>
				<view class="aa">
					<view class="select xiangmu">
						<view class="_h6"></view>
						<view class="_money">
							<span class=""></span>
							<span>元</span>
							<span></span>次
						</view>
					</view>
				</view>
				<view class="li_">
					<view class="_h5 no-name">技师</view>
					<view class="select">
						<view class="_h6"></view>
					</view>
				</view>
				<view class="li_">
					<view class="_h5 no-name">房间</view>
					<view class="select">
						<view class="_h6"></view>
					</view>
				</view>
				<view class="li_">
					<view class="_h5 no-name">备注</view>
					<view class="select">
						<view class="_h6"></view>
					</view>
				</view>
			</view>
			<view class="btn2">
				<button @click="daodianClick()">确认查收</button>
			</view>
		</view>
		<view class="transfer-item popup-item" v-if="popup == 19">
			<view class="_h1">客户转交</view>
			<view class="centent">
				<view class="_h5 no-name">客户名称：</view>
				<view class="_h5 no-name">之前归属：</view>
			</view>
			<view class="btn3">
				<button @click="searchClick()">查看详情</button>
				<button @click="zhuangjiaoClick()">确认查收</button>
			</view>
		</view>
		<w-picker mode="date" startYear="2019" endYear="2030" :defaultVal="[0,0,0]" :current="true" @confirm="onConfirm" ref="range"
		 themeColor="#f00">
		</w-picker>
		<w-picker mode="dateTime" :defaultVal="[0,0,0]" :current="true" @confirm="onConfirmTime" ref="rangeTime" themeColor="#f00">
		</w-picker>
		<w-picker mode="selector" @confirm="transferFormConfirm" ref="transferSelect" :selectList="transfer.userName.list"
		 themeColor="#f00">
		</w-picker>
		<w-picker mode="selector" @confirm="reserveFormConfirm" ref="reserveSelect" :selectList="reserve.store.list"
		 themeColor="#f00">
		</w-picker>
	</view>
</template>

<script>
	import asyncSwitch from "@/components/helang-asyncSwitch/helang-asyncSwitch.vue"
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			wPicker,
			"async-switch": asyncSwitch
		},
		props: ['popup', 'transferForm', 'yuyueDetail', 'popupList', 'popupPay'],
		data() {
			return {
				isMoney: false,
				show: false,
				date: '',
				index: '',
				placeValue: '￥0.0',
				currentIndex: '',
				select1: true,
				select2: true,
				select3: true,
				select4: true,
				pay: {
					balance: '',
					POS: '',
					Alipay: '',
					WeChat: '',
					cash: ''
				},
				project_popup: {
					show: false,
					nav: {
						index: 0,
						list: ['项目', '产品', '套餐']
					},
					money: 0,
					nums: 0
				},
				modifyReserveInfo: {
					store: {
						list: [],
						value: '',
						label: '选择门店',
					},
					time: {
						end: '',
						start: ''
					},
					room: '',
					date: ''
				},
				userInfo: {
					cus_id: '',
					dept_id: ''
				},
				transfer: {
					userName: {
						value: '',
						label: '',
						list: [],
					},
				},
				deposit: {
					tabs: {
						index: 0,
						list: ['支付宝', '微信', 'POS']
					},
					money: '',
					verify: '',
					date: ''
				},
				follow: {
					remark: '',
					type: {
						index: 0,
						list: ['有效', '无效']
					},
					tabs: {
						index: 0,
						list: ['电话', 'QQ', '微信', '面聊']
					},
					select: {
						date: '选择日期',
						time: '选择日期'
					}
				},
				remind: {
					remark: '',
					select: {
						date: '选择日期',
						time: '选择时间'
					}
				},
				reserve: {
					checked: false,
					remark: '',
					list: [],
					store: {
						value: '',
						label: '',
						list: [{
							label: "默认",
							value: 44
						}]
					},
					select: {
						date: '选择日期',
						time: {
							start: '选择时间',
							end: '选择时间'
						}
					}
				},
				handselBalance: {
					nums: '',
					remark: ''
				},
				handselPoints: {
					nums: '',
					remark: ''
				},
				visit: {
					connect: {
						date: '选择日期',
						centent: ''
					},
					select: {
						date: '选择日期',
						centent: ''
					},
					tabs: {
						list: [{
							name: '接通',
							value: '2'
						}, {
							name: '未接通',
							value: '1'
						}],
						index: 0,
						value: '2'
					},
					service: {
						list: ['好评', '中评', '差评'],
						index: 0,
					},
					technician: {
						list: ['好评', '中评', '差评'],
						index: 0,
					},
					store: {
						list: ['好评', '中评', '差评'],
						index: 0,
					},
					complaint: {
						list: ['否', '是'],
						index: 0,
					},
					status: {
						list: ['处理中', '处理成功', '处理失败'],
						index: 0,
					},
					btn: ['取消', '确定']
				},
				xuanxiang: {
					tabs: {
						list: [{
							name: '持有卡',
							value: '0'
						}, {
							name: '赠品',
							value: '1'
						}],
						index: 0,
						value: '2'
					},
					btn: ['取消', '确定']
				}
			}
		},
		onReady() {},
		onShow() {},
		onLoad(e) {},
		methods: {
			isEmpty(obj) {
				let key
				let empty = true
				if (obj instanceof Object) {
					for (key in obj) {
						if (empty && obj.hasOwnProperty(key)) {
							empty = false
						}
					}
				}
				return empty
			},
			isTrue(data) {
				switch (typeof data) {
					//对象，数组，null
					case 'object':
						return !this.isEmpty(data)
						break
					case 'number':
						return data == 0 ? false : true //不等于0 都为真
						break
					case 'string':
						return data.trim().length > 0 ? true : false
						break
					case 'boolean':
						return data
						break
					case 'undefined':
						return false
					default:
						return false
				}
			},
			addProjectClick(e, item) {
				if (e === 'modifyReserveInfo') {
					item.forEach((item, index) => {
						var item_prod_id = item.prod_id
						this.popupList.project.forEach((item, index) => {
							if (item.id === item_prod_id) {
								this.popupList.project[index].status = true
							}
						})
					})
					this.popupListClick()
					this.project_popup.show = true
				} else if (e === 'reserveList') {
					this.project_popup.show = true
				} else if (e === 'button_popup') {
					var itemPackage = new Array(),
						itemProduct = new Array(),
						itemProject = new Array();
					this.popupList.package.forEach((item, index) => {
						if (item.status === true) {
							itemPackage[index] = {
								prod_name: item.name,
								prod_id: item.id,
								prod_type: 3,
								unit_price: item.price,
								teacher_id: '',
								teacher_name: '',
								buy_num: 1
							}
						}
					})
					this.popupList.product.forEach((item, index) => {
						if (item.status === true) {
							itemProduct[index] = {
								prod_name: item.name,
								prod_id: item.id,
								prod_type: 2,
								unit_price: item.price,
								teacher_id: '',
								teacher_name: '',
								buy_num: 1
							}
						}
					})
					this.popupList.project.forEach((item, index) => {
						if (item.status === true) {
							itemProject[index] = {
								prod_name: item.name,
								prod_id: item.si_id,
								prod_type: 1,
								unit_price: item.price,
								teacher_id: '',
								teacher_name: '',
								buy_num: 1
							}
						}
					})
					this.project_popup.show = false
					if (this.popup == 4) {
						var list = []
						this.reserve.list = []
						list = list.concat(itemPackage, itemProduct, itemProject).sort()
						let new_arr = []
						list.forEach((item, index) => {
							// this.isTrue(item)?:'';
							if (this.isTrue(item)) {
								new_arr.push(item)
							}
						})
						this.reserve.list = new_arr
						return
					}
					if (this.popup === 'newYuyue') {
						this.popupList.package.forEach((item, index) => {
							if (item.status === true) {
								itemPackage[index] = {
									prod_name: item.name,
									prod_id: item.sp_id,
									prod_type: 1,
									unit_price: item.price,
									teacher_id: '',
									teacher_name: '',
									buy_num: 1
								}
							}
						})
						this.popupList.product.forEach((item, index) => {
							if (item.status === true) {
								itemProduct[index] = {
									prod_name: item.sr_name,
									prod_id: item.sr_id,
									prod_type: 1,
									unit_price: item.price,
									teacher_id: '',
									teacher_name: '',
									buy_num: 1
								}
							}
						})
						this.popupList.project.forEach((item, index) => {
							if (item.status === true) {
								itemProject[index] = {
									prod_name: item.si_name,
									prod_id: item.si_id,
									prod_type: 1,
									unit_price: item.price,
									teacher_id: '',
									teacher_name: '',
									buy_num: 1
								}
							}
						})
						var list = []
						list = list.concat(itemPackage, itemProduct, itemProject).sort()
						this.$emit('func', list)
						this.show = false
						return
					}
					let new_arr_item = []
					var arr_test = []
					arr_test = arr_test.concat(itemPackage, itemProduct, itemProject).sort()
					arr_test.forEach((item, index) => {
						// this.isTrue(item)?:'';
						if (this.isTrue(item)) {
							new_arr_item.push(item)
						}
					})
					this.yuyueDetail.items = []
					this.yuyueDetail.items = new_arr_item
				}
			},
			popupListClick(e, item, index) {
				var projectNums = 0,
					productNums = 0,
					packageNums = 0,
					projectMoney = 0,
					productMoney = 0,
					packageMoney = 0;
				if (e === 'project') {
					this.popupList.project[index].status = !this.popupList.project[index].status
				} else if (e === 'product') {
					this.popupList.product[index].status = !this.popupList.product[index].status
				} else if (e === 'package') {
					this.popupList.package[index].status = !this.popupList.package[index].status
				}
				this.popupList.project.forEach((item, index) => {
					if (item.status === true) {
						projectNums += parseInt(item.nums)
						projectMoney += parseInt(item.price)
					}
				})
				this.popupList.product.forEach((item, index) => {
					if (item.status === true) {
						productNums += parseInt(item.nums)
						productMoney += parseInt(item.price)
					}
				})
				this.popupList.package.forEach((item, index) => {
					if (item.status === true) {
						packageNums += parseInt(item.nums)
						packageMoney += parseInt(item.price)
					}
				})
				this.project_popup.money = projectMoney + productMoney + packageMoney
				this.project_popup.nums = projectNums + packageNums + productNums
			},
			clearMoney(index) {
				this.currentIndex = index
			},
			projectNavClick(e, item) {
				if (item === 'nav') {
					this.project_popup.nav.index = e
				}
			},
			visitTabsClick(e, item) {
				this.visit.tabs.index = e
				this.visit.tabs.value = item.value
			},
			xuanxiangClick(index, item) {
				this.xuanxiang.tabs.index = index
			},
			xuanBtnClick(index, e) {
				if (index == 0) {
					this.show = false;
				} else if (index = 1) {
					if (e === 'xuan') {
						this.show = false;
					} else if (e === 'xuan1') {
						this.show = false;
					}
				}
			},
			selectClick(e) {
				if (e === 'sel1') {
					this.select1 = !this.select1;
					this.select2 = true;
					this.select3 = true;
					this.select4 = true;
				} else if (e === 'sel2') {
					this.select2 = !this.select2;
					this.select1 = true;
					this.select3 = true;
					this.select4 = true;
				} else if (e === 'sel3') {
					this.select3 = !this.select3;
					this.select1 = true;
					this.select2 = true;
					this.select4 = true;
				} else if (e === 'sel4') {
					this.select4 = !this.select4;
					this.select1 = true;
					this.select3 = true;
					this.select2 = true;
				}
			},
			visitServiceClick(item, index) {
				if (item === 'service') {
					this.visit.service.index = index
				} else if (item === 'technician') {
					this.visit.technician.index = index
				} else if (item === 'complaint') {
					this.visit.complaint.index = index
				} else if (item === 'status') {
					this.visit.status.index = index
				} else if (item === 'store') {
					this.visit.store.index = index
				}
			},
			followTabsClick(e, item) {
				if (item === 'tabs') {
					this.follow.tabs.index = e
				} else if (item === 'type') {
					this.follow.type.index = e
				}
			},
			depositTabsClick(e) {
				this.deposit.tabs.index = e
			},
			visitBtnClick(e, item, value) {
				if (e === 1) {
					if (item === 'deposit') {
						// 定金
						this.Depositadd()
					} else if (item === 'transfer') {
						// 客户转交
						this.customerAscrcus()
					} else if (item === 'handselBalance') {
						// 赠送余额
						this.customerBalanceDirectIncrease()
					} else if (item === 'handselPoints') {
						// 赠送积分
						this.customerScoreDirectIncrease()
					} else if (item === 'visit') {
						// 新回访接通
						this.customerAddvisit()
					} else if (item === 'visit1') {
						// 新回访未接通
						this.customerAddvisit1()
					} else if (item === 'remind') {
						// 新提醒
						this.customerAddremind()
					} else if (item === 'follow') {
						// 新跟进
						this.cartAddFollow()
					} else if (item === 'modifyReserveInfo') {
						// 修改预约详情
						this.cartEdit()
					} else if (item === 'register') {
						uni.navigateTo({
							url: '/pages/login/index'
						})
					} else if (item === 'payItem') {
						// 支付提交
						this.paymentOrderpay()
					} else if (item === 'reserve') {
						// 新预约
						this.cartAdd()
					}
				} else if (e === 0) {
					this.show = false
				} else if (e === 'reserveInfo') {
					if (item === 'modify') {
						uni.navigateTo({
							url: '/pages/member/reserve?cus_id=' + this.yuyueDetail.cus_id + '&dept_id=' + this.yuyueDetail.dept_id
						});
					} else if (item === 'cancel') {
						uni.showModal({
							title: '提示',
							content: '确认取消预约？',
							success: function(res) {
								if (res.confirm) {
									this.$emit('childPopup', value)
									this.show = false
								}
							}
						});
					} else if (item === 'register') {
						uni.navigateTo({
							url: '/pages/price/detail?cus_id=' + this.yuyueDetail.cus_id + '&dept_id=' + this.yuyueDetail.dept_id
						});
					} else {
						this.show = false
					}
				}
			},
			itemClick(param) {
				this.show = param
				var label = new Array()
				uni.getStorageSync('store').forEach((item, index) => {
					label[index] = {
						label: item.dept_alias,
						value: item.dept_id
					}
				})
				this.modifyReserveInfo.store.list = label
				if (this.popup === 'newYuyue') {
					this.project_popup.show = true
				}
			},
			visitDateClick(e, item) {
				this.date = e
				if (e === 'transfer') {
					this.transfer.userName.list = item
					this.$refs.transferSelect.show()
					return
				} else if (e === 'reserve') {
					this.$refs.reserveSelect.show()
					return
				} else if (e === 'modifyReserveStore') {
					this.transfer.userName.list = this.modifyReserveInfo.store.list
					this.$refs.transferSelect.show()
					return
				} else if (e === 'modifyReserveRoom') {
					this.transfer.userName.list = item
					this.$refs.transferSelect.show()
					return
				} else if (e === 'modifyTeacher') {
					this.index = item
					this.transfer.userName.list = uni.getStorageSync('technician')
					this.$refs.transferSelect.show()
					return
				}
				this.$refs.range.show()
			},
			reserveChange(e) {
				if (this.reserve.checked === true) {
					this.reserve.checked = false
				} else {
					this.reserve.checked = true
				}
			},
			visitTimeClick(e) {
				this.date = e
				this.$refs.rangeTime.show()
			},
			onConfirm(e) {
				if (this.date === 'visitStart') {
					this.visit.select.date = e.result
				} else if (this.date === 'reserveStart') {
					this.reserve.select.date = e.result
				} else if (this.date === 'remindStart') {
					this.remind.select.date = e.result
				} else if (this.date === 'followStart') {
					this.follow.select.date = e.result
				} else if (this.date === 'followTimeStart') {
					this.follow.select.time = e.result
				} else if (this.date === 'depositStart') {
					this.deposit.date = e.result
				} else if (this.date === 'visitConnectDate') {
					this.visit.connect.date = e.result
				} else if (this.date === 'modifyReserveDate') {
					this.modifyReserveInfo.date = e.result
					this.yuyueDetail.appoint_date = e.result
				}
			},
			transferFormConfirm(e) {
				if (this.date === 'transfer') {
					this.transfer.userName.value = e.checkArr.label
					this.transfer.userName.label = e.checkArr.value
				} else if (this.date === 'modifyReserveStore') {
					this.yuyueDetail.dept_name = e.checkArr.label
					this.modifyReserveInfo.store.value = e.checkArr.value
					this.modifyReserveInfo.store.label = e.checkArr.label
				} else if (this.date === 'modifyReserveRoom') {
					this.modifyReserveInfo.room = e.checkArr.value
					this.yuyueDetail.room_name = e.checkArr.label
				} else if (this.date === 'modifyTeacher') {
					if (this.popup === 4) {
						this.reserve.list[this.index].teacher_name = e.checkArr.label
						this.reserve.list[this.index].teacher_id = e.checkArr.value
						return
					}
					this.yuyueDetail.items[this.index].teacher_name = e.checkArr.label
					this.yuyueDetail.items[this.index].teacher_id = e.checkArr.value
				}
			},
			reserveFormConfirm(e) {
				this.reserve.store.value = e.checkArr.label
				this.reserve.store.label = e.checkArr.value
			},
			onConfirmTime(e) {
				if (this.date === 'reserveTimeStart') {
					this.reserve.select.time.start = e.checkArr[3] + ':' + e.checkArr[4]
				} else if (this.date === 'reserveTimeEnd') {
					this.reserve.select.time.end = e.checkArr[3] + ':' + e.checkArr[4]
				} else if (this.date === 'remindTimeStart') {
					this.remind.select.time = e.checkArr[3] + ':' + e.checkArr[4]
				} else if (this.date === 'modifyReserveTimeStart') {
					this.yuyueDetail.appoint_btime = e.checkArr[3] + ':' + e.checkArr[4]
					this.modifyReserveInfo.time.start = e.checkArr[3] + ':' + e.checkArr[4]
				} else if (this.date === 'modifyReserveTimeEnd') {
					this.yuyueDetail.appoint_etime = e.checkArr[3] + ':' + e.checkArr[4]
					this.modifyReserveInfo.time.end = e.checkArr[3] + ':' + e.checkArr[4]
				}
			},
			// 新预约接口
			cartAdd() {
				var list = new Array()
				this.reserve.list.forEach((item, index) => {
					console.log(item);
					list[index] = {
						prod_id: item.prod_id,
						teacher_id: item.teacher_id,
						unit_price: item.unit_price,
						buy_num: item.buy_num,
						prod_type: item.prod_type
					}
				})
				uni.request({
					url: uni.getStorageSync('interface') + 'cart/add',
					method: 'POST',
					data: {
						cus_id: uni.getStorageSync('cus_id'),
						dept_id: uni.getStorageSync('dept_id'),
						appoint_btime: this.reserve.select.time.start,
						appoint_etime: this.reserve.select.time.end,
						appoint_date: this.reserve.select.date,
						cross_dept: 0,
						remarks: this.reserve.remark,
						room_id: this.reserve.store.label,
						items: JSON.stringify(list)
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.show = false
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				});
			},
			// 新定金接口
			Depositadd() {
				if (this.deposit.money != this.deposit.verify) {
					uni.showToast({
						icon: 'none',
						title: '金额输入错误'
					});
					return
				}
				uni.request({
					url: uni.getStorageSync('interface') + 'Deposit/add',
					method: 'POST',
					data: {
						cus_id: uni.getStorageSync('cus_id'),
						dept_id: uni.getStorageSync('dept_id'),
						dep_amount: this.deposit.money,
						dep_amount2: this.deposit.verify,
						dep_meno: '',
						pay_type: this.deposit.tabs.index,
						pay_date: this.deposit.date
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.show = false
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				});
			},
			// 客户转交接口
			customerAscrcus() {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/ascrcus',
					method: 'POST',
					data: {
						cus_id: uni.getStorageSync('cus_id'),
						ascr_id: this.transfer.userName.label
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.show = false
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				});
			},
			// 赠送余额接口
			customerBalanceDirectIncrease() {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/balance/direct/increase',
					method: 'POST',
					data: {
						cus_id: uni.getStorageSync('cus_id'),
						content: this.handselBalance.remark,
						quantity: this.handselBalance.nums
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.show = false
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				});
			},
			// 赠送积分接口
			customerScoreDirectIncrease() {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/score/direct/increase',
					method: 'POST',
					data: {
						cus_id: uni.getStorageSync('cus_id'),
						content: this.handselPoints.remark,
						quantity: this.handselPoints.nums
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.show = false
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				});
			},
			// 新回接通访接口
			customerAddvisit() {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/addvisit',
					method: 'POST',
					data: {
						cus_id: uni.getStorageSync('cus_id'),
						visit_time: this.visit.connect.date,
						complaint: this.visit.complaint.index + 1,
						visit_status: this.visit.status.index + 1,
						connect: this.visit.tabs.value,
						content: this.visit.connect.centent,
						ser_level: this.visit.service.index + 1,
						dept_level: this.visit.store.index + 1,
						tec_level: this.visit.technician.index + 1
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.show = false
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				});
			},
			// 新回访未接通接口
			customerAddvisit1() {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/addvisit',
					method: 'POST',
					data: {
						cus_id: uni.getStorageSync('cus_id'),
						visit_time: this.visit.select.date,
						complaint: '1',
						visit_status: 0,
						connect: this.visit.tabs.value,
						content: this.visit.select.centent,
						ser_level: 0,
						dept_level: 0,
						tec_level: 0
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.show = false
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				});
			},
			// 新提醒接口
			customerAddremind() {
				uni.request({
					url: uni.getStorageSync('interface') + 'customer/addremind',
					method: 'POST',
					data: {
						cus_id: uni.getStorageSync('cus_id'),
						content: this.remind.remark,
						noti_time: this.remind.select.date + ' ' + this.remind.select.time
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.show = false
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				});
			},
			// 新跟进接口
			cartAddFollow() {
				uni.request({
					url: uni.getStorageSync('interface') + 'cart/addFollow',
					method: 'POST',
					data: {
						cus_id: uni.getStorageSync('cus_id'),
						dept_id: uni.getStorageSync('dept_id'),
						content: this.follow.remark,
						follow_next: this.follow.select.time,
						follow_status: this.follow.type.index + 1,
						follow_time: this.follow.select.date,
						follow_type: this.follow.tabs.index + 1
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.show = false
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				});
			},
			// 修改预约详情
			cartEdit() {
				uni.request({
					url: uni.getStorageSync('interface') + 'cart/edit',
					method: 'POST',
					data: {
						appoint_btime: this.yuyueDetail.appoint_btime,
						dept_id: uni.getStorageSync('dept_id'),
						appoint_date: this.yuyueDetail.appoint_date,
						appoint_etime: this.yuyueDetail.appoint_etime,
						cart_duration: 1,
						cart_id: this.yuyueDetail.cart_id,
						cus_id: this.yuyueDetail.cus_id,
						items: JSON.stringify(this.yuyueDetail.items),
						remarks: this.yuyueDetail.remarks,
						room_id: this.modifyReserveInfo.room
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.show = false
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				});
			},
			// 支付提交
			paymentOrderpay() {
				var list = new Array()
				this.popupPay.list.forEach((item, index) => {
					if (!(item.money === '')) {
						this.isMoney = true
						item.money = parseInt(item.money)
						if (item.pay_as === 'pay_as') {
							list[index] = {
								type: item.status,
								pay_id: item.pay_id,
								pay_as: item.pay_as,
								money: item.money,
								de_ids: null
							}
						} else {
							list[index] = {
								type: item.status,
								pay_id: item.pay_id,
								money: item.money,
								de_ids: null
							}
						}
					}
				})
				console.log(this.isMoney);
				if (this.isMoney === false) {
				    uni.showToast({
				        icon: 'none',
				        title: '请输入金额！'
				    });
				    return
				}
				uni.request({
					url: uni.getStorageSync('interface') + 'payment/orderpay',
					method: 'POST',
					data: {
						cus_id: this.popupPay.data.cus_id,
						order_no: this.popupPay.data.order_no,
						pay_data: list
					},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						if (res.data.code === 1) {
							this.show = false
							uni.navigateTo({
								url: '/pages/tabBar/Price/price'
							})
						}
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				});
			},
			followClick(){
				this.show=false;
			},
			tixingClick(){
				this.show=false;
			},
			daodianClick(){
				this.show=false;
			},
			searchClick(){
				this.show=false;
			},
			zhuangjiaoClick(){
				this.show=false;
			}
			
		}
	}
</script>

<style lang="less">
	::-webkit-scrollbar {
		width: 0px;
	}
	.register-popup {
		.centent {
			image {
				width: 90upx;
				margin-left: auto;
				margin-right: auto;
				display: flex;
				margin-top: 60upx;
			}

			p {
				font-size: 28upx;
				color: #333333;
				margin-top: 10upx;
				text-align: center;
			}
		}
	}

	.pay-item {
		.nums-item {
			height: 180upx;
			background: #ff0066;
			display: flex;

			._li {
				flex: 1;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: relative;

				&:after {
					content: '';
					position: absolute;
					width: 2upx;
					height: 60upx;
					left: 0;
					background: #FFFFFF;
					top: 50%;
					margin-top: -30upx;
				}

				&:first-child {
					&:after {
						height: 0;
					}
				}

				text {
					font-size: 34upx;
					color: #FFFFFF;
				}

				view {
					margin-top: 10upx;
					font-size: 24upx;
					color: #FFFFFF;

					span {
						text-decoration: line-through;
					}
				}
			}
		}


		.centent {
			.select {
				justify-content: flex-start;
				margin-bottom: 20upx;

				._h6 {
					font-size: 28upx;
					width: 134upx;
					color: #333333;
				}

				input {
					width: 260upx;
					height: 60upx;
					font-size: 24upx;
					border: solid 1upx #e4e4e4;
					box-sizing: border-box;
					text-align: center;
				}

				.select-btn {
					width: 102upx;
					height: 100%;
					font-size: 26upx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #333333;
				}
			}
		}
	}

	.project-popup {
		height: 550upx;
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		background: #FFFFFF;

		.nav {
			position: absolute;
			left: 0;
			width: 170upx;
			bottom: 88upx;
			top: 0;
			overflow-x: hidden;
			overflow-y: auto;
			background: #f9fafc;

			._li {
				height: 88upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 26upx;
				color: #161616;

				&.on {
					background: #FFFFFF;
				}
			}
		}

		.popup-btn {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			height: 88upx;

			.btn-info {
				position: absolute;
				right: 240upx;
				left: 0;
				top: 0;
				bottom: 0;
				background: #f9fafc;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 40upx;
				padding-right: 40upx;

				text {
					font-size: 36upx;
					color: #ff0066;

					&.nums {
						font-size: 22upx;
						color: #868686;
					}

					&.unit {
						font-size: 22upx;
						color: #ff0066;
					}
				}

				.money {
					font-size: 20upx;
					color: #ff0066;
				}
			}

			button {
				width: 240upx;
				position: absolute;
				right: 0;
				top: 0;
				bottom: 0;
				background: #ff0066;
				font-size: 22upx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.popup-centent {
			position: absolute;
			left: 200upx;
			right: 30upx;
			bottom: 88upx;
			top: 30upx;
			overflow-x: hidden;
			overflow-y: auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			._li {
				width: 246upx;
				height: 120upx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				font-size: 26upx;
				color: #1b1b1b;
				background: #f6f7f9;
				border: solid 2upx #e8e8e9;
				box-sizing: border-box;
				margin-bottom: 30upx;

				&.on {
					border: solid 2upx #ff0056;
				}

				.info {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 10upx;

					.money {
						font-size: 20upx;
						color: #ff0062;
						display: flex;
						align-items: center;

						text {
							font-size: 28upx;
							color: #ff0062;

							&.unit {
								font-size: 22upx;
								color: #1b1b1b;
								margin-left: 10upx;
							}
						}
					}

					image {
						width: 30upx;
						height: 100%;
						margin-left: 40upx;
					}
				}
			}
		}
	}

	.modifyReserveInfo-item {

		.add-project {
			margin-top: 30upx;
		}

		.select {
			input {
				width: 100%;
				font-size: 24upx;
				border: solid 0.5px #e4e4e4;
				box-sizing: border-box;
				height: 60upx;
				padding-left: 20upx;
			}
		}
	}

	.reserveInfo-item {
		::-webkit-scrollbar {
			width: 0px;
		}

		.centent {
			.xiangmu {
				background-color: #f5f6f8 !important;
			}

			.select {
				font-size: 24upx !important;
				color: #949494 !important;

				._h6 {
					margin-left: 50upx;
				}

				text {
					background: #FFFFFF;
				}
			}
		}
	}

	.reserveInfo2-item {
		position:relative;
		.centent {
			.aa {
				.xiangmu:last-child {
					margin-bottom: 0;
				}
			}

			.xiangmu {
				background-color: #f6f7f9 !important;
				margin-bottom: 20upx;
				box-sizing: border-box;
				height: 83upx;

				._money {
					padding-right: 20upx;

					span {
						color: #333;
					}

					span:nth-child(2) {
						margin: 10upx 30upx 0 25upx;
						font-size: 20upx;
						color: #949494;
					}

					span:nth-child(3) {
						margin-right: 5upx;
					}
				}
			}

			.select {
				font-size: 24upx !important;
				color: #949494 !important;

				._h6 {
					margin-left: 50upx;
				}
			}
			.textarea {
				display:block;
				height: 100upx;
				width: 100%;
				padding: 10upx 15upx;
				// margin-bottom: 30upx;
				font-size: 25upx;
				box-sizing: border-box;
				background-color:#f6f7f9;
			}
			.btn2 {
				display: flex;
				align-items: center;
				height: 160upx;
				button {
					width:100%;
					border: 0;
					background-color: #ff6699;
					color: #fff;
				}
			}
		}
        .btn2 {
        	display: flex;
        	align-items: center;
			// position: absolute;
			// bottom: 0;
			// left: 0;
        	height: 140upx;
			padding:0 54upx;
        	button {
        		width:100%;
        		border: 0;
        		background-color: #ff6699;
        		color: #fff;
        	}
        }
		.li_ {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #ededed;
			box-sizing: border-box;
			height: 82upx;

			.select {
				font-size: 24upx;
				color: #9d9ca0;
			}
		}
	}

	.deposit-item {
		.select {
			&.form {
				justify-content: flex-start;

				.input {
					width: 350upx;
					margin-right: 20upx;
				}
			}
		}
	}

	.follow-item {
		.select {
			flex-wrap: wrap;

			text {
				margin-top: 22upx;
			}
		}
	}

	._h1 {
		height: 108upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #333333;
	}

	.centent {
		padding-left: 50upx;
		padding-right: 50upx;
		max-height: 692upx;
		overflow-x: hidden;
		overflow-y: auto;

		._h5 {
			height: 82upx;
			display: flex;
			align-items: center;
			font-size: 28upx;
			color: #333333;

			&.no-name {
				&:after {
					content: '';
				}
			}

			&:after {
				content: '*';
				color: #ff0066;
			}
		}

		.select-user {
			height: 60upx;
			border: solid 1upx #e4e4e4;
			box-sizing: border-box;
			font-size: 24upx;
			color: #515151;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			image {
				width: 30upx;
				height: 100%;
				margin-right: 20upx;
				margin-left: 100px;
			}
		}

		.input {
			width: 100%;
			height: 60upx;
			border: solid 1upx #e4e4e4;
			box-sizing: border-box;
			padding-left: 20upx;
			padding-right: 20upx;
			font-size: 24upx;
		}

		.add-project {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100upx;
			border: dashed 1upx #d7d7d7;
			font-size: 26upx;
			color: #515151;

			.icon {
				height: 100%;
				width: 40upx;
				margin-right: 10upx;
			}
		}

		.select {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;
			color: #333333;

			&.project {
				background: #f6f7f9;
				padding-left: 20upx;
				padding-right: 20upx;
				position: relative;
				border-top: 2upx solid #e4e4e4;

				&:first-child {
					border-top: none;
				}

				._h6 {
					font-size: 24upx;
				}

				.del {
					width: 34upx;
					height: 100%;
					position: absolute;
					right: -18upx;
					top: -18upx;
				}

				.info {
					display: flex;
					align-items: center;
					flex-direction: column;
					margin-top: 15upx;
					margin-bottom: 15upx;

					text {
						background: #FFFFFF;
						margin-top: 20upx;
					}

					.money {
						display: flex;
						align-items: center;
						width: 280upx;
						font-size: 22upx;
						color: #949494;

						input {
							width: 100upx;
							height: 60upx;
							font-size: 26upx;
							text-align: center;
							background: #FFFFFF;
							margin-left: 10upx;
							margin-right: 10upx;
							padding-right: 20upx;
						}
					}
				}
			}

			&.date {
				text {
					background: transparent;
					border: solid 1upx #e4e4e4;
					box-sizing: border-box;
					width: 220upx;
				}
			}

			text {
				width: 188upx;
				height: 60upx;
				box-sizing: border-box;
				background: #f6f7f9;
				border-radius: 5upx;
				font-size: 24upx;
				color: #515151;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;

				&.on {
					border: solid 1upx #ff0066;
					color: #ff0066;
				}
			}
		}
	}

	.btn {
		margin-top: 45upx;
		height: 100upx;
		border-top: solid 1upx #e4e4e4;
		box-sizing: border-box;
		display: flex;
		position: relative;

		text {
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 1;
			font-size: 28upx;
			color: #007aff;
			cursor: pointer;

			&:first-child {
				color: #aeaeae;
			}

			&.nth-child(2) {
				&:after {
					content: '';
					width: 1upx;
					height: 52upx;
					position: absolute;
					left: 50%;
					top: 50%;
					margin-left: -.5upx;
					margin-top: -26upx;
					background: #e4e4e4;
				}
			}

			&:nth-child(3) {
				&:after {
					content: '';
					width: 1upx;
					height: 52upx;
					position: absolute;
					left: 480upx;
					top: 50%;
					margin-left: -.5upx;
					margin-top: -26upx;
					background: #e4e4e4;
				}
			}

			&:nth-child(4) {
				&:after {
					content: '';
					width: 1upx;
					height: 52upx;
					position: absolute;
					left: 160upx;
					top: 50%;
					margin-left: -.5upx;
					margin-top: -26upx;
					background: #e4e4e4;
				}
			}
		}
	}

	.popup-item {
		width: 640upx;
		border-radius: 15upx;
		background: #FFFFFF;
		position: relative;
		overflow: hidden;
	}

	.reserve-item {
		.switch {
			display: flex;
			align-items: center;
			font-size: 24upx;
			color: #949494;

			._h4 {
				height: 82upx;
				display: flex;
				align-items: center;
				font-size: 28upx;
				color: #333333;
			}

			.async-switch {
				margin-left: 18upx;
				margin-right: 10upx;
			}
		}
	}

	.handselBalance-item {
		.select {
			justify-content: flex-start;

			.nums {
				width: 354upx;
				margin-right: 15upx;
			}
		}
	}

	.visit-item {

		.tabs {
			width: 260upx;
			height: 60upx;
			display: flex;
			margin-left: auto;
			margin-right: auto;
			border-radius: 15upx;
			border: solid 1upx #e4e4e4;
			box-sizing: border-box;
			overflow: hidden;

			text {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24upx;
				color: #333333;

				&.on {
					background: #ff0066;
					color: #FFFFFF;
				}
			}
		}
	}

	.xuan-item {

		// position:relative;
		.tabs {
			width: 260upx;
			height: 60upx;
			display: flex;
			margin-left: auto;
			margin-right: auto;
			border-radius: 15upx;
			border: solid 1upx #e4e4e4;
			box-sizing: border-box;
			overflow: hidden;

			text {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24upx;
				color: #333333;

				&.on {
					background: #ff0066;
					color: #FFFFFF;
				}
			}
		}

		.ul {
			display: flex;
			flex-direction: column;
			margin-top: 25upx;
			align-items: center;
			max-height: 480upx;
			overflow-x: hidden;
			overflow-y: auto;
			padding: 0;
			// justify-content: center;
			box-sizing: border-box;

			.pic {
				width: 450upx;
				height: 490upx;
				display: flex;
				justify-content: center;
				align-items: center;

				img {
					width: 100%;
				}
			}

			.li_ {
				width: 520upx;
				height: 220upx;
				position: relative;
				margin-bottom: 10upx;
				color: #fff;

				img {
					width: 100%;
				}

				.circle {
					position: absolute;
					bottom: 30upx;
					left: 450upx;
					width: 50upx;
					height: 50upx;
					border-radius: 50%;

					img {
						width: 100%;
					}
				}

				.name {
					position: absolute;
					top: 27upx;
					left: 30upx;
					font-size: 38upx;

					text:first-child {
						font-size: 22upx;
					}

					text:last-child {
						font-size: 38upx;
						margin-left: 260upx;
					}
				}

				.money {
					position: absolute;
					top: 34%;
					left: 30upx;
					margin-top: 3upx;
					font-size: 36upx;

					span:first-child {
						font-size: 26upx;
						margin-right: 8upx;
					}
				}

				.time {
					position: absolute;
					top: 53%;
					left: 30upx;
					// margin-top: 1upx;
					font-size: 18upx;
				}
			}
		}

		.btn1 {
			margin-top: 0;
		}
	}
	.btn3 {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 120upx;
		margin-top: 30upx;
		border-top: 1px solid #f1f1f1;
		button:first-child{
			width: 250upx;
			background-color: #f9fafc;
			border: 0;
		}
		button:last-child{
			background-color: #ff6699;
			color: #fff;
			width: 250upx;
			border: 0;
		}
	}
</style>

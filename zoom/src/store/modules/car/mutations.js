import copyState from './state.js';
import compCheck from '../../../assets/js/util/comp-check';
import insuranceTypes from './insuranceTypes.json'

const mutations = {
    // 更新投保地区
    updateCityCode(state, data) {
        state.carInsureEntry.cityCode = data.code
        state.carInsureEntry.cityName = data.name
    },
    // 更新车牌号
    updateLicenseNo(state, value) {
        state.carInsureEntry.licenseNo = value
    },
    // 更新车牌号简称
    updateLicenseName(state, value) {
        state.carInsureEntry.licenseName = value
    },
    // 更新手机号
    updateMobile(state, value) {
        state.carInsureEntry.carOwnerMobile = value
    },
    // 更新一年内是否过户车
    updateTransferFlag(state, value) {
        state.carInsureEntry.transferFlag = value
    },
    // 更新是否新车
    updateIsLicenseNo(state, value) {
        state.carInsureEntry.isLicenseNo = value
    },
    // 更新过户日期
    updataTransferDate(state, value) {
        state.carInsureEntry.transferDate = value
    },
    // 更新订单号
    updataOrderNo(state, value) {
        state.orderNo = value
    },
    // 设置车架号
    updateFrameNo(state, value) {
        state.vehicleDTO.frameNo = value;
    },
    // 设置发动机号
    updateEngineNo(state, value) {
        state.vehicleDTO.engineNo = value;
    },
    // 设置车型信息
    updataCarTypeDTO(state, value) {
        value.clausesContent = compCheck.substrFirstBehind(value.codeName)
        state.carTypeDTO = value;
        if (value.fuelType) {
            for (let i = 0; i < state.fuelCategory.data.length; i++) {
                if(state.fuelCategory.data[i].value == value.fuelType){
                    state.fuelCategory.value = state.fuelCategory.data[i]
                }
            }
            // sessionStorage.setItem("fuelType",state.fuelCategory.value.value)
            state.fuelType = state.fuelCategory.value.value
        }
        state.commercialInsuranceStartDate = ""
        state.compulsoryInsuranceStartDate = ""
    },
    // 设置注册日期
    updataDatetime(state, value) {
        state.vehicleDTO.purchaseDate = value;
    },
    // 设置发证日期
    updataEnrollDate(state, value) {
        state.vehicleDTO.enrollDate = value;
    },
    // 设置购车发票日期
    updataBusinessDate(state, value) {
        state.vehicleDTO.businessDate = value;
    },
    // 设置座位数
    updataSeatCount(state, value) {
        state.carTypeDTO.seatCount = value;
    },
    compulsoryInsuranceStartDate(state, value) {
        state.compulsoryInsuranceStartDate = value;
    },
    commercialInsuranceStartDate(state, value) {
        state.commercialInsuranceStartDate = value;
    },
    updataCarPriceTime(state, value) {
        state.carPriceTime = value;
    },
    updataCarPriceRequest(state, value) {
        state.carPriceRequest = value;
    },
    // 姓名
    updateCarOwner(state, value) {
        state.carOwnerDTO.carOwner = value;
    },
    // 身份证号码
    updateCarOwnerIdNo(state, value) {
        state.carOwnerDTO.carOwnerIdNo = value;
    },
    // 详细地址
    updateAddress(state, value) {
        state.carOwnerDTO.address = value;
    },
    // 交强险/商业险选择
    togglePrptenagesDTOList(state, data) {
        if (data.name == 'checked') {
            if (data.type == 'b') {
                state.biPrptenagesDTOList[data.index].checked = state.biPrptenagesDTOList[data.index].checked ? false : true;
            } else {
                state.ciPrptenagesDTOList[data.index].checked = state.ciPrptenagesDTOList[data.index].checked ? false : true;
            }
        } else {
            if (data.type == 'b') {
                state.biPrptenagesDTOList[data.index].checkbox = state.biPrptenagesDTOList[data.index].checkbox ? false : true;
            } else {
                state.ciPrptenagesDTOList[data.index].checkbox = state.ciPrptenagesDTOList[data.index].checkbox ? false : true;
            }
        }
    },
    // 设置 交强险 ciPrptenagesDTOList   商业险 biPrptenagesDTOList
    updataPrptenagesDTOList(state, data) {
        state.biPrptenagesDTOList = data.biPrptenagesDTOList;
        state.ciPrptenagesDTOList = data.ciPrptenagesDTOList;
    },
    // 更新险种
    updataRiskPlan(state, value) {
        state.insuranceTypes = value;
    },
    //新增的试算接口
    shisuan(state,value){
        state.shisuanValue=value
    },
    // 更新试算报文
    updataTrialParams(state, value) {
        state.trialParams = value;
    },
    // 更新试算
    updataTryCalculation(state, value) {
        state.tryCalculation = value;
    },
    // 更新投保人
    updataApplyInfoDTO(state, data) {
        state.applyInfoDTO[data.type] = data.value;
        // 同车主信息
        if (data.type == 'checkedOwner' && data.value) {
            state.applyInfoDTO.name = state.carOwnerDTO.carOwner
            state.applyInfoDTO.idNo = state.carOwnerDTO.carOwnerIdNo
            state.applyInfoDTO.detailed_address = state.carOwnerDTO.address
            if (state.carOwnerDTO.carOwnerNature.value.value == '0') {
                state.applyInfoDTO.insuredNature.value = state.applyInfoDTO.insuredNature.data[0]
            }else{
                state.applyInfoDTO.insuredNature.value = state.applyInfoDTO.insuredNature.data[1]
            }
        }
    },
    // 更新被保人
    updataInsureInfoDTO(state, data) {
        state.insureInfoDTO[data.type] = data.value;
        // 同车主信息
        if (data.type == 'checkedOwner' && data.value) {
            state.insureInfoDTO.name = state.carOwnerDTO.carOwner
            state.insureInfoDTO.idNo = state.carOwnerDTO.carOwnerIdNo
            state.insureInfoDTO.detailed_address = state.carOwnerDTO.address
            state.insureInfoDTO.checkedApplyInfo = false
            if (state.carOwnerDTO.carOwnerNature.value.value == '0') {
                state.insureInfoDTO.insuredNature.value = state.applyInfoDTO.insuredNature.data[0]
            }else{
                state.insureInfoDTO.insuredNature.value = state.applyInfoDTO.insuredNature.data[1]
            }
        }
        // 同投保险人
        if (data.type == 'checkedApplyInfo' && data.value) {
            state.insureInfoDTO.name = state.applyInfoDTO.name
            state.insureInfoDTO.idNo = state.applyInfoDTO.idNo
            state.insureInfoDTO.mobile = state.applyInfoDTO.mobile
            state.insureInfoDTO.province = state.applyInfoDTO.province // 省
            state.insureInfoDTO.city = state.applyInfoDTO.city // 市
            state.insureInfoDTO.county = state.applyInfoDTO.county // 区
            state.insureInfoDTO.address = state.applyInfoDTO.address
            state.insureInfoDTO.detailed_address = state.applyInfoDTO.detailed_address
            state.insureInfoDTO.checkedOwner = false
            state.insureInfoDTO.insuredNature.value = state.applyInfoDTO.insuredNature.value 
            state.insureInfoDTO.insuredLinkmanIdnum = state.applyInfoDTO.appliLinkmanIdnum
            state.insureInfoDTO.insuredLinkerName = state.applyInfoDTO.appliLinkerName
            state.insureInfoDTO.phoneHolderName = state.applyInfoDTO.phoneHolderName
            state.insureInfoDTO.phoneHolderIdentifyNumber = state.applyInfoDTO.phoneHolderIdentifyNumber
        }
    },
    // 更新身份证有效期
    updataIdNoDate(state, data) {
        for(let params of data){
            if(params.name.length == 2){
                state[params.name[0]][params.name[1]] = params.value
                //state.insureInfoDTO[params.name[0]] = params.value;
            }
        }
        
    },
    // 更新保单号
    updataSubProposalNo(state, value) {
        state.subProposalNo = value;
    },
    // 初始化车险
    resetState(state) {
        state = Object.assign(state, copyState())
    },

    updataVehicleInsurance(state, params) {
        if (params.active) {
            state.VehicleInsurance[params.active] = params.value
        } else {
            state.VehicleInsurance[params.name] = params.value
        }
    },
    updataCarPrice(state, value) {
        state.carPrice = value
    },
    // 决策单元
    updataDecisionUnit(state, params) {
        state.decisionUnit = params
    },
    // 保存决策单元
    updataDecisionUnitItem(state, params) {
        state.carInsureEntry.codeCode = params.codeCode // 决策单元编码
        state.carInsureEntry.codeName = params.codeName // 决策单元名称
        state.carInsureEntry.unitmainTenanceType1 = params.unitmainTenanceType1 // 决策单元大类
        state.carInsureEntry.unitmainTenanceType2 = params.unitmainTenanceType2  // 决策单元小类
        state.carInsureEntry.unitmainTenanceType1Name = params.unitmainTenanceType1Name // 决策单元大类名称
        state.carInsureEntry.unitmainTenanceType2Name = params.unitmainTenanceType2Name // 决策单元小类名称
    },
    // 更新业务来源
    updataBusinessNature(state, params) {
        state.carInsureEntry.businessNature = params
    },
    //更新影像资料
    updPhonotape(state, params) {
        state.phonotape.businessNo = params.businessNo
        if (params.fileGroup == 'YC') {
            state.phonotape.vehicle.push({ 'url': params.url })
        } else {
            state.phonotape.papers.push({ 'url': params.url })
        }
    },
    // 获取代理协议号列表
    updataAgreementList(state, params) {
        state.agreementList = params
    },
    // 更新代理协议号
    updataAgreement(state, params) {
        state.carInsureEntry.agreement = params
    },
    // 验证码
    updataVerificationCode(state, params) {
        for (let item of params) {
            state.VerificationCode[item.name] = item.value
        }
    },
    // 验证试算
    updataVerifyTrial(state, params) {
        state.verifyTrial[params.name] = params.value
    },
    // 更新车险
    updateCarState(state, list) {
        for(let params of list){
            if(params.name.length == 1){
                state[params.name[0]] = params.value
            }else if(params.name.length == 2){
                state[params.name[0]][params.name[1]] = params.value
            }else if(params.name.length == 3){
                state[params.name[0]][params.name[1]][params.name[2]] = params.value
            }else if(params.name.length == 4){
                state[params.name[0]][params.name[1]][params.name[2]][params.name[3]] = params.value
            }
        }
    },
    // 清除费率系数折扣调整
    cleanDiscountData(state){
        state.discountData = copyState().discountData
    },

    updateChargingPostDataList(state,data){
        if (data.onDelete) { // 删除
            state.chargingPostDataList.splice(data.key, 1);
            return
        }
        if (data.key) {
            state.chargingPostDataList[data.key] = data.chargingPostData;
        } else {
            state.chargingPostDataList = state.chargingPostDataList.concat(data.chargingPostData)
        }
    },
    // 业务信息
    updataSysAgentExpandDTO(state,params){
        state.sysAgentExpandDTO.agreementNo = params.agreementNo,
        state.sysAgentExpandDTO.businessType = params.businessType,
        state.sysAgentExpandDTO.codeCode = params.codeCode,
        state.sysAgentExpandDTO.codeName = params.codeName,
        state.sysAgentExpandDTO.proxyCode = params.proxyCode,
        state.sysAgentExpandDTO.proxyName = params.proxyName,
        state.sysAgentExpandDTO.unitmainTenanceTypeOne = params.unitmainTenanceTypeOne,
        state.sysAgentExpandDTO.unitmainTenanceTypeOneName = params.unitmainTenanceTypeOneName,
        state.sysAgentExpandDTO.unitmainTenanceTypeTwo = params.unitmainTenanceTypeTwo,
        state.sysAgentExpandDTO.unitmainTenanceTypeTwoName = params.unitmainTenanceTypeTwoName
    },

    updataInsuranceTypes(state){
        let insuranceType = JSON.papers(JSON.stringify(insuranceTypes))
        let fuelType = sessionStorage.getItem('fuelType')
        if(fuelType == 1 || 2 || 3){
            state.insuranceTypes = insuranceType.NEWCAR
        } else if(fuelType == 0 || 4 || 9){
            state.insuranceTypes = insuranceType.CAR
        }
    }

}

export default mutations
(function () {
    angular.module("app").controller("LoanSettlementCtrl", LoanSettlementController);
    LoanSettlementController.$inject = ["$scope", "$http", "$window", "GetDialogBox", "PagingFac", "ApiAsyncGetFactory", "ApiAsyncPostFactory", "AppAsyncGetFactory", "AppAsyncPostFactory"];
    function LoanSettlementController($scope, $http, $window, GetDialogBox, PagingFac, ApiAsyncGetFactory, ApiAsyncPostFactory, AppAsyncGetFactory, AppAsyncPostFactory) {
        $scope.DiscountChargeModel = [];
        $scope.WaiveOffChargeModel = [];
        $scope.TotalDueModel = [];
        $scope.InstallmentFromModel = 0;
        $scope.InstallmentToModel = 0;
        $scope.TotalInstallmentModel = 0;
        $scope.DueEMIBorrowerList = [];
        $scope.DueEMIList = [];
        $scope.LoginIDModel = "";
        $scope.DateModel = "";
        $scope.FilterDueEMIDetailShow = true;
        $('#Due_Date').datepicker({
            format: 'dd/mm/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        }).datepicker("setDate", new Date());
        $scope.FilterDueDateModel = $("#DueDate").val();
        $('#_Date').datepicker({
            format: 'dd/mm/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        }).datepicker("setDate", new Date());
        $scope.DateModel = $("#Date").val();
        $('#Payment_Date').datepicker({
            format: 'dd/mm/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        }).datepicker("setDate", new Date());
        $scope.PaymentDateModel = $("#PaymentDate").val();
        $scope.TPCount = 0;
        $scope.BindLoanOfficer = function () {
            ApiAsyncGetFactory.async("DropDownData/GetMarketingExecutive").then(function (data) {
                if (data.Status) {
                    $scope.RecoveryExecutiveList = data.Data;
                    $scope.CollectionExecutiveList = data.Data;
                }
            });
        }
        $scope.BindLoanOfficer();
        $scope.BindLoanPaymentMode = function () {
            ApiAsyncGetFactory.async("Common/GetRecoveryPaymentModeList").then(function (data) {
                if (data.Status) {
                    $scope.LoanPaymentModeList = data.Data;
                }
            });
        }
        $scope.BindLoanPaymentMode();
        $scope.SearchDueEMIBorrowerReport = function () {
            if ($scope.FilterEMIRecoveryForm.$valid) {
                $("#BtnSearch").button("loading");
                $scope.PagingFunc(1, 50);
            }
            else {
                $scope.invalid = true;
            }
        }
        $scope.TPCount = 0;
        $scope.PagingFunc = function (Page, PageRange) {
            $scope.ItemPerPage = PageRange == "" ? 50 : PageRange
            $scope.DueEMIBorrowerList = null;
            var PostData = {
                Page: Page,
                PageSize: $scope.SelectedPageSizeModel,
                CaseNo: $scope.FilterCaseNoModel,
                Name: $scope.FilterNameModel,
                LoginID: $scope.FilterLoginIDModel,
                DueDate: $scope.FilterDueDateModel,
                EMITypeID: $scope.EMITypeIDModel,
                RecoveryTypeID: $scope.RecoveryTypeIDModel
            }
            ApiAsyncPostFactory.async("Transaction/GetEmiRecoveryData", PostData).then(function (data) {
                if (data.Status) {
                    $scope.TPCount = data.Data.PageCount;
                    $scope.DueEMIBorrowerList = data.Data.ReportData;
                    $scope.AllPagesCount = PagingFac.CompletePaging(Page, PageRange, $scope.TPCount);
                }
                else {
                    $scope.TPCount = 0;
                    $scope.DueEMIBorrowerList = [];
                    $scope.AllPagesCount = 0;
                }
                $("#BtnSearch").button("reset");
            });
        }
        $scope.ScopePaging = 1;
        $scope.ShowPaging = function (Page) {
            $scope.ScopePaging = Page;
            $scope.PagingFunc(Page, 100)
        }
        $scope.ShowPreviousPaging = function (Page) {
            $scope.ScopePaging = Page - 1;
            $scope.PagingFunc($scope.ScopePaging, 100);
        }
        $scope.ShowNextPaging = function (Page) {
            $scope.ScopePaging = Page + 1;
            $scope.PagingFunc($scope.ScopePaging, 100);
        }
        $scope.ShowNextTab = function (LoginID, event) {
            $scope.FilterDueEMIDetailShow = false;
            $scope.LoginIDModel = LoginID;
            $scope.DateModel = $scope.DueEMIBorrowerList.find(x=>x.LoanAcNo == LoginID).DueDateStr;
            $scope.BindPenaltySlab();
            $scope.IsPenaltySlabValidate = true;
            $scope.TotalPenalityModel = 0;
            $scope.AdjustPenalityModel = 0;
            $scope.RestPenalityFromAdjustmentModel = 0;
            $scope.TotalPaidAmountModel = 0;
            $scope.CheckPenaltySlabValidation();
        }
        $scope.ShowBackTab = function () {
            $scope.FilterDueEMIDetailShow = true;
            $scope.LoginIDModel = "";
            $scope.DateModel = "";
            $scope.PenaltySlabList = [];;
            $scope.PageSize = ($scope.SelectedPageSizeModel == undefined) ? 50 : $scope.SelectedPageSizeModel;
            $scope.PagingFunc($scope.ScopePaging, $scope.PageSize);
            $scope.DueEMIList = [];
            $scope.ClearData();
        }
        $scope.$watch('PaymentDateModel', function () {
            //var DueDate = moment($scope.DateModel, 'DD/MM/YYYY HH:mm').format("MM/DD/YYYY HH:mm");
            //var PaymentDate = moment($scope.PaymentDateModel, 'DD/MM/YYYY HH:mm').format("MM/DD/YYYY HH:mm");
            //if (DueDate >= PaymentDate)
            //    $scope.IsPenaltySlabValidate = false;
            //else
            //    $scope.IsPenaltySlabValidate = true;
            $scope.CheckPenaltySlabValidation();
        });
        $scope.CheckPenaltySlabValidation = function () {
            var DueDate = moment($scope.DateModel, 'DD/MM/YYYY HH:mm').format("MM/DD/YYYY HH:mm");
            var PaymentDate = moment($scope.PaymentDateModel, 'DD/MM/YYYY HH:mm').format("MM/DD/YYYY HH:mm");

            if (Date.parse(DueDate) >= Date.parse(PaymentDate))
                $scope.IsPenaltySlabValidate = false;
            else
                $scope.IsPenaltySlabValidate = true;
        }
        $scope.SearchDueEMIReport = function () {
            if ($scope.FilterDueEMIForm.$valid) {
                $("#BtnSearch").button("loading");
                $scope.invalid = false;
                $scope.TotalPaybalModel = 0;
                $scope.TotalPaidAmountModel = 0;
                $scope.GetDueEMIList();
            }
            else {
                $scope.invalid = true;
            }
        }
        $scope.GetDueEMIList = function () {
            $scope.DueEMIList = null;
            var PostData = {
                LoginId: $scope.LoginIDModel,
                CaseNo: $scope.FilterCaseNoModel,
                ChequeNumber: $scope.ChequeNumberModel,
                CalculationDateStr: $scope.PaymentDateModel,
                DueDate: $scope.DateModel,
                PaymentModeId: $scope.DrpDwnPaymentModeModel,
                SlabId: $scope.PenaltySlabModel
            }
            ApiAsyncPostFactory.async("Transaction/CalculatePenaltyCharge", PostData).then(function (data) {
                if (data.Status) {
                    $scope.LoanAcNoModel = $scope.LoginIDModel;
                    $scope.DueEMIList = angular.copy(data.Data);
                    $(event.currentTarget).button("reset");
                }
                else {
                    $scope.DueEMIList = [];
                }
                $("#BtnSearch").button("reset");
            });
        }
        $scope.IsPaymetModeRepresent = false;
        $scope.CheckAllDueEMI = function () {
            $scope.TotalPaidAmountModel = 0;
            $scope.TotalPenalityModel = 0;
            $scope.AdjustPenalityModel = 0;
            $scope.RestPenalityFromAdjustmentModel = 0;
            angular.forEach($scope.DueEMIList, function (item, key) {
                item.IsEMISelected = $scope.selectedAllDueEMI;
                if (item.IsEMISelected) {
                    $scope.TotalPaidAmountModel += parseFloat(item.ChargeOnAmount);
                    angular.forEach(item.LoanPenalityList, function (item1) {
                        $scope.TotalPenalityModel += parseFloat(item1.Charge);
                        $scope.AdjustPenalityModel += parseFloat(item1.Charge);
                        $scope.RestPenalityFromAdjustmentModel += parseFloat(item1.Charge);
                        $scope.TotalPaidAmountModel += parseFloat(item1.AdjustCharge);
                    });
                }
            });
        }
        $scope.TotalPaidAmountModel = 0;
        $scope.CheckIndividualEMI = function (index) {
            $scope.TotalPenalityModel = 0;
            $scope.AdjustPenalityModel = 0;
            $scope.RestPenalityFromAdjustmentModel = 0;
            angular.forEach($scope.DueEMIList, function (item, key) {
                if (item.IsEMISelected && key == index) {
                    $scope.TotalPaidAmountModel += parseFloat(item.ChargeOnAmount);
                    angular.forEach(item.LoanPenalityList, function (item1) {
                        $scope.TotalPenalityModel += parseFloat(item1.Charge);
                        $scope.AdjustPenalityModel += parseFloat(item1.Charge);
                        $scope.RestPenalityFromAdjustmentModel += parseFloat(item1.Charge);
                        $scope.TotalPaidAmountModel += parseFloat(item1.AdjustCharge);
                    });
                }
                else if (!item.IsEMISelected && key == index) {
                    $scope.TotalPaidAmountModel -= parseFloat(item.ChargeOnAmount);
                    angular.forEach(item.LoanPenalityList, function (item1) {
                        $scope.TotalPenalityModel -= parseFloat(item1.Charge);
                        $scope.AdjustPenalityModel -= parseFloat(item1.Charge);
                        $scope.RestPenalityFromAdjustmentModel -= parseFloat(item1.Charge);
                        $scope.TotalPaidAmountModel -= parseFloat(item1.AdjustCharge);
                    });
                }
            });
        }
        $scope.RestPenalityFromAdjustmentModel = 0;
        $scope.SelectEMI = function (index) {
            $("#EMIDetailModel").modal({ show: true, backdrop: 'static', keyboard: false });
            $scope.IndexModel = index;
            $scope.TotalPenalityModel = 0;
            $scope.AdjustPenalityModel = 0;
            $scope.RestPenalityFromAdjustmentModel = 0;
            $scope.SumOfAdjustPenalityModel = 0;
            $scope.LoanAcPenalityList = $scope.DueEMIList[index].LoanPenalityList;
            angular.forEach($scope.DueEMIList, function (item, key) {
                debugger
                if (key == index) {
                    angular.forEach(item.LoanPenalityList, function (item1) {
                        $scope.TotalPenalityModel += parseFloat(item1.Charge);
                        $scope.AdjustPenalityModel += parseFloat(item1.Charge);
                        $scope.SumOfAdjustPenalityModel += parseFloat(item1.AdjustCharge);
                    });
                }
            });
            if ($scope.SumOfAdjustPenalityModel > 0) {
                $scope.AdjustPenalityModel = 0;
                $scope.AdjustPenalityModel += $scope.SumOfAdjustPenalityModel;
                $scope.RestPenalityFromAdjustmentModel += $scope.SumOfAdjustPenalityModel;
            }
            $scope.TotalPaidAmountModel -= $scope.SumOfAdjustPenalityModel;

            angular.forEach($scope.LoanAcPenalityList, function (item, key) {
                $scope.DiscountChargeModel[key] = 0;
                $scope.WaiveOffChargeModel[key] = 0;
                $scope.TotalDueModel[key] = 0;
            });
            $scope.totalInstallment();
        }

        $scope.totalInstallment = function (count) {
            if (count == 1) {
                $scope.InstallmentFromModel = $scope.DueEMIList[0].InstallmentNumber;
                $scope.InstallmentToModel = $scope.DueEMIList[length].InstallmentNumber;
                $scope.TotalInstallmentModel = 1;
            } else {
                $scope.InstallmentFromModel = $scope.DueEMIList[0].InstallmentNumber;
                $scope.InstallmentToModel = $scope.DueEMIList[length].InstallmentNumber;
                $scope.TotalInstallmentModel = $scope.DueEMIList.length;
            }
        }

        $scope.AdjustPenalityModify = function () {
            angular.forEach($scope.DueEMIList, function (item, key) {
                if (key == $scope.IndexModel) {
                    angular.forEach(item.LoanPenalityList, function (item1) {
                        item1.AdjustCharge = 0;
                    });
                }
            });
            $scope.RestPenalityFromAdjustmentModel = 0;
        }
        $scope.CalculateRestPenalityFromAdjustment = function () {
            $scope.RestPenalityFromAdjustmentModel = 0;
            angular.forEach($scope.DueEMIList, function (item, key) {
                if (key == $scope.IndexModel) {
                    angular.forEach(item.LoanPenalityList, function (item1) {
                        if (item1.AdjustCharge != '') {
                            $scope.RestPenalityFromAdjustmentModel += parseFloat(item1.AdjustCharge);
                        }
                    });
                }
            });
        }
        $scope.discountCharge = function (index, discount, charge) {            
            if (discount > 0) {
                $scope.DiscountChargeModel[index] = discount;
            }
            else {
                $scope.DiscountChargeModel[index] = 0;
            }
            $scope.totalDue(index, charge);
        }
        $scope.waiveOffCharge = function (index, waiveOff, charge) {
            if (waiveOff > 0) {
                $scope.WaiveOffChargeModel[index] = waiveOff;
            }
            else {
                $scope.WaiveOffChargeModel[index] = 0;
            }
            $scope.totalDue(index, charge);
        }
        $scope.totalDue = function (index, charge) {
            var val1 = parseInt($scope.DiscountChargeModel[index]);
            var val2 = parseInt($scope.WaiveOffChargeModel[index]);
            var result = val1 + val2;
            if (result < charge) {
                $scope.TotalDueModel[index] = charge - result;
            }
            else {
                $scope.TotalDueModel[index] = charge;
                $scope.DiscountChargeModel[index] = 0;
                $scope.WaiveOffChargeModel[index] = 0;
            }

        }

        $scope.CloseEMIDetailModel = function () {
            $scope.SumOfAdjustPenalityModel = 0;
            angular.forEach($scope.DueEMIList, function (item, key) {
                if (key == $scope.IndexModel) {
                    angular.forEach(item.LoanPenalityList, function (item1) {
                        $scope.SumOfAdjustPenalityModel += parseFloat(item1.AdjustCharge);
                    });
                }
            });
            if ($scope.TotalPenalityModel >= $scope.AdjustPenalityModel) {
                if ($scope.AdjustPenalityModel == $scope.SumOfAdjustPenalityModel) {
                    $scope.TotalPaidAmountModel += $scope.SumOfAdjustPenalityModel;

                    angular.forEach($scope.LoanAcPenalityList, function (item, key) {
                        if (item.LoanChargeCode == "CB") {
                            $scope.DueEMIList[$scope.IndexModel].ChequeBounceDue = item.Charge;
                            $scope.DueEMIList[$scope.IndexModel].ChequeBouncePaid = item.AdjustCharge;
                        }
                        else if (item.LoanChargeCode == "PC") {
                            $scope.DueEMIList[$scope.IndexModel].PenaltyChargeDue = item.Charge;
                            $scope.DueEMIList[$scope.IndexModel].PenaltyChargePaid = item.AdjustCharge;
                        }
                        else if (item.LoanChargeCode == "LC") {
                            $scope.DueEMIList[$scope.IndexModel].LegalChargeDue = item.Charge;
                            $scope.DueEMIList[$scope.IndexModel].LegalChargePaid = item.AdjustCharge;
                        }
                        else if (item.LoanChargeCode == "OC") {
                            $scope.DueEMIList[$scope.IndexModel].OverDueChargeDue = item.Charge;
                            $scope.DueEMIList[$scope.IndexModel].OverDueChargePaid = item.AdjustCharge;
                        }
                        else if (item.LoanChargeCode == "PI") {
                            $scope.DueEMIList[$scope.IndexModel].PenaltyInterestDue = item.Charge;
                            $scope.DueEMIList[$scope.IndexModel].PenaltyInterestPaid = item.AdjustCharge;
                        }
                        else if (item.LoanChargeCode == "RB") {
                            $scope.DueEMIList[$scope.IndexModel].RecurrentBouncingChargeDue = item.Charge;
                            $scope.DueEMIList[$scope.IndexModel].RecurrentBouncingChargePaid = item.AdjustCharge;
                        }
                        else if (item.LoanChargeCode == "RC") {
                            $scope.DueEMIList[$scope.IndexModel].RecoveryChargeDue = item.Charge;
                            $scope.DueEMIList[$scope.IndexModel].RecoveryChargePaid = item.AdjustCharge;
                        }
                        else if (item.LoanChargeCode == "CL") {
                            $scope.DueEMIList[$scope.IndexModel].CollectionChargeDue = item.Charge;
                            $scope.DueEMIList[$scope.IndexModel].CollectionChargePaid = item.AdjustCharge;
                        }
                        else {
                            $scope.DueEMIList[$scope.IndexModel].OtherChargeDue += parseFloat(item.Charge);
                            $scope.DueEMIList[$scope.IndexModel].OtherChargePaid += parseFloat(item.AdjustCharge);
                        }
                    })

                    $("#EMIDetailModel").modal("hide");
                }
                else {
                    GetDialogBox.getOkDialogBox("Sum of Adjust Charge Should be equal to Adjust Penality!!!");
                }
            }
            else {
                GetDialogBox.getOkDialogBox("Adjust Penality Should be less than or equal to Total Penality!!!");
            }
        }
        $scope.BindPaymentModule = function () {
            if ($scope.FilterDueEMIForm.$valid) {
                $scope.ShowAccountPanal($scope.DrpDwnPaymentModeModel);
                $scope.PaymentAccountList;
                $scope.MyParitialCashView = false;
                $scope.MyParitialChequeView = false;
                $scope.MyParitialCashView = ($scope.DrpDwnPaymentModeModel == 1 ? true : false);
                $scope.MyParitialChequeView = ($scope.DrpDwnPaymentModeModel >= 2 ? true : false);
                if ($scope.DrpDwnPaymentModeModel > 1) {
                    if ($scope.DrpDwnPaymentModeModel == 2 || $scope.DrpDwnPaymentModeModel == 12) {
                        $('.MyLableChequeNo').text('Cheque No');
                        $('#ChequeNo').attr('placeholder', 'Cheque No');
                        $('.MyLableChequeDate').text('Cheque Date');
                        $('#ChequeDate').attr('placeholder', 'Cheque Date');
                        $('.MyspanChequeNo').text('Enter Cheque No.!!!');
                        $('.MyspanChequeDate').text('Enter Cheque Date!!!');
                    }
                    if ($scope.DrpDwnPaymentModeModel == 3) {
                        $('.MyLableChequeNo').text('Demand-Draft No');
                        $('#ChequeNo').attr('placeholder', 'Demand-Draft No');
                        $('.MyLableChequeDate').text('Demand-Draft Date');
                        $('#ChequeDate').attr('placeholder', 'Demand-Draft Date');
                        $('.MyspanChequeNo').text('Enter Demand-Draft No.!!!');
                        $('.MyspanChequeDate').text('Enter Demand-Draft Date!!!');
                    }
                    if ($scope.DrpDwnPaymentModeModel == 4) {
                        $('.MyLableChequeNo').text('NEFT Ref');
                        $('#ChequeNo').attr('placeholder', 'NEFT Ref');
                        $('.MyLableChequeDate').text('NEFT Date');
                        $('#ChequeDate').attr('placeholder', 'NEFT Date');
                        $('.MyspanChequeNo').text('Enter NEFT Ref.!!!');
                        $('.MyspanChequeDate').text('Enter NEFT Date!!!');
                    }
                    if ($scope.DrpDwnPaymentModeModel == 5) {
                        $('.MyLableChequeNo').text('IMPS Ref');
                        $('#ChequeNo').attr('placeholder', 'IMPS Ref');
                        $('.MyLableChequeDate').text('IMPS Date');
                        $('#ChequeDate').attr('placeholder', 'IMPS Date');
                        $('.MyspanChequeNo').text('Enter IMPS Ref.!!!');
                        $('.MyspanChequeDate').text('Enter IMPS Date!!!');
                    }
                    if ($scope.DrpDwnPaymentModeModel == 6) {
                        $('.MyLableChequeNo').text('RTGS Ref');
                        $('#ChequeNo').attr('placeholder', 'RTGS Ref');
                        $('.MyLableChequeDate').text('RTGS Date');
                        $('#ChequeDate').attr('placeholder', 'RTGS Date');
                        $('.MyspanChequeNo').text('Enter RTGS Ref.!!!');
                        $('.MyspanChequeDate').text('Enter RTGS Date!!!');
                    }
                }
                else {
                    $('.MyLableChequeNo').text('Cheque No');
                    $('#ChequeNo').attr('placeholder', 'Cheque No');
                    $('.MyLableChequeDate').text('Cheque Date');
                    $('#ChequeDate').attr('placeholder', 'Cheque Date');
                    $('.MyspanChequeNo').text('Enter Cheque No.!!!');
                    $('.MyspanChequeDate').text('Enter Cheque Date!!!');
                }
                if ($scope.DrpDwnPaymentModeModel != 12) {
                    $scope.invalid = false;
                    $scope.IsPaymetModeRepresent = $scope.DrpDwnPaymentModeModel == 12;
                }
                else {
                    $scope.invalid = true;
                }
            }
            else {
                $scope.invalid = true;
            }
        }
        //Penalty Slab

        $scope.BindPenaltySlab = function () {
            if ($scope.LoginIDModel != undefined && $scope.LoginIDModel != "" && $scope.DateModel != undefined && $scope.DateModel != "") {
                var PostData = "?LoginId=" + $scope.LoginIDModel + "&CalDateStr=" + $scope.DateModel;
                ApiAsyncPostFactory.async("Master/GetPenaltySlabByLoginId" + PostData, null).then(function (data) {
                    if (data.Status) {
                        $scope.PenaltySlabList = angular.copy(data.Data);
                    }
                });
            }
        }
        //$scope.BindPenaltySlab();       

        //------------------------------------------- Start Partial Start -------------
        $scope.GetPaymentMode = function () {
            ApiAsyncGetFactory.async("Common/GetBounceRecoveryPaymentModeList").then(function (data) {
                if (data.Status) {
                    $scope.PaymentModeList = angular.copy(data.Data);
                }
            });
        }
        $scope.GetPaymentMode();
        $scope.ShowAccountPanal = function (PaymentModeId) {
            if (PaymentModeId != undefined) {
                var PostData = "?_PaymentModeId=" + PaymentModeId + "&BranchCode=";
                ApiAsyncPostFactory.async("Common/GetPaymentAccountList" + PostData).then(function (data) {
                    if (data.Status) {
                        $scope.PaymentAccountList = angular.copy(data.Data);
                    }
                });
            }
        }
        $scope.GetBankList = function () {
            ApiAsyncGetFactory.async("Master/GetBankList").then(function (data) {
                if (data.Status) {
                    $scope.BankList = angular.copy(data.Data);
                }
            });
        }
        $scope.GetBankList();
        $scope.GetBankBranch = function () {
            $scope.BranchNameModel = $("#DrpDwnBankName option:selected").attr("Branch");
        }
        $scope.getcashamount = function () {
            if ($scope.AccountHeadCashModel != "" && $scope.AccountHeadCashModel != undefined) {
                if ($scope.AccountHeadCashModel == "238")
                    var PostData = "?LoginID=" + $scope.LoginIDModel;
                else
                    var PostData = "?cashinhandaccount=" + $scope.AccountHeadCashModel;
                ApiAsyncPostFactory.async("Common/getcashamount" + PostData).then(function (data) {
                    if (data.Status) {
                        $scope.cashamt = data.Data;
                    }
                });
            }
        }
        //------------------------------------------- End Start Partial Start -------------
        $scope.IsReceiptNoModel = true;
        $scope.CollectEMI = function () {
            if ($scope.DrpDwnPaymentModeModel != '' && $scope.DrpDwnPaymentModeModel != undefined && $scope.DrpDwnPaymentModeModel != null) {
                if ($scope.PayMentModeForm.$valid) {
                    $scope.invalid = false;
                    $("#BtnCollectEMI").button("loading");
                    $scope.DueEMIDataList = [];
                    var IsValid = false;
                    $.each($scope.DueEMIList, function (key, value) {
                        if (value.IsEMISelected) {
                            IsValid = true;
                            $scope.DueEMIDataList.push(value);
                        }
                    });
                    if (IsValid) {
                        var PostData = {
                            LoanAcNo: $scope.LoanAcNoModel,
                            TotalPaidAmount: $scope.TotalPaidAmountModel,
                            //EMIPayDetail: {
                            //    EMILoanChargeList: $scope.DueEMIList,
                            //},
                            //-----------------------
                            //LoanPenalityList: {
                            //    LoanPenalityList: $scope.DueEMIList
                            //},                            
                            LoanPenalityList: $scope.DueEMIDataList,
                            TotalPenality: $scope.TotalPenalityModel,
                            AdjustPenality: $scope.AdjustPenalityModel,
                            //-----------------------
                            DueDate: $scope.DateModel,
                            RecoveryExecutive: $scope.RecoveryExecutiveModel,
                            CollectionExecutive: $scope.CollectionExecutiveModel,
                            PaymentDate: moment($scope.PaymentDateModel, 'DD/MM/YYYY HH:mm').format("MM/DD/YYYY HH:mm"),
                            PaymentMode: $scope.DrpDwnPaymentModeModel,
                            AccountCashHeadId: $scope.AccountHeadCashModel,
                            ReceiptNo: $scope.ReceiptNoModel,
                            AccountChqHeadId: $scope.AccountHeadChequeModel,
                            BankId: $scope.BankNameModel,
                            BranchName: $scope.BranchNameModel,
                            ChequeNo: $scope.ChequeNoModel,
                            ChequeDate: $scope.ChequeDateModel == '' ? undefined : moment($scope.ChequeDateModel, 'DD/MM/YYYY HH:mm').format("MM/DD/YYYY HH:mm"),
                            Remark: $scope.RemarkModel,
                            SlabId: $scope.PenaltySlabModel
                        }
                        ApiAsyncPostFactory.async("Transaction/CollectLoanEMI", PostData).then(function (data) {
                            GetDialogBox.getOkDialogBox(data.Message);
                            if (data.Status) {
                                $scope.GetDueEMIList();
                                $scope.ClearData();
                                $scope.PayMentModeForm.$setPristine();
                            }
                            $("#BtnCollectEMI").button("reset");
                        });
                    }
                    else {
                        GetDialogBox.getOkDialogBox("Select atleast one EMI");
                        $("#BtnCollectEMI").button("reset");
                    }
                }
                else {
                    $scope.invalid = true;
                }
            }
            else {
                GetDialogBox.getOkDialogBox('Select Payment Mode!!!');
            }
        }
        $scope.ClearData = function () {
            $scope.TotalPaidAmountModel = "";
            $scope.ChkChargeOnAmountModel = false;
            $scope.ChkOverDueChargesModel = false;
            $scope.ChkPenalityChargeModel = false;
            $scope.ChkPenalityInterestModel = false;
            $scope.ChkLegalChargeModel = false;
            $scope.ChkBounceChargeModel = false;

            //$scope.ChargeOnAmountModel = $scope.DueEmiDetail.ChargeOnAmount;
            //$scope.OverDueChargesModel = $scope.DueEmiDetail.OverDueChargeDue;
            //$scope.PenalityChargeModel = $scope.DueEmiDetail.PenaltyChargeDue;
            //$scope.PenalityInterestModel = $scope.DueEmiDetail.PenaltyInterestDue;
            //$scope.LegalChargeModel = $scope.DueEmiDetail.LegalChargeDue;

            $scope.DrpDwnPaymentModeModel = "";
            $scope.AccountHeadCashModel = "";
            $scope.ReceiptNoModel = "";
            $scope.AccountHeadChequeModel = "";
            $scope.BranchNameModel = "";
            $scope.ChequeNoModel = "";
            $scope.ChequeDateModel = "";
            $scope.PaymentDateModel
            $scope.RemarkModel = "";

            $scope.MyParitialCashView = false;
            $scope.MyParitialChequeView = false;
        }
    }
}());
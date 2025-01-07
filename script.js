function calculate() {
    const subscribeDate = new Date(document.getElementById('subscribeDate').value);
    const subscribeNetValue = parseFloat(document.getElementById('subscribeNetValue').value);
    const redeemDate = new Date(document.getElementById('redeemDate').value);
    const redeemNetValue = parseFloat(document.getElementById('redeemNetValue').value);
    const holdingShares = parseFloat(document.getElementById('holdingShares').value);
    const performanceBenchmark = parseFloat(document.getElementById('performanceBenchmark').value);

    // 计算持有天数
    const holdingDays = (redeemDate - subscribeDate) / (1000 * 60 * 60 * 24);

    // 计算持有期间收益率
    const holdingReturn = (redeemNetValue - subscribeNetValue) / subscribeNetValue * 365 / holdingDays;

    // 计算客户到手收益率
    const clientReturn = holdingReturn > performanceBenchmark 
        ? performanceBenchmark + (holdingReturn - performanceBenchmark) * 0.5 
        : performanceBenchmark;

    // 计算净值
    const calculatedNetValue = subscribeNetValue * (1 + clientReturn / 365 * holdingDays);
	const calculatedNetValueRounded = parseFloat(calculatedNetValue.toFixed(7));

    // 计算赎回到账金额
    const redeemAmount = holdingShares * calculatedNetValue;

    // 显示结果
    document.getElementById('holdingReturn').textContent = (holdingReturn * 100).toFixed(2);
    document.getElementById('clientReturn').textContent = (clientReturn * 100).toFixed(2);
    document.getElementById('calculatedNetValue').textContent = calculatedNetValue.toFixed(2);
    document.getElementById('redeemAmount').textContent = redeemAmount.toFixed(2);
}

function calculateReturns() {
    const subscribeDate = new Date(document.getElementById('subscribeDate').value);
    const subscribeNetValue = parseFloat(document.getElementById('subscribeNetValue').value);
    const redeemDate = new Date(document.getElementById('redeemDate').value);
    const redeemNetValue = parseFloat(document.getElementById('redeemNetValue').value);
    const holdingShares = parseFloat(document.getElementById('holdingShares').value);
    const performanceBenchmark = parseFloat(document.getElementById('performanceBenchmark').value);
    const clientExcessShare = parseFloat(document.getElementById('clientExcessShare').value);

    const daysDifference = (redeemDate - subscribeDate) / (1000 * 60 * 60 * 24);

    // 持有期间收益率
    const holdingReturn = ((redeemNetValue - subscribeNetValue) / subscribeNetValue) * (365 / daysDifference);
    document.getElementById('holdingReturn').textContent = holdingReturn.toFixed(5) * 100+ '%';

    // 客户到手收益率
    const clientReturn = holdingReturn > performanceBenchmark 
        ? performanceBenchmark + (holdingReturn - performanceBenchmark) * clientExcessShare 
        : performanceBenchmark;
    document.getElementById('clientReturn').textContent = clientReturn.toFixed(5) + '%';

    // 计算净值
    const calculatedNetValue = subscribeNetValue * (1 + clientReturn / 100 / 365 * daysDifference);
    document.getElementById('calculatedNetValue').textContent = calculatedNetValue.toFixed(7);

    // 赎回到账
    const redeemAmount = holdingShares * calculatedNetValue;
    document.getElementById('redeemAmount').textContent = redeemAmount.toFixed(2);

    // 赎回费
    const redeemFee = (holdingShares * redeemNetValue) - redeemAmount;
    document.getElementById('redeemFee').textContent = redeemFee.toFixed(2);
}

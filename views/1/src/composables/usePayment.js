import { storeToRefs } from "pinia";
import { computed, toValue } from "vue";

import { getFixedNumber } from "../heplers/numbers.js";
import { usePaymentStore } from "../modules/payment.js";
import { useCurrentRate } from "./useCurrentRate.js";

export const usePayment = () => {
    const paymentStore = usePaymentStore()

    const { payment, isLoading } = storeToRefs(paymentStore)
    const paymentData = toValue(payment);

    paymentData.fullAmount = getFixedNumber(paymentData.fullAmount)
    paymentData.fullAmountInUsdt = getFixedNumber(paymentData.fullAmountInUsdt)
    paymentData.fullAmountInCurrency = getFixedNumber(paymentData.fullAmountInCurrency)
    paymentData.receivedAmount = getFixedNumber(paymentData.receivedAmount)

    const currentRate = computed(() => getFixedNumber(useCurrentRate(paymentData?.currencyFrom, paymentData?.currencyTo)))
    const usdAmount = computed(() => getFixedNumber((useCurrentRate(paymentData?.currencyFrom) * parseFloat(paymentData?.fullAmount || 1))))
    const coinToFullQuantity = getFixedNumber(currentRate.value *  parseFloat(paymentData?.fullAmount || 1))
    const coinToReceivedQuantity = getFixedNumber(currentRate.value *  parseFloat(paymentData?.receivedAmount || 0))

    return {
        ...paymentData,
        isLoading: toValue(isLoading),
        usdAmount,
        coinToFullQuantity,
        fullAmountCalculated: `${paymentData?.fullAmount} ${paymentData?.currencyFrom} (${coinToFullQuantity} ${paymentData?.currencyTo})`,
        receivedAmountCalculated: `${paymentData?.receivedAmount || 0} ${paymentData?.currencyFrom} (${coinToReceivedQuantity} ${paymentData?.currencyTo})`
    }
}

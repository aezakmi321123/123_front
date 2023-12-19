import { storeToRefs } from "pinia";
import { computed, toValue } from "vue";

import { usePaymentStore } from "../modules/payment.js";
import { useCurrentRate } from "./useCurrentRate.js";

export const usePayment = () => {
    const paymentStore = usePaymentStore()

    const { payment, isLoading } = storeToRefs(paymentStore)
    const paymentData = toValue(payment);
    const currentRate = computed(() => useCurrentRate(paymentData?.currencyFrom, paymentData?.currencyTo))
    const usdAmount = computed(() => (useCurrentRate(paymentData?.currencyFrom) * parseFloat(paymentData?.fullAmount || 1).toFixed(4)))
    const coinToFullQuantity = (currentRate.value *  parseFloat(paymentData?.fullAmount || 1)).toFixed(4)
    const coinToReceivedQuantity = (currentRate.value *  parseFloat(paymentData?.receivedAmount || 0)).toFixed(4)

    return {
        ...paymentData,
        isLoading: toValue(isLoading),
        usdAmount,
        coinToFullQuantity,
        fullAmountCalculated: `${paymentData?.fullAmount} ${paymentData?.currencyFrom} (${coinToFullQuantity} ${paymentData?.currencyTo})`,
        receivedAmountCalculated: `${paymentData?.receivedAmount || 0} ${paymentData?.currencyFrom} (${coinToReceivedQuantity} ${paymentData?.currencyTo})`
    }
}

import { toValue } from "vue";

import { useWalletStore } from "../modules/wallet.js";

export const useCurrentRate = (coinFrom, coinTo = 'USDT') => {
    const walletStore = useWalletStore()
    const wsData = walletStore.wsData.coins
    const rateSend = wsData[toValue(coinFrom)]
    const rateReceive = wsData[toValue(coinTo)]

    return parseFloat(rateSend?.c || 1) / parseFloat(rateReceive?.c || 1)
}

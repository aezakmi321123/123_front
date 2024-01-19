import { i18n } from '../main.js';
import { cMessage } from './message.js';
export const handleAxiosError = (e, custom = '') => {
  if (custom) {
    return cMessage('error', i18n.t(`errors.${custom}`));
  }
  if (Array.isArray(e?.response?.data?.message)) {
    return cMessage(
      'error',
      e?.response?.data?.message?.join('\n') || i18n.t('apiErrors.common'),
    );
  }

  cMessage('error', e?.response?.data?.message || i18n.t('apiErrors.common'));
};

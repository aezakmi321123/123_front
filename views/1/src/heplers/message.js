import { notification } from 'ant-design-vue';
notification.config({
  placement: 'topRight',
  duration: 3,
  class: 'custom_notify',
});
export const cMessage = (type, text) => {
  notification[type]({
    message: type,
    description: text,
  });
};

export const rules = {
  phoneNumber: [
    {
      required: true,
      message: "电话号码是必须的",
      trigger: "blur",
    },
    {
      pattern: /^[1][3,5,7,8][0-9]\\d{8}$/,
      message: "手机号码不正确",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码是必须的",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "密码必须是3位以上字母或者数字",
      trigger: "blur",
    },
  ],
};

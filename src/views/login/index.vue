<template>
  <div id="login">
    <div class="login-warp">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toogleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="login-form"
      >
        <el-form-item prop="email" class="item-form">
          <label>邮箱</label>
          <el-input
            type="email"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="passwords"
          class="item-form"
          v-if="model === 'register'"
        >
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="11">
              <el-input v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="13">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="item-form">
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  stripscript,
  validateE,
  validateP,
  validateC
} from "@/utils/validate.js";
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (validateE(value)) {
        callback(new Error("邮箱格式有误"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validateP(value)) {
        callback("密码为6-20位数字+字母");
      }
      {
        callback();
      }
    };
    var validatePasswords = (rule, value, callback) => {
      if (this.model === "login") callback();
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;
      if (!value) {
        callback(new Error("验证码不能为空"));
      } else if (validateC) {
        callback(new Error("验证码格式有误"));
      }
    };
    return {
      model: "login",
      ruleForm: {
        email: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      },
      menuTab: [
        {
          txt: "登录",
          current: true,
          type: "login"
        },
        {
          txt: "注册",
          current: false,
          type: "register"
        }
      ]
    };
  },
  methods: {
    toogleMenu(data) {
      // 先把本来的都改成false
      this.menuTab.forEach(item => {
        item.current = false;
      });
      // 再把选中的改成true 高光
      data.current = true;
      this.model = data.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-warp {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    color: #fff;
    font-size: 14px;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 19px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  item-form {
    margin-bottom: 13px;
  }
  .block {
    font-size: 14px;
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>

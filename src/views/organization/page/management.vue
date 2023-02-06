<template>
  <div class="orgUser">
    <div class="btn d-flex">
      <b-button variant="primary" @click="handle_add">添加</b-button>
    </div>
    <div class="table">
      <b-table tbody-tr-class="tableTr" :fields="userFields" :items="userItem">
        <template #cell(type)="data">
          <span>{{ data.item.type == 0 ? "普通管理员" : "超级管理员" }}</span>
        </template>
        <template #cell(action)="data">
          <div class="d-flex">
            <feather-icon
              icon="EditIcon"
              size="16"
              class="mr-50"
              style="cursor: pointer"
              :id="`edit_${data.index}`"
              @click.stop="handle_edit(data.index)"
            />
            <b-tooltip
              :target="`edit_${data.index}`"
              title="编辑信息"
              placement="left"
            />
            <!-- <feather-icon
              size="16"
              icon="KeyIcon"
              class="mr-50"
              style="cursor: pointer"
              :id="`pwd_${data.index}`"
              @click="handle_pwd(data.item)"
            />
            <b-tooltip
              :target="`pwd_${data.index}`"
              title="修改密码"
              placement="left"
            /> -->
            <feather-icon
              icon="Trash2Icon"
              size="16"
              style="cursor: pointer"
              :id="`Trash2_${data.index}`"
            />
            <b-tooltip
              :target="`Trash2_${data.index}`"
              title="删除信息"
              placement="left"
            />
          </div>
        </template>
      </b-table>
    </div>
    <div class="modal">
      <b-modal
        v-model="formMsg"
        no-close-on-backdrop
        size="lg"
        hide-footer
        centered
      >
        <div class="message">
          <ValidationObserver ref="manForm" #default="{ invalid }">
            <b-form @submit.prevent="handle_submit" autocomplete="false">
              <b-row>
                <b-col cols="7">
                  <b-form-group
                    label="手机号码："
                    label-for="phone"
                    label-cols-md="auto"
                  >
                    <ValidationProvider
                      rules="required|phone"
                      name="phone"
                      #default="{ errors }"
                    >
                      <b-form-input
                        class="w-55"
                        :state="errors.length > 0 ? false : null"
                        v-model="man.phone_number"
                        maxlength="11"
                        placeholder="请输入手机号码"
                        @input="searchPhone"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col cols="7">
                  <b-form-group
                    label="姓名："
                    label-for="name"
                    label-cols-md="auto"
                  >
                    <ValidationProvider
                      rules="required"
                      name="name"
                      #default="{ errors }"
                    >
                      <b-form-input
                        :state="errors.length > 0 ? false : null"
                        v-model="man.name"
                        class="w-55"
                        maxlength="10"
                        placeholder="请输入姓名"
                      />
                      <small class="text-danger">{{ errors[0] }} </small>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col cols="7">
                  <b-form-group
                    label="帐号："
                    label-for="account"
                    label-cols-md="auto"
                  >
                    <ValidationProvider
                      rules="required"
                      name="account"
                      #default="{ errors }"
                    >
                      <b-form-input
                        class="w-55"
                        placeholder="请输入帐号"
                        v-model="man.account"
                        :state="errors.length > 0 ? false : null"
                        maxlength="255"
                      />
                      <small class="text-danger">{{ errors[0] }} </small>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col cols="7" v-show="showPwd">
                  <b-form-group
                    label="管理员密码："
                    label-for="password"
                    label-cols-md="auto"
                  >
                    <ValidationProvider
                      :rules="showPwd == 1 ? 'required|password' : null"
                      name="password"
                      #default="{ errors }"
                    >
                      <b-input-group class="w-55">
                        <b-form-input
                          maxlength="255"
                          :state="errors.length > 0 ? false : null"
                          autocomplete="new-password"
                          :type="passwordFieldType"
                          v-model="man.password"
                          placeholder="请设置密码"
                        />
                        <b-input-group-append is-text>
                          <feather-icon
                            :icon="passwordToggleIcon"
                            class="cursor-pointer"
                            @click="togglePasswordVisibility"
                          />
                        </b-input-group-append>
                      </b-input-group>
                      <small class="text-danger"> {{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col cols="7" v-if="newPwd">
                  <b-form-group
                    label="确认密码："
                    label-for="password"
                    label-cols-md="auto"
                  >
                    <ValidationProvider
                      rules="required|password"
                      name="password"
                      #default="{ errors }"
                    >
                      <b-input-group class="w-55">
                        <b-form-input
                          maxlength="255"
                          :state="errors.length > 0 ? false : null"
                          autocomplete="new-password"
                          :type="passwordFieldType"
                          v-model="newPassword"
                          placeholder="请在次输入密码"
                        />
                        <b-input-group-append is-text>
                          <feather-icon
                            :icon="passwordToggleIcon"
                            class="cursor-pointer"
                            @click="togglePasswordVisibility"
                          />
                        </b-input-group-append>
                      </b-input-group>
                      <small class="text-danger"> {{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col cols="7">
                  <b-form-group
                    label="邮箱："
                    label-for="mail"
                    label-cols-md="auto"
                  >
                    <ValidationProvider
                      rules="required|email"
                      name="email"
                      #default="{ errors }"
                    >
                      <b-form-input
                        class="w-55"
                        v-model="man.mail"
                        placeholder="请输入邮箱"
                        :state="errors.length > 0 ? false : null"
                      />
                      <small class="text-danger"> {{ errors[0] }} </small>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col cols="7">
                  <b-form-group
                    label="人员类型："
                    label-for="status"
                    label-cols-md="auto"
                  >
                    <v-select
                      class="w-55"
                      :options="typeOptions"
                      :reduce="(label) => label.key"
                      :searchable="false"
                      :clearable="false"
                      v-model="man.type"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="7">
                  <b-form-group
                    label="备注："
                    label-for="note"
                    label-cols-md="auto"
                  >
                    <b-form-input
                      class="w-55"
                      v-model="man.note"
                      placeholder="请输入备注"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <hr />
              <div class="btn d-flex justify-content-end">
                <b-button
                  variant="primary"
                  class="mr-1"
                  :disabled="invalid"
                  type="submit"
                  >提交</b-button
                >
                <b-button variant="outline-primary" @click="handle_cancel"
                  >取消</b-button
                >
              </div>
            </b-form>
          </ValidationObserver>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { userInput } from "../component/index";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required, phone, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import { typeOptions } from "../js/options";
import { getUserInfo } from "../js/api";
export default {
  name: "orgUser",
  components: {
    ValidationObserver,
    ValidationProvider,
    userInput,
    togglePasswordVisibility,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      newPwd: 0,
      formMsg: false,
      required,
      phone,
      email,
      typeOptions,
      newPassword: "",
      vStatus: null, //通过vStatus判断添加/修改操作
      showPwd: 1, //通过v-if判断是否显示密码输入框
      index: null,
      userFields: [
        { key: "phone_number", label: "手机号码" },
        { key: "name", label: "姓名" },
        { key: "account", label: "账号" },
        { key: "mail", label: "邮箱" },
        { key: "type", label: "账号类型" },
        { key: "note", label: "备注" },
        { key: "action", label: "操作" },
      ],
      userItem: [],
      man: {
        phone_number: "",
        name: "",
        account: "",
        mail: "",
        password: "",
        type: 0,
        note: "",
      },
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  methods: {
    handle_edit(index) {
      console.log(index, "index");
      this.handle_add();
      this.index = index;
      this.vStatus = "edit";
      this.newPwd = 1;
      const item = JSON.parse(JSON.stringify({ ...this.userItem[index] }));
      this.man = item;
      console.log(item, "item");
    },
    // 取消操作
    handle_cancel() {
      this.formMsg = false;
    },
    searchPhone() {
      // 如果手机号码长度为11调用查询手机号码接口
      if (this.man.phone_number.length == 11) {
        this.userInfo();
      }
    },
    //查询手机号内部信息
    async userInfo() {
      const { data, status } = await getUserInfo({
        phoneNum: this.man.phone_number,
      });
      if (status == 200) {
        this.showPwd = 0;
        this.man = data;
      } else if (status == 204) {
        // 如果状态码204,则数据库中没有当前手机号,密码输入框显示
        this.showPwd = 1;
      }
    },
    //添加按钮
    handle_add() {
      this.formMsg = true;
      this.vStatus = "add";
      this.showPwd = 1;
      this.newPwd = 0;
      this.man = {
        phone_number: "",
        name: "",
        account: "",
        password: "",
        mail: "",
        type: 0,
        note: "",
      };
    },
    // 在此进行添加、修改操作
    changeAdd() {
      const [item, adminInfo] = [
        JSON.parse(JSON.stringify({ ...this.man })),
        JSON.parse(JSON.stringify(this.userItem)),
      ];
      if (this.vStatus == "add") {
        let i = adminInfo.findIndex((k) => {
          return k.phone_number == item.phone_number;
        });
        if (i != -1) {
          this.userItem.splice(i, 1, item);
        } else {
          this.userItem.push(item);
        }
        this.handle_cancel();
      } else if (this.vStatus == "edit") {
        if (this.man.password != this.password) {
          this.alertMsg();
        }
      }
      //   return;
    },
    alertMsg() {
      Swal.fire({
        icon: "error",
        text: "两次密码不一致",
      });
    },
    // 提交信息
    handle_submit() {
      this.$refs.manForm.validate().then((success) => {
        if (success) this.changeAdd();
      });
    },
  },
};
</script>

<style>
.tableTr td {
  max-width: 10rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
<style lang="scss">
.message {
  .form-group {
    width: 700px;
    .col-form-label {
      width: 100px;
    }
    .w-55 {
      width: 550px;
    }
  }
}
</style>
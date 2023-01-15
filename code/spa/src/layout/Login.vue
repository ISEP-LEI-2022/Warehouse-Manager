<template>
  <Toast />
  <div
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div class="col-12 mt-5 xl:mt-0 text-center">
        <img
          :src="logoUrl"
          alt="logo"
          class="mb-5"
          style="width: 80px; height: 80px"
        />
      </div>
      <div
        class="col-12 xl:col-6"
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color),
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="h-full w-full m-0 py-7 px-4"
          style="
            border-radius: 53px;
            background: linear-gradient(
              180deg,
              var(--surface-50) 38.9%,
              var(--surface-0)
            );
          "
        >
          <div class="text-center mb-5">
            <img
              src="layout/images/avatar.png"
              alt="Image"
              height="50"
              class="mb-3"
            />
            <div class="text-900 text-3xl font-medium mb-3">Welcome!</div>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <div class="field p-fluid">
              <label
                for="email1"
                class="block text-900 text-xl font-medium mb-2"
                >Email</label
              >
              <InputText
                id="email1"
                v-model="email"
                type="text"
                :class="user_class"
                placeholder="Email"
                style="padding: 1rem"
              />
            </div>
            <div style="margin-bottom: 100px;" class="field p-fluid">
              <label
                for="password1"
                class="block text-900 font-medium text-xl mb-2"
                >Password</label
              >
              <Password
                id="password1"
                v-model="password"
                placeholder="Password"
                :toggleMask="true"
                :class="pass_class"
                inputClass="w-full"
                inputStyle="padding:1rem"
              ></Password>
            </div>
            <Button
              label="Sign In"
              @click="Login"
              class="w-full p-3 text-xl"
            ></Button>
            <div class="login-choice"><span>or Sign In with</span></div>
            <Button
              @click="GoogleLogin"
              type="button"
              class="w-full p-3 text-xl google"
            >
              <span
                class="flex align-items-center px-2 bg-purple-700 text-white"
              >
                <i className="pi pi-google"></i>
              </span>
              <span className="px-3 py-2 flex align-items-center text-white"
                >Google</span
              >
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../auth/firebase";
import { userStore } from "@/stores/user";
import { GoogleAuthProvider } from "firebase/auth";
import { useToast } from "primevue/usetoast";
import { useLayout } from "@/layout/composables/layout";

const email = ref("");
const password = ref("");
const user_class = ref("p-valid");
const pass_class = ref("p-valid");
const error = ref(null);
const router = useRouter();
const store = userStore();
const toast = useToast();

const { contextPath } = useLayout();

const logoUrl = computed(() => {
  return `${contextPath}layout/images/logo.png`;
});

const Login = async () => {
  try {
    user_class.value = "p-valid";
    pass_class.value = "p-valid";

    const response = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      if (response) {
        store.update(response.user);
        router.push("/dashboard");
      } else {
        throw new Error("login failed");
      }
  } catch (error) {

    switch (error.code) {
      case "auth/invalid-email":
        user_class.value = "p-invalid";
        break;
      case "auth/internal-error":
      case "auth/wrong-password":
        pass_class.value = "p-invalid";
        break;
    }
    toast.add({
      severity: "error",
      summary: error.name,
      detail: error.message,
      life: 3000,
    });
  }
};
const GoogleLogin = () => {
  signInWithPopup(auth, provider)
    .then((response) => {
      store.update(response.user);
      router.push("/dashboard");
    })
    .catch((error) => {
      toast.add({
      severity: "error",
      summary: error.name,
      detail: error.message,
      life: 3000,
    });
    });
};
const callback = (response) => {
  store.update(response);
  router.push("/dashboard");
};
</script>

<style lang="scss" scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

.login-choice span {
  color: #5b6987;
  display: -ms-grid;
  display: grid;
  font-size: 16px;
  width: 100%;
  line-height: 40px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  -ms-grid-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
  grid-template-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
  grid-gap: 19px;
}
.login-choice span:after,
.login-choice span:before {
  content: "";
  border-top: 1px solid #e5e8ed;
}
.google {
  background: linear-gradient(
    to left,
    var(--purple-600) 50%,
    var(--purple-700) 50%
  );
  background-size: 200% 100%;
  background-position: right bottom;
  transition: background-position 0.5s ease-out;
  border-color: var(--purple-700);
  display: flex;
  align-items: stretch;
  padding: 0;
  &:enabled:hover {
    background: linear-gradient(
      to left,
      var(--purple-600) 50%,
      var(--purple-700) 50%
    );
    background-size: 200% 100%;
    background-position: left bottom;
    border-color: var(--purple-700);
  }
  &:focus {
    box-shadow: 0 0 0 1px var(--purple-400);
  }
}
</style>

import { ref } from "vue";

const userId = ref();
const roleId = ref();

const username = ref();
const email = ref();

const token = localStorage.getItem("x-access-token");

userId.value = localStorage.getItem("userId");
roleId.value = localStorage.getItem("roleId");

export { token, userId, roleId, username, email };

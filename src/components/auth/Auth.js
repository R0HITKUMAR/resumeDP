function showPassword(v, name = "password") {
  const password = document.getElementsByName(name)[v];
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

export { showPassword };
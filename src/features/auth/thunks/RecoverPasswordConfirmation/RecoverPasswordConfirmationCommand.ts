export interface RecoverPasswordConfirmationCommand {
  email: string,
  code: string,
  new_password: string,
  re_new_password: string,
}

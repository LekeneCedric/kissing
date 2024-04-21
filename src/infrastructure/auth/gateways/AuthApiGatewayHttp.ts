import { HttpProvider } from '../../../shared/gateways/HttpProvider';
import { AuthApiGateway } from '../../../domain/Auth/AuthApiGateway';
import { signUpCommand } from '../../../features/auth/thunks/signUp/SignUpCommand';
import { SignUpResponse } from '../../../features/auth/thunks/signUp/SignUpResponse';
import { AuthApiRoutes, API_BASEURL } from '../../../ui/routes/ApiRoutes';
import { SignUpResponseFactoryFromApi } from '../factories/SignUpResponseFactoryFromApi';
import { signInCommand } from '../../../features/auth/thunks/signIn/SignInCommand';
import { SignInResponse } from '../../../features/auth/thunks/signIn/SignInResponse';
import { SignInResponseFactoryFromApi } from '../factories/SignInResponseFactoryFromApi';
import { SendCodeVerificationCommand } from '../../../features/auth/thunks/activateAccount/sendCodeVerification/SendCodeVerificationCommand';
import { SendCodeVerificationResponse } from '../../../features/auth/thunks/activateAccount/sendCodeVerification/SendCodeVerificationResponse';
import { SendCodeVerificationResponseFactoryFromApi } from '../factories/SendCodeVerificationResponseFactoryFromApi';
import { ActivateAccountCommand } from '../../../features/auth/thunks/activateAccount/activateAccount/ActivateAccountCommand';
import { ActivateAccountResponse } from '../../../features/auth/thunks/activateAccount/activateAccount/ActivateAccountResponse';
import { ActivateAccountResponseFactoryFromApi } from '../factories/ActivateAccountResponseFactoryFromApi';
import {
  RecoverPasswordSendEmailCommand
} from "../../../features/auth/thunks/RecoverPasswordSendEmail/RecoverPasswordSendEmailCommand.ts";
import {
  RecoverPasswordSendEmailResponse
} from "../../../features/auth/thunks/RecoverPasswordSendEmail/RecoverPasswordSendEmailResponse.ts";
import {
  RecoverPasswordConfirmationCommand
} from "../../../features/auth/thunks/RecoverPasswordConfirmation/RecoverPasswordConfirmationCommand.ts";
import {
  RecoverPasswordConfirmationResponse
} from "../../../features/auth/thunks/RecoverPasswordConfirmation/RecoverPasswordConfirmationResponse.ts";

export class AuthApiGatewayHttp extends HttpProvider implements AuthApiGateway {
  async signUp(signUpCommand: signUpCommand): Promise<SignUpResponse> {
    const { username, email, phone_number, password, re_password } =
      signUpCommand;
    let result: any;

    try {
      const response = await this.post(AuthApiRoutes.signUp, {
        username,
        email,
        phone_number,
        password,
        re_password,
      });
      //console.log(`status : ${response.status}`);

      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
    } catch (error) {
      console.log('err-sign', error);
      throw new Error(JSON.stringify(error.response.data));
    }

    return SignUpResponseFactoryFromApi(result);
  }

  async signIn(signInCommand: signInCommand): Promise<SignInResponse> {
    const { email, password } = signInCommand;
    let result: any;

    try {
      const response = await this.post(AuthApiRoutes.signIn, {
        email,
        password,
      });

      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
    } catch (error) {
      throw new Error(error.response.data.detail);
    }

    return SignInResponseFactoryFromApi(result);
  }

  async sendCodeVerification(
    sendCodeVerificationCommand: SendCodeVerificationCommand,
  ): Promise<SendCodeVerificationResponse> {
    const { email } = sendCodeVerificationCommand;
    let result: any;

    try {

      const formdata = new FormData();
      formdata.append('email', email);

      const response = await this.post(AuthApiRoutes.sendCodeVerification, formdata);

      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
    } catch (error) {
      throw new Error(error.response.data.detail);
    }

    return SendCodeVerificationResponseFactoryFromApi(result);
  }

  async activateAccount(
    activateAccountCommand: ActivateAccountCommand,
  ): Promise<ActivateAccountResponse> {
    const { email, code } = activateAccountCommand;
    let result: any;

    try {
      const formdata = new FormData();
      formdata.append('email', activateAccountCommand.email);
      formdata.append('code', activateAccountCommand.code);
      console.log(`
        email: ${email},
        colde: ${code}
      `)

      const response = await this.post(AuthApiRoutes.activateAccount, formdata);

      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      //@ts-ignore
      result = response.data;
    } catch (error) {
      throw new Error(error.response.data.detail);
    }

    return ActivateAccountResponseFactoryFromApi(result);
  }

  async recoverPasswordSendEmail(recoverPasswordSendEmailCommand: RecoverPasswordSendEmailCommand): Promise<RecoverPasswordSendEmailResponse> {
    const { email } = recoverPasswordSendEmailCommand;
    let result: any;
    try {
      const response = await this.post(AuthApiRoutes.recoverPasswordSendEmail, {
        email: email
      });
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      //@ts-ignore
      result = response.data;
      //console.log(response);
    } catch (e) {
      //console.log(e);
      throw new Error(e.response.data.detail);
    }
    console.log('code237-recover', result);
    return { email: result.email } as RecoverPasswordSendEmailResponse;
  }

  async recoverPasswordConfirmation(recoverPasswordConfirmationCommand: RecoverPasswordConfirmationCommand): Promise<RecoverPasswordConfirmationResponse> {
    let result: any;
    try {
      const formdata = new FormData();

      formdata.append('email', recoverPasswordConfirmationCommand.email);
      formdata.append('code', recoverPasswordConfirmationCommand.code);
      formdata.append('new_password', recoverPasswordConfirmationCommand.new_password);
      formdata.append('re_new_password', recoverPasswordConfirmationCommand.re_new_password);

      const response = await this.post(AuthApiRoutes.recoverPasswordConfirmation, formdata);
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
      console.log(response);
    } catch (e) {
      throw new Error(e.response.data.detail);
    }

    return {} as RecoverPasswordConfirmationResponse
  }
}

import {signUpCommand} from '../../features/auth/thunks/signUp/SignUpCommand';
import {SignUpResponse} from '../../features/auth/thunks/signUp/SignUpResponse';
import {signInCommand} from '../../features/auth/thunks/signIn/SignInCommand';
import {SignInResponse} from '../../features/auth/thunks/signIn/SignInResponse';
import {SendCodeVerificationCommand} from '../../features/auth/thunks/activateAccount/sendCodeVerification/SendCodeVerificationCommand';
import {SendCodeVerificationResponse} from '../../features/auth/thunks/activateAccount/sendCodeVerification/SendCodeVerificationResponse';
import {ActivateAccountCommand} from '../../features/auth/thunks/activateAccount/activateAccount/ActivateAccountCommand';
import {ActivateAccountResponse} from '../../features/auth/thunks/activateAccount/activateAccount/ActivateAccountResponse';
import {
  RecoverPasswordSendEmailResponse
} from "../../features/auth/thunks/RecoverPasswordSendEmail/RecoverPasswordSendEmailResponse.ts";
import {
  RecoverPasswordSendEmailCommand
} from "../../features/auth/thunks/RecoverPasswordSendEmail/RecoverPasswordSendEmailCommand.ts";
import {
  RecoverPasswordConfirmationCommand
} from "../../features/auth/thunks/RecoverPasswordConfirmation/RecoverPasswordConfirmationCommand.ts";
import {
  RecoverPasswordConfirmationResponse
} from "../../features/auth/thunks/RecoverPasswordConfirmation/RecoverPasswordConfirmationResponse.ts";

export interface AuthApiGateway {
  signUp: (signUpCommand: signUpCommand) => Promise<SignUpResponse>;
  signIn: (signInCommand: signInCommand) => Promise<SignInResponse>;
  sendCodeVerification: (
    sendCodeVerificationCommand: SendCodeVerificationCommand,
  ) => Promise<SendCodeVerificationResponse>;
  activateAccount: (
    activateAccountCommand: ActivateAccountCommand,
  ) => Promise<ActivateAccountResponse>;
  recoverPasswordSendEmail: (
    recoverPasswordSendEmailCommand: RecoverPasswordSendEmailCommand
  ) => Promise<RecoverPasswordSendEmailResponse>;
  recoverPasswordConfirmation: (
    recoverPasswordConfirmationCommand: RecoverPasswordConfirmationCommand
  ) => Promise<RecoverPasswordConfirmationResponse>;
}

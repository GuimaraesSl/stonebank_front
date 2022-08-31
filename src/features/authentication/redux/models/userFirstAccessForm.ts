export class UserFirstAccessForm {
    constructor(
        public currentPassword?: string,
        public newPassword?: string,
        public confirmationNewPassword?: string
    ) { }
}
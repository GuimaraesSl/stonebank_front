export interface UpdatePasswordRequest {
    userId?: number;
    currentPassword?: string;
    newPassword?: string;
    confirmationNewPassword?: string;
}
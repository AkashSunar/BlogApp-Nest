import { totp } from 'otplib';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  generateOtp() {
    totp.options = { digits: 6, step: 300 };
    return totp.generate(process.env.OTP_SECRET);
  }
  verifyOtp(otpToken: string) {
    totp.options = { digits: 6, step: 300 };
    return totp.check(otpToken, process.env.OTP_SECRET);
  }
}

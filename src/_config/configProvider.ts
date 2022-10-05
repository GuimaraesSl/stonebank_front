import { Api } from "./api";
import dotenv from "dotenv";
import { Application, Company } from "./application";

export interface ConfigData {
  api: Api;
  application: Application;
  company: Company;
  tagAmount: number;
}

export class ConfigProvider {
  private static _config: ConfigData | undefined;

  static get config(): ConfigData {
    if (!this._config) this._initialize();

    return this._config as ConfigData;
  }

  private static _initialize() {
    dotenv.config();

    this._config = {
      api: {
        baseUrl: process.env.REACT_APP_API_URL || "",
        defaultHeaders: {
          "x-api-version": Number(process.env.REACT_APP_API_VERSION || 0),
        },
      },
      application: {
        key: process.env.REACT_APP_API_KEY || "",
        aesKey: process.env.REACT_APP_AES_KEY || "",
        aesIV: process.env.REACT_APP_AES_IV || "",
      },
      tagAmount: Number(process.env.REACT_APP_TAG_AMOUNT || 0),
      company: {
        address: process.env.REACT_APP_COMPANY_ADDRESS || "",
        appStoreUrl: process.env.REACT_APP_COMPANY_APPSTORE_URL || "",
        email: process.env.REACT_APP_COMPANY_EMAIL || "",
        helpLink: process.env.REACT_APP_COMPANY_HELP_LINK || "",
        name: process.env.REACT_APP_COMPANY_NAME || "",
        phone: process.env.REACT_APP_COMPANY_PHONE || "",
        playStoreUrl: process.env.REACT_APP_COMPANY_PLAYSTORE_URL || "",
        taxId: process.env.REACT_APP_COMPANY_TAX_ID || "",
        website: process.env.REACT_APP_COMPANY_WEBSITE || "",
        whatsApp: process.env.REACT_APP_COMPANY_WHATSAPP || "",
        youtube: process.env.REACT_APP_COMPANY_YOUTUBE || "",
      },
    };
  }
}

export interface StoreDataForm {
  fullName: string;
  cpf: string;
  cnpj: string;
  email: string;
  password: string;
  storeName: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  termsAccepted: boolean;
}

export interface RegisterFormData {
  step1: StoreDataForm;
  step2?: {
    logoUrl?: string;
    bannerUrl?: string;
  };
}

export type StoreDataFormErrors = Partial<Record<keyof StoreDataForm, string>>;

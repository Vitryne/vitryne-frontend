import React, { useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import CheckBox from "@/components/checkbox";
import { StoreDataForm, StoreDataFormErrors } from "@/types/register";
import { maskCpf, maskCnpj, maskCep } from "@/utils/masks";
import {
  isValidCpf,
  isValidCnpj,
  isValidEmail,
  isValidCep,
} from "@/utils/validators";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { FiUser, FiBriefcase, FiMapPin } from "react-icons/fi";
import axios from "axios";

interface StepStoreDataProps {
  data: StoreDataForm;
  onChange: (field: keyof StoreDataForm, value: string | boolean) => void;
  onNext: () => void;
}

export const StepStoreData: React.FC<StepStoreDataProps> = ({
  data,
  onChange,
  onNext,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<StoreDataFormErrors>({});
  const [loadingCep, setLoadingCep] = useState(false);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const masked = maskCep(rawValue);
    onChange("cep", masked);

    const cleanCep = masked.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      try {
        setLoadingCep(true);
        const response = await axios.get(
          `https://viacep.com.br/ws/${cleanCep}/json/`
        );
        if (!response.data.erro) {
          onChange("street", response.data.logradouro || "");
          onChange("neighborhood", response.data.bairro || "");
          onChange("city", response.data.localidade || "");
          onChange("state", response.data.uf || "");
          setErrors((prev) => ({
            ...prev,
            cep: undefined,
            street: undefined,
            neighborhood: undefined,
            city: undefined,
            state: undefined,
          }));
        } else {
          setErrors((prev) => ({ ...prev, cep: "CEP não encontrado." }));
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: StoreDataFormErrors = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = "Informe o nome completo.";
    }

    if (!data.cpf.trim()) {
      newErrors.cpf = "Informe o CPF.";
    } else if (!isValidCpf(data.cpf)) {
      newErrors.cpf = "CPF inválido.";
    }

    if (!data.cnpj.trim()) {
      newErrors.cnpj = "Informe o CNPJ da loja.";
    } else if (!isValidCnpj(data.cnpj)) {
      newErrors.cnpj = "CNPJ inválido.";
    }

    if (!data.email.trim()) {
      newErrors.email = "Informe o e-mail.";
    } else if (!isValidEmail(data.email)) {
      newErrors.email = "E-mail com formato inválido.";
    }

    if (!data.password) {
      newErrors.password = "Informe uma senha.";
    } else if (data.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (!data.storeName.trim()) {
      newErrors.storeName = "Informe o nome da loja.";
    }

    if (!data.cep.trim()) {
      newErrors.cep = "Informe o CEP.";
    } else if (!isValidCep(data.cep)) {
      newErrors.cep = "CEP deve conter 8 dígitos.";
    }

    if (!data.street.trim()) {
      newErrors.street = "Informe o logradouro / rua.";
    }

    if (!data.number.trim()) {
      newErrors.number = "Informe o número.";
    }

    if (!data.neighborhood.trim()) {
      newErrors.neighborhood = "Informe o bairro.";
    }

    if (!data.city.trim()) {
      newErrors.city = "Informe a cidade.";
    }

    if (!data.state.trim()) {
      newErrors.state = "Informe o estado (UF).";
    }

    if (!data.termsAccepted) {
      newErrors.termsAccepted = "Você deve aceitar os Termos de Uso para continuar.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Seção 1: Responsável */}
      <div>
        <h2 className="font-display font-bold text-[18px] text-text-primary mb-1">
          Dados do Responsável
        </h2>
        <p className="font-body text-[13px] text-text-secondary mb-4">
          Informações da pessoa física que administra a conta.
        </p>

        <div className="space-y-3.5">
          <Input
            title="Nome Completo *"
            placeholder="Ex: João da Silva"
            value={data.fullName}
            onChange={(e) => {
              onChange("fullName", e.target.value);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            error={errors.fullName}
            icon={<FiUser size={18} />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <Input
              title="CPF *"
              placeholder="000.000.000-00"
              maxLength={14}
              value={data.cpf}
              onChange={(e) => {
                onChange("cpf", maskCpf(e.target.value));
                if (errors.cpf) setErrors((prev) => ({ ...prev, cpf: undefined }));
              }}
              error={errors.cpf}
            />

            <Input
              title="E-mail *"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={data.email}
              onChange={(e) => {
                onChange("email", e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              error={errors.email}
              icon={<HiOutlineMail size={18} />}
            />
          </div>

          <div className="relative">
            <Input
              title="Senha *"
              type={showPassword ? "text" : "password"}
              placeholder="Crie uma senha segura (mín. 6 caracteres)"
              value={data.password}
              onChange={(e) => {
                onChange("password", e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              error={errors.password}
              icon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
                  aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
                >
                  {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                </button>
              }
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Seção 2: Dados da Loja */}
      <div>
        <h2 className="font-display font-bold text-[18px] text-text-primary mb-1">
          Dados da Loja
        </h2>
        <p className="font-body text-[13px] text-text-secondary mb-4">
          Como seu negócio será identificado na Vitryne.
        </p>

        <div className="space-y-3.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <Input
              title="Nome da Loja *"
              placeholder="Ex: Atelier Norte"
              value={data.storeName}
              onChange={(e) => {
                onChange("storeName", e.target.value);
                if (errors.storeName) setErrors((prev) => ({ ...prev, storeName: undefined }));
              }}
              error={errors.storeName}
              icon={<FiBriefcase size={18} />}
            />

            <Input
              title="CNPJ *"
              placeholder="00.000.000/0000-00"
              maxLength={18}
              value={data.cnpj}
              onChange={(e) => {
                onChange("cnpj", maskCnpj(e.target.value));
                if (errors.cnpj) setErrors((prev) => ({ ...prev, cnpj: undefined }));
              }}
              error={errors.cnpj}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Seção 3: Endereço */}
      <div>
        <h2 className="font-display font-bold text-[18px] text-text-primary mb-1">
          Endereço da Loja
        </h2>
        <p className="font-body text-[13px] text-text-secondary mb-4">
          Localização comercial do estabelecimento.
        </p>

        <div className="space-y-3.5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <Input
              title={`CEP * ${loadingCep ? "(Buscando...)" : ""}`}
              placeholder="00000-000"
              maxLength={9}
              value={data.cep}
              onChange={handleCepChange}
              error={errors.cep}
              icon={<FiMapPin size={18} />}
            />

            <div className="md:col-span-2">
              <Input
                title="Rua / Logradouro *"
                placeholder="Ex: Av. Brasil"
                value={data.street}
                onChange={(e) => {
                  onChange("street", e.target.value);
                  if (errors.street) setErrors((prev) => ({ ...prev, street: undefined }));
                }}
                error={errors.street}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <Input
              title="Número *"
              placeholder="Ex: 123"
              value={data.number}
              onChange={(e) => {
                onChange("number", e.target.value);
                if (errors.number) setErrors((prev) => ({ ...prev, number: undefined }));
              }}
              error={errors.number}
            />

            <div className="md:col-span-2">
              <Input
                title="Complemento (Opcional)"
                placeholder="Ex: Sala 402, Bloco B"
                value={data.complement}
                onChange={(e) => onChange("complement", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <Input
              title="Bairro *"
              placeholder="Ex: Centro"
              value={data.neighborhood}
              onChange={(e) => {
                onChange("neighborhood", e.target.value);
                if (errors.neighborhood) setErrors((prev) => ({ ...prev, neighborhood: undefined }));
              }}
              error={errors.neighborhood}
            />

            <Input
              title="Cidade *"
              placeholder="Ex: Maringá"
              value={data.city}
              onChange={(e) => {
                onChange("city", e.target.value);
                if (errors.city) setErrors((prev) => ({ ...prev, city: undefined }));
              }}
              error={errors.city}
            />

            <Input
              title="Estado (UF) *"
              placeholder="Ex: PR"
              maxLength={2}
              value={data.state}
              onChange={(e) => {
                onChange("state", e.target.value.toUpperCase());
                if (errors.state) setErrors((prev) => ({ ...prev, state: undefined }));
              }}
              error={errors.state}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Seção 4: Termos de Uso (RF-W18) */}
      <div className="pt-2">
        <CheckBox
          id="terms-accepted"
          checked={data.termsAccepted}
          onChange={(e) => {
            onChange("termsAccepted", e.target.checked);
            if (errors.termsAccepted) {
              setErrors((prev) => ({ ...prev, termsAccepted: undefined }));
            }
          }}
          label={
            <span>
              Declaro que li e concordo com os{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Termos de Uso da plataforma Vitryne: Ao se cadastrar, você concorda com o uso da plataforma para comercialização de produtos e serviços conforme as diretrizes legais vigentes.");
                }}
                className="text-primary font-semibold hover:underline"
              >
                Termos de Uso
              </a>{" "}
              e a{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Política de Privacidade Vitryne: Seus dados cadastrais e de sua loja são armazenados com segurança e utilizados apenas para fins operacionais da plataforma.");
                }}
                className="text-primary font-semibold hover:underline"
              >
                Política de Privacidade
              </a>
              .
            </span>
          }
          error={errors.termsAccepted}
        />
      </div>

      {/* Ação de Avançar */}
      <div className="pt-4">
        <Button title="Avançar para Identidade Visual" type="submit" />
      </div>
    </form>
  );
};

export default StepStoreData;

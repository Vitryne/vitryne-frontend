import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import StepStoreData from "@/components/register/step-store-data";
import Button from "@/components/button";
import { RegisterFormData, StoreDataForm } from "@/types/register";
import { FiArrowLeft } from "react-icons/fi";

const initialStep1Data: StoreDataForm = {
  fullName: "",
  cpf: "",
  cnpj: "",
  email: "",
  password: "",
  storeName: "",
  cep: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  termsAccepted: false,
};

const Register: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    step1: initialStep1Data,
  });

  const handleStep1Change = (
    field: keyof StoreDataForm,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      step1: {
        ...prev.step1,
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <>
      <Head>
        <title>Cadastro da Loja — Vitryne</title>
        <meta
          name="description"
          content="Cadastre sua loja na plataforma Vitryne e comece a vender."
        />
      </Head>

      <div className="flex min-h-screen bg-screen">
        {/* Painel Lateral Hero (Visível em Desktop) */}
        <div className="hidden lg:block lg:w-[42%] relative overflow-hidden bg-text-primary">
          <Image
            src="/partner_hero.jpg"
            alt="Vitryne Parceiros"
            fill
            className="object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12 text-white">
            <span className="inline-block font-body text-[12px] font-semibold tracking-widest uppercase text-primary-soft bg-primary/40 px-3 py-1 rounded-full w-max mb-4 backdrop-blur-sm">
              Vitryne Lojista
            </span>
            <h2 className="font-display font-bold text-[28px] leading-tight mb-2">
              Transforme a presença digital do seu negócio.
            </h2>
            <p className="font-body text-[14px] text-gray-200">
              Cadastre sua loja em poucos passos e tenha acesso a um painel completo para gerenciar seus produtos e vendas.
            </p>
          </div>
        </div>

        {/* Painel do Formulário */}
        <div className="w-full lg:w-[58%] min-h-screen flex flex-col justify-between py-10 px-6 sm:px-10 lg:px-16 overflow-y-auto">
          <div className="w-full max-w-xl mx-auto">
            {/* Navegação Superior */}
            <div className="flex items-center justify-between mb-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 font-body text-[13px] font-semibold text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  <FiArrowLeft size={16} />
                  Voltar para etapa anterior
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 font-body text-[13px] font-semibold text-text-secondary hover:text-primary transition-colors"
                >
                  <FiArrowLeft size={16} />
                  Voltar para o login
                </Link>
              )}

              <span className="font-body text-[12px] font-medium text-text-secondary bg-surface px-3 py-1 rounded-full border border-border">
                Etapa {currentStep} de 2
              </span>
            </div>

            {/* Cabeçalho */}
            <div className="mb-8">
              <h1 className="font-display font-bold text-[28px] sm:text-[32px] leading-tight text-text-primary">
                {currentStep === 1
                  ? "Cadastre sua loja"
                  : "Identidade Visual"}
              </h1>
              <p className="font-body text-[14px] leading-normal text-text-secondary mt-1.5">
                {currentStep === 1
                  ? "Preencha os dados cadastrais da sua empresa e responsável."
                  : "Personalize a logo e o banner de apresentação da sua loja."}
              </p>
            </div>

            {/* Renderização Condicional da Etapa por Estado React */}
            {currentStep === 1 && (
              <StepStoreData
                data={formData.step1}
                onChange={handleStep1Change}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <div className="space-y-6 bg-surface p-8 rounded-2xl border border-border text-center">
                <div className="w-16 h-16 bg-primary-soft text-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-display font-bold text-[20px] text-text-primary">
                    Etapa 1 concluída com sucesso!
                  </h3>
                  <p className="font-body text-[14px] text-text-secondary mt-2">
                    Os dados de <strong>{formData.step1.storeName || "sua loja"}</strong> foram validados e salvos no estado.
                  </p>
                  <p className="font-body text-[13px] text-text-secondary mt-1">
                    A etapa de upload de Logo e Banner será integrada na próxima tarefa (ETI-172).
                  </p>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button
                    title="Voltar e Editar Dados"
                    variant="outline"
                    type="button"
                    onClick={handleBack}
                  />
                  <Button
                    title="Salvar Rascunho"
                    type="button"
                    onClick={() => alert("Dados salvos no rascunho com sucesso!")}
                  />
                </div>
              </div>
            )}

            {/* Rodapé de Ajuda / Login */}
            <p className="text-center font-body text-[13px] text-text-secondary mt-10">
              Já possui uma loja cadastrada?{" "}
              <Link
                href="/login"
                className="text-primary font-semibold hover:underline"
              >
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
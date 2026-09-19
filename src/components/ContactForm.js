/**
 * Formulario de contato com validacao client-side (react-hook-form).
 *
 * Envio: Web3Forms (https://web3forms.com) — POST em JSON direto do navegador
 * pro endpoint deles, sem backend proprio. As mensagens caem na caixa do
 * e-mail associado a access key, que e o grupo therustydogs@googlegroups.com
 * (chega a todos os integrantes). Basta criar a access key em web3forms.com
 * com esse e-mail e definir GATSBY_WEB3FORMS_ACCESS_KEY no `.env` / nos
 * secrets do repositorio.
 *
 * Sem essa variavel o formulario entra em "modo demo": valida tudo e mostra o
 * feedback de sucesso sem disparar requisicao — util em desenvolvimento.
 */
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Button from "./Button"
import Icon from "./Icon"
import { useLanguage } from "../context/LanguageContext"

const WEB3FORMS_ACCESS_KEY = process.env.GATSBY_WEB3FORMS_ACCESS_KEY
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const ContactForm = () => {
  const { t, language } = useLanguage()
  const [status, setStatus] = useState("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" })

  const onSubmit = async values => {
    // Campo armadilha para robos: preenchido = ignora o envio.
    if (values.company) return

    setStatus("idle")

    if (!WEB3FORMS_ACCESS_KEY) {
      await new Promise(resolve => setTimeout(resolve, 600))
      setStatus("demo")
      reset()
      return
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          language,
        }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.message || `Web3Forms respondeu ${response.status}`)
      }

      setStatus("success")
      reset()
    } catch (error) {
      setStatus("error")
    }
  }

  const fieldClass = name => `field${errors[name] ? " field--invalid" : ""}`

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="contact-form__title">{t("contact.formTitle")}</h2>

      <div className={fieldClass("name")}>
        <label className="field__label" htmlFor="name">
          {t("contact.name")} <span className="field__required">({t("contact.required")})</span>
        </label>
        <input
          id="name"
          type="text"
          className="field__input"
          placeholder={t("contact.namePlaceholder")}
          autoComplete="name"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name", { required: true, minLength: 2 })}
        />
        {errors.name ? (
          <p className="field__error" id="name-error" role="alert">
            {t("contact.errors.name")}
          </p>
        ) : null}
      </div>

      <div className={fieldClass("email")}>
        <label className="field__label" htmlFor="email">
          {t("contact.email")} <span className="field__required">({t("contact.required")})</span>
        </label>
        <input
          id="email"
          type="email"
          className="field__input"
          placeholder={t("contact.emailPlaceholder")}
          autoComplete="email"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email", { required: true, pattern: EMAIL_PATTERN })}
        />
        {errors.email ? (
          <p className="field__error" id="email-error" role="alert">
            {t("contact.errors.email")}
          </p>
        ) : null}
      </div>

      <div className={fieldClass("subject")}>
        <label className="field__label" htmlFor="subject">
          {t("contact.subject")} <span className="field__required">({t("contact.required")})</span>
        </label>
        <input
          id="subject"
          type="text"
          className="field__input"
          placeholder={t("contact.subjectPlaceholder")}
          aria-invalid={errors.subject ? "true" : "false"}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          {...register("subject", { required: true, minLength: 3 })}
        />
        {errors.subject ? (
          <p className="field__error" id="subject-error" role="alert">
            {t("contact.errors.subject")}
          </p>
        ) : null}
      </div>

      <div className={fieldClass("message")}>
        <label className="field__label" htmlFor="message">
          {t("contact.message")} <span className="field__required">({t("contact.required")})</span>
        </label>
        <textarea
          id="message"
          rows={6}
          className="field__input field__input--textarea"
          placeholder={t("contact.messagePlaceholder")}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message", { required: true, minLength: 10 })}
        />
        {errors.message ? (
          <p className="field__error" id="message-error" role="alert">
            {t("contact.errors.message")}
          </p>
        ) : null}
      </div>

      {/* Honeypot: invisivel para pessoas, atraente para robos. */}
      <div className="field field--honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="contact-form__actions">
        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} icon={<Icon name="mail" size={20} />}>
          {isSubmitting ? t("contact.sending") : t("contact.submit")}
        </Button>
      </div>

      <div className="contact-form__status" aria-live="polite">
        {status === "success" ? <p className="alert alert--success">{t("contact.success")}</p> : null}
        {status === "demo" ? <p className="alert alert--success">{t("contact.successDemo")}</p> : null}
        {status === "error" ? <p className="alert alert--error">{t("contact.error")}</p> : null}
      </div>
    </form>
  )
}

export default ContactForm

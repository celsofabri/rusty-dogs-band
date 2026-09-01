/**
 * Formulario de contato com validacao client-side (react-hook-form).
 *
 * Envio: Formspree (https://formspree.io) — a opcao mais simples para um site
 * estatico, porque e so um POST em JSON para um endpoint, sem backend proprio e
 * sem depender da infra da Netlify. Basta criar um formulario la e definir
 * GATSBY_FORMSPREE_ID no `.env` / nos secrets do repositorio.
 *
 * Sem essa variavel o formulario entra em "modo demo": valida tudo e mostra o
 * feedback de sucesso sem disparar requisicao — util em desenvolvimento.
 */
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Button from "./Button"
import Icon from "./Icon"
import { useLanguage } from "../context/LanguageContext"

const FORMSPREE_ID = process.env.GATSBY_FORMSPREE_ID
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

    if (!FORMSPREE_ID) {
      await new Promise(resolve => setTimeout(resolve, 600))
      setStatus("demo")
      reset()
      return
    }

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          _subject: values.subject,
          subject: values.subject,
          message: values.message,
          language,
        }),
      })

      if (!response.ok) throw new Error(`Formspree respondeu ${response.status}`)

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

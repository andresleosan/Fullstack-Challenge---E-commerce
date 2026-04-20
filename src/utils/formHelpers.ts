/**
 * Form Helpers - Utilidades para trabajar con formularios
 */

/**
 * FormState - Estado de un formulario con valores y errores
 */
export interface FormState {
  values: Record<string, any>
  errors: Record<string, string>
  touched: Record<string, boolean>
  isSubmitting: boolean
  isValid: boolean
}

/**
 * Form Helper Class - Gestión simplificada de formularios
 */
export class FormHelper {
  values: Record<string, any> = {}
  errors: Record<string, string> = {}
  touched: Record<string, boolean> = {}
  validators: Record<string, (value: any) => string | true> = {}

  constructor(
    initialValues: Record<string, any> = {},
    formValidators: Record<string, (value: any) => string | true> = {}
  ) {
    this.values = initialValues
    this.validators = formValidators
  }

  /**
   * Set field value
   */
  setFieldValue(field: string, value: any) {
    this.values[field] = value
  }

  /**
   * Set field touched
   */
  setFieldTouched(field: string, touched = true) {
    this.touched[field] = touched
  }

  /**
   * Validate single field
   */
  validateField(field: string): boolean {
    const validator = this.validators[field]
    if (!validator) return true

    const result = validator(this.values[field])
    if (result === true) {
      delete this.errors[field]
      return true
    } else {
      this.errors[field] = result
      return false
    }
  }

  /**
   * Validate all fields
   */
  validateForm(): boolean {
    let isValid = true

    for (const field in this.validators) {
      if (!this.validateField(field)) {
        isValid = false
      }
    }

    return isValid
  }

  /**
   * Reset form
   */
  reset(initialValues?: Record<string, any>) {
    this.values = initialValues || {}
    this.errors = {}
    this.touched = {}
  }

  /**
   * Get form state
   */
  getState(): FormState {
    return {
      values: this.values,
      errors: this.errors,
      touched: this.touched,
      isSubmitting: false,
      isValid: Object.keys(this.errors).length === 0,
    }
  }

  /**
   * Get field error (si fue touched)
   */
  getFieldError(field: string): string | null {
    if (this.touched[field] && this.errors[field]) {
      return this.errors[field]
    }
    return null
  }

  /**
   * Check if field has error
   */
  hasError(field: string): boolean {
    return !!this.errors[field]
  }
}

/**
 * Helpers de formularios comunes
 */

/**
 * Formatear número de teléfono: (555) 123-4567
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length <= 3) return cleaned
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
}

/**
 * Formatear número de tarjeta: 1234 5678 9012 3456
 */
export const formatCardNumber = (card: string): string => {
  const cleaned = card.replace(/\D/g, '')
  return cleaned.replace(/(.{4})/g, '$1 ').trim()
}

/**
 * Formatear fecha de expiración: 12/25
 */
export const formatExpiryDate = (date: string): string => {
  const cleaned = date.replace(/\D/g, '')
  if (cleaned.length <= 2) return cleaned
  return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
}

/**
 * Prevenir input numérico a menos que sea número
 */
export const onlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Escape'].includes(e.key)) {
    e.preventDefault()
  }
}

/**
 * Convertir objeto a FormData (para uploads)
 */
export const objectToFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData()

  for (const key in obj) {
    if (obj[key] instanceof File) {
      formData.append(key, obj[key])
    } else if (Array.isArray(obj[key])) {
      obj[key].forEach((item, index) => {
        formData.append(`${key}[${index}]`, item)
      })
    } else if (obj[key] !== null && obj[key] !== undefined) {
      formData.append(key, String(obj[key]))
    }
  }

  return formData
}

/**
 * Sanitizar entrada para prevenir XSS
 */
export const sanitizeInput = (input: string): string => {
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

/**
 * Debounce for form validation (ayuda a no validar en cada keystroke)
 */
export const debounceValidation = (
  callback: () => void,
  delay: number = 300
): (() => void) => {
  let timeoutId: NodeJS.Timeout

  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(callback, delay)
  }
}

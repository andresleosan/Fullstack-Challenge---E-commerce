/**
 * Form Validators - Validación de campos de formulario
 * 
 * Incluye validadores para:
 * - Email
 * - Contraseñas
 * - Datos de usuario
 * - Dirección de envío
 * - Teléfono, etc
 */

/**
 * ===== EMAIL VALIDATION =====
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validators = {
  email: (email: string): string | true => {
    if (!email) return 'Email es requerido'
    if (email.length > 100) return 'Email debe ser menor a 100 caracteres'
    if (!EMAIL_REGEX.test(email)) return 'Email inválido'
    return true
  },

  /**
   * ===== PASSWORD VALIDATION =====
   */

  password: (password: string): string | true => {
    if (!password) return 'Contraseña es requerida'
    if (password.length < 6) return 'Contraseña debe ser mínimo 6 caracteres'
    if (password.length > 50) return 'Contraseña debe ser máximo 50 caracteres'
    // Opcional: requiere mayúscula, minúscula, número
    // if (!/[A-Z]/.test(password)) return 'Debe incluir mayúscula'
    // if (!/[0-9]/.test(password)) return 'Debe incluir número'
    return true
  },

  passwordMatch: (password: string, confirmPassword: string): string | true => {
    if (password !== confirmPassword) return 'Las contraseñas no coinciden'
    return true
  },

  /**
   * ===== NAME VALIDATION =====
   */

  name: (name: string): string | true => {
    if (!name) return 'Nombre es requerido'
    if (name.length < 2) return 'Nombre debe tener mínimo 2 caracteres'
    if (name.length > 100) return 'Nombre debe ser máximo 100 caracteres'
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Nombre solo puede contener letras y espacios'
    return true
  },

  /**
   * ===== ADDRESS VALIDATION =====
   */

  address: (address: string): string | true => {
    if (!address) return 'Dirección es requerida'
    if (address.length < 5) return 'Dirección debe tener mínimo 5 caracteres'
    if (address.length > 200) return 'Dirección debe ser máximo 200 caracteres'
    return true
  },

  city: (city: string): string | true => {
    if (!city) return 'Ciudad es requerida'
    if (city.length < 2) return 'Ciudad debe tener mínimo 2 caracteres'
    if (city.length > 50) return 'Ciudad debe ser máximo 50 caracteres'
    return true
  },

  state: (state: string): string | true => {
    if (!state) return 'Estado/Región es requerido'
    if (state.length < 2) return 'Estado debe tener mínimo 2 caracteres'
    if (state.length > 50) return 'Estado debe ser máximo 50 caracteres'
    return true
  },

  zipCode: (zipCode: string): string | true => {
    if (!zipCode) return 'Código postal es requerido'
    if (zipCode.length < 3) return 'Código postal debe tener mínimo 3 caracteres'
    if (zipCode.length > 20) return 'Código postal debe ser máximo 20 caracteres'
    return true
  },

  /**
   * ===== PHONE VALIDATION =====
   */

  phone: (phone: string): string | true => {
    if (!phone) return 'Teléfono es requerido'
    if (phone.length < 7) return 'Teléfono debe tener mínimo 7 caracteres'
    if (phone.length > 20) return 'Teléfono debe ser máximo 20 caracteres'
    if (!/^[0-9+\-\s()]+$/.test(phone))
      return 'Teléfono contiene caracteres inválidos'
    return true
  },

  /**
   * ===== CARD VALIDATION =====
   */

  cardNumber: (cardNumber: string): string | true => {
    // Remover espacios
    const cleaned = cardNumber.replace(/\s/g, '')

    if (!cleaned) return 'Número de tarjeta es requerido'
    if (cleaned.length < 13) return 'Número de tarjeta inválido'
    if (cleaned.length > 19) return 'Número de tarjeta inválido'
    if (!/^\d+$/.test(cleaned)) return 'Número de tarjeta debe contener solo dígitos'

    // Luhn algorithm (simple check)
    let sum = 0
    let isEven = false

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10)

      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }

      sum += digit
      isEven = !isEven
    }

    if (sum % 10 !== 0) return 'Número de tarjeta inválido'
    return true
  },

  expiryDate: (expiryDate: string): string | true => {
    // Formato: MM/YY
    if (!expiryDate) return 'Fecha de expiración es requerida'

    const parts = expiryDate.split('/')
    if (parts.length !== 2) return 'Formato debe ser MM/YY'

    const month = parseInt(parts[0], 10)
    const year = parseInt(parts[1], 10)

    if (isNaN(month) || isNaN(year)) return 'Fecha inválida'
    if (month < 1 || month > 12) return 'Mes debe estar entre 01-12'

    const currentYear = new Date().getFullYear() % 100
    const currentMonth = new Date().getMonth() + 1

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Tarjeta expirada'
    }

    return true
  },

  cvv: (cvv: string): string | true => {
    if (!cvv) return 'CVV es requerido'
    if (!/^\d{3,4}$/.test(cvv)) return 'CVV debe ser 3 o 4 dígitos'
    return true
  },

  /**
   * ===== QUANTITY VALIDATION =====
   */

  quantity: (quantity: number | string, max: number = 999): string | true => {
    const num = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity

    if (isNaN(num)) return 'Cantidad debe ser un número'
    if (num < 1) return 'Cantidad debe ser mínimo 1'
    if (num > max) return `Cantidad debe ser máximo ${max}`

    return true
  },

  /**
   * ===== SEARCH QUERY VALIDATION =====
   */

  searchQuery: (query: string): string | true => {
    if (!query) return true // Búsqueda vacía es válida
    if (query.length > 100) return 'Búsqueda debe ser máximo 100 caracteres'
    return true
  },
}

/**
 * ===== BATCH VALIDATION =====
 */

/**
 * Validar un formulario de login
 */
export const validateLoginForm = (
  email: string,
  password: string
): { email?: string; password?: string } => {
  const errors: { email?: string; password?: string } = {}

  const emailValid = validators.email(email)
  if (emailValid !== true) errors.email = emailValid

  const passwordValid = validators.password(password)
  if (passwordValid !== true) errors.password = passwordValid

  return errors
}

/**
 * Validar un formulario de registro
 */
export const validateRegisterForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  termsAccepted: boolean
): {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  terms?: string
} => {
  const errors: any = {}

  const nameValid = validators.name(name)
  if (nameValid !== true) errors.name = nameValid

  const emailValid = validators.email(email)
  if (emailValid !== true) errors.email = emailValid

  const passwordValid = validators.password(password)
  if (passwordValid !== true) errors.password = passwordValid

  const matchValid = validators.passwordMatch(password, confirmPassword)
  if (matchValid !== true) errors.confirmPassword = matchValid

  if (!termsAccepted) errors.terms = 'Debes aceptar los términos y condiciones'

  return errors
}

/**
 * Validar un formulario de checkout
 */
export const validateCheckoutForm = (data: {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  cardNumber: string
  expiryDate: string
  cvv: string
}): Record<string, string> => {
  const errors: Record<string, string> = {}

  const emailValid = validators.email(data.email)
  if (emailValid !== true) errors.email = emailValid

  const firstNameValid = validators.name(data.firstName)
  if (firstNameValid !== true) errors.firstName = firstNameValid

  const lastNameValid = validators.name(data.lastName)
  if (lastNameValid !== true) errors.lastName = lastNameValid

  const addressValid = validators.address(data.address)
  if (addressValid !== true) errors.address = addressValid

  const cityValid = validators.city(data.city)
  if (cityValid !== true) errors.city = cityValid

  const stateValid = validators.state(data.state)
  if (stateValid !== true) errors.state = stateValid

  const zipValid = validators.zipCode(data.zipCode)
  if (zipValid !== true) errors.zipCode = zipValid

  const cardValid = validators.cardNumber(data.cardNumber)
  if (cardValid !== true) errors.cardNumber = cardValid

  const expiryValid = validators.expiryDate(data.expiryDate)
  if (expiryValid !== true) errors.expiryDate = expiryValid

  const cvvValid = validators.cvv(data.cvv)
  if (cvvValid !== true) errors.cvv = cvvValid

  return errors
}

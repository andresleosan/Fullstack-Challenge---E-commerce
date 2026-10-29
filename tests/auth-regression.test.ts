// @vitest-environment jsdom
import { afterEach, expect, test, vi } from 'vitest'
vi.mock('@config/firebase', () => ({ auth: {} }))
vi.mock('@utils', () => ({ tokenUtils: {}, authMiddleware: {} }))
vi.mock('firebase/auth', () => ({ signInWithEmailAndPassword: vi.fn() }))
import { signInWithEmailAndPassword } from 'firebase/auth'
import { authService } from '../src/services/auth.service'
import { errorHandler } from '../src/utils/helpers/errorHandler'
afterEach(() => vi.restoreAllMocks())
test('login normalizes a non-Error rejection without throwing a secondary TypeError', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce(null)
  await expect(authService.login('test@example.invalid', 'test-only')).rejects.toMatchObject({ code: 'UNKNOWN_ERROR' })
})
test('error handler accepts malformed error metadata', () => {
  expect(() => errorHandler.parse({ code: 42, message: {} })).not.toThrow()
})

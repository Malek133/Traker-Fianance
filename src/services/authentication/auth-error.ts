import type {AuthError} from 'next-auth'

type AuthentificationError = {
  [key in AuthError['type']]: string
}
//https://authjs.dev/reference/core/errors
const AUTH_ERRORS: Record<string, string> = {
  AdapterError: 'Une erreur technique est survenue lors de la requête.',
  CallbackRouteError: 'Problème avec la réponse du Provider.',
  EmailSignInError:
    'Problème de vérification de token/Mauvaise configuration du Provider.',
  InvalidCallbackUrl: 'Lien de validation invalide.',
  InvalidProvider:
    "La méthode de connexion n'est pas supporté. Choisir une méthode ou contactez le support.",
  MissingAdapter:
    'Une part de la configuration est manquante. Contactez le support.',
  MissingAdapterMethods:
    'Une part de la configuration est manquante. Contactez le support.',
  MissingAuthorize:
    "La méthode de connexion n'est pas configuré correctement. Contactez le support.",
  MissingSecret:
    "La variable `AUTH_SECRET` n'est pas renseignée pour la production.",
  OAuthCallbackError: 'Problème avec le corps de la requête JSON.',
  OAuthProfileParseError: 'Problème avec la réponse du Provider.',
  OAuthSignInError:
    'Problème de vérification de token/Mauvaise configuration du Provider.',
  SignOutError: 'Erreur lors de la tentative de déconnexion.',
  Verification:
    "Email ou token invalide. Le token n'existe pas ou celui-ci est expiré.",
  UnknownAction:
    "Action n'est pas supporté. Vérifier votre requête et réessayer.",
} satisfies Partial<AuthentificationError>

export const getAuthError = (code: string) => {
  const error = AUTH_ERRORS[code] ?? (`Code erreur: ${code}` as const)
  return error
}

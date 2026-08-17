import type { UserRole } from '../features/dashboards/types'

// Temporary mock role. A single source of truth for which dashboard renders.
// TODO: replace with the authenticated user's role provided by Laravel Inertia props (auth.user.role).
export const currentRole: UserRole = 'buyer'
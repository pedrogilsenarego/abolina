export enum PERMISSIONS {
  ADMIN_ACCESS = 'admin_access',
}

// this roles will be used  to decide which UI will be visible to user
// TODO: replace this with user_type that will be coming from backend
// TODO rename to singular to follow enum names
export enum ROLES {
  VENDOR = 'vendor',
  ADMIN = 'admin',
  GURU = 'guru',
}

export const getPermissions = {
  admin: [
    PERMISSIONS.ADMIN_ACCESS,
  ],
  guru: [
    PERMISSIONS.ADMIN_ACCESS,
  ],
  vendor: [
    PERMISSIONS.ADMIN_ACCESS,
  ]
}

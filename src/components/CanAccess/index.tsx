import React, { FunctionComponent } from 'react'
import { getPermissions, ROLES, PERMISSIONS } from '../../constants/permissions'
import usePermission from '../../hooks/usePermission'

export interface UsePermissionParams {
  as?: ROLES
  children?: React.ReactNode
  permissions?: PERMISSIONS[]
}

// This Component is used to check if the user has the permission to access Specific Component or part of the UI
const CanAccess: FunctionComponent<UsePermissionParams> = ({
  as,
  children,
  permissions,
}) => {
  const hasPermission = usePermission()
  if (as === ROLES.VENDOR) {
    const hasAllPermissions = permissions?.every((permission) =>
      getPermissions.vendor.includes(permission)
    )
    if (hasPermission && hasAllPermissions) {
      return <>{children}</>
    }
  } else if (as === ROLES.ADMIN) {
    const hasAllPermissions = permissions?.every((permission) =>
      getPermissions.admin.includes(permission)
    )
    if (hasPermission && hasAllPermissions) {
      return <>{children}</>
    }
  } else if (as === ROLES.GURU) {
    const hasAllPermissions = permissions?.every((permission) =>
      getPermissions.guru.includes(permission)
    )
    if (hasPermission && hasAllPermissions) {
      return <>{children}</>
    }
  }
  return <></>
}

export default CanAccess

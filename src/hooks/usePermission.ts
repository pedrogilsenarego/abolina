
import validateUserPermissions from '../utils/validateUserPermissions'

type UsePermissionParams = {
  permissions?: string[]
}

const usePermission = ({ permissions = [] }: UsePermissionParams) => {
  

  const userHasValidPermissions = validateUserPermissions()

  return userHasValidPermissions
}

export default usePermission

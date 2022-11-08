export const isUnAuthorized = (res) => {
  if (res.status === 401 || res.status === 419) {
    return {
      status: "Unauthorized"
    }
  }
}
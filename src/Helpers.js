export function updateHealthWithValue(updates, updateFunction) {
  var updatedHealth = updates.find(function(update) { return update.field === "health" })
  if (!updatedHealth) return
  return updateFunction(updatedHealth.value)
}

export function findHealthForRole(updates, fieldName) {
  const update =  updates.find(function(update) { return update.field === fieldName })
  if (!update) return null

  return update.value.health
}

export function findValue(updates, fieldName) {
  const update =  updates.find(function(update) { return update.field === fieldName })
  if (!update) return null

  return update.value
}

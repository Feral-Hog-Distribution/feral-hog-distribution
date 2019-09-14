export function updateHealthWithValue(updates, updateFunction) {
  var updatedHealth = updates.find(function(update) { return update.field === "health" })
  if (!updatedHealth) return
  updateFunction(updatedHealth.value)
}

export function findValue(updates, fieldName) {
  const update =  updates.find(function(update) { return update.field === fieldName })
  if (!update) return null

  return update.value
}

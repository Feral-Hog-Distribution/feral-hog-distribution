export function updateHealthWithValue(updates, updateFunction) {
  var updatedHealth = updates.find(function(update) { return update.field === "health" })
  if (!updatedHealth) return
  updateFunction(updatedHealth.value)
}

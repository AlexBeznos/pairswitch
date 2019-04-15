function convertFirebaseSnap(snap : object, properties = []) : array<object> {
  let records = []

  for(let id in snap) {
    let record = {id, ...snap[id]}
    
    properties.forEach((propName) => { 
      record[propName] = convertFirebaseSnap(record[propName]) 
    })

    records.push(record)
  }

  return records
}

export default convertFirebaseSnap

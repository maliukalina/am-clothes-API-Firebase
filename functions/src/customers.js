const { connectDb } = require ("./db")

exports.createCustomer = (req,res) => {
  const db =connectDb() 
 
  let newItem = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    email: req.body.email
  }
  db.collection("customers").add(newItem)
    .then(docRef => res.status(201).send({id:docRef.id}))
    .catch(err => res.status(500).send(err))
}

//getCustomerById
exports.getCustomerById = (req, res) => {
  const db = connectDb()

  const {customerId} = req.params
  db.collection("customers").doc(customerId).get()
    .then(doc => {
      let item = doc.data()
      item.id = doc.id
      res.send(item)
    .catch(err => res.status(500).send(err))
})
}
//getAllCustomers
exports.getAllCustomers = (req,res) => {
  const db = connectDb()
  db.collection("customers").get()
  .then(collection => {
    const customers = collection.docs.map(doc => {
      let item = doc.data()
      item.id = doc.id
      return item
    })
    res.send(customers)
  })
  .catch(err => res.status(500).send(err))
}

//updateCustomer
exports.updateCustomer = (req, res) => {
  const db = connectDb()
  const {customerId} = req.params

  db.collection("customers").doc(customerId).update(req.body)
    .then(()=> res.status(202).send({message: "updated"}))
    .catch(err => res.status(500).send(err))
}

//deleteCustomer
exports.deleteCustomer = (req,res) => {
  const db = connectDb()
  const {customerId} = req.params

  db.collection("customers").doc(customerId).delete()
    .then(()=> res.status(202).send({message: "deleted"}))
    .catch(err => res.status(500).send(err))
}




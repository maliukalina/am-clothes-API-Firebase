const { connectDb } = require ("./db")

exports.createOrder = (req,res) => {
  const db =connectDb() 
 
  let newOrder = {
    customerId: req.body.customerId,
    productId: req.body.productId,
    date: Date.now()
  }
  db.collection("orders").add(newOrder)
    .then(docRef => res.status(201).send({id:docRef.id}))
    .catch(err => res.status(500).send(err))
}

exports.getAllOrders =(req, res) => {
  const db = connectDb()
  db.collection("orders").get()
  .then (collection => {
    const orders = collection.docs.map(doc => {
    let item = doc.data()
    item.id = doc.id
    return item
  })
  res.send(orders)
})
  .catch(err => res.status(500).send(err))
}

exports.getOrderById = (req, res) => {
  const db = connectDb()

  const {orderId} = req.params
  db.collection("orders").doc(orderId).get()
    .then(doc => {
      let item = doc.data()
      item.id = doc.id
      res.send(item)
    .catch(err => res.status(500).send(err))
})
}
//exports.getOrderByCustomer = (req, res) => {
 // const db = connectDb()

  //const {customerId} = req.params
  //db.collection("orders").doc(Id).get()
//}
